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
  'basic-intro': {
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

  'basic-maintenance': {
    title: 'Daily Care',
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

  'basic-posture': {
    title: 'Posture & Hold',
    introduction: 'Proper posture and holding position are essential for good playing. Let\'s learn the correct way to hold your saxophone.',
    sections: [
      {
        heading: 'Standing Position',
        content: 'Stand with your feet shoulder-width apart:\n\n1. Keep your back straight but relaxed\n2. Shoulders down and back (not hunched)\n3. Head up, looking forward\n4. Weight evenly distributed on both feet\n\nGood posture helps with breathing and prevents tension.',
        example: 'Imagine a string pulling you up from the top of your head. You should feel tall and relaxed at the same time.',
        tip: 'Practice standing in good posture without your instrument first. Then add the saxophone.'
      },
      {
        heading: 'Holding the Saxophone',
        content: 'Hold your saxophone with the neck strap:\n\n1. Adjust the strap so the mouthpiece comes to your mouth naturally\n2. You shouldn\'t have to bend your neck down or reach up\n3. Left hand on top, right hand on bottom\n4. Thumbs support the weight: left thumb on the thumb rest, right thumb under the thumb hook\n5. Fingers curved, ready on the keys',
        tip: 'The neck strap should bear most of the weight, not your hands. Your hands should be relaxed and ready to move.'
      },
      {
        heading: 'Hand Position',
        content: 'Proper hand position:\n\n- Fingers curved like holding a baseball\n- Use the pads of your fingers (not tips)\n- Keep fingers close to the keys (1-2 cm away)\n- Wrists straight, not bent\n- Thumbs supporting, not gripping',
        example: 'Hold your hands out in front of you. Curve your fingers naturally - this is how they should look on the saxophone.',
        tip: 'If your fingers are flying far away from the keys, you\'ll be slower and less accurate. Keep them close!'
      },
      {
        heading: 'Common Mistakes',
        content: 'Avoid these posture problems:\n\n- Hunching shoulders (causes tension)\n- Bending neck down to reach mouthpiece (adjust strap!)\n- Gripping too tightly with thumbs\n- Fingers flying away from keys\n- Slouching or leaning to one side',
        tip: 'Check yourself in a mirror while playing. Are your shoulders relaxed? Is your back straight? Fix what you see.'
      }
    ],
    keyPoints: [
      'Stand tall with relaxed shoulders',
      'Adjust neck strap properly',
      'Thumbs support the weight',
      'Fingers curved and close to keys',
      'Check posture in a mirror'
    ],
    practiceInstructions: 'Practice your standing position for 2 minutes without the instrument. Then hold the saxophone and check: Is the mouthpiece at the right height? Are your thumbs supporting? Are your fingers curved and close to the keys? Hold for 5 minutes, checking your posture in a mirror.'
  },

  'basic-first-notes': {
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

  'basic-notes': {
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

  'basic-staff': {
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

  'basic-rhythm': {
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

  'one-eighth': {
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

  'basic-time-sigs': {
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

  'basic-dynamics': {
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

  'basic-notes': {
    title: 'Note Names on the Staff',
    introduction: 'Now that you understand the staff, let\'s learn to read note names. This is essential for playing music.',
    sections: [
      {
        heading: 'Note Names on the Lines',
        content: 'In treble clef, the notes on the lines from bottom to top are:\n\nLine 1 (bottom): E\nLine 2: G\nLine 3: B\nLine 4: D\nLine 5 (top): F\n\nRemember: "Every Good Boy Does Fine" (E-G-B-D-F)',
        example: 'Look at a piece of music. Find the notes on the lines. Can you name them using the mnemonic?',
        tip: 'Practice by pointing to notes on the staff and naming them quickly. Speed comes with practice!'
      },
      {
        heading: 'Note Names in the Spaces',
        content: 'The notes in the spaces from bottom to top spell a word:\n\nSpace 1 (bottom): F\nSpace 2: A\nSpace 3: C\nSpace 4 (top): E\n\nThe spaces spell "FACE" - easy to remember!',
        example: 'Look at the spaces in your music. They spell F-A-C-E from bottom to top.',
        tip: 'If you can remember "FACE", you\'ll always know the space notes!'
      },
      {
        heading: 'Notes Above and Below the Staff',
        content: 'Sometimes notes go higher or lower than the staff. We use ledger lines:\n\n- Middle C is on a ledger line below the staff\n- High G is on a ledger line above the staff\n- Count lines and spaces the same way as the staff',
        tip: 'Ledger lines can be confusing at first. Practice identifying them slowly and carefully.'
      },
      {
        heading: 'Reading Notes Quickly',
        content: 'To read music fluently, you need to recognize notes instantly:\n\n1. Don\'t count lines every time - memorize the patterns\n2. Learn to recognize notes by their shape and position\n3. Practice sight-reading simple melodies\n4. Start slow, then increase speed',
        example: 'Just like learning to read words, at first you sound out each letter, but eventually you recognize whole words instantly.',
        tip: 'Spend 5 minutes every day practicing note recognition. Use flashcards or apps.'
      }
    ],
    keyPoints: [
      'Lines: E-G-B-D-F (Every Good Boy Does Fine)',
      'Spaces: F-A-C-E (spells FACE)',
      'Ledger lines extend the staff',
      'Practice note recognition daily',
      'Speed comes with consistent practice'
    ],
    practiceInstructions: 'Practice note identification: Look at random notes on the staff and name them as fast as you can. Do this for 5 minutes daily. Use the mnemonics "Every Good Boy Does Fine" for lines and "FACE" for spaces. Try to recognize notes instantly without counting.'
  },

  'basic-repeat-signs': {
    title: 'Repeat Signs and Navigation',
    introduction: 'Music often has sections that repeat. Let\'s learn the symbols that tell us how to navigate through a piece.',
    sections: [
      {
        heading: 'Basic Repeat Signs',
        content: 'Repeat signs tell you to play a section again:\n\n- A double bar with two dots (:) means "repeat this section"\n- The dots face the section you should repeat back to\n- If there\'s only one repeat sign, repeat from the beginning',
        example: 'If you see |: music :|, play the music between the repeat signs twice.',
        tip: 'Always look ahead in the music to see if there are repeat signs before you start playing.'
      },
      {
        heading: 'First and Second Endings',
        content: 'Sometimes you play different endings on repeats:\n\n- First ending (1.): Play this the first time through\n- Second ending (2.): Play this the second time through\n- Skip the first ending when you repeat',
        example: 'Play measures 1-8, hit the repeat, play 1-7 again, then skip to the second ending (measure 8 alternative).',
        tip: 'Use a pencil to mark where you go on the repeat if it\'s confusing.'
      },
      {
        heading: 'D.C. and D.S.',
        content: 'Italian navigation terms:\n\n- D.C. (Da Capo) = "From the head" - go back to the beginning\n- D.S. (Dal Segno) = "From the sign" - go back to the 𝄋 sign\n- al Fine = "to the end" - stop when you see "Fine"\n- al Coda = "to the tail" - jump to the coda section',
        example: 'D.C. al Fine means: play to the end, go back to the beginning, play until you see "Fine", then stop.',
        tip: 'Write out the playing order if the navigation is complex. Example: 1-2-3-1-2-4'
      },
      {
        heading: 'Coda Sections',
        content: 'A coda is a separate ending section:\n\n- Look for the 𝄌 coda symbol\n- When you see "To Coda", jump to the coda section\n- The coda is usually at the end of the piece',
        tip: 'Use a pencil to draw arrows showing where you jump to. This prevents getting lost!'
      }
    ],
    keyPoints: [
      'Repeat signs: play section again',
      'First/second endings: different on repeat',
      'D.C. = go to beginning',
      'D.S. = go to sign (𝄋)',
      'al Fine = stop at "Fine"',
      'Coda = separate ending section'
    ],
    practiceInstructions: 'Find a piece of music with repeat signs. Map out the playing order before you start. Write it down: "1-2-3-1-2-4" or similar. Then play it following your map. Practice with D.C. and D.S. until the navigation feels natural.'
  },

  'basic-drill': {
    title: 'Band Drill Basics',
    introduction: 'Band drill is the art of marching and moving as a unit. It requires precision, discipline, and teamwork.',
    sections: [
      {
        heading: 'The Attention Position',
        content: 'The foundation of all drill is the attention position:\n\n1. Heels together, toes apart at 45 degrees\n2. Legs straight, knees locked\n3. Stand tall with weight on balls of feet\n4. Arms at sides, fingers straight and together\n5. Head up, eyes forward\n6. Remain silent and still',
        example: 'Think of a soldier standing at attention - perfect posture, complete stillness, total readiness.',
        tip: 'Practice standing at attention for 2-3 minutes daily. It builds discipline and strength.'
      },
      {
        heading: 'The Parade Rest Position',
        content: 'Parade rest is a relaxed but formal position:\n\n1. Move left foot 12 inches to the left\n2. Keep legs straight\n3. Place right hand in left palm behind your back\n4. Left thumb over right thumb\n5. Keep head and eyes forward\n6. Remain silent',
        tip: 'Parade rest is still a position of attention. Don\'t slouch or look around!'
      },
      {
        heading: 'Marking Time',
        content: 'Marking time means marching in place:\n\n1. Lift knees to 6 inches (parallel to ground)\n2. Keep toes pointed down\n3. Alternate feet: left-right-left-right\n4. Maintain steady rhythm\n5. Stay in place - don\'t travel',
        example: 'Think of a marching band warming up before a performance - all moving together in perfect rhythm.',
        tip: 'Practice marking time with a metronome. Start at 120 BPM and work up to 140 BPM.'
      },
      {
        heading: 'Forward March',
        content: 'The basic forward march:\n\n1. Step off with left foot\n2. Roll from heel to toe\n3. Step length: 30 inches (heel to heel)\n4. Keep knees straight on each step\n5. Maintain steady pace\n6. Keep formation with other marchers',
        tip: 'Count your steps: "1-2-3-4" or use the cadence called by the drum major.'
      }
    ],
    keyPoints: [
      'Attention: heels together, stand tall, remain still',
      'Parade rest: left foot out, hands behind back',
      'Mark time: knees to 6 inches, stay in place',
      'Forward march: 30-inch step, heel to toe',
      'Always maintain formation and rhythm'
    ],
    practiceInstructions: 'Practice drill positions daily: 1) Stand at attention for 2 minutes, 2) Move to parade rest and back to attention 10 times, 3) Mark time for 2 minutes at 120 BPM, 4) Practice forward march in your room (count your steps). Focus on precision and discipline.'
  },

  'one-maintenance': {
    title: 'Cork Care and Lubrication',
    introduction: 'As you advance, proper maintenance becomes more important. Let\'s learn about cork care and lubrication.',
    sections: [
      {
        heading: 'Understanding Cork',
        content: 'Your saxophone has cork in several places:\n\n1. Neck cork - where mouthpiece attaches\n2. Key corks - small corks under the keys\n3. Bumper corks - prevent keys from hitting each other\n\nCork needs to stay supple and lubricated to work properly.',
        tip: 'Check your neck cork regularly. If it\'s dry or cracked, it needs lubrication immediately.'
      },
      {
        heading: 'Cork Grease Application',
        content: 'How to apply cork grease:\n\n1. Use a small amount of cork grease\n2. Apply to neck cork only (not key corks)\n3. Rub it in with your finger\n4. Wipe off excess\n5. Apply every 1-2 weeks or when dry',
        example: 'Think of cork grease like lotion for your skin - a little goes a long way!',
        tip: 'Don\'t over-apply! Too much grease makes the mouthpiece slip. A thin, even layer is perfect.'
      },
      {
        heading: 'Signs of Dry Cork',
        content: 'Watch for these warning signs:\n\n- Cork looks dry or cracked\n- Mouthpiece is hard to attach/remove\n- You hear air leaks when playing\n- Cork feels rough to the touch\n\nIf you notice these, apply cork grease immediately.',
        tip: 'Prevention is better than cure. Apply cork grease regularly before the cork gets dry.'
      },
      {
        heading: 'When to See a Technician',
        content: 'Some problems need professional help:\n\n- Cracked or missing cork\n- Key corks worn out (keys clicking)\n- Bumper corks fallen out\n- Neck cork damaged beyond simple greasing\n\nDon\'t try to fix these yourself - take your sax to a qualified technician.',
        tip: 'Have your saxophone checked by a technician at least once a year for a full service.'
      }
    ],
    keyPoints: [
      'Cork needs regular lubrication',
      'Apply cork grease every 1-2 weeks',
      'Use small amounts - don\'t over-apply',
      'Watch for dry or cracked cork',
      'See a technician for serious cork problems'
    ],
    practiceInstructions: 'Check your neck cork today. Is it dry or cracked? If so, apply a small amount of cork grease. Set a reminder to check and grease your cork every 2 weeks. Make this part of your regular maintenance routine.'
  },

  'one-scales': {
    title: 'Major Scales: Bb, Eb, F',
    introduction: 'Major scales are the foundation of music. At Level ONE, you\'ll learn three essential major scales at ♩=66.',
    sections: [
      {
        heading: 'Why These Three Scales?',
        content: 'Bb, Eb, and F Major are the most common keys for concert band music:\n\n- Bb Major: The "home key" for saxophones (concert pitch Eb)\n- Eb Major: Second most common (concert pitch Bb)\n- F Major: Third most common (concert pitch Eb)\n\nMastering these three scales opens up most band literature.',
        tip: 'These scales appear in almost every piece you\'ll play. Master them thoroughly!'
      },
      {
        heading: 'Bb Major Scale',
        content: 'Bb Major scale (written for alto sax):\n\nNotes: Bb - C - D - Eb - F - G - A - Bb\nFingering pattern: Start with all fingers down (Bb), lift fingers one by one going up.\n\nAscending: Bb(123) - C(12) - D(1) - Eb(123) - F(12) - G(1) - A(none) - Bb(123)\nDescending: Reverse the pattern',
        example: 'Think of the scale as a staircase - each note is one step up or down.',
        tip: 'Practice slowly with a metronome at ♩=60, then gradually increase to ♩=66.'
      },
      {
        heading: 'Eb Major Scale',
        content: 'Eb Major scale (written for alto sax):\n\nNotes: Eb - F - G - Ab - Bb - C - D - Eb\nThis scale has three flats: Eb, Ab, Bb\n\nKey points:\n- Use side keys for Eb and Ab\n- Keep fingers close to keys\n- Maintain even tone throughout',
        tip: 'Eb Major can be tricky because of the side keys. Practice the transitions slowly until they\'re smooth.'
      },
      {
        heading: 'F Major Scale',
        content: 'F Major scale (written for alto sax):\n\nNotes: F - G - A - Bb - C - D - E - F\nThis scale has one flat: Bb\n\nThis is often the easiest of the three because it uses mostly natural fingerings with just one side key (Bb).',
        tip: 'Use F Major as your "confidence scale" - it\'s usually the easiest to play cleanly.'
      },
      {
        heading: 'Practice Strategy',
        content: 'How to practice scales effectively:\n\n1. Start with long tones on each note (4 beats each)\n2. Play slowly with metronome (♩=60)\n3. Focus on even tone and smooth fingering\n4. Gradually increase tempo to ♩=66\n5. Practice ascending and descending\n6. Try different rhythms: quarters, eighths, triplets',
        example: 'Day 1: Long tones + slow quarters\nDay 2: Add eighths at slow tempo\nDay 3: Increase tempo slightly\nDay 4: Add triplets\nDay 5: Performance tempo',
        tip: 'Scales are like exercise for your fingers. Daily practice builds speed and accuracy.'
      }
    ],
    keyPoints: [
      'Bb, Eb, F are the three most important major scales',
      'Practice with metronome starting at ♩=60',
      'Target tempo is ♩=66 for Level ONE',
      'Focus on even tone and smooth fingering',
      'Practice ascending and descending',
      'Use different rhythms for variety'
    ],
    practiceInstructions: 'Daily scale routine: 1) Long tones on each note of Bb Major (4 beats each), 2) Play Bb Major ascending/descending at ♩=60, 3) Repeat for Eb Major, 4) Repeat for F Major, 5) Gradually increase tempo to ♩=66 over the week. Practice this routine for 10 minutes daily.'
  },

  'one-chromatic': {
    title: 'The Chromatic Scale',
    introduction: 'The chromatic scale includes every note in an octave. It\'s essential for developing finger technique and understanding music theory.',
    sections: [
      {
        heading: 'What is the Chromatic Scale?',
        content: 'The chromatic scale includes all twelve notes in an octave:\n\nC - C# - D - D# - E - F - F# - G - G# - A - A# - B - C\n\nEach note is one half step (semitone) apart. On saxophone, this means using every key combination.',
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

  'one-harmonic': {
    title: 'Harmonic Minor Scales',
    introduction: 'Harmonic minor scales have a distinctive sound used in many musical styles. Let\'s learn the pattern and practice your first harmonic minor scale.',
    sections: [
      {
        heading: 'What is Harmonic Minor?',
        content: 'The harmonic minor scale has a unique pattern:\n\nWhole - Half - Whole - Whole - Half - Augmented 2nd - Half\n\nThe "augmented 2nd" (3 half steps) gives harmonic minor its distinctive, exotic sound.\n\nExample: C harmonic minor\nC - D - Eb - F - G - Ab - B - C',
        example: 'The augmented 2nd between Ab and B creates a "Middle Eastern" or "classical minor" sound.',
        tip: 'Listen to recordings of harmonic minor scales to internalize the sound before playing.'
      },
      {
        heading: 'C Harmonic Minor (Alto Sax)',
        content: 'For alto saxophone, C harmonic minor is a good starting point:\n\nNotes: C - D - Eb - F - G - Ab - B - C\n\nKey points:\n- Three flats: Eb, Ab, and the B is natural (not Bb)\n- The jump from Ab to B is the augmented 2nd\n- This scale shares the key signature of Eb Major (3 flats) but raises the 7th degree',
        tip: 'The tricky part is the B natural - make sure you don\'t accidentally play Bb!'
      },
      {
        heading: 'Finding Harmonic Minor Scales',
        content: 'To find any harmonic minor scale:\n\n1. Start with the natural minor scale (same key signature as relative major)\n2. Raise the 7th note by a half step\n3. That\'s your harmonic minor scale!\n\nExample: A minor (relative minor of C Major)\n- Natural minor: A - B - C - D - E - F - G - A\n- Raise 7th (G to G#): A - B - C - D - E - F - G# - A\n- Result: A harmonic minor',
        tip: 'Every major key has a relative minor. The minor scale starts on the 6th degree of the major scale.'
      },
      {
        heading: 'Practice Strategy',
        content: 'How to practice harmonic minor:\n\n1. Learn the pattern: W-H-W-W-H-A2-H\n2. Start with C harmonic minor\n3. Practice slowly with metronome\n4. Focus on the augmented 2nd interval\n5. Gradually add more harmonic minor scales\n6. Listen for the distinctive sound',
        example: 'The augmented 2nd should sound smooth, not jumpy. Practice the Ab to B transition slowly.',
        tip: 'Harmonic minor is used in many famous pieces. Listen for it in classical and jazz music!'
      }
    ],
    keyPoints: [
      'Harmonic minor pattern: W-H-W-W-H-A2-H',
      'Augmented 2nd gives distinctive sound',
      'Raise 7th degree of natural minor',
      'Start with C harmonic minor',
      'Practice the augmented 2nd interval carefully'
    ],
    practiceInstructions: 'Practice C harmonic minor: Play ascending and descending one octave. Focus on the augmented 2nd interval (Ab to B). Use metronome at ♩=60. Do this 5 times slowly. Then try A harmonic minor. Listen for the distinctive "exotic" sound.'
  },

  'one-intonation': {
    title: 'Tuning and Intonation Basics',
    introduction: 'Good intonation means playing in tune. Let\'s learn how to recognize and correct pitch problems.',
    sections: [
      {
        heading: 'What is Intonation?',
        content: 'Intonation is how accurately you play the correct pitch:\n\n- Sharp: Pitch is too high\n- Flat: Pitch is too low\n- In tune: Pitch is correct\n\nGood intonation is essential for playing with others.',
        example: 'Think of a singer hitting the right note vs. being slightly off. That\'s intonation.',
        tip: 'Your ear is your best tool for intonation. Train it by listening carefully!'
      },
      {
        heading: 'Using a Tuner',
        content: 'A tuner helps you see if you\'re sharp or flat:\n\n1. Play a sustained note (start with Bb or F)\n2. Watch the tuner display\n3. Green/center = in tune\n4. Red/left = flat (too low)\n5. Red/right = sharp (too high)\n\nMost tuners show cents: -50 to +50 cents from perfect pitch.',
        tip: 'Practice with a tuner daily. Start with long tones on easy notes like Bb and F.'
      },
      {
        heading: 'Adjusting Your Pitch',
        content: 'How to fix intonation problems:\n\nIf you\'re FLAT (too low):\n- Push mouthpiece IN slightly\n- Increase air support\n- Firm embouchure corners\n- Raise tongue position slightly\n\nIf you\'re SHARP (too high):\n- Pull mouthpiece OUT slightly\n- Relax embouchure\n- Drop jaw slightly\n- Use warmer, slower air',
        example: 'Think of the mouthpiece like a tuning slide - small adjustments make big differences.',
        tip: 'Always tune to a concert Bb or F. These are the most stable notes on saxophone.'
      },
      {
        heading: 'Common Intonation Issues',
        content: 'Notes that are often out of tune:\n\n- Low notes tend to be flat\n- High notes tend to be sharp\n- Middle D and E can be sharp\n- Palm keys (high D, Eb, E, F) are often sharp\n\nLearn the tendencies of your instrument and adjust accordingly.',
        tip: 'Every saxophone is different. Learn your instrument\'s specific intonation tendencies.'
      }
    ],
    keyPoints: [
      'Sharp = too high, Flat = too low',
      'Use a tuner to check your pitch',
      'Adjust mouthpiece position for tuning',
      'Air support affects intonation',
      'Learn your instrument\'s tendencies'
    ],
    practiceInstructions: 'Daily intonation practice: 1) Tune to concert Bb with a tuner, 2) Play long tones on Bb, F, and G, checking tuner, 3) Adjust mouthpiece until you\'re in tune, 4) Practice playing in tune without looking at tuner. Do this for 5 minutes daily.'
  },

  'one-key-sigs': {
    title: 'Key Signatures',
    introduction: 'Key signatures tell us which notes are sharp or flat throughout a piece. Let\'s learn to read them quickly.',
    sections: [
      {
        heading: 'What is a Key Signature?',
        content: 'A key signature is a set of sharps (#) or flats (b) at the beginning of the staff.\n\nIt tells you which notes to play sharp or flat throughout the entire piece (unless cancelled by an accidental).\n\nKey signatures help us understand what key the music is in.',
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

  'one-sight': {
    title: 'Sight Reading Introduction',
    introduction: 'Sight reading is the ability to play music you\'ve never seen before. It\'s an essential skill for any musician.',
    sections: [
      {
        heading: 'What is Sight Reading?',
        content: 'Sight reading means playing music at first sight:\n\n- You\'ve never seen the piece before\n- You play it through without stopping\n- You maintain rhythm and pulse\n- You make musical decisions on the spot\n\nThis is different from practicing a piece over time.',
        example: 'Think of sight reading like reading a book aloud for the first time - you keep going even if you make small mistakes.',
        tip: 'Sight reading is a skill that improves with daily practice. Even 5 minutes a day makes a huge difference!'
      },
      {
        heading: 'The Sight Reading Process',
        content: 'Before you play, take 30 seconds to scan the music:\n\n1. Check the key signature - what key are you in?\n2. Check the time signature - what\'s the meter?\n3. Look for tricky rhythms or patterns\n4. Find the tempo marking\n5. Scan for repeats, codas, or other navigation\n6. Take a deep breath and start!',
        tip: 'Never start playing immediately! Always scan the music first. This 30-second scan prevents most mistakes.'
      },
      {
        heading: 'Keeping the Pulse',
        content: 'The most important rule of sight reading:\n\nKEEP GOING! Don\'t stop for mistakes!\n\n- Maintain a steady pulse\n- If you miss a note, keep going\n- If you lose your place, jump to the next measure\n- Rhythm is more important than perfect notes\n\nThink of it like a river - it keeps flowing even if there are rocks.',
        example: 'If you miss a note, don\'t go back and fix it. Just keep playing. The rhythm is more important than perfection.',
        tip: 'Use a metronome when sight reading. It helps you maintain pulse and not slow down for difficult passages.'
      },
      {
        heading: 'Level ONE Sight Reading Standards',
        content: 'At Level ONE, you should be able to:\n\n- Sight read up to 16 bars\n- With assistance (teacher can help with tricky spots)\n- In simple keys (C, G, F Major)\n- In 4/4 or 3/4 time\n- Using quarter and eighth notes\n- At a moderate tempo (♩=80-100)',
        tip: 'Start with very easy pieces. Success builds confidence! Gradually increase difficulty.'
      }
    ],
    keyPoints: [
      'Scan music before playing (30 seconds)',
      'Check key signature, time signature, tempo',
      'KEEP GOING - don\'t stop for mistakes',
      'Rhythm is more important than perfect notes',
      'Practice sight reading daily (5 minutes)',
      'Use a metronome to maintain pulse'
    ],
    practiceInstructions: 'Daily sight reading practice: 1) Find a simple piece you\'ve never seen, 2) Scan for 30 seconds (key, time, tempo), 3) Set metronome to ♩=80, 4) Play through without stopping, 5) Don\'t worry about mistakes - keep the pulse going! Do this for 5 minutes daily with different pieces.'
  },

  'one-drill': {
    title: 'Drill Movements and Marching',
    introduction: 'At Level ONE, you\'ll learn basic drill movements and marching techniques for band performances.',
    sections: [
      {
        heading: 'The Forward March',
        content: 'The standard forward march:\n\n1. Step off with left foot on count 1\n2. Roll from heel to toe smoothly\n3. Step length: 30 inches (heel to heel)\n4. Keep knees straight on each step\n5. Maintain steady pace with the group\n6. Keep formation with other marchers',
        example: 'Think of walking naturally but with more precision and discipline than everyday walking.',
        tip: 'Count your steps: "1-2-3-4" or follow the drum major\'s cadence. Stay in step with the person next to you.'
      },
      {
        heading: 'The Halt',
        content: 'How to stop marching properly:\n\n1. Bring feet together on the designated count\n2. Return to attention position\n3. Remain completely still and silent\n4. Keep your instrument in playing position\n5. Wait for the next command',
        tip: 'The halt should be crisp and unified. Everyone stops at exactly the same moment.'
      },
      {
        heading: 'Flanking (Turning While Marching)',
        content: 'Basic turns while marching:\n\nRight flank:\n1. Pivot on left foot\n2. Step off with right foot in new direction\n3. Complete turn in 2 counts\n\nLeft flank:\n1. Pivot on right foot\n2. Step off with left foot in new direction\n3. Complete turn in 2 counts',
        tip: 'Keep your upper body stable during turns. Don\'t bob up and down!'
      },
      {
        heading: 'Dress and Cover',
        content: 'Maintaining formation while marching:\n\n- Dress: Align yourself with the person to your side\n- Cover: Maintain proper distance from person in front\n- Use peripheral vision to stay aligned\n- Make small adjustments, not big ones\n- Don\'t stare - glance quickly and adjust',
        example: 'Think of formation like a grid - you need to stay in your specific spot in the grid.',
        tip: 'Good dress and cover makes the whole band look professional. It takes practice but it\'s worth it!'
      }
    ],
    keyPoints: [
      'Forward march: 30-inch step, heel to toe',
      'Halt: crisp stop, return to attention',
      'Flanking: pivot and step in new direction',
      'Dress: align with person to your side',
      'Cover: maintain distance from person in front',
      'Stay in step and in formation'
    ],
    practiceInstructions: 'Practice drill movements: 1) Forward march in place (mark time) for 2 minutes, 2) Practice halts from mark time, 3) Practice right and left flanks, 4) March around your room focusing on 30-inch steps. If possible, practice with other musicians to learn dress and cover.'
  },

  'two-maintenance': {
    title: 'Pad Care and Cleaning',
    introduction: 'At Level TWO, you\'ll learn advanced maintenance including cleaning grease from pads to keep your saxophone in top condition.',
    sections: [
      {
        heading: 'Understanding Pads',
        content: 'Pads are the leather discs that cover the tone holes:\n\n- Made of leather or synthetic material\n- Create an airtight seal when keys are closed\n- Essential for proper sound production\n- Can accumulate grease and debris over time',
        tip: 'If a pad is dirty or damaged, the note won\'t play properly. You\'ll hear air leaks or the note won\'t sound at all.'
      },
      {
        heading: 'Cleaning Grease from Pads',
        content: 'How to clean pads safely:\n\n1. Use pad cleaning powder or paper\n2. Place cleaning paper under the pad\n3. Close the key gently\n4. Pull paper out slowly\n5. Repeat for each dirty pad\n6. Test the note to ensure it seals properly',
        example: 'Think of it like cleaning a window - you want to remove the grime without scratching the surface.',
        tip: 'Never use alcohol or harsh chemicals on pads! They can damage the leather. Use only products designed for instrument pads.'
      },
      {
        heading: 'Signs of Dirty Pads',
        content: 'Watch for these warning signs:\n\n- Notes don\'t speak clearly\n- You hear air leaks (fizzing sound)\n- Pad looks shiny or greasy\n- Pad sticks when you release the key\n- Note requires extra finger pressure to seal',
        tip: 'Clean pads regularly - don\'t wait until they\'re badly contaminated. Prevention is easier than cure!'
      },
      {
        heading: 'When to See a Technician',
        content: 'Some pad problems need professional help:\n\n- Torn or missing pads\n- Pads that won\'t seal after cleaning\n- Multiple pads needing replacement\n- Pad adjustments (leveling)\n- Mechanical issues with key action\n\nDon\'t try complex pad work yourself - take your sax to a qualified technician.',
        tip: 'Have your saxophone checked by a technician at least once a year. They can spot problems before they become serious.'
      }
    ],
    keyPoints: [
      'Pads create airtight seals on tone holes',
      'Clean pads with pad cleaning powder/paper',
      'Never use alcohol or harsh chemicals',
      'Watch for air leaks and sticking pads',
      'See a technician for serious pad problems'
    ],
    practiceInstructions: 'Check your saxophone pads today. Play each note and listen for air leaks. If you hear fizzing or the note doesn\'t speak clearly, that pad may need cleaning. Use pad cleaning paper on dirty pads. Make this part of your weekly maintenance routine.'
  },

  'two-scales': {
    title: 'Scales at Increased Tempo',
    introduction: 'At Level TWO, you\'ll increase your scale tempo to ♩=72 and add more keys to your repertoire.',
    sections: [
      {
        heading: 'Increased Tempo Requirements',
        content: 'Level TWO scale requirements:\n\n- Tempo: ♩=72 (faster than Level ONE\'s ♩=66)\n- Range: One octave (same as Level ONE)\n- Memorization: NOT required yet\n- Keys: Bb, Eb, F, Ab, Db Major\n- Scales: Major, Chromatic, Harmonic Minor',
        tip: 'Increase tempo gradually. Don\'t jump from ♩=66 to ♩=72 overnight. Add 2 BPM each week.'
      },
      {
        heading: 'New Keys: Ab and Db Major',
        content: 'At Level TWO, you\'ll add two new major scales:\n\nAb Major (4 flats: Bb, Eb, Ab, Db)\n- Written for alto: Ab - Bb - C - Db - Eb - F - G - Ab\n- Uses many side keys and alternate fingerings\n\nDb Major (5 flats: Bb, Eb, Ab, Db, Gb)\n- Written for alto: Db - Eb - F - Gb - Ab - Bb - C - Db\n- The most flats you\'ll encounter at this level',
        tip: 'These keys have many flats, so take extra care with intonation. Use a tuner to check your pitch.'
      },
      {
        heading: 'Practice Strategy for Faster Tempo',
        content: 'How to build speed safely:\n\n1. Start at comfortable tempo (♩=60)\n2. Play perfectly 3 times in a row\n3. Increase metronome by 2 BPM\n4. Repeat until you reach ♩=72\n5. If you make mistakes, slow down again\n6. Practice daily for consistent improvement',
        example: 'Week 1: ♩=60-62\nWeek 2: ♩=62-64\nWeek 3: ♩=64-66\nWeek 4: ♩=66-68\nWeek 5: ♩=68-70\nWeek 6: ♩=70-72',
        tip: 'Speed comes from accuracy, not rushing. Perfect practice makes perfect playing!'
      },
      {
        heading: 'Scale Patterns at Faster Tempo',
        content: 'Once you can play scales at ♩=72, try these patterns:\n\n1. Triplets: Three notes per beat\n2. Sixteenth notes: Four notes per beat\n3. Intervals: Thirds, fourths, sixths\n4. Arpeggios: 1-3-5-8 pattern\n5. Rhythmic variations: Dotted rhythms, syncopation',
        tip: 'Patterns make scale practice more interesting and develop different technical skills. Don\'t just play up and down!'
      }
    ],
    keyPoints: [
      'Level TWO tempo: ♩=72',
      'New keys: Ab Major (4 flats), Db Major (5 flats)',
      'Build speed gradually (2 BPM per week)',
      'Accuracy before speed',
      'Practice scale patterns for variety'
    ],
    practiceInstructions: 'Scale routine: 1) Play all Level ONE scales (Bb, Eb, F) at ♩=72, 2) Learn Ab Major slowly at ♩=60, 3) Gradually increase Ab Major to ♩=72, 4) Learn Db Major slowly, 5) Practice scale patterns (triplets, arpeggios). Do this for 15 minutes daily.'
  },

  'two-more-keys': {
    title: 'Additional Keys and Fingerings',
    introduction: 'At Level TWO, you\'ll expand your key knowledge and learn more advanced fingerings.',
    sections: [
      {
        heading: 'Expanding Your Key Vocabulary',
        content: 'Level TWO adds these keys to your repertoire:\n\nMajor keys with more accidentals:\n- Ab Major (4 flats)\n- Db Major (5 flats)\n\nMinor keys:\n- F Harmonic Minor\n- C Harmonic Minor\n\nThese keys appear frequently in band literature.',
        tip: 'The more keys you know, the more music you can play. Each new key opens up new repertoire!'
      },
      {
        heading: 'Alternate Fingerings',
        content: 'Some notes have multiple fingering options:\n\n- Bb: Standard (1+2+3) or Bis key (side key)\n- F: Standard (1+2+3) or Side key\n- High F#: Palm key or alternate fingering\n\nLearn when to use each fingering for best intonation and technique.',
        example: 'In fast passages, use the fingering that\'s most comfortable and in tune. In slow, lyrical passages, use the fingering with best tone quality.',
        tip: 'Experiment with different fingerings. Your teacher can help you choose the best ones for specific situations.'
      },
      {
        heading: 'Trills and Fast Passages',
        content: 'For fast passages and trills:\n\n- Use fingerings that minimize hand movement\n- Keep fingers close to keys\n- Practice slowly first, then build speed\n- Use metronome to maintain even rhythm\n- Focus on smooth transitions between notes',
        tip: 'Fast playing comes from relaxed, efficient finger movement. Tension is your enemy!'
      }
    ],
    keyPoints: [
      'Learn Ab and Db Major scales',
      'Learn F and C Harmonic Minor scales',
      'Explore alternate fingerings',
      'Choose fingerings for best intonation',
      'Practice fast passages slowly first'
    ],
    practiceInstructions: 'Learn Ab Major and Db Major scales. Practice slowly at first, then build to ♩=72. Explore alternate fingerings for Bb and F. Practice trills between adjacent notes. Focus on smooth, relaxed finger movement.'
  },

  'two-intonation': {
    title: 'Advanced Intonation Skills',
    introduction: 'At Level TWO, intonation becomes a critical performance objective. You\'ll learn to identify and correct pitch problems independently.',
    sections: [
      {
        heading: 'Intonation as a Critical Skill',
        content: 'At Level TWO, intonation is CRITICAL:\n\n- You must identify sharp/flat against a tuning note\n- You must adjust your pitch accordingly\n- This is assessed in your performance evaluation\n- Poor intonation can prevent you from passing',
        tip: 'Take intonation seriously! It\'s just as important as playing the right notes.'
      },
      {
        heading: 'Tuning with Other Musicians',
        content: 'How to tune in an ensemble:\n\n1. Listen to the tuning note (usually concert Bb)\n2. Play your matching note (written G for alto)\n3. Listen for "beats" (wavering sound)\n4. Adjust your pitch until beats disappear\n5. Lock in with the group\n\nYou\'re in tune when your note blends perfectly with others.',
        example: 'When two notes are slightly out of tune, you hear a "wah-wah-wah" beating sound. When they\'re perfectly in tune, the beating disappears and the notes blend.',
        tip: 'Practice tuning with a drone (sustained pitch). This trains your ear to recognize when you\'re in tune.'
      },
      {
        heading: 'Adjusting Pitch While Playing',
        content: 'Real-time intonation adjustments:\n\n- Listen constantly to yourself and others\n- Make micro-adjustments with embouchure\n- Use alternate fingerings for problem notes\n- Adjust air speed and direction\n- Be ready to adjust on the fly',
        tip: 'Good intonation requires constant listening and adjustment. It\'s an active skill, not passive!'
      },
      {
        heading: 'Common Intonation Problems',
        content: 'Notes that often need adjustment:\n\n- Low notes: tend to be flat, push in slightly\n- High notes: tend to be sharp, pull out slightly\n- Middle D/E: often sharp, use alternate fingering\n- Palm keys: often sharp, relax embouchure\n\nLearn your instrument\'s tendencies and compensate.',
        tip: 'Every saxophone is different. Spend time learning which notes on YOUR sax need adjustment.'
      }
    ],
    keyPoints: [
      'Intonation is CRITICAL at Level TWO',
      'Must identify and correct pitch problems',
      'Tune with other musicians using tuning note',
      'Listen for beats and adjust until they disappear',
      'Make real-time adjustments while playing',
      'Learn your instrument\'s intonation tendencies'
    ],
    practiceInstructions: 'Daily intonation practice: 1) Tune to concert Bb with tuner, 2) Play long tones checking tuner, 3) Practice tuning with a drone tone, 4) Play with recordings and match pitch, 5) Identify and correct problem notes on your sax. Do this for 10 minutes daily.'
  },

  'two-theory': {
    title: 'Theory Fundamentals: Intervals and Chords',
    introduction: 'At Level TWO, music theory becomes critical. You\'ll learn about intervals, chords, and how they work together.',
    sections: [
      {
        heading: 'Understanding Intervals',
        content: 'An interval is the distance between two notes:\n\n- Measured by letter names (2nd, 3rd, 4th, etc.)\n- Quality: major, minor, perfect, augmented, diminished\n- Example: C to E is a major 3rd (3 letter names: C-D-E)\n\nIntervals are the building blocks of melody and harmony.',
        example: 'Think of intervals like distances in miles. A 2nd is like 1 mile, a 3rd is like 2 miles, etc.',
        tip: 'Learn to recognize intervals by sound. This is called "ear training" and it\'s essential for musicians.'
      },
      {
        heading: 'Major and Minor Intervals',
        content: 'Seconds and thirds can be major or minor:\n\nMajor 2nd: 1 whole step (C to D)\nMinor 2nd: 1 half step (C to Db)\n\nMajor 3rd: 2 whole steps (C to E)\nMinor 3rd: 1.5 steps (C to Eb)\n\nThe quality determines whether the interval is major or minor.',
        tip: 'To figure out interval quality, think of the lower note as the tonic of a major scale. If the upper note is in that major scale, it\'s major. If it\'s a half step smaller, it\'s minor.'
      },
      {
        heading: 'Introduction to Chords',
        content: 'A chord is three or more notes played together:\n\n- Built by stacking intervals (usually thirds)\n- Triad: root + 3rd + 5th\n- Major triad: major 3rd + perfect 5th\n- Minor triad: minor 3rd + perfect 5th\n\nChords provide the harmonic foundation of music.',
        example: 'C Major chord = C + E + G (root + major 3rd + perfect 5th)',
        tip: 'Learn to recognize major and minor chords by sound. Major sounds happy, minor sounds sad.'
      },
      {
        heading: 'Why Theory Matters',
        content: 'Music theory helps you:\n\n- Understand how music works\n- Read and write music more effectively\n- Communicate with other musicians\n- Analyze and interpret compositions\n- Improvise and compose your own music\n\nTheory is the grammar of music!',
        tip: 'Don\'t just memorize theory - understand it. Ask "why" and "how" things work.'
      }
    ],
    keyPoints: [
      'Intervals = distance between notes',
      'Major/minor quality for 2nds and 3rds',
      'Chords = 3+ notes played together',
      'Triads built in thirds',
      'Theory is essential for understanding music'
    ],
    practiceInstructions: 'Theory practice: 1) Identify intervals by ear (start with 2nds and 3rds), 2) Build major and minor triads on different roots, 3) Analyze simple pieces for intervals and chords, 4) Practice writing intervals and chords. Do this for 10 minutes daily.'
  },

  'two-aural': {
    title: 'Aural Skills: Ear Training',
    introduction: 'Aural skills involve training your ear to recognize musical elements. This is essential for all musicians.',
    sections: [
      {
        heading: 'What are Aural Skills?',
        content: 'Aural skills include:\n\n- Recognizing intervals by sound\n- Identifying rhythms by ear\n- Singing back melodies\n- Recognizing chord qualities\n- Clapping or tapping rhythmic patterns\n\nThese skills connect your ear to your instrument.',
        tip: 'Aural skills take time to develop. Be patient and practice consistently!'
      },
      {
        heading: 'Interval Recognition',
        content: 'Learn to recognize intervals by sound:\n\nMajor 2nd: "Happy Birthday" (first two notes)\nMinor 2nd: "Jaws" theme\nMajor 3rd: "When the Saints Go Marching In"\nMinor 3rd: "Greensleeves"\nPerfect 4th: "Here Comes the Bride"\nPerfect 5th: "Star Wars" theme',
        example: 'Use familiar songs to remember interval sounds. This is called "interval association."',
        tip: 'Practice interval recognition daily. Start with just 2-3 intervals, then add more as you improve.'
      },
      {
        heading: 'Rhythm Recognition',
        content: 'At Level TWO, you should be able to:\n\n- Clap or tap a simple rhythmic pattern\n- Pattern is 2 bars in 4/4 time\n- Uses half, quarter, or eighth notes\n- Maintain steady pace and rhythmic accentuation\n\nThe instructor plays the pattern twice, then you repeat it.',
        tip: 'Count out loud while clapping: "1-and-2-and-3-and-4-and". This helps you internalize the rhythm.'
      },
      {
        heading: 'Melodic Dictation',
        content: 'At Level TWO, you should be able to:\n\n- Sing back a 4-note melody\n- Based on first 3 notes of major scale\n- Instructor plays key, tonic triad, then melody twice\n- You sing back using note names or solfege\n\nThis connects your ear to pitch recognition.',
        tip: 'Start with very simple melodies. Success builds confidence!'
      }
    ],
    keyPoints: [
      'Aural skills = training your ear',
      'Recognize intervals by sound',
      'Clap rhythmic patterns accurately',
      'Sing back simple melodies',
      'Practice consistently for improvement'
    ],
    practiceInstructions: 'Daily aural skills practice: 1) Interval recognition (5 minutes) - use apps or recordings, 2) Rhythm clapping (5 minutes) - clap patterns from method books, 3) Melodic dictation (5 minutes) - sing back simple melodies. Total: 15 minutes daily.'
  },

  'two-sight': {
    title: 'Sight Reading at Level TWO',
    introduction: 'At Level TWO, sight reading expectations increase. You\'ll read longer passages with more complex rhythms.',
    sections: [
      {
        heading: 'Level TWO Sight Reading Standards',
        content: 'At Level TWO, you should be able to:\n\n- Sight read up to 16 bars\n- With assistance (teacher can help with tricky spots)\n- In keys with up to 3 sharps or flats\n- In 4/4, 3/4, or 2/4 time\n- Using quarter, eighth, and half notes\n- At a moderate tempo (♩=90-110)',
        tip: 'The key is maintaining the pulse. Don\'t stop for mistakes - keep going!'
      },
      {
        heading: 'Advanced Scanning Technique',
        content: 'Before playing, scan for:\n\n1. Key signature - what key are you in?\n2. Time signature - what\'s the meter?\n3. Tempo marking - how fast?\n4. Tricky rhythms - count them first\n5. Accidentals - watch for sharps/flats\n6. Repeats and navigation - plan your path\n7. Difficult fingerings - visualize them\n\nTake 30-60 seconds for this scan.',
        tip: 'The more you sight read, the faster your scanning becomes. Eventually it becomes automatic!'
      },
      {
        heading: 'Handling Difficult Passages',
        content: 'When you encounter something hard:\n\n- Simplify if necessary (play main notes only)\n- Maintain the rhythm at all costs\n- Don\'t stop or go back\n- Jump to the next beat if you get lost\n- Keep your place in the music\n\nRemember: rhythm > perfect notes',
        example: 'If there\'s a fast run you can\'t play, just play the first and last note. Keep the rhythm going!',
        tip: 'Sight reading is about making musical decisions quickly. You don\'t have time to be perfect!'
      },
      {
        heading: 'Building Sight Reading Skills',
        content: 'How to improve sight reading:\n\n1. Practice daily (even 5 minutes helps)\n2. Use music slightly below your level\n3. Never practice a sight reading piece\n4. Play through without stopping\n5. Reflect on what was difficult\n6. Gradually increase difficulty',
        tip: 'Sight reading is like a muscle - it gets stronger with regular exercise!'
      }
    ],
    keyPoints: [
      'Level TWO: 16 bars, up to 3 sharps/flats',
      'Scan music for 30-60 seconds before playing',
      'Maintain pulse - don\'t stop for mistakes',
      'Rhythm is more important than perfect notes',
      'Practice sight reading daily'
    ],
    practiceInstructions: 'Daily sight reading: 1) Find a piece you\'ve never seen (slightly below your level), 2) Scan for 30 seconds (key, time, tempo, tricky spots), 3) Set metronome to ♩=90, 4) Play through without stopping, 5) Don\'t worry about mistakes - keep the pulse! Do this for 5-10 minutes daily.'
  },
};

// Get lesson content by ID
export const getLessonContent = (lessonId: string): LessonContent | null => {
  return LESSON_CONTENT[lessonId] || null;
};
