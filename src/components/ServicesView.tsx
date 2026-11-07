import React, { useState } from 'react';
import { SERVICES_CATALOG } from '../data/agencyData';
import { ArrowUpRight, Check, Search, MessageCircle } from 'lucide-react';

interface ServicesViewProps {
  onOpenBookingWithService?: (serviceName: string) => void;
}

export const ServicesView: React.FC<ServicesViewProps> = ({ onOpenBookingWithService }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'performance' | 'technology' | 'creative' | 'strategy'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'performance', label: 'Performance & Ads' },
    { id: 'technology', label: 'Web & SEO' },
    { id: 'creative', label: 'Creative & 3D' },
    { id: 'strategy', label: 'Strategy & Brand' },
  ];

  const filteredServices = SERVICES_CATALOG.filter((service) => {
    const matchesCategory = activeCategory === 'all' || service.category === activeCategory;
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          service.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleWhatsAppService = (serviceName: string) => {
    const text = encodeURIComponent(`Hello AstroX Team! I am interested in your service: ${serviceName}. Let's discuss details.`);
    window.open(`https://wa.me/91991678506?text=${text}`, '_blank');
  };

  return (
    <div className="w-full bg-black text-[#f4f4f4] min-h-screen pt-24 lg:pt-[calc(140*var(--u))] pb-20 px-4 md:px-12 animate-in fade-in duration-300">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Simple & Clean Header */}
        <div className="border-b border-white/14 pb-8 lg:pb-12 mb-8">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-neutral-400 mb-4">
            <span>AstroX Core Offerings</span>
            <span>·</span>
            <span>Bengaluru HQ</span>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="archivo-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[0.95]">
                OUR SERVICES
              </h1>
              <p className="max-w-xl font-inter-tight text-neutral-300 text-sm sm:text-base leading-relaxed mt-4">
                Transparent, high-impact digital marketing and engineering services designed to scale your brand profitably. Select a service to connect instantly or book a strategy session.
              </p>
            </div>

            {/* Search Input */}
            <div className="w-full md:w-80">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search services (e.g. SEO, Ads)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-neutral-900 border border-white/15 rounded-full text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white/40"
                />
              </div>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 mt-8">
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

        {/* Simplified Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredServices.map((service, index) => (
            <div
              key={service.id}
              className="bg-neutral-950/90 rounded-2xl p-7 border border-white/12 hover:border-white/30 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono uppercase text-neutral-500 pb-3 border-b border-white/10">
                  <span>{String(index + 1).padStart(2, '0')}.</span>
                  <span className="tracking-widest">{service.category}</span>
                </div>

                <h3 className="archivo-wide text-xl font-bold text-white mt-5 tracking-tight group-hover:text-neutral-200">
                  {service.name}
                </h3>

                <p className="text-xs text-neutral-400 font-mono tracking-tight mt-1">
                  {service.tagline}
                </p>

                <p className="font-inter-tight text-sm text-neutral-300 leading-relaxed mt-4">
                  {service.description}
                </p>

                {/* Key Deliverables Bullet Points */}
                <div className="mt-6 pt-4 border-t border-white/10 space-y-2">
                  <span className="text-[11px] font-mono uppercase text-neutral-400 block tracking-wider">
                    Highlights:
                  </span>
                  {service.deliverables.slice(0, 3).map((item, dIdx) => (
                    <div key={dIdx} className="flex items-center gap-2 text-xs text-neutral-300">
                      <Check className="w-3.5 h-3.5 text-white shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] font-mono uppercase text-neutral-500 block">Verified Metric</span>
                  <span className="text-xs font-semibold text-white">{service.metrics}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleWhatsAppService(service.name)}
                    className="px-3.5 py-2 rounded-full bg-[#25D366]/10 border border-[#25D366]/30 hover:bg-[#25D366]/20 text-[#25D366] text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer"
                    title="Instant chat on WhatsApp"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </button>

                  {onOpenBookingWithService && (
                    <button
                      onClick={() => onOpenBookingWithService(service.name)}
                      className="w-9 h-9 rounded-full bg-white text-black hover:bg-neutral-200 flex items-center justify-center transition-transform btn-lift cursor-pointer"
                      title="Book consultation"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-20 text-neutral-400 font-mono text-sm">
            No services found matching "{searchQuery}". Try a different keyword.
          </div>
        )}

      </div>
    </div>
  );
};
