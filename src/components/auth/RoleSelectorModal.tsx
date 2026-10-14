'use client';

import React from 'react';
import { useMitraa } from '@/context/MitraaContext';
import { UserRole } from '@/types/mitraa';
import {
  GraduationCap,
  Users,
  ShieldCheck,
  BookOpen,
  ArrowRight,
  School,
  Lock,
  Layers,
  X,
  Info,
} from 'lucide-react';

interface RoleOption {
  id: UserRole;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
  isPhase2?: boolean;
}

const roleOptions: RoleOption[] = [
  {
    id: 'student',
    title: 'Student',
    subtitle: 'Access timetable, assignments, exam simulator, PracticePod & progress',
    icon: <GraduationCap className="w-6 h-6 text-emerald-400" />,
    color: 'hover:border-emerald-500/60 hover:bg-emerald-500/5',
  },
  {
    id: 'teacher',
    title: 'Teacher / Staff',
    subtitle: 'Manage classes, attendance, assignment engine, question bank & grading',
    icon: <BookOpen className="w-6 h-6 text-purple-400" />,
    color: 'hover:border-purple-500/60 hover:bg-purple-500/5',
  },
  {
    id: 'parent',
    title: 'Parent / Guardian',
    subtitle: 'Monitor wards, verify attendance, pay fees, track marks & book PTMs',
    icon: <Users className="w-6 h-6 text-pink-400" />,
    color: 'hover:border-pink-500/60 hover:bg-pink-500/5',
  },
  {
    id: 'principal',
    title: 'Principal / HOD',
    subtitle: 'Institution health, academic coverage, workload, approvals & escalations',
    icon: <ShieldCheck className="w-6 h-6 text-amber-400" />,
    color: 'hover:border-amber-500/60 hover:bg-amber-500/5',
  },
  {
    id: 'management',
    title: 'Management / Trustee',
    subtitle: 'Multi-campus metrics, finance, fee collections, compliance & policy',
    icon: <Layers className="w-6 h-6 text-cyan-400" />,
    color: 'hover:border-cyan-500/60 hover:bg-cyan-500/5',
  },
  {
    id: 'exam_controller',
    title: 'Exam Controller',
    subtitle: 'Paper encryption, centres, exam-day logistics & result moderation',
    icon: <Lock className="w-6 h-6 text-rose-400" />,
    color: 'hover:border-rose-500/60 hover:bg-rose-500/5',
    isPhase2: true,
  },
];

export const RoleSelectorModal: React.FC = () => {
  const { setAuthStep, setSelectedRoleForLogin } = useMitraa();

  const handleSelectRole = (role: UserRole) => {
    setSelectedRoleForLogin(role);
    setAuthStep('login');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full p-6 shadow-2xl relative">
        <button
          onClick={() => setAuthStep('landing')}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400">
            <School className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">Step 2 of 4</span>
            <h2 className="text-xl font-bold text-white">Select User Type</h2>
          </div>
        </div>

        <p className="text-xs text-slate-400 mb-4">
          Please select your intended sign-in context. Access permissions will be cryptographically validated upon authentication.
        </p>

        <div className="grid grid-cols-1 gap-2.5 max-h-[60vh] overflow-y-auto pr-1">
          {roleOptions.map((role) => (
            <div
              key={role.id}
              onClick={() => handleSelectRole(role.id)}
              className={`flex items-center justify-between p-3.5 rounded-xl border border-slate-800 bg-slate-850/60 cursor-pointer transition ${role.color} group`}
            >
              <div className="flex items-center gap-3.5">
                <div className="p-2 rounded-lg bg-slate-800/80 group-hover:scale-105 transition">
                  {role.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-slate-200 group-hover:text-white transition">
                      {role.title}
                    </span>
                    {role.isPhase2 && (
                      <span className="text-[10px] font-bold px-2 py-0.2 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                        Phase 2
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-1">{role.subtitle}</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white group-hover:translate-x-1 transition" />
            </div>
          ))}
        </div>

        <div className="mt-4 p-3 rounded-lg bg-slate-950/60 border border-slate-800/80 flex items-start gap-2.5 text-xs text-slate-400">
          <Info className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
          <span>
            <strong>Spec Note:</strong> Picking a user type tells the app which sign-in context to use. Actual RBAC boundaries (Tenant → Campus → Class → Relationship) are enforced securely.
          </span>
        </div>
      </div>
    </div>
  );
};
