// Canadian Cadet Organization Music Standards (A-CR-CCP-166/PT-001)
// Saxophone - Military Band Track

export type CadetLevel = 'BASIC' | 'ONE' | 'TWO' | 'THREE' | 'FOUR' | 'FIVE';

export const LEVELS: CadetLevel[] = ['BASIC', 'ONE', 'TWO', 'THREE', 'FOUR', 'FIVE'];

export const LEVEL_INFO: Record<CadetLevel, { 
  number: number; 
  description: string; 
  scaleTempo: string; 
  scaleRange: string;
  scaleTypes: string[];
  memorized: boolean;
}> = {
  'BASIC': { 
    number: 0, 
    description: 'Awareness',
    scaleTempo: '♩ = 60',
    scaleRange: '1 octave',
    scaleTypes: ['Major'],
    memorized: false,
  },
  'ONE': { 
    number: 1, 
    description: 'Basic knowledge, limited skill',
    scaleTempo: '♩ = 66',
    scaleRange: '1 octave',
    scaleTypes: ['Major', 'Chromatic', 'Harmonic Minor'],
    memorized: false,
  },
  'TWO': { 
    number: 2, 
    description: 'Basic knowledge, limited skill',
    scaleTempo: '♩ = 72',
    scaleRange: '1 octave',
    scaleTypes: ['Major', 'Chromatic', 'Harmonic Minor'],
    memorized: false,
  },
  'THREE': { 
    number: 3, 
    description: 'Detailed knowledge, skilled',
    scaleTempo: '♪ = 60',
    scaleRange: '2 octaves',
    scaleTypes: ['Major', 'Chromatic', 'Melodic Minor', 'Harmonic Minor'],
    memorized: true,
  },
  'FOUR': { 
    number: 4, 
    description: 'Detailed knowledge, skilled',
    scaleTempo: '♪ = 72',
    scaleRange: '2 octaves',
    scaleTypes: ['Major', 'Chromatic', 'Melodic Minor', 'Harmonic Minor'],
    memorized: true,
  },
  'FIVE': { 
    number: 5, 
    description: 'Comprehensive knowledge, highly skilled',
    scaleTempo: '♪ = 80',
    scaleRange: '2 octaves',
    scaleTypes: ['Major', 'Chromatic', 'Melodic Minor', 'Harmonic Minor'],
    memorized: true,
  },
};

// Performance Objectives (POs)
export interface PerformanceObjective {
  id: string;
  number: number;
  name: string;
  critical: Record<CadetLevel, boolean | 'n/a'>;
  courseValue: Record<CadetLevel, number | 'n/a'>;
}

export const POS: PerformanceObjective[] = [
  { id: 'po-450', number: 450, name: 'Maintenance', 
    critical: { BASIC: false, ONE: false, TWO: false, THREE: true, FOUR: true, FIVE: true },
    courseValue: { BASIC: 'n/a', ONE: 'n/a', TWO: 'n/a', THREE: 5, FOUR: 5, FIVE: 5 }
  },
  { id: 'po-451', number: 451, name: 'Technique & Rhythm',
    critical: { BASIC: true, ONE: true, TWO: true, THREE: true, FOUR: true, FIVE: true },
    courseValue: { BASIC: 'n/a', ONE: 'n/a', TWO: 'n/a', THREE: 10, FOUR: 10, FIVE: 10 }
  },
  { id: 'po-452', number: 452, name: 'Individual Practice',
    critical: { BASIC: true, ONE: true, TWO: true, THREE: true, FOUR: true, FIVE: true },
    courseValue: { BASIC: 'n/a', ONE: 'n/a', TWO: 'n/a', THREE: 'n/a', FOUR: 'n/a', FIVE: 'n/a' }
  },
  { id: 'po-453', number: 453, name: 'Intonation',
    critical: { BASIC: false, ONE: false, TWO: true, THREE: true, FOUR: true, FIVE: true },
    courseValue: { BASIC: 'n/a', ONE: 'n/a', TWO: 'n/a', THREE: 5, FOUR: 5, FIVE: 5 }
  },
  { id: 'po-454', number: 454, name: 'Prepared Music',
    critical: { BASIC: true, ONE: true, TWO: true, THREE: true, FOUR: true, FIVE: true },
    courseValue: { BASIC: 'n/a', ONE: 'n/a', TWO: 'n/a', THREE: 40, FOUR: 35, FIVE: 35 }
  },
  { id: 'po-455', number: 455, name: 'Ensemble',
    critical: { BASIC: true, ONE: true, TWO: true, THREE: true, FOUR: true, FIVE: true },
    courseValue: { BASIC: 'n/a', ONE: 'n/a', TWO: 'n/a', THREE: 15, FOUR: 15, FIVE: 15 }
  },
  { id: 'po-456', number: 456, name: 'Sight Reading',
    critical: { BASIC: 'n/a', ONE: false, TWO: false, THREE: true, FOUR: true, FIVE: true },
    courseValue: { BASIC: 'n/a', ONE: 'n/a', TWO: 'n/a', THREE: 5, FOUR: 5, FIVE: 5 }
  },
  { id: 'po-457', number: 457, name: 'Aural Skills',
    critical: { BASIC: false, ONE: false, TWO: false, THREE: true, FOUR: true, FIVE: true },
    courseValue: { BASIC: 'n/a', ONE: 'n/a', TWO: 'n/a', THREE: 5, FOUR: 5, FIVE: 5 }
  },
  { id: 'po-458', number: 458, name: 'Music Theory',
    critical: { BASIC: false, ONE: false, TWO: true, THREE: true, FOUR: true, FIVE: true },
    courseValue: { BASIC: 'n/a', ONE: 'n/a', TWO: 'n/a', THREE: 10, FOUR: 10, FIVE: 10 }
  },
  { id: 'po-459', number: 459, name: 'Band Drill',
    critical: { BASIC: true, ONE: true, TWO: true, THREE: true, FOUR: true, FIVE: true },
    courseValue: { BASIC: 'n/a', ONE: 'n/a', TWO: 'n/a', THREE: 5, FOUR: 5, FIVE: 5 }
  },
  { id: 'po-460', number: 460, name: 'Conducting',
    critical: { BASIC: 'n/a', ONE: 'n/a', TWO: 'n/a', THREE: 'n/a', FOUR: true, FIVE: true },
    courseValue: { BASIC: 'n/a', ONE: 'n/a', TWO: 'n/a', THREE: 'n/a', FOUR: 5, FIVE: 5 }
  },
];

// Prepared Music - Official Lists (Annex D)
// CORRECTED: Using exact titles from A-CR-CCP-166/PT-001 standards
export interface Song {
  id: string;
  title: string;
  composer?: string;
  list: 'A' | 'B';
  level: CadetLevel;
  rcmEquivalent?: string;
}

export const PREPARED_MUSIC: Song[] = [
  // BASIC - Official List
  { id: 'basic-a1', title: 'Western Portrait', composer: 'Traditional', list: 'A', level: 'BASIC' },
  { id: 'basic-a2', title: 'Austrian Melody', composer: 'Traditional', list: 'A', level: 'BASIC' },
  { id: 'basic-a3', title: 'The Minstrel Boy', composer: 'Traditional', list: 'A', level: 'BASIC' },
  { id: 'basic-b1', title: 'Ode to Joy', composer: 'Beethoven', list: 'B', level: 'BASIC' },
  { id: 'basic-b2', title: 'America (My Country \'Tis of Thee)', composer: 'Traditional', list: 'B', level: 'BASIC' },
  { id: 'basic-b3', title: 'God Save the Queen', composer: 'Traditional', list: 'B', level: 'BASIC' },
  { id: 'basic-b4', title: 'Scarborough Fair', composer: 'Traditional', list: 'B', level: 'BASIC' },
  
  // ONE - Official List
  { id: 'one-a1', title: 'Abendlied', composer: 'Mozart', list: 'A', level: 'ONE' },
  { id: 'one-a2', title: 'Andante', composer: 'Mozart', list: 'A', level: 'ONE' },
  { id: 'one-a3', title: 'Winter Dreams', composer: 'Tchaikovsky', list: 'A', level: 'ONE' },
  { id: 'one-a4', title: 'Aria', composer: 'Handel', list: 'A', level: 'ONE' },
  { id: 'one-a5', title: 'Old Folks at Home', composer: 'Foster', list: 'A', level: 'ONE' },
  { id: 'one-a6', title: 'Annie Laurie', composer: 'Traditional', list: 'A', level: 'ONE' },
  { id: 'one-a7', title: 'Lullaby', composer: 'Brahms', list: 'A', level: 'ONE' },
  { id: 'one-b1', title: 'Gavotte', composer: 'Handel', list: 'B', level: 'ONE' },
  { id: 'one-b2', title: 'Fandango', composer: 'Traditional', list: 'B', level: 'ONE' },
  { id: 'one-b3', title: 'Rigaudon', composer: 'Traditional', list: 'B', level: 'ONE' },
  { id: 'one-b4', title: 'Scenes that are Brightest', composer: 'Traditional', list: 'B', level: 'ONE' },
  { id: 'one-b5', title: 'Waltz', composer: 'Traditional', list: 'B', level: 'ONE' },
  { id: 'one-b6', title: 'March', composer: 'Traditional', list: 'B', level: 'ONE' },
  
  // TWO - Official List
  { id: 'two-a1', title: 'At the Hearth', composer: 'Traditional', list: 'A', level: 'TWO' },
  { id: 'two-a2', title: 'Meadowland', composer: 'Traditional', list: 'A', level: 'TWO' },
  { id: 'two-a3', title: 'Etude in D Minor', composer: 'Czerny', list: 'A', level: 'TWO' },
  { id: 'two-a4', title: 'Andante', composer: 'Mozart', list: 'A', level: 'TWO' },
  { id: 'two-a5', title: 'Loreley', composer: 'Traditional', list: 'A', level: 'TWO' },
  { id: 'two-b1', title: 'Hunter Chorus', composer: 'Weber', list: 'B', level: 'TWO' },
  { id: 'two-b2', title: 'Polka', composer: 'Traditional', list: 'B', level: 'TWO' },
  { id: 'two-b3', title: 'Duet Brillant', composer: 'Traditional', list: 'B', level: 'TWO' },
  
  // THREE (RCM Grade 2)
  { id: 'three-a1', title: 'Air Gracile', list: 'A', level: 'THREE', rcmEquivalent: 'RCM Grade 2' },
  { id: 'three-a2', title: 'Allerseelen', list: 'A', level: 'THREE', rcmEquivalent: 'RCM Grade 2' },
  { id: 'three-a3', title: 'Concerto in B-flat Minor', list: 'A', level: 'THREE', rcmEquivalent: 'RCM Grade 2' },
  { id: 'three-a4', title: 'Romantic Piece', list: 'A', level: 'THREE', rcmEquivalent: 'RCM Grade 2' },
  { id: 'three-a5', title: 'Andante Grazioso', list: 'A', level: 'THREE', rcmEquivalent: 'RCM Grade 2' },
  { id: 'three-a6', title: 'On Wings of Song', list: 'A', level: 'THREE', rcmEquivalent: 'RCM Grade 2' },
  { id: 'three-b1', title: 'Canzonetta and Giga', list: 'B', level: 'THREE', rcmEquivalent: 'RCM Grade 2' },
  { id: 'three-b2', title: 'Allegro', list: 'B', level: 'THREE', rcmEquivalent: 'RCM Grade 2' },
  { id: 'three-b3', title: 'Allegro Moderato', list: 'B', level: 'THREE', rcmEquivalent: 'RCM Grade 2' },
  { id: 'three-b4', title: 'Allegretto Brillante', list: 'B', level: 'THREE', rcmEquivalent: 'RCM Grade 2' },
  
  // FOUR (RCM Grade 4)
  { id: 'four-a1', title: 'Romantic Piece', list: 'A', level: 'FOUR', rcmEquivalent: 'RCM Grade 4' },
  { id: 'four-a2', title: 'Chartreuse', list: 'A', level: 'FOUR', rcmEquivalent: 'RCM Grade 4' },
  { id: 'four-a3', title: 'Introduction and Rondo', list: 'A', level: 'FOUR', rcmEquivalent: 'RCM Grade 4' },
  { id: 'four-a4', title: 'Album-Leaf', list: 'A', level: 'FOUR', rcmEquivalent: 'RCM Grade 4' },
  { id: 'four-b1', title: 'Le Secret', list: 'B', level: 'FOUR', rcmEquivalent: 'RCM Grade 4' },
  { id: 'four-b2', title: 'Minuet', list: 'B', level: 'FOUR', rcmEquivalent: 'RCM Grade 4' },
  { id: 'four-b3', title: 'Sicilienne and Allegro', list: 'B', level: 'FOUR', rcmEquivalent: 'RCM Grade 4' },
  
  // FIVE (RCM Grade 6)
  { id: 'five-a1', title: 'Elegie', list: 'A', level: 'FIVE', rcmEquivalent: 'RCM Grade 6' },
  { id: 'five-a2', title: 'Recitative and Allegro', list: 'A', level: 'FIVE', rcmEquivalent: 'RCM Grade 6' },
  { id: 'five-a3', title: 'Vocalise', list: 'A', level: 'FIVE', rcmEquivalent: 'RCM Grade 6' },
  { id: 'five-a4', title: 'Nocturne', list: 'A', level: 'FIVE', rcmEquivalent: 'RCM Grade 6' },
  { id: 'five-a5', title: 'Larghetto', list: 'A', level: 'FIVE', rcmEquivalent: 'RCM Grade 6' },
  { id: 'five-a6', title: 'Melodie', list: 'A', level: 'FIVE', rcmEquivalent: 'RCM Grade 6' },
  { id: 'five-b1', title: 'Largo and Allegro', list: 'B', level: 'FIVE', rcmEquivalent: 'RCM Grade 6' },
  { id: 'five-b2', title: 'Gypsy Rondo', list: 'B', level: 'FIVE', rcmEquivalent: 'RCM Grade 6' },
  { id: 'five-b3', title: 'Fantaisie Mauresque', list: 'B', level: 'FIVE', rcmEquivalent: 'RCM Grade 6' },
  { id: 'five-b4', title: 'Concertante', list: 'B', level: 'FIVE', rcmEquivalent: 'RCM Grade 6' },
  { id: 'five-b5', title: 'Andante and Allegro', list: 'B', level: 'FIVE', rcmEquivalent: 'RCM Grade 6' },
];

// Get songs for a specific level
export const getSongsForLevel = (level: CadetLevel): { listA: Song[]; listB: Song[] } => {
  const songs = PREPARED_MUSIC.filter(s => s.level === level);
  return {
    listA: songs.filter(s => s.list === 'A'),
    listB: songs.filter(s => s.list === 'B'),
  };
};

// Maintenance tasks by level (Annex A)
export const MAINTENANCE_TASKS: Record<CadetLevel, string[]> = {
  'BASIC': ['Daily swabbing', 'Mouthpiece swabbing', 'Reed care'],
  'ONE': ['Daily swabbing', 'Mouthpiece swabbing', 'Reed care', 'Cork lubrication'],
  'TWO': ['Daily swabbing', 'Mouthpiece swabbing', 'Reed care', 'Cork lubrication', 'Cleaning grease from pads'],
  'THREE': ['Daily swabbing', 'Mouthpiece swabbing', 'Reed care', 'Cork lubrication', 'Cleaning grease from pads', 'Reseating pads'],
  'FOUR': ['Daily swabbing', 'Mouthpiece swabbing', 'Reed care', 'Cork lubrication', 'Cleaning grease from pads', 'Reseating pads', 'Minor repairs (replacing pads)'],
  'FIVE': ['Daily swabbing', 'Mouthpiece swabbing', 'Reed care', 'Cork lubrication', 'Cleaning grease from pads', 'Reseating pads', 'Adapting ligature', 'Replacing pads'],
};

// Intonation standards (Annex K)
export const INTONATION_STANDARDS: Record<CadetLevel, string> = {
  'BASIC': 'Identifies sharp or flat when told',
  'ONE': 'May be unsure, adjusts when instructed',
  'TWO': 'Identifies sharp or flat against tuning note and adjusts',
  'THREE': 'Identifies sharp or flat against tuning note and adjusts',
  'FOUR': 'Identifies sharp or flat in ensemble and adjusts',
  'FIVE': 'Identifies sharp or flat in ensemble and adjusts',
};

// Sight reading standards (Annex F)
export const SIGHT_READING_STANDARDS: Record<CadetLevel, string | null> = {
  'BASIC': null, // n/a
  'ONE': 'Up to 16 bars, with assistance',
  'TWO': 'Up to 16 bars, with assistance',
  'THREE': 'Up to 16 bars, with assistance',
  'FOUR': 'Up to 32 bars, without assistance',
  'FIVE': 'Up to 32 bars, without assistance',
};

// Scales by instrument and level (Annex B)
export interface ScaleKey {
  key: string;
  accidentals: number;
}

export const ALTO_SAX_SCALES: Record<CadetLevel, ScaleKey[]> = {
  'BASIC': [
    { key: 'Bb Major', accidentals: 2 },
    { key: 'Eb Major', accidentals: 3 },
    { key: 'F Major', accidentals: 1 },
  ],
  'ONE': [
    { key: 'Bb Major', accidentals: 2 },
    { key: 'Eb Major', accidentals: 3 },
    { key: 'F Major', accidentals: 1 },
    { key: 'Ab Major', accidentals: 4 },
    { key: 'Bb Chromatic', accidentals: -1 },
    { key: 'C Harmonic Minor', accidentals: 0 },
  ],
  'TWO': [
    { key: 'Bb Major', accidentals: 2 },
    { key: 'Eb Major', accidentals: 3 },
    { key: 'F Major', accidentals: 1 },
    { key: 'Ab Major', accidentals: 4 },
    { key: 'Db Major', accidentals: 5 },
    { key: 'Bb Chromatic', accidentals: -1 },
    { key: 'C Harmonic Minor', accidentals: 0 },
    { key: 'F Harmonic Minor', accidentals: 1 },
  ],
  'THREE': [
    { key: 'All Major (up to 4 sharps/flats)', accidentals: 4 },
    { key: 'Chromatic', accidentals: -1 },
    { key: 'All Melodic Minor', accidentals: 4 },
    { key: 'All Harmonic Minor', accidentals: 4 },
  ],
  'FOUR': [
    { key: 'All Major', accidentals: 7 },
    { key: 'Chromatic', accidentals: -1 },
    { key: 'All Melodic Minor', accidentals: 7 },
    { key: 'All Harmonic Minor', accidentals: 7 },
  ],
  'FIVE': [
    { key: 'All Major (up to 7 accidentals)', accidentals: 7 },
    { key: 'Chromatic', accidentals: -1 },
    { key: 'All Melodic Minor (up to 7 accidentals)', accidentals: 7 },
    { key: 'All Harmonic Minor (up to 7 accidentals)', accidentals: 7 },
  ],
};

export const TENOR_SAX_SCALES: Record<CadetLevel, ScaleKey[]> = {
  'BASIC': [
    { key: 'C Major', accidentals: 0 },
    { key: 'F Major', accidentals: 1 },
    { key: 'G Major', accidentals: 1 },
  ],
  'ONE': [
    { key: 'C Major', accidentals: 0 },
    { key: 'F Major', accidentals: 1 },
    { key: 'G Major', accidentals: 1 },
    { key: 'Bb Major', accidentals: 2 },
    { key: 'C Chromatic', accidentals: -1 },
    { key: 'D Harmonic Minor', accidentals: 0 },
  ],
  'TWO': [
    { key: 'C Major', accidentals: 0 },
    { key: 'F Major', accidentals: 1 },
    { key: 'G Major', accidentals: 1 },
    { key: 'Bb Major', accidentals: 2 },
    { key: 'Eb Major', accidentals: 3 },
    { key: 'C Chromatic', accidentals: -1 },
    { key: 'D Harmonic Minor', accidentals: 0 },
    { key: 'G Harmonic Minor', accidentals: 1 },
  ],
  'THREE': ALTO_SAX_SCALES.THREE,
  'FOUR': ALTO_SAX_SCALES.FOUR,
  'FIVE': ALTO_SAX_SCALES.FIVE,
};

// Legacy compatibility
export const BASIC_SONGS = PREPARED_MUSIC.filter(s => s.level === 'BASIC');
export const LEVEL_A_SONGS = PREPARED_MUSIC.filter(s => s.level === 'ONE' && s.list === 'A');
export const LEVEL_B_SONGS = PREPARED_MUSIC.filter(s => s.level === 'ONE' && s.list === 'B');

// Legacy lesson structure for compatibility
export interface Lesson {
  id: string;
  title: string;
  type: 'theory' | 'playing' | 'rhythm' | 'exam' | 'audio';
  emoji: string;
  topic: string;
  xp: number;
  description: string;
  interactive: boolean;
  level: CadetLevel;
  po?: number;
  requiresMicrophone?: boolean; // Flag for audio practice lessons
}

export const CURRICULUM: { id: string; title: string; level: number; lessons: Lesson[] }[] = [
  {
    id: 'basic',
    title: 'BASIC',
    level: 0,
    lessons: [
      { id: 'basic-intro', title: 'Meet Your Saxophone', type: 'playing', emoji: '🎷', topic: 'Instrument', xp: 10, description: 'Learn the parts of your instrument', interactive: true, level: 'BASIC' as CadetLevel },
      { id: 'basic-maintenance', title: 'Daily Care', type: 'playing', emoji: '🧹', topic: 'PO 450', xp: 10, description: 'Swabbing and reed care', interactive: true, level: 'BASIC' as CadetLevel, po: 450 },
      { id: 'basic-posture', title: 'Posture & Hold', type: 'playing', emoji: '🧍', topic: 'PO 451', xp: 15, description: 'Proper playing position', interactive: true, level: 'BASIC' as CadetLevel, po: 451 },
      { id: 'basic-first-notes', title: 'First Notes: B, A, G', type: 'playing', emoji: '🎵', topic: 'PO 451', xp: 20, description: 'Your first three notes', interactive: true, level: 'BASIC' as CadetLevel, po: 451 },
      { id: 'basic-rhythm', title: 'Quarter Notes', type: 'rhythm', emoji: '🥁', topic: 'PO 451', xp: 15, description: 'Basic rhythm patterns', interactive: true, level: 'BASIC' as CadetLevel, po: 451 },
      { id: 'basic-staff', title: 'The Music Staff', type: 'theory', emoji: '📜', topic: 'PO 458', xp: 10, description: 'Lines, spaces, and clefs', interactive: false, level: 'BASIC' as CadetLevel, po: 458 },
      { id: 'basic-notes', title: 'Note Names', type: 'theory', emoji: '🎼', topic: 'PO 458', xp: 15, description: 'Reading notes on the staff', interactive: true, level: 'BASIC' as CadetLevel, po: 458 },
      { id: 'basic-drill', title: 'Band Drill Basics', type: 'playing', emoji: '🎖️', topic: 'PO 459', xp: 10, description: 'Position and movement', interactive: false, level: 'BASIC' as CadetLevel, po: 459 },
      { id: 'audio-basic-note', title: 'Audio Practice: Note G', type: 'audio', emoji: '🎤', topic: 'PO 451', xp: 20, description: 'Practice playing the note G with your instrument', interactive: true, level: 'BASIC' as CadetLevel, po: 451, requiresMicrophone: true },
      { id: 'audio-basic-scale', title: 'Audio Practice: Bb Major Scale', type: 'audio', emoji: '🎤', topic: 'PO 451', xp: 30, description: 'Practice the Bb Major scale with your instrument', interactive: true, level: 'BASIC' as CadetLevel, po: 451, requiresMicrophone: true },
      { id: 'basic-exam', title: 'Basic Assessment', type: 'exam', emoji: '📝', topic: 'Exam', xp: 50, description: 'Complete the BASIC level', interactive: false, level: 'BASIC' as CadetLevel },
    ],
  },
  {
    id: 'one',
    title: 'LEVEL ONE',
    level: 1,
    lessons: [
      { id: 'one-maintenance', title: 'Cork Care', type: 'playing', emoji: '🔧', topic: 'PO 450', xp: 10, description: 'Lubrication and care', interactive: false, level: 'ONE' as CadetLevel, po: 450 },
      { id: 'one-scales', title: 'Major Scales', type: 'playing', emoji: '🎹', topic: 'PO 451', xp: 25, description: 'Bb, Eb, F Major (♩=66)', interactive: true, level: 'ONE' as CadetLevel, po: 451 },
      { id: 'one-chromatic', title: 'Chromatic Scale', type: 'playing', emoji: '🎼', topic: 'PO 451', xp: 25, description: 'All 12 notes', interactive: true, level: 'ONE' as CadetLevel, po: 451 },
      { id: 'one-harmonic', title: 'Harmonic Minor', type: 'playing', emoji: '🎶', topic: 'PO 451', xp: 25, description: 'Minor scale patterns', interactive: true, level: 'ONE' as CadetLevel, po: 451 },
      { id: 'one-eighth', title: 'Eighth Notes', type: 'rhythm', emoji: '🎵', topic: 'PO 451', xp: 15, description: 'Faster rhythms', interactive: true, level: 'ONE' as CadetLevel, po: 451 },
      { id: 'one-intonation', title: 'Tuning Basics', type: 'theory', emoji: '🎯', topic: 'PO 453', xp: 15, description: 'Sharp and flat identification', interactive: true, level: 'ONE' as CadetLevel, po: 453 },
      { id: 'one-key-sigs', title: 'Key Signatures', type: 'theory', emoji: '🔑', topic: 'PO 458', xp: 20, description: 'Reading key signatures', interactive: true, level: 'ONE' as CadetLevel, po: 458 },
      { id: 'one-sight', title: 'Sight Reading Intro', type: 'theory', emoji: '👁️', topic: 'PO 456', xp: 15, description: '16 bars with assistance', interactive: true, level: 'ONE' as CadetLevel, po: 456 },
      { id: 'one-drill', title: 'Drill Movements', type: 'playing', emoji: '🎖️', topic: 'PO 459', xp: 10, description: 'Marching basics', interactive: false, level: 'ONE' as CadetLevel, po: 459 },
      { id: 'audio-pattern', title: 'Audio Practice: Arpeggio Pattern', type: 'audio', emoji: '🎤', topic: 'PO 451', xp: 35, description: 'Practice playing arpeggio patterns with your instrument', interactive: true, level: 'ONE' as CadetLevel, po: 451, requiresMicrophone: true },
      { id: 'one-exam', title: 'Level One Assessment', type: 'exam', emoji: '📝', topic: 'Exam', xp: 75, description: 'Complete Level ONE', interactive: false, level: 'ONE' as CadetLevel },
    ],
  },
  {
    id: 'two',
    title: 'LEVEL TWO',
    level: 2,
    lessons: [
      { id: 'two-maintenance', title: 'Pad Care', type: 'playing', emoji: '🔧', topic: 'PO 450', xp: 10, description: 'Cleaning grease from pads', interactive: false, level: 'TWO' as CadetLevel, po: 450 },
      { id: 'two-scales', title: 'Scales at ♩=72', type: 'playing', emoji: '🎹', topic: 'PO 451', xp: 30, description: 'Faster scale playing', interactive: true, level: 'TWO' as CadetLevel, po: 451 },
      { id: 'two-more-keys', title: 'Additional Keys', type: 'playing', emoji: '🎼', topic: 'PO 451', xp: 25, description: 'Db Major and more', interactive: true, level: 'TWO' as CadetLevel, po: 451 },
      { id: 'two-intonation', title: 'Intonation Skills', type: 'playing', emoji: '🎯', topic: 'PO 453', xp: 20, description: 'Critical: Adjust to tuning note', interactive: true, level: 'TWO' as CadetLevel, po: 453 },
      { id: 'two-theory', title: 'Theory Fundamentals', type: 'theory', emoji: '📚', topic: 'PO 458', xp: 25, description: 'Critical: Intervals and chords', interactive: true, level: 'TWO' as CadetLevel, po: 458 },
      { id: 'two-aural', title: 'Aural Skills', type: 'theory', emoji: '👂', topic: 'PO 457', xp: 15, description: 'Ear training basics', interactive: true, level: 'TWO' as CadetLevel, po: 457 },
      { id: 'two-sight', title: 'Sight Reading', type: 'theory', emoji: '👁️', topic: 'PO 456', xp: 15, description: '16 bars with assistance', interactive: true, level: 'TWO' as CadetLevel, po: 456 },
      { id: 'two-exam', title: 'Level Two Assessment', type: 'exam', emoji: '📝', topic: 'Exam', xp: 100, description: 'Complete Level TWO', interactive: false, level: 'TWO' as CadetLevel },
    ],
  },
];

export const getAllLessons = (): Lesson[] => {
  return CURRICULUM.flatMap(section => section.lessons);
};

export const getLessonById = (id: string): Lesson | undefined => {
  return getAllLessons().find(l => l.id === id);
};

export const getLessonStatus = (lessonId: string, completedLessons: string[]): 'locked' | 'available' | 'completed' => {
  if (completedLessons.includes(lessonId)) return 'completed';
  const allLessons = getAllLessons();
  const idx = allLessons.findIndex(l => l.id === lessonId);
  if (idx === 0) return 'available';
  if (idx > 0 && completedLessons.includes(allLessons[idx - 1].id)) return 'available';
  return 'locked';
};

export const STICKER_INFO: Record<string, { name: string }> = {
  'first-5': { name: 'First Steps' },
  'dedicated': { name: 'Dedicated' },
  'xp-500': { name: '500 XP' },
  'xp-1000': { name: '1000 XP' },
  'week-streak': { name: 'Week Streak' },
  'month-streak': { name: 'Month Streak' },
  'theory-master': { name: 'Theory Master' },
  'level-5': { name: 'Level 5' },
};
