import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calculator, Check, ArrowRight, ShieldCheck, DollarSign, Clock, FileText } from 'lucide-react';

interface LogisticsCalculatorProps {
  onApplyEstimate: (serviceType: string, estimatedBudget: string, summary: string) => void;
}

export const LogisticsCalculator: React.FC<LogisticsCalculatorProps> = ({ onApplyEstimate }) => {
  const [projectCategory, setProjectCategory] = useState<'custom_web' | 'logistics_portal' | 'enterprise_hybrid'>('logistics_portal');
  const [scale, setScale] = useState<'starter' | 'growth' | 'enterprise'>('growth');
  const [selectedModules, setSelectedModules] = useState<string[]>([
    'client_portal',
    'secure_file_sharing',
    'realtime_messaging'
  ]);

  const moduleOptions = [
    { id: 'client_portal', label: 'Client Collaboration Portal', price: 1500, desc: 'Individual client access dashboard with status tracking' },
    { id: 'secure_file_sharing', label: 'Encrypted Document Vault', price: 2000, desc: 'Secure file sharing with AES-256 audit logs' },
    { id: 'realtime_messaging', label: 'Encrypted Client Messaging', price: 1200, desc: 'Direct client-engineer chat line' },
    { id: 'telematics_tracking', label: 'Real-Time Telematics & Cargo Map', price: 3500, desc: 'GPS route tracking and carrier status board' },
    { id: 'edi_api_gateways', label: 'EDI & Automated API Integrations', price: 2800, desc: 'Automated carrier and warehouse sync' },
    { id: 'custom_admin_dashboard', label: 'Restricted Staff Admin Portal', price: 1800, desc: 'Footer-restricted admin console & audit manager' }
  ];

  const toggleModule = (id: string) => {
    if (selectedModules.includes(id)) {
      setSelectedModules(selectedModules.filter(m => m !== id));
    } else {
      setSelectedModules([...selectedModules, id]);
    }
  };

  // Base Calculation
  const basePrice = projectCategory === 'custom_web' ? 4500 : projectCategory === 'logistics_portal' ? 7500 : 12000;
  const scaleMultiplier = scale === 'starter' ? 1 : scale === 'growth' ? 1.4 : 2.2;
  const modulesTotal = selectedModules.reduce((acc, mId) => {
    const mod = moduleOptions.find(o => o.id === mId);
    return acc + (mod ? mod.price : 0);
  }, 0);

  const totalEstimate = Math.round((basePrice + modulesTotal) * scaleMultiplier);
  const estimatedWeeks = scale === 'starter' ? '3 - 5 weeks' : scale === 'growth' ? '6 - 9 weeks' : '10 - 14 weeks';

  const budgetString = `$${(totalEstimate - 2000).toLocaleString()} - $${(totalEstimate + 3000).toLocaleString()}`;

  const handleApply = () => {
    const categoryName = projectCategory === 'custom_web' ? 'Custom Web Development' : projectCategory === 'logistics_portal' ? 'Enterprise Logistics Portal' : 'Hybrid Web & Supply Chain Solution';
    const summary = `Project Type: ${categoryName} (${scale.toUpperCase()}). Selected Modules: ${selectedModules.join(', ')}. Estimated Duration: ${estimatedWeeks}.`;
    
    const serviceKey = projectCategory === 'custom_web' ? 'custom_web' : projectCategory === 'logistics_portal' ? 'logistics_tech' : 'enterprise_bundle';
    onApplyEstimate(serviceKey, budgetString, summary);
  };

  return (
    <section id="calculator" className="py-24 bg-slate-900 text-slate-100 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
            <Calculator className="w-3.5 h-3.5" />
            <span>INTERACTIVE SCOPE ESTIMATOR</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Calculate Your Web & <span className="text-emerald-400">Logistics Solution Scope</span>
          </h2>
          <p className="text-slate-300 text-base">
            Select your architectural requirements to generate an instant estimate for custom web development, logistics portals, and secure file sharing features.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-8 bg-slate-950 p-6 sm:p-8 rounded-2xl border border-slate-800">
            
            {/* Step 1: Core Domain */}
            <div>
              <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-3">
                1. Solution Domain
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setProjectCategory('custom_web')}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                    projectCategory === 'custom_web'
                      ? 'bg-emerald-950/40 border-emerald-500 text-white'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <p className="font-bold text-sm">Custom Web App</p>
                  <p className="text-[11px] text-slate-400 mt-1">Bespoke business web & client portal</p>
                </button>

                <button
                  type="button"
                  onClick={() => setProjectCategory('logistics_portal')}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                    projectCategory === 'logistics_portal'
                      ? 'bg-emerald-950/40 border-emerald-500 text-white'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <p className="font-bold text-sm">Logistics Portal</p>
                  <p className="text-[11px] text-slate-400 mt-1">Dispatch, telematics & cargo tracking</p>
                </button>

                <button
                  type="button"
                  onClick={() => setProjectCategory('enterprise_hybrid')}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                    projectCategory === 'enterprise_hybrid'
                      ? 'bg-emerald-950/40 border-emerald-500 text-white'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <p className="font-bold text-sm">Enterprise Hybrid</p>
                  <p className="text-[11px] text-slate-400 mt-1">Full-stack web & supply chain suite</p>
                </button>
              </div>
            </div>

            {/* Step 2: Operational Scale */}
            <div>
              <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-3">
                2. Operational Scale
              </label>
              <div className="grid grid-cols-3 gap-3">
                {(['starter', 'growth', 'enterprise'] as const).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setScale(s)}
                    className={`py-3 px-2 rounded-xl border text-center font-mono text-xs uppercase tracking-wider transition-all cursor-pointer ${
                      scale === s
                        ? 'bg-emerald-500 text-slate-950 font-bold border-emerald-400'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Feature Modules */}
            <div>
              <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-3">
                3. Specialized Modules & Security Vaults
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {moduleOptions.map((mod) => {
                  const isSelected = selectedModules.includes(mod.id);
                  return (
                    <button
                      key={mod.id}
                      type="button"
                      onClick={() => toggleModule(mod.id)}
                      className={`p-3.5 rounded-xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-slate-900 border-emerald-500/80 text-white'
                          : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded flex items-center justify-center shrink-0 mt-0.5 ${
                        isSelected ? 'bg-emerald-500 text-slate-950' : 'border border-slate-700'
                      }`}>
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-200">{mod.label}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">{mod.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Result Card Column */}
          <div className="lg:col-span-5">
            <div className="sticky top-28 bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Estimated Project Scope</span>
                <span className="text-xs font-mono text-emerald-400">TOMCAT QUOTE ENGINE</span>
              </div>

              {/* Price Display */}
              <div className="space-y-1">
                <p className="text-xs text-slate-400 font-mono">Estimated Investment Range</p>
                <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight flex items-baseline gap-1">
                  <span>{budgetString}</span>
                  <span className="text-xs font-normal text-slate-400">USD</span>
                </div>
              </div>

              {/* Summary Stats */}
              <div className="grid grid-cols-2 gap-4 py-4 border-y border-slate-800 text-xs">
                <div className="flex items-center gap-2 text-slate-300">
                  <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase font-mono">Timeline</p>
                    <p className="font-bold">{estimatedWeeks}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase font-mono">Security</p>
                    <p className="font-bold">Encrypted Vault Incl.</p>
                  </div>
                </div>
              </div>

              {/* Modules breakdown */}
              <div className="space-y-2">
                <p className="text-[11px] font-mono text-slate-400 uppercase">Included Feature Summary:</p>
                <ul className="text-xs space-y-1.5 text-slate-300">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    Custom Web Application Architecture
                  </li>
                  {selectedModules.map(mId => {
                    const mod = moduleOptions.find(o => o.id === mId);
                    return mod ? (
                      <li key={mId} className="flex items-center gap-2 text-slate-300">
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        {mod.label}
                      </li>
                    ) : null;
                  })}
                </ul>
              </div>

              {/* Apply CTA */}
              <button
                onClick={handleApply}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-all duration-200 cursor-pointer shadow-lg shadow-emerald-500/10"
              >
                <span>Transfer Scope to Contact Form</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[11px] text-center text-slate-400 font-mono">
                No obligation. Directly populates your proposal request.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
