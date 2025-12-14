export type ApplicationStatus = 'applied' | 'oa' | 'interview' | 'offer' | 'rejected';

export interface Application {
  id: string;
  user_id: string;
  company_name: string;
  role: string;
  location: string | null;
  source: string | null;
  status: ApplicationStatus;
  applied_date: string;
  follow_up_date: string | null;
  notes: string | null;
  salary_range: string | null;
  job_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface ApplicationFormData {
  company_name: string;
  role: string;
  location?: string;
  source?: string;
  status: ApplicationStatus;
  applied_date: string;
  follow_up_date?: string;
  notes?: string;
  salary_range?: string;
  job_url?: string;
}

export const STATUS_CONFIG: Record<ApplicationStatus, { label: string; color: string; bgClass: string }> = {
  applied: { label: 'Applied', color: 'hsl(var(--status-applied))', bgClass: 'status-applied' },
  oa: { label: 'OA', color: 'hsl(var(--status-oa))', bgClass: 'status-oa' },
  interview: { label: 'Interview', color: 'hsl(var(--status-interview))', bgClass: 'status-interview' },
  offer: { label: 'Offer', color: 'hsl(var(--status-offer))', bgClass: 'status-offer' },
  rejected: { label: 'Rejected', color: 'hsl(var(--status-rejected))', bgClass: 'status-rejected' },
};

export const STATUSES: ApplicationStatus[] = ['applied', 'oa', 'interview', 'offer', 'rejected'];
