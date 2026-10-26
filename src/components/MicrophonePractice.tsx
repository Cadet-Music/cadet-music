/**
 * Microphone Practice Component
 * 
 * Reusable component for microphone-based practice activities.
 * Handles microphone permissions, audio capture, and provides
 * visual feedback through waveform display.
 */

import { useState, useEffect } from 'react';
import { AudioManager, AudioState } from '../audioManager';
import WaveformVisualizer from './WaveformVisualizer';

interface MicrophonePracticeProps {
  title?: string;
  instructions?: string;
  onComplete?: () => void;
  onError?: (error: Error) => void;
}

export default function MicrophonePractice({
  title = 'Microphone Practice',
  instructions = 'Click "Start Listening" to begin practicing with your microphone.',
  onComplete,
  onError,
}: MicrophonePracticeProps) {
  const [audioManager] = useState(() => new AudioManager());
  const [state, setState] = useState<AudioState>('idle');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Set up state change listener
    audioManager.setOnStateChange((newState) => {
      setState(newState);
      
      if (newState === 'error') {
        const history = audioManager.getStateHistory();
        const lastError = history[history.length - 1];
        if (lastError?.reason) {
          setError(lastError.reason);
          onError?.(new Error(lastError.reason));
        }
      }
      
      if (newState === 'success') {
        onComplete?.();
      }
    });

    // Cleanup on unmount
    return () => {
      audioManager.cleanup();
    };
  }, [audioManager, onComplete, onError]);

  const handleRequestAccess = async () => {
    setError(null);
    const success = await audioManager.requestMicrophoneAccess();
    if (!success) {
      setError('Failed to access microphone. Please check your browser permissions.');
    }
  };

  const handleStartListening = () => {
    setError(null);
    audioManager.startListening();
  };

  const handleStopListening = () => {
    audioManager.stopListening();
  };

  const handleAnalyze = async () => {
    setError(null);
    try {
      await audioManager.analyzePitch();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis failed');
    }
  };

  // ============================================================
  // RENDER STATES
  // ============================================================

  const renderIdleState = () => (
    <div className="text-center">
      <div className="mb-6">
        <svg
          className="w-16 h-16 mx-auto text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
          />
        </svg>
      </div>
      <button
        onClick={handleRequestAccess}
        className="btn-primary w-full"
      >
        Enable Microphone
      </button>
      <p className="text-sm text-gray-500 mt-2">
        We need microphone access to listen to your playing
      </p>
    </div>
  );

  const renderRequestingState = () => (
    <div className="text-center">
      <div className="mb-6">
        <svg
          className="w-16 h-16 mx-auto text-blue-500 animate-pulse"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
          />
        </svg>
      </div>
      <p className="text-lg font-semibold">Requesting Microphone Access...</p>
      <p className="text-sm text-gray-500 mt-2">
        Please allow microphone access in your browser
      </p>
    </div>
  );

  const renderReadyState = () => (
    <div>
      <div className="mb-4">
        <WaveformVisualizer
          audioManager={audioManager}
          isActive={false}
          height={120}
        />
      </div>
      <div className="flex items-center justify-center gap-2 mb-4">
        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        <span className="text-sm font-semibold text-green-700">
          Microphone Ready
        </span>
      </div>
      <button
        onClick={handleStartListening}
        className="btn-primary w-full"
      >
        <span className="flex items-center justify-center gap-2">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
            <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
          </svg>
          Start Listening
        </span>
      </button>
    </div>
  );

  const renderListeningState = () => (
    <div>
      <div className="mb-4">
        <WaveformVisualizer
          audioManager={audioManager}
          isActive={true}
          height={120}
        />
      </div>
      <div className="flex items-center justify-center gap-2 mb-4">
        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
        <span className="text-sm font-semibold text-red-700">
          Listening...
        </span>
      </div>
      <button
        onClick={handleStopListening}
        className="btn-secondary w-full"
      >
        Stop Listening
      </button>
    </div>
  );

  const renderProcessingState = () => (
    <div className="text-center">
      <div className="mb-6">
        <svg
          className="w-16 h-16 mx-auto text-purple-500 animate-spin"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
      </div>
      <p className="text-lg font-semibold">Analyzing Your Playing...</p>
      <p className="text-sm text-gray-500 mt-2">
        Processing audio data
      </p>
    </div>
  );

  const renderSuccessState = () => (
    <div className="text-center">
      <div className="mb-6">
        <svg
          className="w-16 h-16 mx-auto text-green-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <p className="text-lg font-semibold text-green-700">Analysis Complete!</p>
      <p className="text-sm text-gray-500 mt-2 mb-4">
        Your playing has been analyzed successfully
      </p>
      <button
        onClick={() => audioManager.cleanup()}
        className="btn-secondary w-full"
      >
        Done
      </button>
    </div>
  );

  const renderErrorState = () => (
    <div className="text-center">
      <div className="mb-6">
        <svg
          className="w-16 h-16 mx-auto text-red-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <p className="text-lg font-semibold text-red-700">Error</p>
      <p className="text-sm text-gray-500 mt-2 mb-4">
        {error || 'An error occurred'}
      </p>
      <button
        onClick={() => audioManager.cleanup()}
        className="btn-secondary w-full"
      >
        Try Again
      </button>
    </div>
  );

  // ============================================================
  // MAIN RENDER
  // ============================================================

  return (
    <div className="card">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-sm text-gray-600 mb-6">{instructions}</p>
      
      {state === 'idle' && renderIdleState()}
      {state === 'requesting' && renderRequestingState()}
      {state === 'ready' && renderReadyState()}
      {state === 'listening' && renderListeningState()}
      {state === 'processing' && renderProcessingState()}
      {state === 'success' && renderSuccessState()}
      {state === 'error' && renderErrorState()}
    </div>
  );
}
