import React, { useState } from 'react';
import { ASTROX_PROFILE, SERVICES_CATALOG } from '../data/agencyData';
import { BookingFormState } from '../types';
import { Check, ArrowUpRight, MessageCircle, Building2, Mail, Phone, User, MapPin, Clock } from 'lucide-react';

interface ContactViewProps {
  preselectedService?: string;
  onBookingComplete?: () => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ preselectedService }) => {
  const [formData, setFormData] = useState<BookingFormState>({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    services: preselectedService ? [preselectedService] : ['Website Design & Dev', 'Google Ads (PPC & Search)'],
    budget: '₹1.5L – ₹5L / mo',
    timeline: 'Within 2–4 weeks',
    message: '',
  });

  const [submitted, setSubmitted] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const budgetOptions = [
    'Under ₹50k / mo',
    '₹50k – ₹1.5L / mo',
    '₹1.5L – ₹5L / mo',
    '₹5L – ₹15L / mo',
    '₹15L+ / Enterprise',
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
    window.open(`https://wa.me/919916728506?text=${text}`, '_blank');
  };

  return (
    <div className="w-full bg-black text-[#f4f4f4] min-h-screen pt-24 lg:pt-[calc(140*var(--u))] pb-20 px-4 md:px-12 animate-in fade-in duration-300">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Editorial Header */}
        <div className="border-b border-white/14 pb-8 lg:pb-12 mb-12">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-neutral-400 mb-4">
            <span>AstroX Direct Channel</span>
            <span>·</span>
            <span>Bengaluru HQ</span>
            <span>·</span>
            <span>Est. 2025</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <h1 className="archivo-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[0.95]">
                START A<br />CONVERSATION
              </h1>
            </div>
            <div className="lg:col-span-4">
              <p className="font-inter-tight text-neutral-300 text-sm sm:text-base leading-relaxed">
                Connect directly with senior growth practitioners at our Bengaluru headquarters. No account managers or bloated layers—just direct strategic alignment.
              </p>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Direct Contact & Office Info (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-neutral-950 p-8 rounded-2xl border border-white/12 space-y-6">
              <div>
                <span className="text-xs font-mono uppercase text-neutral-400 block tracking-widest mb-1">
                  Instant Connection
                </span>
                <h3 className="archivo-wide text-2xl font-bold text-white">
                  Direct Line & WhatsApp
                </h3>
              </div>

              <div className="space-y-4 pt-2">
                <a
                  href="https://wa.me/919916728506"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 rounded-xl bg-[#25D366]/10 border border-[#25D366]/30 hover:bg-[#25D366]/20 transition-all text-white group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#25D366] text-black flex items-center justify-center font-bold">
                      <MessageCircle className="w-5 h-5 fill-current" />
                    </div>
                    <div>
                      <div className="text-xs font-mono text-neutral-400 uppercase">WhatsApp Instant Chat</div>
                      <div className="text-sm font-semibold text-white">+91 99167 8506</div>
                    </div>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-[#25D366] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                <a
                  href="tel:+91991678506"
                  className="flex items-center justify-between p-4 rounded-xl bg-neutral-900 border border-white/10 hover:border-white/30 transition-all text-white group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-mono text-neutral-400 uppercase">Direct Voice Call</div>
                      <div className="text-sm font-semibold text-white">+91 99167 8506</div>
                    </div>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-neutral-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                <a
                  href="mailto:hello@astroxdigitalmarketing.in"
                  className="flex items-center justify-between p-4 rounded-xl bg-neutral-900 border border-white/10 hover:border-white/30 transition-all text-white group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-mono text-neutral-400 uppercase">Work Inquiries Email</div>
                      <div className="text-sm font-semibold text-white">hello@astroxdigitalmarketing.in</div>
                    </div>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-neutral-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>

              <div className="pt-6 border-t border-white/10 space-y-4">
                <div className="flex items-start gap-3 text-xs text-neutral-300 font-mono">
                  <MapPin className="w-4 h-4 text-white shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-white">{ASTROX_PROFILE.name}</p>
                    <p className="mt-1">{ASTROX_PROFILE.address.line1},</p>
                    <p>{ASTROX_PROFILE.address.line2},</p>
                    <p>{ASTROX_PROFILE.address.area},</p>
                    <p>{ASTROX_PROFILE.address.state} – {ASTROX_PROFILE.address.pin}, {ASTROX_PROFILE.address.country}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs text-neutral-400 font-mono pt-2">
                  <Clock className="w-4 h-4 text-white shrink-0" />
                  <span>Mon – Sat: 9:00 AM – 8:00 PM IST</span>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Full Interactive Booking / Inquiry Form (7 cols) */}
          <div className="lg:col-span-7 bg-neutral-950 p-8 md:p-12 rounded-2xl border border-white/12">
            
            {submitted ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 rounded-full bg-white text-black mx-auto flex items-center justify-center mb-6 shadow-2xl">
                  <Check className="w-10 h-10 stroke-[2.5]" />
                </div>

                <h3 className="archivo-display text-4xl font-bold text-white mb-3">
                  DISCOVERY SESSION CONFIRMED
                </h3>

                <p className="font-inter-tight text-neutral-300 text-base max-w-lg mx-auto leading-relaxed">
                  Thank you, <span className="text-white font-semibold">{formData.fullName}</span>. An AstroX Principal Strategist from our Bengaluru headquarters will review your requirements and reach out within 4 business hours.
                </p>

                <div className="mt-8 p-6 rounded-xl bg-neutral-900 border border-white/10 text-xs text-neutral-400 font-mono max-w-md mx-auto text-left space-y-2">
                  <div>Confirmation ID: <span className="text-white">AX-{Date.now().toString().slice(-6)}</span></div>
                  <div>Selected Services: <span className="text-white">{formData.services.join(', ') || 'Custom Strategy'}</span></div>
                  <div>Monthly Budget (INR): <span className="text-white">{formData.budget}</span></div>
                </div>

                <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                  <button
                    onClick={handleWhatsAppRedirect}
                    className="px-8 py-3.5 bg-[#25D366] text-black font-semibold rounded-full flex items-center gap-2 text-sm btn-lift shadow-lg cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Instant Connect on WhatsApp (+91 99167 8506)</span>
                  </button>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-full cursor-pointer transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">
                  <span className="text-white">●</span>
                  <span>Secure Client Intake</span>
                </div>

                <h2 className="archivo-display text-3xl font-bold text-white">
                  SCHEDULE DISCOVERY CALL
                </h2>
                <p className="font-inter-tight text-sm text-neutral-400 mt-1">
                  Fill in your project parameters below for an immediate callback and custom proposal.
                </p>

                {errorMsg && (
                  <div className="mt-4 p-3 bg-red-950/60 border border-red-500/50 rounded-lg text-xs text-red-300">
                    {errorMsg}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                  
                  {/* Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-mono uppercase text-neutral-400 mb-2">
                        Your Name *
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
                        <input
                          type="text"
                          required
                          placeholder="e.g. Yashas Rao"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 bg-neutral-900 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-white/40"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-neutral-400 mb-2">
                        Work Email *
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
                        <input
                          type="email"
                          required
                          placeholder="name@company.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 bg-neutral-900 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-white/40"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Phone & Company */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-mono uppercase text-neutral-400 mb-2">
                        Phone / WhatsApp Number *
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
                        <input
                          type="tel"
                          required
                          placeholder="+91 99167 8506"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 bg-neutral-900 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-white/40"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-neutral-400 mb-2">
                        Company / Website URL
                      </label>
                      <div className="relative">
                        <Building2 className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
                        <input
                          type="text"
                          placeholder="e.g. acmebrand.com"
                          value={formData.companyName}
                          onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 bg-neutral-900 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-white/40"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Services Selector */}
                  <div>
                    <label className="block text-xs font-mono uppercase text-neutral-400 mb-2">
                      Select Required Capabilities
                    </label>
                    <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto p-1 bg-neutral-900/50 rounded-xl border border-white/10">
                      {SERVICES_CATALOG.map((s) => {
                        const active = formData.services.includes(s.name);
                        return (
                          <button
                            type="button"
                            key={s.id}
                            onClick={() => toggleService(s.name)}
                            className={`text-xs px-3.5 py-2 rounded-lg border transition-all cursor-pointer ${
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

                  {/* Budget (INR) & Timeline */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-mono uppercase text-neutral-400 mb-2">
                        Monthly Budget (INR ₹)
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full px-4 py-3 bg-neutral-900 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-white/40 cursor-pointer"
                      >
                        {budgetOptions.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-neutral-400 mb-2">
                        Target Deployment Window
                      </label>
                      <select
                        value={formData.timeline}
                        onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                        className="w-full px-4 py-3 bg-neutral-900 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-white/40 cursor-pointer"
                      >
                        {timelineOptions.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-mono uppercase text-neutral-400 mb-2">
                      Project Notes / Objectives
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Tell us about your brand goals, target customers, or current challenges..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 bg-neutral-900 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-white/40"
                    />
                  </div>

                  {/* WhatsApp Direct Action */}
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={handleWhatsAppRedirect}
                      className="w-full py-4 bg-[#25D366] hover:bg-[#20ba5a] text-black rounded-full text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-lg transition-all btn-lift"
                    >
                      <MessageCircle className="w-5 h-5 fill-current" />
                      <span>Connect Instantly on WhatsApp (+91 99167 8506)</span>
                    </button>
                  </div>

                </form>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
