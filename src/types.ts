export type UserRole = 'guest' | 'client' | 'admin';

export interface ClientUser {
  id: string;
  name: string;
  email: string;
  company: string;
  projectTitle: string;
  avatar: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  category: 'web' | 'logistics';
  description: string;
  features: string[];
  icon: string;
  tagline: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  client: string;
  category: 'Web Development' | 'Logistics Software' | 'Enterprise Tech';
  description: string;
  metrics: string;
  techStack: string[];
  image: string;
  featured?: boolean;
}

export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  company: string;
  serviceType: 'custom_web' | 'logistics_tech' | 'enterprise_bundle' | 'other';
  budget: string;
  message: string;
  createdAt: string;
  status: 'new' | 'reviewed' | 'responded' | 'archived';
}

export interface ProjectMilestone {
  id: string;
  title: string;
  dueDate: string;
  status: 'completed' | 'in_progress' | 'upcoming';
  description: string;
}

export interface ClientProject {
  id: string;
  clientId: string;
  clientName: string;
  title: string;
  type: string;
  progress: number; // 0 - 100
  status: 'planning' | 'development' | 'testing' | 'deployed';
  startDate: string;
  targetCompletion: string;
  milestones: ProjectMilestone[];
  repositoryUrl?: string;
  stagingUrl?: string;
}

export interface PortalMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: 'admin' | 'client';
  clientId: string;
  text: string;
  timestamp: string;
  attachments?: string[];
}

export interface SharedFile {
  id: string;
  name: string;
  size: number; // in bytes
  type: string; // e.g. application/pdf, image/png, etc.
  category: 'Contract' | 'Spec' | 'Logistics Manifest' | 'Invoice' | 'Source Code' | 'General';
  uploadedBy: string;
  uploadedByRole: 'admin' | 'client';
  uploadedAt: string;
  clientId: string; // Target client ID or 'global'
  isEncrypted: boolean;
  downloadCount: number;
  dataUrl?: string; // Base64 data if uploaded via UI
}

export interface AuditLog {
  id: string;
  action: string;
  user: string;
  timestamp: string;
  details: string;
}
