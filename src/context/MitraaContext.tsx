'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserRole,
  UserProfile,
  Child,
  Assignment,
  Exam,
  Notice,
  AcademicDoubtMessage,
  PTMMeeting,
  GrievanceTicket,
  FeeItem,
  CampusMetric,
} from '../types/mitraa';
import {
  mockUsers,
  mockChildren,
  mockAssignments,
  mockExams,
  mockNotices,
  mockDoubts,
  mockPTMs,
  mockGrievances,
  mockFees,
  mockCampuses,
} from '../data/mockData';

export type AuthStep = 'landing' | 'select_role' | 'login' | 'otp' | 'authenticated';
export type WorkflowType = 'assignment' | 'exam' | 'practice_pod' | 'communication' | 'grievance' | null;

interface MitraaContextType {
  authStep: AuthStep;
  setAuthStep: (step: AuthStep) => void;
  selectedRoleForLogin: UserRole | null;
  setSelectedRoleForLogin: (role: UserRole | null) => void;
  currentRole: UserRole;
  currentUser: UserProfile;
  activeChild: Child;
  setActiveChild: (child: Child) => void;
  activeCampus: CampusMetric;
  setActiveCampus: (campus: CampusMetric) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  
  // Accessibility & Localization
  fontSize: 'normal' | 'large' | 'xlarge';
  setFontSize: (size: 'normal' | 'large' | 'xlarge') => void;
  highContrast: boolean;
  setHighContrast: (enabled: boolean) => void;
  language: string;
  setLanguage: (lang: string) => void;

  // Active Modals & Overlays
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isNotificationsOpen: boolean;
  setIsNotificationsOpen: (open: boolean) => void;
  isAccessibilityOpen: boolean;
  setIsAccessibilityOpen: (open: boolean) => void;
  isHelpOpen: boolean;
  setIsHelpOpen: (open: boolean) => void;
  activeWorkflowModal: WorkflowType;
  setActiveWorkflowModal: (wf: WorkflowType) => void;

  // Business entities
  assignments: Assignment[];
  exams: Exam[];
  notices: Notice[];
  doubts: AcademicDoubtMessage[];
  ptmList: PTMMeeting[];
  grievances: GrievanceTicket[];
  fees: FeeItem[];
  campuses: CampusMetric[];

  // Actions
  switchRole: (role: UserRole) => void;
  completeLogin: (rememberMe?: boolean) => void;
  verifyOtp: (otp: string) => boolean;
  logout: () => void;
  submitAssignment: (assignmentId: string, answerText: string) => void;
  gradeAssignment: (assignmentId: string, marks: number, feedback: string) => void;
  submitExamAttempt: (examId: string, answers: Record<string, number>) => number;
  publishExamResults: (examId: string) => void;
  askDoubt: (teacher: string, subject: string, query: string) => void;
  replyDoubt: (doubtId: string, reply: string) => void;
  bookPTM: (teacher: string, subject: string, date: string, mode: 'Online (Video)' | 'In-Person (Room 204)') => void;
  updatePTMActionPlan: (ptmId: string, plan: string, dueDate: string) => void;
  createGrievance: (title: string, category: GrievanceTicket['category'], description: string) => GrievanceTicket;
  resolveGrievance: (id: string, resolutionNote: string) => void;
  reopenGrievance: (id: string, reason: string) => void;
  acknowledgeNotice: (id: string) => void;
  publishNotice: (title: string, content: string, category: Notice['category'], targetAudience: Notice['targetAudience']) => void;
  payFee: (feeId: string) => void;
}

const MitraaContext = createContext<MitraaContextType | undefined>(undefined);

export const MitraaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Start on authenticated dashboard for frictionless viewing, or allow landing journey
  const [authStep, setAuthStep] = useState<AuthStep>('authenticated');
  const [selectedRoleForLogin, setSelectedRoleForLogin] = useState<UserRole | null>('student');
  const [currentRole, setCurrentRole] = useState<UserRole>('student');
  
  const [activeChild, setActiveChild] = useState<Child>(mockChildren[0]);
  const [activeCampus, setActiveCampus] = useState<CampusMetric>(mockCampuses[0]);
  const [activeTab, setActiveTab] = useState<string>('home');

  // Accessibility & Localization
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [highContrast, setHighContrast] = useState<boolean>(false);
  const [language, setLanguage] = useState<string>('English');

  // UI Modals
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isAccessibilityOpen, setIsAccessibilityOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [activeWorkflowModal, setActiveWorkflowModal] = useState<WorkflowType>(null);

  // Live Data State
  const [assignments, setAssignments] = useState<Assignment[]>(mockAssignments);
  const [exams, setExams] = useState<Exam[]>(mockExams);
  const [notices, setNotices] = useState<Notice[]>(mockNotices);
  const [doubts, setDoubts] = useState<AcademicDoubtMessage[]>(mockDoubts);
  const [ptmList, setPtmList] = useState<PTMMeeting[]>(mockPTMs);
  const [grievances, setGrievances] = useState<GrievanceTicket[]>(mockGrievances);
  const [fees, setFees] = useState<FeeItem[]>(mockFees);
  const [campuses] = useState<CampusMetric[]>(mockCampuses);

  const currentUser = mockUsers[currentRole] || mockUsers['student'];

  // Switch role handler: resets tab to 'home' and synchronizes user
  const switchRole = (role: UserRole) => {
    setCurrentRole(role);
    setActiveTab('home');
  };

  const completeLogin = () => {
    if (selectedRoleForLogin) {
      setCurrentRole(selectedRoleForLogin);
    }
    setAuthStep('otp');
  };

  const verifyOtp = (otp: string): boolean => {
    if (otp.length === 6) {
      setAuthStep('authenticated');
      setActiveTab('home');
      return true;
    }
    return false;
  };

  const logout = () => {
    setAuthStep('landing');
    setSelectedRoleForLogin(null);
  };

  const submitAssignment = (assignmentId: string, answerText: string) => {
    setAssignments(prev =>
      prev.map(a =>
        a.id === assignmentId
          ? {
              ...a,
              status: 'submitted',
              submissionDate: new Date().toISOString().split('T')[0],
              studentAnswer: answerText,
            }
          : a
      )
    );
  };

  const gradeAssignment = (assignmentId: string, marks: number, feedback: string) => {
    setAssignments(prev =>
      prev.map(a =>
        a.id === assignmentId
          ? {
              ...a,
              status: 'graded',
              obtainedMarks: marks,
              feedback,
            }
          : a
      )
    );
  };

  const submitExamAttempt = (examId: string, answers: Record<string, number>): number => {
    const exam = exams.find(e => e.id === examId);
    if (!exam) return 0;

    let score = 0;
    exam.questions.forEach((q, idx) => {
      if (answers[q.id] === q.correctIndex) {
        score += q.marks;
      }
    });

    const percentage = Math.round((score / exam.totalMarks) * 100);
    const grade = percentage >= 90 ? 'A+' : percentage >= 80 ? 'A' : percentage >= 70 ? 'B+' : percentage >= 50 ? 'B' : 'C';

    setExams(prev =>
      prev.map(e =>
        e.id === examId
          ? {
              ...e,
              status: 'evaluated',
              obtainedMarks: score,
              scorePercentage: percentage,
              grade,
              resultsReleased: false,
            }
          : e
      )
    );

    return score;
  };

  const publishExamResults = (examId: string) => {
    setExams(prev =>
      prev.map(e =>
        e.id === examId
          ? {
              ...e,
              status: 'published',
              resultsReleased: true,
              approvedBy: 'Dr. Vikramaditya Rao (Principal)',
            }
          : e
      )
    );
  };

  const askDoubt = (teacher: string, subject: string, query: string) => {
    const newDoubt: AcademicDoubtMessage = {
      id: `dbt_${Date.now()}`,
      studentName: currentUser.name,
      teacherName: teacher,
      subject,
      query,
      status: 'Open',
      timestamp: 'Just now',
    };
    setDoubts(prev => [newDoubt, ...prev]);
  };

  const replyDoubt = (doubtId: string, reply: string) => {
    setDoubts(prev =>
      prev.map(d =>
        d.id === doubtId
          ? {
              ...d,
              reply,
              status: 'Resolved',
            }
          : d
      )
    );
  };

  const bookPTM = (teacher: string, subject: string, date: string, mode: 'Online (Video)' | 'In-Person (Room 204)') => {
    const newPTM: PTMMeeting = {
      id: `ptm_${Date.now()}`,
      teacherName: teacher,
      parentName: currentUser.name,
      studentName: activeChild.name,
      subject,
      dateTime: date,
      mode,
      status: 'Requested',
    };
    setPtmList(prev => [newPTM, ...prev]);
  };

  const updatePTMActionPlan = (ptmId: string, plan: string, dueDate: string) => {
    setPtmList(prev =>
      prev.map(p =>
        p.id === ptmId
          ? {
              ...p,
              actionPlan: plan,
              actionPlanDueDate: dueDate,
              status: 'Completed',
            }
          : p
      )
    );
  };

  const createGrievance = (title: string, category: GrievanceTicket['category'], description: string): GrievanceTicket => {
    const id = `GRV-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newTicket: GrievanceTicket = {
      id,
      title,
      description,
      category,
      submittedBy: `${currentUser.name} (${currentRole.toUpperCase()})`,
      userRole: currentRole,
      createdAt: new Date().toLocaleString(),
      status: 'Assigned',
      assignedOwner: category === 'Transport' ? 'Capt. Gurpreet Singh (Transport Logistics)' : category === 'Academic' ? 'Academic Dean Office' : 'Operations Desk',
      slaHoursRemaining: 24,
      timeline: [
        {
          status: 'Submitted',
          timestamp: new Date().toLocaleTimeString(),
          actor: currentUser.name,
          note: 'Ticket registered into institutional queue',
        },
        {
          status: 'Assigned',
          timestamp: new Date().toLocaleTimeString(),
          actor: 'SLA Router',
          note: 'Assigned under 24-hr resolution agreement',
        },
      ],
    };

    setGrievances(prev => [newTicket, ...prev]);
    return newTicket;
  };

  const resolveGrievance = (id: string, resolutionNote: string) => {
    setGrievances(prev =>
      prev.map(g =>
        g.id === id
          ? {
              ...g,
              status: 'Resolved',
              slaHoursRemaining: 0,
              resolutionSummary: resolutionNote,
              timeline: [
                ...g.timeline,
                {
                  status: 'Resolved',
                  timestamp: new Date().toLocaleTimeString(),
                  actor: currentUser.name,
                  note: resolutionNote,
                },
              ],
            }
          : g
      )
    );
  };

  const reopenGrievance = (id: string, reason: string) => {
    setGrievances(prev =>
      prev.map(g =>
        g.id === id
          ? {
              ...g,
              status: 'Reopened',
              slaHoursRemaining: 12,
              timeline: [
                ...g.timeline,
                {
                  status: 'Reopened',
                  timestamp: new Date().toLocaleTimeString(),
                  actor: currentUser.name,
                  note: `Reopened: ${reason}`,
                },
              ],
            }
          : g
      )
    );
  };

  const acknowledgeNotice = (id: string) => {
    setNotices(prev =>
      prev.map(n =>
        n.id === id
          ? {
              ...n,
              acknowledgedByParent: true,
            }
          : n
      )
    );
  };

  const publishNotice = (
    title: string,
    content: string,
    category: Notice['category'],
    targetAudience: Notice['targetAudience']
  ) => {
    const newNotice: Notice = {
      id: `not_${Date.now()}`,
      title,
      content,
      category,
      targetAudience,
      date: new Date().toISOString().split('T')[0],
      publishedBy: `${currentUser.name} (${currentUser.role})`,
      isImportant: true,
      acknowledgedByParent: false,
    };
    setNotices(prev => [newNotice, ...prev]);
  };

  const payFee = (feeId: string) => {
    setFees(prev =>
      prev.map(f =>
        f.id === feeId
          ? {
              ...f,
              status: 'Paid',
              receiptNo: `RCPT-2026-${Math.floor(10000 + Math.random() * 90000)}`,
            }
          : f
      )
    );
  };

  return (
    <MitraaContext.Provider
      value={{
        authStep,
        setAuthStep,
        selectedRoleForLogin,
        setSelectedRoleForLogin,
        currentRole,
        currentUser,
        activeChild,
        setActiveChild,
        activeCampus,
        setActiveCampus,
        activeTab,
        setActiveTab,
        fontSize,
        setFontSize,
        highContrast,
        setHighContrast,
        language,
        setLanguage,
        isSearchOpen,
        setIsSearchOpen,
        isNotificationsOpen,
        setIsNotificationsOpen,
        isAccessibilityOpen,
        setIsAccessibilityOpen,
        isHelpOpen,
        setIsHelpOpen,
        activeWorkflowModal,
        setActiveWorkflowModal,
        assignments,
        exams,
        notices,
        doubts,
        ptmList,
        grievances,
        fees,
        campuses,
        switchRole,
        completeLogin,
        verifyOtp,
        logout,
        submitAssignment,
        gradeAssignment,
        submitExamAttempt,
        publishExamResults,
        askDoubt,
        replyDoubt,
        bookPTM,
        updatePTMActionPlan,
        createGrievance,
        resolveGrievance,
        reopenGrievance,
        acknowledgeNotice,
        publishNotice,
        payFee,
      }}
    >
      {children}
    </MitraaContext.Provider>
  );
};

export const useMitraa = () => {
  const context = useContext(MitraaContext);
  if (!context) {
    throw new Error('useMitraa must be used within a MitraaProvider');
  }
  return context;
};
