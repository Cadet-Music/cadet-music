import { motion } from 'framer-motion';

interface KeySignatureDisplayProps {
  keyName: string; // e.g., "G Major", "F Major", "Bb Major"
  accidentals?: Array<{
    type: 'sharp' | 'flat' | 'natural';
    position: number; // Staff position
  }>;
  showName?: boolean;
  animated?: boolean;
  className?: string;
}

// Key signature definitions
const KEY_SIGNATURES: Record<string, { accidentals: Array<{ type: 'sharp' | 'flat'; position: number }>, count: number }> = {
  'C Major': { accidentals: [], count: 0 },
  'G Major': { accidentals: [{ type: 'sharp', position: 4 }], count: 1 },
  'D Major': { accidentals: [{ type: 'sharp', position: 4 }, { type: 'sharp', position: 1 }], count: 2 },
  'A Major': { accidentals: [{ type: 'sharp', position: 4 }, { type: 'sharp', position: 1 }, { type: 'sharp', position: 4.5 }], count: 3 },
  'E Major': { accidentals: [{ type: 'sharp', position: 4 }, { type: 'sharp', position: 1 }, { type: 'sharp', position: 4.5 }, { type: 'sharp', position: 1.5 }], count: 4 },
  'F Major': { accidentals: [{ type: 'flat', position: 2.5 }], count: 1 },
  'Bb Major': { accidentals: [{ type: 'flat', position: 2.5 }, { type: 'flat', position: 0.5 }], count: 2 },
  'Eb Major': { accidentals: [{ type: 'flat', position: 2.5 }, { type: 'flat', position: 0.5 }, { type: 'flat', position: 3 }], count: 3 },
};

export default function KeySignatureDisplay({
  keyName,
  accidentals: customAccidentals,
  showName = true,
  animated = true,
  className = '',
}: KeySignatureDisplayProps) {
  const width = 400;
  const height = 120;
  const startX = 60;
  const endX = width - 40;
  const lineSpacing = 15;

  const keyData = KEY_SIGNATURES[keyName] || { accidentals: [], count: 0 };
  const accidentals = customAccidentals || keyData.accidentals;

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
            y1={20 + i * lineSpacing}
            x2={endX}
            y2={20 + i * lineSpacing}
            stroke="#1a2332"
            strokeWidth={1.5}
            initial={animated ? { pathLength: 0 } : {}}
            animate={animated ? { pathLength: 1 } : {}}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          />
        ))}

        {/* Treble clef */}
        <motion.text
          x={startX - 40}
          y={85}
          fontSize="50"
          fontFamily="serif"
          fill="#1a2332"
          initial={animated ? { opacity: 0, x: -20 } : {}}
          animate={animated ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          𝄞
        </motion.text>

        {/* Key signature accidentals */}
        {accidentals.map((acc, i) => {
          const x = startX + 10 + (i * 15);
          const y = 20 + (4 - acc.position) * lineSpacing;

          return (
            <motion.g
              key={i}
              initial={animated ? { scale: 0, opacity: 0 } : {}}
              animate={animated ? { scale: 1, opacity: 1 } : {}}
              transition={{ delay: 0.3 + i * 0.1, type: 'spring', stiffness: 200 }}
            >
              {acc.type === 'sharp' && (
                <>
                  <line
                    x1={x - 3}
                    y1={y - 10}
                    x2={x - 3}
                    y2={y + 10}
                    stroke="#1a2332"
                    strokeWidth={2}
                  />
                  <line
                    x1={x + 3}
                    y1={y - 10}
                    x2={x + 3}
                    y2={y + 10}
                    stroke="#1a2332"
                    strokeWidth={2}
                  />
                  <line
                    x1={x - 5}
                    y1={y - 3}
                    x2={x + 5}
                    y2={y - 3}
                    stroke="#1a2332"
                    strokeWidth={2.5}
                  />
                  <line
                    x1={x - 5}
                    y1={y + 3}
                    x2={x + 5}
                    y2={y + 3}
                    stroke="#1a2332"
                    strokeWidth={2.5}
                  />
                </>
              )}
              {acc.type === 'flat' && (
                <path
                  d={`M ${x - 3} ${y - 10} L ${x - 3} ${y + 5} Q ${x + 5} ${y + 2} ${x + 5} ${y - 3} Q ${x + 5} ${y - 8} ${x - 3} ${y - 5}`}
                  fill="none"
                  stroke="#1a2332"
                  strokeWidth={2}
                />
              )}
            </motion.g>
          );
        })}

        {/* Key name label */}
        {showName && (
          <motion.text
            x={width / 2}
            y={height - 10}
            fontSize="16"
            fontWeight="bold"
            fontFamily="sans-serif"
            fill="#1a2332"
            textAnchor="middle"
            initial={animated ? { opacity: 0, y: 10 } : {}}
            animate={animated ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
          >
            {keyName}
          </motion.text>
        )}
      </svg>
    </div>
  );
}
