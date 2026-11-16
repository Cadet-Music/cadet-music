/**
 * Lesson flow decisions (pure, testable).
 * A lesson starts with the quiz ("try first"). If the cadet missed anything, they review it and retry
 * only those questions. Each lesson's score comes from the first try.
 */

export type LessonPhase = 'try' | 'retry';
export type FlowAction = 'next-question' | 'review' | 'finish';

/**
 * What happens after a question.
 * - 'next-question': more questions in this phase.
 * - 'review': the first try ended with misses, so show what to review before retrying.
 * - 'finish': the lesson is complete (no misses, or a retry has ended).
 */
export function afterQuestion(opts: { phase: LessonPhase; isLast: boolean; missedSoFar: number }): FlowAction {
  if (!opts.isLast) return 'next-question';
  if (opts.phase === 'try' && opts.missedSoFar > 0) return 'review';
  return 'finish';
}
