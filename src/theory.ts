// Canadian Cadet Organization Music Theory Program (A-CR-CCP-166/PT-004)
// Theory curriculum for all 6 levels

import { CadetLevel } from './data';

export interface TheoryTopic {
  id: string;
  title: string;
  description: string;
  level: CadetLevel;
  subtopics: string[];
}

export const THEORY_CURRICULUM: Record<CadetLevel, TheoryTopic[]> = {
  'BASIC': [
    {
      id: 'basic-staff',
      title: 'The Staff',
      description: 'Five lines and four spaces, counted bottom to top',
      level: 'BASIC',
      subtopics: [
        'Five lines and four spaces',
        'Lines and spaces counted bottom to top',
        'Treble (G) clef',
        'Bass (F) clef',
        'Ledger lines for notes outside the staff'
      ]
    },
    {
      id: 'basic-notes',
      title: 'Note Values',
      description: 'Whole, half, quarter, eighth, sixteenth notes and rests',
      level: 'BASIC',
      subtopics: [
        'Whole note (4 beats)',
        'Half note (2 beats)',
        'Quarter note (1 beat)',
        'Eighth note (1/2 beat)',
        'Sixteenth note (1/4 beat)',
        'Matching rests for each note value'
      ]
    },
    {
      id: 'basic-time',
      title: 'Time Signatures',
      description: '2/4, 3/4, 4/4 and common time',
      level: 'BASIC',
      subtopics: [
        '2/4 time (2 beats per measure)',
        '3/4 time (3 beats per measure)',
        '4/4 time (4 beats per measure)',
        'Common time (C) = 4/4',
        'Bar lines and measures'
      ]
    },
    {
      id: 'basic-navigation',
      title: 'Navigation Marks',
      description: 'Repeat signs, endings, D.C., D.S., al Fine, to Coda',
      level: 'BASIC',
      subtopics: [
        'Double bar lines',
        'Repeat signs',
        '1st and 2nd endings',
        'D.C. (Da Capo)',
        'D.S. (Dal Segno)',
        'Al Fine',
        'To Coda'
      ]
    },
    {
      id: 'basic-dynamics',
      title: 'Dynamics',
      description: 'Volume markings from ppp to fff',
      level: 'BASIC',
      subtopics: [
        'ppp (pianississimo - very very soft)',
        'pp (pianissimo - very soft)',
        'p (piano - soft)',
        'mp (mezzo piano - medium soft)',
        'mf (mezzo forte - medium loud)',
        'f (forte - loud)',
        'ff (fortissimo - very loud)',
        'fff (fortississimo - very very loud)',
        'cresc. (crescendo - getting louder)',
        'decresc. (decrescendo - getting softer)'
      ]
    }
  ],

  'ONE': [
    {
      id: 'one-dotted',
      title: 'Dotted Notes',
      description: 'Dots add half the value; second dot adds half of first dot',
      level: 'ONE',
      subtopics: [
        'Dotted half note (3 beats)',
        'Dotted quarter note (1.5 beats)',
        'Dotted eighth note (3/4 beat)',
        'Double-dotted notes',
        'Dotted rests'
      ]
    },
    {
      id: 'one-semitones',
      title: 'Tones and Semitones',
      description: 'Whole steps and half steps, diatonic and chromatic',
      level: 'ONE',
      subtopics: [
        'Tone (whole step)',
        'Semitone (half step)',
        'Diatonic semitones',
        'Chromatic semitones'
      ]
    },
    {
      id: 'one-accidentals',
      title: 'Accidentals',
      description: 'Sharp, flat, natural, double sharp, double flat',
      level: 'ONE',
      subtopics: [
        'Sharp (raises by semitone)',
        'Flat (lowers by semitone)',
        'Natural (cancels accidental)',
        'Double sharp (raises by tone)',
        'Double flat (lowers by tone)',
        'Accidental lasts through the measure'
      ]
    },
    {
      id: 'one-keysigs',
      title: 'Key Signatures',
      description: 'Order of sharps and flats, major scales',
      level: 'ONE',
      subtopics: [
        'Order of sharps: F C G D A E B',
        'Order of flats: B E A D G C F',
        'Major scales with sharps',
        'Major scales with flats',
        'Tetrachord structure',
        'Circle of fifths'
      ]
    },
    {
      id: 'one-minor',
      title: 'Minor Scales',
      description: 'Relative minor scales: natural and harmonic',
      level: 'ONE',
      subtopics: [
        'Relative minor (6th degree of major)',
        'Natural minor scale',
        'Harmonic minor scale (raised 7th)',
        'Arpeggios (I, III, V, VIII)'
      ]
    },
    {
      id: 'one-beats',
      title: 'Beats and Tempo',
      description: 'Simple time, strong/weak beats, tempo terms',
      level: 'ONE',
      subtopics: [
        'Simple time signatures (2, 3, 4 beats)',
        'Strong and weak beats',
        'Fermata (hold)',
        'Tempo: Largo to Presto',
        'Ritardando (gradually slower)',
        'Accelerando (gradually faster)',
        'A tempo (return to original tempo)'
      ]
    },
    {
      id: 'one-articulation',
      title: 'Articulations',
      description: 'Tie, slur, legato, staccato, accent, marcato, tenuto',
      level: 'ONE',
      subtopics: [
        'Tie (connects same pitch)',
        'Slur (connects different pitches)',
        'Legato (smooth)',
        'Staccato (detached)',
        'Accent (emphasized)',
        'Marcato (marked)',
        'Tenuto (held full value)'
      ]
    }
  ],

  'TWO': [
    {
      id: 'two-triplets',
      title: 'Triplets',
      description: 'Three notes in the time of two',
      level: 'TWO',
      subtopics: [
        'Quarter note triplets',
        'Eighth note triplets',
        'Triplet notation'
      ]
    },
    {
      id: 'two-compound',
      title: 'Compound Time',
      description: '6/8, 9/8, 12/8, grouped in dotted beats',
      level: 'TWO',
      subtopics: [
        '6/8 time (2 dotted quarter beats)',
        '9/8 time (3 dotted quarter beats)',
        '12/8 time (4 dotted quarter beats)',
        'Grouping in dotted beats'
      ]
    },
    {
      id: 'two-degrees',
      title: 'Scale Degrees',
      description: 'Tonic, supertonic, mediant, subdominant, dominant, submediant, leading note',
      level: 'TWO',
      subtopics: [
        '1st: Tonic',
        '2nd: Supertonic',
        '3rd: Mediant',
        '4th: Subdominant',
        '5th: Dominant',
        '6th: Submediant',
        '7th: Leading note'
      ]
    },
    {
      id: 'two-findingkey',
      title: 'Finding the Key',
      description: 'From key signature and final note',
      level: 'TWO',
      subtopics: [
        'Using key signature',
        'Using final note',
        'Major vs minor determination'
      ]
    },
    {
      id: 'two-intervals',
      title: 'Intervals',
      description: 'Size and quality for seconds and thirds',
      level: 'TWO',
      subtopics: [
        'Interval size (2nd, 3rd, etc.)',
        'Major and minor seconds',
        'Major and minor thirds',
        'Interval quality'
      ]
    },
    {
      id: 'two-transpose',
      title: 'Transposition',
      description: 'Transposing a melody an octave higher or lower',
      level: 'TWO',
      subtopics: [
        'Transposing up an octave',
        'Transposing down an octave',
        'Reading ledger lines'
      ]
    }
  ],

  'THREE': [
    {
      id: 'three-timesigs',
      title: 'All Time Signatures',
      description: 'Regular time signatures including 2/2, 3/2, 3/8, 9/8, 12/16',
      level: 'THREE',
      subtopics: [
        '2/2 (Cut time)',
        '3/2 time',
        '3/8 time',
        '9/8 time',
        '12/16 time',
        'Irregular groupings'
      ]
    },
    {
      id: 'three-intervals',
      title: 'All Intervals',
      description: 'Perfect, major, minor, augmented, diminished, inversions',
      level: 'THREE',
      subtopics: [
        'Perfect intervals (unison, 4th, 5th, octave)',
        'Major and minor intervals',
        'Augmented intervals',
        'Diminished intervals',
        'Inverted intervals (sizes add to nine)',
        'Interval quality changes'
      ]
    },
    {
      id: 'three-melodic',
      title: 'Melodic Minor Scale',
      description: '6th and 7th degrees raised ascending, lowered descending',
      level: 'THREE',
      subtopics: [
        'Ascending form (raised 6th and 7th)',
        'Descending form (natural minor)',
        'Comparison with harmonic minor',
        'Melodic minor in all keys'
      ]
    },
    {
      id: 'three-triads',
      title: 'Triads',
      description: 'Three-note chords: major and minor, root, third, fifth',
      level: 'THREE',
      subtopics: [
        'Major triad structure',
        'Minor triad structure',
        'Building triads from root',
        'Third and fifth intervals',
        'Triads in all keys'
      ]
    },
    {
      id: 'three-tempo',
      title: 'Tempo and Style Terms',
      description: 'Piu mosso, meno mosso, animato, con moto, espressivo, etc.',
      level: 'THREE',
      subtopics: [
        'Piu mosso (more motion)',
        'Meno mosso (less motion)',
        'Animato (animated)',
        'Con moto (with motion)',
        'Espressivo (expressive)',
        'Leggiero (light)',
        'Maestoso (majestic)',
        'Tranquillo (tranquil)',
        'Non troppo (not too much)',
        'Troppo (too much)',
        'Molto (much)',
        'Simile (similar)'
      ]
    },
    {
      id: 'three-transpose',
      title: 'Transposition by Major 2nd',
      description: 'Transposing up or down a major second, changing key and clef',
      level: 'THREE',
      subtopics: [
        'Transposing up a major 2nd',
        'Transposing down a major 2nd',
        'Changing key signature',
        'Changing clef if needed',
        'Adjusting accidentals'
      ]
    }
  ],

  'FOUR': [
    {
      id: 'four-irregular',
      title: 'Irregular Time Signatures',
      description: 'Five or seven beats with dotted line between sub-measures',
      level: 'FOUR',
      subtopics: [
        '5/4 time (3+2 or 2+3)',
        '7/4 time (3+2+2 or 2+2+3)',
        '5/8 time',
        '7/8 time',
        'Dotted line between sub-measures'
      ]
    },
    {
      id: 'four-findingkey',
      title: 'Finding Key (No Signature)',
      description: 'Using sharps/flats in melody and last note',
      level: 'FOUR',
      subtopics: [
        'Analyzing accidentals in melody',
        'Using final note as tonic',
        'Determining major vs minor',
        'Modal considerations'
      ]
    },
    {
      id: 'four-intervals',
      title: 'Sixths and Sevenths',
      description: 'Major and minor sixths and sevenths, complementary intervals',
      level: 'FOUR',
      subtopics: [
        'Major and minor sixths',
        'Major and minor sevenths',
        'Complementary intervals',
        'Interval inversion rules'
      ]
    },
    {
      id: 'four-chords',
      title: 'Chords on Scale Degrees',
      description: 'Major, minor, diminished, augmented triads in major and minor keys',
      level: 'FOUR',
      subtopics: [
        'Chords in major keys',
        'Chords in harmonic minor keys',
        'Major triads (I, IV, V)',
        'Minor triads (ii, iii, vi)',
        'Diminished triads (vii°)',
        'Augmented triads (III+)',
        'Triad roles and functions'
      ]
    },
    {
      id: 'four-cadences',
      title: 'Cadences',
      description: 'Perfect (V-I), Plagal (IV-I), Imperfect/Half, Deceptive (V-VI)',
      level: 'FOUR',
      subtopics: [
        'Perfect cadence (V-I)',
        'Plagal cadence (IV-I) - "Amen"',
        'Imperfect/Half cadence (ends on V)',
        'Deceptive cadence (V-VI)',
        'Cadence recognition',
        'Cadence in context'
      ]
    },
    {
      id: 'four-errors',
      title: 'Error Detection',
      description: 'Clef, key signature, time signature, bar lines, stems, dynamics, etc.',
      level: 'FOUR',
      subtopics: [
        'Clef errors',
        'Key signature order errors',
        'Time signature placement',
        'Bar line errors',
        'Stem direction',
        'Dynamics placement',
        'Tempo marking placement',
        'Articulation errors',
        'Beaming errors',
        'Accidental errors'
      ]
    },
    {
      id: 'four-transpose',
      title: 'Transposition by Any Interval',
      description: 'Five-step method: key, new key, key signature, transpose notes, add accidentals',
      level: 'FOUR',
      subtopics: [
        'Step 1: Identify original key',
        'Step 2: Determine new key',
        'Step 3: Write new key signature',
        'Step 4: Transpose each note',
        'Step 5: Add necessary accidentals',
        'Transposition by any interval'
      ]
    },
    {
      id: 'four-tempo',
      title: 'Advanced Tempo Terms',
      description: 'Come prima, l\'istesso tempo, rubato, brillante, cantabile, etc.',
      level: 'FOUR',
      subtopics: [
        'Come prima (as before)',
        'L\'istesso tempo (same speed)',
        'Rubato (stolen time)',
        'Brillante (brilliant)',
        'Cantabile (singing style)',
        'Con brio (with vigor)',
        'Dolce (sweet)',
        'Grave (slow and solemn)',
        'Grazioso (graceful)'
      ]
    }
  ],

  'FIVE': [
    {
      id: 'five-clefs',
      title: 'C Clefs',
      description: 'Alto clef (3rd line) and tenor clef (4th line), middle C position',
      level: 'FIVE',
      subtopics: [
        'Alto clef (viola, alto trombone)',
        'Tenor clef (cello, tenor trombone)',
        'Middle C on 3rd line (alto)',
        'Middle C on 4th line (tenor)',
        'Reading in C clefs'
      ]
    },
    {
      id: 'five-intervals',
      title: 'Full Interval Spectrum',
      description: 'Diminished, minor, major, augmented, double accidentals',
      level: 'FIVE',
      subtopics: [
        'All interval qualities',
        'Double sharps and double flats',
        'No respelling double accidentals',
        'Complex interval recognition'
      ]
    },
    {
      id: 'five-chords',
      title: 'Diminished and Augmented Chords',
      description: 'Diminished (m3 + d5) and augmented (M3 + A5)',
      level: 'FIVE',
      subtopics: [
        'Diminished triad structure',
        'Minor third + diminished fifth',
        'Augmented triad structure',
        'Major third + augmented fifth',
        'Chord identification'
      ]
    },
    {
      id: 'five-inversions',
      title: 'Triad Inversions',
      description: 'Root position, first inversion (3rd in bass), second inversion (5th in bass)',
      level: 'FIVE',
      subtopics: [
        'Root position (root in bass)',
        'First inversion (3rd in bass)',
        'Second inversion (5th in bass)',
        'Inversion notation',
        'Bass line analysis'
      ]
    },
    {
      id: 'five-dominant7',
      title: 'Dominant Seventh Chords',
      description: 'V7: root, major 3rd, perfect 5th, minor 7th, three inversions',
      level: 'FIVE',
      subtopics: [
        'Dominant 7th structure',
        'Root, major 3rd, perfect 5th, minor 7th',
        'Root position',
        'First inversion (6/5)',
        'Second inversion (4/3)',
        'Third inversion (4/2 or 2)',
        'V7 resolution'
      ]
    },
    {
      id: 'five-transposing',
      title: 'Transposing for Instruments',
      description: 'Real pitch vs written pitch, Bb, Eb, tenor sax transposition',
      level: 'FIVE',
      subtopics: [
        'Bb instruments (trumpet, clarinet, tenor sax)',
        'Written major 2nd above sounding pitch',
        'Eb alto sax',
        'Written major 6th above sounding pitch',
        'Tenor sax',
        'Raised by major 9th',
        'Bass clarinet transposition',
        'Baritone sax transposition',
        'No shortcuts - use correct intervals'
      ]
    },
    {
      id: 'five-cadence',
      title: 'Cadence Writing',
      description: 'State key, choose chords, bass in bass clef, keep common tones',
      level: 'FIVE',
      subtopics: [
        'State the key',
        'Choose appropriate chords',
        'Bass line in bass clef',
        'Keep common tones in same voice',
        'Voice leading principles',
        'Four-part writing'
      ]
    },
    {
      id: 'five-scores',
      title: 'Short and Open Score',
      description: 'Condensed score vs one staff per voice, string quartet clefs',
      level: 'FIVE',
      subtopics: [
        'Short score (condensed)',
        'Open score (one staff per voice)',
        'String quartet clefs',
        '1st violin (treble clef)',
        '2nd violin (treble clef)',
        'Viola (alto clef)',
        'Cello (bass clef)',
        'Score reading'
      ]
    }
  ]
};

// Glossary of Italian and French terms
export const GLOSSARY: Record<string, { translation: string; language: string; category: string }> = {
  'a cappella': { translation: 'in chapel style (without accompaniment)', language: 'Italian', category: 'Style' },
  'accent': { translation: 'emphasized', language: 'Italian', category: 'Articulation' },
  'adagio': { translation: 'slow', language: 'Italian', category: 'Tempo' },
  'allegro': { translation: 'fast, lively', language: 'Italian', category: 'Tempo' },
  'andante': { translation: 'walking pace', language: 'Italian', category: 'Tempo' },
  'animato': { translation: 'animated', language: 'Italian', category: 'Style' },
  'arpeggio': { translation: 'like a harp (broken chord)', language: 'Italian', category: 'Technique' },
  'brillante': { translation: 'brilliant', language: 'Italian', category: 'Style' },
  'cantabile': { translation: 'in singing style', language: 'Italian', category: 'Style' },
  'con brio': { translation: 'with vigor', language: 'Italian', category: 'Style' },
  'con moto': { translation: 'with motion', language: 'Italian', category: 'Style' },
  'crescendo': { translation: 'growing (getting louder)', language: 'Italian', category: 'Dynamics' },
  'decrescendo': { translation: 'decreasing (getting softer)', language: 'Italian', category: 'Dynamics' },
  'dolce': { translation: 'sweet', language: 'Italian', category: 'Style' },
  'espressivo': { translation: 'expressive', language: 'Italian', category: 'Style' },
  'forte': { translation: 'loud', language: 'Italian', category: 'Dynamics' },
  'fortissimo': { translation: 'very loud', language: 'Italian', category: 'Dynamics' },
  'grazioso': { translation: 'graceful', language: 'Italian', category: 'Style' },
  'grave': { translation: 'slow and solemn', language: 'Italian', category: 'Tempo' },
  'legato': { translation: 'smooth, connected', language: 'Italian', category: 'Articulation' },
  'leggiero': { translation: 'light', language: 'Italian', category: 'Style' },
  'lento': { translation: 'slow', language: 'Italian', category: 'Tempo' },
  'maestoso': { translation: 'majestic', language: 'Italian', category: 'Style' },
  'marcato': { translation: 'marked, emphasized', language: 'Italian', category: 'Articulation' },
  'meno mosso': { translation: 'less motion', language: 'Italian', category: 'Tempo' },
  'molto': { translation: 'much, very', language: 'Italian', category: 'Modifier' },
  'morendo': { translation: 'dying', language: 'Italian', category: 'Style' },
  'non troppo': { translation: 'not too much', language: 'Italian', category: 'Modifier' },
  'piano': { translation: 'soft', language: 'Italian', category: 'Dynamics' },
  'piu mosso': { translation: 'more motion', language: 'Italian', category: 'Tempo' },
  'poco': { translation: 'little', language: 'Italian', category: 'Modifier' },
  'prestissimo': { translation: 'very very fast', language: 'Italian', category: 'Tempo' },
  'presto': { translation: 'very fast', language: 'Italian', category: 'Tempo' },
  'rinforzando': { translation: 'reinforcing', language: 'Italian', category: 'Dynamics' },
  'scherzando': { translation: 'playful', language: 'Italian', category: 'Style' },
  'staccato': { translation: 'detached', language: 'Italian', category: 'Articulation' },
  'tenuto': { translation: 'held', language: 'Italian', category: 'Articulation' },
  'tranquillo': { translation: 'tranquil', language: 'Italian', category: 'Style' },
  'tre corde': { translation: 'three strings', language: 'Italian', category: 'Technique' },
  'troppo': { translation: 'too much', language: 'Italian', category: 'Modifier' },
  'vivo': { translation: 'lively', language: 'Italian', category: 'Tempo' },
  // French terms
  'bien marque': { translation: 'well marked', language: 'French', category: 'Style' },
  'cessez': { translation: 'stop', language: 'French', category: 'Technique' },
  'doux': { translation: 'soft, gentle', language: 'French', category: 'Style' },
  'etouffe': { translation: 'muted', language: 'French', category: 'Technique' },
  'laissez vibrer': { translation: 'let vibrate', language: 'French', category: 'Technique' },
  'lent': { translation: 'slow', language: 'French', category: 'Tempo' },
  'mesure': { translation: 'measure', language: 'French', category: 'Theory' },
  'nuance': { translation: 'shade, nuance', language: 'French', category: 'Dynamics' },
  'retenu': { translation: 'held back', language: 'French', category: 'Tempo' },
};

// Helper function to get theory topics for a level
export const getTheoryTopicsForLevel = (level: CadetLevel): TheoryTopic[] => {
  return THEORY_CURRICULUM[level] || [];
};

// Helper function to get all theory topics
export const getAllTheoryTopics = (): TheoryTopic[] => {
  return Object.values(THEORY_CURRICULUM).flat();
};

// Helper function to search glossary
export const searchGlossary = (query: string): Array<{ term: string; definition: { translation: string; language: string; category: string } }> => {
  const lowerQuery = query.toLowerCase();
  return Object.entries(GLOSSARY)
    .filter(([term, def]) => 
      term.toLowerCase().includes(lowerQuery) || 
      def.translation.toLowerCase().includes(lowerQuery) ||
      def.category.toLowerCase().includes(lowerQuery)
    )
    .map(([term, definition]) => ({ term, definition }));
};
