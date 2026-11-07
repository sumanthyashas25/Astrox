import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle, ArrowUpRight } from 'lucide-react';

interface FAQItem {
  question: string;
  category: 'strategy' | 'timelines' | 'roi' | 'process';
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: 'How long does it take to see tangible results from digital marketing campaigns?',
    category: 'timelines',
    answer:
      'Performance advertising campaigns (Google Ads, Meta Ads) begin driving qualified clicks and lead inquiries within 48 to 72 hours of going live. In contrast, organic SEO and authoritative content strategies compound over 60 to 90 days, delivering durable, compounding inbound customer pipeline with reduced long-term customer acquisition costs.',
  },
  {
    question: 'What is the typical timeline for an end-to-end custom website design and launch?',
    category: 'timelines',
    answer:
      'Our typical sprint for a bespoke, high-conversion web platform is 2 to 4 weeks. Week 1 is dedicated to architectural wireframing, messaging, and visual design; Week 2–3 covers frontend engineering, mobile optimization, and interactive animations; Week 4 focuses on quality assurance, SEO metadata verification, and launch deployment.',
  },
  {
    question: 'How do you tailor digital marketing strategies to our specific industry and competitors?',
    category: 'strategy',
    answer:
      'We conduct exhaustive market research, auditing competitor ad creative, keyword footprint, audience psychographics, and conversion bottlenecks before drafting our custom roadmap. Rather than recycling generic templates, we build targeted funnels that play directly to your unique positioning and strengths.',
  },
  {
    question: 'How do you measure and report marketing ROI and performance metrics?',
    category: 'roi',
    answer:
      'We focus on high-conviction business metrics rather than vanity impressions: Customer Acquisition Cost (CAC), Return on Ad Spend (ROAS), Qualified Pipeline Value, and Conversion Rate. Clients receive transparent real-time reporting dashboards alongside bi-weekly strategic calls with senior growth engineers.',
  },
  {
    question: 'Can we start with a single service or do we need a full-funnel retainer?',
    category: 'process',
    answer:
      'You can easily begin with a targeted sprint—such as a website redesign, a Google Ads audit, or SEO foundation engineering. As initial wins generate validated revenue, we can seamlessly expand into holistic, multi-channel performance retainers.',
  },
  {
    question: 'What is required from our team during the onboarding and campaign kickoff?',
    category: 'process',
    answer:
      'During kickoff, we conduct a 60-minute discovery call to align on business objectives, target buyer personas, brand assets, and platform access. AstroX handles the heavy lifting of copy, creative, technical integration, tracking pixels, and campaign execution.',
  },
];

interface ServicesFAQProps {
  onOpenBooking?: () => void;
}

export const ServicesFAQ: React.FC<ServicesFAQProps> = ({ onOpenBooking }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default

  const toggleItem = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const handleWhatsAppInquiry = () => {
    const text = encodeURIComponent(
      'Hello AstroX Team! I have a question regarding your digital marketing strategies, timelines, or pricing. Could we discuss?'
    );
    window.open(`https://wa.me/91991678506?text=${text}`, '_blank');
  };

  return (
    <div className="mt-24 pt-16 border-t border-white/14">
      {/* FAQ Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-neutral-400 mb-3">
            <HelpCircle className="w-4 h-4 text-neutral-400" />
            <span>Client Intelligence & Clarity</span>
          </div>
          <h2 className="archivo-display text-3xl sm:text-5xl font-bold tracking-tight text-white uppercase">
            FREQUENTLY ASKED<br />QUESTIONS
          </h2>
        </div>
        <p className="max-w-md font-inter-tight text-neutral-400 text-sm leading-relaxed">
          Clear answers regarding campaign execution, sprint delivery windows, and performance benchmarks. Have a specific question? Connect directly with our strategists.
        </p>
      </div>

      {/* Accordion FAQ List */}
      <div className="space-y-4">
        {FAQS.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                isOpen
                  ? 'bg-neutral-950 border-white/30 shadow-lg'
                  : 'bg-neutral-950/60 border-white/10 hover:border-white/20'
              }`}
            >
              <button
                type="button"
                onClick={() => toggleItem(idx)}
                className="w-full py-5 px-6 sm:px-8 flex items-center justify-between text-left gap-4 cursor-pointer"
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-4">
                  <span className="text-xs font-mono text-neutral-500 shrink-0">
                    {String(idx + 1).padStart(2, '0')}.
                  </span>
                  <span className="font-archivo text-base sm:text-lg font-semibold text-white tracking-tight">
                    {item.question}
                  </span>
                </div>
                <div
                  className={`w-8 h-8 rounded-full border border-white/15 flex items-center justify-center shrink-0 text-white transition-transform duration-300 ${
                    isOpen ? 'rotate-180 bg-white/10' : 'bg-transparent'
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {/* Smooth Height Animated Answer Container */}
              <div
                className={`grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-6 sm:px-8 pb-6 pt-2 text-sm sm:text-base font-inter-tight text-neutral-300 leading-relaxed border-t border-white/5">
                    {item.answer}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Direct FAQ Support Callout */}
      <div className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-950 border border-white/15 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="archivo-wide text-xl font-bold text-white">Have a unique business requirement?</h3>
          <p className="text-xs sm:text-sm text-neutral-400 font-inter-tight mt-1">
            Our Bengaluru HQ growth leads are available for immediate consultation and custom sprint planning.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
          <button
            type="button"
            onClick={handleWhatsAppInquiry}
            className="flex-1 sm:flex-initial px-5 py-3 rounded-full bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 text-[#25D366] text-xs font-mono font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </button>

          {onOpenBooking && (
            <button
              type="button"
              onClick={onOpenBooking}
              className="flex-1 sm:flex-initial px-6 py-3 rounded-full bg-white hover:bg-neutral-200 text-black text-xs font-semibold flex items-center justify-center gap-1.5 btn-lift cursor-pointer shadow-md"
            >
              <span>Book Strategy Call</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
