const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const projectDir = path.resolve(rootDir, '..');

const indexPath = path.join(projectDir, 'index.html');
const cssPath = path.join(projectDir, 'src', 'styles', 'main.css');
const jsPath = path.join(projectDir, 'src', 'scripts', 'app.js');
const exp2Path = path.join(projectDir, 'lab', 'exp02-scroll-cinematic.html');
const publicPath = path.join(projectDir, 'public', 'index.html');

let html = fs.readFileSync(indexPath, 'utf8');
const css = fs.readFileSync(cssPath, 'utf8');
const js = fs.readFileSync(jsPath, 'utf8');

// Replace style tag if exists, otherwise replace link tag
if (html.includes('<style>')) {
  html = html.replace(/<style>[\s\S]*?<\/style>/, '<style>\n' + css + '\n</style>');
} else {
  html = html.replace(/<link rel="stylesheet" href="src\/styles\/main\.css">/g, '<style>\n' + css + '\n</style>');
}

// Replace bottom script tag if exists, otherwise replace script src tag
if (html.includes('<script src="src/scripts/app.js"></script>')) {
  html = html.replace(/<script src="src\/scripts\/app\.js"><\/script>/g, '<script>\n' + js + '\n</script>');
} else {
  const lastScriptIdx = html.lastIndexOf('<script>');
  const lastScriptEndIdx = html.lastIndexOf('</script>');
  if (lastScriptIdx !== -1 && lastScriptEndIdx !== -1 && lastScriptIdx < lastScriptEndIdx) {
    html = html.substring(0, lastScriptIdx) + '<script>\n' + js + '\n</script>' + html.substring(lastScriptEndIdx + 9);
  }
}

// Update SVG Gruvbox colors
html = html.replace(/stroke="#569bbd"/g, 'stroke="#076678"');
html = html.replace(/stroke="rgba\(255,255,255,0\.22\)"/g, 'stroke="rgba(40,40,40,0.3)"');
html = html.replace(/stroke="rgba\(255,255,255,0\.16\)"/g, 'stroke="rgba(40,40,40,0.2)"');
html = html.replace(/stroke="rgba\(255,255,255,0\.04\)"/g, 'stroke="rgba(40,40,40,0.06)"');
html = html.replace(/fill="#E5A93C"/g, 'fill="#af3a03"');
html = html.replace(/fill="#050608"/g, 'fill="#fbf1c7"');
html = html.replace(/fill="#f4f5f8"/g, 'fill="#282828"');
html = html.replace(/background:\s*#050608;\s*border:\s*1px solid var\(--border-medium\);/g, 'background: #f2e5bc; border: 1.5px solid var(--border-medium);');

// Write to all 3 endpoints
fs.writeFileSync(indexPath, html, 'utf8');
fs.writeFileSync(exp2Path, html, 'utf8');
fs.writeFileSync(publicPath, html, 'utf8');

console.log('Successfully bundled Gruvbox Light across all endpoints!');
