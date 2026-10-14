'use client';

import React, { useState } from 'react';
import { useMitraa } from '@/context/MitraaContext';
import { mockTimetable, mockLearningGaps } from '@/data/mockData';
import { Button, Card, CardContent, Chip } from '@heroui/react';
import {
  Home,
  Calendar,
  FileText,
  BookOpen,
  ClipboardCheck,
  Database,
  HelpCircle,
  Users,
  Bell,
  TrendingUp,
  Settings,
  Plus,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  ArrowRight,
  Filter,
} from 'lucide-react';

export const TeacherDashboard: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    currentUser,
    assignments,
    exams,
    doubts,
    ptmList,
    notices,
    setActiveWorkflowModal,
    replyDoubt,
    gradeAssignment,
  } = useMitraa();

  // Attendance roster state for Section 10-B
  const [attendanceDate, setAttendanceDate] = useState('2026-10-14');
  const [roster, setRoster] = useState([
    { id: '1', roll: '21', name: 'Aarav Sharma', status: 'Present' },
    { id: '2', roll: '22', name: 'Divya Nair', status: 'Present' },
    { id: '3', roll: '23', name: 'Karan Mehra', status: 'Absent' },
    { id: '4', roll: '24', name: 'Pooja Iyer', status: 'Present' },
    { id: '5', roll: '25', name: 'Rohan Gupta', status: 'Present' },
  ]);

  const toggleStatus = (id: string, newStatus: string) => {
    setRoster((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );
  };

  // Doubt reply state
  const [replyText, setReplyText] = useState('');
  const [activeDoubtId, setActiveDoubtId] = useState<string | null>(doubts[1]?.id || null);

  // Intervention plan form state
  const [interventionStudent, setInterventionStudent] = useState('Aarav Sharma');
  const [interventionTopic, setInterventionTopic] = useState('Partial Fraction Decomposition');
  const [interventionNote, setInterventionNote] = useState('Conduct 2 remedial practice drills in PracticePod and evaluate step proofs.');

  return (
    <div className="space-y-6">
      {/* 1. Home (Overview) */}
      {activeTab === 'home' && (
        <div className="space-y-6">
          <div className="rounded-2xl bg-gradient-to-r from-purple-950/70 via-slate-900 to-indigo-950/60 border border-purple-500/30 p-6 shadow-xl">
            <Chip size="sm" variant="soft" color="accent" className="text-xs font-bold text-purple-400 mb-2">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-purple-300" />
                Faculty Command Console • {currentUser.name}
              </span>
            </Chip>
            <h1 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
              Good morning, Professor! 📚
            </h1>
            <p className="mt-2 text-xs lg:text-sm text-slate-300 max-w-2xl leading-relaxed">
              You have 3 classes scheduled today, 2 assignment submissions awaiting evaluation in Grade 10B, and 1 pending parent consultation request.
            </p>
            <div className="mt-4 flex flex-wrap gap-2.5">
              <Button
                variant="primary"
                className="bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-lg shadow-purple-600/30"
                onPress={() => setActiveWorkflowModal('assignment')}
              >
                <Plus className="w-4 h-4 mr-1.5" />
                Create & Schedule Assignment
              </Button>
              <Button
                variant="outline"
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border-slate-700"
                onPress={() => setActiveTab('attendance')}
              >
                <ClipboardCheck className="w-4 h-4 mr-1.5 text-purple-400" />
                Mark Attendance
              </Button>
            </div>
          </div>

          {/* Quick Metrics with HeroUI Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
            <Card className="bg-slate-900 border border-slate-800 p-3 rounded-xl shadow-none">
              <CardContent className="p-1">
                <span className="text-[11px] font-semibold text-slate-400 block">Classes Assigned</span>
                <span className="text-2xl font-bold text-white mt-1 block">4 Cohorts</span>
                <span className="text-[10px] text-purple-400">Grades 9 & 10 Mathematics</span>
              </CardContent>
            </Card>
            <Card className="bg-slate-900 border border-slate-800 p-3 rounded-xl shadow-none">
              <CardContent className="p-1">
                <span className="text-[11px] font-semibold text-slate-400 block">Pending Evaluations</span>
                <span className="text-2xl font-bold text-amber-400 mt-1 block">2 Papers</span>
                <span className="text-[10px] text-slate-500">Assignment queue</span>
              </CardContent>
            </Card>
            <Card className="bg-slate-900 border border-slate-800 p-3 rounded-xl shadow-none">
              <CardContent className="p-1">
                <span className="text-[11px] font-semibold text-slate-400 block">Average Cohort Score</span>
                <span className="text-2xl font-bold text-emerald-400 mt-1 block">84.6%</span>
                <span className="text-[10px] text-emerald-400">+2.4% over Term 1</span>
              </CardContent>
            </Card>
            <Card className="bg-slate-900 border border-slate-800 p-3 rounded-xl shadow-none">
              <CardContent className="p-1">
                <span className="text-[11px] font-semibold text-slate-400 block">Unresolved Doubts</span>
                <span className="text-2xl font-bold text-rose-400 mt-1 block">1 Open</span>
                <span className="text-[10px] text-slate-500">Student inquiry</span>
              </CardContent>
            </Card>
          </div>

          {/* Submissions Queue Preview */}
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-purple-400" />
                <span>Recent Submissions Pending Evaluation</span>
              </h3>
              <button
                onClick={() => setActiveWorkflowModal('assignment')}
                className="text-xs text-indigo-400 hover:underline"
              >
                Launch Evaluation Console →
              </button>
            </div>
            <div className="space-y-2.5">
              {assignments.map((asg) => (
                <div
                  key={asg.id}
                  className="p-3.5 rounded-xl bg-slate-850 border border-slate-800 flex items-center justify-between text-xs"
                >
                  <div>
                    <h4 className="font-semibold text-white">{asg.title}</h4>
                    <span className="text-[11px] text-slate-400">{asg.className} • Max Marks: {asg.totalMarks}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-300">Status: <strong className="text-indigo-400 uppercase">{asg.status}</strong></span>
                    <button
                      onClick={() => setActiveWorkflowModal('assignment')}
                      className="px-3 py-1 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-medium text-xs transition"
                    >
                      Evaluate
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. My Classes & Timetable */}
      {activeTab === 'timetable' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white">Assigned Teaching Schedule</h2>
              <p className="text-xs text-slate-400">Weekly teaching timetable across sections</p>
            </div>
          </div>
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
            {mockTimetable.slice(0, 5).map((slot) => (
              <div key={slot.id} className="p-3.5 rounded-lg bg-slate-850 border border-slate-800 flex justify-between items-center text-xs">
                <div>
                  <span className="font-bold text-white">{slot.subject}</span>
                  <div className="text-[11px] text-slate-400">{slot.room} • {slot.day}</div>
                </div>
                <span className="font-mono text-purple-300 bg-purple-950/60 px-2.5 py-1 rounded border border-purple-800/40">
                  {slot.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Attendance */}
      {activeTab === 'attendance' && (
        <div className="space-y-5">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h2 className="text-lg font-bold text-white">Daily Attendance Register</h2>
              <p className="text-xs text-slate-400">Section: Grade 10 - Section B</p>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="date"
                value={attendanceDate}
                onChange={(e) => setAttendanceDate(e.target.value)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs"
              />
              <button
                onClick={() => alert(`Attendance for ${attendanceDate} saved to central register!`)}
                className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold"
              >
                Save Register
              </button>
            </div>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 overflow-hidden">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950 text-slate-400 text-[11px] font-semibold">
                  <th className="p-3.5">Roll No</th>
                  <th className="p-3.5">Student Name</th>
                  <th className="p-3.5">Current Status</th>
                  <th className="p-3.5 text-right">Attendance Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850 text-slate-200">
                {roster.map((student) => (
                  <tr key={student.id} className="hover:bg-slate-850/40 transition">
                    <td className="p-3.5 font-mono text-slate-400">#{student.roll}</td>
                    <td className="p-3.5 font-semibold text-white">{student.name}</td>
                    <td className="p-3.5">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          student.status === 'Present'
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : student.status === 'Absent'
                            ? 'bg-rose-500/20 text-rose-400'
                            : 'bg-amber-500/20 text-amber-300'
                        }`}
                      >
                        {student.status}
                      </span>
                    </td>
                    <td className="p-3.5 text-right space-x-1.5">
                      <button
                        onClick={() => toggleStatus(student.id, 'Present')}
                        className={`px-2.5 py-1 rounded text-xs font-medium transition ${
                          student.status === 'Present' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        Present
                      </button>
                      <button
                        onClick={() => toggleStatus(student.id, 'Absent')}
                        className={`px-2.5 py-1 rounded text-xs font-medium transition ${
                          student.status === 'Absent' ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        Absent
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 4. Assignment Engine */}
      {activeTab === 'assignments' && (
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white">Assignment Engine</h2>
              <p className="text-xs text-slate-400">Create, schedule, track submissions, evaluate, and provide feedback</p>
            </div>
            <button
              onClick={() => setActiveWorkflowModal('assignment')}
              className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>New Assignment Flow</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {assignments.map((asg) => (
              <div key={asg.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-white text-sm">{asg.title}</h3>
                    <span className="text-[11px] text-slate-400">{asg.subject} • {asg.className}</span>
                  </div>
                  <span className="text-xs font-bold text-purple-400">{asg.totalMarks} Marks</span>
                </div>
                <p className="text-xs text-slate-300">{asg.description}</p>
                <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
                  <span className="text-slate-400">Due: {asg.dueDate}</span>
                  <button
                    onClick={() => setActiveWorkflowModal('assignment')}
                    className="text-purple-400 hover:underline font-semibold"
                  >
                    Manage Submissions →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. Question Bank */}
      {activeTab === 'question_bank' && (
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white">Faculty Question Bank</h2>
              <p className="text-xs text-slate-400">Curated question repository tagged by syllabus taxonomy, Bloom's level, and marks</p>
            </div>
            <button
              onClick={() => alert('Question builder dialog loaded with taxonomy tagging.')}
              className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Question</span>
            </button>
          </div>

          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="p-3.5 rounded-lg bg-slate-850 border border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="font-bold text-white">Item #MATH-Q109: Differential Rate Equations</span>
                <span className="text-indigo-400 font-mono">10 Marks • Level: Analysis</span>
              </div>
              <p className="text-slate-300">
                A tank contains 500 liters of brine in which 20 kg of salt are dissolved. Pure water enters at 5 L/min. Formulate differential model.
              </p>
              <div className="flex gap-2 text-[10px] text-slate-400">
                <span className="bg-slate-800 px-2 py-0.5 rounded">CBSE Grade 10 Higher</span>
                <span className="bg-slate-800 px-2 py-0.5 rounded">Calculus Section C</span>
                <span className="text-emerald-400">✓ Peer Reviewed</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. Examinations */}
      {activeTab === 'examinations' && (
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white">Teacher Exam Management</h2>
              <p className="text-xs text-slate-400">Create internal tests, manage time locks, and inspect analytical distributions</p>
            </div>
            <button
              onClick={() => setActiveWorkflowModal('exam')}
              className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-md"
            >
              Simulate Exam Publishing & Approval →
            </button>
          </div>

          <div className="space-y-3">
            {exams.map((ex) => (
              <div key={ex.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center text-xs">
                <div>
                  <h4 className="font-bold text-white text-sm">{ex.title}</h4>
                  <span className="text-slate-400">{ex.subject} • {ex.className} • Duration: {ex.durationMinutes} Mins</span>
                </div>
                <div className="text-right">
                  <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-semibold block mb-1">
                    {ex.status.toUpperCase()}
                  </span>
                  <button
                    onClick={() => setActiveWorkflowModal('exam')}
                    className="text-indigo-400 hover:underline"
                  >
                    Open Marking Queue
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 7. Student Support & Learning Gaps */}
      {activeTab === 'student_support' && (
        <div className="space-y-5">
          <div>
            <h2 className="text-lg font-bold text-white">Student Support & Learning Gap Intervention</h2>
            <p className="text-xs text-slate-400">Spot learning gaps and assign structured support plans</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Gap List */}
            <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Identified Student Learning Gaps</h3>
              {mockLearningGaps.map((gap, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-slate-850 border border-slate-800 text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="font-bold text-white">{gap.subject} - {gap.topic}</span>
                    <span className="text-amber-400 font-bold">{gap.masteryPercentage}% Mastery</span>
                  </div>
                  <p className="text-slate-400 text-[11px]">{gap.recommendedAction}</p>
                </div>
              ))}
            </div>

            {/* Intervention Form */}
            <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Create Targeted Intervention Plan</h3>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Student</label>
                <input
                  type="text"
                  value={interventionStudent}
                  onChange={(e) => setInterventionStudent(e.target.value)}
                  className="w-full p-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Topic</label>
                <input
                  type="text"
                  value={interventionTopic}
                  onChange={(e) => setInterventionTopic(e.target.value)}
                  className="w-full p-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Action Plan & Goal</label>
                <textarea
                  rows={3}
                  value={interventionNote}
                  onChange={(e) => setInterventionNote(e.target.value)}
                  className="w-full p-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs"
                />
              </div>
              <button
                onClick={() => alert(`Intervention plan deployed for ${interventionStudent}!`)}
                className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold"
              >
                Deploy Intervention Plan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 8. Parent Communication */}
      {activeTab === 'parent_communication' && (
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white">Parent Communication & PTMs</h2>
              <p className="text-xs text-slate-400">Respond to parent queries, discuss progress, and sign off action plans</p>
            </div>
            <button
              onClick={() => setActiveWorkflowModal('communication')}
              className="px-3 py-1.5 rounded-lg bg-pink-600 hover:bg-pink-500 text-white text-xs font-semibold"
            >
              Simulate PTM Lifecycle →
            </button>
          </div>

          <div className="space-y-3">
            {ptmList.map((ptm) => (
              <div key={ptm.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-white">Parent: {ptm.parentName} (Ward: {ptm.studentName})</span>
                  <span className="text-pink-400 font-semibold">{ptm.status}</span>
                </div>
                <div className="text-slate-300">Subject: {ptm.subject} • {ptm.dateTime} • {ptm.mode}</div>
                {ptm.actionPlan && (
                  <div className="p-2.5 bg-slate-950 rounded border border-slate-800 text-slate-200">
                    <strong>Agreed Action Plan:</strong> {ptm.actionPlan}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 9. Notices */}
      {activeTab === 'notices' && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white">Staff & Academic Circulars</h2>
          <div className="space-y-3">
            {notices.map((n) => (
              <div key={n.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1 text-xs">
                <span className="font-bold text-purple-400">{n.category}</span>
                <h4 className="font-bold text-white">{n.title}</h4>
                <p className="text-slate-300">{n.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 10. Reports & Analytics */}
      {activeTab === 'reports' && (
        <div className="space-y-5">
          <h2 className="text-lg font-bold text-white">Subject Reports & Analytics</h2>
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
            <span className="text-xs font-bold text-slate-300 uppercase">Class Average: 84.6%</span>
            <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
              <div className="bg-purple-500 h-full w-[85%]" />
            </div>
            <p className="text-xs text-slate-400">
              Grade 10 Calculus cohort demonstrated a 98% completion rate on differential equation exercises.
            </p>
          </div>
        </div>
      )}

      {/* 11. Profile */}
      {activeTab === 'profile' && (
        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 max-w-xl space-y-3 text-xs">
          <h2 className="text-base font-bold text-white">Faculty Credentials</h2>
          <p className="text-slate-300">{currentUser.name} • {currentUser.email}</p>
          <div className="text-slate-400">Department: Mathematics & Computational Sciences</div>
          <div className="text-slate-400">Staff ID: {currentUser.employeeId}</div>
        </div>
      )}
    </div>
  );
};
