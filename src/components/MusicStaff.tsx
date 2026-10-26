import { motion } from 'framer-motion';

interface MusicStaffProps {
  notes?: Array<{
    pitch: string; // e.g., "C4", "D4", "E4"
    duration?: 'whole' | 'half' | 'quarter' | 'eighth' | 'sixteenth';
    position: number; // Staff position (0 = bottom line, 4 = top line, can be negative/above)
  }>;
  clef?: 'treble' | 'bass' | 'alto' | 'tenor';
  timeSignature?: string; // e.g., "4/4", "3/4"
  keySignature?: string; // e.g., "G Major", "F Major"
  showLabels?: boolean;
  animated?: boolean;
  className?: string;
}

export default function MusicStaff({
  notes = [],
  clef = 'treble',
  timeSignature,
  keySignature,
  showLabels = false,
  animated = true,
  className = '',
}: MusicStaffProps) {
  // Staff dimensions
  const staffWidth = 600;
  const staffHeight = 120;
  const lineSpacing = 20;
  const startX = 80;
  const endX = staffWidth - 40;

  // Generate staff lines
  const staffLines = Array.from({ length: 5 }, (_, i) => ({
    y: 20 + i * lineSpacing,
  }));

  // Note position calculator
  const getNoteY = (position: number) => {
    // Position 0 = bottom line (E4 in treble clef)
    // Each position is half a line spacing
    return staffHeight - 20 - (position * lineSpacing / 2);
  };

  // Note head SVG path
  const NoteHead = ({ x, y, duration = 'quarter', animated: noteAnimated = true }: { x: number; y: number; duration?: string; animated?: boolean }) => {
    const isFilled = duration !== 'whole' && duration !== 'half';
    
    return (
      <motion.g
        initial={noteAnimated ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
        animate={noteAnimated ? { scale: 1, opacity: 1 } : {}}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      >
        {/* Note head */}
        <ellipse
          cx={x}
          cy={y}
          rx={8}
          ry={6}
          fill={isFilled ? '#1a2332' : 'none'}
          stroke="#1a2332"
          strokeWidth={2}
          transform={`rotate(-20 ${x} ${y})`}
        />
        
        {/* Stem (for quarter and eighth notes) */}
        {(duration === 'quarter' || duration === 'eighth' || duration === 'sixteenth') && (
          <motion.line
            x1={x + 7}
            y1={y}
            x2={x + 7}
            y2={y - 35}
            stroke="#1a2332"
            strokeWidth={2}
            initial={noteAnimated ? { pathLength: 0 } : { pathLength: 1 }}
            animate={noteAnimated ? { pathLength: 1 } : {}}
            transition={{ duration: 0.3, delay: 0.2 }}
          />
        )}

        {/* Flag for eighth notes */}
        {duration === 'eighth' && (
          <motion.path
            d={`M ${x + 7} ${y - 35} Q ${x + 15} ${y - 25} ${x + 7} ${y - 15}`}
            fill="none"
            stroke="#1a2332"
            strokeWidth={2}
            initial={noteAnimated ? { pathLength: 0 } : { pathLength: 1 }}
            animate={noteAnimated ? { pathLength: 1 } : {}}
            transition={{ duration: 0.3, delay: 0.4 }}
          />
        )}

        {/* Double flag for sixteenth notes */}
        {duration === 'sixteenth' && (
          <>
            <motion.path
              d={`M ${x + 7} ${y - 35} Q ${x + 15} ${y - 25} ${x + 7} ${y - 15}`}
              fill="none"
              stroke="#1a2332"
              strokeWidth={2}
              initial={noteAnimated ? { pathLength: 0 } : { pathLength: 1 }}
              animate={noteAnimated ? { pathLength: 1 } : {}}
              transition={{ duration: 0.3, delay: 0.4 }}
            />
            <motion.path
              d={`M ${x + 7} ${y - 28} Q ${x + 15} ${y - 18} ${x + 7} ${y - 8}`}
              fill="none"
              stroke="#1a2332"
              strokeWidth={2}
              initial={noteAnimated ? { pathLength: 0 } : { pathLength: 1 }}
              animate={noteAnimated ? { pathLength: 1 } : {}}
              transition={{ duration: 0.3, delay: 0.5 }}
            />
          </>
        )}
      </motion.g>
    );
  };

  // Treble clef SVG
  const TrebleClef = () => (
    <motion.g
      initial={animated ? { opacity: 0, x: -20 } : {}}
      animate={animated ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5 }}
    >
      <text
        x={startX - 50}
        y={staffHeight - 15}
        fontSize="60"
        fontFamily="serif"
        fill="#1a2332"
      >
        𝄞
      </text>
    </motion.g>
  );

  // Time signature
  const TimeSignatureDisplay = () => {
    if (!timeSignature) return null;
    const [top, bottom] = timeSignature.split('/');
    
    return (
      <motion.g
        initial={animated ? { opacity: 0, scale: 0 } : {}}
        animate={animated ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 0.3, type: 'spring' }}
      >
        <text
          x={startX - 10}
          y={35}
          fontSize="20"
          fontWeight="bold"
          fontFamily="serif"
          fill="#1a2332"
          textAnchor="middle"
        >
          {top}
        </text>
        <text
          x={startX - 10}
          y={65}
          fontSize="20"
          fontWeight="bold"
          fontFamily="serif"
          fill="#1a2332"
          textAnchor="middle"
        >
          {bottom}
        </text>
      </motion.g>
    );
  };

  return (
    <div className={`relative ${className}`}>
      <svg
        width="100%"
        height={staffHeight + 40}
        viewBox={`0 0 ${staffWidth} ${staffHeight + 40}`}
        className="overflow-visible"
      >
        {/* Staff lines */}
        {staffLines.map((line, i) => (
          <motion.line
            key={i}
            x1={startX}
            y1={line.y}
            x2={endX}
            y2={line.y}
            stroke="#1a2332"
            strokeWidth={1.5}
            initial={animated ? { pathLength: 0 } : {}}
            animate={animated ? { pathLength: 1 } : {}}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          />
        ))}

        {/* Bar lines */}
        <motion.line
          x1={startX}
          y1={20}
          x2={startX}
          y2={100}
          stroke="#1a2332"
          strokeWidth={2}
          initial={animated ? { pathLength: 0 } : {}}
          animate={animated ? { pathLength: 1 } : {}}
          transition={{ duration: 0.3, delay: 0.5 }}
        />
        <motion.line
          x1={endX}
          y1={20}
          x2={endX}
          y2={100}
          stroke="#1a2332"
          strokeWidth={2}
          initial={animated ? { pathLength: 0 } : {}}
          animate={animated ? { pathLength: 1 } : {}}
          transition={{ duration: 0.3, delay: 0.5 }}
        />

        {/* Clef */}
        {clef === 'treble' && <TrebleClef />}

        {/* Time signature */}
        <TimeSignatureDisplay />

        {/* Notes */}
        {notes.map((note, i) => {
          const noteX = startX + 60 + (i * 50);
          const noteY = getNoteY(note.position);
          
          return (
            <g key={i}>
              <NoteHead
                x={noteX}
                y={noteY}
                duration={note.duration}
                animated={animated}
              />
              {showLabels && (
                <motion.text
                  x={noteX}
                  y={noteY + 25}
                  fontSize="12"
                  fontFamily="sans-serif"
                  fill="#5a6577"
                  textAnchor="middle"
                  initial={animated ? { opacity: 0 } : {}}
                  animate={animated ? { opacity: 1 } : {}}
                  transition={{ delay: 0.5 + i * 0.1 }}
                >
                  {note.pitch}
                </motion.text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
