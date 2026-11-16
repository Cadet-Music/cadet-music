/**
 * Alto Saxophone requirement program.
 *
 * Instrument module: supplies the concrete requirements for Alto Saxophone.
 * Standards and repertoire come from src/curriculum/standards.ts, which holds
 * the official-package data, so wording is not duplicated here.
 *
 * Scope: Basic to Level Five. Levels Two to Five use the same official standards data; the Level Five
 * scale keys are read from scanned pages and still need checking against the printed pages.
 */

import {
  AURAL_STANDARD,
  LEVEL_KEY,
  MAINTENANCE_STANDARD,
  REPERTOIRE,
  SCALE_STANDARD,
  SIGHT_READING_STANDARD,
  scalesFor,
} from '../../curriculum/standards';
import type { CadetLevel } from '../../curriculum/types';
import type { RequirementDef, RequirementProgram } from '../model';

const BASIC_SCALE = scalesFor('eb-sax', 'BASIC');
const ONE_SCALE = scalesFor('eb-sax', 'ONE');

const BASIC_LIST_A_LESSONS = [
  'song-western-portrait',
  'song-austrian-melody',
  'song-minstrel-boy',
  'song-ode-to-joy',
  'song-america',
  'song-scarborough-fair',
];

const ONE_LIST_A = REPERTOIRE.saxophone.ONE.filter((p) => p.list === 'A');
const ONE_LIST_B = REPERTOIRE.saxophone.ONE.filter((p) => p.list === 'B');

const oneSongLesson = (slug: string) => `rep-sax-1-${slug}`;

const scaleStandard = (key: string, tempo: string) =>
  `${key} major at ${tempo}, quarter notes, all slurred or all tongued.`;

const BASIC: RequirementDef[] = [
  {
    id: 'maintenance.basic',
    level: 'BASIC',
    family: 'maintenance',
    title: 'Assemble, care for and store your instrument',
    standard: `Complete each task: ${MAINTENANCE_STANDARD.BASIC?.join('; ')}.`,
    source: 'Level Basic maintenance checklist',
    teachingLessonIds: ['sax-b-assembly', 'sax-b-reed-care'],
  },
  {
    id: 'rhythm.basic',
    level: 'BASIC',
    family: 'rhythm',
    title: 'Clap or count the Level Basic rhythm sheet',
    standard: AURAL_STANDARD.BASIC[0],
    source: 'Level Basic rhythm sheet',
    teachingLessonIds: ['sax-b-rhythm'],
  },
  {
    id: 'scales.basic',
    level: 'BASIC',
    family: 'scales',
    title: 'Play your Level Basic scale',
    standard: scaleStandard(BASIC_SCALE.major[0] ?? '', SCALE_STANDARD.BASIC.tempo),
    source: 'Level Basic scale requirements',
    teachingLessonIds: ['sax-b-scales'],
  },
  {
    id: 'theory.basic.notation',
    level: 'BASIC',
    family: 'theory',
    title: 'Staff, clefs and note names',
    standard: 'Answer the theory questions on the staff, clefs and notes on the staff correctly.',
    source: 'Cadet Music Theory – Basic',
    teachingLessonIds: ['sax-b-staff-clefs', 'sax-b-notes-on-staff'],
  },
  {
    id: 'theory.basic.values',
    level: 'BASIC',
    family: 'theory',
    title: 'Note and rest values',
    standard: 'Answer the theory questions on note and rest values correctly.',
    source: 'Cadet Music Theory – Basic',
    teachingLessonIds: ['sax-b-note-values', 'sax-b-rest-values'],
  },
  {
    id: 'theory.basic.form',
    level: 'BASIC',
    family: 'theory',
    title: 'Time, bars, repeats and dynamics',
    standard: 'Answer the theory questions on common time, bar lines, repeats and dynamics correctly.',
    source: 'Cadet Music Theory – Basic',
    teachingLessonIds: ['sax-b-common-time', 'sax-b-bars-repeats', 'sax-b-dynamics'],
  },
  {
    id: 'prepared-music.basic.list-a',
    level: 'BASIC',
    family: 'prepared-music',
    title: 'Perform one List A piece',
    standard: 'Perform one piece from the Level Basic List A at a steady tempo.',
    source: 'Level Basic prepared-music list (List A)',
    teachingLessonIds: BASIC_LIST_A_LESSONS,
  },
  {
    id: 'drill.basic',
    level: 'BASIC',
    family: 'drill',
    title: 'Carrying and playing positions',
    standard: 'Show the carrying and playing positions on the drum major\'s signal.',
    source: 'CAF Drill Manual, chapter 14. Not a numbered level performance objective; confirm with the program authority.',
    teachingLessonIds: ['sax-b-drill-positions'],
  },
];

const ONE: RequirementDef[] = [
  {
    id: 'maintenance.one',
    level: 'ONE',
    family: 'maintenance',
    title: 'Clean your instrument',
    standard: `Complete each task: ${MAINTENANCE_STANDARD.ONE?.join('; ')}.`,
    source: 'Level One maintenance checklist',
    teachingLessonIds: ['sax-1-cleaning'],
  },
  {
    id: 'rhythm.one',
    level: 'ONE',
    family: 'rhythm',
    title: 'Clap or count the Level One rhythm sheet',
    standard: AURAL_STANDARD.ONE[0],
    source: 'Level One rhythm sheet',
    teachingLessonIds: ['sax-1-rhythm'],
  },
  {
    id: 'scales.one.major',
    level: 'ONE',
    family: 'scales',
    title: 'Play your Level One major scales',
    standard: `${ONE_SCALE.major.join(', ')} major, at ${SCALE_STANDARD.ONE.tempo}, ${SCALE_STANDARD.ONE.note}, all slurred or all tongued.`,
    source: 'Level One scale requirements',
    teachingLessonIds: ['sax-1-scales-major'],
  },
  {
    id: 'scales.one.harmonic-minor',
    level: 'ONE',
    family: 'scales',
    title: 'Play your Level One harmonic minor scales',
    standard: `${ONE_SCALE.harmonicMinor.join(', ')} harmonic minor, at ${SCALE_STANDARD.ONE.tempo}, ${SCALE_STANDARD.ONE.note}, all slurred or all tongued.`,
    source: 'Level One scale requirements',
    teachingLessonIds: ['sax-1-scales-harmonic-minor'],
  },
  {
    id: 'scales.one.chromatic',
    level: 'ONE',
    family: 'scales',
    title: 'Play the Level One chromatic scale',
    standard: `Chromatic scale from ${ONE_SCALE.chromatic.join(', ')}, at ${SCALE_STANDARD.ONE.tempo}, ${SCALE_STANDARD.ONE.note}.`,
    source: 'Level One scale requirements',
    teachingLessonIds: ['sax-1-scales-chromatic'],
  },
  {
    id: 'sight-reading.one',
    level: 'ONE',
    family: 'sight-reading',
    title: 'Sight-read a short unseen piece',
    standard: SIGHT_READING_STANDARD.ONE ?? '',
    source: 'Level One sight-reading standard',
    teachingLessonIds: ['sax-1-sight-reading'],
  },
  {
    id: 'theory.one.values',
    level: 'ONE',
    family: 'theory',
    title: 'Dotted notes, accidentals and simple time',
    standard: 'Answer the theory questions on dotted notes, accidentals and simple time correctly.',
    source: 'Cadet Music Theory – One',
    teachingLessonIds: ['sax-1-dotted-notes', 'sax-1-semitones-accidentals', 'sax-1-simple-time'],
  },
  {
    id: 'theory.one.keys',
    level: 'ONE',
    family: 'theory',
    title: 'Scales, sharps and flats',
    standard: 'Answer the theory questions on scale types, sharps, flats and major keys correctly.',
    source: 'Cadet Music Theory – One',
    teachingLessonIds: ['sax-1-scale-types-sharps-flats', 'sax-1-major-scales-sharps-flats'],
  },
  {
    id: 'theory.one.expression',
    level: 'ONE',
    family: 'theory',
    title: 'Tempo words, articulations and arpeggios',
    standard: 'Answer the theory questions on tempo words, articulations, arpeggios and fermatas correctly.',
    source: 'Cadet Music Theory – One',
    teachingLessonIds: ['sax-1-arpeggio-fermata', 'sax-1-tempo-repeat-words', 'sax-1-articulations'],
  },
  {
    id: 'prepared-music.one.list-a',
    level: 'ONE',
    family: 'prepared-music',
    title: 'Perform one List A piece',
    standard: 'Perform one piece from the Level One List A at a steady tempo.',
    source: 'Level One prepared-music list (List A)',
    teachingLessonIds: ONE_LIST_A.map((p) => oneSongLesson(p.slug)),
  },
  {
    id: 'prepared-music.one.list-b',
    level: 'ONE',
    family: 'prepared-music',
    title: 'Perform one List B piece',
    standard: 'Perform one piece from the Level One List B at a steady tempo.',
    source: 'Level One prepared-music list (List B)',
    teachingLessonIds: ONE_LIST_B.map((p) => oneSongLesson(p.slug)),
  },
  {
    id: 'drill.one',
    level: 'ONE',
    family: 'drill',
    title: 'Stepping off, marking time and halting',
    standard: 'Respond correctly to the drum major\'s signals to step off, mark time and halt.',
    source: 'CAF Drill Manual, chapter 14. Not a numbered level performance objective; confirm with the program authority.',
    teachingLessonIds: ['sax-1-drill-marching', 'sax-1-drill-start-stop'],
  },
];

const SLUG: Record<CadetLevel, string> = { BASIC: 'basic', ONE: 'one', TWO: 'two', THREE: 'three', FOUR: 'four', FIVE: 'five' };

/** Requirements for one of Levels Two to Five, built from the same official data as Basic and One. */
function higherLevel(level: CadetLevel, parts: {
  maintenance?: { id: string; lesson: string };
  rhythm: string;
  scales: Array<{ kind: 'major' | 'harmonic-minor' | 'melodic-minor' | 'chromatic'; lesson: string }>;
  aural: Array<{ kind: 'melody' | 'intervals' | 'chords'; lesson: string }>;
  sight: string;
  theory: Array<{ id: string; title: string; lessons: string[] }>;
  drill: string;
}): RequirementDef[] {
  const key = LEVEL_KEY[level];
  const slug = SLUG[level];
  const std = SCALE_STANDARD[level];
  const keys = scalesFor('eb-sax', level);
  const out: RequirementDef[] = [];

  if (parts.maintenance) {
    out.push({
      id: parts.maintenance.id, level, family: 'maintenance',
      title: 'Care task for this level',
      standard: `Complete each task: ${MAINTENANCE_STANDARD[level]?.join('; ')}.`,
      source: `Level ${key} maintenance checklist`,
      teachingLessonIds: [parts.maintenance.lesson],
    });
  }
  out.push({
    id: `rhythm.${slug}`, level, family: 'rhythm', title: `Clap or count the Level ${key} rhythm sheet`,
    standard: AURAL_STANDARD[level][0], source: `Level ${key} rhythm sheet`, teachingLessonIds: [parts.rhythm],
  });
  for (const sc of parts.scales) {
    const list = sc.kind === 'chromatic' ? keys.chromatic : keys[sc.kind === 'major' ? 'major' : sc.kind === 'harmonic-minor' ? 'harmonicMinor' : 'melodicMinor'];
    if (list.length === 0) continue;
    out.push({
      id: `scales.${slug}.${sc.kind}`, level, family: 'scales',
      title: `Play your Level ${key} ${sc.kind.replace('-', ' ')} scales`,
      standard: sc.kind === 'chromatic'
        ? `Chromatic scale from ${list.join(', ')}, at ${std.tempo}, ${std.note}.`
        : `${list.join(', ')} ${sc.kind.replace('-', ' ')}, at ${std.tempo}, ${std.note}, ${std.articulation}.`,
      source: `Level ${key} scale requirements`, teachingLessonIds: [sc.lesson],
    });
  }
  for (const a of parts.aural) {
    out.push({
      id: `aural.${slug}.${a.kind}`, level, family: 'aural', title: `Aural: ${a.kind}`,
      standard: `Complete the Level ${key} ${a.kind} aural requirement.`, source: `Level ${key} aural requirements`,
      teachingLessonIds: [a.lesson],
    });
  }
  out.push({
    id: `sight-reading.${slug}`, level, family: 'sight-reading', title: `Sight-read a short unseen piece`,
    standard: SIGHT_READING_STANDARD[level] ?? '', source: `Level ${key} sight-reading standard`, teachingLessonIds: [parts.sight],
  });
  for (const t of parts.theory) {
    out.push({
      id: t.id, level, family: 'theory', title: t.title,
      standard: 'Answer the theory questions on these topics correctly.', source: `Cadet Music Theory – Level ${key}`,
      teachingLessonIds: t.lessons,
    });
  }
  for (const list of ['A', 'B'] as const) {
    const pieces = REPERTOIRE.saxophone[level].filter((p) => p.list === list);
    if (pieces.length === 0) continue;
    out.push({
      id: `prepared-music.${slug}.list-${list.toLowerCase()}`, level, family: 'prepared-music',
      title: `Perform one List ${list} piece`, standard: `Perform one piece from the Level ${key} List ${list} at a steady tempo.`,
      source: `Level ${key} prepared-music list (List ${list})`,
      teachingLessonIds: pieces.map((p) => `rep-sax-${key}-${p.slug}`),
    });
  }
  out.push({
    id: `drill.${slug}`, level, family: 'drill', title: `Band drill for Level ${key}`,
    standard: 'Show the drill for this level on the drum major\'s signal.',
    source: 'CAF Drill Manual, chapter 14. Not a numbered level performance objective; confirm with the program authority.',
    teachingLessonIds: [parts.drill],
  });
  return out;
}

const HIGHER: RequirementDef[] = [
  ...higherLevel('TWO', {
    maintenance: { id: 'maintenance.two', lesson: 'sax-2-pad-care' },
    rhythm: 'sax-2-rhythm',
    scales: [
      { kind: 'major', lesson: 'sax-2-scales-major' },
      { kind: 'harmonic-minor', lesson: 'sax-2-scales-harmonic-minor' },
      { kind: 'chromatic', lesson: 'sax-2-scales-chromatic' },
    ],
    aural: [{ kind: 'melody', lesson: 'sax-2-aural-melody' }],
    sight: 'sax-2-sight-reading',
    theory: [
      { id: 'theory.two.keys', title: 'Circle of fifths, scale degrees and minor scales', lessons: ['sax-2-circle-of-fifths', 'sax-2-scale-degrees', 'sax-2-minor-scales'] },
      { id: 'theory.two.rhythm', title: 'Triplets and compound time', lessons: ['sax-2-triplet', 'sax-2-simple-compound-time'] },
      { id: 'theory.two.intervals', title: 'Major and perfect intervals, tempo words', lessons: ['sax-2-intervals-major-perfect', 'sax-2-tempo-words-two'] },
    ],
    drill: 'sax-2-drill-formations',
  }),
  ...higherLevel('THREE', {
    maintenance: { id: 'maintenance.three', lesson: 'sax-3-spring-repair' },
    rhythm: 'sax-3-rhythm',
    scales: [
      { kind: 'major', lesson: 'sax-3-scales-major' },
      { kind: 'harmonic-minor', lesson: 'sax-3-scales-harmonic-minor' },
      { kind: 'melodic-minor', lesson: 'sax-3-scales-melodic-minor' },
      { kind: 'chromatic', lesson: 'sax-3-scales-chromatic' },
    ],
    aural: [{ kind: 'intervals', lesson: 'sax-3-aural-intervals' }, { kind: 'melody', lesson: 'sax-3-aural-melody' }],
    sight: 'sax-3-sight-reading',
    theory: [
      { id: 'theory.three.keys', title: 'Circle of keys and finding the key of a melody', lessons: ['sax-3-circle-of-keys', 'sax-3-find-key-of-melody'] },
      { id: 'theory.three.intervals', title: 'All interval qualities and triads', lessons: ['sax-3-intervals-all-qualities', 'sax-3-triads'] },
      { id: 'theory.three.writing', title: 'Writing melodic minor, transposing and style words', lessons: ['sax-3-melodic-minor-writing', 'sax-3-transposing-octaves', 'sax-3-compound-time-three', 'sax-3-style-words-three'] },
    ],
    drill: 'sax-3-drill-countermarch',
  }),
  ...higherLevel('FOUR', {
    rhythm: 'sax-4-rhythm',
    scales: [
      { kind: 'major', lesson: 'sax-4-scales-major' },
      { kind: 'harmonic-minor', lesson: 'sax-4-scales-harmonic-minor' },
      { kind: 'melodic-minor', lesson: 'sax-4-scales-melodic-minor' },
      { kind: 'chromatic', lesson: 'sax-4-scales-chromatic' },
    ],
    aural: [{ kind: 'intervals', lesson: 'sax-4-aural-intervals' }, { kind: 'melody', lesson: 'sax-4-aural-melody' }, { kind: 'chords', lesson: 'sax-4-aural-chords' }],
    sight: 'sax-4-sight-reading',
    theory: [
      { id: 'theory.four.keys', title: 'Irregular time, keys without signatures and chords on a major scale', lessons: ['sax-4-irregular-time', 'sax-4-key-without-signature', 'sax-4-chords-on-major-scale'] },
      { id: 'theory.four.intervals', title: 'Inverting intervals and transposing by interval', lessons: ['sax-4-inverting-intervals', 'sax-4-transposing-by-interval'] },
      { id: 'theory.four.cadences', title: 'Cadences, detecting errors and style words', lessons: ['sax-4-cadences-basic', 'sax-4-detecting-errors', 'sax-4-style-words-four'] },
    ],
    drill: 'sax-4-drill-spiral',
  }),
  ...higherLevel('FIVE', {
    rhythm: 'sax-5-rhythm',
    scales: [
      { kind: 'major', lesson: 'sax-5-scales-major' },
      { kind: 'harmonic-minor', lesson: 'sax-5-scales-harmonic-minor' },
      { kind: 'melodic-minor', lesson: 'sax-5-scales-melodic-minor' },
      { kind: 'chromatic', lesson: 'sax-5-scales-chromatic' },
    ],
    aural: [{ kind: 'intervals', lesson: 'sax-5-aural-intervals' }, { kind: 'melody', lesson: 'sax-5-aural-melody' }, { kind: 'chords', lesson: 'sax-5-aural-chords' }],
    sight: 'sax-5-sight-reading',
    theory: [
      { id: 'theory.five.clefs', title: 'C clefs, compound intervals and dominant sevenths', lessons: ['sax-5-c-clefs', 'sax-5-compound-intervals', 'sax-5-dominant-seventh'] },
      { id: 'theory.five.writing', title: 'Writing chords and transposing for instruments', lessons: ['sax-5-writing-chords', 'sax-5-transposing-instruments'] },
      { id: 'theory.five.score', title: 'Cadences, scores, symbols and terminology', lessons: ['sax-5-cadences-full', 'sax-5-scores', 'sax-5-music-symbols', 'sax-5-music-terminology'] },
    ],
    drill: 'sax-5-drill-commands',
  }),
];

export const ALTO_SAX_PROGRAM: RequirementProgram = {
  programId: 'alto-sax',
  instrumentId: 'alto-sax',
  requirements: [...BASIC, ...ONE, ...HIGHER],
};
