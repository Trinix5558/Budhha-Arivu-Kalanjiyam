import React, { useState } from 'react';
import { useAdmin } from '../lib/AdminContext';
import { Folder, Calendar, MapPin, Image as ImageIcon, ArrowLeft, X, ZoomIn, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

interface GalleryPhoto {
  url: string;
  caption: string;
}

interface GalleryFolder {
  id: string;
  name: string;
  date: string;
  location: string;
  description: string;
  coverImage: string;
  photos: GalleryPhoto[];
  category?: string;
}

const GALLERY_FOLDERS: GalleryFolder[] = [
  {
    id: "digital-labs",
    name: "Samyak Digital Learning Setup",
    date: "June 10, 2026",
    location: "Village Model School, Hosur",
    description: "Equipping rural classrooms with modern computer labs, solar-power backup nodes, and offline encyclopedias to bridge the digital divide.",
    coverImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=400",
    photos: [
      {
        url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800",
        caption: "Smart tablets and computer terminal distribution at Hosur center."
      },
      {
        url: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=800",
        caption: "Young girl scholars exploring collaborative learning applications."
      },
      {
        url: "https://images.unsplash.com/photo-1562774053-f5a02f6ef87a?auto=format&fit=crop&q=80&w=800",
        caption: "Interactive smartboard lesson demonstration conducted by volunteers."
      }
    ]
  },
  {
    id: "scholarships-ceremony",
    name: "Arivu Gold Scholarship Award",
    date: "May 28, 2026",
    location: "Auditorium, Bangalore Central",
    description: "Honoring bright and resilient girl scholars with full board scholarships covering tuition, clothing, books, and educational stipends.",
    coverImage: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=400",
    photos: [
      {
        url: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=800",
        caption: "Arivu scholars analyzing high-level geometry exercises."
      },
      {
        url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800",
        caption: "Commencement and credential ceremony for graduating high schoolers."
      },
      {
        url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800",
        caption: "Arivu Gold scholars celebration in rural Bangalore."
      }
    ]
  },
  {
    id: "teacher-bootcamp",
    name: "Guru-Sishya Pedagogy Bootcamp",
    date: "April 05, 2026",
    location: "Trust Headquarters, Bodhi Nagar",
    description: "Training rural educators in modern active learning techniques, mindfulness mentoring, and responsive curriculum designs.",
    coverImage: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=400",
    photos: [
      {
        url: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800",
        caption: "Interactive instructional module training for local public teachers."
      },
      {
        url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800",
        caption: "Peer collaborative critique seminar among regional school directors."
      },
      {
        url: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?auto=format&fit=crop&q=80&w=800",
        caption: "Syllabus mapping and emotional intelligence roundtables."
      }
    ]
  },
  {
    id: "drinking-water",
    name: "Karuna Drinking Water Project",
    date: "March 15, 2026",
    location: "Tribal Hamlet, Chamrajnagar",
    description: "Securing student health and community nutrition by commissioning solar-powered reverse osmosis filtration plants.",
    coverImage: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=400",
    photos: [
      {
        url: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800",
        caption: "Warm smiles at the inaugural health & nutrition evaluation."
      },
      {
        url: "https://images.unsplash.com/photo-1594608661623-aa0bd3a69d98?auto=format&fit=crop&q=80&w=800",
        caption: "Mobile community health consultation unit at Chamrajnagar."
      },
      {
        url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800",
        caption: "Outdoor education class and parental counseling on sanitary safety."
      }
    ]
  }
];

export default function Gallery() {
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [selectedTab, setSelectedTab] = useState<string>("All");

  let folders = GALLERY_FOLDERS;
  let galleryCategories: string[] = [];
  try {
    const admin = useAdmin();
    if (admin) {
      folders = admin.galleryFolders;
      galleryCategories = admin.galleryCategories || [];
    }
  } catch (e) {
    // Dynamic context fallback
  }

  const activeFolder = folders.find(f => f.id === selectedFolderId);

  const handleOpenFolder = (id: string) => {
    setSelectedFolderId(id);
    setLightboxIndex(null);
  };

  const handleCloseFolder = () => {
    setSelectedFolderId(null);
    setLightboxIndex(null);
  };

  const handleNextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeFolder && lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % activeFolder.photos.length);
    }
  };

  const handlePrevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeFolder && lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + activeFolder.photos.length) % activeFolder.photos.length);
    }
  };

  // Filter gallery albums based on selected tab / tag category
  const filteredFolders = selectedTab === "All"
    ? folders
    : folders.filter(f => f.category === selectedTab);

  return (
    <section id="gallery" className="py-24 bg-cream relative border-b border-bronze/5 scroll-mt-20">
      {/* Decorative ambient blurred nodes */}
      <div className="absolute left-10 top-20 w-[250px] h-[250px] bg-bronze/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute right-10 bottom-20 w-[200px] h-[200px] bg-emerald-500/5 rounded-full blur-[70px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Gallery Title Area */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-bronze flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>IMAGE CHRONICLES</span>
          </span>
          <h2 className="font-display font-medium text-3.5xl sm:text-4xl text-charcoal leading-tight">
            Trust Event <span className="text-bronze font-bold">Gallery</span>
          </h2>
          <p className="font-sans text-sm sm:text-base text-muted leading-relaxed">
            Witness the joy of learning, empowerment, and structural transformation across rural environments captured on-the-ground.
          </p>
        </div>

        {/* Dynamic Category Tabs Selector */}
        {!selectedFolderId && galleryCategories.length > 0 && (
          <div className="flex flex-wrap justify-center items-center gap-1.5 sm:gap-2.5 mb-12 select-none max-w-3xl mx-auto border-b pb-6 border-bronze/10">
            <button
              onClick={() => { setSelectedTab("All"); }}
              className={`px-4 py-1.5 rounded-full text-[11px] font-mono font-bold uppercase transition-all tracking-wider ${
                selectedTab === "All"
                  ? "bg-[#0E2138] text-white shadow-sm"
                  : "bg-white text-muted border border-bronze/10 hover:text-[#0E2138] hover:border-[#0E2138]"
              }`}
            >
              All Albums ({folders.length})
            </button>
            {galleryCategories.map((cat) => {
              const count = folders.filter(f => f.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => { setSelectedTab(cat); }}
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

        {/* Dynamic View switching based on Selected Folder */}
        {!selectedFolderId ? (
          /* ALBUMS FOLDER LIST VIEW */
          filteredFolders.length === 0 ? (
            <div className="text-center py-16 p-4 bg-cream/40 border rounded-2xl max-w-md mx-auto">
              <p className="font-mono text-xs text-muted">Currently, no active albums are registered inside the "{selectedTab}" tab category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredFolders.map((folder) => (
                <div
                  key={folder.id}
                  onClick={() => handleOpenFolder(folder.id)}
                  className="group cursor-pointer relative pt-4"
                >
                  {/* Physical Manila Folder Tab representation */}
                  <div className="absolute top-1.5 left-4 w-24 h-4 bg-cream-card rounded-t-lg border-t border-x border-bronze/20 z-0 transition-transform duration-300 group-hover:-translate-y-1" />
                  
                  {/* Main Folder Body Card */}
                  <div className="relative bg-cream-card rounded-2xl border border-bronze/15 p-5 shadow-[0_4px_20px_rgba(58,49,42,0.03)] group-hover:shadow-[0_12px_32px_rgba(194,142,83,0.08)] group-hover:border-bronze/35 transition-all duration-300 transform group-hover:-translate-y-0.5 z-10">
                    
                    {/* Miniature Image Frame behind the folder front */}
                    <div className="relative rounded-xl overflow-hidden aspect-[16/10] mb-4 bg-cream-dark border border-bronze/10">
                      <img
                        src={folder.coverImage}
                        alt={folder.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      
                      {/* Folder Count Tag overlay */}
                      <div className="absolute top-2.5 right-2.5 px-2 py-1 rounded bg-charcoal/80 backdrop-blur-sm text-white font-mono text-[10px] font-bold flex items-center gap-1 z-20">
                        <ImageIcon className="w-3 h-3 text-bronze" />
                        <span>{folder.photos.length} PH</span>
                      </div>

                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 to-transparent" />
                    </div>

                    {/* Text details */}
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-1.5 items-center select-none">
                        <span className="text-[10px] font-bold font-mono text-bronze uppercase bg-bronze/5 px-2 py-0.5 rounded-full inline-block">
                          {folder.date}
                        </span>
                        {folder.category && (
                          <span className="text-[8px] font-mono font-bold uppercase tracking-wider bg-[#0E2138]/5 text-[#0E2138] border border-[#0E2138]/10 px-1.5 py-0.5 rounded-full inline-block">
                            {folder.category}
                          </span>
                        )}
                      </div>
                      <h3 className="font-display font-semibold text-charcoal text-base group-hover:text-bronze transition-colors line-clamp-1">
                        {folder.name}
                      </h3>

                      {/* Meta location */}
                      <p className="font-sans text-xs text-muted flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-bronze shrink-0" />
                        <span className="truncate">{folder.location}</span>
                      </p>
                    </div>

                    {/* Animated Folder Status Icon in right corner */}
                    <div className="mt-4 pt-3 border-t border-bronze/10 flex items-center justify-between text-xs font-mono font-bold text-bronze group-hover:text-bronze-dark">
                      <span>Open Album</span>
                      <Folder className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          /* ALBUM IMAGES DETAIL VIEW */
          <div className="animate-fade-in space-y-8">
            
            {/* Back to Albums Bar */}
            <div className="flex items-center justify-between flex-wrap gap-4 border-b border-bronze/10 pb-6">
              <button
                onClick={handleCloseFolder}
                className="px-5 py-2.5 rounded-full bg-white border border-bronze/20 text-bronze hover:bg-bronze/5 text-xs font-bold font-mono uppercase tracking-wider transition-colors flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Albums</span>
              </button>

              <div className="flex items-center gap-3 text-xs font-mono text-muted">
                <MapPin className="w-4 h-4 text-bronze" />
                <span>{activeFolder?.location}</span>
                <span>•</span>
                <Calendar className="w-4 h-4 text-bronze" />
                <span>{activeFolder?.date}</span>
              </div>
            </div>

            {/* Folder Header Metadata */}
            <div className="space-y-3">
              <h3 className="font-display font-medium text-2.5xl text-charcoal">
                {activeFolder?.name}
              </h3>
              <p className="font-sans text-sm text-muted leading-relaxed max-w-3xl">
                {activeFolder?.description}
              </p>
            </div>

            {/* Custom Interactive Photo Mosaic Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              {activeFolder?.photos.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => setLightboxIndex(idx)}
                  className="group cursor-zoom-in relative rounded-2xl overflow-hidden aspect-[4/3] bg-cream-dark border border-bronze/10 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  <img
                    src={item.url}
                    alt={item.caption}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Interactive zoom search highlight */}
                  <div className="absolute inset-0 bg-charcoal/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                    <div className="bg-white/95 backdrop-blur-sm p-3.5 rounded-xl border border-white transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300 space-y-1">
                      <div className="flex justify-between items-center gap-2">
                        <span className="font-mono text-[10px] font-bold text-bronze">PHOTO {idx + 1} OF {activeFolder.photos.length}</span>
                        <ZoomIn className="w-4 h-4 text-bronze" />
                      </div>
                      <p className="font-sans text-xs text-charcoal font-semibold leading-relaxed line-clamp-2">
                        {item.caption}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

      </div>

      {/* FULL SCREEN LIGHTBOX MODAL TRIGGERED ON PHOTO ZOOM */}
      {lightboxIndex !== null && activeFolder && (
        <div
          id="gallery-lightbox-overlay"
          className="fixed inset-0 z-50 bg-charcoal/95 backdrop-blur-md flex flex-col justify-between p-6 animate-fade-in"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between text-white/80">
            <div className="space-y-0.5">
              <h4 className="font-display font-medium text-sm leading-none text-white">
                {activeFolder.name}
              </h4>
              <span className="font-mono text-[10px] text-white/50">{activeFolder.location}</span>
            </div>

            <button
              onClick={() => setLightboxIndex(null)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 hover:text-white transition-colors"
              title="Close image lookup"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main Core Carousel Display */}
          <div className="relative flex-1 flex items-center justify-center max-w-5xl mx-auto w-full my-4">
            
            {/* Custom Carousel Navigation Controls */}
            <button
              onClick={handlePrevPhoto}
              className="absolute left-0 p-3 rounded-full bg-white/5 hover:bg-white/15 text-white/80 hover:text-white transition-colors z-20"
              title="Previous Photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Main high resolution zoom-in picture element */}
            <div
              className="relative max-h-[70vh] rounded-xl overflow-hidden shadow-2xl bg-black border border-white/5"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={activeFolder.photos[lightboxIndex].url}
                alt={activeFolder.photos[lightboxIndex].caption}
                className="max-w-full max-h-[70vh] object-contain mx-auto"
                referrerPolicy="no-referrer"
              />
            </div>

            <button
              onClick={handleNextPhoto}
              className="absolute right-0 p-3 rounded-full bg-white/5 hover:bg-white/15 text-white/80 hover:text-white transition-colors z-20"
              title="Next Photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Footer Bar Caption Info */}
          <div className="text-center space-y-2 max-w-xl mx-auto pb-4" onClick={(e) => e.stopPropagation()}>
            <p className="font-sans text-sm text-white/90 leading-relaxed font-semibold">
              {activeFolder.photos[lightboxIndex].caption}
            </p>
            <div className="px-3.5 py-1 rounded-full bg-white/10 text-white/70 font-mono text-[10px] inline-block font-bold">
              PHOTO {lightboxIndex + 1} OF {activeFolder.photos.length}
            </div>
          </div>

        </div>
      )}
    </section>
  );
}
