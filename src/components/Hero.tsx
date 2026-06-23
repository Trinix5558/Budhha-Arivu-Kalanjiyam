import React from 'react';
import { ArrowDown } from 'lucide-react';
import { useAdmin } from '../lib/AdminContext';

interface HeroProps {
  onOpenDonate: () => void;
}

export default function Hero({ onOpenDonate }: HeroProps) {
  let buddhaSrc = "https://i.ibb.co/WW8ZLdGx/Untitled-design-1.png";
  let tagline = "Enlightening Minds. Empowering Lives.";
  let headline = "EDUCATION\nFOR ALL";
  let description = "Buddha Arivu Kalanjiyam is committed to nurturing knowledge, compassion, and character through quality education for all.";
  let quote = "He who has conquered himself is greater than he who has won a thousand battles.";
  let quoteAuthor = "Buddha";

  try {
    const admin = useAdmin();
    if (admin) {
      buddhaSrc = admin.buddhaUrl;
      tagline = admin.heroTagline;
      headline = admin.heroHeadline;
      description = admin.heroDescription;
      quote = admin.heroQuote;
      quoteAuthor = admin.heroQuoteAuthor;
    }
  } catch (e) {
    // Context fallback for safety
  }

  const handleScrollTo = (id: string) => {
    const target = document.getElementById(id);
    if (target) {
      const offsetPos = target.offsetTop - 85; 
      window.scrollTo({
        top: offsetPos,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header
      id="home"
      className="relative min-h-[auto] lg:min-h-screen pt-28 pb-20 lg:py-0 flex items-center overflow-hidden bg-[#FAF8F5]"
    >
      {/* Background Grid Accent underlays - Super clean eggshell white plaster texture */}
      <div className="absolute inset-0 z-0">
        {/* Soft, warm ambient light spots to elevate the espiritual, zen atmosphere */}
        <div className="absolute top-1/4 right-[15%] w-[600px] h-[600px] rounded-full bg-bronze/5 mix-blend-multiply blur-[100px]" />
        <div className="absolute bottom-1/4 left-[10%] w-[400px] h-[400px] rounded-full bg-bronze/3 mix-blend-multiply blur-[80px]" />
        
        {/* Faint elegant paper texture overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#C28E53_1px,transparent_1px)] [background-size:16px_16px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* Left Column (Content and typography: 7 cols) */}
        <div id="hero-heading-col" className="lg:col-span-7 space-y-6 text-left max-w-2xl py-6">
          
          <div className="space-y-4">
            {/* Tagline / Kicker - Plain text, matching the reference screenshot exactly */}
            <span className="font-sans font-semibold text-bronze text-base sm:text-[18px] tracking-wide block leading-none">
              {tagline}
            </span>
            
            {/* Massive H1 - Arial font in ALL CAPS */}
            <h1 className="font-['Arial'] font-extrabold uppercase text-[42px] sm:text-[70px] lg:text-[76px] text-[#242220] leading-[1.05] tracking-tight whitespace-pre-line">
              {headline}
            </h1>
          </div>

          {/* Description Paragraph */}
          <p className="font-sans text-base sm:text-lg text-muted/90 leading-relaxed max-w-xl">
            {description}
          </p>

          {/* Call to Actions (Rounded Pill Buttons exactly like the image) */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => handleScrollTo("initiatives")}
              className="px-8 py-3.5 rounded-full bg-[#B27F47] hover:bg-bronze-dark text-white text-sm font-semibold transition-all duration-300 transform hover:-translate-y-0.5 shadow-[0_4px_14px_rgba(178,127,71,0.25)] hover:shadow-lg"
            >
              Explore Our Programs
            </button>
            <button
              onClick={() => handleScrollTo("about")}
              className="px-8 py-3.5 rounded-full bg-transparent border border-bronze text-bronze text-sm font-semibold hover:bg-bronze/5 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Learn More About Us
            </button>
          </div>

          {/* Quote Block - Side aligned with golden Double Quote punctuation */}
          <div className="relative pt-6 border-t border-bronze/10 mt-10 flex gap-3.5 items-start">
            <span className="text-[#DFC8A5] text-5xl font-serif leading-none h-6 select-none font-bold">“</span>
            <div className="space-y-1">
              <blockquote className="font-sans text-[#5A5550]/90 text-sm sm:text-base leading-relaxed">
                {quote}
              </blockquote>
              <cite className="block text-xs font-semibold text-bronze not-italic mt-1">
                – {quoteAuthor}
              </cite>
            </div>
          </div>
        </div>

        {/* Right Column (Buddha Portrait + Concentric Golden Mandala Halo overlay: 5 cols) */}
        <div id="hero-graphic-col" className="lg:col-span-5 flex justify-center items-center relative py-12 lg:py-0">
          
          {/* Concentric Mandala Halo Frame directly behind Buddha head */}
          <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none scale-95 sm:scale-110 lg:translate-y-4">
            <svg
              width="500"
              height="500"
              viewBox="0 0 500 500"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-[100%] h-auto opacity-35 animate-[spin_240s_linear_infinite]"
            >
              {/* Fine geometric radial guidelines matching the screenshot's mandala */}
              <circle cx="250" cy="250" r="230" stroke="#DFC8A5" strokeWidth="0.5" strokeDasharray="3 5" />
              <circle cx="250" cy="250" r="210" stroke="#C28E53" strokeWidth="0.75" />
              <circle cx="250" cy="250" r="190" stroke="#DFC8A5" strokeWidth="0.5" strokeDasharray="6 6" />
              <circle cx="250" cy="250" r="170" stroke="#C28E53" strokeWidth="0.5" />
              <circle cx="250" cy="250" r="150" stroke="#DFC8A5" strokeWidth="1" strokeDasharray="12 4" />
              <circle cx="250" cy="250" r="130" stroke="#DFC8A5" strokeWidth="0.5" strokeDasharray="1 6" />
              <circle cx="250" cy="250" r="110" stroke="#DFC8A5" strokeWidth="1.5" />
              
              {/* Rotating ray guidelines */}
              <g opacity="0.4">
                {Array.from({ length: 16 }).map((_, i) => (
                  <line
                    key={i}
                    x1="250"
                    y1="250"
                    x2={250 + 240 * Math.cos((i * 22.5 * Math.PI) / 180)}
                    y2={250 + 240 * Math.sin((i * 22.5 * Math.PI) / 180)}
                    stroke="#C28E53"
                    strokeWidth="0.5"
                    strokeDasharray="2 12"
                  />
                ))}
              </g>
            </svg>
          </div>

          {/* Elegant profile image of Buddha with a clean bottom fade-out mask to prevent abrupt cuts */}
          <img
            src={buddhaSrc}
            alt="Gautama Buddha Profile"
            className="w-[310px] sm:w-[410px] lg:w-[460px] xl:w-[500px] h-auto z-10 filter drop-shadow-[0_20px_50px_rgba(58,49,42,0.12)] transition-transform duration-500 hover:scale-[1.01] relative select-none"
            style={{
              maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 82%, rgba(0,0,0,0) 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 82%, rgba(0,0,0,0) 100%)'
            }}
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {/* Scroll Down Indicator at the bottom-center of the whole header section */}
      <button
        onClick={() => handleScrollTo("pillars")}
        className="hidden md:flex absolute bottom-6 left-1/2 -translate-x-1/2 p-2.5 px-4 rounded-full bg-white/80 backdrop-blur-md shadow-md text-bronze hover:text-bronze-dark border border-bronze/10 transition-all items-center gap-1.5 text-xs font-semibold animate-bounce z-20"
        title="Scroll down"
      >
        <span>Learn More</span>
        <ArrowDown className="w-3.5 h-3.5" />
      </button>
    </header>
  );
}
