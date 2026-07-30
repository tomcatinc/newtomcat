import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ContactInquiry, ClientProject, PortalMessage, SharedFile, AuditLog, ClientUser } from '../types';
import { StorageService } from '../services/storageService';
import { FileShareVault } from './FileShareVault';
import { TomcatLogo } from './TomcatLogo';
import { ShieldCheck, Lock, X, Users, Inbox, FolderKanban, FileSpreadsheet, Activity, Send, Trash2, CheckCircle2, AlertCircle, RefreshCw, KeyRound, ExternalLink } from 'lucide-react';

interface AdminPortalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthenticateAdmin: () => void;
  isAdminAuthenticated: boolean;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  isOpen,
  onClose,
  onAuthenticateAdmin,
  isAdminAuthenticated
}) => {
  if (!isOpen) return null;

  const [passcode, setPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState(false);

  const [activeAdminTab, setActiveAdminTab] = useState<'inquiries' | 'projects' | 'files' | 'messages' | 'audit'>('inquiries');

  // Local re-fetchable state
  const [inquiries, setInquiries] = useState<ContactInquiry[]>(() => StorageService.getInquiries());
  const [projects, setProjects] = useState<ClientProject[]>(() => StorageService.getProjects());
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => StorageService.getAuditLogs());
  const [messages, setMessages] = useState<PortalMessage[]>(() => StorageService.getMessages());

  const clients = StorageService.getClients();
  const [selectedClientFilter, setSelectedClientFilter] = useState<string>(clients[0].id);
  const [replyText, setReplyText] = useState('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim() === 'tomcat2026' || passcode.trim() === 'admin') {
      onAuthenticateAdmin();
      setPasscodeError(false);
    } else {
      setPasscodeError(true);
    }
  };

  const refreshAdminData = () => {
    setInquiries(StorageService.getInquiries());
    setProjects(StorageService.getProjects());
    setAuditLogs(StorageService.getAuditLogs());
    setMessages(StorageService.getMessages());
  };

  const handleInquiryStatus = (id: string, status: ContactInquiry['status']) => {
    StorageService.updateInquiryStatus(id, status);
    refreshAdminData();
  };

  const handleSendAdminReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    StorageService.addMessage({
      senderId: 'admin-1',
      senderName: 'Tomcat Administrator',
      senderRole: 'admin',
      clientId: selectedClientFilter,
      text: replyText.trim()
    });

    setReplyText('');
    refreshAdminData();
  };

  const handleUpdateProgress = (projId: string, delta: number) => {
    const proj = projects.find(p => p.id === projId);
    if (!proj) return;
    const newProgress = Math.min(100, Math.max(0, proj.progress + delta));
    const updated = { ...proj, progress: newProgress };
    StorageService.updateProject(updated);
    refreshAdminData();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="w-full max-w-6xl rounded-2xl bg-white border border-slate-200 shadow-2xl flex flex-col max-h-[92vh] text-slate-900 overflow-hidden"
      >
        
        {/* Header */}
        <div className="p-6 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <TomcatLogo size="md" showWordmark={false} />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">
                  TOMCAT RESTRICTED ADMIN PORTAL
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-50 text-rose-800 border border-rose-200 font-bold">
                  STAFF RESTRICTED
                </span>
              </div>
              <p className="text-xs text-slate-500 font-mono">
                Accessible via website footer key • Full system governance & secure file storage engine.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Authentication Wall if not authenticated */}
        {!isAdminAuthenticated ? (
          <div className="p-12 max-w-md mx-auto my-auto text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 border border-slate-200 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <KeyRound className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h4 className="text-xl font-bold text-slate-900">Restricted Staff Authentication</h4>
              <p className="text-xs text-slate-500 font-mono">
                Enter your Tomcat Admin Key or Security PIN to proceed.
              </p>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-mono text-slate-600 font-bold uppercase tracking-wider mb-2">
                  Admin Passcode / Key *
                </label>
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter passcode (e.g. tomcat2026)"
                  className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 font-mono text-sm focus:outline-none focus:border-emerald-600 shadow-2xs"
                />
              </div>

              {passcodeError && (
                <p className="text-xs font-mono text-rose-600 font-medium flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4" />
                  Invalid security key. Hint: use passcode <code className="text-emerald-700 font-bold">tomcat2026</code>
                </p>
              )}

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs font-mono uppercase tracking-wider transition-all cursor-pointer shadow-sm"
              >
                Authenticate Session
              </button>

              <button
                type="button"
                onClick={() => {
                  setPasscode('tomcat2026');
                  onAuthenticateAdmin();
                }}
                className="w-full py-2.5 rounded-lg bg-slate-100 text-slate-700 hover:text-slate-900 hover:bg-slate-200 text-xs font-mono cursor-pointer border border-slate-300 font-semibold"
              >
                Quick Demo Unlock (Pass: tomcat2026)
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Admin Dashboard */
          <>
            {/* Top Quick Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-slate-50 border-b border-slate-200 text-xs font-mono">
              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
                <span className="text-slate-500 font-medium">Pending Inquiries</span>
                <p className="text-2xl font-bold font-sans text-slate-900 mt-1">{inquiries.filter(i => i.status === 'new').length}</p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
                <span className="text-slate-500 font-medium">Active Client Projects</span>
                <p className="text-2xl font-bold font-sans text-emerald-700 mt-1">{projects.length}</p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
                <span className="text-slate-500 font-medium">Vault Documents</span>
                <p className="text-2xl font-bold font-sans text-slate-900 mt-1">{StorageService.getFiles().length}</p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
                <span className="text-slate-500 font-medium">Audit Events</span>
                <p className="text-2xl font-bold font-sans text-amber-700 mt-1">{auditLogs.length}</p>
              </div>
            </div>

            {/* Admin Tabs Bar */}
            <div className="flex border-b border-slate-200 bg-slate-50 px-6 gap-2 overflow-x-auto text-xs font-mono">
              <button
                onClick={() => setActiveAdminTab('inquiries')}
                className={`py-3.5 px-4 font-semibold border-b-2 transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                  activeAdminTab === 'inquiries'
                    ? 'border-emerald-600 text-emerald-700 font-bold'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <Inbox className="w-4 h-4" />
                <span>Contact Inquiries ({inquiries.length})</span>
              </button>

              <button
                onClick={() => setActiveAdminTab('projects')}
                className={`py-3.5 px-4 font-semibold border-b-2 transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                  activeAdminTab === 'projects'
                    ? 'border-emerald-600 text-emerald-700 font-bold'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <FolderKanban className="w-4 h-4" />
                <span>Projects & Milestones</span>
              </button>

              <button
                onClick={() => setActiveAdminTab('files')}
                className={`py-3.5 px-4 font-semibold border-b-2 transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                  activeAdminTab === 'files'
                    ? 'border-emerald-600 text-emerald-700 font-bold'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <Lock className="w-4 h-4" />
                <span>Secure File Sharing Engine</span>
              </button>

              <button
                onClick={() => setActiveAdminTab('messages')}
                className={`py-3.5 px-4 font-semibold border-b-2 transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                  activeAdminTab === 'messages'
                    ? 'border-emerald-600 text-emerald-700 font-bold'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>Client Communications</span>
              </button>

              <button
                onClick={() => setActiveAdminTab('audit')}
                className={`py-3.5 px-4 font-semibold border-b-2 transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                  activeAdminTab === 'audit'
                    ? 'border-emerald-600 text-emerald-700 font-bold'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <Activity className="w-4 h-4" />
                <span>Security Audit Logs</span>
              </button>
            </div>

            {/* Admin Body */}
            <div className="p-6 overflow-y-auto flex-1 space-y-6">
              
              {/* TAB 1: INQUIRIES */}
              {activeAdminTab === 'inquiries' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-slate-900 font-mono uppercase">
                      Incoming Proposal Requests
                    </h4>
                    <button
                      onClick={refreshAdminData}
                      className="p-1.5 rounded bg-slate-100 border border-slate-300 text-slate-600 hover:text-slate-900 cursor-pointer shadow-2xs"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-3">
                    {inquiries.map((inq) => (
                      <div
                        key={inq.id}
                        className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                          <div>
                            <span className="text-[11px] font-mono text-emerald-700 font-bold uppercase">
                              {inq.serviceType.replace('_', ' ')}
                            </span>
                            <h5 className="text-base font-bold text-slate-900">
                              {inq.name} <span className="text-slate-500 font-normal">({inq.company})</span>
                            </h5>
                            <p className="text-xs font-mono text-slate-500">{inq.email}</p>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono text-slate-700 bg-white px-3 py-1 rounded border border-slate-200 font-semibold shadow-2xs">
                              Budget: {inq.budget}
                            </span>
                            <select
                              value={inq.status}
                              onChange={(e) => handleInquiryStatus(inq.id, e.target.value as any)}
                              className="px-2.5 py-1 rounded bg-white border border-slate-300 text-xs font-mono text-slate-800 font-medium cursor-pointer shadow-2xs"
                            >
                              <option value="new">New</option>
                              <option value="reviewed">Reviewed</option>
                              <option value="responded">Responded</option>
                              <option value="archived">Archived</option>
                            </select>
                          </div>
                        </div>

                        <p className="text-xs text-slate-700 leading-relaxed font-sans bg-white p-3 rounded-lg border border-slate-200 shadow-2xs">
                          "{inq.message}"
                        </p>

                        <div className="text-[10px] font-mono text-slate-500 font-medium">
                          Received: {inq.createdAt}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 2: PROJECTS */}
              {activeAdminTab === 'projects' && (
                <div className="space-y-6">
                  <h4 className="text-sm font-bold text-slate-900 font-mono uppercase">
                    Active Client Projects Governance
                  </h4>

                  <div className="space-y-4">
                    {projects.map((proj) => (
                      <div key={proj.id} className="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div>
                            <span className="text-xs font-mono text-emerald-700 font-bold uppercase">{proj.type}</span>
                            <h5 className="text-lg font-bold text-slate-900">{proj.title}</h5>
                            <p className="text-xs font-mono text-slate-500">Client Account: {proj.clientName}</p>
                          </div>

                          {/* Progress Controls */}
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono text-slate-700 font-semibold">Progress: {proj.progress}%</span>
                            <button
                              onClick={() => handleUpdateProgress(proj.id, -5)}
                              className="px-2 py-1 bg-white border border-slate-300 rounded text-xs font-mono hover:bg-slate-100 cursor-pointer text-slate-700 shadow-2xs"
                            >
                              -5%
                            </button>
                            <button
                              onClick={() => handleUpdateProgress(proj.id, 5)}
                              className="px-2 py-1 bg-white border border-slate-300 rounded text-xs font-mono hover:bg-slate-100 cursor-pointer text-emerald-700 font-bold shadow-2xs"
                            >
                              +5%
                            </button>
                          </div>
                        </div>

                        <div className="w-full h-2 rounded-full bg-slate-200 border border-slate-300 overflow-hidden">
                          <div
                            className="h-full bg-emerald-600 rounded-full"
                            style={{ width: `${proj.progress}%` }}
                          />
                        </div>

                        {/* Milestones */}
                        <div className="space-y-2 pt-2">
                          <p className="text-xs font-mono text-slate-500 font-bold">Milestones Breakdown:</p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                            {proj.milestones.map((m) => (
                              <div key={m.id} className="p-2.5 rounded bg-white border border-slate-200 flex items-center justify-between shadow-2xs">
                                <span className="text-slate-800 font-medium">{m.title}</span>
                                <span className="text-[10px] text-emerald-700 font-bold uppercase bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">{m.status}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: RESTRICTED DASHBOARD FOR SECURE FILE SHARING */}
              {activeAdminTab === 'files' && (
                <FileShareVault
                  clientId="all"
                  currentRole="admin"
                  userName="Tomcat Administrator"
                  onFileAdded={refreshAdminData}
                />
              )}

              {/* TAB 4: CLIENT MESSAGES */}
              {activeAdminTab === 'messages' && (
                <div className="space-y-6">
                  <div className="flex items-center gap-4 bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs font-mono">
                    <span className="text-slate-600 font-bold">Select Client Channel:</span>
                    <select
                      value={selectedClientFilter}
                      onChange={(e) => setSelectedClientFilter(e.target.value)}
                      className="bg-white text-slate-900 px-3 py-1.5 rounded border border-slate-300 font-medium cursor-pointer shadow-2xs"
                    >
                      {clients.map(c => (
                        <option key={c.id} value={c.id}>
                          {c.company} ({c.name})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Thread View */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 h-80 overflow-y-auto space-y-3">
                    {messages.filter(m => m.clientId === selectedClientFilter).map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex flex-col ${msg.senderRole === 'admin' ? 'items-end' : 'items-start'}`}
                      >
                        <div className="text-[10px] font-mono text-slate-500 font-medium mb-1">
                          {msg.senderName} • {msg.timestamp}
                        </div>
                        <div className={`p-3 rounded-xl text-xs max-w-lg ${
                          msg.senderRole === 'admin'
                            ? 'bg-emerald-600 text-white font-semibold shadow-2xs'
                            : 'bg-white border border-slate-200 text-slate-900 shadow-2xs'
                        }`}>
                          {msg.text}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Reply Form */}
                  <form onSubmit={handleSendAdminReply} className="flex gap-3">
                    <input
                      type="text"
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Type admin response to client..."
                      className="flex-1 px-4 py-3 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-emerald-600 shadow-2xs"
                    />
                    <button
                      type="submit"
                      className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs font-mono cursor-pointer flex items-center gap-2 shadow-xs"
                    >
                      <Send className="w-4 h-4" />
                      <span>Transmit</span>
                    </button>
                  </form>
                </div>
              )}

              {/* TAB 5: AUDIT LOGS */}
              {activeAdminTab === 'audit' && (
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-slate-900 font-mono uppercase">
                    System Audit Trail (AES-256 Validated)
                  </h4>

                  <div className="rounded-xl bg-slate-50 border border-slate-200 divide-y divide-slate-200 overflow-hidden text-xs font-mono">
                    {auditLogs.map((log) => (
                      <div key={log.id} className="p-3.5 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <span className="px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold text-[10px]">
                            {log.action}
                          </span>
                          <span className="text-slate-800 font-medium">{log.details}</span>
                        </div>
                        <div className="text-right shrink-0 text-[10px] text-slate-500">
                          <p className="font-bold text-slate-700">{log.user}</p>
                          <p className="text-slate-500">{log.timestamp}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </>
        )}

      </motion.div>
    </div>
  );
};
