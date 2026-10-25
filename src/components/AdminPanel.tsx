import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../store';
import { CURRICULUM, getAllLessons } from '../data';

const ChevronLeftIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ShieldIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const allLessons = getAllLessons();

export default function AdminPanel() {
  const { user, lockAdmin } = useStore();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  if (!user) return null;

  // In production, this would fetch all users from backend
  // For now, we show the current user's data as a demo
  const currentUserData = {
    name: user.username,
    email: user.email || 'N/A',
    instrument: user.instrument,
    xp: user.progress.xp,
    streak: user.progress.streak,
    level: user.progress.level,
    theoryLevel: user.theoryLevel,
    instrumentLevel: user.instrumentLevel,
    completedLessons: user.progress.completedLessons,
    totalLessons: allLessons.length,
    lastActive: user.progress.lastActiveDate,
    stickers: user.progress.stickers,
  };

  const completionPercent = Math.round((currentUserData.completedLessons.length / currentUserData.totalLessons) * 100);

  return (
    <div className="min-h-screen bg-[#f5f5f5] dark:bg-[#0f1720]">
      {/* Header */}
      <div className="bg-[#1a2332] border-b border-[#2a3545] px-4 py-4 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => lockAdmin()}
              className="text-[#9aa3b0] hover:text-white transition-colors flex items-center gap-2"
            >
              <ChevronLeftIcon />
              <span className="text-sm font-medium">Exit</span>
            </button>
            <div className="flex items-center gap-2">
              <span className="text-[#c9a84c]"><ShieldIcon /></span>
              <h1 className="text-lg font-semibold text-white">Admin Panel</h1>
            </div>
          </div>
          <span className="text-xs text-[#9aa3b0] font-medium uppercase tracking-wide bg-[#2a3545] px-2 py-1 rounded">
            Demo Mode
          </span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Info Banner */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#c9a84c]/10 border border-[#c9a84c]/30 rounded-lg p-4 mb-6"
        >
          <p className="text-sm text-[#5a6577] dark:text-[#9aa3b0]">
            <span className="font-semibold text-[#1a2332] dark:text-white">Note: </span>
            This is demo mode showing your own data. With a backend, you'd see all cadets' progress, 
            who's struggling, completion rates, and detailed analytics.
          </p>
        </motion.div>

        {/* Current User Overview */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="card mb-6"
        >
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-full bg-[#1a2332] dark:bg-[#c9a84c] flex items-center justify-center text-white dark:text-[#1a2332] text-xl font-bold flex-shrink-0">
              {currentUserData.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-semibold text-[#1a2332] dark:text-white">{currentUserData.name}</h2>
              <p className="text-sm text-[#5a6577] dark:text-[#9aa3b0]">{currentUserData.email}</p>
              <div className="flex flex-wrap items-center gap-3 mt-2">
                <span className="text-xs font-medium text-[#5a6577] dark:text-[#9aa3b0] bg-[#e8e8e8] dark:bg-[#2a3545] px-2 py-0.5 rounded">
                  {currentUserData.instrument} sax
                </span>
                <span className="text-xs text-[#5a6577] dark:text-[#9aa3b0]">
                  Theory Lv.{currentUserData.theoryLevel} · Playing Lv.{currentUserData.instrumentLevel}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {[
            { label: 'XP', value: currentUserData.xp, color: 'text-[#c9a84c]' },
            { label: 'Level', value: currentUserData.level, color: 'text-[#1a2332] dark:text-white' },
            { label: 'Streak', value: `${currentUserData.streak}d`, color: currentUserData.streak > 0 ? 'text-[#3a8a5c]' : 'text-[#c44536]' },
            { label: 'Progress', value: `${completionPercent}%`, color: 'text-[#1a2332] dark:text-white' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="card text-center"
            >
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-xs text-[#5a6577] dark:text-[#9aa3b0] mt-0.5">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Lesson Tree View */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card"
        >
          <h3 className="font-semibold text-sm text-[#1a2332] dark:text-white uppercase tracking-wide mb-4">
            Curriculum Progress
          </h3>
          
          <div className="space-y-2">
            {CURRICULUM.map((section) => {
              const sectionLessons = section.lessons;
              const completedInSection = sectionLessons.filter(l => 
                currentUserData.completedLessons.includes(l.id)
              ).length;
              const sectionPercent = Math.round((completedInSection / sectionLessons.length) * 100);
              const isExpanded = expandedSection === section.id;

              return (
                <div key={section.id} className="border border-[#c8c8c8] dark:border-[#2a3545] rounded-lg overflow-hidden">
                  {/* Section Header */}
                  <button
                    onClick={() => setExpandedSection(isExpanded ? null : section.id)}
                    className="w-full flex items-center gap-3 p-3 hover:bg-[#f0f0f0] dark:hover:bg-[#2a3545] transition-colors"
                  >
                    <motion.span
                      animate={{ rotate: isExpanded ? 90 : 0 }}
                      className="text-[#5a6577] dark:text-[#9aa3b0]"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </motion.span>
                    <div className="flex-1 text-left">
                      <p className="text-sm font-semibold text-[#1a2332] dark:text-white">{section.title}</p>
                      <p className="text-xs text-[#5a6577] dark:text-[#9aa3b0]">
                        {completedInSection}/{sectionLessons.length} lessons · {sectionPercent}%
                      </p>
                    </div>
                    <div className="w-16">
                      <div className="progress-bar h-1.5">
                        <motion.div
                          className="progress-bar-fill"
                          initial={{ width: 0 }}
                          animate={{ width: `${sectionPercent}%` }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                    </div>
                  </button>

                  {/* Expanded Lessons */}
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-[#c8c8c8] dark:border-[#2a3545] bg-[#fafafa] dark:bg-[#0f1720]/50"
                    >
                      {sectionLessons.map((lesson) => {
                        const isCompleted = currentUserData.completedLessons.includes(lesson.id);
                        
                        return (
                          <div
                            key={lesson.id}
                            className="flex items-center gap-3 px-3 py-2 pl-10 border-b border-[#e8e8e8] dark:border-[#2a3545] last:border-b-0"
                          >
                            <div className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 ${
                              isCompleted 
                                ? 'bg-[#3a8a5c] text-white' 
                                : 'bg-[#e8e8e8] dark:bg-[#2a3545] text-[#5a6577] dark:text-[#9aa3b0]'
                            }`}>
                              {isCompleted ? <CheckIcon /> : <span className="text-[8px]">-</span>}
                            </div>
                            <span className="text-sm text-[#1a2332] dark:text-white flex-1 truncate">
                              {lesson.title}
                            </span>
                            <span className="text-xs text-[#5a6577] dark:text-[#9aa3b0] capitalize">
                              {lesson.type}
                            </span>
                            <span className="text-xs font-medium text-[#c9a84c]">
                              +{lesson.xp} XP
                            </span>
                          </div>
                        );
                      })}
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Backend Info */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card mt-6 bg-[#1a2332] text-white"
        >
          <h3 className="font-semibold text-sm uppercase tracking-wide mb-3 text-[#c9a84c]">
            With Backend, You'd See:
          </h3>
          <ul className="space-y-2 text-sm text-[#9aa3b0]">
            <li className="flex items-start gap-2">
              <span className="text-[#c9a84c] mt-0.5">•</span>
              All cadets' progress in real-time
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#c9a84c] mt-0.5">•</span>
              Who's struggling with which lessons (failed attempts)
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#c9a84c] mt-0.5">•</span>
              Completion rates per section
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#c9a84c] mt-0.5">•</span>
              Streak tracking across all users
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#c9a84c] mt-0.5">•</span>
              Export data to CSV for reports
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#c9a84c] mt-0.5">•</span>
              Assign songs/levels to specific cadets
            </li>
          </ul>
          <p className="text-xs text-[#5a6577] mt-4">
            See BACKEND_MIGRATION_GUIDE.md for setup instructions
          </p>
        </motion.div>
      </div>
    </div>
  );
}
