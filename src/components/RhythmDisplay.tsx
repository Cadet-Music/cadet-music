import { motion } from 'framer-motion';

interface RhythmDisplayProps {
  pattern: Array<{
    type: 'quarter' | 'half' | 'whole' | 'eighth' | 'sixteenth' | 'rest';
    count?: number;
  }>;
  timeSignature?: string;
  showCounting?: boolean;
  animated?: boolean;
  highlightIndex?: number;
  className?: string;
}

export default function RhythmDisplay({
  pattern,
  timeSignature = '4/4',
  showCounting = true,
  animated = true,
  highlightIndex = -1,
  className = '',
}: RhythmDisplayProps) {
  const width = 600;
  const height = 150;
  const startX = 80;
  const endX = width - 40;
  const beatWidth = (endX - startX) / 4; // 4 beats in 4/4 time

  // Calculate positions for each rhythm element
  const getPositions = () => {
    const positions: Array<{ x: number; beat: number }> = [];
    let currentBeat = 0;

    pattern.forEach((item) => {
      const duration = item.count || 1;
      const x = startX + (currentBeat * beatWidth);
      
      positions.push({ x, beat: currentBeat });
      currentBeat += duration;
    });

    return positions;
  };

  const positions = getPositions();

  // Rhythm symbol components
  const QuarterNote = ({ x, y, highlighted }: { x: number; y: number; highlighted: boolean }) => (
    <motion.g
      initial={animated ? { scale: 0, opacity: 0 } : {}}
      animate={animated ? { scale: 1, opacity: 1 } : {}}
      transition={{ type: 'spring', stiffness: 200 }}
    >
      <ellipse
        cx={x}
        cy={y}
        rx={8}
        ry={6}
        fill={highlighted ? '#c9a84c' : '#1a2332'}
        stroke={highlighted ? '#c9a84c' : '#1a2332'}
        strokeWidth={2}
        transform={`rotate(-20 ${x} ${y})`}
      />
      <line
        x1={x + 7}
        y1={y}
        x2={x + 7}
        y2={y - 35}
        stroke={highlighted ? '#c9a84c' : '#1a2332'}
        strokeWidth={2}
      />
    </motion.g>
  );

  const HalfNote = ({ x, y, highlighted }: { x: number; y: number; highlighted: boolean }) => (
    <motion.g
      initial={animated ? { scale: 0, opacity: 0 } : {}}
      animate={animated ? { scale: 1, opacity: 1 } : {}}
      transition={{ type: 'spring', stiffness: 200 }}
    >
      <ellipse
        cx={x}
        cy={y}
        rx={8}
        ry={6}
        fill="none"
        stroke={highlighted ? '#c9a84c' : '#1a2332'}
        strokeWidth={2}
        transform={`rotate(-20 ${x} ${y})`}
      />
      <line
        x1={x + 7}
        y1={y}
        x2={x + 7}
        y2={y - 35}
        stroke={highlighted ? '#c9a84c' : '#1a2332'}
        strokeWidth={2}
      />
    </motion.g>
  );

  const WholeNote = ({ x, y, highlighted }: { x: number; y: number; highlighted: boolean }) => (
    <motion.g
      initial={animated ? { scale: 0, opacity: 0 } : {}}
      animate={animated ? { scale: 1, opacity: 1 } : {}}
      transition={{ type: 'spring', stiffness: 200 }}
    >
      <ellipse
        cx={x}
        cy={y}
        rx={10}
        ry={7}
        fill="none"
        stroke={highlighted ? '#c9a84c' : '#1a2332'}
        strokeWidth={2.5}
        transform={`rotate(-20 ${x} ${y})`}
      />
    </motion.g>
  );

  const EighthNote = ({ x, y, highlighted }: { x: number; y: number; highlighted: boolean }) => (
    <motion.g
      initial={animated ? { scale: 0, opacity: 0 } : {}}
      animate={animated ? { scale: 1, opacity: 1 } : {}}
      transition={{ type: 'spring', stiffness: 200 }}
    >
      <ellipse
        cx={x}
        cy={y}
        rx={8}
        ry={6}
        fill={highlighted ? '#c9a84c' : '#1a2332'}
        stroke={highlighted ? '#c9a84c' : '#1a2332'}
        strokeWidth={2}
        transform={`rotate(-20 ${x} ${y})`}
      />
      <line
        x1={x + 7}
        y1={y}
        x2={x + 7}
        y2={y - 35}
        stroke={highlighted ? '#c9a84c' : '#1a2332'}
        strokeWidth={2}
      />
      <path
        d={`M ${x + 7} ${y - 35} Q ${x + 15} ${y - 25} ${x + 7} ${y - 15}`}
        fill="none"
        stroke={highlighted ? '#c9a84c' : '#1a2332'}
        strokeWidth={2}
      />
    </motion.g>
  );

  const Rest = ({ x, y, type, highlighted }: { x: number; y: number; type: string; highlighted: boolean }) => (
    <motion.g
      initial={animated ? { scale: 0, opacity: 0 } : {}}
      animate={animated ? { scale: 1, opacity: 1 } : {}}
      transition={{ type: 'spring', stiffness: 200 }}
    >
      {type === 'quarter' && (
        <path
          d={`M ${x - 5} ${y - 10} L ${x + 5} ${y - 5} L ${x - 5} ${y} L ${x + 5} ${y + 5}`}
          fill="none"
          stroke={highlighted ? '#c9a84c' : '#1a2332'}
          strokeWidth={2.5}
        />
      )}
      {type === 'half' && (
        <rect
          x={x - 6}
          y={y - 8}
          width={12}
          height={6}
          fill={highlighted ? '#c9a84c' : '#1a2332'}
        />
      )}
      {type === 'whole' && (
        <rect
          x={x - 8}
          y={y - 10}
          width={16}
          height={8}
          fill={highlighted ? '#c9a84c' : '#1a2332'}
        />
      )}
    </motion.g>
  );

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
            y1={40 + i * 15}
            x2={endX}
            y2={40 + i * 15}
            stroke="#1a2332"
            strokeWidth={1.5}
            initial={animated ? { pathLength: 0 } : {}}
            animate={animated ? { pathLength: 1 } : {}}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          />
        ))}

        {/* Bar lines */}
        {[0, 1, 2, 3, 4].map((beat) => (
          <motion.line
            key={beat}
            x1={startX + beat * beatWidth}
            y1={40}
            x2={startX + beat * beatWidth}
            y2={100}
            stroke="#1a2332"
            strokeWidth={beat === 0 || beat === 4 ? 2 : 1}
            strokeOpacity={0.3}
            initial={animated ? { pathLength: 0 } : {}}
            animate={animated ? { pathLength: 1 } : {}}
            transition={{ duration: 0.3, delay: 0.5 }}
          />
        ))}

        {/* Time signature */}
        {timeSignature && (
          <motion.g
            initial={animated ? { opacity: 0, scale: 0 } : {}}
            animate={animated ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3, type: 'spring' }}
          >
            <text
              x={startX - 15}
              y={65}
              fontSize="20"
              fontWeight="bold"
              fontFamily="serif"
              fill="#1a2332"
              textAnchor="middle"
            >
              {timeSignature.split('/')[0]}
            </text>
            <text
              x={startX - 15}
              y={90}
              fontSize="20"
              fontWeight="bold"
              fontFamily="serif"
              fill="#1a2332"
              textAnchor="middle"
            >
              {timeSignature.split('/')[1]}
            </text>
          </motion.g>
        )}

        {/* Rhythm pattern */}
        {pattern.map((item, i) => {
          const pos = positions[i];
          const y = 70;
          const isHighlighted = i === highlightIndex;

          return (
            <g key={i}>
              {item.type === 'quarter' && <QuarterNote x={pos.x} y={y} highlighted={isHighlighted} />}
              {item.type === 'half' && <HalfNote x={pos.x} y={y} highlighted={isHighlighted} />}
              {item.type === 'whole' && <WholeNote x={pos.x} y={y} highlighted={isHighlighted} />}
              {item.type === 'eighth' && <EighthNote x={pos.x} y={y} highlighted={isHighlighted} />}
              {item.type === 'rest' && <Rest x={pos.x} y={y} type="quarter" highlighted={isHighlighted} />}
              
              {/* Counting labels */}
              {showCounting && (
                <motion.text
                  x={pos.x}
                  y={120}
                  fontSize="14"
                  fontFamily="sans-serif"
                  fill="#5a6577"
                  textAnchor="middle"
                  initial={animated ? { opacity: 0 } : {}}
                  animate={animated ? { opacity: 1 } : {}}
                  transition={{ delay: 0.5 + i * 0.1 }}
                >
                  {item.count || 1}
                </motion.text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
