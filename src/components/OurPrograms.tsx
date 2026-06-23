import React, { useState } from 'react';
import { useAdmin } from '../lib/AdminContext';
import { INITIATIVES as DEFAULT_INITIATIVES } from '../data/websiteData';
import { ArrowLeftRight, ArrowRight, ShieldCheck, Milestone, Share2, HeartHandshake } from 'lucide-react';

interface SelectedInitiativeDetails {
  title: string;
  focus: string;
  metrics: string;
  summary: string;
}

const INITIATIVE_DETAILS_MAP: Record<string, SelectedInitiativeDetails> = {
  "scholarship-program": {
    title: "Arivu Gold Scholarship Program",
    focus: "Primary & Secondary student sponsorships including tuition, books, uniforms, and local transport stipends.",
    metrics: "Over 820+ rural girl students fully sponsored with a 100% board completion rate.",
    summary: "By removing financial friction, we ensure that talented and driven minds continue their intellectual journeys undisturbed. The program matches corporate mentors with young scholars for monthly guidance."
  },
  "teacher-training": {
    title: "Guru-Sishya Teacher Training Academy",
    focus: "Modern pedagogy, dynamic digital classroom materials, emotional intelligence mentorship, and child safety compliance directives.",
    metrics: "1,200+ rural educators trained in active learning methods across Karnataka and Tamil Nadu.",
    summary: "An empowered teacher transforms generations. We host bi-annual training bootcamps where government school teachers learn to integrate interactive physical tools, toys, and digital tablets directly into their lesson structures."
  },
  "digital-learning": {
    title: "Samyak Digital Literacy Classrooms",
    focus: "Installing computer systems, offline-media server hubs, and solar-power setups in remote schools.",
    metrics: "120+ village schools upgraded with complete dynamic digital learning labs.",
    summary: "Bridge the digital divide. Our solar-powered micro-servers give remote students interactive offline access to encyclopedias, programming languages, mathematical simulations, and global languages without relying on unstable networks."
  },
  "community-outreach": {
    title: "Karuna Community Care & Support",
    focus: "Setting up clean drinking water facilities, organizing nutritional camps, and providing career counseling seminars for parents.",
    metrics: "50+ tribal and remote hamlets supplied with continuous solar-powered water filtration plants.",
    summary: "Educational success depends on community stability. By engaging parents and securing village sanitation, we build a supportive ecosystem that naturally encourages high school enrollment and reduces early drop-outs."
  }
};

export default function Initiatives() {
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState<string>("All");

  let initiatives = DEFAULT_INITIATIVES;
  let initiativeCategories: string[] = [];

  try {
    const admin = useAdmin();
    if (admin) {
      initiatives = admin.initiatives;
      initiativeCategories = admin.initiativeCategories || [];
    }
  } catch (e) {
    // Dynamic context fallback
  }

  const toggleDetail = (id: string) => {
    if (activeCardId === id) {
      setActiveCardId(null);
    } else {
      setActiveCardId(id);
    }
  };

  // Filter items in active Tab/Category
  const filteredInitiatives = selectedTab === "All"
    ? initiatives
    : initiatives.filter(init => init.category === selectedTab);

  return (
    <section id="initiatives" className="py-24 bg-cream-card relative border-t border-b border-bronze/5">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Centered Heading Layout */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-bronze">
            OUR INITIATIVES
          </span>
          <h2 className="font-display font-medium text-3.5xl sm:text-4xl text-charcoal leading-tight">
            Building a Foundation <span className="text-bronze font-bold">for Life</span>
          </h2>
          <p className="font-sans text-sm sm:text-base text-muted leading-relaxed">
            We design and execute scientifically verified, highly impactful educational programs that support rural students, empower educators, and stabilize tribal community systems.
          </p>
        </div>

        {/* Dynamic Category Tabs Selector */}
        {initiativeCategories.length > 0 && (
          <div className="flex flex-wrap justify-center items-center gap-1.5 sm:gap-2.5 mb-12 select-none max-w-3xl mx-auto border-b pb-6 border-bronze/10">
            <button
              onClick={() => { setSelectedTab("All"); setActiveCardId(null); }}
              className={`px-4 py-1.5 rounded-full text-[11px] font-mono font-bold uppercase transition-all tracking-wider ${
                selectedTab === "All"
                  ? "bg-[#0E2138] text-white shadow-sm"
                  : "bg-white text-muted border border-bronze/10 hover:text-[#0E2138] hover:border-[#0E2138]"
              }`}
            >
              All Programs ({initiatives.length})
            </button>
            {initiativeCategories.map((cat) => {
              const count = initiatives.filter(init => init.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => { setSelectedTab(cat); setActiveCardId(null); }}
                  className={`px-4 py-1.5 rounded-full text-[11px] font-mono font-bold uppercase transition-all tracking-wider ${
                    selectedTab === cat
                      ? "bg-[#0E2138] text-white shadow-sm"
                      : "bg-white text-muted border border-bronze/10 hover:text-[#0E2138] hover:border-[#0E2138]"
                  }`}
                >
                  {cat} ({count})
                </button>
              );
            })}
          </div>
        )}

        {/* 4-Column CSS Grid Layout */}
        {filteredInitiatives.length === 0 ? (
          <div className="text-center py-16 p-4 bg-cream/40 border rounded-2xl max-w-md mx-auto">
            <p className="font-mono text-xs text-muted">Currently, no active initiatives are registered inside the "{selectedTab}" tab category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredInitiatives.map((item) => {
              const isDetailOpen = activeCardId === item.id;
              
              // Custom details with fallback mappings
              const detailInfo = {
                title: item.title,
                focus: item.focus || INITIATIVE_DETAILS_MAP[item.id]?.focus || "Localized academic development support and children compliance models.",
                metrics: item.metrics || INITIATIVE_DETAILS_MAP[item.id]?.metrics || "Guarantees resource stability.",
                summary: item.summary || INITIATIVE_DETAILS_MAP[item.id]?.summary || "By removing systemic financial friction, our actions ensure that talented minds enjoy equal academic paths."
              };

              return (
                <div
                  key={item.id}
                  className="flex flex-col h-full bg-cream rounded-2xl border border-bronze/10 overflow-hidden shadow-[0_4px_20px_rgba(58,49,42,0.02)] transition-all duration-300 hover:shadow-[0_12px_30px_rgba(194,142,83,0.08)] hover:-translate-y-1 group"
                >
                  {/* Image Area */}
                  <div className="relative aspect-[3/2] overflow-hidden bg-cream-dark border-b border-bronze/5">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 to-transparent" />
                    
                    {/* Badge showing assigned tab if filtered under 'All' */}
                    {item.category && (
                      <span className="absolute top-3 left-3 bg-[#0E2138]/90 text-white font-mono text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-sm border border-white/10">
                        {item.category}
                      </span>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-display font-semibold text-base sm:text-lg text-charcoal group-hover:text-bronze transition-colors leading-snug">
                        {item.title}
                      </h4>
                      <p className="font-sans text-xs sm:text-sm text-muted leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={() => toggleDetail(item.id)}
                        className="inline-flex items-center gap-1.5 text-xs font-bold font-mono uppercase tracking-wider text-bronze hover:text-bronze-dark transition-colors"
                      >
                        <span>{isDetailOpen ? "View Less ▲" : "Learn More →"}</span>
                      </button>
                    </div>
                  </div>

                  {/* Inline Drawer expandable drawer containing details */}
                  {isDetailOpen && (
                    <div className="px-6 pb-6 pt-2 border-t border-bronze/10 bg-bronze/5 animate-fade-in text-xs space-y-3">
                      <div className="space-y-1">
                        <span className="font-bold text-charcoal uppercase tracking-wider block">Scope Focus:</span>
                        <p className="text-muted leading-relaxed">{detailInfo.focus}</p>
                      </div>
                      <div className="p-2 rounded bg-white text-bronze font-mono font-bold flex gap-1.5 items-center">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>{detailInfo.metrics}</span>
                      </div>
                      <p className="text-muted/90 italic leading-relaxed">{detailInfo.summary}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
