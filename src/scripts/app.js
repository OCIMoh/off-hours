/**
 * OFF HOURS — Animaxxing Motion & Particle Engine
 * Spec: .agents/skills/animaxxing & .agents/skills/style-animaxxing
 * Features:
 * - Signature curve: CustomEase "animaxxing"
 * - Route letters scatter-implosion hero headline entrance
 * - Word-by-word speak-in hero subhead entrance
 * - Settled ambient headline wave (Hop, Breathe, Lean, Flip, Shear, Squash, Twist)
 * - HTML5 Canvas ParticleField (Reactor embers & Marquee outline runners)
 * - Blast-off hero outro on CTA click
 * - Lenis smooth momentum scroll & 1px hairline scroll progress
 * - Pinned 2.5D Atlas descent & zero-dead-scroll 4-chamber horizontal gallery
 * - Light/Dark monochrome theme switcher
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  const lenis = initSmoothScroll();
  initScrollProgress(lenis);
  initTimecode(lenis);
  initParticleButtons();
  initScheduleSwitcher();
  initModal();
  initGSAPTimelines(lenis);
});

/* ==========================================================================
   1. THEME SWITCHING (LIGHT & DARK MONOCHROME)
   ========================================================================== */
function initThemeToggle() {
  const btn = document.getElementById('themeToggleBtn');
  if (!btn) return;

  const currentTheme = localStorage.getItem('offhours-theme') || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  
  if (currentTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    btn.textContent = 'LIGHT';
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    btn.textContent = 'DARK';
  }

  btn.addEventListener('click', () => {
    document.documentElement.classList.add('theme-transitioning');
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const nextTheme = isDark ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('offhours-theme', nextTheme);
    btn.textContent = nextTheme === 'dark' ? 'LIGHT' : 'DARK';

    // Recolor active particle fields
    if (window.activeParticleFields) {
      window.activeParticleFields.forEach((field) => field.recolor());
    }

    setTimeout(() => {
      document.documentElement.classList.remove('theme-transitioning');
    }, 250);
  });
}

/* ==========================================================================
   2. LENIS SMOOTH MOMENTUM SCROLL & SCROLL PROGRESS
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

    display.textContent = `${hh}:${mm}:${ss}`;
  }

  if (lenis) lenis.on('scroll', update);
  else window.addEventListener('scroll', update);
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

      // Add space after word if not the last
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
   4. HTML5 CANVAS PARTICLE FIELD ENGINE
   ========================================================================== */
window.activeParticleFields = [];

class ParticleField {
  constructor(canvas, target, bleed = 140) {
    this.canvas = canvas;
    this.target = target;
    this.bleed = bleed;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.emitters = new Set();
    this.box = { x: 0, y: 0, w: 0, h: 0 };
    this.radius = 4;
    this.color = '#171717';
    this.running = false;
    this.sync();
    window.activeParticleFields.push(this);
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
    this.recolor();
  }

  recolor() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    this.color = isDark ? '#ededed' : '#171717';
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

      if (p.shape === 'spark') {
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        this.ctx.fill();
      } else {
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        this.ctx.fill();
      }
      this.ctx.restore();
    }

    if (this.particles.length === 0 && this.emitters.size === 0) {
      this.running = false;
      return;
    }

    requestAnimationFrame(this.tick);
  }
}

// Perimeter sampling helper for rectangular shapes with border radius
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
  // Primary CTA: Reactor (Solid Button)
  const primaryWrap = document.querySelector('[data-particle-reactor]');
  if (primaryWrap) {
    const canvas = primaryWrap.querySelector('canvas');
    const button = primaryWrap.querySelector('button, a');
    if (canvas && button) {
      const field = new ParticleField(canvas, button, 160);
      window.primaryParticleField = field;

      let hover = false;
      let emberAcc = 0;

      field.addEmitter((dt) => {
        const rate = hover ? 45 : 10;
        emberAcc += rate * dt;
        while (emberAcc >= 1) {
          emberAcc -= 1;
          const px = field.box.x + Math.random() * field.box.w;
          const py = field.box.y + field.box.h + Math.random() * 4;
          field.spawn({
            x: px,
            y: py,
            vx: (Math.random() - 0.5) * 30,
            vy: -(hover ? 120 + Math.random() * 80 : 45 + Math.random() * 30),
            size: 1.2 + Math.random() * 1.6,
            life: 0.6 + Math.random() * 0.8,
            shrink: true,
            shape: 'spark'
          });
        }
      });

      button.addEventListener('mouseenter', () => { hover = true; });
      button.addEventListener('mouseleave', () => { hover = false; });
    }
  }

  // Secondary CTA: Marquee (Outlined Button)
  const marqueeWrap = document.querySelector('[data-particle-marquee]');
  if (marqueeWrap) {
    const canvas = marqueeWrap.querySelector('canvas');
    const button = marqueeWrap.querySelector('button, a');
    if (canvas && button) {
      const field = new ParticleField(canvas, button, 140);
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
            size: hover ? 2.5 : 1.8,
            life: 0.3,
            fade: true,
            shrink: true,
            shape: 'dot'
          });
        }

        if (hover) {
          const pt = getPerimeterPoint(field.box, field.radius, Math.random());
          field.spawn({
            x: pt.x,
            y: pt.y,
            vx: pt.nx * (40 + Math.random() * 60),
            vy: pt.ny * (40 + Math.random() * 60),
            size: 1.2,
            life: 0.4,
            shrink: true,
            shape: 'spark'
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
   5. MASTER GSAP CHOREOGRAPHY (ANIMAXXING FULL TREATMENT)
   ========================================================================== */
function initGSAPTimelines(lenis) {
  if (typeof gsap === 'undefined') return;

  // Register CustomEase for signature animaxxing curve
  if (typeof CustomEase !== 'undefined') {
    CustomEase.create('animaxxing', 'M0,0 C0.16,1 0.3,1 1,1');
  }

  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    if (document.fonts) {
      document.fonts.ready.then(() => ScrollTrigger.refresh());
    }
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

    // Disperse chars across viewport
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
        // Start Ambient Wave after settled
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

  // 5.3 Hero Subhead Intro: Speak-In (Word by word arrival)
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

  // 5.6 Scene 02: Nocturnal Atlas Camera Descent
  const atlasWrapper = document.getElementById('atlasPin');
  if (atlasWrapper && typeof ScrollTrigger !== 'undefined') {
    const atlasTl = gsap.timeline({
      scrollTrigger: {
        trigger: '#atlasPin',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.2,
        pin: '.atlas-viewport',
        onUpdate: (self) => {
          const fill = document.getElementById('atlasHudFill');
          if (fill) fill.style.width = `${self.progress * 100}%`;
        }
      }
    });

    atlasTl
      .to('.atlas-layer-bg-grid', { scale: 1.6, autoAlpha: 0.25, ease: 'none' }, 0)
      .to('#atlasSchematicMap', { scale: 3.2, transformOrigin: '52% 46%', ease: 'power2.inOut' }, 0)
      .from('.atlas-hud', { y: 20, autoAlpha: 0.6, duration: 0.5 }, 0.2);
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

        panels.forEach((panel) => {
          const img = panel.querySelector('.media-parallax-img');
          if (img) {
            gsap.fromTo(
              img,
              { xPercent: 12, scale: 1.15 },
              {
                xPercent: -12,
                scale: 1.05,
                ease: 'none',
                scrollTrigger: {
                  trigger: panel,
                  containerAnimation: railTl,
                  start: 'left right',
                  end: 'right left',
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
}

/* ==========================================================================
   6. AMBIENT HEADLINE WAVE (THE WAVE RECIPE)
   ========================================================================== */
function initAmbientWave(chars) {
  if (!chars || chars.length === 0) return;

  const MOVES = [
    // Hop
    (c) => gsap.timeline().to(c, { y: -12, duration: 0.14, ease: 'power2.out', stagger: { each: 0.025, yoyo: true, repeat: 1 } }),
    // Breathe
    (c) => gsap.timeline().to(c, { scale: 1.08, duration: 0.16, ease: 'sine.inOut', stagger: { each: 0.025, yoyo: true, repeat: 1 } }),
    // Lean
    (c) => gsap.timeline().to(c, { rotation: 6, duration: 0.15, ease: 'sine.inOut', stagger: { each: 0.025, yoyo: true, repeat: 1 } }),
    // Flip 360
    (c) => gsap.timeline().to(c, { rotationY: 360, duration: 0.35, ease: 'power2.inOut', stagger: 0.02 }),
    // Shear
    (c) => gsap.timeline().to(c, { skewX: 10, duration: 0.15, ease: 'sine.inOut', stagger: { each: 0.025, yoyo: true, repeat: 1 } }),
    // Squash
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

  // Periodic ambient wave ripple every 4.5 seconds
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
        life: 0.6,
        shrink: true,
        shape: 'spark'
      });
    }
  }

  const blastTl = gsap.timeline({
    onComplete: () => {
      if (modal) modal.classList.add('open');
      // Smoothly restore hero
      setTimeout(() => {
        gsap.to(chars, { x: 0, y: 0, rotation: 0, scale: 1, autoAlpha: 1, duration: 0.8, ease: 'power3.out' });
        gsap.to(subheadWords, { x: 0, y: 0, rotation: 0, autoAlpha: 1, duration: 0.6, ease: 'power3.out' });
        gsap.to(root, { x: 0, y: 0 });
      }, 600);
    }
  });

  // 1. Page Rock
  blastTl.to(root, {
    x: () => gsap.utils.random(-8, 8),
    y: () => gsap.utils.random(-5, 5),
    duration: 0.04,
    repeat: 5,
    yoyo: true,
    ease: 'none'
  }, 0);

  // 2. Chars blast radial outwards
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

  // 3. Subhead words spin down
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

  day1Btn.addEventListener('click', () => {
    day1Btn.classList.add('active');
    day2Btn.classList.remove('active');
    filterRows('1');
  });

  day2Btn.addEventListener('click', () => {
    day2Btn.classList.add('active');
    day1Btn.classList.remove('active');
    filterRows('2');
  });

  function filterRows(day) {
    if (typeof gsap === 'undefined') return;

    gsap.to(rows, {
      autoAlpha: 0,
      y: 6,
      duration: 0.15,
      stagger: 0.02,
      onComplete: () => {
        rows.forEach((row) => {
          const rowDay = row.getAttribute('data-day');
          row.style.display = rowDay === day ? 'grid' : 'none';
        });
        gsap.to(rows, {
          autoAlpha: 1,
          y: 0,
          duration: 0.25,
          stagger: 0.02,
          ease: 'power2.out'
        });
        if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
      }
    });
  }
}

function initModal() {
  const modal = document.getElementById('checkoutModal');
  const closeBtn = document.getElementById('modalCloseBtn');
  const triggerBtns = document.querySelectorAll('[data-open-modal]');

  if (!modal) return;

  triggerBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('open');
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => modal.classList.remove('open'));
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      modal.classList.remove('open');
    }
  });
}
