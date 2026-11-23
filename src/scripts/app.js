/**
 * OFF HOURS — Production Experience Controller
 * Concept: THE CITY DISPATCH
 * Directed via: cinematic-ui v2.8.0
 */

document.addEventListener('DOMContentLoaded', () => {
  initTorch();
  initTimecode();
  initAmbientAudio();
  initTierSelection();
  initScheduleFilter();
  initModal();
  initAnimations();
});

// 1. Ambient Torch Cursor
function initTorch() {
  const torch = document.getElementById('torch');
  if (!torch) return;

  window.addEventListener('mousemove', (e) => {
    torch.style.left = `${e.clientX}px`;
    torch.style.top = `${e.clientY}px`;
  });
}

// 2. Running Nocturnal Timecode (20:00:00 to 06:00:00)
function initTimecode() {
  const tcElement = document.getElementById('timecodeDisplay');
  if (!tcElement) return;

  let totalSeconds = 20 * 3600; // Starts at 20:00:00

  // Scroll advances nocturnal timecode
  window.addEventListener('scroll', () => {
    const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    const nightDuration = 10 * 3600; // 10 hours of festival night
    const currentSeconds = (20 * 3600 + Math.floor(scrollPercent * nightDuration)) % (24 * 3600);

    const hours = Math.floor(currentSeconds / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((currentSeconds % 3600) / 60).toString().padStart(2, '0');
    const seconds = Math.floor(currentSeconds % 60).toString().padStart(2, '0');

    tcElement.textContent = `${hours}:${minutes}:${seconds}`;
  });
}

// 3. Web Audio Subterranean Room Tone (Zero External MP3 Dependency)
let audioCtx = null;
let oscDrone = null;
let gainNode = null;
let isAudioActive = false;

function initAmbientAudio() {
  const audioBtn = document.getElementById('audioToggleBtn');
  if (!audioBtn) return;

  audioBtn.addEventListener('click', () => {
    if (!isAudioActive) {
      startAmbientSound();
      audioBtn.classList.add('active');
      audioBtn.textContent = 'Room Acoustics: Live';
    } else {
      stopAmbientSound();
      audioBtn.classList.remove('active');
      audioBtn.textContent = 'Room Acoustics: Off';
    }
  });
}

function startAmbientSound() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;

    audioCtx = new AudioContext();
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    // Warm sub-bass fundamental (55Hz / A1)
    oscDrone = audioCtx.createOscillator();
    oscDrone.type = 'sine';
    oscDrone.frequency.setValueAtTime(55, audioCtx.currentTime);

    // Warm second harmonic (110Hz)
    const oscHarmonic = audioCtx.createOscillator();
    oscHarmonic.type = 'triangle';
    oscHarmonic.frequency.setValueAtTime(110, audioCtx.currentTime);

    // Lowpass filter for muffled industrial room acoustics
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(180, audioCtx.currentTime);

    gainNode = audioCtx.createGain();
    gainNode.gain.setValueAtTime(0.08, audioCtx.currentTime);

    oscDrone.connect(filter);
    oscHarmonic.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscDrone.start();
    oscHarmonic.start();
    isAudioActive = true;
  } catch (err) {
    console.warn('[OFF HOURS] Web Audio not permitted by browser policy:', err);
  }
}

function stopAmbientSound() {
  if (audioCtx) {
    audioCtx.close();
    audioCtx = null;
    isAudioActive = false;
  }
}

// 4. Pass Tier Selection
let selectedPassTier = {
  name: '48-Hour Full Access Pass',
  price: '€48.00'
};

function initTierSelection() {
  const tierOptions = document.querySelectorAll('.tier-option');
  const passActionBtn = document.getElementById('passActionBtn');

  tierOptions.forEach((option) => {
    option.addEventListener('click', () => {
      tierOptions.forEach((o) => o.classList.remove('active'));
      option.classList.add('active');

      const name = option.dataset.tierName;
      const price = option.dataset.tierPrice;
      selectedPassTier = { name, price };

      if (passActionBtn) {
        passActionBtn.textContent = `Purchase Pass · ${price}`;
      }
    });
  });

  if (passActionBtn) {
    passActionBtn.addEventListener('click', () => {
      openCheckoutModal(selectedPassTier);
    });
  }
}

// 5. Schedule Day Filtering
function initScheduleFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const day = btn.dataset.day;
      updateScheduleDay(day);
    });
  });
}

function updateScheduleDay(day) {
  console.log(`[OFF HOURS] Schedule switched to Night ${day}`);
}

// 6. Modal Checkout
function initModal() {
  const modal = document.getElementById('checkoutModal');
  const closeBtn = document.getElementById('modalCloseBtn');

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('open');
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('open')) {
      modal.classList.remove('open');
    }
  });
}

function openCheckoutModal(tier) {
  const modal = document.getElementById('checkoutModal');
  const modalTierName = document.getElementById('modalTierName');
  const modalTierPrice = document.getElementById('modalTierPrice');

  if (modalTierName && modalTierPrice) {
    modalTierName.textContent = tier.name;
    modalTierPrice.textContent = tier.price;
  }

  if (modal) {
    modal.classList.add('open');
  }
}

// 7. GSAP & ScrollTrigger Animations
function initAnimations() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    console.log('[OFF HOURS] prefers-reduced-motion active. Animations bypassed.');
    return;
  }

  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.warn('[OFF HOURS] GSAP or ScrollTrigger not loaded. Running CSS fallbacks.');
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // Hero Title Staggered Character Reveal
  gsap.from('.hero-title .char', {
    y: 90,
    opacity: 0,
    duration: 1.2,
    stagger: 0.035,
    ease: 'power4.out',
    delay: 0.2
  });

  // Pinned Section 1: The Nocturnal Atlas Zoom (24mm Camera Crane Push)
  const atlasMap = document.getElementById('atlasMap');
  const hudProgress = document.getElementById('hudProgress');

  if (atlasMap && document.getElementById('atlasPin')) {
    gsap.timeline({
      scrollTrigger: {
        trigger: '#atlasPin',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.2,
        pin: '.atlas-viewport',
        onUpdate: (self) => {
          if (hudProgress) {
            hudProgress.style.width = `${self.progress * 100}%`;
          }
        }
      }
    })
    .to('#atlasMap', {
      scale: 3.5,
      transformOrigin: '55% 42%',
      ease: 'power2.inOut'
    })
    .to('.atlas-svg path', {
      strokeWidth: '+=2',
      ease: 'none'
    }, 0);
  }

  // Pinned Section 2: Four Venues Horizontal Architectural Rail (35mm Dolly Track)
  const venuesStrip = document.getElementById('venuesStrip');
  const venuesPin = document.getElementById('venuesPin');

  if (venuesStrip && venuesPin) {
    const totalScrollDistance = () => venuesStrip.scrollWidth - window.innerWidth + (window.innerWidth * 0.12);

    gsap.to(venuesStrip, {
      x: () => -totalScrollDistance(),
      ease: 'none',
      scrollTrigger: {
        trigger: '#venuesPin',
        start: 'top top',
        end: () => `+=${venuesStrip.scrollWidth}`,
        pin: '.venues-track-viewport',
        scrub: 1.2,
        invalidateOnRefresh: true
      }
    });

    // Parallax on cards
    gsap.utils.toArray('.venue-chamber-card').forEach((card) => {
      const cardLeft = card.querySelector('.card-left');
      if (cardLeft) {
        gsap.from(cardLeft, {
          y: 45,
          opacity: 0.65,
          duration: 1,
          scrollTrigger: {
            trigger: card,
            containerAnimation: gsap.getTweensOf(venuesStrip)[0],
            start: 'left center',
            toggleActions: 'play none none reverse'
          }
        });
      }
    });
  }

  // Section 4: Ticket Pass Artifact Elevation
  const ticketPass = document.querySelector('.ticket-pass-artifact');
  if (ticketPass) {
    gsap.from(ticketPass, {
      y: 80,
      opacity: 0,
      duration: 1.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.tickets-section',
        start: 'top 75%'
      }
    });
  }
}
