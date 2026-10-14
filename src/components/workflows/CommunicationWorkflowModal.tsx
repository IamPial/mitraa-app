'use client';

import React, { useState } from 'react';
import { useMitraa } from '@/context/MitraaContext';
import {
  X,
  MessageSquare,
  Calendar,
  CheckCircle2,
  ArrowRight,
  Clock,
  Video,
  FileCheck,
  User,
} from 'lucide-react';

export const CommunicationWorkflowModal: React.FC = () => {
  const { activeWorkflowModal, setActiveWorkflowModal, ptmList, bookPTM, updatePTMActionPlan } = useMitraa();
  const [activeStep, setActiveStep] = useState<number>(1);

  // Communication state
  const [queryTopic, setQueryTopic] = useState('Calculus Integration & Olympiad Preparation');
  const [preferredMode, setPreferredMode] = useState<'Online (Video)' | 'In-Person (Room 204)'>('Online (Video)');
  const [scheduledSlot, setScheduledSlot] = useState('Monday, Oct 19 at 03:30 PM');
  const [actionPlanText, setActionPlanText] = useState('Solve 5 advanced HOTS problems in PracticePod every Wednesday. Review Olympiad past papers.');
  const [actionDueDate, setActionDueDate] = useState('2026-11-01');

  if (activeWorkflowModal !== 'communication') return null;

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
          <div className="p-2 rounded-xl bg-pink-500/20 text-pink-400">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-pink-400 uppercase tracking-wider font-mono">
                Workflow 4.4 (Interactive Simulator)
              </span>
              <span className="text-[10px] bg-pink-500/20 text-pink-300 px-2 py-0.5 rounded-full">
                Parent–Teacher Communication
              </span>
            </div>
            <h2 className="text-xl font-bold text-white">PTM Consultation & Action Plan</h2>
          </div>
        </div>

        {/* Step Progression Bar */}
        <div className="grid grid-cols-5 gap-1.5 my-5 text-center">
          {[
            { step: 1, label: '1. Request' },
            { step: 2, label: '2. Schedule' },
            { step: 3, label: '3. Meeting' },
            { step: 4, label: '4. Action Plan' },
            { step: 5, label: '5. Follow-Up' },
          ].map((s) => (
            <button
              key={s.step}
              onClick={() => setActiveStep(s.step)}
              className={`p-2 rounded-xl border text-xs font-semibold transition ${
                activeStep === s.step
                  ? 'bg-pink-600 text-white border-pink-500 shadow-md'
                  : activeStep > s.step
                  ? 'bg-slate-800 text-emerald-400 border-emerald-500/30'
                  : 'bg-slate-900 text-slate-500 border-slate-800'
              }`}
            >
              <span>{s.label}</span>
            </button>
          ))}
        </div>

        {/* Step 1: Parent Query / PTM Request */}
        {activeStep === 1 && (
          <div className="space-y-4 bg-slate-850 p-5 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-pink-400 uppercase">Role: Parent / Guardian</span>
              <span className="text-xs text-slate-400">Step 1: Consultation Request</span>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Select Subject & Teacher</label>
              <select className="w-full p-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs">
                <option>Prof. Ananya Sen - Mathematics (Calculus)</option>
                <option>Dr. R. K. Varma - Physics</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Reason for PTM Consultation</label>
              <input
                type="text"
                value={queryTopic}
                onChange={(e) => setQueryTopic(e.target.value)}
                className="w-full p-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Preferred Meeting Mode</label>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setPreferredMode('Online (Video)')}
                  className={`flex-1 p-2.5 rounded-xl border text-xs font-semibold ${
                    preferredMode === 'Online (Video)' ? 'bg-pink-600 text-white border-pink-500' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  Online (Integrated Video)
                </button>
                <button
                  type="button"
                  onClick={() => setPreferredMode('In-Person (Room 204)')}
                  className={`flex-1 p-2.5 rounded-xl border text-xs font-semibold ${
                    preferredMode === 'In-Person (Room 204)' ? 'bg-pink-600 text-white border-pink-500' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  In-Person (Campus Room 204)
                </button>
              </div>
            </div>
            <button
              onClick={() => setActiveStep(2)}
              className="w-full py-2.5 rounded-xl bg-pink-600 hover:bg-pink-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition"
            >
              <span>Transmit Request to Faculty</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Step 2: Teacher Responds or Schedules */}
        {activeStep === 2 && (
          <div className="space-y-4 bg-slate-850 p-5 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-purple-400 uppercase">Role: Teacher / Staff</span>
              <span className="text-xs text-slate-400">Step 2: Slot Allocation</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">Parent Requester:</span>
                <span className="text-white font-semibold">Rajesh Sharma (Child: Aarav Sharma)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Query Topic:</span>
                <span className="text-white font-semibold">{queryTopic}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Confirmed Slot:</span>
                <span className="text-indigo-400 font-bold">{scheduledSlot}</span>
              </div>
            </div>
            <button
              onClick={() => setActiveStep(3)}
              className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition"
            >
              <span>Confirm Appointment & Enter Meeting Room</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Step 3: Meeting Session */}
        {activeStep === 3 && (
          <div className="space-y-4 bg-slate-850 p-5 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400 uppercase">Session in Progress</span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Video className="w-3.5 h-3.5 text-emerald-400" />
                <span>Encrypted HD WebRTC Conference</span>
              </span>
            </div>
            <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 text-center space-y-3">
              <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg">
                PTM
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">Consultation: Aarav Sharma Academic Growth</h4>
                <p className="text-xs text-slate-400 mt-1">Prof. Ananya Sen & Rajesh Sharma</p>
              </div>
              <div className="p-3 bg-slate-900 rounded-lg text-xs text-slate-300 max-w-md mx-auto">
                "Discussion focused on bridging partial fraction decomposition gaps and qualifying for National Science Olympiad."
              </div>
            </div>
            <button
              onClick={() => setActiveStep(4)}
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition"
            >
              <span>Conclude Meeting & Formulate Action Plan</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Step 4: Agreed Action Plan */}
        {activeStep === 4 && (
          <div className="space-y-4 bg-slate-850 p-5 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-400 uppercase">Step 4: Formal Action Plan</span>
              <span className="text-xs text-slate-400">Institutional Governance Rule</span>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Agreed Action Plan Commitments</label>
              <textarea
                rows={3}
                value={actionPlanText}
                onChange={(e) => setActionPlanText(e.target.value)}
                className="w-full p-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Target Evaluation Due Date</label>
              <input
                type="date"
                value={actionDueDate}
                onChange={(e) => setActionDueDate(e.target.value)}
                className="w-full p-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs"
              />
            </div>
            <button
              onClick={() => {
                updatePTMActionPlan('ptm_1', actionPlanText, actionDueDate);
                setActiveStep(5);
              }}
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition"
            >
              <span>Sign Off & Lock Action Plan</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Step 5: Follow-Up & Closure */}
        {activeStep === 5 && (
          <div className="space-y-4 bg-slate-850 p-5 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400 uppercase">Step 5: Follow-Up & Closure</span>
              <span className="text-xs text-slate-400">Tracking Active</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3 text-xs">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Action plan successfully linked to Aarav Sharma's Student Support record.</span>
              </div>
              <p className="text-slate-300">
                Both Parent and Teacher can track completion on their respective dashboards until the review on {actionDueDate}.
              </p>
            </div>
            <button
              onClick={() => setActiveWorkflowModal(null)}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
