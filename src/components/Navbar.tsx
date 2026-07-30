import React, { useState } from 'react';
import { Lock, ShieldCheck, UserCheck, ChevronRight, Menu, X } from 'lucide-react';
import { UserRole, ClientUser } from '../types';
import { TomcatLogo } from './TomcatLogo';

interface NavbarProps {
  currentRole: UserRole;
  clientUser?: ClientUser;
  onOpenClientPortal: () => void;
  onOpenAdminPortal: () => void;
  onLogout: () => void;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRole,
  clientUser,
  onOpenClientPortal,
  onOpenAdminPortal,
  onLogout,
  onNavigate
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 text-slate-900 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <button 
          onClick={() => handleNavClick('hero')}
          className="group text-left cursor-pointer focus:outline-none"
        >
          <TomcatLogo size="md" />
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-700">
          <button 
            onClick={() => handleNavClick('services')}
            className="hover:text-emerald-600 transition-colors cursor-pointer"
          >
            Services & Tech
          </button>
          <button 
            onClick={() => handleNavClick('portfolio')}
            className="hover:text-emerald-600 transition-colors cursor-pointer"
          >
            Case Studies
          </button>
          <button 
            onClick={() => handleNavClick('calculator')}
            className="hover:text-emerald-600 transition-colors cursor-pointer"
          >
            Scope Estimator
          </button>
          <button 
            onClick={() => handleNavClick('contact')}
            className="hover:text-emerald-600 transition-colors cursor-pointer"
          >
            Contact Us
          </button>
        </nav>

        {/* Action Controls & Portal Badges */}
        <div className="hidden md:flex items-center gap-4">
          {currentRole === 'admin' ? (
            <div className="flex items-center gap-3">
              <button
                onClick={onOpenAdminPortal}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-mono font-semibold hover:bg-emerald-100 transition-all shadow-xs cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Admin Active
              </button>
              <button
                onClick={onLogout}
                className="text-xs text-slate-500 hover:text-rose-600 font-mono underline underline-offset-4 cursor-pointer"
              >
                Sign Out
              </button>
            </div>
          ) : currentRole === 'client' && clientUser ? (
            <div className="flex items-center gap-3">
              <button
                onClick={onOpenClientPortal}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-100 border border-slate-300 text-slate-800 text-xs font-mono font-semibold hover:border-emerald-500 transition-all cursor-pointer"
              >
                <UserCheck className="w-4 h-4 text-emerald-600" />
                {clientUser.name} ({clientUser.company.split(' ')[0]})
              </button>
              <button
                onClick={onLogout}
                className="text-xs text-slate-500 hover:text-rose-600 font-mono cursor-pointer"
              >
                Exit Portal
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenClientPortal}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-slate-300 hover:border-emerald-500 text-slate-900 text-xs font-mono uppercase tracking-wider transition-all duration-200 shadow-xs cursor-pointer hover:bg-slate-50"
            >
              <Lock className="w-3.5 h-3.5 text-emerald-600" />
              Client Portal
            </button>
          )}

          <button
            onClick={() => handleNavClick('contact')}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition-all duration-200 shadow-sm cursor-pointer"
          >
            Request Proposal
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 hover:text-slate-900 rounded-lg border border-slate-300 bg-slate-50"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-6 space-y-4">
          <nav className="flex flex-col gap-3 text-sm font-medium text-slate-700">
            <button 
              onClick={() => handleNavClick('services')}
              className="text-left py-2 border-b border-slate-100 text-slate-800 hover:text-emerald-600"
            >
              Services & Logistics Tech
            </button>
            <button 
              onClick={() => handleNavClick('portfolio')}
              className="text-left py-2 border-b border-slate-100 text-slate-800 hover:text-emerald-600"
            >
              Portfolio & Case Studies
            </button>
            <button 
              onClick={() => handleNavClick('calculator')}
              className="text-left py-2 border-b border-slate-100 text-slate-800 hover:text-emerald-600"
            >
              Scope Estimator
            </button>
            <button 
              onClick={() => handleNavClick('contact')}
              className="text-left py-2 border-b border-slate-100 text-slate-800 hover:text-emerald-600"
            >
              Contact Us
            </button>
          </nav>
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenClientPortal(); }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-slate-100 border border-slate-300 text-slate-900 text-xs font-mono font-bold"
            >
              <Lock className="w-3.5 h-3.5 text-emerald-600" />
              Secure Client Portal
            </button>
            {currentRole === 'admin' && (
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenAdminPortal(); }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-mono font-bold"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Admin Dashboard
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
