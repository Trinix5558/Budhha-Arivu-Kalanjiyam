import React, { useState, useEffect } from 'react';
import { AdminProvider } from './lib/AdminContext';
import AdminPanel from './components/AdminPanel';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ValuePillars from './components/ValuePillars';
import AboutUs from './components/AboutUs';
import Founder from './components/Founder';
import OurPrograms from './components/OurPrograms';
import Gallery from './components/Gallery';
import NewsEvents from './components/NewsEvents';
import ContactUs from './components/ContactUs';
import Footer from './components/Footer';
import DonationModal from './components/DonationModal';
import { NAVIGATION_LINKS } from './data/websiteData';
import { ChevronUp, Award, Laptop, Users, Heart } from 'lucide-react';

export default function App() {
  const [isDonateOpen, setIsDonateOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress percentage
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }

      // Show scroll-to-top trigger
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <AdminProvider>
      <div id="website-app-root" className="min-h-screen bg-cream selection:bg-bronze/30 selection:text-charcoal relative flex flex-col font-sans antialiased text-charcoal overflow-x-hidden">
        
        {/* 1. SEAMLESS TOP SCROLL PROGRESS INDICATOR */}
        <div
          id="scroll-progress-line"
          className="fixed top-0 left-0 h-[3px] bg-bronze z-50 transition-all duration-100 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />

        {/* 2. NAVIGATION BAR */}
        <Navbar
          links={NAVIGATION_LINKS}
          onOpenDonate={() => setIsDonateOpen(true)}
        />

        {/* 3. CORE COMPARTMENTS */}
        <main className="flex-1">
          {/* Landing stage */}
          <Hero onOpenDonate={() => setIsDonateOpen(true)} />

          {/* 4-Item Floating Pillars Banner */}
          <ValuePillars />

          {/* Story biography */}
          <AboutUs />

          {/* Founder credentials and biography expandable panel */}
          <Founder />

          {/* Our Educational initiatives / Programs modular grid */}
          <OurPrograms />

          {/* Dynamic Folder-based Interactive Photo Chronicles Gallery */}
          <Gallery />

          {/* Dedicated News & Events Section */}
          <NewsEvents />

          {/* Dedicated Contact Us Section */}
          <ContactUs />
        </main>

        {/* 4. FOOTER (Includes news, faq accordion, contact, quicklinks, and logos) */}
        <Footer onOpenDonate={() => setIsDonateOpen(true)} />

        {/* 5. FLOATING QUICK ACTIONS */}
        <div id="quick-floating-action-buttons" className="fixed bottom-6 right-6 z-30 flex flex-col gap-3">
          {/* Quick Donate Heart Pulsing Button */}
          <button
            onClick={() => setIsDonateOpen(true)}
            className="p-3.5 rounded-full bg-bronze text-white shadow-lg hover:bg-bronze-dark transition-all transform hover:scale-110 flex items-center justify-center pulse-light brightness-105"
            title="Quick Donation Access"
          >
            <Heart className="w-5 h-5 fill-white/10" />
          </button>

          {/* Smooth Scroll-To-Top trigger */}
          {showScrollTop && (
            <button
              onClick={handleScrollToTop}
              className="p-3 rounded-full bg-white text-muted shadow-md hover:text-bronze hover:bg-cream-dark/40 transition-all border border-bronze/10 flex items-center justify-center animate-fade-in"
              title="Scroll back to top"
            >
              <ChevronUp className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* 6. TRANSLUCENT DONATION GATEWAY INTERACTIVE MODAL */}
        <DonationModal
          isOpen={isDonateOpen}
          onClose={() => setIsDonateOpen(false)}
        />

        {/* 7. ASSET PORTAL ADMIN DESK SLIDEOUT */}
        <AdminPanel />
      </div>
    </AdminProvider>
  );
}
