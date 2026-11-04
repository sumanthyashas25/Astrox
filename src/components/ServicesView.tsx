import React, { useState } from 'react';
import { SERVICES_CATALOG } from '../data/agencyData';
import { ArrowUpRight, Check, Sparkles, Filter, Calculator } from 'lucide-react';

interface ServicesViewProps {
  onOpenBookingWithService?: (serviceName: string) => void;
}

export const ServicesView: React.FC<ServicesViewProps> = ({ onOpenBookingWithService }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'performance' | 'technology' | 'creative' | 'strategy'>('all');
  const [selectedServices, setSelectedServices] = useState<string[]>(['google-ads', 'website-design']);

  const categories = [
    { id: 'all', label: 'All Capabilities' },
    { id: 'performance', label: 'Performance & Paid' },
    { id: 'technology', label: 'Web & Engineering' },
    { id: 'creative', label: 'Creative & 3D Tours' },
    { id: 'strategy', label: 'Strategy & Brand' },
  ];

  const filteredServices = activeCategory === 'all'
    ? SERVICES_CATALOG
    : SERVICES_CATALOG.filter((s) => s.category === activeCategory);

  const toggleSelect = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="w-full bg-black text-[#f4f4f4] min-h-screen py-16 px-4 md:px-12">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Editorial Header */}
        <div className="border-b border-white/14 pb-12">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-neutral-400 mb-4">
            <span>AstroX Capabilities</span>
            <span>·</span>
            <span>Bengaluru HQ</span>
            <span>·</span>
            <span>Engineered for 2025 & Beyond</span>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h1 className="archivo-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[0.95]">
              SURGICAL<br />CAPABILITIES
            </h1>
            <p className="max-w-md font-inter-tight text-neutral-400 text-sm sm:text-base leading-relaxed">
              Every service is engineered as a compounding growth asset. No vanity metrics or bloated retainers—just quantifiable pipeline, category-defining design, and measurable ROI.
            </p>
          </div>

          {/* Interactive Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 mt-10">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`px-4 py-2 rounded-full text-xs font-medium tracking-tight transition-all duration-200 cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-white text-black font-semibold shadow-md'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white border border-white/10'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {filteredServices.map((service, index) => {
            const isSelected = selectedServices.includes(service.id);
            return (
              <div
                key={service.id}
                className={`relative group rounded-xl p-7 flex flex-col justify-between transition-all duration-300 border ${
                  isSelected
                    ? 'bg-neutral-900/90 border-white/40 shadow-[0_12px_36px_rgba(255,255,255,0.06)]'
                    : 'bg-neutral-950/80 border-white/12 hover:border-white/30 hover:bg-neutral-900/40'
                }`}
              >
                {/* Header with numbering & category */}
                <div>
                  <div className="flex items-center justify-between text-xs font-mono uppercase text-neutral-500 pb-4 border-b border-white/10">
                    <span>{String(index + 1).padStart(2, '0')}.</span>
                    <span className="tracking-widest">{service.category}</span>
                  </div>

                  <h3 className="archivo-wide text-2xl font-bold text-white mt-4 tracking-tight group-hover:text-neutral-100">
                    {service.name}
                  </h3>

                  <p className="text-xs text-neutral-400 font-mono tracking-tight mt-1">
                    {service.tagline}
                  </p>

                  <p className="font-inter-tight text-sm text-neutral-300 leading-relaxed mt-4">
                    {service.description}
                  </p>

                  {/* Deliverables List */}
                  <div className="mt-6 pt-4 border-t border-white/10 space-y-2">
                    <span className="text-[11px] font-mono uppercase text-neutral-400 block tracking-wider">
                      Core Deliverables:
                    </span>
                    {service.deliverables.map((item, dIdx) => (
                      <div key={dIdx} className="flex items-center gap-2 text-xs text-neutral-300">
                        <Check className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Metric and Action */}
                <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-neutral-500 block">Verified Impact</span>
                    <span className="text-xs font-semibold text-white">{service.metrics}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleSelect(service.id)}
                      className={`text-xs px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-white text-black font-semibold border-white'
                          : 'border-white/20 text-neutral-400 hover:text-white hover:border-white/50'
                      }`}
                    >
                      {isSelected ? 'Selected ✓' : '+ Add to Scope'}
                    </button>
                    {onOpenBookingWithService && (
                      <button
                        onClick={() => onOpenBookingWithService(service.name)}
                        className="w-8 h-8 rounded-full bg-neutral-900 border border-white/20 hover:bg-white hover:text-black text-white flex items-center justify-center transition-colors btn-lift"
                        title="Book Consultation for this service"
                      >
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Scope & Growth Estimator Bar */}
        <div className="mt-16 bg-neutral-950 border border-white/20 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white shrink-0">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-archivo text-xl font-bold text-white">
                Project Scope Estimator
              </h4>
              <p className="text-xs text-neutral-400 mt-1">
                {selectedServices.length} service{selectedServices.length === 1 ? '' : 's'} selected for unified campaign launch.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="text-right">
              <span className="text-[11px] font-mono uppercase text-neutral-400 block">Estimated Launch Window</span>
              <span className="text-sm font-semibold text-white">2–4 Weeks to Live Deployment</span>
            </div>
            <button
              onClick={() => onOpenBookingWithService && onOpenBookingWithService(selectedServices.join(', '))}
              className="bg-white text-black hover:bg-neutral-200 px-6 py-3 rounded-full font-semibold text-sm flex items-center gap-2 btn-lift shadow-lg cursor-pointer"
            >
              <span>Build My Campaign Engine</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
