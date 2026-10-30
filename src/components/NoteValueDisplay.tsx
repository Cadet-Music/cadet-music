import { motion } from 'framer-motion';

interface NoteValueDisplayProps {
  noteType: 'whole' | 'half' | 'quarter' | 'eighth' | 'sixteenth';
  showDuration?: boolean;
  showName?: boolean;
  animated?: boolean;
  className?: string;
}

export default function NoteValueDisplay({
  noteType,
  showDuration = true,
  showName = true,
  animated = true,
  className = '',
}: NoteValueDisplayProps) {
  const width = 200;
  const height = 150;
  const centerX = width / 2;
  const centerY = height / 2;

  const noteInfo: Record<string, { name: string; beats: string; description: string }> = {
    'whole': { name: 'Whole Note', beats: '4 beats', description: 'Semibreve' },
    'half': { name: 'Half Note', beats: '2 beats', description: 'Minim' },
    'quarter': { name: 'Quarter Note', beats: '1 beat', description: 'Crotchet' },
    'eighth': { name: 'Eighth Note', beats: '1/2 beat', description: 'Quaver' },
    'sixteenth': { name: 'Sixteenth Note', beats: '1/4 beat', description: 'Semiquaver' },
  };

  const info = noteInfo[noteType];

  return (
    <div className={`relative ${className}`}>
      <svg
        width="100%"
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="overflow-visible"
      >
        {/* Note head */}
        <motion.g
          initial={animated ? { scale: 0, opacity: 0 } : {}}
          animate={animated ? { scale: 1, opacity: 1 } : {}}
          transition={{ type: 'spring', stiffness: 200 }}
        >
          <ellipse
            cx={centerX}
            cy={centerY}
            rx={noteType === 'whole' ? 18 : 14}
            ry={noteType === 'whole' ? 12 : 10}
            fill={noteType === 'whole' || noteType === 'half' ? 'none' : '#1a2332'}
            stroke="#1a2332"
            strokeWidth={3}
            transform={`rotate(-20 ${centerX} ${centerY})`}
          />
        </motion.g>

        {/* Stem (not for whole notes) */}
        {noteType !== 'whole' && (
          <motion.line
            x1={centerX + 13}
            y1={centerY}
            x2={centerX + 13}
            y2={centerY - 50}
            stroke="#1a2332"
            strokeWidth={3}
            initial={animated ? { pathLength: 0 } : {}}
            animate={animated ? { pathLength: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.3 }}
          />
        )}

        {/* Flag for eighth notes */}
        {noteType === 'eighth' && (
          <motion.path
            d={`M ${centerX + 13} ${centerY - 50} Q ${centerX + 25} ${centerY - 35} ${centerX + 13} ${centerY - 20}`}
            fill="none"
            stroke="#1a2332"
            strokeWidth={3}
            initial={animated ? { pathLength: 0 } : {}}
            animate={animated ? { pathLength: 1 } : {}}
            transition={{ delay: 0.6, duration: 0.3 }}
          />
        )}

        {/* Double flag for sixteenth notes */}
        {noteType === 'sixteenth' && (
          <>
            <motion.path
              d={`M ${centerX + 13} ${centerY - 50} Q ${centerX + 25} ${centerY - 35} ${centerX + 13} ${centerY - 20}`}
              fill="none"
              stroke="#1a2332"
              strokeWidth={3}
              initial={animated ? { pathLength: 0 } : {}}
              animate={animated ? { pathLength: 1 } : {}}
              transition={{ delay: 0.6, duration: 0.3 }}
            />
            <motion.path
              d={`M ${centerX + 13} ${centerY - 40} Q ${centerX + 25} ${centerY - 25} ${centerX + 13} ${centerY - 10}`}
              fill="none"
              stroke="#1a2332"
              strokeWidth={3}
              initial={animated ? { pathLength: 0 } : {}}
              animate={animated ? { pathLength: 1 } : {}}
              transition={{ delay: 0.8, duration: 0.3 }}
            />
          </>
        )}

        {/* Duration text */}
        {showDuration && (
          <motion.text
            x={centerX}
            y={height - 20}
            fontSize="16"
            fontWeight="bold"
            fontFamily="sans-serif"
            fill="#c9a84c"
            textAnchor="middle"
            initial={animated ? { opacity: 0, y: 10 } : {}}
            animate={animated ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1 }}
          >
            {info.beats}
          </motion.text>
        )}

        {/* Note name */}
        {showName && (
          <motion.text
            x={centerX}
            y={height - 5}
            fontSize="12"
            fontFamily="sans-serif"
            fill="#5a6577"
            textAnchor="middle"
            initial={animated ? { opacity: 0 } : {}}
            animate={animated ? { opacity: 1 } : {}}
            transition={{ delay: 1.2 }}
          >
            {info.name} ({info.description})
          </motion.text>
        )}
      </svg>
    </div>
  );
}

// Rest display component
interface RestDisplayProps {
  restType: 'whole' | 'half' | 'quarter' | 'eighth' | 'sixteenth';
  showDuration?: boolean;
  animated?: boolean;
  className?: string;
}

export function RestDisplay({
  restType,
  showDuration = true,
  animated = true,
  className = '',
}: RestDisplayProps) {
  const width = 200;
  const height = 150;
  const centerX = width / 2;
  const centerY = height / 2;

  const restInfo: Record<string, { name: string; beats: string }> = {
    'whole': { name: 'Whole Rest', beats: '4 beats' },
    'half': { name: 'Half Rest', beats: '2 beats' },
    'quarter': { name: 'Quarter Rest', beats: '1 beat' },
    'eighth': { name: 'Eighth Rest', beats: '1/2 beat' },
    'sixteenth': { name: 'Sixteenth Rest', beats: '1/4 beat' },
  };

  const info = restInfo[restType];

  return (
    <div className={`relative ${className}`}>
      <svg
        width="100%"
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="overflow-visible"
      >
        <motion.g
          initial={animated ? { scale: 0, opacity: 0 } : {}}
          animate={animated ? { scale: 1, opacity: 1 } : {}}
          transition={{ type: 'spring', stiffness: 200 }}
        >
          {restType === 'whole' && (
            <rect
              x={centerX - 15}
              y={centerY - 8}
              width={30}
              height={16}
              fill="#1a2332"
            />
          )}
          {restType === 'half' && (
            <rect
              x={centerX - 12}
              y={centerY}
              width={24}
              height={12}
              fill="#1a2332"
            />
          )}
          {restType === 'quarter' && (
            <path
              d={`M ${centerX - 10} ${centerY - 15} L ${centerX + 10} ${centerY - 5} L ${centerX - 10} ${centerY + 5} L ${centerX + 10} ${centerY + 15}`}
              fill="none"
              stroke="#1a2332"
              strokeWidth={4}
              strokeLinecap="round"
            />
          )}
          {restType === 'eighth' && (
            <>
              <circle cx={centerX + 5} cy={centerY - 10} r={4} fill="#1a2332" />
              <line
                x1={centerX + 5}
                y1={centerY - 10}
                x2={centerX - 5}
                y2={centerY + 15}
                stroke="#1a2332"
                strokeWidth={3}
              />
            </>
          )}
          {restType === 'sixteenth' && (
            <>
              <circle cx={centerX + 5} cy={centerY - 15} r={4} fill="#1a2332" />
              <circle cx={centerX + 5} cy={centerY - 5} r={4} fill="#1a2332" />
              <line
                x1={centerX + 5}
                y1={centerY - 15}
                x2={centerX - 5}
                y2={centerY + 15}
                stroke="#1a2332"
                strokeWidth={3}
              />
            </>
          )}
        </motion.g>

        {/* Duration text */}
        {showDuration && (
          <motion.text
            x={centerX}
            y={height - 20}
            fontSize="16"
            fontWeight="bold"
            fontFamily="sans-serif"
            fill="#c9a84c"
            textAnchor="middle"
            initial={animated ? { opacity: 0, y: 10 } : {}}
            animate={animated ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
          >
            {info.beats}
          </motion.text>
        )}

        {/* Rest name */}
        <motion.text
          x={centerX}
          y={height - 5}
          fontSize="12"
          fontFamily="sans-serif"
          fill="#5a6577"
          textAnchor="middle"
          initial={animated ? { opacity: 0 } : {}}
          animate={animated ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
        >
          {info.name}
        </motion.text>
      </svg>
    </div>
  );
}
