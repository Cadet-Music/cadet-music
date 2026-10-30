/**
 * Song Metadata and Song-Aware Adaptation System
 * 
 * Extends the adaptive learning system to consider selected exam songs.
 * Each song has associated concepts and technical requirements.
 * The adaptive system increases exposure to concepts needed for selected songs.
 */

import { Concept } from './competency';
import { CadetLevel } from './data';

// ============================================================
// SONG METADATA MODEL
// ============================================================

/**
 * Song metadata structure
 */
export interface SongMetadata {
  id: string;
  title: string;
  composer: string;
  level: CadetLevel;
  listType: 'A' | 'B';
  
  // Concepts practiced in this song
  concepts: Concept[];
  
  // Technical requirements
  technicalRequirements: {
    keySignature?: string;
    timeSignature?: string;
    tempoRange?: { min: number; max: number };
    dynamics?: string[];
    articulations?: string[];
    range?: { lowest: string; highest: string };
    scales?: string[];
  };
  
  // Theory requirements
  theoryRequirements: {
    keySignatures?: string[];
    timeSignatures?: string[];
    intervals?: string[];
    scales?: string[];
    articulations?: string[];
    transposition?: boolean;
    sightReading?: boolean;
  };
  
  // Difficulty indicators
  difficulty: {
    technical: 'easy' | 'medium' | 'hard' | 'very-hard';
    rhythmic: 'easy' | 'medium' | 'hard' | 'very-hard';
    theoretical: 'easy' | 'medium' | 'hard' | 'very-hard';
  };
  
  // Practice recommendations
  practiceFocus: string[];
}

// ============================================================
// PREPARED MUSIC DATABASE
// ============================================================

/**
 * Basic Level Songs
 */
export const BASIC_SONGS: SongMetadata[] = [
  {
    id: 'western-portrait',
    title: 'Western Portrait',
    composer: 'Traditional',
    level: 'BASIC',
    listType: 'A',
    concepts: ['rhythm', 'noteValues', 'dynamics'],
    technicalRequirements: {
      keySignature: 'Bb Major',
      timeSignature: '4/4',
      tempoRange: { min: 80, max: 100 },
      dynamics: ['p', 'mf', 'f'],
      range: { lowest: 'D4', highest: 'G4' },
    },
    theoryRequirements: {
      keySignatures: ['Bb Major'],
      timeSignatures: ['4/4'],
    },
    difficulty: {
      technical: 'easy',
      rhythmic: 'easy',
      theoretical: 'easy',
    },
    practiceFocus: ['steady rhythm', 'basic dynamics', 'note accuracy'],
  },
  {
    id: 'austrian-melody',
    title: 'Austrian Melody',
    composer: 'Traditional',
    level: 'BASIC',
    listType: 'A',
    concepts: ['rhythm', 'articulations', 'dynamics'],
    technicalRequirements: {
      keySignature: 'F Major',
      timeSignature: '3/4',
      tempoRange: { min: 90, max: 110 },
      dynamics: ['p', 'mp', 'mf'],
      articulations: ['staccato', 'legato'],
      range: { lowest: 'C4', highest: 'F4' },
    },
    theoryRequirements: {
      keySignatures: ['F Major'],
      timeSignatures: ['3/4'],
    },
    difficulty: {
      technical: 'easy',
      rhythmic: 'medium',
      theoretical: 'easy',
    },
    practiceFocus: ['waltz rhythm', 'articulation contrast', 'phrasing'],
  },
  {
    id: 'minstrel-boy',
    title: 'The Minstrel Boy',
    composer: 'Traditional',
    level: 'BASIC',
    listType: 'A',
    concepts: ['rhythm', 'dynamics', 'articulations'],
    technicalRequirements: {
      keySignature: 'Eb Major',
      timeSignature: '4/4',
      tempoRange: { min: 70, max: 90 },
      dynamics: ['p', 'mf', 'f', 'cresc'],
      range: { lowest: 'Bb3', highest: 'Eb4' },
    },
    theoryRequirements: {
      keySignatures: ['Eb Major'],
      timeSignatures: ['4/4'],
    },
    difficulty: {
      technical: 'easy',
      rhythmic: 'easy',
      theoretical: 'medium',
    },
    practiceFocus: ['lyrical phrasing', 'dynamic contrast', 'tone quality'],
  },
  {
    id: 'ode-to-joy',
    title: 'Ode to Joy',
    composer: 'Beethoven',
    level: 'BASIC',
    listType: 'B',
    concepts: ['rhythm', 'scales', 'intervals'],
    technicalRequirements: {
      keySignature: 'F Major',
      timeSignature: '4/4',
      tempoRange: { min: 100, max: 120 },
      dynamics: ['mf', 'f'],
      scales: ['F Major'],
      range: { lowest: 'C4', highest: 'F4' },
    },
    theoryRequirements: {
      keySignatures: ['F Major'],
      scales: ['F Major'],
    },
    difficulty: {
      technical: 'easy',
      rhythmic: 'easy',
      theoretical: 'easy',
    },
    practiceFocus: ['scale familiarity', 'steady tempo', 'clear articulation'],
  },
];

/**
 * Level One Songs
 */
export const LEVEL_ONE_SONGS: SongMetadata[] = [
  {
    id: 'hunter-chorus',
    title: 'Hunter Chorus',
    composer: 'Weber',
    level: 'ONE',
    listType: 'B',
    concepts: ['articulations', 'rhythm', 'dynamics', 'scales'],
    technicalRequirements: {
      keySignature: 'Bb Major',
      timeSignature: '4/4',
      tempoRange: { min: 120, max: 140 },
      dynamics: ['p', 'mp', 'mf', 'f', 'cresc', 'decresc'],
      articulations: ['staccato', 'accent', 'tenuto'],
      scales: ['Bb Major'],
      range: { lowest: 'Bb3', highest: 'F5' },
    },
    theoryRequirements: {
      keySignatures: ['Bb Major'],
      scales: ['Bb Major'],
      articulations: ['staccato', 'accent'],
    },
    difficulty: {
      technical: 'medium',
      rhythmic: 'medium',
      theoretical: 'medium',
    },
    practiceFocus: ['articulation clarity', 'dynamic control', 'scale fluency'],
  },
  {
    id: 'abendlied',
    title: 'Abendlied',
    composer: 'Mozart',
    level: 'ONE',
    listType: 'A',
    concepts: ['articulations', 'dynamics', 'intonation'],
    technicalRequirements: {
      keySignature: 'Eb Major',
      timeSignature: '3/4',
      tempoRange: { min: 80, max: 100 },
      dynamics: ['p', 'mp', 'mf'],
      articulations: ['legato', 'slur'],
      range: { lowest: 'Bb3', highest: 'Eb5' },
    },
    theoryRequirements: {
      keySignatures: ['Eb Major'],
      timeSignatures: ['3/4'],
    },
    difficulty: {
      technical: 'medium',
      rhythmic: 'easy',
      theoretical: 'medium',
    },
    practiceFocus: ['legato phrasing', 'intonation accuracy', 'musical expression'],
  },
];

/**
 * Get all songs for a level
 */
export function getSongsForLevel(level: CadetLevel): SongMetadata[] {
  switch (level) {
    case 'BASIC':
      return BASIC_SONGS;
    case 'ONE':
      return LEVEL_ONE_SONGS;
    default:
      return [];
  }
}

/**
 * Get song by ID
 */
export function getSongById(id: string): SongMetadata | undefined {
  const allSongs = [...BASIC_SONGS, ...LEVEL_ONE_SONGS];
  return allSongs.find(s => s.id === id);
}

// ============================================================
// SONG-AWARE ADAPTATION
// ============================================================

/**
 * Calculate concept weights based on selected songs
 * 
 * @param selectedSongs - Array of selected song IDs
 * @param conceptMastery - Current concept mastery data
 * @returns Additional weight multipliers for song-related concepts
 */
export function calculateSongAwareWeights(
  selectedSongs: string[],
  conceptMastery: Record<string, any>
): Record<Concept, number> {
  const songWeights: Partial<Record<Concept, number>> = {};
  
  // Analyze each selected song
  for (const songId of selectedSongs) {
    const song = getSongById(songId);
    if (!song) continue;
    
    // Increase weight for concepts used in this song
    for (const concept of song.concepts) {
      const currentWeight = songWeights[concept] || 1.0;
      
      // Check if concept needs more practice
      const mastery = conceptMastery[concept];
      const masteryScore = mastery?.masteryScore || 0;
      
      // Boost weight based on song importance and current mastery
      let boost = 1.5; // Default boost for song-related concepts
      
      if (masteryScore < 70) {
        boost = 2.0; // Extra boost for weak concepts in songs
      } else if (masteryScore < 85) {
        boost = 1.7; // Moderate boost for developing concepts
      }
      
      songWeights[concept] = currentWeight * boost;
    }
  }
  
  return songWeights as Record<Concept, number>;
}

/**
 * Get practice recommendations based on selected songs
 */
export function getSongPracticeRecommendations(
  selectedSongs: string[],
  conceptMastery: Record<string, any>
): Array<{
  concept: Concept;
  reason: string;
  priority: number;
}> {
  const recommendations: Array<{
    concept: Concept;
    reason: string;
    priority: number;
  }> = [];
  
  for (const songId of selectedSongs) {
    const song = getSongById(songId);
    if (!song) continue;
    
    for (const concept of song.concepts) {
      const mastery = conceptMastery[concept];
      const masteryScore = mastery?.masteryScore || 0;
      
      // Only recommend if mastery is below 85%
      if (masteryScore < 85) {
        const priority = (100 - masteryScore) * (song.difficulty.technical === 'hard' ? 1.5 : 1.0);
        
        recommendations.push({
          concept,
          reason: `Required for "${song.title}" (${masteryScore}% mastery)`,
          priority,
        });
      }
    }
  }
  
  // Sort by priority and return top recommendations
  return recommendations
    .sort((a, b) => b.priority - a.priority)
    .slice(0, 5);
}

/**
 * Check if a concept is required for selected songs
 */
export function isConceptRequiredForSongs(
  concept: Concept,
  selectedSongs: string[]
): boolean {
  for (const songId of selectedSongs) {
    const song = getSongById(songId);
    if (song && song.concepts.includes(concept)) {
      return true;
    }
  }
  return false;
}

/**
 * Get song coverage analysis
 */
export function getSongCoverageAnalysis(
  selectedSongs: string[],
  conceptMastery: Record<string, any>
): {
  totalConcepts: number;
  masteredConcepts: number;
  developingConcepts: number;
  weakConcepts: number;
  coveragePercentage: number;
} {
  const allConcepts = new Set<Concept>();
  
  for (const songId of selectedSongs) {
    const song = getSongById(songId);
    if (song) {
      song.concepts.forEach(c => allConcepts.add(c));
    }
  }
  
  let mastered = 0;
  let developing = 0;
  let weak = 0;
  
  for (const concept of allConcepts) {
    const mastery = conceptMastery[concept];
    const score = mastery?.masteryScore || 0;
    
    if (score >= 90) mastered++;
    else if (score >= 70) developing++;
    else weak++;
  }
  
  const totalConcepts = allConcepts.size;
  const coveragePercentage = totalConcepts > 0 ? (mastered / totalConcepts) * 100 : 0;
  
  return {
    totalConcepts,
    masteredConcepts: mastered,
    developingConcepts: developing,
    weakConcepts: weak,
    coveragePercentage,
  };
}

// ============================================================
// ADMIN ANALYTICS FOR SONGS
// ============================================================

/**
 * Generate song-aware admin analytics
 */
export function generateSongAwareAnalytics(
  selectedSongs: string[],
  conceptMastery: Record<string, any>
): {
  songAnalysis: Array<{
    song: SongMetadata;
    conceptMastery: Partial<Record<Concept, number>>;
    overallReadiness: number;
    weakAreas: Concept[];
  }>;
  overallCoverage: {
    totalConcepts: number;
    masteredConcepts: number;
    developingConcepts: number;
    weakConcepts: number;
    coveragePercentage: number;
  };
  recommendations: Array<{
    concept: Concept;
    reason: string;
    priority: number;
  }>;
} {
  const songAnalysis = selectedSongs.map(songId => {
    const song = getSongById(songId);
    if (!song) {
      return {
        song: {} as SongMetadata,
        conceptMastery: {} as Record<Concept, number>,
        overallReadiness: 0,
        weakAreas: [],
      };
    }
    
    const conceptMasteryMap: Partial<Record<Concept, number>> = {};
    let totalMastery = 0;
    const weakAreas: Concept[] = [];
    
    for (const concept of song.concepts) {
      const mastery = conceptMastery[concept];
      const score = mastery?.masteryScore || 0;
      conceptMasteryMap[concept] = score;
      totalMastery += score;
      
      if (score < 70) {
        weakAreas.push(concept);
      }
    }
    
    const overallReadiness = song.concepts.length > 0 ? totalMastery / song.concepts.length : 0;
    
    return {
      song,
      conceptMastery: conceptMasteryMap,
      overallReadiness,
      weakAreas,
    };
  });
  
  const overallCoverage = getSongCoverageAnalysis(selectedSongs, conceptMastery);
  const recommendations = getSongPracticeRecommendations(selectedSongs, conceptMastery);
  
  return {
    songAnalysis,
    overallCoverage,
    recommendations,
  };
}
