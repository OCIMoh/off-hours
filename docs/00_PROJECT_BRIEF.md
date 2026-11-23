# OFF HOURS — Project Discovery Brief

> **Document Status:** Draft for Gate G1 Review  
> **Phase:** P1 Discovery Brief  
> **Last Updated:** 2026-11-23  

---

## 1. Project Overview & Premise

- **Project Name:** OFF HOURS `[CONFIRMED]`
- **Format:** Independent culture festival across two consecutive nights `[CONFIRMED]`
- **Setting:** A dense, layered post-industrial river-and-rail city that changes character after midnight (reminiscent of Hamburg's Speicherstadt, Prague's industrial sidings, Berlin's municipal relics) `[CONFIRMED]`
- **Central Premise:** "The city has another life after its ordinary life ends. OFF HOURS temporarily opens the doors to it." The city itself is the protagonist, not just a festival backdrop `[CONFIRMED]`
- **Scale:** 4 distinct physical venues, each representing an essential facet of civic life (transit, recreation, commerce, communication) `[CONFIRMED]`

---

## 2. Business & User Objectives

### Primary Objective `[CONFIRMED]`
- **Ticket Sales:** Convert curious visitors into ticket holders by making the festival feel unmissable, authentic, and culturally essential.

### Secondary Objectives `[CONFIRMED]`
- **Atmospheric Discovery:** Let visitors discover independent musicians, experimental performers, visual artists, and filmmakers.
- **Venue Exploration:** Immerse visitors in the distinct identities, acoustics, and tactile qualities of the 4 venues before they purchase.
- **Experience Clarity & Wayfinding:** Help attendees understand the geography, schedules, and flow across the two nights so they can plan their routes.
- **Essential Practical Information:** Deliver clear, transparent details on entry, locations, accessibility, transportation, and safety.

---

## 3. The Four Venues & Cultural Anchors

Each space represents a functional layer of the city temporarily reactivated after dark:

| Venue | Civic Role | Atmosphere & Sensory Traits | Cultural Programming |
| :--- | :--- | :--- | :--- |
| **01 — The Old Tram Depot** `[CONFIRMED]` | *Transportation* | Steel beams, concrete floors, transit relics, big sound with intimate crowd proximity | Live musicians, experimental bands, dynamic performances |
| **02 — The Municipal Baths** `[CONFIRMED]` | *Recreation* | Glazed tiles, natural echo chambers, drained pool, cool acoustics | Ambient music, spatial sound installations, immersive audiovisual work |
| **03 — The Night Market** `[CONFIRMED]` | *Commerce* | Wholesale loading dock, tactile concrete, warm communal glow | Social hub, food & drink, spontaneous interventions, conversation |
| **04 — The Printing Works** `[CONFIRMED]` | *Communication* | Heavy machinery, ink & paper archives, narrow industrial corridors | Short films, experimental cinema, projection mapping, visual arts |

---

## 4. Emotional Tone & Sensory Identity

### Core Emotional Tenets `[CONFIRMED]`
1. **Mysterious, but Welcoming:** An invitation into a hidden world, never exclusionary or pretentiously secretive.
2. **Underground, but Not Artificially Edgy:** Authentic DIY and independent cultural character, free from faux-rebellion or clichéd club tropes.
3. **Intimate, Despite the Scale:** Proximity to performers, art, and fellow wanderers.
4. **Unexpected, but Thoughtfully Curated:** Every corner feels deliberate and discovered rather than chaotic.
5. **Temporarily Outside Ordinary Life:** A suspension of normal civic routines for 48 hours.

### Sensory Palette `[CONFIRMED]`
- **Lighting:** Warm tungsten pools, dim passageways, dramatic shadows, soft ambient washes, occasional theatrical beam; balanced with bright communal pauses.
- **Materials:** Raw concrete, red brick, tarnished steel, weathered ceramic tile, newsprint, aged timber.
- **Soundscape:** Distant rumblings, room reverberation, low-end resonance, ambient murmurs, mechanical echoes.
- **Imagery Style:** Gritty documentary photography, grain, unposed human moments, architectural textures.

---

## 5. Explicit Anti-Patterns (What We Will Avoid) `[CONFIRMED]`

- **No Cyberpunk:** Avoid synthetic neon purples, glitch effects, sci-fi tropes, or dystopian illusions.
- **No Generic Rave Tropes:** Avoid strobe cliches, laser graphics, equalizer waves, and aggressive EDM aesthetics.
- **No Ruins-Porn / Post-Apocalyptic Decay:** Spaces are working or sleeping civic structures, preserved and repurposed, not decrepit wastelands.
- **No Corporate Festival Clichés:** Avoid high-gloss marketing language, sponsored hero banners, influencer aesthetics, and cookie-cutter lineup cards.

---

## 6. Audience Profile `[INFERRED]`

- **Primary Audience:** Culturally curious urbanites, independent music devotees, film/visual arts explorers, and night owls looking for substantive experiences off the beaten path.
- **Mindset:** Values discovery, atmosphere, and authenticity over celebrity headliners; seeks an evening that feels like a shared secret rather than a mass commercial event.
- **Behavioral Need:** Needs to understand what they are stepping into without stripping away the magic; requires low friction when buying tickets on both mobile and desktop.

---

## 7. Content & Asset Inventory (§12)

| Content Item | Status | Strategy |
| :--- | :--- | :--- |
| **Festival Manifesto & Narrative** | `CONFIRMED` | Grounded in "The city has another life after its ordinary life ends." |
| **Venue Profiles & Photography** | `PLACEHOLDER` | Architectural and spatial documentary references to be curated in P2/P3; explicitly labeled as placeholders. |
| **Artist / Performer Lineup** | `PLACEHOLDER` | Fictional / evocative artist profiles representing music, sound, cinema, and installations; zero fabricated real-person credentials per M9. |
| **Schedule / Itinerary** | `ASSUMED` | Staggered 2-night schedule across the 4 spaces from 20:00 to 06:00. |
| **Ticketing Structure** | `OPEN` | To confirm: e.g., 2-Night All-Access Pass vs. Single-Night Pass vs. Venue Hopper. |
| **Practical Guide & FAQ** | `ASSUMED` | Venue access, city transit connections, age restrictions, code of conduct, accessibility notes. |

---

## 8. Technical Strategy & Constraints `[RECOMMENDED]`

- **Architecture:** Lightweight modern web framework (Next.js / React) with strict semantic HTML structure.
- **Styling & Typography:** CSS / Tailwind for robust typographic hierarchy and responsive layout; intentional bespoke typography that echoes print and transit signage without feeling nostalgic or gimmicky.
- **Interaction & Motion:** CSS transitions first; GSAP for sequenced ambient reveals and venue transitions. Keep animations purposeful and unobtrusive.
- **Performance & Usability Floor:** Fast initial paint, accessible contrast, full keyboard navigation, `prefers-reduced-motion` compliance, mobile-first responsiveness (320px to 1920px+). Primary ticket action persistent or reachable in 1 click.

---

## 9. Gate G1 Checklist & Open Decisions

Before formally locking Gate G1:
- [ ] **Approver confirmation:** Is this project brief and cultural positioning 100% aligned with your vision for OFF HOURS?
- [ ] **Open Decision 1 (Ticketing Model):** What ticket types are we offering? (e.g., Full Weekend Pass, Single Night Pass, or Venue Passes?)
- [ ] **Open Decision 2 (Dates/City Identity):** Should the city remain a poetic, unnamed composite (e.g., "The River City"), or does it have a specific fictional or real name?
