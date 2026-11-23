/**
 * OFF HOURS — Avant-Garde Production Controller
 * Directed via: awwwards / cinematic-ui / design-spells
 * Engine: Lenis Smooth Scroll + GSAP ScrollTrigger + Web Audio Room Tone
 */

document.addEventListener('DOMContentLoaded', () => {
  const lenis = initSmoothScroll();
  initCursorFollower();
  initTimecode(lenis);
  initAmbientAudio();
  initHeroMarquee();
  initScheduleSwitcher();
  initPassSelection();
  initModal();
  initGSAPTimelines(lenis);
});

// 1. Lenis Smooth Momentum Scroll Engine (Awwwards 60fps standard)
function initSmoothScroll() {
  if (typeof Lenis === 'undefined') {
    console.warn('Lenis not loaded, falling back to native scroll');
    return null;
  }

  const lenis = new Lenis({
    duration: 1.25,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 0.9,
    touchMultiplier: 1.5,
  });

  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
  }

  // Velocity-Skew Physics: Elements dynamically lean into fast scroll
  let skewTarget = 0;
  let currentSkew = 0;

  lenis.on('scroll', ({ velocity }) => {
    skewTarget = Math.max(-3.5, Math.min(3.5, velocity * 0.12));
  });

  if (typeof gsap !== 'undefined') {
    gsap.ticker.add(() => {
      currentSkew += (skewTarget - currentSkew) * 0.08;
      skewTarget *= 0.88;

      const skewEls = document.querySelectorAll('.velocity-skew');
      if (skewEls.length > 0) {
        gsap.set(skewEls, { skewY: currentSkew });
      }
    });
  }

  return lenis;
}

// 2. Magnetic Follower Cursor with Context HUD (Design Spells)
function initCursorFollower() {
  const dot = document.querySelector('.cursor-dot');
  const follower = document.querySelector('.cursor-follower');
  const label = follower ? follower.querySelector('.cursor-label') : null;
  const torch = document.getElementById('torch');

  if (!dot || !follower) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let followerX = mouseX;
  let followerY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    dot.style.left = `${mouseX}px`;
    dot.style.top = `${mouseY}px`;

    if (torch) {
      torch.style.left = `${mouseX}px`;
      torch.style.top = `${mouseY}px`;
    }
  });

  // Smooth lerp for follower
  function renderCursor() {
    followerX += (mouseX - followerX) * 0.16;
    followerY += (mouseY - followerY) * 0.16;

    follower.style.left = `${followerX}px`;
    follower.style.top = `${followerY}px`;

    requestAnimationFrame(renderCursor);
  }
  requestAnimationFrame(renderCursor);

  // Contextual cursor triggers
  document.querySelectorAll('[data-cursor]').forEach((el) => {
    el.addEventListener('mouseenter', () => {
      const type = el.getAttribute('data-cursor');
      if (type === 'explore') {
        follower.classList.add('is-media');
        if (label) label.textContent = 'EXPLORE';
      } else if (type === 'listen') {
        follower.classList.add('is-hovering');
        if (label) label.textContent = 'LISTEN';
      } else if (type === 'ticket') {
        follower.classList.add('is-media');
        if (label) label.textContent = 'GET PASS';
      } else {
        follower.classList.add('is-hovering');
      }
    });

    el.addEventListener('mouseleave', () => {
      follower.classList.remove('is-hovering', 'is-media');
      if (label) label.textContent = '';
    });
  });

  // Standard interactive links
  document.querySelectorAll('a, button, input').forEach((el) => {
    if (!el.hasAttribute('data-cursor')) {
      el.addEventListener('mouseenter', () => follower.classList.add('is-hovering'));
      el.addEventListener('mouseleave', () => follower.classList.remove('is-hovering'));
    }
  });
}

// 3. Scrubbed Nocturnal Timecode (20:00:00 to 06:00:00)
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

  if (lenis) {
    lenis.on('scroll', update);
  } else {
    window.addEventListener('scroll', update);
  }
}

// 4. Subterranean Web Audio Room Tone (55Hz / A1 Fundamental)
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
      btn.innerHTML = '<span>ACOUSTICS: LIVE 55Hz</span>';
      isAudioActive = true;
    } else {
      stopDrone();
      btn.classList.remove('active');
      btn.innerHTML = '<span>ROOM ACOUSTICS: OFF</span>';
      isAudioActive = false;
    }
  });
}

function startDrone() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;

    audioCtx = new AudioContext();
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    // 55Hz Sub-Bass Fundamental (A1)
    oscDrone = audioCtx.createOscillator();
    oscDrone.type = 'sine';
    oscDrone.frequency.setValueAtTime(55, audioCtx.currentTime);

    // Warm Second Harmonic (110Hz)
    oscHarmonic = audioCtx.createOscillator();
    oscHarmonic.type = 'triangle';
    oscHarmonic.frequency.setValueAtTime(110, audioCtx.currentTime);

    // Lowpass filter replicating vast concrete chamber acoustics
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(160, audioCtx.currentTime);

    gainNode = audioCtx.createGain();
    gainNode.gain.setValueAtTime(0.08, audioCtx.currentTime);

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

// 5. Kinetic Marquee Tape Ticker
function initHeroMarquee() {
  const track = document.querySelector('.marquee-track');
  if (!track || typeof gsap === 'undefined') return;

  gsap.to(track, {
    xPercent: -50,
    repeat: -1,
    duration: 32,
    ease: 'none'
  });
}

// 6. Timetable Schedule Day Switcher
function initScheduleSwitcher() {
  const day1Btn = document.getElementById('day1Btn');
  const day2Btn = document.getElementById('day2Btn');
  const slots = document.querySelectorAll('.time-slot-row');

  if (!day1Btn || !day2Btn) return;

  day1Btn.addEventListener('click', () => {
    day1Btn.classList.add('active');
    day2Btn.classList.remove('active');
    filterSlots('day1');
  });

  day2Btn.addEventListener('click', () => {
    day2Btn.classList.add('active');
    day1Btn.classList.remove('active');
    filterSlots('day2');
  });

  function filterSlots(day) {
    if (typeof gsap === 'undefined') return;

    gsap.to(slots, {
      opacity: 0,
      y: 10,
      duration: 0.2,
      stagger: 0.02,
      onComplete: () => {
        slots.forEach((row) => {
          if (day === 'day1') {
            const isDay1 = row.getAttribute('data-day') === '1';
            row.style.display = isDay1 ? 'grid' : 'none';
          } else {
            const isDay2 = row.getAttribute('data-day') === '2';
            row.style.display = isDay2 ? 'grid' : 'none';
          }
        });

        gsap.to(slots, {
          opacity: 1,
          y: 0,
          duration: 0.35,
          stagger: 0.03,
          ease: 'power2.out'
        });
      }
    });
  }
}

// 7. Pass Tier Selection
function initPassSelection() {
  const choices = document.querySelectorAll('.tier-choice');
  const ctaBtn = document.getElementById('passCtaAction');

  choices.forEach((choice) => {
    choice.addEventListener('click', () => {
      choices.forEach((c) => c.classList.remove('active'));
      choice.classList.add('active');

      const price = choice.getAttribute('data-price');
      const tierName = choice.getAttribute('data-tier');

      if (ctaBtn) {
        ctaBtn.textContent = `Reserve ${tierName} · €${price}`;
      }
    });
  });
}

// 8. Pass Checkout Modal
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

// 9. Master GSAP ScrollTrigger Choreography (Award Standard)
function initGSAPTimelines(lenis) {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.warn('GSAP or ScrollTrigger not loaded');
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // 9.1 Hero Headline Line-Mask Reveal
  gsap.fromTo(
    '.mask-line-inner',
    { y: '115%', opacity: 0 },
    {
      y: '0%',
      opacity: 1,
      duration: 1.4,
      stagger: 0.12,
      ease: 'power4.out',
      delay: 0.15
    }
  );

  // 9.2 Scene 02: Pinned 2.5D Camera Descent into the Nocturnal Atlas
  const atlasWrapper = document.getElementById('atlasPin');
  if (atlasWrapper) {
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
      // Background Grid blurs & pushes back
      .to('.atlas-layer-bg-grid', {
        scale: 1.6,
        opacity: 0.15,
        ease: 'none'
      }, 0)
      // Schematic Map zooms into the central river-and-rail corridor (Kraftwerk depth)
      .to('#atlasSchematicMap', {
        scale: 3.4,
        transformOrigin: '52% 46%',
        ease: 'power2.inOut'
      }, 0)
      // River spine strokes expand with optical proximity
      .to('.atlas-svg path', {
        strokeWidth: '+=2',
        ease: 'none'
      }, 0)
      // Foreground reticle fades in as camera locks
      .from('.atlas-hud', {
        y: 20,
        opacity: 0.8,
        duration: 0.5
      }, 0.2);
  }

  // 9.3 Scene 03: Pinned Four Civic Spaces Full-Viewport Lateral Parallax Rail
  const venuesStrip = document.getElementById('venuesStrip');
  const venuesPinWrapper = document.getElementById('venuesPin');

  if (venuesStrip && venuesPinWrapper) {
    const panels = gsap.utils.toArray('.venue-chamber-panel');
    const totalPanels = panels.length;

    // Lateral translate
    const railTl = gsap.to(venuesStrip, {
      xPercent: -100 * (totalPanels - 1),
      ease: 'none',
      scrollTrigger: {
        trigger: '#venuesPin',
        start: 'top top',
        end: () => `+=${window.innerWidth * (totalPanels - 0.5)}`,
        pin: '.venues-track-viewport',
        scrub: 1.2,
        invalidateOnRefresh: true
      }
    });

    // Sub-Parallax: Images translate internally inside their clipped frames
    panels.forEach((panel) => {
      const img = panel.querySelector('.media-parallax-img');
      if (img) {
        gsap.fromTo(
          img,
          { xPercent: 12, scale: 1.2 },
          {
            xPercent: -12,
            scale: 1.08,
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

  // 9.4 Physical Pass Card Elevate
  const ticketCard = document.querySelector('.punchcard-ticket-pass');
  if (ticketCard) {
    gsap.from(ticketCard, {
      y: 80,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.tickets-section',
        start: 'top 75%'
      }
    });
  }
}
