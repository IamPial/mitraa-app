'use client';

import React from 'react';
import { MitraaProvider } from '@/context/MitraaContext';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return <MitraaProvider>{children}</MitraaProvider>;
}
