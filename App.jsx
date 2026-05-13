import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  Clock,
  Zap,
  Target,
  TrendingUp,
  Upload,
  Link2,
  FileText,
  CheckCircle2,
  Circle,
  Lock,
  ChevronRight,
  ArrowRight,
  AlertCircle,
  Star,
  Calendar,
  Settings,
  LogOut,
  ChevronDown,
  Plus,
  Trash2,
  Send,
} from 'lucide-react';

export default function App() {
  const [mode, setMode] = useState('execution');
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);
  const [selectedDay, setSelectedDay] = useState(new Date().getDate());
  const [currentStep, setCurrentStep] = useState(0);
  const [proofUploaded, setProofUploaded] = useState(false);
  const [expandedResource, setExpandedResource] = useState(false);
  const [showScoring, setShowScoring] = useState(false);
  const [warningIndex, setWarningIndex] = useState(0);
  const [time, setTime] = useState(new Date());

  // Register service worker
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch((err) => {
        console.log('Service Worker registration failed:', err);
      });
    }
  }, []);

  // Handle window resize for sidebar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [taskData, setTaskData] = useState({
    title: 'Advanced Calculus - Integration',
    subject: 'Mathematics',
    priority: 'Critical',
    hours: 4,
    deadline: 'Today, 11:59 PM',
    difficulty: 'High',
    topic: 'Definite Integrals & Applications',
  });

  const [quizScore, setQuizScore] = useState('');
  const [fullMarks, setFullMarks] = useState('');

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const warningTimer = setInterval(() => {
      setWarningIndex((prev) => (prev + 1) % psychologicalWarnings.length);
    }, 6000);
    return () => clearInterval(warningTimer);
  }, []);

  const psychologicalWarnings = [
    "Someone with less talent is outperforming you through consistency.",
    "Every skipped session becomes future regret.",
    "Comfort now. Pressure later.",
    "Your competition is not resting.",
    "Discipline creates options. Excuses remove them.",
    "Average effort creates average life.",
    "The gap between where you are and where you want to be is discipline.",
    "Your future self will thank you, or regret you.",
  ];

  const pipelineSteps = ['Study', 'Revise', 'Quiz', 'Test', 'Result', 'Retest'];

  const resourceLinks = [
    { id: 1, title: 'Khan Academy - Integration', url: 'https://khan.com' },
    { id: 2, title: 'MIT OpenCourseWare', url: 'https://ocw.mit.edu' },
    { id: 3, title: 'Practice Problem Set', url: 'https://problems.edu' },
  ];

  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return {
      date: d.getDate(),
      day: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][d.getDay()],
      progress: Math.random() * 100,
    };
  });

  const performanceLevel = () => {
    if (!quizScore || !fullMarks) return null;
    const percentage = (quizScore / fullMarks) * 100;
    if (percentage >= 90) return { level: 'Excellent', color: 'from-emerald-500 to-teal-500' };
    if (percentage >= 75) return { level: 'Competitive', color: 'from-blue-500 to-cyan-500' };
    if (percentage >= 60) return { level: 'Average', color: 'from-yellow-500 to-orange-500' };
    if (percentage >= 40) return { level: 'Weak', color: 'from-orange-500 to-red-500' };
    return { level: 'Dangerous', color: 'from-red-600 to-red-800' };
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden flex flex-col">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-20">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <motion.header
        className="border-b border-slate-800/50 backdrop-blur-xl bg-slate-950/40 sticky top-0 z-40"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="px-4 md:px-6 py-4 flex items-center justify-between">
          {/* Logo & Menu */}
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-slate-800/50 rounded-lg transition md:hidden"
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Zap size={18} className="text-white" />
              </div>
              <h1 className="text-lg md:text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                ExecuteX
              </h1>
            </div>
          </div>

          {/* Mode Toggle */}
          <div className="flex items-center gap-4 md:gap-8">
            {/* Clock - hidden on mobile */}
            <div className="text-right hidden lg:block">
              <div className="text-xs text-slate-400">Current Time</div>
              <div className="text-lg md:text-2xl font-mono font-bold text-blue-400">
                {time.toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                  hour12: true,
                })}
              </div>
            </div>

            {/* Mode Selector */}
            <div className="relative flex items-center gap-1 p-1 bg-slate-900/80 rounded-xl border border-slate-700/50">
              {['planning', 'execution'].map((m) => (
                <motion.button
                  key={m}
                  onClick={() => {
                    setMode(m);
                    setCurrentStep(0);
                    setProofUploaded(false);
                  }}
                  className="relative px-3 md:px-6 py-2 rounded-lg font-semibold text-xs md:text-sm transition"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {mode === m && (
                    <motion.div
                      layoutId="modeBg"
                      className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg -z-10"
                      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    />
                  )}
                  {m === 'planning' ? '📋 Plan' : '⚡ Execute'}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Profile */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-sm flex-shrink-0"
          >
            AJ
          </motion.button>
        </div>
      </motion.header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.aside
              initial={{ x: -280, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -280, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              className="w-72 bg-slate-900/40 backdrop-blur-xl border-r border-slate-800/50 p-6 space-y-8 overflow-y-auto absolute md:relative z-30 h-full md:h-auto"
            >
              {/* Stats Cards */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Performance
                </h3>

                {[
                  {
                    label: 'Daily Streak',
                    value: '47',
                    unit: 'days',
                    icon: <Zap size={18} />,
                    color: 'from-orange-500 to-red-500',
                  },
                  {
                    label: 'Study Hours',
                    value: '156',
                    unit: 'hours',
                    icon: <Clock size={18} />,
                    color: 'from-blue-500 to-cyan-500',
                  },
                  {
                    label: 'Consistency',
                    value: '94',
                    unit: '%',
                    icon: <TrendingUp size={18} />,
                    color: 'from-emerald-500 to-teal-500',
                  },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-3 rounded-lg bg-slate-800/30 border border-slate-700/50 hover:border-slate-600/70 transition"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-slate-400">{stat.label}</span>
                      <div className={`p-1.5 rounded-lg bg-gradient-to-br ${stat.color} text-white`}>
                        {stat.icon}
                      </div>
                    </div>
                    <div className="text-2xl font-bold">
                      {stat.value}
                      <span className="text-xs text-slate-400 ml-1">{stat.unit}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Today's Summary */}
              <div className="space-y-3 p-4 rounded-xl bg-gradient-to-br from-blue-600/10 to-purple-600/10 border border-blue-500/20">
                <h4 className="font-semibold text-sm">Today's Mission</h4>
                <p className="text-xs text-slate-300">{taskData.title}</p>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-slate-400">Progress</span>
                  <span className="text-sm font-bold text-blue-400">
                    {Math.round((currentStep / pipelineSteps.length) * 100)}%
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-700/50 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                    initial={{ width: '0%' }}
                    animate={{ width: `${(currentStep / pipelineSteps.length) * 100}%` }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                  />
                </div>
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                {[
                  { icon: <Target size={18} />, label: 'Dashboard' },
                  { icon: <Calendar size={18} />, label: 'Schedule' },
                  { icon: <TrendingUp size={18} />, label: 'Analytics' },
                  { icon: <Settings size={18} />, label: 'Settings' },
                ].map((item, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ x: 4 }}
                    className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm text-slate-300 hover:bg-slate-800/50 transition"
                  >
                    {item.icon}
                    {item.label}
                  </motion.button>
                ))}
              </nav>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm text-slate-300 hover:bg-red-600/20 border border-red-500/20 transition"
              >
                <LogOut size={16} />
                Sign Out
              </motion.button>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <AnimatePresence mode="wait">
            {mode === 'planning' ? (
              <PlanningMode key="planning" days={days} taskData={taskData} />
            ) : (
              <ExecutionMode
                key="execution"
                taskData={taskData}
                pipelineSteps={pipelineSteps}
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
                proofUploaded={proofUploaded}
                setProofUploaded={setProofUploaded}
                showScoring={showScoring}
                setShowScoring={setShowScoring}
                quizScore={quizScore}
                setQuizScore={setQuizScore}
                fullMarks={fullMarks}
                setFullMarks={setFullMarks}
                performanceLevel={performanceLevel}
                resourceLinks={resourceLinks}
                expandedResource={expandedResource}
                setExpandedResource={setExpandedResource}
              />
            )}
          </AnimatePresence>

          {/* Reality Check - Always visible at bottom */}
          <RealityCheckEngine warnings={psychologicalWarnings} currentIndex={warningIndex} />
        </main>
      </div>
    </div>
  );
}

function PlanningMode({ days, taskData }) {
  const [resources, setResources] = useState([{ id: 1, url: '' }]);
  const [notes, setNotes] = useState('Study integration by parts, then applications');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="space-y-6 md:space-y-8 pb-8"
    >
      {/* Title */}
      <div>
        <h2 className="text-2xl md:text-3xl font-bold mb-2">Plan Your Victory</h2>
        <p className="text-slate-400 text-sm md:text-base">Prepare strategically. Execute relentlessly.</p>
      </div>

      {/* 7-Day Selector */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-slate-300">Select Day</h3>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {days.map((day, i) => (
            <motion.button
              key={i}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex-shrink-0 px-3 md:px-4 py-3 rounded-xl border transition ${
                i === 0
                  ? 'bg-gradient-to-br from-blue-600 to-purple-600 border-blue-400/50'
                  : 'bg-slate-800/40 border-slate-700/50 hover:border-slate-600/70'
              }`}
            >
              <div className="text-center">
                <div className="text-xs text-slate-300 font-semibold">{day.day}</div>
                <div className="text-lg font-bold mt-1">{day.date}</div>
                <div className="w-12 h-1 bg-slate-700/50 rounded-full mt-2 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                    initial={{ width: '0%' }}
                    animate={{ width: `${day.progress}%` }}
                    transition={{ duration: 0.8, delay: i * 0.05 }}
                  />
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Task Creation Panel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="p-4 md:p-6 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 backdrop-blur-xl space-y-4"
      >
        <h3 className="text-lg font-bold">Create Task</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: 'Task Title', placeholder: taskData.title, key: 'title' },
            { label: 'Subject', placeholder: taskData.subject, key: 'subject' },
            { label: 'Priority', placeholder: taskData.priority, key: 'priority' },
            { label: 'Estimated Hours', placeholder: taskData.hours, key: 'hours' },
            { label: 'Deadline', placeholder: taskData.deadline, key: 'deadline' },
            { label: 'Difficulty', placeholder: taskData.difficulty, key: 'difficulty' },
          ].map((field, i) => (
            <motion.input
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.05 }}
              type="text"
              placeholder={field.placeholder}
              className="px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:bg-slate-900/80 transition text-sm md:text-base"
            />
          ))}
        </div>

        <textarea
          placeholder="Topic Name..."
          className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:bg-slate-900/80 transition resize-none h-20 text-sm md:text-base"
        />
      </motion.div>

      {/* Resource Vault */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="p-4 md:p-6 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 backdrop-blur-xl space-y-4"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold">Resource Vault</h3>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setResources([...resources, { id: Date.now(), url: '' }])}
            className="p-2 hover:bg-blue-600/20 rounded-lg transition"
          >
            <Plus size={20} className="text-blue-400" />
          </motion.button>
        </div>

        {resources.map((res, i) => (
          <motion.div
            key={res.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex gap-2"
          >
            <input
              type="text"
              placeholder="Resource URL or link description"
              className="flex-1 px-4 py-2 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 transition text-sm"
            />
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setResources(resources.filter((r) => r.id !== res.id))}
              className="p-2 hover:bg-red-600/20 rounded-lg transition flex-shrink-0"
            >
              <Trash2 size={16} className="text-red-400" />
            </motion.button>
          </motion.div>
        ))}

        {/* Drag & Drop Zone */}
        <motion.div
          whileHover={{ borderColor: 'rgb(59, 130, 246, 0.5)', backgroundColor: 'rgb(30, 41, 59, 0.8)' }}
          className="p-6 border-2 border-dashed border-slate-700/50 rounded-xl text-center transition cursor-pointer"
        >
          <div className="space-y-2">
            <Upload size={24} className="mx-auto text-slate-500" />
            <p className="text-sm text-slate-400">Drag & drop files or click to attach</p>
          </div>
        </motion.div>

        {/* Notes */}
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Task Notes / Instructions / Revision Strategy"
          className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 transition resize-none h-24 text-sm md:text-base"
        />
      </motion.div>

      {/* AI Strategy Box */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="p-4 md:p-6 rounded-2xl bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-purple-500/30 backdrop-blur-xl space-y-4"
      >
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-lg bg-purple-600/30">
            <Zap size={20} className="text-purple-400" />
          </div>
          <h3 className="text-lg font-bold">AI Strategy Recommendation</h3>
        </div>

        <div className="space-y-3 text-sm">
          {[
            { label: 'Best Study Sequence', value: 'Watch video (30m) → Read textbook (45m) → Solve problems (45m)' },
            { label: 'Revision Timing', value: 'After 4 hours of study, take 15-min break, then revise' },
            { label: 'Quiz Strategy', value: 'Timed quiz after 2 revision cycles for confidence' },
            { label: 'Retest Plan', value: '48 hours later with harder problem set' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="p-3 rounded-lg bg-slate-900/40 border border-slate-700/30"
            >
              <div className="text-xs font-semibold text-purple-300 mb-1">{item.label}</div>
              <div className="text-slate-300 text-xs md:text-sm">{item.value}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Study Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="space-y-3"
      >
        <h3 className="text-sm font-semibold text-slate-300">Study Timeline</h3>
        <div className="flex items-center justify-between px-4 py-6 rounded-2xl bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-500/20 backdrop-blur-xl overflow-x-auto">
          {['Study', 'Revise', 'Quiz', 'Test', 'Result', 'Retest'].map((step, i) => (
            <div key={i} className="flex items-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                className="px-2 md:px-3 py-2 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 text-xs md:text-sm font-bold whitespace-nowrap"
              >
                {step}
              </motion.div>
              {i < 5 && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.65 + i * 0.1 }}
                  className="w-4 md:w-8 h-0.5 bg-gradient-to-r from-blue-500/50 to-transparent origin-left ml-2"
                />
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Action Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="w-full px-6 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 font-bold text-lg hover:shadow-xl hover:shadow-blue-600/30 transition flex items-center justify-center gap-2"
      >
        <Send size={20} />
        Save & Confirm Plan
      </motion.button>
    </motion.div>
  );
}

function ExecutionMode({
  taskData,
  pipelineSteps,
  currentStep,
  setCurrentStep,
  proofUploaded,
  setProofUploaded,
  showScoring,
  setShowScoring,
  quizScore,
  setQuizScore,
  fullMarks,
  setFullMarks,
  performanceLevel,
  resourceLinks,
  expandedResource,
  setExpandedResource,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="space-y-6 md:space-y-8 pb-8"
    >
      {/* Title */}
      <div>
        <h2 className="text-2xl md:text-3xl font-bold mb-2">Today's Battle</h2>
        <p className="text-slate-400 text-sm md:text-base">Execute with precision. Track with proof.</p>
      </div>

      {/* Today's Mission Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="p-4 md:p-6 rounded-2xl bg-gradient-to-br from-blue-900/30 to-purple-900/30 border border-blue-500/20 backdrop-blur-xl"
      >
        <div className="space-y-4">
          <div>
            <h3 className="text-xl md:text-2xl font-bold mb-2">{taskData.title}</h3>
            <div className="flex gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-lg bg-blue-500/20 text-blue-300 text-xs font-semibold">
                {taskData.subject}
              </span>
              <span className="px-3 py-1 rounded-lg bg-red-500/20 text-red-300 text-xs font-semibold">
                {taskData.priority}
              </span>
              <span className="px-3 py-1 rounded-lg bg-purple-500/20 text-purple-300 text-xs font-semibold">
                {taskData.difficulty}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <div className="text-slate-400 text-xs">Expected Hours</div>
              <div className="text-xl md:text-2xl font-bold text-blue-400">{taskData.hours}h</div>
            </div>
            <div>
              <div className="text-slate-400 text-xs">Deadline</div>
              <div className="font-semibold text-xs md:text-sm">{taskData.deadline}</div>
            </div>
            <div>
              <div className="text-slate-400 text-xs">Remaining Steps</div>
              <div className="text-xl md:text-2xl font-bold text-purple-400">
                {pipelineSteps.length - currentStep}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Resources & Notes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="p-4 md:p-6 rounded-2xl bg-slate-800/40 border border-slate-700/50 backdrop-blur-xl"
      >
        <button
          onClick={() => setExpandedResource(!expandedResource)}
          className="w-full flex items-center justify-between mb-4"
        >
          <h3 className="text-lg font-bold">Resources & Notes</h3>
          <motion.div
            animate={{ rotate: expandedResource ? 180 : 0 }}
            transition={{ type: 'spring', damping: 20 }}
          >
            <ChevronDown size={20} />
          </motion.div>
        </button>

        <AnimatePresence>
          {expandedResource && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {/* Links */}
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-slate-300">Quick Links</h4>
                {resourceLinks.map((link, i) => (
                  <motion.a
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    href="#"
                    className="flex items-center gap-3 p-3 rounded-lg bg-slate-700/20 hover:bg-slate-700/40 transition group"
                  >
                    <Link2 size={16} className="text-blue-400 flex-shrink-0 group-hover:scale-125 transition" />
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-white truncate">{link.title}</div>
                      <div className="text-xs text-slate-500 truncate">{link.url}</div>
                    </div>
                    <ArrowRight size={16} className="text-slate-500 ml-auto flex-shrink-0" />
                  </motion.a>
                ))}
              </div>

              {/* Notes */}
              <div className="p-4 rounded-lg bg-slate-700/20 border border-slate-600/20">
                <h4 className="text-sm font-semibold text-slate-300 mb-2">Task Instructions</h4>
                <p className="text-sm text-slate-300">
                  Study integration by parts → Practice 20 problems → Review solutions → Create notes
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Execution Pipeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-4"
      >
        <h3 className="text-lg font-bold">Execution Pipeline</h3>

        <div className="space-y-3">
          {pipelineSteps.map((step, i) => {
            const isActive = i === currentStep;
            const isCompleted = i < currentStep;
            const isLocked = i > currentStep;

            return (
              <motion.button
                key={i}
                onClick={() => {
                  if (!isLocked) {
                    setCurrentStep(i);
                    setProofUploaded(false);
                  }
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + i * 0.1 }}
                whileHover={!isLocked ? { scale: 1.02, x: 4 } : {}}
                whileTap={!isLocked ? { scale: 0.98 } : {}}
                disabled={isLocked}
                className={`w-full p-4 rounded-xl border transition relative overflow-hidden ${
                  isCompleted
                    ? 'bg-emerald-600/20 border-emerald-500/50 hover:border-emerald-400/70'
                    : isActive
                      ? 'bg-gradient-to-r from-blue-600/40 to-purple-600/40 border-blue-500/50'
                      : isLocked
                        ? 'bg-slate-800/20 border-slate-700/30 opacity-50 cursor-not-allowed'
                        : 'bg-slate-800/30 border-slate-700/50 hover:border-slate-600/70'
                }`}
              >
                {isActive && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-20"
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}

                <div className="relative flex items-center gap-4">
                  <div className="flex-shrink-0">
                    {isCompleted ? (
                      <motion.div
                        className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', damping: 12 }}
                      >
                        <CheckCircle2 size={24} className="text-white" />
                      </motion.div>
                    ) : isActive ? (
                      <motion.div
                        className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <Zap size={24} className="text-white" />
                      </motion.div>
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center">
                        {isLocked ? (
                          <Lock size={20} className="text-slate-500" />
                        ) : (
                          <Circle size={20} className="text-slate-500" />
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex-1 text-left">
                    <div className="font-bold text-lg">{step}</div>
                    <div className="text-xs text-slate-400">
                      {isCompleted ? 'Completed' : isActive ? 'In Progress' : isLocked ? 'Locked' : 'Ready'}
                    </div>
                  </div>

                  {isActive && <ArrowRight size={20} className="text-blue-400" />}
                </div>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Proof Upload & Scoring */}
      {currentStep > 0 && currentStep < pipelineSteps.length && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          {/* Proof Upload */}
          <motion.div
            className="p-4 md:p-6 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 backdrop-blur-xl"
            whileHover={{ borderColor: 'rgb(59, 130, 246, 0.3)' }}
            transition={{ type: 'spring', damping: 20 }}
          >
            <h4 className="font-bold mb-4">Proof Vault</h4>
            {proofUploaded ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex items-center gap-3 p-4 rounded-lg bg-emerald-600/20 border border-emerald-500/50"
              >
                <CheckCircle2 size={24} className="text-emerald-400 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-emerald-300">Proof Uploaded</div>
                  <div className="text-xs text-emerald-200">Verified at {new Date().toLocaleTimeString()}</div>
                </div>
              </motion.div>
            ) : (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setProofUploaded(true)}
                className="w-full p-4 rounded-lg border-2 border-dashed border-slate-700/50 hover:border-blue-500/50 transition flex items-center justify-center gap-3 group"
              >
                <Upload size={20} className="text-slate-500 group-hover:text-blue-400 transition" />
                <div className="text-center">
                  <div className="font-semibold group-hover:text-blue-400 transition text-sm md:text-base">
                    Click to Upload Proof
                  </div>
                  <div className="text-xs text-slate-500">Screenshot, notes, or result</div>
                </div>
              </motion.button>
            )}
          </motion.div>

          {/* Scoring (for Quiz/Test) */}
          {(currentStep === 2 || currentStep === 3) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 md:p-6 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 backdrop-blur-xl"
            >
              <h4 className="font-bold mb-4">Performance Scoring</h4>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  placeholder="Score Obtained"
                  value={quizScore}
                  onChange={(e) => setQuizScore(e.target.value)}
                  className="px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 transition text-sm"
                />
                <input
                  type="number"
                  placeholder="Full Marks"
                  value={fullMarks}
                  onChange={(e) => setFullMarks(e.target.value)}
                  className="px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 transition text-sm"
                />
              </div>

              {quizScore && fullMarks && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="mt-4 space-y-2"
                >
                  <div className="p-3 rounded-lg bg-slate-700/20">
                    <div className="text-sm font-semibold mb-1">Percentage</div>
                    <div className="text-2xl font-bold">
                      {((quizScore / fullMarks) * 100).toFixed(1)}%
                    </div>
                  </div>

                  {performanceLevel() && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className={`p-4 rounded-lg bg-gradient-to-r ${performanceLevel().color} bg-opacity-20 border border-opacity-30`}
                    >
                      <div className="flex items-center gap-2">
                        <Star size={20} />
                        <div>
                          <div className="text-xs text-slate-300">Performance Level</div>
                          <div className="font-bold text-lg">{performanceLevel().level}</div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Progress Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              if (proofUploaded && currentStep < pipelineSteps.length - 1) {
                setCurrentStep(currentStep + 1);
                setProofUploaded(false);
              }
            }}
            disabled={!proofUploaded}
            className={`w-full px-6 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition ${
              proofUploaded
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:shadow-xl hover:shadow-emerald-600/30'
                : 'bg-slate-700/30 opacity-50 cursor-not-allowed'
            }`}
          >
            <CheckCircle2 size={20} />
            {currentStep === pipelineSteps.length - 1 ? 'Complete Mission' : 'Progress to Next Step'}
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
}

function RealityCheckEngine({ warnings, currentIndex }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.6 }}
      className="mt-12 p-4 md:p-6 rounded-2xl bg-gradient-to-br from-red-950/40 to-orange-950/40 border-2 border-red-500/30 backdrop-blur-xl relative overflow-hidden"
    >
      {/* Animated Border Glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl border-2 border-red-500/50"
        animate={{
          boxShadow: [
            '0 0 20px rgba(239, 68, 68, 0.3)',
            '0 0 40px rgba(239, 68, 68, 0.5)',
            '0 0 20px rgba(239, 68, 68, 0.3)',
          ],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      <div className="relative z-10 space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <AlertCircle size={24} className="text-red-400 flex-shrink-0" />
          <h3 className="text-xl font-bold text-red-300">Reality Check</h3>
        </div>

        <p className="text-sm text-red-200/80 font-semibold leading-relaxed mb-4">
          Your future is being decided by what you do today.
        </p>

        {/* Rotating Warning */}
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.6 }}
          className="p-4 rounded-lg bg-red-900/30 border border-red-500/20"
        >
          <div className="text-sm leading-relaxed text-red-100">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              {warnings[currentIndex]}
            </motion.span>
          </div>
        </motion.div>

        {/* Indicator Dots */}
        <div className="flex gap-1 justify-center">
          {warnings.map((_, i) => (
            <motion.div
              key={i}
              className={`w-2 h-2 rounded-full transition ${
                i === currentIndex ? 'bg-red-400' : 'bg-red-800'
              }`}
              animate={i === currentIndex ? { scale: [1, 1.3, 1] } : {}}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
