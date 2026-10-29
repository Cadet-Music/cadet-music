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
// VERIFIED: Exact titles from A-CR-CCP-166/PT-001 (2003-06-01) Annex D, pages D1-2-15 to D1-2-16
export interface Song {
  id: string;
  title: string;
  composer?: string;
  list: 'A' | 'B';
  level: CadetLevel;
  book?: string;
  page?: string;
  rcmEquivalent?: string;
}

// Saxophone Prepared Music - Official Lists (Annex D, pages D1-2-15 to D1-2-16)
// Source: A-CR-CCP-166/PT-001 (2003-06-01)
export const SAXOPHONE_PREPARED_MUSIC: Song[] = [
  // BASIC - Official List (from D1-2-15)
  { id: 'sax-basic-a1', title: 'Western Portrait', list: 'A', level: 'BASIC', book: 'Best in Class', page: '19' },
  { id: 'sax-basic-a2', title: 'Austrian Melody', list: 'A', level: 'BASIC', book: 'Best in Class', page: '24-117' },
  { id: 'sax-basic-a3', title: 'The Minstrel Boy', list: 'A', level: 'BASIC', book: 'Best in Class', page: '28-136' },
  { id: 'sax-basic-b1', title: 'Ode to Joy', list: 'B', level: 'BASIC', book: 'Best in Class', page: '10' },
  { id: 'sax-basic-b2', title: 'America/God Save the Queen', list: 'B', level: 'BASIC', book: 'Best in Class', page: '32' },
  { id: 'sax-basic-b3', title: 'Scarborough Fair', list: 'B', level: 'BASIC', book: 'Best in Class', page: '29-138' },
  
  // ONE - Official List (from D1-2-15)
  { id: 'one-a1', title: 'Abendlied', list: 'A', level: 'ONE', book: 'Belwin Master Solos (Easy)', page: '3' },
  { id: 'one-a2', title: 'Andante', list: 'A', level: 'ONE', book: 'Belwin Master Solos (Easy)', page: '7' },
  { id: 'one-a3', title: 'Winter Dreams', list: 'A', level: 'ONE', book: 'Belwin Master Solos (Easy)', page: '8' },
  { id: 'one-a4', title: 'Aria', list: 'A', level: 'ONE', book: 'Belwin Master Solos (Easy)', page: '12' },
  { id: 'one-a5', title: 'Old Folks at Home', list: 'A', level: 'ONE', book: 'Rubank Elementary Method', page: '39-3' },
  { id: 'one-a6', title: 'Annie Laurie', list: 'A', level: 'ONE', book: 'Rubank Elementary Method', page: '39-4' },
  { id: 'one-a7', title: 'Lullaby', list: 'A', level: 'ONE', book: 'Rubank Intermediate Level', page: '14' },
  { id: 'one-b1', title: 'Gavotte', list: 'B', level: 'ONE', book: 'Belwin Master Solos (Easy)', page: '6' },
  { id: 'one-b2', title: 'Fandango', list: 'B', level: 'ONE', book: 'Belwin Master Solos (Easy)', page: '13' },
  { id: 'one-b3', title: 'Rigaudon', list: 'B', level: 'ONE', book: 'Belwin Master Solos (Easy)', page: '16' },
  { id: 'one-b4', title: 'Gavotte', list: 'B', level: 'ONE', book: 'Belwin Master Solos (Easy)', page: '9' },
  { id: 'one-b5', title: 'Scenes that are Brightest', list: 'B', level: 'ONE', book: 'Rubank Elementary Method', page: '44-5' },
  { id: 'one-b6', title: 'Waltz', list: 'B', level: 'ONE', book: 'Rubank Elementary Method', page: '43-3' },
  { id: 'one-b7', title: 'March', list: 'B', level: 'ONE', book: 'Rubank Elementary Method', page: '36-4' },
  
  // TWO - Official List (from D1-2-15)
  { id: 'two-a1', title: 'At the Hearth', list: 'A', level: 'TWO', book: 'Alto Saxophone Solos (easy)', page: '5' },
  { id: 'two-a2', title: 'Meadowland', list: 'A', level: 'TWO', book: 'Alto Saxophone Solos (easy)', page: '2' },
  { id: 'two-a3', title: 'Etude in D Minor', list: 'A', level: 'TWO', book: 'Rubank Intermediate Method', page: '24' },
  { id: 'two-a4', title: 'Andante', list: 'A', level: 'TWO', book: 'Rubank Intermediate Method', page: '32' },
  { id: 'two-a5', title: 'Loreley', list: 'A', level: 'TWO', book: 'Rubank Intermediate Method', page: '39' },
  { id: 'two-b1', title: 'Hunter Chorus', list: 'B', level: 'TWO', book: 'Rubank Intermediate Method', page: '17' },
  { id: 'two-b2', title: 'Polka', list: 'B', level: 'TWO', book: 'Rubank Intermediate Method', page: '28' },
  { id: 'two-b3', title: 'Duet – Brillant', list: 'B', level: 'TWO', book: 'Rubank Intermediate Method', page: '43' },
  
  // THREE - Official List (from D1-2-16) - Or selections from RCM Grade 2
  { id: 'three-a1', title: 'Air Gracile', list: 'A', level: 'THREE', book: 'Alto Saxophone Solos (easy)', page: '3', rcmEquivalent: 'RCM Grade 2' },
  { id: 'three-a2', title: 'Allerseelen', list: 'A', level: 'THREE', book: 'Alto Saxophone Solos (easy)', page: '6', rcmEquivalent: 'RCM Grade 2' },
  { id: 'three-a3', title: 'Concerto in Bb Minor', list: 'A', level: 'THREE', book: 'Alto Saxophone Solos (easy)', page: '9', rcmEquivalent: 'RCM Grade 2' },
  { id: 'three-a4', title: 'Romantic Piece', list: 'A', level: 'THREE', book: 'Solos for the Alto Sax Player', page: '9', rcmEquivalent: 'RCM Grade 2' },
  { id: 'three-a5', title: 'Andante Grazioso', list: 'A', level: 'THREE', book: 'Rubank Advanced Method I', page: '21', rcmEquivalent: 'RCM Grade 2' },
  { id: 'three-a6', title: 'On Wings of Song', list: 'A', level: 'THREE', book: 'Rubank Advanced Method I', page: '68', rcmEquivalent: 'RCM Grade 2' },
  { id: 'three-b1', title: 'Canzonetta and Giga', list: 'B', level: 'THREE', book: 'Concert and Contest', page: '6', rcmEquivalent: 'RCM Grade 2' },
  { id: 'three-b2', title: 'Allegro', list: 'B', level: 'THREE', book: 'Rubank Advanced Method I', page: '25', rcmEquivalent: 'RCM Grade 2' },
  { id: 'three-b3', title: 'Allegro Moderato', list: 'B', level: 'THREE', book: 'Rubank Advanced Method I', page: '40', rcmEquivalent: 'RCM Grade 2' },
  { id: 'three-b4', title: 'Allegretto Brillante', list: 'B', level: 'THREE', book: 'Rubank Advanced Method I', page: '70', rcmEquivalent: 'RCM Grade 2' },
  
  // FOUR - Official List (from D1-2-16) - Or selections from RCM Grade 4
  { id: 'four-a1', title: 'Romantic Piece', list: 'A', level: 'FOUR', book: 'Solos for the Alto Sax Player', page: '9', rcmEquivalent: 'RCM Grade 4' },
  { id: 'four-a2', title: 'Chartreuse', list: 'A', level: 'FOUR', book: 'Alto Saxophone Solos (easy)', page: '12', rcmEquivalent: 'RCM Grade 4' },
  { id: 'four-a3', title: 'Introduction and Rondo', list: 'A', level: 'FOUR', book: 'Concert and Contest', page: '14', rcmEquivalent: 'RCM Grade 4' },
  { id: 'four-a4', title: 'Album-Leaf', list: 'A', level: 'FOUR', book: 'Solos for the Alto Sax Player', page: '12', rcmEquivalent: 'RCM Grade 4' },
  { id: 'four-b1', title: 'Le Secret', list: 'B', level: 'FOUR', book: 'Alto Saxophone Solos (easy)', page: '14', rcmEquivalent: 'RCM Grade 4' },
  { id: 'four-b2', title: 'Minuet', list: 'B', level: 'FOUR', book: 'Solos for the Alto Sax Player', page: '15', rcmEquivalent: 'RCM Grade 4' },
  { id: 'four-b3', title: 'Sicilienne and Allegro', list: 'B', level: 'FOUR', book: 'Solos for the Alto Sax Player', page: '4', rcmEquivalent: 'RCM Grade 4' },
  
  // FIVE - Official List (from D1-2-16) - Or selections from RCM Grade 6
  { id: 'five-a1', title: 'Elegie', list: 'A', level: 'FIVE', book: 'Concert and Contest', page: '13', rcmEquivalent: 'RCM Grade 6' },
  { id: 'five-a2', title: 'Recitative and Allegro', list: 'A', level: 'FIVE', book: 'Concert and Contest', page: '16', rcmEquivalent: 'RCM Grade 6' },
  { id: 'five-a3', title: 'Vocalise', list: 'A', level: 'FIVE', book: 'Solos for the Alto Sax Player', page: '22', rcmEquivalent: 'RCM Grade 6' },
  { id: 'five-a4', title: 'Nocturne', list: 'A', level: 'FIVE', book: 'Solos for the Alto Sax Player', page: '7', rcmEquivalent: 'RCM Grade 6' },
  { id: 'five-a5', title: 'Larghetto', list: 'A', level: 'FIVE', book: 'Solos for the Alto Sax Player', page: '8', rcmEquivalent: 'RCM Grade 6' },
  { id: 'five-a6', title: 'Melodie', list: 'A', level: 'FIVE', book: 'Rubank Advanced Method II', page: '75', rcmEquivalent: 'RCM Grade 6' },
  { id: 'five-b1', title: 'Largo and Allegro', list: 'B', level: 'FIVE', book: 'Concert and Contest', page: '12', rcmEquivalent: 'RCM Grade 6' },
  { id: 'five-b2', title: 'Gypsy Rondo', list: 'B', level: 'FIVE', book: 'Solos for the Alto Sax Player', page: '13', rcmEquivalent: 'RCM Grade 6' },
  { id: 'five-b3', title: 'Fantaisie Mauresque', list: 'B', level: 'FIVE', book: 'Concert and Contest', page: '18', rcmEquivalent: 'RCM Grade 6' },
  { id: 'five-b4', title: 'Concertante', list: 'B', level: 'FIVE', book: 'Concert and Contest', page: '20', rcmEquivalent: 'RCM Grade 6' },
  { id: 'five-b5', title: 'Andante and Allegro', list: 'B', level: 'FIVE', book: 'Rubank Advanced Method II', page: '77', rcmEquivalent: 'RCM Grade 6' },
];

// CLARINET - Official List (pages D1-2-3 to D1-2-4)
// Source: A-CR-CCP-166/PT-001 (2003-06-01)
export const CLARINET_PREPARED_MUSIC: Song[] = [
  // BASIC
  { id: 'cl-basic-a1', title: 'Western Portrait', list: 'A', level: 'BASIC', book: 'Best in Class', page: '19' },
  { id: 'cl-basic-a2', title: 'Austrian Melody', list: 'A', level: 'BASIC', book: 'Best in Class', page: '24-117' },
  { id: 'cl-basic-a3', title: 'The Minstrel Boy', list: 'A', level: 'BASIC', book: 'Best in Class', page: '28-136' },
  { id: 'cl-basic-b1', title: 'Ode to Joy', list: 'B', level: 'BASIC', book: 'Best in Class', page: '10' },
  { id: 'cl-basic-b2', title: 'America/God Save the Queen', list: 'B', level: 'BASIC', book: 'Best in Class', page: '32' },
  { id: 'cl-basic-b3', title: 'Scarborough Fair', list: 'B', level: 'BASIC', book: 'Best in Class', page: '29-138' },
  
  // ONE
  { id: 'cl-one-a1', title: 'Rigaudon', list: 'A', level: 'ONE', book: 'Belwin Master Solos (Easy)', page: '3' },
  { id: 'cl-one-a2', title: 'Elegy', list: 'A', level: 'ONE', book: 'Belwin Master Solos (Easy)', page: '5' },
  { id: 'cl-one-a3', title: 'Professional', list: 'A', level: 'ONE', book: 'Belwin Master Solos (Easy)', page: '6' },
  { id: 'cl-one-a4', title: 'It is Enough', list: 'A', level: 'ONE', book: 'First Solos for the Clarinet Player', page: '33' },
  { id: 'cl-one-a5', title: 'Drink to me only with Thine Eyes', list: 'A', level: 'ONE', book: 'Rubank Elementary Method', page: '24' },
  { id: 'cl-one-a6', title: 'America the Beautiful', list: 'A', level: 'ONE', book: 'Rubank Elementary Method', page: '42' },
  { id: 'cl-one-a7', title: 'Meloday', list: 'A', level: 'ONE', book: 'Rubank Elementary Method', page: '44' },
  { id: 'cl-one-b1', title: 'March', list: 'B', level: 'ONE', book: 'Belwin Master Solos (Easy)', page: '4' },
  { id: 'cl-one-b2', title: 'Rio Grande', list: 'B', level: 'ONE', book: 'Belwin Master Solos (Easy)', page: '7' },
  { id: 'cl-one-b3', title: 'Bouree', list: 'B', level: 'ONE', book: 'Belwin Master Solos (Easy)', page: '11' },
  { id: 'cl-one-b4', title: 'Professional', list: 'B', level: 'ONE', book: 'Belwin Master Solos (Easy)', page: '13' },
  { id: 'cl-one-b5', title: 'Rondo', list: 'B', level: 'ONE', book: 'Belwin Master Solos (Easy)', page: '16' },
  { id: 'cl-one-b6', title: 'Tramp! Tramp! Tramp!', list: 'B', level: 'ONE', book: 'Rubank Elementary Method', page: '34' },
  { id: 'cl-one-b7', title: 'Come Back to Erin', list: 'B', level: 'ONE', book: 'Rubank Elementary Method', page: '42' },
  
  // TWO
  { id: 'cl-two-a1', title: 'Duet', list: 'A', level: 'TWO', book: 'Rubank Intermediate Method', page: '19' },
  { id: 'cl-two-a2', title: 'Petite Duet', list: 'A', level: 'TWO', book: 'Rubank Intermediate Method', page: '26' },
  { id: 'cl-two-a3', title: 'Sarabande', list: 'A', level: 'TWO', book: 'Belwin Master Solos (Easy)', page: '12' },
  { id: 'cl-two-a4', title: 'Aria', list: 'A', level: 'TWO', book: 'Belwin Master Solos (Easy)', page: '15' },
  { id: 'cl-two-a5', title: 'Two Chinese Folk Songs (I – Song of Hoe)', list: 'A', level: 'TWO', book: 'Belwin Master Solos (Easy)', page: '8' },
  { id: 'cl-two-b1', title: 'Andante', list: 'B', level: 'TWO', book: 'Rubank Intermediate Method', page: '49' },
  { id: 'cl-two-b2', title: 'Legato Duet', list: 'B', level: 'TWO', book: 'Rubank Intermediate Method', page: '12' },
  { id: 'cl-two-b3', title: 'Russian Folk Song', list: 'B', level: 'TWO', book: 'Belwin Master Solos (Easy)', page: '10' },
  { id: 'cl-two-b4', title: 'Two Chinese Folk Songs (II – The Filial Crow)', list: 'B', level: 'TWO', book: 'Belwin Master Solos (Easy)', page: '9' },
  
  // THREE (or RCM Grade 2)
  { id: 'cl-three-a1', title: 'Solveig\'s Song', list: 'A', level: 'THREE', book: 'First Solos for the Clarinet Player', page: '9', rcmEquivalent: 'RCM Grade 2' },
  { id: 'cl-three-a2', title: 'The Lonely Birch Tree', list: 'A', level: 'THREE', book: 'Clarinets Solos', page: '8', rcmEquivalent: 'RCM Grade 2' },
  { id: 'cl-three-a3', title: 'Andante No. 18', list: 'A', level: 'THREE', book: 'Rubank Advanced Method 1', page: '40', rcmEquivalent: 'RCM Grade 2' },
  { id: 'cl-three-b1', title: 'Wild Horseman', list: 'B', level: 'THREE', book: 'First Solos for the Clarinet Player', page: '4', rcmEquivalent: 'RCM Grade 2' },
  { id: 'cl-three-b2', title: 'Caprice No. 14', list: 'B', level: 'THREE', book: 'Rubank Advanced Method 1', page: '74', rcmEquivalent: 'RCM Grade 2' },
  { id: 'cl-three-b3', title: 'Andante Cantabile', list: 'B', level: 'THREE', book: 'Rubank Intermediate Level', page: '50', rcmEquivalent: 'RCM Grade 2' },
  { id: 'cl-three-b4', title: 'Duet Brillant', list: 'B', level: 'THREE', book: 'Rubank Intermediate Level', page: '43', rcmEquivalent: 'RCM Grade 2' },
  
  // FOUR (or RCM Grade 4)
  { id: 'cl-four-a1', title: 'Intermezzo Tango', list: 'A', level: 'FOUR', book: 'First Solos for the Clarinet Player', page: '12', rcmEquivalent: 'RCM Grade 4' },
  { id: 'cl-four-a2', title: 'Romance from Clarinet', list: 'A', level: 'FOUR', book: 'First Solos for the Clarinet Player', page: '16', rcmEquivalent: 'RCM Grade 4' },
  { id: 'cl-four-a3', title: 'Two Pieces (at the Brook and Intermezzo)', list: 'A', level: 'FOUR', book: 'Concert and Contest', page: '28', rcmEquivalent: 'RCM Grade 4' },
  { id: 'cl-four-b1', title: 'Alleluia – Mozart', list: 'B', level: 'FOUR', book: 'Solos for the Clarinet Player', page: '35', rcmEquivalent: 'RCM Grade 4' },
  { id: 'cl-four-b2', title: 'Andante - close', list: 'B', level: 'FOUR', book: 'Rubank Advanced Method 1', page: '71', rcmEquivalent: 'RCM Grade 4' },
  { id: 'cl-four-b3', title: 'Larghetto', list: 'B', level: 'FOUR', book: 'Rubank Advanced Method 1', page: '68', rcmEquivalent: 'RCM Grade 4' },
  
  // FIVE (or RCM Grade 6)
  { id: 'cl-five-a1', title: 'Larghetto', list: 'A', level: 'FIVE', book: 'Solos for the Clarinet Player', page: '20', rcmEquivalent: 'RCM Grade 6' },
  { id: 'cl-five-a2', title: 'Larghetto from Clarinet Quartet', composer: 'Mozart', list: 'A', level: 'FIVE', rcmEquivalent: 'RCM Grade 6' },
  { id: 'cl-five-a3', title: 'Nocturne', composer: 'Bassi', list: 'A', level: 'FIVE', rcmEquivalent: 'RCM Grade 6' },
  { id: 'cl-five-b1', title: 'Promenade', list: 'B', level: 'FIVE', book: 'Concert and Contest', page: '14', rcmEquivalent: 'RCM Grade 6' },
  { id: 'cl-five-b2', title: 'Variations Sentimentales', list: 'B', level: 'FIVE', book: 'Rubank Advanced Method II', page: '72', rcmEquivalent: 'RCM Grade 6' },
  { id: 'cl-five-b3', title: 'Two Dances', composer: 'Kymlicka', list: 'B', level: 'FIVE', rcmEquivalent: 'RCM Grade 6' },
  { id: 'cl-five-b4', title: 'Divertimento in Bb', composer: 'Mozart', list: 'B', level: 'FIVE', rcmEquivalent: 'RCM Grade 6' },
];

// BASS CLARINET - Uses same repertoire as clarinet (transposed down)
export const BASS_CLARINET_PREPARED_MUSIC: Song[] = CLARINET_PREPARED_MUSIC.map(song => ({
  ...song,
  id: song.id.replace('cl-', 'bcl-'),
}));

// Get songs for a specific level and instrument
export const getSongsForLevel = (level: CadetLevel, instrument: string = 'alto-sax'): { listA: Song[]; listB: Song[] } => {
  let songs: Song[];
  
  if (instrument === 'clarinet') {
    songs = CLARINET_PREPARED_MUSIC.filter(s => s.level === level);
  } else if (instrument === 'bass-clarinet') {
    songs = BASS_CLARINET_PREPARED_MUSIC.filter(s => s.level === level);
  } else {
    songs = SAXOPHONE_PREPARED_MUSIC.filter(s => s.level === level);
  }
  
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

// Legacy compatibility (defaults to saxophone)
export const BASIC_SONGS = SAXOPHONE_PREPARED_MUSIC.filter(s => s.level === 'BASIC');
export const LEVEL_A_SONGS = SAXOPHONE_PREPARED_MUSIC.filter(s => s.level === 'ONE' && s.list === 'A');
export const LEVEL_B_SONGS = SAXOPHONE_PREPARED_MUSIC.filter(s => s.level === 'ONE' && s.list === 'B');

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
    id: 'pre-basic',
    title: 'PRE-BASIC: Absolute Beginner',
    level: -1,
    lessons: [
      { id: 'pre-intro', title: 'Welcome to Music', type: 'theory', emoji: '🎵', topic: 'Introduction', xp: 10, description: 'What is music and why we play', interactive: false, level: 'BASIC' as CadetLevel },
      { id: 'pre-instrument-care', title: 'Instrument Care Basics', type: 'playing', emoji: '🧹', topic: 'Care', xp: 10, description: 'How to handle and care for your instrument', interactive: true, level: 'BASIC' as CadetLevel },
      { id: 'pre-posture', title: 'Basic Posture', type: 'playing', emoji: '🧍', topic: 'Posture', xp: 10, description: 'How to stand and hold your instrument', interactive: true, level: 'BASIC' as CadetLevel },
      { id: 'pre-breathing', title: 'Breathing Basics', type: 'playing', emoji: '💨', topic: 'Breathing', xp: 15, description: 'How to breathe properly', interactive: true, level: 'BASIC' as CadetLevel },
      { id: 'pre-embouchure', title: 'Embouchure Introduction', type: 'playing', emoji: '👄', topic: 'Embouchure', xp: 15, description: 'How to form your mouth', interactive: true, level: 'BASIC' as CadetLevel },
      { id: 'pre-first-sound', title: 'Making Your First Sound', type: 'playing', emoji: '🎶', topic: 'First Sound', xp: 20, description: 'Producing your first note', interactive: true, level: 'BASIC' as CadetLevel },
      { id: 'pre-assembly', title: 'Assembly and Disassembly', type: 'playing', emoji: '🔧', topic: 'Assembly', xp: 15, description: 'How to put your instrument together', interactive: true, level: 'BASIC' as CadetLevel },
      { id: 'pre-exam', title: 'Pre-Basic Assessment', type: 'exam', emoji: '📝', topic: 'Assessment', xp: 30, description: 'Complete the Pre-Basic level', interactive: false, level: 'BASIC' as CadetLevel },
    ],
  },
  {
    id: 'clarinet-basic',
    title: 'CLARINET BASIC',
    level: 0,
    lessons: [
      { id: 'clarinet-intro', title: 'Meet Your Clarinet', type: 'playing', emoji: '🎵', topic: 'Instrument', xp: 10, description: 'Learn the parts of your clarinet', interactive: true, level: 'BASIC' as CadetLevel },
      { id: 'clarinet-maintenance', title: 'Clarinet Care', type: 'playing', emoji: '🧹', topic: 'PO 450', xp: 10, description: 'Assembly and daily care', interactive: true, level: 'BASIC' as CadetLevel, po: 450 },
      { id: 'clarinet-posture', title: 'Clarinet Posture', type: 'playing', emoji: '🧍', topic: 'PO 451', xp: 15, description: 'Proper holding position', interactive: true, level: 'BASIC' as CadetLevel, po: 451 },
      { id: 'clarinet-embouchure', title: 'Clarinet Embouchure', type: 'playing', emoji: '👄', topic: 'Embouchure', xp: 20, description: 'Milkshake face and proper formation', interactive: true, level: 'BASIC' as CadetLevel, po: 451 },
      { id: 'clarinet-breathing', title: 'Breathing and Air Support', type: 'playing', emoji: '💨', topic: 'Breathing', xp: 15, description: 'Diaphragmatic breathing for clarinet', interactive: true, level: 'BASIC' as CadetLevel, po: 451 },
      { id: 'clarinet-first-sound', title: 'First Sound on Clarinet', type: 'playing', emoji: '🎶', topic: 'First Sound', xp: 20, description: 'Producing your first tone', interactive: true, level: 'BASIC' as CadetLevel, po: 451 },
      { id: 'clarinet-notes', title: 'First Notes: E, D, C', type: 'playing', emoji: '🎵', topic: 'First Notes', xp: 20, description: 'Your first three notes', interactive: true, level: 'BASIC' as CadetLevel, po: 451 },
      { id: 'clarinet-rhythm', title: 'Quarter Notes', type: 'rhythm', emoji: '🥁', topic: 'Rhythm', xp: 15, description: 'Basic rhythm patterns', interactive: true, level: 'BASIC' as CadetLevel, po: 451 },
      { id: 'clarinet-staff', title: 'The Music Staff', type: 'theory', emoji: '📜', topic: 'Music Staff', xp: 10, description: 'Lines, spaces, and clefs', interactive: false, level: 'BASIC' as CadetLevel, po: 458 },
      { id: 'clarinet-note-names', title: 'Note Names', type: 'theory', emoji: '🎼', topic: 'Note Reading', xp: 15, description: 'Reading notes on the staff', interactive: true, level: 'BASIC' as CadetLevel, po: 458 },
      { id: 'clarinet-time-sigs', title: 'Time Signatures', type: 'theory', emoji: '⏱️', topic: 'Time Signatures', xp: 15, description: 'Understanding 4/4, 3/4, 2/4 time', interactive: true, level: 'BASIC' as CadetLevel, po: 458 },
      { id: 'clarinet-dynamics', title: 'Dynamics', type: 'theory', emoji: '🔊', topic: 'Dynamics', xp: 10, description: 'Volume markings: p, mp, mf, f', interactive: true, level: 'BASIC' as CadetLevel, po: 458 },
      { id: 'clarinet-tuning', title: 'Tuning Basics', type: 'theory', emoji: '🎯', topic: 'Tuning', xp: 15, description: 'How to tune your clarinet', interactive: true, level: 'BASIC' as CadetLevel, po: 453 },
      { id: 'clarinet-register', title: 'Register Key and Clarion Register', type: 'playing', emoji: '🔑', topic: 'Registers', xp: 25, description: 'Understanding the register key', interactive: true, level: 'BASIC' as CadetLevel, po: 451 },
      { id: 'clarinet-drill', title: 'Band Drill Basics', type: 'playing', emoji: '🎖️', topic: 'Band Drill', xp: 10, description: 'Position and movement', interactive: false, level: 'BASIC' as CadetLevel, po: 459 },
      { id: 'clarinet-song-western', title: '🎵 Song: Western Portrait', type: 'playing', emoji: '🎼', topic: 'Prepared Music', xp: 50, description: 'Learn your first complete song', interactive: true, level: 'BASIC' as CadetLevel, po: 454, requiresMicrophone: true },
      { id: 'clarinet-song-ode', title: '🎵 Song: Ode to Joy', type: 'playing', emoji: '🎼', topic: 'Prepared Music', xp: 50, description: 'Learn the famous Beethoven melody', interactive: true, level: 'BASIC' as CadetLevel, po: 454, requiresMicrophone: true },
      { id: 'clarinet-exam', title: 'Clarinet Basic Assessment', type: 'exam', emoji: '📝', topic: 'Exam', xp: 50, description: 'Complete the BASIC level', interactive: false, level: 'BASIC' as CadetLevel },
    ],
  },
  {
    id: 'basic',
    title: 'BASIC',
    level: 0,
    lessons: [
      { id: 'basic-intro', title: 'Meet Your Saxophone', type: 'playing', emoji: '🎷', topic: 'Instrument', xp: 10, description: 'Learn the parts of your instrument', interactive: true, level: 'BASIC' as CadetLevel },
      { id: 'basic-maintenance', title: 'Daily Care', type: 'playing', emoji: '🧹', topic: 'Maintenance', xp: 10, description: 'Swabbing and reed care', interactive: true, level: 'BASIC' as CadetLevel, po: 450 },
      { id: 'basic-posture', title: 'Posture & Hold', type: 'playing', emoji: '🧍', topic: 'Posture', xp: 15, description: 'Proper playing position', interactive: true, level: 'BASIC' as CadetLevel, po: 451 },
      { id: 'basic-embouchure', title: 'Embouchure', type: 'playing', emoji: '👄', topic: 'Embouchure', xp: 20, description: 'Proper mouth position', interactive: true, level: 'BASIC' as CadetLevel, po: 451 },
      { id: 'basic-breathing', title: 'Breathing & Air Support', type: 'playing', emoji: '💨', topic: 'Breathing', xp: 15, description: 'Diaphragmatic breathing', interactive: true, level: 'BASIC' as CadetLevel, po: 451 },
      { id: 'basic-first-sound', title: 'First Sound', type: 'playing', emoji: '🎶', topic: 'First Sound', xp: 20, description: 'Producing your first tone', interactive: true, level: 'BASIC' as CadetLevel, po: 451 },
      { id: 'basic-first-notes', title: 'First Notes: B, A, G', type: 'playing', emoji: '🎵', topic: 'First Notes', xp: 20, description: 'Your first three notes', interactive: true, level: 'BASIC' as CadetLevel, po: 451 },
      { id: 'basic-more-notes', title: 'More Notes: F, E, D', type: 'playing', emoji: '🎵', topic: 'More Notes', xp: 20, description: 'Adding right hand notes', interactive: true, level: 'BASIC' as CadetLevel, po: 451 },
      { id: 'basic-low-c', title: 'Low C & Complete Range', type: 'playing', emoji: '🎵', topic: 'Complete Range', xp: 25, description: 'Your first full octave', interactive: true, level: 'BASIC' as CadetLevel, po: 451 },
      { id: 'basic-rhythm', title: 'Quarter Notes', type: 'rhythm', emoji: '🥁', topic: 'Rhythm', xp: 15, description: 'Basic rhythm patterns', interactive: true, level: 'BASIC' as CadetLevel, po: 451 },
      { id: 'basic-staff', title: 'The Music Staff', type: 'theory', emoji: '📜', topic: 'Music Staff', xp: 10, description: 'Lines, spaces, and clefs', interactive: false, level: 'BASIC' as CadetLevel, po: 458 },
      { id: 'basic-notes', title: 'Note Names', type: 'theory', emoji: '🎼', topic: 'Note Reading', xp: 15, description: 'Reading notes on the staff', interactive: true, level: 'BASIC' as CadetLevel, po: 458 },
      { id: 'basic-time-sigs', title: 'Time Signatures', type: 'theory', emoji: '⏱️', topic: 'Time Signatures', xp: 15, description: 'Understanding 4/4, 3/4, 2/4 time', interactive: true, level: 'BASIC' as CadetLevel, po: 458 },
      { id: 'basic-dynamics', title: 'Dynamics', type: 'theory', emoji: '🔊', topic: 'Dynamics', xp: 10, description: 'Volume markings: p, mp, mf, f', interactive: true, level: 'BASIC' as CadetLevel, po: 458 },
      { id: 'basic-repeat-signs', title: 'Repeat Signs', type: 'theory', emoji: '🔁', topic: 'Navigation', xp: 10, description: 'D.C., D.S., endings, and repeats', interactive: true, level: 'BASIC' as CadetLevel, po: 458 },
      { id: 'basic-tuning', title: 'Tuning Basics', type: 'theory', emoji: '🎯', topic: 'Tuning', xp: 15, description: 'How to tune your saxophone', interactive: true, level: 'BASIC' as CadetLevel, po: 453 },
      { id: 'basic-long-tones', title: 'Long Tones', type: 'playing', emoji: '🎵', topic: 'Tone Quality', xp: 20, description: 'Developing a beautiful tone', interactive: true, level: 'BASIC' as CadetLevel, po: 451 },
      { id: 'basic-tonguing', title: 'Basic Tonguing', type: 'playing', emoji: '👅', topic: 'Articulation', xp: 20, description: 'Starting notes with your tongue', interactive: true, level: 'BASIC' as CadetLevel, po: 451 },
      { id: 'basic-articulation', title: 'Articulation Types', type: 'playing', emoji: '🎵', topic: 'Articulation', xp: 25, description: 'Staccato, legato, and accents', interactive: true, level: 'BASIC' as CadetLevel, po: 451 },
      { id: 'basic-phrasing', title: 'Musical Phrasing', type: 'playing', emoji: '🎼', topic: 'Phrasing', xp: 25, description: 'Shaping musical sentences', interactive: true, level: 'BASIC' as CadetLevel, po: 451 },
      { id: 'basic-drill', title: 'Band Drill Basics', type: 'playing', emoji: '🎖️', topic: 'Band Drill', xp: 10, description: 'Position and movement', interactive: false, level: 'BASIC' as CadetLevel, po: 459 },
      { id: 'audio-basic-note', title: 'Audio Practice: Note G', type: 'audio', emoji: '🎤', topic: 'Audio Practice', xp: 20, description: 'Practice playing the note G with your instrument', interactive: true, level: 'BASIC' as CadetLevel, po: 451, requiresMicrophone: true },
      { id: 'audio-basic-scale', title: 'Audio Practice: Bb Major Scale', type: 'audio', emoji: '🎤', topic: 'Audio Practice', xp: 30, description: 'Practice the Bb Major scale with your instrument', interactive: true, level: 'BASIC' as CadetLevel, po: 451, requiresMicrophone: true },
      { id: 'song-western-portrait', title: '🎵 Song: Western Portrait', type: 'playing', emoji: '🎼', topic: 'Prepared Music', xp: 50, description: 'Learn your first complete song step by step with microphone guidance', interactive: true, level: 'BASIC' as CadetLevel, po: 454, requiresMicrophone: true },
      { id: 'song-austrian-melody', title: '🎵 Song: Austrian Melody', type: 'playing', emoji: '🎼', topic: 'Prepared Music', xp: 50, description: 'Learn this beautiful melody step by step', interactive: true, level: 'BASIC' as CadetLevel, po: 454, requiresMicrophone: true },
      { id: 'song-minstrel-boy', title: '🎵 Song: The Minstrel Boy', type: 'playing', emoji: '🎼', topic: 'Prepared Music', xp: 50, description: 'Learn this Irish folk song', interactive: true, level: 'BASIC' as CadetLevel, po: 454, requiresMicrophone: true },
      { id: 'song-ode-to-joy', title: '🎵 Song: Ode to Joy', type: 'playing', emoji: '🎼', topic: 'Prepared Music', xp: 50, description: 'Learn the famous Beethoven melody with microphone guidance', interactive: true, level: 'BASIC' as CadetLevel, po: 454, requiresMicrophone: true },
      { id: 'song-america', title: '🎵 Song: America', type: 'playing', emoji: '🎼', topic: 'Prepared Music', xp: 50, description: 'Learn this patriotic hymn', interactive: true, level: 'BASIC' as CadetLevel, po: 454, requiresMicrophone: true },
      { id: 'song-scarborough-fair', title: '🎵 Song: Scarborough Fair', type: 'playing', emoji: '🎼', topic: 'Prepared Music', xp: 50, description: 'Learn this traditional English folk song', interactive: true, level: 'BASIC' as CadetLevel, po: 454, requiresMicrophone: true },
      { id: 'basic-exam', title: 'Basic Assessment', type: 'exam', emoji: '📝', topic: 'Exam', xp: 50, description: 'Complete the BASIC level', interactive: false, level: 'BASIC' as CadetLevel },
    ],
  },
  {
    id: 'one',
    title: 'LEVEL ONE',
    level: 1,
    lessons: [
      { id: 'one-maintenance', title: 'Cork Care', type: 'playing', emoji: '🔧', topic: 'Maintenance', xp: 10, description: 'Lubrication and care', interactive: false, level: 'ONE' as CadetLevel, po: 450 },
      { id: 'one-scales', title: 'Major Scales', type: 'playing', emoji: '🎹', topic: 'Scales', xp: 25, description: 'Bb, Eb, F Major (♩=66)', interactive: true, level: 'ONE' as CadetLevel, po: 451 },
      { id: 'one-chromatic', title: 'Chromatic Scale', type: 'playing', emoji: '🎼', topic: 'Chromatic Scale', xp: 25, description: 'All 12 notes', interactive: true, level: 'ONE' as CadetLevel, po: 451 },
      { id: 'one-harmonic', title: 'Harmonic Minor', type: 'playing', emoji: '🎶', topic: 'Minor Scales', xp: 25, description: 'Minor scale patterns', interactive: true, level: 'ONE' as CadetLevel, po: 451 },
      { id: 'one-eighth', title: 'Eighth Notes', type: 'rhythm', emoji: '🎵', topic: 'Eighth Notes', xp: 15, description: 'Faster rhythms', interactive: true, level: 'ONE' as CadetLevel, po: 451 },
      { id: 'one-intonation', title: 'Tuning Skills', type: 'theory', emoji: '🎯', topic: 'Tuning', xp: 20, description: 'Adjusting to tuning note', interactive: true, level: 'ONE' as CadetLevel, po: 453 },
      { id: 'one-key-sigs', title: 'Key Signatures', type: 'theory', emoji: '🔑', topic: 'Key Signatures', xp: 20, description: 'Reading key signatures', interactive: true, level: 'ONE' as CadetLevel, po: 458 },
      { id: 'one-accidentals', title: 'Accidentals', type: 'theory', emoji: '♯♭', topic: 'Accidentals', xp: 15, description: 'Sharps, flats, and naturals', interactive: true, level: 'ONE' as CadetLevel, po: 458 },
      { id: 'one-articulation', title: 'Articulation', type: 'playing', emoji: '👅', topic: 'Articulation', xp: 20, description: 'Staccato, legato, accents', interactive: true, level: 'ONE' as CadetLevel, po: 451 },
      { id: 'one-sight', title: 'Sight Reading Intro', type: 'theory', emoji: '👁️', topic: 'Sight Reading', xp: 15, description: '16 bars with assistance', interactive: true, level: 'ONE' as CadetLevel, po: 456 },
      { id: 'one-aural', title: 'Aural Skills', type: 'theory', emoji: '👂', topic: 'Aural Skills', xp: 15, description: 'Ear training basics', interactive: true, level: 'ONE' as CadetLevel, po: 457 },
      { id: 'one-drill', title: 'Drill Movements', type: 'playing', emoji: '🎖️', topic: 'Band Drill', xp: 10, description: 'Marching basics', interactive: false, level: 'ONE' as CadetLevel, po: 459 },
      { id: 'audio-pattern', title: 'Audio Practice: Arpeggio Pattern', type: 'audio', emoji: '🎤', topic: 'Audio Practice', xp: 35, description: 'Practice playing arpeggio patterns with your instrument', interactive: true, level: 'ONE' as CadetLevel, po: 451, requiresMicrophone: true },
      { id: 'audio-scale', title: 'Audio Practice: Major Scale', type: 'audio', emoji: '🎤', topic: 'Audio Practice', xp: 35, description: 'Practice major scales with microphone feedback', interactive: true, level: 'ONE' as CadetLevel, po: 451, requiresMicrophone: true },
      { id: 'song-abendlied', title: '🎵 Song: Abendlied', type: 'playing', emoji: '🎼', topic: 'Prepared Music', xp: 50, description: 'Learn "Abendlied" step by step with microphone guidance', interactive: true, level: 'ONE' as CadetLevel, po: 454, requiresMicrophone: true },
      { id: 'song-andante', title: '🎵 Song: Andante', type: 'playing', emoji: '🎼', topic: 'Prepared Music', xp: 50, description: 'Learn this Mozart melody', interactive: true, level: 'ONE' as CadetLevel, po: 454, requiresMicrophone: true },
      { id: 'song-gavotte', title: '🎵 Song: Gavotte', type: 'playing', emoji: '🎼', topic: 'Prepared Music', xp: 50, description: 'Learn "Gavotte" step by step with microphone guidance', interactive: true, level: 'ONE' as CadetLevel, po: 454, requiresMicrophone: true },
      { id: 'song-fandango', title: '🎵 Song: Fandango', type: 'playing', emoji: '🎼', topic: 'Prepared Music', xp: 50, description: 'Learn this lively dance', interactive: true, level: 'ONE' as CadetLevel, po: 454, requiresMicrophone: true },
      { id: 'one-exam', title: 'Level One Assessment', type: 'exam', emoji: '📝', topic: 'Exam', xp: 75, description: 'Complete Level ONE', interactive: false, level: 'ONE' as CadetLevel },
    ],
  },
  {
    id: 'two',
    title: 'LEVEL TWO',
    level: 2,
    lessons: [
      { id: 'two-maintenance', title: 'Pad Care', type: 'playing', emoji: '🔧', topic: 'Maintenance', xp: 10, description: 'Cleaning grease from pads', interactive: false, level: 'TWO' as CadetLevel, po: 450 },
      { id: 'two-scales', title: 'Scales at ♩=72', type: 'playing', emoji: '🎹', topic: 'Scales', xp: 30, description: 'Faster scale playing', interactive: true, level: 'TWO' as CadetLevel, po: 451 },
      { id: 'two-more-keys', title: 'Additional Keys', type: 'playing', emoji: '🎼', topic: 'Additional Keys', xp: 25, description: 'Db Major and more', interactive: true, level: 'TWO' as CadetLevel, po: 451 },
      { id: 'two-intonation', title: 'Intonation Skills', type: 'playing', emoji: '🎯', topic: 'Intonation', xp: 20, description: 'Critical: Adjust to tuning note', interactive: true, level: 'TWO' as CadetLevel, po: 453 },
      { id: 'two-intervals', title: 'Intervals', type: 'theory', emoji: '📏', topic: 'Intervals', xp: 25, description: 'Critical: Seconds and thirds', interactive: true, level: 'TWO' as CadetLevel, po: 458 },
      { id: 'two-chords', title: 'Chords', type: 'theory', emoji: '🎼', topic: 'Chords', xp: 25, description: 'Critical: Triads and harmony', interactive: true, level: 'TWO' as CadetLevel, po: 458 },
      { id: 'two-transposition', title: 'Transposition', type: 'theory', emoji: '🔄', topic: 'Transposition', xp: 20, description: 'Transposing melodies', interactive: true, level: 'TWO' as CadetLevel, po: 458 },
      { id: 'two-aural', title: 'Aural Skills', type: 'theory', emoji: '👂', topic: 'Aural Skills', xp: 15, description: 'Ear training basics', interactive: true, level: 'TWO' as CadetLevel, po: 457 },
      { id: 'two-sight', title: 'Sight Reading', type: 'theory', emoji: '👁️', topic: 'Sight Reading', xp: 15, description: '16 bars with assistance', interactive: true, level: 'TWO' as CadetLevel, po: 456 },
      { id: 'two-drill', title: 'Drill Movements', type: 'playing', emoji: '🎖️', topic: 'Band Drill', xp: 10, description: 'Advanced marching', interactive: false, level: 'TWO' as CadetLevel, po: 459 },
      { id: 'audio-intervals', title: 'Audio Practice: Intervals', type: 'audio', emoji: '🎤', topic: 'Audio Practice', xp: 35, description: 'Practice intervals with microphone', interactive: true, level: 'TWO' as CadetLevel, po: 451, requiresMicrophone: true },
      { id: 'song-hearth', title: '🎵 Song: At the Hearth', type: 'playing', emoji: '🎼', topic: 'Prepared Music', xp: 50, description: 'Learn this Level TWO piece', interactive: true, level: 'TWO' as CadetLevel, po: 454, requiresMicrophone: true },
      { id: 'song-meadowland', title: '🎵 Song: Meadowland', type: 'playing', emoji: '🎼', topic: 'Prepared Music', xp: 50, description: 'Learn this Russian folk song', interactive: true, level: 'TWO' as CadetLevel, po: 454, requiresMicrophone: true },
      { id: 'song-hunter', title: '🎵 Song: Hunter Chorus', type: 'playing', emoji: '🎼', topic: 'Prepared Music', xp: 50, description: 'Learn this Weber piece', interactive: true, level: 'TWO' as CadetLevel, po: 454, requiresMicrophone: true },
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
