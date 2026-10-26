import { motion } from 'framer-motion';

interface ScaleDisplayProps {
  scaleName: string; // e.g., "C Major", "G Major"
  notes: string[]; // e.g., ["C", "D", "E", "F", "G", "A", "B", "C"]
  direction?: 'ascending' | 'descending' | 'both';
  showFingering?: boolean;
  animated?: boolean;
  className?: string;
}

// Scale patterns (whole/half step patterns)
const SCALE_PATTERNS: Record<string, number[]> = {
  'Major': [2, 2, 1, 2, 2, 2, 1],
  'Natural Minor': [2, 1, 2, 2, 1, 2, 2],
  'Harmonic Minor': [2, 1, 2, 2, 1, 3, 1],
  'Melodic Minor': [2, 1, 2, 2, 2, 2, 1],
};

export default function ScaleDisplay({
  scaleName,
  notes,
  direction = 'ascending',
  showFingering = false,
  animated = true,
  className = '',
}: ScaleDisplayProps) {
  const width = 600;
  const height = 200;
  const startX = 60;
  const endX = width - 40;
  const staffY = 80;
  const noteSpacing = (endX - startX) / (notes.length - 1);

  // Note positions on staff (simplified for treble clef)
  const getNotePosition = (note: string, index: number) => {
    const notePositions: Record<string, number> = {
      'C': 0, 'D': 1, 'E': 2, 'F': 3, 'G': 4, 'A': 5, 'B': 6,
    };
    const basePos = notePositions[note.replace(/[♯♭#b]/g, '')] || 0;
    return basePos + (index > 0 ? 7 : 0); // Adjust for octave
  };

  const getNoteY = (position: number) => {
    return staffY + 40 - (position * 8);
  };

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
            y1={staffY + i * 10}
            x2={endX}
            y2={staffY + i * 10}
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
          y={staffY + 50}
          fontSize="50"
          fontFamily="serif"
          fill="#1a2332"
          initial={animated ? { opacity: 0, x: -20 } : {}}
          animate={animated ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          𝄞
        </motion.text>

        {/* Scale notes */}
        {notes.map((note, i) => {
          const x = startX + (i * noteSpacing);
          const position = getNotePosition(note, i);
          const y = getNoteY(position);
          const isAccidental = note.includes('♯') || note.includes('♭') || note.includes('#') || note.includes('b');

          return (
            <motion.g
              key={i}
              initial={animated ? { scale: 0, opacity: 0 } : {}}
              animate={animated ? { scale: 1, opacity: 1 } : {}}
              transition={{ delay: 0.5 + i * 0.1, type: 'spring', stiffness: 200 }}
            >
              {/* Accidental if needed */}
              {isAccidental && (
                <text
                  x={x - 12}
                  y={y + 5}
                  fontSize="16"
                  fontFamily="serif"
                  fill="#1a2332"
                >
                  {note.includes('♯') || note.includes('#') ? '♯' : '♭'}
                </text>
              )}

              {/* Note head */}
              <ellipse
                cx={x}
                cy={y}
                rx={7}
                ry={5}
                fill="#1a2332"
                transform={`rotate(-20 ${x} ${y})`}
              />

              {/* Stem */}
              <line
                x1={x + 6}
                y1={y}
                x2={x + 6}
                y2={y - 30}
                stroke="#1a2332"
                strokeWidth={2}
              />

              {/* Note name label */}
              <motion.text
                x={x}
                y={y + 25}
                fontSize="12"
                fontWeight="bold"
                fontFamily="sans-serif"
                fill="#c9a84c"
                textAnchor="middle"
                initial={animated ? { opacity: 0, y: 5 } : {}}
                animate={animated ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.7 + i * 0.1 }}
              >
                {note}
              </motion.text>

              {/* Scale degree number */}
              <motion.text
                x={x}
                y={y - 40}
                fontSize="10"
                fontFamily="sans-serif"
                fill="#5a6577"
                textAnchor="middle"
                initial={animated ? { opacity: 0 } : {}}
                animate={animated ? { opacity: 1 } : {}}
                transition={{ delay: 0.8 + i * 0.1 }}
              >
                {i + 1}
              </motion.text>

              {/* Connecting line to next note */}
              {i < notes.length - 1 && (
                <motion.line
                  x1={x + 7}
                  y1={y}
                  x2={x + noteSpacing - 7}
                  y2={getNoteY(getNotePosition(notes[i + 1], i + 1))}
                  stroke="#c9a84c"
                  strokeWidth={1}
                  strokeDasharray="3,3"
                  initial={animated ? { pathLength: 0, opacity: 0 } : {}}
                  animate={animated ? { pathLength: 1, opacity: 0.5 } : {}}
                  transition={{ delay: 0.9 + i * 0.1, duration: 0.3 }}
                />
              )}
            </motion.g>
          );
        })}

        {/* Scale name */}
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
          transition={{ delay: 1.2 }}
        >
          {scaleName} Scale ({direction})
        </motion.text>
      </svg>
    </div>
  );
}

// Interval display component
interface IntervalDisplayProps {
  note1: string;
  note2: string;
  intervalName: string;
  animated?: boolean;
  className?: string;
}

export function IntervalDisplay({
  note1,
  note2,
  intervalName,
  animated = true,
  className = '',
}: IntervalDisplayProps) {
  const width = 300;
  const height = 150;
  const centerX = width / 2;
  const staffY = 60;

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
            x1={50}
            y1={staffY + i * 12}
            x2={width - 50}
            y2={staffY + i * 12}
            stroke="#1a2332"
            strokeWidth={1.5}
            initial={animated ? { pathLength: 0 } : {}}
            animate={animated ? { pathLength: 1 } : {}}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          />
        ))}

        {/* First note */}
        <motion.g
          initial={animated ? { scale: 0, opacity: 0 } : {}}
          animate={animated ? { scale: 1, opacity: 1 } : {}}
          transition={{ delay: 0.5, type: 'spring' }}
        >
          <ellipse
            cx={centerX - 40}
            cy={staffY + 30}
            rx={7}
            ry={5}
            fill="#1a2332"
            transform={`rotate(-20 ${centerX - 40} ${staffY + 30})`}
          />
          <line
            x1={centerX - 33}
            y1={staffY + 30}
            x2={centerX - 33}
            y2={staffY}
            stroke="#1a2332"
            strokeWidth={2}
          />
          <text
            x={centerX - 40}
            y={staffY + 55}
            fontSize="14"
            fontWeight="bold"
            fontFamily="sans-serif"
            fill="#c9a84c"
            textAnchor="middle"
          >
            {note1}
          </text>
        </motion.g>

        {/* Second note */}
        <motion.g
          initial={animated ? { scale: 0, opacity: 0 } : {}}
          animate={animated ? { scale: 1, opacity: 1 } : {}}
          transition={{ delay: 0.7, type: 'spring' }}
        >
          <ellipse
            cx={centerX + 40}
            cy={staffY + 10}
            rx={7}
            ry={5}
            fill="#1a2332"
            transform={`rotate(-20 ${centerX + 40} ${staffY + 10})`}
          />
          <line
            x1={centerX + 47}
            y1={staffY + 10}
            x2={centerX + 47}
            y2={staffY - 20}
            stroke="#1a2332"
            strokeWidth={2}
          />
          <text
            x={centerX + 40}
            y={staffY + 35}
            fontSize="14"
            fontWeight="bold"
            fontFamily="sans-serif"
            fill="#c9a84c"
            textAnchor="middle"
          >
            {note2}
          </text>
        </motion.g>

        {/* Interval bracket */}
        <motion.g
          initial={animated ? { opacity: 0 } : {}}
          animate={animated ? { opacity: 1 } : {}}
          transition={{ delay: 0.9 }}
        >
          <path
            d={`M ${centerX - 40} ${staffY - 30} L ${centerX - 40} ${staffY - 40} L ${centerX + 40} ${staffY - 40} L ${centerX + 40} ${staffY - 30}`}
            fill="none"
            stroke="#c9a84c"
            strokeWidth={2}
          />
          <text
            x={centerX}
            y={staffY - 45}
            fontSize="14"
            fontWeight="bold"
            fontFamily="sans-serif"
            fill="#c9a84c"
            textAnchor="middle"
          >
            {intervalName}
          </text>
        </motion.g>
      </svg>
    </div>
  );
}
