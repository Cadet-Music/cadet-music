/**
 * Requirement engine (generic).
 *
 * Pure functions over RequirementProgram and per-cadet records. Contains no
 * instrument names, no lesson content and no UI. Works for any instrument
 * program that follows the requirement model.
 */

import type { CadetLevel } from '../curriculum/types';
import {
  FAMILY_ORDER,
  type RequirementDef,
  type RequirementFamily,
  type RequirementProgram,
  type RequirementRecord,
  type RequirementState,
} from './model';

/** Level order used for pathway sequencing. Matches the official Basic → Level 5 sequence. */
export const LEVEL_ORDER: readonly CadetLevel[] = ['BASIC', 'ONE', 'TWO', 'THREE', 'FOUR', 'FIVE'];

const levelIndex = (level: CadetLevel): number => LEVEL_ORDER.indexOf(level);

/** Only an observed pass counts toward a level or badge. */
export const isCounted = (state: RequirementState): boolean => state === 'observed-pass';

/**
 * Derives a requirement's state from the cadet's record and lesson progress.
 * An observed pass always wins. Self-checks never upgrade past 'ready-to-check'.
 */
export function stateOf(
  def: RequirementDef,
  record: RequirementRecord | undefined,
  completedLessons: readonly string[],
): RequirementState {
  if (record?.observedPassAt) return 'observed-pass';
  if (record?.readyAt) return 'ready-to-check';
  if (def.teachingLessonIds.some((id) => completedLessons.includes(id))) return 'learning';
  return 'not-started';
}

/** Levels that have at least one requirement, in pathway order. */
export function availableLevels(program: RequirementProgram): CadetLevel[] {
  const present = new Set(program.requirements.map((r) => r.level));
  return LEVEL_ORDER.filter((l) => present.has(l));
}

export function requirementsForLevel(program: RequirementProgram, level: CadetLevel): RequirementDef[] {
  return program.requirements.filter((r) => r.level === level);
}

export interface RequirementStatus {
  readonly def: RequirementDef;
  readonly state: RequirementState;
}

/** Every requirement for a level with its state, in pathway order. */
export function statusesForLevel(
  program: RequirementProgram,
  level: CadetLevel,
  records: Readonly<Record<string, RequirementRecord>>,
  completedLessons: readonly string[],
): RequirementStatus[] {
  return requirementsForLevel(program, level).map((def) => ({
    def,
    state: stateOf(def, records[def.id], completedLessons),
  }));
}

/** True when every requirement for the level is an observed pass. */
export function levelComplete(
  program: RequirementProgram,
  level: CadetLevel,
  records: Readonly<Record<string, RequirementRecord>>,
  completedLessons: readonly string[],
): boolean {
  const statuses = statusesForLevel(program, level, records, completedLessons);
  return statuses.length > 0 && statuses.every((s) => isCounted(s.state));
}

/**
 * Chooses the target level. Uses the requested level if the program has it;
 * otherwise the first level not yet complete; otherwise the last level.
 */
export function resolveTarget(
  program: RequirementProgram,
  requested: CadetLevel | undefined,
  records: Readonly<Record<string, RequirementRecord>>,
  completedLessons: readonly string[],
): CadetLevel | null {
  const levels = availableLevels(program);
  if (levels.length === 0) return null;
  if (requested && levels.includes(requested)) return requested;
  const firstOpen = levels.find((l) => !levelComplete(program, l, records, completedLessons));
  return firstOpen ?? levels[levels.length - 1];
}

/**
 * The single requirement the cadet should work on next.
 * Walks levels up to and including the target, in pathway order. Returns null
 * when everything up to the target is counted.
 */
export function currentFocus(
  program: RequirementProgram,
  target: CadetLevel,
  records: Readonly<Record<string, RequirementRecord>>,
  completedLessons: readonly string[],
): RequirementStatus | null {
  for (const level of LEVEL_ORDER) {
    if (levelIndex(level) > levelIndex(target)) break;
    for (const status of statusesForLevel(program, level, records, completedLessons)) {
      if (!isCounted(status.state)) return status;
    }
  }
  return null;
}

export interface FamilyGroup {
  readonly family: RequirementFamily;
  readonly items: RequirementStatus[];
}

export interface GapMap {
  readonly target: CadetLevel;
  readonly focus: RequirementStatus | null;
  /** Target-level requirements grouped by family, with counts available via `open`. */
  readonly targetGroups: FamilyGroup[];
  /** Earlier-level requirements that are not yet counted, in pathway order. */
  readonly earlierOpen: RequirementStatus[];
  /** Number of target-level requirements not yet counted. */
  readonly targetOpen: number;
  readonly targetTotal: number;
}

export function groupByFamily(items: readonly RequirementStatus[]): FamilyGroup[] {
  return FAMILY_ORDER.map((family) => ({
    family,
    items: items.filter((i) => i.def.family === family),
  })).filter((g) => g.items.length > 0);
}

/** Full gap map for a target level. Pure: safe to call on every render. */
export function buildGapMap(
  program: RequirementProgram,
  target: CadetLevel,
  records: Readonly<Record<string, RequirementRecord>>,
  completedLessons: readonly string[],
): GapMap {
  const targetItems = statusesForLevel(program, target, records, completedLessons);
  const earlierOpen = LEVEL_ORDER.filter((l) => levelIndex(l) < levelIndex(target))
    .flatMap((l) => statusesForLevel(program, l, records, completedLessons))
    .filter((s) => !isCounted(s.state));

  return {
    target,
    focus: currentFocus(program, target, records, completedLessons),
    targetGroups: groupByFamily(targetItems),
    earlierOpen,
    targetOpen: targetItems.filter((s) => !isCounted(s.state)).length,
    targetTotal: targetItems.length,
  };
}
