/**
 * Interactive Activity Types Framework
 * 
 * Defines various hands-on learning activities beyond multiple choice.
 * Supports kinesthetic, visual, and auditory learning styles.
 * 
 * Activity Types:
 * 1. Drag and Drop
 * 2. Note Placement
 * 3. Rhythm Tapping
 * 4. Fingering Challenges
 * 5. Staff Construction
 * 6. Theory Manipulation
 */

import { Concept } from './competency';

// ============================================================
// ACTIVITY TYPE DEFINITIONS
// ============================================================

export type ActivityType =
  | 'multiple-choice'
  | 'true-false'
  | 'drag-drop'
  | 'note-placement'
  | 'rhythm-tapping'
  | 'fingering-challenge'
  | 'staff-construction'
  | 'theory-manipulation'
  | 'virtual-sax'
  | 'microphone';

/**
 * Base activity interface
 */
export interface BaseActivity {
  id: string;
  type: ActivityType;
  concept: Concept;
  difficulty: 'easy' | 'medium' | 'hard';
  instructions: string;
}

// ============================================================
// DRAG AND DROP ACTIVITIES
// ============================================================

/**
 * Drag and drop activity
 * User drags items to correct positions
 */
export interface DragDropActivity extends BaseActivity {
  type: 'drag-drop';
  items: Array<{
    id: string;
    label: string;
    correctPosition: string;
  }>;
  positions: Array<{
    id: string;
    label: string;
    x: number;
    y: number;
  }>;
}

/**
 * Example: Drag sharps/flats to correct staff positions for key signatures
 */
export const KEY_SIGNATURE_DRAG_DROP: DragDropActivity = {
  id: 'key-sig-drag-1',
  type: 'drag-drop',
  concept: 'keySignatures',
  difficulty: 'medium',
  instructions: 'Drag the sharps to the correct positions to create D major key signature',
  items: [
    { id: 'sharp1', label: '♯', correctPosition: 'F5' },
    { id: 'sharp2', label: '♯', correctPosition: 'C5' },
  ],
  positions: [
    { id: 'F5', label: 'F', x: 100, y: 50 },
    { id: 'C5', label: 'C', x: 100, y: 150 },
  ],
};

// ============================================================
// NOTE PLACEMENT ACTIVITIES
// ============================================================

/**
 * Note placement activity
 * User places notes on staff
 */
export interface NotePlacementActivity extends BaseActivity {
  type: 'note-placement';
  targetNotes: Array<{
    note: string;
    octave: number;
    staffPosition: number; // -5 to 5 (lines and spaces)
  }>;
  staffLines: number;
  clef: 'treble' | 'bass' | 'alto' | 'tenor';
}

/**
 * Example: Place notes to spell a C major chord
 */
export const CHORD_PLACEMENT: NotePlacementActivity = {
  id: 'chord-place-1',
  type: 'note-placement',
  concept: 'intervals',
  difficulty: 'medium',
  instructions: 'Place the notes to build a C major triad (C-E-G)',
  targetNotes: [
    { note: 'C', octave: 4, staffPosition: 0 },
    { note: 'E', octave: 4, staffPosition: 2 },
    { note: 'G', octave: 4, staffPosition: 4 },
  ],
  staffLines: 5,
  clef: 'treble',
};

// ============================================================
// RHYTHM TAPPING ACTIVITIES
// ============================================================

/**
 * Rhythm tapping activity
 * User taps rhythm in time with metronome
 */
export interface RhythmTappingActivity extends BaseActivity {
  type: 'rhythm-tapping';
  pattern: Array<{
    duration: number; // in beats
    type: 'quarter' | 'eighth' | 'half' | 'whole' | 'sixteenth';
  }>;
  tempo: number; // BPM
  timeSignature: string; // e.g., "4/4"
  measures: number;
}

/**
 * Example: Tap a simple rhythm pattern
 */
export const RHYTHM_TAP_1: RhythmTappingActivity = {
  id: 'rhythm-tap-1',
  type: 'rhythm-tapping',
  concept: 'rhythm',
  difficulty: 'easy',
  instructions: 'Tap the rhythm pattern at 80 BPM',
  pattern: [
    { duration: 1, type: 'quarter' },
    { duration: 0.5, type: 'eighth' },
    { duration: 0.5, type: 'eighth' },
    { duration: 1, type: 'quarter' },
    { duration: 2, type: 'half' },
  ],
  tempo: 80,
  timeSignature: '4/4',
  measures: 2,
};

// ============================================================
// FINGERING CHALLENGE ACTIVITIES
// ============================================================

/**
 * Fingering challenge activity
 * User identifies or produces fingerings
 */
export interface FingeringChallengeActivity extends BaseActivity {
  type: 'fingering-challenge';
  mode: 'identify' | 'produce';
  targetNote?: string; // For 'produce' mode
  targetFingering?: string[]; // For 'identify' mode
  instrument: 'alto' | 'tenor' | 'baritone' | 'soprano';
}

/**
 * Example: Identify the note from fingering
 */
export const FINGERING_IDENTIFY_1: FingeringChallengeActivity = {
  id: 'fingering-id-1',
  type: 'fingering-challenge',
  concept: 'scales',
  difficulty: 'medium',
  instructions: 'What note is this fingering?',
  mode: 'identify',
  targetFingering: ['lh1', 'lh2', 'lh3', 'rh1', 'rh2', 'rh3'],
  instrument: 'alto',
};

// ============================================================
// STAFF CONSTRUCTION ACTIVITIES
// ============================================================

/**
 * Staff construction activity
 * User builds musical notation
 */
export interface StaffConstructionActivity extends BaseActivity {
  type: 'staff-construction';
  task: 'key-signature' | 'time-signature' | 'notation';
  target: any; // Specific to task type
}

/**
 * Example: Construct a key signature
 */
export const STAFF_CONSTRUCT_1: StaffConstructionActivity = {
  id: 'staff-construct-1',
  type: 'staff-construction',
  concept: 'keySignatures',
  difficulty: 'hard',
  instructions: 'Construct the key signature for Bb major',
  task: 'key-signature',
  target: {
    key: 'Bb',
    accidentals: ['Bb', 'Eb'],
  },
};

// ============================================================
// THEORY MANIPULATION ACTIVITIES
// ============================================================

/**
 * Theory manipulation activity
 * User manipulates theoretical concepts
 */
export interface TheoryManipulationActivity extends BaseActivity {
  type: 'theory-manipulation';
  manipulation: 'transpose' | 'invert' | 'harmonize' | 'analyze';
  input: any;
  expectedOutput?: any;
}

/**
 * Example: Transpose a melody
 */
export const TRANSPOSE_1: TheoryManipulationActivity = {
  id: 'transpose-1',
  type: 'theory-manipulation',
  concept: 'transposition',
  difficulty: 'hard',
  instructions: 'Transpose this melody from C major to G major',
  manipulation: 'transpose',
  input: {
    key: 'C',
    notes: ['C', 'D', 'E', 'F', 'G'],
  },
  expectedOutput: {
    key: 'G',
    notes: ['G', 'A', 'B', 'C', 'D'],
  },
};

// ============================================================
// VIRTUAL SAXOPHONE ACTIVITIES
// ============================================================

/**
 * Virtual saxophone activity
 * User interacts with virtual instrument
 */
export interface VirtualSaxActivity extends BaseActivity {
  type: 'virtual-sax';
  mode: 'build-note' | 'identify-note' | 'scale-builder' | 'random-practice';
  targetNote?: string;
  targetScale?: string;
  showNoteName?: boolean;
}

/**
 * Example: Build a specific note
 */
export const VIRTUAL_SAX_1: VirtualSaxActivity = {
  id: 'virtual-sax-1',
  type: 'virtual-sax',
  concept: 'scales',
  difficulty: 'easy',
  instructions: 'Play the note G on the virtual saxophone',
  mode: 'build-note',
  targetNote: 'G4',
  showNoteName: true,
};

// ============================================================
// MICROPHONE ACTIVITIES
// ============================================================

/**
 * Microphone activity
 * User plays into microphone for pitch detection
 */
export interface MicrophoneActivity extends BaseActivity {
  type: 'microphone';
  task: 'note-detection' | 'scale-verification' | 'rhythm-practice';
  targetNote?: string;
  targetScale?: string;
  tolerance?: number; // cents
}

/**
 * Example: Play a specific note
 */
export const MICROPHONE_1: MicrophoneActivity = {
  id: 'microphone-1',
  type: 'microphone',
  concept: 'intonation',
  difficulty: 'medium',
  instructions: 'Play the note A4 into your microphone',
  task: 'note-detection',
  targetNote: 'A4',
  tolerance: 25, // cents
};

// ============================================================
// ACTIVITY UNION TYPE
// ============================================================

export type Activity =
  | DragDropActivity
  | NotePlacementActivity
  | RhythmTappingActivity
  | FingeringChallengeActivity
  | StaffConstructionActivity
  | TheoryManipulationActivity
  | VirtualSaxActivity
  | MicrophoneActivity;

// ============================================================
// ACTIVITY FACTORY
// ============================================================

/**
 * Create activity based on type
 */
export function createActivity(type: ActivityType, props: Partial<BaseActivity>): Activity {
  const baseActivity = {
    id: `activity-${Date.now()}`,
    concept: 'rhythm' as Concept,
    difficulty: 'medium' as const,
    instructions: '',
    ...props,
  };

  switch (type) {
    case 'drag-drop':
      return { ...baseActivity, type: 'drag-drop', items: [], positions: [] } as DragDropActivity;
    case 'note-placement':
      return { ...baseActivity, type: 'note-placement', targetNotes: [], staffLines: 5, clef: 'treble' } as NotePlacementActivity;
    case 'rhythm-tapping':
      return { ...baseActivity, type: 'rhythm-tapping', pattern: [], tempo: 80, timeSignature: '4/4', measures: 2 } as RhythmTappingActivity;
    case 'fingering-challenge':
      return { ...baseActivity, type: 'fingering-challenge', mode: 'identify', instrument: 'alto' } as FingeringChallengeActivity;
    case 'staff-construction':
      return { ...baseActivity, type: 'staff-construction', task: 'key-signature', target: {} } as StaffConstructionActivity;
    case 'theory-manipulation':
      return { ...baseActivity, type: 'theory-manipulation', manipulation: 'transpose', input: {} } as TheoryManipulationActivity;
    case 'virtual-sax':
      return { ...baseActivity, type: 'virtual-sax', mode: 'build-note', showNoteName: true } as VirtualSaxActivity;
    case 'microphone':
      return { ...baseActivity, type: 'microphone', task: 'note-detection', tolerance: 25 } as MicrophoneActivity;
    default:
      throw new Error(`Unknown activity type: ${type}`);
  }
}

/**
 * Get activity component name based on type
 */
export function getActivityComponentName(type: ActivityType): string {
  const componentMap: Record<ActivityType, string> = {
    'multiple-choice': 'MultipleChoiceActivity',
    'true-false': 'TrueFalseActivity',
    'drag-drop': 'DragDropActivity',
    'note-placement': 'NotePlacementActivity',
    'rhythm-tapping': 'RhythmTappingActivity',
    'fingering-challenge': 'FingeringChallengeActivity',
    'staff-construction': 'StaffConstructionActivity',
    'theory-manipulation': 'TheoryManipulationActivity',
    'virtual-sax': 'VirtualSaxActivity',
    'microphone': 'MicrophoneActivity',
  };
  return componentMap[type];
}
