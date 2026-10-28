/**
 * Comprehensive Song Lessons - Step by Step
 * 
 * Detailed interactive lessons for all prepared music pieces
 * Organized by instrument and level
 */

import { CadetLevel } from './data';

export interface DetailedSongLesson {
  id: string;
  title: string;
  composer?: string;
  instrument: 'saxophone' | 'clarinet' | 'bass-clarinet';
  level: CadetLevel;
  listType: 'A' | 'B';
  keySignature: string;
  timeSignature: string;
  tempo: string;
  difficulty: 'easy' | 'medium' | 'hard';
  concepts: string[];
  phases: DetailedPhase[];
}

export interface DetailedPhase {
  id: string;
  name: string;
  description: string;
  measures: string;
  notes?: string[];
  rhythm?: string;
  fingerings?: string[];
  practiceTips: string[];
  microphoneExercise?: {
    targetNotes: string[];
    exerciseName: string;
    difficulty: 'easy' | 'medium' | 'hard';
  };
  audioReference?: {
    url: string;
    description: string;
  };
}

// ============================================================
// SAXOPHONE SONG LESSONS - BASIC LEVEL
// ============================================================

export const SAXOPHONE_BASIC_LESSONS: DetailedSongLesson[] = [
  {
    id: 'sax-western-portrait',
    title: 'Western Portrait',
    instrument: 'saxophone',
    level: 'BASIC',
    listType: 'A',
    keySignature: 'Bb Major (2 flats: Bb, Eb)',
    timeSignature: '4/4',
    tempo: '♩=80-100 (Moderate)',
    difficulty: 'easy',
    concepts: ['Bb Major scale', 'quarter notes', 'legato phrasing', 'simple melody'],
    phases: [
      {
        id: 'phase-1',
        name: '🎧 Step 1: Listen and Analyze',
        description: 'Before playing, listen to the reference recording and understand the song structure',
        measures: 'Full song (16 measures)',
        practiceTips: [
          'Listen to the reference recording 3 times',
          'Tap your foot to the beat - feel the 4/4 rhythm',
          'Notice the song is in Bb Major (2 flats)',
          'Identify the A-B-A structure (phrase 1, phrase 2, repeat)',
          'Count the measures: 4 + 4 + 4 + 4 = 16 measures total',
        ],
        audioReference: {
          url: '/audio/sax-western-portrait.mp3',
          description: 'Reference recording of Western Portrait',
        },
      },
      {
        id: 'phase-2',
        name: '🎵 Step 2: Learn Phrase 1 (Measures 1-4)',
        description: 'Master the opening phrase - ascending Bb Major scale pattern',
        measures: 'Measures 1-4',
        notes: ['Bb', 'C', 'D', 'Eb', 'F', 'Eb', 'D', 'C'],
        rhythm: 'All quarter notes (1 beat each)',
        fingerings: [
          'Bb: Left 1-2-3 + Right 1 (side key)',
          'C: Left 1-2-3 + Right 1-2',
          'D: Left 1-2-3 + Right 1-2-3',
          'Eb: Left 1-2-3 + Right 1-2-3 + side key',
          'F: Right 1 only',
          'Then descend: Eb, D, C',
        ],
        practiceTips: [
          'Play each note slowly with a metronome at ♩=60',
          'Focus on smooth finger transitions',
          'Use steady air support throughout',
          'Check your intonation - Bb and Eb should be in tune',
          'Play the phrase 5 times in a row',
        ],
        microphoneExercise: {
          targetNotes: ['Bb', 'C', 'D', 'Eb', 'F', 'Eb', 'D', 'C'],
          exerciseName: 'Practice Phrase 1 - Ascending and Descending',
          difficulty: 'easy',
        },
      },
      {
        id: 'phase-3',
        name: '🎶 Step 3: Learn Phrase 2 (Measures 5-8)',
        description: 'Master the second phrase - different melodic pattern',
        measures: 'Measures 5-8',
        notes: ['Bb', 'A', 'G', 'F', 'Eb', 'F', 'G', 'A'],
        rhythm: 'All quarter notes',
        fingerings: [
          'Bb: Left 1-2-3 + Right 1',
          'A: Left 1-2 only',
          'G: Left 1-2-3 only',
          'F: Right 1 only',
          'Eb: Left 1-2-3 + Right 1-2-3 + side key',
          'Then ascend: F, G, A',
        ],
        practiceTips: [
          'Practice phrase 2 separately first',
          'Focus on the descending then ascending pattern',
          'Keep your embouchure firm but relaxed',
          'Maintain steady air support',
          'Play the phrase 5 times in a row',
        ],
        microphoneExercise: {
          targetNotes: ['Bb', 'A', 'G', 'F', 'Eb', 'F', 'G', 'A'],
          exerciseName: 'Practice Phrase 2 - Descending and Ascending',
          difficulty: 'easy',
        },
      },
      {
        id: 'phase-4',
        name: '🎼 Step 4: Connect Phrases 1 and 2',
        description: 'Play phrases 1 and 2 together with smooth transitions',
        measures: 'Measures 1-8',
        practiceTips: [
          'Play phrase 1, take a quick breath, then play phrase 2',
          'Breathe at the bar line (measure 4 to 5)',
          'Keep the tempo steady - don\'t rush or drag',
          'Focus on smooth transitions between phrases',
          'Play the 8-measure section 5 times',
        ],
        microphoneExercise: {
          targetNotes: ['Bb', 'C', 'D', 'Eb', 'F', 'Eb', 'D', 'C', 'Bb', 'A', 'G', 'F', 'Eb', 'F', 'G', 'A'],
          exerciseName: 'Practice Phrases 1 and 2 Together',
          difficulty: 'medium',
        },
      },
      {
        id: 'phase-5',
        name: '🎹 Step 5: Learn Phrases 3 and 4',
        description: 'Learn the remaining phrases (usually repeats or variations)',
        measures: 'Measures 9-16',
        practiceTips: [
          'Phrase 3 is often a repeat of phrase 1',
          'Phrase 4 is often a repeat of phrase 2',
          'Practice these phrases the same way you did phrases 1 and 2',
          'Focus on consistency - make the repeats sound identical',
          'Play the full 16-measure song slowly',
        ],
      },
      {
        id: 'phase-6',
        name: '🎺 Step 6: Full Song Performance',
        description: 'Play the complete song with musical expression',
        measures: 'Measures 1-16 (full song)',
        practiceTips: [
          'Play the full song at performance tempo (♩=80-100)',
          'Add dynamics: start at mf, crescendo slightly in phrase 3',
          'Focus on beautiful, legato tone throughout',
          'Maintain steady rhythm - use a metronome',
          'Record yourself and compare to the reference recording',
          'Perform for someone - family, friends, or even your pet!',
        ],
        microphoneExercise: {
          targetNotes: ['Full song melody'],
          exerciseName: 'Complete Song Performance',
          difficulty: 'medium',
        },
      },
    ],
  },
  {
    id: 'sax-austrian-melody',
    title: 'Austrian Melody',
    instrument: 'saxophone',
    level: 'BASIC',
    listType: 'A',
    keySignature: 'F Major (1 flat: Bb)',
    timeSignature: '3/4',
    tempo: '♩=90-110 (Moderate waltz)',
    difficulty: 'easy',
    concepts: ['F Major scale', 'waltz rhythm (3/4 time)', 'phrasing', 'lyrical playing'],
    phases: [
      {
        id: 'phase-1',
        name: '🎧 Step 1: Listen and Analyze',
        description: 'Listen to the waltz rhythm and understand the 3/4 time signature',
        measures: 'Full song',
        practiceTips: [
          'Listen to the reference recording 3 times',
          'Feel the waltz rhythm: "OOM-pah-pah, OOM-pah-pah"',
          'Count "1-2-3, 1-2-3" - emphasize beat 1',
          'Notice the song is in F Major (1 flat: Bb)',
          'Identify the lyrical, singing quality of the melody',
        ],
        audioReference: {
          url: '/audio/sax-austrian-melody.mp3',
          description: 'Reference recording of Austrian Melody',
        },
      },
      {
        id: 'phase-2',
        name: '🎵 Step 2: Learn the Waltz Rhythm',
        description: 'Master the 3/4 waltz rhythm before adding notes',
        measures: 'Any 4 measures',
        rhythm: 'Quarter - Quarter - Quarter (1-2-3)',
        practiceTips: [
          'Clap the rhythm: "1-2-3, 1-2-3, 1-2-3, 1-2-3"',
          'Emphasize beat 1 (the "OOM" in "OOM-pah-pah")',
          'Play long tones in 3/4: F (3 beats), G (3 beats), A (3 beats)',
          'Use a metronome set to ♩=90',
          'Make sure each measure has exactly 3 beats',
        ],
        microphoneExercise: {
          targetNotes: ['F', 'G', 'A', 'Bb'],
          exerciseName: 'Practice Waltz Rhythm with Long Tones',
          difficulty: 'easy',
        },
      },
      {
        id: 'phase-3',
        name: '🎶 Step 3: Learn Phrase 1',
        description: 'Master the opening phrase in 3/4 time',
        measures: 'Measures 1-4',
        notes: ['F', 'A', 'C', 'A', 'F', 'G', 'A', 'F'],
        rhythm: 'Quarter notes in 3/4 time',
        fingerings: [
          'F: Right 1 only',
          'A: Left 1-2 only',
          'C: Left 1-2-3 + Right 1-2',
          'Then descend: A, F',
          'G: Left 1-2-3 only',
          'A: Left 1-2 only',
          'F: Right 1 only',
        ],
        practiceTips: [
          'Play each measure slowly: count "1-2-3" for each',
          'Focus on the waltz feel - emphasize beat 1',
          'Keep your tone lyrical and singing',
          'Use smooth, legato articulation',
          'Play the phrase 5 times with a metronome',
        ],
        microphoneExercise: {
          targetNotes: ['F', 'A', 'C', 'A', 'F', 'G', 'A', 'F'],
          exerciseName: 'Practice Phrase 1 in Waltz Time',
          difficulty: 'easy',
        },
      },
      {
        id: 'phase-4',
        name: '🎼 Step 4: Learn Phrase 2',
        description: 'Master the second phrase and connect to phrase 1',
        measures: 'Measures 5-8',
        practiceTips: [
          'Learn phrase 2 separately first',
          'Maintain the waltz rhythm throughout',
          'Connect phrase 1 and phrase 2 smoothly',
          'Breathe at the phrase boundary (measure 4 to 5)',
          'Play phrases 1-2 together 5 times',
        ],
      },
      {
        id: 'phase-5',
        name: '🎹 Step 5: Complete the Song',
        description: 'Learn remaining phrases and play the full song',
        measures: 'Full song',
        practiceTips: [
          'Learn the remaining phrases one by one',
          'Maintain the waltz feel throughout',
          'Play the full song slowly at first',
          'Gradually increase tempo to ♩=90-110',
          'Focus on lyrical, singing tone quality',
        ],
      },
      {
        id: 'phase-6',
        name: '🎺 Step 6: Performance Polish',
        description: 'Add musical expression and prepare for performance',
        measures: 'Full song',
        practiceTips: [
          'Emphasize the waltz rhythm: "OOM-pah-pah"',
          'Add dynamics: crescendo in the middle, decrescendo at the end',
          'Play with a beautiful, lyrical tone',
          'Record yourself and compare to the reference',
          'Perform for someone - share the joy of waltz!',
        ],
      },
    ],
  },
  {
    id: 'sax-minstrel-boy',
    title: 'The Minstrel Boy',
    instrument: 'saxophone',
    level: 'BASIC',
    listType: 'A',
    keySignature: 'Eb Major (3 flats: Bb, Eb, Ab)',
    timeSignature: '4/4',
    tempo: '♩=70-90 (Lyrical)',
    difficulty: 'easy',
    concepts: ['Eb Major scale', 'lyrical phrasing', 'dynamic contrast', 'folk song style'],
    phases: [
      {
        id: 'phase-1',
        name: '🎧 Step 1: Listen and Analyze',
        description: 'Listen to this Irish folk song and understand its lyrical character',
        measures: 'Full song',
        practiceTips: [
          'Listen to the reference recording 3 times',
          'Notice the lyrical, singing quality of the melody',
          'Feel the 4/4 rhythm - steady and flowing',
          'The song is in Eb Major (3 flats: Bb, Eb, Ab)',
          'Identify the emotional character - proud and nostalgic',
        ],
        audioReference: {
          url: '/audio/sax-minstrel-boy.mp3',
          description: 'Reference recording of The Minstrel Boy',
        },
      },
      {
        id: 'phase-2',
        name: '🎵 Step 2: Learn the Eb Major Scale',
        description: 'Master the Eb Major scale before learning the song',
        measures: 'N/A (scale practice)',
        notes: ['Eb', 'F', 'G', 'Ab', 'Bb', 'C', 'D', 'Eb'],
        fingerings: [
          'Eb: Left 1-2-3 + Right 1-2-3 + side key',
          'F: Right 1 only',
          'G: Left 1-2-3 only',
          'Ab: Left 1-2-3 + Right 1',
          'Bb: Left 1-2-3 + Right 1 (side key)',
          'C: Left 1-2-3 + Right 1-2',
          'D: Left 1-2-3 + Right 1-2-3',
          'Eb: (octave key + same fingering as low Eb)',
        ],
        practiceTips: [
          'Play the Eb Major scale ascending and descending',
          'Use a metronome at ♩=60',
          'Focus on smooth finger transitions',
          'Pay special attention to Ab - it\'s a new note for many students',
          'Play the scale 5 times perfectly in a row',
        ],
        microphoneExercise: {
          targetNotes: ['Eb', 'F', 'G', 'Ab', 'Bb', 'C', 'D', 'Eb'],
          exerciseName: 'Practice Eb Major Scale',
          difficulty: 'easy',
        },
      },
      {
        id: 'phase-3',
        name: '🎶 Step 3: Learn Phrase 1',
        description: 'Master the opening phrase with lyrical phrasing',
        measures: 'Measures 1-4',
        practiceTips: [
          'Play the phrase slowly at ♩=60',
          'Focus on beautiful, legato tone',
          'Use steady air support throughout',
          'Shape the phrase with a slight crescendo',
          'Play the phrase 5 times with consistent tone',
        ],
      },
      {
        id: 'phase-4',
        name: '🎼 Step 4: Learn Phrase 2',
        description: 'Master the second phrase and connect to phrase 1',
        measures: 'Measures 5-8',
        practiceTips: [
          'Learn phrase 2 separately',
          'Connect phrases 1 and 2 smoothly',
          'Breathe at the phrase boundary',
          'Maintain the lyrical character throughout',
          'Play phrases 1-2 together 5 times',
        ],
      },
      {
        id: 'phase-5',
        name: '🎹 Step 5: Complete the Song',
        description: 'Learn remaining phrases and play the full song',
        measures: 'Full song',
        practiceTips: [
          'Learn the remaining phrases one by one',
          'Maintain the lyrical, singing quality',
          'Play the full song slowly at first',
          'Gradually increase tempo to ♩=70-90',
          'Focus on beautiful tone and phrasing',
        ],
      },
      {
        id: 'phase-6',
        name: '🎺 Step 6: Performance Polish',
        description: 'Add musical expression and prepare for performance',
        measures: 'Full song',
        practiceTips: [
          'Play with lyrical, singing tone throughout',
          'Add dynamic contrast: softer phrases, louder climaxes',
          'Shape each phrase with a musical arc',
          'Record yourself and compare to the reference',
          'Perform with emotion - this is a proud, nostalgic song!',
        ],
      },
    ],
  },
  {
    id: 'sax-ode-to-joy',
    title: 'Ode to Joy',
    composer: 'Ludwig van Beethoven',
    instrument: 'saxophone',
    level: 'BASIC',
    listType: 'B',
    keySignature: 'F Major (1 flat: Bb)',
    timeSignature: '4/4',
    tempo: '♩=100-120 (Moderate)',
    difficulty: 'easy',
    concepts: ['F Major scale', 'famous melody', 'steady rhythm', 'classical style'],
    phases: [
      {
        id: 'phase-1',
        name: '🎧 Step 1: Listen and Analyze',
        description: 'Listen to this famous Beethoven melody - you probably already know it!',
        measures: 'Full song',
        practiceTips: [
          'Listen to the reference recording 3 times',
          'Sing along if you know the words: "Joy, joy, joy..."',
          'Feel the steady 4/4 rhythm',
          'The song is in F Major (1 flat: Bb)',
          'Notice the simple, memorable melody',
        ],
        audioReference: {
          url: '/audio/sax-ode-to-joy.mp3',
          description: 'Reference recording of Ode to Joy',
        },
      },
      {
        id: 'phase-2',
        name: '🎵 Step 2: Learn the Famous Opening',
        description: 'Master the most recognizable phrase in classical music',
        measures: 'Measures 1-4',
        notes: ['F', 'F', 'G', 'A', 'A', 'G', 'F', 'E'],
        rhythm: 'All quarter notes',
        fingerings: [
          'F: Right 1 only',
          'F: Right 1 only',
          'G: Left 1-2-3 only',
          'A: Left 1-2 only',
          'A: Left 1-2 only',
          'G: Left 1-2-3 only',
          'F: Right 1 only',
          'E: Right 1-2 only',
        ],
        practiceTips: [
          'Play the famous opening: F-F-G-A | A-G-F-E',
          'Count "1-2-3-4" for each phrase',
          'Use steady, even quarter notes',
          'Focus on smooth finger transitions',
          'Play the phrase 10 times until it\'s automatic',
        ],
        microphoneExercise: {
          targetNotes: ['F', 'F', 'G', 'A', 'A', 'G', 'F', 'E'],
          exerciseName: 'Practice the Famous Opening',
          difficulty: 'easy',
        },
      },
      {
        id: 'phase-3',
        name: '🎶 Step 3: Learn the Response',
        description: 'Master the second phrase that answers the opening',
        measures: 'Measures 5-8',
        notes: ['D', 'D', 'E', 'F', 'F', 'E', 'E'],
        rhythm: 'Quarter - Quarter - Quarter - Quarter | Half - Quarter - Half',
        practiceTips: [
          'Learn the second phrase: D-D-E-F | F(hold) - E - E(hold)',
          'Notice the longer notes (half notes) at the end',
          'Hold the half notes for 2 full beats',
          'Connect phrase 1 and phrase 2 smoothly',
          'Play phrases 1-2 together 5 times',
        ],
      },
      {
        id: 'phase-4',
        name: '🎼 Step 4: Complete the Song',
        description: 'Learn the remaining phrases and play the full song',
        measures: 'Full song',
        practiceTips: [
          'The song repeats the opening pattern',
          'Learn the remaining phrases one by one',
          'Play the full song slowly at first',
          'Gradually increase tempo to ♩=100-120',
          'Focus on steady rhythm and clear tone',
        ],
      },
      {
        id: 'phase-5',
        name: '🎺 Step 5: Performance Polish',
        description: 'Add musical expression and prepare for performance',
        measures: 'Full song',
        practiceTips: [
          'Play with joy and confidence - it\'s "Ode to Joy"!',
          'Use steady, even rhythm throughout',
          'Add slight dynamics: crescendo to the climax',
          'Record yourself and compare to the reference',
          'Perform for someone - everyone knows this melody!',
        ],
      },
    ],
  },
  {
    id: 'sax-america',
    title: 'America (My Country \'Tis of Thee)',
    instrument: 'saxophone',
    level: 'BASIC',
    listType: 'B',
    keySignature: 'F Major (1 flat: Bb)',
    timeSignature: '3/4',
    tempo: '♩=80-100 (Moderate)',
    difficulty: 'easy',
    concepts: ['F Major scale', 'patriotic song', '3/4 time', 'hymn style'],
    phases: [
      {
        id: 'phase-1',
        name: '🎧 Step 1: Listen and Analyze',
        description: 'Listen to this patriotic American hymn',
        measures: 'Full song',
        practiceTips: [
          'Listen to the reference recording 3 times',
          'Feel the 3/4 waltz-like rhythm',
          'The song is in F Major (1 flat: Bb)',
          'Notice the dignified, hymn-like character',
          'This is also known as "My Country \'Tis of Thee"',
        ],
        audioReference: {
          url: '/audio/sax-america.mp3',
          description: 'Reference recording of America',
        },
      },
      {
        id: 'phase-2',
        name: '🎵 Step 2: Learn the Melody',
        description: 'Master the famous melody phrase by phrase',
        measures: 'Measures 1-8',
        practiceTips: [
          'Learn the melody slowly at ♩=60',
          'Focus on the 3/4 rhythm: "1-2-3, 1-2-3"',
          'Use beautiful, hymn-like tone quality',
          'Play with dignity and respect',
          'Practice each phrase 5 times',
        ],
      },
      {
        id: 'phase-3',
        name: '🎶 Step 3: Complete the Song',
        description: 'Learn all phrases and play the full song',
        measures: 'Full song',
        practiceTips: [
          'Learn the remaining phrases',
          'Play the full song at ♩=80-100',
          'Maintain the dignified, hymn-like character',
          'Use steady, supported air throughout',
          'Play with pride and respect',
        ],
      },
      {
        id: 'phase-4',
        name: '🎺 Step 4: Performance Polish',
        description: 'Prepare for performance',
        measures: 'Full song',
        practiceTips: [
          'Play with dignity and pride',
          'Use beautiful, hymn-like tone',
          'Maintain steady 3/4 rhythm',
          'Record yourself and listen back',
          'Perform at a patriotic event or ceremony',
        ],
      },
    ],
  },
  {
    id: 'sax-scarborough-fair',
    title: 'Scarborough Fair',
    instrument: 'saxophone',
    level: 'BASIC',
    listType: 'B',
    keySignature: 'D Minor (1 flat: Bb)',
    timeSignature: '3/4',
    tempo: '♩=70-90 (Flowing)',
    difficulty: 'easy',
    concepts: ['D Minor scale', 'folk song', '3/4 time', 'legato phrasing'],
    phases: [
      {
        id: 'phase-1',
        name: '🎧 Step 1: Listen and Analyze',
        description: 'Listen to this traditional English folk song',
        measures: 'Full song',
        practiceTips: [
          'Listen to the reference recording 3 times',
          'Feel the flowing 3/4 rhythm',
          'The song is in D Minor (1 flat: Bb)',
          'Notice the mysterious, ancient character',
          'This is a very old English folk song',
        ],
        audioReference: {
          url: '/audio/sax-scarborough-fair.mp3',
          description: 'Reference recording of Scarborough Fair',
        },
      },
      {
        id: 'phase-2',
        name: '🎵 Step 2: Learn the D Minor Scale',
        description: 'Master the D Minor scale before learning the song',
        measures: 'N/A (scale practice)',
        notes: ['D', 'E', 'F', 'G', 'A', 'Bb', 'C', 'D'],
        practiceTips: [
          'Play the D Minor scale ascending and descending',
          'Use a metronome at ♩=60',
          'Focus on smooth finger transitions',
          'Pay attention to the Bb - it\'s the only flat',
          'Play the scale 5 times perfectly',
        ],
        microphoneExercise: {
          targetNotes: ['D', 'E', 'F', 'G', 'A', 'Bb', 'C', 'D'],
          exerciseName: 'Practice D Minor Scale',
          difficulty: 'easy',
        },
      },
      {
        id: 'phase-3',
        name: '🎶 Step 3: Learn the Famous Melody',
        description: 'Master the haunting melody phrase by phrase',
        measures: 'Measures 1-8',
        practiceTips: [
          'Learn the melody slowly at ♩=60',
          'Focus on the flowing, legato phrasing',
          'Use a mysterious, ancient tone quality',
          'Play with emotion and feeling',
          'Practice each phrase 5 times',
        ],
      },
      {
        id: 'phase-4',
        name: '🎼 Step 4: Complete the Song',
        description: 'Learn all phrases and play the full song',
        measures: 'Full song',
        practiceTips: [
          'Learn the remaining phrases',
          'Play the full song at ♩=70-90',
          'Maintain the mysterious, flowing character',
          'Use beautiful, legato tone throughout',
          'Play with emotion and storytelling',
        ],
      },
      {
        id: 'phase-5',
        name: '🎺 Step 5: Performance Polish',
        description: 'Prepare for performance',
        measures: 'Full song',
        practiceTips: [
          'Play with mystery and emotion',
          'Use beautiful, legato tone',
          'Maintain the flowing 3/4 rhythm',
          'Record yourself and listen back',
          'Tell the story of the song through your playing',
        ],
      },
    ],
  },
];

// ============================================================
// CLARINET SONG LESSONS - BASIC LEVEL
// ============================================================

export const CLARINET_BASIC_LESSONS: DetailedSongLesson[] = [
  {
    id: 'cl-hot-cross-buns',
    title: 'Hot Cross Buns',
    instrument: 'clarinet',
    level: 'BASIC',
    listType: 'A',
    keySignature: 'Bb Major (2 flats: Bb, Eb)',
    timeSignature: '4/4',
    tempo: '♩=80-100 (Moderate)',
    difficulty: 'easy',
    concepts: ['Bb Major scale', 'quarter notes', 'simple melody', 'first song'],
    phases: [
      {
        id: 'phase-1',
        name: '🎧 Step 1: Listen and Analyze',
        description: 'Listen to this simple, familiar song',
        measures: 'Full song (8 measures)',
        practiceTips: [
          'Listen to the reference recording 3 times',
          'Tap your foot to the steady 4/4 beat',
          'Notice the simple, repetitive melody',
          'The song is in Bb Major (concert pitch)',
          'This is one of the first songs every clarinetist learns',
        ],
        audioReference: {
          url: '/audio/cl-hot-cross-buns.mp3',
          description: 'Reference recording of Hot Cross Buns',
        },
      },
      {
        id: 'phase-2',
        name: '🎵 Step 2: Learn the Three Notes',
        description: 'Master the three notes used in this song: Bb, A, G',
        measures: 'N/A (note practice)',
        notes: ['Bb', 'A', 'G'],
        fingerings: [
          'Bb (written C): Left thumb (register key) + Left 1-2-3',
          'A (written B): Left thumb + Left 1-2',
          'G (written A): Left thumb + Left 1',
        ],
        practiceTips: [
          'Play each note slowly and clearly',
          'Focus on smooth finger transitions',
          'Use steady air support throughout',
          'Check your intonation with a tuner',
          'Play each note 10 times perfectly',
        ],
        microphoneExercise: {
          targetNotes: ['Bb', 'A', 'G'],
          exerciseName: 'Practice the Three Notes',
          difficulty: 'easy',
        },
      },
      {
        id: 'phase-3',
        name: '🎶 Step 3: Learn the Famous Melody',
        description: 'Master the simple, memorable melody',
        measures: 'Measures 1-4',
        notes: ['Bb', 'A', 'G', 'G', 'G', 'A', 'Bb', 'A', 'G'],
        rhythm: 'Quarter - Quarter - Half | Quarter - Quarter - Half | Quarter-Quarter-Quarter-Quarter',
        practiceTips: [
          'Play the famous melody: Bb-A-G (hold) | Bb-A-G (hold)',
          'Count "1-2-3-4" for each measure',
          'Hold the half notes for 2 full beats',
          'Use steady, even rhythm throughout',
          'Play the melody 10 times until it\'s automatic',
        ],
        microphoneExercise: {
          targetNotes: ['Bb', 'A', 'G', 'G', 'G', 'A', 'Bb', 'A', 'G'],
          exerciseName: 'Practice the Famous Melody',
          difficulty: 'easy',
        },
      },
      {
        id: 'phase-4',
        name: '🎼 Step 4: Complete the Song',
        description: 'Learn the remaining phrases and play the full song',
        measures: 'Full song (8 measures)',
        practiceTips: [
          'Learn the second half of the song',
          'Play the full 8-measure song slowly',
          'Focus on steady rhythm and clear tone',
          'Gradually increase tempo to ♩=80-100',
          'Play the full song 5 times perfectly',
        ],
      },
      {
        id: 'phase-5',
        name: '🎺 Step 5: Performance Ready',
        description: 'Polish your performance',
        measures: 'Full song',
        practiceTips: [
          'Play with confidence and joy',
          'Use beautiful, clear tone throughout',
          'Maintain steady rhythm',
          'Record yourself and listen back',
          'Perform for someone - you\'ve learned your first song!',
        ],
      },
    ],
  },
  {
    id: 'cl-mary-had-a-little-lamb',
    title: 'Mary Had a Little Lamb',
    instrument: 'clarinet',
    level: 'BASIC',
    listType: 'A',
    keySignature: 'F Major (1 flat: Bb)',
    timeSignature: '4/4',
    tempo: '♩=90-110 (Moderate)',
    difficulty: 'easy',
    concepts: ['F Major scale', 'quarter notes', 'simple melody', 'familiar tune'],
    phases: [
      {
        id: 'phase-1',
        name: '🎧 Step 1: Listen and Analyze',
        description: 'Listen to this familiar children\'s song',
        measures: 'Full song',
        practiceTips: [
          'Listen to the reference recording 3 times',
          'Sing along if you know the words',
          'Feel the steady 4/4 rhythm',
          'The song is in F Major (1 flat: Bb)',
          'Notice the simple, memorable melody',
        ],
        audioReference: {
          url: '/audio/cl-mary-had-a-little-lamb.mp3',
          description: 'Reference recording of Mary Had a Little Lamb',
        },
      },
      {
        id: 'phase-2',
        name: '🎵 Step 2: Learn the Melody',
        description: 'Master the famous melody phrase by phrase',
        measures: 'Measures 1-4',
        notes: ['A', 'G', 'F', 'G', 'A', 'A', 'A'],
        rhythm: 'Quarter - Quarter - Quarter - Quarter | Quarter - Quarter - Half',
        practiceTips: [
          'Play the famous opening: A-G-F-G | A-A-A (hold)',
          'Count "1-2-3-4" for each measure',
          'Use steady, even quarter notes',
          'Hold the final A for 2 full beats',
          'Play the phrase 10 times until it\'s automatic',
        ],
        microphoneExercise: {
          targetNotes: ['A', 'G', 'F', 'G', 'A', 'A', 'A'],
          exerciseName: 'Practice the Famous Opening',
          difficulty: 'easy',
        },
      },
      {
        id: 'phase-3',
        name: '🎶 Step 3: Complete the Song',
        description: 'Learn all phrases and play the full song',
        measures: 'Full song',
        practiceTips: [
          'Learn the remaining phrases',
          'Play the full song slowly at first',
          'Focus on steady rhythm and clear tone',
          'Gradually increase tempo to ♩=90-110',
          'Play the full song 5 times perfectly',
        ],
      },
      {
        id: 'phase-4',
        name: '🎺 Step 4: Performance Polish',
        description: 'Prepare for performance',
        measures: 'Full song',
        practiceTips: [
          'Play with joy and confidence',
          'Use clear, beautiful tone',
          'Maintain steady rhythm',
          'Record yourself and listen back',
          'Perform for someone - everyone knows this song!',
        ],
      },
    ],
  },
];

// ============================================================
// BASS CLARINET SONG LESSONS
// ============================================================

export const BASS_CLARINET_BASIC_LESSONS: DetailedSongLesson[] = [
  {
    id: 'bcl-hot-cross-buns',
    title: 'Hot Cross Buns',
    instrument: 'bass-clarinet',
    level: 'BASIC',
    listType: 'A',
    keySignature: 'Bb Major (2 flats: Bb, Eb)',
    timeSignature: '4/4',
    tempo: '♩=70-90 (Moderate)',
    difficulty: 'easy',
    concepts: ['Bb Major scale', 'quarter notes', 'simple melody', 'low register'],
    phases: [
      {
        id: 'phase-1',
        name: '🎧 Step 1: Listen and Analyze',
        description: 'Listen to this simple song in the bass clarinet\'s rich low register',
        measures: 'Full song (8 measures)',
        practiceTips: [
          'Listen to the reference recording 3 times',
          'Notice the rich, dark tone of the bass clarinet',
          'The song is in Bb Major (concert pitch)',
          'Bass clarinet sounds an octave lower than written',
          'Feel the steady 4/4 rhythm',
        ],
        audioReference: {
          url: '/audio/bcl-hot-cross-buns.mp3',
          description: 'Reference recording of Hot Cross Buns on bass clarinet',
        },
      },
      {
        id: 'phase-2',
        name: '🎵 Step 2: Learn the Low Notes',
        description: 'Master the low register notes: E, D, C (written)',
        measures: 'N/A (note practice)',
        notes: ['E', 'D', 'C'],
        fingerings: [
          'E (written): Right hand 1-2-3 only',
          'D (written): Right hand 1-2 only',
          'C (written): Right hand 1 only',
        ],
        practiceTips: [
          'Play each note slowly and clearly',
          'Focus on rich, full tone in the low register',
          'Use plenty of air support - low notes need more air',
          'Keep your embouchure firm but relaxed',
          'Play each note 10 times with beautiful tone',
        ],
        microphoneExercise: {
          targetNotes: ['E', 'D', 'C'],
          exerciseName: 'Practice Low Register Notes',
          difficulty: 'easy',
        },
      },
      {
        id: 'phase-3',
        name: '🎶 Step 3: Learn the Melody',
        description: 'Master the simple melody in the low register',
        measures: 'Measures 1-4',
        notes: ['E', 'D', 'C', 'C', 'C', 'D', 'E', 'D', 'C'],
        rhythm: 'Quarter - Quarter - Half | Quarter - Quarter - Half | Quarter-Quarter-Quarter-Quarter',
        practiceTips: [
          'Play the melody: E-D-C (hold) | E-D-C (hold)',
          'Focus on rich, dark tone quality',
          'Use steady air support throughout',
          'Hold the half notes for 2 full beats',
          'Play the melody 10 times with beautiful tone',
        ],
        microphoneExercise: {
          targetNotes: ['E', 'D', 'C', 'C', 'C', 'D', 'E', 'D', 'C'],
          exerciseName: 'Practice the Melody in Low Register',
          difficulty: 'easy',
        },
      },
      {
        id: 'phase-4',
        name: '🎼 Step 4: Complete the Song',
        description: 'Learn all phrases and play the full song',
        measures: 'Full song (8 measures)',
        practiceTips: [
          'Learn the second half of the song',
          'Play the full 8-measure song slowly',
          'Focus on rich, full tone in the low register',
          'Use plenty of air support',
          'Play the full song 5 times with beautiful tone',
        ],
      },
      {
        id: 'phase-5',
        name: '🎺 Step 5: Performance Ready',
        description: 'Polish your performance',
        measures: 'Full song',
        practiceTips: [
          'Play with rich, dark tone quality',
          'Use plenty of air support for low notes',
          'Maintain steady rhythm',
          'Record yourself and listen to the beautiful bass clarinet sound',
          'Perform for someone - show off the bass clarinet!',
        ],
      },
    ],
  },
];

/**
 * Get all song lessons for a specific instrument and level
 */
export function getAllSongLessons(instrument: string, level: CadetLevel): DetailedSongLesson[] {
  if (instrument === 'clarinet') {
    return CLARINET_BASIC_LESSONS.filter(lesson => lesson.level === level);
  } else if (instrument === 'bass-clarinet') {
    return BASS_CLARINET_BASIC_LESSONS.filter(lesson => lesson.level === level);
  } else {
    // Default to saxophone
    return SAXOPHONE_BASIC_LESSONS.filter(lesson => lesson.level === level);
  }
}

/**
 * Get song lesson by ID
 */
export function getSongLessonById(lessonId: string): DetailedSongLesson | null {
  const allLessons = [
    ...SAXOPHONE_BASIC_LESSONS,
    ...CLARINET_BASIC_LESSONS,
    ...BASS_CLARINET_BASIC_LESSONS,
  ];
  
  return allLessons.find(lesson => lesson.id === lessonId) || null;
}
