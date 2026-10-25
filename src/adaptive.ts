/**
 * Adaptive Content Weighting System
 * 
 * This system invisibly adapts content selection based on concept mastery.
 * Cadets receive more practice on weaker areas without explicit feedback.
 */

import { ConceptStats, Concept, getMasteryLevel, MasteryLevel } from './competency';

// ============================================================
// MASTERY TIER WEIGHTS
// ============================================================

/**
 * Weight multipliers based on mastery tier
 * Lower mastery = higher weight = more frequent selection
 */
export const MASTERY_WEIGHTS: Record<MasteryLevel, number> = {
  'Learning': 3.0,    // 0-39% mastery
  'Developing': 1.5,  // 40-69% mastery
  'Proficient': 1.0,  // 70-89% mastery
  'Mastered': 0.5,    // 90-100% mastery
};

// ============================================================
// CONCEPT WEIGHT CALCULATION
// ============================================================

/**
 * Calculate weight for a single concept based on its mastery
 */
export function calculateConceptWeight(stats: ConceptStats | undefined): number {
  if (!stats || stats.attempts === 0) {
    // Unattempted concepts get default weight
    return 1.0;
  }

  const masteryLevel = getMasteryLevel(stats.masteryScore);
  return MASTERY_WEIGHTS[masteryLevel];
}

/**
 * Calculate weights for all concepts
 */
export function calculateAllWeights(
  conceptMastery: Record<string, ConceptStats>,
  concepts: Concept[]
): Record<Concept, number> {
  const weights: Record<Concept, number> = {} as Record<Concept, number>;
  
  for (const concept of concepts) {
    weights[concept] = calculateConceptWeight(conceptMastery[concept]);
  }
  
  return weights;
}

// ============================================================
// WEIGHTED RANDOM SELECTION
// ============================================================

/**
 * Select a concept using weighted random selection
 * Higher weights = higher probability of selection
 */
export function selectWeightedConcept(
  conceptMastery: Record<string, ConceptStats>,
  concepts: Concept[]
): Concept | null {
  if (concepts.length === 0) return null;
  
  // Calculate weights for all concepts
  const weights = calculateAllWeights(conceptMastery, concepts);
  
  // Calculate total weight
  const totalWeight = concepts.reduce((sum, concept) => sum + weights[concept], 0);
  
  if (totalWeight === 0) {
    // Fallback to uniform random if all weights are 0
    return concepts[Math.floor(Math.random() * concepts.length)];
  }
  
  // Weighted random selection
  let random = Math.random() * totalWeight;
  
  for (const concept of concepts) {
    random -= weights[concept];
    if (random <= 0) {
      return concept;
    }
  }
  
  // Fallback (should never reach here)
  return concepts[concepts.length - 1];
}

/**
 * Select multiple concepts using weighted random selection
 * Ensures no duplicates
 */
export function selectWeightedConcepts(
  conceptMastery: Record<string, ConceptStats>,
  concepts: Concept[],
  count: number
): Concept[] {
  if (concepts.length === 0 || count === 0) return [];
  
  const selected: Concept[] = [];
  const available = [...concepts];
  
  for (let i = 0; i < Math.min(count, available.length); i++) {
    const concept = selectWeightedConcept(conceptMastery, available);
    if (concept) {
      selected.push(concept);
      // Remove selected concept from available pool
      const index = available.indexOf(concept);
      if (index > -1) {
        available.splice(index, 1);
      }
    }
  }
  
  return selected;
}

// ============================================================
// EXERCISE SELECTION
// ============================================================

interface Exercise {
  concept?: Concept;
  [key: string]: any;
}

/**
 * Select exercises with adaptive weighting
 * Exercises targeting weaker concepts are more likely to be selected
 */
export function selectWeightedExercises(
  conceptMastery: Record<string, ConceptStats>,
  exercises: Exercise[],
  count: number
): Exercise[] {
  if (exercises.length === 0 || count === 0) return [];
  
  // Group exercises by concept
  const exercisesByConcept: Partial<Record<Concept, Exercise[]>> = {};
  const exercisesWithoutConcept: Exercise[] = [];
  
  for (const exercise of exercises) {
    if (exercise.concept) {
      if (!exercisesByConcept[exercise.concept]) {
        exercisesByConcept[exercise.concept] = [];
      }
      exercisesByConcept[exercise.concept]!.push(exercise);
    } else {
      exercisesWithoutConcept.push(exercise);
    }
  }
  
  // Calculate concept weights
  const concepts = Object.keys(exercisesByConcept) as Concept[];
  const weights = calculateAllWeights(conceptMastery, concepts);
  
  // Select exercises based on weighted concept selection
  const selected: Exercise[] = [];
  const usedExercises = new Set<Exercise>();
  
  for (let i = 0; i < count; i++) {
    // Select a concept based on weights
    const concept = selectWeightedConcept(conceptMastery, concepts);
    
    if (concept && exercisesByConcept[concept]) {
      // Select a random exercise for this concept
      const conceptExercises = exercisesByConcept[concept].filter(e => !usedExercises.has(e));
      
      if (conceptExercises.length > 0) {
        const exercise = conceptExercises[Math.floor(Math.random() * conceptExercises.length)];
        selected.push(exercise);
        usedExercises.add(exercise);
      }
    } else if (exercisesWithoutConcept.length > 0) {
      // Fallback to exercises without concept
      const available = exercisesWithoutConcept.filter(e => !usedExercises.has(e));
      if (available.length > 0) {
        const exercise = available[Math.floor(Math.random() * available.length)];
        selected.push(exercise);
        usedExercises.add(exercise);
      }
    }
    
    // If we've used all exercises, stop
    if (usedExercises.size >= exercises.length) {
      break;
    }
  }
  
  return selected;
}

// ============================================================
// ADAPTIVE PRACTICE SESSION
// ============================================================

/**
 * Generate an adaptive practice session
 * Focuses more on weaker concepts while maintaining variety
 */
export function generateAdaptiveSession(
  conceptMastery: Record<string, ConceptStats>,
  availableConcepts: Concept[],
  sessionLength: number = 10
): {
  focusConcepts: Concept[];
  reviewConcepts: Concept[];
  distribution: Partial<Record<Concept, number>>;
} {
  // Select focus concepts (weaker areas)
  const focusConcepts = selectWeightedConcepts(
    conceptMastery,
    availableConcepts,
    Math.ceil(sessionLength * 0.6) // 60% focus on weak areas
  );
  
  // Select review concepts (maintain proficiency)
  const remainingConcepts = availableConcepts.filter(c => !focusConcepts.includes(c));
  const reviewConcepts = selectWeightedConcepts(
    conceptMastery,
    remainingConcepts,
    Math.floor(sessionLength * 0.4) // 40% review
  );
  
  // Calculate distribution
  const distribution: Partial<Record<Concept, number>> = {};
  
  for (const concept of focusConcepts) {
    distribution[concept] = (distribution[concept] || 0) + 2; // More practice
  }
  
  for (const concept of reviewConcepts) {
    distribution[concept] = (distribution[concept] || 0) + 1; // Maintenance
  }
  
  return {
    focusConcepts,
    reviewConcepts,
    distribution,
  };
}

// ============================================================
// ADMIN ANALYTICS
// ============================================================

/**
 * Generate admin-only analytics report
 * This is NOT shown to cadets
 */
export function generateAdminAnalytics(
  conceptMastery: Record<string, ConceptStats>,
  concepts: Concept[]
): {
  conceptAccuracy: Record<Concept, number>;
  suggestedFocus: Concept[];
  troubleAreas: Concept[];
} {
  // Calculate accuracy for each concept
  const conceptAccuracy: Record<Concept, number> = {} as Record<Concept, number>;
  
  for (const concept of concepts) {
    const stats = conceptMastery[concept];
    if (stats && stats.attempts > 0) {
      conceptAccuracy[concept] = Math.round((stats.correct / stats.attempts) * 100);
    } else {
      conceptAccuracy[concept] = 0;
    }
  }
  
  // Identify suggested focus areas (lowest accuracy with sufficient attempts)
  const MIN_ATTEMPTS = 5;
  const troubleAreas = concepts
    .filter(c => conceptMastery[c]?.attempts >= MIN_ATTEMPTS)
    .sort((a, b) => conceptAccuracy[a] - conceptAccuracy[b])
    .slice(0, 3);
  
  // Suggested focus includes both trouble areas and unattempted concepts
  const suggestedFocus = [
    ...troubleAreas,
    ...concepts.filter(c => !conceptMastery[c] || conceptMastery[c].attempts === 0)
  ].slice(0, 5);
  
  return {
    conceptAccuracy,
    suggestedFocus,
    troubleAreas,
  };
}
