/**
 * OFF HOURS — Production Motion Engine & Experience Controller
 * Built strictly according to GSAP Official Skills:
 * - gsap-core: transforms, autoAlpha, gsap.matchMedia(), proper eases
 * - gsap-scrolltrigger: pinned containers, containerAnimation, invalidateOnRefresh, Lenis sync
 * - gsap-performance: gsap.quickTo() for 60fps mouse follower, composited transforms
 * - gsap-vanilla: lifecycle, font-ready refresh, clean responsive adaptation
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

// 1. Lenis Smooth Momentum Scroll Engine (Official GSAP ScrollTrigger Integration)
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
    // Notify ScrollTrigger on every scroll event
    lenis.on('scroll', ScrollTrigger.update);

    // Sync Lenis RAF with GSAP ticker
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Disable lag smoothing to prevent visual jumps during heavy RAF
    gsap.ticker.lagSmoothing(0);
  }

  // Velocity-Skew Physics (GPU-composited via transforms)
  let skewTarget = 0;
  let currentSkew = 0;

  lenis.on('scroll', ({ velocity }) => {
    skewTarget = Math.max(-3.5, Math.min(3.5, velocity * 0.12));
  });

  if (typeof gsap !== 'undefined') {
    gsap.ticker.add(() => {
      currentSkew += (skewTarget - currentSkew) * 0.1;
      skewTarget *= 0.88;

      const skewEls = document.querySelectorAll('.velocity-skew');
      if (skewEls.length > 0) {
        gsap.set(skewEls, { skewY: currentSkew });
      }
    });
  }

  return lenis;
}

// 2. High-Performance Follower Cursor via gsap.quickTo() (Official gsap-performance skill)
function initCursorFollower() {
  const dot = document.querySelector('.cursor-dot');
  const follower = document.querySelector('.cursor-follower');
  const label = follower ? follower.querySelector('.cursor-label') : null;
  const torch = document.getElementById('torch');

  if (!dot || !follower) return;

  // Use gsap.quickTo() to completely eliminate layout thrashing
  const setDotX = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power3" });
  const setDotY = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power3" });
  const setFollowerX = gsap.quickTo(follower, "x", { duration: 0.35, ease: "power3" });
  const setFollowerY = gsap.quickTo(follower, "y", { duration: 0.35, ease: "power3" });
  const setTorchX = torch ? gsap.quickTo(torch, "x", { duration: 0.22, ease: "power2" }) : null;
  const setTorchY = torch ? gsap.quickTo(torch, "y", { duration: 0.22, ease: "power2" }) : null;

  window.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;

    setDotX(x);
    setDotY(y);
    setFollowerX(x);
    setFollowerY(y);

    if (setTorchX && setTorchY) {
      setTorchX(x);
      setTorchY(y);
    }
  });

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

// 6. Timetable Schedule Day Switcher (Using autoAlpha to prevent click blocks)
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
      autoAlpha: 0,
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
          autoAlpha: 1,
          y: 0,
          duration: 0.35,
          stagger: 0.03,
          ease: 'power2.out'
        });

        ScrollTrigger.refresh();
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

// 9. Master GSAP ScrollTrigger Choreography (Using matchMedia & context)
function initGSAPTimelines(lenis) {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.warn('GSAP or ScrollTrigger not loaded');
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // Refresh ScrollTrigger when custom fonts (Syne, Space Grotesk) finish rendering
  if (document.fonts) {
    document.fonts.ready.then(() => {
      ScrollTrigger.refresh();
    });
  }

  // 9.1 Hero Headline Line-Mask Reveal
  gsap.fromTo(
    '.mask-line-inner',
    { y: '115%', autoAlpha: 0 },
    {
      y: '0%',
      autoAlpha: 1,
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
      .to('.atlas-layer-bg-grid', {
        scale: 1.6,
        autoAlpha: 0.25,
        ease: 'none'
      }, 0)
      .to('#atlasSchematicMap', {
        scale: 3.4,
        transformOrigin: '52% 46%',
        ease: 'power2.inOut'
      }, 0)
      .to('.atlas-svg path', {
        strokeWidth: '+=2',
        ease: 'none'
      }, 0)
      .from('.atlas-hud', {
        y: 20,
        autoAlpha: 0.6,
        duration: 0.5
      }, 0.2);
  }

  // 9.3 Responsive MatchMedia Setup (Official GSAP Responsive Pattern)
  const mm = gsap.matchMedia();

  // DESKTOP: Horizontal Pinned Parallax Rail (Zero Dead Scroll)
  mm.add('(min-width: 1025px)', () => {
    const venuesStrip = document.getElementById('venuesStrip');
    const venuesPinWrapper = document.getElementById('venuesPin');

    if (venuesStrip && venuesPinWrapper) {
      const panels = gsap.utils.toArray('.venue-chamber-panel');
      const getScrollAmount = () => venuesStrip.scrollWidth - window.innerWidth;

      // Pinned lateral track with exact pixel travel to eliminate empty dead scroll
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

      // Internal Media Parallax inside clipped frames
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

  // TABLET / MOBILE: Vertical Natural Flow with ScrollTrigger Batches
  mm.add('(max-width: 1024px)', () => {
    ScrollTrigger.batch('.venue-chamber-panel', {
      onEnter: (batch) => gsap.fromTo(batch, { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, stagger: 0.15, duration: 0.8, ease: 'power2.out', overwrite: true }),
      start: 'top 85%'
    });
  });

  // 9.4 Physical Pass Card Entrance
  const ticketCard = document.querySelector('.punchcard-ticket-pass');
  if (ticketCard) {
    gsap.from(ticketCard, {
      y: 60,
      autoAlpha: 0,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.tickets-section',
        start: 'top 75%'
      }
    });
  }
}
