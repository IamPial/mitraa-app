'use client';

import React, { useEffect } from 'react';
import { useMitraa } from '@/context/MitraaContext';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { TeacherDashboard } from '@/components/dashboards/teacher/TeacherDashboard';

export default function TeacherPage() {
  const { switchRole } = useMitraa();

  useEffect(() => {
    switchRole('teacher');
  }, []);

  return (
    <DashboardShell>
      <TeacherDashboard />
    </DashboardShell>
  );
}
