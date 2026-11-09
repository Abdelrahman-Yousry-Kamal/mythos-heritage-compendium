# Mythos and Heritage Compendium
## The Odyssey and The Palace of Princess Fatima Al-Zahraa (Royal Jewelry Museum)

An interactive, editorial-grade web storytelling application comparing Homer's classical Greek epic *The Odyssey* with the architectural and cultural chronicle of *The Palace of Princess Fatima Al-Zahraa Ali Haydar* (The Royal Jewelry Museum in Zizinia, Alexandria).

Built as a digital museum exhibition inspired by Chronicle Books and high-end editorial layouts, the application combines interactive narrative scrolls, artifact discovery, branching mythic decisions, and comparative lore analysis.

---

## Table of Contents

- [Overview](#overview)
- [Design Philosophy and Guardrails](#design-philosophy-and-guardrails)
- [Narratives and Academic Sourcing](#narratives-and-academic-sourcing)
  - [The Odyssey (Homeric Chronicle)](#1-the-odyssey-homeric-chronicle)
  - [The Palace of Princess Fatima Al-Zahraa (Alexandria Royal Heritage)](#2-the-palace-of-princess-fatima-al-zahraa-alexandria-royal-heritage)
- [Core Application Features](#core-application-features)
- [Technology Stack](#technology-stack)
- [Project Directory Structure](#project-directory-structure)
- [Getting Started](#getting-started)
- [Build and Deployment](#build-and-deployment)
- [Curatorial Notes and Citations](#curatorial-notes-and-citations)

---

## Overview

The Mythos and Heritage Compendium is an interactive illustrated storybook and curatorial compendium. It explores universal human themes across two distinct cultural traditions: the pursuit of home through cunning and endurance in classical Greece, and the preservation of dynasty, architectural majesty, and royal treasures in 20th-century Alexandria.

The experience is delivered entirely client-side without databases, user logins, or backend services. All state—including chapter progress, relic discoveries, sound settings, and reading preferences—is managed in React memory and persisted locally.

---

## Design Philosophy and Guardrails

The application adheres to strict editorial and aesthetic constraints designed to create a tactile, physical reading experience:

- **Zero Synthetic Gradient Aesthetics:** Violet, fuchsia, purple, and neon gradient orbs are strictly prohibited. The visual language relies on warm aged paper, French limestone vellum, deep carbon ink, and authentic architectural pigments.
- **Physical Offset Print Shadows:** All depth is rendered using hard, crisp offset print shadows (`2px 2px 0px` and `3px 3px 0px`) rather than diffused blur orbs or glowing neon drop shadows.
- **Bespoke Vector Ornaments:** Decorative elements are rendered via custom SVG components, including the Greek geometric meander (key) border, Islamic eight-pointed star arabesques, and brass corner brackets.
- **Pure Arabic Text Without Diacritics:** All Arabic copy is written in formal literary Arabic stripped of all diacritics (tashkeel) to maintain typographic clarity and contemporary editorial sophistication.
- **Curated Architectural Palettes:**
  - *Base Paper:* Alabaster Cream (`#F8F6F0`), French Limestone (`#EFE9DF`), Deep Carbon Ink (`#1C1917`), Weathered Umber (`#575047`), Antique Brass Hairline (`#D2C8B8`).
  - *The Odyssey:* Aegean Sea Navy (`#15324D`), Attic Terracotta Clay (`#BF532C`), Hellenic Bronze (`#8A7443`), Seafoam Vellum (`#ECF2F6`).
  - *Princess Fatima's Palace:* Alexandria Malachite Green (`#193E30`, matching the palace exterior shutters), Royal 18k Gold Leaf (`#BA872C`), Royal Bordeaux Ruby (`#82292E`), Sage Courtyard Vellum (`#EDF3EE`).

---

## Narratives and Academic Sourcing

### 1. The Odyssey (Homeric Chronicle)
Presents the ten-year voyage of Odysseus following the fall of Troy through five documented episodes:
1. **The Fall of Ilion and The Wooden Deceit:** The strategic victory of the Trojan horse and the voyage homeward. Illustrated by the 675 BC relief amphora from Mykonos.
2. **The Cave of the Cyclops:** The confrontation with Polyphemus and victory of cunning intellect over brutish force.
3. **The Song of the Sirens and The Enchantress:** Resisting destructive desires through disciplined forethought. Illustrated by the British Museum Siren Vase (Attic red-figure stamnos, c. 480 BC).
4. **Between Scylla and Charybdis:** Navigating tragic dilemmas and choosing between unavoidable perils in the Strait of Messina.
5. **The Great Bow and The Ithaca Homecoming:** Reclamation of hearth, fidelity of Penelope, and restoration of justice. Illustrated by the 5th-century BC Attic red-figure skyphos.

### 2. The Palace of Princess Fatima Al-Zahraa (Alexandria Royal Heritage)
Accurately documents the history of the Royal Jewelry Museum in Zizinia, Alexandria, drawn directly from the academic study by Prof. Dr. Hussein Ibrahim El-Attar (Ministry of Higher Education):
1. **The Foundations of Zizinia:** Begun by Zeinab Fahmy (mother of Princess Fatima) in 1919 (1338 AH) and completed by Princess Fatima Al-Zahraa Ali Haydar in 1923 (1342 AH) as a summer retreat. Featuring the original palace facade, marble staircase, and bronze lantern statues.
2. **The Architectural Confluence of Two Wings:** Designed by Italian architect Antonio Lasciac, connecting the eastern and western wings through a suspended corridor with French and Italian stained glass depicting Romeo and Juliet.
3. **The Royal Dynasty Jewels:** The collection of the Muhammad Ali Dynasty, including the platinum and diamond wedding tiara of Queen Farida, King Farouk's diamond-encrusted chess set, and historical coffee sets.
4. **Trials of Sovereignty and Accession:** The aftermath of the 1952 revolution, state confiscation, and Princess Fatima's voluntary waiver of residence rights in 1963 in exchange for state preservation.
5. **The Royal Jewelry Museum Restoration:** Presidential Decree No. 173 of 1986 transforming the palace into a public museum, followed by a comprehensive international restoration conforming to the Venice Charter.

---

## Core Application Features

- **Split-Screen Interactive Portal:** Dynamic landing page allowing seamless transitions between both chronicles, with smooth editorial layout expansion.
- **Interactive Dual-Column Story Reader:** 
  - *Visual Stage:* High-definition historical imagery with interactive hotspot coordinates (`x, y`) that unlock archival footnotes and museum relics.
  - *Curatorial Notes Mode:* Toggles between the artwork presentation and critical historiographical annotations.
  - *Illuminated Narrative Prose:* Classical Arabic typography with drop-caps and historical dilemma decision cards.
  - *Interactive Timeline Map:* Five-node progress bar tracking milestones and allowing rapid chapter traversal.
- **Comparative Lore Laboratory:** A four-axis analytical matrix contrasting Greek and Mediterranean heritage across intellect, trial of time, sovereignty, and immortality.
- **Relic Satchel and Curatorial Inspection:** Drawer holding 10 unlocked artifacts with a full inspection modal displaying catalog codes, historical origins, and symbolic analyses.
- **Bilingual Nocturnal Museum Mode:** Instant toggle between Day Gallery (Alabaster Limestone) and Night Gallery (Obsidian Charcoal), strictly scoped to avoid OS media query interference.
- **Synthesized Ambient Web Audio:** Zero-dependency sound design using native Web Audio API oscillators and filters to generate tactile page-turn sounds, decision stamps, and ambient museum tones.

---

## Technology Stack

- **Framework:** React 19 + TypeScript
- **Build Tool:** Vite 8
- **Styling:** Tailwind CSS 3.4
- **Animation Engine:** Framer Motion
- **Iconography:** Lucide React
- **Sound Generation:** Native Web Audio API (Synthesized)
- **Quality Assurance:** Oxlint, TypeScript strict mode

---

## Project Directory Structure

```
d:/Doma/
├── public/
│   └── images/
│       ├── fatima-palace.jpg               # User palace facade photograph
│       ├── alex-palace-corridor.jpg        # Romeo and Juliet stained glass corridor
│       ├── alex-palace-wing.jpg            # Antonio Lasciac architectural wing
│       ├── alex-jewel-royal-family.jpg     # Royal jewelry vitrines and showcases
│       ├── alex-jewel-exhibit-tiara.jpg    # Queen Farida diamond and platinum tiara
│       ├── alex-jewel-exhibit-hall.jpg     # Royal exhibition hall
│       ├── alex-jewel-exhibit-vitrine.jpg  # Gold tray and sovereign treasures
│       ├── alex-palace-facade-garden.jpg   # Restored palace facade and gardens
│       ├── odyssey-sounion-cover.jpg       # Temple of Poseidon at Cape Sounion
│       ├── odyssey-trojan-horse-vase.jpg   # Mykonos relief amphora (675 BC)
│       ├── odyssey-polyphemus.jpg          # Eckersberg classical painting
│       ├── odyssey-sirens-vase.jpg         # British Museum Siren Vase (480 BC)
│       ├── odyssey-scylla-messina.jpg      # Strait of Messina
│       └── odyssey-suitors-bow.jpg         # Penelope Painter Attic skyphos
├── src/
│   ├── components/
│   │   ├── Navbar.tsx                      # Persistent top navigation and mode switcher
│   │   ├── PortalView.tsx                  # Split-screen portal landing view
│   │   ├── StoryReaderView.tsx             # Two-column interactive chapter reader
│   │   ├── ParallelLoreView.tsx            # Comparative thematic analysis laboratory
│   │   ├── RelicSatchelDrawer.tsx          # Slide-over artifact collection drawer
│   │   ├── RelicInspectModal.tsx           # Fullscreen curatorial examination modal
│   │   └── Ornaments.tsx                   # SVG Greek Meanders and Arabesques
│   ├── data/
│   │   └── storiesData.ts                  # Complete historiographical narrative data
│   ├── utils/
│   │   └── soundEffects.ts                 # Web Audio API procedural sound synthesizer
│   ├── types.ts                            # Core TypeScript interface definitions
│   ├── App.tsx                             # Top-level state and routing coordinator
│   ├── main.tsx                            # React DOM entry point
│   └── index.css                           # Parchment textures and custom scrollbars
├── index.html                              # HTML shell with Google Fonts
├── tailwind.config.js                      # Custom color palettes and tactile shadows
├── tsconfig.json                           # TypeScript compiler configuration
└── package.json                            # Dependencies and build scripts
```

---

## Getting Started

### Prerequisites

- Node.js (version 18.0.0 or higher recommended)
- npm (version 9.0.0 or higher)

### Installation

1. Clone or navigate to the repository directory:
   ```bash
   cd Doma
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```

4. Open `http://localhost:5173/` in your browser.

---

## Build and Deployment

To compile a production bundle:

```bash
npm run build
```

This performs TypeScript type verification and runs Vite's build pipeline, outputting optimized static assets into the `dist/` directory.

To preview the production build locally:

```bash
npm run preview
```

---

## Curatorial Notes and Citations

1. **Homer:** *The Odyssey*, translated and curated according to standard classical editions.
2. **Prof. Dr. Hussein Ibrahim El-Attar:** *Palace of Princess Fatima Al-Zahraa Ali Haydar (Royal Jewelry Museum)*, Professor of Modern and Contemporary History, Institute of Qualitative Studies, Ministry of Higher Education, Egypt.
3. **Ali Mubarak:** *Al-Khitat Al-Tawfiqiyya Al-Jadida*, Vol. 7, pp. 201-204.
4. **Ibrahim Nashey:** *Studies in the History of Egypt in the Ptolemaic Era*, p. 283.
5. **Suhair Abdel-Hamid:** *Palaces of Egypt*, p. 249.
6. **Artifact Photographic Sources:** Wikimedia Commons public domain archival collections and the British Museum (London). All rights reserved to their respective institutions.
