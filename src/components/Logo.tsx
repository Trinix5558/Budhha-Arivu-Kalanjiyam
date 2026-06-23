import React from 'react';
import { useAdmin } from '../lib/AdminContext';

interface LogoProps {
  size?: number;
  showText?: boolean;
  className?: string;
}

export default function Logo({ size = 48, showText = true, className = "" }: LogoProps) {
  const adminContext = React.useContext(React.createContext<any>(null)); // Fallback in case context isn't ready
  let logoSrc = "https://i.ibb.co/Q3X4mZHG/Asset-2-2x.png";
  
  try {
    const admin = useAdmin();
    if (admin) {
      logoSrc = admin.logoUrl;
    }
  } catch (e) {
    // Context might be used outside AdminProvider in static previews
  }

  return (
    <div id="logo-root" className={`flex items-center gap-3 select-none ${className}`}>
      {/* Uploaded Logo Image */}
      <img
        id="buddha-logo-img"
        src={logoSrc}
        alt="Buddha Arivu Kalanjiyam Logo"
        className="shrink-0 object-contain transition-transform duration-300 hover:scale-105"
        style={{ width: size, height: size }}
        referrerPolicy="no-referrer"
      />
      
      {showText && (
        <div id="logo-text-col" className="flex flex-col justify-center leading-none">
          <div className="flex items-center gap-2">
            <span className="font-sans font-extrabold text-[15px] sm:text-[16px] tracking-[0.04em] text-[#0E2138] uppercase">
              Buddha Arivu
            </span>
            <span className="w-8 h-[1.5px] bg-bronze/60 block self-center rounded-full"></span>
          </div>
          <span className="font-sans font-bold text-[10px] sm:text-[11px] tracking-[0.16em] text-bronze uppercase mt-1">
            Kalanjiyam
          </span>
        </div>
      )}
    </div>
  );
}
