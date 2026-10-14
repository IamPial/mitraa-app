import { UserRole } from '@/types/mitraa';

export interface RoleTheme {
  id: UserRole;
  label: string;
  chartPillColor: string;
  chartPillTextColor: string;
  chartCardBg: string;
  chartBorder: string;
  accentText: string;
  sidebarActiveBg: string;
  sidebarActiveText: string;
  sidebarGlow: string;
  bannerGradient: string;
  bannerBorder: string;
  buttonPrimary: string;
  buttonOutlineHover: string;
  badge: {
    bg: string;
    text: string;
    border: string;
  };
  chipColor: 'default' | 'accent' | 'danger' | 'success' | 'warning';
}

/**
 * Color system matching the MiTRAA-Edu Full Frontend Flow Chart:
 * 1. Student Dashboard: Mint / Forest Emerald Green (#15803d)
 * 2. Teacher Dashboard: Royal Purple / Violet (#7e22ce)
 * 3. Parent / Guardian Dashboard: Rose / Magenta Pink (#be185d)
 * 4. Principal / HOD Dashboard: Terracotta / Burnt Orange (#c2410c)
 * 5. Management / Trustee Dashboard: Warm Golden Yellow / Amber (#ca8a04)
 * 6. Exam Controller Dashboard: Deep Crimson / Ruby Red (#991b1b)
 */
export const roleThemes: Record<UserRole, RoleTheme> = {
  student: {
    id: 'student',
    label: 'Student',
    chartPillColor: 'bg-emerald-600 dark:bg-emerald-700',
    chartPillTextColor: 'text-white',
    chartCardBg: 'bg-emerald-500/10 dark:bg-emerald-950/20',
    chartBorder: 'border-emerald-500/30',
    accentText: 'text-emerald-400',
    sidebarActiveBg: 'bg-emerald-600',
    sidebarActiveText: 'text-white',
    sidebarGlow: 'shadow-emerald-600/30',
    bannerGradient: 'from-emerald-950/80 via-teal-950/40 to-slate-900',
    bannerBorder: 'border-emerald-500/30',
    buttonPrimary: 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/25',
    buttonOutlineHover: 'border-emerald-500/40 hover:bg-emerald-500/10 text-emerald-300',
    badge: {
      bg: 'bg-emerald-500/15',
      text: 'text-emerald-300',
      border: 'border-emerald-500/30',
    },
    chipColor: 'success',
  },
  teacher: {
    id: 'teacher',
    label: 'Teacher / Staff',
    chartPillColor: 'bg-purple-700 dark:bg-purple-800',
    chartPillTextColor: 'text-white',
    chartCardBg: 'bg-purple-500/10 dark:bg-purple-950/20',
    chartBorder: 'border-purple-500/30',
    accentText: 'text-purple-400',
    sidebarActiveBg: 'bg-purple-600',
    sidebarActiveText: 'text-white',
    sidebarGlow: 'shadow-purple-600/30',
    bannerGradient: 'from-purple-950/80 via-violet-950/40 to-slate-900',
    bannerBorder: 'border-purple-500/30',
    buttonPrimary: 'bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-600/25',
    buttonOutlineHover: 'border-purple-500/40 hover:bg-purple-500/10 text-purple-300',
    badge: {
      bg: 'bg-purple-500/15',
      text: 'text-purple-300',
      border: 'border-purple-500/30',
    },
    chipColor: 'accent',
  },
  parent: {
    id: 'parent',
    label: 'Parent / Guardian',
    chartPillColor: 'bg-pink-700 dark:bg-pink-800',
    chartPillTextColor: 'text-white',
    chartCardBg: 'bg-pink-500/10 dark:bg-pink-950/20',
    chartBorder: 'border-pink-500/30',
    accentText: 'text-pink-400',
    sidebarActiveBg: 'bg-pink-600',
    sidebarActiveText: 'text-white',
    sidebarGlow: 'shadow-pink-600/30',
    bannerGradient: 'from-pink-950/80 via-rose-950/40 to-slate-900',
    bannerBorder: 'border-pink-500/30',
    buttonPrimary: 'bg-pink-600 hover:bg-pink-500 text-white shadow-lg shadow-pink-600/25',
    buttonOutlineHover: 'border-pink-500/40 hover:bg-pink-500/10 text-pink-300',
    badge: {
      bg: 'bg-pink-500/15',
      text: 'text-pink-300',
      border: 'border-pink-500/30',
    },
    chipColor: 'danger',
  },
  principal: {
    id: 'principal',
    label: 'Principal / HOD',
    chartPillColor: 'bg-orange-700 dark:bg-orange-800',
    chartPillTextColor: 'text-white',
    chartCardBg: 'bg-orange-500/10 dark:bg-orange-950/20',
    chartBorder: 'border-orange-500/30',
    accentText: 'text-orange-400',
    sidebarActiveBg: 'bg-orange-600',
    sidebarActiveText: 'text-white',
    sidebarGlow: 'shadow-orange-600/30',
    bannerGradient: 'from-orange-950/80 via-amber-950/40 to-slate-900',
    bannerBorder: 'border-orange-500/30',
    buttonPrimary: 'bg-orange-600 hover:bg-orange-500 text-white shadow-lg shadow-orange-600/25',
    buttonOutlineHover: 'border-orange-500/40 hover:bg-orange-500/10 text-orange-300',
    badge: {
      bg: 'bg-orange-500/15',
      text: 'text-orange-300',
      border: 'border-orange-500/30',
    },
    chipColor: 'warning',
  },
  management: {
    id: 'management',
    label: 'Management / Trustee',
    chartPillColor: 'bg-amber-600 dark:bg-amber-700',
    chartPillTextColor: 'text-slate-950 font-bold',
    chartCardBg: 'bg-amber-500/10 dark:bg-amber-950/20',
    chartBorder: 'border-amber-500/30',
    accentText: 'text-amber-400',
    sidebarActiveBg: 'bg-amber-500',
    sidebarActiveText: 'text-slate-950 font-bold',
    sidebarGlow: 'shadow-amber-500/30',
    bannerGradient: 'from-amber-950/80 via-yellow-950/40 to-slate-900',
    bannerBorder: 'border-amber-500/30',
    buttonPrimary: 'bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold shadow-lg shadow-amber-500/25',
    buttonOutlineHover: 'border-amber-500/40 hover:bg-amber-500/10 text-amber-300',
    badge: {
      bg: 'bg-amber-500/15',
      text: 'text-amber-300',
      border: 'border-amber-500/30',
    },
    chipColor: 'warning',
  },
  exam_controller: {
    id: 'exam_controller',
    label: 'Exam Controller (Phase 2)',
    chartPillColor: 'bg-red-800 dark:bg-red-900',
    chartPillTextColor: 'text-white',
    chartCardBg: 'bg-red-500/10 dark:bg-red-950/20',
    chartBorder: 'border-red-500/30',
    accentText: 'text-red-400',
    sidebarActiveBg: 'bg-red-700',
    sidebarActiveText: 'text-white',
    sidebarGlow: 'shadow-red-700/30',
    bannerGradient: 'from-red-950/80 via-rose-950/40 to-slate-900',
    bannerBorder: 'border-red-500/30',
    buttonPrimary: 'bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/25',
    buttonOutlineHover: 'border-red-500/40 hover:bg-red-500/10 text-red-300',
    badge: {
      bg: 'bg-red-500/15',
      text: 'text-red-300',
      border: 'border-red-500/30',
    },
    chipColor: 'danger',
  },
};

/**
 * Key End-to-End Flow Themes:
 * - Assignment Flow: Blue
 * - Internal Exam Flow: Navy / Deep Blue
 * - PracticePod Flow: Emerald Green
 * - Parent-Teacher Communication: Rose Pink
 * - Complaint / Grievance: Coral Orange
 */
export const flowThemes = {
  assignment: {
    name: 'Assignment Flow',
    roles: 'Teacher → Student → Parent',
    headerBg: 'bg-blue-600',
    headerText: 'text-white',
    stepBg: 'bg-blue-500/10 border-blue-500/30 text-blue-200',
    stepActive: 'bg-blue-600 text-white',
    accent: 'text-blue-400',
  },
  exam: {
    name: 'Internal Exam Flow',
    roles: 'Teacher → Student → Parent',
    headerBg: 'bg-indigo-700',
    headerText: 'text-white',
    stepBg: 'bg-indigo-500/10 border-indigo-500/30 text-indigo-200',
    stepActive: 'bg-indigo-600 text-white',
    accent: 'text-indigo-400',
  },
  practice_pod: {
    name: 'PracticePod Flow',
    roles: 'Student Self-Practice',
    headerBg: 'bg-emerald-600',
    headerText: 'text-white',
    stepBg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200',
    stepActive: 'bg-emerald-600 text-white',
    accent: 'text-emerald-400',
  },
  communication: {
    name: 'Parent-Teacher Communication Flow',
    roles: 'Parent ↔ Teacher PTM & Query',
    headerBg: 'bg-pink-600',
    headerText: 'text-white',
    stepBg: 'bg-pink-500/10 border-pink-500/30 text-pink-200',
    stepActive: 'bg-pink-600 text-white',
    accent: 'text-pink-400',
  },
  grievance: {
    name: 'Complaint / Grievance Flow',
    roles: 'Student / Parent / Staff Escalation',
    headerBg: 'bg-orange-600',
    headerText: 'text-white',
    stepBg: 'bg-orange-500/10 border-orange-500/30 text-orange-200',
    stepActive: 'bg-orange-600 text-white',
    accent: 'text-orange-400',
  },
};
