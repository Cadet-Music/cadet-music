/**
 * Song Lesson Generator
 * 
 * Creates step-by-step interactive lessons for each prepared music piece
 * Includes microphone practice, audio references, and progressive learning
 */

import { Song, CadetLevel } from './data';

export interface SongLesson {
  id: string;
  songId: string;
  title: string;
  instrument: string;
  level: CadetLevel;
  phases: SongPhase[];
  keySignature: string;
  timeSignature: string;
  tempo: string;
  difficulty: 'easy' | 'medium' | 'hard';
  concepts: string[];
}

export interface SongPhase {
  id: string;
  name: string;
  description: string;
  measures: string;
  notes: string[];
  fingerings: string[];
  practiceTips: string[];
  microphoneExercise?: {
    targetNotes: string[];
    exerciseName: string;
  };
}

/**
 * Generate step-by-step lesson for a song
 */
export function generateSongLesson(song: Song, instrument: string): SongLesson {
  const lessonId = `song-${instrument}-${song.id}`;
  
  // Determine key signature and other details based on song and instrument
  const songDetails = getSongDetails(song, instrument);
  
  return {
    id: lessonId,
    songId: song.id,
    title: `🎵 Learning "${song.title}" - Step by Step`,
    instrument,
    level: song.level,
    phases: generatePhases(song, instrument),
    ...songDetails,
  };
}

/**
 * Get song-specific details (key, time signature, tempo, etc.)
 */
function getSongDetails(song: Song, instrument: string) {
  // Default values - these would be expanded with actual song data
  const details: Record<string, any> = {
    'western-portrait': {
      keySignature: 'Bb Major',
      timeSignature: '4/4',
      tempo: '♩=80-100',
      difficulty: 'easy' as const,
      concepts: ['Bb Major scale', 'quarter notes', 'legato phrasing'],
    },
    'austrian-melody': {
      keySignature: 'F Major',
      timeSignature: '3/4',
      tempo: '♩=90-110',
      difficulty: 'easy' as const,
      concepts: ['F Major scale', 'waltz rhythm', 'phrasing'],
    },
    'minstrel-boy': {
      keySignature: 'Eb Major',
      timeSignature: '4/4',
      tempo: '♩=70-90',
      difficulty: 'easy' as const,
      concepts: ['Eb Major scale', 'lyrical phrasing', 'dynamics'],
    },
    'ode-to-joy': {
      keySignature: 'F Major',
      timeSignature: '4/4',
      tempo: '♩=100-120',
      difficulty: 'easy' as const,
      concepts: ['F Major scale', 'scale patterns', 'steady tempo'],
    },
    'america': {
      keySignature: 'F Major',
      timeSignature: '3/4',
      tempo: '♩=80-100',
      difficulty: 'easy' as const,
      concepts: ['F Major scale', 'waltz rhythm', 'patriotic style'],
    },
    'scarborough-fair': {
      keySignature: 'D Minor',
      timeSignature: '3/4',
      tempo: '♩=70-90',
      difficulty: 'easy' as const,
      concepts: ['D Minor scale', 'folk style', 'legato phrasing'],
    },
  };

  return details[song.id] || {
    keySignature: 'Bb Major',
    timeSignature: '4/4',
    tempo: '♩=80-100',
    difficulty: 'medium' as const,
    concepts: ['basic technique'],
  };
}

/**
 * Generate learning phases for a song
 */
function generatePhases(song: Song, instrument: string): SongPhase[] {
  // This would be expanded with actual song data
  // For now, create a generic 5-phase structure
  
  const phases: SongPhase[] = [
    {
      id: 'phase-1',
      name: 'Step 1: Listen and Analyze',
      description: 'Listen to the reference recording and analyze the song structure',
      measures: 'Full song',
      notes: [],
      fingerings: [],
      practiceTips: [
        'Listen to the reference recording 3 times',
        'Tap your foot to the beat',
        'Identify the key signature and time signature',
        'Notice the overall structure (A-B-A, etc.)',
      ],
    },
    {
      id: 'phase-2',
      name: 'Step 2: Learn First Phrase',
      description: 'Master the opening phrase note by note',
      measures: 'Measures 1-4',
      notes: ['Bb', 'C', 'D', 'Eb'], // Example notes
      fingerings: ['Left 1-2-3', 'Left 1-2-3 + Right 1', 'Left 1-2-3 + Right 1-2', 'Left 1-2-3 + Right 1-2-3'],
      practiceTips: [
        'Play each note slowly with a metronome',
        'Focus on smooth finger transitions',
        'Use steady air support',
        'Check your intonation with a tuner',
      ],
      microphoneExercise: {
        targetNotes: ['Bb', 'C', 'D', 'Eb'],
        exerciseName: 'Practice the first phrase',
      },
    },
    {
      id: 'phase-3',
      name: 'Step 3: Learn Second Phrase',
      description: 'Master the second phrase and connect to the first',
      measures: 'Measures 5-8',
      notes: ['F', 'Eb', 'D', 'C'], // Example notes
      fingerings: ['Right 1', 'Left 1-2-3 + Right 1-2-3', 'Left 1-2-3 + Right 1-2', 'Left 1-2-3 + Right 1'],
      practiceTips: [
        'Practice the second phrase separately',
        'Then connect phrase 1 and phrase 2',
        'Focus on smooth transitions between phrases',
        'Maintain steady tempo throughout',
      ],
      microphoneExercise: {
        targetNotes: ['F', 'Eb', 'D', 'C'],
        exerciseName: 'Practice the second phrase',
      },
    },
    {
      id: 'phase-4',
      name: 'Step 4: Complete the Song',
      description: 'Learn the remaining phrases and play the full song',
      measures: 'Measures 9-end',
      notes: [], // Would be filled with actual notes
      fingerings: [], // Would be filled with actual fingerings
      practiceTips: [
        'Learn the remaining phrases one by one',
        'Practice connecting all phrases smoothly',
        'Play the full song slowly at first',
        'Gradually increase tempo to performance speed',
      ],
    },
    {
      id: 'phase-5',
      name: 'Step 5: Performance Polish',
      description: 'Add musical expression and prepare for performance',
      measures: 'Full song',
      notes: [],
      fingerings: [],
      practiceTips: [
        'Add dynamics (crescendo, decrescendo)',
        'Focus on musical phrasing',
        'Practice with a metronome at performance tempo',
        'Record yourself and compare to the reference',
        'Perform for someone (family, friends, or even your pet!)',
      ],
    },
  ];

  return phases;
}

/**
 * Get all song lessons for a specific instrument and level
 */
export function getSongLessonsForLevel(level: CadetLevel, instrument: string): SongLesson[] {
  // This would import the actual song data and generate lessons
  // For now, return empty array
  return [];
}

/**
 * Get song lesson by ID
 */
export function getSongLessonById(lessonId: string): SongLesson | null {
  // This would look up the lesson in a registry
  return null;
}
