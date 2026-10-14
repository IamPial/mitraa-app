'use client';

import React, { useState } from 'react';
import { useMitraa } from '@/context/MitraaContext';
import { mockLearningGaps } from '@/data/mockData';
import { Button, Card, CardContent, Chip } from '@heroui/react';
import {
  Home,
  BookOpen,
  Users,
  ClipboardCheck,
  CheckCircle,
  TrendingUp,
  MessageSquare,
  AlertTriangle,
  Bell,
  Layers,
  FileCheck,
  Settings,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Send,
  Plus,
} from 'lucide-react';

export const PrincipalDashboard: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    currentUser,
    exams,
    grievances,
    notices,
    publishNotice,
    setActiveWorkflowModal,
    publishExamResults,
  } = useMitraa();

  // New notice broadcast form state
  const [noticeTitle, setNoticeTitle] = useState('');
  const [noticeBody, setNoticeBody] = useState('');
  const [noticeCategory, setNoticeCategory] = useState<'Academic' | 'Exam' | 'General' | 'Event' | 'Emergency'>('Academic');

  // Approvals queue
  const [approvalsQueue, setApprovalsQueue] = useState([
    { id: 'APP-901', type: 'Staff Casual Leave', submitter: 'Prof. Ananya Sen', date: 'Oct 22', status: 'Pending' },
    { id: 'APP-902', type: 'Exam Paper Moderation', submitter: 'Science Department HOD', date: 'Oct 15', status: 'Pending' },
    { id: 'APP-903', type: 'Annual Robotics Symposium Budget', submitter: 'Student Affairs', date: 'Oct 28', status: 'Pending' },
  ]);

  const handleApprove = (id: string) => {
    setApprovalsQueue((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: 'Approved' } : a))
    );
    alert('Authorized with digital cryptographic principal token.');
  };

  return (
    <div className="space-y-6">
      {/* 1. Home (Academic Overview) */}
      {activeTab === 'home' && (
        <div className="space-y-6">
          <div className="rounded-2xl bg-gradient-to-r from-orange-950/80 via-amber-950/40 to-slate-900 border border-orange-500/30 p-6 shadow-xl">
            <Chip size="sm" variant="soft" color="warning" className="text-xs font-bold text-orange-400 mb-2">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-orange-300" />
                Office of the Principal • {currentUser.campusName}
              </span>
            </Chip>
            <h1 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
              Academic & Operational Leadership Console
            </h1>
            <p className="mt-2 text-xs lg:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Curriculum progression is on schedule at <strong>78.4%</strong> against target. There are 2 pending exam paper approvals, 1 transport grievance nearing SLA deadline, and 3 staff requisitions awaiting sign-off.
            </p>
            <div className="mt-4 flex flex-wrap gap-2.5">
              <Button
                variant="primary"
                className="bg-orange-600 hover:bg-orange-500 text-white text-xs font-semibold shadow-lg shadow-orange-600/30"
                onPress={() => setActiveWorkflowModal('grievance')}
              >
                <AlertTriangle className="w-4 h-4 mr-1.5" />
                Grievance SLA Console
              </Button>
              <Button
                variant="outline"
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border-slate-700"
                onPress={() => setActiveTab('approvals')}
              >
                <FileCheck className="w-4 h-4 mr-1.5 text-orange-400" />
                Pending Approvals ({approvalsQueue.filter((a) => a.status === 'Pending').length})
              </Button>
            </div>
          </div>

          {/* Institutional KPI Cards with HeroUI Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
            <Card className="bg-slate-900 border border-slate-800 p-3 rounded-xl shadow-none">
              <CardContent className="p-1">
                <span className="text-[11px] font-semibold text-slate-400 block">Overall Student Attendance</span>
                <span className="text-2xl font-bold text-emerald-400 mt-1 block">94.8%</span>
                <span className="text-[10px] text-slate-500">1,420 Active Enrollees</span>
              </CardContent>
            </Card>
            <Card className="bg-slate-900 border border-slate-800 p-3 rounded-xl shadow-none">
              <CardContent className="p-1">
                <span className="text-[11px] font-semibold text-slate-400 block">Curriculum Completion</span>
                <span className="text-2xl font-bold text-amber-400 mt-1 block">78.4%</span>
                <span className="text-[10px] text-amber-300">Plan vs Actual (+2.1%)</span>
              </CardContent>
            </Card>
            <Card className="bg-slate-900 border border-slate-800 p-3 rounded-xl shadow-none">
              <CardContent className="p-1">
                <span className="text-[11px] font-semibold text-slate-400 block">Faculty Task Index</span>
                <span className="text-2xl font-bold text-indigo-400 mt-1 block">96.2%</span>
                <span className="text-[10px] text-slate-500">Timely syllabus delivery</span>
              </CardContent>
            </Card>
            <Card className="bg-slate-900 border border-slate-800 p-3 rounded-xl shadow-none">
              <CardContent className="p-1">
                <span className="text-[11px] font-semibold text-slate-400 block">Open Grievance Tickets</span>
                <span className="text-2xl font-bold text-rose-400 mt-1 block">1 Escalation</span>
                <span className="text-[10px] text-slate-500">18 hrs remaining</span>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* 2. Academic Coverage */}
      {activeTab === 'academic_coverage' && (
        <div className="space-y-5">
          <h2 className="text-lg font-bold text-white">Academic Coverage & Planned vs Actual Delivery</h2>
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
            {[
              { subject: 'Grade 10 Mathematics', plan: 80, actual: 82 },
              { subject: 'Grade 10 Physics', plan: 75, actual: 74 },
              { subject: 'Grade 10 Chemistry', plan: 78, actual: 79 },
              { subject: 'Grade 10 English Literature', plan: 85, actual: 85 },
            ].map((item, idx) => (
              <div key={idx} className="space-y-1 text-xs">
                <div className="flex justify-between font-semibold text-white">
                  <span>{item.subject}</span>
                  <span className="text-amber-400">Actual: {item.actual}% (Target: {item.plan}%)</span>
                </div>
                <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden flex">
                  <div className="bg-amber-500 h-full rounded-full" style={{ width: `${item.actual}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Staff Management */}
      {activeTab === 'staff_management' && (
        <div className="space-y-5">
          <h2 className="text-lg font-bold text-white">Staff Management & Workload Balancing</h2>
          <div className="rounded-xl border border-slate-800 bg-slate-900 overflow-hidden text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950 text-slate-400 text-[11px]">
                  <th className="p-3.5">Teacher Name</th>
                  <th className="p-3.5">Department</th>
                  <th className="p-3.5">Weekly Periods</th>
                  <th className="p-3.5">Task Completion</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850 text-slate-200">
                <tr className="hover:bg-slate-850/40">
                  <td className="p-3.5 font-bold text-white">Prof. Ananya Sen</td>
                  <td className="p-3.5">Mathematics</td>
                  <td className="p-3.5 font-mono">22 hrs/wk</td>
                  <td className="p-3.5 text-emerald-400 font-bold">98% (Exemplary)</td>
                </tr>
                <tr className="hover:bg-slate-850/40">
                  <td className="p-3.5 font-bold text-white">Dr. R. K. Varma</td>
                  <td className="p-3.5">Physics</td>
                  <td className="p-3.5 font-mono">20 hrs/wk</td>
                  <td className="p-3.5 text-emerald-400 font-bold">94%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 4. Attendance Overview */}
      {activeTab === 'attendance_overview' && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white">Institutional Attendance Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 block">Classrooms Composite</span>
              <span className="text-2xl font-bold text-white mt-1 block">94.8%</span>
              <span className="text-emerald-400">All 32 sections compliant</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 block">Teaching Faculty Presence</span>
              <span className="text-2xl font-bold text-indigo-400 mt-1 block">97.2%</span>
              <span className="text-slate-400">91 of 94 present</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 block">Support Staff Presence</span>
              <span className="text-2xl font-bold text-emerald-400 mt-1 block">95.0%</span>
              <span className="text-slate-400">Maintenance & transport active</span>
            </div>
          </div>
        </div>
      )}

      {/* 5. Examinations */}
      {activeTab === 'examinations' && (
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">Exam Readiness & Result Release Authority</h2>
            <button
              onClick={() => setActiveWorkflowModal('exam')}
              className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-md"
            >
              Open Exam Release Workflow →
            </button>
          </div>
          <div className="space-y-3">
            {exams.map((ex) => (
              <div key={ex.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center text-xs">
                <div>
                  <h4 className="font-bold text-white text-sm">{ex.title}</h4>
                  <span className="text-slate-400">{ex.subject} • {ex.className}</span>
                </div>
                <div className="text-right">
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-semibold block mb-1">
                    {ex.resultsReleased ? 'RELEASED' : 'AWAITING APPROVAL'}
                  </span>
                  {!ex.resultsReleased && (
                    <button
                      onClick={() => {
                        publishExamResults(ex.id);
                        alert('Exam results authorized and unlocked for students and parents!');
                      }}
                      className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded text-xs"
                    >
                      Authorize Publication
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. Student Performance */}
      {activeTab === 'student_performance' && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white">Cohort Performance & Identified Learning Gaps</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {mockLearningGaps.map((gap, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1">
                <span className="font-bold text-amber-400">{gap.priority} Priority Gap</span>
                <div className="font-semibold text-white">{gap.subject}: {gap.topic}</div>
                <p className="text-slate-400">{gap.recommendedAction}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 7. Parent Engagement */}
      {activeTab === 'parent_engagement' && (
        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3 text-xs">
          <h2 className="text-base font-bold text-white">Parent Engagement & PTM Attendance Trends</h2>
          <p className="text-slate-300">Term 1 PTM Attendance achieved <strong>91.4%</strong> parent participation.</p>
          <div className="text-emerald-400 font-semibold">Unresolved parent inquiries: 0 critical</div>
        </div>
      )}

      {/* 8. Grievances / Complaints */}
      {activeTab === 'grievances' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">Grievances, Complaints & Escalations</h2>
            <button
              onClick={() => setActiveWorkflowModal('grievance')}
              className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold"
            >
              Simulate Grievance Flow →
            </button>
          </div>
          <div className="space-y-3">
            {grievances.map((grv) => (
              <div key={grv.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-rose-400 font-bold">{grv.id}</span>
                  <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold">{grv.status}</span>
                </div>
                <h4 className="font-bold text-white text-sm">{grv.title}</h4>
                <div className="text-slate-400">Assigned: {grv.assignedOwner} • SLA: {grv.slaHoursRemaining} hrs</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 9. Notices */}
      {activeTab === 'notices' && (
        <div className="space-y-5">
          <h2 className="text-lg font-bold text-white">Create & Broadcast Institutional Notice</h2>
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3 max-w-xl">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Notice Title</label>
              <input
                type="text"
                value={noticeTitle}
                onChange={(e) => setNoticeTitle(e.target.value)}
                placeholder="Notice headline..."
                className="w-full p-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Category</label>
              <select
                value={noticeCategory}
                onChange={(e) => setNoticeCategory(e.target.value as any)}
                className="w-full p-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs"
              >
                <option value="Academic">Academic</option>
                <option value="Exam">Exam</option>
                <option value="General">General</option>
                <option value="Emergency">Emergency Alert</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Content</label>
              <textarea
                rows={3}
                value={noticeBody}
                onChange={(e) => setNoticeBody(e.target.value)}
                placeholder="Full announcement body..."
                className="w-full p-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs"
              />
            </div>
            <button
              onClick={() => {
                if (!noticeTitle.trim()) return;
                publishNotice(noticeTitle, noticeBody, noticeCategory, ['All']);
                alert('Notice published and broadcasted to students, teachers, and parents!');
                setNoticeTitle('');
                setNoticeBody('');
              }}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Broadcast Notice</span>
            </button>
          </div>
        </div>
      )}

      {/* 10. Reports & Dashboards */}
      {activeTab === 'reports' && (
        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3 text-xs">
          <h2 className="text-base font-bold text-white">Composite Academic & Operational Reports</h2>
          <p className="text-slate-300">
            Comprehensive PDF and analytics exports covering faculty workloads, attendance variance, and board exam mock distributions.
          </p>
        </div>
      )}

      {/* 11. Approvals */}
      {activeTab === 'approvals' && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white">Institutional Approvals Queue</h2>
          <div className="space-y-3">
            {approvalsQueue.map((app) => (
              <div key={app.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center text-xs">
                <div>
                  <h4 className="font-bold text-white text-sm">{app.type}</h4>
                  <span className="text-slate-400">By {app.submitter} • Date: {app.date}</span>
                </div>
                <div>
                  {app.status === 'Approved' ? (
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Approved</span>
                    </span>
                  ) : (
                    <button
                      onClick={() => handleApprove(app.id)}
                      className="px-3.5 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs"
                    >
                      Authorize Sign-Off
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 12. Profile */}
      {activeTab === 'profile' && (
        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 max-w-xl space-y-3 text-xs">
          <h2 className="text-base font-bold text-white">Principal Administrative Credentials</h2>
          <p className="text-slate-300">Dr. Vikramaditya Rao • principal.north@apex.mitraa.edu</p>
          <div className="text-slate-400">Jurisdiction: Apex North Bengaluru Campus</div>
          <div className="text-slate-400">Access Tier: Full Institutional Administrator</div>
        </div>
      )}
    </div>
  );
};
