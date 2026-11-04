import React, { useState } from 'react';
import { ASTROX_PROFILE, SERVICES_CATALOG } from '../data/agencyData';
import { X, Check, ArrowUpRight, MessageCircle, Calendar, Sparkles, Building2, Mail, Phone, User } from 'lucide-react';
import { BookingFormState } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preselectedService,
}) => {
  const [formData, setFormData] = useState<BookingFormState>({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    services: preselectedService ? [preselectedService] : ['Website Design & Dev', 'Google Ads (PPC & Search)'],
    budget: '$3k – $8k / mo',
    timeline: 'Within 2–4 weeks',
    message: '',
  });

  const [submitted, setSubmitted] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  if (!isOpen) return null;

  const budgetOptions = [
    'Under $2.5k / mo',
    '$3k – $8k / mo',
    '$8k – $20k / mo',
    '$20k+ / Enterprise',
  ];

  const timelineOptions = [
    'Immediately (ASAP)',
    'Within 2–4 weeks',
    'Next Quarter',
    'Exploratory',
  ];

  const toggleService = (name: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(name)
        ? prev.services.filter((s) => s !== name)
        : [...prev.services, name],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.email.trim()) {
      setErrorMsg('Please provide your name and work email.');
      return;
    }
    setErrorMsg('');
    setSubmitted(true);
  };

  const handleWhatsAppRedirect = () => {
    const text = encodeURIComponent(
      `Hello AstroX Team! I am interested in consulting with your agency for: ${formData.services.join(', ') || 'Digital Marketing'}. My company is ${formData.companyName || 'our brand'}.`
    );
    window.open(`https://wa.me/919845012025?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#0e0e0e] border border-white/20 rounded-2xl p-6 sm:p-8 shadow-2xl text-[#f4f4f4] my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          /* Confirmation Success State */
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-white text-black mx-auto flex items-center justify-center mb-6">
              <Check className="w-8 h-8 stroke-[2.5]" />
            </div>

            <h3 className="archivo-display text-3xl font-bold text-white mb-2">
              DISCOVERY SESSION REQUESTED
            </h3>

            <p className="font-inter-tight text-neutral-400 text-sm max-w-md mx-auto leading-relaxed">
              Thank you, <span className="text-white font-medium">{formData.fullName}</span>. An AstroX Principal Strategist from our Bengaluru headquarters will review your requirements and reach out within 4 business hours.
            </p>

            <div className="mt-6 p-4 rounded-xl bg-neutral-900 border border-white/10 text-xs text-neutral-400 font-mono max-w-md mx-auto text-left">
              <div>Confirmation ID: <span className="text-white">AX-{Date.now().toString().slice(-6)}</span></div>
              <div className="mt-1">Selected Services: <span className="text-white">{formData.services.join(', ') || 'Custom Strategy'}</span></div>
              <div className="mt-1">Budget Tier: <span className="text-white">{formData.budget}</span></div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={handleWhatsAppRedirect}
                className="w-full sm:w-auto px-6 py-3 bg-[#25D366] text-black font-semibold rounded-full flex items-center justify-center gap-2 text-sm btn-lift shadow-lg"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Instant Connect on WhatsApp</span>
              </button>
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-3 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-full"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          /* Booking Form */
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">
              <span>● AstroX Client Intake</span>
              <span>·</span>
              <span>Direct Discovery</span>
            </div>

            <h2 className="archivo-display text-3xl sm:text-4xl font-bold text-white leading-tight">
              BOOK A STRATEGIC CALL
            </h2>
            <p className="font-inter-tight text-xs sm:text-sm text-neutral-400 mt-1">
              Bengaluru Studio · Direct consultation with senior growth practitioners.
            </p>

            {errorMsg && (
              <div className="mt-4 p-3 bg-red-950/50 border border-red-500/50 rounded-lg text-xs text-red-300">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              
              {/* Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                    Your Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Yashas Rao"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 bg-neutral-900 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-white/40"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                    Work Email *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
                    <input
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 bg-neutral-900 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-white/40"
                    />
                  </div>
                </div>
              </div>

              {/* Phone & Company */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                    Phone / WhatsApp Number
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
                    <input
                      type="tel"
                      placeholder="+91 98450 ..."
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 bg-neutral-900 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-white/40"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                    Company / Website URL
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
                    <input
                      type="text"
                      placeholder="e.g. acmebrand.com"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 bg-neutral-900 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-white/40"
                    />
                  </div>
                </div>
              </div>

              {/* Services Selector */}
              <div>
                <label className="block text-xs font-mono uppercase text-neutral-400 mb-2">
                  Select Required Services
                </label>
                <div className="flex flex-wrap gap-2 max-h-36 overflow-y-auto p-1">
                  {SERVICES_CATALOG.map((s) => {
                    const active = formData.services.includes(s.name);
                    return (
                      <button
                        type="button"
                        key={s.id}
                        onClick={() => toggleService(s.name)}
                        className={`text-xs px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
                          active
                            ? 'bg-white text-black font-semibold border-white shadow-sm'
                            : 'bg-neutral-900 text-neutral-400 border-white/10 hover:border-white/30'
                        }`}
                      >
                        {active ? '✓ ' : '+ '}{s.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Budget & Timeline */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                    Target Monthly Budget
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full px-3 py-2.5 bg-neutral-900 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-white/40"
                  >
                    {budgetOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                    Target Deployment Window
                  </label>
                  <select
                    value={formData.timeline}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                    className="w-full px-3 py-2.5 bg-neutral-900 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-white/40"
                  >
                    {timelineOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                  Project Notes / Specific Ambitions
                </label>
                <textarea
                  rows={2}
                  placeholder="Tell us about your brand goals, target customers, or current challenges..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3 py-2 bg-neutral-900 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-white/40"
                />
              </div>

              {/* Submit & WhatsApp */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="submit"
                  className="w-full sm:flex-1 py-3.5 bg-white text-black hover:bg-neutral-200 rounded-full font-semibold text-sm flex items-center justify-center gap-2 btn-lift shadow-lg cursor-pointer"
                >
                  <span>Submit Discovery Request</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppRedirect}
                  className="w-full sm:w-auto px-5 py-3.5 bg-neutral-900 hover:bg-neutral-800 text-white border border-white/15 rounded-full text-xs font-mono flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span>Chat on WhatsApp</span>
                </button>
              </div>

            </form>
          </div>
        )}

      </div>
    </div>
  );
};
