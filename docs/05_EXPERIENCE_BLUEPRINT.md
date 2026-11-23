# OFF HOURS — Experience Blueprint

> **Document Status:** Updated for Concept 2  
> **Phase:** P6 Experience Architecture (Reopened for Concept 2)  
> **Concept:** Concept 2 — THE CITY DISPATCH  
> **Last Updated:** 2026-11-23  

---

## 1. Conceptual Information Architecture & Narrative Flow

Instead of a map-first dashboard, the site is architected as an **Unredacted Overnight Cultural Dispatch**—a monumental editorial journey that unfolds as if freshly printed from the rotary presses of Venue 04:

```
┌────────────────────────────────────────────────────────────────────────┐
│               ACT 1: THE OVERNIGHT MASTHEAD & MANIFESTO                │
│       (Kinetic Text Split · Syne 900 · "The City Has Another Life")     │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │  [Scroll-Driven Ink Reveal]
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│            ACT 2: THE FOUR VENUE DOSSIERS (ROTARY PRESS RAIL)          │
│   (Pinned Horizontal Scroll · Monumental Broadsheet Spreads · No Cards)│
│   • DISPATCH 01: The Old Tram Depot (Transit · Live Sound & Steel)     │
│   • DISPATCH 02: The Municipal Baths (Recreation · Glazed Tile Echo)   │
│   • DISPATCH 03: The Night Market (Commerce · Wholesale Loading Docks) │
│   • DISPATCH 04: The Printing Works (Communication · Cinema & Proj.)   │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │  [Scroll Continuation]
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│            ACT 3: THE 48-HOUR TYPESET SCHEDULE LEDGER                  │
│       (20:00–06:00 Matrix · Staggered Sets Across Friday & Saturday)   │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│            ACT 4: THE OFFICIAL ADMIT-ONE PRESS PASS ARTIFACT           │
│   (Perforated Tear-Off Stub · Capacity Telemetry · Instant Checkout)   │
└────────────────────────────────────────────────────────────────────────┘

══════════════════════════════════════════════════════════════════════════
PERSISTENT MASTHEAD TELEMETRY: TIER 02 · €48 · 84% CLAIMED · 1-CLICK PASS
══════════════════════════════════════════════════════════════════════════
```

---

## 2. Visitor Journeys & Interaction Points

### Journey A: The Cultural Flâneur (Storytelling to Purchase)
1. **Act 1 (Hero Manifesto):** The visitor arrives at the dark, inky overnight broadside. Letters expand into position with an ink-stamp wipe. The cursor casts an ambient warm tungsten glow across rough paper texture.
2. **Act 2 (Rotary Press Rail):** As the visitor scrolls, the page pins and slides horizontally like a massive continuous newspaper web passing through industrial rollers. Each of the four spaces is presented as an uncompromised, uncrowded architectural broadsheet (sensory notes, acoustic reverberation specs, and independent artists).
3. **Act 3 (Schedule Ledger):** The scroll resumes vertically into a typeset time-shift table showing the flow of music, performance, and cinema from 20:00 to 06:00.
4. **Act 4 (Conversion):** The visitor encounters the physical ticket pass artifact with a perforated tear-off line, live capacity bar, and instant tier checkout.

### Journey B: The Fast-Path Buyer
- The bottom **Telemetry Rail** is fixed across all scroll positions.
- At any second, the user sees `TIER 02 · €48` and can click `GET 48-HR PASS` to jump directly to ticket selection without losing their place.

---

## 3. Motion & GSAP Technical Specification

1. **Ink Stamp & Text Split:**  
   `gsap.from('.headline-char', { y: 100, opacity: 0, stagger: 0.03, ease: 'power4.out' })`
2. **Pinned Horizontal Broadsheet Rail:**  
   `ScrollTrigger.create({ trigger: '#pressRail', pin: true, scrub: 1.2, end: () => '+=' + strip.scrollWidth })`
3. **Parallax Typography & Framing:**  
   As broadsheet panels glide sideways, typography shifts at $1.2\times$ scroll speed while background acoustic specs shift at $0.8\times$ for authentic physical depth.
4. **Hover Illuminations:**  
   Hovering over any venue or artist triggers a warm sodium light beam (`#E5A93C`) revealing set times and acoustic specs.
5. **Reduced-Motion Fallback:**  
   If `prefers-reduced-motion: reduce` is detected, the horizontal pin becomes a clean stacked vertical document with subtle fade reveals.

---

## 4. Protection of the Primary Action

- The primary conversion action (ticket purchasing) is visible in the masthead, pinned in the bottom rail, and embedded as a tactile physical docket in Act 4.
- Zero friction, 100% keyboard and mobile accessible.
