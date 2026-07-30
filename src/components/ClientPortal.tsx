import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ClientUser, ClientProject, PortalMessage, UserRole } from '../types';
import { StorageService } from '../services/storageService';
import { FileShareVault } from './FileShareVault';
import { TomcatLogo } from './TomcatLogo';
import { Lock, X, MessageSquare, FileText, CheckCircle2, Clock, Send, ShieldCheck, UserCheck, ExternalLink, Activity, ArrowRight } from 'lucide-react';

interface ClientPortalProps {
  isOpen: boolean;
  onClose: () => void;
  currentRole: UserRole;
  clientUser?: ClientUser;
  onSelectClient: (client: ClientUser) => void;
}

export const ClientPortal: React.FC<ClientPortalProps> = ({
  isOpen,
  onClose,
  currentRole,
  clientUser,
  onSelectClient
}) => {
  if (!isOpen) return null;

  const availableClients = StorageService.getClients();
  const activeClient = clientUser || availableClients[0];

  const [activeTab, setActiveTab] = useState<'overview' | 'messages' | 'vault' | 'invoices'>('overview');
  
  // Projects & Messages state
  const projects = StorageService.getProjects().filter(p => p.clientId === activeClient.id);
  const activeProject = projects[0] || StorageService.getProjects()[0];

  const [messages, setMessages] = useState<PortalMessage[]>(() => 
    StorageService.getMessages().filter(m => m.clientId === activeClient.id)
  );

  const [newMessageText, setNewMessageText] = useState('');

  const refreshMessages = () => {
    setMessages(StorageService.getMessages().filter(m => m.clientId === activeClient.id));
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessageText.trim()) return;

    StorageService.addMessage({
      senderId: activeClient.id,
      senderName: `${activeClient.name} (${activeClient.company.split(' ')[0]})`,
      senderRole: 'client',
      clientId: activeClient.id,
      text: newMessageText.trim()
    });

    setNewMessageText('');
    refreshMessages();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="w-full max-w-5xl rounded-2xl bg-white border border-slate-200 shadow-2xl flex flex-col max-h-[90vh] text-slate-900 overflow-hidden"
      >
        
        {/* Header Bar */}
        <div className="p-6 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <TomcatLogo size="md" showWordmark={false} />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-slate-900">TOMCAT SECURE CLIENT PORTAL</h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold">
                  CLIENT ACCESS
                </span>
              </div>
              <p className="text-xs text-slate-500 font-mono">
                Project: <span className="text-slate-900 font-bold">{activeProject?.title || 'Custom Web Engineering'}</span>
              </p>
            </div>
          </div>

          {/* Client Selector & Close */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-white p-1.5 rounded-lg border border-slate-300 text-xs font-mono shadow-2xs">
              <UserCheck className="w-4 h-4 text-emerald-600" />
              <select
                value={activeClient.id}
                onChange={(e) => {
                  const selected = availableClients.find(c => c.id === e.target.value);
                  if (selected) {
                    onSelectClient(selected);
                    setMessages(StorageService.getMessages().filter(m => m.clientId === selected.id));
                  }
                }}
                className="bg-transparent text-slate-800 font-semibold focus:outline-none cursor-pointer"
              >
                {availableClients.map(c => (
                  <option key={c.id} value={c.id} className="bg-white text-slate-900">
                    {c.company} ({c.name})
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 gap-2 overflow-x-auto text-xs font-mono">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3.5 px-4 font-semibold border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'overview'
                ? 'border-emerald-600 text-emerald-700 font-bold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Project Overview & Milestones
          </button>
          <button
            onClick={() => setActiveTab('messages')}
            className={`py-3.5 px-4 font-semibold border-b-2 transition-colors cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'messages'
                ? 'border-emerald-600 text-emerald-700 font-bold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Encrypted Messaging</span>
            {messages.length > 0 && (
              <span className="w-4 h-4 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center">
                {messages.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('vault')}
            className={`py-3.5 px-4 font-semibold border-b-2 transition-colors cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'vault'
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Document Sharing Vault</span>
          </button>
          <button
            onClick={() => setActiveTab('invoices')}
            className={`py-3.5 px-4 font-semibold border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'invoices'
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Statements & Billing
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && activeProject && (
            <div className="space-y-6">
              
              {/* Progress Summary Header */}
              <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-xs font-mono text-emerald-700 font-bold uppercase tracking-wider">
                      {activeProject.type}
                    </span>
                    <h4 className="text-xl font-bold text-slate-900 mt-0.5">{activeProject.title}</h4>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 font-mono text-xs font-bold uppercase">
                      Status: {activeProject.status}
                    </span>
                    {activeProject.stagingUrl && (
                      <a
                        href={activeProject.stagingUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-white text-xs font-mono text-slate-700 hover:text-slate-900 border border-slate-200 font-semibold shadow-2xs"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-emerald-600" />
                        Staging Preview
                      </a>
                    )}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2 pt-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-600 font-medium">Total Engineering Completion</span>
                    <span className="font-bold text-emerald-700">{activeProject.progress}%</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-slate-200 overflow-hidden border border-slate-300">
                    <div
                      className="h-full bg-emerald-600 rounded-full transition-all duration-500"
                      style={{ width: `${activeProject.progress}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 text-xs font-mono text-slate-600 border-t border-slate-200">
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-500">Kickoff Date</p>
                    <p className="font-semibold text-slate-900 mt-0.5">{activeProject.startDate}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-500">Target Rollout</p>
                    <p className="font-semibold text-slate-900 mt-0.5">{activeProject.targetCompletion}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-500">Lead Architect</p>
                    <p className="font-semibold text-slate-900 mt-0.5">Tomcat Systems Team</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-500">Encryption Layer</p>
                    <p className="font-semibold text-emerald-700 mt-0.5">AES-256 Vault</p>
                  </div>
                </div>
              </div>

              {/* Milestones List */}
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-slate-900 font-mono uppercase tracking-wider">
                  Project Deliverables & Milestones
                </h4>

                <div className="space-y-3">
                  {activeProject.milestones.map((m) => (
                    <div
                      key={m.id}
                      className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start justify-between gap-4"
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5">
                          {m.status === 'completed' ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                          ) : m.status === 'in_progress' ? (
                            <Activity className="w-5 h-5 text-amber-600 animate-pulse" />
                          ) : (
                            <Clock className="w-5 h-5 text-slate-400" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900">{m.title}</p>
                          <p className="text-xs text-slate-600 mt-1">{m.description}</p>
                        </div>
                      </div>

                      <div className="text-right shrink-0 font-mono text-xs">
                        <span className={`px-2.5 py-1 rounded text-[11px] font-bold uppercase ${
                          m.status === 'completed'
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            : m.status === 'in_progress'
                            ? 'bg-amber-50 text-amber-800 border border-amber-200'
                            : 'bg-slate-100 text-slate-600 border border-slate-200'
                        }`}>
                          {m.status.replace('_', ' ')}
                        </span>
                        <p className="text-[10px] text-slate-500 mt-1.5 font-medium">Due: {m.dueDate}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: MESSAGING */}
          {activeTab === 'messages' && (
            <div className="space-y-4 flex flex-col h-[500px]">
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between text-xs font-mono font-semibold">
                <span className="text-slate-700">Direct Communication Line — Tomcat Lead Engineers</span>
                <span className="text-emerald-700 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  STATION ONLINE
                </span>
              </div>

              {/* Chat Thread */}
              <div className="flex-1 overflow-y-auto p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
                {messages.length === 0 ? (
                  <p className="text-center text-slate-500 text-xs font-mono py-12">
                    No messages in this thread yet. Send a query below to connect with Tomcat architects.
                  </p>
                ) : (
                  messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${msg.senderRole === 'client' ? 'items-end' : 'items-start'}`}
                    >
                      <div className="flex items-center gap-2 mb-1 text-[11px] font-mono text-slate-500 font-medium">
                        <span>{msg.senderName}</span>
                        <span>•</span>
                        <span>{msg.timestamp}</span>
                      </div>
                      <div className={`p-3.5 rounded-2xl max-w-lg text-xs leading-relaxed ${
                        msg.senderRole === 'client'
                          ? 'bg-emerald-600 text-white font-medium rounded-tr-none shadow-2xs'
                          : 'bg-white border border-slate-200 text-slate-900 rounded-tl-none shadow-2xs'
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Input Box */}
              <form onSubmit={handleSendMessage} className="flex gap-3">
                <input
                  type="text"
                  value={newMessageText}
                  onChange={(e) => setNewMessageText(e.target.value)}
                  placeholder="Type secure message to Tomcat engineering..."
                  className="flex-1 px-4 py-3 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-emerald-600 shadow-2xs"
                />
                <button
                  type="submit"
                  className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs font-mono inline-flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  <Send className="w-4 h-4" />
                  <span>Send</span>
                </button>
              </form>
            </div>
          )}

          {/* TAB 3: FILE SHARING VAULT */}
          {activeTab === 'vault' && (
            <FileShareVault
              clientId={activeClient.id}
              currentRole="client"
              userName={activeClient.name}
            />
          )}

          {/* TAB 4: INVOICES & STATEMENTS */}
          {activeTab === 'invoices' && (
            <div className="space-y-6">
              <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
                <h4 className="text-sm font-bold text-slate-900 font-mono uppercase tracking-wider">
                  Contract Statements & Milestones Billing
                </h4>
                
                <div className="divide-y divide-slate-200 border-t border-slate-200">
                  <div className="py-4 flex items-center justify-between text-xs font-mono">
                    <div>
                      <p className="font-bold text-slate-900">Milestone 1: Project Kickoff & Architecture Spec</p>
                      <p className="text-slate-500 mt-0.5">Invoice #INV-2026-081 • Paid via Wire</p>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-emerald-700 text-sm">$12,500.00</span>
                      <p className="text-[10px] text-emerald-800 font-bold uppercase mt-0.5 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 inline-block">PAID</p>
                    </div>
                  </div>

                  <div className="py-4 flex items-center justify-between text-xs font-mono">
                    <div>
                      <p className="font-bold text-slate-900">Milestone 2: Secure Document Vault & Telematics Integration</p>
                      <p className="text-slate-500 mt-0.5">Invoice #INV-2026-094 • Due upon acceptance</p>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-slate-900 text-sm">$15,000.00</span>
                      <p className="text-[10px] text-amber-800 font-bold uppercase mt-0.5 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 inline-block">PENDING VERIFICATION</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

      </motion.div>
    </div>
  );
};
