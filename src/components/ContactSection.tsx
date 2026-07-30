import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Mail, Send, CheckCircle2, Phone, MapPin, Building2, User, FileText, Lock } from 'lucide-react';
import { StorageService } from '../services/storageService';

interface ContactSectionProps {
  prefilledService?: string;
  prefilledBudget?: string;
  prefilledSummary?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  prefilledService,
  prefilledBudget,
  prefilledSummary
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    serviceType: 'custom_web' as 'custom_web' | 'logistics_tech' | 'enterprise_bundle' | 'other',
    budget: '$15,000 - $25,000',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (prefilledService || prefilledBudget || prefilledSummary) {
      setFormData(prev => ({
        ...prev,
        serviceType: (prefilledService as any) || prev.serviceType,
        budget: prefilledBudget || prev.budget,
        message: prefilledSummary ? `${prev.message}\n\n[SCOPE ESTIMATOR SUMMARY]: ${prefilledSummary}`.trim() : prev.message
      }));
    }
  }, [prefilledService, prefilledBudget, prefilledSummary]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setLoading(true);
    setTimeout(() => {
      StorageService.addInquiry({
        name: formData.name,
        email: formData.email,
        company: formData.company || 'Independent Professional',
        serviceType: formData.serviceType,
        budget: formData.budget,
        message: formData.message
      });

      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <section id="contact" className="py-24 bg-white text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Info Column */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-semibold">
                <Mail className="w-3.5 h-3.5" />
                <span>INITIATE CONTACT</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
                Let’s Build Your Web or <span className="text-emerald-600">Logistics Portal</span>
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                Whether you need a sleek minimalist web app for your professional business or custom supply chain & freight management software, our engineering team is ready to collaborate.
              </p>
            </div>

            {/* Direct Contact Cards */}
            <div className="space-y-4 pt-4 text-xs font-mono">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 shadow-2xs">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-slate-500 font-semibold">DIRECT INQUIRIES</p>
                  <p className="text-sm font-semibold text-slate-900">contact@tomcat-logistics.io</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 shadow-2xs">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-slate-500 font-semibold">ENGINEERING DISPATCH</p>
                  <p className="text-sm font-semibold text-slate-900">+1 (800) 555-TOMCAT</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 shadow-2xs">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-slate-500 font-semibold">HEADQUARTERS</p>
                  <p className="text-sm font-semibold text-slate-900">Silicon Valley & Rotterdam Logistics Hub</p>
                </div>
              </div>
            </div>

            {/* Security Guarantee Note */}
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
              <Lock className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div className="text-xs">
                <p className="font-bold text-emerald-900">Confidentiality & Secure Storage</p>
                <p className="text-slate-600 mt-0.5">
                  All submitted documentation and scope requests are automatically logged to Tomcat’s restricted admin storage vault under strict NDA protocols.
                </p>
              </div>
            </div>

          </div>

          {/* Form Column */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-slate-50 border border-slate-200 p-8 shadow-md">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Proposal Request Received</h3>
                  <p className="text-slate-600 max-w-md mx-auto text-sm leading-relaxed">
                    Thank you, <strong className="text-slate-900">{formData.name}</strong>. Your inquiry has been routed to our Lead Solutions Architect. A secure portal invitation link will be dispatched to <strong className="text-emerald-700">{formData.email}</strong> within 2 business hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        company: '',
                        serviceType: 'custom_web',
                        budget: '$15,000 - $25,000',
                        message: ''
                      });
                    }}
                    className="mt-4 px-6 py-2.5 rounded-lg bg-slate-200 text-slate-800 text-xs font-mono font-semibold hover:bg-slate-300 cursor-pointer"
                  >
                    Submit Additional Request
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="border-b border-slate-200 pb-4 mb-2">
                    <h3 className="text-xl font-bold text-slate-900">Project Consultation Form</h3>
                    <p className="text-xs text-slate-500 font-mono mt-1 font-semibold">
                      Direct transmission to Tomcat Technical Architecture Team
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-mono font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Your Full Name *
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Elena Rostova"
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-emerald-600 transition-colors shadow-2xs"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-mono font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Work Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="elena@company.com"
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-emerald-600 transition-colors shadow-2xs"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Company */}
                    <div>
                      <label className="block text-xs font-mono font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Company / Organization
                      </label>
                      <div className="relative">
                        <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          placeholder="Apex Logistics / Personal Studio"
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-emerald-600 transition-colors shadow-2xs"
                        />
                      </div>
                    </div>

                    {/* Service Type */}
                    <div>
                      <label className="block text-xs font-mono font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Primary Service Focus
                      </label>
                      <select
                        value={formData.serviceType}
                        onChange={(e) => setFormData({ ...formData, serviceType: e.target.value as any })}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-emerald-600 transition-colors cursor-pointer shadow-2xs"
                      >
                        <option value="custom_web">Custom Web Development</option>
                        <option value="logistics_tech">Enterprise Logistics Software</option>
                        <option value="enterprise_bundle">Hybrid Web + Supply Chain Portal</option>
                        <option value="other">Secure File Vault & API Integration</option>
                      </select>
                    </div>
                  </div>

                  {/* Budget */}
                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Target Investment Range
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-emerald-600 transition-colors cursor-pointer shadow-2xs"
                    >
                      <option value="$10,000 - $15,000">$10,000 - $15,000 (Minimalist Starter)</option>
                      <option value="$15,000 - $25,000">$15,000 - $25,000 (Professional Web App)</option>
                      <option value="$25,000 - $50,000">$25,000 - $50,000 (Enterprise Logistics Portal)</option>
                      <option value="$50,000+">$50,000+ (Full Suite & Multi-Tenant Infrastructure)</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Project Overview & Requirements *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe your vision, technical requirements, or logistics workflow needs..."
                      className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-emerald-600 transition-colors resize-none shadow-2xs"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full inline-flex items-center justify-center gap-2 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-all duration-200 cursor-pointer shadow-sm disabled:opacity-50"
                  >
                    {loading ? (
                      <span className="font-mono text-xs animate-pulse">TRANSMITTING TO ARCHITECTS...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Proposal Request</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
