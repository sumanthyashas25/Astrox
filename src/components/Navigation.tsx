import React, { useState, useRef, useEffect } from 'react';
import { PageTab } from '../types';
import { ASTROX_PROFILE } from '../data/agencyData';
import { AstroXLogo } from './AstroXLogo';
import { ArrowUpRight } from 'lucide-react';

interface NavigationProps {
  activeTab: PageTab;
  onTabChange: (tab: PageTab) => void;
  onOpenBooking: () => void;
  isScrolled?: boolean;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  onTabChange,
  onOpenBooking,
}) => {
  const [hoveredTab, setHoveredTab] = useState<PageTab | null>(null);
  const [pillStyle, setPillStyle] = useState<{ left: number; width: number }>({ left: 0, width: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<{ [key in PageTab]?: HTMLButtonElement | null }>({});

  const navItems: { tab: PageTab; label: string }[] = [
    { tab: 'home', label: 'Home' },
    { tab: 'services', label: 'Services' },
    { tab: 'studio', label: 'Studio' },
    { tab: 'contact', label: 'Contact' },
  ];

  // Update sliding black pill position
  const targetTab = hoveredTab || activeTab;

  useEffect(() => {
    const activeEl = buttonRefs.current[targetTab];
    const containerEl = containerRef.current;
    if (activeEl && containerEl) {
      const activeRect = activeEl.getBoundingClientRect();
      const containerRect = containerEl.getBoundingClientRect();
      setPillStyle({
        left: activeRect.left - containerRect.left,
        width: activeRect.width,
      });
    }
  }, [targetTab, activeTab]);

  return (
    <>
      {/* Desktop Navigation at absolute coordinates (57, 61) / (1237, 63) (>= 1024px) */}
      <div className="hidden lg:block pointer-events-none absolute inset-x-0 top-0 z-40">
        <div className="relative mx-auto w-full max-w-[1440px]">
          {/* Brand Logo & Segmented Pill at (57, 61) */}
          <div
            className="pointer-events-auto absolute flex items-center gap-[calc(20*var(--u))]"
            style={{
              left: 'calc(57 * var(--u))',
              top: 'calc(61 * var(--u))',
            }}
          >
            {/* Animated AstroX Logo */}
            <div className="bg-white/95 backdrop-blur-md px-[calc(18*var(--u))] h-[calc(48*var(--u))] rounded-full flex items-center shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-neutral-200/80">
              <AstroXLogo
                size="sm"
                onClick={() => onTabChange('home')}
                className="text-[#111111]"
              />
            </div>

            {/* Segmented Pill */}
            <div
              ref={containerRef}
              onMouseLeave={() => setHoveredTab(null)}
              className="relative flex items-center h-[calc(48*var(--u))] bg-white/95 backdrop-blur-md rounded-full p-[calc(4*var(--u))] shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-neutral-200/80 transition-shadow duration-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.12)]"
            >
              {/* Sliding black pill */}
              <div
                className="absolute top-[calc(4*var(--u))] bottom-[calc(4*var(--u))] bg-[#111111] rounded-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                  left: `${pillStyle.left}px`,
                  width: `${pillStyle.width}px`,
                }}
              />

              {navItems.map((item) => {
                const isCurrent = targetTab === item.tab;
                return (
                  <button
                    key={item.tab}
                    ref={(el) => {
                      buttonRefs.current[item.tab] = el;
                    }}
                    onClick={() => onTabChange(item.tab)}
                    onMouseEnter={() => setHoveredTab(item.tab)}
                    className={`relative z-10 px-[calc(18*var(--u))] h-full flex items-center justify-center text-[calc(14*var(--u))] font-medium tracking-tight whitespace-nowrap transition-colors duration-200 ${
                      isCurrent ? 'text-white font-semibold' : 'text-neutral-700 hover:text-neutral-950'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Top Right Date */}
          <div
            className={`pointer-events-auto absolute font-inter-tight text-[calc(13.5*var(--u))] font-medium tracking-tight whitespace-nowrap select-none transition-colors duration-300 ${
              activeTab === 'home' ? 'text-neutral-600' : 'text-neutral-300'
            }`}
            style={{
              right: 'calc(230 * var(--u))',
              top: 'calc(70 * var(--u))',
            }}
          >
            <span>Wednesday / 04.11 – Nov 2026</span>
          </div>

          {/* Top Right Contact Us Button, 144 x 46u */}
          <div
            className="pointer-events-auto absolute"
            style={{
              right: 'calc(57 * var(--u))',
              top: 'calc(63 * var(--u))',
              width: 'calc(144 * var(--u))',
              height: 'calc(46 * var(--u))',
            }}
          >
            <button
              onClick={onOpenBooking}
              className={`w-full h-full rounded-full flex items-center justify-center gap-1.5 text-[calc(14*var(--u))] font-medium tracking-tight btn-lift shadow-sm cursor-pointer transition-all duration-200 ${
                activeTab === 'home'
                  ? 'bg-[#111111] text-white hover:bg-neutral-900'
                  : 'bg-white text-black hover:bg-neutral-200'
              }`}
            >
              <span>Contact Us</span>
              <ArrowUpRight className="w-[calc(15*var(--u))] h-[calc(15*var(--u))]" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Header (< 1024px) */}
      <div
        className={`lg:hidden sticky top-0 z-50 w-full backdrop-blur-md border-b px-2.5 py-2 flex items-center justify-between gap-1.5 overflow-hidden transition-colors duration-300 ${
          activeTab === 'home' ? 'bg-[#dadada]/95 border-black/10' : 'bg-black/95 border-white/10'
        }`}
      >
        {/* Animated AstroX Logo */}
        <AstroXLogo
          size="sm"
          onClick={() => onTabChange('home')}
          className={`shrink-0 scale-90 sm:scale-80 ${activeTab === 'home' ? 'text-[#111111]' : 'text-white'}`}
        />

        <div className="flex items-center gap-1 min-w-0 overflow-x-auto no-scrollbar py-0.5">
          <div className="flex items-center bg-white/95 rounded-full p-0.5 border border-black/10 shadow-sm shrink-0">
            {navItems.map((item) => (
              <button
                key={item.tab}
                onClick={() => onTabChange(item.tab)}
                className={`px-2 py-0.5 text-[10.5px] font-medium rounded-full whitespace-nowrap transition-colors ${
                  activeTab === item.tab ? 'bg-[#111] text-white' : 'text-neutral-700 hover:text-black'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Contact arrow button */}
          <button
            onClick={onOpenBooking}
            aria-label="Contact AstroX"
            className="w-7 h-7 rounded-full bg-[#111] text-white flex items-center justify-center btn-lift shrink-0 shadow-sm ml-0.5"
          >
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </>
  );
};
