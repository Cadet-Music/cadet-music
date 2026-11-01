import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getAudioManager } from '../audioManager';
import WaveformVisualizer from './WaveformVisualizer';
import {
  analyzeLongTone,
  analyzeArticulation,
  realtimeCoaching,
  cardsForObservation,
  LongToneReport,
  ArticulationReport,
  Sample,
} from '../coach';

interface ToneCoachProps {
  /**
   * 'long-tone'  -> sustain one note; coach listens for embouchure problems
   *                 (biting/sharp, loose/flat, unstable pitch, late bloom).
   * 'articulation' -> tongue repeated notes; coach listens for clunky attacks
   *                   and gives the "tongue tip to reed tip" correction.
   */
  mode: 'long-tone' | 'articulation';
  targetNote?: string;      // e.g. "G" — shown as guidance only
  exerciseName: string;
  onComplete?: (score: number) => void;
}

const TAKE_MS = 10000; // 10-second diagnostic take

/** Render one coach observation with its linked fundamentals teaching cards. */
function ObservationBlock({ id, sound, physicalCause, correction, severity }: {
  id: string; sound: string; physicalCause: string; correction: string;
  severity: 'praise' | 'tip' | 'watch';
}) {
  const cards = cardsForObservation(id);
  const tone =
    severity === 'praise'
      ? 'border-[#3a8a5c] bg-[#3a8a5c]/10'
      : severity === 'watch'
        ? 'border-[#c44536] bg-[#c44536]/10'
        : 'border-[#c9a84c] bg-[#c9a84c]/10';
  const icon = severity === 'praise' ? '🌟' : severity === 'watch' ? '🔎' : '💡';

  return (
    <div className={`rounded-lg border ${tone} p-4 mb-3`} role="status">
      <p className="font-semibold text-[#1a2332] dark:text-white mb-1">
        {icon} {sound}
      </p>
      <p className="text-sm text-[#5a6577] dark:text-[#9aa3b0] mb-1">
        <span className="font-medium">What this usually means:</span> {physicalCause}
      </p>
      <p className="text-sm text-[#1a2332] dark:text-white">
        <span className="font-medium">Try this:</span> {correction}
      </p>
      {cards.length > 0 && (
        <div className="mt-3 space-y-2">
          {cards.map((c, i) => (
            <div key={i} className="text-xs bg-white/60 dark:bg-black/20 rounded p-2 border border-[#e2e4e8] dark:border-[#2a3545]">
              <p className="font-medium uppercase tracking-wide text-[10px] text-[#5a6577] dark:text-[#9aa3b0] mb-1">
                Fundamentals · {c.conceptId.replace('-', ' ')}
              </p>
              <p className="text-[#5a6577] dark:text-[#9aa3b0]"><b>Listen for:</b> {c.listenFor}</p>
              <p className="text-[#5a6577] dark:text-[#9aa3b0]"><b>Technique:</b> {c.meaning}</p>
              <p className="text-[#1a2332] dark:text-white"><b>Fix:</b> {c.fix}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ToneCoach({ mode, targetNote, exerciseName, onComplete }: ToneCoachProps) {
  const audioManager = getAudioManager();
  const [isMicReady, setIsMicReady] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [liveMessage, setLiveMessage] = useState<string | null>(null);
  const [longToneReport, setLongToneReport] = useState<LongToneReport | null>(null);
  const [artReport, setArtReport] = useState<ArticulationReport | null>(null);

  const recentSamples: Sample[] = [];

  useEffect(() => {
    let mounted = true;
    const setup = async () => {
      const ok = await audioManager.requestMicrophoneAccess();
      if (mounted) setIsMicReady(ok);
    };
    setup();

    audioManager.setOnMetrics((m) => {
      const s: Sample = { rms: m.rms, frequency: m.frequency, cents: m.cents, tMs: Date.now() };
      recentSamples.push(s);
      if (recentSamples.length > 40) recentSamples.shift();
      if (audioManager.isRecordingTake()) {
        setLiveMessage(realtimeCoaching(s, recentSamples));
      }
    });

    return () => {
      mounted = false;
      audioManager.stopRecordingTake();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Countdown timer while recording
  useEffect(() => {
    if (!isRecording) return;
    const iv = setInterval(() => {
      const el = audioManager.getTakeElapsedMs();
      setElapsedMs(el);
      if (el >= TAKE_MS) finishTake();
    }, 200);
    return () => clearInterval(iv);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRecording]);

  const startTake = async () => {
    if (!audioManager.isSupported()) {
      setLiveMessage('Your browser does not support microphone access.');
      return;
    }
    if (!isMicReady) {
      const ok = await audioManager.requestMicrophoneAccess();
      if (!ok) {
        setLiveMessage('Microphone access is needed for the coach to hear you. Allow it and try again.');
        return;
      }
      setIsMicReady(true);
    }
    if (audioManager.getState() === 'listening') audioManager.stopListening();
    audioManager.startListening();
    setLongToneReport(null);
    setArtReport(null);
    setLiveMessage(null);
    setElapsedMs(0);
    audioManager.startRecordingTake(TAKE_MS);
    setIsRecording(true);
  };

  const finishTake = () => {
    audioManager.stopRecordingTake();
    const samples = audioManager.collectTake().map((s, _i) => ({ ...s, tMs: s.tMs }));
    audioManager.stopListening();
    setIsRecording(false);
    setLiveMessage(null);
    if (mode === 'long-tone') {
      const report = analyzeLongTone(samples);
      setLongToneReport(report);
      if (report.score >= 70) onComplete?.(report.score);
    } else {
      const report = analyzeArticulation(samples);
      setArtReport(report);
      if (report.score >= 70) onComplete?.(report.score);
    }
  };

  const secondsLeft = Math.max(0, Math.ceil((TAKE_MS - elapsedMs) / 1000));
  const report = mode === 'long-tone' ? longToneReport : artReport;
  const score = report ? report.score : null;

  return (
    <div className="bg-white dark:bg-[#1a2332] rounded-lg p-6 border border-[#c8c8c8] dark:border-[#2a3545]">
      <h3 className="text-lg font-bold text-[#1a2332] dark:text-white mb-1">
        🎓 Tone Coach — {exerciseName}
      </h3>
      <p className="text-sm text-[#5a6577] dark:text-[#9aa3b0] mb-4">
        {mode === 'long-tone'
          ? `Play one long, steady tone${targetNote ? ` on ${targetNote}` : ''} for about 10 seconds. The coach listens like a private instructor would — for biting, air support, and pitch steadiness — then tells you exactly what to adjust.`
          : `Tongue repeated even notes ("TA — TA — TA")${targetNote ? ` on ${targetNote}` : ''} for about 10 seconds. The coach listens for clean attacks where the tongue tip touches the tip of the reed.`}
      </p>

      {!isMicReady && (
        <p className="text-xs text-[#c44536] mb-3">
          ⚠️ Microphone access required. Press the button below and allow the mic.
        </p>
      )}

      {/* Live coaching strip */}
      {isRecording && (
        <div className="mb-4" role="status" aria-live="polite">
          <WaveformVisualizer audioManager={audioManager} isActive height={64} />
          <div className="flex items-center justify-between mt-2">
            <span className="text-sm font-medium text-[#3a8a5c]">
              🔴 Listening… {secondsLeft}s left
            </span>
            <span className="text-xs text-[#5a6577] dark:text-[#9aa3b0] italic max-w-[60%] text-right">
              {liveMessage ?? 'Keep the air moving...'}
            </span>
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="flex gap-3 mb-4">
        {!isRecording ? (
          <motion.button
            onClick={startTake}
            whileTap={{ scale: 0.95 }}
            className="flex-1 btn-primary"
          >
            🎤 {report ? 'Try Again' : 'Record a Take'}
          </motion.button>
        ) : (
          <motion.button
            onClick={finishTake}
            whileTap={{ scale: 0.95 }}
            className="flex-1 btn-secondary"
          >
            ⏹ Stop & Get Feedback
          </motion.button>
        )}
      </div>

      {/* Error-only message when not recording and no report yet */}
      {!isRecording && !report && liveMessage && (
        <p className="text-sm text-[#c44536] mb-3">{liveMessage}</p>
      )}

      {/* Report */}
      {report && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-3">
            <div
              className={`text-2xl font-bold ${
                (score ?? 0) >= 80 ? 'text-[#3a8a5c]' : (score ?? 0) >= 60 ? 'text-[#c9a84c]' : 'text-[#c44536]'
              }`}
            >
              {score}
            </div>
            <div className="text-sm text-[#5a6577] dark:text-[#9aa3b0]">
              Coach score out of 100 — {mode === 'long-tone' ? 'tone & embouchure check' : 'articulation check'}
            </div>
          </div>

          {'observations' in report && report.observations.map(o => (
            <ObservationBlock key={o.id} {...o} />
          ))}

          {mode === 'long-tone' && longToneReport && (
            <p className="text-xs text-[#5a6577] dark:text-[#9aa3b0] mt-2">
              Details: avg pitch offset {longToneReport.averageCents ?? '—'}¢ · swing {longToneReport.centSwing ?? '—'}¢ · sounded {(longToneReport.soundingMs / 1000).toFixed(1)}s
            </p>
          )}
          {mode === 'articulation' && artReport && (
            <p className="text-xs text-[#5a6577] dark:text-[#9aa3b0] mt-2">
              Details: {artReport.attempts} tongued notes detected · {artReport.clearAttacks} crisp attacks · avg attack rise {artReport.avgRiseMs ?? '—'}ms
            </p>
          )}

          {(score ?? 0) >= 70 && (
            <div className="mt-3 text-center p-3 bg-[#3a8a5c]/10 border border-[#3a8a5c] rounded-lg text-sm text-[#3a8a5c] font-semibold">
              ✅ Great playing — that passes the coach's ear!
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
