import React, { useState } from 'react';
import { useAdmin } from '../lib/AdminContext';
import { NewsItem } from '../types';
import { Calendar, Tag, ArrowRight, X, Clock, MapPin, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function NewsEvents() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedArticle, setSelectedArticle] = useState<NewsItem | null>(null);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  let newsList: NewsItem[] = [];
  try {
    const admin = useAdmin();
    if (admin) {
      newsList = admin.newsList;
    }
  } catch (e) {
    // fallback
  }

  // Extract unique categories (tags)
  const categories = ["All", ...Array.from(new Set(newsList.map(n => n.tag).filter(Boolean)))];

  const filteredNews = selectedCategory === "All"
    ? newsList
    : newsList.filter(n => n.tag === selectedCategory);

  const handleShare = (index: number) => {
    navigator.clipboard.writeText(`${window.location.origin}#news-${index}`);
    setCopiedId(index);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="news" className="py-24 bg-cream/50 scroll-mt-24 border-t border-bronze/10">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-bronze pb-1 border-b border-bronze/30 inline-block">
              Trust Bulletins & Activity log
            </span>
            <h2 className="font-display font-medium text-3.5xl sm:text-4xl text-charcoal leading-tight">
              News, Announcements & Events
            </h2>
            <p className="text-sm text-muted leading-relaxed">
              Stay connected with our daily breakthroughs, field operations updates, rural school upgrades, and heartwarming student stories.
            </p>
          </div>

          {/* Functional Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all border ${
                  selectedCategory === cat
                    ? 'bg-bronze border-bronze text-white shadow-sm'
                    : 'bg-white border-bronze/15 text-charcoal/80 hover:bg-bronze/5 hover:border-bronze/35'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNews.map((story, idx) => (
            <div
              key={story.id || idx}
              id={`news-card-${idx}`}
              className="group bg-white rounded-2xl overflow-hidden border border-bronze/10 hover:border-bronze/30 shadow-[0_4px_20px_rgba(139,115,85,0.02)] hover:shadow-[0_12px_30px_rgba(139,115,85,0.06)] transition-all flex flex-col h-full transform hover:-translate-y-1"
            >
              {/* Optional Placeholder / Decorative Unsplash Image */}
              <div className="relative h-48 overflow-hidden bg-cream-dark">
                <img
                  src={story.image || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=400"}
                  alt={story.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-4 left-4 inline-block px-3 py-1 bg-white/95 backdrop-blur-xs text-[10px] font-mono uppercase tracking-wider text-bronze font-bold rounded-full border border-bronze/10">
                  {story.tag}
                </span>

                <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent pointer-events-none" />
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs text-muted/80 font-mono">
                    <Calendar className="w-3.5 h-3.5 text-bronze-light" />
                    <span>{story.date}</span>
                  </div>

                  <h3 className="font-display font-medium text-lg text-charcoal group-hover:text-bronze transition-colors leading-snug">
                    {story.title}
                  </h3>

                  <p className="text-xs text-muted leading-relaxed line-clamp-3">
                    {story.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-bronze/[0.08] flex items-center justify-between">
                  <button
                    onClick={() => setSelectedArticle(story)}
                    className="text-xs font-bold text-bronze hover:text-bronze-dark inline-flex items-center gap-1 group/btn"
                  >
                    <span>Read Journal</span>
                    <ArrowRight className="w-3 h-3 transition-transform group-hover/btn:translate-x-1" />
                  </button>

                  <button
                    onClick={() => handleShare(idx)}
                    className="p-1.5 rounded-full hover:bg-cream transition-colors text-muted hover:text-bronze relative"
                    title="Copy direct share link"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    {copiedId === idx && (
                      <span className="absolute bottom-full right-1/2 transform translate-x-1/2 mb-1 px-2 py-0.5 bg-charcoal text-[8px] text-white rounded-md whitespace-nowrap animate-fade-in font-mono">
                        Copied!
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filteredNews.length === 0 && (
            <div className="col-span-full py-12 text-center text-muted text-xs font-mono">
              No bulletins published under this category yet.
            </div>
          )}
        </div>

        {/* Dynamic Modal overlay detail container */}
        <AnimatePresence>
          {selectedArticle && (
            <div className="fixed inset-0 bg-charcoal/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-3xl overflow-hidden max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl relative border border-bronze/15"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
                  aria-label="Close article modal"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Banner image inside modal */}
                <div className="h-56 relative bg-cream-dark">
                  <img
                    src={selectedArticle.image || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600"}
                    alt={selectedArticle.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  
                  <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                    <span className="px-2.5 py-0.5 bg-bronze text-[9px] font-mono tracking-wider uppercase rounded-full inline-block">
                      {selectedArticle.tag}
                    </span>
                    <h4 className="font-display font-bold text-xl sm:text-2xl leading-tight">
                      {selectedArticle.title}
                    </h4>
                  </div>
                </div>

                {/* Content body with scrollable frame */}
                <div className="p-6 sm:p-8 overflow-y-auto space-y-5 text-sm leading-relaxed text-muted max-h-[calc(90vh-14rem)]">
                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-muted/70 pb-3 border-b border-bronze/10">
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-bronze" /> {selectedArticle.date}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-bronze" /> Rural Empowerment Centers</span>
                  </div>

                  <p className="font-medium text-charcoal text-base">
                    {selectedArticle.summary}
                  </p>

                  <div className="whitespace-pre-line text-charcoal/80 space-y-3">
                    {selectedArticle.content || selectedArticle.summary}
                  </div>

                  {/* Closure signature */}
                  <div className="pt-6 border-t border-bronze/10 flex flex-col gap-1 items-start bg-cream/20 p-4 rounded-xl">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-bronze font-bold">Involved Foundation</span>
                    <span className="text-xs font-semibold text-charcoal font-display">Buddha Arivu Kalanjiyam Editorial Board</span>
                    <span className="text-[10px] text-muted">Empowering underserved societies through inclusive education pipelines.</span>
                  </div>
                </div>

                {/* Modal actions footer */}
                <div className="px-6 py-4 bg-cream/40 border-t border-bronze/10 flex justify-end">
                  <button
                    onClick={() => setSelectedArticle(null)}
                    className="px-5 py-2 bg-charcoal text-white hover:bg-charcoal/90 text-xs font-semibold rounded-full transition-colors"
                  >
                    Close Bulletin
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
