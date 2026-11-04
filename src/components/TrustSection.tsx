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
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setIsReducedMotion(true);
      setCollabCount(56);
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
          if (p < 1) requestAnimationFrame(anim);
        };
        requestAnimationFrame(anim);
      }, 3500);

      return () => {
        clearTimeout(timer1);
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
        paddingBottom: 'calc(25 * var(--u))',
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
          <div className="relative z-10 w-full lg:max-w-[calc(500*var(--u))]">
            
            {/* Heading with 2 Overlapping Glass Icon Tiles */}
            <div className="relative inline-block">
              <h2
                className="font-archivo text-[#f4f4f4] font-medium leading-[1.08] tracking-[-0.03em] whitespace-nowrap"
                style={{
                  fontSize: 'calc(48 * var(--u))',
                }}
              >
                Trusted by<br />
                Hundreds of<br />
                Growing<br />
                Businesses
              </h2>

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

          {/* Right Column: Cards (326u tall on desktop, responsive flex on mobile/tablet) */}
          <div
            className="relative z-10 w-full lg:w-auto flex flex-col md:flex-row items-stretch lg:items-center gap-4 lg:gap-[calc(18*var(--u))] overflow-visible"
          >
            {/* Avatar Card: light grey #d6d6d6 */}
            <div
              className="card-lift bg-[#d6d6d6] text-[#111111] rounded-[calc(8*var(--u))] p-5 lg:p-[calc(20*var(--u))] flex flex-col justify-between shadow-xl cursor-default w-full md:w-[280px] lg:w-[calc(293*var(--u))] min-h-[300px] lg:min-h-[326px]"
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
                        loading="lazy"
                        decoding="async"
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
                loading="lazy"
                decoding="async"
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
