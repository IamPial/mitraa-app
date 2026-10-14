'use client';

import React, { useState } from 'react';
import { useMitraa } from '@/context/MitraaContext';
import {
  Home,
  Calendar,
  Database,
  Lock,
  Building,
  Sparkles,
  FileCheck,
  CheckCircle,
  Shield,
  TrendingUp,
  Settings,
  AlertOctagon,
  KeyRound,
  FileSpreadsheet,
} from 'lucide-react';

export const ExamControllerDashboard: React.FC = () => {
  const { activeTab, setActiveTab, currentUser } = useMitraa();
  const [isPaperLocked, setIsPaperLocked] = useState(true);
  const [encryptionStatus, setEncryptionStatus] = useState('AES-256 GCM Locked');

  return (
    <div className="space-y-6">
      {/* Phase 2 Isolation Banner */}
      <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-500/40 flex items-center justify-between text-xs">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-rose-500/20 text-rose-400">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white">Central Examination Directorate</span>
              <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold uppercase text-[10px]">
                Phase 2 Architecture
              </span>
            </div>
            <p className="text-slate-400 text-[11px] mt-0.5">
              Per specification, Phase 2 features remain completely isolated and gated behind controller access keys until the Phase 2 rollout is formally commissioned.
            </p>
          </div>
        </div>
      </div>

      {/* 1. Home (Exam Overview) */}
      {activeTab === 'home' && (
        <div className="space-y-6">
          <div className="rounded-2xl bg-gradient-to-r from-rose-950/70 via-slate-900 to-indigo-950/60 border border-rose-500/30 p-6 shadow-xl">
            <span className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-rose-300" />
              Office of the Controller of Examinations (Phase 2 Preview)
            </span>
            <h1 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
              Statewide Examination Administration Console
            </h1>
            <p className="mt-2 text-xs lg:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Coordinates high-stakes standardized assessments across all regional campus test centres, moderated question banks, cryptographic paper assembly, timed releases, and tamper-evident audit logs.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs">
              <span className="text-slate-400 block">Active Exam Programmes</span>
              <span className="text-2xl font-bold text-white mt-1 block">2 Programmes</span>
              <span className="text-rose-400">CBSE Term 1 & State Olympiad</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs">
              <span className="text-slate-400 block">Approved Exam Centres</span>
              <span className="text-2xl font-bold text-rose-400 mt-1 block">6 Centres</span>
              <span className="text-slate-400">100% biometric verified</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs">
              <span className="text-slate-400 block">Registered Candidates</span>
              <span className="text-2xl font-bold text-indigo-400 mt-1 block">4,250</span>
              <span className="text-slate-400">Hall tickets issued</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs">
              <span className="text-slate-400 block">Cryptographic Lock</span>
              <span className="text-2xl font-bold text-emerald-400 mt-1 block">Active</span>
              <span className="text-emerald-400">Release at T-15 mins</span>
            </div>
          </div>
        </div>
      )}

      {/* 2. Exam Programme */}
      {activeTab === 'exam_programme' && (
        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3 text-xs">
          <h2 className="text-base font-bold text-white">Exam Programme & Candidate Mapping</h2>
          <p className="text-slate-300">
            Define programmes, seating arrangements, invigilator rosters, and roll number mapping matrices.
          </p>
        </div>
      )}

      {/* 3. Question Bank Moderation */}
      {activeTab === 'question_bank' && (
        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3 text-xs">
          <h2 className="text-base font-bold text-white">Central Moderated Question Repository</h2>
          <p className="text-slate-300">
            Review psychometric indices, Bloom's taxonomy balance, and multi-expert peer approvals.
          </p>
        </div>
      )}

      {/* 4. Paper Assembly & Encryption */}
      {activeTab === 'paper_assembly' && (
        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3 text-xs">
          <h2 className="text-base font-bold text-white">Paper Assembly & Hardware-Security-Module (HSM) Encryption</h2>
          <div className="p-4 rounded-xl bg-slate-850 flex items-center justify-between">
            <div>
              <div className="font-bold text-white text-sm">Paper Set A: Higher Secondary Mathematics</div>
              <div className="text-slate-400 font-mono mt-0.5">Hash: SHA-256 e8f3b2a991c4912...</div>
            </div>
            <span className="px-3 py-1 rounded bg-emerald-500/20 text-emerald-400 font-bold">{encryptionStatus}</span>
          </div>
        </div>
      )}

      {/* 5. Centre Management */}
      {activeTab === 'centre_management' && (
        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3 text-xs">
          <h2 className="text-base font-bold text-white">Centre Readiness & Biometric Terminals</h2>
          <p className="text-slate-300">Live monitoring of CCTV feeds, operator presence, and signal jammers across 6 campus centres.</p>
        </div>
      )}

      {/* 6. Exam Day Operations */}
      {activeTab === 'exam_day_ops' && (
        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3 text-xs">
          <h2 className="text-base font-bold text-white">Exam Day Operations & Incident Response</h2>
          <p className="text-slate-300">Real-time attendance logs, anomaly detection, and incident ticketing.</p>
        </div>
      )}

      {/* 7. Evaluation & Moderation */}
      {activeTab === 'evaluation_moderation' && (
        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3 text-xs">
          <h2 className="text-base font-bold text-white">Evaluation & Normalization Moderation</h2>
          <p className="text-slate-300">Double-blind marking queues and standard deviation curve moderation.</p>
        </div>
      )}

      {/* 8. Results & Appeals */}
      {activeTab === 'results' && (
        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3 text-xs">
          <h2 className="text-base font-bold text-white">Results Authorization & Candidate Appeals</h2>
          <p className="text-slate-300">Official gazette publication, re-checking petitions, and re-evaluation appeals.</p>
        </div>
      )}

      {/* 9. Audit Logs */}
      {activeTab === 'audit_logs' && (
        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3 text-xs">
          <h2 className="text-base font-bold text-white">Full Traceability Cryptographic Audit Trail</h2>
          <div className="p-3 bg-slate-950 rounded font-mono text-[11px] text-slate-400 space-y-1">
            <div>[2026-10-14 13:00:00] HSM_SIGN: Controller key unlocked for Paper Set A</div>
            <div>[2026-10-14 13:15:00] DISPATCH: Encrypted payloads delivered to 6 physical centers</div>
          </div>
        </div>
      )}

      {/* 10. Reports */}
      {activeTab === 'reports' && (
        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3 text-xs">
          <h2 className="text-base font-bold text-white">Examination Statistical Reports</h2>
          <p className="text-slate-300">Item response theory curves, discrimination index, and exception logs.</p>
        </div>
      )}

      {/* 11. Profile */}
      {activeTab === 'profile' && (
        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 max-w-xl space-y-3 text-xs">
          <h2 className="text-base font-bold text-white">Controller of Examinations Profile</h2>
          <p className="text-slate-300">{currentUser.name} • {currentUser.email}</p>
        </div>
      )}
    </div>
  );
};
