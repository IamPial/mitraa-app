'use client';

import React, { useState } from 'react';
import { useMitraa } from '@/context/MitraaContext';
import { mockPracticeQuestions } from '@/data/mockData';
import {
  X,
  GraduationCap,
  Sparkles,
  Printer,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  RotateCcw,
  BookOpen,
} from 'lucide-react';

export const PracticePodWorkflowModal: React.FC = () => {
  const { activeWorkflowModal, setActiveWorkflowModal } = useMitraa();
  const [activeStep, setActiveStep] = useState<number>(1);

  // Practice state
  const [grade, setGrade] = useState('Grade 10');
  const [subject, setSubject] = useState('Mathematics');
  const [chapter, setChapter] = useState('Calculus & Logarithmic Functions');
  const [attemptMode, setAttemptMode] = useState<'online' | 'print'>('online');
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [showSolution, setShowSolution] = useState(false);

  if (activeWorkflowModal !== 'practice_pod') return null;

  const currentQ = mockPracticeQuestions[0];

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
          <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider font-mono">
                Workflow 4.3 (Interactive Simulator)
              </span>
              <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full">
                PracticePod Engine
              </span>
            </div>
            <h2 className="text-xl font-bold text-white">Adaptive Practice & Mastery</h2>
          </div>
        </div>

        {/* Step Progression Bar */}
        <div className="grid grid-cols-5 gap-1.5 my-5 text-center">
          {[
            { step: 1, label: '1. Scope' },
            { step: 2, label: '2. Generate' },
            { step: 3, label: '3. Attempt' },
            { step: 4, label: '4. Solution' },
            { step: 5, label: '5. Track' },
          ].map((s) => (
            <button
              key={s.step}
              onClick={() => setActiveStep(s.step)}
              className={`p-2 rounded-xl border text-xs font-semibold transition ${
                activeStep === s.step
                  ? 'bg-amber-600 text-white border-amber-500 shadow-md'
                  : activeStep > s.step
                  ? 'bg-slate-800 text-emerald-400 border-emerald-500/30'
                  : 'bg-slate-900 text-slate-500 border-slate-800'
              }`}
            >
              <span>{s.label}</span>
            </button>
          ))}
        </div>

        {/* Step 1: Select Practice Scope */}
        {activeStep === 1 && (
          <div className="space-y-4 bg-slate-850 p-5 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 uppercase">Step 1: Define Practice Scope</span>
              <span className="text-xs text-slate-400">AI-curated question pool</span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Grade</label>
                <select
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="w-full p-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs"
                >
                  <option>Grade 10</option>
                  <option>Grade 9</option>
                  <option>Grade 8</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Subject</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full p-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs"
                >
                  <option>Mathematics</option>
                  <option>Physics</option>
                  <option>Chemistry</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Chapter / Concept</label>
                <select
                  value={chapter}
                  onChange={(e) => setChapter(e.target.value)}
                  className="w-full p-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs"
                >
                  <option>Calculus & Logarithmic Functions</option>
                  <option>Quadratic Polynomials</option>
                  <option>Trigonometric Identities</option>
                </select>
              </div>
            </div>
            <button
              onClick={() => setActiveStep(2)}
              className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition"
            >
              <span>Build Practice Paper</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Step 2: Generate Practice Paper */}
        {activeStep === 2 && (
          <div className="space-y-4 bg-slate-850 p-5 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 uppercase">Step 2: Paper Generated</span>
              <span className="text-xs text-slate-400">Algorithmic Assembly Complete</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Successfully generated custom paper with 4 adaptive questions</span>
              </div>
              <div className="text-xs text-slate-300 space-y-1">
                <p>• Difficulty balance: 1 Easy, 2 Medium, 1 Hard</p>
                <p>• Target learning gap: Partial Fraction & Logarithmic simplification</p>
              </div>
              <div className="pt-2 border-t border-slate-800 flex gap-3">
                <button
                  onClick={() => setAttemptMode('online')}
                  className={`flex-1 p-2.5 rounded-xl border text-xs font-semibold ${
                    attemptMode === 'online' ? 'bg-indigo-600 text-white border-indigo-500' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  Interactive Online Mode
                </button>
                <button
                  onClick={() => {
                    setAttemptMode('print');
                    alert('Generating printable PDF worksheet with QR code for offline completion.');
                  }}
                  className={`flex-1 p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 ${
                    attemptMode === 'print' ? 'bg-indigo-600 text-white border-indigo-500' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  <Printer className="w-4 h-4" />
                  <span>Printable Worksheet</span>
                </button>
              </div>
            </div>
            <button
              onClick={() => setActiveStep(3)}
              className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition"
            >
              <span>Start Attempting Questions</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Step 3: Attempt Practice */}
        {activeStep === 3 && (
          <div className="space-y-4 bg-slate-850 p-5 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 uppercase">Step 3: Solve Practice Item</span>
              <span className="text-xs text-slate-400">Difficulty: {currentQ.difficulty}</span>
            </div>
            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
              <h4 className="text-sm font-semibold text-white">{currentQ.question}</h4>
              <div className="space-y-2 mt-2">
                {currentQ.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedOpt(idx)}
                    className={`w-full text-left p-3 rounded-xl border text-xs font-medium transition ${
                      selectedOpt === idx
                        ? 'bg-amber-600/20 border-amber-500 text-white'
                        : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-750'
                    }`}
                  >
                    <span>{opt}</span>
                  </button>
                ))}
              </div>
            </div>
            <button
              disabled={selectedOpt === null}
              onClick={() => setActiveStep(4)}
              className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 disabled:opacity-40 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition"
            >
              <span>Submit for Instant Solution Breakdown</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Step 4: Solutions & Explanations */}
        {activeStep === 4 && (
          <div className="space-y-4 bg-slate-850 p-5 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400 uppercase">Step 4: Verified Solution</span>
              <span className="text-xs text-emerald-400 font-semibold">Correct Answer: {currentQ.options[currentQ.correctIndex]}</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-800/40 text-xs text-emerald-300">
                <span className="font-bold block mb-1">Step-by-Step Derivation & Explanation:</span>
                <p className="font-mono text-xs text-slate-200">{currentQ.explanation}</p>
              </div>
              <div className="text-xs text-slate-400">
                Concept Mastered: Logarithmic domain restrictions ($x &gt; 2$) and quadratic factorizations.
              </div>
            </div>
            <button
              onClick={() => setActiveStep(5)}
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition"
            >
              <span>Update Progress History & Mastery Curve</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Step 5: Track History & Improvement */}
        {activeStep === 5 && (
          <div className="space-y-4 bg-slate-850 p-5 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-400 uppercase">Step 5: Longitudinal Improvement Tracker</span>
              <span className="text-xs text-slate-400">PracticePod Analytics</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400">Calculus & Logarithms Mastery:</span>
                  <div className="text-xl font-bold text-emerald-400 mt-0.5">88% (+14% this week)</div>
                </div>
                <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5" />
                </div>
              </div>
              <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-amber-500 to-emerald-500 h-full rounded-full w-[88%]" />
              </div>
              <p className="text-[11px] text-slate-400">
                Spec Note: Parents view practice activity only if it's explicitly shared by the student or mentor.
              </p>
            </div>
            <button
              onClick={() => setActiveWorkflowModal(null)}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition"
            >
              Finish Practice Session
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
