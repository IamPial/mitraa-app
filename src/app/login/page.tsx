'use client';

import React from 'react';
import { useMitraa } from '@/context/MitraaContext';
import { RoleSelectorModal } from '@/components/auth/RoleSelectorModal';
import { LoginModal } from '@/components/auth/LoginModal';
import { TwoFactorModal } from '@/components/auth/TwoFactorModal';
import { WelcomeLanding } from '@/components/auth/WelcomeLanding';

export default function LoginPage() {
  const { authStep } = useMitraa();

  return (
    <div className="min-h-screen bg-slate-950">
      <WelcomeLanding />
      {authStep === 'select_role' && <RoleSelectorModal />}
      {authStep === 'login' && <LoginModal />}
      {authStep === 'otp' && <TwoFactorModal />}
    </div>
  );
}
