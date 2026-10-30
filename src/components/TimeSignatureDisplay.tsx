import { motion } from 'framer-motion';

interface TimeSignatureDisplayProps {
  timeSignature: string; // e.g., "4/4", "3/4", "6/8"
  showBeats?: boolean;
  animated?: boolean;
  className?: string;
}

export default function TimeSignatureDisplay({
  timeSignature,
  showBeats = true,
  animated = true,
  className = '',
}: TimeSignatureDisplayProps) {
  const [top, bottom] = timeSignature.split('/').map(Number);
  const width = 400;
  const height = 180;
  const startX = 80;
  const endX = width - 40;
  const staffY = 60;

  // Calculate beat width based on time signature
  const beatWidth = (endX - startX) / top;

  // Determine if it's compound time
  const isCompound = bottom === 8 && (top === 6 || top === 9 || top === 12);
  const beatsPerMeasure = isCompound ? top / 3 : top;

  return (
    <div className={`relative ${className}`}>
      <svg
        width="100%"
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="overflow-visible"
      >
        {/* Staff lines */}
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.line
            key={i}
            x1={startX}
            y1={staffY + i * 15}
            x2={endX}
            y2={staffY + i * 15}
            stroke="#1a2332"
            strokeWidth={1.5}
            initial={animated ? { pathLength: 0 } : {}}
            animate={animated ? { pathLength: 1 } : {}}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          />
        ))}

        {/* Time signature */}
        <motion.g
          initial={animated ? { scale: 0, opacity: 0 } : {}}
          animate={animated ? { scale: 1, opacity: 1 } : {}}
          transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
        >
          <text
            x={startX - 20}
            y={staffY + 25}
            fontSize="32"
            fontWeight="bold"
            fontFamily="serif"
            fill="#1a2332"
            textAnchor="middle"
          >
            {top}
          </text>
          <text
            x={startX - 20}
            y={staffY + 60}
            fontSize="32"
            fontWeight="bold"
            fontFamily="serif"
            fill="#1a2332"
            textAnchor="middle"
          >
            {bottom}
          </text>
        </motion.g>

        {/* Beat divisions */}
        {showBeats && Array.from({ length: top }).map((_, i) => {
          const x = startX + i * beatWidth;
          const isStrongBeat = i === 0 || (isCompound && i % 3 === 0);

          return (
            <motion.g
              key={i}
              initial={animated ? { opacity: 0, y: -10 } : {}}
              animate={animated ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7 + i * 0.1 }}
            >
              {/* Beat line */}
              <line
                x1={x}
                y1={staffY}
                x2={x}
                y2={staffY + 60}
                stroke="#c9a84c"
                strokeWidth={isStrongBeat ? 2 : 1}
                strokeOpacity={isStrongBeat ? 1 : 0.5}
              />

              {/* Beat number */}
              <text
                x={x + beatWidth / 2}
                y={staffY + 90}
                fontSize="14"
                fontWeight="bold"
                fontFamily="sans-serif"
                fill={isStrongBeat ? '#c9a84c' : '#5a6577'}
                textAnchor="middle"
              >
                {isCompound ? (i % 3) + 1 : i + 1}
              </text>

              {/* Strong beat indicator */}
              {isStrongBeat && (
                <motion.circle
                  cx={x + beatWidth / 2}
                  cy={staffY + 105}
                  r={4}
                  fill="#c9a84c"
                  initial={animated ? { scale: 0 } : {}}
                  animate={animated ? { scale: 1 } : {}}
                  transition={{ delay: 1 + i * 0.1, type: 'spring' }}
                />
              )}
            </motion.g>
          );
        })}

        {/* Time signature info */}
        <motion.g
          initial={animated ? { opacity: 0 } : {}}
          animate={animated ? { opacity: 1 } : {}}
          transition={{ delay: 1.2 }}
        >
          <text
            x={width / 2}
            y={height - 10}
            fontSize="12"
            fontFamily="sans-serif"
            fill="#5a6577"
            textAnchor="middle"
          >
            {isCompound
              ? `Compound ${beatsPerMeasure} beats per measure (${top}/${bottom})`
              : `Simple ${top} beats per measure (${top}/${bottom})`
            }
          </text>
        </motion.g>
      </svg>
    </div>
  );
}

// Animated metronome component
interface MetronomeProps {
  tempo: number; // BPM
  timeSignature?: string;
  isPlaying?: boolean;
  animated?: boolean;
  className?: string;
}

export function Metronome({
  tempo,
  timeSignature = '4/4',
  isPlaying = false,
  animated = true,
  className = '',
}: MetronomeProps) {
  const [top] = timeSignature.split('/').map(Number);
  const beatDuration = 60000 / tempo; // ms per beat

  return (
    <div className={`relative flex flex-col items-center ${className}`}>
      {/* Metronome body */}
      <motion.div
        className="relative w-32 h-48 bg-gradient-to-b from-[#8B4513] to-[#654321] rounded-t-full rounded-b-lg shadow-2xl"
        initial={animated ? { y: -20, opacity: 0 } : {}}
        animate={animated ? { y: 0, opacity: 1 } : {}}
        transition={{ type: 'spring', stiffness: 200 }}
      >
        {/* Pendulum */}
        <motion.div
          className="absolute top-8 left-1/2 w-1 h-32 bg-gradient-to-b from-[#c9a84c] to-[#a68a3a] origin-top"
          animate={isPlaying ? {
            rotate: [-20, 20, -20],
          } : {}}
          transition={{
            duration: beatDuration / 1000,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {/* Weight */}
          <motion.div
            className="absolute bottom-0 left-1/2 w-6 h-6 bg-[#c9a84c] rounded-full -translate-x-1/2 translate-y-1/2 shadow-lg"
            animate={isPlaying ? {
              y: [0, -10, 0],
            } : {}}
            transition={{
              duration: beatDuration / 1000,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </motion.div>

        {/* Base */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-[#654321] rounded-b-lg flex items-center justify-center">
          <div className="text-[#c9a84c] font-bold text-xl">{tempo}</div>
        </div>
      </motion.div>

      {/* Tempo label */}
      <motion.div
        className="mt-4 text-center"
        initial={animated ? { opacity: 0, y: 10 } : {}}
        animate={animated ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.3 }}
      >
        <div className="text-2xl font-bold text-[#1a2332] dark:text-white">
          {tempo} BPM
        </div>
        <div className="text-sm text-[#5a6577] dark:text-[#9aa3b0]">
          {timeSignature} time
        </div>
      </motion.div>

      {/* Beat indicators */}
      {isPlaying && (
        <div className="flex gap-2 mt-4">
          {Array.from({ length: top }).map((_, i) => (
            <motion.div
              key={i}
              className="w-4 h-4 rounded-full bg-[#c9a84c]"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: beatDuration / 1000,
                repeat: Infinity,
                delay: (i * beatDuration) / 1000,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
