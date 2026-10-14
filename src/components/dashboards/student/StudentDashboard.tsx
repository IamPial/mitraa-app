'use client';

import React, { useState } from 'react';
import { useMitraa } from '@/context/MitraaContext';
import { mockTimetable, mockLearningGaps, mockDownloads } from '@/data/mockData';
import { Button, Card, CardBody, Chip, Progress } from '@heroui/react';
import {
  Home,
  Calendar,
  FileText,
  BookOpen,
  GraduationCap,
  TrendingUp,
  Bell,
  MessageSquare,
  Users,
  Download,
  Settings,
  Clock,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
  Send,
  Upload,
  Play,
  FileCheck,
  ChevronRight,
  Award,
} from 'lucide-react';

export const StudentDashboard: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    currentUser,
    assignments,
    exams,
    notices,
    doubts,
    ptmList,
    askDoubt,
    setActiveWorkflowModal,
    submitAssignment,
  } = useMitraa();

  // Local state for doubt question input
  const [doubtText, setDoubtText] = useState('');
  const [doubtTeacher, setDoubtTeacher] = useState('Prof. Ananya Sen');
  const [doubtSubject, setDoubtSubject] = useState('Mathematics');

  // Local state for assignment submission in assignments view
  const [selectedAsgId, setSelectedAsgId] = useState<string>(assignments[1]?.id || 'asg_102');
  const [answerDraft, setAnswerDraft] = useState('');

  const activeAssignment = assignments.find((a) => a.id === selectedAsgId) || assignments[0];

  return (
    <div className="space-y-6">
      {/* 1. Home (Overview) */}
      {activeTab === 'home' && (
        <div className="space-y-6">
          {/* Welcome Banner */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-900/60 via-purple-900/40 to-slate-900 border border-indigo-500/30 p-6 shadow-xl">
            <div className="relative z-10 max-w-2xl">
              <Chip size="sm" variant="flat" color="primary" className="text-xs font-bold text-indigo-400 mb-2">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
                  Student Academic Hub • {currentUser.className} ({currentUser.section})
                </span>
              </Chip>
              <h1 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
                Welcome back, {currentUser.name}! 👋
              </h1>
              <p className="mt-2 text-xs lg:text-sm text-slate-300 leading-relaxed">
                You have 1 assignment due this Friday, 1 upcoming mid-semester exam scheduled, and your attendance rate is in the top 5% at <strong>94.2%</strong>.
              </p>
              <div className="mt-4 flex flex-wrap gap-2.5">
                <Button
                  color="primary"
                  className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30"
                  startContent={<GraduationCap className="w-4 h-4" />}
                  onPress={() => setActiveWorkflowModal('practice_pod')}
                >
                  Launch PracticePod
                </Button>
                <Button
                  variant="bordered"
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border-slate-700"
                  startContent={<FileText className="w-4 h-4 text-emerald-400" />}
                  onPress={() => setActiveWorkflowModal('assignment')}
                >
                  Test Assignment Flow
                </Button>
              </div>
            </div>
            <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none translate-x-8 translate-y-8">
              <GraduationCap className="w-80 h-80 text-indigo-400" />
            </div>
          </div>

          {/* Quick Stat Cards with HeroUI Card */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
            <Card className="bg-slate-900 border border-slate-800 p-3 rounded-xl shadow-none">
              <CardBody className="p-1">
                <span className="text-[11px] font-semibold text-slate-400 block">Attendance Rate</span>
                <span className="text-2xl font-bold text-emerald-400 mt-1 block">94.2%</span>
                <span className="text-[10px] text-slate-500">Above 85% requirement</span>
              </CardBody>
            </Card>
            <Card className="bg-slate-900 border border-slate-800 p-3 rounded-xl shadow-none">
              <CardBody className="p-1">
                <span className="text-[11px] font-semibold text-slate-400 block">Pending Assignments</span>
                <span className="text-2xl font-bold text-amber-400 mt-1 block">1 Task</span>
                <span className="text-[10px] text-slate-500">Due in 4 days</span>
              </CardBody>
            </Card>
            <Card className="bg-slate-900 border border-slate-800 p-3 rounded-xl shadow-none">
              <CardBody className="p-1">
                <span className="text-[11px] font-semibold text-slate-400 block">Current GPA</span>
                <span className="text-2xl font-bold text-indigo-400 mt-1 block">3.85 / 4.0</span>
                <span className="text-[10px] text-slate-500">Grade A+ (Distinction)</span>
              </CardBody>
            </Card>
            <Card className="bg-slate-900 border border-slate-800 p-3 rounded-xl shadow-none">
              <CardBody className="p-1">
                <span className="text-[11px] font-semibold text-slate-400 block">Next Timetable Class</span>
                <span className="text-sm font-bold text-white mt-1 block truncate">Mathematics (Hall 301)</span>
                <span className="text-[10px] text-indigo-300">Starts at 09:00 AM</span>
              </CardBody>
            </Card>
          </div>

          {/* Timetable Highlights & Pending Assignments */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Today's Schedule */}
            <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-indigo-400" />
                  <span>Today's Class Schedule (Monday)</span>
                </h3>
                <button
                  onClick={() => setActiveTab('timetable')}
                  className="text-xs text-indigo-400 hover:underline"
                >
                  Full Weekly Grid →
                </button>
              </div>
              <div className="space-y-2.5">
                {mockTimetable.slice(0, 4).map((slot) => (
                  <div
                    key={slot.id}
                    className="p-3 rounded-lg bg-slate-850 border border-slate-800 flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-semibold text-slate-200">{slot.subject}</div>
                      <div className="text-[10px] text-slate-400">{slot.teacher} • {slot.room}</div>
                    </div>
                    <span className="font-mono text-indigo-300 bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-800/40">
                      {slot.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Assignments Queue */}
            <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald-400" />
                  <span>Active Assignments</span>
                </h3>
                <button
                  onClick={() => setActiveTab('assignments')}
                  className="text-xs text-indigo-400 hover:underline"
                >
                  View All ({assignments.length}) →
                </button>
              </div>
              <div className="space-y-2.5">
                {assignments.map((asg) => (
                  <div
                    key={asg.id}
                    className="p-3 rounded-lg bg-slate-850 border border-slate-800 flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-semibold text-slate-200">{asg.title}</div>
                      <div className="text-[10px] text-slate-400">
                        {asg.subject} • Due: {asg.dueDate} • {asg.totalMarks} Marks
                      </div>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        asg.status === 'graded'
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : asg.status === 'submitted'
                          ? 'bg-indigo-500/20 text-indigo-300'
                          : 'bg-amber-500/20 text-amber-300'
                      }`}
                    >
                      {asg.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. My Classes & Timetable */}
      {activeTab === 'timetable' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white">My Classes & Timetable</h2>
              <p className="text-xs text-slate-400">Section Grade 10 - Section B • Academic Term 2026-27</p>
            </div>
            <span className="text-xs font-mono text-indigo-400 bg-indigo-950/60 px-2.5 py-1 rounded-lg border border-indigo-800/50">
              Current Period: 10:00 - 10:50 AM
            </span>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950 text-slate-400 text-[11px] font-semibold">
                  <th className="p-3.5">Day</th>
                  <th className="p-3.5">09:00 - 09:50 AM</th>
                  <th className="p-3.5">10:00 - 10:50 AM</th>
                  <th className="p-3.5">11:10 - 12:00 PM</th>
                  <th className="p-3.5">01:00 - 01:50 PM</th>
                  <th className="p-3.5">02:00 - 03:00 PM</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850 text-slate-300">
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day) => (
                  <tr key={day} className="hover:bg-slate-850/40 transition">
                    <td className="p-3.5 font-bold text-white bg-slate-950/30">{day}</td>
                    <td className="p-3.5">
                      <div className="font-semibold text-indigo-300">Mathematics</div>
                      <div className="text-[10px] text-slate-500">Hall 301 • Prof. Sen</div>
                    </td>
                    <td className="p-3.5">
                      <div className="font-semibold text-sky-300">Physics</div>
                      <div className="text-[10px] text-slate-500">Physics Lab 2 • Dr. Varma</div>
                    </td>
                    <td className="p-3.5">
                      <div className="font-semibold text-emerald-300">English Literature</div>
                      <div className="text-[10px] text-slate-500">Room 12 • Ms. Davis</div>
                    </td>
                    <td className="p-3.5">
                      <div className="font-semibold text-amber-300">Chemistry</div>
                      <div className="text-[10px] text-slate-500">Chem Lab 1 • Dr. Nair</div>
                    </td>
                    <td className="p-3.5">
                      <div className="font-semibold text-purple-300">PracticePod / Doubt Clinic</div>
                      <div className="text-[10px] text-slate-500">Self-Directed Learning</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. Assignments */}
      {activeTab === 'assignments' && (
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white">Assignments Center</h2>
              <p className="text-xs text-slate-400">View tasks, hand in submissions, inspect feedback & resubmit</p>
            </div>
            <button
              onClick={() => setActiveWorkflowModal('assignment')}
              className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition"
            >
              Simulate 5-Step Workflow →
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Assignment List */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Assigned Tasks</span>
              {assignments.map((asg) => (
                <div
                  key={asg.id}
                  onClick={() => setSelectedAsgId(asg.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition ${
                    selectedAsgId === asg.id
                      ? 'bg-slate-800 border-indigo-500 shadow-md'
                      : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold text-indigo-400">{asg.subject}</span>
                    <span
                      className={`text-[9px] uppercase font-bold px-1.5 py-0.2 rounded ${
                        asg.status === 'graded'
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : asg.status === 'submitted'
                          ? 'bg-indigo-500/20 text-indigo-300'
                          : 'bg-amber-500/20 text-amber-300'
                      }`}
                    >
                      {asg.status}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white line-clamp-1">{asg.title}</h4>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2">
                    <span>Due: {asg.dueDate}</span>
                    <span>{asg.totalMarks} Marks</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Assignment Details & Submission Area */}
            <div className="lg:col-span-2 p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-start justify-between border-b border-slate-800 pb-3">
                <div>
                  <span className="text-[10px] font-bold uppercase text-indigo-400">{activeAssignment.subject}</span>
                  <h3 className="text-base font-bold text-white mt-0.5">{activeAssignment.title}</h3>
                  <span className="text-xs text-slate-400">Class: {activeAssignment.className} • Due Date: {activeAssignment.dueDate}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 block">Total Weightage</span>
                  <span className="text-lg font-bold text-white">{activeAssignment.totalMarks} Marks</span>
                </div>
              </div>

              <div>
                <span className="text-xs font-bold text-slate-300 block mb-1">Task Instructions:</span>
                <p className="text-xs text-slate-400 leading-relaxed bg-slate-950 p-3 rounded-lg border border-slate-850">
                  {activeAssignment.description}
                </p>
              </div>

              {/* Feedback if graded */}
              {activeAssignment.feedback && (
                <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-800/40 space-y-1">
                  <div className="flex items-center justify-between text-xs font-bold text-emerald-400">
                    <span>Teacher Evaluation Feedback:</span>
                    <span>Score: {activeAssignment.obtainedMarks} / {activeAssignment.totalMarks}</span>
                  </div>
                  <p className="text-xs text-emerald-200/90">{activeAssignment.feedback}</p>
                </div>
              )}

              {/* Hand in work or Resubmit */}
              <div className="pt-2 border-t border-slate-800 space-y-3">
                <label className="block text-xs font-bold text-white">Your Submission Response:</label>
                <textarea
                  rows={3}
                  value={answerDraft}
                  onChange={(e) => setAnswerDraft(e.target.value)}
                  placeholder={
                    activeAssignment.studentAnswer
                      ? `Previously submitted: "${activeAssignment.studentAnswer}"`
                      : "Type your derivation, solution notes, or file links here..."
                  }
                  className="w-full p-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs"
                />
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-slate-500">
                    {activeAssignment.allowResubmission ? '✓ Resubmission permitted for this task' : 'Single attempt only'}
                  </span>
                  <button
                    onClick={() => {
                      if (!answerDraft.trim()) {
                        alert('Please type your solution draft before submitting.');
                        return;
                      }
                      submitAssignment(activeAssignment.id, answerDraft);
                      alert('Work handed in successfully! Teacher notified.');
                      setAnswerDraft('');
                    }}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 transition"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>{activeAssignment.status === 'submitted' ? 'Resubmit Work' : 'Hand In Assignment'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. Examinations */}
      {activeTab === 'examinations' && (
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white">Examinations Portal</h2>
              <p className="text-xs text-slate-400">Exam schedules, timed attempt screens, and verified released scorecards</p>
            </div>
            <button
              onClick={() => setActiveWorkflowModal('exam')}
              className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold transition"
            >
              Launch Exam Workflow Simulator →
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Scheduled Exams */}
            <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-sm font-bold text-white">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>Upcoming Scheduled Exams</span>
              </div>
              {exams.map((ex) => (
                <div key={ex.id} className="p-4 rounded-xl bg-slate-850 border border-slate-800 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-white text-xs">{ex.title}</h4>
                      <span className="text-[10px] text-slate-400">{ex.subject} • {ex.className}</span>
                    </div>
                    <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                      {ex.durationMinutes} Mins
                    </span>
                  </div>
                  <div className="text-xs text-slate-300 flex justify-between">
                    <span>Date & Window:</span>
                    <span className="font-semibold text-white">{ex.date}</span>
                  </div>
                  <button
                    onClick={() => setActiveWorkflowModal('exam')}
                    className="w-full py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>Enter Exam Session (Simulate)</span>
                  </button>
                </div>
              ))}
            </div>

            {/* Released Results */}
            <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-sm font-bold text-white">
                <Award className="w-4 h-4 text-emerald-400" />
                <span>Published Official Results</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-850 border border-slate-800 space-y-3">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-white text-xs">Unit Test 2: Optics & Wave Motion</h4>
                    <span className="text-[10px] text-slate-400">Physics • Verified by Principal Office</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-black text-emerald-400">91 / 100</span>
                    <span className="block text-[9px] text-emerald-300 font-bold uppercase">Rank #3</span>
                  </div>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900 text-xs text-slate-300 space-y-1">
                  <div className="flex justify-between">
                    <span>Grade Category:</span>
                    <span className="text-emerald-400 font-bold">A+ (Exemplary)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Authorized Date:</span>
                    <span>September 28, 2026</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. PracticePod */}
      {activeTab === 'practice_pod' && (
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white">PracticePod Engine</h2>
              <p className="text-xs text-slate-400">Generate targeted self-study practice, solve items & track mastery</p>
            </div>
            <button
              onClick={() => setActiveWorkflowModal('practice_pod')}
              className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold transition"
            >
              Open Interactive PracticePod Simulator →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-xs text-slate-400">Total Practice Sets Completed</span>
              <span className="text-2xl font-bold text-white mt-1 block">24 Sets</span>
              <span className="text-[10px] text-emerald-400">+3 this week</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-xs text-slate-400">Average Solution Accuracy</span>
              <span className="text-2xl font-bold text-indigo-400 mt-1 block">88.4%</span>
              <span className="text-[10px] text-indigo-300">Top 10 percentile</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-xs text-slate-400">Current Study Streak</span>
              <span className="text-2xl font-bold text-amber-400 mt-1 block">7 Days</span>
              <span className="text-[10px] text-amber-300">Consistent learner badge</span>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-white text-sm">Need focused preparation on a specific chapter?</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                PracticePod will formulate an adaptive 5-question diagnostics drill tailored to your recent learning gaps.
              </p>
            </div>
            <button
              onClick={() => setActiveWorkflowModal('practice_pod')}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-semibold text-xs shadow-md transition"
            >
              Generate Paper Now
            </button>
          </div>
        </div>
      )}

      {/* 6. My Performance */}
      {activeTab === 'performance' && (
        <div className="space-y-5">
          <div>
            <h2 className="text-lg font-bold text-white">My Academic Performance & Analytics</h2>
            <p className="text-xs text-slate-400">Progress curves, subject analytics, and identified learning gaps</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Subject Mastery Overview */}
            <div className="lg:col-span-2 p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Subject Mastery Index</h3>
              <div className="space-y-3">
                {[
                  { name: 'Mathematics (Calculus & Functions)', score: 94, color: 'primary' as const },
                  { name: 'Physics (Optics & Electromagnetism)', score: 91, color: 'secondary' as const },
                  { name: 'Chemistry (Organic & Periodic)', score: 86, color: 'warning' as const },
                  { name: 'English Literature & Composition', score: 92, color: 'success' as const },
                  { name: 'Computer Science (Python & Data Structures)', score: 98, color: 'secondary' as const },
                ].map((s, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-medium text-slate-200">{s.name}</span>
                      <span className="font-bold text-white">{s.score}%</span>
                    </div>
                    <Progress
                      size="sm"
                      value={s.score}
                      color={s.color}
                      aria-label={s.name}
                      className="max-w-full"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Learning Gaps & Action Items */}
            <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Targeted Learning Gaps</h3>
              <div className="space-y-3">
                {mockLearningGaps.map((gap, gIdx) => (
                  <div key={gIdx} className="p-3 rounded-lg bg-slate-850 border border-slate-800 space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="font-bold text-indigo-400">{gap.subject}</span>
                      <span className="text-[10px] text-amber-400 font-bold">{gap.priority} Priority</span>
                    </div>
                    <div className="font-medium text-slate-200">{gap.topic}</div>
                    <p className="text-[11px] text-slate-400">{gap.recommendedAction}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 7. Notices */}
      {activeTab === 'notices' && (
        <div className="space-y-5">
          <div>
            <h2 className="text-lg font-bold text-white">Notice Board</h2>
            <p className="text-xs text-slate-400">Institutional circulars and academic announcements</p>
          </div>

          <div className="space-y-3">
            {notices.map((n) => (
              <div key={n.id} className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">
                    {n.category}
                  </span>
                  <span className="text-xs text-slate-500">{n.date} • {n.publishedBy}</span>
                </div>
                <h3 className="text-sm font-bold text-white">{n.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{n.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 8. Messages (Academic Doubt) */}
      {activeTab === 'messages' && (
        <div className="space-y-5">
          <div>
            <h2 className="text-lg font-bold text-white">Messages & Academic Doubts</h2>
            <p className="text-xs text-slate-400">Direct academic consultation with your subject faculty</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Ask New Doubt */}
            <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Raise New Academic Query</h3>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Subject</label>
                <select
                  value={doubtSubject}
                  onChange={(e) => setDoubtSubject(e.target.value)}
                  className="w-full p-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs"
                >
                  <option>Mathematics</option>
                  <option>Physics</option>
                  <option>Chemistry</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Select Faculty</label>
                <select
                  value={doubtTeacher}
                  onChange={(e) => setDoubtTeacher(e.target.value)}
                  className="w-full p-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs"
                >
                  <option>Prof. Ananya Sen</option>
                  <option>Dr. R. K. Varma</option>
                  <option>Dr. S. Nair</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Your Question / Doubt</label>
                <textarea
                  rows={4}
                  value={doubtText}
                  onChange={(e) => setDoubtText(e.target.value)}
                  placeholder="Ask a specific conceptual or numerical question..."
                  className="w-full p-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs"
                />
              </div>
              <button
                onClick={() => {
                  if (!doubtText.trim()) return;
                  askDoubt(doubtTeacher, doubtSubject, doubtText);
                  setDoubtText('');
                  alert('Academic query submitted to faculty.');
                }}
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Query</span>
              </button>
            </div>

            {/* Conversation Threads */}
            <div className="lg:col-span-2 space-y-3">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Your Consultation Threads</h3>
              {doubts.map((d) => (
                <div key={d.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-indigo-400">{d.subject} • To: {d.teacherName}</span>
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                        d.status === 'Resolved' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-300'
                      }`}
                    >
                      {d.status}
                    </span>
                  </div>
                  <p className="text-xs text-white font-medium">"{d.query}"</p>
                  {d.reply && (
                    <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-1">
                      <span className="text-[10px] text-slate-500 block">Faculty Response:</span>
                      <p>{d.reply}</p>
                    </div>
                  )}
                  <span className="text-[10px] text-slate-500 block">{d.timestamp}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 9. PTM / Meetings (View) */}
      {activeTab === 'ptm' && (
        <div className="space-y-5">
          <div>
            <h2 className="text-lg font-bold text-white">Parent-Teacher Meetings (View-Only)</h2>
            <p className="text-xs text-slate-400">Scheduled consultations and recorded action plans between your parents and mentors</p>
          </div>

          <div className="space-y-3">
            {ptmList.map((ptm) => (
              <div key={ptm.id} className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-sm font-bold text-white">{ptm.subject}</h4>
                    <span className="text-xs text-slate-400">Teacher: {ptm.teacherName} • Parent: {ptm.parentName}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-xs font-semibold">
                    {ptm.status}
                  </span>
                </div>
                <div className="text-xs text-slate-300 flex items-center gap-4">
                  <span>Slot: {ptm.dateTime}</span>
                  <span>Mode: {ptm.mode}</span>
                </div>
                {ptm.actionPlan && (
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs">
                    <span className="font-bold text-emerald-400 block mb-0.5">Agreed Student Action Plan:</span>
                    <p className="text-slate-300">{ptm.actionPlan}</p>
                    <span className="text-[10px] text-slate-500 block mt-1">Review Date: {ptm.actionPlanDueDate}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 10. Downloads (Study Material) */}
      {activeTab === 'downloads' && (
        <div className="space-y-5">
          <div>
            <h2 className="text-lg font-bold text-white">Study Material Downloads</h2>
            <p className="text-xs text-slate-400">NCERT exemplars, revision formula sheets & lab manuals</p>
          </div>

          <div className="space-y-3">
            {mockDownloads.map((dl) => (
              <div
                key={dl.id}
                className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    <Download className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">{dl.title}</h4>
                    <span className="text-[11px] text-slate-400">{dl.subject} • {dl.fileType} • {dl.fileSize}</span>
                  </div>
                </div>
                <button
                  onClick={() => alert(`Starting download for ${dl.title}`)}
                  className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium transition"
                >
                  Download File
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 11. My Profile & Settings */}
      {activeTab === 'profile' && (
        <div className="space-y-5 max-w-2xl">
          <div>
            <h2 className="text-lg font-bold text-white">Student Profile & Settings</h2>
            <p className="text-xs text-slate-400">Account preferences, security details and institutional credentials</p>
          </div>

          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center gap-4">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-indigo-500/40"
              />
              <div>
                <h3 className="text-base font-bold text-white">{currentUser.name}</h3>
                <span className="text-xs text-slate-400 block">{currentUser.email}</span>
                <span className="text-xs font-mono text-indigo-400">Roll: {currentUser.admissionNo}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-800 text-xs">
              <div>
                <span className="text-slate-400 block">Current Class:</span>
                <span className="font-semibold text-white">{currentUser.className} - {currentUser.section}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Campus:</span>
                <span className="font-semibold text-white">{currentUser.campusName}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
