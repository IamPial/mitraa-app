'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMitraa } from '@/context/MitraaContext';
import { UserRole } from '@/types/mitraa';
import { Button, Card, CardContent, CardHeader, Chip } from '@heroui/react';
import {
  GraduationCap,
  Users,
  ShieldCheck,
  BookOpen,
  ArrowRight,
  Sparkles,
  School,
  Lock,
  Layers,
} from 'lucide-react';
import Link from 'next/link';

export const WelcomeLanding: React.FC = () => {
  const router = useRouter();
  const { setAuthStep, setSelectedRoleForLogin, switchRole } = useMitraa();
  const [allowRegistration, setAllowRegistration] = useState(false);

  const startLoginWithRole = (role: UserRole) => {
    setSelectedRoleForLogin(role);
    setAuthStep('login');
  };

  const directRoleRoute = (role: UserRole) => {
    switchRole(role);
    const routes: Record<UserRole, string> = {
      student: '/student',
      teacher: '/teacher',
      parent: '/parent',
      principal: '/principal',
      management: '/management',
      exam_controller: '/exam-controller',
    };
    router.push(routes[role]);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-indigo-950 to-slate-900 text-slate-100 flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      {/* Top Header */}
      <header className="border-b border-gray-100/30 bg-[#11305C]/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="#" className="flex items-center gap-3 cursor-pointer">
            <div className="w-11 h-11 rounded-xl  p-0.5">
              <div className="w-full h-full bg-white rounded-md flex items-center justify-center">
                <School className="w-6 h-6  text-[#11305C]" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-white">
                  MiTRAA-Edu
                </span>
              </div>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <Button
              size="sm"
              variant="outline"
              className="text-xs text-slate-300 border-slate-800 hover:border-slate-750"
              onPress={() => setAllowRegistration(!allowRegistration)}
            >
              Registration {allowRegistration ? 'Open' : 'Restricted'}
            </Button>

            {allowRegistration && (
              <Button
                size="sm"
                variant="outline"
                className="text-xs text-slate-200 bg-slate-800"
                onPress={() => alert('Registration window managed by campus registrar.')}
              >
                Sign Up / Register
              </Button>
            )}

            <Button
              size="sm"
              variant="primary"
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-lg shadow-indigo-600/30 flex items-center gap-1.5"
              onPress={() => setAuthStep('select_role')}
            >
              <span>Login</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 max-w-7xl mx-auto px-6 py-12 flex flex-col justify-center items-center text-center">
        <Chip
          variant="soft"
          color="accent"
          className="mb-6 px-3 py-1 text-indigo-300 text-xs border border-indigo-500/30 flex items-center gap-1.5"
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>Role-Based App Router Architecture • HeroUI 3.2.6 Engine</span>
        </Chip>

        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight max-w-4xl leading-tight">
          Welcome to <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">MiTRAA–Edu</span>
        </h1>
        <p className="mt-4 text-lg md:text-xl text-slate-300 max-w-2xl font-light">
          Connected Education for a Brighter Tomorrow. Bringing assignments, exams, practice, communication, and academic governance into one unified experience.
        </p>

        {/* Primary CTA Buttons with HeroUI */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <Button
            size="lg"
            variant="primary"
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-base shadow-xl shadow-indigo-600/30 px-7 h-12 flex items-center gap-2"
            onPress={() => setAuthStep('select_role')}
          >
            <span>Sign In with Step Flow</span>
            <ArrowRight className="w-5 h-5" />
          </Button>
          
          <Button
            size="lg"
            variant="outline"
            className="border-slate-700 bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 font-medium text-base px-6 h-12"
            onPress={() => directRoleRoute('student')}
          >
            Direct /student Route
          </Button>
        </div>

        {/* Direct Role Explorer Grid with HeroUI Cards */}
        <div className="mt-16 w-full max-w-5xl text-left">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-semibold text-sky-300 uppercase tracking-wider">
                Select Your Role Route
              </h2>
              <p className="text-xs text-slate-400">
                Direct App Router URLs: /student, /teacher, /parent, /principal, /management, /exam-controller
              </p>
            </div>
            <span className="text-xs text-slate-500 font-mono">Tenant → Campus → Class → Relationship</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Student (Emerald Green) */}
            <Card
              onClick={() => directRoleRoute('student')}
              className="cursor-pointer bg-slate-900/80 border border-slate-800 hover:border-emerald-500/50 transition p-4 rounded-xl"
            >
              <CardHeader className="flex justify-between items-start p-0 mb-2">
                <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <Chip size="sm" variant="soft" color="success" className="text-[10px]">
                  /student
                </Chip>
              </CardHeader>
              <CardContent className="p-0">
                <h3 className="font-semibold text-slate-100 text-sm">Student Portal</h3>
                <p className="mt-1 text-xs text-slate-400 line-clamp-2">
                  Classes, timetable, assignments, exam attempts, PracticePod, doubt resolution & downloads.
                </p>
                <div className="mt-3 flex items-center text-xs text-emerald-400 font-medium">
                  <span>Open Route</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </CardContent>
            </Card>

            {/* Teacher (Royal Purple) */}
            <Card
              onClick={() => directRoleRoute('teacher')}
              className="cursor-pointer bg-slate-900/80 border border-slate-800 hover:border-purple-500/50 transition p-4 rounded-xl"
            >
              <CardHeader className="flex justify-between items-start p-0 mb-2">
                <div className="p-2.5 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  <BookOpen className="w-5 h-5" />
                </div>
                <Chip size="sm" variant="soft" color="accent" className="text-[10px]">
                  /teacher
                </Chip>
              </CardHeader>
              <CardContent className="p-0">
                <h3 className="font-semibold text-slate-100 text-sm">Teacher / Staff</h3>
                <p className="mt-1 text-xs text-slate-400 line-clamp-2">
                  Mark attendance, assignment engine, question bank, exam evaluation & student support.
                </p>
                <div className="mt-3 flex items-center text-xs text-purple-400 font-medium">
                  <span>Open Route</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </CardContent>
            </Card>

            {/* Parent (Rose Pink) */}
            <Card
              onClick={() => directRoleRoute('parent')}
              className="cursor-pointer bg-slate-900/80 border border-slate-800 hover:border-pink-500/50 transition p-4 rounded-xl"
            >
              <CardHeader className="flex justify-between items-start p-0 mb-2">
                <div className="p-2.5 rounded-lg bg-pink-500/10 text-pink-400 border border-pink-500/20">
                  <Users className="w-5 h-5" />
                </div>
                <Chip size="sm" variant="soft" color="danger" className="text-[10px]">
                  /parent
                </Chip>
              </CardHeader>
              <CardContent className="p-0">
                <h3 className="font-semibold text-slate-100 text-sm">Parent / Guardian</h3>
                <p className="mt-1 text-xs text-slate-400 line-clamp-2">
                  Multi-child switcher, attendance tracking, fee payments, PTM booking & reports.
                </p>
                <div className="mt-3 flex items-center text-xs text-pink-400 font-medium">
                  <span>Open Route</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </CardContent>
            </Card>

            {/* Principal (Terracotta Orange) */}
            <Card
              onClick={() => directRoleRoute('principal')}
              className="cursor-pointer bg-slate-900/80 border border-slate-800 hover:border-orange-500/50 transition p-4 rounded-xl"
            >
              <CardHeader className="flex justify-between items-start p-0 mb-2">
                <div className="p-2.5 rounded-lg bg-orange-500/10 text-orange-400 border border-orange-500/20">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <Chip size="sm" variant="soft" color="warning" className="text-[10px]">
                  /principal
                </Chip>
              </CardHeader>
              <CardContent className="p-0">
                <h3 className="font-semibold text-slate-100 text-sm">Principal / HOD</h3>
                <p className="mt-1 text-xs text-slate-400 line-clamp-2">
                  Academic coverage, staff workload, attendance overview, exam approvals & escalations.
                </p>
                <div className="mt-3 flex items-center text-xs text-orange-400 font-medium">
                  <span>Open Route</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </CardContent>
            </Card>

            {/* Management (Warm Golden Yellow / Amber) */}
            <Card
              onClick={() => directRoleRoute('management')}
              className="cursor-pointer bg-slate-900/80 border border-slate-800 hover:border-amber-500/50 transition p-4 rounded-xl"
            >
              <CardHeader className="flex justify-between items-start p-0 mb-2">
                <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  <Layers className="w-5 h-5" />
                </div>
                <Chip size="sm" variant="soft" color="warning" className="text-[10px]">
                  /management
                </Chip>
              </CardHeader>
              <CardContent className="p-0">
                <h3 className="font-semibold text-slate-100 text-sm">Management / Trustee</h3>
                <p className="mt-1 text-xs text-slate-400 line-clamp-2">
                  Multi-campus view, institutional revenue, comparative performance & audit compliance.
                </p>
                <div className="mt-3 flex items-center text-xs text-amber-400 font-medium">
                  <span>Open Route</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </CardContent>
            </Card>

            {/* Exam Controller (Deep Crimson Red) */}
            <Card
              onClick={() => directRoleRoute('exam_controller')}
              className="cursor-pointer bg-slate-900/60 border border-red-900/40 hover:border-red-500/50 transition p-4 rounded-xl"
            >
              <CardHeader className="flex justify-between items-start p-0 mb-2">
                <div className="p-2.5 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20">
                  <Lock className="w-5 h-5" />
                </div>
                <Chip size="sm" variant="soft" color="danger" className="text-[10px] font-bold">
                  /exam-controller
                </Chip>
              </CardHeader>
              <CardContent className="p-0">
                <h3 className="font-semibold text-slate-100 text-sm">Exam Controller (P2)</h3>
                <p className="mt-1 text-xs text-slate-400 line-clamp-2">
                  Centres mapping, paper lock & encryption, exam day ops, evaluation moderation & audit.
                </p>
                <div className="mt-3 flex items-center text-xs text-red-400 font-medium">
                  <span>Open Route</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 px-6 py-4 text-center text-xs text-slate-500">
        <p>MiTRAA–Edu Frontend System • HeroUI 3.2.6 & Next.js App Router Architecture</p>
      </footer>
    </div>
  );
};
