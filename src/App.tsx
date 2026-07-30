/**
 * Tomcat — Custom Web Engineering & Enterprise Logistics Solutions
 * Full-stack minimalist platform featuring Client Portal, Restricted Admin Space,
 * and Secure File Sharing Vault.
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { PortfolioSection } from './components/PortfolioSection';
import { LogisticsCalculator } from './components/LogisticsCalculator';
import { ContactSection } from './components/ContactSection';
import { ClientPortal } from './components/ClientPortal';
import { AdminPortal } from './components/AdminPortal';
import { Footer } from './components/Footer';

import { UserRole, ClientUser } from './types';
import { StorageService } from './services/storageService';

export default function App() {
  const [authState, setAuthState] = useState(() => StorageService.getAuthState());
  
  const [isClientPortalOpen, setIsClientPortalOpen] = useState(false);
  const [isAdminPortalOpen, setIsAdminPortalOpen] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  // Scope Estimator prefill state for Contact form
  const [contactPrefill, setContactPrefill] = useState<{
    service?: string;
    budget?: string;
    summary?: string;
  }>({});

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleApplyEstimate = (serviceType: string, estimatedBudget: string, summary: string) => {
    setContactPrefill({
      service: serviceType,
      budget: estimatedBudget,
      summary: summary
    });
    handleNavigate('contact');
  };

  const handleSelectService = (serviceId: string) => {
    const mappedService = serviceId.includes('logistics') ? 'logistics_tech' : 'custom_web';
    setContactPrefill({
      service: mappedService,
      budget: '$15,000 - $25,000',
      summary: `Inquiry regarding service capability ID: ${serviceId}`
    });
    handleNavigate('contact');
  };

  const handleOpenClientPortal = () => {
    if (authState.role === 'guest') {
      const defaultClient = StorageService.getClients()[0];
      setAuthState({ role: 'client', clientUser: defaultClient });
      StorageService.setAuthState({ role: 'client', clientUser: defaultClient });
    }
    setIsClientPortalOpen(true);
  };

  const handleOpenAdminPortal = () => {
    setIsAdminPortalOpen(true);
  };

  const handleAuthenticateAdmin = () => {
    setIsAdminAuthenticated(true);
    setAuthState({ role: 'admin' });
    StorageService.setAuthState({ role: 'admin' });
    StorageService.addAuditLog('ADMIN_AUTHENTICATED', 'Tomcat Administrator', 'Authenticated via footer PIN key');
  };

  const handleSelectClient = (client: ClientUser) => {
    setAuthState({ role: 'client', clientUser: client });
    StorageService.setAuthState({ role: 'client', clientUser: client });
  };

  const handleLogout = () => {
    setAuthState({ role: 'guest' });
    StorageService.setAuthState({ role: 'guest' });
    setIsAdminAuthenticated(false);
    setIsClientPortalOpen(false);
    setIsAdminPortalOpen(false);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased selection:bg-emerald-600 selection:text-white flex flex-col">
      
      {/* Top Navbar */}
      <Navbar
        currentRole={authState.role}
        clientUser={authState.clientUser}
        onOpenClientPortal={handleOpenClientPortal}
        onOpenAdminPortal={handleOpenAdminPortal}
        onLogout={handleLogout}
        onNavigate={handleNavigate}
      />

      {/* Main Landing Page Content */}
      <main className="flex-1">
        <HeroSection
          onOpenContact={() => handleNavigate('contact')}
          onOpenPortal={handleOpenClientPortal}
        />

        <ServicesSection
          onSelectService={handleSelectService}
        />

        <PortfolioSection />

        <LogisticsCalculator
          onApplyEstimate={handleApplyEstimate}
        />

        <ContactSection
          prefilledService={contactPrefill.service}
          prefilledBudget={contactPrefill.budget}
          prefilledSummary={contactPrefill.summary}
        />
      </main>

      {/* Footer containing Restricted Admin Space Link */}
      <Footer
        onOpenClientPortal={handleOpenClientPortal}
        onOpenAdminPortal={handleOpenAdminPortal}
        onNavigate={handleNavigate}
      />

      {/* Client Collaboration & File Vault Modal */}
      <ClientPortal
        isOpen={isClientPortalOpen}
        onClose={() => setIsClientPortalOpen(false)}
        currentRole={authState.role}
        clientUser={authState.clientUser}
        onSelectClient={handleSelectClient}
      />

      {/* Restricted Footer Admin Space Modal */}
      <AdminPortal
        isOpen={isAdminPortalOpen}
        onClose={() => setIsAdminPortalOpen(false)}
        onAuthenticateAdmin={handleAuthenticateAdmin}
        isAdminAuthenticated={isAdminAuthenticated}
      />

    </div>
  );
}
