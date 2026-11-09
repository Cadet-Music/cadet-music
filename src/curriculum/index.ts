// Rewritten curriculum: complete saxophone and clarinet tracks, Levels Basic–5.
//
// Source of truth: the Cadet Music Proficiency Level packages (A-CR-CCP-910/PG-001),
// the assessment rubrics and "Cadet Music Theory – Topics at a Glance".
// See standards.ts for the transcribed requirements.
//
// Public API (everything the rest of the app needs):
//   CURRICULUM, setActiveInstrument(id)         – the active instrument's lesson path
//   getCurriculum(id), getAllLessons(id?)       – a specific instrument's path
//   getLessonById(id), getLessonStatus(...)     – lookups
//   getCurriculumContent(id)                    – lesson text for LessonView
//   getCurriculumExercises(id)                  – quiz questions for LessonView
//   getOfficialSongs(level, id)                 – official prepared-music lists
//   migrateCompletedLessons(ids)                – map old lesson ids to new ones

import { CONCEPTS } from '../competency';
import type {
  CadetLevel, CurriculumSection, ExerciseData, Lesson, LessonContentData, LessonType, TrackId,
} from './types';
import {
  LEVELS, LEVEL_KEY, LEVEL_NUMBER, LEVEL_TITLE, REPERTOIRE,
} from './standards';
import type { Piece } from './standards';
import { THEORY_LOW } from './theoryLow';
import type { TheoryTopic } from './theoryLow';
import { THEORY_HIGH } from './theoryHigh';
import { techniqueTopics } from './technique';
import type { TechniqueTopic } from './technique';
import {
  DRILL_SPECS, LEVEL_NAME, auralChordsLesson, auralIntervalsLesson, auralMelodyLesson, examLesson,
  pieceLesson, rhythmLesson, scaleLesson, scaleLessons, sightReadingLesson,
} from './templates';
import type { Generated } from './templates';
import { FALSE_VARIANTS } from './tfVariants';

export type { CadetLevel, Lesson, CurriculumSection, TrackId, LessonContentData, ExerciseData } from './types';
export { LEVELS } from './standards';

// ---------------------------------------------------------------------------
// Lesson plan: the order of every level, for both instruments
// ---------------------------------------------------------------------------

const PLAN: Record<CadetLevel, string[]> = {
  BASIC: [
    'tech:parts', 'tech:assembly', 'tech:reed-care', 'tech:posture', 'tech:breathing', 'tech:embouchure', 'tech:first-sound',
    'theory:staff-clefs', 'theory:notes-on-staff', 'tech:first-notes', 'theory:note-values', 'theory:rest-values', 'theory:common-time',
    'tech:tonguing', 'tech:long-tones', 'rhythm', 'theory:bars-repeats', 'theory:dynamics', 'scales', 'drill', 'pieces', 'exam',
  ],
  ONE: [
    'tech:cleaning', 'theory:dotted-notes', 'theory:semitones-accidentals', 'theory:simple-time',
    'tech:slurs-legato', 'tech:register-fingering', 'tech:chromatic-fingerings',
    'theory:scale-types-sharps-flats', 'theory:major-scales-sharps-flats', 'scales',
    'theory:arpeggio-fermata', 'theory:tempo-repeat-words', 'theory:articulations', 'rhythm', 'sight', 'drill', 'pieces', 'exam',
  ],
  TWO: [
    'tech:pad-care', 'tech:intonation', 'tech:dynamic-control',
    'theory:circle-of-fifths', 'theory:scale-degrees', 'theory:minor-scales', 'theory:triplet', 'theory:simple-compound-time',
    'theory:intervals-major-perfect', 'theory:tempo-words-two', 'scales', 'rhythm', 'aural:melody', 'sight', 'drill', 'pieces', 'exam',
  ],
  THREE: [
    'tech:spring-repair', 'theory:circle-of-keys', 'theory:intervals-all-qualities', 'theory:triads', 'theory:melodic-minor-writing',
    'theory:find-key-of-melody', 'theory:compound-time-three', 'theory:transposing-octaves', 'theory:style-words-three',
    'tech:articulation-patterns', 'tech:two-octave-scales', 'scales', 'rhythm', 'aural:intervals', 'aural:melody', 'sight', 'drill', 'pieces', 'exam',
  ],
  FOUR: [
    'tech:phrasing-tone', 'tech:ensemble-listening', 'theory:irregular-time', 'theory:key-without-signature',
    'theory:inverting-intervals', 'theory:chords-on-major-scale', 'theory:transposing-by-interval', 'theory:cadences-basic',
    'theory:detecting-errors', 'theory:style-words-four', 'scales', 'rhythm', 'aural:intervals', 'aural:melody', 'aural:chords',
    'sight', 'drill', 'pieces', 'exam',
  ],
  FIVE: [
    'theory:c-clefs', 'theory:compound-intervals', 'theory:dominant-seventh', 'theory:writing-chords',
    'theory:transposing-instruments', 'theory:cadences-full', 'theory:scores', 'theory:music-symbols', 'theory:music-terminology',
    'scales', 'rhythm', 'aural:intervals', 'aural:melody', 'aural:chords', 'sight', 'tech:performance-prep', 'drill', 'pieces', 'exam',
  ],
};

const PREFIX: Record<TrackId, string> = { saxophone: 'sax', clarinet: 'cl' };

/** Existing rich song lessons (completeSongLessons.ts) keep their old ids on the saxophone track. */
const SAX_BASIC_SONG_IDS: Record<string, string> = {
  'western-portrait': 'song-western-portrait',
  'austrian-melody': 'song-austrian-melody',
  'minstrel-boy': 'song-minstrel-boy',
  'ode-to-joy': 'song-ode-to-joy',
  america: 'song-america',
  'scarborough-fair': 'song-scarborough-fair',
};

const KNOWN_CONCEPTS = new Set<string>(Object.values(CONCEPTS));

/** Small deterministic PRNG so option order is stable between page loads. */
function seededRandom(seed: string): () => number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) { h ^= seed.charCodeAt(i); h = Math.imul(h, 16777619); }
  return () => {
    h = (h + 0x6d2b79f5) | 0;
    let t = Math.imul(h ^ (h >>> 15), 1 | h);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Pure-number option lists ("1", "2", "3", "4") read best in order, so they are left alone. */
const isNumericList = (texts: string[]) => texts.every((t) => /^[\d½¼¾.\s]+(beats?)?$/i.test(t.trim()));

/**
 * 1. Drop concept tags the app's concept catalogue does not know about, so a quiz can never break adaptive logic.
 * 2. Shuffle multiple-choice options (deterministically) so the right answer isn't predictable.
 * 3. Swap about half of the "true" statements for a matching false one (see tfVariants.ts).
 */
function cleanQuiz(quiz: ExerciseData[], lessonId: string): ExerciseData[] {
  return quiz.map((q, qi) => {
    let out: ExerciseData = q.concept && !KNOWN_CONCEPTS.has(q.concept) ? { ...q, concept: undefined } : q;
    if (out.type === 'multiple-choice' && out.options && out.options.length >= 3 && !isNumericList(out.options.map((o) => o.text))) {
      const rand = seededRandom(`${lessonId}#${qi}#${out.question}`);
      const options = [...out.options];
      for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(rand() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
      }
      out = { ...out, options };
    }
    if (out.type === 'true-false' && out.correctAnswer === 'true' && FALSE_VARIANTS[out.question]) {
      const rand = seededRandom(`tf#${lessonId}#${qi}#${out.question}`);
      if (rand() < 0.5) out = { ...out, question: FALSE_VARIANTS[out.question], correctAnswer: 'false' };
    }
    return out;
  });
}

// ---------------------------------------------------------------------------
// Build
// ---------------------------------------------------------------------------

interface BuiltTrack {
  sections: CurriculumSection[];
  lessons: Lesson[];
  content: Map<string, LessonContentData>;
  quiz: Map<string, ExerciseData[]>;
  /** lesson id → piece slug, for prepared-music lessons. */
  pieceIds: Map<string, { level: CadetLevel; piece: Piece }>;
}

const theoryBySlug = new Map<string, TheoryTopic>([...THEORY_LOW, ...THEORY_HIGH].map((t) => [t.slug, t]));

function buildTrack(track: TrackId): BuiltTrack {
  const prefix = PREFIX[track];
  const tech = new Map<string, TechniqueTopic>(techniqueTopics(track).map((t) => [t.slug, t]));
  const sections: CurriculumSection[] = [];
  const content = new Map<string, LessonContentData>();
  const quiz = new Map<string, ExerciseData[]>();
  const pieceIds = new Map<string, { level: CadetLevel; piece: Piece }>();

  for (const level of LEVELS) {
    const n = LEVEL_NUMBER[level];
    const key = LEVEL_KEY[level];
    const lessons: Lesson[] = [];

    const add = (
      slug: string,
      meta: { title: string; type: LessonType; emoji: string; topic: string; xp: number; description: string; interactive: boolean; po?: number; requiresMicrophone?: boolean },
      gen?: { content?: LessonContentData; quiz: ExerciseData[] },
      idOverride?: string,
    ) => {
      const id = idOverride ?? `${prefix}-${key}-${slug}`;
      lessons.push({ id, level, ...meta });
      if (gen?.content) content.set(id, gen.content);
      if (gen) quiz.set(id, cleanQuiz(gen.quiz, id));
    };

    const addGenerated = (slug: string, meta: Parameters<typeof add>[1], g: Generated | null) => {
      if (g) add(slug, meta, { content: g.content, quiz: g.quiz });
    };

    const theoryQuestions: ExerciseData[] = PLAN[level]
      .filter((t) => t.startsWith('theory:'))
      .map((t) => theoryBySlug.get(t.slice(7)))
      .filter((t): t is TheoryTopic => !!t)
      .map((t) => t.quiz[0])
      .filter(Boolean);

    for (const token of PLAN[level]) {
      const [kind, arg] = token.split(':');

      if (kind === 'tech') {
        const t = tech.get(arg);
        if (!t || t.level !== level) throw new Error(`curriculum: unknown technique "${arg}" for ${level}`);
        add(t.slug, {
          title: t.title, type: t.type, emoji: t.emoji, topic: t.poCode === 13 ? 'Maintenance' : 'Technique', xp: t.xp,
          description: t.description, interactive: true, po: t.poCode ? n * 100 + t.poCode : undefined,
        }, {
          content: { title: t.title, introduction: t.intro, sections: t.sections, keyPoints: t.keyPoints, practiceInstructions: t.practice, videos: t.videos && t.videos.length ? t.videos : undefined },
          quiz: t.quiz,
        });
      } else if (kind === 'theory') {
        const t = theoryBySlug.get(arg);
        if (!t || t.level !== level) throw new Error(`curriculum: unknown theory topic "${arg}" for ${level}`);
        add(t.slug, {
          title: t.title, type: 'theory', emoji: t.emoji, topic: 'Music Theory', xp: t.xp, description: t.description,
          interactive: !!t.interactive, po: n * 100 + 15,
        }, {
          content: {
            title: t.title, introduction: t.intro, sections: t.sections, keyPoints: t.keyPoints, practiceInstructions: t.practice,
            interactiveExercise: t.interactive ? { type: t.interactive, title: 'Try It', description: `Practise: ${t.covers.join(', ')}` } : undefined,
          },
          quiz: t.quiz,
        });
      } else if (kind === 'rhythm') {
        addGenerated('rhythm', {
          title: `${LEVEL_NAME(level)} Rhythm Sheet`, type: 'rhythm', emoji: '🥁', topic: 'Rhythm', xp: 20 + 5 * n,
          description: 'Clap, tap, sing or count the rhythm sheet', interactive: true, po: n * 100 + 16,
        }, rhythmLesson(level));
      } else if (kind === 'aural') {
        const g = arg === 'melody' ? auralMelodyLesson(level) : arg === 'intervals' ? auralIntervalsLesson(level) : auralChordsLesson(level);
        const label = arg === 'melody' ? 'Melody Sing-Back' : arg === 'intervals' ? 'Interval Recognition' : 'Chord Recognition';
        addGenerated(`aural-${arg}`, {
          title: `${LEVEL_NAME(level)} ${label}`, type: 'theory', emoji: '👂', topic: 'Aural Skills', xp: 20 + 5 * n,
          description: label === 'Melody Sing-Back' ? 'Sing or play back a melody you hear' : label === 'Interval Recognition' ? 'Name intervals by ear' : 'Name chords by ear',
          interactive: arg === 'intervals' || arg === 'chords', po: n * 100 + 16,
        }, g);
      } else if (kind === 'sight') {
        addGenerated('sight-reading', {
          title: `${LEVEL_NAME(level)} Sight-Reading`, type: 'theory', emoji: '👁️', topic: 'Sight Reading', xp: 20 + 5 * n,
          description: 'Play an unseen piece with a steady pulse', interactive: false, po: n * 100 + 18,
        }, sightReadingLesson(level));
      } else if (kind === 'scales') {
        for (const s of scaleLessons(level)) {
          addGenerated(s.slug, {
            title: s.title, type: 'playing', emoji: '🎹', topic: 'Scales', xp: 25 + 5 * n,
            description: `${LEVEL_NAME(level)}: the scales you must play`, interactive: true, po: n * 100 + 17,
          }, scaleLesson(track, level, s.kind));
        }
      } else if (kind === 'drill') {
        for (const d of DRILL_SPECS[level]) {
          add(d.slug, {
            title: d.title, type: 'playing', emoji: '🎖️', topic: 'Band Drill', xp: 10 + 5 * n,
            description: d.description, interactive: false,
          }, {
            content: { title: d.title, introduction: d.intro, sections: d.sections, keyPoints: d.keyPoints, practiceInstructions: d.practice, videos: d.videos(track) },
            quiz: d.quiz,
          });
        }
      } else if (kind === 'pieces') {
        for (const piece of REPERTOIRE[track][level]) {
          const songId = track === 'saxophone' && level === 'BASIC' ? SAX_BASIC_SONG_IDS[piece.slug] : undefined;
          const id = songId ?? `rep-${prefix}-${key}-${piece.slug}`;
          pieceIds.set(id, { level, piece });
          const meta = {
            title: `🎵 ${piece.title}`, type: 'playing' as const, emoji: '🎼', topic: 'Prepared Music', xp: 50 + 10 * n,
            description: `List ${piece.list}: ${piece.book}, p. ${piece.page}`, interactive: true, po: n * 100 + 19,
            requiresMicrophone: songId ? true : undefined,
          };
          if (songId) {
            // The existing song lesson supplies its own step-by-step content; only the metadata is new.
            add(piece.slug, meta, undefined, songId);
          } else {
            const g = pieceLesson(track, level, piece);
            add(piece.slug, meta, { content: g.content, quiz: g.quiz }, id);
          }
        }
      } else if (kind === 'exam') {
        const g = examLesson(level, theoryQuestions);
        add('exam', {
          title: `${LEVEL_NAME(level)} Practice Assessment`, type: 'exam', emoji: '📝', topic: 'Exam', xp: 50 + 25 * n,
          description: `Review before your ${LEVEL_NAME(level)} assessment`, interactive: false,
        }, { content: g.content, quiz: g.quiz });
      } else {
        throw new Error(`curriculum: unknown plan token "${token}"`);
      }
    }

    sections.push({ id: `${prefix}-${key}`, title: LEVEL_TITLE[level], level: n, lessons });
  }

  return { sections, lessons: sections.flatMap((s) => s.lessons), content, quiz, pieceIds };
}

const TRACKS: Record<TrackId, BuiltTrack> = {
  saxophone: buildTrack('saxophone'),
  clarinet: buildTrack('clarinet'),
};

const BY_ID = new Map<string, Lesson>();
const TRACK_OF = new Map<string, TrackId>();
for (const track of Object.keys(TRACKS) as TrackId[]) {
  for (const lesson of TRACKS[track].lessons) {
    BY_ID.set(lesson.id, lesson);
    TRACK_OF.set(lesson.id, track);
  }
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/** Clarinet and bass clarinet use the clarinet track; every saxophone uses the saxophone track. */
export function trackForInstrument(instrumentId?: string | null): TrackId {
  return instrumentId && /clarinet/i.test(instrumentId) ? 'clarinet' : 'saxophone';
}

let activeTrack: TrackId = 'saxophone';

/** The active instrument's path. This is a live binding: it updates when setActiveInstrument() runs. */
export let CURRICULUM: CurriculumSection[] = TRACKS.saxophone.sections;

/** Call this whenever the signed-in cadet's instrument is known (e.g. at the top of AppShell). */
export function setActiveInstrument(instrumentId?: string | null): void {
  const track = trackForInstrument(instrumentId);
  if (track !== activeTrack) {
    activeTrack = track;
    CURRICULUM = TRACKS[track].sections;
  }
}

export function getCurriculum(instrumentId?: string | null): CurriculumSection[] {
  return TRACKS[instrumentId === undefined ? activeTrack : trackForInstrument(instrumentId)].sections;
}

export const getAllLessons = (instrumentId?: string | null): Lesson[] =>
  TRACKS[instrumentId === undefined ? activeTrack : trackForInstrument(instrumentId)].lessons;

export const getLessonById = (id: string): Lesson | undefined => BY_ID.get(id);

/** A lesson unlocks once the lesson before it IN THE SAME INSTRUMENT PATH is complete. */
export const getLessonStatus = (
  lessonId: string,
  completedLessons: string[],
  instrumentId?: string | null,
): 'locked' | 'available' | 'completed' => {
  if (completedLessons.includes(lessonId)) return 'completed';
  const track = instrumentId === undefined ? (TRACK_OF.get(lessonId) ?? activeTrack) : trackForInstrument(instrumentId);
  const all = TRACKS[track].lessons;
  const idx = all.findIndex((l) => l.id === lessonId);
  if (idx === 0) return 'available';
  if (idx > 0 && completedLessons.includes(all[idx - 1].id)) return 'available';
  return 'locked';
};

export function getCurriculumContent(lessonId: string): LessonContentData | null {
  const track = TRACK_OF.get(lessonId);
  return track ? TRACKS[track].content.get(lessonId) ?? null : null;
}

export function getCurriculumExercises(lessonId: string): ExerciseData[] | null {
  const track = TRACK_OF.get(lessonId);
  if (!track) return null;
  const q = TRACKS[track].quiz.get(lessonId);
  return q && q.length > 0 ? q : null;
}

export interface OfficialSong {
  /** The lesson id for this piece, so a song list can open the lesson. */
  id: string;
  title: string;
  list: 'A' | 'B';
  level: CadetLevel;
  book: string;
  page: string;
}

/** Official prepared-music lists (Annex D) for an instrument and level. */
export function getOfficialSongs(level: CadetLevel, instrumentId?: string | null): { listA: OfficialSong[]; listB: OfficialSong[] } {
  const track = trackForInstrument(instrumentId);
  const ids = new Map<string, string>();
  for (const [id, info] of TRACKS[track].pieceIds) ids.set(`${info.level}:${info.piece.slug}`, id);
  const songs = REPERTOIRE[track][level].map((p) => ({
    id: ids.get(`${level}:${p.slug}`) ?? p.slug, title: p.title, list: p.list, level, book: p.book, page: p.page,
  }));
  return { listA: songs.filter((s) => s.list === 'A'), listB: songs.filter((s) => s.list === 'B') };
}

// ---------------------------------------------------------------------------
// Progress migration
// ---------------------------------------------------------------------------

/** Old lesson ids that have a direct equivalent in the new curriculum. */
export const LEGACY_LESSON_MAP: Record<string, string> = {
  // Saxophone
  'basic-intro': 'sax-b-parts', 'basic-maintenance': 'sax-b-assembly', 'basic-posture': 'sax-b-posture',
  'basic-embouchure': 'sax-b-embouchure', 'basic-breathing': 'sax-b-breathing', 'basic-first-sound': 'sax-b-first-sound',
  'basic-first-notes': 'sax-b-first-notes', 'basic-staff': 'sax-b-staff-clefs', 'basic-notes': 'sax-b-notes-on-staff',
  'basic-time-sigs': 'sax-b-common-time', 'basic-dynamics': 'sax-b-dynamics', 'basic-repeat-signs': 'sax-b-bars-repeats',
  'basic-tonguing': 'sax-b-tonguing', 'basic-long-tones': 'sax-b-long-tones', 'basic-drill': 'sax-b-drill-positions',
  'basic-exam': 'sax-b-exam', 'basic-rhythm': 'sax-b-rhythm',
  'one-maintenance': 'sax-1-cleaning', 'one-accidentals': 'sax-1-semitones-accidentals', 'one-key-sigs': 'sax-1-scale-types-sharps-flats',
  'one-articulation': 'sax-1-articulations', 'one-sight': 'sax-1-sight-reading', 'one-aural': 'sax-1-rhythm',
  'one-eighth': 'sax-1-dotted-notes', 'one-chromatic': 'sax-1-chromatic-fingerings', 'one-drill': 'sax-1-drill-marching',
  'one-exam': 'sax-1-exam',
  'two-maintenance': 'sax-2-pad-care', 'two-intonation': 'sax-2-intonation', 'two-intervals': 'sax-2-intervals-major-perfect',
  'two-sight': 'sax-2-sight-reading', 'two-drill': 'sax-2-drill-formations', 'two-exam': 'sax-2-exam',
  // Clarinet
  'clarinet-intro': 'cl-b-parts', 'clarinet-maintenance': 'cl-b-assembly', 'clarinet-posture': 'cl-b-posture',
  'clarinet-embouchure': 'cl-b-embouchure', 'clarinet-breathing': 'cl-b-breathing', 'clarinet-first-sound': 'cl-b-first-sound',
  'clarinet-notes': 'cl-b-first-notes', 'clarinet-staff': 'cl-b-staff-clefs', 'clarinet-note-names': 'cl-b-notes-on-staff',
  'clarinet-time-sigs': 'cl-b-common-time', 'clarinet-dynamics': 'cl-b-dynamics', 'clarinet-register': 'cl-1-register-fingering',
  'clarinet-drill': 'cl-b-drill-positions', 'clarinet-exam': 'cl-b-exam', 'clarinet-rhythm': 'cl-b-rhythm',
};

/** Returns the cadet's completed ids plus the new ids that old completions map to. */
export function migrateCompletedLessons(completed: string[]): string[] {
  const out = new Set(completed);
  for (const id of completed) {
    const next = LEGACY_LESSON_MAP[id];
    if (next && BY_ID.has(next)) out.add(next);
  }
  return Array.from(out);
}
