import React from 'react';
import { Link } from 'react-router-dom';

export const BrandLogo = ({ variant = 'light', size = 'normal', showTagline = true }) => {
  // variant: 'light' (on dark forest background) or 'dark' (on light ivory background)
  const isDarkBg = variant === 'light';

  return (
    <Link to="/" className="inline-flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-gold rounded-lg p-1 transition-all">
      {/* Vector Icon */}
      <div className={`relative flex items-center justify-center rounded-xl p-1.5 transition-transform group-hover:scale-105 ${
        isDarkBg ? 'bg-forest-light/60 border border-gold/40' : 'bg-forest text-gold border border-gold/30'
      }`}>
        <svg
          className={size === 'large' ? 'w-10 h-10' : 'w-8 h-8'}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Horizon sun */}
          <circle cx="50" cy="40" r="14" fill="#C5A66B" fillOpacity="0.25" />
          <circle cx="50" cy="40" r="9" fill="#C5A66B" />
          {/* Rear peaks */}
          <path d="M15 72 L42 34 L62 58 L72 44 L90 72 Z" fill={isDarkBg ? '#2E6E60' : '#235A4D'} />
          {/* Front peaks */}
          <path d="M8 78 L35 46 L55 70 L68 54 L92 78 Z" fill={isDarkBg ? '#102D27' : '#173F35'} />
          {/* Route path */}
          <path d="M42 78 C 45 68, 55 64, 52 56" stroke="#C5A66B" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="3 3"/>
          <path d="M5 78 H95" stroke="#C5A66B" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      {/* Typography */}
      <div className="flex flex-col text-left">
        <span className={`font-serif tracking-wider font-bold transition-colors ${
          size === 'large' ? 'text-2xl' : 'text-lg md:text-xl'
        } ${isDarkBg ? 'text-ivory group-hover:text-gold' : 'text-forest-dark group-hover:text-forest'}`}>
          THE MEMORABLE TRIP
        </span>
        {showTagline && (
          <span className={`text-[10px] uppercase tracking-[0.22em] font-medium ${
            isDarkBg ? 'text-gold-light/90' : 'text-forest-light'
          }`}>
            Northeast India Journeys
          </span>
        )}
      </div>
    </Link>
  );
};

export default BrandLogo;
