/**
 * In-Context Technique Coach — Tip Data (Stage 2)
 *
 * A typed catalogue of single, actionable technique tips that the coach can
 * surface inside lessons and song practice. Each tip is ONE physical thing a
 * cadet can try right now, phrased the way a private tutor would say it to a
 * 13-year-old.
 *
 * HONESTY RULES (enforced by src/tests/techniqueCoach.test.ts and
 * src/tests/techniqueTips.test.ts):
 * - detection: "audio" is ONLY allowed for categories the app can actually
 *   measure with real DSP code today: pitch accuracy, steadiness of a long
 *   tone, and attack clarity (src/audio.ts detectPitchAutocorrelation and
 *   src/coach.ts analyzeArticulation / analyzeLongTone). Every audio tip must
 *   be backed by a passing synthetic-input test in src/tests/.
 * - Audio feedback may only use the verbs "I heard", "I measured", or
 *   "the reading shows".
 * - Everything else (embouchure visuals, posture, breath, reed prep,
 *   vibrato) is "self-check" or "video-check" and must point the cadet to a
 *   mirror or their instructor. No vibrato analyzer exists in this codebase,
 *   so NO vibrato tip may be marked "audio".
 * - reviewStatus: "verified" means the tip restates guidance already present
 *   in CCO-aligned lesson content (data.ts / completeSongLessons.ts) or the
 *   official CCO standards referenced in MASTER_DOCUMENTATION.md. Anything
 *   beyond that is "needs instructor review" — we do not invent claims.
 */

import type { CadetLevel } from './data';

export type TipInstrument = 'alto-sax' | 'tenor-sax' | 'clarinet' | 'all';

export type TipCategory =
  | 'embouchure'
  | 'articulation'
  | 'tone'
  | 'vibrato'
  | 'posture'
  | 'breath'
  | 'reed';

/** How the coach can assess this tip. See honesty rules in file header. */
export type TipDetection = 'audio' | 'self-check' | 'video-check';

/** Where the tip is allowed to appear. "song-phase" refers to the phase
 *  cards inside LessonView.tsx (there is no bar-by-bar UI). */
export type TipTrigger = 'lesson-step' | 'song-phase' | 'song-start' | 'after-attempt';

export interface TechniqueTip {
  id: string;
  instrument: TipInstrument;
  level: CadetLevel;
  category: TipCategory;
  detection: TipDetection;
  trigger: TipTrigger[];
  /** Optional lesson id or song id this tip relates to. */
  linkedTo?: string;
  /** One sentence a 13-year-old understands. Corrections start with
   *  "Here's something you can improve:" */
  tip: string;
  /** One physical thing to try right now (one sentence). */
  action: string;
  /** One short exercise, under 30 seconds. */
  drill: string;
  reviewStatus: 'verified' | 'needs instructor review';
}

/** The DSP capabilities that exist in code today. An "audio" tip must name
 *  one of these flags in `audioCapability`. */
export type AudioCapability =
  | 'pitch-accuracy'      // detectPitchAutocorrelation (src/audio.ts)
  | 'long-tone-steadiness'// analyzeLongTone (src/coach.ts)
  | 'attack-clarity';     // analyzeArticulation (src/coach.ts)

export interface AudioTipMeta {
  /** Which real DSP function backs this tip. */
  audioCapability: AudioCapability;
}

type TipEntry = TechniqueTip & Partial<AudioTipMeta>;

const AUDIO_VERBS = ['I heard', 'I measured', 'the reading shows'];

/** Tips whose detection is "audio" must carry an audioCapability flag. */
export function isAudioBacked(tip: TechniqueTip): boolean {
  if (tip.detection !== 'audio') return true;
  const meta = tip as TipEntry;
  return meta.audioCapability === 'pitch-accuracy'
    || meta.audioCapability === 'long-tone-steadiness'
    || meta.audioCapability === 'attack-clarity';
}

/** True if text uses an audio verb; used to enforce verb honesty. */
export function usesAudioVerb(text: string): boolean {
  return AUDIO_VERBS.some((v) => text.includes(v));
}

// ============================================================
// THE TIP CATALOGUE
// ============================================================

export const TECHNIQUE_TIPS: TipEntry[] = [
  // ---------------- ARTICULATION (audio-backed where tested) ----------------
  {
    id: 'art-tongue-reed-tip',
    instrument: 'all',
    level: 1,
    category: 'articulation',
    detection: 'audio',
    audioCapability: 'attack-clarity',
    trigger: ['lesson-step', 'song-start', 'after-attempt'],
    tip: "Here's something you can improve: before each note, touch the tip of your tongue to the very tip of the reed, then release it like saying 'tee'.",
    action: "Play the first bar thinking the word 'TAH' on every note — tongue tip touching reed tip, not the middle of your tongue hitting the middle of the reed.",
    drill: "Play one note five times, each started with a clean 'tah', keeping the air running the whole time. Under 30 seconds.",
    reviewStatus: 'verified',
  },
  {
    id: 'art-clean-starts',
    instrument: 'all',
    level: 2,
    category: 'articulation',
    detection: 'audio',
    audioCapability: 'attack-clarity',
    trigger: ['lesson-step', 'after-attempt'],
    tip: "Here's something you can improve: some note starts are late or clunky instead of clean — the reading shows the sound swells in slowly instead of speaking right away.",
    action: 'Start the air FIRST, a split second before the tongue releases the reed, so each note arrives on time and crisp.',
    drill: "Play four quick notes and one long note, repeating the pattern, aiming for every attack to sound the same. 20 seconds.",
    reviewStatus: 'verified',
  },
  {
    id: 'art-no-chewing',
    instrument: 'all',
    level: 3,
    category: 'articulation',
    detection: 'self-check',
    trigger: ['lesson-step', 'after-attempt'],
    tip: "Here's something you can improve: if notes get soft at the ends, your jaw may be closing on the reed while you play — check in a mirror or ask your instructor.",
    action: 'Keep your jaw position steady from the start of the note to the end; let the tongue and air stop the note, not your teeth.',
    drill: 'Play a two-note slur (low to high and back) four times, feeling for the same open jaw space the whole way. 25 seconds.',
    reviewStatus: 'needs instructor review',
  },

  // ---------------- TONE (audio-backed where tested) ----------------
  {
    id: 'tone-centred-steady',
    instrument: 'all',
    level: 1,
    category: 'tone',
    detection: 'audio',
    audioCapability: 'long-tone-steadiness',
    trigger: ['lesson-step', 'after-attempt'],
    tip: 'Here\'s something you can improve: I measured the pitch wobbling during your long tone — a centred tone holds one straight line of air.',
    action: 'Imagine warm air fogging a mirror: fast, steady, uninterrupted air from the moment the note starts until it stops.',
    drill: 'Hold your comfortable middle Bb for 15 seconds aiming for one unwavering pitch, then rest. One take, under 30 seconds.',
    reviewStatus: 'verified',
  },
  {
    id: 'tone-not-pinched',
    instrument: 'all',
    level: 2,
    category: 'tone',
    detection: 'self-check',
    trigger: ['lesson-step', 'after-attempt'],
    tip: "Here's something you can improve: if your sound feels thin or pinched, you may be squeezing with your jaw — check in a mirror or ask your instructor to listen.",
    action: 'Unclench: let your lower lip stay cushioned over your bottom teeth and give the reed more room to vibrate freely.',
    drill: 'Play the same note twice — once purposely squeezed, once relaxed — and compare which one resonates more in your chest. 20 seconds.',
    reviewStatus: 'verified',
  },
  {
    id: 'tone-air-support-pitch',
    instrument: 'all',
    level: 2,
    category: 'tone',
    // BLOCKED: the only pitch DSP (detectPitchAutocorrelation) has a verified
    // zero-lag defect (see techniqueCoach.test.ts TEST 1 → Infinity Hz), so
    // this tip cannot honestly claim audio detection until the bug is fixed.
    // Revert to detection: 'audio' + audioCapability: 'pitch-accuracy' when
    // the synthetic 440 Hz test passes.
    detection: 'self-check',
    trigger: ['lesson-step', 'after-attempt'],
    tip: "Here's something you can improve: if your note sits flat (a little below centre pitch), usually the air slowed down — ask your instructor to listen or compare with a tuner app, since the app cannot measure pitch reliably yet.",
    action: 'Speed the air up slightly (think "hee" air direction) and keep your corners firm but not biting, then re-check the pitch.',
    drill: 'Play the note, hear it flat, adjust air speed, play it again — three attempts, stopping when the meter reads close to centre. 30 seconds.',
    reviewStatus: 'verified',
  },

  // ---------------- VIBRATO (self-check ONLY — no analyzer exists) ----------------
  {
    id: 'vib-supported-not-forced',
    instrument: 'all',
    level: 4,
    category: 'vibrato',
    detection: 'self-check',
    trigger: ['lesson-step', 'after-attempt'],
    tip: "Here's something you can improve: good vibrato comes from supported air pulsing gently, not from shaking your jaw hard — check with your instructor since the app cannot hear vibrato yet.",
    action: 'Think of a calm dog panting on the air column: the pulse starts in the breath support, and the jaw just follows softly.',
    drill: 'Long tone, then add three slow pulses at the end using air support only. Stop if it sounds forced. 25 seconds.',
    reviewStatus: 'needs instructor review',
  },
  {
    id: 'vib-not-every-note',
    instrument: 'all',
    level: 5,
    category: 'vibrato',
    detection: 'self-check',
    trigger: ['lesson-step', 'song-phase'],
    tip: "Here's something you can improve: vibrato on every single note gets tiring for the ear — ask your instructor which notes in this phrase should shine with vibrato and which stay straight.",
    action: 'Pick the longest note in the phrase and save your vibrato for just that one note.',
    drill: 'Play the phrase once with no vibrato, once with vibrato only on the last long note. Compare which sounds more musical. 25 seconds.',
    reviewStatus: 'needs instructor review',
  },

  // ---------------- EMBOUCHURE (self-check / video-check ONLY) ----------------
  {
    id: 'emb-top-teeth',
    instrument: 'all',
    level: 1,
    category: 'embouchure',
    detection: 'video-check',
    trigger: ['lesson-step', 'song-start'],
    tip: "Here's something you can improve: your upper teeth should rest lightly on top of the mouthpiece — check in a mirror or record a short video, because the app cannot see your embouchure.",
    action: 'Set the mouthpiece with top teeth about where they naturally fall, then close the lips around it — no sliding or gripping.',
    drill: 'Mirror check: assemble your embouchure three times slowly, watching that the top teeth stay resting on top and the lower lip stays curled over the bottom teeth. 20 seconds.',
    reviewStatus: 'verified',
  },
  {
    id: 'emb-no-biting',
    instrument: 'all',
    level: 2,
    category: 'embouchure',
    detection: 'self-check',
    trigger: ['lesson-step', 'after-attempt'],
    tip: "Here's something you can improve: if your cheeks hurt or the sound squeezes sharp, you may be biting the reed — check in a mirror or ask your instructor.",
    action: 'Corners of the mouth firm and forward like a gentle smile-seal, jaw pressure released — the lips seal the air, the teeth do not hold the mouthpiece.',
    drill: 'Play one note as loud as comfortably possible, then one note medium: notice both should feel the same in the jaw, just more air. 20 seconds.',
    reviewStatus: 'verified',
  },
  {
    id: 'emb-relaxed-jaw',
    instrument: 'all',
    level: 3,
    category: 'embouchure',
    detection: 'video-check',
    trigger: ['lesson-step'],
    tip: "Here's something you can improve: a pinched jaw chokes the reed\'s vibration — watch a mirror or video to confirm your jaw stays open and relaxed around the mouthpiece.",
    action: 'Before you play, yawn a little to drop your jaw, then set your lips without closing that space back down.',
    drill: 'Yawn-drop, set embouchure, play one warm note, rest ten seconds, repeat twice. 30 seconds.',
    reviewStatus: 'needs instructor review',
  },

  // ---------------- POSTURE ----------------
  {
    id: 'post-tall-position',
    instrument: 'all',
    level: 1,
    category: 'posture',
    detection: 'self-check',
    trigger: ['lesson-step', 'song-start'],
    tip: "Here's something you can improve: slouching kinks the airway — sit or stand tall with shoulders down, and check your angle in a mirror or with your instructor.",
    action: 'Imagine a string lifting the top of your head; bring the instrument to your mouth instead of your head to the instrument.',
    drill: 'Play the opening four bars of your current piece standing tall, then slouched — feel which one takes breath easier. 25 seconds.',
    reviewStatus: 'verified',
  },
  {
    id: 'post-neck-strap',
    instrument: 'alto-sax',
    level: 1,
    category: 'posture',
    detection: 'self-check',
    trigger: ['song-start', 'lesson-step'],
    tip: "Here's something you can improve: if the neck strap is too low or too high, your neck bends to reach the mouthpiece — adjust it so the instrument comes straight to your face.",
    action: 'Stand tall, clip the strap, and raise or lower it until the mouthpiece meets your lips with your head level.',
    drill: 'Adjust once, play eight bars, check that your neck feels neutral. Ask your instructor to confirm the height. 30 seconds.',
    reviewStatus: 'needs instructor review',
  },

  // ---------------- BREATH ----------------
  {
    id: 'breath-diaphragm',
    instrument: 'all',
    level: 1,
    category: 'breath',
    detection: 'self-check',
    trigger: ['lesson-step', 'song-start'],
    tip: "Here's something you can improve: breathing with your shoulders rising gives shallow air — the push should come from your belly and sides, which a mirror or your instructor can check.",
    action: 'Breathe in so your waistband expands outward; your shoulders should stay completely still.',
    drill: 'Hands on your lower ribs: inhale (ribs push out), exhale on a steady "sss" for 15 seconds keeping the hiss level. 20 seconds.',
    reviewStatus: 'verified',
  },
  {
    id: 'breath-steady-stream',
    instrument: 'all',
    level: 2,
    category: 'breath',
    detection: 'audio',
    audioCapability: 'long-tone-steadiness',
    trigger: ['after-attempt', 'lesson-step'],
    tip: "Here's something you can improve: the reading shows your volume dipping and surging mid-note — that usually means the air stream isn't steady yet.",
    action: 'Support one continuous column of air through the whole note; the tone should look like a flat road, not hills.',
    drill: 'One 15-second long tone aiming for zero bumps in loudness, then rest and shake out the arms. 25 seconds.',
    reviewStatus: 'verified',
  },

  // ---------------- REED ----------------
  {
    id: 'reed-wet-strength',
    instrument: 'all',
    level: 1,
    category: 'reed',
    detection: 'self-check',
    trigger: ['song-start', 'lesson-step'],
    tip: "Here's something you can improve: a dry or too-stiff reed makes everything harder — wet the tip in your mouth for 10 seconds before playing, and ask your instructor if your reed strength matches you.",
    action: 'Moisten the reed tip, align it so the tip sits flush with the mouthpiece tip, and tighten the ligature just enough to hold.',
    drill: 'Setup check: wet, align, and play one easy note. If it fights you or squeaks constantly, show the setup to your instructor. 25 seconds.',
    reviewStatus: 'needs instructor review',
  },
];

/** All tips, narrowed to the exported interface. */
export const ALL_TIPS: TechniqueTip[] = TECHNIQUE_TIPS.map((t) => ({ ...t }));

export function tipsByCategory(category: TipCategory): TechniqueTip[] {
  return ALL_TIPS.filter((t) => t.category === category);
}

export function audioTips(): TechniqueTip[] {
  return ALL_TIPS.filter((t) => t.detection === 'audio');
}
