import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store';
import { getAllLessons } from '../data';

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

const AlertIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const XIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

interface MockStudent {
  id: string;
  name: string;
  rank: string;
  email: string;
  instrument: string;
  xp: number;
  streak: number;
  level: number;
  lastActive: string;
  completedLessons: string[];
  failedAttempts: { lessonId: string; attempts: number; lastFailed: string }[];
  joinDate: string;
}

const MOCK_STUDENTS: MockStudent[] = [
  {
    id: '1',
    name: 'Cpl Smith',
    rank: 'Cpl',
    email: 'j.smith.123@cdt.cadets.gc.ca',
    instrument: 'alto',
    xp: 450,
    streak: 7,
    level: 3,
    lastActive: '2 hours ago',
    completedLessons: ['pb-1', 'pb-2', 'pb-3', 'pb-4', 'pb-5', 'n-1', 'n-2', 'n-3', 'r-1'],
    failedAttempts: [
      { lessonId: 'n-4', attempts: 3, lastFailed: '1 day ago' },
      { lessonId: 'r-2', attempts: 2, lastFailed: '3 days ago' },
    ],
    joinDate: '2024-09-15',
  },
  {
    id: '2',
    name: 'L/Cpl Johnson',
    rank: 'L/Cpl',
    email: 'm.johnson.456@cdt.cadets.gc.ca',
    instrument: 'tenor',
    xp: 180,
    streak: 2,
    level: 2,
    lastActive: '1 day ago',
    completedLessons: ['pb-1', 'pb-2', 'pb-3', 'pb-4'],
    failedAttempts: [
      { lessonId: 'pb-5', attempts: 5, lastFailed: '1 day ago' },
      { lessonId: 'n-1', attempts: 4, lastFailed: '2 days ago' },
      { lessonId: 'n-2', attempts: 3, lastFailed: '2 days ago' },
    ],
    joinDate: '2024-10-01',
  },
  {
    id: '3',
    name: 'Cdt Williams',
    rank: 'Cdt',
    email: 'a.williams.789@cdt.cadets.gc.ca',
    instrument: 'alto',
    xp: 820,
    streak: 14,
    level: 5,
    lastActive: '30 min ago',
    completedLessons: ['pb-1', 'pb-2', 'pb-3', 'pb-4', 'pb-5', 'n-1', 'n-2', 'n-3', 'n-4', 'n-5', 'n-6', 'r-1', 'r-2', 'r-3', 'r-4', 'r-5', 'r-6', 't-1', 't-2'],
    failedAttempts: [
      { lessonId: 't-3', attempts: 1, lastFailed: '5 hours ago' },
    ],
    joinDate: '2024-08-20',
  },
  {
    id: '4',
    name: 'Cdt Brown',
    rank: 'Cdt',
    email: 'r.brown.234@cdt.cadets.gc.ca',
    instrument: 'baritone',
    xp: 60,
    streak: 0,
    level: 1,
    lastActive: '5 days ago',
    completedLessons: ['pb-1', 'pb-2'],
    failedAttempts: [
      { lessonId: 'pb-3', attempts: 6, lastFailed: '5 days ago' },
      { lessonId: 'pb-4', attempts: 4, lastFailed: '5 days ago' },
    ],
    joinDate: '2024-11-01',
  },
  {
    id: '5',
    name: 'Sgt Davis',
    rank: 'Sgt',
    email: 'k.davis.567@cadets.gc.ca',
    instrument: 'soprano',
    xp: 1200,
    streak: 21,
    level: 7,
    lastActive: '1 hour ago',
    completedLessons: ['pb-1', 'pb-2', 'pb-3', 'pb-4', 'pb-5', 'n-1', 'n-2', 'n-3', 'n-4', 'n-5', 'n-6', 'r-1', 'r-2', 'r-3', 'r-4', 'r-5', 'r-6', 't-1', 't-2', 't-3', 't-4', 't-5', 't-6', 's1-1', 's1-2', 's1-3'],
    failedAttempts: [],
    joinDate: '2024-07-10',
  },
  {
    id: '6',
    name: 'Cdt Martinez',
    rank: 'Cdt',
    email: 'l.martinez.890@cdt.cadets.gc.ca',
    instrument: 'alto',
    xp: 290,
    streak: 4,
    level: 2,
    lastActive: '6 hours ago',
    completedLessons: ['pb-1', 'pb-2', 'pb-3', 'pb-4', 'pb-5', 'n-1', 'n-2'],
    failedAttempts: [
      { lessonId: 'n-3', attempts: 3, lastFailed: '6 hours ago' },
      { lessonId: 'r-1', attempts: 2, lastFailed: '1 day ago' },
    ],
    joinDate: '2024-10-15',
  },
];

const allLessons = getAllLessons();

export default function AdminPanel() {
  const { lockAdmin } = useStore();
  const [selectedStudent, setSelectedStudent] = useState<MockStudent | null>(null);
  const [section] = useState('saxophones');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStudents = MOCK_STUDENTS.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getLessonTitle = (id: string) => {
    return allLessons.find(l => l.id === id)?.title || id;
  };

  const getLessonType = (id: string) => {
    return allLessons.find(l => l.id === id)?.type || 'unknown';
  };

  if (selectedStudent) {
    return (
      <div className="min-h-screen bg-[#f5f5f5] dark:bg-[#0f1720]">
        {/* Header */}
        <div className="bg-[#1a2332] border-b border-[#2a3545] px-4 py-4 sticky top-0 z-50">
          <div className="max-w-4xl mx-auto flex items-center gap-4">
            <button
              onClick={() => setSelectedStudent(null)}
              className="text-[#9aa3b0] hover:text-white transition-colors flex items-center gap-2"
            >
              <ChevronLeftIcon />
              <span className="text-sm font-medium">Back to roster</span>
            </button>
            <div className="flex items-center gap-2 ml-auto">
              <span className="text-[#c9a84c]"><ShieldIcon /></span>
              <span className="text-xs text-[#9aa3b0] font-medium uppercase tracking-wide">Admin</span>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-6">
          {/* Student Header */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="card mb-6"
          >
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-full bg-[#1a2332] dark:bg-[#c9a84c] flex items-center justify-center text-white dark:text-[#1a2332] text-xl font-bold flex-shrink-0">
                {selectedStudent.name.charAt(selectedStudent.name.indexOf(' ') + 1)}
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-xl font-semibold text-[#1a2332] dark:text-white">{selectedStudent.name}</h2>
                <p className="text-sm text-[#5a6577] dark:text-[#9aa3b0]">{selectedStudent.email}</p>
                <div className="flex flex-wrap items-center gap-3 mt-2">
                  <span className="text-xs font-medium text-[#5a6577] dark:text-[#9aa3b0] bg-[#e8e8e8] dark:bg-[#2a3545] px-2 py-0.5 rounded">
                    {selectedStudent.instrument} sax
                  </span>
                  <span className="text-xs text-[#5a6577] dark:text-[#9aa3b0]">
                    Joined {selectedStudent.joinDate}
                  </span>
                  <span className="text-xs text-[#5a6577] dark:text-[#9aa3b0]">
                    Last active: {selectedStudent.lastActive}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {[
              { label: 'XP', value: selectedStudent.xp, color: 'text-[#c9a84c]' },
              { label: 'Level', value: selectedStudent.level, color: 'text-[#1a2332] dark:text-white' },
              { label: 'Streak', value: `${selectedStudent.streak}d`, color: selectedStudent.streak > 0 ? 'text-[#3a8a5c]' : 'text-[#c44536]' },
              { label: 'Lessons', value: selectedStudent.completedLessons.length, color: 'text-[#1a2332] dark:text-white' },
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

          {/* Struggling Lessons */}
          {selectedStudent.failedAttempts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="card mb-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[#c44536]"><AlertIcon /></span>
                <h3 className="font-semibold text-sm text-[#1a2332] dark:text-white uppercase tracking-wide">
                  Struggling With
                </h3>
              </div>
              <div className="space-y-2">
                {selectedStudent.failedAttempts.map((fail) => (
                  <div
                    key={fail.lessonId}
                    className="flex items-center justify-between p-3 bg-[#c44536]/5 dark:bg-[#c44536]/10 border border-[#c44536]/20 rounded-lg"
                  >
                    <div>
                      <p className="text-sm font-medium text-[#1a2332] dark:text-white">
                        {getLessonTitle(fail.lessonId)}
                      </p>
                      <p className="text-xs text-[#5a6577] dark:text-[#9aa3b0]">
                        {getLessonType(fail.lessonId)} · Last failed: {fail.lastFailed}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#c44536] bg-[#c44536]/10 px-2 py-0.5 rounded">
                        {fail.attempts}x failed
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Progress Overview */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card"
          >
            <h3 className="font-semibold text-sm text-[#1a2332] dark:text-white uppercase tracking-wide mb-4">
              Lesson Progress
            </h3>
            <div className="space-y-1.5">
              {allLessons.slice(0, 20).map((lesson) => {
                const isCompleted = selectedStudent.completedLessons.includes(lesson.id);
                const failed = selectedStudent.failedAttempts.find(f => f.lessonId === lesson.id);
                
                return (
                  <div
                    key={lesson.id}
                    className="flex items-center gap-3 py-1.5"
                  >
                    <div className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 ${
                      isCompleted 
                        ? 'bg-[#3a8a5c] text-white' 
                        : failed 
                          ? 'bg-[#c44536]/10 text-[#c44536]' 
                          : 'bg-[#e8e8e8] dark:bg-[#2a3545] text-[#5a6577] dark:text-[#9aa3b0]'
                    }`}>
                      {isCompleted ? <CheckIcon /> : failed ? <XIcon /> : <span className="text-[8px]">-</span>}
                    </div>
                    <span className="text-sm text-[#1a2332] dark:text-white flex-1 truncate">
                      {lesson.title}
                    </span>
                    <span className="text-xs text-[#5a6577] dark:text-[#9aa3b0] capitalize">
                      {lesson.type}
                    </span>
                    {failed && (
                      <span className="text-xs font-bold text-[#c44536]">{failed.attempts}x</span>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] dark:bg-[#0f1720]">
      {/* Header */}
      <div className="bg-[#1a2332] border-b border-[#2a3545] px-4 py-4 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => lockAdmin()}
              className="text-[#9aa3b0] hover:text-white transition-colors"
            >
              <ChevronLeftIcon />
            </button>
            <div className="flex items-center gap-2">
              <span className="text-[#c9a84c]"><ShieldIcon /></span>
              <h1 className="text-lg font-semibold text-white">Admin Panel</h1>
            </div>
          </div>
          <span className="text-xs text-[#9aa3b0] font-medium uppercase tracking-wide bg-[#2a3545] px-2 py-1 rounded">
            Classified
          </span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Section Tabs */}
        <div className="flex gap-2 mb-6">
          <button className="px-4 py-2 bg-[#c9a84c] text-[#1a2332] rounded-lg font-semibold text-sm">
            Saxophones
          </button>
          <button className="px-4 py-2 bg-[#e8e8e8] dark:bg-[#2a3545] text-[#5a6577] dark:text-[#9aa3b0] rounded-lg font-medium text-sm cursor-not-allowed opacity-50">
            Drums (Coming Soon)
          </button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name or email..."
            className="input-field"
          />
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="card text-center"
          >
            <p className="text-2xl font-bold text-[#1a2332] dark:text-white">{MOCK_STUDENTS.length}</p>
            <p className="text-xs text-[#5a6577] dark:text-[#9aa3b0]">Total Cadets</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="card text-center"
          >
            <p className="text-2xl font-bold text-[#3a8a5c]">
              {MOCK_STUDENTS.filter(s => s.streak > 0).length}
            </p>
            <p className="text-xs text-[#5a6577] dark:text-[#9aa3b0]">Active Streaks</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card text-center"
          >
            <p className="text-2xl font-bold text-[#c44536]">
              {MOCK_STUDENTS.filter(s => s.failedAttempts.length > 0).length}
            </p>
            <p className="text-xs text-[#5a6577] dark:text-[#9aa3b0]">Struggling</p>
          </motion.div>
        </div>

        {/* Student List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="space-y-2"
        >
          {filteredStudents.map((student, i) => (
            <motion.button
              key={student.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + i * 0.05 }}
              onClick={() => setSelectedStudent(student)}
              whileHover={{ scale: 1.01, x: 4 }}
              whileTap={{ scale: 0.99 }}
              className="w-full card flex items-center gap-3 text-left py-3 px-4"
            >
              <div className="w-10 h-10 rounded-full bg-[#1a2332] dark:bg-[#c9a84c] flex items-center justify-center text-white dark:text-[#1a2332] text-sm font-bold flex-shrink-0">
                {student.name.charAt(student.name.indexOf(' ') + 1)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[#1a2332] dark:text-white truncate">{student.name}</p>
                <p className="text-xs text-[#5a6577] dark:text-[#9aa3b0] truncate">{student.email}</p>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold text-[#1a2332] dark:text-white">{student.xp} XP</p>
                  <p className="text-xs text-[#5a6577] dark:text-[#9aa3b0]">Lv.{student.level}</p>
                </div>
                {student.failedAttempts.length > 0 && (
                  <div className="flex items-center gap-1 text-[#c44536]">
                    <AlertIcon />
                    <span className="text-xs font-bold">{student.failedAttempts.length}</span>
                  </div>
                )}
                <div className={`text-xs font-medium px-2 py-0.5 rounded ${
                  student.streak > 0 
                    ? 'bg-[#3a8a5c]/10 text-[#3a8a5c]' 
                    : 'bg-[#e8e8e8] dark:bg-[#2a3545] text-[#5a6577] dark:text-[#9aa3b0]'
                }`}>
                  {student.streak > 0 ? `${student.streak}d` : 'Inactive'}
                </div>
              </div>
            </motion.button>
          ))}
        </motion.div>

        {filteredStudents.length === 0 && (
          <p className="text-center text-[#5a6577] dark:text-[#9aa3b0] py-8">
            No students found matching "{searchQuery}"
          </p>
        )}
      </div>
    </div>
  );
}
