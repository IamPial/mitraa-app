'use client';

import React, { useEffect } from 'react';
import { useMitraa } from '@/context/MitraaContext';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { ExamControllerDashboard } from '@/components/dashboards/examController/ExamControllerDashboard';

export default function ExamControllerPage() {
  const { switchRole } = useMitraa();

  useEffect(() => {
    switchRole('exam_controller');
  }, []);

  return (
    <DashboardShell>
      <ExamControllerDashboard />
    </DashboardShell>
  );
}
