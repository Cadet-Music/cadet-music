import { motion } from 'framer-motion';
import { useState } from 'react';

interface CircleOfFifthsProps {
  highlightKey?: string;
  showMinor?: boolean;
  animated?: boolean;
  className?: string;
}

const MAJOR_KEYS = [
  { name: 'C', sharps: 0, angle: 0 },
  { name: 'G', sharps: 1, angle: 30 },
  { name: 'D', sharps: 2, angle: 60 },
  { name: 'A', sharps: 3, angle: 90 },
  { name: 'E', sharps: 4, angle: 120 },
  { name: 'B', sharps: 5, angle: 150 },
  { name: 'F#', sharps: 6, angle: 180 },
  { name: 'C#', sharps: 7, angle: 210 },
  { name: 'F', flats: 1, angle: 330 },
  { name: 'Bb', flats: 2, angle: 300 },
  { name: 'Eb', flats: 3, angle: 270 },
  { name: 'Ab', flats: 4, angle: 240 },
  { name: 'Db', flats: 5, angle: 210 },
  { name: 'Gb', flats: 6, angle: 180 },
];

const MINOR_KEYS = [
  { name: 'Am', angle: 0 },
  { name: 'Em', angle: 30 },
  { name: 'Bm', angle: 60 },
  { name: 'F#m', angle: 90 },
  { name: 'C#m', angle: 120 },
  { name: 'G#m', angle: 150 },
  { name: 'D#m', angle: 180 },
  { name: 'A#m', angle: 210 },
  { name: 'Dm', angle: 330 },
  { name: 'Gm', angle: 300 },
  { name: 'Cm', angle: 270 },
  { name: 'Fm', angle: 240 },
  { name: 'Bbm', angle: 210 },
  { name: 'Ebm', angle: 180 },
];

export default function CircleOfFifths({
  highlightKey,
  showMinor = true,
  animated = true,
  className = '',
}: CircleOfFifthsProps) {
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const size = 400;
  const centerX = size / 2;
  const centerY = size / 2;
  const outerRadius = 160;
  const innerRadius = 110;
  const minorRadius = 80;

  const polarToCartesian = (radius: number, angle: number) => {
    const rad = (angle - 90) * (Math.PI / 180);
    return {
      x: centerX + radius * Math.cos(rad),
      y: centerY + radius * Math.sin(rad),
    };
  };

  return (
    <div className={`relative ${className}`}>
      <svg width="100%" height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Outer circle */}
        <motion.circle
          cx={centerX}
          cy={centerY}
          r={outerRadius}
          fill="none"
          stroke="#c9a84c"
          strokeWidth={2}
          initial={animated ? { pathLength: 0 } : {}}
          animate={animated ? { pathLength: 1 } : {}}
          transition={{ duration: 1 }}
        />

        {/* Inner circle */}
        <motion.circle
          cx={centerX}
          cy={centerY}
          r={innerRadius}
          fill="none"
          stroke="#c9a84c"
          strokeWidth={2}
          initial={animated ? { pathLength: 0 } : {}}
          animate={animated ? { pathLength: 1 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
        />

        {/* Minor circle */}
        {showMinor && (
          <motion.circle
            cx={centerX}
            cy={centerY}
            r={minorRadius}
            fill="none"
            stroke="#c9a84c"
            strokeWidth={1.5}
            strokeDasharray="5,5"
            initial={animated ? { pathLength: 0 } : {}}
            animate={animated ? { pathLength: 1 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
          />
        )}

        {/* Major keys */}
        {MAJOR_KEYS.map((key, i) => {
          const pos = polarToCartesian((outerRadius + innerRadius) / 2, key.angle);
          const isHighlighted = highlightKey === key.name || hoveredKey === key.name;
          const accidentals = key.sharps ? `${key.sharps}♯` : key.flats ? `${key.flats}♭` : '';

          return (
            <motion.g
              key={key.name}
              initial={animated ? { scale: 0, opacity: 0 } : {}}
              animate={animated ? { scale: 1, opacity: 1 } : {}}
              transition={{ delay: 0.5 + i * 0.05, type: 'spring' }}
              onMouseEnter={() => setHoveredKey(key.name)}
              onMouseLeave={() => setHoveredKey(null)}
              style={{ cursor: 'pointer' }}
            >
              <circle
                cx={pos.x}
                cy={pos.y}
                r={isHighlighted ? 22 : 18}
                fill={isHighlighted ? '#c9a84c' : '#1a2332'}
                stroke={isHighlighted ? '#c9a84c' : 'none'}
                strokeWidth={2}
              />
              <text
                x={pos.x}
                y={pos.y + 5}
                fontSize="14"
                fontWeight="bold"
                fontFamily="sans-serif"
                fill="white"
                textAnchor="middle"
              >
                {key.name}
              </text>
              {accidentals && (
                <text
                  x={pos.x}
                  y={pos.y + 20}
                  fontSize="10"
                  fontFamily="sans-serif"
                  fill={isHighlighted ? '#1a2332' : '#9aa3b0'}
                  textAnchor="middle"
                >
                  {accidentals}
                </text>
              )}
            </motion.g>
          );
        })}

        {/* Minor keys */}
        {showMinor && MINOR_KEYS.map((key, i) => {
          const pos = polarToCartesian(minorRadius, key.angle);
          const isHighlighted = highlightKey === key.name || hoveredKey === key.name;

          return (
            <motion.g
              key={key.name}
              initial={animated ? { scale: 0, opacity: 0 } : {}}
              animate={animated ? { scale: 1, opacity: 1 } : {}}
              transition={{ delay: 0.8 + i * 0.05, type: 'spring' }}
              onMouseEnter={() => setHoveredKey(key.name)}
              onMouseLeave={() => setHoveredKey(null)}
              style={{ cursor: 'pointer' }}
            >
              <circle
                cx={pos.x}
                cy={pos.y}
                r={isHighlighted ? 18 : 14}
                fill={isHighlighted ? '#c9a84c' : '#5a6577'}
                stroke={isHighlighted ? '#c9a84c' : 'none'}
                strokeWidth={2}
              />
              <text
                x={pos.x}
                y={pos.y + 4}
                fontSize="11"
                fontWeight="bold"
                fontFamily="sans-serif"
                fill="white"
                textAnchor="middle"
              >
                {key.name}
              </text>
            </motion.g>
          );
        })}

        {/* Center text */}
        <motion.text
          x={centerX}
          y={centerY - 5}
          fontSize="14"
          fontWeight="bold"
          fontFamily="sans-serif"
          fill="#1a2332"
          textAnchor="middle"
          initial={animated ? { opacity: 0 } : {}}
          animate={animated ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
        >
          Circle of
        </motion.text>
        <motion.text
          x={centerX}
          y={centerY + 15}
          fontSize="14"
          fontWeight="bold"
          fontFamily="sans-serif"
          fill="#1a2332"
          textAnchor="middle"
          initial={animated ? { opacity: 0 } : {}}
          animate={animated ? { opacity: 1 } : {}}
          transition={{ delay: 1.1 }}
        >
          Fifths
        </motion.text>
      </svg>
    </div>
  );
}
