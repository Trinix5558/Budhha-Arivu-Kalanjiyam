import React, { useState } from 'react';
import { useAdmin } from '../lib/AdminContext';
import { FOUNDER_INFO as DEFAULT_FOUNDER } from '../data/websiteData';
import { Star, MessageSquareQuote, Heart, CheckCircle2 } from 'lucide-react';

export default function Founder() {
  const [isOpen, setIsOpen] = useState(false);
  let founderInfo = DEFAULT_FOUNDER;

  try {
    const admin = useAdmin();
    if (admin) {
      founderInfo = admin.founderInfo;
    }
  } catch (e) {
    // Fail-safe context
  }

  return (
    <section id="founder" className="py-16 bg-cream relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Soft Beige background card container */}
        <div className="bg-cream-dark/50 rounded-2xl border border-bronze/10 p-6 sm:p-10 shadow-[0_8px_30px_rgba(194,142,83,0.04)] transition-all duration-300">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Square portrait image (rounded corners) (3 of 12 cols) */}
            <div id="founder-photo-box" className="lg:col-span-3 flex justify-center lg:justify-start">
              <div className="relative group shrink-0">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-bronze to-cream-dark opacity-45 group-hover:opacity-100 blur transition-opacity duration-500" />
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden shadow-md">
                  <img
                    src={founderInfo.imageUrl}
                    alt={founderInfo.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-2 right-2 bg-bronze text-white p-1.5 rounded-lg shadow-sm">
                    <Star className="w-4 h-4 fill-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Middle: Bio and headlining details (6 of 12 cols) */}
            <div id="founder-bio-box" className="lg:col-span-6 space-y-4 text-center lg:text-left">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-bronze font-bold">
                  {founderInfo.role}
                </span>
                <h3 className="font-display font-medium text-2.5xl sm:text-3xl text-charcoal mt-1">
                  {founderInfo.name}
                </h3>
              </div>

              <div className="space-y-3 text-muted text-sm sm:text-base leading-relaxed">
                {founderInfo.bioLines.map((line, idx) => (
                  <p key={idx}>{line}</p>
                ))}
              </div>
            </div>

            {/* Right: CTA button vertically centered (3 of 12 cols) */}
            <div id="founder-cta-box" className="lg:col-span-3 flex justify-center lg:justify-end">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="px-6 py-3.5 rounded-full bg-bronze text-white text-xs font-semibold hover:bg-bronze-dark transition-all duration-300 shadow-md flex items-center gap-2 transform active:scale-95"
              >
                <MessageSquareQuote className="w-4 h-4" />
                <span>{isOpen ? "Close Message" : "Read Founder's Message"}</span>
              </button>
            </div>
            
          </div>

          {/* Expandable Founder Message Box */}
          {isOpen && (
            <div id="expanded-message-box" className="mt-8 pt-8 border-t border-bronze/10 animate-fade-in space-y-6">
              <div className="p-6 sm:p-8 rounded-xl bg-white border border-bronze/15 max-w-3xl mx-auto shadow-sm relative">
                {/* Backing Quote Icon */}
                <span className="absolute top-4 right-6 text-bronze/10 text-8xl font-serif select-none pointer-events-none">“</span>
                
                <h4 className="font-display text-xl text-charcoal font-semibold mb-4 text-center">
                  "Uplifting Lives via Wisdom-based Character"
                </h4>
                
                <div className="space-y-4 text-sm text-muted leading-relaxed">
                  <p>
                    Greetings and blessings to our global community of supporters and partners.
                  </p>
                  <p>
                    When we launched <strong>Buddha Arivu Kalanjiyam</strong>, our roadmap was built around one simple premise: {`that access to standard, high-level knowledge should never be a luxury reserved for the affluent, but rather a universal opportunity.`}
                  </p>
                  <p>
                    We believe true education addresses not only the intellect (intellectual skills) but also the heart (wisdom and mindfulness). By combining modern technology resources with values of mindfulness and environmental sustainability, we are assisting our students in building resilient lives that positively serve their families and communities.
                  </p>
                  <p>
                    I welcome you to join us in this campaign. Together, let us kindle the light of literacy.
                  </p>
                </div>

                <div className="mt-6 flex flex-col items-center sm:items-end border-t border-bronze/10 pt-4">
                  <span className="font-display font-bold text-bronze">{founderInfo.name}</span>
                  <span className="text-xs font-mono text-muted">President, Buddha Arivu Kalanjiyam</span>
                  <span className="text-xs text-muted/60 mt-1">Dr. Malarselvi Foundation Initiative</span>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
