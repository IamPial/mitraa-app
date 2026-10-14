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
} from 'lucide-react';

interface RoleOption {
  id: UserRole;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
  pillColor: string;
  isPhase2?: boolean;
}

const roleOptions: RoleOption[] = [
  {
    id: 'student',
    title: 'Student',
    subtitle: 'Access timetable, assignments, exam simulator, PracticePod & progress',
    icon: <GraduationCap className="w-6 h-6 text-emerald-400" />,
    color: 'hover:border-emerald-500/60 hover:bg-emerald-500/5 border-emerald-500/20',
    pillColor: 'bg-emerald-600 text-white',
  },
  {
    id: 'teacher',
    title: 'Teacher / Staff',
    subtitle: 'Manage classes, attendance, assignment engine, question bank & grading',
    icon: <BookOpen className="w-6 h-6 text-purple-400" />,
    color: 'hover:border-purple-500/60 hover:bg-purple-500/5 border-purple-500/20',
    pillColor: 'bg-purple-700 text-white',
  },
  {
    id: 'parent',
    title: 'Parent / Guardian',
    subtitle: 'Monitor wards, verify attendance, pay fees, track marks & book PTMs',
    icon: <Users className="w-6 h-6 text-pink-400" />,
    color: 'hover:border-pink-500/60 hover:bg-pink-500/5 border-pink-500/20',
    pillColor: 'bg-pink-700 text-white',
  },
  {
    id: 'principal',
    title: 'Principal / HOD',
    subtitle: 'Institution health, academic coverage, workload, approvals & escalations',
    icon: <ShieldCheck className="w-6 h-6 text-orange-400" />,
    color: 'hover:border-orange-500/60 hover:bg-orange-500/5 border-orange-500/20',
    pillColor: 'bg-orange-700 text-white',
  },
  {
    id: 'management',
    title: 'Management / Trustee',
    subtitle: 'Multi-campus metrics, finance, fee collections, compliance & policy',
    icon: <Layers className="w-6 h-6 text-amber-400" />,
    color: 'hover:border-amber-500/60 hover:bg-amber-500/5 border-amber-500/20',
    pillColor: 'bg-amber-500 text-slate-950 font-bold',
  },
  {
    id: 'exam_controller',
    title: 'Exam Controller',
    subtitle: 'Paper encryption, centres, exam-day logistics & result moderation',
    icon: <Lock className="w-6 h-6 text-red-400" />,
    color: 'hover:border-red-600/60 hover:bg-red-600/5 border-red-500/20',
    pillColor: 'bg-red-800 text-white',
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
    <div className="fixed inset-0 z-50 bg-white backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full p-6 shadow-2xl relative">
       

        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-white text-indigo-400">
            <School className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Select User Type</h2>
          </div>
        </div>

   

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
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${role.pillColor} shadow-sm`}>
                      {role.id === 'exam_controller' ? 'Phase 2' : 'Role'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-1">{role.subtitle}</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white group-hover:translate-x-1 transition" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
