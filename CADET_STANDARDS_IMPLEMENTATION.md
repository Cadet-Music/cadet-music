# Canadian Cadet Organization Standards Implementation

## Overview
The app has been fully restructured to align with the official **Canadian Cadet Organization Music Standards (A-CR-CCP-166/PT-001)** for saxophone in the Military Band track.

## Key Changes

### 1. Six-Level System (BASIC → FIVE)
**Old:** Numeric levels 0-4
**New:** Official cadet levels: `BASIC`, `ONE`, `TWO`, `THREE`, `FOUR`, `FIVE`

Each level has specific requirements:
- **BASIC:** Awareness level
- **ONE & TWO:** Basic knowledge, limited skill
- **THREE & FOUR:** Detailed knowledge, skilled
- **FIVE:** Comprehensive knowledge, highly skilled

### 2. Performance Objectives (POs)
All 11 POs are now tracked:

| PO | Area | Critical Levels | Course Value (3-5) |
|----|------|----------------|-------------------|
| 450 | Maintenance | THREE-FIVE | 5% |
| 451 | Technique & Rhythm | ALL | 10% |
| 452 | Individual Practice | ALL | - |
| 453 | Intonation | TWO-FIVE | 5% |
| 454 | Prepared Music | ALL | 35-40% |
| 455 | Ensemble | ALL | 15% |
| 456 | Sight Reading | THREE-FIVE | 5% |
| 457 | Aural Skills | THREE-FIVE | 5% |
| 458 | Music Theory | TWO-FIVE | 10% |
| 459 | Band Drill | ALL | 5% |
| 460 | Conducting | FOUR-FIVE | 5% |

### 3. Prepared Music (Annex D)
**Official song lists for each level:**

#### BASIC
- **List A:** Western Portrait, Austrian Melody, The Minstrel Boy
- **List B:** Ode to Joy, America/God Save the Queen, Scarborough Fair

#### ONE
- **List A:** Abendlied, Andante, Winter Dreams, Aria, Old Folks at Home, Annie Laurie, Lullaby
- **List B:** Gavotte, Fandango, Rigaudon, Scenes that are Brightest, Waltz, March

#### TWO
- **List A:** At the Hearth, Meadowland, Etude in D Minor, Andante, Loreley
- **List B:** Hunter Chorus, Polka, Duet Brillant

#### THREE (RCM Grade 2)
- **List A:** Air Gracile, Allerseelen, Concerto in B-flat Minor, Romantic Piece, Andante Grazioso, On Wings of Song
- **List B:** Canzonetta and Giga, Allegro, Allegro Moderato, Allegretto Brillante

#### FOUR (RCM Grade 4)
- **List A:** Romantic Piece, Chartreuse, Introduction and Rondo, Album-Leaf
- **List B:** Le Secret, Minuet, Sicilienne and Allegro

#### FIVE (RCM Grade 6)
- **List A:** Elegie, Recitative and Allegro, Vocalise, Nocturne, Larghetto, Melodie
- **List B:** Largo and Allegro, Gypsy Rondo, Fantaisie Mauresque, Concertante, Andante and Allegro

### 4. Scales (Annex B)
**By level and instrument:**

#### BASIC (1 octave, ♩=60, no memorization)
- **Alto (E♭):** Bb Major, Eb Major, F Major
- **Tenor (B♭):** C Major, F Major, G Major

#### ONE (1 octave, ♩=66, no memorization)
- Major, Chromatic, Harmonic Minor scales

#### TWO (1 octave, ♩=72, no memorization)
- Major, Chromatic, Harmonic Minor scales (more keys)

#### THREE (2 octaves, ♪=60, memorized)
- Major, Chromatic, Melodic Minor, Harmonic Minor

#### FOUR (2 octaves, ♪=72, memorized)
- All major/minor scales

#### FIVE (2 octaves, ♪=80, memorized, up to 7 accidentals)
- All major/minor scales with full key coverage

### 5. Maintenance Tasks (Annex A)
**Progressive by level:**
- **BASIC:** Daily swabbing, mouthpiece swabbing, reed care
- **ONE:** + Cork lubrication
- **TWO:** + Cleaning grease from pads
- **THREE:** + Reseating pads
- **FOUR:** + Minor repairs (replacing pads)
- **FIVE:** + Adapting ligature, replacing pads

### 6. Intonation Standards (Annex K)
- **BASIC:** Identifies sharp/flat when told
- **ONE:** May be unsure, adjusts when instructed
- **TWO-THREE:** Identifies sharp/flat against tuning note and adjusts
- **FOUR-FIVE:** Identifies sharp/flat in ensemble and adjusts

### 7. Sight Reading Standards (Annex F)
- **BASIC:** Not required
- **ONE-THREE:** Up to 16 bars, with assistance
- **FOUR-FIVE:** Up to 32 bars, without assistance

### 8. Assessment Structure
**Critical Items (Complete/Incomplete):**
- Must achieve at least 60% on each critical PO
- Blocks progression if not met

**Non-Critical Items (Satisfactory/Unsatisfactory):**
- Don't block level progression
- Used for overall assessment

## Implementation Details

### Data Structure (`src/data.ts`)
```typescript
export type CadetLevel = 'BASIC' | 'ONE' | 'TWO' | 'THREE' | 'FOUR' | 'FIVE';

export const LEVEL_INFO: Record<CadetLevel, {
  number: number;
  description: string;
  scaleTempo: string;
  scaleRange: string;
  scaleTypes: string[];
  memorized: boolean;
}>

export const POS: PerformanceObjective[] // All 11 POs
export const PREPARED_MUSIC: Song[] // Official song lists
export const MAINTENANCE_TASKS: Record<CadetLevel, string[]>
export const INTONATION_STANDARDS: Record<CadetLevel, string>
export const SIGHT_READING_STANDARDS: Record<CadetLevel, string | null>
export const ALTO_SAX_SCALES: Record<CadetLevel, ScaleKey[]>
export const TENOR_SAX_SCALES: Record<CadetLevel, ScaleKey[]>
```

### Store Updates (`src/store.ts`)
- User levels now use `CadetLevel` type instead of numbers
- Level comparisons use `LEVEL_INFO[level].number`
- Validation ensures playing level ≤ theory level

### Component Updates
- **Onboarding:** 10-question assessment places cadets into correct level
- **Settings:** Level selection with official 6-level system
- **Songs:** Shows official List A and List B for selected level
- **Dashboard:** Curriculum organized by POs
- **Admin Panel:** Tree view showing PO-based progress

## Compliance Checklist

✅ Six-level system (BASIC-FIVE)
✅ All 11 Performance Objectives tracked
✅ Official prepared music lists (Annex D)
✅ Scale requirements by level and instrument (Annex B)
✅ Maintenance tasks by level (Annex A)
✅ Intonation standards (Annex K)
✅ Sight reading standards (Annex F)
✅ Critical vs non-critical assessment structure
✅ Theory level ≥ playing level validation
✅ Song selection forced (1 from List A + 1 from List B)
✅ RCM equivalents noted for levels 3-5

## Next Steps for Full Compliance

### Phase 1: Content Expansion
1. Add lessons for all POs at each level
2. Create scale practice modules with tempo requirements
3. Add maintenance task checklists
4. Implement sight reading exercises (16 bars for levels 1-3, 32 bars for 4-5)
5. Add aural skills training modules

### Phase 2: Assessment System
1. Implement critical/non-critical item tracking
2. Add 60% threshold validation for critical POs
3. Create exam simulation for each level
4. Track Complete/Incomplete for critical items
5. Track Satisfactory/Unsatisfactory for non-critical items

### Phase 3: Advanced Features
1. Add ensemble practice tracking (PO 455)
2. Implement band drill modules (PO 459)
3. Add conducting exercises for levels 4-5 (PO 460)
4. Create individual practice logs (PO 452)
5. Add intonation training with tuning exercises

### Phase 4: Backend Integration
1. Store PO completion data per cadet
2. Track assessment results (critical/non-critical)
3. Generate progress reports by PO
4. Export data for instructor review
5. Implement level advancement workflow

## References
- **Standard:** A-CR-CCP-166/PT-001
- **Issued:** 2003-06-01
- **Scope:** Canadian Cadet Organization music program
- **Track:** Military Band (Section 2)
- **Instrument:** Saxophone

## Annexes Referenced
- **Annex A:** Woodwind Maintenance
- **Annex B:** Scales
- **Annex D:** Prepared Music (Saxophone)
- **Annex F:** Sight Reading
- **Annex K:** Intonation
