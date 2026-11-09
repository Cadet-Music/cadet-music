// Content generators for the lesson families that follow a fixed pattern:
// rhythm, aural, sight-reading, scales, prepared music, band drill and mock assessment.
// Everything here is derived from standards.ts so the lessons can't drift from the packages.

import type { CadetLevel, ExerciseData, LessonContentData, TrackId, VideoLink } from './types';
import { mc, tf, order, tap } from './helpers';
import {
  AURAL_STANDARD, DRILL_MANUAL_ANNEX_URL, DRILL_MANUAL_URL, DRILL_VIDEOS, LEVEL_NUMBER, LEVEL_TITLE,
  MAINTENANCE_STANDARD, SCALE_STANDARD, SIGHT_READING_STANDARD, REPERTOIRE, scalesFor,
} from './standards';
import type { Piece, ScaleSet } from './standards';

export interface Generated {
  content: LessonContentData;
  quiz: ExerciseData[];
}

const levelName = (level: CadetLevel) => {
  const t = LEVEL_TITLE[level].replace('LEVEL ', '');
  return `Level ${t.charAt(0)}${t.slice(1).toLowerCase()}`;
};

// ---------------------------------------------------------------------------
// Rhythm sheet
// ---------------------------------------------------------------------------

const RHYTHM_FOCUS: Record<CadetLevel, { skills: string; tapItems: string[]; quiz: ExerciseData[] }> = {
  BASIC: {
    skills: 'whole, half, quarter and eighth notes and their rests, in simple 2/4, 3/4 and 4/4 time',
    tapItems: ['1', '2', '3', '4'],
    quiz: [
      mc('In 4/4, how many beats are in a measure containing a half note and two quarter notes?', ['3', '4', '5', '2'], 1, 'rhythm'),
      tf('You should keep counting during rests.', true, 'rhythm'),
    ],
  },
  ONE: {
    skills: 'dotted notes, ties, eighth-note groupings and syncopated patterns introduced at Level One',
    tapItems: ['1', '&', '2', '&', '3', '&', '4', '&'],
    quiz: [
      mc('A dotted quarter note followed by an eighth note lasts…', ['1 beat', '2 beats', '3 beats', '½ beat'], 1, 'rhythm'),
      mc('A tie joins two notes of…', ['The same pitch', 'Different pitches', 'Any pitch', 'Different lengths only'], 0, 'rhythm'),
    ],
  },
  TWO: {
    skills: 'dotted rhythms, sixteenth notes, triplets and compound-time patterns',
    tapItems: ['1', 'la', 'li', '2', 'la', 'li'],
    quiz: [
      mc('How many sixteenth notes fit in one quarter note?', ['2', '3', '4', '8'], 2, 'noteValues'),
      mc('A triplet puts…', ['3 notes in the time of 2', '2 notes in the time of 3', '4 notes in the time of 3', '3 notes in the time of 4'], 0, 'rhythm'),
    ],
  },
  THREE: {
    skills: 'syncopation, mixed sixteenth patterns, triplets, and compound time',
    tapItems: ['1', 'e', '&', 'a', '2', 'e', '&', 'a'],
    quiz: [
      mc('In 6/8 the beat is…', ['A quarter note', 'A dotted quarter note', 'An eighth note', 'A half note'], 1, 'compoundTime'),
      mc('Syncopation emphasizes…', ['Weak beats or off-beats', 'Only beat 1', 'Silence', 'Beat 4 only'], 0, 'rhythm'),
    ],
  },
  FOUR: {
    skills: 'complex mixtures of sixteenths, dotted rhythms, triplets, and irregular time',
    tapItems: ['1', 'e', '&', 'a', '2', 'e', '&', 'a', '3', 'e', '&', 'a'],
    quiz: [
      mc('Which is an irregular time signature?', ['4/4', '5/4', '6/8', '2/2'], 1, 'timeSignatures'),
      tf('A steady tempo matters as much as correct rhythms.', true, 'rhythm'),
    ],
  },
  FIVE: {
    skills: 'the most demanding rhythmic patterns in the program: mixed subdivisions, syncopation, compound and irregular time',
    tapItems: ['1', 'e', '&', 'a', '2', 'e', '&', 'a', '3', 'e', '&', 'a', '4', 'e', '&', 'a'],
    quiz: [
      mc('In 7/8 grouped 2+2+3, how many eighth notes are in each measure?', ['6', '7', '8', '9'], 1, 'timeSignatures'),
      tf('You may sing, clap, tap or count the rhythm sheet.', true, 'rhythm'),
    ],
  },
};

export function rhythmLesson(level: CadetLevel): Generated {
  const focus = RHYTHM_FOCUS[level];
  const n = LEVEL_NUMBER[level];
  const aural = AURAL_STANDARD[level];
  return {
    content: {
      title: `${levelName(level)} Rhythm Sheet`,
      introduction: `Your ${levelName(level)} qualification includes a rhythm sheet (PO ${n}16). You will be given time to practise it, then you sing, clap, tap or count the rhythms while keeping a steady tempo. No help is given.`,
      sections: [
        { heading: 'What the sheet covers', content: `The ${levelName(level)} rhythm sheet covers ${focus.skills}. You can find it in the level package (Annex A, Appendix ${n + 1}).` },
        {
          heading: 'How to practise each line',
          content: '1. Look at the time signature and decide how you will count it.\n2. Set a metronome at a slow, comfortable tempo.\n3. Say the counts out loud while clapping the rhythm.\n4. Repeat until you can do it three times in a row without stopping.\n5. Only then increase the tempo.',
          tip: 'A steady tempo beats a fast tempo. Assessors listen for steadiness first.',
        },
        { heading: 'On assessment day', content: `For ${levelName(level)}, a result of "complete" needs at least six of the ten exercises done with no more than minor errors. ${aural.length > 1 ? 'Rhythm is the first part of your Rhythm and Aural Skills PO; the other parts have their own lessons.' : ''}`.trim() },
      ],
      keyPoints: ['Choose one way to count and use it every time.', 'Start slow with a metronome.', 'Keep the tempo steady even if you make a mistake.', 'Six of the ten exercises must be completed.'],
      practiceInstructions: `Pick three lines from the ${levelName(level)} rhythm sheet. Clap each one three times in a row with a metronome. Then do the same without the metronome.`,
      interactiveExercise: { type: 'rhythm-clapping', title: 'Clap It Back', description: 'Practise reading and clapping rhythms.' },
    },
    quiz: [tap(`Tap this steady count in time: ${focus.tapItems.join(' ')}`, focus.tapItems, 'rhythm'), ...focus.quiz],
  };
}

// ---------------------------------------------------------------------------
// Aural skills (Levels Two to Five)
// ---------------------------------------------------------------------------

export function auralMelodyLesson(level: CadetLevel): Generated | null {
  if (level === 'BASIC' || level === 'ONE') return null;
  const melody: Record<CadetLevel, string> = {
    BASIC: '', ONE: '',
    TWO: 'a five-note melody that uses only the first five notes of a major scale, starts on the tonic and moves by step only',
    THREE: 'a five-note melody that starts on the tonic and may contain one skip of a third',
    FOUR: 'a six-note melody that may contain up to two skips of a third',
    FIVE: 'a nine-note melody that may contain one or more skips of a third',
  };
  const notes: Record<CadetLevel, number> = { BASIC: 0, ONE: 0, TWO: 5, THREE: 5, FOUR: 6, FIVE: 9 };
  return {
    content: {
      title: `${levelName(level)} Melody Sing-Back`,
      introduction: `In the aural part of PO ${LEVEL_NUMBER[level]}16 you will hear ${melody[level]}. You sing or play it back. You may use solfège syllables, "lu", "la", or note names.`,
      sections: [
        { heading: 'Know the starting note', content: 'The melody always begins on the tonic, so the first thing to do is to settle on the key. Sing the tonic and the first five notes of the major scale up and down before the melody is played.' },
        { heading: 'Listen in chunks', content: `Listen to the whole melody once. Notice the shape: does it go up, down, or both? Then replay it in your head in small groups. For a ${notes[level]}-note melody, think of it as 2 or 3 short groups.`, tip: 'Hum it quietly while the examiner plays it if that helps you remember it.' },
        { heading: 'Practise with a partner', content: 'Have a friend play a short melody on piano or an app and sing it back. Start with three notes and add one note at a time.' },
      ],
      keyPoints: ['Settle the key and tonic first.', 'Listen for the shape of the melody.', 'You can use solfège, "la", or note names.', `The melody has ${notes[level]} notes at this level.`],
      practiceInstructions: 'Practise singing the first five notes of a major scale up and down, then have someone play random five-note melodies from the scale for you to sing back.',
    },
    quiz: [
      mc(`How many notes are in the Level ${LEVEL_NUMBER[level]} melody?`, [String(notes[level] - 1), String(notes[level]), String(notes[level] + 1), String(notes[level] + 3)], 1, 'auralSkills'),
      tf('The melody begins on the tonic.', true, 'auralSkills'),
      mc('Which can you use to sing the melody back?', ['Solfège, "la" or note names', 'Only lyrics', 'Only note names', 'Only counting'], 0, 'auralSkills'),
    ],
  };
}

export function auralIntervalsLesson(level: CadetLevel): Generated | null {
  if (level === 'BASIC' || level === 'ONE' || level === 'TWO') return null;
  const list: Record<string, string> = {
    THREE: 'the intervals listed for Level Three in your package (practise major and minor seconds and thirds, perfect fourth, fifth and octave)',
    FOUR: 'unison, major and minor third, perfect fourth, perfect fifth and perfect octave',
    FIVE: 'unison, major and minor second, major and minor third, perfect fourth, perfect fifth, major and minor sixth, major and minor seventh and perfect octave',
  };
  return {
    content: {
      title: `${levelName(level)} Interval Recognition`,
      introduction: `You will hear two notes with the second above the first, and you name the interval. For ${levelName(level)} you need to recognise ${list[level]}.`,
      sections: [
        { heading: 'Anchor songs', content: 'Match each interval to the opening of a song you know well. For example: perfect 5th = "Twinkle Twinkle Little Star" (first two notes), perfect 4th = "Here Comes the Bride", octave = "Somewhere Over the Rainbow".', tip: 'Make your own anchor list. The best one is the song that comes to your mind first.' },
        { heading: 'Major and minor', content: 'Minor intervals sound darker and more tense. Major intervals sound brighter. A minor third and a major third are only one semitone apart, so compare them on your instrument.' },
        { heading: 'Training', content: 'Use the interval trainer in the app: ask a friend or an app to play an interval, name it, then check. Aim for 9 out of 10 correct before the assessment.' },
      ],
      keyPoints: ['Learn an anchor song for each interval.', 'Minor sounds darker, major sounds brighter.', 'Practise until you get 9 out of 10.'],
      practiceInstructions: 'Use the interval trainer in the app for 5 minutes a day until your accuracy is at least 90%.',
      interactiveExercise: { type: 'interval-recognition', title: 'Interval Trainer', description: 'Listen to intervals and name them.' },
    },
    quiz: [
      mc('Which interval is the first two notes of "Twinkle Twinkle Little Star"?', ['Perfect 4th', 'Perfect 5th', 'Major 3rd', 'Octave'], 1, 'intervals'),
      mc('Which sounds darker?', ['Minor third', 'Major third', 'Perfect octave', 'Unison'], 0, 'intervals'),
      tf('An anchor song helps you remember an interval.', true, 'intervals'),
    ],
  };
}

export function auralChordsLesson(level: CadetLevel): Generated | null {
  if (level !== 'FOUR' && level !== 'FIVE') return null;
  const five = level === 'FIVE';
  return {
    content: {
      title: `${levelName(level)} Chord Recognition`,
      introduction: `You will hear a chord in root position and closed position and name its quality: ${five ? 'major triad, minor triad or dominant seventh' : 'major triad or minor triad'}.`,
      sections: [
        { heading: 'Major and minor', content: 'A major triad sounds bright and stable. A minor triad sounds darker and more serious. The only difference is the middle note, which is a semitone lower in a minor chord.' },
        ...(five ? [{ heading: 'Dominant seventh', content: 'A dominant seventh chord sounds tense, like it wants to move on. It is a major triad with an extra minor seventh on top, and it normally resolves to the tonic.' }] : []),
        { heading: 'Practise', content: 'Play a triad slowly on a piano or app and sing the root. Then sing the middle note and decide if it sounds bright or dark.', tip: 'Compare a major and minor chord back to back many times until the difference is automatic.' },
      ],
      keyPoints: ['Major sounds bright, minor sounds dark.', ...(five ? ['Dominant 7th sounds tense and wants to resolve.'] : []), 'The 3rd determines major or minor.'],
      practiceInstructions: 'Ask someone to play random major and minor chords for you to identify, or use a chord trainer app.',
      interactiveExercise: { type: 'chord-builder', title: 'Chord Builder', description: 'Build and listen to chords.' },
    },
    quiz: [
      mc('Which chord sounds brighter?', ['Major triad', 'Minor triad', 'Both the same', 'None'], 0, 'chords'),
      mc('What changes between a major and minor triad?', ['The 3rd', 'The root', 'The 5th', 'All the notes'], 0, 'chords'),
      ...(five ? [mc('Which chord sounds tense and wants to resolve?', ['Dominant seventh', 'Major triad', 'Minor triad', 'Octave'], 0, 'chords')] : [tf('A minor triad has a lowered 3rd.', true, 'chords')]),
    ],
  };
}

// ---------------------------------------------------------------------------
// Sight-reading
// ---------------------------------------------------------------------------

export function sightReadingLesson(level: CadetLevel): Generated | null {
  const standard = SIGHT_READING_STANDARD[level];
  if (!standard) return null;
  const n = LEVEL_NUMBER[level];
  const prev: Record<CadetLevel, string> = { BASIC: '', ONE: 'Level Basic', TWO: 'Level One', THREE: 'Level Two', FOUR: 'Level Three', FIVE: 'Level Four' };
  return {
    content: {
      title: `${levelName(level)} Sight-Reading`,
      introduction: `PO ${n}18: you play a short unseen piece observing rhythm, a steady tempo, pitch and musical flow. The music is ${standard}`,
      sections: [
        { heading: 'The 30-second check', content: `You get a brief time to look at the music before you play. In that time:\n1. Time signature: how many beats, and which note gets the beat?\n2. Key signature: which notes are sharp or flat?\n3. Accidentals: spot them and think of the fingerings.\n4. Rhythm: clap the trickiest bar in your head.\n5. Repeats and endings: plan your route.` },
        { heading: 'Then play', content: 'Pick a tempo you can keep steady the whole way and do not stop. Keep going even if you make a mistake, because a steady pulse matters more than perfect notes.', tip: `The music is never harder than ${prev[level]} material, so use what you already know.` },
        ...(level === 'ONE' ? [{ heading: 'Guiding questions', content: 'At Level One an assessor may ask only these questions: What is the time signature? How many beats in a measure and which note gets the beat? How many sharps or flats are in the key signature and which notes? Which accidentals do you see and what are the fingerings? Can you clap the rhythm?' }] : []),
      ],
      keyPoints: ['Use the preview time: time signature, key signature, accidentals, rhythm, repeats.', 'Choose a tempo you can keep.', 'Never stop; keep the pulse going.', `The music is no harder than ${prev[level] || 'your current level'}.`],
      practiceInstructions: 'Every day, open a book at a random page of an easier level. Take 30 seconds to check the five points, then play it through once without stopping.',
    },
    quiz: [
      order('Put the preview steps in order:', ['Time signature', 'Key signature', 'Accidentals', 'Rhythm', 'Repeats'], 'sightReading'),
      mc('If you make a mistake in sight-reading you should…', ['Keep going', 'Stop and start again', 'Quit', 'Change the tempo wildly'], 0, 'sightReading'),
      tf('Sight-reading music is never harder than the level before.', true, 'sightReading'),
    ],
  };
}

// ---------------------------------------------------------------------------
// Scales
// ---------------------------------------------------------------------------

const KEY_SIG: Record<string, string> = {
  C: 'no sharps or flats',
  G: '1 sharp', D: '2 sharps', A: '3 sharps', E: '4 sharps', B: '5 sharps', 'F#': '6 sharps', 'C#': '7 sharps',
  F: '1 flat', Bb: '2 flats', Eb: '3 flats', Ab: '4 flats', Db: '5 flats', Gb: '6 flats', Cb: '7 flats',
};

const pretty = (k: string) => k.replace('b', '♭').replace('#', '♯');
const keys = (list: string[]) => list.map(pretty).join(', ');

const keySigQuestion = (key: string): ExerciseData | null => {
  const sig = KEY_SIG[key];
  if (!sig) return null;
  const opts = ['no sharps or flats', '1 sharp', '2 sharps', '3 sharps', '1 flat', '2 flats', '3 flats', '4 sharps', '4 flats'];
  const wrong = opts.filter((o) => o !== sig).slice(0, 3);
  const all = [sig, ...wrong];
  const pos = (key.length + all.length) % all.length;
  const arranged = [...wrong];
  arranged.splice(pos, 0, sig);
  return mc(`${pretty(key)} major has…`, arranged, pos, 'keySignatures');
};

export type ScaleKind = 'major' | 'harmonicMinor' | 'melodicMinor' | 'chromatic';

export function scaleLessons(level: CadetLevel): { kind: ScaleKind; slug: string; title: string }[] {
  const lessons: { kind: ScaleKind; slug: string; title: string }[] = [];
  const ref: ScaleSet = scalesFor('clarinet', level);
  const eb: ScaleSet = scalesFor('eb-sax', level);
  const has = (k: ScaleKind) => ref[k].length > 0 || eb[k].length > 0;
  if (level === 'BASIC') return [{ kind: 'major', slug: 'scales', title: 'Your Basic Scale' }];
  if (has('major')) lessons.push({ kind: 'major', slug: 'scales-major', title: 'Major Scales' });
  if (has('harmonicMinor')) lessons.push({ kind: 'harmonicMinor', slug: 'scales-harmonic-minor', title: 'Harmonic Minor Scales' });
  if (has('melodicMinor')) lessons.push({ kind: 'melodicMinor', slug: 'scales-melodic-minor', title: 'Melodic Minor Scales' });
  if (has('chromatic')) lessons.push({ kind: 'chromatic', slug: 'scales-chromatic', title: 'Chromatic Scale' });
  return lessons;
}

export function scaleLesson(track: TrackId, level: CadetLevel, kind: ScaleKind): Generated {
  const std = SCALE_STANDARD[level];
  const n = LEVEL_NUMBER[level];
  const label: Record<ScaleKind, string> = { major: 'major', harmonicMinor: 'harmonic minor', melodicMinor: 'melodic minor', chromatic: 'chromatic' };
  const lines: string[] = [];
  let sampleKey: string | null = null;
  if (track === 'clarinet') {
    const s = scalesFor('clarinet', level)[kind];
    lines.push(`Clarinet (and bass clarinet): ${keys(s)}`);
    if (kind === 'major' && s.length) sampleKey = s[0];
  } else {
    const alto = scalesFor('eb-sax', level)[kind];
    const tenor = scalesFor('tenor-sax', level)[kind];
    lines.push(`Alto and baritone saxophone: ${keys(alto)}`);
    if (level !== 'BASIC' || tenor.length) lines.push(`Tenor saxophone: ${keys(tenor)}`);
    if (kind === 'major' && alto.length) sampleKey = alto[0];
  }
  const verify = level === 'FIVE' ? '\n\nNote: this key list was transcribed from the scanned Level Five package. Check it against the printed scale pages before your assessment.' : '';
  const quiz: ExerciseData[] = [];
  const sampleQ = sampleKey ? keySigQuestion(sampleKey) : null;
  if (sampleQ) quiz.push(sampleQ);
  {
    const wrongTempos = ['♩ = 40', '♩ = 120', '♩ = 100', '♩ = 90'].filter((t) => t !== std.tempo).slice(0, 3);
    const at = (n + (kind === 'major' ? 0 : kind === 'harmonicMinor' ? 1 : kind === 'melodicMinor' ? 2 : 3)) % 4;
    const arranged = [...wrongTempos];
    arranged.splice(at, 0, std.tempo);
    quiz.push(mc(`At ${levelName(level)}, what is the scale tempo?`, arranged, at, 'scales'));
  }
  quiz.push(tf(`Scales must be played in ${std.note}.`, true, 'scales'));
  if (kind === 'harmonicMinor') quiz.push(mc('Which note is raised in a harmonic minor scale?', ['The 3rd', 'The 5th', 'The 7th', 'The 2nd'], 2, 'scales'));
  if (kind === 'melodicMinor') quiz.push(mc('Going down, a melodic minor scale is…', ['The same as natural minor', 'The same as going up', 'Chromatic', 'Major'], 0, 'scales'));
  if (kind === 'chromatic') quiz.push(mc('The chromatic scale moves by…', ['Semitones', 'Whole tones', 'Thirds', 'Fourths'], 0, 'scales'));
  const quiz2 = quiz.slice(0, 3);
  const intro = level === 'BASIC'
    ? `PO 017: you play one scale from the list below. It must be played all slurred or all tongued at ${std.tempo} in quarter notes, with no more than three errors (rhythm, pitch or steadiness).`
    : `PO ${n}17: you play the ${label[kind]} scales for your instrument at ${std.tempo} in ${std.note}, using ${std.articulation}.`;
  return {
    content: {
      title: level === 'BASIC' ? 'Your Level Basic Scale' : `${levelName(level)} ${label[kind].replace(/^./, (c) => c.toUpperCase())} Scales`,
      introduction: intro,
      sections: [
        { heading: 'Your scales', content: lines.join('\n') + (kind === 'chromatic' ? '\n\nThe chromatic scale is played starting on the note shown, ascending and descending, over the range shown in the package.' : '') + verify },
        { heading: 'The standard', content: `Tempo: ${std.tempo}, ${std.note}.\nArticulation: ${std.articulation}.\nA steady tempo must be kept throughout. Errors that count include rhythm, pitch and an unsteady tempo.`, tip: 'The notated pages for every scale are in your Level package (Annex B). Keep a copy on your music stand.' },
        { heading: 'How to learn a scale', content: '1. Write it out and say the notes with the key signature.\n2. Play it very slowly with a metronome, then speed up a little each day.\n3. Play it slurred, then tongued.\n4. Play it from memory when you can.' },
      ],
      keyPoints: [`Tempo: ${std.tempo} in ${std.note}.`, `Articulation: ${std.articulation}.`, 'Keep a steady tempo from start to finish.', 'Learn the key signature of every scale.'],
      practiceInstructions: `Play each ${label[kind]} scale on your list three times a day with a metronome at ${std.tempo}, and move up in tempo only when you can play it with no mistakes.`,
      interactiveExercise: { type: 'scale-builder', title: 'Scale Builder', description: 'Build scales note by note.' },
    },
    quiz: quiz2,
  };
}

// ---------------------------------------------------------------------------
// Prepared music
// ---------------------------------------------------------------------------

export function pieceLesson(track: TrackId, level: CadetLevel, piece: Piece): Generated {
  const n = LEVEL_NUMBER[level];
  const instName = track === 'saxophone' ? 'saxophone' : 'clarinet';
  const rubric = 'Rhythmic accuracy, note accuracy, dynamics and tempo are assessed on the Prepared Music rubric' + (level === 'BASIC' ? '.' : ', and tone is also assessed.');
  const books = Array.from(new Set(REPERTOIRE[track][level].map((p) => p.book)));
  const bookOptions = [piece.book, ...books.filter((b) => b !== piece.book), `Best in Class – ${track === 'saxophone' ? 'Clarinet' : 'Saxophone'}`, 'Belwin Master Solos'].slice(0, 4);
  const pos = (piece.title.length + n) % bookOptions.length;
  const arranged = bookOptions.slice(1);
  arranged.splice(pos, 0, piece.book);
  return {
    content: {
      title: `${piece.title}`,
      introduction: `${piece.title} is on List ${piece.list} for ${levelName(level)} ${instName}. Find it in ${piece.book}, page ${piece.page}. ${level === 'BASIC' ? 'At Level Basic you prepare the pieces on the list and perform one.' : 'For the assessment you perform a piece from List A and a piece from List B, so prepare more than one from each list.'}`,
      sections: [
        { heading: 'Step 1: Read before you play', content: 'Check the time signature, key signature, tempo marking, dynamics, repeats and any unusual rhythms. Clap the rhythm while counting aloud. Say the note names slowly.' },
        { heading: 'Step 2: Learn it in small pieces', content: 'Divide the piece into phrases of two to four measures. Learn each phrase slowly with a metronome, repeat it until it is correct three times in a row, then link the phrases together.', tip: 'Mark the difficult measures with a pencil and practise those first each day.' },
        { heading: 'Step 3: Add the music', content: 'Once the notes and rhythm are secure, add the dynamics, articulation and phrasing as written. Plan where you will breathe and mark it.' },
        { heading: 'Step 4: Perform it', content: `Play it straight through at the final tempo without stopping, then record it. ${rubric}` },
      ],
      keyPoints: [`${piece.title}: ${piece.book}, page ${piece.page}.`, `List ${piece.list}, ${levelName(level)}.`, 'Learn it in phrases, slow first.', 'Dynamics, tempo and accuracy are all assessed.'],
      practiceInstructions: `Learn the first phrase of ${piece.title} slowly, then play the whole piece from start to finish with a metronome at a tempo you can keep steady.`,
    },
    quiz: [
      mc(`In which book do you find ${piece.title}?`, arranged, pos, 'preparedMusic'),
      mc('Which is assessed on the Prepared Music rubric?', ['Rhythmic accuracy', 'The colour of the music book', 'The brand of your reed', 'How long you take to assemble'], 0, 'preparedMusic'),
      tf('You should practise the hard measures first.', true, 'preparedMusic'),
    ],
  };
}

// ---------------------------------------------------------------------------
// Band drill (practice support; drill is not a numbered PO in the level packages)
// ---------------------------------------------------------------------------

interface DrillSpec {
  slug: string;
  title: string;
  description: string;
  intro: string;
  sections: { heading: string; content: string; tip?: string }[];
  keyPoints: string[];
  practice: string;
  quiz: ExerciseData[];
  videos: (track: TrackId) => VideoLink[];
}

const instrumentClips = (track: TrackId): VideoLink[] =>
  track === 'saxophone' ? [DRILL_VIDEOS.instrumentSax, DRILL_VIDEOS.instrumentBariSax] : [DRILL_VIDEOS.instrumentClarinet];

export const DRILL_SPECS: Record<CadetLevel, DrillSpec[]> = {
  BASIC: [{
    slug: 'drill-positions', title: 'Instrument Drill: Carrying and Playing Positions',
    description: 'The positions your instrument takes on parade',
    intro: 'Band drill follows the Canadian Armed Forces Manual of Drill and Ceremonial, chapter 14. Every instrument has its own drill positions, and the whole band must move together.',
    sections: [
      { heading: 'Carrying (attention) position', content: 'The carrying / attention position is the normal position for carrying your instrument. It is also used when marching and marking time while not playing.' },
      { heading: 'Intermediate and playing positions', content: 'On the drum major\'s signal you move from the carrying position to the playing position. Many instruments pass through an intermediate position on the way. When the music stops, you return to the intermediate position and then the carrying position.', tip: 'Watch the video for YOUR instrument. The positions of hands, elbows and instrument angle are exact.' },
      { heading: 'Where you stand in the band', content: 'In a marching band the louder instruments such as percussion and brass are at the front and the quieter woodwinds are at the back, so the sound blends as the band marches.' },
    ],
    keyPoints: ['The carrying position is the normal position for carrying your instrument.', 'Follow the drum major\'s signals for positions.', 'Everyone must move at the same time.', 'Woodwinds march behind percussion and brass.'],
    practice: 'Watch the instrument drill video for your instrument, then practise going from carrying to playing position and back with a friend watching your positions.',
    quiz: [
      mc('What is the normal position for carrying an instrument?', ['Carrying / attention position', 'Playing position', 'Parade rest', 'Slung over the back'], 0, 'bandDrill'),
      mc('Where do woodwinds march in a marching band?', ['At the front', 'At the back', 'In the middle only', 'Anywhere'], 1, 'bandDrill'),
      tf('The whole band should change positions at the same time.', true, 'bandDrill'),
    ],
    videos: (t) => [...instrumentClips(t), DRILL_VIDEOS.dmIntermediate, DRILL_VIDEOS.dmPlayingPosition, DRILL_VIDEOS.dmCarryingPosition],
  }],
  ONE: [
    {
      slug: 'drill-marching', title: 'Stepping Off, Marking Time and Halting',
      description: 'Move with your instrument on the drum major\'s signals',
      intro: 'On parade, the drum major or the drum signals control when the band steps off, marks time and halts. At Level One you learn the visual signals.',
      sections: [
        { heading: 'Stepping off and halting', content: 'Watch the drum major for the signal to step off, and halt on the signal. Keep your instrument in the carrying position when you are not playing. Start moving together on the same foot.' },
        { heading: 'Marking time', content: 'Marking time means moving your feet as if marching without moving forward. It is used when the band needs to stay in place but keep the beat.', tip: 'Keep your eyes on the drum major and feel the tempo, not just look at the person in front of you.' },
      ],
      keyPoints: ['Follow the drum major\'s visual signals.', 'Step off on the same foot as everyone.', 'Marking time keeps the beat without moving forward.'],
      practice: 'Watch the three signal videos and then practise stepping off, marking time and halting with a friend giving the signals.',
      quiz: [
        mc('Who controls the band on the march?', ['The drum major', 'The loudest player', 'The last person in line', 'No one'], 0, 'bandDrill'),
        tf('Marking time means marching forward.', false, 'bandDrill'),
        mc('When not playing on the march, where is your instrument?', ['Carrying position', 'Playing position', 'On the ground', 'Over your head'], 0, 'bandDrill'),
      ],
      videos: () => [DRILL_VIDEOS.dmSteppingOff, DRILL_VIDEOS.dmMarkingTime, DRILL_VIDEOS.dmHalting],
    },
    {
      slug: 'drill-start-stop', title: 'Starting and Stopping the Music',
      description: 'Commence and cease playing on the signal',
      intro: 'The band starts and stops playing together on the drum major\'s signal, whether halted or on the march.',
      sections: [
        { heading: 'Commence playing', content: 'On the signal to commence playing, you raise the instrument to the playing position and the band begins together at the set tempo.' },
        { heading: 'Cease playing', content: 'On the signal to cease playing you stop together and return your instrument to the intermediate and then carrying position, as shown in the video.', tip: 'Practise "breathing together": the band should take one breath on the signal, not many different breaths.' },
      ],
      keyPoints: ['Start and stop together on the signal.', 'Return through the intermediate position to carrying.', 'Take one breath together.'],
      practice: 'Watch the four signal videos, then rehearse beginning and ending a march together with your section.',
      quiz: [
        mc('When does the band start playing?', ['On the drum major\'s signal', 'Whenever each player is ready', 'After the first player starts', 'On beat 3'], 0, 'bandDrill'),
        tf('The band should stop playing together.', true, 'bandDrill'),
        mc('After the music stops you return your instrument to…', ['Intermediate, then carrying position', 'Ground it', 'Playing position', 'Over your shoulder'], 0, 'bandDrill'),
      ],
      videos: () => [DRILL_VIDEOS.dmCommencePlayingHalt, DRILL_VIDEOS.dmCommencePlayingMarch, DRILL_VIDEOS.dmCeasePlayingHalt, DRILL_VIDEOS.dmCeasePlayingMarch],
    },
  ],
  TWO: [{
    slug: 'drill-formations', title: 'Band Formations and Wheels',
    description: 'Basic formations and turning the band',
    intro: 'A band moves in set formations and turns using wheels. Watching and keeping your place keeps the whole band tidy.',
    sections: [
      { heading: 'Formations', content: 'Study the basic band formation in the video: which instruments stand where, and how ranks and files are spaced.' },
      { heading: 'Wheels', content: 'To change direction the band wheels. The inside person marks time or takes short steps while the outside person takes longer steps to keep the line straight. The drum major gives a visual wheel signal.', tip: 'On a wheel, look along the rank toward the pivot person to keep your line straight.' },
    ],
    keyPoints: ['Know the basic band formation.', 'The outside of the wheel takes longer steps.', 'Watch the drum major\'s wheel signal.'],
    practice: 'Watch the formation, wheel and wheel-signal videos, then practise a wheel with your section on the parade square.',
    quiz: [
      mc('In a wheel, who takes the longest steps?', ['The outside person', 'The inside person', 'Everyone equally', 'The drum major only'], 0, 'bandDrill'),
      tf('The drum major gives a visual signal for wheeling.', true, 'bandDrill'),
      mc('To keep a rank straight on a wheel you should…', ['Look along the rank toward the pivot', 'Look at your feet', 'Look backwards', 'Close your eyes'], 0, 'bandDrill'),
    ],
    videos: () => [DRILL_VIDEOS.formations, DRILL_VIDEOS.wheels, DRILL_VIDEOS.dmWheelSignal],
  }],
  THREE: [{
    slug: 'drill-countermarch', title: 'The Standard Countermarch',
    description: 'Reverse direction while still playing',
    intro: 'A countermarch reverses the direction of the band so it can march back the way it came, usually while playing.',
    sections: [
      { heading: 'What happens', content: 'Each rank turns and marches back along a path between the ranks, so the band ends up facing the opposite direction. Watch the standard countermarch video for the exact path.' },
      { heading: 'Your job', content: 'Know which rank and file you are in, hold your spacing, keep playing, and watch the drum major. Your spacing matters, and a person who drifts breaks the whole formation.', tip: 'Walk the countermarch without your instrument first. Add music only when the movement is automatic.' },
    ],
    keyPoints: ['A countermarch reverses direction.', 'Hold your spacing and keep playing.', 'Learn the movement without instruments first.'],
    practice: 'Watch the standard countermarch video, then walk it with your section on the parade square before adding your instrument.',
    quiz: [
      mc('What does a countermarch do?', ['Reverses the direction of the band', 'Stops the band', 'Changes the key', 'Silences the band'], 0, 'bandDrill'),
      tf('You should learn the movement without instruments first.', true, 'bandDrill'),
      mc('If one person drifts out of position…', ['It breaks the formation for the whole band', 'Nothing happens', 'The band speeds up', 'The drum major leaves'], 0, 'bandDrill'),
    ],
    videos: () => [DRILL_VIDEOS.countermarchStandard, DRILL_VIDEOS.dmCountermarchStandard],
  }],
  FOUR: [{
    slug: 'drill-spiral', title: 'Spiral Countermarch and Changing Tempo',
    description: 'More advanced drum major signals and manoeuvres',
    intro: 'Level Four band drill adds the spiral countermarch and tempo changes, both controlled with the drum major\'s signals.',
    sections: [
      { heading: 'Spiral countermarch', content: 'The spiral countermarch reverses direction by winding the band into a spiral and unwinding it. Keep your spacing as the radius of the spiral changes.' },
      { heading: 'Changing tempo', content: 'The drum major signals a change between quick time and slow time. Everyone must change at the same moment and keep the beat.', tip: 'Listen to the drums and watch the drum major so you change tempo with the band, not before or after.' },
    ],
    keyPoints: ['The spiral countermarch winds and unwinds the band.', 'Keep your spacing as the spiral changes.', 'Change tempo together on the signal.'],
    practice: 'Watch the spiral countermarch and tempo signal videos, then walk the movement with your section.',
    quiz: [
      mc('Who signals a change of tempo?', ['The drum major', 'Any player', 'The tuba player', 'No one'], 0, 'bandDrill'),
      tf('You must keep your spacing in a spiral countermarch.', true, 'bandDrill'),
      mc('A spiral countermarch…', ['Winds and unwinds the band to reverse direction', 'Stops the music', 'Changes the key', 'Moves backward only'], 0, 'bandDrill'),
    ],
    videos: () => [DRILL_VIDEOS.countermarchSpiral, DRILL_VIDEOS.dmCountermarchSpiral, DRILL_VIDEOS.dmChangingTempo],
  }],
  FIVE: [{
    slug: 'drill-commands', title: 'Drum Commands and Drill Review',
    description: 'Understand drum signals and review the full drill',
    intro: 'At Level Five you should understand the drum signals that replace verbal commands, and be able to explain all of the band drill you have learned.',
    sections: [
      { heading: 'Drum commands', content: 'The drums can signal stepping off, halting, ceasing to play and changing between quick and slow time. Watch the drum-command videos to hear and see each signal.' },
      { heading: 'Review', content: `Review everything from earlier levels: carrying and playing positions, stepping off, marking time, halting, commence and cease playing, formations, wheels, and both countermarches. Be ready to explain the purpose of each one.\n\nThe official written reference is Chapter 14 of the CAF Manual of Drill and Ceremonial: ${DRILL_MANUAL_URL}`, tip: 'The manual\'s annexes show the drill positions for each instrument: ' + DRILL_MANUAL_ANNEX_URL },
    ],
    keyPoints: ['Drums can signal stepping off, halting, ceasing and tempo changes.', 'Review all earlier band drill.', 'Chapter 14 of the CAF drill manual is the reference.'],
    practice: 'Watch all five drum-command videos, then teach one earlier piece of band drill to a newer cadet.',
    quiz: [
      mc('Which can drums signal?', ['Stepping off and halting', 'Only the key', 'Only dynamics', 'Nothing'], 0, 'bandDrill'),
      tf('Chapter 14 of the CAF drill manual covers band drill.', true, 'bandDrill'),
      mc('Teaching newer cadets a drill movement helps you…', ['Learn it better yourself', 'Forget it', 'Skip rehearsal', 'Avoid the drum major'], 0, 'bandDrill'),
    ],
    videos: () => [DRILL_VIDEOS.drumIntro, DRILL_VIDEOS.drumSteppingOff, DRILL_VIDEOS.drumHalting, DRILL_VIDEOS.drumCeasePlaying, DRILL_VIDEOS.drumChangeTime],
  }],
};

// ---------------------------------------------------------------------------
// Mock assessment
// ---------------------------------------------------------------------------

export function examLesson(level: CadetLevel, theoryQuestions: ExerciseData[]): Generated {
  const n = LEVEL_NUMBER[level];
  const maint = MAINTENANCE_STANDARD[level];
  const parts: string[] = [];
  if (maint) parts.push(`Maintenance (PO ${n}13W): ${maint.join('; ')}.`);
  parts.push(`Rhythm${level === 'BASIC' || level === 'ONE' ? '' : ' and aural skills'} (PO ${n}16).`);
  parts.push(`Scales (PO ${n}17) at ${SCALE_STANDARD[level].tempo}.`);
  if (SIGHT_READING_STANDARD[level]) parts.push(`Sight-reading (PO ${n}18).`);
  parts.push(`Music theory (PO ${n}15).`);
  parts.push(`Prepared music (PO ${n}19): ${level === 'BASIC' ? 'one piece from the list' : 'a piece from List A and a piece from List B'}.`);
  return {
    content: {
      title: `${levelName(level)} Practice Assessment`,
      introduction: `This is a practice run of your ${levelName(level)} qualification. The real assessment is done in person by a qualified assessor. Use this to find the topics you still need to revise.`,
      sections: [
        { heading: 'What the real assessment covers', content: parts.join('\n') },
        { heading: 'This practice quiz', content: 'The questions below review the music theory topics for this level. Questions you miss are recorded so your instructor can see which topics to revisit.' },
        { heading: 'Before the real assessment', content: 'Play every scale and piece straight through, run your rhythm sheet, practise sight-reading and perform the maintenance tasks out loud. Ask your instructor to run a full mock assessment.', tip: 'Passing this quiz does not qualify you. Only a live assessment does.' },
      ],
      keyPoints: ['Know all the parts of the assessment.', 'Review any theory topics you miss.', 'Ask for a full mock assessment with your instructor.'],
      practiceInstructions: 'Take the quiz, then revise any topic you got wrong before moving on.',
    },
    quiz: theoryQuestions.slice(0, 8),
  };
}

export const LEVEL_NAME = levelName;
