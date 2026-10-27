/**
 * Comprehensive Clarinet Fundamentals
 * 
 * This module contains detailed, research-based instruction on proper clarinet technique.
 * All content is based on authoritative pedagogy sources to ensure students learn correct
 * fundamentals from the beginning, preventing bad habits that are difficult to correct later.
 */

export interface ClarinetFundamentalConcept {
  id: string;
  title: string;
  description: string;
  keyPoints: string[];
  commonMistakes: string[];
  practiceRoutine: string;
}

export const CLARINET_FUNDAMENTALS: ClarinetFundamentalConcept[] = [
  {
    id: 'clarinet-embouchure',
    title: 'Proper Clarinet Embouchure Formation',
    description: 'The clarinet embouchure is different from saxophone. It requires a firmer, more focused approach with the corners of the mouth drawn forward like a milkshake straw.',
    keyPoints: [
      'Corners of mouth drawn forward and firm (like drinking through a straw)',
      'Bottom lip rolled slightly over bottom teeth (not too much, not too little)',
      'Top teeth rest directly on the mouthpiece (about 1/3 from the tip)',
      'Chin flat and pointed down (not bunched up)',
      'No air escaping from corners of mouth',
      'Pressure comes from corners inward, creating a seal',
      'Bottom lip provides cushion for reed vibration',
      'Jaw position: slightly forward, not clenched'
    ],
    commonMistakes: [
      'Corners of mouth pulling back (causes thin, nasal tone)',
      'Bottom lip too far over teeth (muffles sound)',
      'Bottom lip not far enough over teeth (causes squeaking)',
      'Biting down too hard (restricts reed vibration)',
      'Chin bunched up (causes stuffy tone)',
      'Too much mouthpiece in mouth (causes stuffy, covered sound)',
      'Too little mouthpiece in mouth (causes squeaking and poor tone)',
      'Jaw clenched or tight (restricts tone production)'
    ],
    practiceRoutine: 'Practice the "milkshake face" without the instrument: Draw corners forward like drinking through a straw. Hold for 30 seconds, rest, repeat 5 times. Look in a mirror to check: Are corners forward? Is chin flat? Then practice with just the mouthpiece and barrel, focusing on maintaining the embouchure while producing a steady tone.'
  },
  {
    id: 'clarinet-breathing',
    title: 'Breathing and Air Support for Clarinet',
    description: 'Clarinet requires focused, fast air support. The smaller mouthpiece and reed require more air pressure than saxophone to produce a full, rich tone.',
    keyPoints: [
      'Breathe from the diaphragm (belly breathing), not the chest',
      'Shoulders stay relaxed and down when breathing',
      'Belly expands outward when inhaling',
      'Use abdominal muscles to control air stream (like doing a sit-up)',
      'Air should be fast and focused, like blowing through a small straw',
      'Think of blowing a piece of paper across the room',
      'Throat stays open and relaxed (think "AW" or "OH" sound)',
      'Support continues throughout the entire phrase'
    ],
    commonMistakes: [
      'Breathing from chest (shoulders rise)',
      'Not using enough air (causes thin, weak tone)',
      'Air support collapsing mid-phrase',
      'Throat tight or constricted (causes squeaking)',
      'Blowing too slowly (causes flat pitch and stuffy tone)',
      'Not breathing deeply enough (running out of air)',
      'Holding breath instead of continuous air flow',
      'Tensing shoulders or neck'
    ],
    practiceRoutine: 'Lie on your back with a book on your belly. Breathe in - book should rise. Breathe out - book should fall. Practice this for 2 minutes. Then stand up and practice the same breathing. Next, practice blowing through a coffee stirrer (small straw) to develop focused air stream. Finally, play long tones on clarinet, focusing on fast, supported air.'
  },
  {
    id: 'clarinet-posture',
    title: 'Posture and Hand Position for Clarinet',
    description: 'Proper posture and hand position are essential for good clarinet technique. The clarinet is held at a 45-degree angle, different from saxophone.',
    keyPoints: [
      'Stand or sit tall with back straight but relaxed',
      'Shoulders down and back (not hunched)',
      'Head up, looking forward (not down at the instrument)',
      'Clarinet held at 45-degree angle from body',
      'Left hand on top, right hand on bottom',
      'Thumbs support the weight: left thumb on thumb rest, right thumb under the clarinet',
      'Fingers curved and close to keys',
      'Use pads of fingers, not tips',
      'Wrists straight, not bent',
      'Clarinet bell points toward the floor at 45-degree angle'
    ],
    commonMistakes: [
      'Hunching shoulders (causes tension)',
      'Bending neck down to look at fingers',
      'Holding clarinet too vertical (like saxophone)',
      'Gripping too tightly with thumbs',
      'Fingers flying far away from keys',
      'Flat fingers instead of curved',
      'Using fingertips instead of pads',
      'Bent wrists',
      'Bell pointing too far forward or backward'
    ],
    practiceRoutine: 'Practice standing in good posture without the instrument for 2 minutes. Check in a mirror: Are shoulders relaxed? Is back straight? Is head up? Then hold the clarinet at 45-degree angle and check: Is the angle correct? Are your thumbs supporting? Are your fingers curved and close to the keys? Hold for 5 minutes, checking posture regularly.'
  },
  {
    id: 'clarinet-assembly',
    title: 'Clarinet Assembly and Care',
    description: 'Clarinet assembly requires care and attention to detail. The instrument has five pieces and delicate keys that must be handled properly.',
    keyPoints: [
      'Clarinet has 5 pieces: mouthpiece, barrel, upper joint, lower joint, bell',
      'Always assemble in this order: bell to lower joint, lower joint to upper joint, barrel to upper joint, mouthpiece to barrel',
      'Use cork grease sparingly on all corks',
      'Never force pieces together - if it doesn\'t fit easily, check alignment',
      'Hold keys carefully when assembling - don\'t bend them',
      'After playing: swab through with cleaning swab immediately',
      'Wipe mouthpiece with soft cloth',
      'Store reed in reed guard to dry',
      'Never leave clarinet assembled when not playing',
      'Case the instrument carefully with all parts secure'
    ],
    commonMistakes: [
      'Forcing pieces together (can crack the clarinet)',
      'Not using cork grease (makes assembly difficult)',
      'Over-tightening pieces',
      'Bending keys while assembling',
      'Not swabbing after playing (causes mold and pad damage)',
      'Leaving reed on mouthpiece (damages reed)',
      'Leaving instrument assembled (moisture damages pads and corks)',
      'Handling clarinet by keys instead of body'
    ],
    practiceRoutine: 'Practice assembling your clarinet 3 times. Time yourself - you should be able to do it in under 3 minutes. Check each step: Are corks greased? Are pieces aligned? Are keys safe? After practice, go through the complete care routine: swab all pieces, wipe mouthpiece, store reed, case instrument properly.'
  },
  {
    id: 'clarinet-first-sound',
    title: 'Producing Your First Sound on Clarinet',
    description: 'The clarinet requires a different approach than saxophone for producing the first sound. The smaller reed and mouthpiece require more focused air and precise embouchure.',
    keyPoints: [
      'Form your embouchure: corners forward, chin flat, bottom lip over teeth',
      'Place mouthpiece in mouth - top teeth on mouthpiece, bottom lip cushioning reed',
      'About 1/3 of mouthpiece should be inside your mouth',
      'Take a deep breath from your diaphragm',
      'Blow fast, focused air through the instrument',
      'Think of blowing through a small straw',
      'Keep throat open and relaxed',
      'Start with mouthpiece and barrel only (no clarinet body)',
      'Aim for a clear, steady tone - not airy, not squeaky',
      'The mouthpiece/barrel should produce a concert F# (written G)'
    ],
    commonMistakes: [
      'Not enough air pressure (no sound or airy sound)',
      'Biting too hard (squeaky, strained sound)',
      'Embouchure too loose (airy, unfocused sound)',
      'Throat tight (restricted sound or squeaking)',
      'Too much mouthpiece in mouth (stuffy sound)',
      'Too little mouthpiece in mouth (squeaking)',
      'Corners of mouth pulling back (thin, nasal tone)',
      'Giving up too soon (embouchure needs time to develop strength)'
    ],
    practiceRoutine: 'Start with just the mouthpiece and barrel. Practice producing a steady tone for 10 seconds. Rest, repeat 5 times. Focus on: corners forward, chin flat, fast air. Then assemble the full clarinet. Play written G (concert F#) for 4 beats, rest 4 beats, repeat 5 times. Do this for 5 minutes daily. Your embouchure will get tired - that\'s normal! Take breaks as needed.'
  },
  {
    id: 'clarinet-register',
    title: 'Understanding Clarinet Registers',
    description: 'The clarinet has three distinct registers: chalumeau (low), clarion (middle), and altissimo (high). Each register has unique characteristics and fingerings.',
    keyPoints: [
      'Chalumeau register: Low range (written E3 to Bb4)',
      'Clarion register: Middle range (written B4 to C6)',
      'Altissimo register: High range (written C#6 and above)',
      'Register key (speaker key) switches from chalumeau to clarion',
      'Clarinet overblows at the 12th (unlike saxophone which overblows at the octave)',
      'Each register has different tone quality and response',
      'Low register: dark, rich, requires more air',
      'Middle register: bright, focused, most used',
      'High register: brilliant, requires precise embouchure and air support'
    ],
    commonMistakes: [
      'Not using register key properly (causes notes to not speak)',
      'Squeezing embouchure too much in high register',
      'Not enough air support in low register',
      'Trying to force high notes instead of using proper technique',
      'Not understanding the 12th interval (confusing fingerings)',
      'Uneven tone quality between registers',
      'Difficulty transitioning between registers smoothly'
    ],
    practiceRoutine: 'Practice each register separately: 1) Low register: Play E-F-G-A-B-C-D-E-F-G-A-Bb slowly, focus on rich, dark tone. 2) Middle register: Play B-C-D-E-F-G-A-B-C slowly, focus on bright, focused tone. 3) Practice register key transitions: Play low B, then add register key for middle F#. Go back and forth smoothly. Do this for 10 minutes daily.'
  },
  {
    id: 'clarinet-fingerings',
    title: 'Clarinet Fingerings and Technique',
    description: 'Clarinet fingerings are more complex than saxophone due to the register key and additional keys. Proper finger technique is essential for smooth playing.',
    keyPoints: [
      'Left hand: thumb (register key), index (A), middle (B), ring (C#)',
      'Right hand: thumb (support), index (E), middle (F), ring (G), pinky (side keys)',
      'Keep fingers curved and close to keys',
      'Use pads of fingers, not tips',
      'Fingers should move from the base knuckle, not the middle joint',
      'Register key operated by left thumb (side motion, not pressing down)',
      'Side keys operated by right hand pinky',
      'Trill keys: alternate fingerings for fast passages',
      'Keep fingers relaxed - tension slows you down',
      'Practice slow, deliberate finger movements first'
    ],
    commonMistakes: [
      'Flat fingers instead of curved',
      'Fingers too far from keys',
      'Using fingertips instead of pads',
      'Tension in hands and fingers',
      'Not using register key properly',
      'Slow, deliberate movements instead of quick, efficient ones',
      'Not keeping fingers close to keys when not in use',
      'Pressing too hard on keys'
    ],
    practiceRoutine: 'Practice finger technique without playing: 1) Place fingers on keys, lift and drop each finger individually. 2) Practice finger patterns: 1-2-3-4, 4-3-2-1. 3) Practice register key: thumb on, thumb off, repeat 20 times. 4) Play slow scales focusing on smooth, even finger movement. Use a metronome at ♩=60. Do this for 10 minutes daily.'
  },
  {
    id: 'clarinet-reeds',
    title: 'Clarinet Reed Selection and Care',
    description: 'Clarinet reeds are smaller and more delicate than saxophone reeds. Proper reed selection and care is essential for good tone and response.',
    keyPoints: [
      'Clarinet reeds come in strengths: 2 (soft) to 5 (hard)',
      'Beginners should start with strength 2 or 2.5',
      'Reed strength affects: tone quality, response, endurance',
      'Softer reeds: easier to play, brighter tone, less endurance',
      'Harder reeds: darker tone, more control, requires more embouchure strength',
      'Always wet reeds before playing (30-60 seconds in mouth or water)',
      'Store reeds in reed guard to dry properly',
      'Rotate between 3-4 reeds to extend life',
      'Replace reeds when they become chipped, cracked, or unresponsive',
      'Reed life: typically 1-4 weeks with regular playing'
    ],
    commonMistakes: [
      'Using reeds that are too hard (causes squeaking, poor response)',
      'Using reeds that are too soft (causes stuffy tone, poor intonation)',
      'Not wetting reeds before playing',
      'Storing reeds improperly (causes warping)',
      'Playing on damaged reeds (causes poor tone and response)',
      'Not rotating reeds (shortens reed life)',
      'Biting reed too hard (damages reed quickly)',
      'Not adjusting reeds when necessary'
    ],
    practiceRoutine: 'Check your reeds today: Are they chipped or cracked? Do they respond easily? If not, replace them. Start with strength 2.5 reeds. Wet each reed for 30 seconds before playing. After playing, wipe reeds gently and store in reed guard. Rotate between 3-4 reeds. Track how long each reed lasts. When a reed becomes unresponsive, replace it.'
  }
];

/**
 * Get a specific clarinet fundamental concept by ID
 */
export const getClarinetFundamentalConcept = (id: string): ClarinetFundamentalConcept | undefined => {
  return CLARINET_FUNDAMENTALS.find(concept => concept.id === id);
};

/**
 * Get all clarinet fundamental concepts
 */
export const getAllClarinetFundamentalConcepts = (): ClarinetFundamentalConcept[] => {
  return CLARINET_FUNDAMENTALS;
};

/**
 * Clarinet vs Saxophone comparison for students switching instruments
 */
export const CLARINET_VS_SAXOPHONE = {
  embouchure: {
    clarinet: 'Corners forward (milkshake straw), firmer, more focused',
    saxophone: 'Corners firm (saying "M"), more relaxed, wider'
  },
  airSupport: {
    clarinet: 'Faster, more focused air (like blowing through small straw)',
    saxophone: 'Steady, fast air (like fogging a mirror)'
  },
  mouthpiecePosition: {
    clarinet: 'About 1/3 of mouthpiece in mouth',
    saxophone: 'About 1/2 inch of mouthpiece in mouth'
  },
  angle: {
    clarinet: '45-degree angle from body',
    saxophone: 'More vertical, closer to body'
  },
  reed: {
    clarinet: 'Smaller, thinner, more delicate',
    saxophone: 'Larger, thicker, more durable'
  },
  registers: {
    clarinet: 'Three registers, overblows at 12th',
    saxophone: 'Two main registers, overblows at octave'
  },
  fingerings: {
    clarinet: 'More complex, register key essential',
    saxophone: 'Simpler, more intuitive'
  }
};
