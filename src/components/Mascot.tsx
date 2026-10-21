import { motion } from 'framer-motion';

interface MascotProps {
  mood: 'idle' | 'happy' | 'excited';
  message?: string;
}

export default function Mascot({ mood, message }: MascotProps) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <motion.div
        animate={
          mood === 'happy'
            ? { rotate: [0, -10, 10, -10, 0], scale: [1, 1.2, 1] }
            : mood === 'excited'
            ? { y: [0, -8, 0], rotate: [0, 5, -5, 0] }
            : { y: [0, -4, 0] }
        }
        transition={{
          duration: mood === 'idle' ? 3 : 0.6,
          repeat: mood === 'idle' ? Infinity : 0,
          ease: 'easeInOut',
        }}
        className="relative flex-shrink-0"
      >
        {/* Mascot body - musical note character */}
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#58cc02] to-[#46a302] flex items-center justify-center shadow-lg relative">
          <motion.span
            animate={mood === 'happy' ? { scale: [1, 1.3, 1] } : {}}
            transition={{ duration: 0.5 }}
            className="text-3xl"
          >
            🎵
          </motion.span>
          
          {/* Eyes */}
          <div className="absolute top-3 left-3 flex gap-2">
            <motion.div
              animate={mood === 'happy' ? { scaleY: [1, 0.1, 1] } : {}}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="w-2 h-2 bg-white rounded-full"
            />
            <motion.div
              animate={mood === 'happy' ? { scaleY: [1, 0.1, 1] } : {}}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="w-2 h-2 bg-white rounded-full"
            />
          </div>

          {/* Blush when happy */}
          {mood === 'happy' && (
            <>
              <div className="absolute top-7 left-1 w-3 h-2 bg-pink-300/50 rounded-full" />
              <div className="absolute top-7 right-1 w-3 h-2 bg-pink-300/50 rounded-full" />
            </>
          )}
        </div>

        {/* Musical notes floating around when excited */}
        {mood === 'excited' && (
          <>
            <motion.span
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: [0, 1, 0], y: -20, x: 10 }}
              transition={{ duration: 1, repeat: Infinity }}
              className="absolute -top-2 -right-2 text-sm"
            >
              ♪
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: [0, 1, 0], y: -15, x: -8 }}
              transition={{ duration: 1, delay: 0.3, repeat: Infinity }}
              className="absolute -top-1 -left-3 text-xs"
            >
              ♫
            </motion.span>
          </>
        )}
      </motion.div>

      {/* Speech bubble */}
      {message && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative bg-white dark:bg-[#1a2c34] border-2 border-[#e5e5e5] dark:border-[#2a3f4a] rounded-xl px-4 py-2.5 max-w-[200px]"
        >
          <p className="text-sm font-medium text-[#3c3c3c] dark:text-white">{message}</p>
          {/* Speech bubble tail */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 w-3 h-3 bg-white dark:bg-[#1a2c34] border-l-2 border-b-2 border-[#e5e5e5] dark:border-[#2a3f4a] rotate-45" />
        </motion.div>
      )}
    </div>
  );
}
