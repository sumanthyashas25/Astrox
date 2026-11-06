import React, { useState, useEffect } from 'react';
import { PageTab } from './types';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { BarSection } from './components/BarSection';
import { ManifestoSection } from './components/ManifestoSection';
import { TrustSection } from './components/TrustSection';
import { ServicesView } from './components/ServicesView';
import { StudioView } from './components/StudioView';
import { ContactView } from './components/ContactView';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { CaseStudyModal } from './components/CaseStudyModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<PageTab>('home');
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [preselectedService, setPreselectedService] = useState<string>('');
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);
  const [scrollOffset, setScrollOffset] = useState<number>(0);

  // Track window scroll for hero photo parallax drift
  useEffect(() => {
    const handleScroll = () => {
      setScrollOffset(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenBooking = (service?: string) => {
    if (service) {
      setPreselectedService(service);
    } else {
      setPreselectedService('');
    }
    setIsBookingOpen(true);
  };

  const handleScrollToManifesto = () => {
    const el = document.getElementById('manifesto');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleTabChange = (tab: PageTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-black text-[#f4f4f4] flex flex-col font-inter-tight selection:bg-neutral-800 selection:text-white">
      
      {/* Top Segmented Navigation */}
      <Navigation
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onOpenBooking={() => handleOpenBooking()}
        isScrolled={scrollOffset > 80}
      />

      {/* Main View Router with Smooth Transitions */}
      <main className="flex-1 w-full">
        <div key={activeTab} className="animate-in fade-in slide-in-from-bottom-1 duration-300">
          {activeTab === 'home' && (
            <>
              {/* 1. Hero Section (1440 x 938u) */}
              <HeroSection
                onOpenBooking={() => handleOpenBooking()}
                onOpenCaseStudy={(id) => setSelectedCaseId(id)}
                scrollOffset={scrollOffset}
              />

              {/* 2. Black Bar (111u) with EST 2025, SCROLL DOWN, LIVE IN DETAILS */}
              <BarSection onScrollToManifesto={handleScrollToManifesto} />

              {/* 3. Manifesto Section (170u top, 230u bottom padding) with word-by-word soft fill */}
              <ManifestoSection id="manifesto" />

              {/* 4. Trust Panel (1302 x 429u) with Avatars, Awards, and Portrait Card */}
              <TrustSection id="trust" onOpenBooking={() => handleOpenBooking()} />
            </>
          )}

          {activeTab === 'services' && (
            <ServicesView
              onOpenBookingWithService={(service) => handleOpenBooking(service)}
            />
          )}

          {activeTab === 'studio' && (
            <StudioView onOpenBooking={() => handleOpenBooking()} />
          )}

          {activeTab === 'contact' && (
            <ContactView
              preselectedService={preselectedService}
            />
          )}
        </div>
      </main>

      {/* Editorial Footer */}
      <Footer
        onTabChange={handleTabChange}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Consultation & Booking Dialog */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preselectedService={preselectedService}
      />

      {/* Case Study Deep Dive Dialog */}
      <CaseStudyModal
        caseId={selectedCaseId}
        onClose={() => setSelectedCaseId(null)}
        onOpenBooking={() => handleOpenBooking(selectedCaseId || undefined)}
      />

    </div>
  );
}
