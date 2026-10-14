'use client';

import React, { useEffect } from 'react';
import { useMitraa } from '@/context/MitraaContext';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { ParentDashboard } from '@/components/dashboards/parent/ParentDashboard';

export default function ParentPage() {
  const { switchRole } = useMitraa();

  useEffect(() => {
    switchRole('parent');
  }, []);

  return (
    <DashboardShell>
      <ParentDashboard />
    </DashboardShell>
  );
}
