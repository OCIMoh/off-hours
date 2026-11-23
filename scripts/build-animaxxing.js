const fs = require('fs');
const path = require('path');

const projectDir = path.resolve(__dirname, '..');
const indexPath = path.join(projectDir, 'index.html');
const cssPath = path.join(projectDir, 'src', 'styles', 'main.css');
const jsPath = path.join(projectDir, 'src', 'scripts', 'app.js');

const css = fs.readFileSync(cssPath, 'utf8');
const js = fs.readFileSync(jsPath, 'utf8');

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>OFF HOURS — Independent Nocturnal Culture Festival</title>
  <meta name="description" content="OFF HOURS is an independent culture festival reactivating four overlooked spaces across an old river-and-rail city for two nights.">

  <!-- Curated Animaxxing Typography: Variable Rethink Sans (400-800) & JetBrains Mono (100-800) -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&family=Rethink+Sans:ital,wght@0,400..800;1,400..800&display=swap" rel="stylesheet">

  <!-- Lenis Smooth Scroll Engine -->
  <script src="https://unpkg.com/lenis@1.1.18/dist/lenis.min.js"></script>

  <!-- GSAP 3, ScrollTrigger & CustomEase (Signature Animaxxing Motion) -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/CustomEase.min.js"></script>

  <!-- Production Inlined Styles -->
  <style>
${css}
  </style>
</head>
<body>

  <!-- Top Terracotta Scroll Progress Hairline Indicator -->
  <div class="scroll-progress-line" id="scrollProgressBar" aria-hidden="true"></div>

  <!-- Sticky Header Strip (Site Chrome) -->
  <header class="sticky-strip">
    <div class="strip-row">
      <a href="#hero" class="wordmark">
        off hours
        <span class="wordmark-underline"></span>
      </a>

      <nav class="strip-nav" aria-label="Section Navigation">
        <a href="#atlas">01 / Atlas</a>
        <a href="#venuesPin">02 / Spaces</a>
        <a href="#schedule">03 / Timetable</a>
        <a href="#passes">04 / Passes</a>
      </nav>

      <div class="strip-meta">
        <span class="timecode-figure" id="timecodeDisplay">
          <span class="timecode-dot" aria-hidden="true"></span>
          20:00:00
        </span>
        <button class="audio-toggle-btn" id="audioToggleBtn" aria-label="Toggle 55Hz subterranean room tone">ROOM TONE</button>
        <button class="small-chip" data-open-modal>GET PASS</button>
      </div>
    </div>
  </header>

  <main class="page-main">

    <!-- ======================================================================
         SCENE 01: HERO BROADSHEET POSTER (PROPORTIONAL 100VH ASYMMETRICAL GRID)
         ====================================================================== -->
    <section class="hero" id="hero" aria-label="Festival Broadside">
      <div>
        <div class="hero-pretitle-strip">
          <span class="mono-label">DISPATCH 004 · NOCTURNAL DOSSIER · VOL 01</span>
          <span class="figure">OCTOBER 24–25 · 20:00 — 06:00 · RIVER &amp; RAIL CORRIDOR</span>
        </div>

        <!-- Hero Main Broadsheet Block -->
        <div class="hero-main-block">
          <div class="hero-title-wrap">
            <h1 class="poster poster-align-ink hero-title" id="heroHeadline">
              OFF HOURS CULTURE FOUR CIVIC SPACES
            </h1>
          </div>

          <p class="hero-subhead" id="heroSubhead">
            An independent nocturnal culture festival reactivating four overlooked civic environments across an old river-and-rail city for two transformative nights.
          </p>

          <!-- Particle-Assembled Calls to Action -->
          <div class="hero-actions-row">
            <!-- Primary CTA: Reactor (Solid Button with Terracotta Rising Embers) -->
            <div class="particle-btn-wrapper particle-layer-under" data-particle-reactor>
              <canvas aria-hidden="true"></canvas>
              <button class="button-solid" id="passCtaAction" data-open-modal>
                ENTER ARCHIVE / PASS
              </button>
            </div>

            <!-- Secondary CTA: Marquee (Outline Button with Ochre Chasing Lights) -->
            <div class="particle-btn-wrapper particle-layer-over" data-particle-marquee>
              <canvas aria-hidden="true"></canvas>
              <a href="#venuesPin" class="button-outline">
                EXPLORE SPACES
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Kinetic Marquee Ticker Tape -->
      <div class="kinetic-marquee-bar" aria-hidden="true">
        <div class="marquee-track">
          <div class="marquee-item"><span>OCT 24—25</span><span class="sep">✶</span><span>4 CIVIC SPACES</span><span class="sep">✶</span><span>24 SESSIONS</span><span class="sep">✶</span><span>SUBTERRANEAN 55HZ ACOUSTICS</span><span class="sep">✶</span><span>35MM CELLULOID PROJECTION</span><span class="sep">✶</span><span>NIGHT MARKET HUB</span><span class="sep">✶</span><span>NO REPEAT TIMETABLES</span></div>
          <div class="marquee-item"><span>OCT 24—25</span><span class="sep">✶</span><span>4 CIVIC SPACES</span><span class="sep">✶</span><span>24 SESSIONS</span><span class="sep">✶</span><span>SUBTERRANEAN 55HZ ACOUSTICS</span><span class="sep">✶</span><span>35MM CELLULOID PROJECTION</span><span class="sep">✶</span><span>NIGHT MARKET HUB</span><span class="sep">✶</span><span>NO REPEAT TIMETABLES</span></div>
        </div>
      </div>

      <!-- Hero Bottom Architectural Ledger Baseline -->
      <div class="hero-bottom-grid">
        <p class="body-copy">
          Occupying an abandoned 1912 tram maintenance hangar, tiled municipal bathhouse basements, an all-night rail market, and a decommissioned letterpress printworks.
        </p>

        <div class="hero-spec-ledger">
          <div><strong>LOCATION:</strong> Central River &amp; Rail Corridor</div>
          <div><strong>DATES:</strong> Friday Oct 24 &amp; Saturday Oct 25</div>
          <div><strong>HOURS:</strong> 20:00 — 06:00 Both Nights</div>
        </div>

        <div class="scroll-cue-box">
          <span>DESCENT</span>
          <div class="scroll-indicator-line"></div>
        </div>
      </div>
    </section>

    <!-- ======================================================================
         SCENE 02: THE NOCTURNAL ATLAS (SCROLL-ACTIVATED CIVIC NODES)
         ====================================================================== -->
    <section class="atlas-pin-wrapper" id="atlasPin" aria-label="The Nocturnal Atlas">
      <div class="atlas-viewport" id="atlas">
        
        <!-- HUD Telemetry Header -->
        <div class="atlas-hud">
          <div class="atlas-hud-info">
            <span class="mono-label">NOCTURNAL ATLAS · RECONNAISSANCE</span>
            <span class="mono-note">Coordinates: 53°32′N 09°59′E · Central River &amp; Rail Corridor</span>
          </div>

          <!-- Interactive Node Navigator Tabs -->
          <div class="atlas-hud-nav" role="tablist" aria-label="Civic Space Nodes">
            <button class="atlas-nav-tab is-active" data-atlas-index="0" role="tab" aria-selected="true">01 TRAM DEPOT</button>
            <button class="atlas-nav-tab" data-atlas-index="1" role="tab" aria-selected="false">02 BATHS</button>
            <button class="atlas-nav-tab" data-atlas-index="2" role="tab" aria-selected="false">03 MARKET</button>
            <button class="atlas-nav-tab" data-atlas-index="3" role="tab" aria-selected="false">04 PRINTWORKS</button>
          </div>

          <div class="atlas-hud-status">
            <span class="mono-note" id="atlasNodeCounter">NODE 01 / 04 ACTIVE</span>
            <div class="atlas-hud-progress">
              <div class="atlas-hud-fill" id="atlasHudFill"></div>
            </div>
          </div>
        </div>

        <!-- Main Workspace: Map Canvas + Dossier Deck -->
        <div class="atlas-workspace">
          
          <!-- Left: Schematic Corridor Map (Stable 1:1 scale, zero zoom jitter) -->
          <div class="atlas-map-stage" id="atlasMapStage">
            <div class="atlas-layer-bg-grid" aria-hidden="true"></div>

            <svg class="atlas-svg" viewBox="0 0 1400 800" aria-label="Schematic River &amp; Rail Map">
              <!-- River Spine in Gruvbox Teal -->
              <path class="river river-bg" d="M-100,550 C300,520 450,380 750,340 C1050,300 1200,180 1500,150" 
                    stroke-width="32" stroke-linecap="round" fill="none" opacity="0.15"/>
              <path class="river river-line" id="atlasRiverLine" d="M-100,550 C300,520 450,380 750,340 C1050,300 1200,180 1500,150" 
                    stroke-width="6" stroke-linecap="round" fill="none" opacity="0.8"/>

              <!-- Rail Freight Sidings -->
              <path d="M50,850 L450,420 L1050,420 L1450,80" stroke="var(--text)" stroke-width="1.5" stroke-dasharray="10 8" fill="none" opacity="0.35"/>
              <path d="M450,420 L700,700 L1300,700" stroke="var(--text)" stroke-width="1.5" stroke-dasharray="8 6" fill="none" opacity="0.25"/>
              <path d="M200,80 L400,280 L900,240" stroke="var(--text)" stroke-width="1.5" stroke-dasharray="8 6" fill="none" opacity="0.25"/>

              <!-- Reference Grid Lines -->
              <line x1="0" y1="200" x2="1400" y2="200" stroke="var(--border-hairline)" stroke-width="1"/>
              <line x1="0" y1="400" x2="1400" y2="400" stroke="var(--border-hairline)" stroke-width="1"/>
              <line x1="0" y1="600" x2="1400" y2="600" stroke="var(--border-hairline)" stroke-width="1"/>
              <line x1="350" y1="0" x2="350" y2="800" stroke="var(--border-hairline)" stroke-width="1"/>
              <line x1="700" y1="0" x2="700" y2="800" stroke="var(--border-hairline)" stroke-width="1"/>
              <line x1="1050" y1="0" x2="1050" y2="800" stroke="var(--border-hairline)" stroke-width="1"/>

              <!-- Four Civic Nodes in Terracotta & Ochre (Zero scale CSS hover to avoid jitter) -->
              <!-- Node 01: Tram Depot -->
              <g class="map-node is-active" id="mapNode0" data-node="0" transform="translate(380, 420)">
                <circle class="radar-ring" r="32" />
                <circle class="radar-core" r="8" fill="var(--tungsten)" />
                <circle r="3" fill="#fdfcf9" />
                <text x="16" y="5" class="node-title">01 TRAM DEPOT</text>
                <text x="16" y="19" class="node-sub">TRANSIT · 108dB SUB-BASS</text>
              </g>

              <!-- Node 02: Municipal Baths -->
              <g class="map-node" id="mapNode1" data-node="1" transform="translate(760, 310)">
                <circle class="radar-ring" r="32" />
                <circle class="radar-core" r="8" fill="var(--tungsten)" />
                <circle r="3" fill="#fdfcf9" />
                <text x="16" y="5" class="node-title">02 MUNICIPAL BATHS</text>
                <text x="16" y="19" class="node-sub">RECREATION · 7.2s ECHO</text>
              </g>

              <!-- Node 03: Night Market -->
              <g class="map-node" id="mapNode2" data-node="2" transform="translate(680, 680)">
                <circle class="radar-ring" r="32" />
                <circle class="radar-core" r="8" fill="var(--tungsten)" />
                <circle r="3" fill="#fdfcf9" />
                <text x="16" y="5" class="node-title">03 NIGHT MARKET</text>
                <text x="16" y="19" class="node-sub">COMMERCE · SOCIAL HUB</text>
              </g>

              <!-- Node 04: Printing Works -->
              <g class="map-node" id="mapNode3" data-node="3" transform="translate(1080, 480)">
                <circle class="radar-ring" r="32" />
                <circle class="radar-core" r="8" fill="var(--tungsten)" />
                <circle r="3" fill="#fdfcf9" />
                <text x="16" y="5" class="node-title">04 PRINTING WORKS</text>
                <text x="16" y="19" class="node-sub">COMMUNICATION · 35MM CINEMA</text>
              </g>
            </svg>
          </div>

          <!-- Right: Active Dossier Deck (Opened sequentially on scroll) -->
          <aside class="atlas-dossier-deck" aria-label="Civic Space Dossiers">
            
            <!-- Card 01 -->
            <div class="dossier-card is-active" id="dossierCard0" data-card="0">
              <div class="dossier-card-tag">
                <span class="tag-num">NODE 01 / 04</span>
                <span class="tag-status">ACTIVATED</span>
              </div>
              <h3 class="dossier-card-title">THE OLD TRAM DEPOT</h3>
              <p class="dossier-card-copy">
                A monumental 1912 maintenance hangar with exposed steel riveted trusses, concrete oil pits, and transit track turnouts. Intimate crowd proximity meets visceral sub-bass resonance.
              </p>
              <div class="dossier-specs-mini">
                <div><span>LAYER</span><strong>Transit Infrastructure</strong></div>
                <div><span>CAPACITY</span><strong>800 Persons</strong></div>
                <div><span>ACOUSTIC</span><strong>108 dB Sub-bass Peak</strong></div>
                <div><span>HOURS</span><strong>21:00 — 05:30</strong></div>
              </div>
              <a href="#venuesPin" class="dossier-action-btn">
                <span>INSPECT CHAMBER 01 DOSSIER</span>
                <span>→</span>
              </a>
            </div>

            <!-- Card 02 -->
            <div class="dossier-card" id="dossierCard1" data-card="1">
              <div class="dossier-card-tag">
                <span class="tag-num">NODE 02 / 04</span>
                <span class="tag-status">STANDBY</span>
              </div>
              <h3 class="dossier-card-title">THE MUNICIPAL BATHS</h3>
              <p class="dossier-card-copy">
                Drained 1928 ceramic-tiled hydrotherapy natatorium with barrel-vaulted skylights and dry mosaic diving wells. A cathedral for quadraphonic ambient diffusion and microtonal voice.
              </p>
              <div class="dossier-specs-mini">
                <div><span>LAYER</span><strong>Civic Hydrotherapy</strong></div>
                <div><span>CAPACITY</span><strong>450 Persons</strong></div>
                <div><span>ACOUSTIC</span><strong>7.2s Ceramic Reverb</strong></div>
                <div><span>HOURS</span><strong>20:30 — 05:00</strong></div>
              </div>
              <a href="#venuesPin" class="dossier-action-btn">
                <span>INSPECT CHAMBER 02 DOSSIER</span>
                <span>→</span>
              </a>
            </div>

            <!-- Card 03 -->
            <div class="dossier-card" id="dossierCard2" data-card="2">
              <div class="dossier-card-tag">
                <span class="tag-num">NODE 03 / 04</span>
                <span class="tag-status">STANDBY</span>
              </div>
              <h3 class="dossier-card-title">THE NIGHT MARKET</h3>
              <p class="dossier-card-copy">
                A cavernous iron-and-glass transit exchange hall active continuously through dark hours. The social vortex hosting regional street kitchens, vinyl stalls, and modular drone installations.
              </p>
              <div class="dossier-specs-mini">
                <div><span>LAYER</span><strong>Nocturnal Commerce</strong></div>
                <div><span>CAPACITY</span><strong>1200 Persons</strong></div>
                <div><span>ACOUSTIC</span><strong>Wide Open Dispersion</strong></div>
                <div><span>HOURS</span><strong>20:00 — 06:00</strong></div>
              </div>
              <a href="#venuesPin" class="dossier-action-btn">
                <span>INSPECT CHAMBER 03 DOSSIER</span>
                <span>→</span>
              </a>
            </div>

            <!-- Card 04 -->
            <div class="dossier-card" id="dossierCard3" data-card="3">
              <div class="dossier-card-tag">
                <span class="tag-num">NODE 04 / 04</span>
                <span class="tag-status">STANDBY</span>
              </div>
              <h3 class="dossier-card-title">THE OLD PRINTWORKS</h3>
              <p class="dossier-card-copy">
                A former newspaper press warehouse with double-height ceiling voids, heavy linotype cast-iron bedplates, and darkroom masonry. Dedicated to dual 35mm celluloid projections.
              </p>
              <div class="dossier-specs-mini">
                <div><span>LAYER</span><strong>Print Communication</strong></div>
                <div><span>CAPACITY</span><strong>500 Persons</strong></div>
                <div><span>ACOUSTIC</span><strong>Dry Mechanical Damp</strong></div>
                <div><span>HOURS</span><strong>21:30 — 05:00</strong></div>
              </div>
              <a href="#venuesPin" class="dossier-action-btn">
                <span>INSPECT CHAMBER 04 DOSSIER</span>
                <span>→</span>
              </a>
            </div>

          </aside>
        </div>

      </div>
    </section>

    <!-- ======================================================================
         SCENE 03: FOUR CIVIC SPACES (ROOT FULL-WIDTH PINNED LATERAL RAIL)
         ====================================================================== -->
    <section class="venues-pin-wrapper" id="venuesPin" aria-label="The Four Spaces Dossier">
      <div class="venues-track-viewport">
        <div class="venues-horizontal-strip" id="venuesStrip">

          <!-- CHAMBER 01: THE OLD TRAM DEPOT -->
          <article class="venue-chamber-panel">
            <div class="chamber-editorial-side">
              <div>
                <div class="chamber-eyebrow-strip">
                  <span>DISPATCH 01</span>
                  <span>·</span>
                  <span>CIVIC LAYER: TRANSIT</span>
                  <span>·</span>
                  <span>CAPACITY: 800</span>
                </div>

                <h2 class="chamber-title-massive">01 / THE OLD TRAM DEPOT</h2>

                <p class="chamber-description">
                  A monumental 1912 maintenance hangar with exposed steel riveted trusses, concrete oil-stained pits, and the original municipal transit track turnouts. Intimate crowd proximity meets visceral sub-bass resonance.
                </p>

                <div class="acoustic-signature-card">
                  <div class="acoustic-signature-info">
                    <span class="label">Acoustic Signature</span>
                    <span class="val">108 dB Peak Resonance · 45Hz Low Cut</span>
                  </div>
                  <div class="acoustic-waveform" aria-hidden="true">
                    <div class="waveform-bar"></div>
                    <div class="waveform-bar"></div>
                    <div class="waveform-bar"></div>
                    <div class="waveform-bar"></div>
                    <div class="waveform-bar"></div>
                    <div class="waveform-bar"></div>
                    <div class="waveform-bar"></div>
                  </div>
                </div>
              </div>

              <div class="sensory-specs-table">
                <div class="spec-entry"><span class="spec-k">Acoustics</span><span class="spec-v">Raw concrete reverb, sub-bass resonance</span></div>
                <div class="spec-entry"><span class="spec-k">Lighting</span><span class="spec-v">Low sodium pools, single beam sweep</span></div>
                <div class="spec-entry"><span class="spec-k">Materials</span><span class="spec-v">Rivet steel, concrete, rail switches</span></div>
                <div class="spec-entry"><span class="spec-k">Hours</span><span class="spec-v">21:00 — 05:30 (Both Nights)</span></div>
              </div>
            </div>

            <div class="chamber-media-side">
              <div class="media-frame-clipped">
                <img class="media-parallax-img" 
                     width="1200" height="800"
                     loading="eager" decoding="async"
                     src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1200&q=80" 
                     alt="Monochrome Industrial Hangar Interior with Concrete Columns"
                     onerror="this.onerror=null; this.style.opacity='0';" />
              </div>
              <div class="media-caption-strip">
                <span>SECTOR: SOUTHERN SIDINGS</span>
                <span class="figure">53°32′14″N 09°59′02″E</span>
              </div>
              <div class="chamber-curation-list">
                <div class="curation-title">FEATURED ARTISTS &amp; SESSIONS</div>
                <div class="artist-row"><span class="name">Kattner &amp; Siding Ensemble</span><span class="discipline">Analog Percussion</span><span class="time">22:30</span></div>
                <div class="artist-row"><span class="name">Resonance Corridor</span><span class="discipline">Post-Punk Trio</span><span class="time">00:45</span></div>
                <div class="artist-row"><span class="name">Null Hypothesis</span><span class="discipline">Modular Feedback</span><span class="time">02:30</span></div>
              </div>
            </div>
          </article>

          <!-- CHAMBER 02: THE MUNICIPAL BATHS -->
          <article class="venue-chamber-panel">
            <div class="chamber-editorial-side">
              <div>
                <div class="chamber-eyebrow-strip">
                  <span>DISPATCH 02</span>
                  <span>·</span>
                  <span>CIVIC LAYER: RECREATION</span>
                  <span>·</span>
                  <span>CAPACITY: 450</span>
                </div>

                <h2 class="chamber-title-massive">02 / THE MUNICIPAL BATHS</h2>

                <p class="chamber-description">
                  Drained 1928 ceramic-tiled hydrotherapy natatorium with barrel-vaulted skylights, dry mosaic diving wells, and copper piping conduits. A cathedral for quadraphonic ambient diffusion and microtonal voice.
                </p>

                <div class="acoustic-signature-card">
                  <div class="acoustic-signature-info">
                    <span class="label">Acoustic Signature</span>
                    <span class="val">7.2s Natural Ceramic Reverb Decay</span>
                  </div>
                  <div class="acoustic-waveform" aria-hidden="true">
                    <div class="waveform-bar"></div>
                    <div class="waveform-bar"></div>
                    <div class="waveform-bar"></div>
                    <div class="waveform-bar"></div>
                    <div class="waveform-bar"></div>
                    <div class="waveform-bar"></div>
                    <div class="waveform-bar"></div>
                  </div>
                </div>
              </div>

              <div class="sensory-specs-table">
                <div class="spec-entry"><span class="spec-k">Acoustics</span><span class="spec-v">Extreme tiled reverberation, cavernous slapback</span></div>
                <div class="spec-entry"><span class="spec-k">Lighting</span><span class="spec-v">Filtered water refractions, mercury vapour</span></div>
                <div class="spec-entry"><span class="spec-k">Materials</span><span class="spec-v">Glazed porcelain tile, brass drains, mosaic</span></div>
                <div class="spec-entry"><span class="spec-k">Hours</span><span class="spec-v">20:30 — 05:00 (Both Nights)</span></div>
              </div>
            </div>

            <div class="chamber-media-side">
              <div class="media-frame-clipped">
                <img class="media-parallax-img" 
                     width="1200" height="800"
                     loading="eager" decoding="async"
                     src="https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=1200&q=80" 
                     alt="Drained Tiled Bathhouse Interior with Vaulted Ceilings"
                     onerror="this.onerror=null; this.style.opacity='0';" />
              </div>
              <div class="media-caption-strip">
                <span>SECTOR: DEEP BASIN BASINWELL</span>
                <span class="figure">53°32′41″N 09°59′34″E</span>
              </div>
              <div class="chamber-curation-list">
                <div class="curation-title">FEATURED ARTISTS &amp; SESSIONS</div>
                <div class="artist-row"><span class="name">Vapour Phase</span><span class="discipline">Hydro-Tape Loops</span><span class="time">20:30</span></div>
                <div class="artist-row"><span class="name">Submerged Tones</span><span class="discipline">Water Sine Drift</span><span class="time">03:30</span></div>
              </div>
            </div>
          </article>

          <!-- CHAMBER 03: THE NIGHT MARKET -->
          <article class="venue-chamber-panel">
            <div class="chamber-editorial-side">
              <div>
                <div class="chamber-eyebrow-strip">
                  <span>DISPATCH 03</span>
                  <span>·</span>
                  <span>CIVIC LAYER: COMMERCE</span>
                  <span>·</span>
                  <span>CAPACITY: 1200</span>
                </div>

                <h2 class="chamber-title-massive">03 / THE NIGHT MARKET</h2>

                <p class="chamber-description">
                  A cavernous iron-and-glass transit exchange hall active continuously through the dark hours. The social vortex of the festival hosting regional street kitchens, vinyl stalls, and modular drone installations.
                </p>

                <div class="acoustic-signature-card">
                  <div class="acoustic-signature-info">
                    <span class="label">Acoustic Signature</span>
                    <span class="val">Wide Stereo Dispersion · Warm Air Absorption</span>
                  </div>
                  <div class="acoustic-waveform" aria-hidden="true">
                    <div class="waveform-bar"></div>
                    <div class="waveform-bar"></div>
                    <div class="waveform-bar"></div>
                    <div class="waveform-bar"></div>
                    <div class="waveform-bar"></div>
                    <div class="waveform-bar"></div>
                    <div class="waveform-bar"></div>
                  </div>
                </div>
              </div>

              <div class="sensory-specs-table">
                <div class="spec-entry"><span class="spec-k">Acoustics</span><span class="spec-v">Open air diffusion, dense crowd murmur</span></div>
                <div class="spec-entry"><span class="spec-k">Atmosphere</span><span class="spec-v">Wood smoke, fermented citrus, damp rain</span></div>
                <div class="spec-entry"><span class="spec-k">Curation</span><span class="spec-v">Independent micro-stalls &amp; sound stations</span></div>
                <div class="spec-entry"><span class="spec-k">Hours</span><span class="spec-v">20:00 — 06:00 (All Night)</span></div>
              </div>
            </div>

            <div class="chamber-media-side">
              <div class="media-frame-clipped">
                <img class="media-parallax-img" 
                     width="1200" height="800"
                     loading="eager" decoding="async"
                     src="https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1200&q=80" 
                     alt="Nocturnal City Market with Lantern Glow and Shadow Figures"
                     onerror="this.onerror=null; this.style.opacity='0';" />
              </div>
              <div class="media-caption-strip">
                <span>SECTOR: VIADUCT CONCOURSE</span>
                <span class="figure">53°31′58″N 09°58′48″E</span>
              </div>
              <div class="chamber-curation-list">
                <div class="curation-title">FEATURED ARTISTS &amp; SESSIONS</div>
                <div class="artist-row"><span class="name">Market Drone Trio</span><span class="discipline">Accordion &amp; Harmonium</span><span class="time">23:15</span></div>
                <div class="artist-row"><span class="name">Dawn Chorus Group</span><span class="discipline">Acoustic Welcome</span><span class="time">05:00</span></div>
              </div>
            </div>
          </article>

          <!-- CHAMBER 04: THE OLD PRINTING WORKS -->
          <article class="venue-chamber-panel">
            <div class="chamber-editorial-side">
              <div>
                <div class="chamber-eyebrow-strip">
                  <span>DISPATCH 04</span>
                  <span>·</span>
                  <span>CIVIC LAYER: COMMUNICATION</span>
                  <span>·</span>
                  <span>CAPACITY: 500</span>
                </div>

                <h2 class="chamber-title-massive">04 / THE OLD PRINTWORKS</h2>

                <p class="chamber-description">
                  A former newspaper press warehouse with double-height ceiling voids, heavy linotype cast-iron bedplates, and darkroom chambers. Dedicated to expanded cinema, dual 35mm optical projections, and live mechanical tape loop composition.
                </p>

                <div class="acoustic-signature-card">
                  <div class="acoustic-signature-info">
                    <span class="label">Acoustic Signature</span>
                    <span class="val">Dry Absorption · Heavy Machinery Rhythmic Damp</span>
                  </div>
                  <div class="acoustic-waveform" aria-hidden="true">
                    <div class="waveform-bar"></div>
                    <div class="waveform-bar"></div>
                    <div class="waveform-bar"></div>
                    <div class="waveform-bar"></div>
                    <div class="waveform-bar"></div>
                    <div class="waveform-bar"></div>
                    <div class="waveform-bar"></div>
                  </div>
                </div>
              </div>

              <div class="sensory-specs-table">
                <div class="spec-entry"><span class="spec-k">Acoustics</span><span class="spec-v">Dry industrial damp, high mechanical clarity</span></div>
                <div class="spec-entry"><span class="spec-k">Visual Media</span><span class="spec-v">Dual 35mm celluloid projections, tungsten lamps</span></div>
                <div class="spec-entry"><span class="spec-k">Materials</span><span class="spec-v">Letterpress machinery, darkroom masonry</span></div>
                <div class="spec-entry"><span class="spec-k">Hours</span><span class="spec-v">21:30 — 05:00 (Both Nights)</span></div>
              </div>
            </div>

            <div class="chamber-media-side">
              <div class="media-frame-clipped">
                <img class="media-parallax-img" 
                     width="1200" height="800"
                     loading="eager" decoding="async"
                     src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80" 
                     alt="Monochrome Industrial Printing Facility with Riveted Columns"
                     onerror="this.onerror=null; this.style.opacity='0';" />
              </div>
              <div class="media-caption-strip">
                <span>SECTOR: ROTARY PRESS ROOM</span>
                <span class="figure">53°32′29″N 10°00′12″E</span>
              </div>
              <div class="chamber-curation-list">
                <div class="curation-title">FEATURED ARTISTS &amp; SESSIONS</div>
                <div class="artist-row"><span class="name">Celluloid Dispersal</span><span class="discipline">35mm Projection</span><span class="time">23:30</span></div>
                <div class="artist-row"><span class="name">Rotational Press Audio</span><span class="discipline">Tape Loop Rig</span><span class="time">21:00</span></div>
                <div class="artist-row"><span class="name">Monotype Live Assembly</span><span class="discipline">Typewriter Noise</span><span class="time">01:30</span></div>
              </div>
            </div>
          </article>

        </div>
      </div>
    </section>

    <!-- ======================================================================
         EDITORIAL CHAPTER SECTIONS: TIMETABLE & PASSES (IN 12-COL CONTAINER)
         ====================================================================== -->
    <div class="chapter-container">
      
      <!-- Sticky Vertical Chapters Rail -->
      <aside class="chapters-rail" aria-label="Chapter Rail">
        <a href="#schedule" class="rail-link" aria-current="page">03 / TIMETABLE</a>
        <a href="#passes" class="rail-link">04 / PASSES</a>
      </aside>

      <div class="chapter-body">

        <!-- ======================================================================
             SCENE 04: SCHEDULE (HAIRLINE-RULED LEDGER TABLE)
             ====================================================================== -->
        <section class="schedule-section" id="schedule" aria-label="Schedule Timetable">
          <div class="schedule-header">
            <div>
              <span class="mono-label">CHRONOLOGICAL DISPATCH</span>
              <h2 class="statement" style="margin-top: 8px;">NOCTURNAL TIMETABLE</h2>
            </div>
            <div class="schedule-filter-tabs">
              <button class="tab-btn active" id="day1Btn">FRI OCT 24</button>
              <button class="tab-btn" id="day2Btn">SAT OCT 25</button>
            </div>
          </div>

          <div class="ledger-table">
            <!-- Friday Slots -->
            <div class="ledger-row" data-day="1">
              <span class="slot-time">22:30</span>
              <div>
                <div class="slot-act">Kattner &amp; Siding Ensemble</div>
                <div class="body-copy" style="font-size: 0.8125rem;">Analog Percussion &amp; Industrial Sub-Bass</div>
              </div>
              <span class="slot-venue">01 / TRAM DEPOT</span>
              <span class="slot-badge">LIVE A/V</span>
              <button class="mono-label" data-open-modal style="text-align: right; color: var(--tungsten);">RESERVE →</button>
            </div>

            <div class="ledger-row" data-day="1">
              <span class="slot-time">23:30</span>
              <div>
                <div class="slot-act">Celluloid Dispersal</div>
                <div class="body-copy" style="font-size: 0.8125rem;">Archival 35mm Dual-Screen Projection</div>
              </div>
              <span class="slot-venue">04 / PRINTING WORKS</span>
              <span class="slot-badge">35MM CINEMA</span>
              <button class="mono-label" data-open-modal style="text-align: right; color: var(--tungsten);">RESERVE →</button>
            </div>

            <div class="ledger-row" data-day="1">
              <span class="slot-time">00:45</span>
              <div>
                <div class="slot-act">Resonance Corridor</div>
                <div class="body-copy" style="font-size: 0.8125rem;">Heavy Post-Punk &amp; Spring Reverb Trio</div>
              </div>
              <span class="slot-venue">01 / TRAM DEPOT</span>
              <span class="slot-badge">CONCERT</span>
              <button class="mono-label" data-open-modal style="text-align: right; color: var(--tungsten);">RESERVE →</button>
            </div>

            <div class="ledger-row" data-day="1">
              <span class="slot-time">02:30</span>
              <div>
                <div class="slot-act">Null Hypothesis</div>
                <div class="body-copy" style="font-size: 0.8125rem;">Modular Drift &amp; Spatial Feedback</div>
              </div>
              <span class="slot-venue">01 / TRAM DEPOT</span>
              <span class="slot-badge">MODULAR</span>
              <button class="mono-label" data-open-modal style="text-align: right; color: var(--tungsten);">RESERVE →</button>
            </div>

            <div class="ledger-row" data-day="1">
              <span class="slot-time">04:15</span>
              <div>
                <div class="slot-act">Displaced Phase</div>
                <div class="body-copy" style="font-size: 0.8125rem;">Dawn Sub-Bass Closing Improvisation</div>
              </div>
              <span class="slot-venue">01 / TRAM DEPOT</span>
              <span class="slot-badge">CLOSING</span>
              <button class="mono-label" data-open-modal style="text-align: right; color: var(--tungsten);">RESERVE →</button>
            </div>

            <!-- Saturday Slots -->
            <div class="ledger-row" data-day="2" style="display: none;">
              <span class="slot-time">20:30</span>
              <div>
                <div class="slot-act">Vapour Phase</div>
                <div class="body-copy" style="font-size: 0.8125rem;">Ambient Hydro-Tape Loops &amp; Quad Phasing</div>
              </div>
              <span class="slot-venue">02 / MUNICIPAL BATHS</span>
              <span class="slot-badge">AMBIENT</span>
              <button class="mono-label" data-open-modal style="text-align: right; color: var(--tungsten);">RESERVE →</button>
            </div>

            <div class="ledger-row" data-day="2" style="display: none;">
              <span class="slot-time">21:00</span>
              <div>
                <div class="slot-act">Rotational Press Audio</div>
                <div class="body-copy" style="font-size: 0.8125rem;">Mechanical Tape Loop Performance</div>
              </div>
              <span class="slot-venue">04 / PRINTING WORKS</span>
              <span class="slot-badge">TAPE LOOP</span>
              <button class="mono-label" data-open-modal style="text-align: right; color: var(--tungsten);">RESERVE →</button>
            </div>

            <div class="ledger-row" data-day="2" style="display: none;">
              <span class="slot-time">23:15</span>
              <div>
                <div class="slot-act">Market Drone Trio</div>
                <div class="body-copy" style="font-size: 0.8125rem;">Acoustic Accordion &amp; Harmonium</div>
              </div>
              <span class="slot-venue">03 / NIGHT MARKET</span>
              <span class="slot-badge">DRONE</span>
              <button class="mono-label" data-open-modal style="text-align: right; color: var(--tungsten);">RESERVE →</button>
            </div>

            <div class="ledger-row" data-day="2" style="display: none;">
              <span class="slot-time">01:30</span>
              <div>
                <div class="slot-act">Monotype Live Assembly</div>
                <div class="body-copy" style="font-size: 0.8125rem;">Electro-Acoustic Typewriter Improvisation</div>
              </div>
              <span class="slot-venue">04 / PRINTING WORKS</span>
              <span class="slot-badge">ELECTRO-ACOUSTIC</span>
              <button class="mono-label" data-open-modal style="text-align: right; color: var(--tungsten);">RESERVE →</button>
            </div>

            <div class="ledger-row" data-day="2" style="display: none;">
              <span class="slot-time">03:30</span>
              <div>
                <div class="slot-act">Submerged Tones</div>
                <div class="body-copy" style="font-size: 0.8125rem;">Sine Wave &amp; Water Reflection Drift</div>
              </div>
              <span class="slot-venue">02 / MUNICIPAL BATHS</span>
              <span class="slot-badge">HYDRO-ACOUSTIC</span>
              <button class="mono-label" data-open-modal style="text-align: right; color: var(--tungsten);">RESERVE →</button>
            </div>

            <div class="ledger-row" data-day="2" style="display: none;">
              <span class="slot-time">05:00</span>
              <div>
                <div class="slot-act">Dawn Chorus Group</div>
                <div class="body-copy" style="font-size: 0.8125rem;">Morning Ambient Acoustic Welcome</div>
              </div>
              <span class="slot-venue">03 / NIGHT MARKET</span>
              <span class="slot-badge">DAWN GATHERING</span>
              <button class="mono-label" data-open-modal style="text-align: right; color: var(--tungsten);">RESERVE →</button>
            </div>
          </div>
        </section>

        <!-- ======================================================================
             SCENE 05: PASS DOSSIER & CARDS (2PX BORDER ANIMAXXING CARDS)
             ====================================================================== -->
        <section class="tickets-section" id="passes" aria-label="Festival Admission">
          <div>
            <span class="mono-label" style="color: var(--tungsten);">EDITION 001 · CAPACITY CONTROLLED</span>
            <h2 class="statement" style="margin-top: 8px;">FESTIVAL ADMISSION DOSSIER</h2>
            <p class="body-copy" style="margin-top: 12px;">
              Every pass provides unrestricted 48-hour access to all four civic environments across both nights. Access is strictly capped to protect intimate acoustic proximity.
            </p>
          </div>

          <div class="card-grid">
            <!-- Tier 1 -->
            <div class="card" data-open-modal>
              <div>
                <div class="card-label">
                  <span class="mono-label">01 / EARLY DOCKET</span>
                  <span class="figure">€38 · LIMITED</span>
                </div>
                <h3 class="card-heading">EARLY ACCESS</h3>
                <p class="body-copy">Early registrant allocation. Full 48-hour access to all 4 spaces, spatial acoustics, and 35mm cinema screenings.</p>
              </div>
              <div class="annotation">CLAIM TIER 01 →</div>
            </div>

            <!-- Tier 2 (Featured) -->
            <div class="card card-featured" data-open-modal>
              <div>
                <div class="card-label">
                  <span class="mono-label" style="color: var(--tungsten);">02 / STANDARD DOCKET</span>
                  <span class="figure" style="color: var(--tungsten); font-weight: 700;">€48 · POPULAR</span>
                </div>
                <h3 class="card-heading">FULL ACCESS</h3>
                <p class="body-copy">Standard festival pass. Complete unrestricted access to the entire 2-night nocturnal program across all 4 civic venues.</p>
              </div>
              <div class="annotation">CLAIM TIER 02 →</div>
            </div>

            <!-- Tier 3 -->
            <div class="card" data-open-modal>
              <div>
                <div class="card-label">
                  <span class="mono-label">03 / PATRON DOCKET</span>
                  <span class="figure">€75 · SUPPORT</span>
                </div>
                <h3 class="card-heading">PATRON PASS</h3>
                <p class="body-copy">Direct contribution to artist honorariums and historical site preservation. Includes archival festival poster and printed program.</p>
              </div>
              <div class="annotation">CLAIM TIER 03 →</div>
            </div>
          </div>
        </section>

      </div>
    </div>

  </main>

  <!-- ======================================================================
       SHELL FOOTER (COLOPHON & ARCHIVAL IDENTIFIERS)
       ====================================================================== -->
  <footer class="shell-footer" aria-label="Archival Colophon">
    <div class="footer-row">
      <div>
        <div class="wordmark" style="font-size: 1.25rem;">off hours</div>
        <div class="mono-note" style="margin-top: 6px;">Independent Nocturnal Culture Festival · Edition 01</div>
      </div>

      <div class="mono-note">
        Central River &amp; Rail Municipal Corridor · 53°32′N 09°59′E
      </div>

      <div class="mono-note">
        All Rights Reserved © 2026 OFF HOURS Civic Arts
      </div>
    </div>
  </footer>

  <!-- ======================================================================
       CHECKOUT MODAL (MINIMALIST UNDERLINE FORM)
       ====================================================================== -->
  <div class="checkout-modal" id="checkoutModal" role="dialog" aria-modal="true" aria-labelledby="modalHeading">
    <div class="modal-content">
      <button class="modal-close" id="modalCloseBtn" aria-label="Close dialog">×</button>
      <span class="mono-label" style="color: var(--tungsten);">PASS RESERVATION · DIRECT CREDENTIALS</span>
      <h3 class="card-heading" id="modalHeading" style="margin-top: 12px; margin-bottom: 24px;">SECURE PASS</h3>

      <form id="checkoutForm" onsubmit="event.preventDefault(); alert('Pass registered! Digital credentials sent.'); document.getElementById('checkoutModal').classList.remove('open');">
        <label for="attendeeName" class="mono-label" style="display: block; margin-bottom: 6px;">ATTENDEE FULL NAME</label>
        <input type="text" id="attendeeName" class="text-field" placeholder="E.g. Elena Rostova" required />

        <label for="attendeeEmail" class="mono-label" style="display: block; margin-bottom: 6px;">DISPATCH EMAIL ADDRESS</label>
        <input type="email" id="attendeeEmail" class="text-field" placeholder="elena@example.com" required />

        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 24px;">
          <span class="figure" style="font-size: 0.875rem;">PASS TIER: FULL ACCESS · €48</span>
          <button type="submit" class="button-solid" style="font-size: 1rem; padding: 0.65rem 1.25rem;">
            CONFIRM &amp; DISPATCH →
          </button>
        </div>
      </form>
    </div>
  </div>

  <!-- Production Inlined Motion Scripts -->
  <script>
${js}
  </script>
</body>
</html>
`;

fs.writeFileSync(indexPath, htmlContent, 'utf8');
console.log('Successfully generated clean full-width pinned index.html!');
