const { spawn } = require('child_process');
const path = require('path');

async function testRuntime() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const fileUrl = 'file:///' + path.resolve(__dirname, '..', 'index.html').replace(/\\/g, '/');
  const port = 9225;

  console.log('Launching Chrome headless...');
  const chromeProc = spawn(chromePath, [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    '--user-data-dir=' + path.join(__dirname, '..', '.chrome-temp'),
    fileUrl
  ]);

  // Wait for debugger endpoint
  let pageWsUrl = null;
  for (let i = 0; i < 30; i++) {
    await new Promise(r => setTimeout(r, 200));
    try {
      const res = await fetch(`http://127.0.0.1:${port}/json/list`);
      const list = await res.json();
      if (list && list.length > 0 && list[0].webSocketDebuggerUrl) {
        pageWsUrl = list[0].webSocketDebuggerUrl;
        break;
      }
    } catch (e) {}
  }

  if (!pageWsUrl) {
    console.error('Could not connect to Chrome debugging port.');
    chromeProc.kill();
    process.exit(1);
  }

  console.log('Connected to Chrome DevTools WebSocket:', pageWsUrl);
  const ws = new WebSocket(pageWsUrl);

  const consoleLogs = [];
  const errors = [];

  ws.onopen = () => {
    ws.send(JSON.stringify({ id: 1, method: 'Runtime.enable' }));
    ws.send(JSON.stringify({ id: 2, method: 'Console.enable' }));
  };

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.method === 'Console.messageAdded') {
      consoleLogs.push(data.params.message.text);
    }
    if (data.method === 'Runtime.exceptionThrown') {
      errors.push(data.params.exceptionDetails);
    }
    if (data.method === 'Runtime.consoleAPICalled') {
      const args = data.params.args.map(a => a.value || a.description).join(' ');
      consoleLogs.push(`[${data.params.type}] ${args}`);
    }
  };

  // Wait 3 seconds for page to run and animations to trigger
  await new Promise(r => setTimeout(r, 3000));

  // Evaluate GSAP state
  const evalMsg = {
    id: 10,
    method: 'Runtime.evaluate',
    params: {
      expression: `({
        hasGsap: typeof gsap !== 'undefined',
        hasScrollTrigger: typeof ScrollTrigger !== 'undefined',
        hasCustomEase: typeof CustomEase !== 'undefined',
        hasLenis: typeof Lenis !== 'undefined',
        scrollTriggerCount: typeof ScrollTrigger !== 'undefined' ? ScrollTrigger.getAll().length : 0,
        gsapGlobalTimelineTweens: typeof gsap !== 'undefined' ? gsap.globalTimeline.getChildren().length : 0,
        prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches
      })`,
      returnByValue: true
    }
  };

  const evalResult = await new Promise((resolve) => {
    const handler = (evt) => {
      const d = JSON.parse(evt.data);
      if (d.id === 10) {
        ws.removeEventListener('message', handler);
        resolve(d.result?.result?.value);
      }
    };
    ws.addEventListener('message', handler);
    ws.send(JSON.stringify(evalMsg));
  });

  console.log('\n--- BROWSER CONSOLE LOGS ---');
  consoleLogs.forEach(l => console.log('LOG:', l));

  console.log('\n--- RUNTIME EXCEPTIONS ---');
  if (errors.length === 0) {
    console.log('No exceptions thrown!');
  } else {
    errors.forEach(e => console.error('EXCEPTION:', e.text, e.exception?.description));
  }

  console.log('\n--- GSAP & SCROLLTRIGGER RUNTIME DIAGNOSTIC ---');
  console.log(evalResult);

  ws.close();
  chromeProc.kill();
  process.exit(0);
}

testRuntime().catch(err => {
  console.error(err);
  process.exit(1);
});
