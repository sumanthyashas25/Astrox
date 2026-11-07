import React, { useState, useEffect } from 'react';
import { AstroXLogo } from './AstroXLogo';
import { ASTROX_PROFILE } from '../data/agencyData';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState<number>(0);
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);
  const [stage, setStage] = useState<'intro' | 'morph' | 'ready'>('intro');

  useEffect(() => {
    // Stage sequence
    const morphTimer = setTimeout(() => {
      setStage('morph');
    }, 700);

    const readyTimer = setTimeout(() => {
      setStage('ready');
    }, 1800);

    // Progress counter 0 -> 100%
    const startTime = performance.now();
    const duration = 2000;

    let animId: number;
    const updateProgress = (now: number) => {
      const elapsed = now - startTime;
      const raw = Math.min(1, elapsed / duration);
      // easeOutExpo
      const eased = raw === 1 ? 1 : 1 - Math.pow(2, -10 * raw);
      setProgress(Math.round(eased * 100));

      if (raw < 1) {
        animId = requestAnimationFrame(updateProgress);
      } else {
        // Trigger smooth fade-out
        setIsFadingOut(true);
        setTimeout(() => {
          onComplete();
        }, 600);
      }
    };

    animId = requestAnimationFrame(updateProgress);

    return () => {
      clearTimeout(morphTimer);
      clearTimeout(readyTimer);
      cancelAnimationFrame(animId);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-between p-8 sm:p-14 bg-black text-[#f4f4f4] select-none transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isFadingOut ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Top Header kicker */}
      <div className="w-full max-w-[1440px] flex items-center justify-between text-xs font-mono uppercase tracking-[0.2em] text-neutral-500">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-red-600 animate-ping" />
          <span className="text-neutral-400">System Initializing</span>
        </div>
        <div className="hidden sm:block text-neutral-500">
          Bengaluru HQ · Est. 2025
        </div>
      </div>

      {/* Center Cinematic Logo Showcase */}
      <div className="flex flex-col items-center justify-center my-auto text-center space-y-6">
        {/* Glow ambient background aura */}
        <div className="relative flex items-center justify-center">
          <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-red-600/10 filter blur-[90px] pointer-events-none animate-pulse" />
          
          <div className="relative z-10 scale-125 sm:scale-150 py-4">
            <AstroXLogo size="hero" theme="light" className="text-white" interactive={false} />
          </div>
        </div>

        {/* Tagline reveals */}
        <div className="overflow-hidden">
          <p
            className={`font-inter-tight text-xs sm:text-sm uppercase tracking-[0.3em] text-neutral-400 font-semibold transition-all duration-700 delay-300 ${
              stage !== 'intro' ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
          >
            {ASTROX_PROFILE.tagline}
          </p>
        </div>
      </div>

      {/* Bottom Loading Progress Bar & Percentage */}
      <div className="w-full max-w-sm sm:max-w-md space-y-3">
        <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
          <span className="tracking-widest uppercase">
            {stage === 'intro' ? 'Aligning telemetry...' : stage === 'morph' ? 'Synchronizing orbit...' : 'Ready'}
          </span>
          <span className="font-bold text-white font-archivo">{progress}%</span>
        </div>

        {/* Hairline progress line */}
        <div className="relative w-full h-[2px] bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-neutral-600 via-white to-red-500 rounded-full transition-all duration-75 ease-out shadow-[0_0_10px_rgba(255,255,255,0.7)]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};
