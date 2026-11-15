/**
 * Decides which level a cadet's lesson path shows.
 *  - A chosen target always wins, even if its requirements are not written yet.
 *  - Otherwise the first level the cadet has not yet passed (from requirement records).
 *  - An instrument with no requirement program starts at Basic.
 * The Dashboard calls this; tests call it directly.
 */

import type { CadetLevel } from '../curriculum/types';
import type { RequirementRecord } from './model';
import { resolveTarget } from './engine';
import { getRequirementProgram } from './programs';

export function workingLevelFor(
  instrumentId: string | null | undefined,
  targetLevel: CadetLevel | undefined,
  records: Readonly<Record<string, RequirementRecord>>,
  completedLessons: readonly string[],
): CadetLevel {
  if (targetLevel) return targetLevel;
  const program = getRequirementProgram(instrumentId);
  if (!program) return 'BASIC';
  return resolveTarget(program, undefined, records, completedLessons) ?? 'BASIC';
}
