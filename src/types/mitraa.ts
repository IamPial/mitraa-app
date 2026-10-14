export type UserRole = 
  | 'student' 
  | 'teacher' 
  | 'parent' 
  | 'principal' 
  | 'management' 
  | 'exam_controller';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  tenantName: string;
  campusName: string;
  className?: string;
  section?: string;
  admissionNo?: string;
  employeeId?: string;
}

export interface Child {
  id: string;
  name: string;
  grade: string;
  section: string;
  rollNo: string;
  avatar: string;
  attendanceRate: number;
  overallGpa: string;
  unreadNotices: number;
  pendingAssignments: number;
}

export interface TimetableSlot {
  id: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';
  time: string;
  subject: string;
  teacher: string;
  room: string;
  color: string;
}

export interface Assignment {
  id: string;
  title: string;
  subject: string;
  className: string;
  dueDate: string;
  description: string;
  totalMarks: number;
  status: 'pending' | 'submitted' | 'graded';
  allowResubmission: boolean;
  submissionDate?: string;
  studentAnswer?: string;
  obtainedMarks?: number;
  feedback?: string;
  rubricCriteria?: string[];
}

export interface ExamQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  marks: number;
}

export interface Exam {
  id: string;
  title: string;
  subject: string;
  className: string;
  date: string;
  durationMinutes: number;
  totalMarks: number;
  passingMarks: number;
  status: 'scheduled' | 'live' | 'evaluated' | 'approved' | 'published';
  questions: ExamQuestion[];
  obtainedMarks?: number;
  scorePercentage?: number;
  grade?: string;
  studentRank?: number;
  approvedBy?: string;
  resultsReleased: boolean;
}

export interface PracticeQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  category: 'Academic' | 'Exam' | 'General' | 'Event' | 'Emergency';
  targetAudience: ('Student' | 'Teacher' | 'Parent' | 'All')[];
  date: string;
  publishedBy: string;
  isImportant?: boolean;
  acknowledgedByParent?: boolean;
}

export interface AcademicDoubtMessage {
  id: string;
  studentName: string;
  teacherName: string;
  subject: string;
  query: string;
  reply?: string;
  status: 'Open' | 'Resolved';
  timestamp: string;
}

export interface PTMMeeting {
  id: string;
  teacherName: string;
  parentName: string;
  studentName: string;
  subject: string;
  dateTime: string;
  mode: 'Online (Video)' | 'In-Person (Room 204)';
  status: 'Requested' | 'Confirmed' | 'Completed';
  meetingNotes?: string;
  actionPlan?: string;
  actionPlanDueDate?: string;
}

export interface GrievanceTicket {
  id: string;
  title: string;
  description: string;
  category: 'Academic' | 'Transport' | 'Facilities' | 'Billing' | 'Staff';
  submittedBy: string;
  userRole: UserRole;
  createdAt: string;
  status: 'New' | 'Assigned' | 'In Progress' | 'Resolved' | 'Reopened';
  assignedOwner: string;
  slaHoursRemaining: number;
  resolutionSummary?: string;
  timeline: {
    status: string;
    timestamp: string;
    actor: string;
    note: string;
  }[];
}

export interface FeeItem {
  id: string;
  term: string;
  dueDate: string;
  amount: number;
  status: 'Paid' | 'Upcoming' | 'Overdue';
  breakdown: { item: string; cost: number }[];
  receiptNo?: string;
}

export interface LearningGap {
  subject: string;
  topic: string;
  masteryPercentage: number;
  recommendedAction: string;
  priority: 'High' | 'Medium' | 'Low';
}

export interface StudyDownload {
  id: string;
  title: string;
  subject: string;
  grade: string;
  fileSize: string;
  fileType: string;
  uploadDate: string;
  downloadUrl: string;
}

export interface CampusMetric {
  campusId: string;
  campusName: string;
  location: string;
  totalStudents: number;
  totalTeachers: number;
  averageAttendanceRate: number;
  averageExamScore: number;
  revenueCollected: number;
  outstandingDues: number;
}
