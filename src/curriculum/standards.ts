// Official requirements transcribed from the Cadet Music Proficiency Level
// packages (A-CR-CCP-910/PG-001): Saxophone and Clarinet, Levels Basic–5, plus
// the Level Assessment Rubrics and "Cadet Music Theory – Topics at a Glance".
//
// Repertoire tables: Annex D, Appendix 4 (Clarinet) and Appendix 5 (Saxophone).
// Scale tables: Interim Amendment A11-004, Attachment 1.
//
// ⚠️ Scales for Levels 4–5 were read from the scanned PDFs with OCR. Levels
// Basic–4 cross-check (Eb group and Bb group have matching counts); the Level 5
// key lists are marked VERIFY_L5 below — compare them with the printed scale
// pages once before relying on them for assessment.

import type { CadetLevel, TrackId, VideoLink } from './types';

export const LEVELS: CadetLevel[] = ['BASIC', 'ONE', 'TWO', 'THREE', 'FOUR', 'FIVE'];

/** 0–5, matching the package numbering. */
export const LEVEL_NUMBER: Record<CadetLevel, number> = {
  BASIC: 0, ONE: 1, TWO: 2, THREE: 3, FOUR: 4, FIVE: 5,
};

export const LEVEL_TITLE: Record<CadetLevel, string> = {
  BASIC: 'LEVEL BASIC',
  ONE: 'LEVEL ONE',
  TWO: 'LEVEL TWO',
  THREE: 'LEVEL THREE',
  FOUR: 'LEVEL FOUR',
  FIVE: 'LEVEL FIVE',
};

export const LEVEL_KEY: Record<CadetLevel, string> = {
  BASIC: 'b', ONE: '1', TWO: '2', THREE: '3', FOUR: '4', FIVE: '5',
};

/** PO numbers per level, e.g. PO 013W (maintenance), 116 (rhythm), 218 (sight-reading). */
export const poNumber = (level: CadetLevel, code: 13 | 15 | 16 | 17 | 18 | 19): number =>
  LEVEL_NUMBER[level] * 100 + code;

// ---------------------------------------------------------------------------
// Prepared music (official lists)
// ---------------------------------------------------------------------------

export interface Piece {
  /** Stable slug used in lesson ids. */
  slug: string;
  title: string;
  list: 'A' | 'B';
  book: string;
  page: string;
}

type PieceRow = [slug: string, title: string, list: 'A' | 'B', book: string, page: string];

const rows = (data: PieceRow[]): Piece[] =>
  data.map(([slug, title, list, book, page]) => ({ slug, title, list, book, page }));

const BIC_SAX = 'Best in Class – Saxophone';
const RUB_ELEM_SAX = 'Rubank Elementary Method – Saxophone';
const RUB_INT_SAX = 'Rubank Intermediate Method – Saxophone';
const RUB_ADV1_SAX = 'Rubank Adv. Method Vol. 1 – Saxophone';
const RUB_ADV2_SAX = 'Rubank Adv. Method Vol. 2 – Saxophone';
const CC_SAX = 'Concert and Contests – Saxophone';

export const SAX_REPERTOIRE: Record<CadetLevel, Piece[]> = {
  BASIC: rows([
    ['western-portrait', 'Western Portrait', 'A', BIC_SAX, '19'],
    ['austrian-melody', 'Austrian Melody', 'A', BIC_SAX, '24'],
    ['minstrel-boy', 'The Minstrel Boy', 'A', BIC_SAX, '28'],
    ['ode-to-joy', 'Ode to Joy', 'A', BIC_SAX, '10'],
    ['america', 'God Save the Queen (America)', 'A', BIC_SAX, '18'],
    ['scarborough-fair', 'Scarborough Fair', 'A', BIC_SAX, '29'],
  ]),
  ONE: rows([
    ['old-folks-at-home', 'Folks at Home (Old Folks at Home)', 'A', RUB_ELEM_SAX, '38'],
    ['annie-laurie', 'Annie Laurie', 'A', RUB_ELEM_SAX, '38'],
    ['lullaby', 'Lullaby', 'A', RUB_INT_SAX, '14'],
    ['scenes-brightest', 'Scenes That Are Brightest', 'B', RUB_ELEM_SAX, '44'],
    ['waltz', 'Waltz', 'B', RUB_ELEM_SAX, '43'],
    ['march', 'March', 'B', RUB_ELEM_SAX, '36'],
  ]),
  TWO: rows([
    ['etude-d-minor', 'Etude in D Minor', 'A', RUB_INT_SAX, '24'],
    ['andante', 'Andante', 'A', RUB_INT_SAX, '32'],
    ['loreley', 'Loreley', 'A', RUB_INT_SAX, '39'],
    ['hunter-chorus', 'Hunter Chorus', 'B', RUB_INT_SAX, '17'],
    ['polka', 'Polka', 'B', RUB_INT_SAX, '28'],
    ['duet-brillant', 'Duet Brillant', 'B', RUB_INT_SAX, '43'],
  ]),
  THREE: rows([
    ['andante-grazioso', 'Andante Grazioso', 'A', RUB_ADV1_SAX, '21'],
    ['on-wings-of-song', 'On Wings of Song', 'A', RUB_ADV1_SAX, '68'],
    ['the-swan', 'The Swan', 'A', RUB_ADV1_SAX, '67'],
    ['allegro', 'Allegro', 'B', RUB_ADV1_SAX, '25'],
    ['allegro-moderato', 'Allegro Moderato', 'B', RUB_ADV1_SAX, '40–41'],
    ['allegretto-brillante', 'Allegretto Brillante', 'B', RUB_ADV1_SAX, '70–71'],
  ]),
  FOUR: rows([
    ['introduction-rondo', 'Introduction and Rondo', 'A', RUB_ADV1_SAX, '14'],
    ['etude', 'Etude', 'A', RUB_ADV2_SAX, '25–26'],
    ['tempo-di-tarantella', 'Tempo di Tarantella', 'B', RUB_ADV1_SAX, '46'],
    ['andante-allegro', 'Andante and Allegro', 'B', RUB_ADV2_SAX, '79–80'],
  ]),
  FIVE: rows([
    ['elegie', 'Elegie', 'A', CC_SAX, '13'],
    ['recitative-allegro', 'Recitative and Allegro', 'A', CC_SAX, '16–17'],
    ['fantaisie-mauresque', 'Fantaisie Mauresque', 'B', CC_SAX, '18–19'],
    ['concertante', 'Concertante', 'B', CC_SAX, '20–21'],
  ]),
};

const BIC_CL = 'Best in Class – Clarinet';
const RUB_ELEM_CL = 'Rubank Elementary Method – Clarinet';
const RUB_INT_CL = 'Rubank Intermediate Method – Clarinet';
const RUB_ADV1_CL = 'Rubank Advanced Method Vol. 1 – Clarinet';
const RUB_ADV2_CL = 'Rubank Advanced Method Vol. 2 – Clarinet';
const CC_CL = 'Concert and Contests – Clarinet';

export const CLARINET_REPERTOIRE: Record<CadetLevel, Piece[]> = {
  BASIC: rows([
    ['western-portrait', 'Western Portrait', 'A', BIC_CL, '19'],
    ['austrian-melody', 'Austrian Melody', 'A', BIC_CL, '24'],
    ['minstrel-boy', 'The Minstrel Boy', 'A', BIC_CL, '28'],
    ['ode-to-joy', 'Ode to Joy', 'A', BIC_CL, '10'],
    ['america', 'God Save the Queen (America)', 'A', BIC_CL, '18'],
    ['scarborough-fair', 'Scarborough Fair', 'A', BIC_CL, '29'],
  ]),
  ONE: rows([
    ['drink-to-me', 'Drink to Me Only With Thine Eyes', 'A', RUB_ELEM_CL, '24'],
    ['america-beautiful', 'America the Beautiful', 'A', RUB_ELEM_CL, '42'],
    ['melody', 'Melody', 'A', RUB_ELEM_CL, '44'],
    ['tramp-tramp', 'Tramp! Tramp! Tramp!', 'B', RUB_ELEM_CL, '34'],
    ['come-back-to-erin', 'Come Back to Erin', 'B', RUB_ELEM_CL, '42'],
    ['believe-me', 'Believe Me, if All Those Endearing Young Charms', 'B', RUB_ELEM_CL, '24'],
  ]),
  TWO: rows([
    ['duet', 'Duet', 'A', RUB_INT_CL, '19'],
    ['petite-duet', 'Petite Duet', 'A', RUB_INT_CL, '26'],
    ['duet-6-8', 'Duet in 6/8 Time', 'A', RUB_INT_CL, '20'],
    ['andante', 'Andante', 'B', RUB_INT_CL, '49'],
    ['legato-duet', 'Legato Duet', 'B', RUB_INT_CL, '12'],
    ['danse-negre', 'Danse Negre', 'B', RUB_INT_CL, '24'],
  ]),
  THREE: rows([
    ['andante-18', 'Andante #18', 'A', RUB_ADV1_CL, '40–41'],
    ['andante', 'Andante', 'A', RUB_ADV1_CL, '23'],
    ['moderato', 'Moderato', 'A', RUB_ADV1_CL, '20–21'],
    ['allegro-14', 'Allegro #14', 'B', RUB_ADV1_CL, '35'],
    ['andante-cantabile', 'Andante Cantabile', 'B', RUB_INT_CL, '50–51'],
    ['duet-brillant', 'Duet Brillant', 'B', RUB_INT_CL, '43'],
  ]),
  FOUR: rows([
    ['romance', 'Romance', 'A', CC_CL, '28'],
    ['fantasy-piece', 'Fantasy-Piece', 'A', CC_CL, '10–11'],
    ['alleluia', 'Alleluia', 'B', RUB_ADV1_CL, '71'],
    ['allegretto-grazioso', 'Allegretto Grazioso', 'B', CC_CL, '6'],
  ]),
  FIVE: rows([
    ['menuet', 'Menuet', 'A', CC_CL, '18–19'],
    ['ballade', 'Ballade', 'A', CC_CL, '24'],
    ['promenade', 'Promenade', 'B', CC_CL, '14'],
    ['variations-sentimentales', 'Variations Sentimentales', 'B', RUB_ADV2_CL, '72–74'],
  ]),
};

export const REPERTOIRE: Record<TrackId, Record<CadetLevel, Piece[]>> = {
  saxophone: SAX_REPERTOIRE,
  clarinet: CLARINET_REPERTOIRE,
};

// ---------------------------------------------------------------------------
// Scales
// ---------------------------------------------------------------------------

export interface ScaleSet {
  major: string[];
  harmonicMinor: string[];
  melodicMinor: string[];
  chromatic: string[];
}

/** Written keys for B♭ instruments: clarinet, bass clarinet, tenor sax. */
export const SCALES_BB: Record<CadetLevel, ScaleSet> = {
  BASIC: { major: [], harmonicMinor: [], melodicMinor: [], chromatic: [] }, // instrument-specific, see below
  ONE: { major: ['C', 'G', 'F'], harmonicMinor: ['E', 'A', 'D'], melodicMinor: [], chromatic: ['C'] },
  TWO: { major: ['D', 'G', 'C', 'F', 'Bb'], harmonicMinor: ['B', 'E', 'A', 'D', 'G'], melodicMinor: [], chromatic: ['D'] },
  THREE: {
    major: ['D', 'G', 'C', 'F', 'Bb', 'Eb', 'A'],
    harmonicMinor: ['B', 'E', 'A', 'D', 'G', 'C', 'F#'],
    melodicMinor: ['B', 'E', 'A', 'D', 'G', 'C', 'F#'],
    chromatic: ['E'],
  },
  FOUR: {
    major: ['D', 'G', 'C', 'F', 'Bb', 'Eb', 'Ab', 'A', 'E', 'B', 'Cb'],
    harmonicMinor: ['B', 'E', 'A', 'D', 'G', 'C', 'F', 'F#', 'C#', 'G#', 'Ab'],
    melodicMinor: ['B', 'E', 'A', 'D', 'G', 'C', 'F', 'F#', 'C#', 'G#', 'Ab'],
    chromatic: ['F#'],
  },
  // VERIFY_L5: read by OCR from the Level Five clarinet package.
  FIVE: {
    major: ['D', 'G', 'C', 'F', 'Bb', 'Eb', 'Ab', 'Db', 'C#', 'A', 'E', 'B', 'Cb', 'F#', 'Gb'],
    harmonicMinor: ['B', 'E', 'A', 'D', 'G', 'C', 'F', 'Bb', 'A#', 'F#', 'C#', 'G#', 'Ab', 'D#', 'Eb'],
    melodicMinor: ['B', 'E', 'A', 'D', 'G', 'C', 'F', 'Bb', 'A#', 'F#', 'C#', 'G#', 'Ab', 'D#', 'Eb'],
    chromatic: ['G'],
  },
};

/** Written keys for E♭ instruments: alto and baritone sax. */
export const SCALES_EB: Record<CadetLevel, ScaleSet> = {
  BASIC: { major: ['G'], harmonicMinor: [], melodicMinor: [], chromatic: [] },
  ONE: { major: ['G', 'D', 'C'], harmonicMinor: ['B', 'E', 'A'], melodicMinor: [], chromatic: ['G'] },
  TWO: { major: ['A', 'D', 'G', 'C', 'F'], harmonicMinor: ['F#', 'B', 'E', 'A', 'D'], melodicMinor: [], chromatic: ['A'] },
  THREE: {
    major: ['Bb', 'F', 'C', 'G', 'D', 'A', 'E'],
    harmonicMinor: ['G', 'D', 'A', 'E', 'B', 'F#', 'C#'],
    melodicMinor: ['G', 'D', 'A', 'E', 'B', 'F#', 'C#'],
    chromatic: ['B'],
  },
  FOUR: {
    major: ['Eb', 'Bb', 'F', 'C', 'G', 'D', 'A', 'E', 'B', 'F#', 'Gb'],
    harmonicMinor: ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'C#', 'G#', 'D#', 'Eb'],
    melodicMinor: ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'C#', 'G#', 'D#', 'Eb'],
    chromatic: ['C#'],
  },
  // VERIFY_L5: read by OCR from the Level Five saxophone package.
  FIVE: {
    major: ['Ab', 'Eb', 'Bb', 'F', 'C', 'G', 'D', 'A', 'E', 'B', 'F#', 'Gb', 'C#', 'Db'],
    harmonicMinor: ['F', 'C', 'G', 'D', 'A', 'E', 'B', 'F#', 'C#', 'G#', 'D#', 'Eb', 'Bb'],
    melodicMinor: ['F', 'C', 'G', 'D', 'A', 'E', 'B', 'F#', 'C#', 'G#', 'D#', 'Eb', 'Bb'],
    chromatic: ['D'],
  },
};

/** Level Basic is the one level that differs per instrument. */
export const BASIC_SCALES: Record<string, string[]> = {
  alto: ['G'],
  baritone: ['G'],
  tenor: ['C'],
  clarinet: ['G', 'C'],
};

export type ScaleGroup = 'eb-sax' | 'tenor-sax' | 'clarinet';

export function scalesFor(group: ScaleGroup, level: CadetLevel): ScaleSet {
  if (level === 'BASIC') {
    const major = group === 'eb-sax' ? BASIC_SCALES.alto : group === 'tenor-sax' ? BASIC_SCALES.tenor : BASIC_SCALES.clarinet;
    return { major, harmonicMinor: [], melodicMinor: [], chromatic: [] };
  }
  return group === 'eb-sax' ? SCALES_EB[level] : SCALES_BB[level];
}

export interface ScaleStandard {
  tempo: string;
  note: string;
  articulation: string;
}

/** Tempo, note value and articulation rules from the scale tables and rubrics. */
export const SCALE_STANDARD: Record<CadetLevel, ScaleStandard> = {
  BASIC: { tempo: '♩ = 60', note: 'quarter notes', articulation: 'all slurred OR all tongued' },
  ONE: { tempo: '♩ = 66', note: 'quarter notes', articulation: 'all slurred OR all tongued' },
  TWO: { tempo: '♩ = 72', note: 'quarter notes', articulation: 'all slurred OR all tongued' },
  THREE: { tempo: '♩ = 60', note: 'eighth notes', articulation: 'all slurred, all tongued, slur 2–tongue 2, or tongue 2–slur 2' },
  FOUR: { tempo: '♩ = 72', note: 'eighth notes', articulation: 'all slurred, all tongued, slur 2–tongue 2, or tongue 2–slur 2' },
  FIVE: { tempo: '♩ = 80', note: 'eighth notes', articulation: 'all slurred, all tongued, slur 2–tongue 2, or tongue 2–slur 2' },
};

// ---------------------------------------------------------------------------
// Rhythm & aural, sight-reading, maintenance (PO standards)
// ---------------------------------------------------------------------------

export const AURAL_STANDARD: Record<CadetLevel, string[]> = {
  BASIC: ['Sing, clap, tap or count the Level Basic rhythm sheet with a steady tempo.'],
  ONE: ['Sing, clap, tap or count the Level One rhythm sheet with a steady tempo.'],
  TWO: [
    'Sing, clap, tap or count the Level Two rhythm sheet with a steady tempo.',
    'Sing or play back a five-note melody (first five notes of a major scale, starts on the tonic, stepwise only).',
  ],
  THREE: [
    'Sing, clap, tap or count the Level Three rhythm sheet with a steady tempo.',
    'Identify intervals played above a given note.',
    'Sing or play back a five-note melody (starts on the tonic, may include one skip of a third).',
  ],
  FOUR: [
    'Sing, clap, tap or count the Level Four rhythm sheet with a steady tempo.',
    'Identify intervals above a given note: unison, major/minor third, perfect fourth, perfect fifth, perfect octave.',
    'Sing or play back a six-note melody (up to two skips of a third).',
    'Identify root-position, closed chords: major and minor triads.',
  ],
  FIVE: [
    'Sing, clap, tap or count the Level Five rhythm sheet with a steady tempo.',
    'Identify intervals above a given note: unison, major/minor second, third, sixth and seventh, perfect fourth, fifth and octave.',
    'Sing or play back a nine-note melody (one or more skips of a third).',
    'Identify root-position, closed chords: major triads, minor triads and dominant seventh chords.',
  ],
};

export const SIGHT_READING_STANDARD: Record<CadetLevel, string | null> = {
  BASIC: null,
  ONE: '4–16 measures, no harder than Level Basic. Guiding questions are allowed (time signature, key signature, accidentals, clap the rhythm).',
  TWO: '4–16 measures, no harder than Level One. No assistance.',
  THREE: '4–16 measures, no harder than Level Two. No assistance.',
  FOUR: '4–16 measures, no harder than Level Three. No assistance.',
  FIVE: '4–16 measures, no harder than Level Four. No assistance.',
};

/** Woodwind maintenance POs. Levels 4 and 5 have no maintenance PO in the packages. */
export const MAINTENANCE_STANDARD: Record<CadetLevel, string[] | null> = {
  BASIC: [
    'Grease the cork joints',
    'Put the instrument together',
    'Take the instrument apart',
    'Swab the instrument',
    'Store the instrument',
    'Describe selecting and caring for a reed: when to replace it and how to store it',
  ],
  ONE: ['Clean the exterior of the instrument with a cloth'],
  TWO: ['Remove residue from a pad (using pad papers)'],
  THREE: ['Reset a popped spring (using a crochet hook or similar tool; replacing a spring is not required)'],
  FOUR: null,
  FIVE: null,
};

// ---------------------------------------------------------------------------
// Band drill videos (A-CR-CCP-166/PV-002 Military Band Drill, 2014 DVD clips)
// ---------------------------------------------------------------------------

const AMPHION = 'https://www.amphion.ca/videos';
const CLIP_NOTE = 'Clip from the Military Band Drill DVD (A-CR-CCP-166/PV-002), hosted by RCSCC Amphion.';

export const DRILL_VIDEOS = {
  instrumentSax: { title: 'Instrument drill: Tenor and Alto Saxophone', url: `${AMPHION}/military-band-3-1-2.m4v`, note: CLIP_NOTE },
  instrumentBariSax: { title: 'Instrument drill: Baritone Saxophone', url: `${AMPHION}/military-band-5-1-2.m4v`, note: CLIP_NOTE },
  instrumentClarinet: { title: 'Instrument drill: Clarinet and Oboe', url: `${AMPHION}/military-band-2-1-2.m4v`, note: CLIP_NOTE },
  dmIntermediate: { title: 'Drum major signal: Intermediate position', url: `${AMPHION}/military-band-27-1-2.m4v` },
  dmPlayingPosition: { title: 'Drum major signal: Playing position from the carrying position', url: `${AMPHION}/military-band-28-1-2.m4v` },
  dmCarryingPosition: { title: 'Drum major signal: Carrying position from the playing position', url: `${AMPHION}/military-band-29-1-2.m4v` },
  dmSteppingOff: { title: 'Drum major signal: Stepping off', url: `${AMPHION}/military-band-30-1-2.m4v` },
  dmMarkingTime: { title: 'Drum major signal: Marking time', url: `${AMPHION}/military-band-31-1-2.m4v` },
  dmHalting: { title: 'Drum major signal: Halting', url: `${AMPHION}/military-band-32-1-2.m4v` },
  dmCommencePlayingHalt: { title: 'Drum major signal: Commence playing at the halt', url: `${AMPHION}/military-band-33-1-2.m4v` },
  dmCommencePlayingMarch: { title: 'Drum major signal: Commence playing on the march', url: `${AMPHION}/military-band-34-1-2.m4v` },
  dmCeasePlayingHalt: { title: 'Drum major signal: Cease playing from the halt', url: `${AMPHION}/military-band-35-1-2.m4v` },
  dmCeasePlayingMarch: { title: 'Drum major signal: Cease playing on the march', url: `${AMPHION}/military-band-36-1-2.m4v` },
  dmChangingTempo: { title: 'Drum major signal: Changing tempo', url: `${AMPHION}/military-band-37-1-2.m4v` },
  dmWheelSignal: { title: 'Drum major signal: Right and left wheel', url: `${AMPHION}/military-band-38-1-2.m4v` },
  dmCountermarchStandard: { title: 'Drum major signal: Standard countermarch', url: `${AMPHION}/military-band-39-1-2.m4v` },
  dmCountermarchSpiral: { title: 'Drum major signal: Spiral countermarch', url: `${AMPHION}/military-band-40-1-2.m4v` },
  formations: { title: 'Basic band formations', url: `${AMPHION}/military-band-41-1-2.m4v`, note: CLIP_NOTE },
  wheels: { title: 'Wheels', url: `${AMPHION}/military-band-42-1-2.m4v`, note: CLIP_NOTE },
  countermarchStandard: { title: 'Standard countermarch', url: `${AMPHION}/military-band-43-1-2.m4v`, note: CLIP_NOTE },
  countermarchSpiral: { title: 'Spiral countermarch', url: `${AMPHION}/military-band-44-1-2.m4v`, note: CLIP_NOTE },
  drumIntro: { title: 'Drum commands: Introduction', url: `${AMPHION}/military-band-45-1-2.m4v` },
  drumSteppingOff: { title: 'Drum commands: Stepping off', url: `${AMPHION}/military-band-46-1-2.m4v` },
  drumHalting: { title: 'Drum commands: Halting', url: `${AMPHION}/military-band-47-1-2.m4v` },
  drumCeasePlaying: { title: 'Drum commands: Cease playing', url: `${AMPHION}/military-band-48-1-2.m4v` },
  drumChangeTime: { title: 'Drum commands: Change to quick/slow time', url: `${AMPHION}/military-band-49-1-2.m4v` },
} satisfies Record<string, VideoLink>;

/** Official written reference for the same material (Canadian Armed Forces drill manual, chapter 14). */
export const DRILL_MANUAL_URL =
  'https://www.canada.ca/en/services/defence/caf/military-identity-system/drill-manual/chapter-14.html';
export const DRILL_MANUAL_ANNEX_URL =
  'https://www.canada.ca/en/services/defence/caf/military-identity-system/drill-manual/chapter-14/chapter-14-annexes.html';
