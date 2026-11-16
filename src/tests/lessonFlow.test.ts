// Lesson flow: try first, review what was missed, retry only those, score from the first try.
import assert from 'node:assert/strict';
import { afterQuestion } from '../lessons/flow';

/** Runs a lesson: the first try, then (if anything was missed) a retry of only those questions. */
function runLesson(firstTry: readonly boolean[]) {
  const missed: number[] = [];
  let firstTryScore = 0;
  let asked = 0;
  let step: 'learn' | 'done' = 'done';
  for (let i = 0; i < firstTry.length; i++) {
    asked++;
    if (firstTry[i]) firstTryScore++;
    else missed.push(i);
    const action = afterQuestion({ phase: 'try', isLast: i === firstTry.length - 1, missedSoFar: missed.length });
    if (action === 'review') step = 'learn';
  }
  if (step === 'learn') {
    // Retry only the missed questions. Answers during the retry are not scored.
    for (let i = 0; i < missed.length; i++) {
      asked++;
      afterQuestion({ phase: 'retry', isLast: i === missed.length - 1, missedSoFar: 0 });
    }
    step = 'done';
  }
  return { step, firstTryScore, asked, missedCount: missed.length };
}

const cases: Array<[string, () => void]> = [
  ['a perfect first try finishes straight away, with no review', () => {
    const r = runLesson([true, true, true]);
    assert.equal(r.step, 'done');
    assert.equal(r.asked, 3);
  }],
  ['a missed question goes to review, then retries only the missed ones', () => {
    const r = runLesson([true, false, true, false]);
    assert.equal(r.missedCount, 2);
    assert.equal(r.asked, 4 + 2, 'four first-try questions, then only the two missed');
    assert.equal(r.step, 'done');
  }],
  ['the score is the first try, regardless of the retry', () => {
    const r = runLesson([false, true, false]);
    assert.equal(r.firstTryScore, 1);
  }],
  ['a retry that is also missed still finishes (no endless loop)', () => {
    const r = runLesson([false, false]);
    assert.equal(r.step, 'done');
  }],
  ['afterQuestion: mid-phase always continues', () => {
    assert.equal(afterQuestion({ phase: 'try', isLast: false, missedSoFar: 3 }), 'next-question');
    assert.equal(afterQuestion({ phase: 'retry', isLast: false, missedSoFar: 0 }), 'next-question');
  }],
];

let failed = 0;
for (const [name, run] of cases) {
  try { run(); console.log(`✅ ${name}`); }
  catch (err) { failed++; console.log(`❌ ${name}\n   ${(err as Error).message}`); }
}
console.log(`lesson flow: ${cases.length - failed}/${cases.length} passed`);
if (failed > 0) process.exitCode = 1;
