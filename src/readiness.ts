/**
 * Assessment Readiness System
 * 
 * Evaluates cadet preparedness for level assessments based on:
 * - Concept mastery (60%)
 * - Assessment results (20%)
 * - Lesson completion (20%)
 * 
 * This system focuses on concepts required for the NEXT level assessment.
 */

import { CadetLevel, LEVEL_INFO } from './data';
import { ConceptStats, CONCEPTS, Concept, CONCEPT_NAMES } from './competency';

// ============================================================
// DATA MODEL
// ============================================================

/**
 * Readiness report for a specific level and track (theory/instrument)
 */
export interface ReadinessReport {
  level: CadetLevel;
  readiness: number; // 0-100
  strongestTopics: Concept[];
  weakestTopics: Concept[];
  recommendations: string[];
  lastUpdated: string;
}

/**
 * Readiness status categories
 */
export type ReadinessStatus = 'Ready' | 'Nearly Ready' | 'Developing' | 'Not Ready';

/**
 * Get readiness status from score
 */
export function getReadinessStatus(readiness: number): ReadinessStatus {
  if (readiness >= 85) return 'Ready';
  if (readiness >= 70) return 'Nearly Ready';
  if (readiness >= 50) return 'Developing';
  return 'Not Ready';
}

/**
 * Get readiness status color
 */
export function getReadinessColor(status: ReadinessStatus): string {
  switch (status) {
    case 'Ready': return '#3a8a5c';
    case 'Nearly Ready': return '#c9a84c';
    case 'Developing': return '#d4903a';
    case 'Not Ready': return '#c44536';
  }
}

/**
 * Get readiness status emoji
 */
export function getReadinessEmoji(status: ReadinessStatus): string {
  switch (status) {
    case 'Ready': return '✅';
    case 'Nearly Ready': return '⚠️';
    case 'Developing': return '📚';
    case 'Not Ready': return '🚩';
  }
}

// ============================================================
// LEVEL REQUIREMENTS
// ============================================================

/**
 * Required concepts for each theory level
 * These are the concepts that will be assessed at each level
 */
export const THEORY_REQUIREMENTS: Record<CadetLevel, Concept[]> = {
  'BASIC': [
    CONCEPTS.MUSIC_STAFF,
    CONCEPTS.NOTE_VALUES,
    CONCEPTS.RHYTHM,
    CONCEPTS.DYNAMICS,
  ],
  'ONE': [
    CONCEPTS.KEY_SIGNATURES,
    CONCEPTS.ACCIDENTALS,
    CONCEPTS.ARTICULATIONS,
    CONCEPTS.TEMPO_TERMS,
    CONCEPTS.SCALES,
  ],
  'TWO': [
    CONCEPTS.INTERVALS,
    CONCEPTS.COMPOUND_TIME,
    CONCEPTS.TIME_SIGNATURES,
    CONCEPTS.TRANSPOSITION,
  ],
  'THREE': [
    CONCEPTS.INTERVALS,
    CONCEPTS.SCALES,
    CONCEPTS.TRANSPOSITION,
    CONCEPTS.TEMPO_TERMS,
  ],
  'FOUR': [
    CONCEPTS.INTERVALS,
    CONCEPTS.TRANSPOSITION,
    CONCEPTS.SCALES,
    CONCEPTS.TIME_SIGNATURES,
  ],
  'FIVE': [
    CONCEPTS.TRANSPOSITION,
    CONCEPTS.INTERVALS,
    CONCEPTS.SCALES,
    CONCEPTS.AURAL_SKILLS,
  ],
};

/**
 * Required concepts for each instrument level
 * Performance-based concepts
 */
export const INSTRUMENT_REQUIREMENTS: Record<CadetLevel, Concept[]> = {
  'BASIC': [
    CONCEPTS.SAXOPHONE_ASSEMBLY,
    CONCEPTS.MAINTENANCE,
    CONCEPTS.NOTE_NAMES,
    CONCEPTS.RHYTHM,
  ],
  'ONE': [
    CONCEPTS.SCALES,
    CONCEPTS.RHYTHM,
    CONCEPTS.NOTE_NAMES,
    CONCEPTS.MAINTENANCE,
  ],
  'TWO': [
    CONCEPTS.SCALES,
    CONCEPTS.INTONATION,
    CONCEPTS.RHYTHM,
    CONCEPTS.MAINTENANCE,
  ],
  'THREE': [
    CONCEPTS.SCALES,
    CONCEPTS.INTONATION,
    CONCEPTS.SIGHT_READING,
    CONCEPTS.PREPARED_MUSIC,
  ],
  'FOUR': [
    CONCEPTS.SCALES,
    CONCEPTS.INTONATION,
    CONCEPTS.SIGHT_READING,
    CONCEPTS.PREPARED_MUSIC,
  ],
  'FIVE': [
    CONCEPTS.SCALES,
    CONCEPTS.INTONATION,
    CONCEPTS.SIGHT_READING,
    CONCEPTS.PREPARED_MUSIC,
    CONCEPTS.AURAL_SKILLS,
  ],
};

// ============================================================
// READINESS CALCULATION
// ============================================================

/**
 * Configuration for readiness calculation weights
 * These can be adjusted as needed
 */
export const READINESS_WEIGHTS = {
  MASTERY: 0.60,      // 60% from concept mastery
  ASSESSMENT: 0.20,   // 20% from assessment results (future)
  COMPLETION: 0.20,   // 20% from lesson completion
};

/**
 * Calculate mastery score for required concepts
 * Returns average mastery of all required concepts that have been attempted
 */
export function calculateMasteryReadiness(
  conceptMastery: Record<string, ConceptStats>,
  requiredConcepts: Concept[]
): number {
  const attemptedConcepts = requiredConcepts.filter(concept => {
    const stats = conceptMastery[concept];
    return stats && stats.attempts > 0;
  });

  if (attemptedConcepts.length === 0) return 0;

  const totalMastery = attemptedConcepts.reduce((sum, concept) => {
    return sum + conceptMastery[concept].masteryScore;
  }, 0);

  return totalMastery / attemptedConcepts.length;
}

/**
 * Calculate lesson completion readiness
 * Based on percentage of lessons completed for the level
 */
export function calculateCompletionReadiness(
  completedLessons: string[],
  level: CadetLevel
): number {
  // This would need access to curriculum data
  // For now, return a placeholder that can be enhanced
  // In production, count lessons for this level and calculate percentage
  return 0; // Placeholder - will be enhanced with actual curriculum data
}

/**
 * Calculate assessment readiness
 * Based on past assessment performance
 */
export function calculateAssessmentReadiness(
  conceptMastery: Record<string, ConceptStats>,
  requiredConcepts: Concept[]
): number {
  // This would track actual assessment scores in the future
  // For now, use mastery as a proxy
  return calculateMasteryReadiness(conceptMastery, requiredConcepts);
}

/**
 * Generate comprehensive readiness report
 */
export function generateReadinessReport(
  conceptMastery: Record<string, ConceptStats>,
  completedLessons: string[],
  level: CadetLevel,
  track: 'theory' | 'instrument'
): ReadinessReport {
  const requiredConcepts = track === 'theory' 
    ? THEORY_REQUIREMENTS[level] 
    : INSTRUMENT_REQUIREMENTS[level];

  // Calculate component scores
  const masteryScore = calculateMasteryReadiness(conceptMastery, requiredConcepts);
  const assessmentScore = calculateAssessmentReadiness(conceptMastery, requiredConcepts);
  const completionScore = calculateCompletionReadiness(completedLessons, level);

  // Calculate weighted readiness
  const readiness = Math.round(
    (masteryScore * READINESS_WEIGHTS.MASTERY) +
    (assessmentScore * READINESS_WEIGHTS.ASSESSMENT) +
    (completionScore * READINESS_WEIGHTS.COMPLETION)
  );

  // Analyze strongest and weakest topics
  const conceptAnalysis = requiredConcepts.map(concept => {
    const stats = conceptMastery[concept];
    return {
      concept,
      mastery: stats?.masteryScore || 0,
      attempts: stats?.attempts || 0,
      incorrect: stats?.incorrect || 0,
      lastReviewed: stats?.lastReviewed || '',
    };
  });

  // Sort by mastery for strongest/weakest
  const sorted = [...conceptAnalysis].sort((a, b) => b.mastery - a.mastery);
  const strongestTopics = sorted.slice(0, 2).map(c => c.concept);
  const weakestTopics = sorted.slice(-2).reverse().map(c => c.concept);

  // Generate recommendations
  const recommendations = getReadinessRecommendations(conceptMastery, requiredConcepts);

  return {
    level,
    readiness,
    strongestTopics,
    weakestTopics,
    recommendations,
    lastUpdated: new Date().toISOString(),
  };
}

// ============================================================
// RECOMMENDATION ENGINE
// ============================================================

/**
 * Generate readiness-focused recommendations
 * Prioritizes:
 * 1. Weakest required concepts
 * 2. Concepts with high mistake count
 * 3. Recently failed concepts
 */
export function getReadinessRecommendations(
  conceptMastery: Record<string, ConceptStats>,
  requiredConcepts: Concept[]
): string[] {
  const MIN_ATTEMPTS = 3;

  // Filter to required concepts that have been attempted
  const attempted = requiredConcepts
    .map(concept => ({
      concept,
      stats: conceptMastery[concept],
    }))
    .filter(item => item.stats && item.stats.attempts >= MIN_ATTEMPTS)
    .filter(item => item.stats.masteryScore < 85); // Ignore mastered concepts

  if (attempted.length === 0) {
    return ['Continue with current lessons'];
  }

  // Sort by priority: low mastery, high mistakes, recent failures
  const sorted = attempted.sort((a, b) => {
    // Primary: mastery score ascending (weakest first)
    if (a.stats.masteryScore !== b.stats.masteryScore) {
      return a.stats.masteryScore - b.stats.masteryScore;
    }
    // Secondary: incorrect count descending (more mistakes = higher priority)
    if (a.stats.incorrect !== b.stats.incorrect) {
      return b.stats.incorrect - a.stats.incorrect;
    }
    // Tertiary: most recent review
    const dateA = new Date(a.stats.lastReviewed).getTime();
    const dateB = new Date(b.stats.lastReviewed).getTime();
    return dateB - dateA;
  });

  // Generate recommendation strings
  const recommendations: string[] = [];
  
  sorted.slice(0, 3).forEach(item => {
    const conceptName = CONCEPT_NAMES[item.concept];
    const mastery = item.stats.masteryScore;
    
    if (mastery < 50) {
      recommendations.push(`Review ${conceptName}`);
    } else if (item.stats.incorrect > 5) {
      recommendations.push(`Practice ${conceptName} (${item.stats.incorrect} mistakes)`);
    } else {
      recommendations.push(`Strengthen ${conceptName}`);
    }
  });

  return recommendations.length > 0 ? recommendations : ['Continue with current lessons'];
}

// ============================================================
// ASSESSMENT PREDICTION
// ============================================================

/**
 * Predict assessment success probability
 */
export function predictAssessmentSuccess(readiness: number): {
  probability: number;
  confidence: 'High' | 'Moderate' | 'Low';
} {
  // Readiness directly correlates with predicted success
  const probability = Math.min(Math.max(readiness, 0), 100);
  
  let confidence: 'High' | 'Moderate' | 'Low';
  if (probability >= 85) {
    confidence = 'High';
  } else if (probability >= 65) {
    confidence = 'Moderate';
  } else {
    confidence = 'Low';
  }

  return { probability, confidence };
}

/**
 * Get confidence color
 */
export function getConfidenceColor(confidence: 'High' | 'Moderate' | 'Low'): string {
  switch (confidence) {
    case 'High': return '#3a8a5c';
    case 'Moderate': return '#c9a84c';
    case 'Low': return '#c44536';
  }
}

// ============================================================
// CONCEPT BREAKDOWN
// ============================================================

/**
 * Get detailed concept breakdown for readiness report
 */
export function getConceptBreakdown(
  conceptMastery: Record<string, ConceptStats>,
  requiredConcepts: Concept[]
): Array<{
  concept: Concept;
  name: string;
  mastery: number;
  attempts: number;
  status: 'Mastered' | 'Proficient' | 'Developing' | 'Learning' | 'Not Attempted';
}> {
  return requiredConcepts.map(concept => {
    const stats = conceptMastery[concept];
    const mastery = stats?.masteryScore || 0;
    const attempts = stats?.attempts || 0;
    
    let status: 'Mastered' | 'Proficient' | 'Developing' | 'Learning' | 'Not Attempted';
    if (attempts === 0) {
      status = 'Not Attempted';
    } else if (mastery >= 90) {
      status = 'Mastered';
    } else if (mastery >= 70) {
      status = 'Proficient';
    } else if (mastery >= 40) {
      status = 'Developing';
    } else {
      status = 'Learning';
    }

    return {
      concept,
      name: CONCEPT_NAMES[concept],
      mastery,
      attempts,
      status,
    };
  });
}

// ============================================================
// RECENT IMPROVEMENTS
// ============================================================

/**
 * Get concepts with recent improvement
 * Looks at concepts reviewed in the last 7 days with improved mastery
 */
export function getRecentImprovements(
  conceptMastery: Record<string, ConceptStats>,
  days: number = 7
): Array<{
  concept: Concept;
  name: string;
  improvement: number;
}> {
  const cutoff = Date.now() - (days * 24 * 60 * 60 * 1000);
  
  return Object.entries(conceptMastery)
    .filter(([_, stats]) => {
      const lastReviewed = new Date(stats.lastReviewed).getTime();
      return lastReviewed > cutoff && stats.attempts >= 3;
    })
    .map(([concept, stats]) => ({
      concept: concept as Concept,
      name: CONCEPT_NAMES[concept as Concept] || concept,
      improvement: stats.masteryScore,
    }))
    .sort((a, b) => b.improvement - a.improvement)
    .slice(0, 3);
}

// ============================================================
// MIGRATION UTILITIES
// ============================================================

/**
 * Initialize readiness reports for existing users
 */
export function initializeReadinessReports(): {
  theory: ReadinessReport | null;
  instrument: ReadinessReport | null;
} {
  return {
    theory: null,
    instrument: null,
  };
}

/**
 * Migrate user data to include readiness reports
 */
export function migrateReadinessData(userData: any): any {
  if (!userData.progress) return userData;

  // Initialize readiness reports if not present
  if (!userData.progress.readinessReports) {
    userData.progress.readinessReports = initializeReadinessReports();
  }

  return userData;
}
