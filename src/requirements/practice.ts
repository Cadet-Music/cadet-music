/**
 * Practice-based readiness (pure rule, used by the store).
 *
 * A quiz can judge theory and rhythm, so passing its lesson quizzes marks those requirements
 * ready to check. Playing, aural and maintenance are not judged by a quiz and stay self-checked.
 */

import type { RequirementProgram, RequirementRecord } from './model';

/** Quiz score (0 to 1) that counts as having practised a lesson. */
export const PRACTICE_PASS = 0.8;

/** Families a quiz result can judge. */
export const QUIZ_JUDGED_FAMILIES: readonly string[] = ['theory', 'rhythm'];

export interface PracticeUpdate {
  readonly lessonScores: Record<string, number>;
  readonly requirements: Record<string, RequirementRecord>;
}

/**
 * Records a lesson's quiz ratio (keeping the best), then marks any quiz-judged requirement ready
 * when every lesson that teaches it has reached the pass mark. Never clears an existing ready mark.
 */
export function applyPracticeResult(
  program: RequirementProgram | null,
  lessonScores: Readonly<Record<string, number>>,
  requirements: Readonly<Record<string, RequirementRecord>>,
  lessonId: string,
  ratio: number,
  now: string,
): PracticeUpdate {
  const clamped = Math.max(0, Math.min(1, ratio));
  const scores = { ...lessonScores, [lessonId]: Math.max(lessonScores[lessonId] ?? 0, clamped) };
  const updated = { ...requirements };
  if (program) {
    for (const def of program.requirements) {
      if (!QUIZ_JUDGED_FAMILIES.includes(def.family) || !def.teachingLessonIds.includes(lessonId)) continue;
      const allPassed = def.teachingLessonIds.every((id) => (scores[id] ?? 0) >= PRACTICE_PASS);
      if (allPassed && !updated[def.id]?.readyAt) {
        updated[def.id] = { ...updated[def.id], readyAt: now, readySource: 'practice' };
      }
    }
  }
  return { lessonScores: scores, requirements: updated };
}
