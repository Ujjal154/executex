import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,X,Clock,Zap,Target,TrendingUp,Upload,Link2,FileText,CheckCircle2,Circle,Lock,
  ChevronRight,ArrowRight,AlertCircle,Star,Calendar,Settings,LogOut,ChevronDown,Plus,
  Trash2,Send,BarChart3,LogIn,Eye,EyeOff,AlertTriangle,Trash,Edit2,ChevronLeft,CheckCheck,
} from 'lucide-react';

const warnings = [
  "Someone with less talent is outperforming you through consistency.",
  "Every skipped session becomes future regret.",
  "Comfort now. Pressure later.",
  "Your competition is not resting.",
  "Discipline creates options. Excuses remove them.",
];

const steps = ['Study', 'Revise', 'Quiz', 'Test', 'Result', 'Retest'];
const STORAGE_KEY = 'executex_accounts';
const USER_DATA_KEY = 'executex_user_';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [currentUser, setCurrentUser] = useState('');
  const [currentUserEmail, setCurrentUserEmail] = useState('');
  
  const [siEmail, setSiEmail] = useState('');
  const [siPassword, setSiPassword] = useState('');
  const [siError, setSiError] = useState('');
  const [showSiPassword, setShowSiPassword] = useState(false);
  
  const [suEmail, setSuEmail] = useState('');
  const [suPassword, setSuPassword] = useState('');
  const [suPasswordConfirm, setSuPasswordConfirm] = useState('');
  const [suError, setSuError] = useState('');
  const [suSuccess, setSuSuccess] = useState('');
  const [showSuPassword, setShowSuPassword] = useState(false);

  const [page, setPage] = useState('dashboard');
  const [mode, setMode] = useState('execution');
  const [sideOpen, setSideOpen] = useState(window.innerWidth >= 768);

  const [warningIdx, setWarningIdx] = useState(0);
  const [selectedDateIdx, setSelectedDateIdx] = useState(0);

  const [subjects, setSubjects] = useState([]);
  const [subjectInput, setSubjectInput] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [allTasks, setAllTasks] = useState({});

  const [taskTitle, setTaskTitle] = useState('');
  const [taskPriority, setTaskPriority] = useState('Medium');
  const [taskHours, setTaskHours] = useState('1');
  const [taskDate, setTaskDate] = useState('');
  const [taskNotes, setTaskNotes] = useState('');

  const [exams, setExams] = useState([]);
  const [examName, setExamName] = useState('');
  const [examDate, setExamDate] = useState('');
  const [examCountdowns, setExamCountdowns] = useState({});

  const [currentStep, setCurrentStep] = useState(0);
  const [proofUploaded, setProofUploaded] = useState(false);
  const [quizScore, setQuizScore] = useState('');
  const [fullMarks, setFullMarks] = useState('');

  // Load data on mount
  useEffect(() => {
    const userEmail = localStorage.getItem('executex_current_user');
    if (userEmail) {
      const accountsDB = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{"demo@executex.com":{"password":"demo123","name":"Demo User"}}');
      if (accountsDB[userEmail]) {
        setCurrentUserEmail(userEmail);
        setCurrentUser(accountsDB[userEmail].name);
        setIsLoggedIn(true);
        
        const userData = JSON.parse(localStorage.getItem(USER_DATA_KEY + userEmail) || '{"subjects":[],"allTasks":{},"exams":[]}');
        setSubjects(userData.subjects || []);
        setAllTasks(userData.allTasks || {});
        setExams(userData.exams || []);
      }
    }
  }, []);

  // Save data whenever it changes
  useEffect(() => {
    if (isLoggedIn && currentUserEmail) {
      localStorage.setItem(USER_DATA_KEY + currentUserEmail, JSON.stringify({
        subjects,
        allTasks,
        exams,
      }));
    }
  }, [subjects, allTasks, exams, isLoggedIn, currentUserEmail]);

  useEffect(() => {
    const timer = setInterval(() => setWarningIdx(prev => (prev + 1) % warnings.length), 6000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const updateCountdowns = () => {
      const now = new Date();
      const newCountdowns = {};
      exams.forEach(exam => {
        const [d, m, y] = exam.date.split('/');
        const examDate = new Date(y, m - 1, d);
        const days = Math.ceil((examDate - now) / (1000 * 60 * 60 * 24));
        newCountdowns[exam.id] = Math.max(days, 0);
      });
      setExamCountdowns(newCountdowns);
    };
    if (exams.length > 0) {
      updateCountdowns();
      const interval = setInterval(updateCountdowns, 60000);
      return () => clearInterval(interval);
    }
  }, [exams]);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const d = String(date.getDate()).padStart(2, '0');
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const y = date.getFullYear();
    return `${d}/${m}/${y}`;
  };

  const get7Days = () => {
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() + i);
      const dateStr = formatDate(d.toISOString().split('T')[0]);
      return {
        index: i,
        date: d.getDate(),
        day: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][d.getDay()],
        fullDate: dateStr,
      };
    });
  };

  const getTasksForDate = (dateStr) => {
    if (!selectedSubject || !allTasks[selectedSubject]) return [];
    return allTasks[selectedSubject].filter(task => task.date === dateStr);
  };

  const handleSignIn = () => {
    setSiError('');
    if (!siEmail.trim()) {
      setSiError('Email required');
      return;
    }
    if (!siPassword.trim()) {
      setSiError('Password required');
      return;
    }

    const accountsDB = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{"demo@executex.com":{"password":"demo123","name":"Demo User"}}');

    if (accountsDB[siEmail] && accountsDB[siEmail].password === siPassword) {
      setCurrentUser(accountsDB[siEmail].name);
      setCurrentUserEmail(siEmail);
      setIsLoggedIn(true);
      localStorage.setItem('executex_current_user', siEmail);
      setSiEmail('');
      setSiPassword('');
      
      const userData = JSON.parse(localStorage.getItem(USER_DATA_KEY + siEmail) || '{"subjects":[],"allTasks":{},"exams":[]}');
      setSubjects(userData.subjects || []);
      setAllTasks(userData.allTasks || {});
      setExams(userData.exams || []);
    } else {
      setSiError('❌ Invalid email or password');
    }
  };

  const handleSignUp = () => {
    setSuError('');
    setSuSuccess('');

    if (!suEmail.trim()) {
      setSuError('Email required');
      return;
    }
    if (!suPassword.trim()) {
      setSuError('Password required');
      return;
    }
    if (!suPasswordConfirm.trim()) {
      setSuError('Confirm password required');
      return;
    }
    if (suPassword.length < 6) {
      setSuError('Password must be 6+ characters');
      return;
    }
    if (suPassword !== suPasswordConfirm) {
      setSuError('Passwords do not match');
      return;
    }

    const accountsDB = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{"demo@executex.com":{"password":"demo123","name":"Demo User"}}');

    if (accountsDB[suEmail]) {
      setSuError('Email already registered');
      return;
    }

    accountsDB[suEmail] = { password: suPassword, name: suEmail.split('@')[0] };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(accountsDB));
    setSuSuccess('✅ Account created! Signing in...');

    setTimeout(() => {
      setCurrentUser(accountsDB[suEmail].name);
      setCurrentUserEmail(suEmail);
      setIsLoggedIn(true);
      localStorage.setItem('executex_current_user', suEmail);
      setSuEmail('');
      setSuPassword('');
      setSuPasswordConfirm('');
      setSuError('');
      setSuSuccess('');
      setShowSignUp(false);
      setSubjects([]);
      setAllTasks({});
      setExams([]);
    }, 1000);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser('');
    setCurrentUserEmail('');
    setPage('dashboard');
    setMode('execution');
    setSubjects([]);
    setAllTasks({});
    setExams([]);
    setSelectedSubject('');
    setCurrentStep(0);
    setProofUploaded(false);
    localStorage.removeItem('executex_current_user');
  };

  const addSubject = () => {
    if (!subjectInput.trim()) {
      alert('Subject name required');
      return;
    }
    if (subjects.includes(subjectInput)) {
      alert('Subject already exists');
      return;
    }
    const newSubjects = [...subjects, subjectInput];
    setSubjects(newSubjects);
    setAllTasks({ ...allTasks, [subjectInput]: [] });
    setSubjectInput('');
    alert('✅ Subject added!');
  };

  const addTask = () => {
    if (!selectedSubject) {
      alert('Select a subject first');
      return;
    }
    if (!taskTitle.trim()) {
      alert('Task title required');
      return;
    }
    if (!taskDate) {
      alert('Date required');
      return;
    }

    const newTask = {
      id: Date.now(),
      title: taskTitle,
      priority: taskPriority,
      hours: taskHours,
      date: taskDate,
      notes: taskNotes,
    };

    setAllTasks({
      ...allTasks,
      [selectedSubject]: [...(allTasks[selectedSubject] || []), newTask],
    });

    setTaskTitle('');
    setTaskPriority('Medium');
    setTaskHours('1');
    setTaskDate('');
    setTaskNotes('');
    alert('✅ Task added!');
  };

  const deleteTask = (subject, taskId) => {
    setAllTasks({
      ...allTasks,
      [subject]: allTasks[subject].filter(t => t.id !== taskId),
    });
    alert('❌ Task deleted');
  };

  const addExam = () => {
    if (!examName.trim()) {
      alert('Exam name required');
      return;
    }
    if (!examDate) {
      alert('Exam date required');
      return;
    }

    const newExam = {
      id: Date.now(),
      name: examName,
      date: formatDate(examDate),
    };

    setExams([...exams, newExam]);
    setExamName('');
    setExamDate('');
    alert('✅ Exam added!');
  };

  const deleteExam = (id) => {
    setExams(exams.filter(e => e.id !== id));
    alert('❌ Exam deleted');
  };

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
            <div className="flex items-center justify-center gap-2">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Zap size={24} />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                ExecuteX
              </h1>
            </div>

            <p className="text-center text-slate-300 text-sm">Study Execution Dashboard</p>

            {showSignUp ? (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-center">Create Account</h3>

                <input
                  type="email"
                  placeholder="Email"
                  value={suEmail}
                  onChange={e => setSuEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50"
                />

                <div className="relative">
                  <input
                    type={showSuPassword ? 'text' : 'password'}
                    placeholder="Password (6+ chars)"
                    value={suPassword}
                    onChange={e => setSuPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 pr-10"
                  />
                  <button
                    onClick={() => setShowSuPassword(!showSuPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                  >
                    {showSuPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={suPasswordConfirm}
                  onChange={e => setSuPasswordConfirm(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50"
                />

                {suError && (
                  <div className="p-3 rounded-lg bg-red-600/20 border border-red-500/30 text-red-300 text-sm">
                    {suError}
                  </div>
                )}

                {suSuccess && (
                  <div className="p-3 rounded-lg bg-emerald-600/20 border border-emerald-500/30 text-emerald-300 text-sm">
                    {suSuccess}
                  </div>
                )}

                <button
                  onClick={handleSignUp}
                  className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 font-bold text-white hover:shadow-xl"
                >
                  ✅ Create Account
                </button>

                <button
                  onClick={() => {
                    setShowSignUp(false);
                    setSuError('');
                    setSuSuccess('');
                  }}
                  className="w-full px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700/50 text-sm text-slate-300 font-semibold"
                >
                  ← Back
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="Email"
                  value={siEmail}
                  onChange={e => setSiEmail(e.target.value)}
                  onKeyPress={e => e.key === 'Enter' && handleSignIn()}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50"
                />

                <div className="relative">
                  <input
                    type={showSiPassword ? 'text' : 'password'}
                    placeholder="Password"
                    value={siPassword}
                    onChange={e => setSiPassword(e.target.value)}
                    onKeyPress={e => e.key === 'Enter' && handleSignIn()}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 pr-10"
                  />
                  <button
                    onClick={() => setShowSiPassword(!showSiPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                  >
                    {showSiPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                {siError && (
                  <div className="p-3 rounded-lg bg-red-600/20 border border-red-500/30 text-red-300 text-sm">
                    {siError}
                  </div>
                )}

                <button
                  onClick={handleSignIn}
                  className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 font-bold text-white hover:shadow-xl"
                >
                  🔓 Sign In
                </button>

                <div className="border-t border-slate-700/50"></div>

                <button
                  onClick={() => {
                    setSiEmail('demo@executex.com');
                    setSiPassword('demo123');
                    setTimeout(handleSignIn, 100);
                  }}
                  className="w-full px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700/50 hover:bg-slate-800 text-sm text-slate-300 font-semibold"
                >
                  📌 Demo: demo@executex.com
                </button>

                <button
                  onClick={() => setShowSignUp(true)}
                  className="w-full px-4 py-2 rounded-lg bg-blue-600/20 border border-blue-500/30 hover:bg-blue-600/30 text-sm text-blue-300 font-semibold"
                >
                  ✨ Create Account
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    );
  }

  const daysArray = get7Days();
  const currentDayFull = daysArray[selectedDateIdx].fullDate;
  const tasksForSelectedDay = getTasksForDate(currentDayFull);

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden flex flex-col">
      <div className="fixed inset-0 -z-20">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl"></div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        key={warningIdx}
        className="bg-gradient-to-r from-red-950/60 to-orange-950/60 border-b border-red-500/30 px-4 md:px-6 py-3"
      >
        <div className="flex items-center gap-3">
          <AlertTriangle size={18} className="text-red-400 flex-shrink-0" />
          <p className="text-xs md:text-sm text-red-100 font-semibold">
            <span className="text-red-300">⚠️</span> {warnings[warningIdx]}
          </p>
        </div>
      </motion.div>

      <header className="border-b border-slate-800/50 backdrop-blur-xl bg-slate-950/40 px-4 md:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSideOpen(!sideOpen)}
            className="p-2 hover:bg-slate-800/50 rounded-lg md:hidden"
          >
            {sideOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
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
            <div className="text-xs text-slate-400">User</div>
            <div className="text-sm font-bold text-blue-400">{currentUser}</div>
          </div>
          <button
            onClick={handleLogout}
            className="p-2 hover:bg-red-600/20 rounded-lg"
          >
            <LogOut size={20} className="text-red-400" />
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <AnimatePresence>
          {sideOpen && (
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              className="w-72 bg-slate-900/40 backdrop-blur-xl border-r border-slate-800/50 p-6 space-y-6 overflow-y-auto absolute md:relative z-30 h-full"
            >
              <nav className="space-y-2">
                {[
                  { icon: <Target size={18} />, label: 'Dashboard', id: 'dashboard' },
                  { icon: <Calendar size={18} />, label: 'Schedule', id: 'schedule' },
                  { icon: <BarChart3 size={18} />, label: 'Analytics', id: 'analytics' },
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setPage(item.id);
                      setSideOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition ${
                      page === item.id
                        ? 'bg-blue-600/30 text-blue-300 border border-blue-500/30'
                        : 'text-slate-300 hover:bg-slate-800/50'
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </button>
                ))}
              </nav>

              <div className="space-y-3 p-4 rounded-xl bg-gradient-to-br from-blue-600/10 to-purple-600/10 border border-blue-500/20">
                <h4 className="font-semibold text-sm">📊 Stats</h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <div className="text-slate-400">Subjects</div>
                    <div className="text-lg font-bold text-blue-400">{subjects.length}</div>
                  </div>
                  <div>
                    <div className="text-slate-400">Tasks</div>
                    <div className="text-lg font-bold">{Object.values(allTasks).reduce((s, a) => s + a.length, 0)}</div>
                  </div>
                </div>
              </div>

              {subjects.length > 0 && (
                <div className="space-y-2 p-4 rounded-xl bg-gradient-to-br from-purple-600/10 to-blue-600/10 border border-purple-500/20">
                  <h4 className="font-semibold text-sm">📚 Subjects</h4>
                  {subjects.map(s => (
                    <button
                      key={s}
                      onClick={() => {
                        setSelectedSubject(s);
                        setPage('dashboard');
                      }}
                      className={`w-full text-xs p-2 rounded text-left font-semibold transition ${
                        selectedSubject === s
                          ? 'bg-blue-600/50 text-blue-200'
                          : 'bg-slate-800/30 text-slate-300 hover:bg-slate-800/50'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </motion.aside>
          )}
        </AnimatePresence>

        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <AnimatePresence mode="wait">
            {page === 'dashboard' && (
              <motion.div key="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 pb-8 max-w-6xl">
                <h2 className="text-3xl font-bold">📚 Dashboard</h2>

                <div className="flex justify-center">
                  <div className="relative flex items-center gap-1 p-1 bg-slate-900/80 rounded-xl border border-slate-700/50">
                    {['planning', 'execution'].map(m => (
                      <button
                        key={m}
                        onClick={() => {
                          setMode(m);
                          setCurrentStep(0);
                          setProofUploaded(false);
                        }}
                        className={`relative px-6 py-2 rounded-lg font-semibold text-sm transition ${
                          mode === m
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600'
                            : 'text-slate-300'
                        }`}
                      >
                        {m === 'planning' ? '📋 Planning' : '⚡ Execution'}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 space-y-4">
                  <h3 className="text-lg font-bold">📚 Add Subject</h3>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Math, Physics, Chemistry..."
                      value={subjectInput}
                      onChange={e => setSubjectInput(e.target.value)}
                      onKeyPress={e => e.key === 'Enter' && addSubject()}
                      className="flex-1 px-4 py-2 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500"
                    />
                    <button
                      onClick={addSubject}
                      className="px-4 py-2 bg-blue-600 rounded-lg font-bold hover:bg-blue-700"
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                </div>

                {selectedSubject && (
                  <>
                    {/* 7-DAY SELECTOR */}
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 space-y-4">
                      <h3 className="text-lg font-bold">📅 Select Date</h3>
                      <div className="flex gap-2 overflow-x-auto pb-2">
                        {daysArray.map(dayObj => (
                          <button
                            key={dayObj.index}
                            onClick={() => setSelectedDateIdx(dayObj.index)}
                            className={`flex-shrink-0 px-4 py-2 rounded-lg border transition text-center ${
                              selectedDateIdx === dayObj.index
                                ? 'bg-blue-600 border-blue-400'
                                : 'bg-slate-800/40 border-slate-700/50 hover:bg-slate-800'
                            }`}
                          >
                            <div className="text-xs font-semibold">{dayObj.day}</div>
                            <div className="text-sm font-bold">{dayObj.date}</div>
                            <div className="text-xs text-slate-400">{dayObj.fullDate}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {mode === 'planning' ? (
                      <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 space-y-4">
                        <h3 className="text-lg font-bold">📝 Add Task for {currentDayFull}</h3>
                        
                        <input
                          type="text"
                          placeholder="Task title"
                          value={taskTitle}
                          onChange={e => setTaskTitle(e.target.value)}
                          className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500"
                        />

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          <select
                            value={taskPriority}
                            onChange={e => setTaskPriority(e.target.value)}
                            className="px-3 py-2 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white text-sm"
                          >
                            <option>Low</option>
                            <option>Medium</option>
                            <option>High</option>
                            <option>Critical</option>
                          </select>

                          <input
                            type="number"
                            placeholder="Hours"
                            value={taskHours}
                            onChange={e => setTaskHours(e.target.value)}
                            min="1"
                            className="px-3 py-2 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white text-sm"
                          />

                          <button
                            onClick={() => setTaskDate(currentDayFull)}
                            className="px-4 py-2 bg-blue-600 rounded-lg font-bold hover:bg-blue-700 text-sm"
                          >
                            Set Date
                          </button>
                        </div>

                        <div className="p-2 bg-slate-800/30 rounded text-xs text-slate-300">
                          Selected Date: <span className="font-bold">{taskDate || 'Not set'}</span>
                        </div>

                        <textarea
                          placeholder="Notes (optional)"
                          value={taskNotes}
                          onChange={e => setTaskNotes(e.target.value)}
                          className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 h-20 resize-none text-sm"
                        />

                        <button
                          onClick={addTask}
                          className="w-full px-4 py-3 bg-blue-600 rounded-lg font-bold hover:bg-blue-700"
                        >
                          ✅ Add Task
                        </button>
                      </div>
                    ) : (
                      <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-900/30 to-purple-900/30 border border-blue-500/20 space-y-4">
                        <h3 className="text-lg font-bold">⚡ Pipeline</h3>

                        {steps.map((s, i) => (
                          <button
                            key={i}
                            onClick={() => {
                              if (i <= currentStep + 1) setCurrentStep(i);
                            }}
                            className={`w-full p-3 rounded-lg border transition text-left ${
                              i < currentStep
                                ? 'bg-emerald-600/20 border-emerald-500/50'
                                : i === currentStep
                                  ? 'bg-blue-600/40 border-blue-500/50'
                                  : 'bg-slate-800/30 border-slate-700/50'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              {i < currentStep ? (
                                <CheckCircle2 size={20} className="text-emerald-400" />
                              ) : i === currentStep ? (
                                <Zap size={20} className="text-blue-400" />
                              ) : (
                                <Circle size={20} className="text-slate-500" />
                              )}
                              <span className="font-bold">{s}</span>
                            </div>
                          </button>
                        ))}

                        {currentStep > 0 && currentStep < steps.length && (
                          <div className="space-y-4 mt-6 pt-6 border-t border-slate-700/50">
                            <h4 className="font-bold">📸 Upload Proof</h4>
                            {proofUploaded ? (
                              <div className="p-3 rounded-lg bg-emerald-600/20 border border-emerald-500/50 text-emerald-300 font-bold">
                                ✅ Uploaded
                              </div>
                            ) : (
                              <button
                                onClick={() => setProofUploaded(true)}
                                className="w-full p-3 rounded-lg border-2 border-dashed border-slate-700/50"
                              >
                                <Upload size={20} className="mx-auto mb-1" />
                                Click to Upload
                              </button>
                            )}

                            {(currentStep === 2 || currentStep === 3) && (
                              <div className="grid grid-cols-2 gap-2">
                                <input
                                  type="number"
                                  placeholder="Score"
                                  value={quizScore}
                                  onChange={e => setQuizScore(e.target.value)}
                                  className="px-3 py-2 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white text-sm"
                                />
                                <input
                                  type="number"
                                  placeholder="Full Marks"
                                  value={fullMarks}
                                  onChange={e => setFullMarks(e.target.value)}
                                  className="px-3 py-2 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white text-sm"
                                />
                              </div>
                            )}

                            <button
                              onClick={() => {
                                if (proofUploaded) {
                                  setCurrentStep(currentStep + 1);
                                  setProofUploaded(false);
                                }
                              }}
                              disabled={!proofUploaded}
                              className={`w-full px-4 py-3 rounded-lg font-bold ${
                                proofUploaded
                                  ? 'bg-emerald-600 hover:bg-emerald-700'
                                  : 'bg-slate-700/30 opacity-50'
                              }`}
                            >
                              ✅ Next Step
                            </button>
                          </div>
                        )}
                      </div>
                    )}

                    {/* TASKS FOR SELECTED DATE */}
                    {tasksForSelectedDay.length > 0 && (
                      <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 space-y-4">
                        <h3 className="text-lg font-bold">📋 Tasks for {currentDayFull} ({tasksForSelectedDay.length})</h3>
                        {tasksForSelectedDay.map(task => (
                          <div key={task.id} className="p-4 bg-slate-800/30 border border-slate-700/50 rounded-lg space-y-2">
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="font-bold">{task.title}</div>
                                <div className="text-xs text-slate-400">
                                  {task.hours}h • {task.priority}
                                </div>
                              </div>
                              <button
                                onClick={() => deleteTask(selectedSubject, task.id)}
                                className="p-2 hover:bg-red-600/20 rounded"
                              >
                                <Trash size={16} className="text-red-400" />
                              </button>
                            </div>
                            {task.notes && (
                              <div className="text-xs text-slate-300 bg-slate-900/30 p-2 rounded">
                                {task.notes}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </motion.div>
            )}

            {page === 'schedule' && (
              <motion.div key="schedule" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 pb-8">
                <h2 className="text-3xl font-bold">📅 Exam Schedule</h2>

                <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 space-y-4">
                  <h3 className="text-lg font-bold">➕ Add Exam</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <input
                      type="text"
                      placeholder="Exam name"
                      value={examName}
                      onChange={e => setExamName(e.target.value)}
                      className="px-4 py-2 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500"
                    />
                    <input
                      type="date"
                      value={examDate}
                      onChange={e => setExamDate(e.target.value)}
                      className="px-4 py-2 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white"
                    />
                    <button
                      onClick={addExam}
                      className="px-6 py-2 bg-blue-600 rounded-lg font-bold hover:bg-blue-700"
                    >
                      Add
                    </button>
                  </div>
                </div>

                {exams.length > 0 && (
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 space-y-4">
                    <h3 className="text-lg font-bold">📋 Exams</h3>
                    {exams.map(exam => (
                      <div key={exam.id} className="p-4 bg-slate-800/30 border border-slate-700/50 rounded-lg flex justify-between items-center">
                        <div>
                          <div className="font-bold">{exam.name}</div>
                          <div className="text-sm text-slate-400">{exam.date}</div>
                          <div className="text-lg font-bold text-orange-400">⏳ {examCountdowns[exam.id] || 0} days</div>
                        </div>
                        <button
                          onClick={() => deleteExam(exam.id)}
                          className="p-2 hover:bg-red-600/20 rounded"
                        >
                          <Trash size={20} className="text-red-400" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {page === 'analytics' && (
              <motion.div key="analytics" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 pb-8">
                <h2 className="text-3xl font-bold">📊 Analytics</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { label: 'Subjects', value: subjects.length, color: 'from-blue-500' },
                    { label: 'Total Tasks', value: Object.values(allTasks).reduce((s, a) => s + a.length, 0), color: 'from-purple-500' },
                    { label: 'Exams', value: exams.length, color: 'from-orange-500' },
                  ].map((stat, i) => (
                    <div key={i} className={`p-6 rounded-xl bg-gradient-to-br ${stat.color}/20 border border-slate-700/50`}>
                      <div className="text-slate-400 text-sm mb-2">{stat.label}</div>
                      <div className="text-3xl font-bold">{stat.value}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
