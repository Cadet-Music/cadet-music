/**
 * Audio Manager - Core audio infrastructure for instrument practice
 * 
 * Handles microphone permissions, audio stream lifecycle, recording state,
 * and provides real-time pitch analysis (autocorrelation from audio.ts).
 */

import { detectPitchAutocorrelation } from './audio';

// ============================================================
// AUDIO STATE MACHINE
// ============================================================

export type AudioState = 
  | 'idle'           // Not initialized, no microphone access
  | 'requesting'     // Requesting microphone permission
  | 'ready'          // Microphone available, ready to listen
  | 'listening'      // Actively capturing audio
  | 'processing'     // Analyzing captured audio
  | 'success'        // Analysis complete, successful
  | 'error';         // Error occurred

export interface AudioStateChange {
  from: AudioState;
  to: AudioState;
  timestamp: number;
  reason?: string;
}

// ============================================================
// AUDIO CONFIGURATION
// ============================================================

export interface AudioManagerConfig {
  sampleRate?: number;
  fftSize?: number;
  smoothingTimeConstant?: number;
  minDecibels?: number;
  maxDecibels?: number;
}

const DEFAULT_CONFIG: AudioManagerConfig = {
  sampleRate: 44100,
  fftSize: 2048,
  smoothingTimeConstant: 0.8,
  minDecibels: -90,
  maxDecibels: -10,
};

// ============================================================
// AUDIO METRICS
// ============================================================

export interface AudioMetrics {
  rms: number;              // Root Mean Square (volume level)
  peak: number;             // Peak amplitude
  frequency?: number;       // Dominant frequency (Hz)
  note?: string;            // Detected note name
  octave?: number;          // Detected octave
  confidence?: number;      // Detection confidence (0-1)
  cents?: number;           // Cents deviation from perfect pitch
}

// ============================================================
// AUDIO MANAGER CLASS
// ============================================================

export class AudioManager {
  private audioContext: AudioContext | null = null;
  private mediaStream: MediaStream | null = null;
  private analyser: AnalyserNode | null = null;
  private source: MediaStreamAudioSourceNode | null = null;
  
  private state: AudioState = 'idle';
  private config: AudioManagerConfig;
  private stateHistory: AudioStateChange[] = [];
  
  // Callbacks
  private onStateChange?: (state: AudioState) => void;
  private onMetrics?: (metrics: AudioMetrics) => void;
  private onError?: (error: Error) => void;
  
  // Animation frame for continuous analysis
  private animationFrameId: number | null = null;

  // Take recording (timestamped samples for coach.ts analysis)
  private takeSamples: Array<{ rms: number; frequency?: number; cents?: number; tMs: number }> = [];
  private takeStartTs: number | null = null;
  private takeMaxMs: number = 15000;
  private recordingActive: boolean = false;
  
  constructor(config: AudioManagerConfig = DEFAULT_CONFIG) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  // ============================================================
  // STATE MANAGEMENT
  // ============================================================

  getState(): AudioState {
    return this.state;
  }

  private setState(newState: AudioState, reason?: string): void {
    const oldState = this.state;
    if (oldState === newState) return;
    
    this.state = newState;
    this.stateHistory.push({
      from: oldState,
      to: newState,
      timestamp: Date.now(),
      reason,
    });
    
    this.onStateChange?.(newState);
  }

  getStateHistory(): AudioStateChange[] {
    return [...this.stateHistory];
  }

  // ============================================================
  // MICROPHONE PERMISSIONS
  // ============================================================

  async requestMicrophoneAccess(): Promise<boolean> {
    if (this.state !== 'idle') {
      console.warn('Microphone access already requested or granted');
      return this.state === 'ready' || this.state === 'listening';
    }
    
    this.setState('requesting', 'Requesting microphone permission');
    
    try {
      // Check if browser supports getUserMedia
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Browser does not support microphone access');
      }
      
      // Request microphone access
      this.mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false,
        },
      });
      
      // Initialize audio context
      await this.initializeAudioContext();
      
      this.setState('ready', 'Microphone access granted');
      return true;
      
    } catch (error) {
      this.setState('error', `Microphone access failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      this.onError?.(error instanceof Error ? error : new Error(String(error)));
      return false;
    }
  }

  private async initializeAudioContext(): Promise<void> {
    if (!this.mediaStream) {
      throw new Error('MediaStream not available');
    }
    
    // Create audio context
    this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({
      sampleRate: this.config.sampleRate,
    });
    
    // Create analyser node
    this.analyser = this.audioContext.createAnalyser();
    this.analyser.fftSize = this.config.fftSize!;
    this.analyser.smoothingTimeConstant = this.config.smoothingTimeConstant!;
    this.analyser.minDecibels = this.config.minDecibels!;
    this.analyser.maxDecibels = this.config.maxDecibels!;
    
    // Connect media stream to analyser
    this.source = this.audioContext.createMediaStreamSource(this.mediaStream);
    this.source.connect(this.analyser);
  }

  // ============================================================
  // AUDIO CAPTURE
  // ============================================================

  startListening(): void {
    if (this.state !== 'ready') {
      console.warn('Cannot start listening: state is', this.state);
      return;
    }
    
    if (!this.analyser || !this.audioContext) {
      console.error('Audio context or analyser not initialized');
      return;
    }
    
    this.setState('listening', 'Started audio capture');
    this.startAnalysisLoop();
  }

  // ============================================================
  // TAKE RECORDING (for the tone & articulation coach)
  // ============================================================

  /**
   * Begin collecting timestamped samples for analysis by src/coach.ts.
   * Recording stops automatically after maxMs (default 15s safety cap).
   */
  startRecordingTake(maxMs: number = 15000): void {
    this.takeSamples = [];
    this.takeStartTs = performance.now();
    this.takeMaxMs = maxMs;
    this.recordingActive = true;
  }

  stopRecordingTake(): void {
    this.recordingActive = false;
  }

  /** Returns collected samples and clears the buffer. */
  collectTake(): Array<{ rms: number; frequency?: number; cents?: number; tMs: number }> {
    this.recordingActive = false;
    const samples = this.takeSamples;
    this.takeSamples = [];
    return samples;
  }

  getTakeElapsedMs(): number {
    if (!this.recordingActive || this.takeStartTs === null) return 0;
    return performance.now() - this.takeStartTs;
  }

  isRecordingTake(): boolean {
    return this.recordingActive;
  }

  stopListening(): void {
    if (this.state !== 'listening') {
      return;
    }
    
    this.stopAnalysisLoop();
    this.recordingActive = false;
    this.setState('ready', 'Stopped audio capture');
  }

  private startAnalysisLoop(): void {
    const analyze = () => {
      if (this.state !== 'listening') {
        return;
      }
      
      const metrics = this.captureAudioMetrics();
      if (metrics) {
        // Collect timestamped samples while a take is being recorded
        if (this.recordingActive && this.takeStartTs !== null) {
          const tMs = performance.now() - this.takeStartTs;
          this.takeSamples.push({
            rms: metrics.rms,
            frequency: metrics.frequency,
            cents: metrics.cents,
            tMs,
          });
          if (tMs >= this.takeMaxMs) {
            this.recordingActive = false;
          }
        }
        this.onMetrics?.(metrics);
      }
      
      this.animationFrameId = requestAnimationFrame(analyze);
    };
    
    analyze();
  }

  private stopAnalysisLoop(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  // ============================================================
  // AUDIO ANALYSIS
  // ============================================================

  private captureAudioMetrics(): AudioMetrics | null {
    if (!this.analyser || !this.audioContext) return null;

    const bufferLength = this.analyser.frequencyBinCount;
    const dataArray = new Float32Array(bufferLength);
    this.analyser.getFloatTimeDomainData(dataArray);

    // Calculate RMS (volume level)
    let sum = 0;
    let peak = 0;
    for (let i = 0; i < bufferLength; i++) {
      const value = Math.abs(dataArray[i]);
      sum += value * value;
      peak = Math.max(peak, value);
    }
    const rms = Math.sqrt(sum / bufferLength);

    // Only process if there's actual sound
    if (rms < 0.01) {
      return { rms, peak };
    }

    // Real-time pitch detection (autocorrelation from audio.ts).
    // This replaces the former placeholder — cadet practice components
    // (GuidedMicrophonePractice, MicrophonePractice, AudioPracticeActivity)
    // receive live frequency/note/cents/confidence in every metrics frame,
    // which powers tone coaching and articulation (tonguing) analysis.
    const pitch = detectPitchAutocorrelation(dataArray, this.audioContext.sampleRate);
    if (pitch) {
      return {
        rms,
        peak,
        frequency: pitch.frequency,
        note: pitch.note,
        octave: pitch.octave,
        confidence: pitch.confidence,
        cents: pitch.cents,
      };
    }

    return { rms, peak };
  }

  getWaveformData(): Uint8Array | null {
    if (!this.analyser) return null;
    
    const bufferLength = this.analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    this.analyser.getByteTimeDomainData(dataArray);
    
    return dataArray;
  }

  getFrequencyData(): Uint8Array | null {
    if (!this.analyser) return null;
    
    const bufferLength = this.analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    this.analyser.getByteFrequencyData(dataArray);
    
    return dataArray;
  }

  // ============================================================
  // FUTURE HOOKS
  // ============================================================

  /**
   * Future: Analyze captured audio for pitch detection
   * This is a placeholder for future implementation
   */
  async analyzePitch(): Promise<void> {
    if (this.state !== 'listening') {
      console.warn('Cannot analyze pitch: not listening');
      return;
    }
    
    this.setState('processing', 'Analyzing pitch');
    
    // Future: Implement actual pitch detection
    // For now, simulate processing time
    await new Promise(resolve => setTimeout(resolve, 100));
    
    this.setState('success', 'Pitch analysis complete');
  }

  /**
   * Future: Analyze captured audio for rhythm detection
   * This is a placeholder for future implementation
   */
  async analyzeRhythm(): Promise<void> {
    if (this.state !== 'listening') {
      console.warn('Cannot analyze rhythm: not listening');
      return;
    }
    
    this.setState('processing', 'Analyzing rhythm');
    
    // Future: Implement actual rhythm detection
    // For now, simulate processing time
    await new Promise(resolve => setTimeout(resolve, 100));
    
    this.setState('success', 'Rhythm analysis complete');
  }

  // ============================================================
  // CALLBACKS
  // ============================================================

  setOnStateChange(callback: (state: AudioState) => void): void {
    this.onStateChange = callback;
  }

  setOnMetrics(callback: (metrics: AudioMetrics) => void): void {
    this.onMetrics = callback;
  }

  setOnError(callback: (error: Error) => void): void {
    this.onError = callback;
  }

  // ============================================================
  // CLEANUP
  // ============================================================

  async cleanup(): Promise<void> {
    this.stopAnalysisLoop();
    
    if (this.source) {
      this.source.disconnect();
      this.source = null;
    }
    
    if (this.analyser) {
      this.analyser.disconnect();
      this.analyser = null;
    }
    
    if (this.audioContext) {
      await this.audioContext.close();
      this.audioContext = null;
    }
    
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach(track => track.stop());
      this.mediaStream = null;
    }
    
    this.setState('idle', 'Cleanup complete');
  }

  // ============================================================
  // DIAGNOSTICS
  // ============================================================

  isSupported(): boolean {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
  }

  getAudioContext(): AudioContext | null {
    return this.audioContext;
  }

  getAnalyser(): AnalyserNode | null {
    return this.analyser;
  }
}

// ============================================================
// SINGLETON INSTANCE
// ============================================================

let audioManagerInstance: AudioManager | null = null;

export function getAudioManager(): AudioManager {
  if (!audioManagerInstance) {
    audioManagerInstance = new AudioManager();
  }
  return audioManagerInstance;
}

export function resetAudioManager(): void {
  if (audioManagerInstance) {
    audioManagerInstance.cleanup();
    audioManagerInstance = null;
  }
}
