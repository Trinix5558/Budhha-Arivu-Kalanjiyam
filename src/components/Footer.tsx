import React from 'react';
import Logo from './Logo';
import { useAdmin } from '../lib/AdminContext';
import {
  Heart,
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  Lock
} from 'lucide-react';

interface FooterProps {
  onOpenDonate: () => void;
}

export default function Footer({ onOpenDonate }: FooterProps) {
  let setIsAdminOpen = (open: boolean) => {};
  try {
    const admin = useAdmin();
    if (admin) {
      setIsAdminOpen = admin.setIsAdminOpen;
    }
  } catch (e) {
    // Context fallback for safety
  }
  
  const handleScrollToNav = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
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
    <footer id="footer-section" className="bg-earth text-cream relative mt-16">
      
      {/* 1. INTERACTIVE COMPLIANCE PRE-FOOTER */}
      <div className="max-w-7xl mx-auto px-6 py-20 border-b border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Trust Vision & Compliance (Left: 6 Columns) */}
          <div className="lg:col-span-6 space-y-5">
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-bronze-light flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Trust Standards & Compliance</span>
              </span>
              <h3 className="font-display font-medium text-2.5xl text-white">
                Buddha Arivu Kalanjiyam
              </h3>
            </div>
            <p className="text-sm text-white/70 leading-relaxed">
              Registered as a non-profit public charitable trust in India. We operate transparently and adhere strictly to high standards of financial auditing and social accountability.
            </p>
          </div>
          
          {/* Compliance Info Cards (Right: 6 Columns) */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-white/70">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
              <span className="font-bold text-white font-mono text-[10px] uppercase tracking-wider block text-bronze-light">Tax Exemption Privileges</span>
              <p>Contributions made to the trust are tax-exempted under Section 80G and Section 12A of the Income Tax Act, 1961.</p>
            </div>
            
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
              <span className="font-bold text-white font-mono text-[10px] uppercase tracking-wider block text-bronze-light">Government Registration ID</span>
              <p className="font-mono text-white/80">Reg No: 412/IV/2022-DL | Dr. Malarselvi Foundation Alliance</p>
            </div>
          </div>

        </div>
      </div>

      {/* 2. THE SEAMLESS LINKS & CTA FOOTER */}
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-12">
        
        {/* Layout containing 8-cols Info/Links and 4-cols Overlapping Dark CTA Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start xl:gap-16">
          
          {/* Detailed Info left (8 columns) */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-12 gap-10">
            
            {/* Brand block (7 columns) */}
            <div className="sm:col-span-7 space-y-5">
              <Logo size={42} showText={true} className="text-white filter brightness-200" />
              <p className="text-xs text-white/70 leading-relaxed max-w-sm">
                Empowering scholars, modernizing rural classrooms, establishing value training academies, and dismantling socioeconomic barriers.
              </p>
              
              <div className="space-y-2 pt-2 text-xs text-white/60">
                <p className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-bronze-light" />
                  <span>Bodhi Nagar, New Delhi – 110001, India</span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-bronze-light" />
                  <span>+91 98765 43210</span>
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-bronze-light" />
                  <span>info@buddhaarivukalanjiyam.org</span>
                </p>
              </div>
            </div>

            {/* Quick Links & Get Involved columns (5 columns split) */}
            <div className="sm:col-span-5 grid grid-cols-2 gap-6">
              
              {/* Column 1: Links */}
              <div className="space-y-4">
                <h5 className="font-bold text-xs uppercase tracking-widest text-bronze-light">
                  Navigation
                </h5>
                <ul className="space-y-2 text-xs text-white/75">
                  {[
                    { label: "About Us", id: "about" },
                    { label: "Founder", id: "founder" },
                    { label: "Our Initiatives", id: "initiatives" },
                    { label: "Gallery", id: "gallery" },
                    { label: "News & Events", id: "news" },
                    { label: "Contact Us", id: "contact" }
                  ].map((link, idx) => (
                    <li key={idx}>
                      <a
                        href={`#${link.id}`}
                        onClick={(e) => handleScrollToNav(e, link.id)}
                        className="hover:text-bronze transition-colors flex items-center gap-1"
                      >
                        <span>→</span>
                        <span>{link.label}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 2: Get Involved */}
              <div className="space-y-4">
                <h5 className="font-bold text-xs uppercase tracking-widest text-bronze-light">
                  Get Involved
                </h5>
                <ul className="space-y-2 text-xs text-white/75">
                  {["Volunteer", "Partnership", "Careers", "Donate Now"].map((item, idx) => (
                    <li key={idx}>
                      <button
                        onClick={onOpenDonate}
                        className="text-left text-white/75 hover:text-bronze transition-colors flex items-center gap-1"
                      >
                        <span>★</span>
                        <span>{item}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

          </div>

          {/* Elegant Overlapping CTA vertical card (4 columns) */}
          <div className="lg:col-span-4 lg:-mt-10">
            <div className="p-8 rounded-2xl bg-earth-dark border border-bronze/30 shadow-[0_15px_40px_rgba(0,0,0,0.3)] text-center space-y-6 relative overflow-hidden group">
              
              {/* Abs decorative background lotus leaf watermarking */}
              <div className="absolute right-[-20%] bottom-[-10%] opacity-[0.03] text-bronze pointer-events-none transform rotate-45 scale-[1.8] group-hover:rotate-90 transition-transform duration-1000">
                <svg width="200" height="200" viewBox="0 0 100 100" fill="currentColor">
                  <path d="M 50 10 Q 30 50 50 90 Q 70 50 50 10" />
                  <path d="M 50 30 Q 15 50 50 70 Q 85 50 50 30" />
                </svg>
              </div>

              {/* Gold Lotus Leaf emblem */}
              <div className="w-16 h-16 rounded-full bg-bronze/10 border border-bronze/30 text-bronze flex items-center justify-center mx-auto transition-transform duration-500 group-hover:scale-110">
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a15 15 0 0 0-4 10c0 4.5 4 8 4 8s4-3.5 4-8A15 15 0 0 0 12 2Z"/>
                  <path d="M12 10V22"/>
                  <path d="M12 12c-2-1.5-6-1.5-7 1 0 2 3.5 3.5 7 4"/>
                  <path d="M12 12c2-1.5 6-1.5 7 1 0 2-3.5 3.5-7 4"/>
                </svg>
              </div>

              <div className="space-y-3">
                <h4 className="font-display font-medium text-xl text-white leading-snug">
                  Be the Light in <br />Someone's Journey
                </h4>
                <p className="text-xs text-white/60 leading-relaxed max-w-xs mx-auto">
                  Your generous contributions help us build dynamic computer classrooms, purchase textbooks, train tutors, and extend full board scholarship sponsorships.
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={onOpenDonate}
                  className="w-full py-3.5 rounded-full bg-bronze text-white text-xs font-bold hover:bg-bronze-dark hover:text-white transition-all shadow-[0_4px_14px_rgba(194,142,83,0.3)] flex items-center justify-center gap-1.5"
                >
                  <Heart className="w-3.5 h-3.5 fill-white/10" />
                  <span>Donate Now</span>
                </button>
              </div>

              <p className="text-[10px] text-white/40 font-mono tracking-wider italic">
                Dr. Malarselvi Foundation &copy; 2026 Initiative
              </p>
            </div>
          </div>

        </div>

        {/* 3. FINAL MINIMAL BOTTOM RECTANGLE (ONLY COPYRIGHT - NO LOGO OR BOTTOM SOCIAL LINKS AS THEY ARE MOVED ABOVE) */}
        <div id="footer-bottom-grid" className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-center gap-4">
          <p className="text-xs text-white/40">
            © 2026 Buddha Arivu Kalanjiyam. All Rights Reserved. | <a href="#privacy" className="hover:underline">Privacy Policy</a> | <a href="#terms" className="hover:underline">Terms & Conditions</a>
          </p>
          <button 
            onClick={() => setIsAdminOpen(true)}
            className="text-[10px] uppercase font-mono font-bold tracking-widest text-bronze-light hover:text-white border border-bronze-light/20 p-1.5 px-3 rounded-md hover:bg-white/5 transition-all flex items-center gap-1.5 select-none"
          >
            <Lock className="w-3 h-3 text-bronze-light animate-pulse" />
            <span>Admin Desk</span>
          </button>
        </div>

      </div>
    </footer>
  );
}
