import type { ExerciseData } from './types';

/** Multiple choice. `answer` is the index of the correct option, so the right
 *  answer is NOT always first. */
export const mc = (question: string, options: string[], answer: number, concept?: string): ExerciseData => ({
  type: 'multiple-choice',
  question,
  options: options.map((text, i) => ({ text, correct: i === answer })),
  concept,
});

export const tf = (question: string, answer: boolean, concept?: string): ExerciseData => ({
  type: 'true-false',
  question,
  correctAnswer: answer ? 'true' : 'false',
  concept,
});

/** "Put these in order": pass the CORRECT order; the items are shown scrambled. */
export const order = (question: string, correct: string[], concept?: string): ExerciseData => {
  const scrambled = [...correct].reverse();
  if (scrambled.join('|') === correct.join('|') && scrambled.length > 1) scrambled.push(scrambled.shift() as string);
  return { type: 'fill-order', question, items: scrambled, correctOrder: correct, concept };
};

export const match = (question: string, pairs: [term: string, definition: string][], concept?: string): ExerciseData => ({
  type: 'note-match',
  question,
  notePairs: pairs.map(([note, position]) => ({ note, position })),
  concept,
});

export const tap = (question: string, beats: string[], concept?: string): ExerciseData => ({
  type: 'rhythm-tap',
  question,
  items: beats,
  concept,
});
