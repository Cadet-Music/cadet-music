/**
 * Audio Practice Activity Component
 * 
 * Renders a complete audio practice activity with microphone input,
 * waveform visualization, and activity-specific instructions.
 */

import { useState, useEffect } from 'react';
import { AudioManager, AudioState } from '../audioManager';
import { AudioActivity, SingleNoteConfig, ScaleConfig, PatternConfig } from '../audioActivities';
import WaveformVisualizer from './WaveformVisualizer';

interface AudioPracticeActivityProps {
  activity: AudioActivity;
  onComplete?: (success: boolean) => void;
  onError?: (error: Error) => void;
}

export default function AudioPracticeActivity({
  activity,
  onComplete,
  onError,
}: AudioPracticeActivityProps) {
  const [audioManager] = useState(() => new AudioManager());
  const [state, setState] = useState<AudioState>('idle');
  const [error, setError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string>('');

  useEffect(() => {
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
        setFeedback('Great job! Your playing has been analyzed.');
        onComplete?.(true);
      }
    });

    return () => {
      audioManager.cleanup();
    };
  }, [audioManager, onComplete, onError]);

  const handleRequestAccess = async () => {
    setError(null);
    setFeedback('');
    const success = await audioManager.requestMicrophoneAccess();
    if (!success) {
      setError('Failed to access microphone. Please check your browser permissions.');
    }
  };

  const handleStartListening = () => {
    setError(null);
    setFeedback('');
    audioManager.startListening();
  };

  const handleStopListening = () => {
    audioManager.stopListening();
    // Future: Trigger analysis here
    // For now, just mark as success
    setTimeout(() => {
      audioManager.cleanup();
    }, 500);
  };

  // ============================================================
  // ACTIVITY-SPECIFIC RENDERING
  // ============================================================

  const renderActivityInstructions = () => {
    switch (activity.type) {
      case 'play-single-note': {
        const config = activity.config as SingleNoteConfig;
        return (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <h4 className="font-semibold text-blue-900 mb-2">Target Note</h4>
            <p className="text-3xl font-bold text-blue-700 mb-2">
              {config.targetNote}
            </p>
            {config.duration && (
              <p className="text-sm text-blue-600">
                Hold for {config.duration / 1000} seconds
              </p>
            )}
          </div>
        );
      }
      
      case 'play-scale': {
        const config = activity.config as ScaleConfig;
        return (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
            <h4 className="font-semibold text-green-900 mb-2">Target Scale</h4>
            <p className="text-2xl font-bold text-green-700 mb-2">
              {config.targetScale}
            </p>
            <p className="text-sm text-green-600">
              Direction: {config.direction || 'ascending'}
              {config.tempo && ` • Tempo: ${config.tempo} BPM`}
            </p>
          </div>
        );
      }
      
      case 'play-pattern': {
        const config = activity.config as PatternConfig;
        return (
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
            <h4 className="font-semibold text-purple-900 mb-2">Pattern</h4>
            <div className="flex flex-wrap gap-2 mb-2">
              {config.pattern.map((note, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-purple-200 text-purple-800 rounded-full font-semibold"
                >
                  {note}
                </span>
              ))}
            </div>
            {config.tempo && (
              <p className="text-sm text-purple-600">
                Tempo: {config.tempo} BPM
              </p>
            )}
          </div>
        );
      }
      
      default:
        return null;
    }
  };

  // ============================================================
  // STATE RENDERING
  // ============================================================

  const renderIdleState = () => (
    <div className="text-center py-8">
      <svg
        className="w-20 h-20 mx-auto text-gray-400 mb-4"
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
    <div className="text-center py-8">
      <svg
        className="w-20 h-20 mx-auto text-blue-500 animate-pulse mb-4"
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
      <p className="text-lg font-semibold">Requesting Microphone Access...</p>
      <p className="text-sm text-gray-500 mt-2">
        Please allow microphone access in your browser
      </p>
    </div>
  );

  const renderReadyState = () => (
    <div>
      {renderActivityInstructions()}
      
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
          Start Playing
        </span>
      </button>
    </div>
  );

  const renderListeningState = () => (
    <div>
      {renderActivityInstructions()}
      
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
          Listening... Play now!
        </span>
      </div>
      
      <button
        onClick={handleStopListening}
        className="btn-secondary w-full"
      >
        Stop Playing
      </button>
    </div>
  );

  const renderProcessingState = () => (
    <div className="text-center py-8">
      <svg
        className="w-20 h-20 mx-auto text-purple-500 animate-spin mb-4"
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
      <p className="text-lg font-semibold">Analyzing Your Playing...</p>
      <p className="text-sm text-gray-500 mt-2">
        Processing audio data
      </p>
    </div>
  );

  const renderSuccessState = () => (
    <div className="text-center py-8">
      <svg
        className="w-20 h-20 mx-auto text-green-500 mb-4"
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
      <p className="text-lg font-semibold text-green-700 mb-2">
        {feedback || 'Analysis Complete!'}
      </p>
      <p className="text-sm text-gray-500 mb-4">
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
    <div className="text-center py-8">
      <svg
        className="w-20 h-20 mx-auto text-red-500 mb-4"
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
      <p className="text-lg font-semibold text-red-700 mb-2">Error</p>
      <p className="text-sm text-gray-500 mb-4">
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
      <div className="mb-4">
        <h3 className="text-xl font-bold mb-2">{activity.instructions}</h3>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span className="px-2 py-1 bg-gray-100 rounded">
            {activity.type.replace('-', ' ')}
          </span>
          <span className="px-2 py-1 bg-gray-100 rounded">
            {activity.difficulty}
          </span>
        </div>
      </div>
      
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
