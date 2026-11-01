import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../store';
import { CURRICULUM, getAllLessons, getLessonStatus } from '../data';
import Footer from './Footer';
import QuestsAndPractice from './QuestsAndPractice';
import ShareCardTemplate from './ShareCardTemplate';

export default function Dashboard() {
  const { user, setCurrentView, setCurrentLesson, updateStreak } = useStore();
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

  useEffect(() => {
    updateStreak();
    // Generate floating particles for background
    const newParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
    }));
    setParticles(newParticles);
  }, []);

  if (!user) return null;

  const allLessons = getAllLessons();
  const completedIds = user.progress.completedLessons;
  const nextLesson = allLessons.find(l => !completedIds.includes(l.id));
  const totalLessons = allLessons.length;
  const completedCount = completedIds.length;
  const progressPercent = Math.round((completedCount / totalLessons) * 100);

  const handleNodeClick = (lessonId: string) => {
    const status = getLessonStatus(lessonId, completedIds);
    if (status === 'locked') return;
    setSelectedNode(lessonId);
  };

  const handleStartLesson = () => {
    if (selectedNode) {
      setCurrentLesson(selectedNode);
      setCurrentView('lesson');
    }
  };

  const lesson = selectedNode ? allLessons.find(l => l.id === selectedNode) : null;

  return (
    <div className="min-h-screen pb-20 relative overflow-hidden">
      {/* Animated Background Particles */}
      <div className="fixed inset-0 pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-2 h-2 bg-accent/20 rounded-full"
            style={{ left: `${particle.x}%`, top: `${particle.y}%` }}
            animate={{
              y: [0, -30, 0],
              x: [0, 15, 0],
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 5 + particle.delay,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: particle.delay,
            }}
          />
        ))}
      </div>

      {/* Header with Glass Effect */}
      <motion.header 
        className="glass-strong sticky top-0 z-40 border-b border-accent/20"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      >
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <motion.div 
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
          >
            <motion.div 
              className="w-12 h-12 rounded-full gradient-accent flex items-center justify-center text-white font-bold text-lg shadow-lg"
              animate={{
                boxShadow: [
                  '0 0 10px rgba(201, 168, 76, 0.3)',
                  '0 0 20px rgba(201, 168, 76, 0.5)',
                  '0 0 10px rgba(201, 168, 76, 0.3)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {user.username.charAt(0).toUpperCase()}
            </motion.div>
            <div>
              <p className="font-bold text-lg">{user.username}</p>
              <p className="text-sm text-text-secondary">Level {user.progress.level}</p>
            </div>
          </motion.div>
          <div className="flex gap-2">
            <motion.button
              onClick={() => setCurrentView('tone-coach')}
              className="btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              🎓 Tone Coach
            </motion.button>
            <motion.button
              onClick={() => setCurrentView('animations')}
              className="btn-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ✨ Animations
            </motion.button>
            <motion.button
              onClick={() => setCurrentView('settings')}
              className="btn-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Settings
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-6 relative z-10">
        {/* Stats Overview with Staggered Animation */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Progress', value: `${progressPercent}%`, sub: `${completedCount} of ${totalLessons} lessons`, icon: '📊' },
            { label: 'Experience', value: user.progress.xp, sub: 'Total XP earned', icon: '⭐' },
            { label: 'Current Streak', value: user.progress.streak, sub: 'Consecutive days', icon: '🔥' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              className="card cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, type: 'spring', stiffness: 100 }}
              whileHover={{ 
                scale: 1.05,
                rotateY: 5,
                rotateX: -5,
              }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <motion.div
                className="text-3xl mb-2"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
              >
                {stat.icon}
              </motion.div>
              <p className="text-sm text-text-secondary mb-1">{stat.label}</p>
              <motion.p 
                className="text-3xl font-bold text-gradient mb-1"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.1 + 0.3, type: 'spring', stiffness: 200 }}
              >
                {stat.value}
              </motion.p>
              <p className="text-xs text-text-secondary">{stat.sub}</p>
            </motion.div>
          ))}
        </div>

        {/* Share progress card (Web Share API → clipboard → download fallback) */}
        <div className="mb-8 flex justify-end">
          <ShareCardTemplate />
        </div>

        {/* Daily Quests + Practice Log */}
        <QuestsAndPractice />

        {/* Next Lesson with Impressive Animation */}
        {nextLesson && (
          <motion.div
            className="card mb-8 relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 100 }}
            whileHover={{ scale: 1.02 }}
          >
            {/* Animated gradient background */}
            <motion.div
              className="absolute inset-0 opacity-10"
              style={{
                background: 'linear-gradient(135deg, #c9a84c 0%, #4a7c8a 50%, #c9a84c 100%)',
                backgroundSize: '200% 200%',
              }}
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
            />
            
            <div className="relative z-10">
              <motion.h2 
                className="text-2xl font-bold mb-2 text-gradient"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Continue Learning
              </motion.h2>
              <motion.p 
                className="text-text-secondary mb-4 text-lg"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {nextLesson.title}
              </motion.p>
              <motion.button
                onClick={() => {
                  setCurrentLesson(nextLesson.id);
                  setCurrentView('lesson');
                }}
                className="btn-accent w-full text-lg py-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, type: 'spring' }}
              >
                Start Lesson →
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Curriculum Path with Advanced Animations */}
        <motion.div
          className="card"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <motion.h2 
            className="text-2xl font-bold mb-6 text-gradient"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Curriculum
          </motion.h2>
          
          {CURRICULUM.map((section, sectionIdx) => (
            <motion.div
              key={section.id}
              className="mb-8 last:mb-0"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 + sectionIdx * 0.1 }}
            >
              <h3 className="text-sm font-semibold text-text-secondary mb-4 uppercase tracking-wider">
                {section.title}
              </h3>
              
              <div className="space-y-3">
                {section.lessons.map((lesson, lessonIdx) => {
                  const status = getLessonStatus(lesson.id, completedIds);
                  const isSelected = selectedNode === lesson.id;
                  
                  return (
                    <motion.button
                      key={lesson.id}
                      onClick={() => handleNodeClick(lesson.id)}
                      disabled={status === 'locked'}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all relative overflow-hidden ${
                        status === 'completed'
                          ? 'bg-success/5 border-success/30 hover:border-success/50'
                          : status === 'available'
                          ? isSelected
                            ? 'bg-accent/10 border-accent hover:border-accent-light'
                            : 'bg-bg-card border-border hover:border-accent/50'
                          : 'bg-bg-secondary border-border opacity-50 cursor-not-allowed'
                      }`}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.9 + sectionIdx * 0.1 + lessonIdx * 0.05 }}
                      whileHover={status !== 'locked' ? { 
                        scale: 1.02,
                        x: 10,
                      } : {}}
                      whileTap={status !== 'locked' ? { scale: 0.98 } : {}}
                    >
                      {/* Shimmer effect on hover */}
                      {status !== 'locked' && (
                        <motion.div
                          className="absolute inset-0 opacity-0"
                          style={{
                            background: 'linear-gradient(90deg, transparent, rgba(201, 168, 76, 0.1), transparent)',
                          }}
                          whileHover={{ opacity: 1 }}
                          animate={{
                            x: ['-100%', '100%'],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: 'linear',
                          }}
                        />
                      )}
                      
                      <div className="flex items-center justify-between relative z-10">
                        <div className="flex-1">
                          <motion.p 
                            className="font-semibold text-lg mb-1"
                            whileHover={{ x: 5 }}
                          >
                            {lesson.title}
                          </motion.p>
                          <p className="text-sm text-text-secondary">
                            {lesson.description}
                          </p>
                        </div>
                        <motion.div 
                          className="ml-4 text-2xl"
                          animate={status === 'completed' ? {
                            scale: [1, 1.2, 1],
                            rotate: [0, 360],
                          } : {}}
                          transition={{ duration: 0.5 }}
                        >
                          {status === 'completed' && (
                            <span className="text-success">✓</span>
                          )}
                          {status === 'available' && !isSelected && (
                            <motion.span
                              animate={{ x: [0, 5, 0] }}
                              transition={{ duration: 1, repeat: Infinity }}
                              className="text-accent"
                            >
                              →
                            </motion.span>
                          )}
                          {isSelected && (
                            <motion.span
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 0.5, repeat: Infinity }}
                              className="text-accent"
                            >
                              ●
                            </motion.span>
                          )}
                          {status === 'locked' && (
                            <span className="text-text-secondary">🔒</span>
                          )}
                        </motion.div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Selected Lesson Actions */}
        <motion.div
          className="fixed bottom-0 left-0 right-0 glass-strong border-t border-accent/20 p-4 z-40"
          initial={{ y: 100 }}
          animate={{ y: selectedNode ? 0 : 100 }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        >
          {selectedNode && lesson && (
            <div className="max-w-4xl mx-auto flex gap-3">
              <motion.button
                onClick={() => setSelectedNode(null)}
                className="btn-secondary flex-1"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Cancel
              </motion.button>
              <motion.button
                onClick={handleStartLesson}
                className="btn-accent flex-1"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  boxShadow: [
                    '0 4px 6px rgba(201, 168, 76, 0.2)',
                    '0 10px 15px rgba(201, 168, 76, 0.4)',
                    '0 4px 6px rgba(201, 168, 76, 0.2)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Start Lesson →
              </motion.button>
            </div>
          )}
        </motion.div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
