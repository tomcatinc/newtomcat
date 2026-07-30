import React from 'react';
import { Lock, ShieldCheck, ExternalLink, ArrowUp } from 'lucide-react';
import { TomcatLogo } from './TomcatLogo';

interface FooterProps {
  onOpenClientPortal: () => void;
  onOpenAdminPortal: () => void;
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenClientPortal,
  onOpenAdminPortal,
  onNavigate
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-50 text-slate-600 border-t border-slate-200 text-xs font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-slate-200">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <TomcatLogo size="md" />

            <p className="text-slate-600 font-sans text-sm leading-relaxed max-w-sm">
              Tomcat Technology specializes in custom web development solutions for professionals and businesses alongside enterprise logistics software services. Powered by minimalist technical design and secure document collaboration architecture.
            </p>

            <div className="pt-2 flex items-center gap-3 text-[11px] text-slate-500 font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>AES-256 Encrypted Document Sharing Vault</span>
            </div>
          </div>

          {/* Core Navigation */}
          <div className="md:col-span-3 space-y-3 font-sans">
            <p className="font-mono text-xs uppercase tracking-wider text-slate-900 font-bold">
              Solutions & Services
            </p>
            <ul className="space-y-2 text-xs text-slate-600 font-medium">
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-emerald-600 transition-colors cursor-pointer">
                  Custom Web Engineering
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-emerald-600 transition-colors cursor-pointer">
                  Logistics & Dispatch Portals
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('portfolio')} className="hover:text-emerald-600 transition-colors cursor-pointer">
                  Selected Case Studies
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('calculator')} className="hover:text-emerald-600 transition-colors cursor-pointer">
                  Interactive Scope Estimator
                </button>
              </li>
            </ul>
          </div>

          {/* Secure Client Portals & Footer Restricted Admin Trigger */}
          <div className="md:col-span-4 space-y-3 font-sans">
            <p className="font-mono text-xs uppercase tracking-wider text-slate-900 font-bold">
              Secure Client & Staff Access
            </p>
            <div className="space-y-2.5">
              <button
                onClick={onOpenClientPortal}
                className="w-full flex items-center justify-between p-3 rounded-lg bg-white border border-slate-200 hover:border-emerald-500 text-slate-900 text-xs font-mono font-semibold transition-all cursor-pointer shadow-xs"
              >
                <span className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-emerald-600" />
                  Client Collaboration Portal
                </span>
                <span className="text-[10px] text-emerald-700 font-bold uppercase bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">ACCESS</span>
              </button>

              {/* RESTRICTED FOOTER ADMIN ACCESS LINK */}
              <button
                onClick={onOpenAdminPortal}
                className="w-full flex items-center justify-between p-3 rounded-lg bg-white border border-slate-200 hover:border-slate-400 text-slate-700 hover:text-slate-900 text-xs font-mono transition-all cursor-pointer group shadow-xs"
              >
                <span className="flex items-center gap-2 font-medium">
                  <ShieldCheck className="w-4 h-4 text-slate-500 group-hover:text-emerald-600 transition-colors" />
                  Staff Restricted Admin Space
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 group-hover:text-rose-600 border border-slate-200 font-bold">
                  PIN REQUIRED
                </span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-medium">
          <p>© {new Date().getFullYear()} Tomcat Technology & Logistics Engineering. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <span className="text-slate-500">Privacy & NDA Compliant</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-slate-700 hover:text-slate-900 transition-colors cursor-pointer font-bold"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
