/**
 * Private-Tutor Tone & Articulation Coach
 *
 * Turns the raw audio stream (RMS level + pitch track) into the kind of
 * immediate, specific, physical feedback a good private instructor gives
 * after hearing a student play:
 *
 *   "Your note is flat — your lower jaw may be pinching the reed. Try
 *    releasing more air and keeping your top teeth resting lightly on top
 *    of the mouthpiece."
 *   "That attack was soft and blurry — you may be tapping with the middle
 *    of your tongue instead of the tip touching the very tip of the reed.
 *    Think 'TA' or 'TU'."
 *   "The note bloomed late — start the air first, then tongue."
 *
 * Design principles (aligned with CadetMusic's positive framing):
 * - Feedback describes the SOUND first, then suggests the PHYSICAL cause.
 * - We never claim to see the embouchure; we infer from acoustics and say
 *   "may be" / "sounds like".
 * - Long tones are the core diagnostic exercise because they isolate tone
 *   production (pitch stability, steadiness, brightness vs. biting).
 * - Tonguing drills are analyzed by their attack envelopes to detect
 *   unclear/clunky articulation.
 *
 * All analysis functions here are PURE (no Web Audio APIs), so they can be
 * unit-tested headlessly and reused across components.
 */

// ============================================================
// TYPES
// ============================================================

export interface Sample {
  rms: number;        // 0..1 loudness of the frame
  frequency?: number; // Hz (only present when pitch confidence is high)
  cents?: number;     // deviation from nearest equal-tempered note (-50..+50)
  tMs: number;        // timestamp since recording start
}

export type CoachSeverity = 'praise' | 'tip' | 'watch';

export interface CoachObservation {
  id: string;
  severity: CoachSeverity;
  sound: string;        // what the "ear" noticed
  physicalCause: string; // likely embouchure/tongue/air explanation
  correction: string;   // concrete next attempt instruction
}

export interface LongToneReport {
  samples: number;
  soundingMs: number;
  startedCleanly: boolean;
  bloomDelayMs: number | null;   // ms from first sound to stable pitch
  averageCents: number | null;   // signed: + sharp, - flat
  centSwing: number | null;      // p2..p98 spread in cents
  wobbleCount: number;           // direction changes in pitch contour
  brightnessRatio: number | null;// spectral proxy: high-freq energy share
  observations: CoachObservation[];
  score: number;                 // 0..100 practice-score for this take
}

export interface ArticulationReport {
  attempts: number;              // tonguing cycles detected
  clearAttacks: number;          // attacks that spoke cleanly
  clarityPercent: number;        // 0..100
  avgRiseMs: number | null;      // ms from silence to full volume per attack
  loudestJumpDb: number | null;  // dynamic range sanity check
  observations: CoachObservation[];
  score: number;                 // 0..100
}

// ============================================================
// HELPERS
// ============================================================

const mean = (xs: number[]): number =>
  xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : 0;

const percentile = (xs: number[], p: number): number => {
  if (!xs.length) return NaN;
  const sorted = [...xs].sort((a, b) => a - b);
  const idx = Math.min(sorted.length - 1, Math.max(0, Math.round((p / 100) * (sorted.length - 1))));
  return sorted[idx];
};


const obs = (
  id: string,
  severity: CoachSeverity,
  sound: string,
  physicalCause: string,
  correction: string
): CoachObservation => ({ id, severity, sound, physicalCause, correction });

// ============================================================
// LONG TONE ANALYSIS — "hear" embouchure problems
// ============================================================

/**
 * Analyze a long-tone take. This is the sax/clarinet equivalent of a tutor
 * listening to one sustained note and diagnosing bite, support, and airstream.
 */
export function analyzeLongTone(samples: Sample[]): LongToneReport {
  const GATE_RMS = 0.015; // must exceed AudioManager's 0.01 silence floor
  const sounding = samples.filter(s => s.rms >= GATE_RMS);
  const pitches = sounding.filter(s => typeof s.frequency === 'number');
  const centsTrack = pitches.map(s => s.cents ?? 0);

  let bloomDelayMs: number | null = null;
  let startedCleanly = false;
  if (sounding.length > 3 && pitches.length > 3) {
    const firstSoundT = sounding[0].tMs;
    // "Bloomed" once we have 4 consecutive pitched frames within 25 cents
    let run = 0;
    for (const s of pitches) {
      if (Math.abs((s.cents ?? 0) - median(centsTrack)) <= 25) {
        run++;
        if (run >= 4) { bloomDelayMs = Math.max(0, s.tMs - firstSoundT); break; }
      } else run = 0;
    }
    startedCleanly = bloomDelayMs !== null && bloomDelayMs < 700;
  }

  // Wobble: count sign changes in the detrended pitch contour
  let wobbleCount = 0;
  if (centsTrack.length > 6) {
    const m = mean(centsTrack);
    let prevSign = 0;
    for (let i = 1; i < centsTrack.length; i++) {
      const d = centsTrack[i] - centsTrack[i - 1];
      const dev = centsTrack[i] - m;
      const sign = Math.abs(dev) > 5 ? Math.sign(dev) : prevSign;
      if (prevSign !== 0 && sign !== 0 && sign !== prevSign && Math.abs(d) > 3) wobbleCount++;
      if (sign !== 0) prevSign = sign;
    }
  }

  const averageCents = centsTrack.length ? mean(centsTrack) : null;
  const centSwing = centsTrack.length >= 5 ? percentile(centsTrack, 98) - percentile(centsTrack, 2) : null;

  // Brightness proxy: peak-to-rms ratio of the sounding frames.
  // Biting/squeezing raises harmonics harshly (high PAR with strain);
  // a covered, dull tone has very low peak factor.
  const peakFactors: number[] = [];
  for (let i = 0; i < sounding.length; i++) peakFactors.push(sounding[i].rms);
  const loudFrames = peakFactors.filter(r => r > 0.05).length;
  const brightnessRatio = sounding.length >= 5 ? loudFrames / sounding.length : null;

  // ---------------- Observations (the tutor's voice) ----------------
  const observations: CoachObservation[] = [];

  if (sounding.length < 5) {
    observations.push(obs(
      'not-enough-sound', 'tip',
      "I couldn't hear a steady note in that take.",
      'A weak or breathy start usually means not enough air speed — the reed never fully vibrated.',
      'Take a deep belly breath, imagine warming the reed with fast, warm air, and hold the note for at least 5 seconds.'
    ));
  }

  if (averageCents !== null) {
    if (averageCents <= -35) {
      observations.push(obs(
        'very-flat', 'watch',
        `Your note sounded about ${Math.abs(Math.round(averageCents))} cents flat — noticeably below the pitch.`,
        'Flat notes on sax/clarinet usually come from a loose or drooping embouchure, a low jaw opening with slow air, or the reed sitting too far back on the mouthpiece.',
        'Keep your top teeth resting firmly (but not biting!) on top of the mouthpiece, bring the mouthpiece slightly further IN on the cork, and push more air speed through the corner of your mouth.'
      ));
    } else if (averageCents <= -18) {
      observations.push(obs(
        'slightly-flat', 'tip',
        'Your pitch sagged just a little flat as you played.',
        'A slight sag often means the air slowed down or the embouchure relaxed near the end of the note.',
        'Keep the corners of your mouth firm to the finish and think "hot air" — steady, fast air all the way through.'
      ));
    } else if (averageCents >= 35) {
      observations.push(obs(
        'very-sharp', 'watch',
        `Your note sounded about ${Math.round(averageCents)} cents sharp — well above the pitch.`,
        'Sharp playing is the classic sign of biting: too much jaw pressure pinches the reed, raising its pitch and squeezing the tone.',
        'Release your lower jaw just a hair, drop your chin space ("think aw"), and let more air move — your upper teeth should REST on top of the mouthpiece, not clamp down.'
      ));
    } else if (averageCents >= 18) {
      observations.push(obs(
        'slightly-sharp', 'tip',
        'Your pitch ran a touch sharp.',
        'This can mean a bit too much jaw pressure or the mouthpiece pushed in too far.',
        'Try pulling the mouthpiece out a millimeter and soften the bottom-lip cushion while keeping the corners sealed.'
      ));
    } else {
      observations.push(obs(
        'in-tune', 'praise',
        'Your center pitch was right on — the note sat perfectly in tune.',
        'That tells me your embouchure seal and air speed were balanced.',
        'Now keep that same feeling and make the note last even longer.'
      ));
    }
  }

  if (centSwing !== null && centSwing > 45) {
    observations.push(obs(
      'unstable-pitch', 'watch',
      'The pitch drifted up and down during the note instead of staying still.',
      'An unstable pitch usually means the embouchure is moving mid-note — the jaw or lips are adjusting while the reed vibrates, or the air support is uneven.',
      'Set your embouchure ONCE before the note, look in a mirror to confirm your chin stays flat, and give one constant column of air. Your jaw should be frozen; only the air works.'
    ));
  } else if (centSwing !== null && centSwing <= 20 && sounding.length > 10) {
    observations.push(obs(
      'steady-pitch', 'praise',
      'Beautifully steady pitch — it barely moved the whole note.',
      'That consistency shows real embouchure control.',
      'Add dynamics next: same steadiness, but try it softly (mp) without losing the center.'
    ));
  }

  if (!startedCleanly && sounding.length >= 5) {
    observations.push(obs(
      'late-bloom', 'tip',
      'The note took a moment to settle after you started — it bloomed late.',
      'A fuzzy start usually means the tongue released slowly off the reed or the air hadn\'t reached speed before the tongue lifted.',
      'Start the air FIRST, then touch the tip of your tongue to the TIP of the reed and release crisply — like saying "too", not "hoo".'
    ));
  }

  if (brightnessRatio !== null && brightnessRatio > 0.85 && averageCents !== null && averageCents > 10) {
    observations.push(obs(
      'strained-tone', 'watch',
      'The tone sounded thin and strained rather than full and round.',
      'Combined with running sharp, that points to squeezing with the jaw muscles — the reed can\'t vibrate freely.',
      'Unclench: more lip cushion, less jaw pressure. The sound should come from AIR moving fast, not the mouth muscling the reed.'
    ));
  }

  // ---------------- Score ----------------
  let score = 55;
  if (averageCents !== null) score += 25 * (1 - Math.min(1, Math.abs(averageCents) / 50));
  if (centSwing !== null) score += 15 * (1 - Math.min(1, centSwing / 60));
  if (startedCleanly) score += 10;
  if (sounding.length < 5) score = Math.min(score, 35);
  score = Math.round(Math.min(100, Math.max(0, score)));

  return {
    samples: samples.length,
    soundingMs: sounding.length ? sounding[sounding.length - 1].tMs - sounding[0].tMs : 0,
    startedCleanly,
    bloomDelayMs,
    averageCents: averageCents === null ? null : Math.round(averageCents),
    centSwing: centSwing === null ? null : Math.round(centSwing),
    wobbleCount,
    brightnessRatio,
    observations,
    score,
  };
}

function median(xs: number[]): number {
  if (!xs.length) return 0;
  const s = [...xs].sort((a, b) => a - b);
  return s[Math.floor(s.length / 2)];
}

// ============================================================
// ARTICULATION ANALYSIS — "hear" clunky tonguing
// ============================================================

/**
 * Detect tonguing attacks in an RMS envelope and judge their clarity.
 * A clean single-tongued attack = short silence gap followed by a FAST
 * rise to full volume. Clunky articulation = slow mushy rises, missing
 * gaps (notes run together), or big unintended dynamic jumps.
 */
export function analyzeArticulation(samples: Sample[]): ArticulationReport {
  const GAP_RMS = 0.012;   // below this = tongue is on the reed (silence)
  const ON_RMS = 0.03;     // above this = note speaking

  type Seg = { startT: number; endT: number; peak: number; riseMs: number };
  const segments: Seg[] = [];
  let cur: Seg | null = null;
  let preSoundT: number | null = null;

  for (const s of samples) {
    if (s.rms >= ON_RMS) {
      if (!cur) {
        const onsetT = preSoundT ?? s.tMs;
        cur = { startT: onsetT, endT: s.tMs, peak: s.rms, riseMs: 0 };
      } else {
        cur.endT = s.tMs;
        cur.peak = Math.max(cur.peak, s.rms);
      }
    } else if (s.rms < GAP_RMS) {
      if (cur) {
        // rise time: first frame where we hit 80% of segment peak
        segments.push(cur);
        cur = null;
        preSoundT = null;
      } else {
        preSoundT = s.tMs;
      }
    }
  }
  if (cur) segments.push(cur);

  // Compute rise times with a second pass over the raw samples
  const riseTimes: number[] = [];
  for (const seg of segments) {
    const target = seg.peak * 0.8;
    let riseMs: number | null = null;
    for (const s of samples) {
      if (s.tMs < seg.startT) continue;
      if (s.tMs > seg.endT) break;
      if (s.rms >= target) { riseMs = s.tMs - seg.startT; break; }
    }
    riseTimes.push(riseMs ?? Math.max(0, seg.endT - seg.startT));
  }

  const CLEAR_RISE_MS = 120;   // crisp attack threshold (~fast "TA")
  const MUSHY_RISE_MS = 260;   // clearly slurred/soft attack
  const MIN_LEN_MS = 90;       // shorter blips are noise, not notes
  const MAX_LEN_MS = 3000;     // anything longer isn't part of a tonguing drill

  const realSegs = segments.filter((s, i) =>
    s.endT - s.startT >= MIN_LEN_MS && s.endT - s.startT <= MAX_LEN_MS && riseTimes[i] !== undefined);
  const clearIdx = new Set<number>();
  realSegs.forEach((s) => {
    const gi = segments.indexOf(s);
    if (riseTimes[gi] <= CLEAR_RISE_MS) clearIdx.add(gi);
  });
  const clearAttacks = realSegs.filter(s => clearIdx.has(segments.indexOf(s))).length;
  const attempts = realSegs.length;
  const clarityPercent = attempts ? Math.round((clearAttacks / attempts) * 100) : 0;
  const avgRiseMs = riseTimes.length ? Math.round(mean(riseTimes)) : null;

  const peaks = segments.map(s => s.peak);
  const loudestJumpDb = peaks.length >= 2
    ? Math.round(20 * Math.log10(Math.max(...peaks) / Math.max(0.001, Math.min(...peaks))))
    : null;

  const observations: CoachObservation[] = [];

  if (attempts < 2) {
    observations.push(obs(
      'art-no-attacks', 'tip',
      "I didn't hear distinct tongued notes in that take.",
      'If the notes ran together, the tongue may not be returning to the reed between them; if there was no sound, check your setup.',
      'Play eight even quarter notes on one pitch (G works great): "TA — TA — TA — TA". Let the tip of your tongue tap the very tip of the reed, then immediately get out of the way while the air keeps flowing.'
    ));
  } else {
    if (clarityPercent >= 85) {
      observations.push(obs(
        'art-clean', 'praise',
        `Nice work — ${clarityPercent}% of your notes started with a clean, crisp attack.`,
        'That quick, light tongue contact is exactly what "tongue at the tip of the reed" sounds like.',
        'Next step: keep the same cleanliness but go faster — eighth notes at a comfortable tempo, then sixteenths.'
      ));
    } else if (clarityPercent >= 55) {
      observations.push(obs(
        'art-mixed', 'tip',
        `About ${clarityPercent}% of your attacks were crisp; the rest started softly or blurred.`,
        'Inconsistent articulation usually means the tongue sometimes taps with its middle (which muffles the reed) instead of its tip.',
        'Say "too — too — too" WITHOUT the instrument, feeling the tip touch behind your top teeth. Now do that on the reed: tongue tip to reed TIP, air never stops.'
      ));
    } else {
      observations.push(obs(
        'art-clunky', 'watch',
        'Most of the notes blended into each other — the articulation sounded clunky and unclear.',
        'That mushy sound almost always means the tongue is attacking from the middle/back of the mouth, or it stops the air along with the note.',
        'Slow way down. On a single note, make every start a separate, distinct "TA": tongue tip touches the tip of the reed lightly, air keeps streaming behind the tongue. No jaw movement — jaw stays still, tongue does the work.'
      ));
    }

    if (avgRiseMs !== null && avgRiseMs > MUSHY_RISE_MS) {
      observations.push(obs(
        'art-slow-rise', 'tip',
        'Each note swelled in gradually instead of speaking right away.',
        'A slow swell is a slurred start — the tongue lifted lazily off the reed.',
        'Think of the consonant "K"-assist: some players say "du" or "tu"; a tiny throat "ku" behind the tongue motion snaps the reed into vibration instantly.'
      ));
    }

    if (loudestJumpDb !== null && loudestJumpDb > 12) {
      observations.push(obs(
        'art-dynamic-jumps', 'tip',
        'Your notes jumped around in volume quite a bit.',
        'Uneven loudness while tonguing usually means the air support dips between attacks — support resets instead of continuing.',
        'Imagine one long, continuous air stream "behind" separate tongue taps. Keep your belly engaged evenly from the first note to the last.'
      ));
    }
  }

  let score = attempts ? 40 + 0.6 * clarityPercent : 20;
  if (avgRiseMs !== null && avgRiseMs <= CLEAR_RISE_MS) score += 15;
  score = Math.round(Math.min(100, Math.max(0, score)));

  return { attempts, clearAttacks, clarityPercent, avgRiseMs, loudestJumpDb, observations, score };
}

// ============================================================
// REALTIME COACHING — short messages during listening
// ============================================================

/**
 * Lightweight per-frame coaching used while the cadet sustains a note.
 * Returns null most frames (a tutor doesn't talk constantly) and a short
 * message when something notable is happening.
 */
export function realtimeCoaching(sample: Sample, recent: Sample[]): string | null {
  if (sample.rms < 0.015) return null;
  const pitched = recent.slice(-8).filter(s => typeof s.cents === 'number');
  if (pitched.length < 4) {
    return 'Listening... keep the note steady.';
  }
  const avg = mean(pitched.map(s => s.cents!));
  if (avg <= -35) return 'Flat — more air speed, firm corners, top teeth resting on the mouthpiece.';
  if (avg >= 35) return 'Sharp — ease the jaw pressure! You may be biting the reed.';
  if (sample.rms > 0.35) return 'Careful — that\'s loud enough to strain the tone. Full sound, relaxed mouth.';
  if (sample.rms < 0.03) return 'Add more air — let the reed vibrate fully.';
  return null; // stay quiet when it sounds good; occasional praise handled by caller
}

// ============================================================
// FUNDAMENTAL-BASED COACHING CARDS
// ============================================================

export interface CoachCard {
  conceptId: 'embouchure' | 'articulation' | 'tone-production' | 'long-tones' | 'breathing';
  listenFor: string;   // what a tutor's ear detects
  meaning: string;     // the physical technique behind it
  fix: string;         // the instruction a tutor would give
}

/**
 * Static teaching content mapped 1:1 to what the analyzer reports, sourced
 * from the fundamentals curriculum (saxophoneFundamentals.ts / clarinet
 * equivalents). Components show these alongside automated feedback so the
 * cadet learns the CAUSE, not just the measurement.
 */
export const COACH_CARDS: CoachCard[] = [
  {
    conceptId: 'embouchure',
    listenFor: 'Thin, strained, or sharp tone; squeaks on wide intervals.',
    meaning: 'Biting: jaw pressing the reed instead of a lip cushion seal. Your upper teeth should lie RELAXED on top of the mouthpiece — they anchor, they don\'t clamp.',
    fix: 'Curl the bottom lip over the bottom teeth, rest top teeth lightly on top of the mouthpiece, keep a flat "show doggy smile" chin, and blow warm, fast air.',
  },
  {
    conceptId: 'embouchure',
    listenFor: 'Hollow, airy, or flat tone that lacks core.',
    meaning: 'Loose seal: air leaking around the lips, or jaw opening too wide — the reed isn\'t being supported.',
    fix: 'Firm the corners of the mouth inward (like saying "ee" position), keep bottom teeth cushioned by the lip, and increase air SPEED rather than jaw pressure.',
  },
  {
    conceptId: 'articulation',
    listenFor: 'Mushy, blurred, or inconsistent note starts — "clunky" articulation.',
    meaning: 'Tonguing from the middle or back of the tongue instead of the tip touching the TIP of the reed.',
    fix: 'Say "TA — TA — TA" on one pitch. Tongue tip strikes the reed tip lightly and instantly retreats; the air stream never stops. The jaw stays completely still.',
  },
  {
    conceptId: 'articulation',
    listenFor: 'Notes that cut off or bounce in volume while tonguing.',
    meaning: 'The tongue is stopping the air as well as the sound — support collapses between attacks.',
    fix: 'Think of one continuous hot-air stream with the tongue merely tapping it. Practice: 4 TA notes on G, hand on belly — air support should feel unbroken.',
  },
  {
    conceptId: 'tone-production',
    listenFor: 'Note blooms late or starts breathy.',
    meaning: 'Air wasn\'t moving before the tongue released — the reed needs instant air speed at the attack.',
    fix: 'Start the air fractionally BEFORE tonguing. Attack with intent: "tu", not "hoo".',
  },
  {
    conceptId: 'long-tones',
    listenFor: 'Pitch drifting or wobbling through a sustained note.',
    meaning: 'Embouchure muscle fatigue or mid-note adjustments; support uneven.',
    fix: 'Set the embouchure once, freeze the jaw, breathe deeply from the belly, and give one constant air column. Shorter takes with perfect steadiness beat long shaky ones.',
  },
  {
    conceptId: 'breathing',
    listenFor: 'Weak, thin tone; running out before phrase ends.',
    meaning: 'Shallow chest breathing — not enough air reservoir or pressure.',
    fix: 'Breathe low: belly and sides expand. Support with steady abdominal engagement, like a slow, controlled hiss. Air is the engine; the embouchure is just the seal.',
  },
];

export function cardsForObservation(observationId: string): CoachCard[] {
  const map: Record<string, string[]> = {
    'very-flat': ['embouchure', 'breathing'],
    'slightly-flat': ['embouchure', 'breathing'],
    'very-sharp': ['embouchure'],
    'slightly-sharp': ['embouchure'],
    'unstable-pitch': ['long-tones', 'embouchure'],
    'late-bloom': ['tone-production', 'articulation'],
    'strained-tone': ['embouchure'],
    'not-enough-sound': ['breathing'],
    'art-clunky': ['articulation'],
    'art-mixed': ['articulation'],
    'art-no-attacks': ['articulation'],
    'art-slow-rise': ['articulation', 'tone-production'],
    'art-dynamic-jumps': ['articulation', 'breathing'],
  };
  const ids = map[observationId] ?? [];
  return COACH_CARDS.filter(c => ids.includes(c.conceptId));
}
