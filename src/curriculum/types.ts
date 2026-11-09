// Shared types for the rewritten curriculum.
// Kept free of imports from data.ts so data.ts can re-export from here
// without creating a circular dependency.

export type CadetLevel = 'BASIC' | 'ONE' | 'TWO' | 'THREE' | 'FOUR' | 'FIVE';

export type LessonType = 'theory' | 'playing' | 'rhythm' | 'exam' | 'audio';

/** The two instrument tracks that currently have a full curriculum. */
export type TrackId = 'saxophone' | 'clarinet';

export interface Lesson {
  id: string;
  title: string;
  type: LessonType;
  emoji: string;
  topic: string;
  xp: number;
  description: string;
  interactive: boolean;
  level: CadetLevel;
  /** Performance objective number from the level package (e.g. 13, 116, 218). */
  po?: number;
  requiresMicrophone?: boolean;
}

export interface CurriculumSection {
  id: string;
  title: string;
  level: number;
  lessons: Lesson[];
}

export type InteractiveExerciseType =
  | 'note-identification'
  | 'key-signature-builder'
  | 'rhythm-clapping'
  | 'interval-recognition'
  | 'scale-builder'
  | 'chord-builder'
  | 'dynamics-practice'
  | 'time-signature';

export interface VideoLink {
  title: string;
  url: string;
  /** Short note shown under the link, e.g. where the clip comes from. */
  note?: string;
}

/** Same shape LessonView already renders, plus optional watch-links. */
export interface LessonContentData {
  title: string;
  introduction: string;
  sections: { heading: string; content: string; example?: string; tip?: string }[];
  keyPoints: string[];
  practiceInstructions: string;
  interactiveExercise?: { type: InteractiveExerciseType; title: string; description: string };
  videos?: VideoLink[];
}

export type ExerciseKind = 'multiple-choice' | 'note-match' | 'rhythm-tap' | 'true-false' | 'fill-order';

/** Same shape as LessonView's Exercise (audio exercises are not used here). */
export interface ExerciseData {
  type: ExerciseKind;
  question: string;
  options?: { text: string; correct: boolean }[];
  items?: string[];
  correctOrder?: string[];
  correctAnswer?: string;
  notePairs?: { note: string; position: string }[];
  concept?: string;
}
