'use client';

import React, { useState } from 'react';
import { useMitraa } from '@/context/MitraaContext';
import { mockChildren } from '@/data/mockData';
import { Button, Card, CardBody, Chip } from '@heroui/react';
import {
  Home,
  Users,
  ClipboardCheck,
  FileText,
  BookOpen,
  GraduationCap,
  TrendingUp,
  MessageSquare,
  Bell,
  CreditCard,
  FileQuestion,
  Settings,
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles,
  ChevronDown,
  DollarSign,
  AlertCircle,
  Send,
} from 'lucide-react';

export const ParentDashboard: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    activeChild,
    setActiveChild,
    assignments,
    exams,
    notices,
    fees,
    ptmList,
    acknowledgeNotice,
    payFee,
    setActiveWorkflowModal,
  } = useMitraa();

  // Leave request state
  const [leaveReason, setLeaveReason] = useState('Attending family medical appointment');
  const [leaveDate, setLeaveDate] = useState('2026-10-20');
  const [leaveDays, setLeaveDays] = useState(1);
  const [submittedRequests, setSubmittedRequests] = useState([
    { id: 'REQ-101', type: 'Leave of Absence', reason: 'Annual sports competition training', dates: 'Oct 02 - Oct 03', status: 'Approved' }
  ]);

  const handleLeaveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newReq = {
      id: `REQ-${Math.floor(100 + Math.random() * 900)}`,
      type: 'Leave of Absence',
      reason: leaveReason,
      dates: `${leaveDate} (${leaveDays} day)`,
      status: 'Under Review',
    };
    setSubmittedRequests([newReq, ...submittedRequests]);
    alert('Leave request forwarded to Class Mentor & Principal Office.');
  };

  return (
    <div className="space-y-6">
      {/* Active Child Context Switcher Banner with HeroUI */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-pink-950/60 via-slate-900 to-purple-950/40 border border-pink-500/30 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img
            src={activeChild.avatar}
            alt={activeChild.name}
            className="w-12 h-12 rounded-xl object-cover border-2 border-pink-400"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white">{activeChild.name}</span>
              <Chip size="sm" variant="flat" color="danger" className="text-[10px] font-semibold h-5">
                Active Ward
              </Chip>
            </div>
            <div className="text-xs text-slate-300 mt-0.5">
              {activeChild.grade} • Sec {activeChild.section} • Roll #{activeChild.rollNo} • Attendance: {activeChild.attendanceRate}%
            </div>
          </div>
        </div>

        {/* Switch Child Selector with HeroUI Buttons */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Switch Ward Context:</span>
          {mockChildren.map((ch) => (
            <Button
              key={ch.id}
              size="sm"
              variant={activeChild.id === ch.id ? 'solid' : 'bordered'}
              color={activeChild.id === ch.id ? 'danger' : 'default'}
              className={activeChild.id === ch.id ? 'bg-pink-600 text-white font-semibold' : 'text-slate-300 border-slate-700 hover:bg-slate-800'}
              onPress={() => setActiveChild(ch)}
            >
              {ch.name.split(' ')[0]} ({ch.grade.split(' ')[1]})
            </Button>
          ))}
        </div>
      </div>

      {/* 1. Home (Child Overview) with HeroUI Cards */}
      {activeTab === 'home' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
            <Card className="bg-slate-900 border border-slate-800 p-3 rounded-xl shadow-none">
              <CardBody className="p-1">
                <span className="text-[11px] font-semibold text-slate-400 block">Attendance Standing</span>
                <span className="text-2xl font-bold text-emerald-400 mt-1 block">{activeChild.attendanceRate}%</span>
                <span className="text-[10px] text-slate-500">Regular attendance record</span>
              </CardBody>
            </Card>
            <Card className="bg-slate-900 border border-slate-800 p-3 rounded-xl shadow-none">
              <CardBody className="p-1">
                <span className="text-[11px] font-semibold text-slate-400 block">Academic GPA</span>
                <span className="text-2xl font-bold text-indigo-400 mt-1 block">{activeChild.overallGpa.split(' ')[0]}</span>
                <span className="text-[10px] text-indigo-300">Grade Distinction</span>
              </CardBody>
            </Card>
            <Card className="bg-slate-900 border border-slate-800 p-3 rounded-xl shadow-none">
              <CardBody className="p-1">
                <span className="text-[11px] font-semibold text-slate-400 block">Pending Assignments</span>
                <span className="text-2xl font-bold text-amber-400 mt-1 block">{activeChild.pendingAssignments} Due</span>
                <span className="text-[10px] text-slate-500">Check homework track</span>
              </CardBody>
            </Card>
            <Card className="bg-slate-900 border border-slate-800 p-3 rounded-xl shadow-none">
              <CardBody className="p-1">
                <span className="text-[11px] font-semibold text-slate-400 block">Quarterly Term 2 Fee</span>
                <span className="text-xl font-bold text-rose-400 mt-1 block">Due Nov 10</span>
                <span className="text-[10px] text-slate-500">₹42,500 payable</span>
              </CardBody>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Homework & Evaluation */}
            <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-pink-400" />
                  <span>{activeChild.name}'s Assignments</span>
                </h3>
                <button onClick={() => setActiveTab('assignments')} className="text-xs text-pink-400 hover:underline">
                  Full Details →
                </button>
              </div>
              {assignments.map((asg) => (
                <div key={asg.id} className="p-3 rounded-lg bg-slate-850 border border-slate-800 flex justify-between text-xs">
                  <div>
                    <div className="font-semibold text-white">{asg.title}</div>
                    <div className="text-[10px] text-slate-400">{asg.subject} • Due: {asg.dueDate}</div>
                  </div>
                  <span className="font-semibold text-emerald-400 uppercase">{asg.status}</span>
                </div>
              ))}
            </div>

            {/* Upcoming Consultations */}
            <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Users className="w-4 h-4 text-indigo-400" />
                  <span>Parent-Teacher Consultations</span>
                </h3>
                <button onClick={() => setActiveTab('ptm')} className="text-xs text-indigo-400 hover:underline">
                  Book New Slot →
                </button>
              </div>
              {ptmList.map((ptm) => (
                <div key={ptm.id} className="p-3 rounded-lg bg-slate-850 border border-slate-800 text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="font-bold text-white">{ptm.subject}</span>
                    <span className="text-pink-400 font-semibold">{ptm.status}</span>
                  </div>
                  <div className="text-[11px] text-slate-400">{ptm.teacherName} • {ptm.dateTime}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. My Child(ren) */}
      {activeTab === 'my_children' && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white">Registered Wards & Profiles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockChildren.map((ch) => (
              <div
                key={ch.id}
                onClick={() => setActiveChild(ch)}
                className={`p-5 rounded-xl border cursor-pointer transition ${
                  activeChild.id === ch.id ? 'bg-slate-800 border-pink-500 shadow-lg' : 'bg-slate-900 border-slate-800'
                }`}
              >
                <div className="flex items-center gap-4">
                  <img src={ch.avatar} alt={ch.name} className="w-14 h-14 rounded-xl object-cover" />
                  <div>
                    <h3 className="font-bold text-white text-base">{ch.name}</h3>
                    <div className="text-xs text-slate-400">{ch.grade} - Section {ch.section} • Roll #{ch.rollNo}</div>
                    <div className="text-xs font-semibold text-emerald-400 mt-1">Attendance: {ch.attendanceRate}% • GPA: {ch.overallGpa}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Attendance */}
      {activeTab === 'attendance' && (
        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
          <h2 className="text-lg font-bold text-white">{activeChild.name}'s Attendance Record</h2>
          <p className="text-xs text-slate-400">Total Classes Conducted: 88 | Present: 83 | Excused Leaves: 4 | Unexcused: 1</p>
          <div className="p-4 rounded-xl bg-slate-850 border border-slate-800 flex items-center justify-between">
            <span className="text-sm font-semibold text-white">Composite Term Standing:</span>
            <span className="text-xl font-bold text-emerald-400">{activeChild.attendanceRate}% (Healthy)</span>
          </div>
        </div>
      )}

      {/* 4. Assignments */}
      {activeTab === 'assignments' && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white">Ward Assignments & Submissions</h2>
          <div className="space-y-3">
            {assignments.map((asg) => (
              <div key={asg.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-white text-sm">{asg.title}</h4>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-semibold uppercase">{asg.status}</span>
                </div>
                <div className="text-slate-400">{asg.subject} • Due: {asg.dueDate}</div>
                {asg.feedback && (
                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200">
                    <strong>Teacher Feedback:</strong> "{asg.feedback}" ({asg.obtainedMarks}/{asg.totalMarks} Marks)
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. Examinations */}
      {activeTab === 'examinations' && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white">Exam Schedules & Official Results</h2>
          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-2">
              <span className="font-bold text-indigo-400">Term 1 Official Scorecard</span>
              <div className="flex justify-between text-white font-semibold">
                <span>Unit Test 2: Physics Optics & Wave Motion</span>
                <span className="text-emerald-400 text-base">91 / 100 (A+)</span>
              </div>
              <p className="text-slate-400 text-[11px]">Authorized by Principal Office • Class Rank #3</p>
            </div>
          </div>
        </div>
      )}

      {/* 6. PracticePod */}
      {activeTab === 'practice_pod' && (
        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
          <h2 className="text-lg font-bold text-white">PracticePod Ward Activity</h2>
          <p className="text-xs text-slate-400">
            Per institutional rules, PracticePod self-directed attempts are displayed to parents only when shared by the student or mentor.
          </p>
          <div className="p-4 rounded-xl bg-slate-850 text-xs text-slate-200">
            ✓ Aarav has shared 3 calculus review drills (Average accuracy: 88%).
          </div>
        </div>
      )}

      {/* 7. Progress & Reports */}
      {activeTab === 'progress_reports' && (
        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
          <h2 className="text-lg font-bold text-white">Progress & Comprehensive Term Report</h2>
          <div className="p-4 rounded-xl bg-slate-850 text-xs space-y-2">
            <span className="font-bold text-white">Faculty Term Remark:</span>
            <p className="text-slate-300">
              "Aarav displays extraordinary diligence in computational subjects. Recommended for state STEM talent search."
            </p>
            <div className="pt-2 text-indigo-400 font-semibold">— Prof. Ananya Sen (Class Mentor)</div>
          </div>
        </div>
      )}

      {/* 8. Communication */}
      {activeTab === 'communication' && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white">Direct Faculty Messaging</h2>
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
            <label className="block text-xs font-medium text-slate-300">Message to Class Mentor</label>
            <textarea
              rows={3}
              placeholder="Inquire regarding academic progress or bus logistics..."
              className="w-full p-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs"
            />
            <button
              onClick={() => alert('Message delivered to Prof. Ananya Sen.')}
              className="px-4 py-2 bg-pink-600 hover:bg-pink-500 text-white text-xs font-semibold rounded-lg"
            >
              Send Message
            </button>
          </div>
        </div>
      )}

      {/* 9. PTM / Meetings */}
      {activeTab === 'ptm' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">Book Parent-Teacher Consultation (PTM)</h2>
            <button
              onClick={() => setActiveWorkflowModal('communication')}
              className="px-3 py-1.5 rounded-lg bg-pink-600 hover:bg-pink-500 text-white text-xs font-semibold"
            >
              Simulate PTM Flow →
            </button>
          </div>
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
            {ptmList.map((ptm) => (
              <div key={ptm.id} className="p-3 bg-slate-850 rounded-lg text-xs space-y-1">
                <div className="flex justify-between font-bold text-white">
                  <span>{ptm.teacherName} ({ptm.subject})</span>
                  <span className="text-pink-400">{ptm.status}</span>
                </div>
                <div className="text-slate-400">{ptm.dateTime} • {ptm.mode}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 10. Notices (with Acknowledge feature) */}
      {activeTab === 'notices' && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white">School Circulars & Mandatory Acknowledgements</h2>
          <div className="space-y-3">
            {notices.map((n) => (
              <div key={n.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-pink-400">{n.category}</span>
                  <span className="text-slate-500">{n.date}</span>
                </div>
                <h4 className="font-bold text-white text-sm">{n.title}</h4>
                <p className="text-slate-300">{n.content}</p>
                <div className="pt-2 flex justify-end">
                  {n.acknowledgedByParent ? (
                    <span className="text-emerald-400 font-semibold flex items-center gap-1 text-xs">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Acknowledged by Parent</span>
                    </span>
                  ) : (
                    <button
                      onClick={() => {
                        acknowledgeNotice(n.id);
                        alert('Notice acknowledged.');
                      }}
                      className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs"
                    >
                      Acknowledge Notice
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 11. Fees & Payments */}
      {activeTab === 'fees' && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white">Fee Invoices & Online Payment Gateway</h2>
          <div className="space-y-3">
            {fees.map((fee) => (
              <div key={fee.id} className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3 text-xs">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-white text-sm">{fee.term}</h4>
                    <span className="text-slate-400">Due Date: {fee.dueDate}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-bold text-white">₹{fee.amount.toLocaleString()}</span>
                    <span
                      className={`block font-semibold ${
                        fee.status === 'Paid' ? 'text-emerald-400' : 'text-amber-400'
                      }`}
                    >
                      Status: {fee.status}
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                  {fee.breakdown.map((b, idx) => (
                    <div key={idx} className="flex justify-between text-slate-400">
                      <span>{b.item}</span>
                      <span>₹{b.cost.toLocaleString()}</span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end pt-1">
                  {fee.status === 'Paid' ? (
                    <span className="text-slate-400 font-mono">Receipt: {fee.receiptNo}</span>
                  ) : (
                    <button
                      onClick={() => {
                        payFee(fee.id);
                        alert(`Online payment of ₹${fee.amount} processed successfully via Razorpay/Card!`);
                      }}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg shadow-md"
                    >
                      Pay Online Now
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 12. Requests (Leave / Special Request) */}
      {activeTab === 'requests' && (
        <div className="space-y-5">
          <h2 className="text-lg font-bold text-white">Leave & Special Requests</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Submit Request Form */}
            <form onSubmit={handleLeaveSubmit} className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
              <h3 className="text-xs font-bold text-slate-300 uppercase">Apply for Leave for {activeChild.name}</h3>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Date</label>
                <input
                  type="date"
                  value={leaveDate}
                  onChange={(e) => setLeaveDate(e.target.value)}
                  className="w-full p-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Reason for Leave</label>
                <textarea
                  rows={3}
                  value={leaveReason}
                  onChange={(e) => setLeaveReason(e.target.value)}
                  className="w-full p-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold"
              >
                Submit Request
              </button>
            </form>

            {/* Past Requests History */}
            <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3 text-xs">
              <h3 className="text-xs font-bold text-slate-300 uppercase">Submitted Request History</h3>
              {submittedRequests.map((req) => (
                <div key={req.id} className="p-3 rounded-lg bg-slate-850 border border-slate-800 space-y-1">
                  <div className="flex justify-between font-bold text-white">
                    <span>{req.type} ({req.dates})</span>
                    <span className="text-emerald-400">{req.status}</span>
                  </div>
                  <p className="text-slate-400">{req.reason}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 13. Profile */}
      {activeTab === 'profile' && (
        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 max-w-xl space-y-3 text-xs">
          <h2 className="text-base font-bold text-white">Guardian Contact Record</h2>
          <p className="text-slate-300">Rajesh & Sunita Sharma • rajesh.sharma@gmail.com</p>
          <div className="text-slate-400">Primary Phone: +91 98450 12345 (Verified)</div>
          <div className="text-slate-400">Authorized Wards: Aarav Sharma (Grade 10), Ananya Sharma (Grade 7)</div>
        </div>
      )}
    </div>
  );
};
