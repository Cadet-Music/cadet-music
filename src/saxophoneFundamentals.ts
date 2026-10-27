/**
 * Comprehensive Saxophone Fundamentals
 * 
 * This module contains detailed, research-based instruction on proper saxophone technique.
 * All content is based on authoritative pedagogy sources to ensure students learn correct
 * fundamentals from the beginning, preventing bad habits that are difficult to correct later.
 */

export interface FundamentalConcept {
  id: string;
  title: string;
  description: string;
  keyPoints: string[];
  commonMistakes: string[];
  practiceRoutine: string;
}

export const SAXOPHONE_FUNDAMENTALS: FundamentalConcept[] = [
  {
    id: 'embouchure',
    title: 'Proper Embouchure Formation',
    description: 'The embouchure is the way you set your mouth and facial muscles to play the saxophone. A correct embouchure is essential for producing a good tone and preventing bad habits.',
    keyPoints: [
      'Top teeth rest on top of the mouthpiece (about 1/2 inch from the tip)',
      'Bottom lip curls over bottom teeth, creating a cushion for the reed',
      'Corners of mouth firm and pulled inward (like saying "M" or drawing a string tight)',
      'Chin flat and pointed down (not bunched up)',
      'No air escaping from corners of mouth',
      'Jaw dropped slightly to allow reed to vibrate freely',
      'Pressure comes from corners inward, NOT from biting down',
      'Bottom teeth should never touch the reed'
    ],
    commonMistakes: [
      'Biting down too hard on the reed (causes squeaky, strained sound)',
      'Corners of mouth pulling back (causes thin, unfocused tone)',
      'Chin bunched up (restricts reed vibration)',
      'Bottom lip not rolled over teeth (causes airy sound)',
      'Too much mouthpiece in mouth (causes stuffy sound)',
      'Too little mouthpiece in mouth (causes squeaking)',
      'Jaw too tight or too loose'
    ],
    practiceRoutine: 'Practice embouchure formation without the instrument first. Look in a mirror and check: Are corners firm? Is chin flat? Is bottom lip rolled over teeth? Hold the position for 30 seconds, rest, repeat 5 times. Then practice with just the mouthpiece and neck, focusing on maintaining the embouchure while producing sound.'
  },
  {
    id: 'breathing',
    title: 'Breathing and Air Support',
    description: 'Proper breathing is the foundation of good saxophone playing. You must learn to breathe from your diaphragm, not your chest, and maintain consistent air support throughout each phrase.',
    keyPoints: [
      'Breathe from the diaphragm (belly breathing), not the chest',
      'Shoulders stay relaxed and down when breathing',
      'Belly expands outward when inhaling',
      'Use abdominal muscles to control air stream (like doing a sit-up)',
      'Air should be fast and steady, not slow and weak',
      'Think of fogging up a mirror - fast, focused air',
      'Throat stays open and relaxed (think "AW" or "OH" sound)',
      'Support continues throughout the entire phrase, not just at the beginning'
    ],
    commonMistakes: [
      'Breathing from chest (shoulders rise)',
      'Not using enough air (weak, airy sound)',
      'Air support collapsing mid-phrase',
      'Throat tight or constricted',
      'Blowing too hard (causes sharp pitch)',
      'Not breathing deeply enough (running out of air)',
      'Holding breath instead of continuous air flow'
    ],
    practiceRoutine: 'Lie on your back with a book on your belly. Breathe in - book should rise. Breathe out - book should fall. Practice this for 2 minutes. Then stand up and practice the same breathing. Next, hiss "ssss" on one breath for as long as possible (aim for 20+ seconds). Finally, play long tones on your saxophone, focusing on steady, supported air throughout each note.'
  },
  {
    id: 'posture',
    title: 'Posture and Hand Position',
    description: 'Proper posture and hand position are essential for good technique and preventing injury. Good posture also helps with breathing and tone production.',
    keyPoints: [
      'Stand or sit tall with back straight but relaxed',
      'Shoulders down and back (not hunched)',
      'Head up, looking forward (not down at the instrument)',
      'Feet shoulder-width apart when standing',
      'Neck strap adjusted so mouthpiece comes to your mouth naturally',
      'You should not have to bend your neck to reach the mouthpiece',
      'Left hand on top, right hand on bottom',
      'Fingers curved like holding a baseball',
      'Use pads of fingers, not tips',
      'Keep fingers close to keys (1-2 cm away)',
      'Thumbs support the weight: left thumb on thumb rest, right thumb under thumb hook',
      'Wrists straight, not bent'
    ],
    commonMistakes: [
      'Hunching shoulders (causes tension)',
      'Bending neck down to reach mouthpiece (adjust strap!)',
      'Gripping too tightly with thumbs',
      'Fingers flying far away from keys',
      'Flat fingers instead of curved',
      'Using fingertips instead of pads',
      'Bent wrists',
      'Slouching or leaning to one side'
    ],
    practiceRoutine: 'Practice standing in good posture without the instrument for 2 minutes. Check in a mirror: Are shoulders relaxed? Is back straight? Is head up? Then hold the saxophone and check: Is the mouthpiece at the right height? Are your thumbs supporting? Are your fingers curved and close to the keys? Hold for 5 minutes, checking posture regularly.'
  },
  {
    id: 'assembly',
    title: 'Assembly and Care',
    description: 'Proper assembly and care of your saxophone is essential for good playing and instrument longevity. Learn the correct way to put your instrument together and take care of it.',
    keyPoints: [
      'Always assemble in this order: neck to body, reed to mouthpiece, mouthpiece to neck',
      'Tighten neck screw just enough to hold securely (don\'t over-tighten)',
      'Wet the reed for 30-60 seconds before attaching (use saliva or water)',
      'Align reed tip with mouthpiece tip (just barely visible above)',
      'Secure ligature firmly but not too tight',
      'Push mouthpiece onto neck gently, twist slightly to secure',
      'After playing: swab body and neck immediately',
      'Wipe mouthpiece with soft cloth',
      'Store reed in reed guard to dry',
      'Never leave instrument assembled when not playing',
      'Case the instrument carefully with all parts secure'
    ],
    commonMistakes: [
      'Forcing parts together (can damage corks and keys)',
      'Not wetting the reed (causes squeaking and poor tone)',
      'Reed misaligned with mouthpiece',
      'Over-tightening ligature (damages reed)',
      'Over-tightening neck screw (strips threads)',
      'Not swabbing after playing (causes mold and pad damage)',
      'Leaving instrument assembled (moisture damages pads)',
      'Handling saxophone by keys (bends them easily)'
    ],
    practiceRoutine: 'Practice assembling your saxophone 3 times. Time yourself - you should be able to do it in under 2 minutes. Check each step: Is neck secure? Is reed wet and aligned? Is ligature tight enough? After practice, go through the complete care routine: swab body, swab neck, wipe mouthpiece, store reed, case instrument.'
  },
  {
    id: 'first-sound',
    title: 'Producing Your First Sound',
    description: 'Learning to produce a clear, steady tone on the saxophone requires proper embouchure, breathing, and air support working together.',
    keyPoints: [
      'Form your embouchure as described in the embouchure lesson',
      'Place mouthpiece in mouth - top teeth on top, bottom lip cushioning reed',
      'About 1/2 inch of mouthpiece should be inside your mouth',
      'Take a deep breath from your diaphragm',
      'Blow steady, fast air through the instrument',
      'Keep throat open (think "AW" sound)',
      'Maintain embouchure firmness throughout the note',
      'Start with middle register notes (G, A, B) - they\'re easiest',
      'Aim for a clear, steady tone - not airy, not squeaky',
      'Hold the note for 4-8 beats with consistent tone'
    ],
    commonMistakes: [
      'Not enough air (airy, weak sound)',
      'Biting too hard (squeaky, strained sound)',
      'Embouchure collapsing (unfocused tone)',
      'Throat tight (restricted sound)',
      'Too much mouthpiece in mouth (stuffy sound)',
      'Too little mouthpiece in mouth (squeaking)',
      'Inconsistent air support (wavering tone)',
      'Giving up too soon (embouchure needs time to develop strength)'
    ],
    practiceRoutine: 'Start with just the mouthpiece and neck. Practice producing a steady tone for 10 seconds. Rest, repeat 5 times. Then assemble the full instrument. Play G for 4 beats, rest 4 beats, repeat 5 times. Focus on clear, steady tone. Do this for 5 minutes daily. Your embouchure will get tired - that\'s normal! Take breaks as needed.'
  },
  {
    id: 'long-tones',
    title: 'Long Tone Exercises',
    description: 'Long tones are the most important exercise for developing tone quality, embouchure strength, and breath control. They should be practiced daily.',
    keyPoints: [
      'Play a single note for 8-12 beats',
      'Focus on producing a beautiful, consistent tone',
      'Start at medium volume (mf)',
      'Keep tone steady - no wavering or shaking',
      'Maintain consistent air support throughout',
      'End with a clean cutoff (don\'t let tone fade)',
      'Practice on every note in your range',
      'Start with middle register (G, A, B), then expand',
      'Use a mirror to check embouchure',
      'Do this for 5-10 minutes every day'
    ],
    commonMistakes: [
      'Rushing through long tones (they require patience)',
      'Letting tone waver or shake',
      'Air support collapsing before note ends',
      'Embouchure getting tired and collapsing',
      'Not using a mirror to check form',
      'Skipping long tones (they\'re essential!)',
      'Playing too loud or too soft',
      'Not focusing on tone quality'
    ],
    practiceRoutine: 'Daily long tone routine: Play G for 12 beats (steady tone), rest 4 beats. Play A for 12 beats, rest 4 beats. Play B for 12 beats, rest 4 beats. Then play C-D-E-F-G-A-B-C ascending, holding each note for 8 beats. Descend back down. Focus on beautiful, consistent tone throughout. Do this for 10 minutes every day.'
  },
  {
    id: 'tonguing',
    title: 'Basic Tonguing Technique',
    description: 'Tonguing is how you start and articulate notes. Proper tonguing technique is essential for clear, precise playing.',
    keyPoints: [
      'Use the tip of your tongue to touch the tip of the reed',
      'Think of saying "TA" or "DA" - that\'s the tongue motion',
      'Tongue touches reed briefly, then releases',
      'Air support continues throughout - tongue just interrupts it',
      'Keep tongue motion small and quick',
      'Don\'t tongue too hard (causes accent)',
      'Each note should start cleanly with the tongue',
      'Practice tonguing on a single note first',
      'Then apply to scales and simple melodies',
      'Tongue position: behind top teeth, tip touches reed'
    ],
    commonMistakes: [
      'Tonguing too hard (causes harsh accent)',
      'Using too much tongue (slapping sound)',
      'Not enough air support when tonguing',
      'Tongue moving too slowly (notes sound slurred)',
      'Tonguing from the middle of tongue instead of tip',
      'Stopping air flow when tonguing',
      'Inconsistent tonguing (some notes articulated, some not)',
      'Tongue too far back in mouth'
    ],
    practiceRoutine: 'Start by tonguing on a single note (G). Play: TA-rest-TA-rest-TA-rest (quarter notes). Focus on clean, consistent articulation. Then play: TA-TA-TA-TA (quarter notes). Then: TA-TA-TA-TA (eighth notes). Keep air support steady throughout. Apply this to scales: tongue each note of a G major scale. Practice for 5 minutes daily.'
  }
];

/**
 * Get a specific fundamental concept by ID
 */
export const getFundamentalConcept = (id: string): FundamentalConcept | undefined => {
  return SAXOPHONE_FUNDAMENTALS.find(concept => concept.id === id);
};

/**
 * Get all fundamental concepts
 */
export const getAllFundamentalConcepts = (): FundamentalConcept[] => {
  return SAXOPHONE_FUNDAMENTALS;
};

/**
 * Check if a concept has been mastered (for future use with progress tracking)
 */
export const isConceptMastered = (conceptId: string, completedConcepts: string[]): boolean => {
  return completedConcepts.includes(conceptId);
};
