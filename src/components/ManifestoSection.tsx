import React, { useRef, useState, useEffect } from 'react';

const STATEMENT_TEXT = [
  'We', 'believe', 'the', 'strongest', 'brands', 'are',
  'built', 'through', 'strategy,', 'not', 'just',
  'aesthetics.', 'Every', 'campaign', 'is', 'designed',
  'to', 'capture', 'attention,', 'inspire', 'action,', 'and',
  'create', 'lasting', 'business', 'growth.'
];

interface ManifestoSectionProps {
  id?: string;
}

export const ManifestoSection: React.FC<ManifestoSectionProps> = ({ id = 'manifesto' }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(false);

  useEffect(() => {
    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);

    const isRec = new URLSearchParams(window.location.search).get('rec') === '1';

    if (isRec) {
      // Recorder mode: fill occurs from 1.3s to 4.2s (duration 2.9s)
      const startDelay = 1300;
      const duration = 2900;
      const startTime = performance.now() + startDelay;

      const recFrame = (now: number) => {
        if (now < startTime) {
          setScrollProgress(0);
          requestAnimationFrame(recFrame);
          return;
        }
        const elapsed = now - startTime;
        const p = Math.min(1, Math.max(0, elapsed / duration));
        setScrollProgress(p);
        if (p < 1) {
          requestAnimationFrame(recFrame);
        }
      };
      const animId = requestAnimationFrame(recFrame);
      return () => cancelAnimationFrame(animId);
    } else {
      // Scroll-driven calculation
      const handleScroll = () => {
        const el = sectionRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Start filling when top of section enters 85% of viewport, finish when top reaches 20%
        const start = windowHeight * 0.85;
        const end = windowHeight * 0.2;
        const current = rect.top;

        const p = Math.min(1, Math.max(0, (start - current) / (start - end)));
        setScrollProgress(p);
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // Compute color for each word with a 3-word soft edge
  const totalWords = STATEMENT_TEXT.length;
  // Head advances from 0 to totalWords + 3
  const head = scrollProgress * (totalWords + 3);

  const getWordColor = (index: number) => {
    if (isReducedMotion) return '#f4f4f4';

    if (index <= head - 3) {
      return '#f4f4f4'; // fully white
    }
    if (index >= head) {
      return '#6f6f6f'; // grey
    }

    // Between head - 3 and head, interpolate
    const fraction = (head - index) / 3;
    const r = Math.round(111 + (244 - 111) * fraction);
    const g = Math.round(111 + (244 - 111) * fraction);
    const b = Math.round(111 + (244 - 111) * fraction);
    return `rgb(${r}, ${g}, ${b})`;
  };

  return (
    <section
      id={id}
      ref={sectionRef}
      className="relative w-full bg-[#000000] text-[#f4f4f4] select-none"
      style={{
        paddingTop: 'clamp(24px, calc(30 * var(--u)), 50px)',
        paddingBottom: 'clamp(24px, calc(30 * var(--u)), 50px)',
      }}
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 md:px-10 flex flex-col items-center">
        
        {/* Centred Statement */}
        <div
          className="text-2xl sm:text-4xl md:text-[52px] text-center font-archivo tracking-[-0.028em] leading-[1.35] w-full"
          style={{
            maxWidth: 'min(830px, 100%)',
          }}
        >
          <p className="flex flex-wrap justify-center gap-x-[0.25em] gap-y-2">
            {STATEMENT_TEXT.map((word, idx) => (
              <span
                key={idx}
                className="transition-colors duration-150 inline-block font-semibold"
                style={{
                  color: getWordColor(idx),
                }}
              >
                {word}
              </span>
            ))}
          </p>
        </div>

        {/* Sub-line */}
        <div
          className="text-center font-inter-tight font-medium max-w-md px-4"
          style={{
            marginTop: 'clamp(44px, calc(120 * var(--u)), 150px)',
            fontSize: 'clamp(14px, calc(20 * var(--u)), 23px)',
            lineHeight: 1.5,
          }}
        >
          <p className="text-[#f4f4f4]">
            Performance-driven marketing, from strategy to execution.{' '}
            <span className="text-[#6f6f6f] italic font-normal">
              Built for growing brands.
            </span>
          </p>
        </div>

      </div>
    </section>
  );
};
