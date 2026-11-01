import { useState } from 'react';
import { useStore } from '../store';
import ToneCoach from './ToneCoach';
import Footer from './Footer';

/**
 * Tone Coach View — "practice like you're with a private instructor"
 *
 * Gives cadets two listening drills that target the fundamentals most
 * beginners get wrong and only a good ear can catch:
 *
 * 1. Long Tone check   → detects biting (sharp pitch), loose embouchure
 *                        (flat/airy tone), unstable jaw, late blooming.
 * 2. Tonguing check    → detects clunky articulation — notes not started
 *                        with the tongue TIP at the reed TIP.
 *
 * Feedback is written the way a tutor speaks: what they HEARD, what it
 * probably MEANS physically, and what to TRY next — with teaching cards
 * drawn from the saxophone/clarinet fundamentals curriculum.
 */

type TabId = 'long-tone' | 'articulation';

export default function ToneCoachView() {
  const { setCurrentView } = useStore();
  const [tab, setTab] = useState<TabId>('long-tone');

  return (
    <div className="min-h-screen pb-20">
      <header className="max-w-4xl mx-auto px-4 pt-6 pb-2 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-text-primary">🎓 Tone Coach</h1>
        <button onClick={() => setCurrentView('dashboard')} className="btn-secondary">
          ← Dashboard
        </button>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-4">
        <p className="text-sm text-text-secondary mb-4">
          Your instrument talks through its sound. This coach listens the way a private
          instructor does — for biting, airy tone, wobbling pitch, and clunky tonguing —
          then tells you exactly what your mouth, tongue, and air should do differently.
          Grab your instrument; each take is about 10 seconds.
        </p>

        {/* Tab switcher */}
        <div className="flex gap-2 mb-5">
          <button
            onClick={() => setTab('long-tone')}
            className={`px-4 py-2 rounded-lg font-semibold text-sm ${
              tab === 'long-tone'
                ? 'bg-[#3a8a5c] text-white'
                : 'bg-[#e2e4e8] dark:bg-[#2a3545] text-[#5a6577] dark:text-[#9aa3b0]'
            }`}
          >
            🎵 Long Tone Check (Embouchure & Air)
          </button>
          <button
            onClick={() => setTab('articulation')}
            className={`px-4 py-2 rounded-lg font-semibold text-sm ${
              tab === 'articulation'
                ? 'bg-[#c9a84c] text-[#1a2332]'
                : 'bg-[#e2e4e8] dark:bg-[#2a3545] text-[#5a6577] dark:text-[#9aa3b0]'
            }`}
          >
            👅 Tonguing Check (Articulation)
          </button>
        </div>

        {tab === 'long-tone' ? (
          <ToneCoach
            key="lt"
            mode="long-tone"
            targetNote="G"
            exerciseName="Long Tones — the #1 fundamental exercise"
          />
        ) : (
          <ToneCoach
            key="at"
            mode="articulation"
            targetNote="G"
            exerciseName="Single Tonguing — TA, TA, TA on one note"
          />
        )}

        {/* Fundamentals quick-reference */}
        <div className="mt-6 grid md:grid-cols-2 gap-4">
          <div className="card">
            <h3 className="font-bold text-text-primary mb-2">🧠 Embouchure Checklist</h3>
            <ul className="text-sm text-text-secondary space-y-1 list-disc ml-4">
              <li>Upper teeth <b>rest on top</b> of the mouthpiece — anchoring, never clamping.</li>
              <li>Bottom lip curled over bottom teeth — a cushion for the reed.</li>
              <li>Corners sealed and firm; chin flat and relaxed.</li>
              <li>If the tuner says <b>sharp</b>, you are probably biting. If <b>flat/airy</b>, seal tighter and speed up the air.</li>
            </ul>
          </div>
          <div className="card">
            <h3 className="font-bold text-text-primary mb-2">👅 Articulation Checklist</h3>
            <ul className="text-sm text-text-secondary space-y-1 list-disc ml-4">
              <li>Tongue <b>tip</b> touches the <b>tip</b> of the reed — not the middle.</li>
              <li>Say "TA" or "TU" — the tongue interrupts air briefly; the stream keeps flowing behind it.</li>
              <li>Jaw stays perfectly still while tonguing.</li>
              <li>Every note starts identically crisp — no blurred or swallowed attacks.</li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
