// Theory lessons for Levels Basic, One and Two.
// Topic list: "Cadet Music Theory – Topics at a Glance".

import type { CadetLevel, InteractiveExerciseType, ExerciseData } from './types';
import { mc, tf, order, match } from './helpers';

export interface TheoryTopic {
  slug: string;
  level: CadetLevel;
  title: string;
  emoji: string;
  xp: number;
  description: string;
  /** Official topics from the chart that this lesson covers. */
  covers: string[];
  concept: string;
  intro: string;
  sections: { heading: string; content: string; example?: string; tip?: string }[];
  keyPoints: string[];
  practice: string;
  interactive?: InteractiveExerciseType;
  quiz: ExerciseData[];
}

export const THEORY_LOW: TheoryTopic[] = [
  // ------------------------------------------------------------------ BASIC
  {
    slug: 'staff-clefs', level: 'BASIC', title: 'The Staff and the Clefs', emoji: '📜', xp: 10,
    description: 'Lines, spaces, treble clef and bass clef',
    covers: ['The Staff', 'Treble & Bass Clef'],
    concept: 'musicStaff',
    intro: 'Music is written on a staff. Where a note sits on the staff tells you its pitch, and the clef at the start tells you which pitches the lines and spaces mean.',
    sections: [
      { heading: 'The staff', content: 'The staff has 5 lines and 4 spaces. Lines and spaces are counted from the bottom up, so the bottom line is line 1 and the top line is line 5. Higher on the staff means higher in pitch.', tip: 'Short extra lines above or below the staff are called ledger lines.' },
      { heading: 'Treble clef (G clef)', content: 'The treble clef curls around the second line, which makes that line G. It is used for higher instruments such as flute, clarinet, saxophone and trumpet.' },
      { heading: 'Bass clef (F clef)', content: 'The bass clef has two dots around the fourth line, which makes that line F. It is used for lower instruments such as tuba, trombone, euphonium and bassoon.' },
    ],
    keyPoints: ['A staff has 5 lines and 4 spaces, counted from the bottom.', 'The treble clef marks G on the 2nd line.', 'The bass clef marks F on the 4th line.', 'Your clarinet or saxophone music is written in treble clef.'],
    practice: 'Draw a staff on paper with a treble clef and a bass clef. Label each line 1–5 from the bottom.',
    quiz: [
      mc('How many lines does a staff have?', ['4', '5', '6', '3'], 1, 'musicStaff'),
      mc('The treble clef circles which line?', ['The 4th line (F)', 'The 1st line (E)', 'The 2nd line (G)', 'The 5th line (F)'], 2, 'musicStaff'),
      tf('The bass clef is also called the F clef.', true, 'musicStaff'),
    ],
  },
  {
    slug: 'notes-on-staff', level: 'BASIC', title: 'Notes on the Staff', emoji: '🎼', xp: 15,
    description: 'Read note names in treble and bass clef',
    covers: ['Notes on the Staff in Treble & Bass Clef'],
    concept: 'noteNames',
    intro: 'Notes use the first seven letters of the alphabet: A B C D E F G. After G the letters start again at A. Once you know a few landmark notes, the rest follow.',
    sections: [
      { heading: 'Treble clef', content: 'Lines (bottom to top): E G B D F — "Every Good Boy Does Fine".\nSpaces (bottom to top): F A C E — spells "FACE".', example: 'The note on the second line is G, the note in the first space is F.' },
      { heading: 'Bass clef', content: 'Lines (bottom to top): G B D F A — "Good Boys Do Fine Always".\nSpaces (bottom to top): A C E G — "All Cows Eat Grass".', tip: 'Middle C sits on a ledger line between the two staves: just below the treble staff and just above the bass staff.' },
    ],
    keyPoints: ['Notes are named A–G and the pattern repeats.', 'Treble lines: E G B D F. Treble spaces: F A C E.', 'Bass lines: G B D F A. Bass spaces: A C E G.', 'Middle C is on a ledger line between the staves.'],
    practice: 'Say the names of the lines and spaces aloud in both clefs, up and then down, three times without looking.',
    interactive: 'note-identification',
    quiz: [
      order('Put the treble clef LINE notes in order, bottom to top:', ['E', 'G', 'B', 'D', 'F'], 'noteNames'),
      mc('The four SPACES of the treble clef spell…', ['GOOD', 'FACE', 'BEAD', 'CAGE'], 1, 'noteNames'),
      mc('Which note is on the 4th line of the bass clef?', ['A', 'G', 'F', 'E'], 2, 'noteNames'),
    ],
  },
  {
    slug: 'note-values', level: 'BASIC', title: 'Note Values', emoji: '🎵', xp: 15,
    description: 'Whole, half, quarter, eighth and sixteenth notes',
    covers: ['Note Values (Whole, Half, Quarter, Eighth, Sixteenth)'],
    concept: 'noteValues',
    intro: 'The shape of a note tells you how long to hold it. In 4/4 time the quarter note gets one beat, and every other note is measured against it.',
    sections: [
      { heading: 'How many beats?', content: 'Whole note = 4 beats\nHalf note = 2 beats\nQuarter note = 1 beat\nEighth note = ½ beat (2 per beat)\nSixteenth note = ¼ beat (4 per beat)', tip: 'Each note is half as long as the one before it. Two halves make a whole, two quarters make a half, and so on.' },
      { heading: 'Flags and beams', content: 'Eighth notes have one flag (or one beam); sixteenth notes have two. Beams join notes together so groups of beats are easy to see.' },
    ],
    keyPoints: ['Whole 4, half 2, quarter 1, eighth ½, sixteenth ¼ (in 4/4).', 'Two eighth notes equal one quarter note.', 'Four sixteenth notes equal one quarter note.'],
    practice: 'Clap four quarter notes, then two half notes, then eight eighth notes, all in one 4/4 measure each, with a steady beat.',
    quiz: [
      mc('How many beats does a half note get in 4/4?', ['1', '2', '3', '4'], 1, 'noteValues'),
      mc('How many eighth notes equal one half note?', ['2', '3', '4', '8'], 2, 'noteValues'),
      order('Order these from LONGEST to SHORTEST:', ['Whole', 'Half', 'Quarter', 'Eighth', 'Sixteenth'], 'noteValues'),
    ],
  },
  {
    slug: 'rest-values', level: 'BASIC', title: 'Rest Values', emoji: '🤫', xp: 10,
    description: 'Silence is part of the music',
    covers: ['Rest Values (Whole, Half, Quarter, Eighth, Sixteenth)'],
    concept: 'noteValues',
    intro: 'A rest is a silence. Every note value has a matching rest with the same length, and you must count rests just as carefully as notes.',
    sections: [
      { heading: 'Matching rests', content: 'Whole rest = 4 beats (a block hanging below the 4th line)\nHalf rest = 2 beats (a block sitting on top of the 3rd line)\nQuarter rest = 1 beat\nEighth rest = ½ beat\nSixteenth rest = ¼ beat', tip: 'Whole rest hangs like a hat on a hook; the half rest sits on the line like a hat on a table.' },
      { heading: 'Playing a rest', content: 'During a rest, keep counting, keep your instrument in position, and breathe. Coming in on time after a rest is one of the things assessors listen for.' },
    ],
    keyPoints: ['Each note value has a rest of equal length.', 'A whole rest also means "a full measure of silence" in most time signatures.', 'Keep counting through rests.'],
    practice: 'Clap this pattern while counting aloud: quarter, quarter, quarter rest, quarter. Repeat 8 times without losing the beat.',
    quiz: [
      mc('How many beats of silence is a half rest in 4/4?', ['1', '2', '3', '4'], 1, 'noteValues'),
      tf('A half rest sits on top of the middle line of the staff.', true, 'noteValues'),
      tf('You can stop counting during a rest.', false, 'rhythm'),
    ],
  },
  {
    slug: 'common-time', level: 'BASIC', title: 'Common Time and Strong Beats', emoji: '⏱️', xp: 15,
    description: 'Time signatures (common time), strong and weak beats',
    covers: ['Time Signatures (Common Time)', 'Strong Beats, Weak Beats'],
    concept: 'timeSignatures',
    intro: 'The time signature sits at the start of the music. At Level Basic you need to know common time, which is the most used time signature in band music.',
    sections: [
      { heading: 'Common time', content: 'Common time is 4/4 and is often written as a large C. The top number says there are 4 beats in each measure; the bottom number says the quarter note gets one beat.', example: 'In 4/4 you can fit one whole note, two half notes, four quarter notes or eight eighth notes in a measure.' },
      { heading: 'Strong and weak beats', content: 'Not all beats feel the same. In 4/4, beat 1 is the strongest, beat 3 is medium-strong, and beats 2 and 4 are weak.', tip: 'Count "ONE two THREE four" and let the capital letters be a little stronger.' },
    ],
    keyPoints: ['Common time = 4/4 = a large C.', '4 beats per measure, quarter note = 1 beat.', 'Strong beat is 1, medium is 3, weak are 2 and 4.'],
    practice: 'Tap a steady beat to a metronome at ♩ = 60, counting 1-2-3-4 and accenting beats 1 and 3, for two minutes.',
    interactive: 'time-signature',
    quiz: [
      mc('Which time signature is also called common time?', ['2/4', '3/4', '4/4', '6/8'], 2, 'timeSignatures'),
      mc('Which beat is the strongest in 4/4?', ['1', '2', '3', '4'], 0, 'timeSignatures'),
      tf('In 4/4 the bottom number 4 means the quarter note gets one beat.', true, 'timeSignatures'),
    ],
  },
  {
    slug: 'bars-repeats', level: 'BASIC', title: 'Double Bars and Repeat Signs', emoji: '🔁', xp: 10,
    description: 'Finding your way around a piece',
    covers: ['Double Bars', 'Repeats Signs'],
    concept: 'timeSignatures',
    intro: 'Bar lines split music into measures. Special bar lines tell you where sections end and when to play something again.',
    sections: [
      { heading: 'Double bars', content: 'A double bar line (two thin lines) marks the end of a section, or a change such as a new key. The final bar line (a thin line then a thick line) marks the end of the piece.' },
      { heading: 'Repeat signs', content: 'Two dots next to a double bar are repeat signs. A repeat at the end sends you back to the start, or to a matching "forward" repeat sign if there is one.\n\nFirst and second endings: play the first ending, repeat, then skip it and play the second ending.', tip: 'Before you play, scan the page for repeat signs and endings and plan your route.' },
    ],
    keyPoints: ['A double bar ends a section.', 'A thin-thick bar line ends the piece.', 'Repeat dots send you back to the start or to the forward repeat.', 'On a repeat with endings, skip the first ending the second time.'],
    practice: 'Look at Ode to Joy in your Best in Class book. Say the route you will play, including any repeats, before you play it.',
    quiz: [
      mc('What does a thin line followed by a thick line mean?', ['Repeat', 'End of the piece', 'Pause', 'Key change'], 1, 'timeSignatures'),
      mc('A repeat sign at the end of a section tells you to…', ['Stop', 'Play louder', 'Go back and play again', 'Skip the section'], 2, 'timeSignatures'),
      tf('With first and second endings, you play the first ending on the repeat.', false, 'timeSignatures'),
    ],
  },
  {
    slug: 'dynamics', level: 'BASIC', title: 'Dynamics', emoji: '🔊', xp: 10,
    description: 'Loud, soft and everything in between',
    covers: ['Dynamics'],
    concept: 'dynamics',
    intro: 'Dynamics tell you how loud or soft to play. They are one of the main ways a performance becomes musical, and they are marked on every assessment rubric.',
    sections: [
      { heading: 'The scale of volume', content: 'pp (pianissimo) = very soft\np (piano) = soft\nmp (mezzo piano) = medium soft\nmf (mezzo forte) = medium loud\nf (forte) = loud\nff (fortissimo) = very loud' },
      { heading: 'Changing volume', content: 'A crescendo (cresc. or a widening hairpin) means gradually get louder. A decrescendo or diminuendo (dim. or a narrowing hairpin) means gradually get softer.', tip: 'Loud does not mean harsh. Keep a full, steady tone at every dynamic, and support softer notes with fast, steady air.' },
    ],
    keyPoints: ['pp p mp mf f ff from softest to loudest.', 'Crescendo = gradually louder.', 'Diminuendo = gradually softer.'],
    practice: 'Play a long note on your easiest pitch: start at p, crescendo to f over 8 counts, then diminuendo back to p over 8 counts.',
    interactive: 'dynamics-practice',
    quiz: [
      order('Order these dynamics from softest to loudest:', ['pp', 'p', 'mp', 'mf', 'f', 'ff'], 'dynamics'),
      mc('What does crescendo mean?', ['Gradually softer', 'Gradually louder', 'Very fast', 'Stop playing'], 1, 'dynamics'),
      mc('What does mf stand for?', ['Mezzo forte', 'Most fast', 'Medium fast', 'More force'], 0, 'dynamics'),
    ],
  },

  // -------------------------------------------------------------------- ONE
  {
    slug: 'dotted-notes', level: 'ONE', title: 'Dotted Notes and Rests', emoji: '•', xp: 15,
    description: 'A dot adds half the value',
    covers: ['Dotted Notes & Rests'],
    concept: 'noteValues',
    intro: 'A dot written after a note or rest makes it longer by half of its original value.',
    sections: [
      { heading: 'The rule', content: 'Add half the value of the note:\nDotted half note = 2 + 1 = 3 beats\nDotted quarter note = 1 + ½ = 1½ beats\nDotted eighth note = ½ + ¼ = ¾ beat\n\nDotted rests work exactly the same way.', example: 'In 4/4, a dotted half note plus a quarter note fills one whole measure (3 + 1 = 4).' },
      { heading: 'Counting', content: 'A dotted quarter followed by an eighth is a very common pairing and together they last 2 beats. Count "1, 2, and": the dotted quarter starts on beat 1 and is held through beat 2, and the eighth note lands on the "and" of 2.', tip: 'Tap a steady eighth-note pulse with your foot while you clap the rhythm.' },
    ],
    keyPoints: ['A dot adds half the note\'s value.', 'Dotted half = 3 beats, dotted quarter = 1½ beats.', 'Dotted rests are counted the same way.'],
    practice: 'Clap and count: dotted half + quarter, then dotted quarter + eighth + half. Repeat each until it is steady.',
    interactive: 'rhythm-clapping',
    quiz: [
      mc('How many beats does a dotted half note get?', ['2', '2½', '3', '4'], 2, 'noteValues'),
      mc('A dotted quarter note equals…', ['1 beat', '1½ beats', '2 beats', '¾ beat'], 1, 'noteValues'),
      tf('A dot adds half of the note\'s original value.', true, 'noteValues'),
    ],
  },
  {
    slug: 'semitones-accidentals', level: 'ONE', title: 'Semitones, Tones and Accidentals', emoji: '♯', xp: 20,
    description: 'Whole tones, semitones, sharps, flats and naturals',
    covers: ['Whole Tones & Semitones', 'Understanding Accidentals', 'Chromatic Semitones & Diatonic Semitones'],
    concept: 'accidentals',
    intro: 'The smallest step between two notes is a semitone (half step). Two semitones make a whole tone (whole step). Accidentals let you raise or lower notes by a semitone.',
    sections: [
      { heading: 'Semitones and tones', content: 'On a keyboard a semitone is the very next key, black or white. The natural semitones are E–F and B–C, because there is no black key between them. C–D is a whole tone because it skips C♯.' },
      { heading: 'Accidentals', content: '♯ sharp raises a note by a semitone.\n♭ flat lowers a note by a semitone.\n♮ natural cancels a sharp or flat.\n\nAn accidental lasts until the end of the measure, for that line or space only.' },
      { heading: 'Chromatic and diatonic semitones', content: 'A chromatic semitone uses the SAME letter name (C to C♯). A diatonic semitone uses DIFFERENT letter names (C♯ to D, or E to F).', tip: 'Check the letters: same letter = chromatic, different letters = diatonic.' },
    ],
    keyPoints: ['A semitone is the smallest step; a whole tone is two semitones.', 'E–F and B–C are natural semitones.', 'Sharp raises, flat lowers, natural cancels.', 'Accidentals last for the rest of the measure.', 'Chromatic semitone: same letter. Diatonic semitone: different letters.'],
    practice: 'Play C D E F G A B C on your instrument and mark where the two semitones are. Then play the chromatic scale slowly and name every note out loud.',
    quiz: [
      mc('How many semitones make a whole tone?', ['1', '2', '3', '4'], 1, 'accidentals'),
      mc('Which pair is a natural semitone?', ['C–D', 'D–E', 'E–F', 'F–G'], 2, 'accidentals'),
      mc('C to C♯ is…', ['A diatonic semitone', 'A chromatic semitone', 'A whole tone', 'A minor third'], 1, 'accidentals'),
      tf('An accidental stays in effect until the end of the measure.', true, 'accidentals'),
    ],
  },
  {
    slug: 'simple-time', level: 'ONE', title: 'Simple Time Signatures', emoji: '⏱️', xp: 15,
    description: '2/4, 3/4, 4/4, 2/2 and what the numbers mean',
    covers: ['Time Signatures (Simple Time)'],
    concept: 'timeSignatures',
    intro: 'In simple time, each beat divides naturally into two. The time signature has two numbers.',
    sections: [
      { heading: 'Reading the numbers', content: 'Top number = how many beats in each measure.\nBottom number = which note value gets one beat (2 = half note, 4 = quarter note, 8 = eighth note).', example: '2/4: 2 beats per measure, quarter note = 1 beat (a march).\n3/4: 3 beats per measure (a waltz).\n4/4: 4 beats per measure.\n2/2 (cut time, written ¢): 2 beats per measure, half note = 1 beat.' },
      { heading: 'Why it matters', content: 'The time signature decides which beats are strong and how you count. Always check it before you play, and notice if it changes partway through the piece.' },
    ],
    keyPoints: ['Top = beats per measure. Bottom = the note that gets one beat.', '2/4, 3/4 and 4/4 are the most common simple times.', 'Cut time (2/2) gives the half note one beat.'],
    practice: 'Conduct or tap 2/4, 3/4 and 4/4 patterns to a metronome, saying "ONE two", "ONE two three", "ONE two THREE four".',
    interactive: 'time-signature',
    quiz: [
      mc('In 3/4 time, how many beats are in a measure?', ['2', '3', '4', '6'], 1, 'timeSignatures'),
      mc('In 2/2 time, which note gets one beat?', ['Whole', 'Half', 'Quarter', 'Eighth'], 1, 'timeSignatures'),
      mc('3/4 time is commonly used for…', ['Marches', 'Waltzes', 'Fanfares', 'Cadences'], 1, 'timeSignatures'),
    ],
  },
  {
    slug: 'scale-types-sharps-flats', level: 'ONE', title: 'Scales, Sharps and Flats', emoji: '🔑', xp: 25,
    description: 'Types of scales, order of sharps and flats, enharmonic notes',
    covers: ['Types of Scales', 'Order of Sharps & Flats on the Staff', 'Enharmonic notes'],
    concept: 'keySignatures',
    intro: 'A scale is a set of notes in order. Key signatures tell you which notes are sharp or flat all the way through a piece.',
    sections: [
      { heading: 'Types of scales', content: 'Major scale: bright sound, pattern whole-whole-half-whole-whole-whole-half.\nMinor scales: darker sound (natural, harmonic and melodic come at Level Two).\nChromatic scale: all 12 semitones in a row.' },
      { heading: 'Order of sharps and flats', content: 'Sharps are always added in this order: F C G D A E B ("Father Charles Goes Down And Ends Battle").\nFlats are added in the reverse order: B E A D G C F ("Battle Ends And Down Goes Charles\'s Father").', tip: 'Sit the sharps and flats on the staff in the exact positions they appear in a key signature, then practice drawing them.' },
      { heading: 'Enharmonic notes', content: 'Enharmonic notes sound the same but have different names: C♯ and D♭, G♯ and A♭, F♯ and G♭. The key and the notes around them decide which name is correct.' },
    ],
    keyPoints: ['Sharps in order: F C G D A E B.', 'Flats in order: B E A D G C F.', 'Enharmonic notes sound the same but are spelled differently.', 'The major scale pattern is W W H W W W H.'],
    practice: 'Write out the order of sharps and flats from memory three times. Then play C♯ and D♭ on your instrument and confirm they have the same fingering.',
    interactive: 'key-signature-builder',
    quiz: [
      order('Put the sharps in the order they appear in key signatures:', ['F', 'C', 'G', 'D', 'A', 'E', 'B'], 'keySignatures'),
      mc('Which flat comes FIRST in a key signature?', ['F♭', 'B♭', 'E♭', 'A♭'], 1, 'keySignatures'),
      mc('C♯ and D♭ are…', ['The same pitch with different names', 'A whole tone apart', 'A third apart', 'Different pitches'], 0, 'keySignatures'),
    ],
  },
  {
    slug: 'major-scales-sharps-flats', level: 'ONE', title: 'Major Scales with Sharps and Flats', emoji: '🎹', xp: 25,
    description: 'Build and recognise major keys',
    covers: ['Major Scales with Sharps', 'Major Scales with Flats'],
    concept: 'scales',
    intro: 'Every major scale uses the same pattern of whole and half steps. Starting on a different note changes which notes need sharps or flats.',
    sections: [
      { heading: 'Keys with sharps', content: 'G major: 1 sharp (F♯)\nD major: 2 sharps (F♯ C♯)\nA major: 3 sharps\nE major: 4 sharps\n\nShortcut: the tonic (note the scale starts on) is one semitone above the LAST sharp.', example: 'Two sharps, F♯ and C♯. The last sharp is C♯, one semitone above is D, so the key is D major.' },
      { heading: 'Keys with flats', content: 'F major: 1 flat (B♭)\nB♭ major: 2 flats (B♭ E♭)\nE♭ major: 3 flats\nA♭ major: 4 flats\n\nShortcut: the tonic is the SECOND-LAST flat (except F major, which has only one flat).', example: 'Three flats, B♭ E♭ A♭. The second-last flat is E♭, so the key is E♭ major.' },
    ],
    keyPoints: ['Major scale: W W H W W W H.', 'Sharp keys: tonic is one semitone above the last sharp.', 'Flat keys: tonic is the second-last flat (F major is the exception).'],
    practice: 'Play your Level One scales slowly while saying the note names. Write each scale on a staff with its key signature.',
    interactive: 'scale-builder',
    quiz: [
      mc('A key signature has F♯ and C♯. What major key is it?', ['G major', 'D major', 'A major', 'E major'], 1, 'scales'),
      mc('How many flats does B♭ major have?', ['1', '2', '3', '4'], 1, 'keySignatures'),
      mc('A key signature has B♭, E♭ and A♭. What major key is it?', ['F major', 'B♭ major', 'E♭ major', 'A♭ major'], 2, 'keySignatures'),
    ],
  },
  {
    slug: 'arpeggio-fermata', level: 'ONE', title: 'Arpeggios and the Fermata', emoji: '𝄐', xp: 15,
    description: 'Broken chords and held notes',
    covers: ['The Arpeggio', 'The Fermata'],
    concept: 'scales',
    intro: 'Two more signs you will meet in Level One music.',
    sections: [
      { heading: 'The arpeggio', content: 'An arpeggio is a chord played one note at a time, usually going up or down. A major arpeggio uses scale degrees 1-3-5 (and 8 at the top).', example: 'C major arpeggio: C – E – G – C.' },
      { heading: 'The fermata', content: 'A fermata (𝄐, a dot under an arc) means hold the note longer than its written value. How long is up to the conductor, so watch them.', tip: 'Never guess the length of a fermata alone in the band. Watch the drum major or conductor for the cut-off.' },
    ],
    keyPoints: ['Arpeggio = chord notes played one at a time.', 'A major arpeggio is scale degrees 1-3-5-8.', 'Fermata = hold longer; the conductor decides how long.'],
    practice: 'Play the arpeggio of each Level One major scale slowly (1-3-5-8-5-3-1), then hold the top note with a fermata.',
    quiz: [
      mc('What is an arpeggio?', ['A very loud note', 'A chord played one note at a time', 'A repeat sign', 'A rest'], 1, 'scales'),
      mc('What does a fermata tell you?', ['Play shorter', 'Play louder', 'Hold the note longer', 'Skip the note'], 2, 'tempoTerms'),
      order('Play the C major arpeggio in order:', ['C', 'E', 'G', 'C'], 'scales'),
    ],
  },
  {
    slug: 'tempo-repeat-words', level: 'ONE', title: 'Tempo and Repeat Words', emoji: '🏃', xp: 15,
    description: 'Italian words for speed, changes of speed and repeats',
    covers: ['Words related to tempo & variations in tempo', 'Words related to repeat signs'],
    concept: 'tempoTerms',
    intro: 'Most musical words are Italian. Learn them once and you can read any band part.',
    sections: [
      { heading: 'Tempo (slow to fast)', content: 'Largo = very slow and broad\nAdagio = slow\nAndante = at a walking pace\nModerato = moderate\nAllegro = fast and lively\nPresto = very fast' },
      { heading: 'Changing the tempo', content: 'ritardando (rit.) = gradually slow down\naccelerando (accel.) = gradually speed up\na tempo = return to the original speed' },
      { heading: 'Repeat words', content: 'D.C. (Da Capo) = go back to the beginning\nD.S. (Dal Segno) = go back to the sign 𝄋\nFine = the end\nal Fine = play until Fine\nCoda = a special ending section', example: '"D.C. al Fine" means go back to the beginning and play until you reach the word Fine.' },
    ],
    keyPoints: ['Largo, Adagio, Andante, Moderato, Allegro, Presto: slow to fast.', 'rit. = slow down, accel. = speed up, a tempo = back to speed.', 'D.C. = to the beginning, D.S. = to the sign, Fine = the end.'],
    practice: 'Make flash cards for every word above. Quiz yourself in both directions until you get them all right in one pass.',
    quiz: [
      match('Match the term to its meaning:', [['Allegro', 'Fast and lively'], ['Adagio', 'Slow'], ['Presto', 'Very fast']], 'tempoTerms'),
      mc('What does D.C. al Fine mean?', ['Repeat the last measure', 'Go to the beginning and play to Fine', 'Play softer', 'Stop immediately'], 1, 'tempoTerms'),
      mc('What does ritardando mean?', ['Speed up', 'Slow down gradually', 'Play louder', 'Hold the note'], 1, 'tempoTerms'),
    ],
  },
  {
    slug: 'articulations', level: 'ONE', title: 'Articulations', emoji: '👅', xp: 15,
    description: 'Staccato, legato, accents and tenuto',
    covers: ['Articulations'],
    concept: 'articulations',
    intro: 'Articulation is how each note begins and ends. It changes the character of the music, and scale tests require clean articulation.',
    sections: [
      { heading: 'The main articulations', content: 'Staccato (dot above or below the note) = short and detached\nLegato / slur (curved line over notes) = smooth and connected, tongue only the first note\nAccent (>) = attack the note with more emphasis\nTenuto (short line) = hold the full value, gently stressed', tip: 'A slur joins notes of different pitch. A tie (the same curve between two notes of the SAME pitch) joins them into one longer note.' },
      { heading: 'On your instrument', content: 'Start each tongued note with the tip of the tongue touching the tip of the reed, as if saying "too" or "doo". For slurs, keep the air moving steadily and change only the fingers.' },
    ],
    keyPoints: ['Staccato = short, legato = smooth, accent = emphasized, tenuto = full value.', 'Tongue only the first note under a slur.', 'A tie joins two notes of the same pitch; a slur joins different pitches.'],
    practice: 'Play your G major (alto) or C major (tenor/clarinet) scale four ways: all slurred, all tongued, all staccato, all accented.',
    quiz: [
      mc('A dot above a note means…', ['Hold it longer', 'Play it short and detached', 'Play it loud', 'Repeat it'], 1, 'articulations'),
      mc('Under a slur you should…', ['Tongue every note', 'Tongue only the first note', 'Never tongue', 'Play softly'], 1, 'articulations'),
      tf('A tie joins two notes of the same pitch.', true, 'articulations'),
    ],
  },

  // -------------------------------------------------------------------- TWO
  {
    slug: 'circle-of-fifths', level: 'TWO', title: 'The Circle of Fifths', emoji: '⭕', xp: 20,
    description: 'How all the keys connect',
    covers: ['Circle of Fifths/Circle of Keys'],
    concept: 'keySignatures',
    intro: 'The circle of fifths shows how every key relates to the others. It is the fastest way to work out key signatures.',
    sections: [
      { heading: 'Going clockwise: sharps', content: 'Start at C (no sharps). Each step clockwise is up a perfect fifth and adds one sharp:\nC → G → D → A → E → B → F♯ → C♯\n0 → 1 → 2 → 3 → 4 → 5 → 6 → 7 sharps' },
      { heading: 'Going counter-clockwise: flats', content: 'Each step counter-clockwise is down a perfect fifth (or up a fourth) and adds one flat:\nC → F → B♭ → E♭ → A♭ → D♭ → G♭ → C♭\n0 → 1 → 2 → 3 → 4 → 5 → 6 → 7 flats', tip: 'Keys at the bottom (F♯/G♭, C♯/D♭, C♭/B) are enharmonic pairs.' },
    ],
    keyPoints: ['Clockwise = up a fifth = one more sharp.', 'Counter-clockwise = up a fourth = one more flat.', 'C major has no sharps or flats.', 'Seven sharps or seven flats is the limit.'],
    practice: 'Draw the circle of fifths from memory with the number of sharps/flats at each key. Check it against the circle in the app.',
    quiz: [
      order('Put the sharp keys in circle-of-fifths order, starting at C:', ['C', 'G', 'D', 'A', 'E', 'B'], 'keySignatures'),
      mc('How many sharps does A major have?', ['2', '3', '4', '5'], 1, 'keySignatures'),
      mc('Moving one step counter-clockwise from C gives…', ['G major', 'F major', 'D major', 'B♭ major'], 1, 'keySignatures'),
    ],
  },
  {
    slug: 'scale-degrees', level: 'TWO', title: 'Scale Degree Names', emoji: '🔢', xp: 15,
    description: 'Tonic, dominant and friends',
    covers: ['Scale degree names'],
    concept: 'scales',
    intro: 'Every note in a scale has a name that describes its job. Musicians use these names constantly.',
    sections: [
      { heading: 'The seven names', content: '1st: Tonic\n2nd: Supertonic\n3rd: Mediant\n4th: Subdominant\n5th: Dominant\n6th: Submediant\n7th: Leading tone', example: 'In C major: C = tonic, D = supertonic, E = mediant, F = subdominant, G = dominant, A = submediant, B = leading tone.' },
      { heading: 'The important three', content: 'The tonic is "home". The dominant (5th) is the second most important note and loves to resolve to home. The leading tone is a semitone below the tonic and "leads" up to it.', tip: 'In a natural minor scale, the 7th is a whole tone below the tonic and is called the subtonic.' },
    ],
    keyPoints: ['Learn the seven names in order: tonic, supertonic, mediant, subdominant, dominant, submediant, leading tone.', 'The tonic is degree 1 and the dominant is degree 5.', 'The leading tone is a semitone below the tonic.'],
    practice: 'Say the scale degree names while playing your Level Two scales on your instrument, up and down.',
    quiz: [
      mc('Which scale degree is the dominant?', ['3rd', '4th', '5th', '6th'], 2, 'scales'),
      mc('In G major, what is the leading tone?', ['D', 'E', 'F♯', 'A'], 2, 'scales'),
      match('Match the degree to its name:', [['1st', 'Tonic'], ['4th', 'Subdominant'], ['6th', 'Submediant']], 'scales'),
    ],
  },
  {
    slug: 'minor-scales', level: 'TWO', title: 'Relative Minor and Minor Scales', emoji: '🌙', xp: 25,
    description: 'Relative minor, natural, harmonic and melodic minor',
    covers: ['Relative minor scales', 'Understanding types of minor scales (natural, harmonic, melodic)'],
    concept: 'scales',
    intro: 'Every major key has a relative minor that shares its key signature. There are three forms of the minor scale.',
    sections: [
      { heading: 'Relative minor', content: 'The relative minor starts on the 6th note of the major scale, or a minor third (3 semitones) below the major tonic.', example: 'C major and A minor share no sharps or flats. G major and E minor share one sharp (F♯).' },
      { heading: 'Natural minor', content: 'Same notes as the relative major, starting on the 6th degree. Pattern: W H W W H W W.' },
      { heading: 'Harmonic minor', content: 'Natural minor with the 7th note raised by a semitone. This creates a leading tone, and a large step (augmented second) between the 6th and 7th notes.', example: 'A harmonic minor: A B C D E F G♯ A.' },
      { heading: 'Melodic minor', content: 'Going UP: raise both the 6th and 7th notes. Going DOWN: use the natural minor (no raised notes).', example: 'A melodic minor up: A B C D E F♯ G♯ A. Down: A G F E D C B A.', tip: 'At Level One and Two your scale list uses harmonic minor, so memorize that raised 7th.' },
    ],
    keyPoints: ['Relative minor = 6th degree of the major = minor third below the tonic.', 'Natural minor: no changes.', 'Harmonic minor: raise the 7th.', 'Melodic minor: raise 6th and 7th going up, natural going down.'],
    practice: 'Play your Level Two harmonic minor scales and say out loud which note is the raised 7th in each.',
    quiz: [
      mc('What is the relative minor of C major?', ['D minor', 'E minor', 'A minor', 'G minor'], 2, 'scales'),
      mc('Which note is raised in the harmonic minor scale?', ['The 2nd', 'The 4th', 'The 6th', 'The 7th'], 3, 'scales'),
      tf('The melodic minor scale is the same going up and going down.', false, 'scales'),
    ],
  },
  {
    slug: 'triplet', level: 'TWO', title: 'The Triplet', emoji: '3️⃣', xp: 15,
    description: 'Three notes in the time of two',
    covers: ['The Triplet'],
    concept: 'rhythm',
    intro: 'A triplet squeezes three equal notes into the space normally taken by two.',
    sections: [
      { heading: 'Eighth-note triplets', content: 'Three eighth notes marked with a "3" take the same time as one quarter note (one beat). Count them "trip-le-let" or "1-la-li, 2-la-li".', example: 'In 4/4, four groups of eighth-note triplets fill one measure, with three notes on each beat.' },
      { heading: 'Keeping them even', content: 'The most common mistake is rushing the first two notes. Give all three notes the same length.', tip: 'Say the word "pine-ap-ple" or "straw-ber-ry" on each beat while you tap to keep the triplet even.' },
    ],
    keyPoints: ['A triplet puts 3 notes in the time of 2.', 'An eighth-note triplet equals one beat in 4/4.', 'The three notes must be equal in length.'],
    practice: 'Clap eighth-note triplets on every beat of a 4/4 measure at ♩ = 60, saying "trip-le-let" on each beat.',
    interactive: 'rhythm-clapping',
    quiz: [
      mc('A group of three eighth-note triplets in 4/4 equals how many beats?', ['½', '1', '2', '3'], 1, 'rhythm'),
      tf('All three notes of a triplet should be the same length.', true, 'rhythm'),
      mc('A triplet puts ___ notes in the time of ___.', ['2 in the time of 3', '3 in the time of 2', '4 in the time of 3', '3 in the time of 4'], 1, 'rhythm'),
    ],
  },
  {
    slug: 'simple-compound-time', level: 'TWO', title: 'Simple and Compound Time', emoji: '⏲️', xp: 20,
    description: 'Regular time signatures, including 6/8',
    covers: ['Understanding regular time signatures (Simple & Compound Time)'],
    concept: 'compoundTime',
    intro: 'In simple time the beat divides into 2. In compound time the beat divides into 3.',
    sections: [
      { heading: 'Simple time', content: 'The beat is a plain note (quarter or half) and divides into two equal parts. Examples: 2/4, 3/4, 4/4, 2/2.' },
      { heading: 'Compound time', content: 'The beat is a DOTTED note and divides into three equal parts. In 6/8 there are 2 beats per measure, each a dotted quarter note made of three eighth notes.\n\n6/8 = 2 beats (felt as "ONE two three FOUR five six")\n9/8 = 3 beats\n12/8 = 4 beats', tip: 'Divide the top number by 3 to find the number of beats in compound time.' },
      { heading: 'Spot the difference', content: '3/4 has three quarter-note beats that divide into two eighth notes each. 6/8 has two dotted-quarter beats that divide into three eighths each. Same number of eighth notes, different feel.' },
    ],
    keyPoints: ['Simple time: beat divides into 2.', 'Compound time: beat divides into 3 and is a dotted note.', '6/8 = 2 beats, 9/8 = 3 beats, 12/8 = 4 beats.'],
    practice: 'Tap a steady 6/8 with two big beats, counting "ONE two three FOUR five six", at a dotted quarter = 60.',
    interactive: 'time-signature',
    quiz: [
      mc('How many beats are in a measure of 6/8?', ['2', '3', '4', '6'], 0, 'compoundTime'),
      mc('In compound time each beat divides into…', ['2', '3', '4', '5'], 1, 'compoundTime'),
      mc('Which is a compound time signature?', ['2/4', '3/4', '6/8', '4/4'], 2, 'compoundTime'),
    ],
  },
  {
    slug: 'intervals-major-perfect', level: 'TWO', title: 'Intervals: Major and Perfect', emoji: '📏', xp: 25,
    description: 'Measure the distance between notes',
    covers: ['Intervals (Major, Perfect)'],
    concept: 'intervals',
    intro: 'An interval is the distance between two notes. You name it by counting letter names, including both the first and last note.',
    sections: [
      { heading: 'Counting', content: 'C up to E: C (1) D (2) E (3) = a third.\nC up to G: C D E F G = a fifth.\nAlways count the starting note as 1.' },
      { heading: 'Major and perfect', content: 'Measured from the tonic of a major scale:\n2nd, 3rd, 6th and 7th are MAJOR.\nUnison, 4th, 5th and octave are PERFECT.', example: 'In C major: C–D major 2nd, C–E major 3rd, C–F perfect 4th, C–G perfect 5th, C–A major 6th, C–B major 7th, C–C perfect octave.' },
    ],
    keyPoints: ['Count letter names, including the first note.', '2nd, 3rd, 6th, 7th are major (above the tonic of a major scale).', 'Unison, 4th, 5th and octave are perfect.'],
    practice: 'Play each interval above C on your instrument and say its name: M2, M3, P4, P5, M6, M7, P8.',
    interactive: 'interval-recognition',
    quiz: [
      mc('What interval is C up to G?', ['Perfect 4th', 'Perfect 5th', 'Major 6th', 'Major 3rd'], 1, 'intervals'),
      mc('What interval is D up to F♯ (in D major)?', ['Major 2nd', 'Major 3rd', 'Perfect 4th', 'Major 6th'], 1, 'intervals'),
      tf('A perfect interval can be a 4th, 5th or octave.', true, 'intervals'),
    ],
  },
  {
    slug: 'tempo-words-two', level: 'TWO', title: 'More Tempo Words', emoji: '🏁', xp: 15,
    description: 'Extra words for tempo and tempo changes',
    covers: ['Words related to tempo & variations in tempo'],
    concept: 'tempoTerms',
    intro: 'Level Two adds more words that describe speed, plus words that modify other markings.',
    sections: [
      { heading: 'More tempo words', content: 'Lento = slow\nAllegretto = moderately fast (a little slower than allegro)\nVivace = lively, fast\nGrave = very slow and serious' },
      { heading: 'Modifiers', content: 'poco = a little\nmolto = very, much\nmeno = less\npiù = more\n\nPoco rit. = slow down a little. Più mosso = more movement (faster). Meno mosso = less movement (slower).', example: '"Molto allegro" means very fast; "poco a poco crescendo" means gradually get louder, little by little.' },
      { heading: 'Slowing and stopping', content: 'rallentando (rall.) = gradually slower\nritenuto (riten.) = immediately slower\nfermata = hold' },
    ],
    keyPoints: ['Lento, Allegretto, Vivace, Grave.', 'poco = a little, molto = very, meno = less, più = more.', 'rall. = gradually slower, riten. = immediately slower.'],
    practice: 'Add these words to your flash cards from Level One and quiz yourself on all of them.',
    quiz: [
      match('Match the word to its meaning:', [['molto', 'Very, much'], ['poco', 'A little'], ['meno', 'Less']], 'tempoTerms'),
      mc('Più mosso means…', ['More movement (faster)', 'Slower', 'Louder', 'Stop'], 0, 'tempoTerms'),
      mc('Which is the slowest?', ['Allegretto', 'Vivace', 'Lento', 'Allegro'], 2, 'tempoTerms'),
    ],
  },
];
