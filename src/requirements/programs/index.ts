/**
 * Requirement program lookup.
 *
 * Programs are found through the instrument registry, never by matching an
 * instrument name. An instrument without a program returns null, and callers
 * must show an explicit message instead of falling back to another program.
 */

import { getInstrumentEntry } from '../../instruments/registry';
import type { RequirementProgram } from '../model';
import { ALTO_SAX_PROGRAM } from './alto-sax';

/** Every program, keyed by programId. Add new instrument programs here. */
const PROGRAMS: Readonly<Record<string, RequirementProgram>> = Object.freeze({
  [ALTO_SAX_PROGRAM.programId]: ALTO_SAX_PROGRAM,
});

export function getRequirementProgram(instrumentId: string | null | undefined): RequirementProgram | null {
  const programId = getInstrumentEntry(instrumentId)?.requirementProgramId;
  if (!programId) return null;
  return PROGRAMS[programId] ?? null;
}
