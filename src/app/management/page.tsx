'use client';

import React, { useEffect } from 'react';
import { useMitraa } from '@/context/MitraaContext';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { ManagementDashboard } from '@/components/dashboards/management/ManagementDashboard';

export default function ManagementPage() {
  const { switchRole } = useMitraa();

  useEffect(() => {
    switchRole('management');
  }, []);

  return (
    <DashboardShell>
      <ManagementDashboard />
    </DashboardShell>
  );
}
