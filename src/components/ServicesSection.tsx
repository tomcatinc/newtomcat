import React, { useState } from 'react';
import { motion } from 'motion/react';
import { INITIAL_SERVICES } from '../data/initialData';
import { Code2, Truck, PackageCheck, Globe, CheckCircle, ArrowRight, Shield, Database, Lock } from 'lucide-react';
import { ServiceItem } from '../types';

interface ServicesSectionProps {
  onSelectService: (serviceId: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const [filter, setFilter] = useState<'all' | 'web' | 'logistics'>('all');

  const filteredServices = INITIAL_SERVICES.filter(service => {
    if (filter === 'all') return true;
    return service.category === filter;
  });

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code2': return <Code2 className="w-6 h-6 text-emerald-600" />;
      case 'Truck': return <Truck className="w-6 h-6 text-emerald-600" />;
      case 'PackageCheck': return <PackageCheck className="w-6 h-6 text-emerald-600" />;
      case 'Globe': return <Globe className="w-6 h-6 text-emerald-600" />;
      default: return <Code2 className="w-6 h-6 text-emerald-600" />;
    }
  };

  return (
    <section id="services" className="py-24 bg-slate-50 text-slate-900 relative border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-semibold">
              <Shield className="w-3.5 h-3.5" />
              <span>CORE CAPABILITIES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Minimalist Engineering for Web & <span className="text-emerald-600">Logistics Infrastructure</span>
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              We specialize in tailor-made web development solutions for professionals and scalable logistics management software that brings speed and total transparency to supply chains.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 p-1 bg-white rounded-xl border border-slate-200 self-start md:self-auto shadow-xs">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                filter === 'all'
                  ? 'bg-emerald-600 text-white font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Capabilities
            </button>
            <button
              onClick={() => setFilter('web')}
              className={`px-4 py-2 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                filter === 'web'
                  ? 'bg-emerald-600 text-white font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Web Solutions
            </button>
            <button
              onClick={() => setFilter('logistics')}
              className={`px-4 py-2 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                filter === 'logistics'
                  ? 'bg-emerald-600 text-white font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Logistics Services
            </button>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredServices.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="rounded-2xl bg-white border border-slate-200 p-8 hover:border-emerald-500 transition-all duration-300 group flex flex-col justify-between shadow-xs hover:shadow-md"
            >
              <div>
                {/* Header info */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
                    {getIcon(service.icon)}
                  </div>
                  <span className="text-[11px] font-mono font-semibold uppercase px-2.5 py-1 rounded bg-slate-100 text-slate-700 border border-slate-200">
                    {service.category === 'web' ? 'Custom Web Dev' : 'Logistics Software'}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">
                  {service.title}
                </h3>

                <p className="text-xs font-mono font-bold text-emerald-700 mb-4">
                  {service.tagline}
                </p>

                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Features List */}
                <div className="space-y-2.5 pt-4 border-t border-slate-100 mb-8">
                  {service.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action */}
              <button
                onClick={() => onSelectService(service.id)}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white text-xs font-mono font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-xs"
              >
                <span>Request Scope for this Service</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Technical Architecture Banner */}
        <div className="mt-16 rounded-2xl bg-white border border-slate-200 p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-slate-900">
                Integrated Client Portal & Restricted Secure Storage
              </h4>
              <p className="text-sm text-slate-600 mt-1 max-w-xl">
                Every web development & logistics project deployed by Tomcat includes a secure client collaboration portal with encrypted file sharing and direct engineer communication lines.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-xs font-mono font-bold text-emerald-700 flex items-center gap-1.5 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
              <Database className="w-4 h-4" />
              AES-256 Vault Built-In
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
