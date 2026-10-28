/**
 * Level Standards and Goals
 * 
 * Defines what truly differentiates each level beyond just song repertoire.
 * Each level has specific, measurable goals for technical skills, tone quality,
 * musicianship, and overall proficiency.
 * 
 * Based on Canadian Cadet Organization standards (A-CR-CCP-166/PT-001)
 */

import { CadetLevel } from './data';

export interface LevelStandard {
  level: CadetLevel;
  title: string;
  description: string;
  
  // Technical Skills
  scales: {
    required: string[];
    tempo: number; // BPM
    range: string; // e.g., "1 octave", "2 octaves"
    memorization: boolean;
    articulations: string[];
  };
  
  // Tone Quality
  tone: {
    description: string;
    characteristics: string[];
    commonIssues: string[];
  };
  
  // Rhythm & Timing
  rhythm: {
    noteValues: string[];
    timeSignatures: string[];
    tempoRange: { min: number; max: number };
    accuracy: string;
  };
  
  // Intonation
  intonation: {
    standard: string;
    tolerance: string; // e.g., "±10 cents"
    skills: string[];
  };
  
  // Articulation
  articulation: {
    required: string[];
    execution: string;
    speed: string;
  };
  
  // Sight Reading
  sightReading: {
    length: string; // e.g., "16 bars"
    difficulty: string;
    assistance: boolean;
    accuracy: string;
  };
  
  // Musicianship
  musicianship: {
    dynamics: string[];
    phrasing: string;
    expression: string;
    style: string[];
  };
  
  // Specific Measurable Goals
  goals: {
    technical: string[];
    musical: string[];
    performance: string[];
  };
  
  // Assessment Criteria
  assessment: {
    passRequirements: string[];
    excellenceIndicators: string[];
  };
}

export const LEVEL_STANDARDS: Record<CadetLevel, LevelStandard> = {
  'BASIC': {
    level: 'BASIC',
    title: 'Foundation Level',
    description: 'Building fundamental skills and establishing proper technique. Focus on developing a good tone, basic rhythm, and correct fingerings.',
    
    scales: {
      required: ['Bb Major', 'F Major'],
      tempo: 60,
      range: '1 octave',
      memorization: false,
      articulations: ['all tongued'],
    },
    
    tone: {
      description: 'Developing a clear, centered tone with basic control',
      characteristics: [
        'Clear pitch center',
        'Minimal air noise',
        'Consistent volume across middle register',
        'Basic dynamic control (p, mf, f)',
      ],
      commonIssues: [
        'Airy or fuzzy tone',
        'Squeaking on low notes',
        'Inconsistent volume',
        'Pitch instability',
      ],
    },
    
    rhythm: {
      noteValues: ['whole', 'half', 'quarter', 'eighth'],
      timeSignatures: ['4/4', '3/4'],
      tempoRange: { min: 60, max: 100 },
      accuracy: 'Steady beat with minimal rushing or dragging',
    },
    
    intonation: {
      standard: 'Recognizes when pitch is sharp or flat when told',
      tolerance: '±25 cents',
      skills: [
        'Can identify if pitch is high or low',
        'Understands need to adjust',
        'Beginning to develop ear for pitch',
      ],
    },
    
    articulation: {
      required: ['basic tonguing', 'legato', 'staccato'],
      execution: 'Clear note beginnings with tongue',
      speed: 'Moderate tempo (♩=60-80)',
    },
    
    sightReading: {
      length: 'N/A',
      difficulty: 'N/A',
      assistance: false,
      accuracy: 'N/A',
    },
    
    musicianship: {
      dynamics: ['p', 'mp', 'mf', 'f'],
      phrasing: 'Basic phrase recognition (4-bar phrases)',
      expression: 'Following basic dynamic markings',
      style: ['simple melodies', 'folk songs', 'hymns'],
    },
    
    goals: {
      technical: [
        'Play Bb Major and F Major scales at ♩=60',
        'Maintain consistent tone across middle register',
        'Execute basic tonguing cleanly',
        'Read music in 4/4 and 3/4 time',
        'Play with steady rhythm',
      ],
      musical: [
        'Recognize and play basic dynamics (p, mf, f)',
        'Understand phrase structure',
        'Play with basic expression',
        'Listen and match pitch with others',
      ],
      performance: [
        'Perform 2 prepared pieces from memory',
        'Play with confidence in front of others',
        'Maintain composure during performance',
        'Recover from mistakes gracefully',
      ],
    },
    
    assessment: {
      passRequirements: [
        'Can play both required scales at tempo',
        'Produces clear tone most of the time',
        'Maintains steady rhythm',
        'Reads basic notation correctly',
        'Performs prepared pieces with minimal errors',
      ],
      excellenceIndicators: [
        'Consistently clear tone',
        'Excellent rhythm accuracy',
        'Musical phrasing',
        'Confident performance',
        'Quick learning of new material',
      ],
    },
  },
  
  'ONE': {
    level: 'ONE',
    title: 'Developing Musician',
    description: 'Expanding technical ability and musical understanding. Developing consistent tone quality and rhythmic precision.',
    
    scales: {
      required: ['Bb Major', 'Eb Major', 'F Major', 'C Major (chromatic)', 'A Minor (harmonic)'],
      tempo: 66,
      range: '1 octave',
      memorization: false,
      articulations: ['all tongued', 'all slurred'],
    },
    
    tone: {
      description: 'Developing a consistent, focused tone with improved control',
      characteristics: [
        'Focused tone center',
        'Good projection',
        'Consistent tone quality across register',
        'Improved dynamic control (pp to ff)',
        'Better intonation stability',
      ],
      commonIssues: [
        'Tone breaks between registers',
        'Inconsistent embouchure',
        'Limited dynamic range',
        'Intonation issues in extreme registers',
      ],
    },
    
    rhythm: {
      noteValues: ['whole', 'half', 'quarter', 'eighth', 'sixteenth'],
      timeSignatures: ['4/4', '3/4', '2/4', '6/8'],
      tempoRange: { min: 70, max: 110 },
      accuracy: 'Accurate rhythm with good subdivision',
    },
    
    intonation: {
      standard: 'May be unsure if pitch is sharp or flat, adjusts when instructed',
      tolerance: '±20 cents',
      skills: [
        'Can adjust pitch when told',
        'Beginning to hear intonation issues',
        'Understanding of tuning process',
      ],
    },
    
    articulation: {
      required: ['staccato', 'legato', 'accent', 'tenuto'],
      execution: 'Clear, controlled articulation at moderate tempos',
      speed: 'Moderate to fast tempo (♩=70-100)',
    },
    
    sightReading: {
      length: 'Up to 16 bars',
      difficulty: 'One level below current',
      assistance: true,
      accuracy: 'Can read with assistance, maintaining rhythm',
    },
    
    musicianship: {
      dynamics: ['pp', 'p', 'mp', 'mf', 'f', 'ff'],
      phrasing: 'Understanding of musical phrases and breathing points',
      expression: 'Basic dynamic shaping, simple crescendos and decrescendos',
      style: ['classical melodies', 'folk songs', 'simple jazz'],
    },
    
    goals: {
      technical: [
        'Play all required scales at ♩=66 with both tongued and slurred articulations',
        'Maintain consistent tone across full range',
        'Execute all articulations cleanly',
        'Read music in all common time signatures',
        'Sight read simple pieces with assistance',
      ],
      musical: [
        'Play with good dynamic contrast',
        'Shape musical phrases appropriately',
        'Understand different musical styles',
        'Play in tune with ensemble',
        'Interpret basic musical markings',
      ],
      performance: [
        'Perform 2 prepared pieces with musicality',
        'Sight read at Level ONE level',
        'Play confidently in ensemble setting',
        'Demonstrate good stage presence',
      ],
    },
    
    assessment: {
      passRequirements: [
        'Can play all scales at required tempo',
        'Consistent tone quality',
        'Accurate rhythm and articulation',
        'Good intonation most of the time',
        'Musical performance of prepared pieces',
      ],
      excellenceIndicators: [
        'Excellent tone control',
        'Precise rhythm and articulation',
        'Musical sensitivity',
        'Strong sight reading',
        'Confident, polished performances',
      ],
    },
  },
  
  'TWO': {
    level: 'TWO',
    title: 'Competent Performer',
    description: 'Developing technical proficiency and musical maturity. Critical focus on intonation and ensemble skills.',
    
    scales: {
      required: ['Bb Major', 'Eb Major', 'F Major', 'Ab Major', 'Db Major', 'C Major (chromatic)', 'A Minor', 'F# Minor (harmonic)'],
      tempo: 72,
      range: '1 octave',
      memorization: false,
      articulations: ['all tongued', 'all slurred', 'mixed articulations'],
    },
    
    tone: {
      description: 'Developing a rich, projecting tone with excellent control',
      characteristics: [
        'Rich, full tone quality',
        'Excellent projection',
        'Seamless register transitions',
        'Wide dynamic range with control',
        'Stable intonation',
        'Good tone matching with ensemble',
      ],
      commonIssues: [
        'Tone quality inconsistencies',
        'Register transitions not seamless',
        'Limited dynamic control at extremes',
        'Intonation drift during long phrases',
      ],
    },
    
    rhythm: {
      noteValues: ['all standard values', 'simple syncopation', 'triplets'],
      timeSignatures: ['all common signatures', 'compound time (6/8, 9/8, 12/8)'],
      tempoRange: { min: 80, max: 120 },
      accuracy: 'Precise rhythm with excellent subdivision',
    },
    
    intonation: {
      standard: 'CRITICAL - Identifies sharp or flat against tuning note and adjusts',
      tolerance: '±15 cents',
      skills: [
        'Can independently identify intonation issues',
        'Can adjust pitch quickly and accurately',
        'Understands intonation tendencies of instrument',
        'Can match intonation with ensemble',
      ],
    },
    
    articulation: {
      required: ['all standard articulations', 'combined articulations', 'various articulation patterns'],
      execution: 'Precise, controlled articulation at faster tempos',
      speed: 'Fast tempo (♩=80-120)',
    },
    
    sightReading: {
      length: 'Up to 16 bars',
      difficulty: 'One level below current',
      assistance: true,
      accuracy: 'Can read with good accuracy, maintaining musicality',
    },
    
    musicianship: {
      dynamics: ['full dynamic range with control', 'crescendo and decrescendo', 'sudden dynamic changes'],
      phrasing: 'Excellent phrase shaping, understanding of musical structure',
      expression: 'Good musical expression, style awareness',
      style: ['classical', 'jazz', 'folk', 'popular'],
    },
    
    goals: {
      technical: [
        'Play all scales at ♩=72 with various articulations',
        'Excellent tone quality across full range',
        'Precise intonation with ability to adjust',
        'Clean articulation at fast tempos',
        'Good sight reading ability',
      ],
      musical: [
        'Excellent dynamic control and contrast',
        'Musical phrasing and expression',
        'Understanding of different styles',
        'Good ensemble intonation',
        'Interpret musical markings effectively',
      ],
      performance: [
        'Perform prepared pieces with musicality and confidence',
        'Sight read at Level TWO level',
        'Play well in ensemble settings',
        'Demonstrate musical maturity',
      ],
    },
    
    assessment: {
      passRequirements: [
        'All scales at required tempo with good tone',
        'CRITICAL: Can identify and adjust intonation',
        'Precise rhythm and articulation',
        'Good sight reading',
        'Musical performances',
      ],
      excellenceIndicators: [
        'Excellent tone quality and control',
        'Precise intonation with quick adjustments',
        'Musical maturity and expression',
        'Strong sight reading',
        'Outstanding ensemble skills',
      ],
    },
  },
  
  'THREE': {
    level: 'THREE',
    title: 'Advanced Musician',
    description: 'Achieving technical mastery and musical sophistication. Focus on advanced techniques and expressive performance.',
    
    scales: {
      required: ['All major scales (up to 4 sharps/flats)', 'All minor scales (melodic and harmonic)', 'Chromatic scale'],
      tempo: 60,
      range: '2 octaves',
      memorization: true,
      articulations: ['all articulations', 'complex patterns', 'varied articulations within scale'],
    },
    
    tone: {
      description: 'Achieving a beautiful, consistent tone with excellent control and color',
      characteristics: [
        'Beautiful, singing tone quality',
        'Excellent control across full range',
        'Wide color palette',
        'Seamless register transitions',
        'Excellent dynamic control (ppp to fff)',
        'Stable intonation in all registers',
      ],
      commonIssues: [
        'Tone color inconsistencies',
        'Extreme register control issues',
        'Limited dynamic palette',
        'Intonation challenges in extreme registers',
      ],
    },
    
    rhythm: {
      noteValues: ['all values', 'complex syncopation', 'irregular groupings'],
      timeSignatures: ['all signatures', 'irregular meters (5/4, 7/8)'],
      tempoRange: { min: 60, max: 140 },
      accuracy: 'Excellent rhythm with complex patterns',
    },
    
    intonation: {
      standard: 'CRITICAL - Identifies sharp or flat against tuning note and adjusts',
      tolerance: '±10 cents',
      skills: [
        'Excellent intonation awareness',
        'Quick, accurate pitch adjustments',
        'Can adjust intonation in context of harmony',
        'Understands intonation in different keys',
      ],
    },
    
    articulation: {
      required: ['all articulations', 'complex combinations', 'historical styles'],
      execution: 'Excellent control and precision at all tempos',
      speed: 'Very fast tempo (♪=60)',
    },
    
    sightReading: {
      length: 'Up to 16 bars',
      difficulty: 'One level below current',
      assistance: true,
      accuracy: 'Can read with excellent accuracy and musicality',
    },
    
    musicianship: {
      dynamics: ['complete dynamic control', 'subtle dynamic shading', 'dramatic contrasts'],
      phrasing: 'Excellent phrase shaping, understanding of musical architecture',
      expression: 'Strong musical expression, personal interpretation',
      style: ['all major styles', 'historical performance practice', 'jazz improvisation basics'],
    },
    
    goals: {
      technical: [
        'Play all scales (2 octaves) from memory at ♪=60',
        'Beautiful, consistent tone across full range',
        'Excellent intonation with quick adjustments',
        'Master all articulations at fast tempos',
        'Strong sight reading ability',
      ],
      musical: [
        'Excellent dynamic control and shading',
        'Sophisticated phrasing and expression',
        'Understanding of multiple styles',
        'Personal musical interpretation',
        'Excellent ensemble musicianship',
      ],
      performance: [
        'Perform with musical sophistication',
        'Sight read at Level THREE level',
        'Excel in ensemble settings',
        'Demonstrate artistic maturity',
      ],
    },
    
    assessment: {
      passRequirements: [
        'All scales from memory at tempo',
        'CRITICAL: Excellent intonation control',
        'Beautiful tone quality',
        'Strong articulation control',
        'Good sight reading',
        'Musical performances',
      ],
      excellenceIndicators: [
        'Exceptional tone beauty and control',
        'Perfect intonation',
        'Artistic musicality',
        'Excellent sight reading',
        'Outstanding musical maturity',
      ],
    },
  },
  
  'FOUR': {
    level: 'FOUR',
    title: 'Proficient Performer',
    description: 'Demonstrating advanced technical command and artistic maturity. Focus on refined musicianship and performance excellence.',
    
    scales: {
      required: ['All major scales', 'All minor scales (melodic and harmonic)', 'Chromatic scale', 'Whole tone scale'],
      tempo: 72,
      range: '2 octaves',
      memorization: true,
      articulations: ['all articulations', 'complex patterns', 'style-specific articulations'],
    },
    
    tone: {
      description: 'Achieving a refined, beautiful tone with exceptional control and variety',
      characteristics: [
        'Refined, beautiful tone quality',
        'Exceptional control in all registers',
        'Wide variety of tone colors',
        'Seamless technical execution',
        'Complete dynamic control',
        'Excellent intonation stability',
      ],
      commonIssues: [
        'Minor tone inconsistencies',
        'Extreme register challenges',
        'Complex passage clarity',
        'Endurance in long performances',
      ],
    },
    
    rhythm: {
      noteValues: ['all values', 'complex rhythms', 'polyrhythms'],
      timeSignatures: ['all signatures', 'complex meters', 'changing meters'],
      tempoRange: { min: 50, max: 160 },
      accuracy: 'Perfect rhythm with complex patterns',
    },
    
    intonation: {
      standard: 'CRITICAL - Identifies sharp or flat in ensemble and adjusts',
      tolerance: '±8 cents',
      skills: [
        'Exceptional intonation in ensemble context',
        'Can adjust to different tuning systems',
        'Understands harmonic intonation',
        'Can lead ensemble intonation',
      ],
    },
    
    articulation: {
      required: ['all articulations', 'historical styles', 'complex combinations'],
      execution: 'Perfect control at all tempos and dynamics',
      speed: 'Very fast tempo (♪=72)',
    },
    
    sightReading: {
      length: 'Up to 32 bars',
      difficulty: 'At current level',
      assistance: false,
      accuracy: 'Can read accurately without assistance',
    },
    
    musicianship: {
      dynamics: ['complete dynamic mastery', 'subtle shading', 'dramatic contrast'],
      phrasing: 'Masterful phrase shaping, architectural understanding',
      expression: 'Deep musical expression, compelling interpretation',
      style: ['all styles', 'historical performance practice', 'improvisation'],
    },
    
    goals: {
      technical: [
        'Play all scales (2 octaves) from memory at ♪=72',
        'Refined, beautiful tone with exceptional control',
        'Perfect intonation in ensemble context',
        'Master all articulations at very fast tempos',
        'Excellent sight reading without assistance',
      ],
      musical: [
        'Complete dynamic mastery',
        'Masterful phrasing and expression',
        'Deep understanding of all styles',
        'Compelling musical interpretation',
        'Lead ensemble intonation',
      ],
      performance: [
        'Perform with artistic excellence',
        'Sight read at Level FOUR level without assistance',
        'Lead section in ensemble',
        'Demonstrate professional-level musicianship',
      ],
    },
    
    assessment: {
      passRequirements: [
        'All scales from memory at fast tempo',
        'CRITICAL: Perfect ensemble intonation',
        'Refined tone quality',
        'Excellent articulation control',
        'Strong sight reading without assistance',
        'Artistic performances',
      ],
      excellenceIndicators: [
        'Exceptional tone beauty',
        'Perfect intonation leadership',
        'Artistic excellence',
        'Outstanding sight reading',
        'Professional-level musicianship',
      ],
    },
  },
  
  'FIVE': {
    level: 'FIVE',
    title: 'Master Musician',
    description: 'Achieving comprehensive mastery and artistic excellence. Focus on complete musical command and performance mastery.',
    
    scales: {
      required: ['All major scales (up to 7 accidentals)', 'All minor scales', 'Chromatic scale', 'Whole tone scale', 'Modes'],
      tempo: 80,
      range: '2 octaves',
      memorization: true,
      articulations: ['all articulations', 'all styles', 'virtuosic passages'],
    },
    
    tone: {
      description: 'Achieving a world-class tone with complete control and artistic variety',
      characteristics: [
        'World-class tone quality',
        'Complete control in all registers',
        'Unlimited tone color palette',
        'Virtuosic technical execution',
        'Complete dynamic mastery (pppp to ffff)',
        'Perfect intonation in all contexts',
      ],
      commonIssues: [
        'Maintaining excellence under pressure',
        'Extreme endurance requirements',
        'Complex contemporary techniques',
        'Historical performance practice nuances',
      ],
    },
    
    rhythm: {
      noteValues: ['all values', 'extremely complex rhythms', 'polyrhythms', 'metric modulation'],
      timeSignatures: ['all signatures', 'complex and changing meters', 'irrational meters'],
      tempoRange: { min: 40, max: 180 },
      accuracy: 'Perfect rhythm with extremely complex patterns',
    },
    
    intonation: {
      standard: 'CRITICAL - Perfect intonation in all ensemble contexts',
      tolerance: '±5 cents',
      skills: [
        'Perfect intonation in all contexts',
        'Can adjust to any tuning system',
        'Understands complex harmonic intonation',
        'Can lead and adjust ensemble intonation',
      ],
    },
    
    articulation: {
      required: ['all articulations', 'all historical styles', 'virtuosic combinations'],
      execution: 'Perfect control at all tempos, dynamics, and styles',
      speed: 'Extremely fast tempo (♪=80)',
    },
    
    sightReading: {
      length: 'Up to 32 bars',
      difficulty: 'At current level',
      assistance: false,
      accuracy: 'Can read perfectly with musicality',
    },
    
    musicianship: {
      dynamics: ['complete dynamic mastery', 'infinite shading possibilities', 'dramatic mastery'],
      phrasing: 'Perfect phrase shaping, complete architectural understanding',
      expression: 'Profound musical expression, compelling artistic vision',
      style: ['all styles mastered', 'historical performance practice expert', 'advanced improvisation'],
    },
    
    goals: {
      technical: [
        'Play all scales (2 octaves) from memory at ♪=80',
        'World-class tone with complete control',
        'Perfect intonation in all contexts',
        'Virtuosic articulation at extreme tempos',
        'Perfect sight reading with musicality',
      ],
      musical: [
        'Infinite dynamic possibilities',
        'Perfect phrasing and expression',
        'Complete mastery of all styles',
        'Compelling artistic vision',
        'Lead and adjust ensemble intonation',
      ],
      performance: [
        'Perform at professional level',
        'Sight read perfectly at Level FIVE level',
        'Lead ensemble with confidence',
        'Demonstrate artistic excellence',
      ],
    },
    
    assessment: {
      passRequirements: [
        'All scales from memory at very fast tempo',
        'CRITICAL: Perfect intonation in all contexts',
        'World-class tone quality',
        'Virtuosic articulation control',
        'Perfect sight reading',
        'Artistically excellent performances',
      ],
      excellenceIndicators: [
        'Exceptional tone beauty and control',
        'Perfect intonation leadership',
        'Artistic excellence and vision',
        'Perfect sight reading',
        'Professional-level mastery',
      ],
    },
  },
};

/**
 * Get level standard by level
 */
export const getLevelStandard = (level: CadetLevel): LevelStandard => {
  return LEVEL_STANDARDS[level];
};

/**
 * Check if a student meets level requirements
 */
export const checkLevelRequirements = (
  level: CadetLevel,
  studentSkills: {
    scales: string[];
    scaleTempo: number;
    toneQuality: number; // 1-10 scale
    intonation: number; // 1-10 scale
    rhythm: number; // 1-10 scale
    articulation: number; // 1-10 scale
    sightReading: number; // 1-10 scale
    musicianship: number; // 1-10 scale
  }
): {
  meetsRequirements: boolean;
  strengths: string[];
  areasForImprovement: string[];
  recommendations: string[];
} => {
  const standard = LEVEL_STANDARDS[level];
  const strengths: string[] = [];
  const areasForImprovement: string[] = [];
  const recommendations: string[] = [];
  
  // Check scales
  const requiredScales = standard.scales.required;
  const hasAllScales = requiredScales.every(scale => studentSkills.scales.includes(scale));
  const hasTempoRequirement = studentSkills.scaleTempo >= standard.scales.tempo;
  
  if (hasAllScales && hasTempoRequirement) {
    strengths.push('Scales: Meets all requirements');
  } else {
    areasForImprovement.push('Scales: Missing required scales or tempo');
    recommendations.push(`Focus on learning: ${requiredScales.filter(s => !studentSkills.scales.includes(s)).join(', ')}`);
  }
  
  // Check tone quality
  const toneThresholds: Record<CadetLevel, number> = {
    'BASIC': 5,
    'ONE': 6,
    'TWO': 7,
    'THREE': 8,
    'FOUR': 9,
    'FIVE': 9.5,
  };
  
  if (studentSkills.toneQuality >= toneThresholds[level]) {
    strengths.push('Tone Quality: Meets level standard');
  } else {
    areasForImprovement.push(`Tone Quality: Needs improvement (current: ${studentSkills.toneQuality}/10, required: ${toneThresholds[level]}/10)`);
    recommendations.push('Focus on long tone exercises and tone production');
  }
  
  // Check intonation
  const intonationThresholds: Record<CadetLevel, number> = {
    'BASIC': 4,
    'ONE': 5,
    'TWO': 7, // CRITICAL at Level 2
    'THREE': 8,
    'FOUR': 9,
    'FIVE': 9.5,
  };
  
  if (studentSkills.intonation >= intonationThresholds[level]) {
    strengths.push('Intonation: Meets level standard');
  } else {
    areasForImprovement.push(`Intonation: Needs improvement (current: ${studentSkills.intonation}/10, required: ${intonationThresholds[level]}/10)`);
    recommendations.push('Practice with tuner, focus on listening and adjusting');
  }
  
  // Check rhythm
  const rhythmThresholds: Record<CadetLevel, number> = {
    'BASIC': 5,
    'ONE': 6,
    'TWO': 7,
    'THREE': 8,
    'FOUR': 9,
    'FIVE': 9.5,
  };
  
  if (studentSkills.rhythm >= rhythmThresholds[level]) {
    strengths.push('Rhythm: Meets level standard');
  } else {
    areasForImprovement.push(`Rhythm: Needs improvement (current: ${studentSkills.rhythm}/10, required: ${rhythmThresholds[level]}/10)`);
    recommendations.push('Practice with metronome, focus on subdivision');
  }
  
  // Check articulation
  const articulationThresholds: Record<CadetLevel, number> = {
    'BASIC': 5,
    'ONE': 6,
    'TWO': 7,
    'THREE': 8,
    'FOUR': 9,
    'FIVE': 9.5,
  };
  
  if (studentSkills.articulation >= articulationThresholds[level]) {
    strengths.push('Articulation: Meets level standard');
  } else {
    areasForImprovement.push(`Articulation: Needs improvement (current: ${studentSkills.articulation}/10, required: ${articulationThresholds[level]}/10)`);
    recommendations.push('Practice articulation exercises slowly, then gradually increase tempo');
  }
  
  // Check sight reading
  const sightReadingThresholds: Record<CadetLevel, number> = {
    'BASIC': 0, // Not required at Basic
    'ONE': 5,
    'TWO': 6,
    'THREE': 7,
    'FOUR': 8,
    'FIVE': 9,
  };
  
  if (level === 'BASIC' || studentSkills.sightReading >= sightReadingThresholds[level]) {
    strengths.push('Sight Reading: Meets level standard');
  } else {
    areasForImprovement.push(`Sight Reading: Needs improvement (current: ${studentSkills.sightReading}/10, required: ${sightReadingThresholds[level]}/10)`);
    recommendations.push('Practice sight reading daily, start with easy pieces');
  }
  
  // Check musicianship
  const musicianshipThresholds: Record<CadetLevel, number> = {
    'BASIC': 4,
    'ONE': 5,
    'TWO': 6,
    'THREE': 7,
    'FOUR': 8,
    'FIVE': 9,
  };
  
  if (studentSkills.musicianship >= musicianshipThresholds[level]) {
    strengths.push('Musicianship: Meets level standard');
  } else {
    areasForImprovement.push(`Musicianship: Needs improvement (current: ${studentSkills.musicianship}/10, required: ${musicianshipThresholds[level]}/10)`);
    recommendations.push('Listen to professional recordings, study musical scores, practice expression');
  }
  
  const meetsRequirements = areasForImprovement.length === 0 || 
    (areasForImprovement.length <= 2 && !areasForImprovement.some(a => a.includes('CRITICAL')));
  
  return {
    meetsRequirements,
    strengths,
    areasForImprovement,
    recommendations,
  };
};

/**
 * Get progression path between levels
 */
export const getProgressionPath = (fromLevel: CadetLevel, toLevel: CadetLevel): {
  skillAreas: string[];
  focusAreas: string[];
  practiceRecommendations: string[];
} => {
  const fromStandard = LEVEL_STANDARDS[fromLevel];
  const toStandard = LEVEL_STANDARDS[toLevel];
  
  const skillAreas: string[] = [];
  const focusAreas: string[] = [];
  const practiceRecommendations: string[] = [];
  
  // Compare scales
  if (toStandard.scales.tempo > fromStandard.scales.tempo) {
    focusAreas.push(`Increase scale tempo from ♩=${fromStandard.scales.tempo} to ♩=${toStandard.scales.tempo}`);
    practiceRecommendations.push('Practice scales with metronome, gradually increase tempo');
  }
  
  if (toStandard.scales.range !== fromStandard.scales.range) {
    focusAreas.push(`Expand scale range from ${fromStandard.scales.range} to ${toStandard.scales.range}`);
    practiceRecommendations.push('Practice scales in multiple octaves');
  }
  
  // Compare tone
  if (toStandard.tone.characteristics.length > fromStandard.tone.characteristics.length) {
    focusAreas.push('Develop more refined tone quality');
    practiceRecommendations.push('Focus on long tone exercises, tone matching with recordings');
  }
  
  // Compare intonation
  if (toStandard.intonation.tolerance !== fromStandard.intonation.tolerance) {
    focusAreas.push(`Improve intonation precision from ${fromStandard.intonation.tolerance} to ${toStandard.intonation.tolerance}`);
    practiceRecommendations.push('Practice with tuner, develop ear for intonation');
  }
  
  // Compare rhythm
  if (toStandard.rhythm.tempoRange.min > fromStandard.rhythm.tempoRange.min ||
      toStandard.rhythm.tempoRange.max > fromStandard.rhythm.tempoRange.max) {
    focusAreas.push('Expand tempo range and rhythmic complexity');
    practiceRecommendations.push('Practice with metronome at various tempos, work on complex rhythms');
  }
  
  // Compare sight reading
  if (toStandard.sightReading.length !== fromStandard.sightReading.length) {
    focusAreas.push(`Improve sight reading from ${fromStandard.sightReading.length} to ${toStandard.sightReading.length}`);
    practiceRecommendations.push('Sight read daily, gradually increase difficulty');
  }
  
  // Compare musicianship
  if (toStandard.musicianship.dynamics.length > fromStandard.musicianship.dynamics.length) {
    focusAreas.push('Develop more sophisticated dynamic control');
    practiceRecommendations.push('Practice extreme dynamics, work on dynamic shading');
  }
  
  return {
    skillAreas,
    focusAreas,
    practiceRecommendations,
  };
};
