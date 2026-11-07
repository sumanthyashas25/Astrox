import React, { useState } from 'react';
import { ASTROX_PROFILE, SERVICES_CATALOG, MEDIA_ASSETS } from '../data/agencyData';
import { BookingFormState } from '../types';
import { Check, ArrowUpRight, MessageCircle, Building2, Mail, Phone, User, Clock, MapPin, Send } from 'lucide-react';

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

  const handleWhatsAppRedirect = () => {
    const text = encodeURIComponent(
      `Hello AstroX Team! I am interested in consulting with your agency for: ${formData.services.join(', ') || 'Digital Marketing'}. My name is ${formData.fullName || 'a potential client'} and company is ${formData.companyName || 'our brand'}. Target budget: ${formData.budget}.`
    );
    window.open(`https://wa.me/91991678506?text=${text}`, '_blank');
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

  return (
    <div className="w-full bg-[#dadada] text-[#111111] min-h-screen pt-24 lg:pt-[calc(130*var(--u))] pb-20 px-4 md:px-12 animate-in fade-in duration-300 select-none">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Editorial Top Kicker & Header */}
        <div className="border-b border-black/10 pb-8 lg:pb-12 mb-10">
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono uppercase tracking-[0.2em] text-neutral-600 mb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 text-[#111111] font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#111111] animate-pulse" />
              <span>Direct Discovery Channel</span>
              <span className="text-neutral-400">·</span>
              <span>Bengaluru HQ</span>
            </div>
            <div className="flex items-center gap-2 text-neutral-500">
              <Clock className="w-3.5 h-3.5 text-neutral-700" />
              <span>Available Mon–Sat · Response &lt; 4 Hours</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <h1 className="archivo-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-[#111111] leading-[0.92]">
                START A<br />CONVERSATION
              </h1>
            </div>
            <div className="lg:col-span-4">
              <p className="font-inter-tight text-neutral-700 text-sm sm:text-base leading-relaxed font-medium">
                Direct strategic alignment with senior growth engineers at our Bengaluru studio. No junior middlemen or account managers—just data-backed performance marketing.
              </p>
            </div>
          </div>
        </div>

        {/* Main Content Grid with Hero Aesthetic */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column (5 cols): Studio Card, Direct Line, Fast Connect & Location */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Dark Studio Identity Card (Matching Hero Stats Frame) */}
            <div className="bg-[#191919] text-white rounded-2xl p-7 shadow-xl border border-black/10 flex flex-col justify-between relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-neutral-400 pb-3 border-b border-white/10">
                  <span>Direct Communication</span>
                  <span className="text-white font-bold">AstroX HQ</span>
                </div>

                <div className="mt-5">
                  <span className="text-[11px] font-mono uppercase text-neutral-400 tracking-widest block mb-1">
                    Instant Connect
                  </span>
                  <h3 className="archivo-wide text-2xl font-bold text-white tracking-tight">
                    WhatsApp & Voice Line
                  </h3>
                </div>

                <div className="space-y-3 mt-6">
                  {/* WhatsApp Direct */}
                  <a
                    href="https://wa.me/91991678506"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 transition-all text-white group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#25D366] text-black flex items-center justify-center font-bold">
                        <MessageCircle className="w-5 h-5 fill-current" />
                      </div>
                      <div>
                        <div className="text-[11px] font-mono text-neutral-300 uppercase">Instant WhatsApp Chat</div>
                        <div className="text-sm font-semibold text-white">+91 99167 8506</div>
                      </div>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-[#25D366] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>

                  {/* Direct Phone */}
                  <a
                    href="tel:+91991678506"
                    className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-white group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-[11px] font-mono text-neutral-400 uppercase">Direct Voice Call</div>
                        <div className="text-sm font-semibold text-white">+91 99167 8506</div>
                      </div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>

                  {/* Work Email */}
                  <a
                    href="mailto:hello@astroxdigitalmarketing.in"
                    className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-white group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-[11px] font-mono text-neutral-400 uppercase">Inquiries & RFPs</div>
                        <div className="text-sm font-semibold text-white truncate max-w-[200px]">hello@astroxdigitalmarketing.in</div>
                      </div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>

              {/* Physical Office Address */}
              <div className="relative z-10 pt-6 mt-6 border-t border-white/10 space-y-2 text-xs font-mono text-neutral-300">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-white shrink-0 mt-0.5" />
                  <div className="leading-relaxed">
                    <span className="text-white font-semibold block">{ASTROX_PROFILE.name}</span>
                    <span>{ASTROX_PROFILE.address.line1}, {ASTROX_PROFILE.address.line2},</span><br />
                    <span>{ASTROX_PROFILE.address.area}, {ASTROX_PROFILE.address.state} – {ASTROX_PROFILE.address.pin}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* True Growth Light Frosted Pill Card (Matching Hero Right Column) */}
            <div className="glass-pill-light rounded-2xl p-6 border border-black/10 shadow-sm flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-[#111111] text-white flex items-center justify-center text-xs">
                    <Check className="w-3 h-3" />
                  </div>
                  <span className="font-archivo text-sm font-bold text-[#111111]">True Growth Guaranteed</span>
                </div>
                <p className="font-inter-tight text-xs text-neutral-600 mt-1 font-medium">
                  We focus exclusively on revenue, ROAS, and real pipeline rather than vanity dashboard numbers.
                </p>
              </div>
            </div>

          </div>

          {/* Right Column (7 cols): Hero Paper Aesthetic Interactive Form Container */}
          <div className="lg:col-span-7 bg-white/80 backdrop-blur-md rounded-2xl p-7 md:p-10 border border-black/10 shadow-lg">
            
            {submitted ? (
              /* Success State */
              <div className="text-center py-12 space-y-5">
                <div className="w-16 h-16 rounded-full bg-[#111111] text-white mx-auto flex items-center justify-center shadow-lg">
                  <Check className="w-8 h-8 stroke-[2.5]" />
                </div>

                <h3 className="archivo-display text-3xl sm:text-4xl font-bold text-[#111111]">
                  DISCOVERY REQUEST LOGGED
                </h3>

                <p className="font-inter-tight text-neutral-700 text-sm sm:text-base max-w-md mx-auto leading-relaxed font-medium">
                  Thank you, <span className="text-[#111111] font-semibold">{formData.fullName}</span>. An AstroX Principal Strategist will review your project parameters and respond within 4 business hours.
                </p>

                <div className="p-5 rounded-xl bg-neutral-100 border border-neutral-300 text-xs font-mono text-neutral-700 max-w-md mx-auto text-left space-y-1.5">
                  <div>Reference: <span className="font-semibold text-black">AX-DIR-{Date.now().toString().slice(-6)}</span></div>
                  <div>Selected Services: <span className="font-semibold text-black">{formData.services.join(', ') || 'Custom Strategy'}</span></div>
                  <div>Monthly Budget Tier: <span className="font-semibold text-black">{formData.budget}</span></div>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={handleWhatsAppRedirect}
                    className="w-full sm:w-auto px-6 py-3.5 bg-[#25D366] hover:bg-[#20ba5a] text-black font-semibold rounded-full flex items-center justify-center gap-2 text-sm btn-lift shadow-md cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>Instant WhatsApp Chat</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="w-full sm:w-auto px-6 py-3.5 bg-neutral-200 hover:bg-neutral-300 text-neutral-800 text-xs font-semibold rounded-full transition-colors cursor-pointer"
                  >
                    Edit / Submit Another
                  </button>
                </div>
              </div>
            ) : (
              /* Interactive Discovery Form */
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-black/10 mb-6">
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 block">
                      Client Parameters
                    </span>
                    <h2 className="archivo-wide text-2xl font-bold text-[#111111]">
                      Request Project Discovery
                    </h2>
                  </div>
                  <span className="text-xs font-mono text-neutral-500 hidden sm:inline-block">
                    ● Direct Response
                  </span>
                </div>

                {errorMsg && (
                  <div className="mb-6 p-3 bg-red-100 border border-red-300 rounded-xl text-xs text-red-700 font-medium">
                    {errorMsg}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  
                  {/* Name & Work Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase text-neutral-700 mb-1.5 font-semibold">
                        Your Name *
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                        <input
                          type="text"
                          required
                          placeholder="e.g. Yashas Rao"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          className="w-full pl-10 pr-3 py-2.5 bg-white border border-black/15 rounded-xl text-sm text-[#111111] placeholder-neutral-400 focus:outline-none focus:border-black transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-neutral-700 mb-1.5 font-semibold">
                        Work Email *
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                        <input
                          type="email"
                          required
                          placeholder="name@company.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full pl-10 pr-3 py-2.5 bg-white border border-black/15 rounded-xl text-sm text-[#111111] placeholder-neutral-400 focus:outline-none focus:border-black transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Phone & Company Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase text-neutral-700 mb-1.5 font-semibold">
                        Phone / WhatsApp Number
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                        <input
                          type="tel"
                          placeholder="+91 99167 8506"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full pl-10 pr-3 py-2.5 bg-white border border-black/15 rounded-xl text-sm text-[#111111] placeholder-neutral-400 focus:outline-none focus:border-black transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-neutral-700 mb-1.5 font-semibold">
                        Company Name / URL
                      </label>
                      <div className="relative">
                        <Building2 className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                        <input
                          type="text"
                          placeholder="e.g. acmebrand.com"
                          value={formData.companyName}
                          onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                          className="w-full pl-10 pr-3 py-2.5 bg-white border border-black/15 rounded-xl text-sm text-[#111111] placeholder-neutral-400 focus:outline-none focus:border-black transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Services Multi-Select Badges */}
                  <div>
                    <label className="block text-xs font-mono uppercase text-neutral-700 mb-2 font-semibold">
                      Required Services
                    </label>
                    <div className="flex flex-wrap gap-2 max-h-36 overflow-y-auto p-1 bg-white/60 rounded-xl border border-black/10">
                      {SERVICES_CATALOG.map((s) => {
                        const active = formData.services.includes(s.name);
                        return (
                          <button
                            type="button"
                            key={s.id}
                            onClick={() => toggleService(s.name)}
                            className={`text-xs px-3 py-1.5 rounded-lg border transition-all cursor-pointer font-medium ${
                              active
                                ? 'bg-[#111111] text-white border-black shadow-sm'
                                : 'bg-white text-neutral-700 border-black/10 hover:border-black/30'
                            }`}
                          >
                            {active ? '✓ ' : '+ '}{s.name}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Budget & Timeline Selectors */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase text-neutral-700 mb-1.5 font-semibold">
                        Monthly Budget Tier (INR ₹)
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full px-3 py-2.5 bg-white border border-black/15 rounded-xl text-sm text-[#111111] focus:outline-none focus:border-black transition-colors cursor-pointer"
                      >
                        {budgetOptions.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-neutral-700 mb-1.5 font-semibold">
                        Target Launch Window
                      </label>
                      <select
                        value={formData.timeline}
                        onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                        className="w-full px-3 py-2.5 bg-white border border-black/15 rounded-xl text-sm text-[#111111] focus:outline-none focus:border-black transition-colors cursor-pointer"
                      >
                        {timelineOptions.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Project Ambitions / Notes */}
                  <div>
                    <label className="block text-xs font-mono uppercase text-neutral-700 mb-1.5 font-semibold">
                      Project Notes & Objectives
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Share your revenue targets, current bottlenecks, or specific digital goals..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-black/15 rounded-xl text-sm text-[#111111] placeholder-neutral-400 focus:outline-none focus:border-black transition-colors"
                    />
                  </div>

                  {/* WhatsApp Direct Action */}
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={handleWhatsAppRedirect}
                      className="w-full px-6 py-4 bg-[#25D366] hover:bg-[#20ba5a] text-black font-semibold rounded-full text-sm flex items-center justify-center gap-2.5 cursor-pointer shadow-lg transition-all btn-lift"
                    >
                      <MessageCircle className="w-5 h-5 fill-current shrink-0" />
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
