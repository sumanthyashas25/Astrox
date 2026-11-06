import React, { useRef, useState, useEffect } from 'react';

const STATEMENT_TEXT = [
  'We', 'believe', 'the', 'strongest', 'digital', 'marketing', 'campaigns', 'are',
  'built', 'through', 'data-driven', 'strategy,', 'surgical', 'SEO,', 'high-conversion',
  'web', 'design,', 'and', 'relentless', 'performance', 'advertising', 'rather', 'than',
  'empty', 'vanity', 'metrics.'
];

interface ManifestoSectionProps {
  id?: string;
}

export const ManifestoSection: React.FC<ManifestoSectionProps> = ({ id = 'manifesto' }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);

    const isRec = new URLSearchParams(window.location.search).get('rec') === '1';

    if (isRec) {
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
      const handleScroll = () => {
        const el = sectionRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight;

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

  const totalWords = STATEMENT_TEXT.length;
  const head = scrollProgress * (totalWords + 3);

  const getWordColor = (index: number) => {
    if (isReducedMotion) return '#f4f4f4';

    if (index <= head - 3) {
      return '#f4f4f4';
    }
    if (index >= head) {
      return '#6f6f6f';
    }

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
      className="relative w-full bg-[#000000] text-[#f4f4f4] select-none py-16 lg:py-24"
    >
      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-12 flex flex-col items-center">
        
        {/* Centred Statement */}
        <div
          className="text-2xl sm:text-4xl md:text-[52px] text-center font-archivo tracking-[-0.028em] leading-[1.35] w-full mb-16"
          style={{
            maxWidth: 'min(860px, 100%)',
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

        {/* Detailed Approach & Strategy Content */}
        <div className="w-full mt-10 space-y-12 border-t border-white/14 pt-16 font-inter-tight">
          
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-400 block">
              Our Methodology
            </span>
            <h2 className="archivo-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
              OUR APPROACH
            </h2>
            <p className="text-neutral-300 text-base sm:text-lg leading-relaxed">
              We believe successful digital marketing is about more than just getting clicks, impressions, or website traffic. It's about building strategies that turn online visibility into real business growth.
            </p>
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
              We combine data-driven marketing strategies, search engine optimization (SEO), conversion-focused website design, and performance advertising to help businesses reach the right audience and achieve measurable results. Every decision is backed by research, audience insights, and performance data.
            </p>
          </div>

          {/* Four Key Areas Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
            
            <div className="bg-neutral-950 p-8 rounded-2xl border border-white/12 space-y-3">
              <span className="text-xs font-mono uppercase text-neutral-500">01 / Strategy</span>
              <h3 className="archivo-wide text-xl font-bold text-white">Data-Driven Strategy</h3>
              <p className="text-neutral-300 text-sm leading-relaxed">
                We don't rely on assumptions or guesswork. We study your industry, competitors, target audience, and market trends to develop marketing strategies based on real insights. This helps us identify the right opportunities and make smarter marketing decisions.
              </p>
            </div>

            <div className="bg-neutral-950 p-8 rounded-2xl border border-white/12 space-y-3">
              <span className="text-xs font-mono uppercase text-neutral-500">02 / Organic</span>
              <h3 className="archivo-wide text-xl font-bold text-white">Search Engine Optimization (SEO)</h3>
              <p className="text-neutral-300 text-sm leading-relaxed">
                We improve your website's visibility on search engines like Google through keyword research, technical SEO, quality content, and website optimization. The goal is to help potential customers discover your business when they're actively searching for what you offer.
              </p>
            </div>

            <div className="bg-neutral-950 p-8 rounded-2xl border border-white/12 space-y-3">
              <span className="text-xs font-mono uppercase text-neutral-500">03 / Engineering</span>
              <h3 className="archivo-wide text-xl font-bold text-white">High-Conversion Web Design</h3>
              <p className="text-neutral-300 text-sm leading-relaxed">
                A website should do more than look attractive. It should communicate your value, build trust, and encourage visitors to take action. We create user-friendly, responsive, and strategically designed websites that turn visitors into enquiries, leads, and customers.
              </p>
            </div>

            <div className="bg-neutral-950 p-8 rounded-2xl border border-white/12 space-y-3">
              <span className="text-xs font-mono uppercase text-neutral-500">04 / Acquisition</span>
              <h3 className="archivo-wide text-xl font-bold text-white">Performance Advertising</h3>
              <p className="text-neutral-300 text-sm leading-relaxed">
                We create and manage targeted advertising campaigns across digital platforms to reach the right people at the right time. Through continuous testing, audience optimization, and performance tracking, we work to reduce wasted ad spend and improve your return on investment.
              </p>
            </div>

          </div>

          {/* What We Ultimately Aim to Achieve */}
          <div className="bg-neutral-950 p-8 md:p-12 rounded-2xl border border-white/14 space-y-6 mt-12">
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 block mb-2">
                Outcomes & Impact
              </span>
              <h3 className="archivo-display text-2xl sm:text-3xl font-bold text-white">
                What We Ultimately Aim to Achieve
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
              <div className="p-5 rounded-xl bg-neutral-900 border border-white/10 space-y-2">
                <span className="text-xs font-mono uppercase text-white font-bold">● Greater Brand Visibility</span>
                <p className="text-xs text-neutral-300">Make your business easier to discover online.</p>
              </div>

              <div className="p-5 rounded-xl bg-neutral-900 border border-white/10 space-y-2">
                <span className="text-xs font-mono uppercase text-white font-bold">● Quality Website Traffic</span>
                <p className="text-xs text-neutral-300">Attract people who are genuinely interested in your offerings.</p>
              </div>

              <div className="p-5 rounded-xl bg-neutral-900 border border-white/10 space-y-2">
                <span className="text-xs font-mono uppercase text-white font-bold">● More Qualified Leads</span>
                <p className="text-xs text-neutral-300">Generate enquiries from potential customers who are more likely to convert.</p>
              </div>

              <div className="p-5 rounded-xl bg-neutral-900 border border-white/10 space-y-2">
                <span className="text-xs font-mono uppercase text-white font-bold">● Higher Conversions</span>
                <p className="text-xs text-neutral-300">Turn more website visitors into paying customers.</p>
              </div>

              <div className="p-5 rounded-xl bg-neutral-900 border border-white/10 space-y-2 sm:col-span-2 lg:col-span-2">
                <span className="text-xs font-mono uppercase text-white font-bold">● Measurable Business Growth</span>
                <p className="text-xs text-neutral-300">Focus on revenue, customer acquisition, and long-term business performance.</p>
              </div>
            </div>

            <div className="text-center pt-6 border-t border-white/10 max-w-2xl mx-auto">
              <p className="text-sm sm:text-base text-neutral-300 italic">
                Because at the end of the day, marketing success isn't measured by how impressive the numbers look on a dashboard. It's measured by how much those numbers contribute to your business growth.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
