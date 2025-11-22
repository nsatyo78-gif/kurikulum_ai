
export enum StaffRole {
  TEACHER = 'Guru',
  ADMIN = 'Admin',
  HEAD_OF_PROGRAM = 'Kaprodi'
}

export enum ReportStatus {
  PENDING = 'Belum Dikumpulkan',
  SUBMITTED = 'Sudah Dikumpulkan',
  VERIFIED = 'Terverifikasi',
  REJECTED = 'Ditolak'
}

export type DutyType = 
  | 'KepalaSekolah'
  | 'WaliKelas' 
  | 'GuruWali' 
  | 'Waka' 
  | 'Kakomli'
  | 'Staf'
  | 'Koordinator'
  | 'PembinaEkskul' 
  | 'KoordinatorKokurikuler'
  | 'KepalaLab'
  | 'Bendahara'
  | 'TimPengembang'
  | 'WMM'
  | 'Lainnya';

export type EmployeeStatus = 'PNS' | 'PPPK' | 'Guru Tamu' | 'GTT' | 'Guru Kontrak';

export interface AdditionalDuty {
  type: DutyType;
  description: string; // e.g., "X RPL 1" or "Pramuka"
  equivalentHours: number;
}

export interface Teacher {
  id: string;
  name: string;
  nip: string;
  status: EmployeeStatus; // New field for employment status
  subjects: string[];
  maxHours: number;
  teachingHours: number; // Real teaching hours (Tatap Muka)
  additionalDuties: AdditionalDuty[]; // New field for duties
}

export interface ScheduleSlot {
  id: string;
  day: string;
  period: number;
  className: string;
  subject: string;
  teacherId: string;
}

export interface PKLAssignment {
  id: string;
  studentName: string;
  companyName: string;
  teacherId: string; // Supervisor
  startDate: string;
  endDate: string;
  status: 'Active' | 'Completed' | 'Pending';
}

export interface Report {
  id: string;
  teacherId: string;
  title: string;
  dueDate: string;
  status: ReportStatus;
  submissionLink?: string;
}

export interface GeneratedScheduleItem {
  day: string;
  period: number;
  className: string;
  subject: string;
  teacherName: string;
}

export interface CurriculumItem {
  name: string;
  intra: number | string;
  p5: number | string;
  total: number | string;
  isHeader?: boolean;
  isTotal?: boolean;
}

export interface CurriculumSection {
  title: string;
  items: CurriculumItem[];
  subTotal?: CurriculumItem;
}
