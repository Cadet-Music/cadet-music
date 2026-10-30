import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface AudioReferencePlayerProps {
  audioUrl: string;
  title: string;
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
}

export default function AudioReferencePlayer({
  audioUrl,
  title,
  onPlay,
  onPause,
  onEnded,
}: AudioReferencePlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      setIsPlaying(false);
      onEnded?.();
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [onEnded]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      onPause?.();
    } else {
      audio.play();
      setIsPlaying(true);
      onPlay?.();
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const time = parseFloat(e.target.value);
    audio.currentTime = time;
    setCurrentTime(time);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-gradient-to-r from-[#c9a84c]/10 to-[#a68a3a]/10 dark:from-[#c9a84c]/20 dark:to-[#a68a3a]/20 rounded-lg p-4 border border-[#c9a84c]/30">
      <audio ref={audioRef} src={audioUrl} preload="metadata" />
      
      <div className="flex items-center gap-3 mb-3">
        <motion.button
          onClick={togglePlay}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-12 h-12 rounded-full bg-[#c9a84c] flex items-center justify-center text-[#1a2332] shadow-lg"
        >
          {isPlaying ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16" />
              <rect x="14" y="4" width="4" height="16" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          )}
        </motion.button>
        
        <div className="flex-1">
          <div className="text-sm font-semibold text-[#1a2332] dark:text-white mb-1">
            🎧 {title}
          </div>
          <div className="text-xs text-[#5a6577] dark:text-[#9aa3b0]">
            Reference Recording
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-xs text-[#5a6577] dark:text-[#9aa3b0] w-10">
          {formatTime(currentTime)}
        </span>
        
        <input
          type="range"
          min="0"
          max={duration || 0}
          value={currentTime}
          onChange={handleSeek}
          className="flex-1 h-2 bg-[#e2e4e8] dark:bg-[#2a3545] rounded-lg appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #c9a84c 0%, #c9a84c ${(currentTime / duration) * 100}%, #e2e4e8 ${(currentTime / duration) * 100}%, #e2e4e8 100%)`,
          }}
        />
        
        <span className="text-xs text-[#5a6577] dark:text-[#9aa3b0] w-10 text-right">
          {formatTime(duration)}
        </span>
      </div>

      <div className="mt-3 text-xs text-[#5a6577] dark:text-[#9aa3b0]">
        💡 Listen to the reference recording, then try playing along with your instrument!
      </div>
    </div>
  );
}
