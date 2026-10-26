/**
 * Audio Activity Types
 * 
 * Defines different types of audio-based practice activities
 * for instrument assessment and training.
 */

import { Concept } from './competency';

// ============================================================
// AUDIO ACTIVITY TYPES
// ============================================================

export type AudioActivityType =
  | 'play-single-note'      // Play a specific note
  | 'play-scale'            // Play a complete scale
  | 'play-pattern'          // Play a note pattern/sequence
  | 'play-phrase'           // Play a musical phrase
  | 'play-exam-excerpt';    // Play an excerpt from exam music

// ============================================================
// AUDIO ACTIVITY INTERFACE
// ============================================================

export interface AudioActivity {
  id: string;
  type: AudioActivityType;
  concept: Concept;
  difficulty: 'easy' | 'medium' | 'hard';
  instructions: string;
  
  // Activity-specific configuration
  config: AudioActivityConfig;
  
  // Future: Exam preparation metadata
  examMetadata?: ExamMetadata;
}

// ============================================================
// ACTIVITY CONFIGURATIONS
// ============================================================

export type AudioActivityConfig =
  | SingleNoteConfig
  | ScaleConfig
  | PatternConfig
  | PhraseConfig
  | ExamExcerptConfig;

/**
 * Configuration for single note practice
 */
export interface SingleNoteConfig {
  targetNote: string;           // e.g., "G4"
  targetOctave?: number;        // e.g., 4
  allowedDeviation?: number;    // Cents tolerance (default: 25)
  duration?: number;            // How long to hold note (ms)
}

/**
 * Configuration for scale practice
 */
export interface ScaleConfig {
  targetScale: string;          // e.g., "Bb Major"
  direction?: 'ascending' | 'descending' | 'both';
  octave?: number;              // Starting octave
  tempo?: number;               // BPM (for future metronome)
  allowedNotes?: string[];      // Notes that are acceptable
}

/**
 * Configuration for pattern practice
 */
export interface PatternConfig {
  pattern: string[];            // Sequence of notes, e.g., ["C4", "E4", "G4", "C5"]
  tempo?: number;               // BPM
  rhythm?: string;              // Rhythm pattern description
  allowedDeviation?: number;    // Cents tolerance per note
}

/**
 * Configuration for phrase practice
 */
export interface PhraseConfig {
  phrase: string;               // Musical phrase description
  notes: string[];              // Expected notes
  rhythm?: string;              // Rhythm pattern
  dynamics?: string;            // Dynamic markings
  articulation?: string;        // Articulation markings
  tempo?: number;               // BPM
}

/**
 * Configuration for exam excerpt practice
 */
export interface ExamExcerptConfig {
  excerptId: string;            // Reference to exam music
  measures?: string;            // Measure range, e.g., "1-8"
  targetNotes?: string[];       // Expected notes
  allowedNotes?: string[];      // Notes that are acceptable
  tempo?: number;               // Target tempo
  keySignature?: string;        // Expected key
  timeSignature?: string;       // Expected time signature
}

// ============================================================
// EXAM PREPARATION METADATA
// ============================================================

export interface ExamMetadata {
  examLevel: string;            // e.g., "Level 1", "Level 2"
  examType: string;             // e.g., "Technical", "Musical"
  pieceTitle?: string;          // Name of exam piece
  composer?: string;            // Composer name
  requirements: ExamRequirement[];
}

export interface ExamRequirement {
  category: string;             // e.g., "Intonation", "Rhythm", "Tone"
  description: string;          // What is being assessed
  weight: number;               // Importance (0-1)
  criteria: string[];           // Specific criteria to meet
}

// ============================================================
// NOTE DETECTION INTERFACES
// ============================================================

/**
 * Result from note detection analysis
 * Currently returns placeholder values, will be implemented with pitch detection
 */
export interface NoteDetectionResult {
  note: string;                 // Detected note name (e.g., "G")
  octave: number;               // Detected octave (e.g., 4)
  frequency: number;            // Detected frequency in Hz
  confidence: number;           // Detection confidence (0-1)
  cents: number;                // Deviation from perfect pitch (-50 to +50)
  timestamp: number;            // When detection occurred
}

/**
 * Result from scale verification
 */
export interface ScaleVerificationResult {
  correct: boolean;             // Overall success
  expectedNotes: string[];      // What was expected
  detectedNotes: string[];      // What was detected
  missingNotes: string[];       // Notes that were not played
  extraNotes: string[];         // Notes that were not expected
  accuracy: number;             // Percentage correct (0-100)
  feedback: string;             // Human-readable feedback
}

/**
 * Result from pattern verification
 */
export interface PatternVerificationResult {
  correct: boolean;             // Overall success
  expectedPattern: string[];    // What was expected
  detectedPattern: string[];    // What was detected
  noteResults: NoteByNoteResult[]; // Per-note analysis
  accuracy: number;             // Percentage correct (0-100)
  feedback: string;             // Human-readable feedback
}

export interface NoteByNoteResult {
  expected: string;             // Expected note
  detected: string | null;      // Detected note (null if not detected)
  correct: boolean;             // Was it correct?
  cents: number;                // Cents deviation
  confidence: number;           // Detection confidence
}

// ============================================================
// ACTIVITY FACTORY
// ============================================================

/**
 * Create a single note practice activity
 */
export function createSingleNoteActivity(
  id: string,
  concept: Concept,
  targetNote: string,
  difficulty: 'easy' | 'medium' | 'hard' = 'medium'
): AudioActivity {
  return {
    id,
    type: 'play-single-note',
    concept,
    difficulty,
    instructions: `Play the note ${targetNote} clearly and hold it for 2 seconds.`,
    config: {
      targetNote,
      allowedDeviation: 25,
      duration: 2000,
    } as SingleNoteConfig,
  };
}

/**
 * Create a scale practice activity
 */
export function createScaleActivity(
  id: string,
  concept: Concept,
  targetScale: string,
  difficulty: 'easy' | 'medium' | 'hard' = 'medium'
): AudioActivity {
  return {
    id,
    type: 'play-scale',
    concept,
    difficulty,
    instructions: `Play the ${targetScale} scale ascending and descending.`,
    config: {
      targetScale,
      direction: 'both',
      tempo: 80,
    } as ScaleConfig,
  };
}

/**
 * Create a pattern practice activity
 */
export function createPatternActivity(
  id: string,
  concept: Concept,
  pattern: string[],
  difficulty: 'easy' | 'medium' | 'hard' = 'medium'
): AudioActivity {
  return {
    id,
    type: 'play-pattern',
    concept,
    difficulty,
    instructions: `Play the following pattern: ${pattern.join(' - ')}`,
    config: {
      pattern,
      tempo: 80,
      allowedDeviation: 25,
    } as PatternConfig,
  };
}

/**
 * Create a phrase practice activity
 */
export function createPhraseActivity(
  id: string,
  concept: Concept,
  phrase: string,
  notes: string[],
  difficulty: 'easy' | 'medium' | 'hard' = 'medium'
): AudioActivity {
  return {
    id,
    type: 'play-phrase',
    concept,
    difficulty,
    instructions: `Play this musical phrase with proper rhythm and expression.`,
    config: {
      phrase,
      notes,
      tempo: 80,
    } as PhraseConfig,
  };
}

/**
 * Create an exam excerpt practice activity
 */
export function createExamExcerptActivity(
  id: string,
  concept: Concept,
  excerptId: string,
  examMetadata: ExamMetadata,
  difficulty: 'easy' | 'medium' | 'hard' = 'hard'
): AudioActivity {
  return {
    id,
    type: 'play-exam-excerpt',
    concept,
    difficulty,
    instructions: `Play this excerpt from your exam piece with attention to intonation and rhythm.`,
    config: {
      excerptId,
      tempo: 80,
    } as ExamExcerptConfig,
    examMetadata,
  };
}

// ============================================================
// PREDEFINED ACTIVITIES
// ============================================================

/**
 * Basic level audio activities
 */
export const BASIC_AUDIO_ACTIVITIES: AudioActivity[] = [
  createSingleNoteActivity('basic-note-g', 'scales', 'G4', 'easy'),
  createSingleNoteActivity('basic-note-c', 'scales', 'C5', 'easy'),
  createScaleActivity('basic-scale-bb', 'scales', 'Bb Major', 'easy'),
  createScaleActivity('basic-scale-eb', 'scales', 'Eb Major', 'easy'),
  createScaleActivity('basic-scale-f', 'scales', 'F Major', 'easy'),
];

/**
 * Level 1 audio activities
 */
export const LEVEL_ONE_AUDIO_ACTIVITIES: AudioActivity[] = [
  createScaleActivity('l1-scale-all-majors', 'scales', 'All Major Scales', 'medium'),
  createPatternActivity('l1-arpeggio-1', 'scales', ['C4', 'E4', 'G4', 'C5'], 'medium'),
  createPatternActivity('l1-arpeggio-2', 'scales', ['Bb3', 'D4', 'F4', 'Bb4'], 'medium'),
];

/**
 * Get audio activities for a specific level
 */
export function getAudioActivitiesForLevel(level: string): AudioActivity[] {
  switch (level) {
    case 'Basic':
      return BASIC_AUDIO_ACTIVITIES;
    case 'Level 1':
      return LEVEL_ONE_AUDIO_ACTIVITIES;
    default:
      return [];
  }
}

/**
 * Get audio activities for a specific concept
 */
export function getAudioActivitiesForConcept(concept: Concept): AudioActivity[] {
  const allActivities = [
    ...BASIC_AUDIO_ACTIVITIES,
    ...LEVEL_ONE_AUDIO_ACTIVITIES,
  ];
  
  return allActivities.filter(activity => activity.concept === concept);
}
