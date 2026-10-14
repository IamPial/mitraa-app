'use client';

import React, { useState } from 'react';
import { useMitraa } from '@/context/MitraaContext';
import {
  X,
  CheckCircle2,
  ArrowRight,
  Upload,
  FileText,
  User,
  GraduationCap,
  Sparkles,
  AlertCircle,
  Clock,
} from 'lucide-react';

export const AssignmentWorkflowModal: React.FC = () => {
  const { activeWorkflowModal, setActiveWorkflowModal, assignments, submitAssignment, gradeAssignment } = useMitraa();
  const [activeStep, setActiveStep] = useState<number>(1);

  // Workflow local state
  const [title, setTitle] = useState('Applications of Differential Calculus in Thermodynamics');
  const [subject, setSubject] = useState('Mathematics');
  const [totalMarks, setTotalMarks] = useState(30);
  const [studentSubmission, setStudentSubmission] = useState('Derived equation for isothermal expansion using ∫ PdV where P = nRT/V. Plotted PV diagram with boundary limits.');
  const [teacherScore, setTeacherScore] = useState(29);
  const [teacherFeedback, setTeacherFeedback] = useState('Exceptional mathematical rigor! Graph axes correctly labelled with thermodynamic units.');

  if (activeWorkflowModal !== 'assignment') return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-3xl w-full p-6 shadow-2xl relative my-8">
        <button
          onClick={() => setActiveWorkflowModal(null)}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Workflow Header */}
        <div className="flex items-center gap-3 mb-1">
          <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider font-mono">
                Workflow 4.1 (Interactive Simulator)
              </span>
              <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full">
                Teacher → Student → Parent
              </span>
            </div>
            <h2 className="text-xl font-bold text-white">Full Assignment Lifecycle</h2>
          </div>
        </div>

        {/* Steps Breadcrumb Indicator */}
        <div className="grid grid-cols-5 gap-2 my-5 text-center">
          {[
            { step: 1, label: '1. Create' },
            { step: 2, label: '2. Schedule' },
            { step: 3, label: '3. Submit' },
            { step: 4, label: '4. Evaluate' },
            { step: 5, label: '5. Parent View' },
          ].map((s) => (
            <button
              key={s.step}
              onClick={() => setActiveStep(s.step)}
              className={`p-2 rounded-xl border text-xs font-semibold transition ${
                activeStep === s.step
                  ? 'bg-indigo-600 text-white border-indigo-500 shadow-md'
                  : activeStep > s.step
                  ? 'bg-slate-800 text-emerald-400 border-emerald-500/30'
                  : 'bg-slate-900 text-slate-500 border-slate-800'
              }`}
            >
              <span>{s.label}</span>
            </button>
          ))}
        </div>

        {/* Step 1: Teacher Creates Assignment */}
        {activeStep === 1 && (
          <div className="space-y-4 bg-slate-850 p-5 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-purple-400 uppercase">Role: Teacher / Staff</span>
              <span className="text-xs text-slate-400">Step 1: Assignment Setup</span>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Assignment Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Subject</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Total Marks</label>
                <input
                  type="number"
                  value={totalMarks}
                  onChange={(e) => setTotalMarks(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs"
                />
              </div>
            </div>
            <button
              onClick={() => setActiveStep(2)}
              className="mt-2 w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition"
            >
              <span>Confirm & Proceed to Schedule</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Step 2: Schedule & Publish */}
        {activeStep === 2 && (
          <div className="space-y-4 bg-slate-850 p-5 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-purple-400 uppercase">Role: Teacher / Staff</span>
              <span className="text-xs text-slate-400">Step 2: Scheduling & Access Window</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">Target Class:</span>
                <span className="font-semibold text-white">Grade 10 - Section B</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Publish Mode:</span>
                <span className="text-emerald-400 font-semibold">Immediate Live Release</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Due Date:</span>
                <span className="text-indigo-300 font-semibold">October 19, 2026 (11:59 PM)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Resubmission Rule:</span>
                <span className="text-slate-200">Allowed once before deadline</span>
              </div>
            </div>
            <button
              onClick={() => setActiveStep(3)}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition"
            >
              <span>Publish Assignment to Students</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Step 3: Student Views & Submits */}
        {activeStep === 3 && (
          <div className="space-y-4 bg-slate-850 p-5 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400 uppercase">Role: Student (Aarav Sharma)</span>
              <span className="text-xs text-slate-400">Step 3: Hand in Work</span>
            </div>
            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
              <h4 className="text-xs font-bold text-white">{title}</h4>
              <p className="text-[11px] text-slate-400 mt-1">Submit your derivations and graph analysis for evaluation.</p>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Student Answer / Response</label>
              <textarea
                rows={3}
                value={studentSubmission}
                onChange={(e) => setStudentSubmission(e.target.value)}
                className="w-full p-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs"
              />
            </div>
            <div className="p-3 rounded-lg border border-dashed border-slate-700 text-center text-xs text-slate-400">
              <Upload className="w-5 h-5 mx-auto text-indigo-400 mb-1" />
              <span>calculus_thermo_solution.pdf (1.8 MB attached)</span>
            </div>
            <button
              onClick={() => {
                submitAssignment('asg_101', studentSubmission);
                setActiveStep(4);
              }}
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition"
            >
              <span>Submit Work for Evaluation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Step 4: Teacher Evaluates & Gives Feedback */}
        {activeStep === 4 && (
          <div className="space-y-4 bg-slate-850 p-5 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-purple-400 uppercase">Role: Teacher / Staff</span>
              <span className="text-xs text-slate-400">Step 4: Grading Console</span>
            </div>
            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs">
              <span className="text-slate-400 block mb-1">Student Submission Received:</span>
              <p className="text-slate-200 italic font-mono bg-slate-950 p-2 rounded">
                "{studentSubmission}"
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Award Marks (out of {totalMarks})</label>
                <input
                  type="number"
                  max={totalMarks}
                  value={teacherScore}
                  onChange={(e) => setTeacherScore(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Resubmission Permitted?</label>
                <div className="p-2 rounded-lg bg-slate-800 border border-slate-700 text-emerald-400 text-xs font-semibold">
                  Not required (Distinction)
                </div>
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Teacher Feedback Note</label>
              <textarea
                rows={2}
                value={teacherFeedback}
                onChange={(e) => setTeacherFeedback(e.target.value)}
                className="w-full p-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs"
              />
            </div>
            <button
              onClick={() => {
                gradeAssignment('asg_101', teacherScore, teacherFeedback);
                setActiveStep(5);
              }}
              className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition"
            >
              <span>Save Evaluation & Notify Parent</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Step 5: Parent View */}
        {activeStep === 5 && (
          <div className="space-y-4 bg-slate-850 p-5 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-pink-400 uppercase">Role: Parent / Guardian</span>
              <span className="text-xs text-slate-400">Step 5: Ward Performance & Feedback View</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-white text-sm">{title}</h4>
                  <span className="text-xs text-slate-400">Child: Aarav Sharma (Grade 10B)</span>
                </div>
                <div className="text-right">
                  <span className="text-xl font-bold text-emerald-400">{teacherScore} / {totalMarks}</span>
                  <span className="block text-[10px] text-emerald-400/80 font-semibold">Grade A+ (Exemplary)</span>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-[11px] font-bold text-slate-400 block mb-0.5">Faculty Feedback:</span>
                <p className="text-xs text-slate-200">{teacherFeedback}</p>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
                <span className="flex items-center gap-1 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Workflow Complete: All roles synchronized</span>
                </span>
                <span className="text-[11px] text-slate-500 font-mono">Status: Evaluated & Archived</span>
              </div>
            </div>
            <button
              onClick={() => setActiveWorkflowModal(null)}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition"
            >
              Finish Workflow Simulation
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
