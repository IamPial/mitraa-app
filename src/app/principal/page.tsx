'use client';

import React, { useEffect } from 'react';
import { useMitraa } from '@/context/MitraaContext';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { PrincipalDashboard } from '@/components/dashboards/principal/PrincipalDashboard';

export default function PrincipalPage() {
  const { switchRole } = useMitraa();

  useEffect(() => {
    switchRole('principal');
  }, []);

  return (
    <DashboardShell>
      <PrincipalDashboard />
    </DashboardShell>
  );
}
