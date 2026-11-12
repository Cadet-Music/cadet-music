/**
 * Requirement model.
 *
 * Instrument-neutral. A requirement is something the cadet must demonstrate
 * for a level. Instrument programs (src/requirements/programs) supply the
 * concrete requirements; the engine (engine.ts) works on these types only.
 *
 * Progress is counted from requirement records, not from lesson completion.
 * Lesson completion can move a requirement to 'learning' but never to a
 * counted state.
 */

import type { CadetLevel } from '../curriculum/types';

export type RequirementFamily =
  | 'maintenance'
  | 'rhythm'
  | 'scales'
  | 'sight-reading'
  | 'theory'
  | 'prepared-music'
  | 'drill';

export const FAMILY_ORDER: readonly RequirementFamily[] = [
  'maintenance',
  'rhythm',
  'scales',
  'sight-reading',
  'theory',
  'prepared-music',
  'drill',
];

export const FAMILY_TITLE: Readonly<Record<RequirementFamily, string>> = {
  maintenance: 'Care of your instrument',
  rhythm: 'Rhythm',
  scales: 'Scales',
  'sight-reading': 'Sight-reading',
  theory: 'Music theory',
  'prepared-music': 'Prepared music',
  drill: 'Band drill',
};

export interface RequirementDef {
  /** Stable, instrument-neutral id. Never encodes an instrument name. */
  readonly id: string;
  readonly level: CadetLevel;
  readonly family: RequirementFamily;
  /** What the cadet is asked to do, in plain words. */
  readonly title: string;
  /** The pass standard, in plain words, taken from the official material. */
  readonly standard: string;
  /** Where the standard comes from, for the cadet and the instructor. */
  readonly source: string;
  /** Lesson ids (curriculum) that teach this requirement. Used for 'learning' only. */
  readonly teachingLessonIds: readonly string[];
}

export interface RequirementProgram {
  /** Matches RegistryEntry.requirementProgramId. */
  readonly programId: string;
  readonly instrumentId: string;
  /** Requirements in pathway order (levels ascending, then family order, then listing order). */
  readonly requirements: readonly RequirementDef[];
}

/**
 * Per-cadet state for one requirement.
 *  - not-started:    nothing recorded and no teaching lesson completed.
 *  - learning:       at least one teaching lesson completed; not yet self-checked.
 *  - ready-to-check: the cadet has marked it ready. Self-reported, does not count.
 *  - observed-pass:  an assessor recorded a pass. This is the only counted state.
 */
export type RequirementState = 'not-started' | 'learning' | 'ready-to-check' | 'observed-pass';

/** What is recorded for a cadet against one requirement. */
export interface RequirementRecord {
  /** Cadet marked the requirement ready to check (self-report). */
  readyAt?: string;
  /** Assessor-recorded pass. Not writable from the cadet's own UI. */
  observedPassAt?: string;
  observedBy?: string;
  note?: string;
}

export const STATE_LABEL: Readonly<Record<RequirementState, string>> = {
  'not-started': 'Not started',
  learning: 'Learning',
  'ready-to-check': 'Ready to check (self-check)',
  'observed-pass': 'Passed',
};
