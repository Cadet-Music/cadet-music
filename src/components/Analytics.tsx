import { motion } from 'framer-motion';
import { useStore } from '../store';
import {
  calculateOverallAccuracy,
  getMasteredConcepts,
  getDevelopingConcepts,
  getStrongestTopic,
  getWeakestTopic,
  getWeakTopics,
  getRecommendedTraining,
  CONCEPT_NAMES,
  getMasteryLevel,
  getMasteryColor,
  getAllConceptStats,
} from '../competency';

export default function Analytics() {
  const { user } = useStore();

  if (!user) return null;

  const { conceptMastery } = user.progress;

  // Calculate analytics
  const overallAccuracy = calculateOverallAccuracy(conceptMastery);
  const masteredConcepts = getMasteredConcepts(conceptMastery);
  const developingConcepts = getDevelopingConcepts(conceptMastery);
  const strongestTopic = getStrongestTopic(conceptMastery);
  const weakestTopic = getWeakestTopic(conceptMastery);
  const weakTopics = getWeakTopics(conceptMastery);
  const recommendation = getRecommendedTraining(conceptMastery);
  const allConceptStats = getAllConceptStats(conceptMastery);

  // Calculate totals
  const totalQuestions = allConceptStats.reduce((sum, c) => sum + c.stats.attempts, 0);
  const totalCorrect = allConceptStats.reduce((sum, c) => sum + c.stats.correct, 0);
  const totalIncorrect = allConceptStats.reduce((sum, c) => sum + c.stats.incorrect, 0);

  return (
    <div className="min-h-screen bg-[#f5f5f5] dark:bg-[#0f1720] pb-24">
      {/* Header */}
      <div className="bg-white dark:bg-[#1a2332] border-b border-[#c8c8c8] dark:border-[#2a3545] px-4 py-4 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-[#1a2332] dark:text-white">Music Readiness Report</h1>
          <p className="text-sm text-[#5a6577] dark:text-[#9aa3b0] mt-1">
            Your personalized learning analytics
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Overall Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-[#1a2332] rounded-xl p-6 border border-[#c8c8c8] dark:border-[#2a3545]"
        >
          <h2 className="text-lg font-semibold text-[#1a2332] dark:text-white mb-4">Overall Performance</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#c9a84c]">{overallAccuracy}%</div>
              <div className="text-sm text-[#5a6577] dark:text-[#9aa3b0] mt-1">Overall Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#1a2332] dark:text-white">{totalQuestions}</div>
              <div className="text-sm text-[#5a6577] dark:text-[#9aa3b0] mt-1">Questions Answered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#3a8a5c]">{totalCorrect}</div>
              <div className="text-sm text-[#5a6577] dark:text-[#9aa3b0] mt-1">Correct Answers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#c44536]">{totalIncorrect}</div>
              <div className="text-sm text-[#5a6577] dark:text-[#9aa3b0] mt-1">Incorrect Answers</div>
            </div>
          </div>
        </motion.div>

        {/* Recommendation */}
        {recommendation.concept && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-r from-[#c9a84c] to-[#a68a3a] rounded-xl p-6 text-white"
          >
            <div className="flex items-start gap-3">
              <div className="text-3xl">💡</div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold mb-1">Recommended Next Training</h2>
                <p className="text-white/90">{recommendation.reason}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Mastery Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-[#1a2332] rounded-xl p-6 border border-[#c8c8c8] dark:border-[#2a3545]"
        >
          <h2 className="text-lg font-semibold text-[#1a2332] dark:text-white mb-4">Concept Mastery</h2>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-[#3a8a5c]/10 dark:bg-[#3a8a5c]/20 rounded-lg p-4">
              <div className="text-2xl font-bold text-[#3a8a5c]">{masteredConcepts.length}</div>
              <div className="text-sm text-[#5a6577] dark:text-[#9aa3b0] mt-1">Mastered Concepts</div>
              <div className="text-xs text-[#5a6577] dark:text-[#9aa3b0] mt-1">90%+ mastery</div>
            </div>
            <div className="bg-[#c9a84c]/10 dark:bg-[#c9a84c]/20 rounded-lg p-4">
              <div className="text-2xl font-bold text-[#c9a84c]">{developingConcepts.length}</div>
              <div className="text-sm text-[#5a6577] dark:text-[#9aa3b0] mt-1">Developing Concepts</div>
              <div className="text-xs text-[#5a6577] dark:text-[#9aa3b0] mt-1">40-89% mastery</div>
            </div>
          </div>

          {/* Strongest and Weakest */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {strongestTopic && (
              <div className="border border-[#3a8a5c] rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">🏆</span>
                  <span className="text-sm font-semibold text-[#3a8a5c]">Strongest Topic</span>
                </div>
                <div className="text-lg font-bold text-[#1a2332] dark:text-white">
                  {CONCEPT_NAMES[strongestTopic]}
                </div>
                <div className="text-sm text-[#5a6577] dark:text-[#9aa3b0] mt-1">
                  {conceptMastery[strongestTopic]?.masteryScore}% mastery
                </div>
              </div>
            )}
            {weakestTopic && (
              <div className="border border-[#c44536] rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">⚠️</span>
                  <span className="text-sm font-semibold text-[#c44536]">Needs Improvement</span>
                </div>
                <div className="text-lg font-bold text-[#1a2332] dark:text-white">
                  {CONCEPT_NAMES[weakestTopic]}
                </div>
                <div className="text-sm text-[#5a6577] dark:text-[#9aa3b0] mt-1">
                  {conceptMastery[weakestTopic]?.masteryScore}% mastery
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Weak Topics */}
        {weakTopics.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-[#1a2332] rounded-xl p-6 border border-[#c8c8c8] dark:border-[#2a3545]"
          >
            <h2 className="text-lg font-semibold text-[#1a2332] dark:text-white mb-4">
              Topics Needing Attention
            </h2>
            <div className="space-y-3">
              {weakTopics.map((concept, idx) => {
                const stats = conceptMastery[concept];
                const masteryLevel = getMasteryLevel(stats.masteryScore);
                const color = getMasteryColor(masteryLevel);
                
                return (
                  <div key={concept} className="flex items-center gap-4">
                    <div className="text-2xl font-bold text-[#5a6577] dark:text-[#9aa3b0] w-8">
                      {idx + 1}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-[#1a2332] dark:text-white">
                        {CONCEPT_NAMES[concept]}
                      </div>
                      <div className="text-sm text-[#5a6577] dark:text-[#9aa3b0]">
                        {stats.attempts} attempts · {stats.correct} correct
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold" style={{ color }}>
                        {stats.masteryScore}%
                      </div>
                      <div className="text-xs" style={{ color }}>
                        {masteryLevel}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* All Concepts Breakdown */}
        {allConceptStats.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-[#1a2332] rounded-xl p-6 border border-[#c8c8c8] dark:border-[#2a3545]"
          >
            <h2 className="text-lg font-semibold text-[#1a2332] dark:text-white mb-4">
              All Concepts
            </h2>
            <div className="space-y-3">
              {allConceptStats
                .sort((a, b) => b.stats.masteryScore - a.stats.masteryScore)
                .map(({ concept, stats, masteryLevel }) => {
                  const color = getMasteryColor(masteryLevel);
                  
                  return (
                    <div key={concept} className="border border-[#e2e4e8] dark:border-[#2a3545] rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-semibold text-[#1a2332] dark:text-white">
                          {CONCEPT_NAMES[concept]}
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className="text-xs px-2 py-1 rounded-full font-semibold"
                            style={{ backgroundColor: `${color}20`, color }}
                          >
                            {masteryLevel}
                          </span>
                          <span className="text-lg font-bold" style={{ color }}>
                            {stats.masteryScore}%
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-[#5a6577] dark:text-[#9aa3b0]">
                        <span>{stats.attempts} attempts</span>
                        <span>{stats.correct} correct</span>
                        <span>{stats.incorrect} incorrect</span>
                      </div>
                      {/* Progress bar */}
                      <div className="mt-2 h-2 bg-[#e2e4e8] dark:bg-[#2a3545] rounded-full overflow-hidden">
                        <div
                          className="h-full transition-all duration-500"
                          style={{ width: `${stats.masteryScore}%`, backgroundColor: color }}
                        />
                      </div>
                    </div>
                  );
                })}
            </div>
          </motion.div>
        )}

        {/* Empty State */}
        {allConceptStats.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-[#1a2332] rounded-xl p-12 border border-[#c8c8c8] dark:border-[#2a3545] text-center"
          >
            <div className="text-6xl mb-4">📊</div>
            <h2 className="text-xl font-semibold text-[#1a2332] dark:text-white mb-2">
              No Data Yet
            </h2>
            <p className="text-[#5a6577] dark:text-[#9aa3b0]">
              Complete some lessons to see your learning analytics
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
