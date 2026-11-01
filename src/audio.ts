/**
 * Microphone and Pitch Detection System
 * 
 * Architecture for real-time audio analysis and pitch detection.
 * Uses Web Audio API for browser-based audio processing.
 * 
 * Capabilities:
 * - Note detection
 * - Pitch recognition
 * - Scale verification
 * - Rhythm practice
 * - Song practice
 */

// ============================================================
// AUDIO CONTEXT SETUP
// ============================================================

/**
 * Audio analyzer configuration
 */
export interface AudioConfig {
  sampleRate: number;
  bufferSize: number;
  fftSize: number;
  minPitch: number; // Hz
  maxPitch: number; // Hz
}

export const DEFAULT_AUDIO_CONFIG: AudioConfig = {
  sampleRate: 44100,
  bufferSize: 2048,
  fftSize: 2048,
  minPitch: 100, // ~G2
  maxPitch: 2000, // ~G6
};

// ============================================================
// PITCH DETECTION ALGORITHMS
// ============================================================

/**
 * Note frequency map (A4 = 440Hz standard)
 */
export const NOTE_FREQUENCIES: Record<string, number> = {
  'C3': 130.81, 'C#3': 138.59, 'D3': 146.83, 'D#3': 155.56,
  'E3': 164.81, 'F3': 174.61, 'F#3': 185.00, 'G3': 196.00,
  'G#3': 207.65, 'A3': 220.00, 'A#3': 233.08, 'B3': 246.94,
  'C4': 261.63, 'C#4': 277.18, 'D4': 293.66, 'D#4': 311.13,
  'E4': 329.63, 'F4': 349.23, 'F#4': 369.99, 'G4': 392.00,
  'G#4': 415.30, 'A4': 440.00, 'A#4': 466.16, 'B4': 493.88,
  'C5': 523.25, 'C#5': 554.37, 'D5': 587.33, 'D#5': 622.25,
  'E5': 659.25, 'F5': 698.46, 'F#5': 739.99, 'G5': 783.99,
  'G#5': 830.61, 'A5': 880.00, 'A#5': 932.33, 'B5': 987.77,
};

/**
 * Pitch detection result
 */
export interface PitchResult {
  frequency: number;
  note: string;
  octave: number;
  cents: number; // Deviation from perfect pitch (-50 to +50)
  confidence: number; // 0-1
}

/**
 * Autocorrelation-based pitch detection
 * More accurate for monophonic instruments like saxophone
 */
export function detectPitchAutocorrelation(
  buffer: Float32Array<ArrayBufferLike>,
  sampleRate: number
): PitchResult | null {
  const SIZE = buffer.length;
  const MAX_SAMPLES = Math.floor(SIZE / 2);

  let bestOffset = -1;
  let bestCorrelation = 0;
  let foundGoodCorrelation = false;

  // Find the first point where the signal crosses zero going up
  let start = 0;
  for (let i = 0; i < SIZE - 1; i++) {
    if (buffer[i] <= 0 && buffer[i + 1] > 0) {
      start = i;
      break;
    }
  }

  // Guard: need at least one usable correlation window after `start`.
  // (Previously required start + 2*MAX_SAMPLES < SIZE, which rejected any
  // buffer shorter than ~0.5 s even when a full period was present.)
  const MIN_WINDOW = 64;
  if (start + MIN_WINDOW >= SIZE) return null;

  // Autocorrelation via mean-normalized absolute difference (the classic
  // ACF algorithm): correlation = 1 - (sum |x[i] - x[i+lag]| / N) / amp,
  // where amp is the signal's average peak amplitude. For a periodic
  // waveform this peaks at r ≈ 1 when lag equals one period.
  //
  // DEFECT FIX (Oct 2026, documented by src/tests/techniqueCoach.test.ts
  // TEST 1): the lag search previously started at offset 0, where the
  // difference is identically zero, so correlation = 1.0 always won and
  // frequency = sampleRate / 0 = Infinity. The search now starts at
  // MIN_LAG. It also stops at MAX_LAG (≈ 55 Hz) instead of SIZE/2: for
  // buffers shorter than two periods of the target pitch, comparing half
  // the buffer against a shifted copy of itself would compare mostly
  // out-of-window samples and never cross the threshold.
  const MIN_LAG = Math.max(2, Math.round(sampleRate / 4000)); // cap ~ 4 kHz
  const MAX_LAG = Math.min(MAX_SAMPLES, Math.round(sampleRate / 55)); // ~55 Hz floor

  // Correlation window: as long as possible while still fitting in the
  // buffer for every candidate lag (window + maxLag must fit past `start`).
  const available = SIZE - start - MAX_LAG;
  const WINDOW = Math.max(MIN_WINDOW, Math.min(MAX_LAG, available));

  // Mean absolute amplitude — normalizes correlation for any gain level.
  let ampSum = 0;
  for (let i = start; i < start + WINDOW; i++) {
    ampSum += Math.abs(buffer[i]);
  }
  const amplitude = ampSum / WINDOW;
  if (amplitude <= 0) return null; // pure silence — no pitch to report

  // Calculate autocorrelation over plausible lags only
  for (let offset = MIN_LAG; offset < MAX_LAG; offset++) {
    let diffSum = 0;

    for (let i = 0; i < WINDOW; i++) {
      diffSum += Math.abs(buffer[start + i] - buffer[start + i + offset]);
    }

    const correlation = 1 - diffSum / WINDOW / amplitude;

    if (correlation > 0.8 && correlation > bestCorrelation) {
      bestCorrelation = correlation;
      bestOffset = offset;
      foundGoodCorrelation = true;
    } else if (foundGoodCorrelation && correlation < bestCorrelation - 0.1) {
      break;
    }
  }

  if (!foundGoodCorrelation) return null;

  const frequency = sampleRate / bestOffset;

  // Convert frequency to note
  const noteInfo = frequencyToNote(frequency);

  return {
    frequency,
    note: noteInfo.note,
    octave: noteInfo.octave,
    cents: noteInfo.cents,
    confidence: bestCorrelation,
  };
}

/**
 * Convert frequency to note name and octave
 */
export function frequencyToNote(frequency: number): {
  note: string;
  octave: number;
  cents: number;
} {
  const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  
  // A4 = 440Hz, MIDI note 69
  const midiNote = 69 + 12 * Math.log2(frequency / 440);
  const roundedMidi = Math.round(midiNote);
  const cents = Math.round((midiNote - roundedMidi) * 100);
  
  const noteIndex = ((roundedMidi % 12) + 12) % 12;
  const octave = Math.floor(roundedMidi / 12) - 1;
  
  return {
    note: noteNames[noteIndex],
    octave,
    cents,
  };
}

// ============================================================
// AUDIO ANALYZER CLASS
// ============================================================

/**
 * Audio analyzer for real-time pitch detection
 */
export class AudioAnalyzer {
  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private mediaStream: MediaStream | null = null;
  private buffer: Float32Array | null = null;
  private isListening = false;
  private config: AudioConfig;

  constructor(config: AudioConfig = DEFAULT_AUDIO_CONFIG) {
    this.config = config;
  }

  /**
   * Initialize audio context and request microphone access
   */
  async initialize(): Promise<boolean> {
    try {
      // Create audio context
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({
        sampleRate: this.config.sampleRate,
      });

      // Request microphone access
      this.mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false,
        },
      });

      // Create analyser node
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = this.config.fftSize;
      this.analyser.smoothingTimeConstant = 0.8;

      // Connect media stream to analyser
      const source = this.audioContext.createMediaStreamSource(this.mediaStream);
      source.connect(this.analyser);

      // Create buffer for time domain data
      this.buffer = new Float32Array(this.analyser.fftSize);

      return true;
    } catch (error) {
      console.error('Failed to initialize audio analyzer:', error);
      return false;
    }
  }

  /**
   * Start listening for audio input
   */
  startListening(): void {
    if (!this.analyser || !this.buffer) return;
    this.isListening = true;
  }

  /**
   * Stop listening
   */
  stopListening(): void {
    this.isListening = false;
  }

  /**
   * Get current pitch detection
   * @param instrumentId - Optional instrument ID for transposition
   */
  getCurrentPitch(instrumentId?: string): PitchResult | null {
    if (!this.isListening || !this.analyser || !this.buffer || !this.audioContext) {
      return null;
    }

    const buffer = this.buffer;
    const analyser = this.analyser;
    const audioContext = this.audioContext;

    // Get time domain data
    // @ts-ignore - TypeScript strictness issue with Web Audio API types
    analyser.getFloatTimeDomainData(buffer);

    // Check if there's enough signal
    const rms = this.calculateRMS(buffer);
    if (rms < 0.01) return null; // Too quiet

    // Detect pitch
    return detectPitchAutocorrelation(buffer, audioContext.sampleRate);
  }

  /**
   * Calculate RMS (Root Mean Square) for volume detection
   */
  private calculateRMS(buffer: Float32Array): number {
    let sum = 0;
    for (let i = 0; i < buffer.length; i++) {
      sum += buffer[i] * buffer[i];
    }
    return Math.sqrt(sum / buffer.length);
  }

  /**
   * Clean up resources
   */
  async cleanup(): Promise<void> {
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach(track => track.stop());
    }
    if (this.audioContext) {
      await this.audioContext.close();
    }
    this.audioContext = null;
    this.analyser = null;
    this.mediaStream = null;
    this.buffer = null;
    this.isListening = false;
  }
}

// ============================================================
// PITCH MATCHING UTILITIES
// ============================================================

/**
 * Check if detected pitch matches target note
 */
export function isPitchCorrect(
  detected: PitchResult,
  targetNote: string,
  targetOctave: number,
  tolerance: number = 50 // cents
): boolean {
  return (
    detected.note === targetNote &&
    detected.octave === targetOctave &&
    Math.abs(detected.cents) <= tolerance
  );
}

/**
 * Get pitch accuracy feedback
 */
export function getPitchFeedback(detected: PitchResult): {
  status: 'correct' | 'close' | 'incorrect';
  message: string;
  centsOff: number;
} {
  const centsOff = detected.cents;
  const absCents = Math.abs(centsOff);

  if (absCents <= 10) {
    return {
      status: 'correct',
      message: 'Perfect!',
      centsOff,
    };
  } else if (absCents <= 30) {
    return {
      status: 'close',
      message: centsOff > 0 ? 'Slightly sharp' : 'Slightly flat',
      centsOff,
    };
  } else {
    return {
      status: 'incorrect',
      message: centsOff > 0 ? 'Sharp' : 'Flat',
      centsOff,
    };
  }
}

// ============================================================
// SCALE VERIFICATION
// ============================================================

/**
 * Scale definition
 */
export interface ScaleDefinition {
  name: string;
  notes: string[]; // Array of note names (e.g., ['Bb', 'C', 'D', ...])
  key: string;
}

/**
 * Common scales for saxophone
 */
export const SCALES: Record<string, ScaleDefinition> = {
  'Bb Major': {
    name: 'Bb Major',
    notes: ['Bb', 'C', 'D', 'Eb', 'F', 'G', 'A', 'Bb'],
    key: 'Bb',
  },
  'Eb Major': {
    name: 'Eb Major',
    notes: ['Eb', 'F', 'G', 'Ab', 'Bb', 'C', 'D', 'Eb'],
    key: 'Eb',
  },
  'F Major': {
    name: 'F Major',
    notes: ['F', 'G', 'A', 'Bb', 'C', 'D', 'E', 'F'],
    key: 'F',
  },
  'C Major': {
    name: 'C Major',
    notes: ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C'],
    key: 'C',
  },
};

/**
 * Verify scale performance
 */
export function verifyScalePerformance(
  detectedNotes: PitchResult[],
  targetScale: ScaleDefinition
): {
  correct: boolean;
  missingNotes: string[];
  incorrectNotes: string[];
  accuracy: number;
} {
  const detectedNoteNames = detectedNotes.map(n => n.note);
  const targetNotes = targetScale.notes;

  const missingNotes = targetNotes.filter(n => !detectedNoteNames.includes(n));
  const incorrectNotes = detectedNoteNames.filter(n => !targetNotes.includes(n));

  const correctNotes = targetNotes.filter(n => detectedNoteNames.includes(n));
  const accuracy = (correctNotes.length / targetNotes.length) * 100;

  return {
    correct: missingNotes.length === 0 && incorrectNotes.length === 0,
    missingNotes,
    incorrectNotes,
    accuracy,
  };
}
