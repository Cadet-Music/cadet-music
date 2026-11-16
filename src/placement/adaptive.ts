/**
 * Adaptive placement rules (pure, testable).
 * The placement screen asks one question at a time. A correct answer moves the next question up a
 * difficulty band; a wrong answer moves it down. The test stops early once the answers are clear.
 */

import type { CadetLevel } from '../curriculum/types';

export const BANDS = ['basic', 'intermediate', 'advanced'] as const;
export type Band = 0 | 1 | 2;
export type PlacementBand = (typeof BANDS)[number];

/** Upper bound on questions. The old fixed test asked all 20 in order. */
export const MAX_QUESTIONS = 10;

export interface PlacementQuestion {
  readonly category: PlacementBand;
}

/** Next unasked question from the wanted band, or from the nearest band that still has one. */
export function pickNext(questions: readonly PlacementQuestion[], wantBand: number, used: readonly number[]): number {
  for (let d = 0; d <= 2; d++) {
    for (const b of [wantBand - d, wantBand + d]) {
      if (b < 0 || b > 2) continue;
      const idx = questions.findIndex((q, i) => q.category === BANDS[b] && !used.includes(i));
      if (idx !== -1) return idx;
    }
  }
  return -1;
}

/** Ends the test: the limit is reached, two wrong at the basic band, or three correct at the advanced band. */
export function shouldStop(usedCount: number, wrongAtBasic: number, correctAtAdvanced: number): boolean {
  return usedCount >= MAX_QUESTIONS || wrongAtBasic >= 2 || correctAtAdvanced >= 3;
}

/**
 * Level from where the answers stopped. Only the highest band with a correct answer counts, so a strong
 * cadet who answers the advanced questions correctly is placed at the top, not by a raw total.
 */
export function estimateLevel(correct: number, highestCorrectBand: number, correctAtAdvanced: number): CadetLevel {
  if (highestCorrectBand < 0) return 'BASIC';
  if (highestCorrectBand === 0) return correct >= 2 ? 'ONE' : 'BASIC';
  if (highestCorrectBand === 1) return correct >= 4 ? 'THREE' : 'TWO';
  return correctAtAdvanced >= 3 ? 'FIVE' : 'FOUR';
}
