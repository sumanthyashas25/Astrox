import { ASTROX_PROFILE } from '../data/agencyData';
import { AstroXLogo } from './AstroXLogo';
import { ArrowUpRight, Instagram, Linkedin, Globe, MapPin } from 'lucide-react';
import { PageTab } from '../types';

interface FooterProps {
  onTabChange: (tab: PageTab) => void;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onTabChange, onOpenBooking }) => {
  return (
    <footer className="w-full bg-[#000000] text-[#f4f4f4] border-t border-[rgba(255,255,255,0.14)] select-none pt-16 pb-12 px-6 md:px-16">
      <div className="mx-auto w-full max-w-[1440px]">
        
        {/* Top Tier */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-16 border-b border-white/10">
          
          {/* Brand Column (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <AstroXLogo
                size="md"
                onClick={() => onTabChange('home')}
                className="text-white"
              />
            </div>
            
            <p className="font-inter-tight text-neutral-400 text-sm max-w-sm leading-relaxed">
              {ASTROX_PROFILE.tagline}. High-conviction digital marketing, performance advertising, and bespoke web platforms for modern enterprises.
            </p>

            <div className="flex items-center gap-4 pt-2">
              <a
                href={ASTROX_PROFILE.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-neutral-900 border border-white/15 flex items-center justify-center text-neutral-400 hover:text-white hover:border-white/40 transition-colors"
                title="AstroX Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={ASTROX_PROFILE.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-neutral-900 border border-white/15 flex items-center justify-center text-neutral-400 hover:text-white hover:border-white/40 transition-colors"
                title="AstroX LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={ASTROX_PROFILE.website}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-neutral-900 border border-white/15 flex items-center justify-center text-neutral-400 hover:text-white hover:border-white/40 transition-colors"
                title="AstroX Official Site"
              >
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation Links (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 block mb-2">
              Navigation
            </span>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li>
                <button onClick={() => onTabChange('home')} className="hover:text-white transition-colors cursor-pointer">
                  Home / Overview
                </button>
              </li>
              <li>
                <button onClick={() => onTabChange('services')} className="hover:text-white transition-colors cursor-pointer">
                  Capabilities & Services
                </button>
              </li>
              <li>
                <button onClick={() => onTabChange('works')} className="hover:text-white transition-colors cursor-pointer">
                  Case Studies & Works
                </button>
              </li>
              <li>
                <button onClick={() => onTabChange('studio')} className="hover:text-white transition-colors cursor-pointer">
                  Studio & Bengaluru HQ
                </button>
              </li>
              <li>
                <button onClick={onOpenBooking} className="hover:text-white transition-colors cursor-pointer">
                  Book A Call ↗
                </button>
              </li>
            </ul>
          </div>

          {/* Bengaluru Location & Office (4 cols) */}
          <div className="md:col-span-4 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-neutral-500 mb-2">
              <MapPin className="w-3.5 h-3.5" />
              <span>Headquarters</span>
            </div>
            <p className="text-sm font-semibold text-white">
              {ASTROX_PROFILE.name}
            </p>
            <p className="text-xs text-neutral-400 leading-relaxed font-mono">
              {ASTROX_PROFILE.address.line1},<br />
              {ASTROX_PROFILE.address.line2},<br />
              {ASTROX_PROFILE.address.area},<br />
              {ASTROX_PROFILE.address.state} – {ASTROX_PROFILE.address.pin}, India
            </p>
            <div className="pt-2 text-xs text-neutral-500 font-mono">
              Coordinates: {ASTROX_PROFILE.coordinates}
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500">
          <div>
            © {new Date().getFullYear()} AstroX Digital Marketing. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Bengaluru · PIN 560061</span>
            <span>·</span>
            <span>Est. 2025</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
