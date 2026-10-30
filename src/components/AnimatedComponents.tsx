import { motion } from 'framer-motion';

interface ProgressRingProps {
  progress: number; // 0-100
  size?: number;
  strokeWidth?: number;
  color?: string;
  backgroundColor?: string;
  showPercentage?: boolean;
  label?: string;
  animated?: boolean;
  className?: string;
}

export default function ProgressRing({
  progress,
  size = 120,
  strokeWidth = 8,
  color = '#c9a84c',
  backgroundColor = '#e8e8e8',
  showPercentage = true,
  label,
  animated = true,
  className = '',
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className={`relative inline-flex flex-col items-center ${className}`}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
        />
        
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          strokeLinecap="round"
          initial={animated ? { strokeDashoffset: circumference } : {}}
          animate={animated ? { strokeDashoffset: offset } : {}}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {showPercentage && (
          <motion.div
            className="text-2xl font-bold"
            style={{ color }}
            initial={animated ? { scale: 0, opacity: 0 } : {}}
            animate={animated ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: 0.5, type: 'spring' }}
          >
            {Math.round(progress)}%
          </motion.div>
        )}
        {label && (
          <motion.div
            className="text-xs text-[#5a6577] dark:text-[#9aa3b0] mt-1"
            initial={animated ? { opacity: 0, y: 5 } : {}}
            animate={animated ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7 }}
          >
            {label}
          </motion.div>
        )}
      </div>
    </div>
  );
}

// Animated stat card component
interface StatCardProps {
  value: number | string;
  label: string;
  icon?: string;
  color?: string;
  animated?: boolean;
  className?: string;
}

export function StatCard({
  value,
  label,
  icon,
  color = '#c9a84c',
  animated = true,
  className = '',
}: StatCardProps) {
  return (
    <motion.div
      className={`card ${className}`}
      initial={animated ? { scale: 0.9, opacity: 0 } : {}}
      animate={animated ? { scale: 1, opacity: 1 } : {}}
      transition={{ type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.02, y: -2 }}
    >
      <div className="flex items-center gap-3">
        {icon && (
          <motion.div
            className="text-3xl"
            initial={animated ? { scale: 0, rotate: -180 } : {}}
            animate={animated ? { scale: 1, rotate: 0 } : {}}
            transition={{ delay: 0.2, type: 'spring' }}
          >
            {icon}
          </motion.div>
        )}
        <div>
          <motion.div
            className="text-3xl font-bold"
            style={{ color }}
            initial={animated ? { x: -20, opacity: 0 } : {}}
            animate={animated ? { x: 0, opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            {value}
          </motion.div>
          <motion.div
            className="text-sm text-[#5a6577] dark:text-[#9aa3b0]"
            initial={animated ? { x: -20, opacity: 0 } : {}}
            animate={animated ? { x: 0, opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
          >
            {label}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

// Animated badge component
interface BadgeProps {
  icon: string;
  label: string;
  earned?: boolean;
  animated?: boolean;
  className?: string;
}

export function Badge({
  icon,
  label,
  earned = false,
  animated = true,
  className = '',
}: BadgeProps) {
  return (
    <motion.div
      className={`inline-flex flex-col items-center gap-2 p-3 rounded-lg ${
        earned
          ? 'bg-[#c9a84c]/10 border-2 border-[#c9a84c]'
          : 'bg-[#e8e8e8] dark:bg-[#2a3545] border-2 border-transparent'
      } ${className}`}
      initial={animated ? { scale: 0, rotate: -180 } : {}}
      animate={animated ? { scale: 1, rotate: 0 } : {}}
      transition={{ type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.05 }}
    >
      <motion.div
        className="text-4xl"
        animate={earned ? {
          scale: [1, 1.1, 1],
          rotate: [0, 5, -5, 0],
        } : {}}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ opacity: earned ? 1 : 0.3 }}
      >
        {icon}
      </motion.div>
      <div
        className={`text-xs font-semibold text-center ${
          earned ? 'text-[#1a2332] dark:text-white' : 'text-[#5a6577] dark:text-[#9aa3b0]'
        }`}
      >
        {label}
      </div>
    </motion.div>
  );
}

// Animated streak counter
interface StreakCounterProps {
  streak: number;
  animated?: boolean;
  className?: string;
}

export function StreakCounter({
  streak,
  animated = true,
  className = '',
}: StreakCounterProps) {
  return (
    <motion.div
      className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#ff6b35] to-[#f7931e] rounded-full shadow-lg ${className}`}
      initial={animated ? { scale: 0, x: -20 } : {}}
      animate={animated ? { scale: 1, x: 0 } : {}}
      transition={{ type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.05 }}
    >
      <motion.div
        className="text-2xl"
        animate={streak > 0 ? {
          scale: [1, 1.2, 1],
          rotate: [0, 10, -10, 0],
        } : {}}
        transition={{ duration: 1, repeat: Infinity }}
      >
        🔥
      </motion.div>
      <div className="text-white font-bold text-xl">{streak}</div>
      <div className="text-white/80 text-sm">day streak</div>
    </motion.div>
  );
}

// Animated XP counter
interface XPCounterProps {
  xp: number;
  animated?: boolean;
  className?: string;
}

export function XPCounter({
  xp,
  animated = true,
  className = '',
}: XPCounterProps) {
  return (
    <motion.div
      className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#c9a84c] to-[#a68a3a] rounded-full shadow-lg ${className}`}
      initial={animated ? { scale: 0, x: 20 } : {}}
      animate={animated ? { scale: 1, x: 0 } : {}}
      transition={{ type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.05 }}
    >
      <motion.div
        className="text-2xl"
        animate={{
          rotate: [0, 360],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
      >
        ⭐
      </motion.div>
      <motion.div
        className="text-white font-bold text-xl"
        initial={animated ? { opacity: 0 } : {}}
        animate={animated ? { opacity: 1 } : {}}
        transition={{ delay: 0.3 }}
      >
        {xp}
      </motion.div>
      <div className="text-white/80 text-sm">XP</div>
    </motion.div>
  );
}
