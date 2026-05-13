import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,X,Clock,Zap,Target,TrendingUp,Upload,Link2,FileText,CheckCircle2,Circle,Lock,
  ChevronRight,ArrowRight,AlertCircle,Star,Calendar,Settings,LogOut,ChevronDown,Plus,
  Trash2,Send,BarChart3,LogIn,Eye,EyeOff,AlertTriangle,Trash,Edit2,ChevronLeft,
} from 'lucide-react';

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

export default function App() {
  // Auth
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [currentUser, setCurrentUser] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpPassword2, setSignUpPassword2] = useState('');
  const [signUpError, setSignUpError] = useState('');

  // Navigation
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [mode, setMode] = useState('execution');
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);

  // Time & UI
  const [time, setTime] = useState(new Date());
  const [warningIndex, setWarningIndex] = useState(0);

  // Subjects & Tasks
  const [subjects, setSubjects] = useState([]);
  const [newSubjectName, setNewSubjectName] = useState('');
  const [tasks, setTasks] = useState({});
  const [selectedSubject, setSelectedSubject] = useState('');

  // Exams
  const [exams, setExams] = useState([]);
  const [newExamName, setNewExamName] = useState('');
  const [newExamDate, setNewExamDate] = useState('');
  const [examCountdowns, setExamCountdowns] = useState({});

  // Task Form
  const [taskForm, setTaskForm] = useState({
    title: '',
    priority: 'Medium',
    hours: '1',
    deadline: '',
  });
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [proofUploaded, setProofUploaded] = useState(false);
  const [expandedResource, setExpandedResource] = useState(false);
  const [quizScore, setQuizScore] = useState('');
  const [fullMarks, setFullMarks] = useState('');

  // Time
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Warnings
  useEffect(() => {
    const warningTimer = setInterval(() => {
      setWarningIndex((prev) => (prev + 1) % psychologicalWarnings.length);
    }, 6000);
    return () => clearInterval(warningTimer);
  }, []);

  // Exam Countdown
  useEffect(() => {
    const updateCountdowns = () => {
      const now = new Date();
      const countdowns = {};
      exams.forEach((exam) => {
        const examDate = new Date(exam.date);
        const days = Math.ceil((examDate - now) / (1000 * 60 * 60 * 24));
        countdowns[exam.id] = Math.max(days, 0);
      });
      setExamCountdowns(countdowns);
    };
    updateCountdowns();
    const interval = setInterval(updateCountdowns, 60000);
    return () => clearInterval(interval);
  }, [exams]);

  // Login
  const handleLogin = () => {
    if (loginEmail && loginPassword) {
      setCurrentUser(loginEmail.split('@')[0]);
      setIsLoggedIn(true);
      setLoginEmail('');
      setLoginPassword('');
    }
  };

  const handleSignUp = () => {
    if (!signUpEmail || !signUpPassword || !signUpPassword2) {
      setSignUpError('All fields required');
      return;
    }
    if (signUpPassword !== signUpPassword2) {
      setSignUpError('Passwords do not match');
      return;
    }
    if (signUpPassword.length < 6) {
      setSignUpError('Password must be 6+ characters');
      return;
    }
    setCurrentUser(signUpEmail.split('@')[0]);
    setIsLoggedIn(true);
    setSignUpEmail('');
    setSignUpPassword('');
    setSignUpPassword2('');
    setSignUpError('');
    setIsSignUp(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser('');
    setCurrentPage('dashboard');
    setMode('execution');
    setSubjects([]);
    setTasks({});
    setExams([]);
  };

  // Subject Management
  const addSubject = () => {
    if (newSubjectName.trim() && !subjects.includes(newSubjectName)) {
      setSubjects([...subjects, newSubjectName]);
      setTasks({ ...tasks, [newSubjectName]: [] });
      setNewSubjectName('');
    }
  };

  // Exam Management
  const addExam = () => {
    if (newExamName.trim() && newExamDate) {
      const exam = {
        id: Date.now(),
        name: newExamName,
        date: newExamDate,
      };
      setExams([...exams, exam]);
      setNewExamName('');
      setNewExamDate('');
    }
  };

  const deleteExam = (id) => {
    setExams(exams.filter((e) => e.id !== id));
  };

  // Task Management
  const addTask = () => {
    if (!selectedSubject) {
      alert('Please select a subject first');
      return;
    }
    if (!taskForm.title.trim()) {
      alert('Please enter task title');
      return;
    }
    if (!taskForm.deadline) {
      alert('Please enter deadline');
      return;
    }

    const newTask = {
      id: Date.now(),
      title: taskForm.title,
      priority: taskForm.priority,
      hours: taskForm.hours,
      deadline: taskForm.deadline,
      progress: 0,
    };

    setTasks({
      ...tasks,
      [selectedSubject]: [...(tasks[selectedSubject] || []), newTask],
    });

    setTaskForm({ title: '', priority: 'Medium', hours: '1', deadline: '' });
  };

  const deleteTask = (subject, taskId) => {
    setTasks({
      ...tasks,
      [subject]: tasks[subject].filter((t) => t.id !== taskId),
    });
  };

  // LOGIN PAGE
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-950 text-white overflow-hidden flex items-center justify-center p-4">
        <div className="fixed inset-0 -z-20">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md"
        >
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 backdrop-blur-xl rounded-2xl p-8 space-y-6">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Zap size={24} />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                ExecuteX
              </h1>
            </div>

            <p className="text-center text-slate-300 text-sm">Study Execution Dashboard</p>

            {isSignUp ? (
              // SIGN UP FORM
              <div className="space-y-4">
                <h3 className="text-lg font-bold">Create Account</h3>
                
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-2">Email</label>
                  <input
                    type="email"
                    value={signUpEmail}
                    onChange={(e) => setSignUpEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-2">Password</label>
                  <input
                    type="password"
                    value={signUpPassword}
                    onChange={(e) => setSignUpPassword(e.target.value)}
                    placeholder="Minimum 6 characters"
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-2">Confirm Password</label>
                  <input
                    type="password"
                    value={signUpPassword2}
                    onChange={(e) => setSignUpPassword2(e.target.value)}
                    placeholder="Re-enter password"
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50"
                  />
                </div>

                {signUpError && (
                  <div className="p-3 rounded-lg bg-red-600/20 border border-red-500/30 text-red-300 text-sm">
                    {signUpError}
                  </div>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSignUp}
                  className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 font-bold text-white hover:shadow-xl"
                >
                  Create Account
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  onClick={() => {
                    setIsSignUp(false);
                    setSignUpError('');
                  }}
                  className="w-full px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700/50 hover:bg-slate-800 text-sm text-slate-300 font-semibold flex items-center justify-center gap-2"
                >
                  <ChevronLeft size={16} />
                  Back to Sign In
                </motion.button>
              </div>
            ) : (
              // SIGN IN FORM
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-2">Email</label>
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 transition"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-2">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                      placeholder="Enter password"
                      className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 transition pr-10"
                    />
                    <button
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleLogin}
                  disabled={!loginEmail || !loginPassword}
                  className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 font-bold text-white hover:shadow-xl disabled:opacity-50"
                >
                  <LogIn size={18} className="inline mr-2" />
                  Sign In
                </motion.button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-700/50"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-slate-900/50 text-slate-400">Or try demo</span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  onClick={() => {
                    setLoginEmail('demo@executex.com');
                    setLoginPassword('demo123');
                  }}
                  className="w-full px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700/50 hover:bg-slate-800 text-sm text-slate-300 font-semibold"
                >
                  Demo: demo@executex.com / demo123
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setIsSignUp(true)}
                  className="w-full px-4 py-2 rounded-lg bg-blue-600/20 border border-blue-500/30 hover:bg-blue-600/30 text-sm text-blue-300 font-semibold"
                >
                  Create New Account
                </motion.button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    );
  }

  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return {
      date: d.getDate(),
      day: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][d.getDay()],
      fullDate: d.toISOString().split('T')[0],
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
      {/* Background */}
      <div className="fixed inset-0 -z-20">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <motion.header className="border-b border-slate-800/50 backdrop-blur-xl bg-slate-950/40 sticky top-0 z-40">
        <div className="px-4 md:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-slate-800/50 rounded-lg md:hidden"
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Zap size={18} />
              </div>
              <h1 className="text-lg md:text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                ExecuteX
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden lg:block">
              <div className="text-xs text-slate-400">Welcome</div>
              <div className="text-sm font-bold text-blue-400">{currentUser}</div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={handleLogout}
              className="p-2 hover:bg-red-600/20 rounded-lg"
            >
              <LogOut size={20} className="text-red-400" />
            </motion.button>
          </div>
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
              className="w-72 bg-slate-900/40 backdrop-blur-xl border-r border-slate-800/50 p-6 space-y-6 overflow-y-auto absolute md:relative z-30 h-full"
            >
              {/* Navigation */}
              <nav className="space-y-2">
                {[
                  { icon: <Target size={18} />, label: 'Dashboard', id: 'dashboard' },
                  { icon: <Calendar size={18} />, label: 'Schedule', id: 'schedule' },
                  { icon: <BarChart3 size={18} />, label: 'Analytics', id: 'analytics' },
                  { icon: <Settings size={18} />, label: 'Settings', id: 'settings' },
                ].map((item) => (
                  <motion.button
                    key={item.id}
                    onClick={() => {
                      setCurrentPage(item.id);
                      setSidebarOpen(false);
                    }}
                    whileHover={{ x: 4 }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition ${
                      currentPage === item.id
                        ? 'bg-blue-600/30 text-blue-300 border border-blue-500/30'
                        : 'text-slate-300 hover:bg-slate-800/50'
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </motion.button>
                ))}
              </nav>

              {/* Stats */}
              <div className="space-y-3 p-4 rounded-xl bg-gradient-to-br from-blue-600/10 to-purple-600/10 border border-blue-500/20">
                <h4 className="font-semibold text-sm">📊 Study Stats</h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <div className="text-slate-400">Streak</div>
                    <div className="text-lg font-bold text-blue-400">47</div>
                  </div>
                  <div>
                    <div className="text-slate-400">Hours</div>
                    <div className="text-lg font-bold text-purple-400">156</div>
                  </div>
                </div>
              </div>

              {/* Exams */}
              {exams.length > 0 && (
                <div className="space-y-2 p-4 rounded-xl bg-gradient-to-br from-orange-600/10 to-red-600/10 border border-orange-500/20 max-h-48 overflow-y-auto">
                  <h4 className="font-semibold text-sm flex items-center gap-2">
                    <AlertTriangle size={16} />
                    Exams
                  </h4>
                  {exams.map((exam) => (
                    <div key={exam.id} className="text-xs bg-slate-800/30 p-2 rounded">
                      <div className="font-semibold text-white">{exam.name}</div>
                      <div className="text-orange-300 font-bold">{examCountdowns[exam.id] || 0} days</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Subjects */}
              <div className="space-y-2 p-4 rounded-xl bg-gradient-to-br from-purple-600/10 to-blue-600/10 border border-purple-500/20 max-h-48 overflow-y-auto">
                <h4 className="font-semibold text-sm">📚 Subjects</h4>
                {subjects.length > 0 ? (
                  subjects.map((subj) => (
                    <button
                      key={subj}
                      onClick={() => {
                        setSelectedSubject(subj);
                        setCurrentPage('dashboard');
                      }}
                      className={`w-full text-xs p-2 rounded text-left font-semibold transition ${
                        selectedSubject === subj
                          ? 'bg-blue-600/50 text-blue-200'
                          : 'bg-slate-800/30 text-slate-300 hover:bg-slate-800/50'
                      }`}
                    >
                      {subj}
                    </button>
                  ))
                ) : (
                  <p className="text-xs text-slate-400">Add subject to start</p>
                )}
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <AnimatePresence mode="wait">
            {currentPage === 'dashboard' && (
              <DashboardPage
                key="dashboard"
                mode={mode}
                setMode={setMode}
                subjects={subjects}
                newSubjectName={newSubjectName}
                setNewSubjectName={setNewSubjectName}
                addSubject={addSubject}
                selectedSubject={selectedSubject}
                setSelectedSubject={setSelectedSubject}
                tasks={tasks}
                deleteTask={deleteTask}
                taskForm={taskForm}
                setTaskForm={setTaskForm}
                addTask={addTask}
                days={days}
                selectedDayIndex={selectedDayIndex}
                setSelectedDayIndex={setSelectedDayIndex}
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
                proofUploaded={proofUploaded}
                setProofUploaded={setProofUploaded}
                expandedResource={expandedResource}
                setExpandedResource={setExpandedResource}
                quizScore={quizScore}
                setQuizScore={setQuizScore}
                fullMarks={fullMarks}
                setFullMarks={setFullMarks}
                performanceLevel={performanceLevel}
                warningIndex={warningIndex}
              />
            )}
            {currentPage === 'schedule' && (
              <SchedulePage
                key="schedule"
                exams={exams}
                newExamName={newExamName}
                setNewExamName={setNewExamName}
                newExamDate={newExamDate}
                setNewExamDate={setNewExamDate}
                addExam={addExam}
                deleteExam={deleteExam}
                examCountdowns={examCountdowns}
              />
            )}
            {currentPage === 'analytics' && <AnalyticsPage key="analytics" />}
            {currentPage === 'settings' && <SettingsPage key="settings" />}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

// DASHBOARD PAGE
function DashboardPage({
  mode, setMode, subjects, newSubjectName, setNewSubjectName, addSubject,
  selectedSubject, setSelectedSubject, tasks, deleteTask, taskForm, setTaskForm,
  addTask, days, selectedDayIndex, setSelectedDayIndex, currentStep, setCurrentStep,
  proofUploaded, setProofUploaded, expandedResource, setExpandedResource,
  quizScore, setQuizScore, fullMarks, setFullMarks, performanceLevel, warningIndex,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 pb-8"
    >
      {/* Mode Toggle */}
      <div className="flex justify-center">
        <div className="relative flex items-center gap-1 p-1 bg-slate-900/80 rounded-xl border border-slate-700/50">
          {['planning', 'execution'].map((m) => (
            <motion.button
              key={m}
              onClick={() => {
                setMode(m);
                setCurrentStep(0);
                setProofUploaded(false);
              }}
              className="relative px-6 py-2 rounded-lg font-semibold text-sm transition"
              whileHover={{ scale: 1.05 }}
            >
              {mode === m && (
                <motion.div
                  layoutId="modeBg"
                  className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg -z-10"
                />
              )}
              {m === 'planning' ? '📋 Planning' : '⚡ Execution'}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Subject Management */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 backdrop-blur-xl space-y-4"
      >
        <h3 className="text-lg font-bold">📚 Subject Management</h3>
        
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Add new subject (e.g., Mathematics)"
            value={newSubjectName}
            onChange={(e) => setNewSubjectName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addSubject()}
            className="flex-1 px-4 py-2 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 text-sm"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={addSubject}
            disabled={!newSubjectName.trim()}
            className="px-4 py-2 bg-blue-600/50 border border-blue-500/50 rounded-lg text-sm font-semibold hover:bg-blue-600 disabled:opacity-50"
          >
            <Plus size={18} />
          </motion.button>
        </div>

        {subjects.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {subjects.map((subj) => (
              <motion.button
                key={subj}
                onClick={() => setSelectedSubject(subj)}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition ${
                  selectedSubject === subj
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {subj}
              </motion.button>
            ))}
          </div>
        )}
      </motion.div>

      {mode === 'planning' ? (
        // PLANNING MODE
        selectedSubject && (
          <>
            {/* Task Creation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 backdrop-blur-xl space-y-4"
            >
              <h3 className="text-lg font-bold">📝 Create Task for {selectedSubject}</h3>

              {/* 7-Day Selector */}
              <div className="space-y-2">
                <h4 className="text-sm font-semibold">Select Day</h4>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {days.map((day, i) => (
                    <motion.button
                      key={i}
                      onClick={() => setSelectedDayIndex(i)}
                      whileHover={{ scale: 1.05 }}
                      className={`flex-shrink-0 px-3 py-2 rounded-lg border transition ${
                        selectedDayIndex === i
                          ? 'bg-blue-600 border-blue-400'
                          : 'bg-slate-800/40 border-slate-700/50'
                      }`}
                    >
                      <div className="text-center">
                        <div className="text-xs font-semibold">{day.day}</div>
                        <div className="text-sm font-bold">{day.date}</div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Task title (required)*"
                  value={taskForm.title}
                  onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })}
                  className="px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 text-sm"
                />

                <select
                  value={taskForm.priority}
                  onChange={(e) => setTaskForm({ ...taskForm, priority: e.target.value })}
                  className="px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white focus:outline-none focus:border-blue-500/50 text-sm"
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                  <option>Critical</option>
                </select>

                <input
                  type="number"
                  placeholder="Hours"
                  value={taskForm.hours}
                  onChange={(e) => setTaskForm({ ...taskForm, hours: e.target.value })}
                  min="1"
                  className="px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 text-sm"
                />

                <input
                  type="date"
                  value={taskForm.deadline}
                  onChange={(e) => setTaskForm({ ...taskForm, deadline: e.target.value })}
                  className="px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white focus:outline-none focus:border-blue-500/50 text-sm"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={addTask}
                className="w-full px-6 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 font-bold text-white hover:shadow-xl"
              >
                <Plus size={18} className="inline mr-2" />
                Add Task
              </motion.button>
            </motion.div>

            {/* Tasks List */}
            {tasks[selectedSubject] && tasks[selectedSubject].length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 backdrop-blur-xl space-y-4"
              >
                <h3 className="text-lg font-bold">📋 Tasks ({tasks[selectedSubject].length})</h3>

                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {tasks[selectedSubject].map((task) => (
                    <motion.div
                      key={task.id}
                      layout
                      className="p-4 bg-slate-800/30 border border-slate-700/50 rounded-lg flex justify-between items-start"
                    >
                      <div>
                        <div className="font-semibold text-white">{task.title}</div>
                        <div className="text-xs text-slate-400 mt-1">
                          {task.hours}h • {task.priority} • {task.deadline}
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        onClick={() => deleteTask(selectedSubject, task.id)}
                        className="p-2 hover:bg-red-600/20 rounded"
                      >
                        <Trash size={16} className="text-red-400" />
                      </motion.button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </>
        )
      ) : (
        // EXECUTION MODE
        selectedSubject && tasks[selectedSubject]?.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <motion.div
              className="p-6 rounded-2xl bg-gradient-to-br from-blue-900/30 to-purple-900/30 border border-blue-500/20 backdrop-blur-xl"
            >
              <h3 className="text-2xl font-bold mb-4">⚡ Execution Pipeline</h3>

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
                      whileHover={!isLocked ? { scale: 1.02 } : {}}
                      disabled={isLocked}
                      className={`w-full p-4 rounded-xl border transition ${
                        isCompleted
                          ? 'bg-emerald-600/20 border-emerald-500/50'
                          : isActive
                            ? 'bg-gradient-to-r from-blue-600/40 to-purple-600/40 border-blue-500/50'
                            : isLocked
                              ? 'bg-slate-800/20 border-slate-700/30 opacity-50'
                              : 'bg-slate-800/30 border-slate-700/50'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex-shrink-0">
                          {isCompleted ? (
                            <CheckCircle2 size={24} className="text-emerald-400" />
                          ) : isActive ? (
                            <motion.div
                              animate={{ scale: [1, 1.1, 1] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            >
                              <Zap size={24} className="text-blue-400" />
                            </motion.div>
                          ) : (
                            <Circle size={24} className="text-slate-500" />
                          )}
                        </div>
                        <div className="flex-1 text-left">
                          <div className="font-bold">{step}</div>
                          <div className="text-xs text-slate-400">
                            {isCompleted ? 'Completed' : isActive ? 'In Progress' : 'Locked'}
                          </div>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>

            {currentStep > 0 && currentStep < pipelineSteps.length && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 backdrop-blur-xl space-y-4"
              >
                <h3 className="text-lg font-bold">📸 Proof Vault</h3>
                {proofUploaded ? (
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-emerald-600/20 border border-emerald-500/50">
                    <CheckCircle2 size={24} className="text-emerald-400" />
                    <div>
                      <div className="font-semibold text-emerald-300">Proof Uploaded</div>
                      <div className="text-xs text-emerald-200">{new Date().toLocaleTimeString()}</div>
                    </div>
                  </div>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setProofUploaded(true)}
                    className="w-full p-4 rounded-lg border-2 border-dashed border-slate-700/50 hover:border-blue-500/50 transition"
                  >
                    <Upload size={20} className="mx-auto mb-2 text-slate-500" />
                    <div className="font-semibold">Click to Upload Proof</div>
                  </motion.button>
                )}

                {(currentStep === 2 || currentStep === 3) && (
                  <div className="space-y-4 mt-4">
                    <h4 className="font-bold">📊 Performance Scoring</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="number"
                        placeholder="Score (required)*"
                        value={quizScore}
                        onChange={(e) => setQuizScore(e.target.value)}
                        className="px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 text-sm"
                      />
                      <input
                        type="number"
                        placeholder="Full Marks (required)*"
                        value={fullMarks}
                        onChange={(e) => setFullMarks(e.target.value)}
                        className="px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 text-sm"
                      />
                    </div>

                    {quizScore && fullMarks && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className={`p-4 rounded-lg bg-gradient-to-r ${performanceLevel()?.color} bg-opacity-20`}
                      >
                        <div className="font-bold text-lg">{((quizScore / fullMarks) * 100).toFixed(1)}%</div>
                        <div className="text-sm font-semibold">{performanceLevel()?.level}</div>
                      </motion.div>
                    )}
                  </div>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  onClick={() => {
                    if (proofUploaded && currentStep < pipelineSteps.length - 1) {
                      setCurrentStep(currentStep + 1);
                      setProofUploaded(false);
                    }
                  }}
                  disabled={!proofUploaded}
                  className={`w-full px-6 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 ${
                    proofUploaded
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:shadow-xl'
                      : 'bg-slate-700/30 opacity-50'
                  }`}
                >
                  <CheckCircle2 size={20} />
                  Progress
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        )
      )}

      {/* Reality Check */}
      <RealityCheckEngine warnings={psychologicalWarnings} currentIndex={warningIndex} />
    </motion.div>
  );
}

// SCHEDULE PAGE
function SchedulePage({
  exams, newExamName, setNewExamName, newExamDate, setNewExamDate, addExam, deleteExam, examCountdowns
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 pb-8"
    >
      <h2 className="text-3xl font-bold">📅 Exam Schedule</h2>

      <motion.div
        className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 backdrop-blur-xl space-y-4"
      >
        <h3 className="text-lg font-bold">➕ Add Exam</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Exam name (required)*"
            value={newExamName}
            onChange={(e) => setNewExamName(e.target.value)}
            className="px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50"
          />

          <input
            type="date"
            value={newExamDate}
            onChange={(e) => setNewExamDate(e.target.value)}
            className="px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white focus:outline-none focus:border-blue-500/50"
          />

          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={addExam}
            disabled={!newExamName.trim() || !newExamDate}
            className="px-6 py-3 bg-blue-600 rounded-lg font-bold hover:bg-blue-700 disabled:opacity-50"
          >
            Add Exam
          </motion.button>
        </div>
      </motion.div>

      {exams.length > 0 && (
        <motion.div
          className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 backdrop-blur-xl space-y-4"
        >
          <h3 className="text-lg font-bold">📋 Upcoming Exams</h3>

          <div className="space-y-3 max-h-96 overflow-y-auto">
            {exams.map((exam) => (
              <motion.div
                key={exam.id}
                layout
                className="p-4 bg-slate-800/30 border border-slate-700/50 rounded-lg flex justify-between items-center"
              >
                <div>
                  <div className="font-bold text-lg">{exam.name}</div>
                  <div className="text-sm text-slate-400">{exam.date}</div>
                  <div className="text-lg font-bold text-orange-400 mt-1">{examCountdowns[exam.id] || 0} days left</div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  onClick={() => deleteExam(exam.id)}
                  className="p-2 hover:bg-red-600/20 rounded"
                >
                  <Trash size={20} className="text-red-400" />
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

// ANALYTICS PAGE
function AnalyticsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 pb-8"
    >
      <h2 className="text-3xl font-bold">📊 Analytics</h2>

      <motion.div
        className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 backdrop-blur-xl"
      >
        <h3 className="text-lg font-bold mb-4">📈 Study Statistics</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: 'Total Hours', value: '156', color: 'from-blue-500' },
            { label: 'Daily Streak', value: '47', color: 'from-orange-500' },
            { label: 'Consistency', value: '94%', color: 'from-emerald-500' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`p-6 rounded-xl bg-gradient-to-br ${stat.color}/20 border border-slate-700/50`}
            >
              <div className="text-slate-400 text-sm mb-2">{stat.label}</div>
              <div className="text-3xl font-bold">{stat.value}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

// SETTINGS PAGE
function SettingsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 pb-8"
    >
      <h2 className="text-3xl font-bold">⚙️ Settings</h2>

      <motion.div
        className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 backdrop-blur-xl space-y-4"
      >
        <h3 className="text-lg font-bold mb-4">🎨 Preferences</h3>

        <div className="space-y-3">
          <div className="p-4 bg-slate-800/30 rounded-lg">
            <label className="font-semibold text-sm block mb-2">Theme</label>
            <select className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white">
              <option>Dark (Current)</option>
              <option>Light</option>
            </select>
          </div>

          <div className="p-4 bg-slate-800/30 rounded-lg">
            <label className="font-semibold text-sm block mb-2">Notifications</label>
            <select className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white">
              <option>On</option>
              <option>Off</option>
            </select>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// REALITY CHECK
function RealityCheckEngine({ warnings, currentIndex }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-12 p-6 rounded-2xl bg-gradient-to-br from-red-950/40 to-orange-950/40 border-2 border-red-500/30 backdrop-blur-xl"
    >
      <div className="flex items-center gap-3 mb-4">
        <AlertCircle size={24} className="text-red-400" />
        <h3 className="text-xl font-bold text-red-300">⚠️ Reality Check</h3>
      </div>

      <p className="text-sm text-red-200/80 font-semibold leading-relaxed mb-4">
        Your future is being decided by what you do today.
      </p>

      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 rounded-lg bg-red-900/30 border border-red-500/20"
      >
        <div className="text-sm leading-relaxed text-red-100">
          {warnings[currentIndex]}
        </div>
      </motion.div>
    </motion.div>
  );
}
