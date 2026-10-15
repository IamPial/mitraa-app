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
import { IoShieldCheckmarkSharp } from 'react-icons/io5';

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
    <div className="fixed inset-0 z-50 bg-white backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border border-slate-300 rounded-2xl max-w-md w-full p-6 relative text-center">
        <div className="flex items-center justify-center mb-4">    
          <IoShieldCheckmarkSharp className="w-20 h-20 text-[#1d5fd0]" />
        </div>

        <h2 className="text-xl font-bold text-[#14213d] mb-1">Enter OTP</h2>
        <p className="text-xs text-slate-600 max-w-sm mx-auto mb-6">
          We sent a 6-digit verification token to your registered authentication device.
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
              className="w-11 h-13 text-center text-xl font-bold bg-white border border-slate-300 rounded-xl text-[#14213d] focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition"
            />
          ))}
        </div>

        <div className='mx-auto max-w-xs'>
          <Button
          className="w-full bg-[#1d5fd0] hover:bg-blue-700 text-white font-semibold text-sm rounded-lg p-5 flex items-center justify-center gap-1.5"
          onPress={handleVerify}
        >
          <span>Verify</span>
        </Button>
        </div>

        <div className='mt-5'>
            {resendCountdown > 0 ? (
              <span className='text-slate-700'>Resend in {resendCountdown}s</span>
            ) : (
              <Button
                className="text-sky-400 bg-white hover:underline p-0 h-auto text-center"
                onPress={() => setResendCountdown(45)}
              >
                <RefreshCw className="w-3 h-3" />
                <span>Resend OTP</span>
              </Button>
            )}
          </div>
      </div>
    </div>
  );
};
