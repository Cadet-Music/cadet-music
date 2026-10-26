/**
 * Adaptive Content Weighting System with Safeguards
 * 
 * This system invisibly adapts content selection based on concept mastery
 * while preventing common adaptive learning failures:
 * - Over-focusing on one concept (anti-spiral protection)
 * - Forgetting mastered concepts (concept floor)
 * - Reacting to too little data (minimum data requirement)
 * - Becoming predictable (randomization + diversity)
 * - Ignoring new material (exploration quota)
 */

import { ConceptStats, Concept, getMasteryLevel, MasteryLevel } from './competency';
import { calculateSongAwareWeights } from './songs';

// ============================================================
// SAFEGUARD CONFIGURATION
// ============================================================

/**
 * Configuration constants for adaptive safeguards
 */
export const ADAPTIVE_CONFIG = {
  // Anti-spiral protection: Max percentage of session for any single concept
  MAX_CONCEPT_PERCENTAGE: 0.35, // 35%
  
  // Concept floor: Minimum appearance rates
  MIN_APPEARANCE_RATE: {
    'Mastered': 0.10,    // 10% minimum
    'Proficient': 0.15,  // 15% minimum
    'Developing': 0.0,   // Base weighting (no floor)
    'Learning': 0.0,     // Boost weighting (no floor)
    'Unknown': 0.0,      // Exploration quota handles this
  },
  
  // Minimum data requirement: Attempts before classification
  MIN_ATTEMPTS_FOR_CLASSIFICATION: 10,
  
  // Exploration quota: Percentage for new/low-attempt concepts
  EXPLORATION_QUOTA: 0.20, // 20%
  
  // Recency decay: Days until weight starts decaying
  RECENCY_DECAY_DAYS: 7,
  RECENCY_DECAY_RATE: 0.95, // 5% reduction per week
  
  // Diversity: Max consecutive same-concept questions
  MAX_CONSECUTIVE_SAME_CONCEPT: 2,
};

// ============================================================
// ENHANCED MASTERY STATES
// ============================================================

/**
 * Extended mastery states including Unknown
 */
export type AdaptiveMasteryState = 'Unknown' | MasteryLevel;

/**
 * Updated weight multipliers with Unknown state
 */
export const ADAPTIVE_WEIGHTS: Record<AdaptiveMasteryState, number> = {
  'Unknown': 2.5,     // New/unattempted concepts
  'Learning': 3.0,    // 0-39% mastery
  'Developing': 2.0,  // 40-69% mastery
  'Proficient': 1.5,  // 70-89% mastery
  'Mastered': 1.0,    // 90-100% mastery
};

// ============================================================
// CONCEPT STATE CLASSIFICATION
// ============================================================

/**
 * Determine the adaptive state of a concept
 * 
 * @param stats - Concept statistics
 * @returns Adaptive mastery state
 * 
 * Logic:
 * - If attempts < MIN_ATTEMPTS_FOR_CLASSIFICATION: Unknown
 * - Otherwise: Use mastery level from competency system
 */
export function getAdaptiveState(stats: ConceptStats | undefined): AdaptiveMasteryState {
  // No data or insufficient data
  if (!stats || stats.attempts < ADAPTIVE_CONFIG.MIN_ATTEMPTS_FOR_CLASSIFICATION) {
    return 'Unknown';
  }
  
  // Sufficient data: use mastery level
  return getMasteryLevel(stats.masteryScore);
}

// ============================================================
// RECENCY DECAY SYSTEM
// ============================================================

/**
 * Calculate recency multiplier based on last reviewed date
 * 
 * @param lastReviewed - ISO date string of last review
 * @returns Multiplier (0.0 to 1.0)
 * 
 * Logic:
 * - Recent practice (within RECENCY_DECAY_DAYS): 1.0 (no decay)
 * - Each week after: multiply by RECENCY_DECAY_RATE
 * - Example: 2 weeks ago = 0.95, 4 weeks ago = 0.9025
 */
export function calculateRecencyMultiplier(lastReviewed: string | undefined): number {
  if (!lastReviewed) return 1.0; // Never reviewed = no decay
  
  const lastDate = new Date(lastReviewed);
  const now = new Date();
  const daysSinceReview = Math.floor((now.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
  
  // No decay if reviewed within threshold
  if (daysSinceReview <= ADAPTIVE_CONFIG.RECENCY_DECAY_DAYS) {
    return 1.0;
  }
  
  // Calculate decay: each week reduces by RECENCY_DECAY_RATE
  const weeksSinceReview = Math.floor((daysSinceReview - ADAPTIVE_CONFIG.RECENCY_DECAY_DAYS) / 7);
  return Math.pow(ADAPTIVE_CONFIG.RECENCY_DECAY_RATE, weeksSinceReview);
}

// ============================================================
// ENHANCED WEIGHT CALCULATION
// ============================================================

/**
 * Calculate adaptive weight for a single concept
 * 
 * @param stats - Concept statistics
 * @returns Adaptive weight (higher = more likely to be selected)
 * 
 * Formula:
 * weight = baseWeight × recencyMultiplier
 * 
 * Where:
 * - baseWeight comes from ADAPTIVE_WEIGHTS based on state
 * - recencyMultiplier accounts for time since last review
 */
export function calculateAdaptiveWeight(stats: ConceptStats | undefined): number {
  const state = getAdaptiveState(stats);
  const baseWeight = ADAPTIVE_WEIGHTS[state];
  const recencyMultiplier = calculateRecencyMultiplier(stats?.lastReviewed);
  
  return baseWeight * recencyMultiplier;
}

/**
 * Calculate adaptive weights for all concepts
 * Optionally includes song-aware weighting if selectedSongs provided
 */
export function calculateAllAdaptiveWeights(
  conceptMastery: Record<string, ConceptStats>,
  concepts: Concept[],
  selectedSongs?: string[]
): Record<Concept, number> {
  const weights: Partial<Record<Concept, number>> = {};
  
  for (const concept of concepts) {
    weights[concept] = calculateAdaptiveWeight(conceptMastery[concept]);
  }
  
  // Apply song-aware weighting if songs are selected
  if (selectedSongs && selectedSongs.length > 0) {
    const songWeights = calculateSongAwareWeights(selectedSongs, conceptMastery);
    
    // Multiply existing weights by song-aware weights
    for (const concept of concepts) {
      if (songWeights[concept]) {
        weights[concept] = (weights[concept] || 1.0) * songWeights[concept];
      }
    }
  }
  
  return weights as Record<Concept, number>;
}

// ============================================================
// SESSION TRACKING (ANTI-SPIRAL PROTECTION)
// ============================================================

/**
 * Track concept selection counts in current session
 */
export interface SessionTracker {
  conceptCounts: Partial<Record<Concept, number>>;
  totalSelected: number;
  recentSelections: Concept[]; // Last N selections for diversity
}

/**
 * Create a new session tracker
 */
export function createSessionTracker(): SessionTracker {
  return {
    conceptCounts: {},
    totalSelected: 0,
    recentSelections: [],
  };
}

/**
 * Check if a concept has hit the session cap
 * 
 * @param concept - Concept to check
 * @param tracker - Session tracker
 * @param sessionSize - Total planned session size
 * @returns true if concept should be excluded
 * 
 * Anti-spiral protection:
 * - Calculate max allowed: sessionSize × MAX_CONCEPT_PERCENTAGE
 * - If concept has reached max, exclude it
 */
export function hasHitSessionCap(
  concept: Concept,
  tracker: SessionTracker,
  sessionSize: number
): boolean {
  const count = tracker.conceptCounts[concept] || 0;
  const maxAllowed = Math.ceil(sessionSize * ADAPTIVE_CONFIG.MAX_CONCEPT_PERCENTAGE);
  return count >= maxAllowed;
}

/**
 * Check if selecting a concept would violate diversity rules
 * 
 * @param concept - Concept to check
 * @param tracker - Session tracker
 * @returns true if concept should be excluded
 * 
 * Diversity protection:
 * - Count consecutive occurrences at end of recentSelections
 * - If >= MAX_CONSECUTIVE_SAME_CONCEPT, exclude
 */
export function violatesDiversityRule(
  concept: Concept,
  tracker: SessionTracker
): boolean {
  const recent = tracker.recentSelections;
  if (recent.length < ADAPTIVE_CONFIG.MAX_CONSECUTIVE_SAME_CONCEPT) {
    return false;
  }
  
  // Count consecutive same-concept at the end
  let consecutiveCount = 0;
  for (let i = recent.length - 1; i >= 0; i--) {
    if (recent[i] === concept) {
      consecutiveCount++;
    } else {
      break;
    }
  }
  
  return consecutiveCount >= ADAPTIVE_CONFIG.MAX_CONSECUTIVE_SAME_CONCEPT;
}

/**
 * Update session tracker after selecting a concept
 */
export function updateSessionTracker(
  tracker: SessionTracker,
  concept: Concept
): SessionTracker {
  const newCounts = { ...tracker.conceptCounts };
  newCounts[concept] = (newCounts[concept] || 0) + 1;
  
  const newRecent = [...tracker.recentSelections, concept];
  // Keep only last 10 for memory efficiency
  if (newRecent.length > 10) {
    newRecent.shift();
  }
  
  return {
    conceptCounts: newCounts,
    totalSelected: tracker.totalSelected + 1,
    recentSelections: newRecent,
  };
}

// ============================================================
// CONCEPT FLOOR SYSTEM
// ============================================================

/**
 * Apply concept floor to weights
 * 
 * Ensures mastered/proficient concepts maintain minimum appearance rates
 * 
 * @param weights - Base weights
 * @param conceptMastery - Concept statistics
 * @param concepts - All concepts
 * @returns Adjusted weights with floors applied
 * 
 * Logic:
 * - Calculate total weight
 * - For each concept, check if weight / total < floor
 * - If so, increase weight to meet floor
 */
export function applyConceptFloor(
  weights: Record<Concept, number>,
  conceptMastery: Record<string, ConceptStats>,
  concepts: Concept[]
): Record<Concept, number> {
  const totalWeight = concepts.reduce((sum, c) => sum + weights[c], 0);
  const adjustedWeights = { ...weights };
  
  for (const concept of concepts) {
    const state = getAdaptiveState(conceptMastery[concept]);
    const floor = ADAPTIVE_CONFIG.MIN_APPEARANCE_RATE[state];
    
    if (floor > 0) {
      const currentRate = weights[concept] / totalWeight;
      if (currentRate < floor) {
        // Increase weight to meet floor
        adjustedWeights[concept] = floor * totalWeight;
      }
    }
  }
  
  return adjustedWeights;
}

// ============================================================
// EXPLORATION QUOTA SYSTEM
// ============================================================

/**
 * Identify concepts eligible for exploration
 * 
 * @param conceptMastery - Concept statistics
 * @param concepts - All concepts
 * @returns Concepts that are new or low-attempt
 * 
 * Exploration candidates:
 * - Unknown concepts (0 attempts)
 * - Low-attempt concepts (< MIN_ATTEMPTS_FOR_CLASSIFICATION)
 */
export function getExplorationCandidates(
  conceptMastery: Record<string, ConceptStats>,
  concepts: Concept[]
): Concept[] {
  return concepts.filter(concept => {
    const stats = conceptMastery[concept];
    return !stats || stats.attempts < ADAPTIVE_CONFIG.MIN_ATTEMPTS_FOR_CLASSIFICATION;
  });
}

// ============================================================
// ENHANCED WEIGHTED SELECTION WITH SAFEGUARDS
// ============================================================

/**
 * Select a concept with all safeguards applied
 * 
 * @param conceptMastery - Concept statistics
 * @param concepts - All concepts
 * @param tracker - Session tracker
 * @param sessionSize - Total planned session size
 * @param selectedSongs - Optional array of selected song IDs for song-aware weighting
 * @returns Selected concept or null
 * 
 * Algorithm:
 * 1. Check if exploration quota should be used (20% of time)
 * 2. If yes, select from exploration candidates
 * 3. If no, calculate adaptive weights (with song-aware weighting if songs selected)
 * 4. Apply concept floor
 * 5. Filter out concepts that hit session cap
 * 6. Filter out concepts that violate diversity
 * 7. Perform weighted random selection
 */
export function selectWeightedConceptWithSafeguards(
  conceptMastery: Record<string, ConceptStats>,
  concepts: Concept[],
  tracker: SessionTracker,
  sessionSize: number,
  selectedSongs?: string[]
): Concept | null {
  if (concepts.length === 0) return null;
  
  // Step 1: Check exploration quota
  const explorationRate = tracker.totalSelected / sessionSize;
  const shouldExplore = explorationRate < ADAPTIVE_CONFIG.EXPLORATION_QUOTA;
  
  if (shouldExplore) {
    // Step 2: Select from exploration candidates
    const candidates = getExplorationCandidates(conceptMastery, concepts);
    const eligibleCandidates = candidates.filter(c => 
      !hasHitSessionCap(c, tracker, sessionSize) &&
      !violatesDiversityRule(c, tracker)
    );
    
    if (eligibleCandidates.length > 0) {
      // Random selection from eligible exploration candidates
      return eligibleCandidates[Math.floor(Math.random() * eligibleCandidates.length)];
    }
    // Fall through to normal selection if no eligible exploration candidates
  }
  
  // Step 3: Calculate adaptive weights (with song-aware weighting if applicable)
  let weights = calculateAllAdaptiveWeights(conceptMastery, concepts, selectedSongs);
  
  // Step 4: Apply concept floor
  weights = applyConceptFloor(weights, conceptMastery, concepts);
  
  // Step 5: Filter out concepts that hit session cap
  const eligibleConcepts = concepts.filter(c => 
    !hasHitSessionCap(c, tracker, sessionSize) &&
    !violatesDiversityRule(c, tracker)
  );
  
  if (eligibleConcepts.length === 0) {
    // All concepts are capped or violate diversity
    // Relax constraints: allow capped concepts
    const relaxedEligible = concepts.filter(c => !violatesDiversityRule(c, tracker));
    if (relaxedEligible.length === 0) {
      return null; // Nothing eligible
    }
    // Select from relaxed eligible
    return selectFromWeightedPool(weights, relaxedEligible);
  }
  
  // Step 6: Perform weighted random selection
  return selectFromWeightedPool(weights, eligibleConcepts);
}

/**
 * Helper: Select from weighted pool
 */
function selectFromWeightedPool(
  weights: Record<Concept, number>,
  eligibleConcepts: Concept[]
): Concept | null {
  const totalWeight = eligibleConcepts.reduce((sum, c) => sum + weights[c], 0);
  
  if (totalWeight === 0) {
    return eligibleConcepts[Math.floor(Math.random() * eligibleConcepts.length)];
  }
  
  let random = Math.random() * totalWeight;
  
  for (const concept of eligibleConcepts) {
    random -= weights[concept];
    if (random <= 0) {
      return concept;
    }
  }
  
  return eligibleConcepts[eligibleConcepts.length - 1];
}

// ============================================================
// ENHANCED SESSION GENERATION
// ============================================================

/**
 * Generate an adaptive session with all safeguards
 * 
 * @param conceptMastery - Concept statistics
 * @param concepts - All concepts
 * @param sessionLength - Number of questions in session
 * @returns Array of selected concepts
 * 
 * Process:
 * 1. Create session tracker
 * 2. For each question slot:
 *    a. Select concept with safeguards
 *    b. Update tracker
 *    c. Add to session
 * 3. Return complete session
 */
export function generateAdaptiveSessionWithSafeguards(
  conceptMastery: Record<string, ConceptStats>,
  concepts: Concept[],
  sessionLength: number = 10,
  selectedSongs?: string[]
): Concept[] {
  const session: Concept[] = [];
  let tracker = createSessionTracker();
  
  for (let i = 0; i < sessionLength; i++) {
    const selected = selectWeightedConceptWithSafeguards(
      conceptMastery,
      concepts,
      tracker,
      sessionLength,
      selectedSongs
    );
    
    if (selected) {
      session.push(selected);
      tracker = updateSessionTracker(tracker, selected);
    }
  }
  
  return session;
}

// ============================================================
// ENHANCED ADMIN ANALYTICS
// ============================================================

/**
 * Enhanced analytics data structure
 */
export interface EnhancedConceptAnalytics {
  concept: Concept;
  attempts: number;
  accuracy: number;
  mastery: number;
  state: AdaptiveMasteryState;
  lastReviewed: string | null;
  recencyMultiplier: number;
  adaptiveWeight: number;
  sessionCount: number;
}

/**
 * Generate enhanced admin analytics with all safeguard data
 * 
 * @param conceptMastery - Concept statistics
 * @param concepts - All concepts
 * @param sessionTracker - Optional current session tracker
 * @returns Array of enhanced analytics for each concept
 */
export function generateEnhancedAdminAnalytics(
  conceptMastery: Record<string, ConceptStats>,
  concepts: Concept[],
  sessionTracker?: SessionTracker
): EnhancedConceptAnalytics[] {
  return concepts.map(concept => {
    const stats = conceptMastery[concept];
    const state = getAdaptiveState(stats);
    const recencyMultiplier = calculateRecencyMultiplier(stats?.lastReviewed);
    const adaptiveWeight = calculateAdaptiveWeight(stats);
    const sessionCount = sessionTracker?.conceptCounts[concept] || 0;
    
    return {
      concept,
      attempts: stats?.attempts || 0,
      accuracy: stats ? Math.round((stats.correct / stats.attempts) * 100) : 0,
      mastery: stats?.masteryScore || 0,
      state,
      lastReviewed: stats?.lastReviewed || null,
      recencyMultiplier,
      adaptiveWeight,
      sessionCount,
    };
  });
}

// ============================================================
// BACKWARD COMPATIBILITY WRAPPERS
// ============================================================

/**
 * Legacy wrapper for selectWeightedConcept
 * Maintains compatibility with existing code
 */
export function selectWeightedConcept(
  conceptMastery: Record<string, ConceptStats>,
  concepts: Concept[],
  selectedSongs?: string[]
): Concept | null {
  const tracker = createSessionTracker();
  return selectWeightedConceptWithSafeguards(conceptMastery, concepts, tracker, 10, selectedSongs);
}

/**
 * Legacy wrapper for selectWeightedConcepts
 */
export function selectWeightedConcepts(
  conceptMastery: Record<string, ConceptStats>,
  concepts: Concept[],
  count: number,
  selectedSongs?: string[]
): Concept[] {
  return generateAdaptiveSessionWithSafeguards(conceptMastery, concepts, count, selectedSongs);
}

/**
 * Legacy wrapper for calculateConceptWeight
 */
export function calculateConceptWeight(stats: ConceptStats | undefined): number {
  return calculateAdaptiveWeight(stats);
}

/**
 * Legacy wrapper for calculateAllWeights
 */
export function calculateAllWeights(
  conceptMastery: Record<string, ConceptStats>,
  concepts: Concept[],
  selectedSongs?: string[]
): Record<Concept, number> {
  return calculateAllAdaptiveWeights(conceptMastery, concepts, selectedSongs);
}
