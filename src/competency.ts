/**
 * Competency Tracking and Adaptive Learning System
 * 
 * This module provides comprehensive tracking of concept mastery,
 * weak topic detection, and personalized learning recommendations.
 */

import { CadetLevel } from './data';

// ============================================================
// CONCEPT CATALOG
// ============================================================

/**
 * Standardized list of music theory and performance concepts
 * Each concept can be tracked independently for mastery
 */
export const CONCEPTS = {
  // Basic Theory
  NOTE_VALUES: 'noteValues',
  RHYTHM: 'rhythm',
  TIME_SIGNATURES: 'timeSignatures',
  COMPOUND_TIME: 'compoundTime',
  DYNAMICS: 'dynamics',
  ARTICULATIONS: 'articulations',
  
  // Intermediate Theory
  ACCIDENTALS: 'accidentals',
  KEY_SIGNATURES: 'keySignatures',
  SCALES: 'scales',
  INTERVALS: 'intervals',
  TRANSPOSITION: 'transposition',
  TEMPO_TERMS: 'tempoTerms',
  CHORDS: 'chords',
  
  // Foundational
  MUSIC_STAFF: 'musicStaff',
  NOTE_NAMES: 'noteNames',
  
  // Performance
  SAXOPHONE_ASSEMBLY: 'saxophoneAssembly',
  MAINTENANCE: 'maintenance',
  INTONATION: 'intonation',
  SIGHT_READING: 'sightReading',
  AURAL_SKILLS: 'auralSkills',
  BAND_DRILL: 'bandDrill',
  PREPARED_MUSIC: 'preparedMusic',
} as const;

export type Concept = typeof CONCEPTS[keyof typeof CONCEPTS];

/**
 * Human-readable names for concepts
 */
export const CONCEPT_NAMES: Record<Concept, string> = {
  [CONCEPTS.NOTE_VALUES]: 'Note Values',
  [CONCEPTS.RHYTHM]: 'Rhythm',
  [CONCEPTS.TIME_SIGNATURES]: 'Time Signatures',
  [CONCEPTS.COMPOUND_TIME]: 'Compound Time',
  [CONCEPTS.DYNAMICS]: 'Dynamics',
  [CONCEPTS.ARTICULATIONS]: 'Articulations',
  [CONCEPTS.ACCIDENTALS]: 'Accidentals',
  [CONCEPTS.KEY_SIGNATURES]: 'Key Signatures',
  [CONCEPTS.SCALES]: 'Scales',
  [CONCEPTS.INTERVALS]: 'Intervals',
  [CONCEPTS.TRANSPOSITION]: 'Transposition',
  [CONCEPTS.TEMPO_TERMS]: 'Tempo Terms',
  [CONCEPTS.CHORDS]: 'Chords & Cadences',
  [CONCEPTS.MUSIC_STAFF]: 'Music Staff',
  [CONCEPTS.NOTE_NAMES]: 'Note Names',
  [CONCEPTS.SAXOPHONE_ASSEMBLY]: 'Saxophone Assembly',
  [CONCEPTS.MAINTENANCE]: 'Maintenance',
  [CONCEPTS.INTONATION]: 'Intonation',
  [CONCEPTS.SIGHT_READING]: 'Sight Reading',
  [CONCEPTS.AURAL_SKILLS]: 'Aural Skills',
  [CONCEPTS.BAND_DRILL]: 'Band Drill',
  [CONCEPTS.PREPARED_MUSIC]: 'Prepared Music',
};

// ============================================================
// DATA MODEL
// ============================================================

/**
 * Statistics for a single concept
 */
export interface ConceptStats {
  correct: number;
  incorrect: number;
  attempts: number;
  lastReviewed: string; // ISO date string
  masteryScore: number; // 0-100
}

/**
 * Mastery level categories
 */
export type MasteryLevel = 'Learning' | 'Developing' | 'Proficient' | 'Mastered';

/**
 * Get mastery level from score
 */
export function getMasteryLevel(score: number): MasteryLevel {
  if (score >= 90) return 'Mastered';
  if (score >= 70) return 'Proficient';
  if (score >= 40) return 'Developing';
  return 'Learning';
}

/**
 * Get mastery level color
 */
export function getMasteryColor(level: MasteryLevel): string {
  switch (level) {
    case 'Mastered': return '#3a8a5c';
    case 'Proficient': return '#c9a84c';
    case 'Developing': return '#d4903a';
    case 'Learning': return '#c44536';
  }
}

// ============================================================
// TRACKING FUNCTIONS
// ============================================================

/**
 * Calculate mastery score from stats
 * Uses weighted formula: (correct / attempts) * 100
 * Minimum 1 attempt required
 */
export function calculateMasteryScore(stats: ConceptStats): number {
  if (stats.attempts === 0) return 0;
  return Math.round((stats.correct / stats.attempts) * 100);
}

/**
 * Record a correct answer for a concept
 */
export function recordCorrectAnswer(
  conceptMastery: Record<string, ConceptStats>,
  concept: Concept
): Record<string, ConceptStats> {
  const current = conceptMastery[concept] || {
    correct: 0,
    incorrect: 0,
    attempts: 0,
    lastReviewed: new Date().toISOString(),
    masteryScore: 0,
  };

  const updated: ConceptStats = {
    correct: current.correct + 1,
    incorrect: current.incorrect,
    attempts: current.attempts + 1,
    lastReviewed: new Date().toISOString(),
    masteryScore: 0, // Will be calculated
  };

  updated.masteryScore = calculateMasteryScore(updated);

  return {
    ...conceptMastery,
    [concept]: updated,
  };
}

/**
 * Record an incorrect answer for a concept
 */
export function recordIncorrectAnswer(
  conceptMastery: Record<string, ConceptStats>,
  concept: Concept
): Record<string, ConceptStats> {
  const current = conceptMastery[concept] || {
    correct: 0,
    incorrect: 0,
    attempts: 0,
    lastReviewed: new Date().toISOString(),
    masteryScore: 0,
  };

  const updated: ConceptStats = {
    correct: current.correct,
    incorrect: current.incorrect + 1,
    attempts: current.attempts + 1,
    lastReviewed: new Date().toISOString(),
    masteryScore: 0, // Will be calculated
  };

  updated.masteryScore = calculateMasteryScore(updated);

  return {
    ...conceptMastery,
    [concept]: updated,
  };
}

// ============================================================
// ANALYTICS UTILITIES
// ============================================================

/**
 * Calculate overall accuracy across all concepts
 */
export function calculateOverallAccuracy(conceptMastery: Record<string, ConceptStats>): number {
  let totalCorrect = 0;
  let totalAttempts = 0;

  Object.values(conceptMastery).forEach(stats => {
    totalCorrect += stats.correct;
    totalAttempts += stats.attempts;
  });

  if (totalAttempts === 0) return 0;
  return Math.round((totalCorrect / totalAttempts) * 100);
}

/**
 * Get all concepts with their stats
 */
export function getAllConceptStats(conceptMastery: Record<string, ConceptStats>): Array<{
  concept: Concept;
  stats: ConceptStats;
  masteryLevel: MasteryLevel;
}> {
  return Object.entries(conceptMastery).map(([concept, stats]) => ({
    concept: concept as Concept,
    stats,
    masteryLevel: getMasteryLevel(stats.masteryScore),
  }));
}

/**
 * Get mastered concepts (score >= 90)
 */
export function getMasteredConcepts(conceptMastery: Record<string, ConceptStats>): Concept[] {
  return Object.entries(conceptMastery)
    .filter(([_, stats]) => stats.masteryScore >= 90)
    .map(([concept]) => concept as Concept);
}

/**
 * Get developing concepts (40 <= score < 90)
 */
export function getDevelopingConcepts(conceptMastery: Record<string, ConceptStats>): Concept[] {
  return Object.entries(conceptMastery)
    .filter(([_, stats]) => stats.masteryScore >= 40 && stats.masteryScore < 90)
    .map(([concept]) => concept as Concept);
}

/**
 * Get weak topics that need improvement
 * Rules:
 * - Minimum 5 attempts before evaluation
 * - Sort by mastery score ascending, then attempts descending
 * - Return top 3 weaknesses
 */
export function getWeakTopics(conceptMastery: Record<string, ConceptStats>): Concept[] {
  const MIN_ATTEMPTS = 5;

  return Object.entries(conceptMastery)
    .filter(([_, stats]) => stats.attempts >= MIN_ATTEMPTS)
    .sort((a, b) => {
      // Primary sort: mastery score ascending (weakest first)
      if (a[1].masteryScore !== b[1].masteryScore) {
        return a[1].masteryScore - b[1].masteryScore;
      }
      // Secondary sort: attempts descending (more attempts = more data)
      return b[1].attempts - a[1].attempts;
    })
    .slice(0, 3)
    .map(([concept]) => concept as Concept);
}

/**
 * Get strongest topic (highest mastery score with at least 5 attempts)
 */
export function getStrongestTopic(conceptMastery: Record<string, ConceptStats>): Concept | null {
  const MIN_ATTEMPTS = 5;

  const concepts = Object.entries(conceptMastery)
    .filter(([_, stats]) => stats.attempts >= MIN_ATTEMPTS)
    .sort((a, b) => b[1].masteryScore - a[1].masteryScore);

  return concepts.length > 0 ? concepts[0][0] as Concept : null;
}

/**
 * Get weakest topic (lowest mastery score with at least 5 attempts)
 */
export function getWeakestTopic(conceptMastery: Record<string, ConceptStats>): Concept | null {
  const MIN_ATTEMPTS = 5;

  const concepts = Object.entries(conceptMastery)
    .filter(([_, stats]) => stats.attempts >= MIN_ATTEMPTS)
    .sort((a, b) => a[1].masteryScore - b[1].masteryScore);

  return concepts.length > 0 ? concepts[0][0] as Concept : null;
}

/**
 * Get least recently reviewed concept
 */
export function getLeastRecentlyReviewed(conceptMastery: Record<string, ConceptStats>): Concept | null {
  const concepts = Object.entries(conceptMastery)
    .sort((a, b) => {
      const dateA = new Date(a[1].lastReviewed).getTime();
      const dateB = new Date(b[1].lastReviewed).getTime();
      return dateA - dateB; // Oldest first
    });

  return concepts.length > 0 ? concepts[0][0] as Concept : null;
}

// ============================================================
// RECOMMENDATION ENGINE
// ============================================================

/**
 * Get personalized training recommendation
 * Priority:
 * 1. Weakest topic (if exists)
 * 2. Least recently reviewed topic
 * 3. Lowest mastery score (if no weak topics yet)
 * 4. Current curriculum lesson (fallback)
 */
export function getRecommendedTraining(
  conceptMastery: Record<string, ConceptStats>,
  currentLessonId?: string
): { concept: Concept | null; reason: string } {
  // Priority 1: Weakest topic
  const weakTopics = getWeakTopics(conceptMastery);
  if (weakTopics.length > 0) {
    return {
      concept: weakTopics[0],
      reason: `Review ${CONCEPT_NAMES[weakTopics[0]]} (${conceptMastery[weakTopics[0]].masteryScore}% mastery)`,
    };
  }

  // Priority 2: Least recently reviewed
  const leastRecent = getLeastRecentlyReviewed(conceptMastery);
  if (leastRecent) {
    const daysSinceReview = Math.floor(
      (Date.now() - new Date(conceptMastery[leastRecent].lastReviewed).getTime()) / (1000 * 60 * 60 * 24)
    );
    if (daysSinceReview > 3) {
      return {
        concept: leastRecent,
        reason: `Practice ${CONCEPT_NAMES[leastRecent]} (not reviewed in ${daysSinceReview} days)`,
      };
    }
  }

  // Priority 3: Lowest mastery score (if any concepts attempted)
  const allConcepts = getAllConceptStats(conceptMastery);
  if (allConcepts.length > 0) {
    const lowest = allConcepts.sort((a, b) => a.stats.masteryScore - b.stats.masteryScore)[0];
    if (lowest.stats.attempts > 0) {
      return {
        concept: lowest.concept,
        reason: `Improve ${CONCEPT_NAMES[lowest.concept]} (${lowest.stats.masteryScore}% mastery)`,
      };
    }
  }

  // Priority 4: Current curriculum lesson (fallback)
  if (currentLessonId) {
    return {
      concept: null,
      reason: 'Continue with current lesson',
    };
  }

  // No recommendation available
  return {
    concept: null,
    reason: 'Start with Basic lessons',
  };
}

// ============================================================
// COMPETENCY BADGES FRAMEWORK
// ============================================================

/**
 * Badge definitions for competency-based achievements
 */
export interface CompetencyBadge {
  id: string;
  name: string;
  description: string;
  concept: Concept;
  requiredMastery: number;
  requiredAttempts: number;
  tier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
}

export const COMPETENCY_BADGES: CompetencyBadge[] = [
  // Rhythm Specialist
  {
    id: 'rhythm-bronze',
    name: 'Rhythm Specialist Bronze',
    description: 'Achieve 70% mastery in Rhythm with at least 20 attempts',
    concept: CONCEPTS.RHYTHM,
    requiredMastery: 70,
    requiredAttempts: 20,
    tier: 'Bronze',
  },
  {
    id: 'rhythm-silver',
    name: 'Rhythm Specialist Silver',
    description: 'Achieve 85% mastery in Rhythm with at least 50 attempts',
    concept: CONCEPTS.RHYTHM,
    requiredMastery: 85,
    requiredAttempts: 50,
    tier: 'Silver',
  },
  {
    id: 'rhythm-gold',
    name: 'Rhythm Specialist Gold',
    description: 'Achieve 95% mastery in Rhythm with at least 100 attempts',
    concept: CONCEPTS.RHYTHM,
    requiredMastery: 95,
    requiredAttempts: 100,
    tier: 'Gold',
  },

  // Key Signature Expert
  {
    id: 'keysig-bronze',
    name: 'Key Signature Expert Bronze',
    description: 'Achieve 70% mastery in Key Signatures with at least 20 attempts',
    concept: CONCEPTS.KEY_SIGNATURES,
    requiredMastery: 70,
    requiredAttempts: 20,
    tier: 'Bronze',
  },
  {
    id: 'keysig-silver',
    name: 'Key Signature Expert Silver',
    description: 'Achieve 85% mastery in Key Signatures with at least 50 attempts',
    concept: CONCEPTS.KEY_SIGNATURES,
    requiredMastery: 85,
    requiredAttempts: 50,
    tier: 'Silver',
  },
  {
    id: 'keysig-gold',
    name: 'Key Signature Expert Gold',
    description: 'Achieve 95% mastery in Key Signatures with at least 100 attempts',
    concept: CONCEPTS.KEY_SIGNATURES,
    requiredMastery: 95,
    requiredAttempts: 100,
    tier: 'Gold',
  },

  // Interval Master
  {
    id: 'interval-bronze',
    name: 'Interval Master Bronze',
    description: 'Achieve 70% mastery in Intervals with at least 20 attempts',
    concept: CONCEPTS.INTERVALS,
    requiredMastery: 70,
    requiredAttempts: 20,
    tier: 'Bronze',
  },
  {
    id: 'interval-silver',
    name: 'Interval Master Silver',
    description: 'Achieve 85% mastery in Intervals with at least 50 attempts',
    concept: CONCEPTS.INTERVALS,
    requiredMastery: 85,
    requiredAttempts: 50,
    tier: 'Silver',
  },
  {
    id: 'interval-gold',
    name: 'Interval Master Gold',
    description: 'Achieve 95% mastery in Intervals with at least 100 attempts',
    concept: CONCEPTS.INTERVALS,
    requiredMastery: 95,
    requiredAttempts: 100,
    tier: 'Gold',
  },

  // Sight Reading Specialist
  {
    id: 'sightread-bronze',
    name: 'Sight Reading Specialist Bronze',
    description: 'Achieve 70% mastery in Sight Reading with at least 20 attempts',
    concept: CONCEPTS.SIGHT_READING,
    requiredMastery: 70,
    requiredAttempts: 20,
    tier: 'Bronze',
  },
  {
    id: 'sightread-silver',
    name: 'Sight Reading Specialist Silver',
    description: 'Achieve 85% mastery in Sight Reading with at least 50 attempts',
    concept: CONCEPTS.SIGHT_READING,
    requiredMastery: 85,
    requiredAttempts: 50,
    tier: 'Silver',
  },
  {
    id: 'sightread-gold',
    name: 'Sight Reading Specialist Gold',
    description: 'Achieve 95% mastery in Sight Reading with at least 100 attempts',
    concept: CONCEPTS.SIGHT_READING,
    requiredMastery: 95,
    requiredAttempts: 100,
    tier: 'Gold',
  },

  // Aural Skills
  {
    id: 'aural-bronze',
    name: 'Aural Skills Bronze',
    description: 'Achieve 70% mastery in Aural Skills with at least 20 attempts',
    concept: CONCEPTS.AURAL_SKILLS,
    requiredMastery: 70,
    requiredAttempts: 20,
    tier: 'Bronze',
  },
  {
    id: 'aural-silver',
    name: 'Aural Skills Silver',
    description: 'Achieve 85% mastery in Aural Skills with at least 50 attempts',
    concept: CONCEPTS.AURAL_SKILLS,
    requiredMastery: 85,
    requiredAttempts: 50,
    tier: 'Silver',
  },
  {
    id: 'aural-gold',
    name: 'Aural Skills Gold',
    description: 'Achieve 95% mastery in Aural Skills with at least 100 attempts',
    concept: CONCEPTS.AURAL_SKILLS,
    requiredMastery: 95,
    requiredAttempts: 100,
    tier: 'Gold',
  },
];

/**
 * Check if user has earned a specific badge
 */
export function hasEarnedBadge(
  conceptMastery: Record<string, ConceptStats>,
  badge: CompetencyBadge
): boolean {
  const stats = conceptMastery[badge.concept];
  if (!stats) return false;

  return (
    stats.masteryScore >= badge.requiredMastery &&
    stats.attempts >= badge.requiredAttempts
  );
}

/**
 * Get all badges user has earned
 */
export function getEarnedBadges(
  conceptMastery: Record<string, ConceptStats>
): CompetencyBadge[] {
  return COMPETENCY_BADGES.filter(badge => hasEarnedBadge(conceptMastery, badge));
}

/**
 * Get badges user is close to earning (within 10% of mastery or 5 attempts)
 */
export function getCloseToBadges(
  conceptMastery: Record<string, ConceptStats>
): Array<{ badge: CompetencyBadge; progress: number }> {
  return COMPETENCY_BADGES
    .filter(badge => !hasEarnedBadge(conceptMastery, badge))
    .map(badge => {
      const stats = conceptMastery[badge.concept];
      if (!stats) return { badge, progress: 0 };

      const masteryProgress = Math.min(stats.masteryScore / badge.requiredMastery, 1);
      const attemptsProgress = Math.min(stats.attempts / badge.requiredAttempts, 1);
      const progress = Math.round(((masteryProgress + attemptsProgress) / 2) * 100);

      return { badge, progress };
    })
    .filter(item => item.progress >= 70) // Only show badges within 30% of completion
    .sort((a, b) => b.progress - a.progress);
}

// ============================================================
// MIGRATION UTILITIES
// ============================================================

/**
 * Initialize concept mastery for existing users
 * Ensures backward compatibility
 */
export function initializeConceptMastery(
  existingMastery?: Record<string, ConceptStats>
): Record<string, ConceptStats> {
  return existingMastery || {};
}

/**
 * Migrate old user data to new format
 * Preserves all existing data while adding concept tracking
 */
export function migrateUserData(userData: any): any {
  if (!userData.progress) return userData;

  // Initialize concept mastery if not present
  if (!userData.progress.conceptMastery) {
    userData.progress.conceptMastery = {};
  }

  return userData;
}
