/**
 * Stage 2 validation: every TechniqueTip entry must be complete, well-typed,
 * and HONEST about what the software can hear.
 *
 *   - all required fields present
 *   - detection "audio" requires a DSP capability flag backed by real code
 *     (verified separately in techniqueCoach.test.ts with synthetic audio)
 *   - audio verbs ("I heard", "I measured", "the reading shows") may appear
 *     ONLY on tips with detection: "audio"
 *   - self-check / video-check tips must point to a mirror or instructor
 *   - vibrato tips may never be "audio" (no analyzer exists in this release)
 *   - reviewStatus is always one of the two allowed values
 *
 * Run: npx tsx src/tests/techniqueTips.test.ts
 */

import {
  TECHNIQUE_TIPS,
  isAudioBacked,
  usesAudioVerb,
  type TechniqueTip,
  type TipDetection,
} from '../techniqueTips';

let failures = 0;
const ok = (cond: boolean, msg: string) => {
  if (cond) console.log(`  ✓ ${msg}`);
  else { failures++; console.error(`  ✗ FAIL: ${msg}`); }
};

const REQUIRED_FIELDS: (keyof TechniqueTip)[] = [
  'id', 'instrument', 'level', 'category', 'detection', 'trigger',
  'tip', 'action', 'drill', 'reviewStatus',
];

const VALID_INSTRUMENTS = ['alto-sax', 'tenor-sax', 'clarinet', 'all'];
const VALID_CATEGORIES = ['embouchure', 'articulation', 'tone', 'vibrato', 'posture', 'breath', 'reed'];
const VALID_DETECTIONS: TipDetection[] = ['audio', 'self-check', 'video-check'];
const VALID_TRIGGERS = ['lesson-step', 'song-phase', 'song-start', 'after-attempt'];
const VALID_REVIEW = ['verified', 'needs instructor review'];

console.log(`Validating ${TECHNIQUE_TIPS.length} technique tips`);

const seenIds = new Set<string>();
for (const tip of TECHNIQUE_TIPS as TechniqueTip[]) {
  // Required fields present and non-empty
  for (const f of REQUIRED_FIELDS) {
    const v = (tip as unknown as Record<string, unknown>)[f];
    ok(v !== undefined && v !== null && (Array.isArray(v) ? v.length > 0 : String(v).length > 0),
      `${tip.id}: field "${f}" present and non-empty`);
  }

  // Unique ids
  ok(!seenIds.has(tip.id), `${tip.id}: id is unique`);
  seenIds.add(tip.id);

  // Enum membership
  ok(VALID_INSTRUMENTS.includes(tip.instrument), `${tip.id}: instrument valid (${tip.instrument})`);
  ok(VALID_CATEGORIES.includes(tip.category), `${tip.id}: category valid (${tip.category})`);
  ok(VALID_DETECTIONS.includes(tip.detection), `${tip.id}: detection valid (${tip.detection})`);
  ok(tip.trigger.every((t) => VALID_TRIGGERS.includes(t)), `${tip.id}: triggers valid`);
  ok(VALID_REVIEW.includes(tip.reviewStatus), `${tip.id}: reviewStatus valid (${tip.reviewStatus})`);

  // Level sanity (CadetLevel is numeric 1..5 in data.ts)
  ok(typeof tip.level === 'number' && tip.level >= 1 && tip.level <= 5,
    `${tip.id}: level within 1..5`);

  // "song-bar" trigger must not exist (Stage 2 amendment #1)
  ok(!(tip.trigger as string[]).includes('song-bar'), `${tip.id}: no legacy "song-bar" trigger`);

  // Audio backing rule: detection "audio" requires a DSP capability flag
  ok(isAudioBacked(tip), `${tip.id}: audio-detection tips carry a DSP capability flag`);

  // Verb honesty: audio verbs only on audio tips
  const fullText = `${tip.tip} ${tip.action} ${tip.drill}`;
  if (usesAudioVerb(fullText)) {
    ok(tip.detection === 'audio',
      `${tip.id}: uses an audio verb so detection MUST be "audio" (found "${tip.detection}")`);
  }

  // Non-audio tips must offer the mirror/instructor route somewhere
  if (tip.detection === 'self-check' || tip.detection === 'video-check') {
    const pointsToHuman = /mirror|instructor/i.test(fullText);
    ok(pointsToHuman, `${tip.id}: ${tip.detection} tip mentions mirror or instructor`);
  }

  // Vibrato must never claim audio (amendment #2 — no analyzer exists)
  if (tip.category === 'vibrato') {
    ok(tip.detection !== 'audio', `${tip.id}: vibrato tip is not marked "audio"`);
  }

  // No negative wording about the cadet's sound
  ok(!/\b(wrong|bad)\b/i.test(tip.tip), `${tip.id}: tip avoids "wrong"/"bad" wording`);
}

// Cross-catalogue checks
const audioCount = TECHNIQUE_TIPS.filter((t) => t.detection === 'audio').length;
ok(audioCount > 0, `catalogue contains at least one genuinely audio-backed tip (${audioCount})`);

// Every audio tip must map to a capability that has a passing synthetic test
// (see techniqueCoach.test.ts: detectPitchAutocorrelation 440 Hz sine,
//  analyzeArticulation clean attack + slow swell).
const TESTED_CAPABILITIES = ['pitch-accuracy', 'long-tone-steadiness', 'attack-clarity'];
for (const t of TECHNIQUE_TIPS) {
  if (t.detection === 'audio') {
    const cap = (t as { audioCapability?: string }).audioCapability ?? '';
    ok(TESTED_CAPABILITIES.includes(cap), `${t.id}: audio capability "${cap}" has a synthetic-input test`);
  }
}

// Minimum coverage requested in the plan
for (const cat of ['embouchure', 'articulation', 'tone', 'vibrato', 'posture', 'breath', 'reed']) {
  ok(TECHNIQUE_TIPS.some((t) => t.category === cat), `catalogue covers category "${cat}"`);
}
ok(TECHNIQUE_TIPS.some((t) => t.id === 'emb-top-teeth' && t.detection !== 'audio'),
  'upper-teeth embouchure tip is self/video-check only');

console.log(`\nTips: ${TECHNIQUE_TIPS.length} total | audio: ${audioCount} | self-check: ${TECHNIQUE_TIPS.filter((t) => t.detection === 'self-check').length} | video-check: ${TECHNIQUE_TIPS.filter((t) => t.detection === 'video-check').length}`);
console.log(failures === 0 ? '🎉 techniqueTips validation: all checks passed' : `💥 ${failures} check(s) failed`);
process.exit(failures === 0 ? 0 : 1);
