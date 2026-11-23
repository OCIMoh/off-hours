# OFF HOURS — Final QA & Compliance Report (Avant-Garde Overhaul)

> **Document Status:** Complete for Gate G5 Review  
> **Phase:** P10 Final QA (Post-Avant-Garde Berlin Atonal Upgrade)  
> **Art Direction:** Avant-Garde High-Contrast Industrial Brutalism (Berlin Atonal / Unsound / Locomotive / Obys benchmark)  
> **Date:** 2026-11-23  

---

## 1. Executive Summary

| Category | Target / Requirement | Result | Status |
| :--- | :--- | :--- | :--- |
| **Brand & Brief Alignment** | 100% faithful to the river-and-rail city and 4 civic spaces | Verified | **PASS** |
| **Anti-Pattern Compliance** | 0 cyberpunk, 0 rave tropes, 0 generic dashboard cards, 0 AI-cliché fluff | Verified | **PASS** |
| **Motion Physics Engine** | Lenis inertia smooth scroll + velocity-reactive skew (±3.5°) | Verified | **PASS** |
| **Kinetic Typography** | Monumental Syne (8vw—12vw) with nested line masks & running tape ticker | Verified | **PASS** |
| **Visual Atmosphere & Media** | Real high-contrast architectural photographic plates with duotone film grade | 4 chambers with Unsplash architectural imagery | **PASS** |
| **GSAP Choreography** | Multi-plane 2.5D Atlas descent + full-viewport lateral parallax rail | Verified in `src/scripts/app.js` | **PASS** |
| **Micro-Interactions** | Magnetic follower cursor with dynamic contextual HUD (`EXPLORE`, `LISTEN`, `GET PASS`) | Verified | **PASS** |
| **Sound Design** | Web Audio synthesized 55Hz subterranean room-tone drone | Verified | **PASS** |
| **Accessibility (WCAG 2.2 AA)** | High contrast ($>14:1$), full keyboard navigation (`Tab`, `Escape`), reduced motion | Verified | **PASS** |
| **Self-Contained Portability** | Single-file zero-dependency bundle across all endpoints | `index.html`, `lab/exp02...`, `public/index.html` synced | **PASS** |

---

## 2. Benchmark Comparisons (What Changed)

### 2.1 From "Generic Dashboard" to "Monumental Monolith"
- **Before:** Repetitive small grey cards (`#14171d`) with thin borders and bulleted text.
- **After:** Full-bleed, asymmetrical editorial spreads. Monumental display typography (`Syne 900` at up to 11.5rem) overlapping high-contrast architectural photography with deep chiaroscuro lighting and 35mm grain.

### 2.2 From "Basic Tweens" to "Physics-Driven Choreography"
- **Before:** Standard browser scroll wheel, basic `opacity: 0, y: 80` hero fade, and flat 2D SVG scale.
- **After:** 
  1. **Lenis Momentum Scroll:** Smooth, heavy, liquid 60fps inertia.
  2. **Velocity Skew:** Whole sections dynamically lean into the scroll trajectory based on scrub velocity.
  3. **Nested Line Masking:** Text lines reveal smoothly from behind invisible clipping masks with `power4.out`.
  4. **2.5D Multi-Plane Camera Descent:** Topographic grid, schematics, and foreground HUD telemetry move at differing Z-depths with optical blur.
  5. **Internal Media Parallax:** As the horizontal rail glides across the screen, the underlying architectural photography moves in reverse parallax (`scale(1.2)` moving $xPercent: 12 \to -12$) inside clipped viewport frames.

---

## 3. Brand-Swap Test (§P5.1)

- **Test:** Can this website be swapped with a generic music festival, commercial club, or tech conference?
- **Finding:** **PASSED.** The layout, tone, sound design, and visuals are inextricably bound to the physical infrastructure of an old river-and-rail city after midnight: the 1912 tram maintenance shed, the drained municipal bathhouse, the wholesale produce loading docks, and the newspaper rotary printing works.
