'use client';

import React, { useState, useEffect } from 'react';
import { useMitraa } from '@/context/MitraaContext';
import {
  X,
  CheckCircle2,
  ArrowRight,
  Clock,
  BookOpen,
  Award,
  ShieldCheck,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';

export const InternalExamWorkflowModal: React.FC = () => {
  const { activeWorkflowModal, setActiveWorkflowModal, exams, submitExamAttempt, publishExamResults } = useMitraa();
  const [activeStep, setActiveStep] = useState<number>(1);

  // Student test attempt state
  const exam = exams[0]; // Mid-Semester Math
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({
    q1: 0,
    q2: 2,
    q3: 0,
    q4: 0,
    q5: 2,
  });
  const [examScore, setExamScore] = useState<number>(100);
  const [isApprovedByPrincipal, setIsApprovedByPrincipal] = useState<boolean>(false);

  if (activeWorkflowModal !== 'exam') return null;

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
          <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-purple-400 uppercase tracking-wider font-mono">
                Workflow 4.2 (Interactive Simulator)
              </span>
              <span className="text-[10px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full">
                Create → Schedule → Attempt → Evaluate → Approve → Release
              </span>
            </div>
            <h2 className="text-xl font-bold text-white">Internal Exam Lifecycle</h2>
          </div>
        </div>

        {/* Step Progression Bar */}
        <div className="grid grid-cols-6 gap-1.5 my-5 text-center">
          {[
            { step: 1, label: '1. Create Paper' },
            { step: 2, label: '2. Schedule' },
            { step: 3, label: '3. Attempt' },
            { step: 4, label: '4. Evaluate' },
            { step: 5, label: '5. Principal Approval' },
            { step: 6, label: '6. Released Results' },
          ].map((s) => (
            <button
              key={s.step}
              onClick={() => setActiveStep(s.step)}
              className={`p-1.5 rounded-xl border text-[11px] font-semibold transition truncate ${
                activeStep === s.step
                  ? 'bg-purple-600 text-white border-purple-500 shadow-md'
                  : activeStep > s.step
                  ? 'bg-slate-800 text-emerald-400 border-emerald-500/30'
                  : 'bg-slate-900 text-slate-500 border-slate-800'
              }`}
            >
              <span>{s.label}</span>
            </button>
          ))}
        </div>

        {/* Step 1: Create Exam Paper */}
        {activeStep === 1 && (
          <div className="space-y-4 bg-slate-850 p-5 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-purple-400 uppercase">Role: Teacher / Subject Faculty</span>
              <span className="text-xs text-slate-400">Step 1: Exam Paper Assembly</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Subject:</span>
                <span className="text-white font-semibold">Mathematics (Calculus & Algebra)</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Total Marks:</span>
                <span className="text-white font-semibold">100 Marks (5 HOTS Questions)</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Duration:</span>
                <span className="text-white font-semibold">60 Minutes</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Blueprint Taxonomy:</span>
                <span className="text-indigo-400">60% Application, 40% Analysis</span>
              </div>
            </div>
            <button
              onClick={() => setActiveStep(2)}
              className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition"
            >
              <span>Confirm Paper & Set Schedule Window</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Step 2: Schedule & Publish */}
        {activeStep === 2 && (
          <div className="space-y-4 bg-slate-850 p-5 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-purple-400 uppercase">Role: Teacher / Staff</span>
              <span className="text-xs text-slate-400">Step 2: Schedule & Lock</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-2.5">
              <div className="flex items-center gap-2 text-indigo-300">
                <Clock className="w-4 h-4" />
                <span className="font-semibold">Live Timing Window:</span>
              </div>
              <p className="text-slate-300">
                Scheduled for <strong>Tomorrow 10:00 AM - 11:00 AM</strong>. Candidate system access is strictly restricted outside this window.
              </p>
              <div className="p-2.5 rounded-lg bg-indigo-950/40 border border-indigo-800/40 text-[11px] text-indigo-300">
                ✓ Auto-lock and submission timer enforced by server backend.
              </div>
            </div>
            <button
              onClick={() => setActiveStep(3)}
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition"
            >
              <span>Open Student Attempt Simulator</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Step 3: Student Attempts Exam */}
        {activeStep === 3 && (
          <div className="space-y-4 bg-slate-850 p-5 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400 uppercase">Role: Student (Aarav Sharma)</span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-amber-300 font-mono">Time Remaining: 48:20</span>
              </span>
            </div>

            {exam.questions.length > 0 && (
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-2">
                  <span>Question {currentQIndex + 1} of {exam.questions.length}</span>
                  <span className="text-indigo-400 font-semibold">{exam.questions[currentQIndex].marks} Marks</span>
                </div>
                <h4 className="text-sm font-semibold text-white">
                  {exam.questions[currentQIndex].question}
                </h4>

                <div className="space-y-2 mt-2">
                  {exam.questions[currentQIndex].options.map((opt, oIdx) => (
                    <button
                      key={oIdx}
                      onClick={() =>
                        setSelectedAnswers((prev) => ({
                          ...prev,
                          [exam.questions[currentQIndex].id]: oIdx,
                        }))
                      }
                      className={`w-full text-left p-3 rounded-xl border text-xs font-medium transition ${
                        selectedAnswers[exam.questions[currentQIndex].id] === oIdx
                          ? 'bg-indigo-600/30 border-indigo-500 text-white'
                          : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-750'
                      }`}
                    >
                      <span className="font-mono mr-2 text-indigo-400">[{String.fromCharCode(65 + oIdx)}]</span>
                      <span>{opt}</span>
                    </button>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                  <button
                    disabled={currentQIndex === 0}
                    onClick={() => setCurrentQIndex((prev) => Math.max(0, prev - 1))}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs disabled:opacity-40"
                  >
                    Previous
                  </button>
                  <div className="flex gap-1">
                    {exam.questions.map((q, qIdx) => (
                      <span
                        key={q.id}
                        className={`w-2 h-2 rounded-full ${
                          selectedAnswers[q.id] !== undefined ? 'bg-emerald-400' : 'bg-slate-700'
                        }`}
                      />
                    ))}
                  </div>
                  <button
                    disabled={currentQIndex === exam.questions.length - 1}
                    onClick={() => setCurrentQIndex((prev) => Math.min(exam.questions.length - 1, prev + 1))}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs disabled:opacity-40"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            <button
              onClick={() => {
                const score = submitExamAttempt(exam.id, selectedAnswers);
                setExamScore(score);
                setActiveStep(4);
              }}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition"
            >
              <span>Submit Exam Answers</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Step 4: Teacher Evaluates & Marks */}
        {activeStep === 4 && (
          <div className="space-y-4 bg-slate-850 p-5 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-purple-400 uppercase">Role: Teacher / Evaluator</span>
              <span className="text-xs text-slate-400">Step 4: Auto-Grading & Moderation</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-400">Calculated Score:</span>
                <span className="text-2xl font-bold text-emerald-400">{examScore} / {exam.totalMarks} (100%)</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-1">
                <p>✓ All 5 objective HOTS items evaluated with zero discrepancies.</p>
                <p>✓ Performance rank: Top 2 percentile across Grade 10 cohorts.</p>
              </div>
            </div>
            <button
              onClick={() => setActiveStep(5)}
              className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition"
            >
              <span>Submit to Principal for Final Approval</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Step 5: Approval & Result Publication */}
        {activeStep === 5 && (
          <div className="space-y-4 bg-slate-850 p-5 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 uppercase">Role: Principal / HOD</span>
              <span className="text-xs text-slate-400">Step 5: Executive Results Authorization</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>Executive Verification Check</span>
              </div>
              <p className="text-slate-300">
                Per institutional policy, exam results remain confidential and inaccessible to students and parents until the Principal authorizes the cryptographic release key.
              </p>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="approveCert"
                  checked={isApprovedByPrincipal}
                  onChange={(e) => setIsApprovedByPrincipal(e.target.checked)}
                  className="rounded bg-slate-800 border-slate-700 text-amber-500"
                />
                <label htmlFor="approveCert" className="text-slate-200 cursor-pointer">
                  I, Dr. Vikramaditya Rao (Principal), authorize institutional result publication.
                </label>
              </div>
            </div>
            <button
              disabled={!isApprovedByPrincipal}
              onClick={() => {
                publishExamResults(exam.id);
                setActiveStep(6);
              }}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition"
            >
              <span>Publish Results (Unlock for Students & Parents)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Step 6: View Released Results */}
        {activeStep === 6 && (
          <div className="space-y-4 bg-slate-850 p-5 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400 uppercase">Role: Student & Parent View</span>
              <span className="text-xs text-slate-400">Step 6: Official Released Scorecard</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <h4 className="font-bold text-white text-sm">{exam.title}</h4>
                  <span className="text-xs text-slate-400">Aarav Sharma • Grade 10 - Sec B</span>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-emerald-400">{examScore} / 100</span>
                  <span className="block text-[10px] text-emerald-300 font-bold uppercase">Grade A+ (Distinction)</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2.5 rounded-lg bg-slate-800 border border-slate-700">
                  <span className="text-slate-400 text-[10px] block">Rank</span>
                  <span className="font-bold text-white">1st in Cohort</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-800 border border-slate-700">
                  <span className="text-slate-400 text-[10px] block">Percentile</span>
                  <span className="font-bold text-white">99.8%</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-800 border border-slate-700">
                  <span className="text-slate-400 text-[10px] block">Approved By</span>
                  <span className="font-bold text-indigo-400">Principal Office</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setActiveWorkflowModal(null)}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition"
            >
              Close Exam Simulator
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
