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
  // BASIC LESSONS - ADVENTURE THEME
  'basic-intro': {
    title: '🎷 The Saxophone Detective: Discovering Your Instrument\'s Secrets',
    introduction: 'Welcome, detective! Today you\'re going to uncover the mysteries of your saxophone. Every great musician knows their instrument inside and out. Are you ready to become a saxophone expert?',
    sections: [
      {
        heading: '🔍 Case File #1: The Four Main Suspects',
        content: 'Your saxophone has four main parts that work together to create music:\n\n🎯 **The Mouthpiece** - The "brain" of the operation! This is where you blow, and it has a magical reed that vibrates to create sound. Without it, no music!\n\n🎯 **The Neck (Crook)** - The "bridge" that connects the mouthpiece to the body. It\'s curved like a question mark and helps direct the air flow.\n\n🎯 **The Body** - The "heart" of the saxophone! This is the main tube with all the keys and pads. When you press keys, you\'re changing the notes.\n\n🎯 **The Bell** - The "voice" of the saxophone! This flared end at the bottom is where all that beautiful sound comes out into the world.',
        example: 'Think of your saxophone like a team:\n- Mouthpiece = The Coach (directs everything)\n- Neck = The Messenger (carries the signal)\n- Body = The Players (do the work)\n- Bell = The Star (shines for everyone to hear!)',
        tip: '🎮 DETECTIVE CHALLENGE: Can you point to each part on your saxophone and name its job? Try it now!'
      },
      {
        heading: '🌟 Case File #2: The Magical Reed',
        content: 'The reed is like a tiny piece of magic wood (actually cane!) that makes everything possible. When air flows over it, it vibrates super fast - like a hummingbird\'s wings! This vibration creates the sound waves that become music.\n\nThe mouthpiece is the reed\'s home. It has:\n- A flat "bed" where the reed rests\n- A "window" opening where air flows through\n- A "ligature" (like a hug) that holds the reed in place',
        example: '🎵 FUN FACT: The reed vibrates about 200-400 times per second when you play! That\'s faster than you can blink!',
        tip: '⚠️ REED RESPECT: Your reed is delicate like a butterfly wing! Always wet it before playing (it needs moisture to vibrate properly) and store it in a reed guard to keep it safe.'
      },
      {
        heading: '🎨 Case File #3: The History Mystery',
        content: 'Your saxophone has an amazing origin story! It was invented in 1840 by a Belgian man named Adolphe Sax. He wanted to create an instrument that combined the power of brass instruments with the agility of woodwinds.\n\nFun fact: The saxophone was originally designed for military bands and orchestras, but it became famous in jazz music in the 1920s. Now it\'s used in everything from classical to pop to rock!',
        example: '🎷 FAMOUS SAX PLAYERS: Charlie Parker, John Coltrane, Lisa Simpson (yes, really!), and Clarence Clemons who played with Bruce Springsteen.',
        tip: '🔬 DETECTIVE NOTE: Every saxophone is unique, just like a fingerprint. Get to know YOUR saxophone\'s personality!'
      }
    ],
    keyPoints: [
      '🎯 Four main parts: mouthpiece, neck, body, bell',
      '🌟 The reed vibrates to create sound (200-400 times per second!)',
      '🤝 Handle by the bell and body, never the keys',
      '💧 Always wet your reed before playing',
      '📚 Invented by Adolphe Sax in 1840'
    ],
    practiceInstructions: '🎮 DETECTIVE MISSION: \n1. Identify each part on your saxophone and name its job\n2. Practice assembling and disassembling your instrument carefully\n3. Time yourself - can you assemble it in under 2 minutes?\n4. Remember: always handle by the bell and body!\n\n🏆 DETECTIVE BADGE: When you can name all 4 parts and their jobs, you earn your Saxophone Detective badge!'
  },

  'basic-maintenance': {
    title: '🧼 The Saxophone Spa: Keeping Your Instrument Happy & Healthy',
    introduction: 'Your saxophone is like a living thing - it needs care and attention to stay happy and healthy! Today you\'re going to learn how to give your sax the ultimate spa treatment. A well-cared-for saxophone sounds better, lasts longer, and is more fun to play!',
    sections: [
      {
        heading: '💆‍♂️ The Assembly Ritual (5 Steps to Saxophone Paradise)',
        content: 'Think of assembling your saxophone like a sacred ritual - each step matters!\n\n**Step 1: The Neck Connection** 🦒\nAttach the neck to the body gently. Tighten the neck screw just enough to hold it securely - like a firm handshake, not a bear hug!\n\n**Step 2: The Reed Spa Treatment** 💧\nPlace the reed in your mouth for 30-60 seconds. It needs moisture to become flexible and ready to vibrate. Think of it like warming up before exercise!\n\n**Step 3: The Perfect Alignment** 🎯\nAttach the reed to the mouthpiece. The tip of the reed should align perfectly with the tip of the mouthpiece - like two puzzle pieces fitting together.\n\n**Step 4: The Ligature Hug** 🤗\nSecure the ligature to hold the reed firmly but not too tight. It should be snug like a comfortable sweater, not tight like a too-small shirt!\n\n**Step 5: The Final Connection** 🔗\nAttach the mouthpiece to the neck gently. Push it on and twist slightly to secure. Never force it - if it doesn\'t fit easily, check the alignment.',
        example: '🎮 ASSEMBLY SPEED CHALLENGE: Time yourself assembling your saxophone. Can you do it in under 2 minutes? Practice makes perfect!',
        tip: '⚠️ GOLDEN RULE: Never force any parts together! If something doesn\'t fit easily, stop and check the alignment. Your saxophone will thank you!'
      },
      {
        heading: '🛁 The Daily Spa Routine (After Every Practice)',
        content: 'Just like you brush your teeth every day, your saxophone needs daily care too! Here\'s the ultimate spa routine:\n\n**1. The Interior Shower** 🚿\nUse a cleaning swab to remove moisture from the body. Pull it through gently from top to bottom. This prevents mold and keeps your sax smelling fresh!\n\n**2. The Neck Massage** 💆\nUse a smaller swab for the neck. This curved part collects lots of moisture, so give it extra attention.\n\n**3. The Mouthpiece Facial** ✨\nWipe the mouthpiece with a soft cloth. Remove any moisture or debris. A clean mouthpiece = better sound!\n\n**4. The Reed Retirement** 😴\nStore the reed in a reed guard to dry properly. Never leave it on the mouthpiece - it needs to breathe!\n\n**5. The Case Cuddle** 🏠\nPlace your saxophone carefully in its case with all parts secure. Make sure nothing is loose or rattling.',
        example: '🦷 TOOTH BRUSHING ANALOGY: You wouldn\'t skip brushing your teeth for a week, right? Same with your saxophone! Daily care keeps everything working perfectly.',
        tip: '🚫 BIGGEST MISTAKE: Never leave your saxophone assembled when not playing! Moisture buildup is like inviting mold and bacteria to a party - and they\'re NOT welcome guests!'
      },
      {
        heading: '🏥 Emergency Care: When Your Sax Needs a Doctor',
        content: 'Sometimes your saxophone needs professional help. Here are warning signs:\n\n🚨 **Red Flags:**\n- Sticky keys that don\'t move smoothly\n- Pads that don\'t seal properly (air leaks)\n- Bent keys or rods\n- Cracks in the body or neck\n- Strange smells or visible mold\n\n👨‍⚕️ **When to See a Technician:**\nTake your sax to a qualified repair technician at least once a year for a "check-up." They can spot problems before they become serious!\n\n💰 **Cost Comparison:**\n- Annual maintenance: $50-100\n- Major repair (if you neglect maintenance): $200-500+\n\nSee? Taking care of your sax saves money!',
        example: '🏥 DOCTOR VISIT ANALOGY: You go to the doctor for check-ups even when you feel fine, right? Same with your saxophone - preventive care is cheaper than emergency care!',
        tip: '📱 PRO TIP: Find a good repair technician NOW, before you need one. Ask your music teacher or band director for recommendations.'
      }
    ],
    keyPoints: [
      '🔧 Always assemble in the correct 5-step order',
      '💧 Wet your reed for 30-60 seconds before attaching',
      '🧼 Swab after EVERY practice session (non-negotiable!)',
      '🏠 Store reed in a reed guard to dry properly',
      '🚫 Never leave instrument assembled when not playing',
      '👨‍⚕️ Annual technician check-up saves money long-term'
    ],
    practiceInstructions: '🎮 SPA DAY CHALLENGE:\n\n**Day 1-3:** Practice assembling your saxophone 3 times each day. Time yourself - aim for under 2 minutes!\n\n**Day 4-7:** After every practice, do the complete 5-step spa routine. Check off each step as you do it.\n\n**Week 2:** You should be able to assemble and care for your saxophone automatically, like brushing your teeth!\n\n🏆 SPA MASTER BADGE: When you can assemble your sax in under 2 minutes AND do the complete care routine without thinking, you earn your Saxophone Spa Master badge!'
  },

  'basic-posture': {
    title: '👑 The Royal Saxophone Stance: Standing Like a Pro',
    introduction: 'Welcome to the Royal Court of Music! Today you\'re going to learn the noble art of saxophone posture. Great saxophonists don\'t just play well - they LOOK amazing while doing it! Proper posture makes you look professional, helps you breathe better, and prevents pain. Let\'s transform you into a saxophone royalty!',
    sections: [
      {
        heading: '🏰 The Royal Foundation: Your Standing Position',
        content: 'Every king and queen needs a strong foundation. Here\'s how to stand like royalty:\n\n**Step 1: The Power Stance** 🦸‍♂️\nStand with your feet shoulder-width apart. This is your "power position" - stable, balanced, and ready for action!\n\n**Step 2: The Royal Spine** 👑\nKeep your back straight but relaxed. Imagine a golden thread pulling you up from the top of your head. You should feel tall and proud, not stiff and rigid.\n\n**Step 3: The Confident Shoulders** 💪\nShoulders down and back (not hunched up by your ears!). Roll them back once, then let them relax. This opens up your chest for better breathing.\n\n**Step 4: The Noble Gaze** 👀\nHead up, looking forward (not down at your feet or your saxophone!). You\'re a royal musician - look confident and engaged!\n\n**Step 5: The Balanced Base** ⚖️\nWeight evenly distributed on both feet. Don\'t lean to one side or the other. You\'re a statue of musical perfection!',
        example: '🎭 ROYAL ROLE PLAY: Imagine you\'re performing for the Queen of England. How would you stand? Tall, confident, relaxed, and ready to make beautiful music!',
        tip: '🪞 MIRROR CHECK: Practice in front of a mirror. Do you look like a confident musician or a nervous noodle? Adjust until you look like royalty!'
      },
      {
        heading: '🎷 The Royal Hold: Cradling Your Saxophone',
        content: 'Now let\'s learn how to hold your saxophone like a true professional:\n\n**The Neck Strap: Your Best Friend** 🤝\nAdjust the strap so the mouthpiece comes to your mouth naturally. You shouldn\'t have to bend your neck down or reach up. The strap does the work, not your arms!\n\n**The Perfect Height** 📏\nWhen you bring the saxophone to your mouth, your head should stay upright and your neck should stay straight. If you\'re hunching down or reaching up, adjust the strap!\n\n**Hand Placement** ✋\n- Left hand on top (closer to the mouthpiece)\n- Right hand on bottom (closer to the bell)\n- Thumbs support the weight: left thumb on the thumb rest, right thumb under the thumb hook\n- Fingers curved and ready on the keys\n\n**The Relaxation Rule** 😌\nYour hands should be relaxed, not gripping! Think of holding a baby bird - firm enough to support it, gentle enough not to hurt it.',
        example: '🎒 BACKPACK ANALOGY: When you wear a backpack, the straps carry the weight, not your hands. Same with your saxophone - the neck strap carries the weight, not your hands!',
        tip: '⚠️ COMMON MISTAKE: Don\'t let your saxophone hang too low! It should come up to your mouth, not your chin. Adjust that strap!'
      },
      {
        heading: '🖐️ The Magic Fingers: Perfect Hand Position',
        content: 'Your fingers are the magic wands that create music! Here\'s how to position them perfectly:\n\n**The Baseball Grip** ⚾\nCurve your fingers like you\'re holding a baseball. Not flat, not claw-like - just naturally curved. This is the strongest, most relaxed position.\n\n**The Finger Pads** 👆\nUse the pads of your fingers (the fleshy part), not the tips. This gives you better control and prevents slipping.\n\n**The Hover Technique** 🚁\nKeep your fingers close to the keys (1-2 cm away) even when not pressing them. Think of them as helicopters hovering ready to land. This makes playing faster and more accurate!\n\n**The Straight Wrists** 📐\nKeep your wrists straight, not bent like you\'re typing on a keyboard. Bent wrists cause tension and slow you down.\n\n**The Thumb Support** 👍\nYour thumbs are the unsung heroes! Left thumb rests on the thumb rest, right thumb tucks under the thumb hook. They support the weight so your fingers can dance freely.',
        example: '🎮 VIDEO GAME ANALOGY: Your fingers are like controllers in a video game. Keep them close to the buttons (keys) and ready to press at a moment\'s notice. The faster your fingers can move, the better you play!',
        tip: '🐌 SPEED SECRET: If your fingers are flying far away from the keys, you\'ll be slower and less accurate. Keep them hovering close - like a cat ready to pounce!'
      },
      {
        heading: '🚨 The Posture Police: Common Mistakes to Avoid',
        content: 'The Posture Police are always watching! Don\'t get caught making these common mistakes:\n\n**Mistake #1: The Shrimp** 🍤\nHunching your shoulders up by your ears. This causes tension and restricts breathing. Solution: Roll shoulders back and down.\n\n**Mistake #2: The Giraffe** 🦒\nBending your neck down to reach the mouthpiece. This causes neck pain and poor tone. Solution: Adjust your neck strap higher!\n\n**Mistake #3: The Death Grip** 💀\nGripping the saxophone too tightly with your thumbs. This causes hand fatigue and slows you down. Solution: Relax! The strap does the work.\n\n**Mistake #4: The Chicken Wings** 🐔\nFingers flying far away from the keys. This makes you slower and less accurate. Solution: Keep fingers hovering close to the keys.\n\n**Mistake #5: The Leaning Tower** 🗼\nSlouching or leaning to one side. This affects your breathing and balance. Solution: Stand tall and centered.\n\n**Mistake #6: The T-Rex Arms** 🦖\nBent wrists like a T-Rex. This causes tension and limits finger movement. Solution: Keep wrists straight.',
        example: '👮‍♂️ POSTURE POLICE CHECK: Set a timer for every 5 minutes while practicing. When it goes off, check your posture. Are you making any of these mistakes? Fix them immediately!',
        tip: '🎥 VIDEO YOURSELF: Record yourself playing and watch it back. You\'ll see posture problems you didn\'t notice while playing. It\'s like having your own personal posture coach!'
      }
    ],
    keyPoints: [
      '👑 Stand tall with relaxed shoulders (power stance)',
      '🎷 Adjust neck strap so mouthpiece comes to you naturally',
      '👍 Thumbs support the weight, hands stay relaxed',
      '🖐️ Fingers curved like holding a baseball, hovering close to keys',
      '🪞 Check posture in a mirror every practice',
      '🚨 Avoid: shrimp shoulders, giraffe neck, death grip, chicken wings'
    ],
    practiceInstructions: '🎮 POSTURE MASTERY CHALLENGE:\n\n**Day 1: The Foundation**\nPractice standing in perfect posture for 2 minutes without your instrument. Use a mirror. Check: Are shoulders down? Is back straight? Is head up?\n\n**Day 2: The Hold**\nAdd the saxophone. Adjust the neck strap until the mouthpiece comes to your mouth naturally. Hold for 5 minutes, checking posture in mirror.\n\n**Day 3: The Fingers**\nFocus on hand position. Are fingers curved? Are they hovering close to keys? Are wrists straight? Practice for 5 minutes.\n\n**Day 4-7: The Full Package**\nCombine everything. Practice for 10 minutes, checking posture every 2 minutes. Use the "Posture Police" timer method.\n\n**Week 2: Automatic Posture**\nGood posture should become automatic. You shouldn\'t have to think about it. Keep checking in the mirror until it feels natural.\n\n🏆 ROYAL POSTURE BADGE: When you can play for 10 minutes with perfect posture without thinking about it, you earn your Royal Saxophone Stance badge! You\'re now official saxophone royalty!'
  },

  'basic-first-notes': {
    title: '🎵 The Magic Sound Spell: Creating Your First Note',
    introduction: 'Today is a MAGICAL day! You\'re about to cast your first sound spell on the saxophone. Every great musician remembers their first note - it\'s like learning to talk to your instrument for the first time. Are you ready to make some magic?',
    sections: [
      {
        heading: '🎭 The Embouchure Mask: Your Face as an Instrument',
        content: 'Embouchure (ah-boo-SHURE) is a fancy French word that means "the way you use your mouth." Think of it like putting on a special mask that transforms you into a saxophone wizard!\n\n**The Magic Formula:**\n- Your bottom lip curls over your bottom teeth (like a protective cushion)\n- The mouthpiece rests on this cushion\n- Your top teeth rest gently on top of the mouthpiece\n- The corners of your mouth are firm, like you\'re saying "M" or drawing a string tight\n\nThis creates the perfect seal for the reed to vibrate and make music!',
        example: '🎭 THE "M" TEST: Say the letter "M" out loud. Feel how the corners of your mouth firm up? That\'s exactly what your embouchure should feel like! Now freeze that face - that\'s your saxophone wizard mask!',
        tip: '⚠️ THE BITE TRAP: Don\'t bite down hard! Your teeth should rest GENTLY on the mouthpiece. Biting is like squeezing a balloon too hard - it makes the sound squeaky and strained. Think "firm but gentle" like holding a baby bird.'
      },
      {
        heading: '💨 The Wind Power: Breathing Like a Pro',
        content: 'Your breath is the fuel that powers your saxophone! But not just any breath - you need WIND POWER!\n\n**The 4 Steps to Wind Power:**\n\n1. **Belly Breathing** 🎈\nBreathe from your diaphragm (belly breathing), not your chest. Put your hand on your belly - it should expand when you breathe in, like inflating a balloon!\n\n2. **Relaxed Shoulders** 😌\nKeep your shoulders down and relaxed. No shrugging! Tension is the enemy of good sound.\n\n3. **Fast, Steady Air** 🌬️\nUse steady, fast air - think of fogging up a mirror on a cold day. You need a focused stream of air, not a weak puff.\n\n4. **Abdominal Support** 💪\nUse your abdominal muscles to support the air. Think of gently squeezing a tube of toothpaste from the bottom up - steady, controlled pressure.',
        example: '🕯️ THE CANDLE TEST: Imagine there are 10 birthday candles in front of you. Can you blow them all out with one steady breath? That\'s the kind of focused, powerful air you need! Not a weak "pffff" but a strong "WHOOOOO!"',
        tip: '🎈 BALLOON ANALOGY: Your belly is like a balloon. When you breathe in, the balloon inflates (belly expands). When you breathe out while playing, the balloon deflates slowly and steadily (controlled air flow).'
      },
      {
        heading: '✨ The Moment of Magic: Your First Sound',
        content: 'This is it! The moment you\'ve been waiting for. Let\'s make your first sound:\n\n**The 5-Step Magic Spell:**\n\n1. **Form Your Embouchure** 🎭\nPut on your saxophone wizard mask (bottom lip over teeth, corners firm, top teeth on mouthpiece)\n\n2. **Position the Mouthpiece** 📏\nPlace about 1/2 inch of the mouthpiece inside your mouth. Not too much, not too little - just right!\n\n3. **Take a Deep Breath** 🎈\nFill your belly with air (remember the balloon!). Shoulders stay down.\n\n4. **Blow with Wind Power** 🌬️\nBlow steady, fast air through the instrument. Think "fog the mirror" or "blow out the candles!"\n\n5. **Keep Your Throat Open** 🎵\nYour throat should be open and relaxed, like you\'re saying "AW" or "OH." No tension!\n\n**What You Should Hear:**\nA clear, steady tone. Not airy, not squeaky - just beautiful, pure sound! 🎶',
        example: '🎮 FIRST SOUND CHECKLIST:\n✅ Embouchure formed correctly?\n✅ Mouthpiece positioned right?\n✅ Deep belly breath?\n✅ Fast, steady air?\n✅ Open throat?\n\nIf YES to all = MAGIC HAPPENS! ✨\nIf you hear air but no pitch = need more air speed\nIf it squeaks = check embouchure (probably biting)',
        tip: '🎯 THE GOLDEN RULE: Your first note might not be perfect - and that\'s OKAY! Even professional saxophonists had to start somewhere. Be patient with yourself. The more you practice, the better it gets!'
      },
      {
        heading: '🚨 Troubleshooting: When the Magic Doesn\'t Work',
        content: 'Sometimes the magic spell needs a little adjustment. Here\'s how to fix common problems:\n\n**Problem #1: Airy Sound (No Pitch)** 🌬️\n**Cause:** Not enough air speed\n**Fix:** Blow FASTER! Think "fog the mirror" with more power.\n\n**Problem #2: Squeaky Sound** 🐭\n**Cause:** Biting too hard or embouchure too tight\n**Fix:** RELAX! Check that you\'re not biting. Think "firm but gentle."\n\n**Problem #3: No Sound at All** 🔇\n**Cause:** Mouthpiece not positioned right or reed not wet\n**Fix:** Check that reed is wet (30-60 seconds in mouth). Make sure 1/2 inch of mouthpiece is in your mouth.\n\n**Problem #4: Sound Cuts Out** ✂️\n**Cause:** Air support collapsing\n**Fix:** Keep blowing steadily! Use your abdominal muscles to support the air throughout the note.\n\n**Problem #5: Sound is Wavy or Shaky** 🌊\n**Cause:** Unsteady air stream or tense embouchure\n**Fix:** Relax everything! Steady air + relaxed face = steady sound.',
        example: '🔧 THE TROUBLESHOOTING FLOWCHART:\nNo sound? → Check reed is wet → Check mouthpiece position\nAiry sound? → Blow faster!\nSqueaky? → Stop biting!\nWavy sound? → Relax and steady your air',
        tip: '💡 PRO SECRET: Every problem has a solution! Don\'t get frustrated. Be a detective - figure out what\'s wrong and fix it. Even professionals have bad days. The key is to keep trying!'
      }
    ],
    keyPoints: [
      '🎭 Embouchure: bottom lip over teeth, top teeth on mouthpiece, corners firm',
      '💨 Wind Power: belly breathing, fast steady air, abdominal support',
      '✨ 5-Step Magic Spell: embouchure → position → breathe → blow → open throat',
      '🚨 Troubleshooting: airy=more air, squeaky=stop biting, no sound=check reed',
      '🎯 Be patient - your first note might not be perfect, and that\'s OKAY!'
    ],
    practiceInstructions: '🎮 MAGIC SOUND CHALLENGE:\n\n**Step 1: The Face Practice (2 minutes)**\nPractice forming your embouchure WITHOUT the instrument. Look in a mirror. Can you make the "M" face? Hold it for 30 seconds. Rest. Repeat 5 times.\n\n**Step 2: The Mouthpiece Only (5 minutes)**\nAssemble just the mouthpiece and neck (no saxophone body). Try to produce a steady tone for 10 seconds at a time. Do this 5 times. This is called "mouthpiece practice" and even pros do it!\n\n**Step 3: The Full Magic (5 minutes)**\nAssemble the full saxophone. Try to produce your first note! Hold it for 4 beats, rest 4 beats. Repeat 5 times.\n\n**Step 4: Troubleshoot (if needed)**\nIf it\'s not working, use the troubleshooting flowchart. Be a detective!\n\n🏆 FIRST SOUND BADGE: When you can produce a clear, steady tone for 10 seconds on the mouthpiece AND 10 seconds on the full saxophone, you earn your First Sound Magic Badge! You\'re officially a saxophone wizard! 🧙‍♂️✨'
  },

  'basic-notes': {
    title: '🎹 The Three Magic Keys: Unlocking B, A, and G',
    introduction: 'Congratulations, wizard! You\'ve mastered your first sound. Now it\'s time to learn your FIRST THREE NOTES! These are the building blocks of thousands of songs. By the end of this lesson, you\'ll be playing real music! Let\'s unlock the magic of B, A, and G!',
    sections: [
      {
        heading: '🖐️ The Left Hand Trio: Your First Finger Friends',
        content: 'Your left hand is about to become your best friend! It plays the top three keys on the saxophone, and each finger has a special job:\n\n**Index Finger (Pointer Finger) = B** 👆\nThis is your "first finger" and it plays the note B. It\'s the strongest finger, so B is usually the easiest note to play!\n\n**Middle Finger = A** 🖕\nThis is your "second finger" and it plays the note A. It works together with your index finger.\n\n**Ring Finger = G** 💍\nThis is your "third finger" and it plays the note G. It might feel a little weak at first, but it will get stronger with practice!\n\n**The Baseball Grip** ⚾\nRemember how we curved your fingers like holding a baseball? That\'s exactly how they should look on the saxophone! Use the pads of your fingers (the fleshy part), not the tips.',
        example: '🎮 FINGER WARM-UP: Hold your left hand out in front of you. Curve your fingers naturally like you\'re holding an imaginary baseball. Now press down one finger at a time: index, middle, ring. Feel how they move independently? That\'s what you\'ll do on the saxophone!',
        tip: '🚁 THE HOVER TECHNIQUE: Keep your fingers close to the keys (1-2 cm away) even when not pressing them. Think of them as helicopters hovering ready to land. This makes playing faster and more accurate! Flying fingers = slow playing.'
      },
      {
        heading: '🎵 Note B: The One-F Wonder',
        content: 'Let\'s play your FIRST note: B! This is the easiest note because it only uses ONE finger.\n\n**The B Formula:**\n1. Form your embouchure (your wizard mask!)\n2. Press down the FIRST key with your left index finger\n3. Blow steady, supported air (wind power!)\n4. Keep all other fingers UP (they\'re on vacation!)\n\nThat\'s it! B is the lowest note you can play with just one finger down. It\'s like the "easy mode" of saxophone!',
        example: '🎯 B CHECKLIST:\n✅ Embouchure formed?\n✅ Index finger pressing first key?\n✅ Other fingers up and relaxed?\n✅ Steady air blowing?\n\nIf YES = Beautiful B! 🎵\nIf airy/squeaky = Check that finger is covering key completely',
        tip: '💡 PRO TIP: Make sure you\'re pressing the key DOWN completely. If the sound is airy or squeaky, your finger might not be covering the key fully. Press firmly but don\'t mash it!'
      },
      {
        heading: '🎶 Note A: The Two-F Tango',
        content: 'Now let\'s add a second finger and play A! This is where it gets interesting - you\'re building a chord!\n\n**The A Formula:**\n1. Keep your index finger DOWN on B\n2. ADD your middle finger on the second key\n3. Blow steady air\n\nNow you have TWO fingers down: index and middle. This is like a dance - your fingers work together!\n\n**The Transition B → A:**\n- Start with B (one finger down)\n- Add middle finger (two fingers down) = A\n- Keep fingers close to keys - don\'t lift them high!\n\nThink of it as adding a layer, not replacing.',
        example: '🎮 FINGER DANCE: Practice the B to A transition slowly. B (1 finger) → A (2 fingers) → B (1 finger) → A (2 fingers). Keep going! Your fingers should move smoothly like a well-choreographed dance.',
        tip: '🌊 THE WAVE PRINCIPLE: Move your fingers smoothly from B to A. Don\'t lift your fingers high - keep them close to the keys. Think of it as a wave: one finger down, then two fingers down. Smooth and controlled!'
      },
      {
        heading: '🎼 Note G: The Three-F Symphony',
        content: 'Time for your third note: G! Now ALL THREE left-hand fingers are working together. You\'re building a real foundation!\n\n**The G Formula:**\n1. Keep index and middle fingers DOWN\n2. ADD your ring finger on the third key\n3. Blow steady air\n\nNow you have THREE fingers down: index, middle, and ring. This is your "power chord" - all three fingers working in harmony!\n\n**The Complete Journey: B → A → G:**\n- B: One finger (index)\n- A: Two fingers (index + middle)\n- G: Three fingers (index + middle + ring)\n\nYou\'re building from simple to complex, one finger at a time!',
        example: '🎵 THE THREE-NOTE SCALE: Play B-A-G slowly, then G-A-B. You just played your first scale! It goes down (B-A-G) and up (G-A-B). This is the foundation of thousands of songs!',
        tip: '🎯 RING FINGER STRENGTH: Your ring finger might feel weak at first - that\'s normal! It\'s the weakest finger on your hand. With practice, it will get stronger. Be patient with it!'
      },
      {
        heading: '🎸 The B-A-G Groove: Making Music!',
        content: 'Now that you know all three notes, let\'s make REAL MUSIC! Here are some patterns to practice:\n\n**Pattern 1: The Wave** 🌊\nB - A - G - A - B\n(Down, down, down, up, up)\n\n**Pattern 2: The Staircase** 🪜\nB - A - G (going down)\nG - A - B (going up)\n\n**Pattern 3: The Repeat** 🔁\nB - B - A - A - G - G\n(Two of each note)\n\n**Pattern 4: The Skip** 🦘\nB - G - A - B - G - A\n(Skipping around)\n\nTry each pattern slowly at first, then speed up as you get comfortable!',
        example: '🎶 YOUR FIRST SONG: Did you know "Mary Had a Little Lamb" uses mostly B, A, and G? Try playing: B-A-G-A-B-B-B, A-A-A, B-B-B. Congratulations - you just played your first song!',
        tip: '🎵 RHYTHM MATTERS: Don\'t just play the notes - play them with rhythm! Count "1-2-3-4" and play one note per beat. This makes it sound like music, not just random notes!'
      }
    ],
    keyPoints: [
      '🖐️ Left hand: index=B, middle=A, ring=G',
      '⚾ Curve fingers like holding a baseball',
      '🚁 Keep fingers hovering close to keys',
      '🎯 Press keys completely down',
      '💨 Use steady, supported air (wind power!)',
      '🎵 B-A-G is your first scale - practice going up and down!'
    ],
    practiceInstructions: '🎮 THREE-NOTE MASTERY CHALLENGE:\n\n**Day 1: Note by Note**\n- Play B for 4 beats, rest 4 beats (repeat 5 times)\n- Play A for 4 beats, rest 4 beats (repeat 5 times)\n- Play G for 4 beats, rest 4 beats (repeat 5 times)\nFocus on clear, steady tone for each note.\n\n**Day 2: The Transitions**\n- Practice B to A (5 times slowly)\n- Practice A to G (5 times slowly)\n- Practice G to A to B (5 times slowly)\nFocus on smooth finger movement.\n\n**Day 3: The Patterns**\n- Play the Wave: B-A-G-A-B (5 times)\n- Play the Staircase: B-A-G then G-A-B (5 times)\n- Play the Repeat: B-B-A-A-G-G (5 times)\nFocus on even rhythm.\n\n**Day 4: Your First Song**\n- Play "Mary Had a Little Lamb": B-A-G-A-B-B-B, A-A-A, B-B-B\n- Try it slowly at first, then speed up\n- Add rhythm: count "1-2-3-4" as you play\n\n**Day 5: Performance Day!**\n- Play all patterns and the song from memory\n- Focus on beautiful, steady tone\n- Try playing for someone (family, friends, even your pet!)\n\n🏆 THREE-NOTE MASTER BADGE: When you can play B, A, and G with clear tone AND play "Mary Had a Little Lamb" without looking at the notes, you earn your Three-Note Master badge! You\'re officially playing real music! 🎵✨'
  },

  'basic-staff': {
    title: '📜 The Music Map: Reading the Secret Code',
    introduction: 'Welcome to the world of music reading! Sheet music is like a secret code that tells you exactly what to play. Today you\'re going to learn how to crack the code and read music like a pro! By the end of this lesson, you\'ll be able to look at sheet music and know exactly what notes to play. Let\'s decode the mystery!',
    sections: [
      {
        heading: '🪜 The Staff: Your Musical Ladder',
        content: 'The staff is the foundation of all written music. It\'s like a ladder that tells you which notes to play:\n\n**The Staff Structure:**\n- 5 horizontal lines (like rungs on a ladder)\n- 4 spaces between the lines (where notes can also live)\n- We ALWAYS count from BOTTOM to TOP\n\n**The Golden Rule:** Higher notes live higher on the staff, lower notes live lower on the staff. It\'s just like a building - the penthouse is at the top, the basement is at the bottom!\n\n**Notes Can Live In Two Places:**\n- On the lines (sitting directly on a line)\n- In the spaces (floating between lines)\n\nEach line and space represents a different note. It\'s like a musical address book!',
        example: '🏢 THE BUILDING ANALOGY: Imagine the staff is a 9-story building:\n- Floor 1 (bottom line) = E\n- Floor 2 (first space) = F\n- Floor 3 (second line) = G\n- Floor 4 (second space) = A\n- Floor 5 (third line) = B\n- Floor 6 (third space) = C\n- Floor 7 (fourth line) = D\n- Floor 8 (fourth space) = E\n- Floor 9 (top line) = F\n\nEach floor has a different note resident!',
        tip: '📏 COUNTING RULE: ALWAYS count lines and spaces from the BOTTOM up. Line 1 is the bottom line, Line 5 is the top line. Space 1 is the bottom space, Space 4 is the top space. This is the #1 rule of reading music!'
      },
      {
        heading: '🎼 The Treble Clef: The Musical Signature',
        content: 'That fancy curly symbol at the beginning of the staff? That\'s the TREBLE CLEF (also called the G clef). It\'s like the signature that tells you which notes live on which lines!\n\n**Why is it called the G Clef?**\nThe treble clef symbol wraps around the SECOND LINE from the bottom. That line is the note G! The curl of the clef literally circles the G line.\n\n**The Line Notes (Bottom to Top): E-G-B-D-F**\nThese are the notes that live ON the lines.\n\n**The Space Notes (Bottom to Top): F-A-C-E**\nThese are the notes that live IN the spaces. Notice they spell "FACE" - that\'s easy to remember!\n\n**The Magic Mnemonics:**\nFor the LINES: "**E**very **G**ood **B**oy **D**oes **F**ine"\nFor the SPACES: "**F** **A** **C** **E**" (just spell the word!)\n\nThese memory tricks will help you remember which note is which!',
        example: '🎨 DRAWING THE TREBLE CLEF: Start at the second line (G). Draw a curve up and around, then loop back down through the G line, curve around the bottom, and make a small hook at the top. Practice drawing it 10 times! It\'s like learning to write your signature.',
        tip: '🎯 CLEF QUIZ: Look at any piece of saxophone music. Can you find the second line? That\'s G! Can you find the spaces that spell FACE? You\'re already reading music!'
      },
      {
        heading: '🎵 Your Notes on the Staff: B, A, and G',
        content: 'Remember the three notes you learned (B, A, G)? Let\'s find them on the staff!\n\n**Where B Lives:**\nB is on the MIDDLE LINE (3rd line from the bottom). It\'s right in the center of the staff - the perfect home for your first note!\n\n**Where A Lives:**\nA is in the SPACE BELOW B (2nd space from the bottom). It lives one step lower than B.\n\n**Where G Lives:**\nG is on the LINE BELOW A (2nd line from the bottom). It lives one step lower than A.\n\n**The Pattern:**\nAs you go DOWN the staff (from B to A to G), the notes get LOWER in pitch.\nAs you go UP the staff (from G to A to B), the notes get HIGHER in pitch.\n\nThis is the same pattern you learned on the saxophone: B-A-G going down, G-A-B going up!',
        example: '🎮 STAFF SCAVENGER HUNT: Look at a piece of music and find:\n- All the B\'s (middle line)\n- All the A\'s (2nd space)\n- All the G\'s (2nd line)\n\nCan you spot them quickly? The more you practice, the faster you\'ll recognize them!',
        tip: '🧠 MEMORY TRICK: You already know these notes on the saxophone! B is your first finger, A is two fingers, G is three fingers. Now you can SEE them on the staff too. Your fingers and your eyes are learning the same language!'
      },
      {
        heading: '🏗️ Ledger Lines: Beyond the Staff',
        content: 'Sometimes notes want to live ABOVE or BELOW the staff. But there\'s no room! That\'s where LEDGER LINES come in.\n\n**What are Ledger Lines?**\nLedger lines are short, extra lines that extend the staff. They\'re like adding extra floors to the building!\n\n**Middle C - The Most Famous Ledger Line Note:**\nMiddle C (the C below your B) lives on a ledger line BELOW the staff. It has its own little line just for it!\n\n**How to Count Ledger Lines:**\n- Count them the same way you count staff lines\n- From bottom to top\n- Each ledger line is a note, each space between ledger lines is also a note\n\n**Going Higher:**\nNotes above the staff also use ledger lines. As you go higher, you add more ledger lines. It\'s like building a skyscraper!',
        example: '🏢 THE SKYSCRAPER ANALOGY: The staff is a 9-story building. But sometimes notes want to live in the penthouse (above) or the basement (below). Ledger lines are like adding extra floors above or below the main building!',
        tip: '🎯 LEDGER LINE PRACTICE: Find Middle C on a piece of music. It\'s the note on the ledger line below the staff. Can you spot it? Now look for other notes with ledger lines. The more you see them, the easier they become!'
      },
      {
        heading: '🎮 Reading Music: Putting It All Together',
        content: 'Now you know the secret code! Let\'s put it all together:\n\n**The Reading Process:**\n1. Look at the clef (treble clef = saxophone music)\n2. Find the note on the staff\n3. Use your mnemonics to figure out which note it is\n4. Play that note on your saxophone\n\n**Speed Reading Tips:**\n- Don\'t count every time - memorize the patterns\n- Learn to recognize notes by their SHAPE and POSITION\n- Practice sight-reading simple melodies\n- Start slow, then increase speed\n\n**Common Note Patterns:**\n- Notes on lines: E-G-B-D-F (Every Good Boy Does Fine)\n- Notes in spaces: F-A-C-E (just spell it!)\n- Notes with ledger lines: extend the pattern up or down\n\n**The Ultimate Goal:**\nTo read music as easily as you read words. At first it\'s like sounding out each letter, but soon you\'ll recognize whole "words" (patterns of notes) instantly!',
        example: '📖 READING LIKE A BOOK: When you first learned to read, you sounded out each letter: "C-A-T = cat." Now you see "cat" and instantly know what it says. Music reading works the same way! At first you count each note, but soon you\'ll recognize patterns instantly.',
        tip: '🎯 DAILY READING PRACTICE: Spend 5 minutes every day practicing note recognition. Use flashcards, apps, or just look at random notes on the staff and name them. Speed comes with consistent practice!'
      }
    ],
    keyPoints: [
      '🪜 Staff has 5 lines and 4 spaces - ALWAYS count from bottom to top',
      '🎼 Treble clef = G clef (curls around the G line)',
      '📝 Lines: E-G-B-D-F ("Every Good Boy Does Fine")',
      '🎯 Spaces: F-A-C-E (just spell "FACE"!)',
      '🏗️ Ledger lines extend the staff up or down',
      '🎮 Reading music gets easier with daily practice'
    ],
    practiceInstructions: '🎮 MUSIC READING MASTERY CHALLENGE:\n\n**Day 1: The Basics**\n- Write out the treble clef 10 times (practice your signature!)\n- Quiz yourself on line notes: E-G-B-D-F\n- Quiz yourself on space notes: F-A-C-E\n- Use the mnemonics until you have them memorized\n\n**Day 2: Note Hunting**\n- Find a piece of saxophone music\n- Find all the B\'s (middle line) - circle them\n- Find all the A\'s (2nd space) - circle them\n- Find all the G\'s (2nd line) - circle them\n- How many can you find in 2 minutes?\n\n**Day 3: Speed Reading**\n- Look at random notes on the staff\n- Name them as fast as you can\n- Time yourself: can you name 10 notes in 30 seconds?\n- Practice until you can do it without counting\n\n**Day 4: Ledger Lines**\n- Find Middle C (ledger line below staff)\n- Find other notes with ledger lines\n- Practice reading notes above and below the staff\n\n**Day 5: Real Music**\n- Look at "Mary Had a Little Lamb" sheet music\n- Can you read the notes before playing them?\n- Try to sight-read (play it while reading it for the first time)\n\n🏆 MUSIC READER BADGE: When you can look at any note on the staff and instantly know what it is (without counting), you earn your Music Reader badge! You can now read music like a pro! 🎵📜✨'
  },

  'basic-rhythm': {
    title: '🥁 The Heartbeat of Music: Quarter Notes & Rhythm',
    introduction: 'Welcome to the world of rhythm! Rhythm is the heartbeat of music - it\'s what makes you want to tap your foot, nod your head, or dance! Today you\'re going to learn about quarter notes, the most common rhythm in music. By the end of this lesson, you\'ll be able to keep a steady beat like a professional musician! Let\'s get rhythmic!',
    sections: [
      {
        heading: '💓 What is a Beat? The Pulse of Music',
        content: 'A beat is the basic unit of time in music. It\'s like a heartbeat - steady, regular, and always there!\n\n**The Beat is Everywhere:**\n- When you tap your foot to music, you\'re feeling the beat\n- When you clap along to a song, you\'re clapping on the beat\n- When a drummer counts "1-2-3-4," they\'re counting beats\n- Your heart beats at a steady rhythm - music does too!\n\n**Why Beats Matter:**\nBeats organize music in time. Without beats, music would be chaos! Beats give music structure and make it possible for musicians to play together.\n\n**The Golden Rule:** Most music has a steady, consistent beat throughout. Like a clock, it never speeds up or slows down (unless the composer wants it to!).',
        example: '🫀 HEARTBEAT TEST: Put your hand on your chest. Feel your heartbeat? That\'s a beat! Now tap your finger to that rhythm. Congratulations - you just kept a beat! Music beats work the same way, just usually faster than your heart.',
        tip: '🕰️ CLOCK ANALOGY: Think of a clock ticking. Tick-tock-tick-tock. That steady rhythm is like a beat in music. Can you tap your finger to a steady "tick-tock" rhythm? That\'s keeping a beat!'
      },
      {
        heading: '🎵 Quarter Notes: The Workhorse of Music',
        content: 'Quarter notes are the most common notes in music! They\'re like the reliable friends who are always there when you need them.\n\n**What is a Quarter Note?**\n- Gets exactly 1 beat\n- Looks like a filled-in oval (note head) with a stem (line) attached\n- When you see a quarter note, you play it for 1 beat, then move to the next note\n\n**Why "Quarter"?**\nIn 4/4 time (the most common time signature), a quarter note gets 1/4 of the measure. Four quarter notes fill up one measure completely!\n\n**Quarter Note Anatomy:**\n- Note head (the oval part) - filled in (black)\n- Stem (the line) - goes up or down\n- Total value = 1 beat\n\nQuarter notes are the foundation of most melodies. If you can play quarter notes steadily, you can play thousands of songs!',
        example: '⏰ THE ONE-SECOND NOTE: If the tempo is 60 BPM (beats per minute), each quarter note lasts exactly 1 second - like the ticking of a clock! Tick (1 beat) - tock (1 beat) - tick (1 beat) - tock (1 beat). That\'s four quarter notes!',
        tip: '🎯 QUARTER NOTE RULE: When in doubt, count them as "1, 2, 3, 4." Quarter notes are so common that most simple melodies are made mostly of quarter notes!'
      },
      {
        heading: '🔢 Counting Quarter Notes: The Rhythm Code',
        content: 'Counting is the secret to perfect rhythm! Here\'s how to count quarter notes in 4/4 time:\n\n**The Counting Formula:**\nCount: "1, 2, 3, 4"\nPlay: One note on each count\n\nEach number = one quarter note = one beat\n\n**The Four-Step Process:**\n1. Say the numbers out loud: "1, 2, 3, 4"\n2. Tap your foot on each number\n3. Play one note on each number\n4. Keep it steady like a metronome\n\n**Common Mistakes:**\n- Rushing (speeding up) - don\'t let excitement make you faster!\n- Dragging (slowing down) - keep the energy up!\n- Uneven timing - each beat should be exactly the same length\n\n**The Metronome is Your Friend:**\nA metronome is a device that clicks at a steady tempo. Practice with it to develop perfect timing!',
        example: '🎮 COUNTING CHALLENGE: Say out loud: "1, 2, 3, 4" while tapping your foot. Each number is one quarter note. Now add your saxophone: Play B on "1," A on "2," G on "3," B on "4." You just played your first rhythm!',
        tip: '🎵 START SLOW: Use a metronome at 60 BPM (one beat per second). Play quarter notes slowly and steadily. When that feels easy, increase to 70 BPM, then 80 BPM. Speed comes from accuracy, not rushing!'
      },
      {
        heading: '🤫 Quarter Rests: The Sound of Silence',
        content: 'Music isn\'t just about notes - it\'s also about silence! Quarter rests are just as important as quarter notes.\n\n**What is a Quarter Rest?**\n- Means "be silent for 1 beat"\n- Looks like a squiggly line (like a lightning bolt or a fancy "Z")\n- When you see a rest, DON\'T play - just count and wait\n\n**Why Rests Matter:**\n- They create rhythm and shape\n- They give the music "breathing room"\n- They make the notes around them more interesting\n- Without rests, music would be one long endless sound!\n\n**How to Count Rests:**\n- Count them just like notes: "1, 2, 3, 4"\n- When you see a rest, count it but don\'t play\n- Keep the beat going in your head (and your foot!)\n\n**The Active Silence:**\nRests are "active silence" - you\'re not just doing nothing, you\'re actively counting and waiting for the next note!',
        example: '🎭 THE SILENCE GAME: Play this pattern: B (1 beat) - rest (1 beat) - A (1 beat) - rest (1 beat). Count out loud: "1, 2, 3, 4" but only play on 1 and 3. The rests are just as important as the notes!',
        tip: '🎯 REST RULE: Never skip a rest! Count it just like a note. Rests are part of the music, not a break from the music. Keep counting through rests!'
      },
      {
        heading: '🎸 Putting It Together: Your First Rhythms',
        content: 'Now let\'s combine everything you\'ve learned and make real music!\n\n**Rhythm Pattern #1: The Basic Four**\nB - A - G - B (all quarter notes)\nCount: "1, 2, 3, 4"\nPlay one note per beat\n\n**Rhythm Pattern #2: With Rests**\nB - rest - A - rest\nCount: "1, 2, 3, 4"\nPlay on 1 and 3, rest on 2 and 4\n\n**Rhythm Pattern #3: The Repeat**\nB - B - A - A - G - G - B (hold)\nCount: "1, 2, 3, 4" twice\nPlay two B\'s, two A\'s, two G\'s, then hold B for 4 beats\n\n**Rhythm Pattern #4: The Challenge**\nB - rest - A - rest - G - rest - B (hold)\nCount: "1, 2, 3, 4" twice\nAlternate notes and rests, then hold the final B\n\n**The Secret to Great Rhythm:**\n- Count out loud (seriously - do it!)\n- Tap your foot on every beat\n- Use a metronome\n- Start slow, then speed up\n- Keep it steady - no rushing or dragging!',
        example: '🎵 YOUR FIRST SONG WITH RHYTHM: Try playing "Mary Had a Little Lamb" with quarter notes:\nB - A - G - A - B - B - B (hold)\nA - A - A (hold)\nB - B - B (hold)\n\nCount each note as one beat. You\'re playing real music!',
        tip: '🎯 RHYTHM MASTERY TIP: Practice rhythm WITHOUT your instrument first. Clap the rhythms, count out loud, tap your foot. When the rhythm feels natural in your body, THEN add the saxophone. This makes everything easier!'
      }
    ],
    keyPoints: [
      '💓 A beat is the basic unit of time (like a heartbeat)',
      '🎵 Quarter note = 1 beat (most common note)',
      '🔢 Count "1, 2, 3, 4" for quarter notes',
      '🤫 Quarter rest = silence for 1 beat (just as important!)',
      '⏰ Keep steady, even timing (use a metronome!)',
      '🎯 Count out loud and tap your foot'
    ],
    practiceInstructions: '🎮 RHYTHM MASTERY CHALLENGE:\n\n**Day 1: The Foundation**\n- Practice counting "1, 2, 3, 4" out loud while tapping your foot (1 minute)\n- Do this 5 times until it feels natural\n- Try it at different speeds (slow, medium, fast)\n\n**Day 2: Adding Notes**\n- Play B for 4 beats, A for 4 beats, G for 4 beats\n- Count out loud as you play: "1, 2, 3, 4" for each note\n- Focus on keeping steady timing\n\n**Day 3: Adding Rests**\n- Play this pattern: B (1 beat) - rest (1 beat) - A (1 beat) - rest (1 beat)\n- Count out loud: "1, 2, 3, 4"\n- Play on 1 and 3, rest on 2 and 4\n\n**Day 4: Rhythm Patterns**\n- Practice the four rhythm patterns from the lesson\n- Start slow, then speed up\n- Use a metronome if you have one\n\n**Day 5: Real Music**\n- Play "Mary Had a Little Lamb" with quarter notes\n- Count out loud as you play\n- Try to keep perfect timing\n\n🏆 RHYTHM MASTER BADGE: When you can play quarter notes and rests with perfect timing while counting out loud, you earn your Rhythm Master badge! You can now keep a beat like a pro! 🥁✨'
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
    title: '📦 The Musical Boxes: Understanding Time Signatures',
    introduction: 'Have you ever wondered how musicians know how many beats to play before starting over? It\'s all about TIME SIGNATURES! Today you\'re going to learn the secret code that tells musicians how to organize rhythm. By the end of this lesson, you\'ll be able to look at any piece of music and know exactly how to count it. Let\'s unlock the mystery of musical time!',
    sections: [
      {
        heading: '📦 What is a Measure? The Musical Container',
        content: 'A measure (also called a "bar") is like a musical box that holds a specific number of beats. It\'s how we organize music in time!\n\n**The Measure System:**\n- Measures are separated by BAR LINES (the vertical lines on the staff)\n- Each measure holds a specific number of beats\n- You must fill each measure completely before moving to the next one\n- Think of it like filling boxes - you can\'t put 5 items in a 4-item box!\n\n**Why Measures Matter:**\n- They organize music into manageable chunks\n- They help musicians keep track of where they are\n- They make it possible to repeat sections\n- They give music structure and form\n\n**The Golden Rule:** Every measure must have exactly the right number of beats. Not too many, not too few - just right!',
        example: '📦 THE APPLE BOX ANALOGY: Imagine you have boxes that hold exactly 4 apples each. If you have 12 apples, you need exactly 3 boxes. You can\'t put 5 apples in a 4-apple box, and you can\'t leave a box only half full. Music works the same way - each measure must be filled completely!',
        tip: '📏 BAR LINE BASICS: Bar lines are the vertical lines that separate measures. They\'re like walls between rooms. When you see a bar line, you\'ve finished one measure and are starting a new one!'
      },
      {
        heading: '🔢 The Time Signature Code: Cracking the Mystery',
        content: 'A time signature is like a secret code that tells you how to count the music. It appears at the beginning of every piece, right after the clef.\n\n**The Two-Number System:**\nA time signature has TWO numbers stacked on top of each other:\n\n**TOP NUMBER:** How many beats are in each measure\n- Tells you how many "counts" fit in one box\n- Common top numbers: 2, 3, 4, 6\n\n**BOTTOM NUMBER:** What type of note gets one beat\n- This is a CODE you need to crack!\n- 4 = quarter note gets 1 beat\n- 2 = half note gets 1 beat\n- 8 = eighth note gets 1 beat\n\n**The Most Common Time Signatures:**\n- **4/4 time**: 4 beats per measure, quarter note = 1 beat (MOST COMMON!)\n- **3/4 time**: 3 beats per measure, quarter note = 1 beat (waltz time)\n- **2/4 time**: 2 beats per measure, quarter note = 1 beat (march time)\n- **6/8 time**: 6 beats per measure, eighth note = 1 beat (compound time)',
        example: '🔓 DECODING THE TIME SIGNATURE: Let\'s decode 4/4 time:\n- Top number "4" = 4 beats in each measure\n- Bottom number "4" = quarter note gets 1 beat\n- Result: Each measure holds 4 quarter notes\n\nNow let\'s decode 3/4 time:\n- Top number "3" = 3 beats in each measure\n- Bottom number "4" = quarter note gets 1 beat\n- Result: Each measure holds 3 quarter notes',
        tip: '🎯 BOTTOM NUMBER CHEAT SHEET: The bottom number is a fraction:\n- 4 means "quarter note" (1/4 of a whole note)\n- 2 means "half note" (1/2 of a whole note)\n- 8 means "eighth note" (1/8 of a whole note)\n\nMost beginner music uses 4 on the bottom, so quarter notes get the beat!'
      },
      {
        heading: '🎵 4/4 Time: The King of Time Signatures',
        content: '4/4 time is the MOST COMMON time signature in all of music! It\'s so common that it\'s also called "COMMON TIME" and can be written with a big "C" instead of numbers.\n\n**4/4 Time Rules:**\n- Each measure has 4 beats\n- Quarter note gets 1 beat\n- Count: "1, 2, 3, 4"\n- Beat 1 is the STRONGEST (accented)\n- Beat 3 is the next strongest\n- Beats 2 and 4 are weak\n\n**The Accent Pattern:**\nIn 4/4 time, the beats have a natural accent pattern:\n- Beat 1: STRONG (like the downbeat in a march)\n- Beat 2: weak\n- Beat 3: STRONG (secondary accent)\n- Beat 4: weak\n\nThis creates the familiar "STRONG-weak-STRONG-weak" pattern that you hear in most pop, rock, and jazz music!\n\n**Famous 4/4 Songs:**\n- Most pop songs\n- Most rock songs\n- Most jazz standards\n- "Happy Birthday" (yes, really!)\n- Countless others!',
        example: '🎸 FIND 4/4 IN YOUR MUSIC: Try counting along to your favorite song. Most likely it\'s in 4/4 time! Count "1, 2, 3, 4" and see if it fits. Listen for the strong beat 1 - it usually has the bass drum or emphasis.',
        tip: '🎯 4/4 COUNTING TIP: When counting 4/4, emphasize beats 1 and 3: "ONE, 2, THREE, 4." This helps you feel the natural accent pattern. The strong beats are like the "pillars" that hold up the music!'
      },
      {
        heading: '💃 3/4 Time: The Waltz Rhythm',
        content: '3/4 time has a completely different feel from 4/4. It\'s the time signature of waltzes and has a distinctive "round and round" feeling.\n\n**3/4 Time Rules:**\n- Each measure has 3 beats\n- Quarter note gets 1 beat\n- Count: "1, 2, 3"\n- Beat 1 is STRONG\n- Beats 2 and 3 are weak\n\n**The Waltz Pattern:**\n3/4 time has a natural "OOM-pah-pah" rhythm:\n- Beat 1: STRONG (the "OOM" - usually the bass note)\n- Beat 2: weak (the first "pah")\n- Beat 3: weak (the second "pah")\n\nThis creates the flowing, circular feeling of a waltz!\n\n**Famous 3/4 Songs:**\n- "The Blue Danube" (classic waltz)\n- "Happy Birthday" (yes, it can be in 3/4 too!)\n- "Edelweiss" from The Sound of Music\n- Many Christmas carols\n- Countless waltzes\n\n**The Dance Connection:**\nWaltz dancers step: step (1), step (2), step (3), then repeat. The music matches the dance perfectly!',
        example: '💃 THE WALTZ FEEL: Imagine you\'re at a fancy ball, dancing a waltz. The music goes "OOM-pah-pah, OOM-pah-pah." Count along: "ONE-2-3, ONE-2-3." Feel the circular, flowing rhythm?',
        tip: '🎯 3/4 COUNTING TIP: In 3/4 time, count "1, 2, 3" with strong emphasis on beat 1: "ONE, 2, 3." The strong first beat is like the "downbeat" that starts each measure. Feel the waltz rhythm!'
      },
      {
        heading: '🥁 2/4 Time: The March Rhythm',
        content: '2/4 time is simple and straightforward - it\'s the time signature of marches! It has a strong "left-right, left-right" feeling.\n\n**2/4 Time Rules:**\n- Each measure has 2 beats\n- Quarter note gets 1 beat\n- Count: "1, 2"\n- Beat 1 is STRONG\n- Beat 2 is weak\n\n**The March Pattern:**\n2/4 time has a natural "LEFT-right, LEFT-right" rhythm:\n- Beat 1: STRONG (left foot)\n- Beat 2: weak (right foot)\n\nThis creates the steady, marching feeling!\n\n**Famous 2/4 Songs:**\n- Military marches\n- "The Stars and Stripes Forever"\n- Many polkas\n- Some nursery rhymes\n\n**The March Connection:**\nMarching bands count "LEFT, 2, LEFT, 2" - that\'s 2/4 time! The strong beat 1 is always the left foot.',
        example: '🥁 THE MARCH FEEL: Imagine you\'re in a marching band. The drum major counts "1, 2, 1, 2" and you march: LEFT (1), right (2), LEFT (1), right (2). That\'s 2/4 time!',
        tip: '🎯 2/4 COUNTING TIP: In 2/4 time, count "1, 2" with strong emphasis on beat 1: "ONE, 2." Think "LEFT, right" like marching. The strong first beat is your left foot!'
      },
      {
        heading: '🎮 Putting It All Together: Reading Time Signatures',
        content: 'Now you can crack the time signature code! Here\'s how to read any time signature:\n\n**The 3-Step Process:**\n1. Look at the TOP number - that\'s how many beats per measure\n2. Look at the BOTTOM number - that tells you what note gets 1 beat\n3. Count the beats: "1, 2, 3, 4" (or however many beats)\n\n**Common Time Signatures You\'ll See:**\n- 4/4: Count "1, 2, 3, 4" (most common!)\n- 3/4: Count "1, 2, 3" (waltz time)\n- 2/4: Count "1, 2" (march time)\n- 6/8: Count "1-2-3, 4-5-6" (compound time - we\'ll learn this later!)\n\n**Practice Reading Time Signatures:**\nLook at any piece of music and ask:\n- What\'s the top number? (beats per measure)\n- What\'s the bottom number? (what note gets the beat)\n- How do I count this?\n\n**The Ultimate Goal:**\nTo look at a time signature and instantly know how to count it, just like you instantly know how to read words!',
        example: '🎯 TIME SIGNATURE PRACTICE: Look at three different pieces of music. For each one:\n1. Find the time signature\n2. Decode it (top number = beats, bottom number = note value)\n3. Count out loud: "1, 2, 3, 4" or "1, 2, 3" or "1, 2"\n4. Clap on each beat\n\nCan you decode any time signature now?',
        tip: '🎵 TIME SIGNATURE MASTERY: The more you practice reading time signatures, the easier it becomes. Soon you\'ll look at a time signature and instantly know how to count it, without even thinking about it!'
      }
    ],
    keyPoints: [
      '📦 Measure = musical box that holds specific number of beats',
      '🔢 Time signature = top number (beats per measure) + bottom number (note value = 1 beat)',
      '🎵 4/4 = 4 beats, quarter note = 1 beat (MOST COMMON)',
      '💃 3/4 = 3 beats, quarter note = 1 beat (waltz time)',
      '🥁 2/4 = 2 beats, quarter note = 1 beat (march time)',
      '📏 Bar lines separate measures',
      '💪 Beat 1 is always the strongest'
    ],
    practiceInstructions: '🎮 TIME SIGNATURE MASTERY CHALLENGE:\n\n**Day 1: The Basics**\n- Practice counting "1, 2, 3, 4" for 4/4 time (1 minute)\n- Practice counting "1, 2, 3" for 3/4 time (1 minute)\n- Practice counting "1, 2" for 2/4 time (1 minute)\n- Clap on beat 1 of each measure\n\n**Day 2: Finding Time Signatures**\n- Look at 5 different pieces of music\n- Find the time signature in each one\n- Decode it (top number = beats, bottom number = note value)\n- Count out loud for each one\n\n**Day 3: Playing in Different Times**\n- Play a quarter note pattern in 4/4: B-B-B-B (count "1, 2, 3, 4")\n- Play a quarter note pattern in 3/4: B-B-B (count "1, 2, 3")\n- Play a quarter note pattern in 2/4: B-B (count "1, 2")\n- Feel the different rhythms!\n\n**Day 4: Real Music**\n- Find your favorite song\n- Try to figure out what time signature it\'s in\n- Count along with the music\n- Is it 4/4? 3/4? 2/4?\n\n**Day 5: The Challenge**\n- Look at random pieces of music\n- Instantly decode the time signature\n- Count out loud without hesitation\n- Play a simple pattern in that time signature\n\n🏆 TIME MASTER BADGE: When you can look at any time signature and instantly know how to count it, you earn your Time Master badge! You can now read the secret code of musical time! 📦✨'
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
    title: '🔊 The Volume Knob: Mastering Dynamics',
    introduction: 'Music isn\'t just about the right notes - it\'s about the right FEELING! Dynamics are how we add emotion, drama, and expression to our playing. Today you\'re going to learn how to control your volume like a pro. By the end of this lesson, you\'ll be able to make your saxophone whisper like a secret or roar like a lion! Let\'s master the art of dynamics!',
    sections: [
      {
        heading: '🎭 What are Dynamics? The Language of Emotion',
        content: 'Dynamics are Italian words that tell us how LOUD or SOFT to play. They\'re the emotional vocabulary of music!\n\n**Why Dynamics Matter:**\n- They create expression and emotion\n- They shape musical phrases\n- They tell the story of the music\n- They keep the listener interested\n- They\'re what separates robots from musicians!\n\n**The Dynamic Spectrum:**\nImagine a volume knob on a stereo:\n- Turn it down low = soft, intimate, mysterious\n- Turn it up high = loud, powerful, exciting\n- Everything in between = different moods and feelings\n\n**Where You\'ll See Dynamics:**\n- Below the staff (most common)\n- Above the staff (sometimes)\n- At the beginning of a phrase\n- When the composer wants a change\n\nDynamics are like the director of a movie telling the actors how to feel!',
        example: '🎬 MOVIE ANALOGY: Think of a scary movie. The quiet, soft music builds tension. Then suddenly - BAM! - loud music for the jump scare! That\'s dynamics creating emotion. Your saxophone can do the same thing!',
        tip: '🎯 DYNAMIC RELATIVITY: "Forte" (loud) in a small room might be different from "forte" in a concert hall. Dynamics are relative to the space and the music. Always listen to the context!'
      },
      {
        heading: '🎚️ The Dynamic Scale: From Whisper to Roar',
        content: 'Let\'s learn the complete dynamic scale, from softest to loudest:\n\n**The Soft End (The Whispers):**\n- **ppp** - Pianississimo (very very soft) - like a whisper\n- **pp** - Pianissimo (very soft) - like a secret\n- **p** - Piano (soft) - like a quiet conversation\n\n**The Middle (The Conversations):**\n- **mp** - Mezzo piano (medium soft) - like normal talking\n- **mf** - Mezzo forte (medium loud) - like projecting your voice\n\n**The Loud End (The Roars):**\n- **f** - Forte (loud) - like calling across a room\n- **ff** - Fortissimo (very loud) - like shouting\n- **fff** - Fortississimo (very very loud) - like a lion roaring!\n\n**The Italian Code:**\n- "Piano" = soft (think "piano" the instrument - it\'s soft!)\n- "Forte" = loud (think "fortified" - strong!)\n- "Mezzo" = half or medium\n- "-issimo" = very or extremely\n\n**The Volume Scale (1-10):**\n- ppp = 1 (barely audible)\n- pp = 2\n- p = 3\n- mp = 5\n- mf = 6\n- f = 8\n- ff = 9\n- fff = 10 (maximum volume)',
        example: '🎚️ THE VOLUME KNOB: Imagine your saxophone has a volume knob from 1-10:\n- 1-3 = piano range (soft)\n- 4-6 = mezzo range (medium)\n- 7-10 = forte range (loud)\n\nMost music lives in the 4-7 range. The extremes (1-3 and 8-10) are for special effects!',
        tip: '🎯 DYNAMIC RANGE: Don\'t just play at one volume! Great musicians use the full dynamic range. Practice going from ppp to fff and back again. Control is key!'
      },
      {
        heading: '📈 Changing Dynamics: The Art of Crescendo and Decrescendo',
        content: 'Music isn\'t static - it moves and changes! Here\'s how to change dynamics smoothly:\n\n**Crescendo (Getting Louder):**\n- Symbol: < (looks like a hairpin opening up)\n- Abbreviation: cresc.\n- Meaning: gradually get louder\n- Think: "opening up" or "growing"\n\n**Decrescendo (Getting Softer):**\n- Symbol: > (looks like a hairpin closing)\n- Abbreviation: decresc. or dim. (diminuendo)\n- Meaning: gradually get softer\n- Think: "closing down" or "shrinking"\n\n**How to Execute Dynamic Changes:**\n- Start at the initial dynamic\n- Change GRADUALLY over the marked section\n- Don\'t jump suddenly from p to f\n- Think of it like a ramp, not a staircase\n- Use more air for crescendo, less air for decrescendo\n\n**Common Dynamic Patterns:**\n- A long crescendo building to a climax\n- A decrescendo fading away at the end\n- A "swell" (crescendo then decrescendo) on one note\n- Sudden contrasts (p then f) for drama',
        example: '🌊 THE WAVE ANALOGY: Think of a crescendo like a wave building up, and a decrescendo like a wave dying out. The change should be smooth and natural, not jerky or sudden.',
        tip: '🎯 GRADUAL CHANGE: The #1 mistake is changing dynamics too quickly. Take your time! A crescendo over 4 beats should be smooth and gradual, not sudden. Practice with a metronome to keep it even.'
      },
      {
        heading: '🎮 How to Play with Dynamics: The Technical Secrets',
        content: 'Now let\'s learn HOW to actually play louder and softer. It\'s not just about blowing harder!\n\n**To Play LOUDER (Forte):**\n1. **Use MORE air** - Fill your lungs completely\n2. **Support with diaphragm** - Engage your abdominal muscles\n3. **Keep embouchure firm** - Don\'t let it get loose\n4. **Open your throat** - Think "AW" or "OH"\n5. **Fast air stream** - Think "fog the mirror" with power\n\n**To Play SOFTER (Piano):**\n1. **Use LESS air** - But keep it supported!\n2. **Keep embouchure FIRM** - Don\'t relax it!\n3. **Control the air stream** - Slow but steady\n4. **Focus the sound** - Think "laser beam" not "spray"\n5. **Maintain tone quality** - Soft shouldn\'t mean airy\n\n**The Secret: Air Support!**\nThe biggest mistake is thinking "soft = no support." WRONG! Soft playing requires MORE control than loud playing. You still need strong air support, just less air.\n\n**Common Mistakes:**\n- Playing loud by biting (causes squeaking)\n- Playing soft by relaxing embouchure (causes airy sound)\n- Not supporting soft notes (they sound weak)\n- Overblowing loud notes (they sound harsh)',
        example: '💨 THE TOOTHPASTE TUBE: Think of your air like toothpaste in a tube. When you squeeze gently (soft), you get a thin, controlled stream. When you squeeze hard (loud), you get a thick, powerful stream. But you\'re always squeezing - you never just let go!',
        tip: '🎯 SOFT IS HARDER: Playing soft is actually HARDER than playing loud! It requires more control. Practice long tones at pp until you can play softly with a beautiful, focused tone.'
      },
      {
        heading: '🎨 Putting It All Together: Dynamic Expression',
        content: 'Now you\'re ready to make MUSIC, not just notes! Here\'s how to use dynamics expressively:\n\n**Dynamic Contrast:**\n- Use loud and soft to create interest\n- Contrast makes music exciting\n- Don\'t play everything at the same volume\n- Think of dynamics as colors in a painting\n\n**Phrase Shaping:**\n- Most phrases have a natural arc\n- Start softer, build to a climax, then soften\n- Like a story with a beginning, middle, and end\n- Use crescendo to build tension\n- Use decrescendo to release tension\n\n**Style Considerations:**\n- March music: Generally louder, more accent on beat 1\n- Waltz music: Strong beat 1, softer beats 2 and 3\n- Ballads: More soft playing, expressive dynamics\n- Jazz: Wide dynamic range, lots of contrast\n\n**The Ultimate Goal:**\nTo use dynamics to tell the story of the music. Every piece has an emotional journey - your dynamics should reflect that journey!',
        example: '🎭 THE STORYTELLER: Think of dynamics like the voice of a storyteller. They whisper for secrets, they shout for excitement, they get louder to build tension, they get softer to create intimacy. Your saxophone is your voice - use it to tell the story!',
        tip: '🎵 LISTEN TO THE PROS: Listen to professional saxophonists and notice how they use dynamics. They don\'t just play the right notes - they play with emotion. That\'s what makes them great!'
      }
    ],
    keyPoints: [
      '🎭 Dynamics = volume levels that create emotion',
      '🎚️ Dynamic scale: ppp (whisper) to fff (roar)',
      '📈 Crescendo (<) = gradually louder',
      '📉 Decrescendo (>) = gradually softer',
      '💨 Loud = more air + support, Soft = less air + MORE control',
      '🎨 Use dynamics to tell the story of the music'
    ],
    practiceInstructions: '🎮 DYNAMIC MASTERY CHALLENGE:\n\n**Day 1: The Extremes**\n- Play G as loud as you can (fff) for 4 beats\n- Play G as soft as you can (ppp) for 4 beats\n- Alternate between fff and ppp\n- Focus on tone quality at both extremes\n\n**Day 2: The Crescendo**\n- Play G for 8 beats, starting at pp\n- Gradually crescendo to f by beat 8\n- Make the change smooth and gradual\n- Repeat 5 times\n\n**Day 3: The Decrescendo**\n- Play G for 8 beats, starting at f\n- Gradually decrescendo to pp by beat 8\n- Make the change smooth and gradual\n- Repeat 5 times\n\n**Day 4: The Swell**\n- Play G for 8 beats\n- Crescendo from pp to f (beats 1-4)\n- Decrescendo from f to pp (beats 5-8)\n- Create a "swell" effect\n- Repeat 5 times\n\n**Day 5: Musical Phrases**\n- Play B-A-G with dynamics\n- Start p, crescendo to f on A, decrescendo to p on G\n- Make it musical and expressive\n- Try different dynamic patterns\n\n🏆 DYNAMIC MASTER BADGE: When you can play smoothly from ppp to fff and back again with beautiful tone quality, you earn your Dynamic Master badge! You can now make your saxophone sing with emotion! 🔊✨'
  },

  'n-3': {
    title: '🎹 The Right Hand Revolution: Unlocking F, E, and D',
    introduction: 'Congratulations, left-hand master! You\'ve conquered B, A, and G. Now it\'s time to bring in the reinforcements - your RIGHT hand! Today you\'ll learn three more notes: F, E, and D. By the end of this lesson, you\'ll have SIX notes under your belt and be playing real melodies! Let\'s complete the team!',
    sections: [
      {
        heading: '🤝 The Right Hand Trio: Meeting Your New Finger Friends',
        content: 'Your right hand is about to join the party! It plays the bottom three keys on the saxophone, mirroring your left hand perfectly:\n\n**Index Finger (1st finger) = F** 👆\nThis is your right hand\'s "first finger" and it plays the note F. It works together with ALL three left-hand fingers.\n\n**Middle Finger (2nd finger) = E** 🖕\nThis is your "second finger" and it plays the note E. It joins the index finger.\n\n**Ring Finger (3rd finger) = D** 💍\nThis is your "third finger" and it plays the note D. Now ALL SIX fingers are working together!\n\n**The Mirror Effect:**\nYour hands are like mirrors:\n- Left hand: B (top) → A (middle) → G (bottom)\n- Right hand: F (top) → E (middle) → D (bottom)\n\nTogether they create a complete scale: D-E-F-G-A-B\n\n**The Baseball Grip Returns:**\nRemember how we curved your fingers like holding a baseball? That\'s exactly how your right hand should look too! Use the pads of your fingers, not the tips.',
        example: '🪞 THE MIRROR GAME: Hold both hands out in front of you. Left hand on top, right hand on bottom. Curve your fingers like holding a baseball. Now press down one finger at a time on each hand. See how they mirror each other? That\'s how they\'ll work on the saxophone!',
        tip: '⚖️ THE BALANCE RULE: Keep both hands balanced. Don\'t let the weight of the saxophone pull your right hand away from the keys. Both hands should feel equally comfortable and ready to move!'
      },
      {
        heading: '🎵 Note F: The Four-Finger Formation',
        content: 'Let\'s play your first right-hand note: F! This is where both hands work together for the first time.\n\n**The F Formula:**\n1. Keep ALL three left-hand fingers DOWN (G position)\n2. ADD your right index finger on the first right-hand key\n3. Blow steady, supported air\n\nNow you have FOUR fingers down: all three left-hand fingers plus right index. This is your first "teamwork" note!\n\n**The Transition G → F:**\n- Start with G (three left-hand fingers)\n- Add right index finger = F\n- Keep left-hand fingers down - they don\'t move!\n\nThink of it as adding a team member, not replacing anyone.',
        example: '🤝 THE TEAMWORK ANALOGY: G is your left-hand team (3 players). F is your left-hand team PLUS one right-hand player (4 players total). The left hand stays the same - you\'re just adding a right-hand player to the team!',
        tip: '🎯 FINGER CHECK: Make sure your right index finger is curved and using the pad of your finger, not the tip. It should press down firmly but not mash the key!'
      },
      {
        heading: '🎶 Note E: The Five-Finger Fanfare',
        content: 'Now let\'s add another right-hand finger and play E! You\'re building a full hand!\n\n**The E Formula:**\n1. Keep left-hand fingers DOWN\n2. Keep right index finger DOWN\n3. ADD your right middle finger\n\nNow you have FIVE fingers down: all left-hand plus right index and middle. You\'re almost using your full right hand!\n\n**The Transition F → E:**\n- Start with F (4 fingers: 3 left + 1 right)\n- Add right middle finger = E (5 fingers: 3 left + 2 right)\n- Keep all other fingers down - they don\'t move!\n\nThink of it as adding another team member.',
        example: '🎺 THE FANFARE: E is played with 5 fingers - that\'s almost a full hand! You\'re building up to using all your fingers. Each note adds one more finger to the team.',
        tip: '🌊 SMOOTH TRANSITIONS: Move smoothly from F to E. Your right middle finger should be ready and waiting, hovering close to the key. Don\'t lift it high - just add it when needed!'
      },
      {
        heading: '🎼 Note D: The Six-Finger Symphony',
        content: 'Time for your sixth note: D! Now ALL SIX fingers are working together. You\'ve completed the team!\n\n**The D Formula:**\n1. Keep all left-hand fingers DOWN\n2. Keep right index and middle fingers DOWN\n3. ADD your right ring finger\n\nNow you have ALL SIX fingers down - the full "six-finger" note! This is your lowest note so far.\n\n**The Transition E → D:**\n- Start with E (5 fingers)\n- Add right ring finger = D (6 fingers)\n- All fingers are now down!\n\n**The Complete Journey: B → A → G → F → E → D:**\n- B: 1 finger (left index)\n- A: 2 fingers (left index + middle)\n- G: 3 fingers (all left hand)\n- F: 4 fingers (3 left + 1 right)\n- E: 5 fingers (3 left + 2 right)\n- D: 6 fingers (all fingers!)\n\nYou\'re building from simple to complex, one finger at a time!',
        example: '🎻 THE SYMPHONY: D is played with all 6 fingers - it\'s like a full orchestra playing together! Every finger is contributing to the sound. This is your foundation note - the bottom of your current range.',
        tip: '⚠️ LOW NOTE ALERT: D is your lowest note so far. Make sure ALL keys are fully covered or the sound will be stuffy or squeaky. Check each finger - are they all pressing down completely?'
      },
      {
        heading: '🎸 Your Six-Note Scale: The Complete Team',
        content: 'You now know SIX notes: B-A-G-F-E-D\n\nThese form a complete descending scale pattern. You\'ve built from one finger to six fingers, creating a full scale!\n\n**The Six-Note Scale:**\nAscending (going up): D-E-F-G-A-B\nDescending (going down): B-A-G-F-E-D\n\nThis is the foundation for THOUSANDS of melodies! You can now play real music!\n\n**Pattern Practice:**\nTry these patterns to build finger coordination:\n\n**Pattern 1: The Wave** 🌊\nD-E-F-G-A-B (up) then B-A-G-F-E-D (down)\n\n**Pattern 2: The Skip** 🦘\nD-F-A (skip by twos) then E-G-B (skip by twos)\n\n**Pattern 3: The Repeat** 🔁\nD-E-F-G-F-E-D (up then back down)\n\n**Pattern 4: The Challenge** 🎯\nB-D-F-A-G-E-C (mixing it up!)\n\nEach pattern builds different finger coordination skills!',
        example: '🎶 YOUR FIRST REAL SCALES: Did you know "Mary Had a Little Lamb" uses mostly B, A, G, F, E? Try playing: B-A-G-F-E-D-E-F-G-A-B. You just played a melody using your six-note scale!',
        tip: '🎯 SMOOTH TRANSITIONS: Practice smooth transitions between notes. Think of your fingers as a wave flowing up and down the keys. Each finger should move independently but smoothly. No jerky movements!'
      }
    ],
    keyPoints: [
      '🤝 Right hand: index=F, middle=E, ring=D',
      '🎵 Six notes total: B-A-G-F-E-D (built one finger at a time!)',
      '⚾ Keep fingers curved and close to keys',
      '🎯 Cover keys completely for clear tone',
      '🌊 Practice ascending and descending patterns',
      '🎸 You can now play THOUSANDS of melodies!'
    ],
    practiceInstructions: '🎮 SIX-NOTE MASTERY CHALLENGE:\n\n**Day 1: Note by Note**\n- Play F for 4 beats, rest 4 beats (repeat 5 times)\n- Play E for 4 beats, rest 4 beats (repeat 5 times)\n- Play D for 4 beats, rest 4 beats (repeat 5 times)\nFocus on clear, steady tone for each note.\n\n**Day 2: The Transitions**\n- Practice G to F (5 times slowly)\n- Practice F to E (5 times slowly)\n- Practice E to D (5 times slowly)\nFocus on smooth finger movement.\n\n**Day 3: The Six-Note Scale**\n- Play D-E-F-G-A-B ascending (5 times)\n- Play B-A-G-F-E-D descending (5 times)\n- Play the full scale up and down (5 times)\nFocus on even tone and smooth transitions.\n\n**Day 4: Pattern Practice**\n- Play the Wave: D-E-F-G-A-B then B-A-G-F-E-D\n- Play the Skip: D-F-A then E-G-B\n- Play the Repeat: D-E-F-G-F-E-D\nFocus on finger coordination.\n\n**Day 5: Real Music**\n- Play "Mary Had a Little Lamb": B-A-G-F-E-D-E-F-G-A-B\n- Try other simple melodies using your six notes\n- Focus on musical expression\n\n🏆 SIX-NOTE MASTER BADGE: When you can play all six notes (B-A-G-F-E-D) with clear tone AND play the six-note scale up and down smoothly, you earn your Six-Note Master badge! You can now play real melodies! 🎵✨'
  },

  'n-4': {
    title: '🎺 The Low C Quest: Completing Your Octave',
    introduction: 'You\'ve conquered six notes - now it\'s time for the ultimate challenge: Low C! This is the final note that completes your first full octave. You\'re about to unlock the complete range from C to B - eight notes that form the foundation of thousands of songs! Are you ready for the final boss battle? Let\'s complete your octave!',
    sections: [
      {
        heading: '🎯 Low C: The Seven-Finger Fortress',
        content: 'Low C is special - it requires ALL your fingers PLUS a secret weapon: the thumb key!\n\n**The Low C Formula:**\n1. All six fingers DOWN (D position)\n2. ADD your left thumb on the thumb key (the side key)\n3. Blow steady, SUPPORTED air (more than you think!)\n\nLow C is the lowest note in your basic range. It requires:\n- All seven fingers working together\n- Extra air support (low notes need MORE air!)\n- Firm embouchure (don\'t let it get loose)\n- Patience (low notes can be tricky at first)\n\n**Why Low C is Special:**\n- It completes your first full octave (C to B)\n- It\'s the foundation of your range\n- It requires the most fingers of any note so far\n- It teaches you about air support for low notes',
        example: '🏰 THE FORTRESS ANALOGY: Low C is like a fortress that requires ALL your soldiers (fingers) plus a special weapon (thumb key) to capture. It\'s the most complex note you\'ve learned so far - but you\'re ready for it!',
        tip: '💨 LOW NOTE SECRET: Low notes require MORE air support than high notes, not less! Think of blowing warm air on your hands to warm them up - that\'s the kind of steady, supported air you need for low C.'
      },
      {
        heading: '🎼 Your Complete Octave: The C to B Journey',
        content: 'Congratulations! With Low C, you now have a COMPLETE OCTAVE from C to B!\n\n**Your Eight-Note Scale:**\nC (lowest) - D - E - F - G - A - B (highest)\n\nThis is a MAJOR SCALE pattern - the foundation of Western music! These eight notes are the building blocks for THOUSANDS of songs.\n\n**The Octave Journey:**\nYou\'ve built this octave one note at a time:\n- Started with B, A, G (left hand)\n- Added F, E, D (right hand)\n- Finished with C (all fingers + thumb)\n\nEach note was a stepping stone to the next. You didn\'t just learn notes - you BUILT a complete scale!\n\n**Why This Matters:**\n- You can now play most beginner songs\n- You understand how scales are built\n- You have a solid foundation for future learning\n- You\'ve completed your first major milestone!',
        example: '🎶 "DO-RE-MI" CONNECTION: Remember "Do-Re-Mi-Fa-Sol-La-Ti-Do" from The Sound of Music? You can now play ALL of those notes! C=Do, D=Re, E=Mi, F=Fa, G=Sol, A=La, B=Ti, C=Do. You\'re singing with your saxophone!',
        tip: '🎯 OCTAVE MASTERY: Practice playing from C all the way up to B, then back down. Do this slowly at first, then speed up. This builds finger coordination and muscle memory. You\'re building the foundation for everything that comes next!'
      },
      {
        heading: '🔧 Low Note Technique: The Secret to Rich, Full Sound',
        content: 'Low notes (C, D, E) are like the bass section of an orchestra - they provide the foundation. But they require special technique to sound good!\n\n**The Four Keys to Low Note Success:**\n\n**1. MORE Air Support** 💨\nLow notes need MORE air than high notes, not less! Think of blowing warm air on your hands to warm them up - steady, supported, and plentiful.\n\n**2. Firm but Relaxed Embouchure** 🎭\nKeep your embouchure firm (corners tight) but don\'t bite or squeeze. Think "firm but flexible" like a good handshake.\n\n**3. Complete Key Coverage** 🔑\nMake sure ALL keys are fully covered. Even one slightly open key will make the note stuffy or cause it to squeak. Check every finger!\n\n**4. Open Throat** 🎵\nRelax your throat and think "AW" or "OH" sound. A tight throat restricts the air and makes low notes sound pinched.\n\n**The Low Note Sound:**\nWhen done correctly, low notes should be:\n- Full and resonant (not stuffy)\n- Rich and warm (not thin)\n- Clear and focused (not airy)\n- Powerful but controlled\n\n**Common Low Note Problems:**\n- Squeaking = not enough air or keys not fully covered\n- Stuffy sound = throat too tight or not enough air\n- No sound = embouchure too loose or not blowing\n- Flat pitch = biting too hard or not enough air support',
        example: '🎻 THE CELLO ANALOGY: Low notes on saxophone are like the cello in an orchestra - they provide the rich, warm foundation. A good cello sound is full and resonant, not scratchy or weak. Your low notes should sound the same way!',
        tip: '🔍 LOW NOTE TROUBLESHOOTING: If low notes squeak or don\'t speak, check:\n1. Are ALL keys fully covered? (Check every finger)\n2. Are you using enough air? (More than you think!)\n3. Is your throat open? (Think "AW" sound)\n4. Is your embouchure firm but not biting?\n\nFix these and your low notes will sing!'
      },
      {
        heading: '🎸 Playing Across the Range: The Mountain Climb',
        content: 'Now that you have a complete octave, let\'s practice moving smoothly between low and high notes. This is like climbing a mountain - you need to be able to go up and down with control!\n\n**Range Exercises:**\n\n**Exercise 1: The Octave Leap** 🦘\nC-G-C (low to high to low)\nStart on low C, jump up to middle G, then back down to low C. This builds flexibility.\n\n**Exercise 2: The Staircase** 🪜\nB-D-B (high to low to high)\nStart on high B, step down to middle D, then back up to high B. This builds control.\n\n**Exercise 3: The Wave** 🌊\nC-D-E-F-G-A-B-A-G-F-E-D-C\nPlay the full scale up, then back down. This builds coordination across the entire range.\n\n**Exercise 4: The Arpeggio** 🎼\nC-E-G-C (up) then C-G-E-C (down)\nPlay the notes of a chord, then reverse. This builds harmonic understanding.\n\n**The Secret to Range Control:**\n- Don\'t bite or squeeze when going to low notes\n- Use air support, not embouchure pressure\n- Keep fingers close to keys for smooth transitions\n- Maintain steady air flow throughout\n- Think of your range as one continuous spectrum, not separate zones\n\n**Why Range Matters:**\n- Most music uses the full range of the instrument\n- Smooth range transitions make you sound professional\n- Range control builds confidence\n- It prepares you for more advanced techniques',
        example: '🏔️ THE MOUNTAIN CLIMBER: Think of your range like a mountain. You need to be able to climb up (high notes) and down (low notes) with control and confidence. A good mountain climber can go up and down smoothly - that\'s what you\'re training for!',
        tip: '🎯 RANGE MASTERY TIP: Practice moving between low and high notes slowly at first. Focus on smooth transitions and consistent tone quality. Don\'t rush! Speed comes from control, not from rushing. When you can move smoothly across your entire range, you\'ve mastered this fundamental skill!'
      }
    ],
    keyPoints: [
      '🎯 Low C = all 6 fingers + thumb key (7 fingers total!)',
      '🎼 Complete range: C to B (one full octave - 8 notes!)',
      '💨 Low notes need MORE air support, not less',
      '🔑 Keep all keys fully covered for clear tone',
      '🎸 Practice smooth transitions across the entire range',
      '🏆 You\'ve completed your first major milestone!'
    ],
    practiceInstructions: '🎮 OCTAVE MASTERY CHALLENGE:\n\n**Day 1: Low C Foundation**\n- Play Low C for 4 beats, rest 4 beats (repeat 10 times)\n- Focus on full, resonant tone\n- Check that all keys are fully covered\n- Use plenty of air support\n\n**Day 2: The Octave Scale**\n- Play C-D-E-F-G-A-B ascending (5 times slowly)\n- Play B-A-G-F-E-D-C descending (5 times slowly)\n- Focus on even tone quality across the entire range\n- Use a metronome at ♩=60\n\n**Day 3: Range Leaps**\n- Practice C-G-C (low to high to low) 10 times\n- Practice B-D-B (high to low to high) 10 times\n- Focus on smooth transitions\n- Don\'t bite or squeeze on low notes\n\n**Day 4: Arpeggios**\n- Play C-E-G-C (up) then C-G-E-C (down) 10 times\n- Try other arpeggios: D-F-A-D, E-G-B-E\n- Focus on clear, even tone\n- Build finger coordination\n\n**Day 5: The Complete Journey**\n- Play the full octave scale up and down 10 times\n- Play arpeggios on each note of the scale\n- Try simple melodies using your full range\n- Focus on musical expression\n\n🏆 OCTAVE MASTER BADGE: When you can play from Low C to high B with smooth transitions and consistent tone quality, you earn your Octave Master badge! You\'ve completed your first full octave - a major milestone in your musical journey! 🎺✨'
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

  'basic-note-names': {
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
    title: '🔁 The Musical GPS: Navigation Signs & Repeats',
    introduction: 'Have you ever gotten lost in a piece of music? Don\'t worry - composers knew this would happen, so they created a GPS system for musicians! Today you\'re going to learn all the navigation signs that tell you where to go in the music. By the end of this lesson, you\'ll never get lost again! Let\'s master the musical map!',
    sections: [
      {
        heading: '🔁 Repeat Signs: The "Play Again" Buttons',
        content: 'Repeat signs are like "rewind" buttons in music - they tell you to go back and play a section again!\n\n**The Basic Repeat Sign:**\n- Looks like: |: music :|\n- The two dots (:) face the section you should repeat\n- Play from the first :| to the |: then go back and play it again\n\n**How It Works:**\n1. Play from the beginning (or from the last repeat sign)\n2. When you hit :|, go back to the matching |:\n3. Play the section again\n4. Continue past the repeat\n\n**Single Repeat Sign:**\nIf there\'s only ONE repeat sign (no matching pair), repeat from the BEGINNING of the piece!\n\n**Why Repeats?**\n- Saves space on the page\n- Creates musical structure\n- Makes patterns and themes\n- Very common in all types of music',
        example: '🎮 THE REWIND BUTTON: Think of repeat signs like a video game. You\'re playing along and suddenly you hit a "rewind" button that sends you back to an earlier point. You play that section again, then continue forward. It\'s like a musical time machine!',
        tip: '🔍 LOOK AHEAD: Always scan the music BEFORE you start playing. Look for repeat signs so you know the "map" of the piece. This prevents surprises!'
      },
      {
        heading: '🎭 First and Second Endings: The "Choose Your Own Adventure"',
        content: 'Sometimes when you repeat, you need to take a DIFFERENT path the second time. That\'s what first and second endings are for!\n\n**First Ending (1.):**\n- Looks like a bracket with "1." above it\n- Play this the FIRST time through\n- When you hit the repeat, play it again\n\n**Second Ending (2.):**\n- Looks like a bracket with "2." above it\n- Play this the SECOND time through\n- SKIP the first ending when you repeat\n\n**How It Works:**\n1. Play measures 1-8 (including first ending)\n2. Hit the repeat sign :|\n3. Go back to |: and play measures 1-7 again\n4. SKIP the first ending (measure 8 with "1.")\n5. Jump to the second ending (measure 8 with "2.")\n6. Continue playing\n\n**Why Different Endings?**\n- Creates variety\n- Leads to different sections\n- Common in song forms (verse-chorus structure)\n- Makes music more interesting',
        example: '🎬 THE MOVIE SEQUEL: Think of first and second endings like a movie with a sequel. The first time you watch it (first ending), the hero saves the day. But in the sequel (second ending), something different happens! Same beginning, different ending.',
        tip: '✏️ USE A PENCIL: If the navigation is confusing, use a pencil to mark where you go. Draw arrows showing your path. Write out the playing order: "1-2-3-4-1-2-3-5" or similar. This prevents getting lost!'
      },
      {
        heading: '🇮🇹 D.C. and D.S.: The Italian Time Machines',
        content: 'Composers love Italian words! Here are the most important navigation terms:\n\n**D.C. (Da Capo) = "From the Head"**\n- Means: Go back to the BEGINNING of the piece\n- Like hitting "rewind" all the way to the start\n- Often followed by "al Fine" or "al Coda"\n\n**D.S. (Dal Segno) = "From the Sign"**\n- Means: Go back to the 𝄋 sign (the segno)\n- The 𝄋 sign looks like a fancy S with dots\n- Like hitting "rewind" to a specific point\n- Often followed by "al Fine" or "al Coda"\n\n**al Fine = "To the End"**\n- Means: Play until you see the word "Fine"\n- "Fine" means "end" in Italian\n- When you see "Fine", stop playing\n- You\'re done!\n\n**al Coda = "To the Tail"**\n- Means: Jump to the coda section\n- The coda is marked with 𝄌 (like a target)\n- When you see "To Coda", jump to the 𝄌\n- The coda is usually at the end of the piece\n\n**Common Combinations:**\n- D.C. al Fine: Go to beginning, play until "Fine"\n- D.S. al Fine: Go to 𝄋 sign, play until "Fine"\n- D.C. al Coda: Go to beginning, play until "To Coda", then jump to 𝄌\n- D.S. al Coda: Go to 𝄋 sign, play until "To Coda", then jump to 𝄌',
        example: '🎮 THE VIDEO GAME ANALOGY: Think of D.C. and D.S. like checkpoints in a video game:\n- D.C. = "Go back to the start of the level"\n- D.S. = "Go back to the last checkpoint"\n- al Fine = "Play until you see the finish line"\n- al Coda = "Play until you see the bonus level, then jump to it"',
        tip: '🗺️ MAP IT OUT: For complex navigation, write out the playing order BEFORE you start. Example for D.S. al Coda:\n1. Play from start to "To Coda"\n2. Go back to 𝄋 sign\n3. Play from 𝄋 to "To Coda" again\n4. Jump to 𝄌 (coda)\n5. Play to the end\n\nWrite it as: "A-B-A-C" where A=start to "To Coda", B=𝄋 to "To Coda", C=coda'
      },
      {
        heading: '🎯 Coda Sections: The Bonus Level',
        content: 'A coda is like a bonus level at the end of a video game - it\'s a separate section that wraps up the piece!\n\n**What is a Coda?**\n- A separate ending section\n- Usually at the end of the piece\n- Marked with the coda symbol: 𝄌 (looks like a target or crosshairs)\n- Often contains the final cadence and conclusion\n\n**How to Find the Coda:**\n1. Look for the 𝄌 symbol (the "target")\n2. It\'s usually near the end of the piece\n3. There might be multiple 𝄌 symbols\n4. The final 𝄌 is the actual coda\n\n**How to Navigate to the Coda:**\n1. Play until you see "To Coda" or "al Coda"\n2. This tells you to jump to the coda\n3. Find the 𝄌 symbol\n4. Jump directly to that spot\n5. Play from there to the end\n\n**Why Codas?**\n- Creates a dramatic ending\n- Provides contrast to the main section\n- Gives the piece a sense of conclusion\n- Very common in classical and jazz music',
        example: '🎬 THE MOVIE ENDING: Think of a coda like the ending of a movie. The main story is over, but there\'s one final scene that wraps everything up. The coda is that final scene - it brings closure to the musical story!',
        tip: '🎯 CODA HUNTING: When you first look at a piece of music, find all the 𝄌 symbols. Circle them. Then look for "To Coda" instructions. Map out your path BEFORE you start playing. This prevents getting lost!'
      },
      {
        heading: '🗺️ Putting It All Together: Reading the Musical Map',
        content: 'Now you know all the navigation signs! Here\'s how to read the musical map like a pro:\n\n**The Navigation Checklist:**\nBefore you start playing ANY piece, scan for:\n1. ✅ Repeat signs (:| and |:)\n2. ✅ First and second endings (1. and 2.)\n3. ✅ D.C. or D.S. instructions\n4. ✅ "Fine" markings\n5. ✅ "To Coda" instructions\n6. ✅ 𝄌 coda symbols\n\n**Creating Your Map:**\nWrite out the playing order in plain English:\n- "Play measures 1-8, repeat, play 1-7, skip to second ending 8-10"\n- "Play from start to \'To Coda\', go back to 𝄋, play to \'To Coda\' again, jump to 𝄌"\n- Use letters: A-B-A-C where each letter represents a section\n\n**Common Navigation Patterns:**\n- Simple repeat: A-A (play section twice)\n- First/second endings: A-B-A-C (play A, then B, repeat A, skip to C)\n- D.C. al Fine: A-B-A (play A-B, go back to start, play A until Fine)\n- D.S. al Coda: A-B-C-D-B-D (play A-B-C until "To Coda", go back to 𝄋 at B, play B-C until "To Coda", jump to D)\n\n**The Ultimate Goal:**\nTo look at any piece of music and instantly understand the navigation, just like reading a map!',
        example: '🗺️ THE TREASURE MAP: Think of navigation signs like a treasure map. The X marks the spot (the coda), the dotted line shows the path (repeats), and the instructions tell you how to get there (D.C., D.S., etc.). Follow the map and you\'ll find the musical treasure!',
        tip: '🎯 PRACTICE NAVIGATION: Find 3-5 pieces of music with different navigation signs. For each one:\n1. Scan for all navigation signs\n2. Write out the playing order\n3. Play through following your map\n4. Check if you got it right\n\nThe more you practice, the easier it becomes!'
      }
    ],
    keyPoints: [
      '🔁 Repeat signs (:| and |:): play section again',
      '🎭 First/second endings (1. and 2.): different paths on repeat',
      '🇮🇹 D.C. (Da Capo) = go back to BEGINNING',
      '🇮🇹 D.S. (Dal Segno) = go back to 𝄋 SIGN',
      '🏁 al Fine = play until you see "Fine" (the end)',
      '🎯 al Coda = jump to 𝄌 coda section',
      '🗺️ Always scan for navigation signs BEFORE playing'
    ],
    practiceInstructions: '🎮 NAVIGATION MASTERY CHALLENGE:\n\n**Day 1: Repeat Signs**\n- Find 3 pieces with simple repeat signs\n- For each one, write out the playing order\n- Play through following your map\n- Check if you got it right\n\n**Day 2: First and Second Endings**\n- Find 3 pieces with first/second endings\n- Map out the playing order\n- Pay attention to where you skip the first ending\n- Practice the transitions\n\n**Day 3: D.C. and D.S.**\n- Find pieces with D.C. al Fine\n- Find pieces with D.S. al Fine\n- Write out the complete playing order\n- Practice navigating through the piece\n\n**Day 4: Coda Navigation**\n- Find pieces with "To Coda" instructions\n- Locate all the 𝄌 symbols\n- Practice jumping to the coda\n- Play through to the end\n\n**Day 5: The Ultimate Challenge**\n- Find a piece with MULTIPLE navigation signs\n- Map out the COMPLETE playing order\n- Write it in plain English\n- Play through without getting lost\n- Congratulations - you\'re a navigation master!\n\n🏆 NAVIGATION MASTER BADGE: When you can look at any piece of music and instantly understand all the navigation signs, you earn your Navigation Master badge! You can now read the musical map like a pro! 🗺️✨'
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

// ============================================================
// CLARINET LESSONS
// ============================================================

export const CLARINET_LESSON_CONTENT: Record<string, LessonContent> = {
  'clarinet-intro': {
    title: 'Meet Your Clarinet',
    introduction: 'The clarinet is a woodwind instrument with a beautiful, rich tone. It was invented around 1700 and has been a vital part of orchestras, bands, and jazz ensembles ever since.',
    sections: [
      {
        heading: 'Main Parts of the Clarinet',
        content: 'Your clarinet has five main parts:\n\n1. Mouthpiece - The part you blow into. It has a single reed attached that vibrates to create sound.\n\n2. Barrel - The short piece that connects the mouthpiece to the upper joint. It helps with tuning.\n\n3. Upper Joint - The top section with keys operated by your left hand.\n\n4. Lower Joint - The bottom section with keys operated by your right hand.\n\n5. Bell - The flared end at the bottom where sound comes out.',
        example: 'Think of the clarinet like a tube with keys. Air goes in the mouthpiece, travels through the joints, and comes out the bell.',
        tip: 'Always handle your clarinet by the body, never by the keys. The keys are delicate and bend easily!'
      },
      {
        heading: 'The Reed and Mouthpiece',
        content: 'The reed is a thin piece of cane that vibrates when air passes over it. This vibration creates the sound.\n\nThe mouthpiece has:\n- A flat surface where the reed sits\n- An opening (window) where air flows through\n- A tip where you place your top teeth\n- A ligature that holds the reed in place',
        tip: 'Clarinet reeds are smaller and more delicate than saxophone reeds. Handle them carefully!'
      },
      {
        heading: 'Clarinet vs Saxophone',
        content: 'If you\'ve played saxophone, clarinet has some differences:\n\n- Smaller mouthpiece and reed\n- Held at 45-degree angle (not vertical)\n- Three registers instead of two\n- Overblows at the 12th (not octave)\n- More complex fingerings\n- Requires firmer embouchure\n- Needs faster, more focused air',
        tip: 'Don\'t try to play clarinet like saxophone! The techniques are different.'
      }
    ],
    keyPoints: [
      'Five main parts: mouthpiece, barrel, upper joint, lower joint, bell',
      'The reed vibrates to create sound',
      'Handle by the body, never the keys',
      'Clarinet reeds are smaller and more delicate',
      'Clarinet technique is different from saxophone'
    ],
    practiceInstructions: 'Identify each part on your clarinet. Practice assembling and disassembling your instrument carefully. Remember: always handle by the body, never the keys! Compare your clarinet to a saxophone if you\'ve played one - notice the differences.'
  },

  'clarinet-embouchure': {
    title: 'Clarinet Embouchure',
    introduction: 'The clarinet embouchure is different from saxophone. It requires a firmer, more focused approach with the corners of the mouth drawn forward.',
    sections: [
      {
        heading: 'The Milkshake Face',
        content: 'The best way to learn clarinet embouchure is the "milkshake face":\n\n1. Imagine drinking a thick milkshake through a coffee straw\n2. Your corners draw forward and firm up\n3. Your chin flattens and points down\n4. Your lips seal around the straw\n\nThis is exactly what your embouchure should look like!',
        example: 'Practice making the milkshake face without the instrument. Look in a mirror. Are your corners forward? Is your chin flat? Hold the position for 30 seconds.',
        tip: 'The milkshake analogy works because it naturally creates the right embouchure shape without you having to think about individual muscles.'
      },
      {
        heading: 'Detailed Embouchure Formation',
        content: 'Step-by-step embouchure formation:\n\n1. Draw corners of mouth forward and firm (like saying "M")\n2. Roll bottom lip slightly over bottom teeth (just enough to cushion the reed)\n3. Place top teeth on mouthpiece (about 1/3 from the tip)\n4. Close mouth around mouthpiece, maintaining the milkshake shape\n5. Chin should be flat and pointed down\n6. No air should escape from corners of mouth',
        tip: 'Your embouchure should feel firm but not tense. If it hurts, you\'re doing it wrong!'
      },
      {
        heading: 'Common Embouchure Problems',
        content: 'Watch out for these mistakes:\n\n- Corners pulling back (causes thin, nasal tone)\n- Bottom lip too far over teeth (muffles sound)\n- Bottom lip not far enough (causes squeaking)\n- Biting too hard (restricts reed vibration)\n- Chin bunched up (causes stuffy tone)\n- Jaw clenched (restricts tone production)',
        tip: 'Use a mirror when practicing! Check your embouchure constantly.'
      }
    ],
    keyPoints: [
      'Milkshake face: corners forward, chin flat',
      'Bottom lip rolled slightly over teeth',
      'Top teeth on mouthpiece (1/3 from tip)',
      'No air escaping from corners',
      'Firm but not tense',
      'Use a mirror to check your embouchure'
    ],
    practiceInstructions: 'Practice the milkshake face for 2 minutes without the instrument. Then practice with just the mouthpiece and barrel, focusing on maintaining the embouchure while producing a steady tone. Do this for 5 minutes daily. Your embouchure muscles will get tired - that\'s normal! They\'ll get stronger with practice.'
  },

  'clarinet-breathing': {
    title: 'Clarinet Breathing and Air Support',
    introduction: 'Clarinet requires focused, fast air support. The smaller mouthpiece requires more air pressure than saxophone.',
    sections: [
      {
        heading: 'Diaphragmatic Breathing',
        content: 'Clarinet players use diaphragmatic breathing (belly breathing):\n\n1. Keep shoulders relaxed and down\n2. Breathe in through your mouth\n3. Your belly should expand outward\n4. Your chest should barely move\n5. Fill your lungs completely from bottom to top',
        example: 'Lie down on your back and put a book on your belly. When you breathe in, the book should rise. When you breathe out, it should fall. That\'s diaphragmatic breathing!',
        tip: 'Practice breathing exercises without your instrument first. Master the breathing technique before adding the clarinet.'
      },
      {
        heading: 'Focused Air Stream',
        content: 'Clarinet requires fast, focused air:\n\n- Think of blowing through a coffee stirrer (small straw)\n- Air should be fast and concentrated\n- Use abdominal muscles to control air stream\n- Maintain consistent air pressure throughout phrase\n- Keep throat open and relaxed',
        example: 'Imagine blowing a piece of paper across the room. You need fast, focused air, not a gentle puff.',
        tip: 'The clarinet needs more air pressure than saxophone because of the smaller mouthpiece and reed.'
      },
      {
        heading: 'Air Support Exercises',
        content: 'Practice these breathing exercises daily:\n\n1. Coffee stirrer exercise: Blow through a small straw for as long as possible\n2. Hissing exercise: Take a deep breath, hiss "ssss" for as long as possible (aim for 20+ seconds)\n3. Pulse exercise: Take a breath, pulse the air "ha-ha-ha-ha" while keeping support',
        tip: 'Do breathing exercises for 5 minutes every day. This will dramatically improve your clarinet playing.'
      }
    ],
    keyPoints: [
      'Breathe from diaphragm, not chest',
      'Belly expands, shoulders stay down',
      'Use fast, focused air (like blowing through small straw)',
      'Abdominal muscles control air stream',
      'Practice breathing exercises daily'
    ],
    practiceInstructions: 'Practice breathing exercises: 1) Blow through coffee stirrer for 20 seconds, 2) Hiss "ssss" for 20 seconds, 3) Play long tones on clarinet, focusing on fast, supported air. Do this routine for 5 minutes every day.'
  },

  'clarinet-first-sound': {
    title: 'Producing Your First Sound on Clarinet',
    introduction: 'The clarinet requires a different approach than saxophone for producing the first sound. The smaller reed requires more focused air and precise embouchure.',
    sections: [
      {
        heading: 'Starting with Mouthpiece and Barrel',
        content: 'Before assembling the full clarinet, practice with just the mouthpiece and barrel:\n\n1. Form your milkshake embouchure\n2. Place mouthpiece in mouth - top teeth on mouthpiece, bottom lip cushioning reed\n3. About 1/3 of mouthpiece should be inside your mouth\n4. Take a deep breath from your diaphragm\n5. Blow fast, focused air through the mouthpiece\n6. Keep throat open and relaxed\n\nThe mouthpiece/barrel should produce a concert F# (written G).',
        tip: 'If you can\'t produce a sound on the mouthpiece alone, you\'re not ready to assemble the full clarinet yet. Practice with just the mouthpiece until you can produce a steady tone.'
      },
      {
        heading: 'Assembling and Playing First Notes',
        content: 'Once you can produce a sound on the mouthpiece:\n\n1. Assemble the full clarinet carefully\n2. Form your embouchure\n3. Place mouthpiece in mouth (1/3 in)\n4. Blow fast, focused air\n5. Start with written G (concert F#) - it\'s the easiest note\n6. Hold for 4 beats with steady tone\n7. Rest, repeat 5 times',
        tip: 'If the note squeaks, check: 1) Embouchure (corners forward?), 2) Air (fast enough?), 3) Mouthpiece position (1/3 in?), 4) Reed (wet and not damaged?)'
      },
      {
        heading: 'Common First Sound Problems',
        content: 'If you can\'t produce a sound:\n\n- No sound at all: Not enough air pressure or embouchure too loose\n- Airy sound: Embouchure not sealed, air escaping from corners\n- Squeaking: Embouchure too loose, not enough air, or reed problem\n- Stuff sound: Too much mouthpiece in mouth or embouchure too tight\n- Thin sound: Corners pulling back, not enough air support',
        tip: 'Most problems are caused by insufficient air support or incorrect embouchure. Focus on fast air and milkshake face!'
      }
    ],
    keyPoints: [
      'Start with mouthpiece and barrel only',
      'Milkshake embouchure: corners forward, chin flat',
      '1/3 of mouthpiece in mouth',
      'Fast, focused air (like blowing through small straw)',
      'Start with written G (concert F#)',
      'Most problems = insufficient air or incorrect embouchure'
    ],
    practiceInstructions: 'Practice with mouthpiece and barrel: Produce a steady tone for 10 seconds, rest, repeat 5 times. Then assemble full clarinet. Play written G for 4 beats, rest 4 beats, repeat 5 times. Focus on clear, steady tone. Do this for 5 minutes daily.'
  },

  'clarinet-notes': {
    title: 'Your First Notes: E, D, C',
    introduction: 'Let\'s learn your first three notes on the clarinet: E, D, and C. These are played with your right hand.',
    sections: [
      {
        heading: 'Right Hand Position',
        content: 'Your right hand plays the bottom keys on the clarinet:\n\n- Thumb: Supports the clarinet from underneath\n- Index finger: Plays E\n- Middle finger: Plays D\n- Ring finger: Plays C\n- Pinky: Operates side keys\n\nCurve your fingers like holding a baseball. Use the pads of your fingers, not the tips.',
        example: 'Hold your right hand out in front of you. Curve your fingers naturally - this is the shape they should be on the clarinet.',
        tip: 'Keep your fingers close to the keys even when not pressing them. This makes playing faster and more accurate.'
      },
      {
        heading: 'Playing E',
        content: 'To play written E:\n\n1. Form your embouchure\n2. Press down the first key with your right index finger\n3. Blow steady, focused air\n4. Keep all other fingers up\n\nE is one of the easiest notes on clarinet.',
        tip: 'Make sure you\'re pressing the key down completely. If the sound is airy or squeaky, check that your finger is covering the key fully.'
      },
      {
        heading: 'Playing D',
        content: 'To play written D:\n\n1. Keep your index finger down on E\n2. Add your middle finger on the second key\n3. Blow steady air\n\nD is played with two fingers down: index and middle.',
        tip: 'Move your fingers smoothly from E to D. Don\'t lift your fingers high - keep them close to the keys.'
      },
      {
        heading: 'Playing C',
        content: 'To play written C:\n\n1. Keep index and middle fingers down\n2. Add your ring finger on the third key\n3. Blow steady air\n\nC is played with all three right-hand fingers down.',
        tip: 'Practice moving between E-D-C-D-E smoothly. Think of it as a wave: down, down, down, up, up.'
      }
    ],
    keyPoints: [
      'Right hand: index=E, middle=D, ring=C',
      'Curve fingers like holding a baseball',
      'Keep fingers close to keys',
      'Press keys completely down',
      'Use steady, focused air'
    ],
    practiceInstructions: 'Practice each note separately: play E for 4 beats, D for 4 beats, C for 4 beats. Then play the pattern E-D-C-D-E five times slowly. Focus on smooth finger movement and steady tone.'
  },

  'clarinet-register': {
    title: 'The Register Key and Clarion Register',
    introduction: 'The clarinet has a special key called the register key (or speaker key) that allows you to play in the higher register. This is unique to the clarinet.',
    sections: [
      {
        heading: 'The Register Key',
        content: 'The register key is operated by your left thumb:\n\n- It\'s the key on the back of the upper joint\n- Press it with the side of your thumb (not the pad)\n- It raises the pitch by a 12th (octave + 5th)\n- Unlike saxophone octave key, clarinet overblows at the 12th',
        example: 'Written G (low) becomes written D (high) when you add the register key. That\'s a 12th interval!',
        tip: 'The register key requires precise thumb movement. Practice pressing and releasing it smoothly.'
      },
      {
        heading: 'Clarion Register Notes',
        content: 'When you add the register key to your low notes, you get clarion register notes:\n\n- Low E + register key = High B\n- Low D + register key = High A\n- Low C + register key = High G\n\nThese notes are in the middle register of the clarinet.',
        tip: 'The clarion register requires more focused air and firmer embouchure than the chalumeau (low) register.'
      },
      {
        heading: 'Practicing Register Transitions',
        content: 'Practice smooth transitions between registers:\n\n1. Play low E for 4 beats\n2. Add register key, play high B for 4 beats\n3. Remove register key, return to low E\n4. Repeat with D to A, C to G\n\nFocus on smooth, seamless transitions.',
        tip: 'If the high note doesn\'t speak, check: 1) Register key fully pressed, 2) Air support increased, 3) Embouchure firmer.'
      }
    ],
    keyPoints: [
      'Register key operated by left thumb (side motion)',
      'Raises pitch by a 12th (octave + 5th)',
      'Low E becomes high B with register key',
      'Requires more focused air and firmer embouchure',
      'Practice smooth register transitions'
    ],
    practiceInstructions: 'Practice register transitions: 1) Low E to high B (4 beats each), 2) Low D to high A (4 beats each), 3) Low C to high G (4 beats each). Repeat each transition 5 times. Focus on smooth, seamless transitions with consistent tone quality.'
  }
};

/**
 * Get clarinet lesson content by ID
 */
export const getClarinetLessonContent = (lessonId: string): LessonContent | null => {
  return CLARINET_LESSON_CONTENT[lessonId] || null;
};
