import React, { useState } from 'react';
import { CASE_STUDIES } from '../data/agencyData';
import { ArrowUpRight, CheckCircle2, TrendingUp } from 'lucide-react';

interface WorksViewProps {
  onOpenBooking: () => void;
  onSelectCaseStudy: (caseId: string) => void;
}

export const WorksView: React.FC<WorksViewProps> = ({ onOpenBooking, onSelectCaseStudy }) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  return (
    <div className="w-full bg-black text-[#f4f4f4] min-h-screen pt-[calc(140*var(--u))] md:pt-[calc(150*var(--u))] pb-20 px-4 md:px-12">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Header */}
        <div className="border-b border-white/14 pb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-400 mb-4">
              Curated Portfolio · 2025 – 2026 Releases
            </div>
            <h1 className="archivo-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[0.95]">
              VERIFIED<br />OUTCOMES
            </h1>
          </div>
          <p className="max-w-md font-inter-tight text-neutral-400 text-sm sm:text-base leading-relaxed">
            Case studies grounded in hard numbers: scalable customer acquisition, sub-second web experiences, and commanding brand identities for startups and disruptors.
          </p>
        </div>

        {/* Case Studies Showcase */}
        <div className="mt-14 space-y-16">
          {CASE_STUDIES.map((study, idx) => (
            <div
              key={study.id}
              className="bg-neutral-950 border border-white/14 rounded-2xl overflow-hidden hover:border-white/30 transition-all duration-300"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                
                {/* Media Column (5 cols) */}
                <div className="lg:col-span-5 relative min-h-[340px] lg:min-h-[460px] overflow-hidden group">
                  <img
                    src={study.image}
                    alt={study.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  <div className="absolute top-6 left-6 px-3 py-1 bg-black/70 backdrop-blur-md rounded-full text-xs font-mono tracking-wider uppercase text-white/90 border border-white/20">
                    {study.category}
                  </div>

                  <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                    <div>
                      <div className="text-xs text-white/70 font-mono uppercase">Case #{String(idx + 1).padStart(2, '0')}</div>
                      <div className="archivo-display text-3xl font-bold text-white">{study.title}</div>
                    </div>
                    <button
                      onClick={() => onSelectCaseStudy(study.id)}
                      className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center btn-lift shadow-lg cursor-pointer"
                    >
                      <ArrowUpRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Details Column (7 cols) */}
                <div className="lg:col-span-7 p-8 md:p-12 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono text-neutral-500 pb-4 border-b border-white/10">
                      <span>Client: {study.client}</span>
                      <span>Launch: {study.year}</span>
                    </div>

                    <h3 className="archivo-wide text-2xl font-bold text-white mt-6">
                      {study.summary}
                    </h3>

                    {/* Challenge & Solution */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                      <div className="bg-neutral-900/40 p-4 rounded-xl border border-white/5">
                        <span className="text-[11px] font-mono uppercase text-neutral-400 block mb-2">
                          The Challenge
                        </span>
                        <p className="text-xs text-neutral-300 leading-relaxed">
                          {study.challenge}
                        </p>
                      </div>

                      <div className="bg-neutral-900/40 p-4 rounded-xl border border-white/5">
                        <span className="text-[11px] font-mono uppercase text-neutral-400 block mb-2">
                          AstroX Architecture
                        </span>
                        <p className="text-xs text-neutral-300 leading-relaxed">
                          {study.solution}
                        </p>
                      </div>
                    </div>

                    {/* Metrics Strip */}
                    <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-white/10">
                      {study.results.map((res, rIdx) => (
                        <div key={rIdx} className="text-center sm:text-left">
                          <div className="archivo-wide text-2xl sm:text-3xl font-bold text-white">
                            {res.stat}
                          </div>
                          <div className="text-[11px] text-neutral-400 font-mono mt-1 uppercase tracking-tight">
                            {res.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Testimonial Quote */}
                  {study.testimonial && (
                    <div className="mt-8 pt-6 border-t border-white/10 flex items-start gap-3">
                      <div className="text-2xl text-neutral-600 font-serif leading-none">“</div>
                      <div>
                        <p className="text-xs italic text-neutral-300 leading-relaxed font-inter-tight">
                          {study.testimonial.quote}
                        </p>
                        <div className="text-[11px] font-semibold text-white mt-2">
                          {study.testimonial.author} · <span className="text-neutral-400 font-normal">{study.testimonial.role}</span>
                        </div>
                      </div>
                    </div>
                  )}

                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 border-t border-white/14 pt-12 text-center">
          <h3 className="archivo-display text-3xl font-bold text-white">
            Ready for your brand's defining launch?
          </h3>
          <p className="font-inter-tight text-neutral-400 text-sm max-w-lg mx-auto mt-2">
            Schedule a confidential discovery session with the AstroX strategic team in Bengaluru.
          </p>
          <button
            onClick={onOpenBooking}
            className="mt-6 px-8 py-3.5 bg-white text-black hover:bg-neutral-200 rounded-full font-semibold text-sm inline-flex items-center gap-2 btn-lift shadow-xl cursor-pointer"
          >
            <span>Book Discovery Call</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
