import React from 'react';
import * as LucideIcons from 'lucide-react';
import { useAdmin } from '../lib/AdminContext';
import { VALUE_PILLARS } from '../data/websiteData';

export default function ValuePillars() {
  let pillarsList = VALUE_PILLARS;
  try {
    const admin = useAdmin();
    if (admin) {
      pillarsList = admin.valuePillars;
    }
  } catch (e) {
    // fallback
  }

  return (
    <section
      id="pillars"
      className="relative z-20 -mt-12 sm:-mt-16 md:-mt-20 lg:-mt-24 xl:-mt-28 max-w-7xl mx-auto px-6"
    >
      {/* Container card designed to float dynamically with elegant diffused shadow */}
      <div className="bg-cream-card rounded-2xl border border-bronze/10 shadow-[0_15px_50px_rgba(58,49,42,0.06)] p-6 sm:p-10 divide-y divide-bronze/10 md:divide-y-0 lg:divide-x grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-2 md:gap-y-8 lg:gap-y-0 text-center">
        {pillarsList.map((pillar, idx) => {
          // Dynamically lookup lucide icon components safely
          const IconComponent = (LucideIcons as any)[pillar.iconName] || LucideIcons.BookOpen;

          return (
            <div
              key={pillar.id || idx}
              className="flex flex-col items-center px-4 py-6 md:py-4 lg:py-0 space-y-4 group transition-all duration-300"
            >
              {/* Rotating glowing icon wrap */}
              <div className="w-12 h-12 rounded-full bg-bronze/5 flex items-center justify-center text-bronze group-hover:bg-bronze group-hover:text-white transition-all duration-500 transform group-hover:rotate-6">
                <IconComponent className="w-6 h-6 stroke-[1.5]" />
              </div>

              <div className="space-y-2">
                <h3 className="font-display font-medium text-lg text-charcoal group-hover:text-bronze transition-colors">
                  {pillar.title}
                </h3>
                <p className="font-sans text-sm text-muted leading-relaxed max-w-[240px] mx-auto">
                  {pillar.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
