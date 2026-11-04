import React from 'react';
import { ASTROX_PROFILE } from '../data/agencyData';
import { ArrowUpRight, MapPin, Instagram, Linkedin, Globe, Phone, Mail, Award, Users, Compass } from 'lucide-react';

interface StudioViewProps {
  onOpenBooking: () => void;
}

export const StudioView: React.FC<StudioViewProps> = ({ onOpenBooking }) => {
  return (
    <div className="w-full bg-black text-[#f4f4f4] min-h-screen pt-[calc(140*var(--u))] md:pt-[calc(150*var(--u))] pb-20 px-4 md:px-12">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Editorial Headline */}
        <div className="border-b border-white/14 pb-12">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-neutral-400 mb-4">
            <span>AstroX Studio Profile</span>
            <span>·</span>
            <span>Bengaluru 560061</span>
            <span>·</span>
            <span>Independent & Self-Owned</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <h1 className="archivo-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[0.95]">
                PUSHING<br />BEYOND THE STARS
              </h1>
            </div>
            <div className="lg:col-span-4">
              <p className="font-inter-tight text-neutral-300 text-sm sm:text-base leading-relaxed">
                Founded in 2025 in India’s innovation capital, AstroX was built on a singular conviction: ambitious startups deserve high-velocity digital marketing unburdened by bloated agency layers.
              </p>
            </div>
          </div>
        </div>

        {/* Company Profile Bento */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          
          <div className="bg-neutral-950 p-6 rounded-2xl border border-white/10 flex flex-col justify-between">
            <span className="text-xs font-mono uppercase text-neutral-500">Established</span>
            <div className="mt-4">
              <div className="archivo-display text-4xl font-bold text-white">{ASTROX_PROFILE.founded}</div>
              <div className="text-xs text-neutral-400 mt-1">Self-owned agency model</div>
            </div>
          </div>

          <div className="bg-neutral-950 p-6 rounded-2xl border border-white/10 flex flex-col justify-between">
            <span className="text-xs font-mono uppercase text-neutral-500">Headquarters</span>
            <div className="mt-4">
              <div className="archivo-wide text-2xl font-bold text-white">Bengaluru</div>
              <div className="text-xs text-neutral-400 mt-1">Karnataka – PIN 560061</div>
            </div>
          </div>

          <div className="bg-neutral-950 p-6 rounded-2xl border border-white/10 flex flex-col justify-between">
            <span className="text-xs font-mono uppercase text-neutral-500">Core Focus</span>
            <div className="mt-4">
              <div className="archivo-wide text-2xl font-bold text-white">Startups & SMBs</div>
              <div className="text-xs text-neutral-400 mt-1">High-ticket lead generation</div>
            </div>
          </div>

          <div className="bg-neutral-950 p-6 rounded-2xl border border-white/10 flex flex-col justify-between">
            <span className="text-xs font-mono uppercase text-neutral-500">Team Scale</span>
            <div className="mt-4">
              <div className="archivo-display text-4xl font-bold text-white">{ASTROX_PROFILE.size}</div>
              <div className="text-xs text-neutral-400 mt-1">Specialized elite squad</div>
            </div>
          </div>

        </div>

        {/* Deep Dive: Philosophy & Office */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12">
          
          {/* Philosophy Section (7 cols) */}
          <div className="lg:col-span-7 bg-neutral-950 p-8 md:p-12 rounded-2xl border border-white/12">
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 block mb-4">
              The AstroX Creed
            </span>
            <h3 className="archivo-display text-3xl md:text-4xl font-bold text-white leading-tight">
              Aesthetics that command respect. Performance that funds expansion.
            </h3>
            
            <div className="mt-6 space-y-4 text-neutral-300 font-inter-tight text-sm leading-relaxed">
              <p>
                In an era crowded with template websites and generic ad campaigns, AstroX merges severe monochrome editorial restraint with aggressive growth analytics.
              </p>
              <p>
                Every campaign we build for a startup is treated as a strategic business engine: we study your unit economics, craft category-defining brand narratives, engineer sub-second web platforms, and deploy multi-channel customer acquisition funnels across Meta, Google, and WhatsApp.
              </p>
              <p>
                We do not sell hours. We deliver qualified pipeline, lower customer acquisition costs, and enduring brand equity.
              </p>
            </div>

            {/* Core Values */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-6 border-t border-white/10">
              <div>
                <span className="text-xs font-mono uppercase text-neutral-400 block">01. Precision</span>
                <p className="text-xs text-neutral-300 mt-1">Zero wasted spend; meticulous tracking.</p>
              </div>
              <div>
                <span className="text-xs font-mono uppercase text-neutral-400 block">02. Velocity</span>
                <p className="text-xs text-neutral-300 mt-1">Rapid creative iteration cycles.</p>
              </div>
              <div>
                <span className="text-xs font-mono uppercase text-neutral-400 block">03. Permanence</span>
                <p className="text-xs text-neutral-300 mt-1">Assets built to endure algorithm shifts.</p>
              </div>
            </div>
          </div>

          {/* Physical Office & Direct Connection (5 cols) */}
          <div className="lg:col-span-5 bg-neutral-950 p-8 md:p-12 rounded-2xl border border-white/12 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase text-neutral-400 mb-4">
                <MapPin className="w-4 h-4 text-white" />
                <span>Physical Headquarters</span>
              </div>

              <h4 className="archivo-wide text-2xl font-bold text-white">
                Bengaluru Office
              </h4>

              <div className="mt-4 p-4 rounded-xl bg-neutral-900 border border-white/10 font-mono text-xs text-neutral-300 leading-relaxed">
                <p className="font-semibold text-white">{ASTROX_PROFILE.name}</p>
                <p className="mt-1">{ASTROX_PROFILE.address.line1},</p>
                <p>{ASTROX_PROFILE.address.line2},</p>
                <p>{ASTROX_PROFILE.address.area},</p>
                <p>{ASTROX_PROFILE.address.state} – {ASTROX_PROFILE.address.pin}, {ASTROX_PROFILE.address.country}</p>
                <div className="mt-3 pt-3 border-t border-white/10 text-[11px] text-neutral-400">
                  Geo: {ASTROX_PROFILE.coordinates}
                </div>
              </div>

              {/* Channels */}
              <div className="mt-6 space-y-3">
                <a
                  href={ASTROX_PROFILE.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-lg bg-neutral-900 hover:bg-neutral-850 border border-white/10 transition-colors text-xs text-neutral-300 hover:text-white"
                >
                  <div className="flex items-center gap-2">
                    <Instagram className="w-4 h-4 text-white" />
                    <span>Instagram</span>
                  </div>
                  <span className="font-mono text-neutral-400">{ASTROX_PROFILE.instagram} ↗</span>
                </a>

                <a
                  href={ASTROX_PROFILE.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-lg bg-neutral-900 hover:bg-neutral-850 border border-white/10 transition-colors text-xs text-neutral-300 hover:text-white"
                >
                  <div className="flex items-center gap-2">
                    <Linkedin className="w-4 h-4 text-white" />
                    <span>LinkedIn</span>
                  </div>
                  <span className="font-mono text-neutral-400">{ASTROX_PROFILE.linkedin} ↗</span>
                </a>

                <a
                  href={ASTROX_PROFILE.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-lg bg-neutral-900 hover:bg-neutral-850 border border-white/10 transition-colors text-xs text-neutral-300 hover:text-white"
                >
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-white" />
                    <span>Official Portal</span>
                  </div>
                  <span className="font-mono text-neutral-400">astroxdigitalmarketing.in ↗</span>
                </a>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10">
              <button
                onClick={onOpenBooking}
                className="w-full py-3.5 bg-white text-black hover:bg-neutral-200 rounded-full font-semibold text-sm flex items-center justify-center gap-2 btn-lift shadow-lg cursor-pointer"
              >
                <span>Request Agency Consultation</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
