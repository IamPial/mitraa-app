'use client';

import React, { useState } from 'react';
import { useMitraa } from '@/context/MitraaContext';
import { mockUsers } from '@/data/mockData';
import { Input, Button, Chip } from '@heroui/react';
import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

export const LoginModal: React.FC = () => {
  const {
    setAuthStep,
    selectedRoleForLogin,
    completeLogin,
  } = useMitraa();

  const role = selectedRoleForLogin || 'student';
  const sampleUser = mockUsers[role];

  const [email, setEmail] = useState(sampleUser?.email || '');
  const [password, setPassword] = useState('Mitraa@Secure2026');
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage('Please provide both your institutional Email/User ID and password.');
      return;
    }
    setErrorMessage('');
    completeLogin();
  };

  const roleLabels: Record<string, string> = {
    student: 'Student',
    teacher: 'Teacher / Staff',
    parent: 'Parent / Guardian',
    principal: 'Principal / HOD',
    management: 'Management / Trustee',
    exam_controller: 'Exam Controller (Phase 2)',
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
        <div className="flex items-center justify-between mb-4">
          <Button
            size="sm"
            variant="ghost"
            className="text-slate-400 hover:text-white p-0 h-auto flex items-center gap-1"
            onPress={() => setAuthStep('select_role')}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Roles</span>
          </Button>
          <Chip size="sm" variant="soft" color="accent" className="text-[10px] font-semibold">
            Step 3 of 4: Login
          </Chip>
        </div>

        {/* Selected Context Indicator */}
        <div className="mb-5 p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Context Selected</span>
            <div className="font-semibold text-white text-sm flex items-center gap-1.5 mt-0.5">
              <span>{roleLabels[role]}</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />
            </div>
          </div>
          <Button
            size="sm"
            variant="ghost"
            className="text-xs text-sky-400 hover:underline p-0 h-auto"
            onPress={() => setAuthStep('select_role')}
          >
            Change
          </Button>
        </div>

        <h2 className="text-xl font-bold text-white mb-1">Sign in to your account</h2>
        <p className="text-xs text-slate-400 mb-5">
          Enter your institutional credentials to authenticate your session.
        </p>

        {errorMessage && (
          <div className="mb-4 p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Email or Institutional User ID
            </label>
            <Input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@apex.mitraa.edu"
              className="w-full text-sm text-slate-100"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-medium text-slate-300">Password</label>
              <button
                type="button"
                onClick={() => alert('Password reset link dispatched to your backup email.')}
                className="text-xs text-sky-400 hover:underline"
              >
                Forgot Password?
              </button>
            </div>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full text-sm text-slate-100"
            />
          </div>

          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-slate-700 bg-slate-800 text-sky-500 focus:ring-sky-500/20"
              />
              <span>Remember me on this trusted device</span>
            </label>
          </div>

          <Button
            type="submit"
            variant="primary"
            className="w-full mt-2 bg-sky-600 hover:bg-sky-500 text-white font-semibold text-sm shadow-lg shadow-sky-600/30 h-10 flex items-center justify-center gap-1.5"
          >
            <span>Continue to Two-Factor Auth</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </form>

        <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-1.5 text-sky-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>256-bit TLS encrypted</span>
          </div>
          <Button
            size="sm"
            variant="ghost"
            className="text-slate-400 hover:text-slate-200 underline text-xs p-0 h-auto"
            onPress={() => {
              if (sampleUser) {
                setEmail(sampleUser.email);
                setPassword('Mitraa@Secure2026');
              }
            }}
          >
            Autofill Demo Creds
          </Button>
        </div>
      </div>
    </div>
  );
};
