import React, { useEffect, useState } from 'react';

interface AsteroidTransitionProps {
  isTransitioning: boolean;
}

export const AsteroidTransition: React.FC<AsteroidTransitionProps> = ({ isTransitioning }) => {
  const [active, setActive] = useState<boolean>(false);
  const [animKey, setAnimKey] = useState<number>(0);

  useEffect(() => {
    if (isTransitioning) {
      setActive(true);
      setAnimKey((prev) => prev + 1);
      const timer = setTimeout(() => {
        setActive(false);
      }, 850);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  if (!active) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* Primary blazing asteroid with fiery ionization trail */}
      <div key={animKey} className="absolute -top-32 -left-32 animate-asteroid-flyby">
        <div className="relative flex items-center">
          
          {/* Outer diffuse plasma glow plume */}
          <div
            className="absolute -left-[450px] top-1/2 -translate-y-1/2 w-[460px] h-[34px] origin-right"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(255, 69, 0, 0.08) 35%, rgba(255, 120, 40, 0.35) 70%, rgba(255, 220, 180, 0.7) 95%, #ffffff 100%)',
              filter: 'blur(8px)',
              borderRadius: '9999px',
            }}
          />

          {/* Core concentrated ionization beam */}
          <div
            className="absolute -left-[320px] top-1/2 -translate-y-1/2 w-[330px] h-[14px] origin-right"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(255, 40, 0, 0.2) 20%, rgba(255, 140, 0, 0.8) 60%, rgba(255, 230, 200, 0.95) 90%, #ffffff 100%)',
              filter: 'blur(2px)',
              borderRadius: '9999px',
              boxShadow: '0 0 25px rgba(255, 100, 20, 0.8)',
            }}
          />

          {/* Trailing cosmic dust / spark particles */}
          <div
            className="absolute -left-[220px] -top-3 w-[200px] h-[3px]"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(255, 200, 100, 0.6) 80%, transparent 100%)',
              filter: 'blur(1px)',
            }}
          />
          <div
            className="absolute -left-[160px] top-4 w-[140px] h-[2px]"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(255, 120, 50, 0.7) 80%, transparent 100%)',
              filter: 'blur(1px)',
            }}
          />

          {/* Asteroid Meteorite Rock Head */}
          <div className="relative w-12 h-10 rounded-full flex items-center justify-center">
            {/* White-hot incandescent shockwave leading edge */}
            <div
              className="absolute -right-3 w-14 h-14 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,200,100,0.85) 35%, rgba(255,70,0,0.4) 65%, transparent 80%)',
                filter: 'blur(4px)',
              }}
            />

            {/* Rugged rocky core with crater shading */}
            <div
              className="relative w-10 h-8 rounded-[48%_52%_45%_55%/55%_48%_52%_45%] shadow-[inset_-4px_-4px_8px_rgba(0,0,0,0.9),inset_3px_3px_6px_rgba(255,255,255,0.9),0_0_20px_rgba(255,140,0,0.9)]"
              style={{
                background: 'linear-gradient(135deg, #f7d2a9 0%, #c4682c 40%, #522712 75%, #1f0d05 100%)',
              }}
            >
              {/* Craters */}
              <div className="absolute top-2 left-2.5 w-2 h-1.5 rounded-full bg-black/50 shadow-inner" />
              <div className="absolute bottom-2 left-4 w-2.5 h-2 rounded-full bg-black/60 shadow-inner" />
              <div className="absolute top-3 right-2 w-1.5 h-1.5 rounded-full bg-black/40 shadow-inner" />
            </div>
          </div>

        </div>
      </div>

      {/* Secondary micro-meteor streak running in parallel */}
      <div
        key={`${animKey}-sub`}
        className="absolute -top-20 left-[20vw] animate-asteroid-flyby"
        style={{
          animationDuration: '0.65s',
          animationDelay: '0.08s',
          opacity: 0.7,
        }}
      >
        <div className="relative flex items-center">
          <div
            className="w-[180px] h-[3px]"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(255, 180, 80, 0.5) 50%, #ffffff 100%)',
              filter: 'blur(1px)',
              boxShadow: '0 0 8px rgba(255, 140, 20, 0.7)',
            }}
          />
          <div className="w-2.5 h-2.5 rounded-full bg-white filter blur-[1px] shadow-[0_0_10px_#ff8c00]" />
        </div>
      </div>
    </div>
  );
};
