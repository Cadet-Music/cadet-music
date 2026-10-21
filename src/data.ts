import { Lesson } from './store';

export interface PathSection {
  id: string;
  title: string;
  level: number;
  lessons: Lesson[];
}

export const CURRICULUM: PathSection[] = [
  {
    id: 'pre-basic',
    title: 'Getting Started',
    level: 0,
    lessons: [
      { id: 'pb-1', title: 'Meet Your Sax', type: 'theory', emoji: '🎷', topic: 'Basics', xp: 15, description: 'Learn the parts of your saxophone', interactive: true },
      { id: 'pb-2', title: 'Assembly Time', type: 'playing', emoji: '🔧', topic: 'Basics', xp: 15, description: 'Put it all together', interactive: true },
      { id: 'pb-3', title: 'Making a Sound', type: 'playing', emoji: '💨', topic: 'Basics', xp: 20, description: 'Your first embouchure & breath', interactive: true },
      { id: 'pb-4', title: 'Standing Tall', type: 'theory', emoji: '🧍', topic: 'Basics', xp: 15, description: 'Posture & hand position', interactive: true },
      { id: 'pb-5', title: 'Rhythm Tap', type: 'rhythm', emoji: '🥁', topic: 'Basics', xp: 20, description: 'Feel the beat — tap along!', interactive: true },
    ],
  },
  {
    id: 'notes',
    title: 'First Notes',
    level: 0,
    lessons: [
      { id: 'n-1', title: 'B, A, G', type: 'playing', emoji: '🎵', topic: 'Notes', xp: 20, description: 'Your first three notes!', interactive: true },
      { id: 'n-2', title: 'Note Detective', type: 'theory', emoji: '🔍', topic: 'Notes', xp: 15, description: 'Read notes on the staff', interactive: true },
      { id: 'n-3', title: 'BAG Songs', type: 'playing', emoji: '🎶', topic: 'Notes', xp: 25, description: 'Play simple melodies', interactive: true },
      { id: 'n-4', title: 'The Staff', type: 'theory', emoji: '📜', topic: 'Notes', xp: 15, description: 'Lines, spaces & clefs', interactive: true },
      { id: 'n-5', title: 'BAG Challenge', type: 'rhythm', emoji: '⚡', topic: 'Notes', xp: 20, description: 'Rhythm + notes combined', interactive: true },
      { id: 'n-6', title: '🏆 Note Boss', type: 'exam', emoji: '🏆', topic: 'Notes', xp: 30, description: 'Prove your note knowledge', interactive: true },
    ],
  },
  {
    id: 'rhythm-basic',
    title: 'Rhythm Foundation',
    level: 0,
    lessons: [
      { id: 'r-1', title: 'Quarter Notes', type: 'rhythm', emoji: '♩', topic: 'Rhythm', xp: 15, description: '1 beat each — tap it out', interactive: true },
      { id: 'r-2', title: 'Half Notes', type: 'rhythm', emoji: '♪', topic: 'Rhythm', xp: 15, description: '2 beats — hold it long', interactive: true },
      { id: 'r-3', title: 'Whole Notes', type: 'rhythm', emoji: '𝅝', topic: 'Rhythm', xp: 15, description: '4 beats — breathe & sustain', interactive: true },
      { id: 'r-4', title: 'Eighth Notes', type: 'rhythm', emoji: '♫', topic: 'Rhythm', xp: 20, description: 'Half a beat — quick taps', interactive: true },
      { id: 'r-5', title: 'Rests', type: 'rhythm', emoji: '🤫', topic: 'Rhythm', xp: 15, description: 'Silence is music too', interactive: true },
      { id: 'r-6', title: 'Mix It Up', type: 'rhythm', emoji: '🎲', topic: 'Rhythm', xp: 20, description: 'Combine all rhythms', interactive: true },
    ],
  },
  {
    id: 'more-notes',
    title: 'Expanding Range',
    level: 0,
    lessons: [
      { id: 'mn-1', title: 'Low C & D', type: 'playing', emoji: '📉', topic: 'Notes', xp: 20, description: 'Go lower on the sax', interactive: true },
      { id: 'mn-2', title: 'High C & D', type: 'playing', emoji: '📈', topic: 'Notes', xp: 20, description: 'Reach for the sky', interactive: true },
      { id: 'mn-3', title: 'E, F, G Scale', type: 'playing', emoji: '🎹', topic: 'Notes', xp: 25, description: 'Build the G major scale', interactive: true },
      { id: 'mn-4', title: 'Scale Master', type: 'theory', emoji: '🧠', topic: 'Notes', xp: 15, description: 'Understand scale patterns', interactive: true },
      { id: 'mn-5', title: '5-Note Songs', type: 'playing', emoji: '🎵', topic: 'Notes', xp: 25, description: 'Play with 5 notes', interactive: true },
    ],
  },
  {
    id: 'song-1',
    title: '🎵 Your Song Journey',
    level: 0,
    lessons: [
      { id: 's1-1', title: 'Song Intro', type: 'theory', emoji: '📖', topic: 'Song 1', xp: 15, description: 'Meet your first song', interactive: true },
      { id: 's1-2', title: 'Measures 1-4', type: 'playing', emoji: '🎶', topic: 'Song 1', xp: 20, description: 'Learn the opening', interactive: true },
      { id: 's1-3', title: 'Measures 5-8', type: 'playing', emoji: '🎶', topic: 'Song 1', xp: 20, description: 'Continue the melody', interactive: true },
      { id: 's1-4', title: 'Link It Together', type: 'playing', emoji: '🔗', topic: 'Song 1', xp: 20, description: 'Connect the phrases', interactive: true },
      { id: 's1-5', title: 'Full Song', type: 'playing', emoji: '🎵', topic: 'Song 1', xp: 25, description: 'Play the complete song', interactive: true },
      { id: 's1-6', title: '🌟 Performance', type: 'exam', emoji: '🌟', topic: 'Song 1', xp: 35, description: 'Perform with expression', interactive: true },
    ],
  },
  {
    id: 'theory-basic',
    title: 'Music Theory',
    level: 1,
    lessons: [
      { id: 't-1', title: 'Time Signatures', type: 'theory', emoji: '⏱️', topic: 'Theory', xp: 20, description: '4/4, 3/4, 2/4 explained', interactive: true },
      { id: 't-2', title: 'Key Signatures', type: 'theory', emoji: '🔑', topic: 'Theory', xp: 20, description: 'Sharps & flats in keys', interactive: true },
      { id: 't-3', title: 'Dynamics', type: 'theory', emoji: '🔊', topic: 'Theory', xp: 15, description: 'Loud, soft, and everything between', interactive: true },
      { id: 't-4', title: 'Tempo', type: 'theory', emoji: '⚡', topic: 'Theory', xp: 15, description: 'Speed of music', interactive: true },
      { id: 't-5', title: 'Intervals', type: 'theory', emoji: '📏', topic: 'Theory', xp: 20, description: 'Distance between notes', interactive: true },
      { id: 't-6', title: '🏆 Theory Check', type: 'exam', emoji: '🏆', topic: 'Theory', xp: 30, description: 'Test your theory knowledge', interactive: true },
    ],
  },
  {
    id: 'song-2',
    title: '🎵 Second Song',
    level: 1,
    lessons: [
      { id: 's2-1', title: 'New Song Intro', type: 'theory', emoji: '📖', topic: 'Song 2', xp: 15, description: 'Discover your second song', interactive: true },
      { id: 's2-2', title: 'First Phrase', type: 'playing', emoji: '🎶', topic: 'Song 2', xp: 20, description: 'Learn the beginning', interactive: true },
      { id: 's2-3', title: 'Second Phrase', type: 'playing', emoji: '🎶', topic: 'Song 2', xp: 20, description: 'Build on what you know', interactive: true },
      { id: 's2-4', title: 'Rhythm Challenge', type: 'rhythm', emoji: '🥁', topic: 'Song 2', xp: 20, description: 'Master the tricky rhythms', interactive: true },
      { id: 's2-5', title: 'Full Performance', type: 'playing', emoji: '🎵', topic: 'Song 2', xp: 25, description: 'Put it all together', interactive: true },
      { id: 's2-6', title: '🌟 Final Performance', type: 'exam', emoji: '🌟', topic: 'Song 2', xp: 35, description: 'Show what you\'ve learned', interactive: true },
    ],
  },
  {
    id: 'technique',
    title: 'Technique',
    level: 1,
    lessons: [
      { id: 'tc-1', title: 'Tonguing', type: 'playing', emoji: '👅', topic: 'Technique', xp: 20, description: 'Start each note clean', interactive: true },
      { id: 'tc-2', title: 'Slurs & Legato', type: 'playing', emoji: '〰️', topic: 'Technique', xp: 20, description: 'Smooth connections', interactive: true },
      { id: 'tc-3', title: 'Staccato', type: 'playing', emoji: '•', topic: 'Technique', xp: 20, description: 'Short & detached', interactive: true },
      { id: 'tc-4', title: 'Accent Practice', type: 'playing', emoji: '>', topic: 'Technique', xp: 20, description: 'Emphasize the beat', interactive: true },
      { id: 'tc-5', title: 'Long Tones', type: 'playing', emoji: '🎯', topic: 'Technique', xp: 25, description: 'Build your tone quality', interactive: true },
    ],
  },
  {
    id: 'level-1-exam',
    title: '🏅 Level 1 Exam',
    level: 1,
    lessons: [
      { id: 'l1-exam', title: '🏅 Level 1 Certification', type: 'exam', emoji: '🏅', topic: 'Exam', xp: 50, description: 'Complete Level 1 assessment', interactive: true },
    ],
  },
  {
    id: 'level-2',
    title: 'Level 2 — Intermediate',
    level: 2,
    lessons: [
      { id: 'l2-1', title: 'Chromatic Scale', type: 'playing', emoji: '🎹', topic: 'Level 2', xp: 25, description: 'Every note in order', interactive: true },
      { id: 'l2-2', title: 'Minor Scales', type: 'theory', emoji: '🎭', topic: 'Level 2', xp: 20, description: 'The sad sound of minor', interactive: true },
      { id: 'l2-3', title: 'Triplets', type: 'rhythm', emoji: '🎲', topic: 'Level 2', xp: 20, description: '3 notes in the space of 2', interactive: true },
      { id: 'l2-4', title: 'Dotted Rhythms', type: 'rhythm', emoji: '•♪', topic: 'Level 2', xp: 20, description: 'Extended note values', interactive: true },
      { id: 'l2-5', title: 'Arpeggios', type: 'playing', emoji: '🎼', topic: 'Level 2', xp: 25, description: 'Broken chords on sax', interactive: true },
      { id: 'l2-6', title: 'Transposition', type: 'theory', emoji: '🔄', topic: 'Level 2', xp: 20, description: 'Reading concert pitch', interactive: true },
      { id: 'l2-7', title: '🏆 Level 2 Boss', type: 'exam', emoji: '🏆', topic: 'Level 2', xp: 40, description: 'Prove intermediate skills', interactive: true },
    ],
  },
  {
    id: 'level-3',
    title: 'Level 3 — Advanced',
    level: 3,
    lessons: [
      { id: 'l3-1', title: 'All Major Scales', type: 'playing', emoji: '🎵', topic: 'Level 3', xp: 30, description: 'Master every major key', interactive: true },
      { id: 'l3-2', title: 'Compound Time', type: 'rhythm', emoji: '6/8', topic: 'Level 3', xp: 25, description: '6/8, 9/8, 12/8 feels', interactive: true },
      { id: 'l3-3', title: 'Triads & Chords', type: 'theory', emoji: '🎹', topic: 'Level 3', xp: 25, description: 'Build chords from scales', interactive: true },
      { id: 'l3-4', title: 'Melodic Minor', type: 'theory', emoji: '🎭', topic: 'Level 3', xp: 25, description: 'The ascending/descending minor', interactive: true },
      { id: 'l3-5', title: 'Syncopation', type: 'rhythm', emoji: '⚡', topic: 'Level 3', xp: 25, description: 'Off-beat rhythms', interactive: true },
      { id: 'l3-6', title: '🏆 Level 3 Boss', type: 'exam', emoji: '🏆', topic: 'Level 3', xp: 45, description: 'Advanced certification', interactive: true },
    ],
  },
  {
    id: 'level-4',
    title: 'Level 4 — Expert',
    level: 4,
    lessons: [
      { id: 'l4-1', title: 'Irregular Time', type: 'rhythm', emoji: '5/4', topic: 'Level 4', xp: 30, description: '5/4, 7/8, odd meters', interactive: true },
      { id: 'l4-2', title: 'Chord Progressions', type: 'theory', emoji: '🎹', topic: 'Level 4', xp: 30, description: 'I-IV-V-I and beyond', interactive: true },
      { id: 'l4-3', title: 'Cadences', type: 'theory', emoji: '🏛️', topic: 'Level 4', xp: 25, description: 'Musical punctuation', interactive: true },
      { id: 'l4-4', title: 'Long Tones (Whole)', type: 'playing', emoji: '🎯', topic: 'Level 4', xp: 30, description: '4-beat sustained tones', interactive: true },
      { id: 'l4-5', title: 'Error Detection', type: 'theory', emoji: '🔍', topic: 'Level 4', xp: 25, description: 'Find the mistakes', interactive: true },
      { id: 'l4-6', title: '🏆 Level 4 Boss', type: 'exam', emoji: '🏆', topic: 'Level 4', xp: 50, description: 'Expert certification', interactive: true },
    ],
  },
  {
    id: 'level-5',
    title: 'Level 5 — Master',
    level: 5,
    lessons: [
      { id: 'l5-1', title: 'C Clef Reading', type: 'theory', emoji: '𝄡', topic: 'Level 5', xp: 30, description: 'Alto & tenor clef', interactive: true },
      { id: 'l5-2', title: 'Inversions', type: 'theory', emoji: '🔄', topic: 'Level 5', xp: 30, description: 'Chord inversions & sevenths', interactive: true },
      { id: 'l5-3', title: 'Dim & Aug', type: 'theory', emoji: '°', topic: 'Level 5', xp: 30, description: 'Diminished & augmented', interactive: true },
      { id: 'l5-4', title: 'Score Reading', type: 'theory', emoji: '📜', topic: 'Level 5', xp: 30, description: 'Read full ensemble scores', interactive: true },
      { id: 'l5-5', title: 'Long Tones (Whole)', type: 'playing', emoji: '🎯', topic: 'Level 5', xp: 35, description: 'Master tone control', interactive: true },
      { id: 'l5-6', title: '👑 Final Exam', type: 'exam', emoji: '👑', topic: 'Level 5', xp: 60, description: 'Master certification', interactive: true },
    ],
  },
];

export const BASIC_SONGS = [
  { id: 'western-portrait', title: 'Western Portrait', emoji: '🌄', composer: 'Root/Pearson' },
  { id: 'austrian-melody', title: 'Austrian Melody', emoji: '🎼', composer: 'Haydn' },
  { id: 'minstrel-boy', title: 'The Minstrel Boy', emoji: '🎭', composer: 'Traditional' },
  { id: 'ode-to-joy', title: 'Ode to Joy', emoji: '😊', composer: 'Beethoven' },
  { id: 'america', title: 'America', emoji: '👑', composer: 'Henry Carey' },
  { id: 'scarborough-fair', title: 'Scarborough Fair', emoji: '🌹', composer: 'English Folk' },
];

export const LEVEL_A_SONGS = [
  { id: 'danny-boy', title: 'Danny Boy', emoji: '🍀', composer: 'Weatherly' },
  { id: 'greensleeves', title: 'Greensleeves', emoji: '🎻', composer: 'Traditional' },
  { id: 'amazing-grace', title: 'Amazing Grace', emoji: '🙏', composer: 'Newton' },
];

export const LEVEL_B_SONGS = [
  { id: 'jingle-bells', title: 'Jingle Bells', emoji: '🔔', composer: 'Pierpont' },
  { id: 'twinkle-twinkle', title: 'Twinkle Twinkle', emoji: '⭐', composer: 'Mozart' },
  { id: 'oh-susanna', title: 'Oh Susanna', emoji: '🤠', composer: 'Foster' },
];

export const STICKER_INFO: Record<string, { emoji: string; name: string; desc: string }> = {
  'first-5': { emoji: '🌱', name: 'Seedling', desc: 'Complete 5 lessons' },
  'dedicated': { emoji: '💪', name: 'Dedicated', desc: 'Complete 20 lessons' },
  'xp-500': { emoji: '⭐', name: 'Rising Star', desc: 'Earn 500 XP' },
  'xp-1000': { emoji: '🌟', name: 'Superstar', desc: 'Earn 1000 XP' },
  'week-streak': { emoji: '🔥', name: 'On Fire', desc: '7-day streak' },
};

export function getAllLessons(): Lesson[] {
  return CURRICULUM.flatMap(s => s.lessons);
}

export function getLessonById(id: string): Lesson | undefined {
  return getAllLessons().find(l => l.id === id);
}

export function getNextLessonId(completedIds: string[]): string | null {
  const all = getAllLessons();
  for (const lesson of all) {
    if (!completedIds.includes(lesson.id)) return lesson.id;
  }
  return null;
}

export function getLessonStatus(lessonId: string, completedIds: string[]): 'locked' | 'available' | 'completed' {
  if (completedIds.includes(lessonId)) return 'completed';
  const all = getAllLessons();
  const idx = all.findIndex(l => l.id === lessonId);
  if (idx === 0) return 'available';
  if (idx > 0 && completedIds.includes(all[idx - 1].id)) return 'available';
  return 'locked';
}
