/**
 * OFF HOURS — Animaxxing Motion & Particle Engine (Gruvbox Editorial)
 * Spec: .agents/skills/animaxxing & .agents/skills/style-animaxxing
 * Features:
 * - Signature curve: CustomEase "animaxxing"
 * - Route letters scatter-implosion hero headline entrance
 * - Word-by-word speak-in hero subhead entrance
 * - Settled ambient headline wave (Hop, Breathe, Lean, Flip, Shear, Squash)
 * - HTML5 Canvas ParticleField (Terracotta Reactor embers & Ochre Marquee runners)
 * - Blast-off hero outro on CTA click
 * - Lenis smooth momentum scroll & 2px terracotta hairline scroll progress
 * - Subterranean 55Hz Web Audio room tone generator
 * - Pinned 2.5D Atlas descent & zero-dead-scroll 4-chamber horizontal gallery
 */

let isBooted = false;

function bootApp() {
  if (isBooted) return;
  isBooted = true;

  // 1. GSAP & Plugins Pre-Registration (GSAP Best Practice: register before any usage)
  if (typeof gsap !== 'undefined') {
    if (typeof ScrollTrigger !== 'undefined') {
      try {
        gsap.registerPlugin(ScrollTrigger);
      } catch (e) {
        console.warn('[OFF HOURS] ScrollTrigger plugin registration warning:', e);
      }
    }
    if (typeof CustomEase !== 'undefined') {
      try {
        gsap.registerPlugin(CustomEase);
        CustomEase.create('animaxxing', 'M0,0 C0.16,1 0.3,1 1,1');
      } catch (e) {
        console.warn('[OFF HOURS] CustomEase plugin registration warning:', e);
      }
    }
  } else {
    console.warn('[OFF HOURS] GSAP library not found on window. If running offline, check CDN script tags.');
  }

  // 2. Isolated subsystem initialization (prevents single-module failures from blocking animations)
  let lenis = null;
  try {
    lenis = initSmoothScroll();
  } catch (err) {
    console.warn('[OFF HOURS] Smooth scroll initialization failed, falling back to native scroll:', err);
  }

  try { initScrollProgress(lenis); } catch (err) { console.warn('[OFF HOURS] Scroll progress failed:', err); }
  try { initTimecode(lenis); } catch (err) { console.warn('[OFF HOURS] Timecode failed:', err); }
  try { initAmbientAudio(); } catch (err) { console.warn('[OFF HOURS] Ambient audio failed:', err); }
  try { initParticleButtons(); } catch (err) { console.warn('[OFF HOURS] Particle buttons failed:', err); }
  try { initScheduleSwitcher(); } catch (err) { console.warn('[OFF HOURS] Schedule switcher failed:', err); }
  try { initCardTilt(); } catch (err) { console.warn('[OFF HOURS] Card tilt failed:', err); }
  try { initModal(); } catch (err) { console.warn('[OFF HOURS] Modal failed:', err); }
  try { initGSAPTimelines(lenis); } catch (err) { console.error('[OFF HOURS] GSAP timelines initialization failed:', err); }
}

// Resilient readyState bootstrap (runs immediately if document is already ready/interactive)
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootApp);
} else {
  // DOM is already parsed (interactive or complete), boot immediately
  bootApp();
}

// Extra safety fallback for late scripts or async execution
window.addEventListener('load', () => {
  bootApp();
  if (typeof ScrollTrigger !== 'undefined') {
    ScrollTrigger.refresh();
  }
});

/* ==========================================================================
   1. LENIS SMOOTH MOMENTUM SCROLL & SCROLL PROGRESS
   ========================================================================== */
function initSmoothScroll() {
  if (typeof Lenis === 'undefined') {
    console.warn('Lenis not loaded, falling back to native scroll');
    return null;
  }

  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 0.95,
    touchMultiplier: 1.5,
  });

  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
  }

  return lenis;
}

function initScrollProgress(lenis) {
  const progressBar = document.getElementById('scrollProgressBar');
  if (!progressBar) return;

  function update() {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0;
    progressBar.style.width = `${progress * 100}%`;
  }

  if (lenis) lenis.on('scroll', update);
  else window.addEventListener('scroll', update);
}

function initTimecode(lenis) {
  const display = document.getElementById('timecodeDisplay');
  if (!display) return;

  function update() {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0;
    
    // 10 hours of festival night (20:00 to 06:00) = 36000 seconds
    const startSec = 20 * 3600;
    const currentSec = (startSec + Math.floor(progress * 36000)) % (24 * 3600);

    const hh = Math.floor(currentSec / 3600).toString().padStart(2, '0');
    const mm = Math.floor((currentSec % 3600) / 60).toString().padStart(2, '0');
    const ss = Math.floor(currentSec % 60).toString().padStart(2, '0');

    display.innerHTML = `<span class="timecode-dot" aria-hidden="true"></span>${hh}:${mm}:${ss}`;
  }

  if (lenis) lenis.on('scroll', update);
  else window.addEventListener('scroll', update);
}

/* ==========================================================================
   2. SUBTERRANEAN 55HZ WEB AUDIO DRONE
   ========================================================================== */
let audioCtx = null;
let oscDrone = null;
let oscHarmonic = null;
let gainNode = null;
let isAudioActive = false;

function initAmbientAudio() {
  const btn = document.getElementById('audioToggleBtn');
  if (!btn) return;

  btn.addEventListener('click', () => {
    if (!isAudioActive) {
      startDrone();
      btn.classList.add('active');
      btn.textContent = 'TONE: 55HZ ON';
      isAudioActive = true;
    } else {
      stopDrone();
      btn.classList.remove('active');
      btn.textContent = 'ROOM TONE';
      isAudioActive = false;
    }
  });
}

function startDrone() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    audioCtx = new AudioContext();

    oscDrone = audioCtx.createOscillator();
    oscDrone.type = 'sine';
    oscDrone.frequency.setValueAtTime(55, audioCtx.currentTime); // 55Hz (A1 subterranean)

    oscHarmonic = audioCtx.createOscillator();
    oscHarmonic.type = 'triangle';
    oscHarmonic.frequency.setValueAtTime(110, audioCtx.currentTime);

    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(160, audioCtx.currentTime);

    gainNode = audioCtx.createGain();
    gainNode.gain.setValueAtTime(0.001, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.07, audioCtx.currentTime + 1.2);

    oscDrone.connect(filter);
    oscHarmonic.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscDrone.start();
    oscHarmonic.start();
  } catch (err) {
    console.warn('AudioContext prevented or unsupported:', err);
  }
}

function stopDrone() {
  try {
    if (gainNode && audioCtx) {
      gainNode.gain.setTargetAtTime(0, audioCtx.currentTime, 0.2);
      setTimeout(() => {
        if (oscDrone) oscDrone.stop();
        if (oscHarmonic) oscHarmonic.stop();
        if (audioCtx) audioCtx.close();
      }, 250);
    }
  } catch (err) {
    console.warn('Error stopping drone:', err);
  }
}

/* ==========================================================================
   3. ZERO-DEPENDENCY ACCESSIBLE SPLIT-TEXT HELPER
   ========================================================================== */
class AccessibleSplitText {
  constructor(element, options = { type: 'chars,words' }) {
    this.element = element;
    this.options = options;
    this.originalHTML = element.innerHTML;
    this.words = [];
    this.chars = [];
    this.split();
  }

  split() {
    const rawText = this.element.textContent.trim();
    const wordsArray = rawText.split(/\s+/);
    this.element.setAttribute('aria-label', rawText);
    this.element.innerHTML = '';

    wordsArray.forEach((wordStr, wordIdx) => {
      const wordSpan = document.createElement('span');
      wordSpan.className = 'split-word';
      wordSpan.style.display = 'inline-block';
      wordSpan.style.whiteSpace = 'nowrap';
      wordSpan.setAttribute('aria-hidden', 'true');

      if (this.options.type.includes('chars')) {
        const charArray = Array.from(wordStr);
        charArray.forEach((char) => {
          const charSpan = document.createElement('span');
          charSpan.className = 'split-char';
          charSpan.style.display = 'inline-block';
          charSpan.style.willChange = 'transform, opacity';
          charSpan.textContent = char;
          wordSpan.appendChild(charSpan);
          this.chars.push(charSpan);
        });
      } else {
        wordSpan.textContent = wordStr;
      }

      this.element.appendChild(wordSpan);
      this.words.push(wordSpan);

      if (wordIdx < wordsArray.length - 1) {
        const space = document.createTextNode(' ');
        this.element.appendChild(space);
      }
    });
  }

  revert() {
    this.element.innerHTML = this.originalHTML;
    this.element.removeAttribute('aria-label');
  }
}

/* ==========================================================================
   4. HTML5 CANVAS PARTICLE FIELD ENGINE (GRUVBOX PALETTE)
   ========================================================================== */
class ParticleField {
  constructor(canvas, target, bleed = 140, defaultColor = '#af3a03') {
    this.canvas = canvas;
    this.target = target;
    this.bleed = bleed;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.emitters = new Set();
    this.box = { x: 0, y: 0, w: 0, h: 0 };
    this.radius = 4;
    this.color = defaultColor;
    this.running = false;
    this.sync();
  }

  sync() {
    const w = this.target.offsetWidth;
    const h = this.target.offsetHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.width = w + this.bleed * 2;
    this.height = h + this.bleed * 2;
    this.box.x = this.bleed;
    this.box.y = this.bleed;
    this.box.w = w;
    this.box.h = h;
    this.canvas.width = Math.round(this.width * dpr);
    this.canvas.height = Math.round(this.height * dpr);
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.radius = parseFloat(getComputedStyle(this.target).borderRadius) || 4;
  }

  spawn(p) {
    const particle = {
      x: p.x || 0,
      y: p.y || 0,
      vx: p.vx || 0,
      vy: p.vy || 0,
      size: p.size || 2,
      alpha: p.alpha !== undefined ? p.alpha : 1,
      life: p.life || 1,
      age: 0,
      fade: p.fade !== undefined ? p.fade : true,
      shrink: p.shrink || false,
      color: p.color || this.color,
      shape: p.shape || 'dot',
      update: p.update || null
    };
    this.particles.push(particle);
    this.start();
    return particle;
  }

  addEmitter(fn) {
    this.emitters.add(fn);
    this.start();
  }

  removeEmitter(fn) {
    this.emitters.delete(fn);
  }

  start() {
    if (this.running) return;
    this.running = true;
    this.lastTime = performance.now();
    this.tick = this.tick.bind(this);
    requestAnimationFrame(this.tick);
  }

  tick(now) {
    if (!this.running) return;
    const dt = Math.min((now - this.lastTime) / 1000, 0.05);
    this.lastTime = now;

    this.ctx.clearRect(0, 0, this.width, this.height);

    for (const emitter of this.emitters) {
      emitter(dt);
    }

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.age += dt;
      if (p.age >= p.life && p.life !== Infinity) {
        this.particles.splice(i, 1);
        continue;
      }

      p.x += p.vx * dt;
      p.y += p.vy * dt;

      if (p.update) p.update(p, dt);

      let alpha = p.alpha;
      if (p.fade && p.life !== Infinity) {
        alpha = p.alpha * (1 - p.age / p.life);
      }
      let size = p.size;
      if (p.shrink && p.life !== Infinity) {
        size = Math.max(0, p.size * (1 - p.age / p.life));
      }

      this.ctx.save();
      this.ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
      this.ctx.fillStyle = p.color;

      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    }

    if (this.particles.length === 0 && this.emitters.size === 0) {
      this.running = false;
      return;
    }

    requestAnimationFrame(this.tick);
  }
}

// Perimeter sampling helper
function getPerimeterPoint(box, radius, t) {
  t = ((t % 1) + 1) % 1;
  const w = box.w;
  const h = box.h;
  const perimeter = 2 * (w + h);
  const dist = t * perimeter;

  if (dist < w) {
    return { x: box.x + dist, y: box.y, nx: 0, ny: -1 };
  } else if (dist < w + h) {
    return { x: box.x + w, y: box.y + (dist - w), nx: 1, ny: 0 };
  } else if (dist < 2 * w + h) {
    return { x: box.x + w - (dist - (w + h)), y: box.y + h, nx: 0, ny: 1 };
  } else {
    return { x: box.x, y: box.y + h - (dist - (2 * w + h)), nx: -1, ny: 0 };
  }
}

function initParticleButtons() {
  // Primary CTA: Reactor with Terracotta Embers (#af3a03)
  const primaryWrap = document.querySelector('[data-particle-reactor]');
  if (primaryWrap) {
    const canvas = primaryWrap.querySelector('canvas');
    const button = primaryWrap.querySelector('button, a');
    if (canvas && button) {
      const field = new ParticleField(canvas, button, 160, '#af3a03');
      window.primaryParticleField = field;

      let hover = false;
      let emberAcc = 0;

      field.addEmitter((dt) => {
        const rate = hover ? 45 : 12;
        emberAcc += rate * dt;
        while (emberAcc >= 1) {
          emberAcc -= 1;
          const px = field.box.x + Math.random() * field.box.w;
          const py = field.box.y + field.box.h + Math.random() * 4;
          field.spawn({
            x: px,
            y: py,
            vx: (Math.random() - 0.5) * 35,
            vy: -(hover ? 130 + Math.random() * 90 : 50 + Math.random() * 35),
            size: 1.3 + Math.random() * 1.8,
            color: Math.random() > 0.3 ? '#af3a03' : '#b57614',
            life: 0.6 + Math.random() * 0.8,
            shrink: true
          });
        }
      });

      button.addEventListener('mouseenter', () => { hover = true; });
      button.addEventListener('mouseleave', () => { hover = false; });
    }
  }

  // Secondary CTA: Marquee with Ochre Perimeter Lights (#b57614)
  const marqueeWrap = document.querySelector('[data-particle-marquee]');
  if (marqueeWrap) {
    const canvas = marqueeWrap.querySelector('canvas');
    const button = marqueeWrap.querySelector('button, a');
    if (canvas && button) {
      const field = new ParticleField(canvas, button, 140, '#b57614');
      const runners = [0, 0.25, 0.5, 0.75];
      let rush = 1;
      let hover = false;

      field.addEmitter((dt) => {
        for (let i = 0; i < runners.length; i++) {
          runners[i] = (runners[i] + (dt * 0.35 * rush)) % 1;
          const pt = getPerimeterPoint(field.box, field.radius, runners[i]);
          field.spawn({
            x: pt.x,
            y: pt.y,
            size: hover ? 2.6 : 1.8,
            color: '#b57614',
            life: 0.3,
            fade: true,
            shrink: true
          });
        }

        if (hover) {
          const pt = getPerimeterPoint(field.box, field.radius, Math.random());
          field.spawn({
            x: pt.x,
            y: pt.y,
            vx: pt.nx * (45 + Math.random() * 65),
            vy: pt.ny * (45 + Math.random() * 65),
            size: 1.3,
            color: '#af3a03',
            life: 0.4,
            shrink: true
          });
        }
      });

      button.addEventListener('mouseenter', () => {
        hover = true;
        rush = 3;
      });
      button.addEventListener('mouseleave', () => {
        hover = false;
        rush = 1;
      });
    }
  }
}

/* ==========================================================================
   5. MASTER GSAP CHOREOGRAPHY (ANIMAXXING EDITORIAL TREATMENT)
   ========================================================================== */
function initGSAPTimelines(lenis) {
  if (typeof gsap === 'undefined') {
    console.warn('[OFF HOURS] initGSAPTimelines skipped: gsap is undefined');
    return;
  }

  if (typeof CustomEase !== 'undefined') {
    try {
      CustomEase.create('animaxxing', 'M0,0 C0.16,1 0.3,1 1,1');
    } catch (_) {}
  }

  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    if (document.fonts) {
      document.fonts.ready.then(() => ScrollTrigger.refresh());
    }
    if (document.readyState === 'complete') {
      ScrollTrigger.refresh();
    } else {
      window.addEventListener('load', () => ScrollTrigger.refresh());
    }

    // Synchronize ScrollTrigger on chamber image completion to prevent dimension shift
    const chamberImgs = document.querySelectorAll('.media-parallax-img');
    let loadedImgs = 0;
    chamberImgs.forEach((img) => {
      if (img.complete) {
        loadedImgs++;
      } else {
        img.addEventListener('load', () => {
          loadedImgs++;
          if (loadedImgs === chamberImgs.length && typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.refresh();
          }
        });
        img.addEventListener('error', () => {
          if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
        });
      }
    });
  }

  // 5.1 Shell Wordmark Underline Reveal
  gsap.to('.wordmark-underline', {
    scaleX: 1,
    duration: 1.2,
    ease: 'power3.out',
    delay: 0.2
  });

  // 5.2 Hero Headline Intro: Letters Scatter-Implosion (Route letters)
  const heroHeading = document.getElementById('heroHeadline');
  let headingSplit = null;

  if (heroHeading) {
    headingSplit = new AccessibleSplitText(heroHeading, { type: 'chars' });
    const chars = headingSplit.chars;

    const spreadX = () => window.innerWidth * 0.55;
    const spreadY = () => window.innerHeight * 0.55;

    gsap.set(chars, {
      autoAlpha: 0,
      x: () => gsap.utils.random(-spreadX(), spreadX()),
      y: () => gsap.utils.random(-spreadY(), spreadY()),
      rotation: () => gsap.utils.random(-90, 90),
      scale: 0.5
    });

    const introTl = gsap.timeline({
      delay: 0.3,
      onComplete: () => {
        initAmbientWave(chars);
      }
    });

    introTl.to(chars, {
      autoAlpha: 1,
      x: 0,
      y: 0,
      rotation: 0,
      scale: 1,
      duration: 0.85,
      ease: 'power4.out',
      stagger: {
        each: 0.02,
        from: 'random'
      }
    });
  }

  // 5.3 Hero Subhead Intro: Speak-In
  const heroSubhead = document.getElementById('heroSubhead');
  if (heroSubhead) {
    const subheadSplit = new AccessibleSplitText(heroSubhead, { type: 'words' });
    gsap.set(subheadSplit.words, { autoAlpha: 0, y: 16 });

    gsap.to(subheadSplit.words, {
      autoAlpha: 1,
      y: 0,
      duration: 0.42,
      stagger: 0.05,
      ease: 'power3.out',
      delay: 1.05
    });
  }

  // 5.4 Kinetic Marquee Tape Ticker
  const marqueeTrack = document.querySelector('.marquee-track');
  if (marqueeTrack) {
    gsap.to(marqueeTrack, {
      xPercent: -50,
      repeat: -1,
      duration: 28,
      ease: 'none'
    });
  }

  // 5.5 Hero Outro: Blast-Off on Primary CTA Press
  const blastBtn = document.getElementById('passCtaAction');
  if (blastBtn && heroHeading) {
    blastBtn.addEventListener('click', (e) => {
      e.preventDefault();
      runBlastOff(blastBtn, heroHeading);
    });
  }

  // 5.6 Scene 02: Nocturnal Atlas — On-Map Scroll-Activated Waypoints & GSAP Popovers
  const atlasWrapper = document.getElementById('atlasPin');
  if (atlasWrapper && typeof ScrollTrigger !== 'undefined') {
    const navTabs = document.querySelectorAll('.atlas-nav-tab');
    const mapNodes = [
      document.getElementById('mapNode0'),
      document.getElementById('mapNode1'),
      document.getElementById('mapNode2'),
      document.getElementById('mapNode3')
    ];
    const leaderLines = [
      document.getElementById('leaderLine0'),
      document.getElementById('leaderLine1'),
      document.getElementById('leaderLine2'),
      document.getElementById('leaderLine3')
    ];
    const calloutCards = [
      document.getElementById('mapCallout0'),
      document.getElementById('mapCallout1'),
      document.getElementById('mapCallout2'),
      document.getElementById('mapCallout3')
    ];

    // Prepare leader lines with stroke-dashoffset for draw-in animation
    leaderLines.forEach((line) => {
      if (line) {
        const len = line.getTotalLength ? line.getTotalLength() : 120;
        gsap.set(line, { strokeDasharray: len, strokeDashoffset: len });
      }
    });

    // Initial state: hide all callout cards
    gsap.set(calloutCards, { autoAlpha: 0, scale: 0.85, y: 15 });

    function updateHud(index) {
      navTabs.forEach((tab, i) => {
        const isActive = i === index;
        tab.classList.toggle('is-active', isActive);
        tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });
    }

    const mmAtlas = gsap.matchMedia();

    mmAtlas.add('(min-width: 1025px)', () => {
      const atlasTl = gsap.timeline({
        scrollTrigger: {
          trigger: '#atlasPin',
          start: 'top top',
          end: 'bottom bottom',
          pin: '.atlas-viewport',
          scrub: 0.8,
          anticipatePin: 1
        }
      });

      // River flow pulse
      atlasTl.fromTo('#atlasRiverLine', 
        { strokeDashoffset: 1400 }, 
        { strokeDashoffset: 0, ease: 'none', duration: 4 }, 
        0
      );

      // Waypoint 01: The Old Tram Depot (Scroll segment 0.2 - 0.8)
      atlasTl
        .call(() => updateHud(0), null, 0.2)
        .to(mapNodes[0], { opacity: 1, duration: 0.2 }, 0.2)
        .add(() => mapNodes[0]?.classList.add('is-active'), 0.2)
        .to(leaderLines[0], { strokeDashoffset: 0, duration: 0.35, ease: 'power2.out' }, 0.25)
        .to(calloutCards[0], { autoAlpha: 1, scale: 1, y: 0, duration: 0.4, ease: 'back.out(1.4)' }, 0.3)
        .add(() => calloutCards[0]?.classList.add('is-active'), 0.3);

      // Waypoint 02: The Municipal Baths (Scroll segment 1.2 - 1.8)
      atlasTl
        .call(() => updateHud(1), null, 1.2)
        .to(mapNodes[1], { opacity: 1, duration: 0.2 }, 1.2)
        .add(() => mapNodes[1]?.classList.add('is-active'), 1.2)
        .to(leaderLines[1], { strokeDashoffset: 0, duration: 0.35, ease: 'power2.out' }, 1.25)
        .to(calloutCards[1], { autoAlpha: 1, scale: 1, y: 0, duration: 0.4, ease: 'back.out(1.4)' }, 1.3)
        .add(() => calloutCards[1]?.classList.add('is-active'), 1.3);

      // Waypoint 03: The Night Market (Scroll segment 2.2 - 2.8)
      atlasTl
        .call(() => updateHud(2), null, 2.2)
        .to(mapNodes[2], { opacity: 1, duration: 0.2 }, 2.2)
        .add(() => mapNodes[2]?.classList.add('is-active'), 2.2)
        .to(leaderLines[2], { strokeDashoffset: 0, duration: 0.35, ease: 'power2.out' }, 2.25)
        .to(calloutCards[2], { autoAlpha: 1, scale: 1, y: 0, duration: 0.4, ease: 'back.out(1.4)' }, 2.3)
        .add(() => calloutCards[2]?.classList.add('is-active'), 2.3);

      // Waypoint 04: The Old Printworks (Scroll segment 3.2 - 3.8)
      atlasTl
        .call(() => updateHud(3), null, 3.2)
        .to(mapNodes[3], { opacity: 1, duration: 0.2 }, 3.2)
        .add(() => mapNodes[3]?.classList.add('is-active'), 3.2)
        .to(leaderLines[3], { strokeDashoffset: 0, duration: 0.35, ease: 'power2.out' }, 3.25)
        .to(calloutCards[3], { autoAlpha: 1, scale: 1, y: 0, duration: 0.4, ease: 'back.out(1.4)' }, 3.3)
        .add(() => calloutCards[3]?.classList.add('is-active'), 3.3);
    });

    // Mobile / Tablet: show active card on tap/scroll
    mmAtlas.add('(max-width: 1024px)', () => {
      function showMobileCallout(index) {
        updateHud(index);
        calloutCards.forEach((card, i) => {
          if (card) {
            const isActive = i === index;
            card.classList.toggle('is-active', isActive);
            gsap.to(card, { autoAlpha: isActive ? 1 : 0, scale: isActive ? 1 : 0.9, duration: 0.3 });
          }
        });
        mapNodes.forEach((node, i) => {
          if (node) node.classList.toggle('is-active', i === index);
        });
        leaderLines.forEach((line, i) => {
          if (line) gsap.to(line, { strokeDashoffset: i === index ? 0 : 120, duration: 0.3 });
        });
      }

      showMobileCallout(0);

      navTabs.forEach((tab, i) => {
        tab.addEventListener('click', () => showMobileCallout(i));
      });
      mapNodes.forEach((node, i) => {
        if (node) node.addEventListener('click', () => showMobileCallout(i));
      });
    });

    // Click on Nav Tabs or Map Nodes scrolls directly to that waypoint's position
    function scrollToAtlasWaypoint(targetIndex) {
      if (typeof ScrollTrigger === 'undefined') return;
      const totalScrollable = atlasWrapper.offsetHeight - window.innerHeight;
      if (totalScrollable <= 0) return;
      const targetProgress = (targetIndex + 0.35) / 4;
      const targetY = atlasWrapper.offsetTop + (totalScrollable * targetProgress);
      if (lenis) {
        lenis.scrollTo(targetY);
      } else {
        window.scrollTo({ top: targetY, behavior: 'smooth' });
      }
    }

    navTabs.forEach((tab, i) => {
      tab.addEventListener('click', (e) => {
        e.preventDefault();
        scrollToAtlasWaypoint(i);
      });
    });

    mapNodes.forEach((node, i) => {
      if (node) {
        node.addEventListener('click', (e) => {
          e.preventDefault();
          scrollToAtlasWaypoint(i);
        });
      }
    });
  }

  // 5.7 Responsive MatchMedia (Horizontal Pinned Gallery on Desktop)
  if (typeof ScrollTrigger !== 'undefined') {
    const mm = gsap.matchMedia();

    mm.add('(min-width: 1025px)', () => {
      const venuesStrip = document.getElementById('venuesStrip');
      const venuesPinWrapper = document.getElementById('venuesPin');

      if (venuesStrip && venuesPinWrapper) {
        const panels = gsap.utils.toArray('.venue-chamber-panel');
        const getScrollAmount = () => venuesStrip.scrollWidth - window.innerWidth;

        const railTl = gsap.to(venuesStrip, {
          x: () => -getScrollAmount(),
          ease: 'none',
          scrollTrigger: {
            trigger: '#venuesPin',
            start: 'top top',
            end: () => `+=${getScrollAmount()}`,
            pin: true,
            pinSpacing: true,
            scrub: 1,
            invalidateOnRefresh: true
          }
        });

        panels.forEach((panel, i) => {
          const img = panel.querySelector('.media-parallax-img');
          if (img) {
            // First panel is already in viewport when pin begins (x = 0)
            // Middle panels enter from right and exit to left
            // Last panel enters from right and rests when strip reaches end
            const startPos = i === 0 ? 'left left' : 'left right';
            const endPos = i === panels.length - 1 ? 'right right' : 'right left';

            gsap.fromTo(
              img,
              { xPercent: 16, scale: 1.2 },
              {
                xPercent: -16,
                scale: 1.05,
                ease: 'none',
                scrollTrigger: {
                  trigger: panel,
                  containerAnimation: railTl,
                  start: startPos,
                  end: endPos,
                  scrub: true
                }
              }
            );
          }
        });
      }
    });

    mm.add('(max-width: 1024px)', () => {
      ScrollTrigger.batch('.venue-chamber-panel', {
        onEnter: (batch) => gsap.fromTo(batch, { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, stagger: 0.15, duration: 0.8, ease: 'power2.out', overwrite: true }),
        start: 'top 85%'
      });
    });
  }

  // 5.8 Schedule Timetable Entrance Animation
  const scheduleSection = document.getElementById('schedule');
  if (scheduleSection && typeof ScrollTrigger !== 'undefined') {
    const scheduleHeader = scheduleSection.querySelector('.schedule-header');
    const day1Rows = scheduleSection.querySelectorAll('.ledger-row[data-day="1"]');
    const day1TimeRolls = scheduleSection.querySelectorAll('.ledger-row[data-day="1"] .slot-time-roll');
    const day1Acts = scheduleSection.querySelectorAll('.ledger-row[data-day="1"] .slot-act');
    const day1Badges = scheduleSection.querySelectorAll('.ledger-row[data-day="1"] .slot-badge');
    const day1Btns = scheduleSection.querySelectorAll('.ledger-row[data-day="1"] .reserve-btn');

    const scheduleTl = gsap.timeline({
      scrollTrigger: {
        trigger: scheduleSection,
        start: 'top 75%',
        once: true
      }
    });

    if (scheduleHeader) {
      scheduleTl.fromTo(scheduleHeader,
        { autoAlpha: 0, y: 20 },
        { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power3.out' }
      );
    }

    if (day1Rows.length > 0) {
      scheduleTl.fromTo(day1Rows,
        { autoAlpha: 0, y: 14 },
        { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.045, ease: 'power3.out' },
        '-=0.2'
      );

      // Split-flap departure-board odometer roll-up on timestamps
      if (day1TimeRolls.length > 0) {
        scheduleTl.fromTo(day1TimeRolls,
          { yPercent: 120, autoAlpha: 0 },
          { yPercent: 0, autoAlpha: 1, duration: 0.55, stagger: 0.045, ease: 'animaxxing' },
          '<-0.35'
        );
      }

      // Typographic reveal on acts
      if (day1Acts.length > 0) {
        scheduleTl.fromTo(day1Acts,
          { x: -10, autoAlpha: 0 },
          { x: 0, autoAlpha: 1, duration: 0.4, stagger: 0.045, ease: 'power2.out' },
          '<-0.35'
        );
      }

      // Rubber-stamp pop on session badges
      if (day1Badges.length > 0) {
        scheduleTl.fromTo(day1Badges,
          { scale: 1.4, autoAlpha: 0 },
          { scale: 1, autoAlpha: 1, duration: 0.45, stagger: 0.045, ease: 'back.out(2)' },
          '<-0.3'
        );
      }

      // Reserve CTA subtle slide
      if (day1Btns.length > 0) {
        scheduleTl.fromTo(day1Btns,
          { x: 8, autoAlpha: 0 },
          { x: 0, autoAlpha: 1, duration: 0.35, stagger: 0.045, ease: 'power2.out' },
          '<-0.3'
        );
      }
    }
  }

  // 5.9 Passes Dossier Entrance Animation
  const passesSection = document.getElementById('passes');
  if (passesSection && typeof ScrollTrigger !== 'undefined') {
    const passesHeader = passesSection.querySelector('div:first-child');
    const cards = passesSection.querySelectorAll('.card');

    const passesTl = gsap.timeline({
      scrollTrigger: {
        trigger: passesSection,
        start: 'top 75%',
        once: true
      }
    });

    if (passesHeader) {
      passesTl.fromTo(passesHeader,
        { autoAlpha: 0, y: 22 },
        { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power3.out' }
      );
    }

    if (cards.length > 0) {
      passesTl.fromTo(cards,
        { autoAlpha: 0, y: 32, scale: 0.96 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.12, ease: 'animaxxing' },
        '-=0.25'
      );
    }
  }

  // 5.10 Dynamic Scroll Velocity Skew (High-Craft Kinetic Inertia)
  if (typeof ScrollTrigger !== 'undefined' && !prefersReducedMotion()) {
    const skewTargets = gsap.utils.toArray('.schedule-section, .card-grid, .hero-main-block');
    if (skewTargets.length > 0) {
      const clamp = gsap.utils.clamp(-2.5, 2.5);
      const lean = { skew: 0 };
      gsap.set(skewTargets, { skewY: 0, transformOrigin: '50% 50%', willChange: 'transform' });
      const setSkew = gsap.quickSetter(skewTargets, 'skewY', 'deg');
      let settle = null;

      ScrollTrigger.create({
        onUpdate: (self) => {
          const velocity = self.getVelocity();
          const targetSkew = clamp(velocity / -350);
          if (Math.abs(targetSkew) <= Math.abs(lean.skew)) return;
          lean.skew = targetSkew;
          if (settle) settle.kill();
          settle = gsap.to(lean, {
            skew: 0,
            duration: 0.75,
            ease: 'power3.out',
            onUpdate: () => setSkew(lean.skew),
          });
        },
      });
    }
  }

  // Force an immediate refresh so all pinned triggers compute accurate positions
  if (typeof ScrollTrigger !== 'undefined') {
    ScrollTrigger.refresh();
  }
}

/* ==========================================================================
   6. AMBIENT HEADLINE WAVE (THE WAVE RECIPE)
   ========================================================================== */
function initAmbientWave(chars) {
  if (!chars || chars.length === 0) return;

  const MOVES = [
    (c) => gsap.timeline().to(c, { y: -12, duration: 0.14, ease: 'power2.out', stagger: { each: 0.025, yoyo: true, repeat: 1 } }),
    (c) => gsap.timeline().to(c, { scale: 1.08, duration: 0.16, ease: 'sine.inOut', stagger: { each: 0.025, yoyo: true, repeat: 1 } }),
    (c) => gsap.timeline().to(c, { rotation: 6, duration: 0.15, ease: 'sine.inOut', stagger: { each: 0.025, yoyo: true, repeat: 1 } }),
    (c) => gsap.timeline().to(c, { rotationY: 360, duration: 0.35, ease: 'power2.inOut', stagger: 0.02 }),
    (c) => gsap.timeline().to(c, { skewX: 10, duration: 0.15, ease: 'sine.inOut', stagger: { each: 0.025, yoyo: true, repeat: 1 } }),
    (c) => gsap.timeline().to(c, { scaleY: 0.84, duration: 0.14, ease: 'sine.inOut', stagger: { each: 0.025, yoyo: true, repeat: 1 } })
  ];

  let deck = gsap.utils.shuffle([...MOVES]);
  let index = 0;

  function runWave() {
    const move = deck[index++];
    if (index >= deck.length) {
      deck = gsap.utils.shuffle([...MOVES]);
      index = 0;
    }
    if (move) move(chars);
  }

  setInterval(runWave, 4500);
}

/* ==========================================================================
   7. HERO BLAST-OFF OUTRO
   ========================================================================== */
function runBlastOff(button, heading) {
  const root = document.querySelector('.hero');
  const chars = heading.querySelectorAll('.split-char');
  const subheadWords = document.querySelectorAll('.hero-subhead .split-word');
  const modal = document.getElementById('checkoutModal');

  // Trigger button particles flash
  if (window.primaryParticleField) {
    const field = window.primaryParticleField;
    for (let i = 0; i < 60; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 150 + Math.random() * 350;
      field.spawn({
        x: field.box.x + field.box.w / 2,
        y: field.box.y + field.box.h / 2,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 2.2,
        color: Math.random() > 0.4 ? '#af3a03' : '#b57614',
        life: 0.6,
        shrink: true
      });
    }
  }

  const blastTl = gsap.timeline({
    onComplete: () => {
      if (window.openCheckoutModal) {
        window.openCheckoutModal();
      } else if (modal) {
        modal.classList.add('open');
      }
      setTimeout(() => {
        gsap.to(chars, { x: 0, y: 0, rotation: 0, scale: 1, autoAlpha: 1, duration: 0.8, ease: 'power3.out' });
        gsap.to(subheadWords, { x: 0, y: 0, rotation: 0, autoAlpha: 1, duration: 0.6, ease: 'power3.out' });
        gsap.to(root, { x: 0, y: 0 });
      }, 600);
    }
  });

  // Page Rock
  blastTl.to(root, {
    x: () => gsap.utils.random(-8, 8),
    y: () => gsap.utils.random(-5, 5),
    duration: 0.04,
    repeat: 5,
    yoyo: true,
    ease: 'none'
  }, 0);

  // Chars blast radially outwards from button
  const btnRect = button.getBoundingClientRect();
  const originX = btnRect.left + btnRect.width / 2;
  const originY = btnRect.top + btnRect.height / 2;

  chars.forEach((char) => {
    const charRect = char.getBoundingClientRect();
    const cx = charRect.left + charRect.width / 2;
    const cy = charRect.top + charRect.height / 2;
    const angle = Math.atan2(cy - originY, cx - originX) + gsap.utils.random(-0.4, 0.4);
    const distance = gsap.utils.random(350, 750);

    blastTl.to(char, {
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
      rotation: gsap.utils.random(-360, 360),
      scale: gsap.utils.random(0.4, 2),
      autoAlpha: 0,
      duration: gsap.utils.random(0.4, 0.6),
      ease: 'expo.out'
    }, gsap.utils.random(0, 0.1));
  });

  // Subhead words spin down
  subheadWords.forEach((word) => {
    blastTl.to(word, {
      x: gsap.utils.random(-200, 200),
      y: gsap.utils.random(250, 500),
      rotation: gsap.utils.random(-180, 180),
      autoAlpha: 0,
      duration: gsap.utils.random(0.35, 0.5),
      ease: 'power2.in'
    }, gsap.utils.random(0, 0.1));
  });
}

/* ==========================================================================
   8. SCHEDULE SWITCHER & MODAL
   ========================================================================== */
function initScheduleSwitcher() {
  const day1Btn = document.getElementById('day1Btn');
  const day2Btn = document.getElementById('day2Btn');
  const rows = document.querySelectorAll('.ledger-row');

  if (!day1Btn || !day2Btn) return;

  let isSwitching = false;

  day1Btn.addEventListener('click', () => {
    if (day1Btn.classList.contains('active') || isSwitching) return;
    day1Btn.classList.add('active');
    day2Btn.classList.remove('active');
    day1Btn.setAttribute('aria-selected', 'true');
    day2Btn.setAttribute('aria-selected', 'false');
    filterRows('1');
  });

  day2Btn.addEventListener('click', () => {
    if (day2Btn.classList.contains('active') || isSwitching) return;
    day2Btn.classList.add('active');
    day1Btn.classList.remove('active');
    day2Btn.setAttribute('aria-selected', 'true');
    day1Btn.setAttribute('aria-selected', 'false');
    filterRows('2');
  });

  function filterRows(day) {
    if (typeof gsap === 'undefined') {
      rows.forEach((row) => {
        row.style.display = row.getAttribute('data-day') === day ? 'grid' : 'none';
      });
      return;
    }

    isSwitching = true;
    const currentRows = Array.from(rows).filter((r) => r.style.display !== 'none');
    const incomingRows = Array.from(rows).filter((r) => r.getAttribute('data-day') === day);

    // Mechanical departure board: outgoing rows flick up and fade
    gsap.to(currentRows, {
      y: -8,
      autoAlpha: 0,
      duration: 0.16,
      stagger: 0.02,
      ease: 'power2.in',
      onComplete: () => {
        currentRows.forEach((r) => { r.style.display = 'none'; });
        incomingRows.forEach((r) => {
          r.style.display = 'grid';
        });

        const timeRolls = incomingRows.map((r) => r.querySelector('.slot-time-roll')).filter(Boolean);
        const acts = incomingRows.map((r) => r.querySelector('.slot-act')).filter(Boolean);
        const badges = incomingRows.map((r) => r.querySelector('.slot-badge')).filter(Boolean);
        const reserveBtns = incomingRows.map((r) => r.querySelector('.reserve-btn')).filter(Boolean);

        const switchTl = gsap.timeline({
          onComplete: () => {
            isSwitching = false;
            if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
          }
        });

        // Rows cascade in
        switchTl.fromTo(incomingRows,
          { y: 10, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.32, stagger: 0.035, ease: 'power3.out' }
        );

        // Odometer roll on incoming timestamps
        if (timeRolls.length > 0) {
          switchTl.fromTo(timeRolls,
            { yPercent: 110, autoAlpha: 0 },
            { yPercent: 0, autoAlpha: 1, duration: 0.45, stagger: 0.035, ease: 'animaxxing' },
            0.04
          );
        }

        // Typographic slide on incoming acts
        if (acts.length > 0) {
          switchTl.fromTo(acts,
            { x: -6, autoAlpha: 0 },
            { x: 0, autoAlpha: 1, duration: 0.35, stagger: 0.035, ease: 'power2.out' },
            0.06
          );
        }

        // Rubber-stamp pop on incoming badges
        if (badges.length > 0) {
          switchTl.fromTo(badges,
            { scale: 1.3, autoAlpha: 0 },
            { scale: 1, autoAlpha: 1, duration: 0.35, stagger: 0.035, ease: 'back.out(2)' },
            0.08
          );
        }

        // Reserve buttons slide
        if (reserveBtns.length > 0) {
          switchTl.fromTo(reserveBtns,
            { x: 6, autoAlpha: 0 },
            { x: 0, autoAlpha: 1, duration: 0.3, stagger: 0.035, ease: 'power2.out' },
            0.08
          );
        }
      }
    });
  }
}

function initModal() {
  const modal = document.getElementById('checkoutModal');
  const closeBtn = document.getElementById('modalCloseBtn');
  const triggerBtns = document.querySelectorAll('[data-open-modal]');
  const modalContent = modal ? modal.querySelector('.modal-content') : null;
  const formElements = modalContent ? modalContent.querySelectorAll('.mono-label, .card-heading, label, input, button') : [];
  const form = document.getElementById('checkoutForm');
  const successState = document.getElementById('checkoutSuccessState');
  const emailInput = document.getElementById('attendeeEmail');
  const receiptEmail = document.getElementById('receiptEmail');
  const receiptSerial = document.getElementById('receiptSerial');
  const receiptCloseBtn = document.getElementById('receiptCloseBtn');
  const modalTierPrice = document.getElementById('modalTierPrice');

  if (!modal || !modalContent) return;

  let isOpen = false;
  let activeTl = null;

  function openModal(triggerElement) {
    if (isOpen) return;
    isOpen = true;

    if (activeTl) activeTl.kill();

    if (triggerElement && modalTierPrice) {
      const card = triggerElement.closest ? triggerElement.closest('.card') : null;
      if (card) {
        const figure = card.querySelector('.figure');
        const heading = card.querySelector('.card-heading');
        if (figure && heading) {
          modalTierPrice.textContent = `PASS TIER: ${heading.textContent.trim()} · ${figure.textContent.split('·')[0].trim()}`;
        }
      } else {
        modalTierPrice.textContent = 'PASS TIER: FULL ACCESS · €48';
      }
    }

    modal.classList.add('open');
    modal.style.display = 'flex';
    modal.style.pointerEvents = 'auto';

    if (typeof gsap === 'undefined') {
      modal.style.opacity = '1';
      return;
    }

    activeTl = gsap.timeline();

    // 1. Backdrop ink wash fade in
    activeTl.fromTo(modal,
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 0.35, ease: 'power2.out' }
    );

    // 2. Broadsheet modal content panel elastic pop-in
    activeTl.fromTo(modalContent,
      { scale: 0.94, y: 18, autoAlpha: 0 },
      { scale: 1, y: 0, autoAlpha: 1, duration: 0.45, ease: 'animaxxing' },
      0.05
    );

    // 3. Staggered cascade of form inputs and elements
    if (formElements.length > 0) {
      activeTl.fromTo(formElements,
        { autoAlpha: 0, y: 8 },
        { autoAlpha: 1, y: 0, duration: 0.28, stagger: 0.03, ease: 'power2.out' },
        0.15
      );
    }
  }

  function closeModal() {
    if (!isOpen) return;
    isOpen = false;

    if (activeTl) activeTl.kill();

    if (typeof gsap === 'undefined') {
      modal.classList.remove('open');
      modal.style.display = 'none';
      modal.style.pointerEvents = 'none';
      return;
    }

    activeTl = gsap.timeline({
      onComplete: () => {
        modal.classList.remove('open');
        modal.style.display = 'none';
        modal.style.pointerEvents = 'none';
        // Reset form to ready state
        if (form && successState) {
          form.reset();
          form.style.display = 'block';
          gsap.set(form, { autoAlpha: 1, y: 0 });
          successState.style.display = 'none';
          gsap.set(successState, { autoAlpha: 0 });
        }
      }
    });

    activeTl.to(modalContent, {
      scale: 0.95,
      y: 10,
      autoAlpha: 0,
      duration: 0.22,
      ease: 'power2.in'
    });

    activeTl.to(modal, {
      autoAlpha: 0,
      duration: 0.22,
      ease: 'power2.in'
    }, 0.04);
  }

  window.openCheckoutModal = openModal;
  window.closeCheckoutModal = closeModal;

  // Form submission: digital receipt confirmation
  if (form && successState) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = emailInput && emailInput.value ? emailInput.value : 'elena@example.com';
      if (receiptEmail) receiptEmail.textContent = email;
      if (receiptSerial) {
        receiptSerial.textContent = `OH-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      }

      gsap.to(form, {
        autoAlpha: 0,
        y: -10,
        duration: 0.22,
        ease: 'power2.in',
        onComplete: () => {
          form.style.display = 'none';
          successState.style.display = 'block';
          gsap.fromTo(successState,
            { autoAlpha: 0, scale: 0.96, y: 12 },
            { autoAlpha: 1, scale: 1, y: 0, duration: 0.35, ease: 'back.out(1.4)' }
          );
        }
      });
    });

    if (receiptCloseBtn) {
      receiptCloseBtn.addEventListener('click', (e) => {
        e.preventDefault();
        closeModal();
      });
    }
  }

  triggerBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      // If hero blast-off button, it triggers blastOff animation first
      if (btn.id === 'passCtaAction') return;
      e.preventDefault();
      openModal(btn);
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      closeModal();
    });
  }

  // Backdrop click dismisses modal
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // ESC key dismisses modal
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) {
      closeModal();
    }
  });
}

function initCardTilt() {
  if (typeof gsap === 'undefined' || prefersReducedMotion()) return;
  const cards = document.querySelectorAll('.card');
  if (cards.length === 0) return;

  const isFinePointer = window.matchMedia('(pointer: fine)').matches;
  if (!isFinePointer) return;

  cards.forEach((card) => {
    gsap.set(card, { transformPerspective: 900 });
    const rx = gsap.quickTo(card, 'rotationX', { duration: 0.35, ease: 'power2.out' });
    const ry = gsap.quickTo(card, 'rotationY', { duration: 0.35, ease: 'power2.out' });

    let rect = card.getBoundingClientRect();

    card.addEventListener('pointerenter', (e) => {
      if (e.pointerType === 'touch') return;
      rect = card.getBoundingClientRect();
    });

    card.addEventListener('pointermove', (e) => {
      if (e.pointerType === 'touch') return;
      const px = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
      const py = Math.min(1, Math.max(0, (e.clientY - rect.top) / rect.height));
      const maxTilt = 15;
      ry((px - 0.5) * 2 * maxTilt);
      rx((0.5 - py) * 2 * maxTilt);
      card.style.setProperty('--pointer-x', `${(px * 100).toFixed(1)}%`);
      card.style.setProperty('--pointer-y', `${(py * 100).toFixed(1)}%`);
    });

    card.addEventListener('pointerleave', (e) => {
      if (e.pointerType === 'touch') return;
      rx(0);
      ry(0);
      card.style.removeProperty('--pointer-x');
      card.style.removeProperty('--pointer-y');
    });
  });
}
