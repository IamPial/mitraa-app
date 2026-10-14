'use client';

import React, { useState } from 'react';
import { useMitraa } from '@/context/MitraaContext';
import { Button, Chip } from '@heroui/react';
import {
  Home,
  Calendar,
  FileText,
  BookOpen,
  GraduationCap,
  TrendingUp,
  Bell,
  MessageSquare,
  Users,
  Download,
  Settings,
  ClipboardCheck,
  HelpCircle,
  Shield,
  Layers,
  CreditCard,
  FileQuestion,
  CheckCircle,
  FileCheck,
  AlertTriangle,
  Building,
  DollarSign,
  Lock,
  ChevronLeft,
  ChevronRight,
  Database,
  Printer,
  Sparkles,
} from 'lucide-react';

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: string;
  isPhase2?: boolean;
}

export const Sidebar: React.FC = () => {
  const { currentRole, activeTab, setActiveTab, activeChild } = useMitraa();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Menus exact to flowchart and PDF section 5
  const studentMenu: MenuItem[] = [
    { id: 'home', label: 'Home (Overview)', icon: <Home className="w-4 h-4" /> },
    { id: 'timetable', label: 'My Classes & Timetable', icon: <Calendar className="w-4 h-4" /> },
    { id: 'assignments', label: 'Assignments', icon: <FileText className="w-4 h-4" />, badge: '1 Due' },
    { id: 'examinations', label: 'Examinations', icon: <BookOpen className="w-4 h-4" />, badge: 'Upcoming' },
    { id: 'practice_pod', label: 'PracticePod', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'performance', label: 'My Performance', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'notices', label: 'Notices', icon: <Bell className="w-4 h-4" /> },
    { id: 'messages', label: 'Messages (Academic Doubt)', icon: <MessageSquare className="w-4 h-4" />, badge: '1 Reply' },
    { id: 'ptm', label: 'PTM / Meetings (View)', icon: <Users className="w-4 h-4" /> },
    { id: 'downloads', label: 'Downloads (Study Material)', icon: <Download className="w-4 h-4" /> },
    { id: 'profile', label: 'My Profile & Settings', icon: <Settings className="w-4 h-4" /> },
  ];

  const teacherMenu: MenuItem[] = [
    { id: 'home', label: 'Home (Overview)', icon: <Home className="w-4 h-4" /> },
    { id: 'timetable', label: 'My Classes & Timetable', icon: <Calendar className="w-4 h-4" /> },
    { id: 'attendance', label: 'Attendance', icon: <ClipboardCheck className="w-4 h-4" /> },
    { id: 'assignments', label: 'Assignment Engine', icon: <FileText className="w-4 h-4" />, badge: 'Queue' },
    { id: 'question_bank', label: 'Question Bank', icon: <Database className="w-4 h-4" /> },
    { id: 'examinations', label: 'Examinations', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'student_support', label: 'Student Support', icon: <HelpCircle className="w-4 h-4" />, badge: 'Gaps' },
    { id: 'parent_communication', label: 'Parent Communication', icon: <Users className="w-4 h-4" /> },
    { id: 'notices', label: 'Notices', icon: <Bell className="w-4 h-4" /> },
    { id: 'reports', label: 'Reports & Analytics', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'profile', label: 'My Profile & Settings', icon: <Settings className="w-4 h-4" /> },
  ];

  const parentMenu: MenuItem[] = [
    { id: 'home', label: 'Home (Child Overview)', icon: <Home className="w-4 h-4" /> },
    { id: 'my_children', label: 'My Child(ren)', icon: <Users className="w-4 h-4" /> },
    { id: 'attendance', label: 'Attendance', icon: <ClipboardCheck className="w-4 h-4" /> },
    { id: 'assignments', label: 'Assignments', icon: <FileText className="w-4 h-4" />, badge: '1 New' },
    { id: 'examinations', label: 'Examinations', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'practice_pod', label: 'PracticePod', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'progress_reports', label: 'Progress & Reports', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'communication', label: 'Communication', icon: <MessageSquare className="w-4 h-4" /> },
    { id: 'ptm', label: 'PTM / Meetings', icon: <Users className="w-4 h-4" /> },
    { id: 'notices', label: 'Notices', icon: <Bell className="w-4 h-4" />, badge: 'Ack' },
    { id: 'fees', label: 'Fees & Payments', icon: <CreditCard className="w-4 h-4" />, badge: 'Due' },
    { id: 'requests', label: 'Requests', icon: <FileQuestion className="w-4 h-4" /> },
    { id: 'profile', label: 'My Profile & Settings', icon: <Settings className="w-4 h-4" /> },
  ];

  const principalMenu: MenuItem[] = [
    { id: 'home', label: 'Home (Academic Overview)', icon: <Home className="w-4 h-4" /> },
    { id: 'academic_coverage', label: 'Academic Coverage', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'staff_management', label: 'Staff Management', icon: <Users className="w-4 h-4" /> },
    { id: 'attendance_overview', label: 'Attendance Overview', icon: <ClipboardCheck className="w-4 h-4" /> },
    { id: 'examinations', label: 'Examinations', icon: <CheckCircle className="w-4 h-4" />, badge: 'Approve' },
    { id: 'student_performance', label: 'Student Performance', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'parent_engagement', label: 'Parent Engagement', icon: <MessageSquare className="w-4 h-4" /> },
    { id: 'grievances', label: 'Grievances / Complaints', icon: <AlertTriangle className="w-4 h-4" />, badge: 'SLA' },
    { id: 'notices', label: 'Notices (Publish)', icon: <Bell className="w-4 h-4" /> },
    { id: 'reports', label: 'Reports & Dashboards', icon: <Layers className="w-4 h-4" /> },
    { id: 'approvals', label: 'Approvals', icon: <FileCheck className="w-4 h-4" />, badge: '3' },
    { id: 'profile', label: 'My Profile & Settings', icon: <Settings className="w-4 h-4" /> },
  ];

  const managementMenu: MenuItem[] = [
    { id: 'home', label: 'Home (Institution Overview)', icon: <Home className="w-4 h-4" /> },
    { id: 'multiple_campus', label: 'Multiple Campus View', icon: <Building className="w-4 h-4" /> },
    { id: 'academic_reports', label: 'Academic Reports', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'operational_reports', label: 'Operational Reports', icon: <Layers className="w-4 h-4" /> },
    { id: 'financial_management', label: 'Financial Management', icon: <DollarSign className="w-4 h-4" /> },
    { id: 'policy_approvals', label: 'Policy & Approvals', icon: <FileCheck className="w-4 h-4" /> },
    { id: 'grievance_overview', label: 'Grievance Overview', icon: <AlertTriangle className="w-4 h-4" /> },
    { id: 'audit_compliance', label: 'Audit & Compliance', icon: <Shield className="w-4 h-4" /> },
    { id: 'notices', label: 'Notices', icon: <Bell className="w-4 h-4" /> },
    { id: 'reports_analytics', label: 'Reports & Analytics', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'profile', label: 'My Profile & Settings', icon: <Settings className="w-4 h-4" /> },
  ];

  const examControllerMenu: MenuItem[] = [
    { id: 'home', label: 'Home (Exam Overview)', icon: <Home className="w-4 h-4" /> },
    { id: 'exam_programme', label: 'Exam Programme', icon: <Calendar className="w-4 h-4" /> },
    { id: 'question_bank', label: 'Question Bank', icon: <Database className="w-4 h-4" /> },
    { id: 'paper_assembly', label: 'Paper Assembly & Lock', icon: <Lock className="w-4 h-4" /> },
    { id: 'centre_management', label: 'Centre Management', icon: <Building className="w-4 h-4" /> },
    { id: 'exam_day_ops', label: 'Exam Day Operations', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'evaluation_moderation', label: 'Evaluation & Moderation', icon: <FileCheck className="w-4 h-4" /> },
    { id: 'results', label: 'Results & Appeals', icon: <CheckCircle className="w-4 h-4" /> },
    { id: 'audit_logs', label: 'Audit Logs (Traceability)', icon: <Shield className="w-4 h-4" /> },
    { id: 'reports', label: 'Reports & Exceptions', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'profile', label: 'My Profile & Settings', icon: <Settings className="w-4 h-4" /> },
  ];

  const getMenu = () => {
    switch (currentRole) {
      case 'student': return studentMenu;
      case 'teacher': return teacherMenu;
      case 'parent': return parentMenu;
      case 'principal': return principalMenu;
      case 'management': return managementMenu;
      case 'exam_controller': return examControllerMenu;
      default: return studentMenu;
    }
  };

  const menu = getMenu();

  return (
    <aside
      className={`hidden md:flex flex-col justify-between border-r border-slate-800 bg-slate-900/95 transition-all duration-200 z-20 shrink-0 ${
        isCollapsed ? 'w-18' : 'w-64'
      }`}
    >
      <div className="flex flex-col flex-1 overflow-y-auto py-3 px-2">
        {/* Child Context Pill if Parent */}
        {currentRole === 'parent' && !isCollapsed && (
          <div className="mb-3 p-2.5 rounded-xl bg-pink-500/10 border border-pink-500/20 text-xs">
            <Chip size="sm" variant="flat" color="danger" className="text-[9px] uppercase font-bold h-4 px-1 mb-1">
              Child Context
            </Chip>
            <div className="font-semibold text-white mt-0.5">{activeChild.name}</div>
            <div className="text-[10px] text-slate-400">{activeChild.grade} • Sec {activeChild.section}</div>
          </div>
        )}

        {/* Phase 2 Tag if Exam Controller */}
        {currentRole === 'exam_controller' && !isCollapsed && (
          <div className="mb-3 p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs">
            <Chip size="sm" variant="flat" color="danger" className="text-[9px] uppercase font-bold h-4 px-1 mb-1">
              Rollout State
            </Chip>
            <div className="font-semibold text-rose-200 mt-0.5">Phase 2 Module</div>
            <div className="text-[10px] text-rose-300/80">Separate gated access per spec</div>
          </div>
        )}

        {/* Navigation Items */}
        <nav className="space-y-1">
          {menu.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition group ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/80'
                }`}
                title={isCollapsed ? item.label : undefined}
              >
                <div className={`${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`}>
                  {item.icon}
                </div>
                {!isCollapsed && (
                  <div className="flex-1 text-left flex items-center justify-between">
                    <span className="truncate">{item.label}</span>
                    {item.badge && (
                      <Chip
                        size="sm"
                        variant={isActive ? 'solid' : 'flat'}
                        color="primary"
                        className="text-[9px] font-bold h-4 min-h-0 px-1"
                      >
                        {item.badge}
                      </Chip>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Collapse Toggle with HeroUI Button */}
      <div className="p-2 border-t border-slate-800 flex justify-end">
        <Button
          isIconOnly
          size="sm"
          variant="light"
          className="text-slate-400 hover:text-white"
          onPress={() => setIsCollapsed(!isCollapsed)}
          aria-label={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </Button>
      </div>
    </aside>
  );
};
