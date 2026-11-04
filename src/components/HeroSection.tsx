import React, { useState, useEffect } from 'react';
import { ASTROX_PROFILE, MEDIA_ASSETS, PARTNER_MARKS } from '../data/agencyData';
import { AstroXLogo } from './AstroXLogo';
import { ArrowUpRight, Check } from 'lucide-react';

interface HeroSectionProps {
  onOpenBooking: () => void;
  onOpenCaseStudy: (caseId: string) => void;
  scrollOffset?: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenBooking,
  onOpenCaseStudy,
  scrollOffset = 0,
}) => {
  const [partnerCount, setPartnerCount] = useState<number>(0);
  const [projectCount, setProjectCount] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Load animation and counter animation
  useEffect(() => {
    setIsLoaded(true);

    const isRec = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('rec') === '1';
    const duration = isRec ? 1200 : 1400;
    const startTime = performance.now();

    const frame = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      // easeOutExpo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

      setPartnerCount(Math.round(ease * 50));
      setProjectCount(Math.round(ease * 75));

      if (progress < 1) {
        requestAnimationFrame(frame);
      }
    };

    const animId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Parallax drift at 0.12x scroll
  const photoParallax = scrollOffset * 0.12;

  return (
    <section className="relative w-full bg-[#dadada] text-[#111111] overflow-hidden select-none">
      {/* 1440 Desktop Canvas Container (>= 1024px) */}
      <div className="relative mx-auto w-full max-w-[1440px] h-[calc(820*var(--u))] hidden lg:block">
        
        {/* Moon Behind the Person: Left 450u, Top 65u, 580 x 580u */}
        <div
          className={`absolute pointer-events-none transition-all duration-[1500ms] ease-out ${
            isLoaded ? 'opacity-100 filter-none scale-100' : 'opacity-0 blur-md scale-95'
          }`}
          style={{
            left: 'calc(450 * var(--u))',
            top: `calc((65 * var(--u)) + ${scrollOffset * 0.05}px)`,
            width: 'calc(580 * var(--u))',
            height: 'calc(580 * var(--u))',
            zIndex: 10,
          }}
        >
          <img
            src={MEDIA_ASSETS.moon}
            alt="Glowing moon behind astronaut"
            className="w-full h-full object-contain animate-moon-aura"
            referrerPolicy="no-referrer"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
        </div>

        {/* Person (Astronaut) in the Front: Left 400u, Top 80u, 660 x 740u */}
        <div
          className={`absolute pointer-events-none transition-all duration-[1200ms] ease-out ${
            isLoaded ? 'opacity-100 filter-none translate-y-0' : 'opacity-0 blur-sm translate-y-10'
          }`}
          style={{
            left: 'calc(400 * var(--u))',
            top: `calc((80 * var(--u)) + ${photoParallax}px)`,
            width: 'calc(660 * var(--u))',
            height: 'calc(740 * var(--u))',
            zIndex: 12,
          }}
        >
          <div className="w-full h-full animate-float-person">
            <img
              src={MEDIA_ASSETS.person}
              alt="Astronaut floating in front of the moon"
              className="w-full h-full object-contain filter contrast-110 drop-shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
              referrerPolicy="no-referrer"
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
          </div>
        </div>

        {/* Title: "PURE / DESIGN" at (57, 246) with ("25) at (339, 272) */}
        <div
          className="absolute z-20 pointer-events-auto"
          style={{
            left: 'calc(57 * var(--u))',
            top: 'calc(246 * var(--u))',
          }}
        >
          <div className="overflow-hidden">
            <h1
              className={`archivo-display leading-[0.92] tracking-[-0.035em] text-[#111111] whitespace-nowrap transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isLoaded ? 'translate-y-0' : 'translate-y-full'
              }`}
              style={{
                fontSize: 'calc(68 * var(--u))',
              }}
            >
              PURE<br />MARKETING
            </h1>
          </div>

          {/* AstroX Tagline subtle editorial kicker with animated logo */}
          <div className="mt-[calc(14*var(--u))] flex items-center gap-3">
            <AstroXLogo size="sm" className="text-[#111111]" />
            <span className="text-neutral-400">·</span>
            <span className="font-inter-tight text-[calc(12*var(--u))] uppercase tracking-[0.2em] text-neutral-600 font-semibold">
              {ASTROX_PROFILE.tagline}
            </span>
          </div>
        </div>

        {/* About Copy at y 458 */}
        <div
          className={`absolute z-20 pointer-events-auto max-w-[calc(320*var(--u))] transition-all duration-700 delay-150 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3.5'
          }`}
          style={{
            left: 'calc(57 * var(--u))',
            top: 'calc(458 * var(--u))',
          }}
        >
          <div className="flex items-center gap-1.5 text-[calc(12.5*var(--u))] font-semibold text-neutral-800 uppercase tracking-wider mb-[calc(8*var(--u))]">
            <span className="text-[calc(8*var(--u))]">●</span>
            <span>(ABOUT)</span>
          </div>
          <p className="font-inter-tight text-[calc(14*var(--u))] leading-[1.4] text-neutral-800 font-medium tracking-tight">
            Building stunning website that every brand deserves to be seen. AstroX crafts high-performance digital engines for startups and ambitious founders.
          </p>

          {/* Book A Call Button at y 584 */}
          <div
            className="mt-[calc(26*var(--u))]"
            style={{
              marginTop: 'calc(24 * var(--u))',
            }}
          >
            <button
              onClick={onOpenBooking}
              className="bg-[#111111] text-white hover:bg-neutral-900 px-[calc(26*var(--u))] py-[calc(13*var(--u))] rounded-full flex items-center gap-2 text-[calc(14*var(--u))] font-medium tracking-tight btn-lift shadow-md cursor-pointer transition-all duration-200"
            >
              <span>Book A Call</span>
              <ArrowUpRight className="w-[calc(15*var(--u))] h-[calc(15*var(--u))]" />
            </button>
          </div>
        </div>


        {/* Stats Frame at (57, 693), 341 x 208u, light grey #cdcdcd */}
        <div
          className={`absolute z-20 transition-all duration-700 delay-200 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3.5'
          }`}
          style={{
            left: 'calc(57 * var(--u))',
            top: 'calc(693 * var(--u))',
            width: 'calc(341 * var(--u))',
            height: 'calc(208 * var(--u))',
          }}
        >
          <div className="w-full h-full bg-[#cdcdcd] p-[calc(6*var(--u))] rounded-[calc(10*var(--u))] shadow-[0_6px_24px_rgba(0,0,0,0.06)] grid grid-cols-2 gap-[calc(6*var(--u))]">
            
            {/* Left Dark Card: 400+ / Trusted Partner, 6 partner marks, Book a call bar */}
            <div className="bg-[#191919] text-white rounded-[calc(8*var(--u))] p-[calc(14*var(--u))] flex flex-col justify-between">
              <div>
                <div className="archivo-wide text-[calc(28*var(--u))] font-bold leading-none tracking-tight">
                  {partnerCount}+
                </div>
                <div className="font-inter-tight text-[calc(11.5*var(--u))] text-neutral-400 mt-[calc(3*var(--u))] font-medium">
                  Trusted Partner
                </div>

                {/* 6 Tiny partner marks */}
                <div className="grid grid-cols-3 gap-1.5 mt-[calc(12*var(--u))] pt-[calc(8*var(--u))] border-t border-white/10">
                  {PARTNER_MARKS.map((m) => (
                    <div key={m.name} className="flex items-center gap-1 text-[calc(8.5*var(--u))] text-neutral-400">
                      <span className="text-[calc(8*var(--u))] text-white/80">{m.glyph}</span>
                      <span className="truncate">{m.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* White Book a call bar */}
              <button
                onClick={onOpenBooking}
                className="w-full mt-[calc(10*var(--u))] py-[calc(6*var(--u))] px-2 bg-white text-black hover:bg-neutral-100 rounded-[calc(4*var(--u))] text-[calc(11*var(--u))] font-semibold flex items-center justify-center gap-1 btn-lift cursor-pointer"
              >
                <span>Book a call</span>
                <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>

            {/* Right Photo Card: Cap photo, Studio Feed 05/06 hairline, 230+ worldwide */}
            <div className="relative rounded-[calc(8*var(--u))] overflow-hidden flex flex-col justify-between p-[calc(12*var(--u))] group">
              <img
                src={MEDIA_ASSETS.capPhoto}
                alt="Studio creator"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90 pointer-events-none" />

              {/* Studio Feed · 05/06 with hairline */}
              <div className="relative z-10">
                <div className="flex items-center justify-between text-[calc(9.5*var(--u))] text-white/80 font-medium tracking-wider uppercase pb-[calc(5*var(--u))] border-b border-white/20">
                  <span>Studio Feed</span>
                  <span>05/06</span>
                </div>
              </div>

              {/* 230+ Projects successfully launched worldwide */}
              <div className="relative z-10 text-right mt-auto">
                <div className="archivo-wide text-[calc(26*var(--u))] font-bold text-white leading-none">
                  {projectCount}+
                </div>
                <div className="text-[calc(10*var(--u))] text-white/80 leading-tight mt-[calc(3*var(--u))]">
                  Projects successfully launched worldwide
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Right Column Elements */}
        {/* True Growth Pill at (1216, 258) */}
        <div
          className={`absolute z-20 transition-all duration-700 delay-200 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3.5'
          }`}
          style={{
            right: 'calc(57 * var(--u))',
            top: 'calc(258 * var(--u))',
          }}
        >
          <div className="glass-pill-light rounded-full py-[calc(7*var(--u))] px-[calc(14*var(--u))] flex items-center gap-[calc(8*var(--u))] shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
            <span className="font-inter-tight text-[calc(13*var(--u))] font-semibold text-black tracking-tight whitespace-nowrap">
              True Growth
            </span>
            <div className="w-[calc(18*var(--u))] h-[calc(18*var(--u))] rounded-full bg-black text-white flex items-center justify-center">
              <Check className="w-[calc(11*var(--u))] h-[calc(11*var(--u))]" />
            </div>
          </div>
        </div>

        {/* "We’re available / ● for you", right-aligned at y 442 */}
        <div
          className={`absolute z-20 text-right transition-all duration-700 delay-250 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3.5'
          }`}
          style={{
            right: 'calc(57 * var(--u))',
            top: 'calc(442 * var(--u))',
          }}
        >
          <div className="font-inter-tight text-[calc(14*var(--u))] font-medium text-neutral-800 leading-tight">
            <div>We’re available</div>
            <div className="flex items-center justify-end gap-1.5 text-black font-semibold mt-0.5">
              <span className="text-[calc(9*var(--u))]">●</span>
              <span>for you</span>
            </div>
          </div>
        </div>

        {/* "Out Now / Q Industrial / [2025]" 196u-tall image card at right */}
        <div
          className={`absolute z-20 transition-all duration-700 delay-350 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3.5'
          }`}
          style={{
            right: 'calc(57 * var(--u))',
            top: 'calc(530 * var(--u))',
            width: 'calc(220 * var(--u))',
          }}
        >
          <div
            onClick={() => onOpenCaseStudy('q-industrial')}
            className="group cursor-pointer"
          >
            {/* Label header */}
            <div className="flex items-center justify-between text-[calc(11*var(--u))] font-semibold tracking-wider text-neutral-800 uppercase mb-[calc(8*var(--u))]">
              <span>Out Now</span>
              <span className="text-neutral-500">[2025]</span>
            </div>

            {/* 196u tall image card */}
            <div
              className="relative rounded-[calc(10*var(--u))] overflow-hidden shadow-lg border border-neutral-300"
              style={{
                height: 'calc(196 * var(--u))',
              }}
            >
              <img
                src={MEDIA_ASSETS.qIndustrial}
                alt="Q Industrial featured work"
                className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                style={{
                  transformOrigin: '62% 45%',
                }}
                referrerPolicy="no-referrer"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Client Title */}
              <div className="absolute bottom-[calc(14*var(--u))] left-[calc(14*var(--u))] text-white">
                <div className="font-archivo text-[calc(16*var(--u))] font-bold leading-tight">
                  Q Industrial
                </div>
                <div className="text-[calc(11*var(--u))] text-white/70">
                  Global Motion Identity
                </div>
              </div>

              {/* Frosted round arrow button: rotates 45 deg on hover */}
              <div className="absolute top-[calc(12*var(--u))] right-[calc(12*var(--u))] w-[calc(34*var(--u))] h-[calc(34*var(--u))] rounded-full glass-panel-dark flex items-center justify-center text-white transition-transform duration-300 group-hover:rotate-45">
                <ArrowUpRight className="w-[calc(16*var(--u))] h-[calc(16*var(--u))]" />
              </div>

              {/* Progress line: white at 35% with white fill */}
              <div className="absolute bottom-0 inset-x-0 h-[3px] bg-white/35">
                <div className="h-full bg-white w-2/3 group-hover:w-full transition-all duration-700 ease-out" />
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Responsive Grid Layout (< 1024px) */}
      <div className="lg:hidden px-4 py-4 md:py-6 grid grid-cols-1 gap-5 w-full max-w-lg mx-auto">
        
        {/* Brand Elements (Centered) */}
        <div className="flex flex-col items-center text-center gap-3 w-full">
          {/* Location & Status Marker */}
          <div className="inline-flex items-center justify-center gap-2 px-3 py-1 rounded-full bg-black/5 text-neutral-800 text-[11px] font-semibold tracking-wider uppercase">
            <span>AstroX</span>
            <span className="text-neutral-400">·</span>
            <span>Bengaluru HQ</span>
            <span className="text-neutral-400">·</span>
            <span>Founded 2025</span>
          </div>

          {/* Centered Primary Headline */}
          <h1 className="archivo-display text-[44px] sm:text-5xl leading-[0.92] tracking-[-0.04em] text-[#111111] text-center">
            PURE<br />MARKETING
          </h1>

          {/* Centered Brand Mark & Tagline */}
          <div className="flex items-center justify-center gap-2.5">
            <AstroXLogo size="sm" className="text-[#111111]" />
            <span className="text-neutral-400">·</span>
            <span className="font-inter-tight text-xs uppercase tracking-[0.2em] text-neutral-700 font-semibold">
              {ASTROX_PROFILE.tagline}
            </span>
          </div>

          {/* Centered Value Proposition */}
          <p className="text-sm text-neutral-800 leading-relaxed font-medium max-w-md mx-auto text-center mt-1">
            Building stunning website that every brand deserves to be seen. AstroX crafts high-performance digital engines for startups and ambitious founders.
          </p>

          {/* Centered Call to Action */}
          <div className="pt-2 flex justify-center">
            <button
              onClick={onOpenBooking}
              className="px-8 py-3.5 bg-[#111111] text-white hover:bg-neutral-900 rounded-full inline-flex items-center justify-center gap-2 text-sm font-semibold btn-lift shadow-md transition-all duration-200 cursor-pointer"
            >
              <span>Book A Call</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Composite Visual Showcase (Moon Behind, Astronaut in Front) */}
        <div className="relative w-full h-[400px] md:h-[500px] max-w-[380px] md:max-w-[480px] mx-auto overflow-hidden flex items-center justify-center">
          {/* Moon Behind */}
          <div className="absolute w-[280px] h-[280px] md:w-[380px] md:h-[380px] z-10 pointer-events-none flex items-center justify-center">
            <img
              src={MEDIA_ASSETS.moon}
              alt="Glowing Moon"
              className="w-full h-full object-contain animate-moon-aura drop-shadow-md"
              referrerPolicy="no-referrer"
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
          </div>

          {/* Person (Astronaut) in Front - larger on tablet */}
          <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center scale-110 md:scale-135">
            <img
              src={MEDIA_ASSETS.person}
              alt="AstroX Floating Astronaut"
              className="w-full h-full object-contain p-2 animate-float-person filter contrast-110 drop-shadow-2xl"
              referrerPolicy="no-referrer"
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
          </div>
        </div>

        {/* True Growth indicator & Availability */}
        <div className="flex items-center justify-between p-3.5 bg-white/70 backdrop-blur-sm rounded-xl border border-black/5 shadow-xs w-full max-w-md mx-auto">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center text-xs">
              <Check className="w-3 h-3" />
            </div>
            <span className="text-xs font-semibold text-black">True Growth Partner</span>
          </div>
          <div className="text-right text-xs text-neutral-800 font-medium">
            We’re available ● for you
          </div>
        </div>

        {/* Stats Frame (two columns) */}
        <div className="grid grid-cols-2 gap-3 bg-[#cdcdcd] p-2.5 rounded-xl shadow-xs w-full max-w-md mx-auto">
          <div className="bg-[#191919] text-white p-3.5 rounded-lg flex flex-col justify-between">
            <div>
              <div className="text-2xl font-bold font-archivo">{partnerCount}+</div>
              <div className="text-[11px] text-neutral-400">Trusted Partner</div>
            </div>
            <button
              onClick={onOpenBooking}
              className="mt-3 py-1.5 px-2 bg-white text-black hover:bg-neutral-100 text-xs font-semibold rounded text-center cursor-pointer transition-colors"
            >
              Book a call
            </button>
          </div>

          <div className="relative rounded-lg overflow-hidden p-3.5 flex flex-col justify-between text-white min-h-[120px]">
            <img
              src={MEDIA_ASSETS.capPhoto}
              alt="Studio"
              width={160}
              height={120}
              className="absolute inset-0 w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/60" />
            <div className="relative z-10 text-[10px] uppercase font-mono tracking-wider">
              Studio Feed · 05/06
            </div>
            <div className="relative z-10 text-right">
              <div className="text-xl font-bold font-archivo">{projectCount}+</div>
              <div className="text-[10px] text-white/80 leading-tight">Worldwide launches</div>
            </div>
          </div>
        </div>

        {/* Out Now Q Industrial */}
        <div
          onClick={() => onOpenCaseStudy('q-industrial')}
          className="rounded-xl overflow-hidden relative h-[180px] shadow-md border border-neutral-300 cursor-pointer group w-full max-w-md mx-auto"
        >
          <img
            src={MEDIA_ASSETS.qIndustrial}
            alt="Q Industrial"
            width={400}
            height={180}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
          <div className="absolute top-3 left-3 text-[10px] uppercase tracking-wider text-white/80 font-mono">
            Out Now [2025]
          </div>
          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
            <div>
              <div className="font-archivo text-base font-bold">Q Industrial</div>
              <div className="text-xs text-white/70">Global Motion Identity</div>
            </div>
            <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center transition-transform duration-300 group-hover:rotate-45">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
