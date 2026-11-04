import React from 'react';
import { CASE_STUDIES } from '../data/agencyData';
import { X, ArrowUpRight, CheckCircle2 } from 'lucide-react';

interface CaseStudyModalProps {
  caseId: string | null;
  onClose: () => void;
  onOpenBooking: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  caseId,
  onClose,
  onOpenBooking,
}) => {
  if (!caseId) return null;

  const study = CASE_STUDIES.find((c) => c.id === caseId) || CASE_STUDIES[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#0e0e0e] border border-white/20 rounded-2xl overflow-hidden shadow-2xl text-[#f4f4f4] my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-black/60 backdrop-blur-md hover:bg-black/90 flex items-center justify-center text-white transition-colors cursor-pointer border border-white/20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Image */}
        <div className="relative h-[320px] sm:h-[400px] w-full overflow-hidden">
          <img
            src={study.image}
            alt={study.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-black/40 to-transparent" />
          
          <div className="absolute bottom-8 left-8 right-8">
            <span className="px-3 py-1 bg-black/80 backdrop-blur-md rounded-full text-xs font-mono uppercase tracking-wider text-white border border-white/20">
              {study.category}
            </span>
            <h2 className="archivo-display text-4xl sm:text-5xl font-bold text-white mt-3">
              {study.title}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 font-mono mt-1">
              Client: {study.client} · Year: {study.year}
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-8 sm:p-10 space-y-8">
          
          {/* Summary & Metrics */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">
              Executive Overview
            </h4>
            <p className="font-inter-tight text-lg text-neutral-200 leading-relaxed">
              {study.summary}
            </p>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-6 rounded-xl bg-neutral-900/60 border border-white/10">
            {study.results.map((res, i) => (
              <div key={i} className="text-center sm:text-left">
                <div className="archivo-wide text-3xl font-bold text-white">{res.stat}</div>
                <div className="text-xs text-neutral-400 font-mono uppercase mt-1">{res.label}</div>
              </div>
            ))}
          </div>

          {/* Challenge and Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl bg-neutral-900/40 border border-white/10">
              <span className="text-xs font-mono uppercase text-neutral-400 block mb-2">01. The Challenge</span>
              <p className="text-sm text-neutral-300 leading-relaxed font-inter-tight">
                {study.challenge}
              </p>
            </div>

            <div className="p-6 rounded-xl bg-neutral-900/40 border border-white/10">
              <span className="text-xs font-mono uppercase text-neutral-400 block mb-2">02. AstroX Solution</span>
              <p className="text-sm text-neutral-300 leading-relaxed font-inter-tight">
                {study.solution}
              </p>
            </div>
          </div>

          {/* Testimonial */}
          {study.testimonial && (
            <div className="p-6 rounded-xl bg-neutral-900/20 border-l-2 border-white/40 pl-6">
              <p className="italic text-neutral-300 text-sm leading-relaxed">
                “{study.testimonial.quote}”
              </p>
              <div className="text-xs text-white font-semibold mt-2">
                {study.testimonial.author} — <span className="text-neutral-400 font-normal">{study.testimonial.role}</span>
              </div>
            </div>
          )}

          {/* Modal Footer CTA */}
          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-neutral-400 font-mono">
              Want similar results for your business?
            </div>
            <button
              onClick={() => {
                onClose();
                onOpenBooking();
              }}
              className="w-full sm:w-auto px-6 py-3 bg-white text-black hover:bg-neutral-200 rounded-full font-semibold text-sm flex items-center justify-center gap-2 btn-lift shadow-lg cursor-pointer"
            >
              <span>Schedule Strategy Session</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
