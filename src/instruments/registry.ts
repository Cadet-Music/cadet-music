/**
 * Instrument registry.
 *
 * The single place that decides what Cadet Music can do for an instrument ID.
 * Core code asks this module; it never compares instrument names itself.
 *
 * Support levels:
 *  - 'full'        Requirement program, curriculum track and progress tracking.
 *  - 'legacy'      Existing lesson content only. No requirement program yet.
 *  - 'unsupported' Not implemented. Core code must not fall back to another
 *                  instrument's content; it must show an explicit message.
 *
 * Adding an instrument: add a profile to INSTRUMENTS (src/instruments.ts),
 * add an entry to ENTRIES below, and add its requirement program. No other
 * shared code should need to change.
 */

import { INSTRUMENTS, type InstrumentProfile } from '../instruments';

export type InstrumentSupport = 'full' | 'legacy';

export type CurriculumTrackKey = 'saxophone' | 'clarinet';

export interface InstrumentEntry {
  readonly profile: InstrumentProfile;
  readonly support: InstrumentSupport;
  /** Lesson-content track in src/curriculum. Null when the instrument has none. */
  readonly curriculumTrack: CurriculumTrackKey | null;
  /** Requirement program id (src/requirements/programs). Null until implemented. */
  readonly requirementProgramId: string | null;
}

/** Instrument IDs that have an explicit entry. Anything else is unsupported. */
const ENTRIES: Readonly<Record<string, InstrumentEntry>> = Object.freeze({
  'alto-sax': {
    profile: INSTRUMENTS['alto-sax'],
    support: 'full',
    curriculumTrack: 'saxophone',
    requirementProgramId: 'alto-sax',
  },
  // Clarinet keeps its existing lesson content until it has a requirement program.
  clarinet: {
    profile: INSTRUMENTS['clarinet'],
    support: 'legacy',
    curriculumTrack: 'clarinet',
    requirementProgramId: null,
  },
});

/** Used only for brand-new accounts. Must be a 'full' instrument. */
export const DEFAULT_INSTRUMENT_ID = 'alto-sax';

/** Maps the onboarding/settings instrument type to an instrument ID. */
const INSTRUMENT_TYPE_IDS: Readonly<Record<string, string>> = Object.freeze({
  alto: 'alto-sax',
  tenor: 'tenor-sax',
  baritone: 'baritone-sax',
  soprano: 'soprano-sax',
});

export function instrumentIdForType(type: string): string | null {
  return INSTRUMENT_TYPE_IDS[type] ?? null;
}

/** Entry for a registered instrument ID, or null if the ID is not registered. */
export function getInstrumentEntry(instrumentId: string | null | undefined): InstrumentEntry | null {
  if (!instrumentId) return null;
  return Object.prototype.hasOwnProperty.call(ENTRIES, instrumentId) ? ENTRIES[instrumentId] : null;
}

/** True when Cadet Music cannot offer any content or progress for this instrument. */
export function isUnsupportedInstrument(instrumentId: string | null | undefined): boolean {
  return getInstrumentEntry(instrumentId) === null;
}

/** True when the instrument has a requirement program (full progression support). */
export function hasRequirementProgram(instrumentId: string | null | undefined): boolean {
  return getInstrumentEntry(instrumentId)?.support === 'full';
}

/** Display name for any known instrument ID, including unsupported ones. */
export function instrumentDisplayName(instrumentId: string | null | undefined): string {
  if (!instrumentId) return 'Unknown instrument';
  return INSTRUMENTS[instrumentId]?.name ?? instrumentId;
}

/** All instrument IDs with full support, in registry order. */
export function fullySupportedInstrumentIds(): string[] {
  return Object.keys(ENTRIES).filter((id) => ENTRIES[id].support === 'full');
}
