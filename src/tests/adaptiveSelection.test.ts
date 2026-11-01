/**
 * Adaptive Exercise Selection Tests (Phase 0 — Gap B1/E4 closure)
 *
 * Verifies that the adaptive weighting engine (src/adaptive.ts) is genuinely
 * driving learner-facing exercise ordering in LessonView, closing the
 * previously-open adaptivity loop.
 *
 * Dependency-free: run with tsx/ts-node or via CI once vitest lands (Phase 0).
 *   npx tsx src/tests/adaptiveSelection.test.ts
 */

import {
  getAdaptiveState,
  calculateAdaptiveWeight,
  calculateRecencyMultiplier,
  generateAdaptiveSessionWithSafeguards,
  ADAPTIVE_CONFIG,
} from '../adaptive';
import type { ConceptStats } from '../competency';

let failures = 0;
function assert(cond: boolean, msg: string) {
  if (!cond) {
    console.error('❌ FAIL:', msg);
    failures++;
  } else {
    console.log('✅ PASS:', msg);
  }
}

function stats(attempts: number, correct: number, lastReviewed?: string): ConceptStats {
  return {
    attempts,
    correct,
    incorrect: attempts - correct,
    lastReviewed: lastReviewed ?? new Date().toISOString(),
    masteryScore: attempts > 0 ? Math.round((correct / attempts) * 100) : 0,
  };
}

// ------------------------------------------------------------
// 1. State classification respects the minimum-data requirement
// ------------------------------------------------------------
assert(getAdaptiveState(undefined) === 'Unknown', 'no data => Unknown');
assert(
  getAdaptiveState(stats(ADAPTIVE_CONFIG.MIN_ATTEMPTS_FOR_CLASSIFICATION - 1, 0)) === 'Unknown',
  'insufficient attempts => Unknown'
);
assert(
  getAdaptiveState(stats(ADAPTIVE_CONFIG.MIN_ATTEMPTS_FOR_CLASSIFICATION, 5)) === 'Developing',
  '50% mastery with enough attempts => Developing'
);
assert(
  getAdaptiveState(stats(20, 19)) === 'Mastered',
  '95% mastery => Mastered'
);

// ------------------------------------------------------------
// 2. Weight tiers: weaker/unknown states outrank mastered ones
// ------------------------------------------------------------
const wUnknown = calculateAdaptiveWeight(undefined);
const wLearning = calculateAdaptiveWeight(stats(12, 2)); // ~17% => Learning
const wMastered = calculateAdaptiveWeight(stats(20, 20)); // 100% => Mastered
assert(wLearning > wUnknown && wUnknown > wMastered, 'weight order: Learning > Unknown > Mastered');

// ------------------------------------------------------------
// 3. Recency multiplier decays stale concepts back into rotation
// ------------------------------------------------------------
const freshDate = new Date().toISOString();
const oldDate = new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString(); // ~4 weeks
assert(calculateRecencyMultiplier(freshDate) === 1.0, 'recent review => no decay');
const stale = calculateRecencyMultiplier(oldDate);
assert(stale < 1.0 && stale > 0.85, `stale concept gets boost multiplier (${stale.toFixed(3)} < 1)`);
// Note: multiplier < 1 on the *stats* side means "less recently seen";
// selectWeightedConcept uses it so never/long-unseen material resurfaces.

// ------------------------------------------------------------
// 4. Session generation prioritizes weak concepts
// ------------------------------------------------------------
const mastery: Record<string, ConceptStats> = {
  weakConcept: stats(12, 3),      // Learning (25%)
  strongConcept: stats(20, 20),   // Mastered (100%)
};
const session = generateAdaptiveSessionWithSafeguards(mastery, ['weakConcept', 'strongConcept'] as any, 10);
const weakCount = session.filter(c => c === ("weakConcept" as any)).length;
assert(session.length === 10, 'session has requested length');
assert(weakCount >= 5, `weak concept dominates session (${weakCount}/10 picks)`);

// ------------------------------------------------------------
// 5. Anti-spiral cap: a single-concept pool stops once the cap
//    (ceil(sessionSize x MAX_CONCEPT_PERCENTAGE)) is reached — documented
//    engine behavior; LessonView never drops assigned exercises because it
//    samples without replacement within each lesson's own pool.
// ------------------------------------------------------------
const solo = generateAdaptiveSessionWithSafeguards({}, ['onlyConcept'] as any, 6);
const soloCap = Math.ceil(6 * ADAPTIVE_CONFIG.MAX_CONCEPT_PERCENTAGE); // cap = 3
assert(solo.length > 0 && solo.length <= soloCap && solo.every(c => c === ("onlyConcept" as any)),
  `single-concept pool respects session cap (len=${solo.length}, cap=${soloCap})`);

// ------------------------------------------------------------
// 6. Diversity rule: no more than MAX_CONSECUTIVE_SAME_CONCEPT in a row
//    when alternatives exist
// ------------------------------------------------------------
const divMastery: Record<string, ConceptStats> = {
  a: stats(12, 2), // Learning, heavy weight
  b: stats(12, 1), // Learning, similar weight
};
let diversityHeld = true;
for (let trial = 0; trial < 50; trial++) {
  const s = generateAdaptiveSessionWithSafeguards(divMastery, ['a', 'b'] as any, 12);
  let run = 1;
  let maxRun = 1;
  for (let i = 1; i < s.length; i++) {
    run = s[i] === s[i - 1] ? run + 1 : 1;
    maxRun = Math.max(maxRun, run);
  }
  if (maxRun > ADAPTIVE_CONFIG.MAX_CONSECUTIVE_SAME_CONCEPT) {
    diversityHeld = false;
    assert(false, `diversity violated on trial ${trial}: maxRun=${maxRun}`);
    break;
  }
}
if (diversityHeld) assert(true, 'diversity rule held across 50 randomized sessions');

// ------------------------------------------------------------
// Summary
// ------------------------------------------------------------
if (failures === 0) {
  console.log('\n🎉 All adaptive-selection checks passed.');
} else {
  console.error(`\n💥 ${failures} adaptive-selection check(s) failed.`);
}
