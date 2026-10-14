'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useMitraa } from '@/context/MitraaContext';
import { Button, Chip } from '@heroui/react';
import {
  ShieldCheck,
  ArrowLeft,
  KeyRound,
  RefreshCw,
  CheckCircle,
} from 'lucide-react';

export const TwoFactorModal: React.FC = () => {
  const router = useRouter();
  const { setAuthStep, verifyOtp, selectedRoleForLogin } = useMitraa();
  const [digits, setDigits] = useState(['1', '2', '3', '4', '5', '6']);
  const [error, setError] = useState('');
  const [resendCountdown, setResendCountdown] = useState(45);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setResendCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(-1);
    }
    const newDigits = [...digits];
    newDigits[index] = value;
    setDigits(newDigits);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const code = digits.join('');
    if (code.length !== 6) {
      setError('Please enter the complete 6-digit verification code.');
      return;
    }
    const success = verifyOtp(code);
    if (!success) {
      setError('Invalid OTP code. Try entering 123456.');
      return;
    }
    // Direct navigate to App Router role URL
    const roleRoutes: Record<string, string> = {
      student: '/student',
      teacher: '/teacher',
      parent: '/parent',
      principal: '/principal',
      management: '/management',
      exam_controller: '/exam-controller',
    };
    const target = roleRoutes[selectedRoleForLogin || 'student'] || '/student';
    router.push(target);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl relative text-center">
        <div className="flex items-center justify-between mb-4">
          <Button
            size="sm"
            variant="ghost"
            className="text-slate-400 hover:text-white p-0 h-auto flex items-center gap-1"
            onPress={() => setAuthStep('login')}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Login</span>
          </Button>
          <Chip size="sm" variant="soft" color="accent" className="text-[10px] font-semibold">
            Step 4 of 4: Two-Factor
          </Chip>
        </div>

        <div className="mx-auto w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center mb-4">
          <KeyRound className="w-6 h-6" />
        </div>

        <h2 className="text-xl font-bold text-white mb-1">Two-Factor Authentication</h2>
        <p className="text-xs text-slate-400 max-w-sm mx-auto mb-6">
          We sent a 6-digit verification token to your registered authentication device for{' '}
          <strong className="text-slate-200 capitalize">{selectedRoleForLogin || 'user'}</strong> access.
        </p>

        {error && (
          <div className="mb-4 p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
            {error}
          </div>
        )}

        {/* 6-digit OTP Inputs */}
        <div className="flex justify-center gap-2 mb-6">
          {digits.map((digit, idx) => (
            <input
              key={idx}
              ref={(el) => {
                inputRefs.current[idx] = el;
              }}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(idx, e.target.value)}
              onKeyDown={(e) => handleKeyDown(idx, e)}
              className="w-11 h-13 text-center text-xl font-bold bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition"
            />
          ))}
        </div>

        <Button
          variant="primary"
          className="w-full bg-sky-600 hover:bg-sky-500 text-white font-semibold text-sm shadow-lg shadow-sky-600/30 h-11 flex items-center justify-center gap-1.5"
          onPress={handleVerify}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Verify & Enter Dashboard</span>
        </Button>

        <div className="mt-5 flex items-center justify-between text-xs text-slate-400">
          <Button
            size="sm"
            variant="ghost"
            className="text-sky-400 hover:underline p-0 h-auto flex items-center gap-1"
            onPress={() => setDigits(['1', '2', '3', '4', '5', '6'])}
          >
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Use default code (123456)</span>
          </Button>

          <div>
            {resendCountdown > 0 ? (
              <span>Resend in {resendCountdown}s</span>
            ) : (
              <Button
                size="sm"
                variant="ghost"
                className="text-sky-400 hover:underline p-0 h-auto flex items-center gap-1"
                onPress={() => setResendCountdown(45)}
              >
                <RefreshCw className="w-3 h-3" />
                <span>Resend OTP</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
