import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function AnimationDemo() {
  const [activeDemo, setActiveDemo] = useState(0);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

  useEffect(() => {
    // Generate floating particles
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
    }));
    setParticles(newParticles);
  }, []);

  const demos = [
    {
      title: 'Floating Particles',
      description: 'Ambient background particles with smooth animations',
      component: (
        <div className="relative h-64 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl overflow-hidden">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute w-2 h-2 bg-accent/30 rounded-full"
              style={{ left: `${particle.x}%`, top: `${particle.y}%` }}
              animate={{
                y: [0, -30, 0],
                x: [0, 15, 0],
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 4 + particle.delay,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: particle.delay,
              }}
            />
          ))}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="text-4xl font-bold text-gradient"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ✨ Magical
            </motion.div>
          </div>
        </div>
      ),
    },
    {
      title: '3D Card Flip',
      description: 'Cards with perspective and depth effects',
      component: (
        <div className="grid grid-cols-2 gap-4 h-64">
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="card cursor-pointer"
              style={{ transformStyle: 'preserve-3d' }}
              whileHover={{
                rotateY: 15,
                rotateX: -10,
                scale: 1.05,
                boxShadow: '0 20px 40px rgba(201, 168, 76, 0.3)',
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <motion.div
                className="w-full h-full flex items-center justify-center text-4xl"
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 8 + i * 2,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              >
                {['🎵', '🎼', '🎹', '🎺'][i]}
              </motion.div>
            </motion.div>
          ))}
        </div>
      ),
    },
    {
      title: 'Morphing Shapes',
      description: 'Smooth shape transitions with gradient fills',
      component: (
        <div className="h-64 flex items-center justify-center gap-8">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-24 h-24"
              style={{
                background: `linear-gradient(${135 + i * 45}deg, #c9a84c, #e0c36a, #4a7c8a)`,
                backgroundSize: '200% 200%',
              }}
              animate={{
                borderRadius: [
                  '60% 40% 30% 70% / 60% 30% 70% 40%',
                  '30% 60% 70% 40% / 50% 60% 30% 60%',
                  '60% 40% 30% 70% / 60% 30% 70% 40%',
                ],
                backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 5 + i,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      ),
    },
    {
      title: 'Staggered List',
      description: 'List items animate in sequence with spring physics',
      component: (
        <div className="h-64 overflow-hidden">
          {['First Item', 'Second Item', 'Third Item', 'Fourth Item', 'Fifth Item'].map((item, i) => (
            <motion.div
              key={item}
              className="card mb-2"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: i * 0.1,
                type: 'spring',
                stiffness: 100,
                damping: 15,
              }}
              whileHover={{
                x: 10,
                backgroundColor: 'rgba(201, 168, 76, 0.1)',
              }}
            >
              <div className="flex items-center gap-3">
                <motion.div
                  className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center"
                  whileHover={{ scale: 1.2, rotate: 180 }}
                >
                  {i + 1}
                </motion.div>
                <span className="font-semibold">{item}</span>
              </div>
            </motion.div>
          ))}
        </div>
      ),
    },
    {
      title: 'Pulse & Glow',
      description: 'Elements with pulsing glow effects',
      component: (
        <div className="h-64 flex items-center justify-center gap-8">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-20 h-20 rounded-full bg-accent flex items-center justify-center text-2xl text-white font-bold"
              animate={{
                boxShadow: [
                  '0 0 10px rgba(201, 168, 76, 0.3)',
                  '0 0 30px rgba(201, 168, 76, 0.6)',
                  '0 0 10px rgba(201, 168, 76, 0.3)',
                ],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
              }}
              whileHover={{ scale: 1.2 }}
            >
              {i + 1}
            </motion.div>
          ))}
        </div>
      ),
    },
    {
      title: 'Wave Animation',
      description: 'Smooth wave-like motion effects',
      component: (
        <div className="h-64 flex items-end justify-center gap-2 pb-8">
          {Array.from({ length: 20 }, (_, i) => (
            <motion.div
              key={i}
              className="w-4 bg-gradient-to-t from-accent to-accent-light rounded-t-full"
              animate={{
                height: ['20%', '80%', '20%'],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.1,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        <h1 className="text-5xl font-bold text-gradient mb-4">Animation Showcase</h1>
        <p className="text-xl text-text-secondary mb-8">
          Experience the magic of modern web animations
        </p>

        {/* Demo Selector */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-4">
          {demos.map((demo, i) => (
            <motion.button
              key={i}
              className={`px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition-all ${
                activeDemo === i
                  ? 'bg-accent text-white shadow-lg'
                  : 'bg-card text-text hover:bg-accent/10'
              }`}
              onClick={() => setActiveDemo(i)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {demo.title}
            </motion.button>
          ))}
        </div>

        {/* Active Demo */}
        <motion.div
          key={activeDemo}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="card"
        >
          <h2 className="text-2xl font-bold mb-2">{demos[activeDemo].title}</h2>
          <p className="text-text-secondary mb-6">{demos[activeDemo].description}</p>
          {demos[activeDemo].component}
        </motion.div>

        {/* Button Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card mt-8"
        >
          <h2 className="text-2xl font-bold mb-6">Button Effects</h2>
          <div className="flex flex-wrap gap-4">
            <motion.button
              className="btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Primary Button
            </motion.button>
            <motion.button
              className="btn-accent"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Accent Button
            </motion.button>
            <motion.button
              className="btn-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Secondary Button
            </motion.button>
            <motion.button
              className="btn-danger"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Danger Button
            </motion.button>
          </div>
        </motion.div>

        {/* Progress Bars */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card mt-8"
        >
          <h2 className="text-2xl font-bold mb-6">Animated Progress Bars</h2>
          <div className="space-y-4">
            {[25, 50, 75, 100].map((progress, i) => (
              <div key={i}>
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">Progress {i + 1}</span>
                  <span className="text-text-secondary">{progress}%</span>
                </div>
                <div className="progress-bar">
                  <motion.div
                    className="progress-bar-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1.5, delay: i * 0.2, ease: 'easeOut' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card mt-8"
        >
          <h2 className="text-2xl font-bold mb-6">Interactive Badges</h2>
          <div className="flex flex-wrap gap-4">
            <motion.div
              className="xp-badge"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              ⭐ 1,250 XP
            </motion.div>
            <motion.div
              className="streak-badge"
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              🔥 7 Day Streak
            </motion.div>
            <motion.div
              className="xp-badge"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              🏆 Level 5
            </motion.div>
            <motion.div
              className="streak-badge"
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              💎 Master
            </motion.div>
          </div>
        </motion.div>

        {/* Path Nodes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="card mt-8"
        >
          <h2 className="text-2xl font-bold mb-6">Learning Path Nodes</h2>
          <div className="flex items-center justify-center gap-8">
            <motion.div
              className="path-node completed"
              whileHover={{ scale: 1.1 }}
              animate={{
                boxShadow: [
                  '0 4px 6px rgba(0,0,0,0.1)',
                  '0 10px 15px rgba(58, 138, 92, 0.3)',
                  '0 4px 6px rgba(0,0,0,0.1)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ✓
            </motion.div>
            <motion.div
              className="path-node available"
              whileHover={{ scale: 1.15 }}
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              2
            </motion.div>
            <motion.div
              className="path-node locked"
              whileHover={{ scale: 1.05 }}
            >
              🔒
            </motion.div>
            <motion.div
              className="path-node boss locked"
              whileHover={{ scale: 1.05 }}
            >
              👑
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
