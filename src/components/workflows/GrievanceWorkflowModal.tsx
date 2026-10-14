'use client';

import React, { useState } from 'react';
import { useMitraa } from '@/context/MitraaContext';
import { GrievanceTicket } from '@/types/mitraa';
import {
  X,
  AlertTriangle,
  Clock,
  ShieldAlert,
  CheckCircle2,
  ArrowRight,
  RotateCcw,
  UserCheck,
} from 'lucide-react';

export const GrievanceWorkflowModal: React.FC = () => {
  const { activeWorkflowModal, setActiveWorkflowModal, createGrievance, resolveGrievance, reopenGrievance } = useMitraa();
  const [activeStep, setActiveStep] = useState<number>(1);

  // Ticket creation state
  const [title, setTitle] = useState('Science Laboratory Digital Sensor Inaccuracy');
  const [category, setCategory] = useState<GrievanceTicket['category']>('Facilities');
  const [description, setDescription] = useState('Vernier calipers and digital pH meters in Chemistry Lab 2 require standard buffer recalibration.');
  const [ticketId, setTicketId] = useState('GRV-2026-8812');
  const [resolutionText, setResolutionText] = useState('Laboratory instrumentation engineer recalibrated all pH probes and certified zero error on Oct 14.');

  if (activeWorkflowModal !== 'grievance') return null;

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
          <div className="p-2 rounded-xl bg-rose-500/20 text-rose-400">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider font-mono">
                Workflow 4.5 (Interactive Simulator)
              </span>
              <span className="text-[10px] bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded-full">
                Institutional SLA & Escalations
              </span>
            </div>
            <h2 className="text-xl font-bold text-white">Complaint & Grievance Lifecycle</h2>
          </div>
        </div>

        {/* Step Progression Bar */}
        <div className="grid grid-cols-5 gap-1.5 my-5 text-center">
          {[
            { step: 1, label: '1. Submit' },
            { step: 2, label: '2. Ticket ID' },
            { step: 3, label: '3. Assign SLA' },
            { step: 4, label: '4. Resolve' },
            { step: 5, label: '5. Notify/Reopen' },
          ].map((s) => (
            <button
              key={s.step}
              onClick={() => setActiveStep(s.step)}
              className={`p-2 rounded-xl border text-xs font-semibold transition ${
                activeStep === s.step
                  ? 'bg-rose-600 text-white border-rose-500 shadow-md'
                  : activeStep > s.step
                  ? 'bg-slate-800 text-emerald-400 border-emerald-500/30'
                  : 'bg-slate-900 text-slate-500 border-slate-800'
              }`}
            >
              <span>{s.label}</span>
            </button>
          ))}
        </div>

        {/* Step 1: Submit Complaint */}
        {activeStep === 1 && (
          <div className="space-y-4 bg-slate-850 p-5 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 uppercase">Step 1: Lodge Institutional Complaint</span>
              <span className="text-xs text-slate-400">Shared entry point for Student, Parent & Staff</span>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full p-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs"
              >
                <option value="Facilities">Facilities & Infrastructure</option>
                <option value="Transport">School Bus & Transport Logistics</option>
                <option value="Academic">Academic / Syllabus Coverage</option>
                <option value="Billing">Fee Billing & Accounts</option>
                <option value="Staff">Staff / Administration</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Issue Headline</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Detailed Description</label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs"
              />
            </div>
            <button
              onClick={() => {
                const created = createGrievance(title, category, description);
                setTicketId(created.id);
                setActiveStep(2);
              }}
              className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition"
            >
              <span>Submit Complaint & Generate Tracking ID</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Step 2: Create Ticket */}
        {activeStep === 2 && (
          <div className="space-y-4 bg-slate-850 p-5 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400 uppercase">Step 2: Ticket Generated</span>
              <span className="text-xs text-slate-400">Permanent Audit Logged</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center space-y-2">
              <div className="text-2xl font-mono font-bold text-indigo-400">{ticketId}</div>
              <p className="text-xs text-slate-300">
                Ticket officially logged into institutional CRM. A confirmation SMS/Email has been dispatched to the submitter.
              </p>
            </div>
            <button
              onClick={() => setActiveStep(3)}
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition"
            >
              <span>View Automated SLA Assignment</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Step 3: Assign Owner with SLA */}
        {activeStep === 3 && (
          <div className="space-y-4 bg-slate-850 p-5 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-400 uppercase">Step 3: Owner & SLA Routing</span>
              <span className="text-xs text-slate-400">Institutional Governance</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Assigned Department Owner:</span>
                <span className="text-white font-semibold flex items-center gap-1">
                  <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Mr. Ramesh (Senior Facilities Engineer)</span>
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Binding Resolution SLA:</span>
                <span className="text-amber-400 font-bold flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>24 Hours Remaining</span>
                </span>
              </div>
              <p className="text-[11px] text-slate-400 pt-1">
                If unresolved within 24 hours, the ticket automatically escalates to the Principal's Escalation Dashboard.
              </p>
            </div>
            <button
              onClick={() => setActiveStep(4)}
              className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition"
            >
              <span>Proceed to Investigation & Resolution</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Step 4: Investigate & Resolve */}
        {activeStep === 4 && (
          <div className="space-y-4 bg-slate-850 p-5 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-purple-400 uppercase">Role: Department Officer</span>
              <span className="text-xs text-slate-400">Step 4: Investigation & Action Note</span>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Official Resolution Report</label>
              <textarea
                rows={3}
                value={resolutionText}
                onChange={(e) => setResolutionText(e.target.value)}
                className="w-full p-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs"
              />
            </div>
            <button
              onClick={() => {
                resolveGrievance(ticketId, resolutionText);
                setActiveStep(5);
              }}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition"
            >
              <span>Mark Resolved & Transmit Notice to User</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Step 5: Notify & Reopen */}
        {activeStep === 5 && (
          <div className="space-y-4 bg-slate-850 p-5 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400 uppercase">Step 5: Resolution Notice</span>
              <span className="text-xs text-slate-400">User Closure or Reopen</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white">Ticket: {ticketId}</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-semibold text-[10px]">
                  STATUS: RESOLVED
                </span>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 text-slate-200">
                <span className="text-slate-400 block text-[10px] mb-0.5">Resolution Summary:</span>
                "{resolutionText}"
              </div>
              <p className="text-[11px] text-slate-400">
                If the solution is unsatisfactory, the submitter may reopen this grievance within 48 hours for immediate trustee/principal escalation.
              </p>
              <div className="flex gap-2 pt-2 border-t border-slate-800">
                <button
                  onClick={() => {
                    reopenGrievance(ticketId, 'Apparatus still showing drift on Bench 2');
                    alert('Ticket reopened and escalated to Head of Campus Infrastructure.');
                    setActiveWorkflowModal(null);
                  }}
                  className="flex-1 py-2 rounded-lg bg-rose-600/20 border border-rose-500/40 text-rose-300 hover:bg-rose-600/30 font-semibold flex items-center justify-center gap-1.5 transition"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reopen Ticket</span>
                </button>
                <button
                  onClick={() => setActiveWorkflowModal(null)}
                  className="flex-1 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold flex items-center justify-center gap-1.5 transition"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Accept & Close</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
