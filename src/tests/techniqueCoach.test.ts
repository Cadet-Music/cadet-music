/**
 * Stage 2 verification: audio-detection tips must be backed by REAL DSP
 * functions fed with synthetic input. No mocks, no stubs, no copies:
 *   - detectPitchAutocorrelation imported from src/audio.ts
 *   - analyzeArticulation imported from src/coach.ts
 *
 * Run: npx tsx src/tests/techniqueCoach.test.ts
 */

import { detectPitchAutocorrelation } from '../audio';
import { analyzeArticulation, type Sample } from '../coach';

let failures = 0;
const ok = (cond: boolean, msg: string) => {
  if (cond) console.log(`  ✓ ${msg}`);
  else { failures++; console.error(`  ✗ FAIL: ${msg}`); }
};

// ---------- helpers to build synthetic signals ----------
const SR = 44100;

function sine(freqHz: number, seconds: number, amp = 0.5): Float32Array {
  const n = Math.floor(SR * seconds);
  const out = new Float32Array(n);
  for (let i = 0; i < n; i++) out[i] = amp * Math.sin((2 * Math.PI * freqHz * i) / SR);
  return out;
}

/** Build a frame-by-frame RMS envelope into coach.ts Sample[] frames. */
function envelopeSamples(
  durationMs: number,
  frameMs: number,
  rmsAt: (tMs: number) => number,
): Sample[] {
  const samples: Sample[] = [];
  for (let t = 0; t <= durationMs; t += frameMs) {
    samples.push({ tMs: t, rms: rmsAt(t) });
  }
  return samples;
}

// ============================================================
// TEST 1 — pitch detection on a real 440 Hz sine
// KNOWN DEFECT (reported, not hidden): detectPitchAutocorrelation in
// src/audio.ts starts its lag search at offset = 0. At zero lag the
// difference is identically 0, so correlation = 1.0 wins immediately and
// frequency = sampleRate / 0 = Infinity. This test DEMONSTRATES that defect:
// it asserts the current behaviour fails the ±10-cent check and prints the
// bogus reading. Until the DSP bug is fixed, NO tip may rely on live pitch
// readings (see techniqueTips.ts header). The articulation tests below pass
// against real code.
// ============================================================
console.log('TEST detectPitchAutocorrelation: 440 Hz sine');
{
  // Buffer spans ~26 periods of 440 Hz — plenty for autocorrelation.
  const buf = sine(440, 0.06); // 2646 samples
  const result = detectPitchAutocorrelation(buf, SR);
  ok(result !== null, 'detector returned a result (not null)');
  if (result) {
    const centsDev = Number.isFinite(result.frequency)
      ? 1200 * Math.log2(result.frequency / 440)
      : NaN;
    console.log(`    detected frequency: ${result.frequency}`);
    console.log(`    cent deviation from A440: ${Number.isFinite(centsDev) ? centsDev.toFixed(1) + ' cents' : 'N/A (non-finite frequency)'}`);
    console.log(`    confidence: ${result.confidence.toFixed(2)}`);
    const withinTolerance = Number.isFinite(centsDev) && Math.abs(centsDev) <= 10;
    ok(withinTolerance, `frequency within ±10 cents of 440 Hz — CURRENTLY FAILING due to zero-lag defect (audio.ts line ~94: loop starts at offset 0 → freq = ${result.frequency})`);
    if (!withinTolerance) {
      console.log('    NOTE: expected failure — defect documented above; pitch-dependent tips are blocked until fixed.');
    }
  }
}

// ============================================================
// TEST 2 — articulation: silence gap then fast onset = clean attack
// ============================================================
console.log('TEST analyzeArticulation: clean attack (silence → fast rise)');
{
  // 300 ms silence, then note that reaches full volume in ~40 ms, held 700 ms,
  // then silence again. Frames every 10 ms.
  const samples = envelopeSamples(1200, 10, (t) => {
    if (t < 300) return 0.002;              // silence: tongue on reed
    if (t < 340) return 0.03 + ((t - 300) / 40) * 0.47; // 40 ms rise to 0.5
    if (t < 1000) return 0.5;               // steady note
    return 0.002;                            // release
  });
  const report = analyzeArticulation(samples);
  console.log(`    attacks found: ${report.attempts}, clear: ${report.clearAttacks}, clarity: ${report.clarityPercent}%`);
  console.log(`    avg rise time: ${report.avgRiseMs} ms`);
  ok(report.attempts >= 1, 'at least one note attack was segmented');
  ok(report.clearAttacks === report.attempts, 'every attack classified CLEAN (fast rise after gap)');
  ok(report.clarityPercent === 100, `clarityPercent is 100 (got ${report.clarityPercent})`);
}

// ============================================================
// TEST 3 — articulation: slow swell = unclean attack
// ============================================================
console.log('TEST analyzeArticulation: slow swell (unclarty attack)');
{
  // 300 ms silence, then a 500 ms crescendo swell (very slow rise), then cut.
  const samples = envelopeSamples(1400, 10, (t) => {
    if (t < 300) return 0.002;
    if (t < 800) {
      // linear swell crossing ON_RMS early but reaching 80% of peak only near
      // the end of the swell (~500 ms rise)
      const frac = (t - 300) / 500;
      return 0.03 + frac * 0.47;
    }
    return 0.002;
  });
  const report = analyzeArticulation(samples);
  console.log(`    attacks found: ${report.attempts}, clear: ${report.clearAttacks}, clarity: ${report.clarityPercent}%`);
  console.log(`    avg rise time: ${report.avgRiseMs} ms`);
  ok(report.attempts >= 1, 'the swell was segmented as one attack attempt');
  ok(report.clearAttacks === 0, 'swell classified NOT clean (rise time exceeds crisp threshold)');
  ok(report.clarityPercent === 0, `clarityPercent is 0 (got ${report.clarityPercent})`);
  ok(report.avgRiseMs !== null && report.avgRiseMs > 260, `avg rise time > 260 ms mushy threshold (got ${report.avgRiseMs})`);
}

console.log(failures === 0 ? '\n🎉 DSP verification: all checks passed' : `\n💥 ${failures} check(s) failed`);
process.exit(failures === 0 ? 0 : 1);
