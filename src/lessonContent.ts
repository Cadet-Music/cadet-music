/**
 * Lesson Content - Actual teaching material for each lesson
 * This provides the instructional content that comes before exercises
 */

import { CadetLevel } from './data';

export interface LessonContent {
  title: string;
  introduction: string;
  sections: ContentSection[];
  keyPoints: string[];
  practiceInstructions: string;
}

export interface ContentSection {
  heading: string;
  content: string;
  example?: string;
  tip?: string;
}

export const LESSON_CONTENT: Record<string, LessonContent> = {
  // BASIC LESSONS
  'pb-1': {
    title: 'Meet Your Saxophone',
    introduction: 'The saxophone is a woodwind instrument made of brass. It was invented by Adolphe Sax in 1840. Let\'s learn the parts of your instrument.',
    sections: [
      {
        heading: 'Main Parts of the Saxophone',
        content: 'Your saxophone has four main parts:\n\n1. Mouthpiece - The part you blow into. It has a reed attached that vibrates to create sound.\n\n2. Neck (Crook) - The curved metal piece that connects the mouthpiece to the body.\n\n3. Body - The main tube with all the keys and pads. This is where you press keys to change notes.\n\n4. Bell - The flared end at the bottom where sound comes out.',
        example: 'Think of it like a whistle: you blow into the mouthpiece, the air travels through the body, and comes out the bell.',
        tip: 'Always handle your saxophone by the bell and the body. Never pick it up by the keys - they can bend easily!'
      },
      {
        heading: 'The Reed and Mouthpiece',
        content: 'The reed is a thin piece of cane that vibrates when air passes over it. This vibration creates the sound.\n\nThe mouthpiece has:\n- A flat surface where the reed sits\n- An opening (window) where air flows through\n- A ligature that holds the reed in place',
        tip: 'Your reed is delicate! Always wet it before playing and store it in a reed guard to prevent damage.'
      }
    ],
    keyPoints: [
      'Four main parts: mouthpiece, neck, body, bell',
      'The reed vibrates to create sound',
      'Handle by the bell and body, never the keys',
      'Always wet your reed before playing'
    ],
    practiceInstructions: 'Identify each part on your saxophone. Practice assembling and disassembling your instrument carefully. Remember: always handle by the bell and body!'
  },

  'pb-2': {
    title: 'Assembly and Care',
    introduction: 'Proper assembly and care of your saxophone is essential. Let\'s learn the correct way to put your instrument together and take care of it.',
    sections: [
      {
        heading: 'Assembly Steps',
        content: 'Follow these steps in order:\n\n1. Attach the neck to the body - Tighten the neck screw just enough to hold it securely\n\n2. Wet the reed - Place it in your mouth for 30-60 seconds until soft\n\n3. Attach the reed to the mouthpiece - Align the tip of the reed with the tip of the mouthpiece\n\n4. Secure the ligature - Tighten it to hold the reed firmly but not too tight\n\n5. Attach mouthpiece to neck - Push it on gently and twist slightly to secure',
        tip: 'Never force any parts together. If something doesn\'t fit easily, check the alignment.'
      },
      {
        heading: 'Daily Care Routine',
        content: 'After every practice session:\n\n1. Swab the inside - Use a cleaning swab to remove moisture from the body\n\n2. Swab the neck - Use a smaller swab for the neck\n\n3. Wipe the mouthpiece - Use a soft cloth to clean the mouthpiece\n\n4. Check the reed - Store it in a reed guard to dry properly\n\n5. Case the instrument - Place it carefully in the case with all parts secure',
        example: 'Think of it like brushing your teeth - you do it every day to keep things clean and working properly.',
        tip: 'Never leave your saxophone assembled when not playing. Moisture buildup can damage pads and cause mold.'
      }
    ],
    keyPoints: [
      'Always assemble in the correct order',
      'Wet your reed before attaching',
      'Swab after every practice session',
      'Store reed in a reed guard',
      'Never leave instrument assembled when not playing'
    ],
    practiceInstructions: 'Practice assembling your saxophone 3 times. Time yourself - you should be able to do it in under 2 minutes. After practice, go through the complete care routine.'
  },

  'pb-3': {
    title: 'Making Your First Sound',
    introduction: 'Now let\'s learn how to produce sound on the saxophone. This is called forming your embouchure.',
    sections: [
      {
        heading: 'What is Embouchure?',
        content: 'Embouchure (ah-boo-SHURE) is how you use your mouth, lips, and facial muscles to play a wind instrument.\n\nFor saxophone:\n- Your bottom lip covers your bottom teeth\n- The mouthpiece rests on your bottom lip\n- Your top teeth rest on top of the mouthpiece\n- The corners of your mouth are firm, like saying "M"',
        example: 'Think of saying the letter "M" - feel how the corners of your mouth firm up? That\'s the foundation of good embouchure.',
        tip: 'Don\'t bite! Your teeth should rest gently on the mouthpiece. Biting will squeeze the reed and make the sound squeaky.'
      },
      {
        heading: 'Breathing and Air Support',
        content: 'Good sound comes from good breathing:\n\n1. Breathe from your diaphragm (belly breathing), not your chest\n2. Keep your shoulders relaxed and down\n3. Use steady, fast air - think of fogging up a mirror\n4. Support the air with your abdominal muscles',
        example: 'Imagine blowing out candles across the room - you need steady, focused air, not a weak puff.',
        tip: 'Practice breathing exercises without the instrument first. Put your hand on your belly - it should expand when you breathe in.'
      },
      {
        heading: 'Producing Your First Note',
        content: 'Let\'s make a sound:\n\n1. Form your embouchure as described above\n2. Place the mouthpiece in your mouth - about 1/2 inch of the mouthpiece should be inside\n3. Take a deep breath from your diaphragm\n4. Blow steady, fast air through the instrument\n5. Keep your throat open (like saying "AW")\n\nYou should hear a clear, steady tone.',
        tip: 'If you hear air noise but no pitch, you need more air speed. If it squeaks, check your embouchure - you might be biting.'
      }
    ],
    keyPoints: [
      'Embouchure: bottom lip over teeth, top teeth on mouthpiece',
      'Corners of mouth firm like saying "M"',
      'Breathe from diaphragm, not chest',
      'Use steady, fast air like fogging a mirror',
      'Don\'t bite - gentle pressure only'
    ],
    practiceInstructions: 'Practice forming your embouchure without the instrument for 2 minutes. Then, with just the mouthpiece and neck, try to produce a steady tone for 10 seconds at a time. Do this 5 times.'
  },

  'n-1': {
    title: 'Your First Notes: B, A, G',
    introduction: 'Now let\'s learn your first three notes on the saxophone: B, A, and G. These are played with your left hand.',
    sections: [
      {
        heading: 'Left Hand Position',
        content: 'Your left hand plays the top three keys on the saxophone:\n\n- Index finger (1st finger): Plays B\n- Middle finger (2nd finger): Plays A\n- Ring finger (3rd finger): Plays G\n\nCurve your fingers like you\'re holding a baseball. Use the pads of your fingers, not the tips.',
        example: 'Hold your left hand out in front of you. Curve your fingers naturally - this is the shape they should be on the saxophone.',
        tip: 'Keep your fingers close to the keys even when not pressing them. This makes playing faster and more accurate.'
      },
      {
        heading: 'Playing B',
        content: 'To play B:\n\n1. Form your embouchure\n2. Press down the first key with your left index finger\n3. Blow steady, supported air\n4. Keep all other fingers up\n\nB is the lowest note you can play with just one finger down.',
        tip: 'Make sure you\'re pressing the key down completely. If the sound is airy or squeaky, check that your finger is covering the key fully.'
      },
      {
        heading: 'Playing A',
        content: 'To play A:\n\n1. Keep your index finger down on B\n2. Add your middle finger on the second key\n3. Blow steady air\n\nA is played with two fingers down: index and middle.',
        tip: 'Move your fingers smoothly from B to A. Don\'t lift your fingers high - keep them close to the keys.'
      },
      {
        heading: 'Playing G',
        content: 'To play G:\n\n1. Keep index and middle fingers down\n2. Add your ring finger on the third key\n3. Blow steady air\n\nG is played with all three left-hand fingers down.',
        tip: 'Practice moving between B-A-G-A-B smoothly. Think of it as a wave: down, down, down, up, up.'
      }
    ],
    keyPoints: [
      'Left hand: index=B, middle=A, ring=G',
      'Curve fingers like holding a baseball',
      'Keep fingers close to keys',
      'Press keys completely down',
      'Use steady, supported air'
    ],
    practiceInstructions: 'Practice each note separately: play B for 4 beats, A for 4 beats, G for 4 beats. Then play the pattern B-A-G-A-B five times slowly. Focus on smooth finger movement and steady tone.'
  },

  'n-2': {
    title: 'Reading Music: The Staff',
    introduction: 'Music is written on a staff - five lines and four spaces. Let\'s learn how to read notes on the staff.',
    sections: [
      {
        heading: 'The Music Staff',
        content: 'The staff consists of:\n- 5 horizontal lines\n- 4 spaces between the lines\n- We count from bottom to top\n\nNotes can be placed on lines or in spaces. Higher notes are placed higher on the staff.',
        example: 'Think of the staff like a ladder - the higher you go, the higher the pitch.',
        tip: 'Always count lines and spaces from the bottom up. Line 1 is the bottom line, Line 5 is the top line.'
      },
      {
        heading: 'The Treble Clef',
        content: 'Saxophone music uses the treble clef (also called G clef).\n\nThe treble clef symbol wraps around the second line from the bottom, which is the note G. That\'s why it\'s called the G clef.\n\nThe lines of the treble clef (bottom to top): E-G-B-D-F\nRemember: "Every Good Boy Does Fine"\n\nThe spaces (bottom to top): F-A-C-E\nRemember: The word "FACE"',
        example: 'Look at the treble clef symbol - see how it curls around the second line? That line is G.',
        tip: 'Practice writing the treble clef. Start from the second line (G) and curl around it.'
      },
      {
        heading: 'Notes on the Staff',
        content: 'For saxophone, the notes you\'ve learned (B, A, G) appear on the staff:\n\n- B is on the middle line (3rd line)\n- A is in the space below B (2nd space)\n- G is on the line below A (2nd line)\n\nAs you go down the staff, the notes get lower. As you go up, they get higher.',
        tip: 'Use the mnemonics to help you remember. For lines: "Every Good Boy Does Fine". For spaces: "FACE".'
      },
      {
        heading: 'Ledger Lines',
        content: 'Sometimes notes go above or below the staff. We add short lines called ledger lines to show these notes.\n\nMiddle C (the C below your B) has one ledger line below the staff.',
        tip: 'Ledger lines are just extensions of the staff. Count them the same way you count staff lines.'
      }
    ],
    keyPoints: [
      'Staff has 5 lines and 4 spaces',
      'Count from bottom to top',
      'Treble clef = G clef',
      'Lines: E-G-B-D-F (Every Good Boy Does Fine)',
      'Spaces: F-A-C-E (FACE)',
      'Ledger lines extend the staff'
    ],
    practiceInstructions: 'Practice identifying notes on the staff. Write out the treble clef 10 times. Quiz yourself: what note is on the 3rd line? (B) What note is in the 2nd space? (A) What note is on the 2nd line? (G)'
  },

  'r-1': {
    title: 'Rhythm: Quarter Notes',
    introduction: 'Rhythm is the timing of music. Let\'s learn about quarter notes, which get 1 beat.',
    sections: [
      {
        heading: 'What is a Beat?',
        content: 'A beat is the basic unit of time in music. It\'s like a heartbeat - steady and regular.\n\nWhen you tap your foot to music, you\'re feeling the beat. Most music has a steady, consistent beat throughout.',
        example: 'Put your hand on your chest - feel your heartbeat? That\'s a beat. Music has beats too, usually faster than your heart!',
        tip: 'Practice tapping a steady beat. Count "1, 2, 3, 4" out loud while tapping your foot. Keep it steady like a clock.'
      },
      {
        heading: 'Quarter Notes',
        content: 'A quarter note gets 1 beat.\n\nIt looks like a filled-in oval with a stem (line) attached.\n\nWhen you see a quarter note, you play it for 1 beat, then move to the next note.',
        example: 'If the tempo is 60 BPM (beats per minute), each quarter note lasts 1 second - like the ticking of a clock.',
        tip: 'Quarter notes are the most common note value. When in doubt, count them as "1, 2, 3, 4".'
      },
      {
        heading: 'Counting Quarter Notes',
        content: 'To play quarter notes in 4/4 time:\n\nCount: "1, 2, 3, 4"\nPlay: One note on each count\n\nEach note gets exactly 1 beat. Keep your counting steady and even.',
        example: 'Say out loud: "1, 2, 3, 4" while tapping your foot. Each number is one quarter note.',
        tip: 'Use a metronome to keep steady time. Start slow (60 BPM) and gradually increase speed.'
      },
      {
        heading: 'Quarter Rests',
        content: 'A quarter rest means "be silent for 1 beat."\n\nIt looks like a squiggly line. When you see a rest, don\'t play - just count and wait.',
        tip: 'Rests are just as important as notes. They create the rhythm and give the music shape.'
      }
    ],
    keyPoints: [
      'A beat is the basic unit of time',
      'Quarter note = 1 beat',
      'Count "1, 2, 3, 4" for quarter notes',
      'Quarter rest = silence for 1 beat',
      'Keep steady, even timing'
    ],
    practiceInstructions: 'Practice counting quarter notes: Count "1, 2, 3, 4" out loud while tapping your foot. Do this for 1 minute. Then, play B on your saxophone for 4 beats, A for 4 beats, G for 4 beats. Count out loud as you play.'
  },

  'r-4': {
    title: 'Rhythm: Eighth Notes',
    introduction: 'Eighth notes are faster than quarter notes. Each eighth note gets half a beat. Let\'s learn how to count and play them.',
    sections: [
      {
        heading: 'What are Eighth Notes?',
        content: 'An eighth note gets 1/2 beat (half of a quarter note).\n\nIt looks like a quarter note with a flag (or beam) attached to the stem.\n\nTwo eighth notes equal one quarter note in duration.',
        example: 'If a quarter note is 1 second, an eighth note is 1/2 second - twice as fast!',
        tip: 'Eighth notes are often grouped in pairs with a beam connecting their flags.'
      },
      {
        heading: 'Counting Eighth Notes',
        content: 'To count eighth notes, we use "and" between the beats:\n\nCount: "1 and 2 and 3 and 4 and"\n\nEach number is a quarter note beat.\nEach "and" is an eighth note.\n\nSo: "1" = eighth note, "and" = eighth note, "2" = eighth note, etc.',
        example: 'Say out loud: "1 and 2 and 3 and 4 and" while tapping your foot on the numbers. Each syllable is one eighth note.',
        tip: 'The "and" counts are the off-beats. They fall between the main beats.'
      },
      {
        heading: 'Eighth Note Patterns',
        content: 'Common eighth note patterns:\n\n1. Two eighth notes = "1 and" (half a beat each)\n2. Four eighth notes = "1 and 2 and" (one full beat)\n3. Mixed patterns = quarter + two eighths, etc.\n\nEighth notes are often beamed together in groups of 2, 4, or 8.',
        tip: 'When you see beamed eighth notes, count them evenly. Don\'t rush the first one and slow down on the second.'
      },
      {
        heading: 'Eighth Rests',
        content: 'An eighth rest means "be silent for half a beat."\n\nIt looks like a single flag without a note head.\n\nWhen counting, still say the "and" but don\'t play.',
        tip: 'Rests are active silence - keep counting through them!'
      }
    ],
    keyPoints: [
      'Eighth note = 1/2 beat',
      'Count: "1 and 2 and 3 and 4 and"',
      'Two eighth notes = one quarter note',
      'Eighth notes are often beamed together',
      'Keep counting through eighth rests'
    ],
    practiceInstructions: 'Practice counting eighth notes: Say "1 and 2 and 3 and 4 and" while tapping your foot on the numbers. Then, play B-B-A-A-G-G on your saxophone, with each note lasting half a beat (eighth notes). Count out loud as you play.'
  },

  't-1': {
    title: 'Time Signatures',
    introduction: 'Time signatures tell us how many beats are in each measure and what note value gets one beat.',
    sections: [
      {
        heading: 'What is a Measure?',
        content: 'A measure (or bar) is a segment of time in music. It contains a specific number of beats.\n\nMeasures are separated by bar lines - the vertical lines on the staff.\n\nThink of measures like boxes that hold a certain number of beats.',
        example: 'If you have a box that holds 4 apples, that\'s like a measure with 4 beats. You can\'t put 5 apples in a 4-apple box!',
        tip: 'Bar lines help you organize the music. They show you where each measure begins and ends.'
      },
      {
        heading: 'Understanding Time Signatures',
        content: 'A time signature has two numbers stacked on top of each other at the beginning of the music:\n\nTop number: How many beats are in each measure\nBottom number: What type of note gets one beat\n\nCommon time signatures:\n- 4/4: 4 beats per measure, quarter note gets 1 beat (most common)\n- 3/4: 3 beats per measure, quarter note gets 1 beat (waltz time)\n- 2/4: 2 beats per measure, quarter note gets 1 beat (march time)',
        example: '4/4 time is like a box with 4 slots. Each slot holds one quarter note. You must fill all 4 slots before moving to the next measure.',
        tip: 'The bottom number is a code: 4 = quarter note, 2 = half note, 8 = eighth note.'
      },
      {
        heading: '4/4 Time (Common Time)',
        content: '4/4 is the most common time signature. It\'s so common it\'s also called "common time" and can be written with a "C" instead of numbers.\n\nIn 4/4 time:\n- Each measure has 4 beats\n- Quarter note gets 1 beat\n- Count: "1, 2, 3, 4"\n- Beat 1 is the strongest (accented)\n- Beat 3 is the next strongest',
        example: 'Most pop, rock, and jazz music is in 4/4 time. Try counting along to your favorite song - you\'ll likely find it\'s in 4/4!',
        tip: 'When counting 4/4, emphasize beats 1 and 3: "ONE, 2, THREE, 4".'
      },
      {
        heading: '3/4 Time (Waltz Time)',
        content: '3/4 time has 3 beats per measure.\n\nCount: "1, 2, 3"\n\nThis is waltz time - think of the "oom-pah-pah" rhythm. Beat 1 is strong, beats 2 and 3 are weak.',
        example: 'Waltzes are in 3/4 time. Think of the dance: step (1), step (2), step (3), repeat.',
        tip: 'In 3/4 time, count "1, 2, 3" with emphasis on beat 1: "ONE, 2, 3".'
      }
    ],
    keyPoints: [
      'Measure = segment of time with specific beats',
      'Time signature = top number (beats per measure), bottom number (note value = 1 beat)',
      '4/4 = 4 beats, quarter note = 1 beat (most common)',
      '3/4 = 3 beats, quarter note = 1 beat (waltz)',
      'Bar lines separate measures',
      'Beat 1 is always the strongest'
    ],
    practiceInstructions: 'Practice counting in different time signatures: Count "1, 2, 3, 4" for 4/4 time, then "1, 2, 3" for 3/4 time. Clap on beat 1 of each measure. Play a quarter note pattern in 4/4: B-B-B-B, A-A-A-A, G-G-G-G.'
  },

  't-2': {
    title: 'Key Signatures',
    introduction: 'Key signatures tell us which notes are sharp or flat throughout a piece. They appear at the beginning of the staff, right after the clef.',
    sections: [
      {
        heading: 'What is a Key Signature?',
        content: 'A key signature is a set of sharps (#) or flats (b) placed on specific lines and spaces of the staff.\n\nIt tells you which notes to play sharp or flat throughout the entire piece (unless cancelled by an accidental).\n\nKey signatures help us understand what key the music is in.',
        example: 'If you see one sharp (F#) at the beginning, every F in the piece should be played as F# unless marked otherwise.',
        tip: 'Key signatures apply to every octave. If F is sharp in the key signature, ALL F\'s are sharp - low F, middle F, high F.'
      },
      {
        heading: 'Order of Sharps',
        content: 'Sharps always appear in the same order on the staff:\n\nF# - C# - G# - D# - A# - E# - B#\n\nRemember: "Father Charles Goes Down And Ends Battle"\n\nEach new sharp is added in this order as you go through the keys.',
        example: 'G Major has 1 sharp: F#\nD Major has 2 sharps: F# and C#\nA Major has 3 sharps: F#, C#, and G#',
        tip: 'The last sharp in a key signature is the leading tone (7th note) of the major scale. Go up one half step to find the key name.'
      },
      {
        heading: 'Order of Flats',
        content: 'Flats appear in the opposite order:\n\nBb - Eb - Ab - Db - Gb - Cb - Fb\n\nRemember: "Battle Ends And Down Goes Charles Father"\n(Backwards from sharps!)\n\nEach new flat is added in this order.',
        example: 'F Major has 1 flat: Bb\nBb Major has 2 flats: Bb and Eb\nEb Major has 3 flats: Bb, Eb, and Ab',
        tip: 'For flats, the second-to-last flat tells you the key name. Exception: F Major has only 1 flat (Bb).'
      },
      {
        heading: 'Common Keys for Saxophone',
        content: 'As a saxophone player (transposing instrument), you\'ll commonly see:\n\nConcert Keys → Your Written Keys:\n- Concert Bb → Written C Major (no sharps/flats)\n- Concert Eb → Written A Major (3 sharps)\n- Concert F → Written G Major (1 sharp)\n\nThese are the most common keys in band music.',
        tip: 'Don\'t worry about transposition yet - just learn to read the key signature as written in your music.'
      }
    ],
    keyPoints: [
      'Key signature = sharps or flats for the whole piece',
      'Order of sharps: F C G D A E B',
      'Order of flats: B E A D G C F (backwards)',
      'Last sharp + half step = major key',
      'Second-to-last flat = major key',
      'Applies to all octaves'
    ],
    practiceInstructions: 'Practice identifying key signatures: Look at a piece of music and identify the key signature. Count the sharps or flats. Use the rules to determine the key. Practice with simple pieces in G Major (1 sharp) and F Major (1 flat).'
  },

  't-3': {
    title: 'Dynamics: Volume in Music',
    introduction: 'Dynamics tell us how loud or soft to play. They add expression and emotion to music.',
    sections: [
      {
        heading: 'What are Dynamics?',
        content: 'Dynamics are Italian words that tell us the volume level. They\'re written below or above the staff.\n\nDynamics are not just about loud and soft - they\'re about creating musical expression and shaping phrases.',
        example: 'Think of dynamics like the volume knob on a stereo. You can turn it up for excitement or down for intimacy.',
        tip: 'Dynamics are relative. "Forte" (loud) in one piece might be different from "forte" in another piece.'
      },
      {
        heading: 'Basic Dynamic Markings',
        content: 'From softest to loudest:\n\nppp - Pianississimo (very very soft)\npp - Pianissimo (very soft)\np - Piano (soft)\nmp - Mezzo piano (medium soft)\nmf - Mezzo forte (medium loud)\nf - Forte (loud)\nff - Fortissimo (very loud)\nfff - Fortississimo (very very loud)\n\n"Mezzo" means "half" or "medium" in Italian.',
        example: 'Think of a scale from 1-10: ppp is 1, p is 3, mp is 5, mf is 6, f is 8, ff is 10.',
        tip: 'Most music stays in the mp to mf range. Extreme dynamics (ppp, fff) are used for special effects.'
      },
      {
        heading: 'Changing Dynamics',
        content: 'Crescendo (cresc. or <): Gradually get louder\nDecrescendo (decresc. or >): Gradually get softer\nDiminuendo (dim.): Same as decrescendo\n\nThese are shown with hairpin symbols: < for crescendo, > for decrescendo.',
        example: 'A crescendo is like turning up the volume slowly. A decrescendo is like turning it down slowly.',
        tip: 'Changes in dynamics should be gradual and smooth, not sudden jumps.'
      },
      {
        heading: 'Playing with Dynamics',
        content: 'To play louder:\n- Use more air\n- Support with your diaphragm\n- Keep your embouchure firm\n\nTo play softer:\n- Use less air\n- Keep your embouchure firm (don\'t relax it!)\n- Control the air stream carefully',
        tip: 'Playing soft is actually harder than playing loud! It requires more control. Practice long tones at different dynamic levels.'
      }
    ],
    keyPoints: [
      'Dynamics = volume levels',
      'p = piano (soft), f = forte (loud)',
      'mp = mezzo piano, mf = mezzo forte',
      'Crescendo = gradually louder',
      'Decrescendo = gradually softer',
      'Playing soft requires more control than playing loud'
    ],
    practiceInstructions: 'Practice long tones with dynamics: Play G for 8 beats, starting at pp and crescendo to f. Then play G for 8 beats, starting at f and decrescendo to pp. Do this with each note: B, A, G.'
  },

  'n-3': {
    title: 'More Notes: F, E, D',
    introduction: 'Now let\'s add three more notes to your repertoire: F, E, and D. These use your right hand.',
    sections: [
      {
        heading: 'Right Hand Position',
        content: 'Your right hand plays the bottom three keys on the saxophone:\n\n- Index finger (1st finger): Plays F\n- Middle finger (2nd finger): Plays E\n- Ring finger (3rd finger): Plays D\n\nSame as left hand - curve your fingers like holding a baseball.',
        example: 'Your right hand mirrors your left hand. Left hand plays B-A-G (top), right hand plays F-E-D (bottom).',
        tip: 'Keep both hands balanced. Don\'t let the weight of the saxophone pull your right hand away from the keys.'
      },
      {
        heading: 'Playing F',
        content: 'To play F:\n\n1. Keep all left-hand fingers down (G position)\n2. Add your right index finger on the first right-hand key\n3. Blow steady air\n\nF is played with four fingers total: all three left-hand fingers plus right index.',
        tip: 'Make sure your right index finger is curved and using the pad of your finger, not the tip.'
      },
      {
        heading: 'Playing E',
        content: 'To play E:\n\n1. Keep left-hand fingers down\n2. Keep right index finger down\n3. Add your right middle finger\n\nE is played with five fingers: all left-hand plus right index and middle.',
        tip: 'Move smoothly from F to E. Your right middle finger should be ready and waiting.'
      },
      {
        heading: 'Playing D',
        content: 'To play D:\n\n1. Keep all left-hand fingers down\n2. Add all three right-hand fingers\n\nD is played with all six fingers down - the full "six-finger" note.',
        tip: 'D is your lowest note so far. Make sure all keys are fully covered or the sound will be stuffy or squeaky.'
      },
      {
        heading: 'Your Six-Note Scale',
        content: 'You now know six notes: B-A-G-F-E-D\n\nThese form a descending scale pattern. Practice going up and down:\n\nD-E-F-G-A-B (ascending)\nB-A-G-F-E-D (descending)\n\nThis is the foundation for many melodies.',
        example: 'Think of the musical phrase "Do-Re-Mi" from The Sound of Music. You can now play the first six notes of that scale!',
        tip: 'Practice smooth transitions between notes. Think of your fingers as a wave flowing up and down the keys.'
      }
    ],
    keyPoints: [
      'Right hand: index=F, middle=E, ring=D',
      'Six notes total: B-A-G-F-E-D',
      'Keep fingers curved and close to keys',
      'Cover keys completely for clear tone',
      'Practice ascending and descending patterns'
    ],
    practiceInstructions: 'Practice the six-note scale: Play D-E-F-G-A-B ascending, then B-A-G-F-E-D descending. Do this 5 times slowly. Then play patterns: D-F-A, E-G-B, D-E-F-G-F-E-D. Focus on smooth finger movement.'
  },

  'n-4': {
    title: 'Low C and Complete Range',
    introduction: 'Let\'s add the final note to your basic range: Low C. This completes your six-note scale from C to B.',
    sections: [
      {
        heading: 'Playing Low C',
        content: 'Low C is played with all fingers down PLUS the side key:\n\n1. All six fingers down (D position)\n2. Add your left thumb on the thumb key (side key)\n3. Blow steady, supported air\n\nLow C is the lowest note in your basic range.',
        tip: 'Low notes require more air support. Use steady, fast air and keep your embouchure firm.'
      },
      {
        heading: 'Your Complete Range: C to B',
        content: 'You now have a complete octave from C to B:\n\nC (lowest) - D - E - F - G - A - B (highest)\n\nThis is a major scale pattern. These eight notes are the foundation for most beginner music.',
        example: 'Think of "Do-Re-Mi-Fa-Sol-La-Ti-Do" - you can now play all of these notes!',
        tip: 'Practice playing from C all the way up to B, then back down. This builds finger coordination.'
      },
      {
        heading: 'Low Note Technique',
        content: 'Low notes (C, D, E) require special attention:\n\n- Use more air support\n- Keep embouchure firm but not tight\n- Make sure all keys are fully covered\n- Relax your throat (think "AW" sound)\n\nLow notes should be full and resonant, not stuffy or quiet.',
        tip: 'If low notes squeak or don\'t speak, check that all keys are fully covered and you\'re using enough air.'
      },
      {
        heading: 'Playing Across the Range',
        content: 'Practice moving smoothly between low and high notes:\n\nC-G-C (low to high to low)\nB-D-B (high to low to high)\n\nThis builds flexibility and control across your entire range.',
        tip: 'Don\'t bite or squeeze when going to low notes. Use air support, not embouchure pressure.'
      }
    ],
    keyPoints: [
      'Low C = all fingers + thumb key',
      'Complete range: C to B (one octave)',
      'Low notes need more air support',
      'Keep all keys fully covered',
      'Practice smooth transitions across the range'
    ],
    practiceInstructions: 'Practice your full range: Play C-D-E-F-G-A-B ascending, then B-A-G-F-E-D-C descending. Do this 5 times. Then play arpeggios: C-E-G-C, C-G-E-C. Focus on even tone quality across the entire range.'
  },

  'pb-4': {
    title: 'Breathing and Air Support',
    introduction: 'Good breathing is the foundation of good playing. Let\'s learn proper breathing technique for saxophone.',
    sections: [
      {
        heading: 'Diaphragmatic Breathing',
        content: 'Saxophone players use diaphragmatic breathing (belly breathing), not chest breathing.\n\nHow to breathe correctly:\n1. Keep shoulders relaxed and down\n2. Breathe in through your mouth\n3. Your belly should expand outward\n4. Your chest should barely move\n5. Fill your lungs completely from bottom to top',
        example: 'Lie down on your back and put a book on your belly. When you breathe in, the book should rise. When you breathe out, it should fall. That\'s diaphragmatic breathing!',
        tip: 'Practice breathing exercises without your instrument first. Master the breathing technique before adding the saxophone.'
      },
      {
        heading: 'Air Support',
        content: 'Air support means using your abdominal muscles to control the air stream:\n\n1. Keep your abdominal muscles engaged (like doing a sit-up)\n2. Push air out steadily with your diaphragm\n3. Don\'t let the air collapse or fade\n4. Maintain consistent air pressure throughout the phrase',
        example: 'Think of squeezing a tube of toothpaste - you want steady, even pressure from start to finish, not a burst at the beginning and nothing at the end.',
        tip: 'Your air support should feel like you\'re doing a gentle sit-up while playing. Your abdominal muscles should be engaged.'
      },
      {
        heading: 'Breath Control Exercises',
        content: 'Practice these breathing exercises daily:\n\n1. Hissing exercise: Take a deep breath, hiss "ssss" for as long as possible. Aim for 20+ seconds.\n\n2. Counting exercise: Take a breath, count out loud "1-2-3-4-5-6-7-8" on one breath. Keep steady volume.\n\n3. Pulse exercise: Take a breath, pulse the air "ha-ha-ha-ha" while keeping support.',
        tip: 'Do breathing exercises for 5 minutes every day. This will dramatically improve your playing.'
      },
      {
        heading: 'Common Breathing Problems',
        content: 'Watch out for these mistakes:\n\n- Raising shoulders when breathing (use belly instead)\n- Not taking enough air (fill completely)\n- Letting air collapse (maintain support)\n- Breathing through nose (use mouth for quick breaths)\n- Tensing up (stay relaxed)',
        tip: 'Record yourself playing and watch your breathing. Are your shoulders moving? Is your belly expanding? Fix what you see.'
      }
    ],
    keyPoints: [
      'Breathe from diaphragm, not chest',
      'Belly expands, shoulders stay down',
      'Use abdominal muscles for air support',
      'Maintain steady air pressure',
      'Practice breathing exercises daily'
    ],
    practiceInstructions: 'Practice breathing exercises: 1) Hiss for 20 seconds, 2) Count to 8 on one breath, 3) Play long tones on G for 8 beats, focusing on steady air. Do this routine for 5 minutes every day.'
  },

  'pb-5': {
    title: 'Tone Quality and Embouchure',
    introduction: 'Good tone quality comes from proper embouchure and air support. Let\'s refine your sound.',
    sections: [
      {
        heading: 'Ideal Saxophone Tone',
        content: 'A good saxophone tone is:\n\n- Clear and focused (not airy or fuzzy)\n- Centered and resonant (not thin or spread)\n- Consistent across all notes\n- Warm and full-bodied\n\nThink of a professional saxophone sound - smooth, rich, and controlled.',
        example: 'Listen to recordings of great saxophonists. Notice how their tone is consistent from low to high, loud to soft.',
        tip: 'Your tone is your voice on the instrument. Develop a beautiful tone by listening to great players and imitating their sound.'
      },
      {
        heading: 'Embouchure Refinement',
        content: 'Fine-tune your embouchure:\n\n1. Corners of mouth firm (like saying "M")\n2. Bottom lip cushioning the reed (not too much, not too little)\n3. Top teeth resting gently on mouthpiece\n4. Jaw dropped slightly (not clenched)\n5. Chin flat and firm (not bunched up)',
        example: 'Look in a mirror while playing. Your chin should be flat and smooth, not bunched up like when you bite into a lemon.',
        tip: 'Practice long tones in front of a mirror. Watch your embouchure - is it consistent? Are the corners firm?'
      },
      {
        heading: 'Long Tone Exercises',
        content: 'Long tones are the #1 exercise for improving tone:\n\n1. Play a middle note (G or A)\n2. Start at medium volume (mf)\n3. Hold for 8-12 beats\n4. Keep tone steady and consistent\n5. No wavering or shaking\n6. End with a clean cutoff\n\nDo this on every note daily.',
        tip: 'Long tones are boring but essential. Do them every day for 5-10 minutes. Your tone will improve dramatically.'
      },
      {
        heading: 'Common Tone Problems',
        content: 'Fix these tone issues:\n\n- Airy/fuzzy sound: More air support, firmer embouchure corners\n- Squeaky sound: Don\'t bite, relax jaw, more air\n- Thin sound: Open throat (think "AW"), more air\n- Uneven tone: Practice long tones, consistent air\n- Crack between notes: Smooth finger movement, steady air',
        tip: 'If your tone sounds bad, check: 1) Air support, 2) Embouchure, 3) Throat position, 4) Reed condition.'
      }
    ],
    keyPoints: [
      'Good tone: clear, focused, resonant, consistent',
      'Firm corners, relaxed jaw, flat chin',
      'Long tones daily = better tone',
      'Use air support, don\'t bite',
      'Listen to great players for tone models'
    ],
    practiceInstructions: 'Long tone routine: Play G for 12 beats (steady tone), A for 12 beats, B for 12 beats. Then play C-D-E-F-G-A-B-C ascending, holding each note for 8 beats. Focus on beautiful, consistent tone. Do this daily.'
  },

  'n-5': {
    title: 'The Chromatic Scale',
    introduction: 'The chromatic scale includes all twelve notes in an octave. It\'s essential for developing finger technique and understanding music theory.',
    sections: [
      {
        heading: 'What is the Chromatic Scale?',
        content: 'The chromatic scale includes every note (every half step) in an octave:\n\nC - C# - D - D# - E - F - F# - G - G# - A - A# - B - C\n\nEach note is one half step (semitone) apart. On saxophone, this means using every key combination.',
        example: 'Think of a piano - the chromatic scale is every key, both white and black, from one C to the next C.',
        tip: 'The chromatic scale is the foundation of all other scales. Master it first!'
      },
      {
        heading: 'Chromatic Fingerings',
        content: 'To play the chromatic scale, you\'ll use:\n\n- Main fingers (B-A-G-F-E-D-C)\n- Side keys (left and right)\n- Bis keys (alternate fingerings)\n- Palm keys (high D, Eb, E, F)\n\nEach half step requires a different fingering combination.',
        tip: 'Learn the chromatic scale slowly. Focus on smooth transitions between fingerings. Use a mirror to watch your fingers.'
      },
      {
        heading: 'Practicing the Chromatic Scale',
        content: 'Practice method:\n\n1. Start slow (♩=60)\n2. Play one octave: Bb up to Bb\n3. Use a metronome\n4. Focus on even tone and rhythm\n5. Gradually increase speed\n6. Practice ascending and descending',
        example: 'Start with just 4 notes: Bb-B-C-C#. Master that, then add more notes gradually.',
        tip: 'Don\'t rush! Speed comes from accuracy. Play perfectly slow, then gradually faster.'
      },
      {
        heading: 'Why Learn Chromatic Scale?',
        content: 'The chromatic scale is important because:\n\n- Develops finger technique and coordination\n- Helps you learn all the keys on your instrument\n- Foundation for understanding music theory\n- Used in jazz and modern music\n- Improves overall saxophone technique',
        tip: 'Practice chromatic scale for 5 minutes every day. It will improve your overall playing dramatically.'
      }
    ],
    keyPoints: [
      'Chromatic scale = all 12 notes (every half step)',
      'Uses all keys: main, side, bis, palm keys',
      'Practice slowly with metronome',
      'Foundation for all other scales',
      'Essential for finger technique'
    ],
    practiceInstructions: 'Practice the chromatic scale: Start on Bb, play up to Bb (one octave) using all half steps. Use a metronome at ♩=60. Play ascending and descending. Do this 5 times slowly, then gradually increase speed.'
  },

  'n-6': {
    title: 'Major Scales',
    introduction: 'Major scales are the foundation of Western music. Let\'s learn the pattern and practice your first major scales.',
    sections: [
      {
        heading: 'What is a Major Scale?',
        content: 'A major scale follows a specific pattern of whole steps (W) and half steps (H):\n\nW - W - H - W - W - W - H\n\nThis pattern creates the bright, happy sound we associate with major keys.\n\nExample: C Major scale\nC - D - E - F - G - A - B - C',
        example: 'Sing "Do-Re-Mi-Fa-Sol-La-Ti-Do" from The Sound of Music - that\'s a major scale!',
        tip: 'Remember the pattern: Whole-Whole-Half-Whole-Whole-Whole-Half. This pattern works for every major scale.'
      },
      {
        heading: 'Bb Major Scale (Alto Sax)',
        content: 'For alto saxophone, Bb Major is one of the first scales to learn:\n\nWritten notes: Bb - C - D - Eb - F - G - A - Bb\n\nFingerings:\n- Bb: Left hand + right index\n- C: All six fingers\n- D: Right hand only (F-E-D)\n- Eb: Right hand + side key\n- F: Right index\n- G: Left hand only (B-A-G)\n- A: Left hand (B-A)\n- Bb: Left hand (B)',
        tip: 'Practice each note separately first, then connect them into the scale.'
      },
      {
        heading: 'Practicing Scales',
        content: 'Scale practice method:\n\n1. Start slow (♩=60)\n2. Play ascending: root to root\n3. Play descending: root to root\n4. Use a metronome\n5. Focus on even tone and rhythm\n6. Gradually increase speed\n7. Practice in different rhythms',
        example: 'Practice patterns: 1) Long tones on each note, 2) Slurs between notes, 3) Different rhythms (quarters, eighths, triplets)',
        tip: 'Scales are like vegetables - not always fun, but essential for growth. Practice them daily!'
      },
      {
        heading: 'Scale Patterns',
        content: 'Once you know the basic scale, try these patterns:\n\n1. Thirds: Bb-D-C-E-D-F-E-G-F-A-G-B-A-C-B-D-C\n2. Arpeggios: Bb-D-F-Bb (1-3-5-8)\n3. Intervals: Skip notes (Bb-D, C-E, etc.)\n4. Rhythms: Swing, triplets, syncopation',
        tip: 'Patterns make scale practice more interesting and develop different technical skills.'
      }
    ],
    keyPoints: [
      'Major scale pattern: W-W-H-W-W-W-H',
      'Practice slowly with metronome',
      'Ascending and descending',
      'Even tone and rhythm',
      'Foundation for all music'
    ],
    practiceInstructions: 'Practice Bb Major scale: Play ascending and descending one octave. Use metronome at ♩=60. Do 5 repetitions slowly, then increase to ♩=66. Try playing in thirds pattern.'
  },
};

// Get lesson content by ID
export const getLessonContent = (lessonId: string): LessonContent | null => {
  return LESSON_CONTENT[lessonId] || null;
};
