'use client';

import React from 'react';
import { MitraaProvider, useMitraa } from '@/context/MitraaContext';
import { WelcomeLanding } from '@/components/auth/WelcomeLanding';
import { RoleSelectorModal } from '@/components/auth/RoleSelectorModal';
import { LoginModal } from '@/components/auth/LoginModal';
import { TwoFactorModal } from '@/components/auth/TwoFactorModal';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { MobileNav } from '@/components/layout/MobileNav';
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
import { StudentDashboard } from '@/components/dashboards/student/StudentDashboard';
import { TeacherDashboard } from '@/components/dashboards/teacher/TeacherDashboard';
import { ParentDashboard } from '@/components/dashboards/parent/ParentDashboard';
import { PrincipalDashboard } from '@/components/dashboards/principal/PrincipalDashboard';
import { ManagementDashboard } from '@/components/dashboards/management/ManagementDashboard';
import { ExamControllerDashboard } from '@/components/dashboards/examController/ExamControllerDashboard';

const AppContent: React.FC = () => {
  const { authStep, currentRole, fontSize, highContrast } = useMitraa();

  // Accessibility class generation
  const accessibilityClasses = [
    fontSize === 'large' ? 'font-size-large' : '',
    fontSize === 'xlarge' ? 'font-size-xlarge' : '',
    highContrast ? 'high-contrast-mode' : '',
  ]
    .filter(Boolean)
    .join(' ');

  // Render Authentication Steps
  if (authStep === 'landing') {
    return (
      <div className={accessibilityClasses}>
        <WelcomeLanding />
      </div>
    );
  }

  if (authStep === 'select_role') {
    return (
      <div className={accessibilityClasses}>
        <WelcomeLanding />
        <RoleSelectorModal />
      </div>
    );
  }

  if (authStep === 'login') {
    return (
      <div className={accessibilityClasses}>
        <WelcomeLanding />
        <LoginModal />
      </div>
    );
  }

  if (authStep === 'otp') {
    return (
      <div className={accessibilityClasses}>
        <WelcomeLanding />
        <TwoFactorModal />
      </div>
    );
  }

  // Render Authenticated Application Shell
  return (
    <div className={`min-h-screen bg-slate-950 text-slate-100 flex flex-col ${accessibilityClasses}`}>
      {/* Top Navbar */}
      <Navbar />

      {/* Main Workspace with Role-Specific Navigation & Views */}
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />

        <main className="flex-1 overflow-y-auto p-4 lg:p-8 pb-28 md:pb-24">
          <div className="max-w-7xl mx-auto">
            {currentRole === 'student' && <StudentDashboard />}
            {currentRole === 'teacher' && <TeacherDashboard />}
            {currentRole === 'parent' && <ParentDashboard />}
            {currentRole === 'principal' && <PrincipalDashboard />}
            {currentRole === 'management' && <ManagementDashboard />}
            {currentRole === 'exam_controller' && <ExamControllerDashboard />}
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

export default function Home() {
  return (
    <MitraaProvider>
      <AppContent />
    </MitraaProvider>
  );
}
