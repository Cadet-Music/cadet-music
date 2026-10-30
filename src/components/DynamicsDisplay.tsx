import { motion } from 'framer-motion';

interface DynamicsDisplayProps {
  dynamics?: Array<{
    symbol: string; // p, mp, mf, f, ff, etc.
    position: number; // Beat position
  }>;
  showLegend?: boolean;
  animated?: boolean;
  className?: string;
}

const DYNAMICS_INFO: Record<string, { name: string; volume: number; color: string }> = {
  'ppp': { name: 'Pianississimo', volume: 10, color: '#e8e8e8' },
  'pp': { name: 'Pianissimo', volume: 20, color: '#d0d0d0' },
  'p': { name: 'Piano', volume: 35, color: '#b8b8b8' },
  'mp': { name: 'Mezzo Piano', volume: 50, color: '#a0a0a0' },
  'mf': { name: 'Mezzo Forte', volume: 65, color: '#888888' },
  'f': { name: 'Forte', volume: 80, color: '#707070' },
  'ff': { name: 'Fortissimo', volume: 90, color: '#585858' },
  'fff': { name: 'Fortississimo', volume: 100, color: '#404040' },
};

export default function DynamicsDisplay({
  dynamics = [],
  showLegend = true,
  animated = true,
  className = '',
}: DynamicsDisplayProps) {
  const width = 600;
  const height = 200;
  const startX = 80;
  const endX = width - 40;
  const staffY = 80;

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
            y1={staffY + i * 12}
            x2={endX}
            y2={staffY + i * 12}
            stroke="#1a2332"
            strokeWidth={1.5}
            initial={animated ? { pathLength: 0 } : {}}
            animate={animated ? { pathLength: 1 } : {}}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          />
        ))}

        {/* Dynamics symbols */}
        {dynamics.map((dyn, i) => {
          const info = DYNAMICS_INFO[dyn.symbol];
          if (!info) return null;

          const x = startX + (i * 80);
          const y = staffY - 30;

          return (
            <motion.g
              key={i}
              initial={animated ? { scale: 0, opacity: 0, y: -20 } : {}}
              animate={animated ? { scale: 1, opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 + i * 0.15, type: 'spring', stiffness: 200 }}
            >
              {/* Dynamic symbol */}
              <text
                x={x}
                y={y}
                fontSize="24"
                fontWeight="bold"
                fontStyle="italic"
                fontFamily="serif"
                fill="#1a2332"
                textAnchor="middle"
              >
                {dyn.symbol}
              </text>

              {/* Volume indicator bar */}
              <motion.rect
                x={x - 15}
                y={staffY + 70}
                width={30}
                height={info.volume / 2}
                fill={info.color}
                rx={3}
                initial={animated ? { height: 0, y: staffY + 70 + info.volume / 2 } : {}}
                animate={animated ? { height: info.volume / 2, y: staffY + 70 } : {}}
                transition={{ delay: 0.7 + i * 0.15, duration: 0.5 }}
              />

              {/* Volume percentage */}
              <motion.text
                x={x}
                y={staffY + 90}
                fontSize="10"
                fontFamily="sans-serif"
                fill="#5a6577"
                textAnchor="middle"
                initial={animated ? { opacity: 0 } : {}}
                animate={animated ? { opacity: 1 } : {}}
                transition={{ delay: 1 + i * 0.15 }}
              >
                {info.volume}%
              </motion.text>
            </motion.g>
          );
        })}

        {/* Legend */}
        {showLegend && (
          <motion.g
            initial={animated ? { opacity: 0 } : {}}
            animate={animated ? { opacity: 1 } : {}}
            transition={{ delay: 1.5 }}
          >
            <text
              x={startX}
              y={height - 10}
              fontSize="11"
              fontFamily="sans-serif"
              fill="#5a6577"
            >
              p = piano (soft) • mp = mezzo piano • mf = mezzo forte • f = forte (loud)
            </text>
          </motion.g>
        )}
      </svg>
    </div>
  );
}

// Dynamics comparison component
interface DynamicsComparisonProps {
  from: string;
  to: string;
  type: 'crescendo' | 'decrescendo';
  animated?: boolean;
  className?: string;
}

export function DynamicsComparison({
  from,
  to,
  type,
  animated = true,
  className = '',
}: DynamicsComparisonProps) {
  const width = 400;
  const height = 150;
  const startX = 50;
  const endX = width - 50;

  const fromInfo = DYNAMICS_INFO[from];
  const toInfo = DYNAMICS_INFO[to];

  if (!fromInfo || !toInfo) return null;

  return (
    <div className={`relative ${className}`}>
      <svg
        width="100%"
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="overflow-visible"
      >
        {/* From dynamic */}
        <motion.g
          initial={animated ? { opacity: 0, x: -20 } : {}}
          animate={animated ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <text
            x={startX}
            y={60}
            fontSize="32"
            fontWeight="bold"
            fontStyle="italic"
            fontFamily="serif"
            fill="#1a2332"
          >
            {from}
          </text>
          <text
            x={startX}
            y={85}
            fontSize="12"
            fontFamily="sans-serif"
            fill="#5a6577"
          >
            {fromInfo.name}
          </text>
        </motion.g>

        {/* Hairpin */}
        <motion.g
          initial={animated ? { opacity: 0, scaleX: 0 } : {}}
          animate={animated ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.8 }}
          style={{ originX: type === 'crescendo' ? 0 : 1 }}
        >
          {type === 'crescendo' ? (
            <>
              <line
                x1={startX + 80}
                y1={50}
                x2={endX - 80}
                y2={30}
                stroke="#c9a84c"
                strokeWidth={2}
              />
              <line
                x1={startX + 80}
                y1={50}
                x2={endX - 80}
                y2={70}
                stroke="#c9a84c"
                strokeWidth={2}
              />
            </>
          ) : (
            <>
              <line
                x1={startX + 80}
                y1={30}
                x2={endX - 80}
                y2={50}
                stroke="#c9a84c"
                strokeWidth={2}
              />
              <line
                x1={startX + 80}
                y1={70}
                x2={endX - 80}
                y2={50}
                stroke="#c9a84c"
                strokeWidth={2}
              />
            </>
          )}
        </motion.g>

        {/* To dynamic */}
        <motion.g
          initial={animated ? { opacity: 0, x: 20 } : {}}
          animate={animated ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <text
            x={endX}
            y={60}
            fontSize="32"
            fontWeight="bold"
            fontStyle="italic"
            fontFamily="serif"
            fill="#1a2332"
            textAnchor="end"
          >
            {to}
          </text>
          <text
            x={endX}
            y={85}
            fontSize="12"
            fontFamily="sans-serif"
            fill="#5a6577"
            textAnchor="end"
          >
            {toInfo.name}
          </text>
        </motion.g>

        {/* Arrow label */}
        <motion.text
          x={width / 2}
          y={110}
          fontSize="14"
          fontWeight="bold"
          fontFamily="sans-serif"
          fill="#c9a84c"
          textAnchor="middle"
          initial={animated ? { opacity: 0 } : {}}
          animate={animated ? { opacity: 1 } : {}}
          transition={{ delay: 1.3 }}
        >
          {type === 'crescendo' ? '← getting louder →' : '← getting softer →'}
        </motion.text>
      </svg>
    </div>
  );
}
