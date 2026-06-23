import React, { useState, useEffect } from 'react';
import Logo from './Logo';
import { Menu, X, Heart, Settings } from 'lucide-react';
import { useAdmin } from '../lib/AdminContext';
import { NavLink } from '../types';

interface NavbarProps {
  links: NavLink[];
  onOpenDonate: () => void;
}

export default function Navbar({ links, onOpenDonate }: NavbarProps) {
  const [activeId, setActiveId] = useState("home");
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  let setIsAdminOpen = (open: boolean) => {};
  try {
    const admin = useAdmin();
    if (admin) {
      setIsAdminOpen = admin.setIsAdminOpen;
    }
  } catch (e) {
    // Dynamic context fallback
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      // Determine active section based on scroll intersection
      const sections = links.map(l => document.getElementById(l.id));
      const scrollPos = window.scrollY + 120;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec && sec.offsetTop <= scrollPos) {
          setActiveId(links[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [links]);

  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsOpen(false);
    const target = document.getElementById(id);
    if (target) {
      const offsetPos = target.offsetTop - 85; 
      window.scrollTo({
        top: offsetPos,
        behavior: 'smooth'
      });
      setActiveId(id);
    }
  };

  return (
    <nav
      id="main-navigation-bar"
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        scrolled || isOpen
          ? 'glass-panel shadow-md py-3 border-b border-bronze/10'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* Branding Logo */}
        <a href="#home" onClick={(e) => handleNavLinkClick(e, "home")} title="Buddha Arivu Kalanjiyam Home">
          <Logo size={44} />
        </a>

        {/* Desktop Navigation Links */}
        <div id="desktop-links" className="hidden lg:flex items-center gap-7">
          {links.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={(e) => handleNavLinkClick(e, link.id)}
              className={`relative py-1 text-sm font-semibold tracking-wide transition-colors ${
                activeId === link.id
                  ? 'text-bronze font-bold'
                  : 'text-charcoal/80 hover:text-bronze'
              }`}
            >
              {link.label}
              {activeId === link.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-bronze rounded-full" />
              )}
            </a>
          ))}
        </div>

        {/* Donate Button on Desktop */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={() => setIsAdminOpen(true)}
            className="p-2 ml-1 rounded-full border border-bronze/20 text-bronze hover:bg-bronze hover:text-white transition-all duration-300 flex items-center justify-center bg-transparent"
            title="Open Asset Portal Panel"
          >
            <Settings className="w-5 h-5" />
          </button>
          <button
            onClick={onOpenDonate}
            className="px-6 py-2.5 rounded-full bg-bronze text-white text-sm font-semibold hover:bg-bronze-dark transition-all duration-300 transform hover:scale-105 flex items-center gap-1.5 shadow-[0_4px_14px_rgba(194,142,83,0.3)] pulse-light"
          >
            <Heart className="w-4 h-4 fill-white/10" />
            <span>Donate Now</span>
          </button>
        </div>

        {/* Mobile Toggle Trigger */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => setIsAdminOpen(true)}
            className="p-2 rounded-full border border-bronze/10 text-bronze hover:bg-bronze/5 transition-colors flex items-center justify-center bg-transparent"
            title="Open Mobile Asset Desk"
          >
            <Settings className="w-4.5 h-4.5" />
          </button>

          <button
            onClick={onOpenDonate}
            className="p-2 rounded-full bg-bronze text-white hover:bg-bronze-dark transition-colors"
            title="Donate on mobile"
          >
            <Heart className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-charcoal hover:bg-bronze/10 rounded-lg transition-colors"
            title="Toggle Menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Expandable Mobile Navigation Slide-Down Drawer */}
      {isOpen && (
        <div id="mobile-menu-drawer" className="lg:hidden absolute top-full left-0 right-0 glass-panel border-b border-bronze/10 p-5 mt-1 space-y-4 shadow-lg animate-slide-down">
          <div className="flex flex-col gap-3">
            {links.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavLinkClick(e, link.id)}
                className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  activeId === link.id
                    ? 'bg-bronze/10 text-bronze border-l-4 border-bronze'
                    : 'text-charcoal hover:bg-cream-dark/40'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>
          
          <div className="pt-2 border-t border-bronze/10">
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenDonate();
              }}
              className="w-full py-3 rounded-full bg-bronze text-white text-sm font-bold hover:bg-bronze-dark transition-all flex items-center justify-center gap-2 shadow-md"
            >
              <Heart className="w-4 h-4" />
              <span>Donate Now</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
