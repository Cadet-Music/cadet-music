/**
 * Waveform Visualization Component
 * 
 * Displays real-time audio waveform from microphone input.
 * Uses actual audio data from AnalyserNode.
 */

import { useEffect, useRef } from 'react';
import { AudioManager } from '../audioManager';

interface WaveformVisualizerProps {
  audioManager: AudioManager;
  isActive: boolean;
  color?: string;
  backgroundColor?: string;
  height?: number;
}

export default function WaveformVisualizer({
  audioManager,
  isActive,
  color = '#c9a84c',
  backgroundColor = '#1a2332',
  height = 100,
}: WaveformVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = () => {
      if (!isActive) {
        // Draw idle state
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw center line
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        ctx.globalAlpha = 0.3;
        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 2);
        ctx.lineTo(canvas.width, canvas.height / 2);
        ctx.stroke();
        ctx.globalAlpha = 1;
        
        return;
      }

      const waveformData = audioManager.getWaveformData();
      if (!waveformData) {
        animationFrameRef.current = requestAnimationFrame(draw);
        return;
      }

      const width = canvas.width;
      const height = canvas.height;

      // Clear canvas
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, width, height);

      // Draw waveform
      ctx.lineWidth = 2;
      ctx.strokeStyle = color;
      ctx.beginPath();

      const sliceWidth = width / waveformData.length;
      let x = 0;

      for (let i = 0; i < waveformData.length; i++) {
        const v = waveformData[i] / 128.0; // Normalize to 0-2
        const y = (v * height) / 2;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }

        x += sliceWidth;
      }

      ctx.lineTo(width, height / 2);
      ctx.stroke();

      animationFrameRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [audioManager, isActive, color, backgroundColor, height]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = height;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [height]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full rounded-lg"
      style={{ height: `${height}px` }}
    />
  );
}
