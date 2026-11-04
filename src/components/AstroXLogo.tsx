import React, { useState, useEffect } from 'react';

interface AstroXLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  theme?: 'dark' | 'light' | 'auto'; // 'light' for dark backgrounds (#dadada or white text), 'dark' for dark text on #dadada
  interactive?: boolean;
  onClick?: () => void;
}

export const AstroXLogo: React.FC<AstroXLogoProps> = ({
  className = '',
  size = 'md',
  theme = 'auto',
  interactive = true,
  onClick,
}) => {
  // State: false = initial "Astro X" / "ASTRO X", true = logo replaces the 'O'
  const [isReplaced, setIsReplaced] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  useEffect(() => {
    // Initial entrance: first text appears as "Astro X", then after 900ms, the red planet replaces the 'O'
    const timer = setTimeout(() => {
      setIsReplaced(true);
    }, 900);

    return () => clearTimeout(timer);
  }, []);

  const handleMouseEnter = () => {
    if (!interactive) return;
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (!interactive) return;
    setIsHovered(false);
  };

  const handleToggleReplay = () => {
    setIsReplaced(false);
    setTimeout(() => {
      setIsReplaced(true);
    }, 700);
  };

  // Size configurations
  const sizeStyles = {
    sm: {
      text: 'text-base tracking-[0.08em]',
      oWidth: 'w-[1.05em] h-[1.05em]',
      imgSize: 'w-[1.25em] h-[1.25em] -translate-y-[0.05em]',
    },
    md: {
      text: 'text-xl md:text-2xl tracking-[0.08em]',
      oWidth: 'w-[1.1em] h-[1.1em]',
      imgSize: 'w-[1.3em] h-[1.3em] -translate-y-[0.08em]',
    },
    lg: {
      text: 'text-2xl md:text-3xl tracking-[0.08em]',
      oWidth: 'w-[1.15em] h-[1.15em]',
      imgSize: 'w-[1.35em] h-[1.35em] -translate-y-[0.1em]',
    },
    hero: {
      text: 'text-3xl sm:text-4xl md:text-5xl tracking-[0.06em]',
      oWidth: 'w-[1.18em] h-[1.18em]',
      imgSize: 'w-[1.4em] h-[1.4em] -translate-y-[0.12em]',
    },
  };

  const currentSize = sizeStyles[size];

  return (
    <div
      onClick={() => {
        if (onClick) onClick();
        else handleToggleReplay();
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`inline-flex items-center font-archivo font-bold uppercase select-none cursor-pointer group ${currentSize.text} ${className}`}
      title="AstroX — Click to replay logo animation"
    >
      {/* "ASTR" */}
      <span className="transition-transform duration-300 group-hover:-translate-x-0.5">
        ASTR
      </span>

      {/* The Morphing "O" Slot */}
      <span
        className={`relative inline-flex items-center justify-center mx-[0.04em] ${currentSize.oWidth}`}
        style={{
          verticalAlign: 'middle',
        }}
      >
        {/* State 1: Typography Letter "O" */}
        <span
          className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isReplaced
              ? 'opacity-0 scale-50 rotate-45 pointer-events-none'
              : 'opacity-100 scale-100 rotate-0'
          }`}
        >
          O
        </span>

        {/* State 2: Red Saturn Planet Icon replacing the "O" */}
        <span
          className={`absolute inset-0 flex items-center justify-center transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isReplaced
              ? 'opacity-100 scale-100 rotate-0'
              : 'opacity-0 scale-40 -rotate-45 pointer-events-none'
          }`}
        >
          <img
            src="/assets/aistudio/red_saturn_transparent.png"
            alt="AstroX Saturn Planet Icon"
            className={`max-w-none object-contain transition-transform duration-500 ${currentSize.imgSize} ${
              isHovered ? 'scale-115 rotate-12' : 'scale-100 rotate-0'
            }`}
            style={{
              filter: 'drop-shadow(0 2px 6px rgba(239, 35, 60, 0.45))',
            }}
            onError={(e) => {
              // Fallback to original image if needed
              (e.target as HTMLImageElement).src = '/assets/aistudio/Red_Saturn_Planet_Icon_c41a39bf.png';
            }}
          />
        </span>
      </span>

      {/* "X" */}
      <span className="transition-transform duration-300 group-hover:translate-x-0.5">
        X
      </span>
    </div>
  );
};
