/**
 * Alto Saxophone requirement program.
 *
 * Instrument module: supplies the concrete requirements for Alto Saxophone.
 * Standards and repertoire come from src/curriculum/standards.ts, which holds
 * the official-package data, so wording is not duplicated here.
 *
 * Scope: Level Basic and Level One only. Levels Two to Five will be added as
 * their requirements are verified against the official packages.
 */

import {
  AURAL_STANDARD,
  MAINTENANCE_STANDARD,
  REPERTOIRE,
  SCALE_STANDARD,
  SIGHT_READING_STANDARD,
  scalesFor,
} from '../../curriculum/standards';
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

export const ALTO_SAX_PROGRAM: RequirementProgram = {
  programId: 'alto-sax',
  instrumentId: 'alto-sax',
  requirements: [...BASIC, ...ONE],
};
