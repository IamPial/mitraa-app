'use client';

import React, { useEffect } from 'react';
import { useMitraa } from '@/context/MitraaContext';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { StudentDashboard } from '@/components/dashboards/student/StudentDashboard';

export default function StudentPage() {
  const { switchRole } = useMitraa();

  useEffect(() => {
    switchRole('student');
  }, []);

  return (
    <DashboardShell>
      <StudentDashboard />
    </DashboardShell>
  );
}
