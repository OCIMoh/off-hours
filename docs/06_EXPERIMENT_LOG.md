# OFF HOURS — Experiment Log

> **Phase:** P7 Lab Prototyping  
> **Concept:** Concept 1 — THE NOCTURNAL ATLAS  
> **Last Updated:** 2026-11-23  

---

## Experiment 01: Isolated Viewport Spatial Zoom (DISCARDED)
- **ID:** EXP-001
- **File:** [`lab/exp01-spatial-zoom.html`](file:///d:/projects/New%20folder%20(2)/showcase-animation-explorations/lab/exp01-spatial-zoom.html)
- **Critique / User Reaction:** `[Discarded / Overhauled]`
  - "the ui looks slop would it become better or not and text looks slop and there is no scroll or no place where you can add adanced gsap animation besides two or three place"
- **Internal Critique:** The critique was 100% accurate. Exp 01 relied on default system fonts, lacked editorial typographic craft, was trapped in a fixed 100vh viewport without scroll depth, and restricted motion to a single click-triggered zoom.
- **Lesson:** The experience demands a **cinematic scroll journey** with bespoke typography (*Syne*, *Space Grotesk*, *JetBrains Mono*) and multiple rich animation surfaces (pinned scroll zooms, horizontal architectural tracks, text splits, and ambient lighting).

---

## Experiment 02: The Cinematic Nocturnal Scroll & Horizontal Rail
- **ID:** EXP-002
- **File:** [`lab/exp02-scroll-cinematic.html`](file:///d:/projects/New%20folder%20(2)/showcase-animation-explorations/lab/exp02-scroll-cinematic.html)
- **Question:** How does a deep, multi-phase scroll journey with bespoke typography and advanced GSAP ScrollTrigger timelines feel in the browser?
- **Hypothesis:** Combining monumental Syne display typography with a pinned camera zoom into the city map, followed by a pinned horizontal architectural rail across the four venues, delivers the high-craft, cinematic atmosphere fitting an Awwwards-level independent cultural festival.
- **What Was Built:**
  1. *Art Direction & Typography:* Paired 900-weight *Syne* for monumental headlines, *Space Grotesk* for editorial hierarchy, and *JetBrains Mono* for precise civic coordinates. Film grain texture + ambient cursor torch that illuminates surfaces.
  2. *Hero Section:* Kinetic typography character split reveal on load and scroll cue.
  3. *Pinned Section 1 (The Nocturnal Atlas Scroll-Zoom):* Pinned `ScrollTrigger` timeline ($300\text{vh}$ scroll distance) where scrolling scrubs a 2.5D camera zoom deep into the river-and-rail coordinates, tracking live HUD progress.
  4. *Pinned Section 2 (Four Venues Horizontal Architectural Rail):* Pinned horizontal scrub ($450\text{vh}$) gliding through massive architectural cards for all 4 spaces with nested parallax depth, sensory specs, and independent lineups.
  5. *Section 3 (48-Hour Night-Shift Timeline):* Staggered matrix for Friday & Saturday nights with live day toggling.
  6. *Section 4 (The Embossed Ticket Pass Artifact):* Perforated ticket docket with tier selection and instant purchase trigger.
  7. *Persistent Bottom Telemetry Rail:* Unmissable 1-click pass access bar.
- **Observed Results:** Completely transforms the experience from a flat, basic app into a continuous, cinematic festival journey with rich, rewarding scroll physics.
- **User Reaction:** `[Pending Review]`
- **Critic Findings:** `[Pending Gate G4 Critique]`
