# OFF HOURS — Experience Blueprint

> **Document Status:** Draft for Gate G3 Review  
> **Phase:** P6 Experience Architecture  
> **Concept:** Concept 1 — THE NOCTURNAL ATLAS  
> **Last Updated:** 2026-11-23  

---

## 1. Conceptual Information Architecture & States

Instead of a generic single-page vertical scroll (Hero → Cards → Lineup → Tickets → Footer), the site is architected as an **Interactive 2.5D Nocturnal Canvas with Depth States**:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        STATE 0: THE NOCTURNAL ATLAS                    │
│   (Bird's-Eye Schematic Map of River & Rail City · 4 Glowing Nodes)    │
└───────────────────┬────────────────────────────────────────────────────┘
                    │  [Click Node / Spatial Depth Zoom]
                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                        STATE 1: THE VENUE CHAMBERS                     │
│  (Camera plunges into space · Monochromatic architectural layout)       │
│  • 01: The Old Tram Depot (Transit · Main stage & Live Sound)          │
│  • 02: The Municipal Baths (Recreation · Ambient & Spatial AV)         │
│  • 03: The Night Market (Commerce · Social hub & Spontaneous acts)     │
│  • 04: The Printing Works (Communication · Cinema & Projections)       │
└───────────────────┬────────────────────────────────────────────────────┘
                    │
                    ├─► STATE 2: THE 48-HR TIMELINE (20:00 to 06:00 Matrix)
                    │
                    └─► STATE 3: PRACTICAL ACCESS (Transit, Rules, FAQ)

══════════════════════════════════════════════════════════════════════════
PERSISTENT TELEMETRY DOCKET: "ENTRY PASS / TICKETS" (Always Visible 1-Click)
══════════════════════════════════════════════════════════════════════════
```

---

## 2. Visitor Journeys

### Journey A: The Cultural Explorer (Discovery Flow)
1. **Arrival (State 0):** The visitor arrives at the dark, humming Nocturnal Atlas. The river shimmers faintly; railway lines form architectural veins across the dark canvas; four warm tungsten coordinate pins pulse slowly.
2. **Investigation:** Hovering over a coordinate node reveals immediate telemetry: Venue Name, Civic History, and Current Vibe.
3. **The Spatial Zoom (State 0 → State 1):** Clicking a venue pushes the camera forward into the dark. City vectors scale up and fade out; the viewport smoothly transitions into a monumental, uncrowded single-room elevation of that venue.
4. **Encounter:** Inside the chamber, the visitor explores:
   - Architectural and sensory dossier (concrete, glazed tile, newsprint, acoustics).
   - Performing independent artists and curated disciplines.
   - Live night hours (staggered sets).
5. **Conversion:** A tactile button *"CLAIM ACCESS TO THIS SPACE"* or the persistent bottom pass secures their weekend pass.

### Journey B: The Direct Ticket Buyer (High-Intent Conversion)
1. **Immediate Access:** On any screen and at any scroll or zoom state, the bottom **Telemetry Dock** is fixed.
2. **Status Telemetry:** Displays current pass tiers (`TIER 01: SOLD OUT`, `TIER 02: ACTIVE · 48-HR ALL-ACCESS · €48`, `LIMITED VENUE HOPPER`).
3. **Action:** Clicking "SECURE 48-HR PASS" smoothly opens an elegant slide-over drawer modal. No disorienting page reloads. Checkout completes in 3 steps.

### Journey C: The Night-Shift Planner (Schedule Flow)
1. **Access:** Toggling "48-HR TIMELINE" in the global header slides the canvas into the night-shift matrix.
2. **Matrix:** Displays Friday (Night 1) and Saturday (Night 2) from 20:00 to 06:00 across the 4 spaces.
3. **Exploration:** Clicking any set shows the venue coordinate and lets the user jump directly to that space.

---

## 3. Interaction & Motion Specification

### 3.1 The Spatial Depth Zoom (Signature Interaction)
- **Trigger:** Click on any of the 4 map coordinate pins or space names.
- **Motion:**
  1. Selected coordinate becomes focal point.
  2. Canvas scales up ($1.0 \to 2.4$), blurring slightly with depth-of-field effect.
  3. City vector grid fades out ($1 \to 0$ opacity, $600\text{ms}$, `power3.inOut`).
  4. Selected venue chamber slides into view with architectural stagger ($400\text{ms}$).
- **Exit Motion:** A subtle "RETURN TO CITY ATLAS" back-button smoothly pulls the camera back ($2.4 \to 1.0$), snapping back to the macro map.

### 3.2 Lighting & Hover States
- Coordinate pins emit a subtle, warm tungsten glow (`#E5A93C` at 20% blur radius).
- Non-selected elements dim slightly to focus user gaze.
- Sound effects: Default muted; optional subtle ambient audio toggle.

### 3.3 Accessibility & Reduced-Motion (`prefers-reduced-motion`)
- When `prefers-reduced-motion: reduce` is detected:
  - The scale-zoom animation is replaced with an instantaneous clean cross-fade ($200\text{ms}$).
  - All pulsating animations are paused.
  - Complete keyboard navigation (`Tab`, `Enter`, `Escape` to close venue view).

---

## 4. Responsive Adaptation (Desktop vs. Mobile)

| Viewport | Layout Strategy |
| :--- | :--- |
| **Desktop (1440px+)** | Expansive interactive 2.5D vector map canvas. Generous architectural negative space. Split-view option for venue chambers. |
| **Tablet (768px – 1024px)** | Touch-enabled pan/pinch map. Bottom drawer handles venue profiles smoothly. |
| **Mobile (320px – 430px)** | Hybrid map view: top interactive mini-atlas radar with coordinate toggle pills; direct swipe/snap access between the 4 spaces to prevent small-screen disorientation. Persistent bottom pass button always reachable with thumb. |

---

## 5. Protection of the Primary Action (§11 M8)

- **Requirement:** The ticket-purchasing action must remain visible in the first viewport or reachable within 1 interaction on both desktop and mobile.
- **Implementation:** The **Telemetry Pass Bar** is pinned to the viewport bottom. It has a high-contrast warm amber accent button (`SECURE 48-HR PASS`), a capacity counter (`CAPACITY 84%`), and opens the checkout docket instantly without page departure.

---

## 6. Gate G3 Sign-Off Criteria

Approver confirms:
1. Is this spatial structure, visitor journey, and interaction architecture approved to enter **Phase P7 (Lab Prototyping)**?
2. Are all priority actions (ticket purchase, venue exploration, schedule clarity) protected?
