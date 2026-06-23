import React, { useState } from 'react';
import * as LucideIcons from 'lucide-react';
import { useAdmin } from '../lib/AdminContext';
import { BookOpen, Sparkles, Plus, Minus } from 'lucide-react';

export default function AboutUs() {
  const [showStoryDetail, setShowStoryDetail] = useState(false);

  // Defaults
  let imgUrl = "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=850";
  let caption = '"Wisdom dispels darkness."';
  let headline = "Rooted in Wisdom. \nDriven by Purpose.";
  let paragraph1 = "The Buddha Arivu Kalanjiyam was founded with an unshakeable vision to make quality education and character-building accessible to every student, irrespective of socioeconomic backgrounds.";
  let paragraph2 = "We work across urban and remote rural regions, establishing digitized centers of excellence, funding scholarships, and training visionary educators who inspire a new generation with values of compassion, integrity, and mindfulness.";
  let storyTitle = "The Genesis: Malarselvi Foundation & Buddha Trust";
  let storyContent = "Initiated by the Dr. Malarselvi Foundation, our roadmap started as an evening tutoring support group. Today, we collaborate directly with government institutions to design curriculums that foster intellectual agility and spiritual compassion (Arivu & Karuna).";
  let storyTags = "🎓 Global Curriculums, 🍃 Sustainable Classrooms";
  let statsList = [
    {
      id: "service-years",
      value: "25+",
      label: "Years of Service",
      iconName: "Award"
    },
    {
      id: "schools-centers",
      value: "150+",
      label: "Schools & Centers",
      iconName: "Building2"
    },
    {
      id: "students-empowered",
      value: "50K+",
      label: "Students Empowered",
      iconName: "GraduationCap"
    }
  ];

  try {
    const admin = useAdmin();
    if (admin) {
      imgUrl = admin.aboutImage;
      caption = admin.aboutCaption;
      headline = admin.aboutHeadline;
      paragraph1 = admin.aboutParagraph1;
      paragraph2 = admin.aboutParagraph2;
      storyTitle = admin.aboutStoryTitle;
      storyContent = admin.aboutStoryContent;
      storyTags = admin.aboutStoryTags;
      statsList = admin.statistics;
    }
  } catch (e) {
    // safe fallback
  }

  return (
    <section id="about" className="py-24 bg-cream relative overflow-hidden">
      {/* Decorative floral watermark on background */}
      <div className="absolute right-0 bottom-10 w-[300px] h-[300px] bg-bronze/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Left Column (6 of 12 cols): Large Rounded Student Photo */}
        <div id="about-photo-col" className="lg:col-span-6 relative group">
          {/* Decorative Backing Frame */}
          <div className="absolute -inset-3 rounded-2xl border-2 border-dashed border-bronze/25 transform rotate-2 group-hover:rotate-1 transition-all duration-300" />
          
          <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3] bg-cream-dark">
            <img
              src={imgUrl}
              alt="Indian child writing in notebook in school classroom"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            
            {/* Elegant overlay card with a statistics floating caption */}
            <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-4 rounded-xl border border-white max-w-xs shadow-md">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-bronze/10 text-bronze">
                  <BookOpen className="w-5 h-5 text-bronze" />
                </div>
                <div>
                  <span className="block text-xs font-mono uppercase tracking-widest text-bronze font-bold">Inspiration</span>
                  <span className="text-sm font-semibold text-charcoal">{caption}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (6 of 12 cols): Story + Statistics Stack */}
        <div id="about-content-col" className="lg:col-span-6 space-y-8">
          
          <div className="space-y-4">
            {/* Kicker tag */}
            <span className="block text-xs font-mono uppercase tracking-widest text-bronze font-semibold">
              ABOUT US
            </span>
            
            {/* Heading */}
            <h2 className="font-display font-medium text-3xl sm:text-4xl text-charcoal leading-tight whitespace-pre-line">
              {headline}
            </h2>
          </div>

          <div className="space-y-4 text-muted text-base leading-relaxed">
            <p className="whitespace-pre-line">
              {paragraph1}
            </p>
            {paragraph2 && (
              <p className="hidden sm:block whitespace-pre-line">
                {paragraph2}
              </p>
            )}
            
            {/* Know Our Story Expandable Box */}
            {showStoryDetail && (
              <div className="p-5 rounded-2xl bg-cream-dark/40 border border-bronze/10 animate-fade-in text-sm space-y-3">
                <h4 className="font-display font-bold text-charcoal">{storyTitle}</h4>
                <p className="whitespace-pre-line text-muted leading-relaxed">
                  {storyContent}
                </p>
                {storyTags && (
                  <div className="flex flex-wrap gap-2 text-xs font-bold font-mono text-bronze mt-2">
                    {storyTags.split(',').map((tag, i) => (
                      <span key={i}>{tag.trim()}</span>
                    ))}
                  </div>
                )}
              </div>
            )}

            <button
              onClick={() => setShowStoryDetail(!showStoryDetail)}
              className="px-6 py-2.5 rounded-full bg-bronze text-white text-xs font-semibold hover:bg-bronze-dark transition-all flex items-center gap-1.5 shadow-sm"
            >
              <span>{showStoryDetail ? "Show Less" : "Know Our Story"}</span>
              {showStoryDetail ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Stats stack */}
          <div className="pt-6 border-t border-bronze/10 border-solid space-y-4 md:space-y-0 md:flex md:items-center md:justify-between md:gap-4">
            {statsList.map((stat) => {
              const StatIcon = (LucideIcons as any)[stat.iconName] || LucideIcons.Smile;
              return (
                <div key={stat.id} className="flex items-center gap-4 py-2 group">
                  <div className="w-12 h-12 rounded-xl bg-bronze/5 flex items-center justify-center text-bronze group-hover:bg-bronze group-hover:text-white transition-all duration-300">
                    <StatIcon className="w-5 h-5 stroke-[1.5]" />
                  </div>
                  <div>
                    <span className="block text-2xl sm:text-3xl font-display font-bold text-bronze leading-none">
                      {stat.value}
                    </span>
                    <span className="text-xs text-muted font-bold font-sans tracking-wide uppercase">
                      {stat.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
