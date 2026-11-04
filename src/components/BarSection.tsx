import React from 'react';
import { ArrowDown } from 'lucide-react';

interface BarSectionProps {
  onScrollToManifesto: () => void;
}

export const BarSection: React.FC<BarSectionProps> = ({ onScrollToManifesto }) => {
  return (
    <div className="w-full bg-[#000000] border-b border-[rgba(255,255,255,0.14)] select-none">
      <div className="mx-auto w-full max-w-[1440px] h-[calc(111*var(--u))] min-h-[58px] px-4 sm:px-6 md:px-10 lg:px-14 flex items-center justify-between">
        
        {/* Left: EST 2025 (year in grey) */}
        <div className="archivo-wide text-[calc(14*var(--u))] text-xs md:text-[calc(14*var(--u))] tracking-[0.14em] uppercase font-semibold">
          <span className="text-white">EST </span>
          <span className="text-[#6f6f6f]">2025 · BENGALURU</span>
        </div>

        {/* Middle: SCROLL DOWN with a white round arrow */}
        <button
          onClick={onScrollToManifesto}
          className="group flex items-center gap-[calc(10*var(--u))] cursor-pointer py-2 px-3 rounded-full hover:bg-white/5 transition-colors"
          aria-label="Scroll down to manifesto"
        >
          <span className="archivo-wide text-[calc(14*var(--u))] text-xs md:text-[calc(14*var(--u))] text-white tracking-[0.14em] uppercase font-semibold">
            SCROLL DOWN
          </span>
          <div className="w-[calc(28*var(--u))] h-[calc(28*var(--u))] w-7 h-7 rounded-full bg-white text-black flex items-center justify-center transition-transform duration-300 group-hover:translate-y-1">
            <ArrowDown className="w-[calc(14*var(--u))] h-[calc(14*var(--u))] w-3.5 h-3.5" />
          </div>
        </button>

        {/* Right: LIVE IN DETAILS (grey) */}
        <div className="archivo-wide text-[calc(14*var(--u))] text-xs md:text-[calc(14*var(--u))] text-[#6f6f6f] tracking-[0.14em] uppercase font-semibold">
          <span>LIVE IN DETAILS</span>
        </div>

      </div>
    </div>
  );
};
