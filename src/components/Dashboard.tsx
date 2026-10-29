import { useState, useEffect } from 'react';
import { useStore } from '../store';
import { CURRICULUM, getAllLessons, getLessonStatus } from '../data';

export default function Dashboard() {
  const { user, setCurrentView, setCurrentLesson, updateStreak } = useStore();
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  useEffect(() => {
    updateStreak();
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-900 dark:bg-gray-100 flex items-center justify-center text-white dark:text-gray-900 font-semibold">
              {user.username.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">{user.username}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Level {user.progress.level}</p>
            </div>
          </div>
          <button
            onClick={() => setCurrentView('settings')}
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            Settings
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Progress</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{progressPercent}%</p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{completedCount} of {totalLessons} lessons</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Experience</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{user.progress.xp}</p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Total XP earned</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Current Streak</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{user.progress.streak}</p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Consecutive days</p>
          </div>
        </div>

        {/* Next Lesson */}
        {nextLesson && (
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Continue Learning</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{nextLesson.title}</p>
            <button
              onClick={() => {
                setCurrentLesson(nextLesson.id);
                setCurrentView('lesson');
              }}
              className="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg py-3 font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Start Lesson
            </button>
          </div>
        )}

        {/* Curriculum Path */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Curriculum</h2>
          
          {CURRICULUM.map((section, sectionIdx) => (
            <div key={section.id} className="mb-8 last:mb-0">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4 uppercase tracking-wide">
                {section.title}
              </h3>
              
              <div className="space-y-3">
                {section.lessons.map((lesson, lessonIdx) => {
                  const status = getLessonStatus(lesson.id, completedIds);
                  const isSelected = selectedNode === lesson.id;
                  
                  return (
                    <button
                      key={lesson.id}
                      onClick={() => handleNodeClick(lesson.id)}
                      disabled={status === 'locked'}
                      className={`w-full text-left p-4 rounded-lg border transition-all ${
                        status === 'completed'
                          ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                          : status === 'available'
                          ? isSelected
                            ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-300 dark:border-blue-700'
                            : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                          : 'bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 opacity-50 cursor-not-allowed'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 dark:text-white mb-1">
                            {lesson.title}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {lesson.description}
                          </p>
                        </div>
                        <div className="ml-4">
                          {status === 'completed' && (
                            <span className="text-green-600 dark:text-green-400 font-semibold">✓</span>
                          )}
                          {status === 'available' && !isSelected && (
                            <span className="text-gray-400 dark:text-gray-600">→</span>
                          )}
                          {isSelected && (
                            <span className="text-blue-600 dark:text-blue-400 font-semibold">Selected</span>
                          )}
                          {status === 'locked' && (
                            <span className="text-gray-400 dark:text-gray-600">🔒</span>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Selected Lesson Actions */}
        {selectedNode && lesson && (
          <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4 z-40">
            <div className="max-w-4xl mx-auto flex gap-3">
              <button
                onClick={() => setSelectedNode(null)}
                className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg py-3 font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleStartLesson}
                className="flex-1 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg py-3 font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
              >
                Start Lesson
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
