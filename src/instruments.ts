/**
 * Multi-Instrument Architecture
 * 
 * Provides instrument profiles, transposition engine, and pitch conversion utilities
 * for supporting the entire Cadet Military Band Program.
 */

// ============================================================
// INSTRUMENT PROFILE
// ============================================================

export type InstrumentFamily = 'woodwind' | 'brass' | 'percussion';

export interface InstrumentProfile {
  id: string;
  name: string;
  family: InstrumentFamily;
  
  // Transposition
  transpositionSemitones: number; // Positive = sounds lower than written, Negative = sounds higher
  
  // Written range (what the player reads)
  lowestWrittenNote: string;
  highestWrittenNote: string;
  
  // Concert range (actual sounding pitch)
  lowestConcertNote: string;
  highestConcertNote: string;
  
  // Notation
  clef: 'treble' | 'bass' | 'alto' | 'tenor';
  
  // Instrument-specific properties
  isTransposing: boolean;
  transpositionDirection: 'up' | 'down' | 'none';
}

// ============================================================
// INSTRUMENT REGISTRY
// ============================================================

export const INSTRUMENTS: Record<string, InstrumentProfile> = {
  // Woodwinds - Saxophones
  'alto-sax': {
    id: 'alto-sax',
    name: 'Alto Saxophone',
    family: 'woodwind',
    transpositionSemitones: 9, // Eb: written C sounds as concert Eb (9 semitones up)
    lowestWrittenNote: 'Bb3',
    highestWrittenNote: 'F6',
    lowestConcertNote: 'Db3',
    highestConcertNote: 'A5',
    clef: 'treble',
    isTransposing: true,
    transpositionDirection: 'up',
  },
  'tenor-sax': {
    id: 'tenor-sax',
    name: 'Tenor Saxophone',
    family: 'woodwind',
    transpositionSemitones: 2, // Bb: written C sounds as concert Bb (2 semitones down)
    lowestWrittenNote: 'Bb2',
    highestWrittenNote: 'F5',
    lowestConcertNote: 'Ab2',
    highestConcertNote: 'Eb5',
    clef: 'treble',
    isTransposing: true,
    transpositionDirection: 'down',
  },
  'baritone-sax': {
    id: 'baritone-sax',
    name: 'Baritone Saxophone',
    family: 'woodwind',
    transpositionSemitones: 9, // Eb: same as alto
    lowestWrittenNote: 'Bb2',
    highestWrittenNote: 'F5',
    lowestConcertNote: 'Db2',
    highestConcertNote: 'A4',
    clef: 'treble',
    isTransposing: true,
    transpositionDirection: 'up',
  },
  'soprano-sax': {
    id: 'soprano-sax',
    name: 'Soprano Saxophone',
    family: 'woodwind',
    transpositionSemitones: 2, // Bb: same as tenor
    lowestWrittenNote: 'Bb3',
    highestWrittenNote: 'F6',
    lowestConcertNote: 'Ab3',
    highestConcertNote: 'Eb6',
    clef: 'treble',
    isTransposing: true,
    transpositionDirection: 'down',
  },
  
  // Woodwinds - Clarinets
  'clarinet': {
    id: 'clarinet',
    name: 'Clarinet',
    family: 'woodwind',
    transpositionSemitones: 2, // Bb: written C sounds as concert Bb
    lowestWrittenNote: 'E3',
    highestWrittenNote: 'C7',
    lowestConcertNote: 'D3',
    highestConcertNote: 'Bb6',
    clef: 'treble',
    isTransposing: true,
    transpositionDirection: 'down',
  },
  'bass-clarinet': {
    id: 'bass-clarinet',
    name: 'Bass Clarinet',
    family: 'woodwind',
    transpositionSemitones: 14, // Bb: written C sounds as concert Bb (one octave + major 2nd down)
    lowestWrittenNote: 'Bb2',
    highestWrittenNote: 'C6',
    lowestConcertNote: 'Ab1',
    highestConcertNote: 'Bb5',
    clef: 'treble',
    isTransposing: true,
    transpositionDirection: 'down',
  },
  
  // Woodwinds - Other
  'flute': {
    id: 'flute',
    name: 'Flute',
    family: 'woodwind',
    transpositionSemitones: 0, // C: concert pitch
    lowestWrittenNote: 'C4',
    highestWrittenNote: 'C7',
    lowestConcertNote: 'C4',
    highestConcertNote: 'C7',
    clef: 'treble',
    isTransposing: false,
    transpositionDirection: 'none',
  },
  'oboe': {
    id: 'oboe',
    name: 'Oboe',
    family: 'woodwind',
    transpositionSemitones: 0, // C: concert pitch
    lowestWrittenNote: 'Bb3',
    highestWrittenNote: 'A6',
    lowestConcertNote: 'Bb3',
    highestConcertNote: 'A6',
    clef: 'treble',
    isTransposing: false,
    transpositionDirection: 'none',
  },
  'bassoon': {
    id: 'bassoon',
    name: 'Bassoon',
    family: 'woodwind',
    transpositionSemitones: 0, // C: concert pitch
    lowestWrittenNote: 'Bb1',
    highestWrittenNote: 'Eb5',
    lowestConcertNote: 'Bb1',
    highestConcertNote: 'Eb5',
    clef: 'bass',
    isTransposing: false,
    transpositionDirection: 'none',
  },
  
  // Brass
  'trumpet': {
    id: 'trumpet',
    name: 'Trumpet',
    family: 'brass',
    transpositionSemitones: 2, // Bb: written C sounds as concert Bb
    lowestWrittenNote: 'F#3',
    highestWrittenNote: 'D6',
    lowestConcertNote: 'E3',
    highestConcertNote: 'C6',
    clef: 'treble',
    isTransposing: true,
    transpositionDirection: 'down',
  },
  'cornet': {
    id: 'cornet',
    name: 'Cornet',
    family: 'brass',
    transpositionSemitones: 2, // Bb: same as trumpet
    lowestWrittenNote: 'E3',
    highestWrittenNote: 'Bb5',
    lowestConcertNote: 'D3',
    highestConcertNote: 'Ab5',
    clef: 'treble',
    isTransposing: true,
    transpositionDirection: 'down',
  },
  'flugelhorn': {
    id: 'flugelhorn',
    name: 'Flugelhorn',
    family: 'brass',
    transpositionSemitones: 2, // Bb: same as trumpet
    lowestWrittenNote: 'E3',
    highestWrittenNote: 'Bb5',
    lowestConcertNote: 'D3',
    highestConcertNote: 'Ab5',
    clef: 'treble',
    isTransposing: true,
    transpositionDirection: 'down',
  },
  'french-horn': {
    id: 'french-horn',
    name: 'French Horn',
    family: 'brass',
    transpositionSemitones: 7, // F: written C sounds as concert F (5 semitones down)
    lowestWrittenNote: 'F2',
    highestWrittenNote: 'C6',
    lowestConcertNote: 'Bb1',
    highestConcertNote: 'F5',
    clef: 'treble',
    isTransposing: true,
    transpositionDirection: 'down',
  },
  'trombone': {
    id: 'trombone',
    name: 'Trombone',
    family: 'brass',
    transpositionSemitones: 0, // C: concert pitch (mostly)
    lowestWrittenNote: 'E2',
    highestWrittenNote: 'Bb4',
    lowestConcertNote: 'E2',
    highestConcertNote: 'Bb4',
    clef: 'bass',
    isTransposing: false,
    transpositionDirection: 'none',
  },
  'euphonium': {
    id: 'euphonium',
    name: 'Euphonium',
    family: 'brass',
    transpositionSemitones: 0, // C: concert pitch (mostly)
    lowestWrittenNote: 'B1',
    highestWrittenNote: 'Bb4',
    lowestConcertNote: 'B1',
    highestConcertNote: 'Bb4',
    clef: 'bass',
    isTransposing: false,
    transpositionDirection: 'none',
  },
  'tuba': {
    id: 'tuba',
    name: 'Tuba',
    family: 'brass',
    transpositionSemitones: 0, // C: concert pitch (mostly)
    lowestWrittenNote: 'D1',
    highestWrittenNote: 'F4',
    lowestConcertNote: 'D1',
    highestConcertNote: 'F4',
    clef: 'bass',
    isTransposing: false,
    transpositionDirection: 'none',
  },
  
  // Percussion (non-pitched, included for completeness)
  'snare-drum': {
    id: 'snare-drum',
    name: 'Snare Drum',
    family: 'percussion',
    transpositionSemitones: 0,
    lowestWrittenNote: 'N/A',
    highestWrittenNote: 'N/A',
    lowestConcertNote: 'N/A',
    highestConcertNote: 'N/A',
    clef: 'treble', // Uses percussion notation
    isTransposing: false,
    transpositionDirection: 'none',
  },
  'bass-drum': {
    id: 'bass-drum',
    name: 'Bass Drum',
    family: 'percussion',
    transpositionSemitones: 0,
    lowestWrittenNote: 'N/A',
    highestWrittenNote: 'N/A',
    lowestConcertNote: 'N/A',
    highestConcertNote: 'N/A',
    clef: 'treble',
    isTransposing: false,
    transpositionDirection: 'none',
  },
  'mallet-percussion': {
    id: 'mallet-percussion',
    name: 'Mallet Percussion',
    family: 'percussion',
    transpositionSemitones: 0, // Concert pitch
    lowestWrittenNote: 'C3',
    highestWrittenNote: 'C7',
    lowestConcertNote: 'C3',
    highestConcertNote: 'C7',
    clef: 'treble', // Uses both treble and bass
    isTransposing: false,
    transpositionDirection: 'none',
  },
  'auxiliary-percussion': {
    id: 'auxiliary-percussion',
    name: 'Auxiliary Percussion',
    family: 'percussion',
    transpositionSemitones: 0,
    lowestWrittenNote: 'N/A',
    highestWrittenNote: 'N/A',
    lowestConcertNote: 'N/A',
    highestConcertNote: 'N/A',
    clef: 'treble',
    isTransposing: false,
    transpositionDirection: 'none',
  },
};

// ============================================================
// NOTE CONVERSION UTILITIES
// ============================================================

// Note names in chromatic scale
const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

// Enharmonic equivalents
const ENHARMONIC_MAP: Record<string, string> = {
  'C#': 'Db',
  'D#': 'Eb',
  'F#': 'Gb',
  'G#': 'Ab',
  'A#': 'Bb',
  'Db': 'C#',
  'Eb': 'D#',
  'Gb': 'F#',
  'Ab': 'G#',
  'Bb': 'A#',
};

/**
 * Parse a note string into note name and octave
 * Example: "C4" -> { note: "C", octave: 4 }
 */
export function parseNote(noteString: string): { note: string; octave: number } | null {
  const match = noteString.match(/^([A-G][#b]?)(\d+)$/);
  if (!match) return null;
  
  return {
    note: match[1],
    octave: parseInt(match[2]),
  };
}

/**
 * Convert note name to MIDI number
 * Example: "C4" -> 60
 */
export function noteToMidi(noteString: string): number | null {
  const parsed = parseNote(noteString);
  if (!parsed) return null;
  
  const noteIndex = NOTE_NAMES.indexOf(parsed.note);
  if (noteIndex === -1) return null;
  
  return (parsed.octave + 1) * 12 + noteIndex;
}

/**
 * Convert MIDI number to note string
 * Example: 60 -> "C4"
 */
export function midiToNote(midi: number): string {
  const octave = Math.floor(midi / 12) - 1;
  const noteIndex = midi % 12;
  return `${NOTE_NAMES[noteIndex]}${octave}`;
}

/**
 * Convert concert pitch to written pitch for a specific instrument
 * 
 * @param concertNote - The concert pitch note (e.g., "Bb4")
 * @param instrumentId - The instrument ID (e.g., "alto-sax")
 * @returns The written pitch note (e.g., "G4" for alto sax)
 * 
 * Example:
 * concertToWritten("Bb4", "alto-sax") -> "G4"
 * concertToWritten("Bb4", "tenor-sax") -> "C5"
 */
export function concertToWritten(concertNote: string, instrumentId: string): string | null {
  const instrument = INSTRUMENTS[instrumentId];
  if (!instrument) return null;
  
  const concertMidi = noteToMidi(concertNote);
  if (concertMidi === null) return null;
  
  // For transposing instruments:
  // - If transpositionDirection is 'up', written pitch is HIGHER than concert pitch
  // - If transpositionDirection is 'down', written pitch is LOWER than concert pitch
  let writtenMidi: number;
  
  if (instrument.transpositionDirection === 'up') {
    // Written pitch is higher: add semitones
    writtenMidi = concertMidi + instrument.transpositionSemitones;
  } else if (instrument.transpositionDirection === 'down') {
    // Written pitch is lower: subtract semitones
    writtenMidi = concertMidi - instrument.transpositionSemitones;
  } else {
    // Concert pitch instrument: no change
    writtenMidi = concertMidi;
  }
  
  return midiToNote(writtenMidi);
}

/**
 * Convert written pitch to concert pitch for a specific instrument
 * 
 * @param writtenNote - The written pitch note (e.g., "G4")
 * @param instrumentId - The instrument ID (e.g., "alto-sax")
 * @returns The concert pitch note (e.g., "Bb4" for alto sax)
 * 
 * Example:
 * writtenToConcert("G4", "alto-sax") -> "Bb4"
 * writtenToConcert("C5", "tenor-sax") -> "Bb4"
 */
export function writtenToConcert(writtenNote: string, instrumentId: string): string | null {
  const instrument = INSTRUMENTS[instrumentId];
  if (!instrument) return null;
  
  const writtenMidi = noteToMidi(writtenNote);
  if (writtenMidi === null) return null;
  
  // Reverse of concertToWritten
  let concertMidi: number;
  
  if (instrument.transpositionDirection === 'up') {
    // Concert pitch is lower: subtract semitones
    concertMidi = writtenMidi - instrument.transpositionSemitones;
  } else if (instrument.transpositionDirection === 'down') {
    // Concert pitch is higher: add semitones
    concertMidi = writtenMidi + instrument.transpositionSemitones;
  } else {
    // Concert pitch instrument: no change
    concertMidi = writtenMidi;
  }
  
  return midiToNote(concertMidi);
}

/**
 * Convert a detected pitch for a specific instrument
 * Returns both concert and written pitch
 * 
 * @param concertNote - The detected concert pitch
 * @param instrumentId - The instrument ID
 * @returns Object with both concert and written pitch
 */
export function convertPitchForInstrument(
  concertNote: string,
  instrumentId: string
): {
  concertPitch: string;
  writtenPitch: string | null;
  instrument: string;
  transpositionSemitones: number;
} | null {
  const instrument = INSTRUMENTS[instrumentId];
  if (!instrument) return null;
  
  const writtenPitch = concertToWritten(concertNote, instrumentId);
  
  return {
    concertPitch: concertNote,
    writtenPitch,
    instrument: instrument.name,
    transpositionSemitones: instrument.transpositionSemitones,
  };
}

// ============================================================
// INSTRUMENT PITCH RESULT
// ============================================================

/**
 * Result from pitch detection with instrument transposition applied
 */
export interface InstrumentPitchResult {
  frequency: number;
  
  // Concert pitch (actual sounding pitch)
  concertNote: string;
  concertOctave: number;
  
  // Written pitch (what the player reads)
  writtenNote: string;
  writtenOctave: number;
  
  // Instrument info
  instrument: string;
  instrumentId: string;
  
  // Accuracy
  confidence: number;
  cents: number; // Deviation from perfect pitch
}

// ============================================================
// SCALE SYSTEM
// ============================================================

/**
 * Instrument-specific scale requirements
 */
export interface InstrumentScaleRequirements {
  instrumentId: string;
  level: string;
  scales: string[]; // Written scale names
}

/**
 * Scale requirements by instrument and level
 */
export const SCALE_REQUIREMENTS: Record<string, Record<string, string[]>> = {
  'alto-sax': {
    'BASIC': ['Bb Major', 'Eb Major', 'F Major'],
    'ONE': ['Bb Major', 'Eb Major', 'F Major', 'Ab Major', 'Bb Chromatic', 'C Harmonic Minor'],
    'TWO': ['Bb Major', 'Eb Major', 'F Major', 'Ab Major', 'Db Major', 'Bb Chromatic', 'C Harmonic Minor', 'F Harmonic Minor'],
    'THREE': ['All Major (up to 4 sharps/flats)', 'Chromatic', 'All Melodic Minor', 'All Harmonic Minor'],
    'FOUR': ['All Major', 'Chromatic', 'All Melodic Minor', 'All Harmonic Minor'],
    'FIVE': ['All Major (up to 7 accidentals)', 'Chromatic', 'All Melodic Minor (up to 7 accidentals)', 'All Harmonic Minor (up to 7 accidentals)'],
  },
  'tenor-sax': {
    'BASIC': ['C Major', 'F Major', 'G Major'],
    'ONE': ['C Major', 'F Major', 'G Major', 'Bb Major', 'C Chromatic', 'D Harmonic Minor'],
    'TWO': ['C Major', 'F Major', 'G Major', 'Bb Major', 'Eb Major', 'C Chromatic', 'D Harmonic Minor', 'G Harmonic Minor'],
    'THREE': ['All Major (up to 4 sharps/flats)', 'Chromatic', 'All Melodic Minor', 'All Harmonic Minor'],
    'FOUR': ['All Major', 'Chromatic', 'All Melodic Minor', 'All Harmonic Minor'],
    'FIVE': ['All Major (up to 7 accidentals)', 'Chromatic', 'All Melodic Minor (up to 7 accidentals)', 'All Harmonic Minor (up to 7 accidentals)'],
  },
  // Other instruments would follow the same pattern
};

/**
 * Get scale requirements for a specific instrument and level
 */
export function getScaleRequirements(instrumentId: string, level: string): string[] {
  return SCALE_REQUIREMENTS[instrumentId]?.[level] || [];
}

/**
 * Convert scale names from concert pitch to written pitch for an instrument
 */
export function convertScalesForInstrument(
  concertScales: string[],
  instrumentId: string
): string[] {
  // For now, return as-is since scale names are typically written in the instrument's key
  // Future: implement actual scale transposition
  return concertScales;
}

// ============================================================
// UTILITY FUNCTIONS
// ============================================================

/**
 * Get all instruments by family
 */
export function getInstrumentsByFamily(family: InstrumentFamily): InstrumentProfile[] {
  return Object.values(INSTRUMENTS).filter(inst => inst.family === family);
}

/**
 * Get all transposing instruments
 */
export function getTransposingInstruments(): InstrumentProfile[] {
  return Object.values(INSTRUMENTS).filter(inst => inst.isTransposing);
}

/**
 * Get all concert pitch instruments
 */
export function getConcertPitchInstruments(): InstrumentProfile[] {
  return Object.values(INSTRUMENTS).filter(inst => !inst.isTransposing);
}

/**
 * Check if an instrument ID is valid
 */
export function isValidInstrument(instrumentId: string): boolean {
  return instrumentId in INSTRUMENTS;
}

/**
 * Get instrument by ID
 */
export function getInstrument(instrumentId: string): InstrumentProfile | null {
  return INSTRUMENTS[instrumentId] || null;
}

/**
 * Get transposition description for display
 */
export function getTranspositionDescription(instrumentId: string): string {
  const instrument = INSTRUMENTS[instrumentId];
  if (!instrument) return 'Unknown instrument';
  
  if (!instrument.isTransposing) {
    return 'Concert pitch (C)';
  }
  
  const key = instrument.transpositionSemitones === 2 ? 'Bb' :
              instrument.transpositionSemitones === 9 ? 'Eb' :
              instrument.transpositionSemitones === 7 ? 'F' :
              instrument.transpositionSemitones === 14 ? 'Bb (octave)' :
              'Unknown';
  
  const direction = instrument.transpositionDirection === 'up' ? 'sounds higher' : 'sounds lower';
  
  return `${key} instrument - written C ${direction} than concert C`;
}
