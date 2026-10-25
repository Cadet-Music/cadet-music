import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../store';
import {
  getReadinessStatus,
  getReadinessColor,
  getReadinessEmoji,
  predictAssessmentSuccess,
  getConfidenceColor,
  getConceptBreakdown,
  getRecentImprovements,
  THEORY_REQUIREMENTS,
  INSTRUMENT_REQUIREMENTS,
} from '../readiness';
import { CONCEPT_NAMES } from '../competency';

export default function ReadinessReport() {
  const { user, generateReadinessReport } = useStore();

  useEffect(() => {
    if (user) {
      // Generate reports on mount if they don't exist
      if (!user.progress.readinessReports.theory) {
        generateReadinessReport('theory');
      }
      if (!user.progress.readinessReports.instrument) {
        generateReadinessReport('instrument');
      }
    }
  }, [user, generateReadinessReport]);

  if (!user) return null;

  const theoryReport = user.progress.readinessReports.theory;
  const instrumentReport = user.progress.readinessReports.instrument;

  // Use theory report for this example (could add tabs for instrument)
  const report = theoryReport;
  const requiredConcepts = THEORY_REQUIREMENTS[user.theoryLevel];

  if (!report) {
    return (
      <div className="min-h-screen bg-[#f5f5f5] dark:bg-[#0f1720] flex items-center justify-center">
        <p className="text-[#5a6577] dark:text-[#9aa3b0]">Loading readiness report...</p>
      </div>
    );
  }

  const status = getReadinessStatus(report.readiness);
  const statusColor = getReadinessColor(status);
  const statusEmoji = getReadinessEmoji(status);
  const prediction = predictAssessmentSuccess(report.readiness);
  const confidenceColor = getConfidenceColor(prediction.confidence);
  const conceptBreakdown = getConceptBreakdown(user.progress.conceptMastery, requiredConcepts);
  const recentImprovements = getRecentImprovements(user.progress.conceptMastery);

  return (
    <div className="min-h-screen bg-[#f5f5f5] dark:bg-[#0f1720] pb-24">
      {/* Header */}
      <div className="bg-white dark:bg-[#1a2332] border-b border-[#c8c8c8] dark:border-[#2a3545] px-4 py-4 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-[#1a2332] dark:text-white">
            Level {user.theoryLevel} Theory Readiness
          </h1>
          <p className="text-sm text-[#5a6577] dark:text-[#9aa3b0] mt-1">
            Assessment preparation report
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Overall Readiness */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-[#1a2332] rounded-xl p-6 border border-[#c8c8c8] dark:border-[#2a3545]"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-[#1a2332] dark:text-white">Overall Readiness</h2>
            <div
              className="px-3 py-1 rounded-full text-sm font-semibold"
              style={{ backgroundColor: `${statusColor}20`, color: statusColor }}
            >
              {statusEmoji} {status}
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex-1">
              <div className="text-5xl font-bold mb-2" style={{ color: statusColor }}>
                {report.readiness}%
              </div>
              <div className="text-sm text-[#5a6577] dark:text-[#9aa3b0]">
                Readiness Score
              </div>
            </div>
            <div className="flex-1">
              <div className="text-3xl font-bold mb-2" style={{ color: confidenceColor }}>
                {prediction.probability}%
              </div>
              <div className="text-sm text-[#5a6577] dark:text-[#9aa3b0]">
                Assessment Success Prediction
              </div>
              <div className="text-xs mt-1" style={{ color: confidenceColor }}>
                {prediction.confidence} Confidence
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-6">
            <div className="h-3 bg-[#e2e4e8] dark:bg-[#2a3545] rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: statusColor }}
                initial={{ width: 0 }}
                animate={{ width: `${report.readiness}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />
            </div>
          </div>
        </motion.div>

        {/* Strongest and Weakest */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* Strongest */}
          <div className="bg-white dark:bg-[#1a2332] rounded-xl p-6 border border-[#c8c8c8] dark:border-[#2a3545]">
            <h3 className="text-sm font-semibold text-[#3a8a5c] mb-3 flex items-center gap-2">
              <span>✅</span> Strongest Areas
            </h3>
            <div className="space-y-2">
              {report.strongestTopics.map((concept) => {
                const stats = user.progress.conceptMastery[concept];
                return (
                  <div key={concept} className="flex items-center justify-between">
                    <span className="text-sm text-[#1a2332] dark:text-white">
                      {CONCEPT_NAMES[concept]}
                    </span>
                    <span className="text-sm font-bold text-[#3a8a5c]">
                      {stats?.masteryScore || 0}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Weakest */}
          <div className="bg-white dark:bg-[#1a2332] rounded-xl p-6 border border-[#c8c8c8] dark:border-[#2a3545]">
            <h3 className="text-sm font-semibold text-[#c44536] mb-3 flex items-center gap-2">
              <span>⚠️</span> Needs Improvement
            </h3>
            <div className="space-y-2">
              {report.weakestTopics.map((concept) => {
                const stats = user.progress.conceptMastery[concept];
                return (
                  <div key={concept} className="flex items-center justify-between">
                    <span className="text-sm text-[#1a2332] dark:text-white">
                      {CONCEPT_NAMES[concept]}
                    </span>
                    <span className="text-sm font-bold text-[#c44536]">
                      {stats?.masteryScore || 0}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Concept Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-[#1a2332] rounded-xl p-6 border border-[#c8c8c8] dark:border-[#2a3545]"
        >
          <h2 className="text-lg font-semibold text-[#1a2332] dark:text-white mb-4">
            Concept Breakdown
          </h2>
          <div className="space-y-3">
            {conceptBreakdown.map((item) => {
              const barColor = item.status === 'Mastered' ? '#3a8a5c' :
                              item.status === 'Proficient' ? '#c9a84c' :
                              item.status === 'Developing' ? '#d4903a' :
                              item.status === 'Learning' ? '#c44536' : '#9aa3b0';

              return (
                <div key={item.concept}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-[#1a2332] dark:text-white">
                      {item.name}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-[#5a6577] dark:text-[#9aa3b0]">
                        {item.attempts} attempts
                      </span>
                      <span className="text-sm font-bold" style={{ color: barColor }}>
                        {item.mastery}%
                      </span>
                    </div>
                  </div>
                  <div className="h-2 bg-[#e2e4e8] dark:bg-[#2a3545] rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: barColor }}
                      initial={{ width: 0 }}
                      animate={{ width: `${item.mastery}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  <div className="text-xs text-[#5a6577] dark:text-[#9aa3b0] mt-1">
                    {item.status}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Recommendations */}
        {report.recommendations.length > 0 && report.recommendations[0] !== 'Continue with current lessons' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-r from-[#c9a84c] to-[#a68a3a] rounded-xl p-6 text-white"
          >
            <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <span>💡</span> Recommended Review Topics
            </h2>
            <div className="space-y-2">
              {report.recommendations.map((rec, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="text-white/80">{idx + 1}.</span>
                  <span className="text-white">{rec}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Recent Improvements */}
        {recentImprovements.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-[#1a2332] rounded-xl p-6 border border-[#c8c8c8] dark:border-[#2a3545]"
          >
            <h2 className="text-lg font-semibold text-[#1a2332] dark:text-white mb-3">
              Recent Improvements
            </h2>
            <div className="space-y-2">
              {recentImprovements.map((item) => (
                <div key={item.concept} className="flex items-center justify-between">
                  <span className="text-sm text-[#1a2332] dark:text-white">
                    {item.name}
                  </span>
                  <span className="text-sm font-bold text-[#3a8a5c]">
                    {item.improvement}% mastery
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Assessment Ready Celebration */}
        {report.readiness >= 85 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: 'spring' }}
            className="bg-gradient-to-r from-[#3a8a5c] to-[#2d6d48] rounded-xl p-6 text-white text-center"
          >
            <div className="text-4xl mb-3">🎉</div>
            <h2 className="text-xl font-bold mb-2">Assessment Ready!</h2>
            <p className="text-white/90 mb-4">
              You have demonstrated readiness for:
            </p>
            <p className="text-lg font-semibold mb-4">
              Level {user.theoryLevel} Theory Assessment
            </p>
            <p className="text-sm text-white/80">
              Recommended: Attempt assessment now.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
