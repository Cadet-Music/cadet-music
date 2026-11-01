# Cadet Music Platform - Complete Master Documentation

## Table of Contents

1. [Overview](#overview)
2. [Project Structure](#project-structure)
3. [Authentication System](#authentication-system)
4. [User Management](#user-management)
5. [Curriculum & Standards](#curriculum--standards)
6. [Learning Path](#learning-path)
7. [Lesson System](#lesson-system)
8. [Song Selection](#song-selection)
9. [Gamification](#gamification)
10. [Competency Tracking & Adaptive Learning](#competency-tracking--adaptive-learning)
11. [Adaptive Content Weighting](#adaptive-content-weighting)
12. [Next-Generation Practical Learning System](#next-generation-practical-learning-system)
13. [Audio Practice Architecture](#audio-practice-architecture)
14. [Multi-Instrument Architecture](#multi-instrument-architecture)
15. [Music Notation & Visualization Components](#music-notation--visualization-components)
16. [Animation System](#animation-system)
17. [Admin Panel](#admin-panel)
18. [Security Features](#security-features)
19. [UI/UX Features](#uiux-features)
20. [Legal Pages & Footer](#legal-pages--footer)
21. [Backend Migration Guide](#backend-migration-guide)
22. [Technical Details](#technical-details)
23. [Testing & Quality Assurance](#testing--quality-assurance)
24. [Compliance Status](#compliance-status)
25. [Future Roadmap (Legacy)](#future-roadmap-legacy--preserved-for-historical-reference)
26. [Comprehensive Gap Analysis](#comprehensive-gap-analysis)
27. [Consolidated Future Development Roadmap](#consolidated-future-development-roadmap)
28. [Gap Analysis Methodology & Verification Notes](#gap-analysis-methodology--verification-notes)

---

## Overview

**Cadet Music Platform** is a comprehensive music learning application designed for Canadian Air Cadets to learn saxophone and clarinet following the official standards (A-CR-CCP-166/PT-001 and A-CR-CCP-166/PT-004).

### Key Features

- Complete 6-level curriculum (Basic → Level 5)
- Official Canadian Cadet Organization standards compliance
- **Comprehensive foundational lessons teaching proper technique before playing**
- **Research-based instruction on embouchure, breathing, posture, and tone production**
- **Multi-instrument support: Saxophone and Clarinet with instrument-specific lessons**
- Interactive lessons with theory and playing components
- Song selection from official prepared music lists
- **Competency tracking with 21 music concepts**
- **Adaptive content weighting (invisible personalization)**
- **Admin-only performance analytics**
- **Audio Practice Architecture for real instrument assessment**
- **Microphone integration with real-time waveform visualization**
- **Multi-Instrument Architecture supporting entire Cadet Military Band Program**
- **Transposition Engine for concert pitch ↔ written pitch conversion**
- **20+ Instruments: Woodwinds, Brass, and Percussion**
- **Beautiful Music Notation Components with Animations**
- **Interactive Music Staff, Rhythm, Scale, and Key Signature Displays**
- **Stunning Visual Design with 136+ Unique Animations**
- **Comprehensive Legal Pages (Privacy Policy, Terms of Service, Cookie Policy)**
- **841 Squadron Copyright Footer**
- Gamification with XP, streaks, and achievements
- Customizable banners with sticker placement
- Secret admin panel with password protection
- Session persistence with localStorage
- Dark mode support
- Responsive design

---

## Project Structure

```
src/
├── App.tsx                    # Main app component with routing
├── store.ts                   # Zustand state management
├── data.ts                    # Curriculum data and standards
├── theory.ts                  # Theory curriculum (A-CR-CCP-166/PT-004)
├── competency.ts              # Competency tracking & adaptive learning
├── adaptive.ts                # Adaptive content weighting system
├── instruments.ts             # Multi-instrument architecture & transposition
├── audioManager.ts            # Core audio infrastructure
├── audioActivities.ts         # Audio activity types & factory
├── saxophoneFundamentals.ts   # Comprehensive saxophone fundamentals
├── clarinetFundamentals.ts    # Comprehensive clarinet fundamentals
├── lessonContent.ts           # Lesson content (saxophone & clarinet)
├── levelStandards.ts          # Level standards and goals
├── animations.ts              # Animation utilities and variants
├── completeSongLessons.ts     # Complete song lesson database
├── index.css                  # Global styles with advanced animations
├── components/
│   ├── Login.tsx              # Authentication (sign in/sign up)
│   ├── Onboarding.tsx         # Placement assessment
│   ├── Analytics.tsx          # Music Readiness Report & analytics
│   ├── Dashboard.tsx          # Main learning path view
│   ├── LessonView.tsx         # Lesson content and exercises
│   ├── Songs.tsx              # Song selection interface
│   ├── Settings.tsx           # User settings and level management
│   ├── Leaderboard.tsx        # Rankings and banner display
│   ├── Banner.tsx             # Banner customization
│   ├── AdminPanel.tsx         # Admin dashboard with transposition debug
│   ├── Footer.tsx             # Professional footer with legal links
│   ├── PrivacyPolicy.tsx      # Privacy policy page
│   ├── TermsOfService.tsx     # Terms of service page
│   ├── CookiePolicy.tsx       # Cookie policy page
│   ├── SaxophoneAssembly.tsx  # Interactive assembly animation
│   ├── WaveformVisualizer.tsx # Real-time audio waveform display
│   ├── MicrophonePractice.tsx # Microphone practice component
│   ├── AudioPracticeActivity.tsx # Complete audio activity component
│   ├── AudioReferencePlayer.tsx # Audio reference player component
│   ├── GuidedMicrophonePractice.tsx # Guided microphone practice
│   ├── AnimationDemo.tsx      # Animation showcase component
│   ├── MusicStaff.tsx         # Beautiful animated music staff
│   ├── RhythmDisplay.tsx      # Animated rhythm patterns
│   ├── KeySignatureDisplay.tsx # Animated key signatures
│   ├── CircleOfFifths.tsx     # Interactive circle of fifths
│   ├── DynamicsDisplay.tsx    # Animated dynamics display
│   ├── TimeSignatureDisplay.tsx # Animated time signatures & metronome
│   ├── ScaleDisplay.tsx       # Animated scales & intervals
│   ├── NoteValueDisplay.tsx   # Animated note values & rests
│   ├── AnimatedComponents.tsx # Reusable animated UI components
│   ├── theory/                # Interactive theory exercises
│   │   ├── NoteIdentificationExercise.tsx
│   │   ├── KeySignatureBuilder.tsx
│   │   ├── RhythmClappingExercise.tsx
│   │   ├── IntervalRecognitionExercise.tsx
│   │   ├── ScaleBuilderExercise.tsx
│   │   ├── ChordBuilderExercise.tsx
│   │   ├── DynamicsPracticeExercise.tsx
│   │   └── TimeSignatureExercise.tsx
│   └── KonamiListener.tsx     # Easter egg listener
├── tests/
│   └── functionality.test.ts  # Comprehensive test suite
└── public/                    # Static assets
```

---

## Authentication System

### Login Methods

#### 1. Rank + Name + Password
- Dropdown selection for rank (Air Cadet → Warrant Officer 1st Class)
- Last name input
- Password (minimum 6 characters)
- Identifier: `{rank}.{lastname}` (lowercase)

#### 2. Email + Password
- Cadet365 email validation (must end with `.cadets.gc.ca`)
- Password (minimum 6 characters)
- Identifier: email address (lowercase)

### Rank Hierarchy

1. Air Cadet
2. Leading Air Cadet
3. Corporal
4. Flight Corporal
5. Sergeant
6. Flight Sergeant
7. Warrant Officer 2nd Class
8. Warrant Officer 1st Class (Chief - restricted)

### Password Storage

- Passwords stored in localStorage under `cadet_music_users`
- Structure: `{ identifier: { password, username, createdAt } }`
- Validation on login: checks stored password against input
- No auto-account creation (must sign up first)

### Session Persistence

- Active session stored in `cadet_music_session`
- "Continue as [User]" quick login option
- Session cleared on admin reset
- Validates user existence before quick login

---

## User Management

### User Data Structure

```typescript
interface User {
  id: string;
  username: string;
  rank: string;
  lastName: string;
  email: string;
  avatar: string;
  instrument: Instrument;
  instrumentId: string; // Full instrument ID (e.g., "alto-sax", "tenor-sax")
  progress: UserProgress;
  activeSongs: string[];
  theoryLevel: CadetLevel;
  instrumentLevel: CadetLevel;
  onboarded: boolean;
  songsSelected: boolean;
  bannerBg: string;
  bannerStickers: BannerSticker[];
}
```

### Progress Tracking

```typescript
interface UserProgress {
  completedLessons: string[];
  xp: number;
  streak: number;
  lastActiveDate: string;
  level: number;
  accuracy: number;
  stickers: string[];
  goalsCompleted: number;
  conceptMastery: Record<string, ConceptStats>;
}
```

### Level System

- **Theory Level**: Basic → Level 5
- **Playing Level**: Basic → Level 5
- Playing level can exceed theory level (with warning)
- Warning: "You won't earn a badge" if playing > theory

---

## Curriculum & Standards

### Technical Standards (A-CR-CCP-166/PT-001)

#### Six Levels

- **Basic**: Awareness
- **Level One**: Basic knowledge, limited skill
- **Level Two**: Basic knowledge, limited skill
- **Level Three**: Detailed knowledge, skilled
- **Level Four**: Detailed knowledge, skilled
- **Level Five**: Comprehensive knowledge, highly skilled

#### Performance Objectives (POs)

1. **PO 450**: Maintenance (Non-critical)
2. **PO 451**: Technique & Rhythm (Critical)
3. **PO 452**: Individual Practice (Critical)
4. **PO 453**: Intonation (Critical from Level 2)
5. **PO 454**: Prepared Music (Critical)
6. **PO 455**: Ensemble (Critical)
7. **PO 456**: Sight Reading (Critical from Level 3)
8. **PO 457**: Aural Skills (Critical from Level 3)
9. **PO 458**: Music Theory (Critical from Level 2)
10. **PO 459**: Band Drill (Critical)
11. **PO 460**: Conducting (Critical from Level 4)

#### Assessment Structure

- **Critical Items**: Complete/Incomplete (60% minimum required)
- **Non-Critical Items**: Satisfactory/Unsatisfactory (don't block progression)

#### Scale Requirements by Level

- **Basic**: Major scales, ♩=60, 1 octave, no memorization
- **Level One**: Major, Chromatic, Harmonic Minor, ♩=66, 1 octave
- **Level Two**: Same types, ♩=72, 1 octave
- **Level Three**: + Melodic Minor, ♪=60, 2 octaves, memorized
- **Level Four**: Same types, ♪=72, 2 octaves, memorized
- **Level Five**: Same types, ♪=80, 2 octaves, memorized, up to 7 accidentals

### Theory Program (A-CR-CCP-166/PT-004)

#### Basic Level Topics

- The Staff (5 lines, 4 spaces)
- Note Values (whole, half, quarter, eighth, sixteenth)
- Time Signatures (2/4, 3/4, 4/4, common time)
- Navigation Marks (repeats, endings, D.C., D.S., al Fine, to Coda)
- Dynamics (ppp to fff, crescendo, decrescendo)

#### Level One Topics

- Dotted Notes (single and double dots)
- Tones and Semitones (diatonic and chromatic)
- Accidentals (sharp, flat, natural, double sharp/flat)
- Key Signatures (order of sharps/flats, circle of fifths)
- Minor Scales (natural and harmonic)
- Beats and Tempo (Largo to Presto)
- Articulations (tie, slur, legato, staccato, accent, marcato, tenuto)

#### Level Two Topics

- Triplets
- Compound Time (6/8, 9/8, 12/8)
- Scale Degrees (tonic through leading note)
- Finding the Key
- Intervals (size and quality for seconds and thirds)
- Transposition (octave)

#### Level Three Topics

- All Time Signatures (2/2, 3/2, 3/8, 9/8, 12/16)
- All Intervals (perfect, major, minor, augmented, diminished, inversions)
- Melodic Minor Scale
- Triads (major and minor)
- Tempo and Style Terms
- Transposition by Major 2nd

#### Level Four Topics

- Irregular Time Signatures (5/4, 7/4, 5/8, 7/8)
- Finding Key (No Signature)
- Sixths and Sevenths
- Chords on Scale Degrees
- Cadences (Perfect, Plagal, Imperfect, Deceptive)
- Error Detection
- Transposition by Any Interval (five-step method)
- Advanced Tempo Terms

#### Level Five Topics

- C Clefs (alto and tenor)
- Full Interval Spectrum
- Diminished and Augmented Chords
- Triad Inversions
- Dominant Seventh Chords
- Transposing for Instruments
- Cadence Writing
- Short and Open Score

### Glossary

- 45+ Italian and French terms
- Categories: Tempo, Dynamics, Articulation, Style, Technique
- Examples: Adagio, Allegro, Forte, Piano, Legato, Staccato

---

## Learning Path

### Curriculum Structure

```
Pre-Basic (Absolute Beginners)
├── Welcome to Music
├── Instrument Care Basics
├── Basic Posture
├── Breathing Basics
├── Embouchure Introduction
├── Making Your First Sound
├── Assembly and Disassembly
└── Pre-Basic Assessment

Basic (9 lessons)
├── Meet Your Saxophone
├── Daily Care (PO 450)
├── Posture & Hold (PO 451)
├── First Notes: B, A, G (PO 451)
├── Quarter Notes (PO 451)
├── The Music Staff (PO 458)
├── Note Names (PO 458)
├── Band Drill Basics (PO 459)
└── Basic Assessment (Exam)

Level One (10 lessons)
├── Cork Care (PO 450)
├── Major Scales (PO 451)
├── Chromatic Scale (PO 451)
├── Harmonic Minor (PO 451)
├── Eighth Notes (PO 451)
├── Tuning Basics (PO 453)
├── Key Signatures (PO 458)
├── Sight Reading Intro (PO 456)
├── Drill Movements (PO 459)
└── Level One Assessment (Exam)

Level Two (8 lessons)
├── Pad Care (PO 450)
├── Scales at ♩=72 (PO 451)
├── Additional Keys (PO 451)
├── Intonation Skills (PO 453)
├── Theory Fundamentals (PO 458)
├── Aural Skills (PO 457)
├── Sight Reading (PO 456)
└── Level Two Assessment (Exam)

[Levels 3-5 follow similar structure]
```

### Lesson Types

- **Theory**: Music theory concepts
- **Playing**: Instrument technique
- **Rhythm**: Rhythm and timing exercises
- **Exam**: Level assessments

### Progression Rules

- Must complete lessons in order
- Each lesson unlocks after previous completion
- XP awarded on completion
- Streak maintained with daily activity

---

## Lesson System

### Lesson Structure

```typescript
interface Lesson {
  id: string;
  title: string;
  type: 'theory' | 'playing' | 'rhythm' | 'exam';
  emoji: string;
  topic: string;
  xp: number;
  description: string;
  interactive: boolean;
  level: CadetLevel;
  po?: number;
}
```

### Exercise Types

1. **Multiple Choice**: Select correct answer from options
2. **True/False**: Binary choice questions
3. **Rhythm Tap**: Tap rhythm pattern
4. **Fill Order**: Arrange items in correct order
5. **Note Match**: Match notes to positions

### Interactive Features

- **Saxophone Assembly**: Drag-and-drop parts in correct order
- **Visual Feedback**: Animations for correct/incorrect answers
- **Progress Tracking**: Visual indicators for lesson completion
- **Confetti**: Celebration on lesson completion

### Lesson Content

- **pb-1**: Meet Your Saxophone (with anatomy diagram)
- **pb-2**: Assembly Steps (interactive assembly)
- **n-1**: First Notes: B, A, G (with fingering chart)
- **r-1**: Quarter Notes (with notation examples)
- **t-3**: Dynamics (with dynamics visualization)

### Documentation Accuracy Note (Gap Analysis, 2026)

The curriculum tree above is a simplified illustration. The actual shipped
curriculum in `src/data.ts` (`CURRICULUM`) contains ~200 lesson entries across
Pre-Basic, Basic, and Levels 1–5 sections, with unique per-lesson topics added
during the curriculum audit (see `CURRICULUM_AUDIT.md`). Detailed content for
lesson IDs exists separately in `src/lessonContent.ts` (saxophone + clarinet);
lessons without a matching entry in `LESSON_CONTENT` fall back to generic quiz
exercises defined inline in `LessonView.tsx`. A full reconciliation of
documented vs. implemented lesson coverage is tracked as gap item
**CUR-09 (Curriculum Coverage Reconciliation)** in the
[Comprehensive Gap Analysis](#comprehensive-gap-analysis).

---

## Song Selection

### Official Prepared Music Lists

#### Basic Level

**List A:**
- Western Portrait
- Austrian Melody
- The Minstrel Boy

**List B:**
- Ode to Joy
- America / God Save the Queen
- Scarborough Fair

#### Level One

**List A:**
- Abendlied
- Andante
- Winter Dreams
- Aria
- Old Folks at Home
- Annie Laurie
- Lullaby

**List B:**
- Gavotte
- Fandango
- Rigaudon
- Scenes that are Brightest
- Waltz
- March

#### Level Two

**List A:**
- At the Hearth
- Meadowland
- Etude in D Minor
- Andante
- Loreley

**List B:**
- Hunter Chorus
- Polka
- Duet Brillant

#### Level Three (RCM Grade 2)

**List A:**
- Air Gracile
- Allerseelen
- Concerto in B-flat Minor
- Romantic Piece
- Andante Grazioso
- On Wings of Song

**List B:**
- Canzonetta and Giga
- Allegro
- Allegro Moderato
- Allegretto Brillante

#### Level Four (RCM Grade 4)

**List A:**
- Romantic Piece
- Chartreuse
- Introduction and Rondo
- Album-Leaf

**List B:**
- Le Secret
- Minuet
- Sicilienne and Allegro

#### Level Five (RCM Grade 6)

**List A:**
- Elegie
- Recitative and Allegro
- Vocalise
- Nocturne
- Larghetto
- Melodie

**List B:**
- Largo and Allegro
- Gypsy Rondo
- Fantaisie Mauresque
- Concertante
- Andante and Allegro

### Song Selection Rules

- Must select 1 song from List A
- Must select 1 song from List B
- Cannot proceed without selecting songs
- Songs are level-specific
- Can change songs later in Settings

---

## Gamification

### XP System

- Lessons award XP on completion
- Level calculated: `level = floor(xp / 100)`
- XP displayed in header and stats

### Streak System

- Daily login maintains streak
- Streak resets if day missed
- Streak displayed with fire icon
- Streak achievements at 7 and 30 days

### Achievements (Stickers)

- **First Steps**: Complete 5 lessons
- **Dedicated**: Complete 20 lessons
- **500 XP**: Earn 500 XP
- **1000 XP**: Earn 1000 XP
- **Week Streak**: 7-day streak
- **Month Streak**: 30-day streak
- **Theory Master**: Reach Level 3 theory
- **Level 5**: Reach Level 5

### Banner Customization

- 6 gradient backgrounds to choose from
- Place stickers anywhere on banner
- Rotate stickers for variety
- Click to remove placed stickers
- Banner displayed on leaderboard

### Leaderboard

- Top 3 podium with banner previews
- Full rankings with mini banners
- Shows XP, level, streak
- Current user highlighted
- Animated transitions

---

## Competency Tracking & Adaptive Learning

### Overview

The platform includes a comprehensive competency tracking system that monitors individual concept mastery, identifies weak areas, and provides personalized learning recommendations. This creates an adaptive learning experience that feels like having a personal instructor.

### Concept Catalog

The system tracks 21 standardized music concepts:

**Basic Theory:**
- Note Values
- Rhythm
- Time Signatures
- Compound Time
- Dynamics
- Articulations

**Intermediate Theory:**
- Accidentals
- Key Signatures
- Scales
- Intervals
- Transposition
- Tempo Terms

**Foundational:**
- Music Staff
- Note Names

**Performance:**
- Saxophone Assembly
- Maintenance
- Intonation
- Sight Reading
- Aural Skills
- Band Drill
- Prepared Music

### Data Model

#### ConceptStats Interface

```typescript
interface ConceptStats {
  correct: number;
  incorrect: number;
  attempts: number;
  lastReviewed: string; // ISO date string
  masteryScore: number; // 0-100
}
```

#### Mastery Level Categories

```typescript
type MasteryLevel = 'Learning' | 'Developing' | 'Proficient' | 'Mastered';
```

#### Get Mastery Level from Score

```typescript
function getMasteryLevel(score: number): MasteryLevel {
  if (score >= 90) return 'Mastered';
  if (score >= 70) return 'Proficient';
  if (score >= 40) return 'Developing';
  return 'Learning';
}
```

### Tracking Functions

#### Record Correct Answer

```typescript
function recordCorrectAnswer(
  conceptMastery: Record<string, ConceptStats>,
  concept: Concept
): Record<string, ConceptStats>
```

#### Record Incorrect Answer

```typescript
function recordIncorrectAnswer(
  conceptMastery: Record<string, ConceptStats>,
  concept: Concept
): Record<string, ConceptStats>
```

### Analytics Utilities

#### Calculate Overall Accuracy

```typescript
function calculateOverallAccuracy(conceptMastery: Record<string, ConceptStats>): number
```

#### Get Mastered Concepts

```typescript
function getMasteredConcepts(conceptMastery: Record<string, ConceptStats>): Concept[]
```

#### Get Weak Topics

```typescript
function getWeakTopics(conceptMastery: Record<string, ConceptStats>): Concept[]
```

Rules:
- Minimum 5 attempts before evaluation
- Sort by: mastery score ascending, attempts descending
- Return top 3 weaknesses

#### Get Recommended Training

```typescript
function getRecommendedTraining(
  conceptMastery: Record<string, ConceptStats>,
  currentLessonId?: string
): { concept: Concept | null; reason: string }
```

Logic priority:
1. Weakest topic
2. Least recently reviewed topic
3. Lowest mastery score
4. Current curriculum lesson

### Competency Badges Framework

#### Badge Definitions

```typescript
interface CompetencyBadge {
  id: string;
  name: string;
  description: string;
  concept: Concept;
  requiredMastery: number;
  requiredAttempts: number;
  tier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
}
```

#### Example Badges

- Rhythm Specialist (Bronze/Silver/Gold)
- Key Signature Expert (Bronze/Silver/Gold)
- Interval Master (Bronze/Silver/Gold)
- Sight Reading Specialist (Bronze/Silver/Gold)
- Aural Skills (Bronze/Silver/Gold)

### Dashboard Integration

#### Music Readiness Report Card

Displayed on main dashboard when user has attempted at least one concept:

**Shows:**
- Overall Accuracy
- Mastered Concepts
- Developing Concepts
- Strongest Topic
- Weakest Topic

**Example:**

```
Overall Accuracy: 84%

Strongest Topic:
Intervals (95%)

Needs Improvement:
Key Signatures (62%)

Mastered Concepts:
12
```

#### Analytics Page

**Statistics:**
- Questions Answered
- Correct Answers
- Incorrect Answers
- Overall Accuracy
- Mastered Concepts
- Current Strongest Topic
- Current Weakest Topic

---

## Adaptive Content Weighting

### Overview

The Adaptive Content Weighting System invisibly personalizes the learning experience by adjusting the frequency of concepts based on individual mastery. Cadets receive more practice on weaker areas without any explicit feedback or reporting. The system behaves like an experienced band officer who naturally provides extra exposure to challenging areas.

### Design Philosophy

- **Invisible Adaptation**: Cadets are never told they are weak at something
- **Natural Learning Path**: Curriculum progression remains fixed
- **Subtle Support**: The app feels intuitive without being obvious
- **No Negative Feedback**: No messages about weaknesses or readiness scores

### Mastery Tier Weights

Each concept receives a weight multiplier based on its mastery tier:

| Mastery Tier | Score Range | Weight | Effect |
|--------------|-------------|--------|--------|
| Learning | 0-39% | 3.0x | 3x more likely to be selected |
| Developing | 40-69% | 1.5x | 1.5x more likely to be selected |
| Proficient | 70-89% | 1.0x | Normal selection probability |
| Mastered | 90-100% | 0.5x | Half as likely to be selected |

### Weighted Random Selection

#### Algorithm

```typescript
function selectWeightedConcept(conceptMastery, concepts) {
  // Calculate weights
  const weights = concepts.map(concept => {
    const stats = conceptMastery[concept];
    const masteryLevel = getMasteryLevel(stats.masteryScore);
    return MASTERY_WEIGHTS[masteryLevel];
  });
  
  // Calculate total weight
  const totalWeight = weights.reduce((sum, w) => sum + w, 0);
  
  // Weighted random selection
  let random = Math.random() * totalWeight;
  for (let i = 0; i < concepts.length; i++) {
    random -= weights[i];
    if (random <= 0) return concepts[i];
  }
}
```

#### Example

If a cadet has:
- Rhythm: 95% mastery (Mastered) → 0.5x weight
- Key Signatures: 45% mastery (Developing) → 1.5x weight
- Intervals: 25% mastery (Learning) → 3.0x weight

The selection probabilities would be:
- Rhythm: 0.5 / 5.0 = 10%
- Key Signatures: 1.5 / 5.0 = 30%
- Intervals: 3.0 / 5.0 = 60%

### Adaptive Exercise Selection

#### Exercise Grouping

```typescript
const exercisesByConcept = {
  'rhythm': [exercise1, exercise2, exercise3],
  'keySignatures': [exercise4, exercise5],
  'intervals': [exercise6, exercise7, exercise8],
};
```

#### Weighted Selection Process

1. Calculate weights for each concept
2. Select a concept using weighted random selection
3. Select a random exercise from that concept's pool
4. Repeat for desired number of exercises
5. Avoid duplicates within a session

#### Session Distribution

Adaptive sessions use a 60/40 split:
- **60% Focus Concepts**: Weaker areas (Learning/Developing)
- **40% Review Concepts**: Maintenance of proficiency

#### Implementation Status (v1.1.1 — October 2026)

✅ **WIRED INTO THE LEARNER EXPERIENCE.** As of v1.1.1, the weighting engine is connected to the live lesson flow (closing Gap Analysis finding B1 / architectural weakness E4):

- `src/components/LessonView.tsx` exports and uses `selectAdaptiveExercises()`, which orders each lesson's exercises by adaptive weight using **weighted sampling without replacement** built from the engine's own primitives (`calculateAllAdaptiveWeights()` + `applyConceptFloor()`).
- **Diversity rule respected**: two consecutive exercises are never drawn from the same concept when an alternative with remaining weight exists.
- **No exercise dropped**: exercises without a concept tag keep their original position; every assigned exercise in the lesson still appears.
- **Stable within a run, fresh per run**: ordering is memoized on `[currentLessonId, sessionKey]`, so re-rendering mid-quiz never reshuffles questions, but starting another practice run ("Continue to Practice") regenerates the order against the cadet's latest `user.progress.conceptMastery`.
- **User-visible signal**: a banner at the top of each quiz step reads **"Adaptive Focus: …"** listing the prioritized concepts, rendered with `role="status"` for screen-reader announcement. This surfaces adaptivity *positively* (what you'll focus on) without exposing weakness scores, consistent with the "No Negative Feedback" design philosophy above.
- **Tests**: `src/tests/adaptiveSelection.test.ts` (run via `npx tsx src/tests/adaptiveSelection.test.ts`) verifies state classification, weight tiers, recency multiplier behavior, weak-concept dominance, session-cap handling, and the diversity rule across 50 randomized sessions — 11/11 checks passing.

Deferred follow-on work (Phase 1): cross-lesson session mixing and "Today's Practice" auto-recommendations will consume this same wiring *(A2)*.

### Admin Analytics (Instructor Only)

#### Concept Accuracy Report

Instructors can view detailed performance analytics:

```
Concept Accuracy:
Rhythm ........... 92%
Dynamics ......... 88%
Intervals ........ 61%
Key Signatures ... 55%
```

#### Suggested Focus Areas

System identifies concepts needing attention:
- Lowest accuracy concepts
- Concepts with high mistake counts
- Recently attempted concepts with poor performance

#### Predicted Trouble Areas

Forward-looking analysis:
- Concepts trending downward
- Concepts with increasing error rates
- Areas where cadet is struggling

---

## Next-Generation Practical Learning System

### Overview

The Next-Generation Practical Learning System transforms the platform from a question-answering app into an interactive training platform that teaches like a music instructor. The system emphasizes hands-on, kinesthetic learning over passive multiple-choice questions.

### Design Philosophy

#### Learning Priority Order

1. **Do** - Hands-on interaction with instruments and concepts
2. **Hear** - Audio feedback and pitch detection
3. **See** - Visual representations and demonstrations
4. **Read** - Text-based explanations (supporting role)

#### Core Principles

- Replace passive multiple-choice with interactive activities
- Provide real-world practice scenarios
- Support official DND saxophone qualification preparation
- Make learning feel like training with an instructor
- Never tell users they are weak—quietly help them improve

### System Components

#### 1. Virtual Saxophone Engine

Interactive SVG-based saxophone with clickable keys and multiple learning modes:

**Learning Modes:**
- **Build Note**: Display written note, user presses keys to produce it
- **Identify Note**: Display fingering, user identifies the note
- **Scale Builder**: User constructs scales note by note
- **Random Practice**: System generates random notes for practice

**Technical Features:**
- 9 interactive keys with realistic positioning
- 17 note fingerings (D3 to C5)
- Real-time fingering validation
- Visual feedback for correct/incorrect fingerings
- Support for all saxophone types (Alto, Tenor, Baritone, Soprano)

**Usage Example:**

```typescript
<VirtualSaxophone
  instrument="alto"
  mode="build-note"
  targetNote="G4"
  showNoteName={true}
  onComplete={(correct) => {
    if (correct) {
      recordCorrectAnswer('scales');
    } else {
      recordIncorrectAnswer('scales');
    }
  }}
/>
```

#### 2. Microphone & Pitch Detection System

Browser-based audio analysis using Web Audio API:

**Capabilities:**
- **Note Detection**: Real-time pitch detection from microphone input
- **Pitch Recognition**: Identify played notes with cent-level accuracy
- **Scale Verification**: Validate complete scale performances
- **Rhythm Practice**: Metronome-based timing exercises
- **Song Practice**: Play along with prepared music

**Technical Details:**
- Autocorrelation algorithm for accurate pitch detection
- Supports sample rates up to 44.1kHz
- Confidence scores for detected pitches
- Cents deviation calculation from target pitch
- Works with monophonic instruments (saxophone, clarinet, etc.)

**Key Functions:**
- `AudioAnalyzer` class: Full audio processing pipeline
- `detectPitchAutocorrelation()`: Core pitch detection algorithm
- `frequencyToNote()`: Convert Hz to note name
- `isPitchCorrect()`: Validate detected pitch against target
- `verifyScalePerformance()`: Check complete scale performance

**Usage Example:**

```typescript
const analyzer = new AudioAnalyzer();
await analyzer.initialize();
analyzer.startListening();

const pitch = analyzer.getCurrentPitch();
if (pitch && isPitchCorrect(pitch, 'A', 4, 25)) {
  recordCorrectAnswer('intonation');
}
```

#### 3. Interactive Activity Framework

Comprehensive system for hands-on learning activities:

**Activity Types:**
1. **Multiple Choice** - Traditional quiz (supporting role)
2. **True/False** - Binary choice questions
3. **Drag and Drop** - Drag items to correct positions
4. **Note Placement** - Place notes on staff lines/spaces
5. **Rhythm Tapping** - Tap rhythms with metronome
6. **Fingering Challenges** - Identify/produce fingerings
7. **Staff Construction** - Build musical notation
8. **Theory Manipulation** - Transpose, invert, harmonize
9. **Virtual Saxophone** - Interactive instrument
10. **Microphone** - Pitch detection exercises

**Example Activities:**
- `KEY_SIGNATURE_DRAG_DROP`: Drag sharps to staff positions
- `CHORD_PLACEMENT`: Build C major triad on staff
- `RHYTHM_TAP_1`: Tap rhythm pattern at 80 BPM
- `FINGERING_IDENTIFY_1`: Identify note from fingering
- `STAFF_CONSTRUCT_1`: Construct key signature
- `TRANSPOSE_1`: Transpose melody to new key

**Activity Creation:**

```typescript
const activity = createActivity('drag-drop', {
  concept: 'keySignatures',
  difficulty: 'medium',
  instructions: 'Drag sharps to create D major key signature',
  items: [
    { id: 'sharp1', label: '♯', correctPosition: 'F5' },
    { id: 'sharp2', label: '♯', correctPosition: 'C5' },
  ],
});
```

#### 4. Song Metadata System

Comprehensive metadata for prepared music:

**Song Data Structure:**

```typescript
interface SongMetadata {
  id: string;
  title: string;
  composer: string;
  level: CadetLevel;
  listType: 'A' | 'B';
  concepts: Concept[]; // Concepts practiced
  technicalRequirements: {
    keySignature?: string;
    timeSignature?: string;
    tempoRange?: { min: number; max: number };
    dynamics?: string[];
    articulations?: string[];
    range?: { lowest: string; highest: string };
    scales?: string[];
  };
  theoryRequirements: {
    keySignatures?: string[];
    timeSignatures?: string[];
    intervals?: string[];
    scales?: string[];
    articulations?: string[];
    transposition?: boolean;
    sightReading?: boolean;
  };
  difficulty: {
    technical: 'easy' | 'medium' | 'hard' | 'very-hard';
    rhythmic: 'easy' | 'medium' | 'hard' | 'very-hard';
    theoretical: 'easy' | 'medium' | 'hard' | 'very-hard';
  };
  practiceFocus: string[];
}
```

**Song Database:**
- **Basic Level** (4 songs): Western Portrait, Austrian Melody, The Minstrel Boy, Ode to Joy
- **Level One** (2 songs): Hunter Chorus, Abendlied

**Key Functions:**
- `getSongsForLevel()`: Get all songs for a cadet level
- `getSongById()`: Retrieve specific song metadata
- `calculateSongAwareWeights()`: Adjust adaptive weights based on songs
- `getSongPracticeRecommendations()`: Priority recommendations
- `getSongCoverageAnalysis()`: Analyze concept coverage
- `generateSongAwareAnalytics()`: Full analytics for admin

#### 5. Song-Aware Adaptation

The adaptive learning system now considers selected exam songs:

**How It Works:**

1. **Song Analysis**: When a cadet selects exam songs, the system analyzes:
   - Required concepts (scales, key signatures, articulations, etc.)
   - Technical difficulty
   - Theoretical requirements

2. **Weight Adjustment**: Concepts required for selected songs receive increased weight:

```typescript
// Base weight from mastery
let weight = calculateAdaptiveWeight(conceptMastery[concept]);

// Boost if concept is required for selected song
if (isConceptRequiredForSongs(concept, selectedSongs)) {
  weight *= 1.5; // 50% boost
}
```

3. **Invisible Adaptation**: The cadet never sees messages like "Practice articulations for Hunter Chorus." Instead, they simply encounter more articulation exercises naturally.

**Benefits:**
- Practice is directly relevant to exam preparation
- Weak areas in required songs get extra attention
- Learning feels purposeful and targeted
- No explicit feedback about weaknesses

**Updated Functions:**
- `calculateAllAdaptiveWeights()`: Now accepts optional `selectedSongs` parameter
- `selectWeightedConceptWithSafeguards()`: Passes song context through
- `generateAdaptiveSessionWithSafeguards()`: Song-aware session generation
- Legacy wrappers updated to support song-aware weighting

#### 6. Admin Analytics Enhancements

Instructors can now see song-aware analytics:

**New Analytics Features:**
- Song-by-song concept mastery breakdown
- Overall coverage analysis
- Priority recommendations based on song requirements
- Concept-song mapping visualization
- Readiness assessment per song

**Example Admin View:**

```
Song: Hunter Chorus (Level One, List B)
├── Concepts Required: 4
│   ├── Articulations: 72% mastery ⚠️
│   ├── Rhythm: 85% mastery ✅
│   ├── Dynamics: 68% mastery ⚠️
│   └── Scales: 91% mastery ✅
├── Overall Readiness: 79%
└── Focus Areas: Articulations, Dynamics
```

### Integration Points

#### LessonView.tsx (needs update)
- Can now include VirtualSaxophone activities
- Supports microphone-based exercises
- Integrates with activity framework
- Handles new activity types

#### Dashboard.tsx (needs update)
- Display song-aware recommendations
- Show practice focus areas
- Link to interactive activities

#### AdminPanel.tsx (needs update)
- Enhanced analytics with song coverage
- Concept-song mapping
- Priority recommendations

### Data Flow

```
User selects exam songs
    ↓
Song metadata analyzed (concepts, requirements)
    ↓
Adaptive weights adjusted (song-aware boost)
    ↓
Activities generated (virtual sax, microphone, etc.)
    ↓
User practices with interactive tools
    ↓
Competency tracking updated
    ↓
Admin sees song-aware analytics
```

### Future Instrument Support

The architecture supports future instruments without major refactoring:

**Current Support:**
- Alto Saxophone (fully implemented)

**Planned Support:**
- Tenor Saxophone
- Baritone Saxophone
- Soprano Saxophone
- Clarinet
- Flute
- Trumpet
- Trombone
- Percussion

**Instrument-Agnostic Design:**
- Fingering data is instrument-specific but interface is generic
- Pitch detection works for any monophonic instrument
- Activity framework is instrument-agnostic
- Song metadata can include any instrument

**Adding New Instruments:**
1. Add fingering data (like `ALTO_SAX_FINGERINGS`)
2. Add key definitions (like `ALTO_SAX_KEYS`)
3. Update VirtualSaxophone component to render new instrument
4. Add instrument-specific songs to song database
5. No changes needed to adaptive system or activity framework

### Performance

#### Build Performance
- **Build time**: 3.19 seconds
- **Bundle size**: 435.80 kB (gzipped: 125.85 kB)
- **CSS size**: 44.19 kB (gzipped: 8.53 kB)
- **Modules**: 410 transformed
- **No errors or warnings**

#### Runtime Performance
- **Animation frame rate**: 60 FPS
- **Component render time**: < 16ms
- **Memory usage**: Minimal (SVG-based)
- **CPU usage**: Low (hardware accelerated)

### Security & Privacy

#### Microphone Access
- Requires explicit user permission
- Permission requested only when needed
- Clear explanation of why access is needed
- Easy to revoke in browser settings

#### Data Privacy
- All audio processing happens client-side
- No audio data sent to servers
- No recordings stored
- Temporary audio buffers cleared on cleanup

#### Browser Security
- Requires HTTPS for microphone access (except localhost)
- Follows browser security policies
- Respects user privacy settings

### Future Enhancements

#### Phase 2: Pitch Detection
- Implement autocorrelation algorithm
- Add YIN algorithm for better accuracy
- Support for multiple simultaneous notes
- Real-time pitch tracking

#### Phase 3: Rhythm Analysis
- Beat detection algorithm
- Tempo estimation
- Rhythm pattern matching
- Timing accuracy scoring

#### Phase 4: Advanced Analysis
- Tone quality assessment
- Vibrato detection
- Dynamics analysis
- Articulation recognition

#### Phase 5: Exam Integration
- Full exam piece assessment
- Scoring rubrics
- Progress tracking
- Certificate generation

#### Phase 6: Multi-Instrument Support
- Clarinet fingering charts
- Flute embouchure guidance
- Trumpet range extension
- Trombone slide positions
- Percussion rhythm patterns

---

## Audio Practice Architecture

### Overview

The Audio Practice Architecture provides a comprehensive foundation for real instrument assessment in the Cadet Music Platform. This system enables cadets to practice with their actual instruments using microphone input, with real-time waveform visualization and future-ready hooks for pitch detection and analysis.

### Architecture Components

#### 1. AudioManager (`src/audioManager.ts`)

The core audio infrastructure class that manages the entire audio lifecycle.

**Responsibilities:**
- **Microphone Permissions**: Handles browser permission requests
- **Audio Stream Lifecycle**: Manages MediaStream and AudioContext
- **Recording State**: Tracks current audio state through state machine
- **Future Analysis Hooks**: Provides extension points for pitch/rhythm analysis
- **Metrics Collection**: Captures real-time audio metrics (RMS, peak amplitude)

**State Machine:**

```
idle → requesting → ready → listening → processing → success
                                    ↓
                                  error
```

**States:**
- `idle`: Not initialized, no microphone access
- `requesting`: Requesting microphone permission from browser
- `ready`: Microphone available, ready to listen
- `listening`: Actively capturing audio from microphone
- `processing`: Analyzing captured audio (future: pitch detection)
- `success`: Analysis complete, successful result
- `error`: Error occurred (permission denied, device unavailable, etc.)

**Key Methods:**

```typescript
// Request microphone access
async requestMicrophoneAccess(): Promise<boolean>

// Start/stop listening
startListening(): void
stopListening(): void

// Get audio data for visualization
getWaveformData(): Uint8Array | null
getFrequencyData(): Uint8Array | null

// Future analysis hooks
async analyzePitch(): Promise<void>
async analyzeRhythm(): Promise<void>

// Callbacks
setOnStateChange(callback: (state: AudioState) => void): void
setOnMetrics(callback: (metrics: AudioMetrics) => void): void
setOnError(callback: (error: Error) => void): void

// Cleanup
async cleanup(): Promise<void>
```

**Audio Metrics:**

```typescript
interface AudioMetrics {
  rms: number;              // Root Mean Square (volume level)
  peak: number;             // Peak amplitude
  frequency?: number;       // Dominant frequency (Hz) - future
  note?: string;            // Detected note name - future
  octave?: number;          // Detected octave - future
  confidence?: number;      // Detection confidence (0-1) - future
  cents?: number;           // Cents deviation from perfect pitch - future
}
```

**Configuration:**

```typescript
interface AudioManagerConfig {
  sampleRate?: number;              // Default: 44100 Hz
  fftSize?: number;                 // Default: 2048
  smoothingTimeConstant?: number;   // Default: 0.8
  minDecibels?: number;             // Default: -90
  maxDecibels?: number;             // Default: -10
}
```

#### 2. WaveformVisualizer (`src/components/WaveformVisualizer.tsx`)

Real-time waveform visualization component using actual microphone input.

**Features:**
- **Real-time Display**: Shows live audio waveform from microphone
- **Canvas-based**: Lightweight, performant rendering
- **Responsive**: Adapts to container width
- **Mobile-friendly**: Touch-optimized, works on all devices
- **Customizable**: Configurable colors and height

**Props:**

```typescript
interface WaveformVisualizerProps {
  audioManager: AudioManager;  // Audio source
  isActive: boolean;            // Whether to show active waveform
  color?: string;               // Waveform color (default: #c9a84c)
  backgroundColor?: string;     // Background color (default: #1a2332)
  height?: number;              // Canvas height in pixels (default: 100)
}
```

**Implementation Details:**
- Uses `requestAnimationFrame` for smooth 60 FPS rendering
- Reads from `AnalyserNode.getByteTimeDomainData()`
- Normalizes audio data to 0-2 range for visualization
- Automatically resizes on window resize events
- Shows idle state (center line) when not active

#### 3. MicrophonePractice (`src/components/MicrophonePractice.tsx`)

Reusable component for microphone-based practice activities.

**Features:**
- **Permission Handling**: Guides users through microphone permission flow
- **State Visualization**: Clear visual indicators for each state
- **Waveform Display**: Real-time audio visualization
- **Error Handling**: User-friendly error messages
- **Accessibility**: Keyboard navigation, screen reader support

**States Display:**

**Idle State:**
- Microphone icon
- "Enable Microphone" button
- Permission request explanation

**Requesting State:**
- Animated microphone icon
- "Requesting Microphone Access..." message
- Browser permission prompt guidance

**Ready State:**
- Waveform visualization (idle)
- Green "Microphone Ready" indicator
- "Start Listening" button

**Listening State:**
- Live waveform visualization
- Red pulsing "Listening..." indicator
- "Stop Listening" button

**Processing State:**
- Spinning analysis icon
- "Analyzing Your Playing..." message
- Processing indicator

**Success State:**
- Green checkmark icon
- "Analysis Complete!" message
- "Done" button

**Error State:**
- Red error icon
- Error message display
- "Try Again" button

#### 4. AudioPracticeActivity (`src/components/AudioPracticeActivity.tsx`)

Complete audio practice activity component that integrates all audio features.

**Features:**
- **Activity-specific Instructions**: Shows target notes, scales, patterns
- **Integrated Waveform**: Real-time visualization during practice
- **Full State Management**: Handles complete audio lifecycle
- **Error Recovery**: Graceful error handling with retry options
- **Completion Tracking**: Reports success/failure to parent

**Supported Activity Types:**

**Single Note Practice:**

```typescript
{
  type: 'play-single-note',
  targetNote: 'G4',
  allowedDeviation: 25,  // cents
  duration: 2000,        // ms
}
```

**Scale Practice:**

```typescript
{
  type: 'play-scale',
  targetScale: 'Bb Major',
  direction: 'both',     // ascending, descending, or both
  tempo: 80,             // BPM
}
```

**Pattern Practice:**

```typescript
{
  type: 'play-pattern',
  pattern: ['C4', 'E4', 'G4', 'C5'],
  tempo: 80,
  allowedDeviation: 25,
}
```

**Phrase Practice:**

```typescript
{
  type: 'play-phrase',
  phrase: 'Musical phrase description',
  notes: ['C4', 'D4', 'E4', 'F4'],
  rhythm: 'Quarter notes',
  dynamics: 'mf',
  articulation: 'legato',
  tempo: 80,
}
```

**Exam Excerpt Practice:**

```typescript
{
  type: 'play-exam-excerpt',
  excerptId: 'exam-piece-1',
  measures: '1-8',
  targetNotes: ['Bb4', 'C5', 'D5'],
  tempo: 100,
  keySignature: 'Bb Major',
  timeSignature: '4/4',
}
```

#### 5. Audio Activities Framework (`src/audioActivities.ts`)

Defines audio activity types and provides factory functions.

**Activity Types:**

```typescript
type AudioActivityType =
  | 'play-single-note'      // Play a specific note
  | 'play-scale'            // Play a complete scale
  | 'play-pattern'          // Play a note pattern/sequence
  | 'play-phrase'           // Play a musical phrase
  | 'play-exam-excerpt';    // Play an excerpt from exam music
```

**Factory Functions:**

```typescript
// Create activities
createSingleNoteActivity(id, concept, targetNote, difficulty)
createScaleActivity(id, concept, targetScale, difficulty)
createPatternActivity(id, concept, pattern, difficulty)
createPhraseActivity(id, concept, phrase, notes, difficulty)
createExamExcerptActivity(id, concept, excerptId, examMetadata, difficulty)

// Get activities by level or concept
getAudioActivitiesForLevel(level)
getAudioActivitiesForConcept(concept)
```

**Predefined Activities:**

**Basic Level:**
- `basic-note-g`: Play note G4
- `basic-note-c`: Play note C5
- `basic-scale-bb`: Bb Major scale
- `basic-scale-eb`: Eb Major scale
- `basic-scale-f`: F Major scale

**Level 1:**
- `l1-scale-all-majors`: All Major Scales
- `l1-arpeggio-1`: C major arpeggio pattern
- `l1-arpeggio-2`: Bb major arpeggio pattern

### Lesson Integration

#### Updated Lesson Interface

```typescript
interface Lesson {
  id: string;
  title: string;
  type: 'theory' | 'playing' | 'rhythm' | 'exam' | 'audio';  // Added 'audio'
  emoji: string;
  topic: string;
  xp: number;
  description: string;
  interactive: boolean;
  level: CadetLevel;
  po?: number;
  requiresMicrophone?: boolean;  // New flag for audio lessons
}
```

#### Audio Lessons in Curriculum

**Basic Level:**
- `audio-basic-note`: Practice playing note G with microphone
- `audio-basic-scale`: Practice Bb Major scale with microphone

**Level One:**
- `audio-pattern`: Practice arpeggio patterns with microphone

#### LessonView Integration

The LessonView component now supports audio exercises:

```typescript
{currentExercise.type === 'audio' && currentExercise.audioActivity && (
  <AudioPracticeActivity
    activity={currentExercise.audioActivity}
    onComplete={() => handleExerciseComplete(true)}
    onError={(error) => {
      console.error('Audio practice error:', error);
      handleExerciseComplete(false);
    }}
  />
)}
```

### Exam Preparation Foundation

#### Exam Metadata Structure

```typescript
interface ExamMetadata {
  examLevel: string;            // e.g., "Level 1", "Level 2"
  examType: string;             // e.g., "Technical", "Musical"
  pieceTitle?: string;          // Name of exam piece
  composer?: string;            // Composer name
  requirements: ExamRequirement[];
}

interface ExamRequirement {
  category: string;             // e.g., "Intonation", "Rhythm", "Tone"
  description: string;          // What is being assessed
  weight: number;               // Importance (0-1)
  criteria: string[];           // Specific criteria to meet
}
```

#### Future Exam Features
- Target notes and allowed notes tracking
- Tempo requirements
- Key signature verification
- Time signature verification
- Exam-specific scoring rubrics

### Admin Features

#### Audio Practice Analytics (Future)

Admin panel will display:
- **Microphone Availability**: Which devices support audio practice
- **Audio Errors**: Common permission/device issues
- **Practice Attempts**: How often cadets use audio features
- **Success Rates**: Completion rates for audio activities
- **Common Issues**: Frequently encountered problems

#### Diagnostic Information

```typescript
// Audio manager diagnostics
audioManager.isSupported()              // Browser support check
audioManager.getStateHistory()          // State transition log
audioManager.getAudioContext()          // AudioContext reference
audioManager.getAnalyser()              // AnalyserNode reference
```

### Browser Compatibility

#### Supported Browsers
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile Chrome
- ✅ Mobile Safari
- ✅ Mobile Firefox

#### Required APIs
- `navigator.mediaDevices.getUserMedia()` - Microphone access
- `AudioContext` / `webkitAudioContext` - Audio processing
- `AnalyserNode` - Audio analysis
- `MediaStreamAudioSourceNode` - Microphone input
- `requestAnimationFrame` - Smooth visualization

#### Feature Detection

```typescript
// Check if audio practice is supported
const isSupported = !!(
  navigator.mediaDevices && 
  navigator.mediaDevices.getUserMedia &&
  (window.AudioContext || (window as any).webkitAudioContext)
);
```

### Mobile Support

#### Touch Optimization
- Large touch targets for buttons
- Responsive waveform canvas
- Optimized for portrait orientation
- Touch-friendly state indicators

#### Mobile Considerations
- Microphone permission prompts on first use
- Background audio handling
- Screen wake lock during practice
- Reduced motion support

### Performance

#### Optimization Strategies
- **Canvas Rendering**: Uses `requestAnimationFrame` for 60 FPS
- **Audio Buffer Size**: 2048 samples (balanced latency/performance)
- **Smoothing**: 0.8 constant for stable visualization
- **Memory Management**: Proper cleanup of audio resources
- **Lazy Initialization**: AudioContext created only when needed

#### Resource Usage
- **CPU**: Minimal (audio analysis runs at 60 FPS)
- **Memory**: ~5-10 MB during active listening
- **Battery**: Moderate impact during extended use
- **Network**: No network required (fully client-side)

### Security & Privacy

#### Microphone Access
- Requires explicit user permission
- Permission requested only when needed
- Clear explanation of why access is needed
- Easy to revoke in browser settings

#### Data Privacy
- All audio processing happens client-side
- No audio data sent to servers
- No recordings stored
- Temporary audio buffers cleared on cleanup

#### Browser Security
- Requires HTTPS for microphone access (except localhost)
- Follows browser security policies
- Respects user privacy settings

### Future Enhancements

#### Phase 2: Pitch Detection
- Implement autocorrelation algorithm
- Add YIN algorithm for better accuracy
- Support for multiple simultaneous notes
- Real-time pitch tracking

#### Phase 3: Rhythm Analysis
- Beat detection algorithm
- Tempo estimation
- Rhythm pattern matching
- Timing accuracy scoring

#### Phase 4: Advanced Analysis
- Tone quality assessment
- Vibrato detection
- Dynamics analysis
- Articulation recognition

#### Phase 5: Exam Integration
- Full exam piece assessment
- Scoring rubrics
- Progress tracking
- Certificate generation

#### Phase 6: Multi-Instrument Support
- Clarinet fingering charts
- Flute embouchure guidance
- Trumpet range extension
- Trombone slide positions
- Percussion rhythm patterns

---

## Multi-Instrument Architecture

### Overview

The Cadet Music Platform is architected to support the entire Cadet Military Band Program, not just saxophone. The multi-instrument architecture provides a comprehensive framework for instrument profiles, transposition engine, and pitch conversion utilities that scale cleanly to all future instruments.

### Design Philosophy

- **Data-Driven**: Instrument definitions are data, not code logic
- **Extensible**: New instruments can be added without modifying core systems
- **Transposition-Aware**: Automatic conversion between concert pitch and written pitch
- **Instrument-Agnostic**: Core audio and lesson systems work with any instrument
- **Future-Proof**: Architecture supports woodwinds, brass, and percussion

### Instrument Profile System

#### InstrumentProfile Interface

```typescript
interface InstrumentProfile {
  id: string;                              // Unique identifier (e.g., "alto-sax")
  name: string;                            // Display name (e.g., "Alto Saxophone")
  family: 'woodwind' | 'brass' | 'percussion';
  
  // Transposition
  transpositionSemitones: number;          // Semitones from concert pitch
  transpositionDirection: 'up' | 'down' | 'none';
  
  // Written range (what the player reads)
  lowestWrittenNote: string;               // e.g., "Bb3"
  highestWrittenNote: string;              // e.g., "F6"
  
  // Concert range (actual sounding pitch)
  lowestConcertNote: string;               // e.g., "Db3"
  highestConcertNote: string;              // e.g., "A5"
  
  // Notation
  clef: 'treble' | 'bass' | 'alto' | 'tenor';
  
  // Properties
  isTransposing: boolean;                  // true for transposing instruments
}
```

#### Instrument Registry

The platform includes a comprehensive registry of 20+ instruments:

**Woodwinds - Saxophones:**
- Alto Saxophone (Eb) - transposes up 9 semitones
- Tenor Saxophone (Bb) - transposes down 2 semitones
- Baritone Saxophone (Eb) - transposes up 9 semitones
- Soprano Saxophone (Bb) - transposes down 2 semitones

**Woodwinds - Clarinets:**
- Clarinet (Bb) - transposes down 2 semitones
- Bass Clarinet (Bb) - transposes down 14 semitones (octave + major 2nd)

**Woodwinds - Other:**
- Flute (C) - concert pitch
- Oboe (C) - concert pitch
- Bassoon (C) - concert pitch

**Brass:**
- Trumpet (Bb) - transposes down 2 semitones
- Cornet (Bb) - transposes down 2 semitones
- Flugelhorn (Bb) - transposes down 2 semitones
- French Horn (F) - transposes down 7 semitones
- Trombone (C) - concert pitch (mostly)
- Euphonium (C) - concert pitch (mostly)
- Tuba (C) - concert pitch (mostly)

**Percussion:**
- Snare Drum - non-pitched
- Bass Drum - non-pitched
- Mallet Percussion (C) - concert pitch
- Auxiliary Percussion - non non-pitched

### Transposition Engine

#### Core Concept

The transposition engine handles the critical difference between:
- **Concert Pitch**: The actual sounding frequency (what the microphone detects)
- **Written Pitch**: What the musician reads on their sheet music

**Example:**
- Microphone detects: Concert Bb4 (466.16 Hz)
- For Tenor Saxophone player: Display as Written C5
- For Alto Saxophone player: Display as Written G4

#### Conversion Functions

**concertToWritten(concertNote, instrumentId)**

Converts concert pitch to written pitch for a specific instrument.

```typescript
// Example: Concert Bb4 for Tenor Sax
concertToWritten('Bb4', 'tenor-sax') // Returns: 'C5'

// Example: Concert Bb4 for Alto Sax
concertToWritten('Bb4', 'alto-sax') // Returns: 'G4'

// Example: Concert C4 for Flute (concert pitch instrument)
concertToWritten('C4', 'flute') // Returns: 'C4'
```

**writtenToConcert(writtenNote, instrumentId)**

Converts written pitch to concert pitch (reverse operation).

```typescript
// Example: Written C5 for Tenor Sax
writtenToConcert('C5', 'tenor-sax') // Returns: 'Bb4'

// Example: Written G4 for Alto Sax
writtenToConcert('G4', 'alto-sax') // Returns: 'Bb4'
```

**convertPitchForInstrument(concertNote, instrumentId)**

Returns a complete conversion object with both pitches.

```typescript
convertPitchForInstrument('Bb4', 'tenor-sax')
// Returns:
{
  concertPitch: 'Bb4',
  writtenPitch: 'C5',
  instrument: 'Tenor Saxophone',
  transpositionSemitones: 2
}
```

#### Transposition Algorithm

The transposition engine uses MIDI note numbers for accurate conversion:

1. **Parse Note**: Convert note string to MIDI number
   - Example: "C4" → MIDI 60
   
2. **Apply Transposition**:
   - For "up" instruments (e.g., Alto Sax): `writtenMidi = concertMidi + semitones`
   - For "down" instruments (e.g., Tenor Sax): `writtenMidi = concertMidi - semitones`
   - For concert pitch instruments: `writtenMidi = concertMidi`
   
3. **Convert Back**: Convert MIDI number to note string
   - Example: MIDI 62 → "D4"

### Audio System Integration

#### InstrumentPitchResult Interface

The audio system returns pitch detection results with automatic transposition:

```typescript
interface InstrumentPitchResult {
  frequency: number;           // Detected frequency in Hz
  
  // Concert pitch (actual sounding pitch)
  concertNote: string;         // e.g., "Bb"
  concertOctave: number;       // e.g., 4
  
  // Written pitch (what the player reads)
  writtenNote: string;         // e.g., "C"
  writtenOctave: number;       // e.g., 5
  
  // Instrument info
  instrument: string;          // e.g., "Tenor Saxophone"
  instrumentId: string;        // e.g., "tenor-sax"
  
  // Accuracy
  confidence: number;          // 0-1 confidence score
  cents: number;               // Deviation from perfect pitch
}
```

#### Integration Flow

1. **Microphone Captures Audio**: Detects concert pitch frequency
2. **Pitch Detection**: Converts frequency to concert note (e.g., "Bb4")
3. **Transposition Applied**: Converts concert pitch to written pitch based on user's instrument
4. **Display**: Shows written pitch to user (what they should see on their music)
5. **Comparison**: Compares detected written pitch with target written pitch
6. **Feedback**: Provides accurate feedback based on written music

### Lesson Integration

#### User Experience

Lessons always display notes as they appear to the selected instrument:

**Example: Clarinet Player**
- Target note displayed: "Written G4"
- Microphone detects: "Concert F4"
- System converts: Concert F4 → Written G4 (for clarinet)
- Feedback: "Correct!"

**Example: Trumpet Player**
- Target note displayed: "Written C5"
- Microphone detects: "Concert Bb4"
- System converts: Concert Bb4 → Written C5 (for trumpet)
- Feedback: "Correct!"

**Example: Flute Player**
- Target note displayed: "Written C5"
- Microphone detects: "Concert C5"
- System converts: Concert C5 → Written C5 (no transposition)
- Feedback: "Correct!"

#### Implementation

The `AudioPracticeActivity` component:
1. Retrieves user's `instrumentId` from store
2. Converts target notes from concert pitch to written pitch
3. Displays written pitch to user
4. When microphone detects pitch, converts to written pitch
5. Compares detected written pitch with target written pitch

### Scale System

#### Instrument-Specific Scales

Each instrument has specific scale requirements based on their transposition and range:

**Alto Saxophone (Eb) - Basic Level:**
- Bb Major (written) → Concert Db Major
- Eb Major (written) → Concert Gb Major
- F Major (written) → Concert Ab Major

**Tenor Saxophone (Bb) - Basic Level:**
- C Major (written) → Concert Bb Major
- F Major (written) → Concert Eb Major
- G Major (written) → Concert F Major

**Trumpet (Bb) - Basic Level:**
- C Major (written) → Concert Bb Major
- F Major (written) → Concert Eb Major
- G Major (written) → Concert F Major

**Flute (C) - Basic Level:**
- C Major (written) → Concert C Major
- F Major (written) → Concert F Major
- G Major (written) → Concert G Major

#### Scale Requirements Data

```typescript
export const SCALE_REQUIREMENTS: Record<string, Record<string, string[]>> = {
  'alto-sax': {
    'BASIC': ['Bb Major', 'Eb Major', 'F Major'],
    'ONE': ['Bb Major', 'Eb Major', 'F Major', 'Ab Major', 'Bb Chromatic', 'C Harmonic Minor'],
    // ... more levels
  },
  'tenor-sax': {
    'BASIC': ['C Major', 'F Major', 'G Major'],
    'ONE': ['C Major', 'F Major', 'G Major', 'Bb Major', 'C Chromatic', 'D Harmonic Minor'],
    // ... more levels
  },
  // ... other instruments
};
```

### Admin Debug View

#### Transposition Debug Panel

The admin panel includes a dedicated debug section for transposition:

**Displayed Information:**
- Selected Instrument ID
- Instrument Name
- Transposition Description (e.g., "Bb instrument - written C sounds lower than concert C")
- Transposition Semitones
- Example Conversions:
  - Concert Bb4 → Written pitch
  - Concert C5 → Written pitch
  - Written C5 → Concert pitch

**Purpose:**
- Verify transposition is working correctly
- Debug pitch detection issues
- Understand instrument-specific behavior
- Instructor visibility into transposition logic

**Access:**
- Admin panel only (secret corner sequence)
- Not visible to cadets
- Real-time conversion examples

### Future Instrument Support

#### Adding New Instruments

To add a new instrument:

1. **Define InstrumentProfile** in `src/instruments.ts`:

```typescript
'new-instrument': {
  id: 'new-instrument',
  name: 'New Instrument',
  family: 'woodwind', // or 'brass' or 'percussion'
  transpositionSemitones: 2, // or appropriate value
  lowestWrittenNote: 'Bb3',
  highestWrittenNote: 'F6',
  lowestConcertNote: 'Ab3',
  highestConcertNote: 'Eb6',
  clef: 'treble',
  isTransposing: true,
  transpositionDirection: 'down',
}
```

2. **Add Scale Requirements** (if applicable):

```typescript
'new-instrument': {
  'BASIC': ['Scale 1', 'Scale 2', 'Scale 3'],
  // ... more levels
}
```

3. **Update Instrument Selection UI** (if needed)

4. **No Core System Changes Required**:
- Audio system works automatically
- Lesson system works automatically
- Transposition engine works automatically
- Adaptive learning works automatically

#### Instrument Families

**Woodwind:**
- Saxophones (Alto, Tenor, Baritone, Soprano)
- Clarinets (Bb, Bass)
- Flutes
- Oboes
- Bassoons

**Brass:**
- Trumpets (Bb)
- Cornets (Bb)
- Flugelhorns (Bb)
- French Horns (F)
- Trombones
- Euphoniums
- Tubas

**Percussion:**
- Snare Drum
- Bass Drum
- Mallet Percussion (Xylophone, Marimba, Vibraphone)
- Auxiliary Percussion (Tambourine, Triangle, etc.)

### Utility Functions

#### getInstrumentsByFamily(family)

Returns all instruments in a specific family.

```typescript
getInstrumentsByFamily('woodwind')
// Returns: [Alto Sax, Tenor Sax, Clarinet, Flute, ...]
```

#### getTransposingInstruments()

Returns all transposing instruments.

```typescript
getTransposingInstruments()
// Returns: [Alto Sax, Tenor Sax, Trumpet, Clarinet, ...]
```

#### getConcertPitchInstruments()

Returns all concert pitch instruments.

```typescript
getConcertPitchInstruments()
// Returns: [Flute, Oboe, Bassoon, Trombone, ...]
```

#### isValidInstrument(instrumentId)

Checks if an instrument ID is valid.

```typescript
isValidInstrument('alto-sax') // Returns: true
isValidInstrument('invalid') // Returns: false
```

#### getInstrument(instrumentId)

Returns the full instrument profile.

```typescript
getInstrument('alto-sax')
// Returns: { id: 'alto-sax', name: 'Alto Saxophone', ... }
```

#### getTranspositionDescription(instrumentId)

Returns a human-readable transposition description.

```typescript
getTranspositionDescription('alto-sax')
// Returns: "Eb instrument - written C sounds higher than concert C"
```

### Technical Implementation

#### File Structure

```
src/
├── instruments.ts              # Instrument profiles and transposition engine
├── audio.ts                    # Audio processing with transposition
├── store.ts                    # User state with instrumentId
├── components/
│   ├── AudioPracticeActivity.tsx  # Uses transposition for display
│   └── AdminPanel.tsx             # Debug view for transposition
```

#### Key Files

**`src/instruments.ts`** (400+ lines)
- InstrumentProfile interface
- INSTRUMENTS registry (20+ instruments)
- Transposition engine (concertToWritten, writtenToConcert)
- Utility functions
- Scale requirements

**`src/audio.ts`** (Updated)
- getCurrentPitch() accepts instrumentId parameter
- Returns InstrumentPitchResult with transposition

**`src/store.ts`** (Updated)
- User interface includes instrumentId
- setInstrument action updates both instrument and instrumentId
- Default user has instrumentId: 'alto-sax'

**`src/components/AudioPracticeActivity.tsx`** (Updated)
- Retrieves user's instrumentId
- Converts target notes to written pitch
- Displays written pitch to user
- Converts detected pitch to written pitch for comparison

**`src/components/AdminPanel.tsx`** (Updated)
- Transposition Debug section
- Shows instrument info and example conversions
- Real-time transposition verification

### Backward Compatibility

#### Existing Users

Users created before multi-instrument support:
- Default to `instrumentId: 'alto-sax'`
- Continue to work without changes
- Can select different instrument in settings

#### Existing Lessons

Lessons created before multi-instrument support:
- Continue to work with transposition
- Notes automatically converted to written pitch
- No lesson modifications required

#### Existing Audio Activities

Audio activities created before multi-instrument support:
- Continue to work with transposition
- Target notes automatically converted
- No activity modifications required

### Performance

#### Transposition Performance
- Conversion time: < 1ms per note
- No noticeable latency
- Real-time conversion during practice

#### Memory Usage
- Instrument registry: ~5 KB
- Transposition calculations: negligible
- No performance impact on existing features

### Security & Privacy

#### Data Storage
- Instrument selection stored in user profile
- No additional data collection
- Transposition is client-side only

#### Privacy
- No instrument data sent to servers
- All transposition happens locally
- No third-party instrument APIs

### Testing

#### Unit Tests (Future)
- Test all transposition conversions
- Verify concert ↔ written pitch accuracy
- Test edge cases (extreme notes, octave boundaries)
- Verify all instruments in registry

#### Integration Tests (Future)
- Test audio detection with transposition
- Verify lesson display with different instruments
- Test scale requirements per instrument
- Verify admin debug view accuracy

### Future Enhancements

#### Phase 2: Advanced Transposition
- Support for octave transposition (e.g., Bass Clarinet)
- Support for non-standard transpositions
- Custom transposition tables

#### Phase 3: Instrument-Specific Features
- Instrument-specific embouchure guidance
- Instrument-specific fingering charts
- Instrument-specific maintenance tips
- Instrument-specific practice routines

#### Phase 4: Ensemble Support
- Multi-instrument ensemble practice
- Section-specific exercises
- Full band coordination
- Balance and blend training

#### Phase 5: Advanced Audio
- Instrument-specific tone quality analysis
- Instrument-specific intonation tendencies
- Instrument-specific articulation detection
- Instrument-specific dynamic range analysis

---

## Music Notation & Visualization Components

### Overview

The platform includes a comprehensive suite of beautiful, animated music notation components that bring music theory to life. These components provide interactive, visual learning experiences with smooth animations and professional music engraving quality.

### Component Library

#### 1. MusicStaff Component (`src/components/MusicStaff.tsx`)

Beautiful animated music staff with support for notes, clefs, time signatures, and key signatures.

**Features:**
- Animated staff lines that draw themselves
- Treble, bass, alto, and tenor clefs
- Note rendering with stems, flags, and beams
- Support for whole, half, quarter, eighth, and sixteenth notes
- Time signature display
- Key signature display
- Optional note labels
- Smooth spring animations

**Usage:**

```typescript
<MusicStaff
  notes={[
    { pitch: 'C4', duration: 'quarter', position: 0 },
    { pitch: 'D4', duration: 'quarter', position: 1 },
    { pitch: 'E4', duration: 'quarter', position: 2 },
  ]}
  clef="treble"
  timeSignature="4/4"
  showLabels={true}
  animated={true}
/>
```

**Animation Details:**
- Staff lines draw from left to right (0.5s each, staggered)
- Notes spring into existence with scale animation
- Stems grow with path animation
- Flags draw with path animation
- Labels fade in after notes appear

#### 2. RhythmDisplay Component (`src/components/RhythmDisplay.tsx`)

Animated rhythm pattern display with beat counting and highlighting.

**Features:**
- Visual rhythm notation on staff
- Beat division lines
- Support for all note values and rests
- Beat counting labels
- Highlight current beat (for playback)
- Time signature display
- Smooth animations

**Usage:**

```typescript
<RhythmDisplay
  pattern={[
    { type: 'quarter' },
    { type: 'quarter' },
    { type: 'half' },
  ]}
  timeSignature="4/4"
  showCounting={true}
  highlightIndex={0}
  animated={true}
/>
```

**Animation Details:**
- Notes spring into view sequentially
- Beat lines fade in
- Counting labels appear with delay
- Highlighted notes pulse with gold color

#### 3. KeySignatureDisplay Component (`src/components/KeySignatureDisplay.tsx`)

Animated key signature display with all major and minor keys.

**Features:**
- All major key signatures (C through C#)
- Sharp and flat accidentals
- Animated accidental placement
- Key name label
- Professional music engraving

**Usage:**

```typescript
<KeySignatureDisplay
  keyName="G Major"
  showName={true}
  animated={true}
/>
```

**Supported Keys:**
- C Major (0 accidentals)
- G Major (1 sharp)
- D Major (2 sharps)
- A Major (3 sharps)
- E Major (4 sharps)
- F Major (1 flat)
- Bb Major (2 flats)
- Eb Major (3 flats)
- And more...

**Animation Details:**
- Staff lines draw first
- Treble clef fades in from left
- Accidentals spring into position sequentially
- Key name label fades in last

#### 4. CircleOfFifths Component (`src/components/CircleOfFifths.tsx`)

Interactive animated circle of fifths with major and minor keys.

**Features:**
- All 12 major keys with sharp/flat counts
- All 12 relative minor keys
- Interactive hover effects
- Key highlighting
- Animated construction
- Professional layout

**Usage:**

```typescript
<CircleOfFifths
  highlightKey="G Major"
  showMinor={true}
  animated={true}
/>
```

**Animation Details:**
- Outer circle draws first (1s)
- Inner circle draws second (1s, 0.2s delay)
- Minor circle draws third (dashed, 1s, 0.4s delay)
- Major keys spring into position (0.5s + 0.05s per key)
- Minor keys spring into position (0.8s + 0.05s per key)
- Center text fades in last

**Interactive Features:**
- Hover over any key to highlight it
- Keys scale up on hover
- Color changes to gold when highlighted
- Shows accidental count on hover

#### 5. DynamicsDisplay Component (`src/components/DynamicsDisplay.tsx`)

Animated dynamics display with volume indicators.

**Features:**
- All dynamic markings (ppp through fff)
- Volume percentage indicators
- Animated volume bars
- Dynamics comparison (crescendo/decrescendo)
- Hairpin notation
- Legend display

**Usage:**

```typescript
<DynamicsDisplay
  dynamics={[
    { symbol: 'p', position: 0 },
    { symbol: 'mf', position: 1 },
    { symbol: 'f', position: 2 },
  ]}
  showLegend={true}
  animated={true}
/>

<DynamicsComparison
  from="p"
  to="f"
  type="crescendo"
  animated={true}
/>
```

**Supported Dynamics:**
- ppp (Pianississimo) - 10% volume
- pp (Pianissimo) - 20% volume
- p (Piano) - 35% volume
- mp (Mezzo Piano) - 50% volume
- mf (Mezzo Forte) - 65% volume
- f (Forte) - 80% volume
- ff (Fortissimo) - 90% volume
- fff (Fortississimo) - 100% volume

**Animation Details:**
- Dynamic symbols scale in with spring animation
- Volume bars grow from bottom
- Hairpin lines draw with scale animation
- Labels fade in sequentially

#### 6. TimeSignatureDisplay Component (`src/components/TimeSignatureDisplay.tsx`)

Animated time signature display with beat visualization.

**Features:**
- All common time signatures (2/4, 3/4, 4/4, 6/8, etc.)
- Beat division visualization
- Strong beat indicators
- Compound vs simple time detection
- Animated metronome
- Beat counting

**Usage:**

```typescript
<TimeSignatureDisplay
  timeSignature="4/4"
  showBeats={true}
  animated={true}
/>

<Metronome
  tempo={120}
  timeSignature="4/4"
  isPlaying={true}
  animated={true}
/>
```

**Animation Details:**
- Staff lines draw first
- Time signature numbers scale in with spring
- Beat lines fade in sequentially
- Strong beat indicators pulse
- Metronome pendulum swings continuously

**Metronome Features:**
- Realistic wooden metronome design
- Swinging pendulum animation
- Weight moves up and down
- Beat indicators pulse in sync
- Tempo display

#### 7. ScaleDisplay Component (`src/components/ScaleDisplay.tsx`)

Animated scale display with note positions and connections.

**Features:**
- Major, minor, and modal scales
- Ascending and descending display
- Note positions on staff
- Scale degree numbers
- Connecting lines between notes
- Accidental support
- Optional fingering display

**Usage:**

```typescript
<ScaleDisplay
  scaleName="C Major"
  notes={['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C']}
  direction="ascending"
  showFingering={false}
  animated={true}
/>

<IntervalDisplay
  note1="C"
  note2="G"
  intervalName="Perfect 5th"
  animated={true}
/>
```

**Animation Details:**
- Staff lines draw first
- Treble clef fades in
- Notes spring into position sequentially
- Note labels fade in
- Scale degree numbers appear
- Connecting lines draw between notes

**Interval Display:**
- Two notes on staff
- Interval bracket with animation
- Interval name label
- Spring animations for notes

#### 8. NoteValueDisplay Component (`src/components/NoteValueDisplay.tsx`)

Animated note value display with duration information.

**Features:**
- All note values (whole through sixteenth)
- Animated note construction
- Duration labels
- Note names (American and British)
- Rest display

**Usage:**

```typescript
<NoteValueDisplay
  noteType="quarter"
  showDuration={true}
  showName={true}
  animated={true}
/>

<RestDisplay
  restType="quarter"
  showDuration={true}
  animated={true}
/>
```

**Supported Note Values:**
- Whole note (Semibreve) - 4 beats
- Half note (Minim) - 2 beats
- Quarter note (Crotchet) - 1 beat
- Eighth note (Quaver) - 1/2 beat
- Sixteenth note (Semiquaver) - 1/4 beat

**Animation Details:**
- Note head scales in with spring
- Stem grows with path animation
- Flags draw sequentially
- Duration label fades in
- Note name appears last

#### 9. AnimatedComponents (`src/components/AnimatedComponents.tsx`)

Collection of reusable animated UI components.

**Components:**

**ProgressRing:**
- Circular progress indicator
- Animated fill
- Customizable colors
- Optional label
- Percentage display

```typescript
<ProgressRing
  progress={75}
  size={120}
  strokeWidth={8}
  color="#c9a84c"
  label="Mastery"
  animated={true}
/>
```

**StatCard:**
- Animated stat display
- Icon support
- Value and label
- Hover effects

```typescript
<StatCard
  value={42}
  label="Lessons Completed"
  icon="📚"
  color="#c9a84c"
  animated={true}
/>
```

**Badge:**
- Achievement badge
- Earned/locked states
- Icon and label
- Pulse animation when earned

```typescript
<Badge
  icon="🏆"
  label="Theory Master"
  earned={true}
  animated={true}
/>
```

**StreakCounter:**
- Animated streak display
- Fire icon with animation
- Gradient background
- Hover effects

```typescript
<StreakCounter
  streak={7}
  animated={true}
/>
```

**XPCounter:**
- Animated XP display
- Star icon with rotation
- Gradient background
- Hover effects

```typescript
<XPCounter
  xp={1250}
  animated={true}
/>
```

### Animation Philosophy

All components follow these animation principles:

1. **Sequential Loading:**
   - Elements appear in logical order
   - Staff lines draw first
   - Clefs and signatures appear next
   - Notes and symbols last
   - Labels and text final

2. **Spring Physics:**
   - Natural, bouncy animations
   - Stiffness: 200 (responsive but smooth)
   - Damping: 15 (not too bouncy)
   - Creates professional, polished feel

3. **Staggered Timing:**
   - Elements don't all appear at once
   - Each element has slight delay
   - Creates flowing, cascading effect
   - Guides user's eye through content

4. **Path Animations:**
   - Lines and stems draw themselves
   - Uses stroke-dasharray technique
   - Creates writing/drawing effect
   - More engaging than simple fade

5. **Interactive Feedback:**
   - Hover states with scale/rotation
   - Highlight states with color changes
   - Smooth transitions
   - Encourages exploration

### Integration with Lessons

These components are integrated throughout the lesson system:

**Theory Lessons:**
- MusicStaff for note reading exercises
- RhythmDisplay for rhythm practice
- KeySignatureDisplay for key signature lessons
- CircleOfFifths for key relationships
- DynamicsDisplay for dynamics lessons
- TimeSignatureDisplay for time signature lessons

**Practice Lessons:**
- ScaleDisplay for scale practice
- NoteValueDisplay for rhythm exercises
- AnimatedComponents for progress tracking

**Audio Lessons:**
- MusicStaff shows target notes
- RhythmDisplay shows rhythm patterns
- Real-time feedback with highlighting

### Performance

All components are optimized for performance:

- **SVG-based rendering:** Scalable, crisp at any size
- **Hardware acceleration:** CSS transforms for smooth animations
- **Lazy rendering:** Components only animate when visible
- **Efficient updates:** React.memo for expensive components
- **Minimal re-renders:** Proper key usage and state management

### Accessibility

All components include accessibility features:

- **ARIA labels:** Screen reader support
- **Keyboard navigation:** Tab through interactive elements
- **High contrast:** Works in dark mode
- **Reduced motion:** Respects prefers-reduced-motion
- **Semantic HTML:** Proper heading structure

### Customization

All components are highly customizable:

- **Colors:** Match your theme
- **Sizes:** Responsive to container
- **Animation speed:** Control timing
- **Labels:** Show/hide as needed
- **Interactivity:** Enable/disable hover effects

### Future Enhancements

Planned additions to the music notation library:

1. **Chord Display:**
   - Chord symbols
   - Chord diagrams
   - Voicing visualization

2. **Articulation Display:**
   - Staccato, legato, accent marks
   - Slurs and ties
   - Dynamic hairpins

3. **Ornament Display:**
   - Trills, turns, mordents
   - Grace notes
   - Glissandos

4. **Advanced Rhythm:**
   - Tuplets (triplets, quintuplets)
   - Syncopation
   - Polyrhythms

5. **Interactive Staff:**
   - Click to add notes
   - Drag to move notes
   - Real-time playback

6. **Score Viewer:**
   - Multi-staff display
   - Page turning
   - Zoom controls

---

## Animation System

### Overview

The Cadet Music Platform features a comprehensive animation system with 136+ unique animations across all components. The animations are designed to be smooth, professional, and purposeful, creating a delightful user experience without being distracting.

### Animation Utilities (`src/animations.ts`)

Created a centralized animation system with 25+ pre-defined animation variants:

**Page Transitions:**
- `pageVariants` - Smooth page enter/exit with fade and slide
- `fadeIn` - Simple opacity transitions
- `slideUp` - Elements slide up while fading in
- `scale` - Scale-based entrance animations

**Interactive Elements:**
- `buttonHover` - Button press/hover effects (scale 1.02/0.98)
- `cardHover` - Card lift effect with shadow
- `iconRotate` - 360° rotation on hover
- `pulse` - Continuous pulsing for active states

**Feedback Animations:**
- `successAnimation` - Spring-based success indicator
- `errorShake` - Horizontal shake for errors
- `progressBar` - Smooth width transitions
- `notificationSlide` - Slide-in notifications

**Advanced Effects:**
- `staggerContainer` / `staggerItem` - List item stagger animations
- `modalOverlay` / `modalContent` - Modal entrance/exit
- `tooltip` - Tooltip pop-in effect
- `confettiBurst` - Celebration effect
- `spinner` - Loading spinner rotation
- `bounce` - Continuous bounce animation
- `glow` - Pulsing glow effect
- `typewriter` - Text reveal animation
- `flip` - 3D flip transition
- `slideInLeft` / `slideInRight` - Directional slides
- `expand` - Height expansion animation

### Component Animations

#### Dashboard
- Header slide-down on load
- Profile menu fade-in with stagger
- Daily Goal card pulse animation when complete
- Progress bar smooth fill animation
- Stats cards stagger entrance
- Learning path nodes bounce on available
- Bottom navigation icons rotate on hover
- Modal slide-up entrance

**Animation Count:** 15+ unique animations

#### Songs
- Page fade-in on load
- Header slide-down with spring physics
- Music icon continuous rotation (subtle)
- Selection counter scale pulse when complete
- Song cards hover lift effect
- Song selection checkmark bounce
- Warning modal scale entrance
- Continue button slide-up

**Animation Count:** 12+ unique animations

#### Settings
- Page fade-in on load
- Header slide-down
- Back button hover scale
- Tab buttons stagger entrance
- Tab content fade transitions
- Instrument cards hover lift
- Level buttons scale on selection
- Warning modal scale entrance
- Toggle switch smooth transition

**Animation Count:** 14+ unique animations

#### LessonView
- Lesson content fade-in
- Section stagger entrance
- Progress bar smooth fill
- Exercise cards slide-in
- Success confetti burst
- Navigation buttons hover scale
- Audio player waveform animation
- Microphone practice pulse

**Animation Count:** 10+ unique animations

#### Theory Exercises (8 components)
- Note appearance scale animation
- Button hover/tap effects
- Success/error feedback animations
- Score counter update animation
- Beat indicators pulse in sync
- Clap button press animation
- Progress bar smooth fill
- Tempo slider smooth transitions

**Total Theory Exercise Animations:** 50+ unique animations

#### Audio Components
- Microphone icon pulse when listening
- Waveform real-time animation
- Progress dots sequential appearance
- Success celebration confetti
- Note indicators scale on completion
- Key press scale animation
- Fingering highlight transitions
- Mode indicator fade

**Total Audio Animations:** 20+ unique animations

### Animation Performance

**Performance Metrics:**
- **Animation frame rate**: 60 FPS
- **Component render time**: < 16ms
- **Memory usage**: Minimal (SVG-based)
- **CPU usage**: Low (hardware accelerated)

**Optimization Techniques:**
- **Canvas Rendering**: Uses `requestAnimationFrame` for 60 FPS
- **Audio Buffer Size**: 2048 samples (balanced latency/performance)
- **Smoothing**: 0.8 constant for stable visualization
- **Memory Management**: Proper cleanup of audio resources
- **Lazy Initialization**: AudioContext created only when needed

### Browser Compatibility

**Supported Browsers:**
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile Chrome
- ✅ Mobile Safari
- ✅ Mobile Firefox

**Required APIs:**
- `navigator.mediaDevices.getUserMedia()` - Microphone access
- `AudioContext` / `webkitAudioContext` - Audio processing
- `AnalyserNode` - Audio analysis
- `MediaStreamAudioSourceNode` - Microphone input
- `requestAnimationFrame` - Smooth visualization

### Mobile Support

**Touch Optimization:**
- Large touch targets for buttons
- Responsive waveform canvas
- Optimized for portrait orientation
- Touch-friendly state indicators

**Mobile Considerations:**
- Microphone permission prompts on first use
- Background audio handling
- Screen wake lock during practice
- Reduced motion support

---

## Admin Panel

### Overview

The admin panel provides instructors with comprehensive analytics and debugging tools. It includes concept performance analytics, transposition debugging, and song-aware analytics.

### Features

#### Concept Performance Analytics

**Displayed Information:**
- Concept accuracy breakdown (percentage for each concept)
- Suggested focus areas
- Predicted trouble areas
- Color-coded performance indicators

**Example Display:**

```
Intervals
┌─────────────────────────────────────┐
│ Intervals              [Developing] │
│ ████████████████████░░░░░░ 62%     │
├─────────────────────────────────────┤
│ Attempts: 43    Mastery: 62%       │
│ Weight: 2.4x    Recency: 95%       │
├─────────────────────────────────────┤
│ Last reviewed: 2024-01-15          │
└─────────────────────────────────────┘
```

#### Transposition Debug View

**Displayed Information:**
- Selected Instrument ID
- Instrument Name
- Transposition Description
- Transposition Semitones
- Example Conversions:
  - Concert Bb4 → Written pitch
  - Concert C5 → Written pitch
  - Written C5 → Concert pitch

**Purpose:**
- Verify transposition is working correctly
- Debug pitch detection issues
- Understand instrument-specific behavior
- Instructor visibility into transposition logic

#### Song-Aware Analytics

**Features:**
- Song-by-song concept mastery breakdown
- Overall coverage analysis
- Priority recommendations based on song requirements
- Concept-song mapping visualization
- Readiness assessment per song

**Example Admin View:**

```
Song: Hunter Chorus (Level One, List B)
├── Concepts Required: 4
│   ├── Articulations: 72% mastery ⚠️
│   ├── Rhythm: 85% mastery ✅
│   ├── Dynamics: 68% mastery ⚠️
│   └── Scales: 91% mastery ✅
├── Overall Readiness: 79%
└── Focus Areas: Articulations, Dynamics
```

### Access

**Secret Corner Sequence:**
1. Click bottom-right corner
2. Click top-right corner
3. Click top-left corner
4. Click bottom-left corner

**No visual feedback** - completely hidden from regular users

### Admin Features

#### Reset Functionality

**Reset All Data button in admin header:**
- Requires password: `password`
- Clears all localStorage data
- Deletes all user accounts
- Returns to login screen
- Must sign up again after reset

**Reset Confirmation:**
- Modal dialog with password input
- Warning box showing what will be deleted
- Cancel option available
- Wrong password shows error

---

## Security Features

### Password Validation

- Minimum 6 characters required
- Passwords stored in localStorage
- Validation on every login attempt
- No auto-account creation
- "Account not found" error for non-existent accounts
- "Incorrect password" error for wrong passwords

### Session Management

- Session stored in localStorage
- Quick login validates user existence
- Session cleared on reset
- No cross-device sync (localStorage only)

### Admin Security

- Hidden access method (corner clicks)
- Password-protected reset
- No visual feedback during access
- Reset requires explicit confirmation

### Data Integrity

- Rank dropdown prevents invalid ranks
- Email validation for .cadets.gc.ca domain
- Level validation (theory ≥ playing recommended)
- Song selection required before proceeding

---

## UI/UX Features

### Design System

**Color Scheme:**
- Primary: Navy (#1a2332) and Gold (#c9a84c)
- Light Mode: #f5f5f5 background, #c8c8c8 borders
- Dark Mode: #0f1720 background, #2a3545 borders

**Typography:**
- Inter font family
- Clean, professional design
- Consistent sizing and spacing

**Animations:**
- Framer Motion for smooth transitions
- Spring physics for natural feel
- Staggered animations for lists

### Responsive Design

- Mobile-first approach
- Adaptive layouts for all screen sizes
- Touch-friendly interactions
- Readable text at all sizes

### Navigation

**Bottom navigation bar with 5 tabs:**
- Home (dashboard)
- Songs (song selection)
- Start (next lesson)
- Ranks (leaderboard)
- Settings (user settings)

**Additional features:**
- Sticky headers with back buttons
- Smooth page transitions
- Modal dialogs for confirmations

### Interactive Elements

- Hover effects on buttons
- Tap feedback on mobile
- Animated progress bars
- Confetti on achievements
- Pulsing available lessons
- Rotating locked icons

### Accessibility

- High contrast colors
- Clear focus states
- Semantic HTML
- Keyboard navigation support
- Screen reader friendly
- Reduced motion support

---

## Legal Pages & Footer

### Footer Component

**Three-section layout:**
- About section with platform description
- Quick links (Dashboard, Settings, Analytics)
- Legal links (Privacy, Terms, Cookies)

**Copyright notice:**
- "© 2024 841 Squadron. All rights reserved."
- "Canadian Cadet Organization Music Program"

**Design:**
- Dark theme
- Responsive grid layout
- Hover effects on links
- Smooth transitions

### Privacy Policy

**10 comprehensive sections:**
1. Introduction
2. Information We Collect (personal, usage, audio)
3. How We Use Your Information
4. Data Storage and Security
5. Data Sharing and Disclosure
6. Your Rights
7. Children's Privacy
8. Third-Party Links
9. Contact Information
10. Changes to This Policy

**Key Features:**
- Transparent about current localStorage implementation
- Addresses future cloud migration
- Comprehensive user rights section
- Clear data handling practices

### Terms of Service

**14 comprehensive sections:**
1. Acceptance of Terms
2. Description of Service
3. User Accounts
4. Acceptable Use
5. Intellectual Property
6. Privacy and Data Protection
7. Disclaimers
8. Limitation of Liability
9. Indemnification
10. Governing Law
11. Changes to Terms
12. Severability
13. Entire Agreement
14. Contact Information

**Key Features:**
- Eligibility restricted to CCO members
- Comprehensive prohibited activities list
- Clear intellectual property ownership
- Extensive liability limitations
- Canadian jurisdiction specified

### Cookie Policy

**10 comprehensive sections:**
1. What Are Cookies
2. How We Use Cookies (3 types with color coding)
3. Current Implementation (localStorage only)
4. Third-Party Cookies (none currently)
5. Managing Cookies (browser instructions)
6. Do Not Track
7. Consent
8. Data Retention
9. Updates to This Policy
10. Contact Information

**Key Features:**
- Honest about current localStorage implementation
- Color-coded cookie types
- Browser-specific management instructions
- Clear consent model

---

## Backend Migration Guide

### Current State

- All data stored in localStorage
- No real authentication
- No cross-device sync
- Demo mode only

### Recommended Stack

#### Option 1: Vercel + Supabase (Easiest)

**Frontend:** Vercel (free)
**Backend:** Supabase (free tier)
**Database:** PostgreSQL (free 512MB)
**Auth:** Supabase Auth (free up to 50k users)
**Storage:** Supabase Storage (free 1GB)

#### Option 2: Custom Backend

**Frontend:** Vercel/Netlify
**Backend:** Railway/Render ($5-7/month)
**Database:** MongoDB Atlas (free tier)
**Auth:** Custom with bcrypt + JWT
**Storage:** Cloudinary/Backblaze B2

### Migration Steps

#### Phase 1: Setup Supabase (1 week)

1. Create Supabase account
2. Create new project
3. Set up database tables:

```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE,
  rank TEXT,
  last_name TEXT,
  password_hash TEXT,
  instrument TEXT DEFAULT 'alto',
  theory_level TEXT DEFAULT 'Basic',
  instrument_level TEXT DEFAULT 'Basic',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Progress table
CREATE TABLE progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  lesson_id TEXT NOT NULL,
  completed BOOLEAN DEFAULT false,
  attempts INT DEFAULT 0,
  score INT DEFAULT 0,
  completed_at TIMESTAMP
);

-- Songs table
CREATE TABLE songs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  composer TEXT,
  level TEXT,
  list_type TEXT,
  sheet_music_url TEXT,
  audio_url TEXT
);
```

4. Enable authentication
5. Set up storage buckets

#### Phase 2: Connect Frontend (1 week)

1. Install Supabase client:

```bash
npm install @supabase/supabase-js
```

2. Create API service files:

```typescript
// src/api/auth.ts
import { supabase } from './supabaseClient';

export const signUp = async (email: string, password: string, rank: string, lastName: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { rank, last_name: lastName } }
  });
  return { data, error };
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  return { data, error };
};
```

3. Replace localStorage calls with Supabase calls
4. Add authentication headers to requests
5. Handle loading states and errors

#### Phase 3: Deploy (1 week)

1. Push code to GitHub
2. Connect GitHub to Vercel
3. Add environment variables:

```
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

4. Deploy frontend
5. Test thoroughly

### Cost Breakdown

- **Development**: $0
- **First 100 users**: $0 (free tiers)
- **100-1000 users**: ~$25/month
- **1000+ users**: ~$50-100/month

### Timeline

- **Learning Supabase basics**: 3-5 days
- **Set up database**: 1-2 days
- **Connect frontend**: 3-5 days
- **Test and deploy**: 2-3 days
- **Total**: 2-3 weeks

---

## Technical Details

### Tech Stack

**Framework:** React 18
**Build Tool:** Vite
**Language:** TypeScript
**Styling:** Tailwind CSS
**State Management:** Zustand
**Animations:** Framer Motion
**Routing:** React Router
**Charts:** Recharts
**Icons:** Lucide React
**Date Handling:** date-fns

### State Management (Zustand)

```typescript
interface AppState {
  user: User | null;
  darkMode: boolean;
  currentView: ViewType;
  currentLessonId: string | null;
  lessonComplete: boolean;
  adminUnlocked: boolean;
  
  // Actions
  login: (username: string) => void;
  logout: () => void;
  completeLesson: (lessonId: string, xp: number) => void;
  setTheoryLevel: (level: CadetLevel) => void;
  setInstrumentLevel: (level: CadetLevel) => void;
  // ... more actions
}
```

### Data Persistence

**localStorage keys:**
- `cadet-music-storage`: Main app state (Zustand persist)
- `cadet_music_users`: User accounts and passwords
- `cadet_music_session`: Active session for quick login

### Performance Optimizations

- Lazy loading of components
- Memoization of expensive calculations
- Efficient re-renders with Zustand selectors
- Optimized animations with Framer Motion
- Code splitting with Vite

### Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Requires localStorage support
- Requires ES6+ support

---

## Testing & Quality Assurance

### Build Status

```
✓ 422 modules transformed
✓ Build successful in 5.18s
✓ No TypeScript errors
✓ No linting errors
✓ Production ready

Bundle Size:
- JavaScript: 798.08 kB (gzip: 226.32 kB)
- CSS: 57.39 kB (gzip: 10.69 kB)
- HTML: 3.49 kB (gzip: 1.50 kB)
```

### Test Coverage

**Functionality Tests:**
- Authentication system
- Lesson progression
- Song selection
- Competency tracking
- Adaptive learning
- Multi-instrument support
- Interactive theory exercises
- Audio practice
- Admin panel
- Gamification

**Animation Tests:**
- Page transitions
- Button interactions
- Card animations
- Modal transitions
- List animations
- Form animations
- Loading states
- Success/error feedback
- Hover effects
- Micro-interactions

**Performance Tests:**
- 60 FPS animation rendering
- < 100ms load time
- < 50 MB memory usage
- < 5% CPU usage during animations

### Code Quality

**TypeScript:**
- Strict mode enabled
- No `any` types in production code
- Comprehensive interfaces
- Type-safe state management

**React:**
- Functional components only
- Hooks for state management
- Proper key usage
- Efficient re-renders

**CSS:**
- Tailwind CSS for styling
- Custom animations
- Responsive design
- Dark mode support

**Documentation:**
- JSDoc comments for all public APIs
- Inline comments for complex logic
- Comprehensive README
- Architecture decision records

---

## Compliance Status

### ✅ Fully Compliant with Standards

#### A-CR-CCP-166/PT-001 (Technical Standards)

- ✅ Six-level system (Basic-Five)
- ✅ All 11 Performance Objectives tracked
- ✅ Critical vs non-critical assessment structure
- ✅ Scale requirements by level and instrument
- ✅ Maintenance tasks by level
- ✅ Intonation standards
- ✅ Sight reading standards

#### A-CR-CCP-166/PT-004 (Theory Program)

- ✅ All 6 levels covered
- ✅ 40 theory topics total
- ✅ Glossary with 45+ terms
- ✅ Instrument-neutral (except transposition)
- ✅ Theory as prerequisite to playing

---

## Future Roadmap *(Legacy — preserved for historical reference)*

> **Note:** The authoritative planning section is now the
> **[Consolidated Future Development Roadmap](#consolidated-future-development-roadmap)**
> below, which supersedes this legacy roadmap. This section is retained only to document
> how the project originally envisioned its evolution (circa v1.0.0).

### Phase 1: Backend Integration (2-3 weeks)

- Set up Supabase backend
- Implement real authentication
- Migrate from localStorage to database
- Deploy to production

### Phase 2: Advanced Features (1-2 months)

- Implement actual pitch detection algorithm
- Add rhythm analysis
- Create tone quality feedback
- Build scale verification system

### Phase 3: Multi-Instrument Expansion (2-3 months)

- Add instrument selection UI in settings
- Create instrument-specific lesson content
- Add more prepared music for different instruments
- Implement instrument-specific scale practice

### Phase 4: Assessment System (1-2 months)

- Build instructor dashboard
- Add class management
- Create progress reports
- Implement assignment system

### Phase 5: Mobile App (3-4 months)

- Develop React Native mobile app
- Sync with web platform
- Offline support
- Push notifications

---

## Comprehensive Gap Analysis

*Produced by the 2026 multi-role audit (lead architect, product manager, music educator, QA reviewer) from the perspectives of cadets, music instructors, squadron staff, band officers, music educators, and system administrators. Code-level evidence for each finding is recorded in [Gap Analysis Methodology & Verification Notes](#gap-analysis-methodology--verification-notes). Recommended phases refer to the [Consolidated Future Development Roadmap](#consolidated-future-development-roadmap).*

### A. Missing Features (Not Yet Built)

| # | Feature | Description | Problem It Solves | Expected User Benefit | Priority | Complexity | Phase |
|---|---------|-------------|-------------------|----------------------|----------|------------|-------|
| A1 | **Practice Planner** | Cadet-facing weekly/daily practice schedule builder with goal setting, session timers, and practice journal entries. | Cadets have no structured way to plan *when* and *what* to practice; the app assumes practice happens but never organizes it. | Consistent, purposeful daily practice; less "what do I work on today?" paralysis. | **Critical** | Medium | Phase 1 |
| A2 | **Daily Practice Recommendations** | Auto-generated "Today's Practice" card assembled from adaptive weak-concepts, current song goals, upcoming qualifications, and time budget. | No guidance loop connecting analytics to action; recommendations exist only as raw data on the Analytics page. | One tap starts a personalized session; measurable improvement velocity. | **High** | Medium | Phase 1 |
| A3 | **Cadet Qualification Tracking** | Digital check-off of A-CR-CCP-166/PT-001 Performance Objectives (scales, sight-reading, repertoire, drill music) with examiner sign-off workflow. | Level advancement per CCO standards requires documented PO completion; today this lives only on paper at squadrons. | Cadets and instructors see exactly which POs remain before promotion testing. | **Critical** | High | Phase 2 |
| A4 | **Assessment / Exam Mode** | Timed, graded mock assessments mirroring the six-level exam structure (technical + theory + aural), producing a score report. | No way to rehearse for qualification exams or measure readiness. | Reduced exam anxiety; objective readiness signal before real testing. | **High** | High | Phase 2 |
| A5 | **Performance Evaluation Rubrics** | Instructor-assignable rubrics (tone, technique, musicality, rhythm, accuracy) with per-criterion scoring and longitudinal tracking. | Feedback today is implicit (XP/accuracy); there is no qualitative performance record. | Fair, transparent, standards-aligned evaluation across squadrons. | **High** | Medium | Phase 2 |
| A6 | **Dedicated Ear-Training Module** | Progressive intervals, melodies, chords, and dictation exercises independent of lessons, with its own mastery curve. | The concept catalog touches a few aural ideas but there is no systematic ear-training curriculum despite PT-001 requiring aural skills. | Musicianship growth that transfers directly to playing by ear and ensemble awareness. | **High** | Medium | Phase 2 |
| A7 | **Rhythm-Training Module** | Note-value clapping games, rhythm dictation, metronome-based subdivision drills, and tempo progression tracking. | RhythmDisplay is a static visual aid; nothing trains rhythm actively or measures it. | Steady internal pulse — the most common weakness in beginner bands. | **High** | Medium | Phase 2 |
| A8 | **Sight-Reading Trainer** | Daily cold-reading exercises with timed exposure, difficulty scaling by level/instrument, and transposition-aware output. | Sight reading is a formal PO category with zero interactive support in-app. | Cadets pass sight-reading components of qualification exams. | **High** | High | Phase 2 |
| A9 | **Scale & Technique Tracker** | Per-instrument scale practice mode with tempo logging, metronome ramping, accuracy capture (via microphone once detection is real), and PT-001 requirement checklists. | Scale requirements are documented in data files but not *practiced or measured* anywhere. | Objective proof of technical-standard progress (e.g., "G major, ♩=104, clean"). | **Critical** | Medium | Phase 1–2 |
| A10 | **Theory Progression Gatekeeping** | Enforced prerequisite chains and spaced-repetition review across PT-004 levels (Basic → Five). | Theory topics can be attempted out of order; retention decays with no review scheduler. | Durable knowledge aligned to the official theory program sequence. | **Medium** | Low | Phase 1 |
| A11 | **Instrument-Specific Training Paths** | Curricula keyed to instrument family (woodwind/brass/percussion) covering embouchure, breathing, articulation, fingering charts. | All content currently centers saxophone/clarinet fundamentals; brass and percussion cadets get generic material. | Every cadet trains their actual instrument, not a proxy. | **High** | High | Phase 4 |
| A12 | **Band Preparation Workflows** | Drill-music library, marching-band cue sheets, sectional rehearsal assignments, concert setlist prep tied to qualification repertoire. | Nothing bridges solo practice to the ensemble reality of a cadet band. | Cadets arrive at rehearsals prepared; sectionals become efficient. | **Medium** | Medium | Phase 4 |
| A13 | **Audition Preparation Kit** | Simulated audition pipeline: pre-screen materials, prepared-music checklist, mock-panel evaluation using rubrics (A5). | Band officers hold auditions; cadets have no platform-supported way to prepare. | Higher-quality auditions, fairer selection, reduced officer admin load. | **Medium** | Medium | Phase 4 |
| A14 | **Instructor Feedback System** | Written/recorded feedback on lessons, songs, and assessments; notification delivery; feedback history per cadet. | Instructors have no channel into the student experience at all. | Mentoring relationship survives between parade nights. | **High** | Medium | Phase 3 |
| A15 | **Squadron-Level Reporting** | Aggregate dashboards per squadron/regiment: participation, level distribution, PO completion rates, exportable PDF/CSV reports. | Staff cannot answer "how is our music program doing?" without manual tallying. | Evidence-based program management and reporting up the chain of command. | **High** | High | Phase 3 |
| A16 | **Assignment System** | Instructors assign lessons/songs/scales with due dates; cadets see an assignment queue distinct from free exploration. | No teacher→student push mechanism exists. | Structured cohort learning instead of self-directed drift. | **High** | Medium | Phase 3 |
| A17 | **True Onboarding Flow** | Guided first-run: instrument selection, level self-placement diagnostic, goal setting, baseline calibration. | `Onboarding.tsx` exists but is cosmetic; new users land in an undifferentiated content wall. | Faster time-to-value; correct starting level; fewer abandoned accounts. | **High** | Low | Phase 1 |
| A18 | **Search Functionality** | Global search across lessons, songs, theory topics, glossary terms, and scales. | Content volume (50+ lessons, 62 songs, 40+ topics, 45+ glossary terms) is now un-navigable by browsing alone. | Users find anything in seconds. | **Medium** | Low | Phase 5 |
| A19 | **Content Management Tools** | Admin CRUD interface for lessons, songs, rubrics, and standards data — no code edits required. | All curriculum lives in hard-coded TypeScript modules; updating content requires a developer and a redeploy. | Instructors/officers can keep content current themselves. | **High** | High | Phase 5 |
| A20 | **Cross-Device Sync & Cloud Accounts** | Server-side account store syncing progress, XP, streaks, and settings across devices. | localStorage-only persistence means progress is trapped per-browser/device. | Cadets practice on shared squadron computers and personal phones safely. | **Critical** | High | Phase 0 |
| A21 | **Data Backup & Recovery** | Export/import of full user data (JSON), plus server-side snapshots once backend exists; documented recovery procedure. | Clearing browser data destroys all progress; there is no escape hatch. | Trust and resilience; meets expectations for handling youth data. | **Critical** | Low | Phase 0 |
| A22 | **Accessibility Layer (WCAG 2.1 AA)** | Screen-reader semantics, keyboard-only navigation, visible focus states, captions/transcripts for audio activities, adjustable text size, reduced-motion honoring. | Audit found effectively zero `aria-*` usage across components; audio-dependent features exclude deaf/HoH cadets. | Inclusive training for cadets with disabilities; legal defensibility. | **Critical** | Medium | Phase 0–1 |
| A23 | **Offline / PWA Support** | Service worker caching lesson content and enabling offline practice sessions that sync later. | Squadron environments often have poor connectivity; app is currently useless offline. | Practice continues in basements, field exercises, and buses. | **Medium** | Medium | Phase 4 |
| A24 | **Push Notifications / Reminders** | Opt-in practice reminders, streak-protection alerts, assignment and feedback notifications. | Streaks decay silently; cadets forget commitments. | Better habit formation and instructor reachability. | **Medium** | Medium | Phase 4 |
| A25 | **Motivation & Retention Systems** | Seasonal challenges, badges beyond stickers, milestone celebrations, peer encouragement, at-risk detection for disengaged cadets. | Current gamification (XP/stickers/leaderboard) plateaus quickly with no long-loop hooks. | Sustained engagement across a multi-year cadet career. | **Medium** | Medium | Phase 4 |
| A26 | **Progress Analytics Over Time** | Historical trend charts (accuracy, tempo, minutes practiced) rather than current-state snapshots only. | Educators need trajectories, not point-in-time scores. | Early intervention before qualification failures. | **High** | Medium | Phase 3 |
| A27 | **Real Authentication** | Server-side identity with salted hashing, password reset, and role management. | Passwords are stored **in plaintext in localStorage** (`Login.tsx` lines ~52–60) with client-side comparison. | Account security appropriate for an organization-facing platform. | **Critical** | Medium | Phase 0 |
| A28 | **Curriculum Expansion** | Percussion/marimba track, vocal/music-director track, arranging/composition basics, Canadian Forces ceremonial music depth. | Program serves melodic wind players best; entire sections of cadet bands are underserved. | Whole-band coverage; future funding justification. | **Low** | High | Phase 5 |
| A29 | **Long-Term Sustainability Plan** | Governance model, content licensing clarity, hosting cost ownership, open-source contribution guidelines, documentation maintenance cadence. | No owner, roadmap cadence, or bus-factor mitigation exists beyond one document. | The platform outlives its original authors. | **Medium** | Low | Phase 5 |

### B. Partially Implemented Features

| # | Feature | What Exists | What Is Missing | Priority | Complexity | Phase |
|---|---------|-------------|-----------------|----------|------------|-------|
| B1 | **Adaptive Exercise Selection** | ✅ **RESOLVED (v1.1.1, Oct 2026)** — Full weighting engine in `adaptive.ts` (tiers, recency multiplier, concept floor) is now wired into `LessonView.tsx` via exported `selectAdaptiveExercises()`, which orders each lesson's exercises by adaptive weight using weighted sampling without replacement (`calculateAllAdaptiveWeights` + `applyConceptFloor`), honoring the diversity rule (no same-concept repeats back-to-back when alternatives exist). A user-visible "Adaptive Focus: …" banner (`role="status"`) shows prioritized concepts at the top of every quiz step; ordering regenerates per practice run via a `sessionKey` and reads live `user.progress.conceptMastery`. Covered by `src/tests/adaptiveSelection.test.ts` (11 checks, all passing). Original gap: selection never called the weighting functions — only `AdminPanel.tsx` imported `adaptive.ts`. | *(Closed)* | **Critical** | Low | Phase 0 |
| B2 | **Microphone Pitch Detection** | Complete capture/UI pipeline (`audioManager.ts`, `WaveformVisualizer.tsx`, `MicrophonePractice.tsx`, `AudioPracticeActivity.tsx`). | `audioActivities.ts` explicitly returns **placeholder values** ("will be implemented with pitch detection") — no YIN/autocorrelation algorithm; scoring is simulated. | **Critical** | High | Phase 0–1 |
| B3 | **Multi-Instrument Support** | Robust architecture: 20+ instrument profiles, transposition engine, store fields (`instrument`, `instrumentId`), LessonView integration. | Content reality is saxophone/clarinet-centric (`saxophoneFundamentals.ts`, `clarinetFundamentals.ts`, VirtualSaxophone); no brass/percussion fundamentals, and no instrument-selection UI in Settings. | **High** | Medium | Phase 4 |
| B4 | **Exam Preparation Foundation** | Exam metadata structures defined in the audio-practice architecture. | No runnable exam flow, scoring, or report; the "Future Exam Features" list remains aspirational. | **High** | Medium | Phase 2 |
| B5 | **Gamification** | XP, streaks, stickers, banners, leaderboard implemented client-side. | No anti-cheat normalization, no squadron/team segmentation of leaderboards, no seasonal resets, achievements not linked to curriculum milestones. | **Medium** | Low | Phase 4 |
| B6 | **Onboarding** | `Onboarding.tsx` component renders. | Not wired into first-login journey; no diagnostic placement or instrument capture. | **High** | Low | Phase 1 |
| B7 | **Analytics** | Student Analytics page and admin concept-accuracy reports exist. | No longitudinal trends, no export, no instructor-class views. | **High** | Medium | Phase 3 |
| B8 | **Mobile Usability** | Responsive Tailwind layout and touch optimizations documented. | Mic practice UX untested on mobile browsers (iOS Safari autoplay/permissions quirks); no PWA install path; small-target interactions in notation components. | **High** | Medium | Phase 4 |

### C. Documented but Not Implemented

| # | Claim in Documentation | Reality | Priority | Phase |
|---|------------------------|---------|----------|-------|
| C1 | Backend Migration Guide (Supabase/Vercel options, migration steps, costs) | No backend exists; guide is purely advisory. | **Critical** | Phase 0 |
| C2 | "Session Persistence" described under Authentication | Persistence is raw localStorage; no server session, token, or expiry. | **Critical** | Phase 0 |
| C3 | Competency Badges framework | Badge definitions documented; awarding logic not implemented end-to-end. | Medium | Phase 1 |
| C4 | Unit/integration tests for transposition ("Future" in Multi-Instrument Architecture) | Only one test file (`src/tests/functionality.test.ts`) exists repo-wide. | High | Phase 0 |
| C5 | Audio Practice Analytics (admin) | Listed as "Future"; absent. | Medium | Phase 3 |
| C6 | Rhythm analysis, tone-quality feedback, scale verification | Listed as roadmap Phases 3–4 in two separate legacy sections; none built. | High | Phase 1–2 |

### D. Implemented but Insufficiently Documented

| # | Area | Documentation Gap | Action |
|---|------|-------------------|--------|
| D1 | Legal pages & cookie consent | Cookie-policy banner behavior and Konami easter egg (`KonamiListener.tsx`, `Mascot.tsx`) are not covered in functional specs. | Add a "Hidden/Easter-Egg Features" appendix. |
| D2 | Fundamentals content modules | `saxophoneFundamentals.ts` / `clarinetFundamentals.ts` exist but their lesson IDs are not mapped to the Learning Path tree. | Add mapping table. |
| D3 | Store schema evolution | No changelog of persisted-state shape; risky for future migrations. | Maintain a `storeSchemaVersion` and migration notes. |
| D4 | Duplicate "Future Enhancements" lists | Identical Phase 2–6 lists appear under both Next-Generation Practical Learning System and Audio Practice Architecture. | Consolidated below; originals retained for history. |
| D5 | Test inventory | Testing section claims broad coverage; actual suite is minimal. | Corrected in Version History note; real CI added in Phase 0. |

### E. Architectural Weaknesses

1. **Client-side trust boundary** — authentication, XP, streaks, and progress are all mutable by the user in localStorage; any competitive or evaluative use of this data is unsound until Phase 0.
2. **Plaintext credentials** — `Login.tsx` stores and compares passwords in clear text; unacceptable if real accounts ship (fix in Phase 0 with backend auth).
3. **God-module risk** — `data.ts` (~large monolith) and duplicated phase-enhancement prose indicate copy-drift; content should migrate to structured data + CMS (Phase 5).
4. ~~**Open adaptivity loop** — the weighting engine being disconnected from exercise selection (B1) is the single highest-value architectural fix relative to effort.~~ ✅ **RESOLVED in v1.1.1 (Oct 2026)** — `LessonView.tsx` now orders every lesson's exercises through the adaptive weighting engine (`selectAdaptiveExercises()` using `calculateAllAdaptiveWeights` + `applyConceptFloor`) with a diversity rule and per-run regeneration; covered by `src/tests/adaptiveSelection.test.ts`. Remaining follow-on: session-level cross-lesson mixing is deferred to Phase 1 "Today's Practice" *(A2)*.
5. **No API abstraction layer** — components read/write the Zustand store and localStorage directly, so a backend migration will require touching every consumer unless a service/repository layer is introduced first.
6. **Scattered configuration** — adaptive weights, session caps, and level thresholds are hard-coded constants; needed as tunable, per-squadron configuration later.
7. **Minimal automated verification** — one test file against ~15,000+ LOC; regressions in transposition math or scoring would go unnoticed.

### F. Scalability & Maintainability Concerns

- **Scale:** localStorage caps (~5–10 MB/browser) and per-user analytics recomputation are fine for dozens of users but not a corps-wide deployment; server-side aggregation becomes mandatory at Phase 3 reporting scale.
- **Maintainability:** curriculum embedded in TS modules couples content updates to build/deploy cycles; duplicated roadmap/enhancement prose across sections has already drifted; absence of CI/lint gates allows silent quality decay.
- **Portability:** WebAudio APIs behave differently across iOS/Android browsers; without a device matrix and PWA strategy, mobile claims are fragile.

---

## Consolidated Future Development Roadmap

This roadmap supersedes and merges the legacy [Future Roadmap](#future-roadmap-legacy--preserved-for-historical-reference), the duplicate "Future Enhancements" phase lists in the Next-Generation Practical Learning System and Audio Practice Architecture sections, and the Backend Migration Guide timeline. Duplicate ideas were deduplicated; overlapping concepts were merged. Phase numbers here are referenced by every item in the [Comprehensive Gap Analysis](#comprehensive-gap-analysis).

### Phase 0 – Foundations & Correctness *(~4–6 weeks)*

**Goals:** Make the platform trustworthy, testable, and truthful — close the loops that are already half-built before adding new surface area.

**Deliverables:**
- Real authentication via backend (Supabase per existing Migration Guide): hashed passwords, sessions, role claims *(A27, C1, C2, E1, E2)*
- Cross-device sync + cloud profile store *(A20)*
- Data export/import and documented backup-recovery procedure *(A21)*
- ✅ **Adaptive-weighting wiring into exercise selection — DONE (v1.1.1, Oct 2026):** `adaptive.ts` is now wired into `LessonView.tsx` via `selectAdaptiveExercises()`; exercises are ordered by adaptive weight with a diversity rule, and an "Adaptive Focus" banner is shown to cadets. Tests: `src/tests/adaptiveSelection.test.ts`. *(B1, E4 — closed)*
- Genuine pitch-detection algorithm (YIN/autocorrelation) replacing placeholders *(B2)*
- Service/repository abstraction layer isolating localStorage from components *(E5)*
- CI pipeline, unit tests for transposition math/scoring/store migrations, seed integration tests *(C4, E7)*
- Accessibility baseline: semantic landmarks, labels, keyboard nav, focus states *(A22 partial)*

**Dependencies:** None — entry phase. Backend choice (Supabase vs custom) must be decided in week 1 because A20/A27/Phase 3 all depend on it.

**Priority rationale:** Security defects (plaintext passwords), data-loss risk (no backup), and broken promises (fake detection, unwired adaptivity) undermine credibility of everything else. These are also the cheapest high-trust wins.

### Phase 1 – Core Practice Loop *(~6–8 weeks)*

**Goals:** Deliver the daily habit that makes CadetMusic indispensable to a cadet.

**Deliverables:**
- Practice Planner with session timer and journal *(A1)*
- "Today's Practice" auto-recommendations fed by the now-wired adaptive engine *(A2, depends on Phase 0 B1)*
- Scale & Technique Tracker with tempo logging and metronome ramping *(A9; mic accuracy depends on Phase 0 B2)*
- Theory prerequisite gating + spaced repetition review *(A10)*
- True onboarding: instrument choice, placement diagnostic, goal setting *(A17, B6)*
- Long-term motivation tuning: achievement ↔ curriculum linkage begins *(B5 groundwork)*
- WCAG 2.1 AA pass on practice surfaces; reduced-motion and captions *(A22 completion)*

**Dependencies:** Phase 0 (adaptive wiring, real auth for journal sync, pitch detection for scale scoring).

**Priority rationale:** Practice planning + daily guidance is the product's reason to exist for cadets; everything in Phases 2–4 consumes data this loop generates.

### Phase 2 – Assessment & Qualification *(~8–10 weeks)*

**Goals:** Digitize the official standards lifecycle — the differentiator no general music app offers cadets.

**Deliverables:**
- PO qualification tracking with examiner sign-off workflow *(A3)*
- Exam/Assessment Mode with scored mock exams and report generation *(A4, B4)*
- Ear-training module *(A6)* and Rhythm-training module *(A7)*
- Sight-reading trainer (transposition-aware, leveraging existing engine) *(A8)*
- Performance-evaluation rubrics *(A5)*
- Live-mic scoring extended to tone quality and rhythm accuracy *(legacy Phase 2 items, merged)*

**Dependencies:** Phase 1 (practice history as assessment evidence); Phase 0 (reliable detection, accounts).

**Priority rationale:** Direct alignment to A-CR-CCP-166/PT-001 and PT-004 gives institutional value; instructors and band officers become stakeholders, driving adoption.

### Phase 3 – Instructor & Squadron Layer *(~8–12 weeks)*

**Goals:** Turn a cadet tool into a program-management platform.

**Deliverables:**
- Instructor dashboard with class/cohort rosters *(legacy Phase 4, merged)*
- Assignment system with due dates *(A16)*
- Instructor feedback (written + audio) with notifications *(A14)*
- Longitudinal progress analytics and trend charts *(A26, B7)*
- Squadron-level aggregate reporting with PDF/CSV export *(A15)*
- Role-based access control (cadet / instructor / squadron staff / regional) *(extends Phase 0 auth)*

**Dependencies:** Phase 0 backend (multi-user data), Phase 2 (assessment results to report on).

**Priority rationale:** Reporting and mentoring are what keep squadrons funded and staffed; however they are worthless without trustworthy per-user data, hence post-Phase-0 ordering.

### Phase 4 – Performance & Ensemble *(~10–14 weeks)*

**Goals:** Extend from solo practice to the band floor.

**Deliverables:**
- Instrument-specific training paths for brass and percussion; instrument-selection UI in Settings *(A11, B3)*
- Band-prep workflows: drill music, sectional assignments, concert setlists *(A12)*
- Audition preparation kit with mock-panel rubric scoring *(A13)*
- PWA/offline mode with deferred sync *(A23)* and push reminders *(A24)*
- Mobile hardening: iOS/Android audio-permission matrix, touch ergonomics *(B8)*
- Gamification season 2: seasonal challenges, team leaderboards, retention/at-risk signals *(A25, B5)*
- Ensemble/concert-pitch view experiments *(legacy Multi-Instrument Phase 4, merged)*

**Dependencies:** Phase 1 (habit data), Phase 3 (assignments/rosters), Phase 0 (sync for offline).

**Priority rationale:** High experiential value but dependent on prior layers; also matches real cadet-year rhythms (auditions and concerts follow qualification cycles).

### Phase 5 – Content Platform & Sustainability *(ongoing)*

**Goals:** Make the curriculum itself maintainable, searchable, expandable, and institutionally durable.

**Deliverables:**
- Content management tools (admin CRUD for lessons, songs, rubrics, standards data) *(A19, C1 residual)*
- Global search across all content types *(A18)*
- Curriculum expansion: percussion/marimba, vocal/MC track, composition/arranging, CF ceremonial depth *(A28)*
- Governance, licensing, hosting-cost ownership, contribution guidelines, documentation maintenance cadence *(A29, E6, F)*
- Tunable per-squadron configuration (adaptive weights, thresholds) *(E6)*
- Externalized content format (TS modules → structured JSON/CMS payloads) *(E3)*

**Dependencies:** Phase 0 backend and Phase 3 roles (who may edit content).

**Priority rationale:** Without instructor-editable content and a governance model, the project stalls after its authors move on; it is lower urgency than user-facing gaps but decisive for longevity.

### Milestone Summary

| Phase | Theme | Duration | Key Outcome |
|-------|-------|----------|-------------|
| 0 | Foundations & Correctness | 4–6 wk | Secure, synced, honest core |
| 1 | Core Practice Loop | 6–8 wk | Irreplaceable daily habit |
| 2 | Assessment & Qualification | 8–10 wk | Official standards digitized |
| 3 | Instructor & Squadron Layer | 8–12 wk | Program-level adoption |
| 4 | Performance & Ensemble | 10–14 wk | Whole-band coverage |
| 5 | Content Platform & Sustainability | Ongoing | Long-term viability |

---

## Gap Analysis Methodology & Verification Notes

**Method:** Static inspection of `/workspace/src` (modules and components), cross-referenced against every claim in this document and the auxiliary markdown reports. No runtime instrumentation was used; line references below were captured during the October 2026 audit. Findings were reviewed against six stakeholder lenses (cadet, instructor, squadron staff, band officer, music educator, system administrator).

**Code-level evidence by audit topic:**

1. **Adaptive engine integration status** — `src/adaptive.ts` exports a complete weighting system (`ADAPTIVE_CONFIG`, `ADAPTIVE_WEIGHTS`, `getAdaptiveState`, `calculateRecencyMultiplier`, `calculateAdaptiveWeight(s)`, `createSessionTracker`, `hasHitSessionCap`, `violatesDiversityRule`, `updateSessionTracker`). At audit time, import search showed **only `AdminPanel.tsx` imports `../adaptive`** (for `generateEnhancedAdminAnalytics`); `LessonView.tsx` contained no adaptive import or call. Competency recording (`recordCorrectAnswer`/`recordIncorrectAnswer` from `competency.ts`) *was* invoked in `LessonView.tsx` and `Analytics.tsx`. Conclusion at audit: data collection worked; adaptive *selection* was not wired (Finding B1). **UPDATE (v1.1.1, Oct 2026): Finding B1 closed.** `LessonView.tsx` now imports `calculateAllAdaptiveWeights` and `applyConceptFloor` from `../adaptive` and orders each lesson's exercises via the exported `selectAdaptiveExercises()` helper (weighted sampling without replacement, diversity rule, per-run regeneration keyed on `sessionKey`, live `conceptMastery` input), with a visible "Adaptive Focus" banner. Verified by `npx tsc --noEmit` (clean), `npm run build` (success), and `src/tests/adaptiveSelection.test.ts` (11/11 checks passing, including weak-concept dominance and diversity across 50 randomized sessions).

2. **Audio pitch detection implementation status** — `src/audioActivities.ts` line ~131 comment: *"Currently returns placeholder values, will be implemented with pitch detection."* No autocorrelation/YIN/FFT-frequency estimation exists in any source module. Capture plumbing (`audioManager.ts`, `MicrophonePractice.tsx`, `GuidedMicrophonePractice.tsx`, `WaveformVisualizer.tsx`, `AudioPracticeActivity.tsx`) is present and functional for visualization only. Conclusion: detection is simulated (Finding B2).

3. **Accessibility findings** — `grep -c "aria-"` across all 33 components returned **zero attributes** for essentially every component file (including `Dashboard.tsx`, `LessonView.tsx`, `Login.tsx`, `Settings.tsx`, `MicrophonePractice.tsx`, `AudioPracticeActivity.tsx`). No skip-links, focus-visible styling, live-region announcements, or reduced-motion media-query enforcement were found in `src/index.css`/components. Audio-dependent activities lack visual-alternative guarantees. Conclusion: WCAG non-compliance (Findings A22, §E).

4. **Authentication findings** — `src/components/Login.tsx` line ~52 comment: *"Simple password storage for demo (in production, use proper backend auth)."* `storePassword()` writes the literal password into a localStorage `users` map; login performs direct string equality (`storedPassword !== password`, line ~105). No hashing, salting, tokens, expiry, or reset flow. This contradicts the earlier "Password Storage" and "Session Persistence" sections of this document, which describe intended rather than actual behavior. Conclusion: plaintext demo auth (Findings A27, C2, E2).

5. **Multi-instrument implementation status** — `src/instruments.ts` defines 20+ `InstrumentProfile`s with transposition tables; `src/store.ts` persists `instrument` and `instrumentId` (defaults `alto-sax`); `LessonView.tsx` references instruments for display/transposition. However fundamentals content exists only for alto sax (`saxophoneFundamentals.ts`) and clarinet (`clarinetFundamentals.ts`), the virtual instrument is saxophone-only (`VirtualSaxophone.tsx`, `SaxophoneAssembly.tsx`), and `Settings.tsx` exposes no instrument picker. Conclusion: architecture complete, content breadth incomplete (Finding B3).

6. **Backend integration status** — No network clients, SDKs, or API endpoints appear anywhere in `src/`; `package.json` contains no Supabase/Firebase/API dependencies. All persistence flows through the Zustand store's localStorage subscription. The "Backend Migration Guide" in this document is prospective only. Conclusion: zero backend integration (Findings A20, C1).

7. **Test inventory** — `src/tests/` contains a single file (`functionality.test.ts`); no CI configuration exists at repo root. Prior documentation claims of broad test coverage overstate reality (Finding C4/D5).

**Scope note:** In accordance with the audit mandate, **no source code was modified**. Auxiliary markdown reports in the repository root (implementation summaries, design notes, audits) were treated as historical artifacts; where they conflict with code reality, this master document and its Gap Analysis take precedence.

---

## Support & Contact

For questions or issues:
- Review this documentation
- Check browser console for errors
- Verify localStorage is accessible
- Test in different browsers
- Clear browser data and retry

---

## License & Credits

**Standards Compliance:**
- Canadian Cadet Organization Music Standards (A-CR-CCP-166/PT-001)
- Canadian Cadet Organization Theory Program (A-CR-CCP-166/PT-004)
- Issued: 2003-06-01 and 2004-06-01

**Technology:**
- React, TypeScript, Tailwind CSS
- Zustand, Framer Motion
- Vite, Recharts, Lucide React

---

## Version History

### v1.0.0

- Complete 6-level curriculum
- Full standards compliance
- Authentication system
- Admin panel with reset
- Gamification features
- Banner customization
- Song selection system
- Interactive lessons
- Dark mode support
- Multi-instrument architecture
- Audio practice architecture
- Music notation components
- Animation system
- Legal pages and footer
- Comprehensive documentation

### v1.1.1 (Current — October 2026)

- ✅ **Closed Gap Analysis finding B1 / architectural weakness E4 (Phase 0):** wired the adaptive weighting engine (`adaptive.ts`) into `LessonView.tsx` via new exported `selectAdaptiveExercises()` — lesson exercises are now ordered by adaptive weight (weighted sampling without replacement using `calculateAllAdaptiveWeights` + `applyConceptFloor`), with a diversity rule, per-run regeneration keyed on `sessionKey`, and live `conceptMastery` input
- Added user-visible **"Adaptive Focus"** banner (`role="status"`) at the top of every quiz step, consistent with the "invisible adaptation / no negative feedback" design philosophy
- Added `src/tests/adaptiveSelection.test.ts` — 11 dependency-free checks (state classification, weight tiers, recency multiplier, weak-concept dominance, session-cap behavior, diversity across 50 randomized sessions); all passing. Verified with clean `tsc --noEmit` and successful production build
- Updated documentation: Adaptive Content Weighting section gained an "Implementation Status" subsection; Gap Analysis rows B1/E4 and Methodology note #1 marked resolved; Phase 0 deliverable checked off

### v1.1.0 (October 2026)

- Added **Comprehensive Gap Analysis** (missing / partial / documented-not-implemented / under-documented features; architectural weaknesses; scalability & maintainability concerns) from the six-stakeholder audit
- Added **Consolidated Future Development Roadmap** (Phases 0–5), which supersedes the legacy Future Roadmap (retained for historical reference)
- Added **Gap Analysis Methodology & Verification Notes** with code-level evidence (adaptive engine, pitch detection, accessibility, authentication, multi-instrument, backend, tests)
- Added Documentation Accuracy Note to the Lesson System section and TOC entries for the three new sections
- Corrected overstatements: test coverage is minimal (one suite), auth is demo-grade plaintext localStorage, pitch detection returns placeholder values — see Gap Analysis sections C/E/Methodology

---

**Documentation Version**: 1.1.1  
**Last Updated**: October 2026  
**Total Features**: 100+  
**Total Lessons**: 50+  
**Total Songs**: 62  
**Total Theory Topics**: 40  
**Total Glossary Terms**: 45+  
**Total Animations**: 136+  
**Total Instruments**: 20+  
**Total Lines of Code**: ~15,000+
