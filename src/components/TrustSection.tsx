import React, { useRef, useState, useEffect } from 'react';
import { MEDIA_ASSETS } from '../data/agencyData';

interface TrustSectionProps {
  id?: string;
  onOpenBooking: () => void;
}

export const TrustSection: React.FC<TrustSectionProps> = ({ id = 'trust', onOpenBooking }) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState<boolean>(false);
  const [collabCount, setCollabCount] = useState<number>(0);
  const [awardCount, setAwardCount] = useState<number>(0);
  const [awardsLifted, setAwardsLifted] = useState<boolean>(false);
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setIsReducedMotion(true);
      setCollabCount(56);
      setAwardCount(10);
      setHasAnimated(true);
      return;
    }

    const isRec = new URLSearchParams(window.location.search).get('rec') === '1';

    if (isRec) {
      // Recorder mode: 3.5s - 5.2s trigger counters and avatar pop
      const timer1 = setTimeout(() => {
        setHasAnimated(true);
        const startTime = performance.now();
        const duration = 1700; // 3.5s to 5.2s
        const anim = (now: number) => {
          const p = Math.min(1, (now - startTime) / duration);
          const ease = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
          setCollabCount(Math.round(ease * 56));
          setAwardCount(Math.round(ease * 10));
          if (p < 1) requestAnimationFrame(anim);
        };
        requestAnimationFrame(anim);
      }, 3500);

      // 5.3s awards card lift
      const timer2 = setTimeout(() => {
        setAwardsLifted(true);
      }, 5300);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    } else {
      // Regular scroll-driven Intersection Observer
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            const startTime = performance.now();
            const duration = 1400;
            const anim = (now: number) => {
              const p = Math.min(1, (now - startTime) / duration);
              const ease = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
              setCollabCount(Math.round(ease * 56));
              setAwardCount(Math.round(ease * 10));
              if (p < 1) requestAnimationFrame(anim);
            };
            requestAnimationFrame(anim);
          }
        },
        { threshold: 0.25 }
      );

      if (panelRef.current) {
        observer.observe(panelRef.current);
      }

      return () => observer.disconnect();
    }
  }, [hasAnimated]);

  return (
    <section
      id={id}
      className="relative w-full bg-[#000000] text-[#f4f4f4] select-none"
      style={{
        paddingBottom: 'calc(150 * var(--u))',
      }}
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 md:px-[calc(69*var(--u))]">
        
        {/* Main Panel: 1302 x 429u, 14u radius, 1px border white at 28% */}
        <div
          ref={panelRef}
          className="relative w-full rounded-[calc(14*var(--u))] border border-[rgba(255,255,255,0.28)] bg-gradient-to-br from-[#0c0c0c] to-[#040404] p-[calc(36*var(--u))] overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl"
          style={{
            minHeight: 'calc(429 * var(--u))',
          }}
        >
          {/* Subtle noise grid or hairline glow inside */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.05),transparent_70%)] pointer-events-none" />

          {/* Left Column: Heading + Frosted Overlapping Glass Icon Tiles + Paragraph */}
          <div className="relative z-10 w-full lg:max-w-[calc(440*var(--u))]">
            
            {/* Heading with 2 Overlapping Glass Icon Tiles */}
            <div className="relative inline-block">
              <h2
                className="font-archivo text-[#f4f4f4] font-medium leading-[1.08] tracking-[-0.03em]"
                style={{
                  fontSize: 'calc(55 * var(--u))',
                }}
              >
                Trusted by<br />
                Hundreds of<br />
                Growing<br />
                Businesses
              </h2>

              {/* Glass Tile 1: Asterisk tile top right of line 1 (88u, 12u radius, backdrop blur) */}
              <div
                className="glass-tile absolute rounded-[calc(12*var(--u))] flex items-center justify-center text-white shadow-xl pointer-events-none"
                style={{
                  width: 'calc(88 * var(--u))',
                  height: 'calc(88 * var(--u))',
                  top: 'calc(-14 * var(--u))',
                  right: 'calc(-68 * var(--u))',
                }}
              >
                <span className="font-archivo text-[calc(42*var(--u))] font-light">✱</span>
              </div>

              {/* Glass Tile 2: Four-dot tile over "Businesses" (hidden on phone <= 760px) */}
              <div
                className="glass-tile hidden md:flex absolute rounded-[calc(12*var(--u))] items-center justify-center text-white shadow-xl pointer-events-none"
                style={{
                  width: 'calc(88 * var(--u))',
                  height: 'calc(88 * var(--u))',
                  bottom: 'calc(-22 * var(--u))',
                  right: 'calc(-40 * var(--u))',
                }}
              >
                <div className="grid grid-cols-2 gap-[calc(8*var(--u))]">
                  <div className="w-[calc(8*var(--u))] h-[calc(8*var(--u))] rounded-full bg-white" />
                  <div className="w-[calc(8*var(--u))] h-[calc(8*var(--u))] rounded-full bg-white/70" />
                  <div className="w-[calc(8*var(--u))] h-[calc(8*var(--u))] rounded-full bg-white/70" />
                  <div className="w-[calc(8*var(--u))] h-[calc(8*var(--u))] rounded-full bg-white" />
                </div>
              </div>
            </div>

            {/* Three-line paragraph, 14.5u font */}
            <p
              className="mt-[calc(26*var(--u))] font-inter-tight text-[#b8b8b8] leading-[1.48] tracking-tight font-normal"
              style={{
                fontSize: 'calc(14.5 * var(--u))',
                maxWidth: 'calc(380 * var(--u))',
              }}
            >
              Partnering with visionary founders in Bengaluru and globally to build enduring digital authority through surgical ad strategies and high-conversion engineering.
            </p>
          </div>

          {/* Right Column: Cards (326u tall, 8u radius) */}
          <div
            className="relative z-10 w-full lg:w-auto flex flex-col sm:flex-row items-stretch lg:items-center gap-[calc(18*var(--u))] overflow-visible"
            style={{
              height: 'calc(326 * var(--u))',
            }}
          >
            {/* Avatar Card: light grey #d6d6d6, 293u wide */}
            <div
              className="card-lift bg-[#d6d6d6] text-[#111111] rounded-[calc(8*var(--u))] p-[calc(20*var(--u))] flex flex-col justify-between shadow-xl cursor-default"
              style={{
                width: 'calc(293 * var(--u))',
                height: 'calc(326 * var(--u))',
                minWidth: '240px',
              }}
            >
              <div>
                <div className="text-[calc(11.5*var(--u))] font-semibold uppercase tracking-wider text-neutral-600 mb-[calc(12*var(--u))]">
                  Global Network
                </div>

                {/* Eight round 48u avatars in a 4 x 2 grid */}
                <div className="grid grid-cols-4 gap-[calc(8*var(--u))]">
                  {MEDIA_ASSETS.avatars.map((url, i) => (
                    <div
                      key={i}
                      className="rounded-full overflow-hidden border border-neutral-300 shadow-sm transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                      style={{
                        width: 'calc(48 * var(--u))',
                        height: 'calc(48 * var(--u))',
                        transform: hasAnimated || isReducedMotion ? 'scale(1)' : 'scale(0.4)',
                        opacity: hasAnimated || isReducedMotion ? 1 : 0,
                        transitionDelay: `${i * 45}ms`,
                      }}
                    >
                      <img
                        src={url}
                        alt={`Partner ${i + 1}`}
                        className="w-full h-full object-cover filter grayscale contrast-125"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* 56M+ at 43u and "Global Collaborations" */}
              <div className="mt-auto pt-[calc(14*var(--u))] border-t border-neutral-300/80">
                <div
                  className="archivo-wide font-bold leading-none text-[#111111]"
                  style={{
                    fontSize: 'calc(43 * var(--u))',
                  }}
                >
                  {collabCount}M+
                </div>
                <div className="font-inter-tight text-[calc(13*var(--u))] text-neutral-700 font-medium mt-[calc(4*var(--u))]">
                  Global Collaborations
                </div>
              </div>
            </div>

            {/* Awards Card: #262626, 298u wide */}
            <div
              className={`card-lift bg-[#262626] text-white rounded-[calc(8*var(--u))] p-[calc(20*var(--u))] flex flex-col justify-between border border-white/10 shadow-xl cursor-default transition-transform duration-500 ${
                awardsLifted ? '-translate-y-[calc(6*var(--u))] shadow-[0_20px_40px_rgba(0,0,0,0.5)]' : ''
              }`}
              style={{
                width: 'calc(298 * var(--u))',
                height: 'calc(326 * var(--u))',
                minWidth: '240px',
              }}
            >
              <div>
                <div className="text-[calc(11.5*var(--u))] font-semibold uppercase tracking-wider text-neutral-400">
                  Recognition
                </div>
                
                {/* 10+ / Industry Awards */}
                <div className="mt-[calc(8*var(--u))]">
                  <div className="archivo-wide text-[calc(38*var(--u))] font-bold leading-none text-white">
                    {awardCount}+
                  </div>
                  <div className="text-[calc(13*var(--u))] text-neutral-400 font-medium mt-1">
                    Industry Awards
                  </div>
                </div>

                {/* SVG Laurel Badge "BEST GROWTH PARTNER 2026" */}
                <div className="mt-[calc(18*var(--u))] p-[calc(12*var(--u))] bg-black/40 rounded-[calc(6*var(--u))] border border-white/10 flex items-center gap-[calc(10*var(--u))]">
                  <svg
                    className="w-[calc(32*var(--u))] h-[calc(32*var(--u))] text-white/90 shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M12 2l2.4 5 5.6.8-4 4 1 5.6-5-2.6-5 2.6 1-5.6-4-4 5.6-.8z" />
                    <circle cx="12" cy="12" r="9" strokeDasharray="2 2" />
                  </svg>
                  <div className="text-[calc(9.5*var(--u))] font-mono tracking-wider text-white/90 uppercase leading-snug">
                    BEST GROWTH PARTNER 2026
                  </div>
                </div>
              </div>

              {/* Two-line note */}
              <p className="text-[calc(11.5*var(--u))] text-neutral-400 leading-snug mt-auto pt-[calc(10*var(--u))] border-t border-white/10">
                Honored across APAC for surgical conversion rates and exponential client revenue scaling.
              </p>
            </div>

            {/* Portrait Card: 200u wide, cut off by panel's right edge */}
            <div
              className="hidden lg:block relative rounded-[calc(8*var(--u))] overflow-hidden shadow-2xl shrink-0 border border-white/10"
              style={{
                width: 'calc(200 * var(--u))',
                height: 'calc(326 * var(--u))',
                marginRight: 'calc(-36 * var(--u))', // cut off by panel edge per spec
              }}
            >
              <img
                src={MEDIA_ASSETS.portraitCard}
                alt="Portrait card profile"
                className="w-full h-full object-cover filter contrast-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-[calc(14*var(--u))] left-[calc(14*var(--u))] right-[calc(14*var(--u))] text-white">
                <div className="text-[calc(11*var(--u))] font-mono uppercase tracking-wider text-white/70">
                  Profile No. 04
                </div>
                <div className="font-archivo text-[calc(14*var(--u))] font-bold">
                  Creative Direction
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
