import { ContactInquiry, ClientProject, SharedFile, PortalMessage, AuditLog, ClientUser, UserRole } from '../types';
import { INITIAL_INQUIRIES, INITIAL_PROJECTS, INITIAL_FILES, INITIAL_MESSAGES, INITIAL_AUDIT_LOGS, INITIAL_CLIENTS } from '../data/initialData';

const STORAGE_KEYS = {
  INQUIRIES: 'tomcat_inquiries_v1',
  PROJECTS: 'tomcat_projects_v1',
  FILES: 'tomcat_files_v1',
  MESSAGES: 'tomcat_messages_v1',
  AUDIT_LOGS: 'tomcat_audit_logs_v1',
  AUTH: 'tomcat_auth_state_v1'
};

function getItem<T>(key: string, fallback: T): T {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch (e) {
    console.warn(`Error reading ${key} from localStorage:`, e);
    return fallback;
  }
}

function setItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn(`Error saving ${key} to localStorage:`, e);
  }
}

export const StorageService = {
  // Inquiries
  getInquiries(): ContactInquiry[] {
    return getItem(STORAGE_KEYS.INQUIRIES, INITIAL_INQUIRIES);
  },
  addInquiry(inquiry: Omit<ContactInquiry, 'id' | 'createdAt' | 'status'>): ContactInquiry {
    const current = this.getInquiries();
    const newInquiry: ContactInquiry = {
      ...inquiry,
      id: `inq-${Date.now()}`,
      createdAt: new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' }),
      status: 'new'
    };
    const updated = [newInquiry, ...current];
    setItem(STORAGE_KEYS.INQUIRIES, updated);
    this.addAuditLog('NEW_INQUIRY', inquiry.name, `New quote request from ${inquiry.company} (${inquiry.serviceType})`);
    return newInquiry;
  },
  updateInquiryStatus(id: string, status: ContactInquiry['status']): void {
    const current = this.getInquiries();
    const updated = current.map(item => item.id === id ? { ...item, status } : item);
    setItem(STORAGE_KEYS.INQUIRIES, updated);
  },

  // Projects
  getProjects(): ClientProject[] {
    return getItem(STORAGE_KEYS.PROJECTS, INITIAL_PROJECTS);
  },
  updateProject(project: ClientProject): void {
    const current = this.getProjects();
    const updated = current.map(p => p.id === project.id ? project : p);
    setItem(STORAGE_KEYS.PROJECTS, updated);
  },

  // Files & Secure Vault
  getFiles(): SharedFile[] {
    return getItem(STORAGE_KEYS.FILES, INITIAL_FILES);
  },
  addFile(fileData: Omit<SharedFile, 'id' | 'uploadedAt' | 'downloadCount'>): SharedFile {
    const current = this.getFiles();
    const newFile: SharedFile = {
      ...fileData,
      id: `file-${Date.now()}`,
      uploadedAt: new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' }),
      downloadCount: 0
    };
    const updated = [newFile, ...current];
    setItem(STORAGE_KEYS.FILES, updated);
    this.addAuditLog('FILE_UPLOAD', fileData.uploadedBy, `Uploaded ${fileData.name} (${(fileData.size / 1024 / 1024).toFixed(2)} MB) to client ${fileData.clientId}`);
    return newFile;
  },
  deleteFile(fileId: string, userName: string): void {
    const current = this.getFiles();
    const target = current.find(f => f.id === fileId);
    const updated = current.filter(f => f.id !== fileId);
    setItem(STORAGE_KEYS.FILES, updated);
    if (target) {
      this.addAuditLog('FILE_DELETE', userName, `Deleted file: ${target.name}`);
    }
  },
  incrementDownloadCount(fileId: string, userName: string): void {
    const current = this.getFiles();
    let fileName = '';
    const updated = current.map(f => {
      if (f.id === fileId) {
        fileName = f.name;
        return { ...f, downloadCount: f.downloadCount + 1 };
      }
      return f;
    });
    setItem(STORAGE_KEYS.FILES, updated);
    this.addAuditLog('FILE_DOWNLOAD', userName, `Downloaded file: ${fileName}`);
  },

  // Messages / Client Chat
  getMessages(): PortalMessage[] {
    return getItem(STORAGE_KEYS.MESSAGES, INITIAL_MESSAGES);
  },
  addMessage(msg: Omit<PortalMessage, 'id' | 'timestamp'>): PortalMessage {
    const current = this.getMessages();
    const newMsg: PortalMessage = {
      ...msg,
      id: `msg-${Date.now()}`,
      timestamp: new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })
    };
    const updated = [...current, newMsg];
    setItem(STORAGE_KEYS.MESSAGES, updated);
    return newMsg;
  },

  // Audit Logs
  getAuditLogs(): AuditLog[] {
    return getItem(STORAGE_KEYS.AUDIT_LOGS, INITIAL_AUDIT_LOGS);
  },
  addAuditLog(action: string, user: string, details: string): void {
    const current = this.getAuditLogs();
    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      action,
      user,
      timestamp: new Date().toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'medium' }),
      details
    };
    setItem(STORAGE_KEYS.AUDIT_LOGS, [newLog, ...current.slice(0, 49)]); // keep last 50
  },

  // Clients
  getClients(): ClientUser[] {
    return INITIAL_CLIENTS;
  },

  // Auth State
  getAuthState(): { role: UserRole; clientUser?: ClientUser } {
    return getItem(STORAGE_KEYS.AUTH, { role: 'guest' });
  },
  setAuthState(state: { role: UserRole; clientUser?: ClientUser }): void {
    setItem(STORAGE_KEYS.AUTH, state);
  }
};
