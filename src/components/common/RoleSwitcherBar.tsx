'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useMitraa } from '@/context/MitraaContext';
import { UserRole } from '@/types/mitraa';
import { Button, Chip } from '@heroui/react';
import {
  GraduationCap,
  BookOpen,
  Users,
  ShieldCheck,
  Layers,
  Lock,
  GitBranch,
  RotateCcw,
} from 'lucide-react';

export const RoleSwitcherBar: React.FC = () => {
  const router = useRouter();
  const {
    currentRole,
    switchRole,
    setAuthStep,
    setActiveWorkflowModal,
  } = useMitraa();

  const roleRoutes: Record<UserRole, string> = {
    student: '/student',
    teacher: '/teacher',
    parent: '/parent',
    principal: '/principal',
    management: '/management',
    exam_controller: '/exam-controller',
  };

  const handleRoleNavigation = (role: UserRole) => {
    switchRole(role);
    router.push(roleRoutes[role]);
  };

  const roles: { id: UserRole; label: string; icon: React.ReactNode; isPhase2?: boolean }[] = [
    { id: 'student', label: 'Student', icon: <GraduationCap className="w-3.5 h-3.5" /> },
    { id: 'teacher', label: 'Teacher / Staff', icon: <BookOpen className="w-3.5 h-3.5" /> },
    { id: 'parent', label: 'Parent / Guardian', icon: <Users className="w-3.5 h-3.5" /> },
    { id: 'principal', label: 'Principal / HOD', icon: <ShieldCheck className="w-3.5 h-3.5" /> },
    { id: 'management', label: 'Management / Trustee', icon: <Layers className="w-3.5 h-3.5" /> },
    { id: 'exam_controller', label: 'Exam Controller (P2)', icon: <Lock className="w-3.5 h-3.5" />, isPhase2: true },
  ];

  return (
    <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 max-w-5xl w-[96%] bg-slate-950/90 border border-slate-700/80 rounded-2xl shadow-2xl backdrop-blur-md px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
      {/* Role Navigation with Next.js App Router and HeroUI */}
      <div className="flex items-center gap-1.5 flex-wrap">
        <Chip size="sm" variant="flat" color="success" className="mr-1">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            Route:
          </span>
        </Chip>

        {roles.map((r) => (
          <Button
            key={r.id}
            size="sm"
            variant={currentRole === r.id ? 'solid' : 'bordered'}
            color={currentRole === r.id ? 'primary' : 'default'}
            className={currentRole === r.id ? 'bg-indigo-600 text-white font-semibold' : 'text-slate-300 border-slate-750 hover:bg-slate-800'}
            onPress={() => handleRoleNavigation(r.id)}
          >
            {r.icon}
            <span>{r.label}</span>
            {r.isPhase2 && (
              <Chip size="sm" color="danger" variant="flat" className="ml-0.5 text-[9px] h-4 min-h-0 px-1 font-mono">
                P2
              </Chip>
            )}
          </Button>
        ))}
      </div>

      {/* End-to-End Workflow Simulators */}
      <div className="flex items-center gap-1.5 border-l border-slate-800 pl-3">
        <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 mr-1 flex items-center gap-1">
          <GitBranch className="w-3 h-3" />
          5 Flows:
        </span>
        <Button
          size="sm"
          variant="flat"
          className="bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs px-2 h-7"
          onPress={() => setActiveWorkflowModal('assignment')}
        >
          Assignment
        </Button>
        <Button
          size="sm"
          variant="flat"
          className="bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs px-2 h-7"
          onPress={() => setActiveWorkflowModal('exam')}
        >
          Exam
        </Button>
        <Button
          size="sm"
          variant="flat"
          className="bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs px-2 h-7"
          onPress={() => setActiveWorkflowModal('practice_pod')}
        >
          PracticePod
        </Button>
        <Button
          size="sm"
          variant="flat"
          className="bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs px-2 h-7"
          onPress={() => setActiveWorkflowModal('communication')}
        >
          PTM
        </Button>
        <Button
          size="sm"
          variant="flat"
          className="bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs px-2 h-7"
          onPress={() => setActiveWorkflowModal('grievance')}
        >
          Grievance
        </Button>

        <Button
          isIconOnly
          size="sm"
          variant="light"
          className="text-slate-400 hover:text-rose-400"
          onPress={() => {
            setAuthStep('landing');
            router.push('/');
          }}
          title="Back to Landing Page (/)"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </Button>
      </div>
    </div>
  );
};
