# Cadet Music Platform 🎷🎶

A Duolingo-style web application that teaches Canadian Air Cadets music — saxophone, clarinet, and the wider band family — so cadets can earn their music badges following official Cadet Training Help standards (**A-CR-CCP-166/PT-001** for saxophone and **A-CR-CCP-166/PT-004** for clarinet).

Built with **React 18 + Vite 6 + TypeScript + Tailwind CSS 4**, with state persisted to `localStorage` via Zustand.

---

## Table of Contents

1. [Overview](#overview)
2. [Key Features](#key-features)
3. [Getting Started](#getting-started)
4. [Project Structure](#project-structure)
5. [Tech Stack & Dependencies](#tech-stack--dependencies)
6. [Build & Bundle Optimization](#build--bundle-optimization)
7. [Curriculum & Standards Compliance](#curriculum--standards-compliance)
8. [Gamification & Learning Loop](#gamification--learning-loop)
9. [Keyboard Shortcuts](#keyboard-shortcuts)
10. [Documentation Archive](#documentation-archive)
11. [Publishing Checklist](#publishing-checklist)
12. [License & Credits](#license--credits)

---

## Overview

The platform takes a cadet from zero experience through six progressive levels (Basic → Level 5) with:

- **Foundational lessons** teaching proper embouchure, breathing, posture, and tone production *before* playing, based on research-backed instruction.
- **Interactive theory exercises**: note identification, rhythm clapping, chord/scale/key-signature builders, interval recognition, dynamics practice, time signatures, and the circle of fifths.
- **Official song repertoire** drawn from the prepared music lists in the CCO technical standards.
- **Audio practice architecture**: microphone-based real-instrument assessment with live waveform visualization and a Tone Coach.
- **Multi-instrument support**: a transposition engine (concert ↔ written pitch) covering 20+ woodwind, brass, and percussion instruments of the Cadet Military Band Program.
- **Competency tracking** across 21 music concepts with invisible adaptive content weighting, plus admin-only performance analytics.

## Key Features

- ✅ Complete 6-level curriculum aligned to official Canadian Cadet Organization standards
- ✅ Saxophone **and** clarinet instrument-specific lesson tracks
- ✅ Interactive lessons combining theory, listening, and playing components
- ✅ Song selection from official prepared repertoire lists
- ✅ Competency tracking (21 concepts) + adaptive content weighting
- ✅ Audio practice: microphone input, real-time waveform, Tone Coach feedback
- ✅ Transposition engine and multi-instrument architecture (20+ instruments)
- ✅ Animated music notation: staff, rhythm, scale, key-signature, dynamics, and note-value displays
- ✅ 136+ unique animations (Framer Motion) with a dedicated animation demo page
- ✅ Gamification: XP, streaks (with streak freezes), daily practice quests, achievements, leaderboard
- ✅ Practice log feeding directly into quest progress — correct answers advance your daily goals
- ✅ ⌘K command palette + global keyboard shortcuts (`?` opens the shortcut help overlay)
- ✅ Customizable banners with sticker placement
- ✅ Legal pages (Privacy Policy, Terms of Service, Cookie Policy) + 841 Squadron copyright footer
- ✅ Secret corner-click admin panel (password protected)
- ✅ Onboarding quiz, dark mode, fully responsive design
- ✅ Session persistence via `localStorage` (Zustand `persist`)

## Getting Started

```bash
npm install        # install dependencies
npm run dev        # start dev server at http://localhost:3000
npm run typecheck  # TypeScript validation (tsc --noEmit)
npm run build      # production build → dist/
```

Deploy the static `dist/` folder to any static host (Netlify, Vercel, GitHub Pages, Cloudflare Pages, or a plain web server). No backend is required today — all state lives in the browser.

## Project Structure

```
src/
├── App.tsx                 # SPA shell: routing by state, lazy-loaded views
├── main.tsx                # React entry point
├── store.ts                # Zustand store (persisted): users, progress, streaks, quests, practice log
├── index.css               # Tailwind 4 + theme tokens
├── hooks/
│   └── useKeyboardShortcuts.ts
├── components/
│   ├── Dashboard.tsx, LessonView.tsx, Onboarding.tsx, Login.tsx
│   ├── CommandPalette.tsx, ShortcutsHelp.tsx, KonamiListener.tsx
│   ├── QuestsAndPractice.tsx, Mascot.tsx, Banner.tsx, Footer.tsx
│   ├── Analytics.tsx, AdminPanel.tsx, Settings.tsx, Leaderboard.tsx
│   ├── Songs.tsx, ToneCoach*.tsx, MicrophonePractice.tsx, WaveformVisualizer.tsx
│   ├── MusicStaff.tsx, RhythmDisplay.tsx, ScaleDisplay.tsx, CircleOfFifths.tsx, …
│   ├── VirtualSaxophone.tsx, SaxophoneAssembly.tsx
│   ├── PrivacyPolicy.tsx, TermsOfService.tsx, CookiePolicy.tsx
│   ├── AnimatedComponents.tsx, AnimationDemo.tsx
│   └── theory/             # interactive exercise widgets
├── audioManager.ts, audioActivities.ts   # Web Audio playback + ear-training activities
├── songs.ts, detailedSongLessons.ts      # official repertoire + per-song lessons
├── levelStandards.ts, competency.ts, adaptive.ts, quests.ts
├── curriculum.ts / theory.ts             # lesson content
├── instruments.ts                        # multi-instrument definitions + transposition
└── coach.ts                              # Tone Coach logic
```

## Tech Stack & Dependencies

Deliberately minimal — everything unused has been removed:

| Package | Purpose |
|---|---|
| `react`, `react-dom` (18) | UI framework |
| `zustand` (+ `persist`) | State management & localStorage persistence |
| `framer-motion` (11) | Animations (imported by ~38 components) |
| `canvas-confetti` | Celebration effects |
| `vite` (6) + `@vitejs/plugin-react` | Build tooling |
| `tailwindcss` (4) + `@tailwindcss/vite` | Styling |
| `typescript` | Type safety (`npm run typecheck`) |

**Removed as unused:** `@dnd-kit/*`, `@supabase/supabase-js`, `date-fns`, `lucide-react`, `react-router-dom`, `recharts`, `uuid` (and `@types/uuid`). The app uses its own state-driven view switching, native emoji iconography, hand-rolled charts/animations, and `crypto.randomUUID()` where IDs are needed. If a future backend migration needs Supabase or routing, reinstall deliberately.

## Build & Bundle Optimization

`vite.config.js` uses route-level code splitting (`React.lazy` for rarely visited views such as Settings, Leaderboard, AdminPanel, Songs, Banner, Analytics, AnimationDemo, legal pages, and ToneCoach) **plus** `manualChunks` to keep vendor code stable and cacheable:

```js
manualChunks(id) {
  if (id.includes('node_modules')) {
    // framer-motion is imported by ~38 components; isolate it so it
    // stays a single long-term-cached chunk instead of being inlined
    // into every route chunk that uses it.
    if (id.includes('framer-motion')) return 'vendor-framer-motion';
    if (/[\\/](react|react-dom|scheduler)[\\/]/.test(id)) return 'vendor-react';
    if (id.includes('zustand') || id.includes('canvas-confetti')) return 'vendor-utils';
    return 'vendor';
  }
}
```

Result: one shared `vendor-framer-motion` chunk fetched once and cached across all routes (AnimationDemo itself is already lazy-loaded, so its extras don't hit the initial bundle), a stable `vendor-react` chunk, and small per-route chunks.

## Curriculum & Standards Compliance

- Levels follow **A-CR-CCP-166/PT-001** (saxophone) and **A-CR-CCP-166/PT-004** (clarinet) technical standards, including pre-course/articulation fundamentals and per-level goals encoded in `levelStandards.ts`.
- Song lists were verified and corrected against the official prepared repertoire (see the audit records in the documentation archive).
- Dynamics terminology (pp–ff), key signatures, scales, and intervals taught match the published syllabus.

## Gamification & Learning Loop

1. **Lessons & exercises** produce correct/incorrect answers → recorded in the **practice log**.
2. Correct answers roll up into **competency scores** (21 concepts) which drive **adaptive content weighting** — weak areas resurface more often.
3. **Daily practice quests** track minutes logged and answers earned; completing quests grants XP.
4. **Streaks** count consecutive active days and can be protected with **streak freezes**.
5. Achievements, leaderboard, mascot reactions, and confetti close the motivation loop.

## Keyboard Shortcuts

| Keys | Action |
|---|---|
| `⌘K` / `Ctrl+K` | Open command palette (navigate anywhere, run actions) |
| `?` | Toggle the shortcut help overlay |
| `1`–`9` (in palette) | Jump to listed results |
| `Esc` | Close overlays |

Plus a hidden Konami code easter egg 🎮.

## Documentation Archive

All historical implementation reports have been consolidated under [`docs/`](docs/) and are preserved for reference only — this README is the single source of truth:

| Document | Topic |
|---|---|
| [MASTER_DOCUMENTATION.md](docs/MASTER_DOCUMENTATION.md) | Full master documentation (architecture, gap analysis, roadmap) |
| [COMPLETE_PROJECT_DOCUMENTATION.md](docs/COMPLETE_PROJECT_DOCUMENTATION.md) | Earlier complete project docs |
| [CURRICULUM_AUDIT.md](docs/CURRICULUM_AUDIT.md), [OFFICIAL_STANDARDS_VERIFICATION.md](docs/OFFICIAL_STANDARDS_VERIFICATION.md), [OFFICIAL_CCO_REPERTOIRE.md](docs/OFFICIAL_CCO_REPERTOIRE.md), [REPERTOIRE_CORRECTION.md](docs/REPERTOIRE_CORRECTION.md) | Standards & repertoire verification |
| [LEVEL_STANDARDS_IMPLEMENTATION.md](docs/LEVEL_STANDARDS_IMPLEMENTATION.md), [LEVEL_STANDARDS_SUMMARY.md](docs/LEVEL_STANDARDS_SUMMARY.md), [PRE_COURSE_IMPLEMENTATION.md](docs/PRE_COURSE_IMPLEMENTATION.md), [PROFESSIONAL_IMPLEMENTATION_SUMMARY.md](docs/PROFESSIONAL_IMPLEMENTATION_SUMMARY.md) | Level standards & pre-course work |
| [SONG_LESSON_IMPLEMENTATION.md](docs/SONG_LESSON_IMPLEMENTATION.md), [COMPLETE_IMPLEMENTATION_SUMMARY.md](docs/COMPLETE_IMPLEMENTATION_SUMMARY.md), [CRITICAL_FIXES.md](docs/CRITICAL_FIXES.md), [FINAL_SUMMARY.md](docs/FINAL_SUMMARY.md), [IMPLEMENTATION_WITH_SOURCES.md](docs/IMPLEMENTATION_WITH_SOURCES.md) | Song lessons & fixes |
| [INTERACTIVE_LESSON_ENHANCEMENTS.md](docs/INTERACTIVE_LESSON_ENHANCEMENTS.md), [INTERACTIVE_THEORY_IMPLEMENTATION.md](docs/INTERACTIVE_THEORY_IMPLEMENTATION.md), [MUSIC_NOTATION_IMPLEMENTATION.md](docs/MUSIC_NOTATION_IMPLEMENTATION.md) | Interactive theory & notation |
| [ANIMATION_AND_TEST_REPORT.md](docs/ANIMATION_AND_TEST_REPORT.md), [FINAL_IMPLEMENTATION_SUMMARY.md](docs/FINAL_IMPLEMENTATION_SUMMARY.md), [STUNNING_VISUAL_DESIGN.md](docs/STUNNING_VISUAL_DESIGN.md), [PROFESSIONAL_DESIGN_IMPLEMENTATION.md](docs/PROFESSIONAL_DESIGN_IMPLEMENTATION.md), [PROFESSIONAL_DESIGN_TRANSFORMATION.md](docs/PROFESSIONAL_DESIGN_TRANSFORMATION.md) | Design & animation history |
| [LEGAL_PAGES_IMPLEMENTATION.md](docs/LEGAL_PAGES_IMPLEMENTATION.md) | Legal pages & footer |

## Publishing Checklist

- [x] `npm run typecheck` passes
- [x] `npm run build` succeeds; heavy/rare views lazy-loaded; vendor chunks split
- [x] Unused dependencies removed
- [x] Docs consolidated into this README + `docs/` archive
- [ ] Set production values for `name` / version in `package.json` (currently `sandbox-workspace`)
- [ ] Add favicon & Open Graph / social meta tags in `index.html`
- [ ] Smoke-test the golden path (onboard → lesson → quest → streak) in the built `dist/`
- [ ] Add automated tests (vitest + React Testing Library) before further feature work
- [ ] Plan localStorage → backend persistence migration (see Master Documentation § Backend Migration Guide)

## License & Credits

Content derived from Canadian Cadet Organization public training publications (A-CR-CCP-166/PT-001, A-CR-CCP-166/PT-004). Built for **841 Squadron**; see the in-app footer for copyright details.
