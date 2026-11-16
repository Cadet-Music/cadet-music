// Adaptive placement rules, tested with simulated cadets.
// A cadet of ability N answers correctly every question at or below band N and wrongly above it.
import assert from 'node:assert/strict';
import { BANDS, MAX_QUESTIONS, estimateLevel, pickNext, shouldStop, type PlacementQuestion } from '../placement/adaptive';

const QUESTIONS: PlacementQuestion[] = [
  ...Array.from({ length: 7 }, () => ({ category: 'basic' as const })),
  ...Array.from({ length: 6 }, () => ({ category: 'intermediate' as const })),
  ...Array.from({ length: 7 }, () => ({ category: 'advanced' as const })),
];

function simulate(ability: number) {
  const used: number[] = [];
  let score = 0;
  let highest = -1;
  let wrongBasic = 0;
  let correctAdvanced = 0;
  let idx = pickNext(QUESTIONS, 1, used);
  while (idx !== -1) {
    const band = BANDS.indexOf(QUESTIONS[idx].category);
    const correct = band <= ability;
    used.push(idx);
    if (correct) { score++; highest = Math.max(highest, band); }
    if (!correct && band === 0) wrongBasic++;
    if (correct && band === 2) correctAdvanced++;
    if (shouldStop(used.length, wrongBasic, correctAdvanced)) break;
    idx = pickNext(QUESTIONS, Math.max(0, Math.min(2, band + (correct ? 1 : -1))), used);
  }
  return { asked: used.length, level: estimateLevel(score, highest, correctAdvanced) };
}

const cases: Array<[string, () => void]> = [
  ['a strong cadet is placed at the top and the test is short', () => {
    const r = simulate(2);
    assert.equal(r.level, 'FIVE');
    assert.ok(r.asked <= 5, `asked ${r.asked}`);
  }],
  ['a beginner stops after two wrong basic answers, well before the limit', () => {
    const r = simulate(-1);
    assert.equal(r.level, 'BASIC');
    assert.ok(r.asked <= 4, `asked ${r.asked}`);
  }],
  ['an intermediate cadet never gets the top placement and never runs past the limit', () => {
    const r = simulate(1);
    assert.ok(r.level === 'TWO' || r.level === 'THREE', `got ${r.level}`);
    assert.ok(r.asked <= MAX_QUESTIONS);
  }],
  ['the limit is respected even when answers never settle', () => {
    const r = simulate(0);
    assert.ok(r.asked <= MAX_QUESTIONS);
  }],
  ['estimateLevel: no correct answers is Basic; advanced without three correct is Four', () => {
    assert.equal(estimateLevel(0, -1, 0), 'BASIC');
    assert.equal(estimateLevel(2, 2, 2), 'FOUR');
    assert.equal(estimateLevel(4, 2, 3), 'FIVE');
  }],
  ['pickNext falls back to the nearest band with questions left', () => {
    const onlyBasic: PlacementQuestion[] = [{ category: 'basic' }];
    assert.equal(pickNext(onlyBasic, 2, []), 0);
    assert.equal(pickNext(onlyBasic, 0, [0]), -1);
  }],
];

let failed = 0;
for (const [name, run] of cases) {
  try { run(); console.log(`✅ ${name}`); }
  catch (err) { failed++; console.log(`❌ ${name}\n   ${(err as Error).message}`); }
}
console.log(`placement: ${cases.length - failed}/${cases.length} passed`);
if (failed > 0) process.exitCode = 1;
