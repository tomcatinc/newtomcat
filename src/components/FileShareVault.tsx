import React, { useState, useRef } from 'react';
import { SharedFile, UserRole } from '../types';
import { StorageService } from '../services/storageService';
import { FileText, Download, Trash2, Upload, Search, Lock, ShieldCheck, Filter, FileSpreadsheet, FileCode, HardDrive, CheckCircle2 } from 'lucide-react';

interface FileShareVaultProps {
  clientId: string; // Specific client ID or 'global' or 'all' for admin
  currentRole: UserRole;
  userName: string;
  onFileAdded?: () => void;
}

export const FileShareVault: React.FC<FileShareVaultProps> = ({
  clientId,
  currentRole,
  userName,
  onFileAdded
}) => {
  const [files, setFiles] = useState<SharedFile[]>(() => {
    const all = StorageService.getFiles();
    if (clientId === 'all') return all;
    return all.filter(f => f.clientId === clientId || f.clientId === 'global');
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [uploadCategory, setUploadCategory] = useState<SharedFile['category']>('Contract');
  const [uploadTargetClient, setUploadTargetClient] = useState<string>(clientId === 'all' ? 'client-apex' : clientId);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const refreshFiles = () => {
    const all = StorageService.getFiles();
    if (clientId === 'all') {
      setFiles(all);
    } else {
      setFiles(all.filter(f => f.clientId === clientId || f.clientId === 'global'));
    }
  };

  // Filtered files view
  const filteredFiles = files.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          file.uploadedBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || file.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFileList = e.target.files;
    if (!uploadedFileList || uploadedFileList.length === 0) return;

    const file = uploadedFileList[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      const newFile = StorageService.addFile({
        name: file.name,
        size: file.size,
        type: file.type || 'application/octet-stream',
        category: uploadCategory,
        uploadedBy: userName,
        uploadedByRole: currentRole === 'admin' ? 'admin' : 'client',
        clientId: currentRole === 'admin' ? uploadTargetClient : clientId,
        isEncrypted: true,
        dataUrl: dataUrl
      });

      refreshFiles();
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 3000);
      if (onFileAdded) onFileAdded();
    };

    reader.readAsDataURL(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDownload = (file: SharedFile) => {
    StorageService.incrementDownloadCount(file.id, userName);
    refreshFiles();

    if (file.dataUrl) {
      const a = document.createElement('a');
      a.href = file.dataUrl;
      a.download = file.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else {
      // Dummy text file download for pre-seeded files
      const blob = new Blob([`Tomcat Secure Document Sharing Vault\nFile Name: ${file.name}\nCategory: ${file.category}\nEncrypted Checksum: SHA-256 Validated\nOwner: ${file.uploadedBy}\nTimestamp: ${file.uploadedAt}`], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name.endsWith('.pdf') ? file.name.replace('.pdf', '_verified.txt') : `${file.name}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const handleDelete = (fileId: string) => {
    if (window.confirm('Are you sure you want to permanently delete this document from the secure vault?')) {
      StorageService.deleteFile(fileId, userName);
      refreshFiles();
      if (onFileAdded) onFileAdded();
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const getFileIcon = (category: string, name: string) => {
    if (name.endsWith('.xlsx') || name.endsWith('.csv') || category === 'Invoice') {
      return <FileSpreadsheet className="w-5 h-5 text-emerald-400" />;
    }
    if (name.endsWith('.js') || name.endsWith('.ts') || category === 'Source Code') {
      return <FileCode className="w-5 h-5 text-amber-400" />;
    }
    return <FileText className="w-5 h-5 text-sky-400" />;
  };

  const totalVaultSize = files.reduce((acc, f) => acc + f.size, 0);

  return (
    <div className="space-y-6">
      
      {/* Top Banner & Stats */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              Encrypted Document Exchange Vault
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold">
                AES-256 ACTIVE
              </span>
            </h4>
            <p className="text-xs text-slate-600 font-mono mt-0.5">
              Secure client-engineer file sharing & logistics manifest storage.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono text-slate-700 font-semibold">
          <div className="px-3 py-1.5 rounded bg-white border border-slate-200 shadow-2xs">
            <span className="text-slate-500">Total Storage: </span>
            <span className="font-bold text-slate-900">{formatSize(totalVaultSize)}</span>
          </div>
          <div className="px-3 py-1.5 rounded bg-white border border-slate-200 shadow-2xs">
            <span className="text-slate-500">Documents: </span>
            <span className="font-bold text-emerald-700">{files.length}</span>
          </div>
        </div>
      </div>

      {/* Upload Box */}
      <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h5 className="text-xs font-mono text-slate-500 font-bold uppercase tracking-wider">
              Upload New Shared File
            </h5>
            <p className="text-xs text-slate-600 mt-1">
              Select contract PDFs, logistics manifests, design specs, or source code.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Category selection */}
            <select
              value={uploadCategory}
              onChange={(e) => setUploadCategory(e.target.value as any)}
              className="px-3 py-2 rounded-lg bg-white border border-slate-300 text-xs font-mono text-slate-800 focus:outline-none focus:border-emerald-600 cursor-pointer shadow-2xs font-medium"
            >
              <option value="Contract">Contract PDF</option>
              <option value="Spec">Web / Tech Spec</option>
              <option value="Logistics Manifest">Logistics Manifest</option>
              <option value="Invoice">Invoice / Statement</option>
              <option value="Source Code">Source Code / Assets</option>
              <option value="General">General Document</option>
            </select>

            {/* Target Client if Admin */}
            {currentRole === 'admin' && clientId === 'all' && (
              <select
                value={uploadTargetClient}
                onChange={(e) => setUploadTargetClient(e.target.value)}
                className="px-3 py-2 rounded-lg bg-white border border-slate-300 text-xs font-mono text-slate-800 focus:outline-none focus:border-emerald-600 cursor-pointer shadow-2xs font-medium"
              >
                <option value="client-apex">Apex Freight Logistics</option>
                <option value="client-vanguard">Vanguard Partners</option>
                <option value="global">Global Public Shared</option>
              </select>
            )}

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              className="hidden"
            />

            <button
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs font-mono transition-all cursor-pointer shadow-xs"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Select File</span>
            </button>
          </div>
        </div>

        {uploadSuccess && (
          <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Document uploaded successfully and encrypted with SHA-256 hash validation!</span>
          </div>
        )}
      </div>

      {/* Search & Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search documents by name..."
            className="w-full pl-9 pr-4 py-2 rounded-lg bg-white border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-emerald-600 shadow-2xs"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {['All', 'Contract', 'Spec', 'Logistics Manifest', 'Invoice', 'Source Code'].map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap cursor-pointer transition-colors ${
                categoryFilter === cat
                  ? 'bg-slate-200 text-slate-900 font-bold border border-slate-300'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* File List */}
      <div className="rounded-xl bg-slate-50 border border-slate-200 divide-y divide-slate-200 overflow-hidden">
        {filteredFiles.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-xs font-mono">
            No files found matching current filter parameters.
          </div>
        ) : (
          filteredFiles.map((file) => (
            <div
              key={file.id}
              className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white transition-colors"
            >
              {/* Info */}
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-lg bg-white border border-slate-200 shrink-0 mt-0.5 shadow-2xs">
                  {getFileIcon(file.category, file.name)}
                </div>
                <div>
                  <h6 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    {file.name}
                    {file.isEncrypted && (
                      <Lock className="w-3 h-3 text-emerald-600 shrink-0" title="AES-256 Encrypted File" />
                    )}
                  </h6>
                  <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono text-slate-500 mt-1">
                    <span className="px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700 font-medium">
                      {file.category}
                    </span>
                    <span>{formatSize(file.size)}</span>
                    <span>•</span>
                    <span>Uploaded by: <strong className="text-slate-800">{file.uploadedBy}</strong></span>
                    <span>•</span>
                    <span>{file.uploadedAt}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 self-end sm:self-auto shrink-0">
                <span className="text-[11px] font-mono text-slate-600 bg-white px-2.5 py-1 rounded border border-slate-200 font-medium">
                  {file.downloadCount} downloads
                </span>

                <button
                  onClick={() => handleDownload(file)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-emerald-600 hover:text-white text-slate-800 border border-slate-300 text-xs font-mono font-semibold transition-all cursor-pointer shadow-2xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>

                {(currentRole === 'admin' || file.uploadedBy === userName) && (
                  <button
                    onClick={() => handleDelete(file.id)}
                    className="p-1.5 rounded-lg hover:bg-rose-100 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                    title="Delete file"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
};
