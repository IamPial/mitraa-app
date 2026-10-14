'use client';

import React from 'react';
import { useMitraa } from '@/context/MitraaContext';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { MobileNav } from './MobileNav';
import { RoleSwitcherBar } from '@/components/common/RoleSwitcherBar';
import { GlobalSearchModal } from '@/components/common/GlobalSearchModal';
import { NotificationsDrawer } from '@/components/common/NotificationsDrawer';
import { AccessibilityDrawer } from '@/components/common/AccessibilityDrawer';
import { HelpSupportModal } from '@/components/common/HelpSupportModal';
import { AssignmentWorkflowModal } from '@/components/workflows/AssignmentWorkflowModal';
import { InternalExamWorkflowModal } from '@/components/workflows/InternalExamWorkflowModal';
import { PracticePodWorkflowModal } from '@/components/workflows/PracticePodWorkflowModal';
import { CommunicationWorkflowModal } from '@/components/workflows/CommunicationWorkflowModal';
import { GrievanceWorkflowModal } from '@/components/workflows/GrievanceWorkflowModal';

export const DashboardShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { fontSize, highContrast } = useMitraa();

  const accessibilityClasses = [
    fontSize === 'large' ? 'font-size-large' : '',
    fontSize === 'xlarge' ? 'font-size-xlarge' : '',
    highContrast ? 'high-contrast-mode' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={`min-h-screen bg-slate-950 text-slate-100 flex flex-col ${accessibilityClasses}`}>
      {/* Top Navbar */}
      <Navbar />

      {/* Main Workspace with Role-Specific Navigation & Views */}
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />

        <main className="flex-1 overflow-y-auto p-4 lg:p-8 pb-28 md:pb-24">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Navigation */}
      <MobileNav />

      {/* Sticky Role Switcher & Workflow Trigger Bar */}
      <RoleSwitcherBar />

      {/* Common Modals & Drawers */}
      <GlobalSearchModal />
      <NotificationsDrawer />
      <AccessibilityDrawer />
      <HelpSupportModal />

      {/* 5 Core Interactive Workflow Simulators */}
      <AssignmentWorkflowModal />
      <InternalExamWorkflowModal />
      <PracticePodWorkflowModal />
      <CommunicationWorkflowModal />
      <GrievanceWorkflowModal />
    </div>
  );
};
