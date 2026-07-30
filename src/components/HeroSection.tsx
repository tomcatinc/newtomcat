import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Code2, Truck, ShieldCheck, Lock, FileText, CheckCircle2, Cpu } from 'lucide-react';
import { TomcatLogo } from './TomcatLogo';

const heroBannerPath = '/src/assets/images/tomcat_hero_banner_1785422151822.jpg';

interface HeroSectionProps {
  onOpenContact: () => void;
  onOpenPortal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenContact, onOpenPortal }) => {
  return (
    <section id="hero" className="relative overflow-hidden bg-white text-slate-900 pt-16 pb-24 border-b border-slate-200">
      {/* Background Micro Grid */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#0f172a 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headlines & Value Prop */}
          <div className="lg:col-span-7 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-300 text-slate-800 text-xs font-mono font-semibold"
            >
              <TomcatLogo size="sm" showWordmark={false} />
              <span>TOMCAT TECHNOLOGY & LOGISTICS</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-slate-900"
            >
              Custom Web Solutions & Enterprise <span className="text-emerald-600 underline underline-offset-8 decoration-emerald-300">Logistics Services</span>.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-slate-600 max-w-2xl leading-relaxed"
            >
              At <strong className="text-slate-900">Tomcat Technology</strong>, we specialize in building bespoke web applications for professionals, corporate brands, and logistics enterprises. We fuse minimalist digital aesthetics with robust backend infrastructure, encrypted document sharing, and streamlined supply chain software.
            </motion.p>

            {/* Core Capability Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs font-mono text-slate-700"
            >
              <div className="flex items-center gap-2 p-3 rounded-lg bg-slate-50 border border-slate-200 shadow-2xs">
                <Code2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-semibold">Custom Web Dev</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-lg bg-slate-50 border border-slate-200 shadow-2xs">
                <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-semibold">Logistics Portals</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-lg bg-slate-50 border border-slate-200 shadow-2xs col-span-2 sm:col-span-1">
                <Lock className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-semibold">Secure Vault</span>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap items-center gap-4 pt-4"
            >
              <button
                onClick={onOpenContact}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-all duration-200 shadow-sm cursor-pointer"
              >
                <span>Initiate Custom Project</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenPortal}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-300 font-mono text-xs transition-all duration-200 cursor-pointer"
              >
                <Lock className="w-4 h-4 text-emerald-600" />
                <span>Access Client Portal</span>
              </button>
            </motion.div>
          </div>

          {/* Right Column: Minimalist Interactive Terminal / Feature Card */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-2xl bg-slate-50 border border-slate-200 p-6 shadow-xl relative"
            >
              {/* Terminal Bar */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200 text-xs font-mono text-slate-500">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  <span className="ml-2 text-slate-700 font-semibold">tomcat-architecture-v4.0.ts</span>
                </div>
                <span className="text-emerald-600 flex items-center gap-1 font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  ONLINE
                </span>
              </div>

              {/* Console Mock */}
              <div className="space-y-4 font-mono text-xs leading-relaxed text-slate-700">
                <div className="relative rounded-lg overflow-hidden border border-slate-200 h-28 group">
                  <img 
                    src={heroBannerPath} 
                    alt="Tomcat Logistics & Web Engineering Visual"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90" 
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent flex items-end p-3">
                    <span className="text-white text-[11px] font-bold tracking-wider uppercase bg-slate-900/80 px-2 py-0.5 rounded border border-emerald-400/40">
                      Telemetry & Supply Network Node
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded bg-white border border-slate-200 text-slate-600 shadow-2xs">
                  <span className="text-emerald-600 font-bold">$</span> tomcat --deploy --modules=web,logistics,vault
                  <br />
                  <span className="text-slate-400">[INFO] Initializing Tomcat Minimalist Engine...</span>
                </div>

                <div className="space-y-2 pt-1">
                  <div className="flex items-center justify-between p-2.5 rounded bg-white border border-slate-200 shadow-2xs">
                    <span className="flex items-center gap-2 text-slate-800 font-medium">
                      <Code2 className="w-3.5 h-3.5 text-emerald-600" />
                      Custom Web Engine
                    </span>
                    <span className="text-emerald-600 font-bold">200 OK</span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded bg-white border border-slate-200 shadow-2xs">
                    <span className="flex items-center gap-2 text-slate-800 font-medium">
                      <Truck className="w-3.5 h-3.5 text-emerald-600" />
                      Logistics Telematics Portal
                    </span>
                    <span className="text-emerald-600 font-bold">ACTIVE</span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded bg-white border border-slate-200 shadow-2xs">
                    <span className="flex items-center gap-2 text-slate-800 font-medium">
                      <FileText className="w-3.5 h-3.5 text-emerald-600" />
                      AES Secure Document Sharing
                    </span>
                    <span className="text-emerald-600 font-bold">ENCRYPTED</span>
                  </div>
                </div>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-2 gap-3 pt-3">
                  <div className="p-3 rounded-lg bg-white border border-slate-200 text-center shadow-2xs">
                    <p className="text-xl font-bold font-sans text-slate-900">100%</p>
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider mt-0.5 font-semibold">Custom Codebase</p>
                  </div>
                  <div className="p-3 rounded-lg bg-white border border-slate-200 text-center shadow-2xs">
                    <p className="text-xl font-bold font-sans text-slate-900">&lt; 1.2s</p>
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider mt-0.5 font-semibold">Average Load Speed</p>
                  </div>
                </div>
              </div>

              {/* Trust Tag */}
              <div className="mt-5 pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Audited Security Architecture
                </span>
                <span className="font-mono text-emerald-700 font-bold text-[11px]">v2.6 RELEASED</span>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
