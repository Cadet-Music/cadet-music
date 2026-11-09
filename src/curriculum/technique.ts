// Instrument-specific care and technique lessons for the saxophone and clarinet tracks.
// Maintenance tasks follow PO 013W / 113W / 213W / 313W in the level packages.

import type { CadetLevel, ExerciseData, LessonType, TrackId, VideoLink } from './types';
import { mc, tf, order, match } from './helpers';

export interface TechniqueTopic {
  slug: string;
  level: CadetLevel;
  title: string;
  emoji: string;
  type: LessonType;
  xp: number;
  /** PO code within the level (13 maintenance, 16 rhythm/aural). Omit for skill lessons. */
  poCode?: 13 | 16;
  description: string;
  concept: string;
  intro: string;
  sections: { heading: string; content: string; example?: string; tip?: string }[];
  keyPoints: string[];
  practice: string;
  quiz: ExerciseData[];
  videos?: VideoLink[];
}

export function techniqueTopics(track: TrackId): TechniqueTopic[] {
  const sax = track === 'saxophone';
  const inst = sax ? 'saxophone' : 'clarinet';
  const Inst = sax ? 'Saxophone' : 'Clarinet';

  return [
    // ------------------------------------------------------------------ BASIC
    {
      slug: 'parts', level: 'BASIC', title: `Meet Your ${Inst}`, emoji: sax ? '🎷' : '🎵', type: 'playing', xp: 10, poCode: 13,
      description: `Learn the parts of the ${inst}`, concept: 'saxophoneAssembly',
      intro: `Before you play, learn the names of the parts. Your assessor will expect you to use them correctly when you explain how you assemble and care for your ${inst}.`,
      sections: sax
        ? [
            { heading: 'The parts', content: 'Mouthpiece: where you blow\nReed: a thin piece of cane that vibrates against the mouthpiece\nLigature: the metal band that holds the reed on\nNeck: connects the mouthpiece to the body\nBody: the main tube with the keys\nBell: the flared end where sound comes out\nNeck strap: carries the weight of the instrument' },
            { heading: 'How it makes sound', content: 'Air from your lungs makes the reed vibrate against the mouthpiece. That vibration travels down the tube. The keys open and close holes to change the length of the sounding tube, which changes the pitch.', tip: 'Hold the saxophone by the body and bell, never by the keys or rods.' },
          ]
        : [
            { heading: 'The parts', content: 'Mouthpiece: where you blow\nReed: a thin piece of cane that vibrates against the mouthpiece\nLigature: holds the reed on\nBarrel: joins the mouthpiece to the upper joint\nUpper joint and lower joint: the main body with the keys\nBell: the flared end\nThumb rest: supports the weight under your right thumb' },
            { heading: 'How it makes sound', content: 'Air makes the reed vibrate against the mouthpiece. Covering the finger holes and pressing keys changes the length of the tube. The register key (left thumb) lets you play in the higher register.', tip: 'Pick the clarinet up by the joints, not by the keys, and never grip it by the bridge key between the joints.' },
          ],
      keyPoints: ['Name every part from mouthpiece to bell.', 'The reed vibrating against the mouthpiece makes the sound.', 'Never hold the instrument by the keys or rods.'],
      practice: `Point to each part of your ${inst} and say its name and its job without looking at the notes above.`,
      quiz: [
        mc('Which part vibrates to make the sound?', ['The bell', 'The reed', 'The keys', 'The neck strap'], 1, 'saxophoneAssembly'),
        mc('What does the ligature do?', ['Holds the reed on the mouthpiece', 'Changes the pitch', 'Stores the reed', 'Cleans the instrument'], 0, 'saxophoneAssembly'),
        tf(sax ? 'The bell is where sound comes out of the saxophone.' : 'The barrel joins the mouthpiece to the upper joint.', true, 'saxophoneAssembly'),
      ],
    },
    {
      slug: 'assembly', level: 'BASIC', title: 'Assembly, Cork Grease and Storage', emoji: '🔧', type: 'playing', xp: 15, poCode: 13,
      description: 'Grease corks, put together, take apart and store (PO 013W)', concept: 'maintenance',
      intro: 'PO 013W asks you to grease the cork joints, put the instrument together, take it apart and store it safely. Learn the order and the habits that protect your instrument.',
      sections: sax
        ? [
            { heading: 'Greasing the cork', content: 'Put a small amount of cork grease on the neck cork. Rub it in until the cork looks shiny and smooth, not wet or lumpy.' },
            { heading: 'Putting it together', content: '1. Slide the neck into the body with a gentle twist, then tighten the neck screw.\n2. Attach the neck strap and hook it to the instrument.\n3. Wet the reed in your mouth.\n4. Place the reed flat side down on the mouthpiece, with the tip of the reed just touching the tip of the mouthpiece.\n5. Slide the ligature on and tighten the screws just enough to hold the reed in place.\n6. Twist the mouthpiece onto the neck cork.' },
            { heading: 'Taking apart and storing', content: 'Remove the mouthpiece, take off the reed and put it in a reed case. Swab the neck and the mouthpiece, then swab the body with a pull-through swab. Put the mouthpiece cap on, lay the instrument gently in its case, and latch it.', tip: 'Never leave a reed on the mouthpiece in the case. It can warp or chip.' },
          ]
        : [
            { heading: 'Greasing the corks', content: 'Put a small amount of cork grease on every cork tenon (the corks where the joints, barrel and bell join). Rub until each cork is smooth and shiny.' },
            { heading: 'Putting it together', content: '1. Twist the barrel onto the upper joint.\n2. Hold the keys down gently on the lower joint so the bridge key is free, and twist the joints together so the bridge keys line up.\n3. Twist the bell on.\n4. Wet the reed in your mouth and place it flat side down on the mouthpiece, with the tip aligned with the tip of the mouthpiece.\n5. Slide the ligature over the reed and tighten the screws.\n6. Twist the mouthpiece onto the barrel.' },
            { heading: 'Taking apart and storing', content: 'Take off the mouthpiece and reed first. Swab each joint, the barrel and the mouthpiece, put the reed in its case, cap the mouthpiece, and put every part back in its place in the case before latching.', tip: 'When twisting the joints together, never squeeze across the bridge key. It bends easily.' },
          ],
      keyPoints: ['Grease the corks lightly so joints twist smoothly.', 'Put the reed on flat side down, tip aligned.', 'Swab before storing and never leave the reed on the mouthpiece.', 'Latch the case and store it flat.'],
      practice: `Assemble and take apart your ${inst}, grease the corks and put it in its case, three times, explaining each step aloud like an assessor is listening.`,
      quiz: [
        order('Put these assembly steps in order:', sax ? ['Grease the neck cork', 'Attach the neck to the body', 'Place the reed and ligature', 'Twist on the mouthpiece'] : ['Grease the corks', 'Join the barrel and joints', 'Attach the bell', 'Place the reed and mouthpiece'], 'maintenance'),
        mc('What do you do with the reed before playing?', ['Dry it', 'Wet it', 'Trim it', 'Bend it'], 1, 'maintenance'),
        tf('You should leave the reed on the mouthpiece in the case.', false, 'maintenance'),
      ],
      videos: [],
    },
    {
      slug: 'reed-care', level: 'BASIC', title: 'Reed Care', emoji: '🌿', type: 'playing', xp: 10, poCode: 13,
      description: 'Choose, replace and store a reed', concept: 'maintenance',
      intro: 'A damaged reed makes a bad sound no matter how well you play. The Level Basic maintenance PO asks you to describe when to replace a reed and how to store it.',
      sections: [
        { heading: 'Recognizing when to replace a reed', content: 'Replace a reed if it is chipped or cracked, if the tip is warped or split, if it has gone soft or mushy, or if it will not play clearly any more even after you adjust your embouchure.' },
        { heading: 'Storing a reed', content: 'Keep reeds in a reed case or holder so they dry flat and are protected. Do not leave them loose in the case or on the mouthpiece. Rotate between several reeds so they last longer.', tip: 'Hold a reed by the thick end, never by the tip. Oil and pressure damage the tip.' },
        { heading: 'Wetting', content: 'Always wet the reed in your mouth or in water before playing so it vibrates freely.' },
      ],
      keyPoints: ['Replace chipped, cracked, warped or soft reeds.', 'Store reeds in a reed case.', 'Wet the reed before playing and hold it by the base.'],
      practice: 'Explain to a friend, out loud, three signs that mean a reed should be replaced and where you store yours.',
      quiz: [
        mc('Which is a reason to replace a reed?', ['It is wet', 'It has a chipped tip', 'It is new', 'It is thick'], 1, 'maintenance'),
        mc('Where should reeds be stored?', ['In a reed case', 'Loose in the instrument case', 'On the mouthpiece', 'In your pocket'], 0, 'maintenance'),
        tf('You should hold a reed by the tip.', false, 'maintenance'),
      ],
    },
    {
      slug: 'posture', level: 'BASIC', title: 'Posture and Hold', emoji: '🧍', type: 'playing', xp: 15,
      description: 'Stand or sit so you can breathe and play freely', concept: 'saxophoneAssembly',
      intro: 'Good posture makes breathing easier and prevents tension. The same posture is used on parade, in rehearsal and in assessments.',
      sections: sax
        ? [
            { heading: 'Body position', content: 'Stand or sit tall with shoulders relaxed and feet flat. Keep your head level, and bring the mouthpiece to your mouth rather than lowering your head to it.' },
            { heading: 'Holding the saxophone', content: 'Adjust the neck strap so the mouthpiece reaches your mouth without leaning. The saxophone rests at your right side. Left hand on the upper keys, right hand on the lower keys. The right thumb sits under the thumb hook; the left thumb on the octave key.' },
          ]
        : [
            { heading: 'Body position', content: 'Sit or stand tall with relaxed shoulders. The clarinet is held in front of you, at roughly a 35–40 degree angle from your body, with the bell between your knees if you are sitting.' },
            { heading: 'Holding the clarinet', content: 'The right thumb supports the instrument under the thumb rest. The left thumb covers the thumb hole and the register key. Fingers are curved and rest over the holes and rings, not flat.' },
          ],
      keyPoints: ['Sit or stand tall with relaxed shoulders.', 'Bring the instrument to you; do not lean down to it.', 'Keep fingers curved.'],
      practice: 'Take your instrument position in front of a mirror, hold it for 30 seconds, and check shoulders, head, fingers and hands.',
      quiz: [
        mc('Where should the mouthpiece be relative to your head?', ['You lean down to it', 'You bring it to your mouth', 'It rests on your chin', 'It is below your chin'], 1, 'saxophoneAssembly'),
        tf('Your fingers should be curved, not flat.', true, 'saxophoneAssembly'),
        mc('Which helps breathing the most?', ['Slouching', 'Tall relaxed posture', 'Raising shoulders', 'Locking knees'], 1, 'saxophoneAssembly'),
      ],
    },
    {
      slug: 'breathing', level: 'BASIC', title: 'Breathing and Air Support', emoji: '💨', type: 'playing', xp: 15,
      description: 'Take a full, low breath and keep the air steady', concept: 'saxophoneAssembly',
      intro: 'Your air is the engine. A steady, fast stream of air gives a full tone and in-tune notes.',
      sections: [
        { heading: 'Breathing in', content: 'Breathe in through your mouth, low and wide, as if filling a balloon in your belly. Your shoulders should stay still while your stomach and sides expand.' },
        { heading: 'Breathing out', content: `Blow a steady, warm stream of air, like fogging a window, then add the ${inst}. Keep the speed of the air steady from the start to the end of the note.`, tip: 'Practice with a sheet of paper: blow a steady stream and hold the sheet against a wall for as long as you can.' },
      ],
      keyPoints: ['Breathe low and wide; shoulders stay still.', 'Blow steady, warm air.', 'Keep the airspeed steady for the whole note.'],
      practice: 'Breathe in for 4 counts, out for 4 counts. Repeat 5 times, then breathe out for 8 counts.',
      quiz: [
        mc('Where should a good breath feel like it goes?', ['High in the chest', 'Low in the belly and sides', 'Only in the throat', 'Into the shoulders'], 1, 'saxophoneAssembly'),
        tf('Your shoulders should rise when you breathe in.', false, 'saxophoneAssembly'),
        mc('A steady tone needs…', ['Steady air', 'Frequent stops', 'Squeezing the reed', 'Puffed cheeks'], 0, 'saxophoneAssembly'),
      ],
    },
    {
      slug: 'embouchure', level: 'BASIC', title: 'Embouchure', emoji: '👄', type: 'playing', xp: 20,
      description: 'How to shape your mouth around the mouthpiece', concept: 'saxophoneAssembly',
      intro: 'The embouchure is the way your mouth and face hold the mouthpiece. A good embouchure is firm but relaxed.',
      sections: sax
        ? [
            { heading: 'The shape', content: 'Top teeth rest lightly on top of the mouthpiece. Roll your bottom lip over your bottom teeth to make a cushion for the reed. Close your lips around the mouthpiece as if you were saying "oo", with the corners of your mouth firm. Do not bite.' },
            { heading: 'Check', content: 'Your chin should be flat and pointed, your cheeks should stay firm (not puffed), and your tone should be steady, not squeaky or fuzzy.' },
          ]
        : [
            { heading: 'The shape', content: 'Top teeth rest on top of the mouthpiece. Roll your bottom lip over your bottom teeth, and close your lips around the mouthpiece as if drinking through a straw. The corners of the mouth are firm and pushed slightly in. Do not bite.' },
            { heading: 'Check', content: 'The chin should be flat and pointed, the cheeks firm (not puffed), and only a small amount of mouthpiece should be in your mouth. Squeaks usually mean too much mouthpiece, too little air support, or a biting jaw.' },
          ],
      keyPoints: ['Top teeth on the mouthpiece, bottom lip over the bottom teeth.', 'Corners firm, cheeks not puffed.', 'Support with air, do not bite.'],
      practice: 'Make your embouchure on the mouthpiece alone, hold a steady sound for 4 seconds, and check your chin and cheeks in a mirror.',
      quiz: [
        mc('Where do the top teeth rest?', ['On the mouthpiece', 'On the reed', 'On your bottom lip', 'Behind the lip'], 0, 'saxophoneAssembly'),
        tf('Puffed cheeks are a sign of a good embouchure.', false, 'saxophoneAssembly'),
        mc('What does biting the mouthpiece usually cause?', ['A pinched, thin sound', 'A beautiful tone', 'Better pitch', 'Louder volume'], 0, 'saxophoneAssembly'),
      ],
    },
    {
      slug: 'first-sound', level: 'BASIC', title: 'Making Your First Sound', emoji: '🎶', type: 'playing', xp: 20,
      description: 'Produce a steady tone', concept: 'saxophoneAssembly',
      intro: 'A steady, clear first tone is the foundation of every note you will play.',
      sections: [
        { heading: 'On the mouthpiece', content: `Form your embouchure, take a low breath, and blow a steady stream of air. Start the note with a soft "too" or "doo" from the tip of your tongue. Aim for a steady, buzzy tone that does not squeak.` },
        { heading: `On the ${inst}`, content: sax ? 'Add the neck and then the full instrument. Cover the holes with your fingers and blow the same steady stream of air.' : 'Add the barrel, then the full instrument. Cover the holes with the pads of your fingers and keep the tone steady.', tip: 'Ask your instructor to check your first sound against a tuner so you know how a steady tone looks and sounds.' },
      ],
      keyPoints: ['Start every note with the tip of the tongue.', 'Keep air steady and warm.', 'A clear tone is better than a loud one.'],
      practice: 'Play a steady note for 4 counts, then rest for 4 counts. Do this 10 times.',
      quiz: [
        mc('How do you start a note?', ['With a hard blow', 'With the tip of the tongue saying "too"', 'With your throat', 'By biting'], 1, 'saxophoneAssembly'),
        tf('A steady tone is more important than a loud tone.', true, 'saxophoneAssembly'),
        mc('A squeak usually means…', ['Too little air support or too much bite', 'Perfect tone', 'A broken reed only', 'Too loud'], 0, 'saxophoneAssembly'),
      ],
    },
    {
      slug: 'first-notes', level: 'BASIC', title: 'Your First Notes', emoji: '🎵', type: 'playing', xp: 20,
      description: sax ? 'Left-hand notes B, A and G' : 'Your first notes from the fingering chart', concept: 'noteNames',
      intro: sax ? 'The first three notes on saxophone use only your left hand: B, A and G.' : 'Your first notes use the fingering chart at the back of your Level Basic package. Your instructor will pick the first few notes.',
      sections: sax
        ? [
            { heading: 'The fingerings', content: 'B: left index finger\nA: left index and middle fingers\nG: left index, middle and ring fingers\nAll three use the left thumb on the octave key.', tip: 'Keep fingers curved and close to the keys so they can move quickly.' },
            { heading: 'Practice', content: 'Play B for 4 counts, A for 4 counts, G for 4 counts. Then play B A G A B on quarter notes.' },
          ]
        : [
            { heading: 'Finding the notes', content: 'Use the fingering chart at the back of the Level Basic package (it shows every note you need through Level Five). Covered holes are filled circles; open holes are empty circles.', tip: 'Press the pads of your fingers over the holes completely. A small gap makes a squeak.' },
            { heading: 'Practice', content: 'Play your first three notes for 4 counts each, then play them up and down on quarter notes at a slow, steady beat.' },
          ],
      keyPoints: ['Cover holes completely and keep fingers curved.', 'Move one finger at a time and keep the air steady.', 'Name each note when you play it.'],
      practice: 'Play your first three notes in order, then in reverse, saying the note names, without stopping, at ♩ = 60.',
      quiz: sax
        ? [
            mc('Which fingers play the note B?', ['Left index', 'Left index and middle', 'Right hand only', 'Left ring finger only'], 0, 'noteNames'),
            order('Put these notes in order from highest to lowest:', ['B', 'A', 'G'], 'noteNames'),
            tf('The first three saxophone notes use only the left hand.', true, 'noteNames'),
          ]
        : [
            mc('Where is the fingering chart for your instrument?', ['At the back of the Level Basic package', 'In the case lid only', 'On the reed', 'Only online'], 0, 'noteNames'),
            tf('Covering a hole only partly can cause a squeak.', true, 'noteNames'),
            mc('A filled circle on the chart means…', ['Cover the hole', 'Leave it open', 'Play louder', 'Skip the note'], 0, 'noteNames'),
          ],
    },
    {
      slug: 'tonguing', level: 'BASIC', title: 'Basic Tonguing', emoji: '👅', type: 'playing', xp: 20,
      description: 'Start each note cleanly', concept: 'articulations',
      intro: 'Tonguing starts each note cleanly. Your scale at Level Basic must be played all slurred OR all tongued at ♩ = 60.',
      sections: [
        { heading: 'The motion', content: 'Say "too" or "doo". The tip of your tongue touches the tip of the reed and releases, and the air keeps flowing. The tongue interrupts the vibration; it does not stop the air.' },
        { heading: 'Common problems', content: 'Tonguing with the middle of the tongue, tonguing too hard, or stopping the air between notes. Keep the motion small and light.', tip: 'Practice tonguing on a single note until it sounds the same every time. Then add the second and third notes.' },
      ],
      keyPoints: ['Tongue the tip of the reed with the tip of the tongue.', 'Keep the air flowing between tongued notes.', 'Small, light motion.'],
      practice: 'Play your first three notes with tonguing (quarter notes), then again all slurred, at ♩ = 60.',
      quiz: [
        mc('What part of the tongue touches the reed?', ['The middle', 'The back', 'The tip', 'The side'], 2, 'articulations'),
        tf('Tonguing should stop your air between notes.', false, 'articulations'),
        mc('Which syllable helps you tongue?', ['Too / doo', 'Oh', 'Ssss', 'Mmm'], 0, 'articulations'),
      ],
    },
    {
      slug: 'long-tones', level: 'BASIC', title: 'Long Tones', emoji: '〰️', type: 'playing', xp: 20,
      description: 'Build a steady, beautiful tone', concept: 'intonation',
      intro: 'Long tones are the best way to build tone, pitch and breath control, and every professional plays them.',
      sections: [
        { heading: 'How to practice', content: 'Play each note for 8 counts at ♩ = 60, keeping the sound steady from the first count to the last. Listen for a full, round sound and steady pitch.' },
        { heading: 'Add dynamics', content: 'Once it is steady, play each note p for 4 counts, crescendo to mf over 4 counts, then diminuendo to p.', tip: 'Use a tuner to check that the pitch stays steady, not creeping flat as you run out of air.' },
      ],
      keyPoints: ['Long tones build tone and breath control.', 'Keep the sound steady for the whole note.', 'Check your pitch with a tuner.'],
      practice: 'Play four long tones of 8 counts each, resting 4 counts between, every day for a week.',
      quiz: [
        mc('What are long tones good for?', ['Tone and breath control', 'Speed only', 'Reading rhythm', 'Cleaning the reed'], 0, 'intonation'),
        tf('A long tone should stay at the same pitch and volume unless you add dynamics.', true, 'intonation'),
        mc('What should you use to check long-tone pitch?', ['A tuner', 'A stopwatch', 'A ruler', 'A mirror'], 0, 'intonation'),
      ],
    },

    // -------------------------------------------------------------------- ONE
    {
      slug: 'cleaning', level: 'ONE', title: 'Cleaning the Exterior', emoji: '🧼', type: 'playing', xp: 10, poCode: 13,
      description: 'Wipe down the instrument with a cloth (PO 113W)', concept: 'maintenance',
      intro: 'PO 113W asks you to clean the exterior of your instrument with a cloth.',
      sections: [
        { heading: 'How to clean the exterior', content: `After every playing session, use a soft, clean, dry cloth to wipe the body and keys of the ${inst}. Wipe in the direction of the tube, and take care around the keys, rods and springs so you do not catch or bend anything.` },
        { heading: 'What to avoid', content: 'Do not use water, household cleaners, or polishes that are not made for musical instruments. Never use an abrasive cloth. Wipe away fingerprints and moisture so the finish and the pads last longer.', tip: 'Keep a cleaning cloth in your case so you always have one.' },
      ],
      keyPoints: ['Use a soft, dry cloth.', 'Wipe the body and keys gently and avoid bending keys.', 'Do not use household cleaners.'],
      practice: `Clean the exterior of your ${inst} with a cloth while explaining out loud what you are doing, as if an assessor were watching.`,
      quiz: [
        mc('What should you clean the exterior with?', ['A soft, dry cloth', 'Water and soap', 'Sandpaper', 'Paper towel with polish'], 0, 'maintenance'),
        tf('You should avoid bending keys and rods when cleaning.', true, 'maintenance'),
        mc('When should you wipe down your instrument?', ['After every playing session', 'Once a year', 'Never', 'Only before an assessment'], 0, 'maintenance'),
      ],
    },
    {
      slug: 'slurs-legato', level: 'ONE', title: 'Slurs and Smooth Playing', emoji: '🌊', type: 'playing', xp: 20,
      description: 'Connect notes with steady air', concept: 'articulations',
      intro: 'At Level One your scales and pieces need smooth, connected playing as well as clean tonguing.',
      sections: [
        { heading: 'Slurring', content: 'Tongue only the first note and keep the air flowing as your fingers change. All the notes under the slur sound connected.' },
        { heading: 'Clean finger changes', content: sax ? 'Move fingers together, close to the keys, at exactly the same time as the air continues. Uneven finger motion creates "bumps" between notes.' : 'On clarinet, move the fingers together and cover each hole fully. Crossing the break (between the lower and upper register) needs especially even fingers and steady air.', tip: 'Practice the slow scale slurred and listen for any bumps or clicks between notes.' },
      ],
      keyPoints: ['Tongue only the first note under a slur.', 'Keep air flowing while fingers move together.', 'Listen for bumps between notes.'],
      practice: 'Play your Level One major scale all slurred at ♩ = 66, then all tongued. Check that both sound even.',
      quiz: [
        mc('Under a slur you tongue…', ['Every note', 'Only the first note', 'No notes', 'Only the last note'], 1, 'articulations'),
        tf('Uneven finger motion can cause bumps between slurred notes.', true, 'articulations'),
        mc('What keeps slurred notes connected?', ['Steady air', 'Stopping the air', 'Biting', 'Looser embouchure'], 0, 'articulations'),
      ],
    },
    {
      slug: 'register-fingering', level: 'ONE', title: sax ? 'Octave Key and Full Range' : 'The Register Key and Crossing the Break', emoji: '🔑', type: 'playing', xp: 25,
      description: sax ? 'Use the octave key and play your whole range' : 'Play in both registers smoothly', concept: 'scales',
      intro: sax ? 'Your Level One scales go up and down across the octave key change, so you need clean fingerings and a steady embouchure.' : 'Level One scales cross from the low register to the clarion register on a clarinet, which is called crossing the break.',
      sections: sax
        ? [
            { heading: 'The octave key', content: 'The left thumb operates the octave key. Notes from low B♭ up to about C♯ use only the thumb key at the back; higher notes use the palm keys on some fingerings. Check the fingering chart for each note.' },
            { heading: 'Staying steady', content: 'Keep the embouchure relaxed and the air steady as you move up and down. Do not bite or tighten to play the high notes, and do not let the sound flatten on low notes.', tip: 'Practice slurred octaves (low note to high note with the same fingering plus octave key) to even out the sound.' },
          ]
        : [
            { heading: 'The register key', content: 'The register key (left thumb) raises the sound by a 12th (an octave and a fifth), giving you the clarion register above the break. Hold the thumb relaxed and press it with the pad.' },
            { heading: 'Crossing the break', content: 'Move smoothly between the low (chalumeau) and upper (clarion) registers by keeping the air steady and the fingers close to the holes. The most common problem is squeaking at the change.', tip: 'Practice slow slurs back and forth over the break and keep your fingers curved and close.' },
          ],
      keyPoints: sax ? ['Left thumb operates the octave key.', 'Keep the embouchure relaxed on high notes.', 'Check the fingering chart for every note.'] : ['The register key raises the pitch by a 12th.', 'Crossing the break needs steady air and close fingers.', 'Squeaks at the change usually mean uneven fingers or too much pressure.'],
      practice: sax ? 'Play slurred octaves on G, A and B, listening for an even sound across both notes.' : 'Play slow slurs across the break between your Level One scales and check for squeaks.',
      quiz: sax
        ? [
            mc('Which finger operates the octave key?', ['Left thumb', 'Right thumb', 'Left index', 'Right index'], 0, 'scales'),
            tf('You should bite harder to play higher notes.', false, 'scales'),
            mc('Where do you find the fingering for every note?', ['The fingering chart', 'The reed case', 'Your ligature', 'The neck strap'], 0, 'scales'),
          ]
        : [
            mc('The register key raises the pitch by…', ['An octave', 'A 12th', 'A 5th', 'A 4th'], 1, 'scales'),
            mc('Which finger operates the register key?', ['Left thumb', 'Right thumb', 'Left index', 'Right index'], 0, 'scales'),
            tf('The clarinet overblows at the octave like the saxophone.', false, 'scales'),
          ],
    },
    {
      slug: 'chromatic-fingerings', level: 'ONE', title: 'Chromatic Fingerings', emoji: '🎹', type: 'playing', xp: 20,
      description: 'All 12 notes with accurate fingerings', concept: 'scales',
      intro: 'The chromatic scale is made of semitones only. It needs quick, accurate fingering changes, and it is a required Level One scale.',
      sections: [
        { heading: 'Learning the fingerings', content: 'Use the fingering chart to find every sharp and flat note. Sharps and flats have enharmonic names (C♯ = D♭), but the fingering is the same.' },
        { heading: 'Playing it', content: 'Play ascending using sharps and descending using flats, in even quarter notes at ♩ = 66, slurred or tongued all the way through.', tip: 'Learn it in small chunks of three or four notes, then join the chunks together.' },
      ],
      keyPoints: ['The chromatic scale moves by semitones only.', 'Ascend with sharps, descend with flats.', 'Learn it in small chunks.'],
      practice: 'Play your Level One chromatic scale slowly with a metronome, one octave up and down, with no mistakes before you speed up.',
      quiz: [
        mc('The chromatic scale moves by…', ['Whole tones', 'Semitones', 'Thirds', 'Fifths'], 1, 'scales'),
        tf('C♯ and D♭ use the same fingering.', true, 'scales'),
        mc('When descending, the chromatic scale is usually written with…', ['Sharps', 'Flats', 'Naturals', 'Double sharps'], 1, 'scales'),
      ],
    },

    // -------------------------------------------------------------------- TWO
    {
      slug: 'pad-care', level: 'TWO', title: 'Pad Care', emoji: '🔧', type: 'playing', xp: 10, poCode: 13,
      description: 'Remove residue from a pad (PO 213W)', concept: 'maintenance',
      intro: 'PO 213W asks you to remove residue from a pad using pad papers.',
      sections: [
        { heading: 'Why pads get sticky', content: 'Moisture, saliva and food leave a film on the pads. A sticky pad will not close properly or may stick to the tone hole, so a note will not sound.' },
        { heading: 'Using a pad paper', content: 'Press the key to open the pad. Slide a clean pad paper under the pad, close the key gently on the paper, and pull the paper out slowly. Repeat with a clean part of the paper until the pad is clean.', tip: 'Never use anything wet or abrasive on a pad. Never pull the paper out sideways.' },
      ],
      keyPoints: ['Sticky pads cause notes that stick or will not sound.', 'Use a pad paper, closing the pad gently on it.', 'Pull it out slowly.'],
      practice: `Practice cleaning a pad on your ${inst} with a pad paper while explaining each step.`,
      quiz: [
        mc('What do you use to clean residue from a pad?', ['A pad paper', 'Water', 'A sharp tool', 'Sandpaper'], 0, 'maintenance'),
        tf('A sticky pad can stop a note from sounding.', true, 'maintenance'),
        mc('How should you pull the paper out?', ['Slowly', 'Quickly', 'Sideways', 'It stays there'], 0, 'maintenance'),
      ],
    },
    {
      slug: 'intonation', level: 'TWO', title: 'Tuning and Intonation', emoji: '🎯', type: 'playing', xp: 20,
      description: 'Hear when you are sharp or flat and adjust', concept: 'intonation',
      intro: 'Playing in tune means matching the pitch of the ensemble. Level Two cadets are expected to hear when they are sharp or flat against a reference and adjust.',
      sections: [
        { heading: 'Sharp and flat', content: 'Sharp means higher than the reference pitch; flat means lower. Listen for the "beating" (wobble) between your note and a tuning note: the slower the wobble, the closer you are.' },
        { heading: 'Adjusting', content: sax ? 'Pull the mouthpiece out a little to lower the pitch (flatter), or push it in to raise it. Fine adjustments also come from air speed and embouchure.' : 'Pull the barrel (or mouthpiece) out a little to lower the pitch, or push it in to raise it. Fine adjustments come from air speed and embouchure, and the instrument also changes pitch as it warms up.', tip: 'Always warm up your instrument before tuning, because cold instruments play flat.' },
      ],
      keyPoints: ['Sharp = too high, flat = too low.', 'Listen for beats against the tuning note.', 'Adjust with the mouthpiece or barrel, air speed and embouchure.', 'Tune after warming up.'],
      practice: 'Play a tuning note (concert B♭) against a drone or a tuner. Move the mouthpiece in and out and listen to the beats slow down.',
      quiz: [
        mc('Pitch that is higher than the reference note is…', ['Flat', 'Sharp', 'Natural', 'Muted'], 1, 'intonation'),
        mc('To lower the pitch, you generally…', ['Pull the mouthpiece out', 'Push the mouthpiece in', 'Bite harder', 'Blow faster'], 0, 'intonation'),
        tf('Cold instruments usually play flat.', true, 'intonation'),
      ],
    },
    {
      slug: 'dynamic-control', level: 'TWO', title: 'Dynamic Control', emoji: '🔉', type: 'playing', xp: 20,
      description: 'Play soft and loud with a steady tone', concept: 'dynamics',
      intro: 'Your prepared music is assessed on dynamics. Good dynamics come from air speed and support, not from biting or changing your embouchure.',
      sections: [
        { heading: 'Playing softly', content: 'Keep the air fast and steady but use less volume. Many cadets let the pitch go flat or the sound crack at soft dynamics because the support disappears.' },
        { heading: 'Playing loudly', content: 'Use more air, not more biting. Keep the tone full and controlled and avoid pushing the pitch sharp.', tip: 'Practice crescendo and decrescendo on a single note with a tuner to keep the pitch steady.' },
      ],
      keyPoints: ['Control dynamics with air, not with the jaw.', 'Support soft notes with fast air.', 'Check pitch stays steady in loud and soft playing.'],
      practice: 'Play a long note p → ff → p in 16 counts and keep the pitch within the middle of the tuner.',
      quiz: [
        mc('What mainly controls dynamics?', ['Air', 'Biting', 'Finger pressure', 'Tongue'], 0, 'dynamics'),
        tf('Soft playing needs no air support.', false, 'dynamics'),
        mc('Pushing too hard in loud playing usually makes the pitch…', ['Sharp', 'Flat', 'Perfect', 'Silent'], 0, 'dynamics'),
      ],
    },

    // ------------------------------------------------------------------ THREE
    {
      slug: 'spring-repair', level: 'THREE', title: 'Resetting a Popped Spring', emoji: '🪛', type: 'playing', xp: 10, poCode: 13,
      description: 'Put a spring back on its hook (PO 313W)', concept: 'maintenance',
      intro: 'PO 313W asks you to reset a popped spring, using a crochet hook or a similar tool. You do NOT replace the spring.',
      sections: [
        { heading: 'What a popped spring is', content: 'Springs hold keys up or down. If a key stays stuck open or closed, the spring has probably slipped off its hook (it has "popped").' },
        { heading: 'Resetting it', content: 'Find the spring and the cradle or hook it belongs on. Use the crochet hook to catch the end of the spring and gently guide it back onto its hook, keeping it in place on the key post. Test by pressing the key: it should spring back.', tip: 'Work slowly and do not bend or stretch the spring. If it looks bent or broken, tell your instructor or a repairer.' },
      ],
      keyPoints: ['A key that sticks may have a popped spring.', 'Use a crochet hook to guide the spring back onto its hook.', 'Do not bend the spring; ask for help if it is damaged.'],
      practice: `Ask your instructor to pop a spring on a practice ${inst} and reset it using a crochet hook, then test the key.`,
      quiz: [
        mc('Which tool is used to reset a popped spring?', ['A crochet hook', 'A hammer', 'Scissors', 'A knife'], 0, 'maintenance'),
        tf('PO 313W requires you to replace a spring.', false, 'maintenance'),
        mc('A key that stays stuck open may mean…', ['A popped spring', 'A new reed', 'A sharp note', 'A cracked case'], 0, 'maintenance'),
      ],
    },
    {
      slug: 'articulation-patterns', level: 'THREE', title: 'Scale Articulation Patterns', emoji: '🎚️', type: 'playing', xp: 25,
      description: 'All slurred, all tongued, slur 2 tongue 2, tongue 2 slur 2', concept: 'articulations',
      intro: 'At Level Three the assessor can ask for any of four articulation patterns in your scales, and the scales are played in eighth notes.',
      sections: [
        { heading: 'The four patterns', content: 'All slurred: tongue only the first note.\nAll tongued: tongue every note.\nSlur 2, tongue 2: slur pairs of notes, then tongue the next pair (the first note of each pair is tongued).\nTongue 2, slur 2: start with two tongued notes, then slur the next pair.', tip: 'Count out loud "1 & 2 &": decide which of the two notes in each pair is tongued before you play.' },
        { heading: 'Practice plan', content: 'Learn each pattern on one scale first. Play it slowly with a metronome, then add speed. Choose the pattern your assessor asks for on the day.' },
      ],
      keyPoints: ['Four patterns: all slurred, all tongued, slur 2–tongue 2, tongue 2–slur 2.', 'Level Three scales are in eighth notes at ♩ = 60.', 'Learn each pattern slowly before speeding up.'],
      practice: 'Play G major (or your first Level Three scale) in all four patterns at ♩ = 60 with a metronome.',
      quiz: [
        match('Match the pattern to its description:', [['All slurred', 'Tongue only the first note'], ['All tongued', 'Tongue every note'], ['Slur 2, tongue 2', 'Slur pairs, then tongue pairs']], 'articulations'),
        mc('Which pattern could an assessor ask for at Level Three?', ['Any of the four patterns', 'Only all tongued', 'Only all slurred', 'None'], 0, 'articulations'),
        tf('Level Three scales are played in eighth notes.', true, 'scales'),
      ],
    },
    {
      slug: 'two-octave-scales', level: 'THREE', title: 'Two-Octave Scales and Endurance', emoji: '🪜', type: 'playing', xp: 25,
      description: 'Play scales across two octaves with steady air', concept: 'scales',
      intro: 'Scales marked with an asterisk in the scale tables are played two octaves. They test your range, your breath control and your fingers.',
      sections: [
        { heading: 'Plan the breaths', content: 'Plan where to breathe (usually at the top or after the first octave) so you never run out of air. Mark the places in pencil.' },
        { heading: 'Even tone across the range', content: 'Keep the sound and pitch even from the bottom to the top of the scale. Avoid rushing the upper notes and avoid biting.', tip: 'Practice in short sections (one octave, then two) and always use a metronome.' },
      ],
      keyPoints: ['Plan breaths before you play.', 'Keep tone and pitch even across the range.', 'Use a metronome and build up speed slowly.'],
      practice: 'Play your longest Level Three scale slowly, slur it, and mark where you breathe.',
      quiz: [
        mc('How should you handle breathing in a long scale?', ['Plan the breaths ahead', 'Never breathe', 'Wait until you are out of air', 'Breathe on every note'], 0, 'scales'),
        tf('A metronome helps you build speed gradually.', true, 'scales'),
        mc('Scales marked with an asterisk are played…', ['Two octaves', 'One octave', 'Backwards', 'Softly'], 0, 'scales'),
      ],
    },

    // ------------------------------------------------------------------- FOUR
    {
      slug: 'phrasing-tone', level: 'FOUR', title: 'Phrasing and Tone Colour', emoji: '🎨', type: 'playing', xp: 25,
      description: 'Shape phrases and keep the tone centred', concept: 'preparedMusic',
      intro: 'At Level Four your prepared music is assessed on tone, dynamics and musical flow. These come from planning phrases and keeping your tone centred.',
      sections: [
        { heading: 'Phrases', content: 'A phrase is a musical sentence. Find the high point of each phrase and plan to move toward it and away from it. Breathe at the end of phrases, not in the middle.' },
        { heading: 'Tone', content: 'Aim for a centred, focused tone at every dynamic and in every register. Tone suffers when you rush, bite or run out of air.', tip: 'Sing the phrase before you play it, then match your instrument to the singing.' },
      ],
      keyPoints: ['Find the high point of every phrase.', 'Breathe between phrases.', 'Keep the tone centred at every dynamic.'],
      practice: 'Mark the phrases in one of your pieces with pencil, mark where you breathe, and play it with the shape you marked.',
      quiz: [
        mc('Where should you normally breathe?', ['At the end of phrases', 'In the middle of phrases', 'On every bar line', 'Never'], 0, 'preparedMusic'),
        tf('Singing a phrase helps you shape it on your instrument.', true, 'preparedMusic'),
        mc('A phrase is like…', ['A sentence', 'A single word', 'A paragraph break', 'A page number'], 0, 'preparedMusic'),
      ],
    },
    {
      slug: 'ensemble-listening', level: 'FOUR', title: 'Playing in Ensemble', emoji: '🤝', type: 'playing', xp: 20,
      description: 'Listen, balance and blend', concept: 'intonation',
      intro: 'Band is about playing together. Listening is as important as playing.',
      sections: [
        { heading: 'Listening', content: 'While you play, listen to the whole band. If you can only hear yourself, you are too loud. If you cannot hear yourself at all, you are too soft.' },
        { heading: 'Blend and balance', content: 'Match the style, articulation and dynamic of the people around you. Follow the drum major or conductor, and adjust your pitch to the group, not just to the tuner.', tip: 'Tune to the tuning note at the start and listen for beating with the people next to you throughout the piece.' },
      ],
      keyPoints: ['Listen to the whole band.', 'Match style and dynamics with the people next to you.', 'Adjust your pitch to the ensemble.'],
      practice: 'Next rehearsal, pick one section of a march and focus only on blending with the person next to you.',
      quiz: [
        mc('If you can only hear yourself in the band, you are probably…', ['Too loud', 'Too soft', 'In tune', 'Playing the wrong piece'], 0, 'intonation'),
        tf('Adjusting your pitch to the group is part of playing in ensemble.', true, 'intonation'),
        mc('Who do you follow for tempo and cut-offs?', ['The drum major or conductor', 'The loudest player', 'The metronome only', 'No one'], 0, 'intonation'),
      ],
    },

    // ------------------------------------------------------------------- FIVE
    {
      slug: 'performance-prep', level: 'FIVE', title: 'Performance Preparation', emoji: '🎯', type: 'playing', xp: 30,
      description: 'Prepare scales and pieces for assessment day', concept: 'preparedMusic',
      intro: 'Level Five is a demanding assessment. A good plan removes surprises.',
      sections: [
        { heading: 'Build a schedule', content: 'Work backward from your assessment date. Divide your practice into scales, each prepared piece, sight-reading, and the rhythm and aural sheet.' },
        { heading: 'Rehearse performing', content: 'Practice playing each piece straight through without stopping, at the right tempo, in front of someone. Record yourself and listen for rhythm accuracy, note accuracy, dynamics and tempo — the four things the rubric measures.', tip: 'Do a full mock assessment two weeks before the real one.' },
      ],
      keyPoints: ['Plan backwards from the assessment date.', 'Rehearse playing straight through.', 'Record yourself and mark the rubric areas.'],
      practice: 'Record yourself playing one List A and one List B piece, then score yourself on rhythm, notes, dynamics and tempo.',
      quiz: [
        mc('What should you do two weeks before the assessment?', ['A full mock assessment', 'Stop practicing', 'Change your piece', 'Skip scales'], 0, 'preparedMusic'),
        tf('Recording yourself helps you hear your own mistakes.', true, 'preparedMusic'),
        mc('Which is NOT on the prepared-music rubric?', ['Rhythm accuracy', 'Note accuracy', 'How expensive your instrument is', 'Dynamics'], 2, 'preparedMusic'),
      ],
    },
  ];
}
