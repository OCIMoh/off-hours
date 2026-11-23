# OFF HOURS — Production Specification

> **Document Status:** Approved for Production Build (Gate G4)  
> **Concept:** Concept 2 — THE CITY DISPATCH  
> **Phase:** P9 Production  
> **Last Updated:** 2026-11-23  

---

## 1. Design System & Design Tokens

### Color Palette
- **Canvas / Void:** `#07080A` (Inky post-industrial night)
- **Surfaces:** `#0E1014` (Dark paper & smooth concrete)
- **Cards / Dockets:** `#14171D` (Typeset ledger background)
- **Tungsten Accent:** `#E5A93C` (Warm sodium & tungsten bulb filament)
- **Tungsten Glow:** `rgba(229, 169, 60, 0.35)`
- **Tungsten Dim / Background:** `rgba(229, 169, 60, 0.12)`
- **River Water:** `#2D4554` (Murky nocturnal canal spine)
- **Border Subtle:** `rgba(255, 255, 255, 0.08)`
- **Border Focus:** `rgba(229, 169, 60, 0.4)`
- **Chalk Text:** `#F5F6F8` (High-contrast lead copy)
- **Muted Text:** `#7E8490` (Secondary editorial notes)

### Typography Stack
- **Monumental Display:** `"Syne", sans-serif` (Weights: 800, 900, tight tracking `-0.03em`)
- **Editorial Body & Headings:** `"Space Grotesk", sans-serif` (Weights: 400, 500, 700)
- **Telemetry & Civic Specs:** `"JetBrains Mono", monospace` (Weights: 400, 600, letter-spacing `0.15em`)

---

## 2. Component Architecture

```
App
├── FilmGrain (Fixed procedural noise texture)
├── AmbientTorch (Cursor-following tungsten spotlight)
├── Masthead (Fixed header with brand, date telemetry, and quick pass link)
├── HeroSection (Kinetic character split, manifesto lead, civic specs, scroll cue)
├── AtlasZoomSection (Pinned 300vh ScrollTrigger: 2.5D camera zoom into city vector schematic)
├── VenuesRailSection (Pinned 450vh ScrollTrigger: horizontal rotary rail for the 4 spaces)
│   ├── Space01_TramDepot (Transit · Live Sound · Rivet steel)
│   ├── Space02_MunicipalBaths (Recreation · Glazed Tile · Ambient echo)
│   ├── Space03_NightMarket (Commerce · Concrete loading bays · Social food/dub)
│   └── Space04_PrintingWorks (Communication · Rotary presses · 16mm film)
├── ScheduleSection (48-hour typeset matrix with Friday/Saturday toggles)
├── TicketPassSection (Embossed perforated ticket docket with tier toggling & checkout trigger)
└── TelemetryBottomRail (Persistent bottom dock with capacity meter and 1-click CTA)
```

---

## 3. Motion & Interaction Standards

1. **Scroll-Driven Continuity:**  
   Natural page scrolling drives the pinned animations seamlessly without breaking native scrollbar ergonomics.
2. **Horizontal Scrubbing Physics:**  
   `ScrollTrigger` binds the 4-venue rail to vertical scroll movement with a smooth `scrub: 1.2` factor.
3. **Accessibility Floor (M8):**  
   All animations respect `prefers-reduced-motion: reduce`. When active, pinned horizontal scrubbing transforms into a clean stacked editorial layout, and text character splits are replaced with instant visual presentation.
4. **Interactive Checkout:**  
   The primary pass purchasing action is permanently accessible in the top masthead, the bottom telemetry rail, and the dedicated Pass Section. Clicking opens an instant, frictionless checkout modal without leaving the experience.

---

## 4. Definition of Done Checklist (§11)
- [x] Responsive from 320px to 1920px+ viewports without horizontal clipping.
- [x] Zero console errors.
- [x] Complete keyboard path (`Tab`, `Enter`, `Escape`).
- [x] High-contrast accessible text adhering to WCAG 2.2 AA.
- [x] Primary ticket conversion action reachable in 1 click across desktop and mobile.
