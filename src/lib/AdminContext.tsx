import React, { createContext, useContext, useState, useEffect } from 'react';
import { FounderInfo, InitiativeItem, NewsItem, ValuePillar, StatItem } from '../types';

// Import default state configs
import { FOUNDER_INFO, INITIATIVES, VALUE_PILLARS, STATISTICS } from '../data/websiteData';

export interface GalleryPhoto {
  url: string;
  caption: string;
}

export interface GalleryFolder {
  id: string;
  name: string;
  date: string;
  location: string;
  description: string;
  coverImage: string;
  photos: GalleryPhoto[];
  category?: string;
}

export const DEFAULT_GALLERY_FOLDERS: GalleryFolder[] = [
  {
    id: "digital-labs",
    name: "Samyak Digital Learning Setup",
    date: "June 10, 2026",
    location: "Village Model School, Hosur",
    description: "Equipping rural classrooms with modern computer labs, solar-power backup nodes, and offline encyclopedias to bridge the digital divide.",
    coverImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=400",
    category: "Technology",
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
    category: "Sponsorships",
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
    category: "Training",
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
    category: "Outreach",
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

export const DEFAULT_NEWS_LIST: NewsItem[] = [
  {
    id: "news-1",
    date: "June 10, 2026",
    tag: "Education Campaign",
    title: "Launch of Digital Classrooms Initiative",
    summary: "Introducing 25 new digital school labs in remote villages to accelerate computer literacy.",
    content: "We are thrilled to officially inaugurate the Digital Classrooms Initiative across rural educational spaces managed by Buddha Arivu Kalanjiyam. By introducing twenty-five state-of-the-art interactive smart boards and digital learning terminals, we are removing technical barriers for rural youth.\n\nOver 2,500 children who previously lacked basic desktop access will now learn Python coding fundamentals, web design, and digital artwork. Certified computer mentors will guide students through weekly curriculums curated under standard industrial criteria.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "news-2",
    date: "May 28, 2026",
    tag: "Achievement",
    title: "Arivu Gold Scholarship Award Ceremony",
    summary: "Recognized 120 outstanding students with our highest educational honors and stipends.",
    content: "Our annual Arivu Gold Scholarship awards marked this semester with inspiring stories of resilience. A total of 120 students representing different underprivileged districts were awarded full sponsorships covers covering boarding and tuition costs for undergraduate studies.\n\nThanks to our generous global community of sponsors and trust foundations, these young scholars can now step forward confidently towards medical, engineering, and digital art degrees without bearing financial burdens.",
    image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "news-3",
    date: "April 15, 2026",
    tag: "Community",
    title: "Uplifting Underprivileged Centers in Rural Belts",
    summary: "Reconstructed facilities and playground infrastructure for over fifteen primary educational centers.",
    content: "Sustainable construction and structural safety are vital to child learning. This spring, our on-the-ground volunteer forces and building staff successfully refurbished and modernized fifteen preschool playrooms and elementary study halls.\n\nThese upgrades include rainwater harvesting infrastructure, secure roof tiling, solar electric power installations, and child-safe playground equipment to ensure a healthy and nurturing environment.",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=600"
  }
];

interface AdminContextType {
  logoUrl: string;
  buddhaUrl: string;
  founderInfo: FounderInfo;
  initiatives: InitiativeItem[];
  galleryFolders: GalleryFolder[];
  initiativeCategories: string[];
  galleryCategories: string[];
  isAuthenticated: boolean;
  isAdminOpen: boolean;

  // New Content Fields
  heroTagline: string;
  heroHeadline: string;
  heroDescription: string;
  heroQuote: string;
  heroQuoteAuthor: string;

  aboutImage: string;
  aboutCaption: string;
  aboutHeadline: string;
  aboutParagraph1: string;
  aboutParagraph2: string;
  aboutStoryTitle: string;
  aboutStoryContent: string;
  aboutStoryTags: string;

  newsList: NewsItem[];

  contactAddress: string;
  contactPhone: string;
  contactEmail: string;
  contactHours: string;
  contactRegNo: string;
  contactLatitude: string;
  contactLongitude: string;

  valuePillars: ValuePillar[];
  statistics: StatItem[];

  setIsAdminOpen: (open: boolean) => void;
  setIsAuthenticated: (val: boolean) => void;
  updateLogoUrl: (url: string) => void;
  updateBuddhaUrl: (url: string) => void;
  updateFounderInfo: (info: FounderInfo) => void;
  updateInitiatives: (items: InitiativeItem[]) => void;
  updateGalleryFolders: (folders: GalleryFolder[]) => void;
  updateInitiativeCategories: (cats: string[]) => void;
  updateGalleryCategories: (cats: string[]) => void;

  // New Update Setters
  updateHeroContent: (content: { heroTagline?: string; heroHeadline?: string; heroDescription?: string; heroQuote?: string; heroQuoteAuthor?: string }) => void;
  updateAboutContent: (content: { aboutImage?: string; aboutCaption?: string; aboutHeadline?: string; aboutParagraph1?: string; aboutParagraph2?: string; aboutStoryTitle?: string; aboutStoryContent?: string; aboutStoryTags?: string }) => void;
  updateNewsList: (list: NewsItem[]) => void;
  updateContactDetails: (details: { contactAddress?: string; contactPhone?: string; contactEmail?: string; contactHours?: string; contactRegNo?: string; contactLatitude?: string; contactLongitude?: string }) => void;
  updateValuePillars: (list: ValuePillar[]) => void;
  updateStatistics: (list: StatItem[]) => void;

  resetToDefaults: () => void;
  importConfigJSON: (jsonString: string) => boolean;
  exportConfigJSON: () => string;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [logoUrl, setLogoUrl] = useState("https://i.ibb.co/Q3X4mZHG/Asset-2-2x.png");
  const [buddhaUrl, setBuddhaUrl] = useState("https://i.ibb.co/WW8ZLdGx/Untitled-design-1.png");
  const [founderInfo, setFounderInfo] = useState<FounderInfo>(FOUNDER_INFO);
  const [initiatives, setInitiatives] = useState<InitiativeItem[]>([]);
  const [galleryFolders, setGalleryFolders] = useState<GalleryFolder[]>(DEFAULT_GALLERY_FOLDERS);
  const [initiativeCategories, setInitiativeCategories] = useState<string[]>(["Sponsorships", "Training", "Technology", "Outreach"]);
  const [galleryCategories, setGalleryCategories] = useState<string[]>(["Technology", "Sponsorships", "Training", "Outreach"]);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // New Content States
  const [heroTagline, setHeroTagline] = useState("Enlightening Minds. Empowering Lives.");
  const [heroHeadline, setHeroHeadline] = useState("EDUCATION\nFOR ALL");
  const [heroDescription, setHeroDescription] = useState("Buddha Arivu Kalanjiyam is committed to nurturing knowledge, compassion, and character through quality education for all.");
  const [heroQuote, setHeroQuote] = useState("He who has conquered himself is greater than he who has won a thousand battles.");
  const [heroQuoteAuthor, setHeroQuoteAuthor] = useState("Buddha");

  const [aboutImage, setAboutImage] = useState("https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=850");
  const [aboutCaption, setAboutCaption] = useState('"Wisdom dispels darkness."');
  const [aboutHeadline, setAboutHeadline] = useState("Rooted in Wisdom. \nDriven by Purpose.");
  const [aboutParagraph1, setAboutParagraph1] = useState("The Buddha Arivu Kalanjiyam was founded with an unshakeable vision to make quality education and character-building accessible to every student, irrespective of socioeconomic backgrounds.");
  const [aboutParagraph2, setAboutParagraph2] = useState("We work across urban and remote rural regions, establishing digitized centers of excellence, funding scholarships, and training visionary educators who inspire a new generation with values of compassion, integrity, and mindfulness.");
  const [aboutStoryTitle, setAboutStoryTitle] = useState("The Genesis: Malarselvi Foundation & Buddha Trust");
  const [aboutStoryContent, setAboutStoryContent] = useState("Initiated by the Dr. Malarselvi Foundation, our roadmap started as an evening tutoring support group. Today, we collaborate directly with government institutions to design curriculums that foster intellectual agility and spiritual compassion (Arivu & Karuna).");
  const [aboutStoryTags, setAboutStoryTags] = useState("🎓 Global Curriculums, 🍃 Sustainable Classrooms");

  const [newsList, setNewsList] = useState<NewsItem[]>(DEFAULT_NEWS_LIST);

  const [contactAddress, setContactAddress] = useState("Archana Castle, Ramapuram Road, Parangi Malai, St.Thomas Mount, Chennai, Tamil Nadu 600016");
  const [contactPhone, setContactPhone] = useState("+91 98765 43210");
  const [contactEmail, setContactEmail] = useState("info@buddhaarivukalanjiyam.org");
  const [contactHours, setContactHours] = useState("Mon – Sat: 09:00 AM – 06:00 PM (IST)");
  const [contactRegNo, setContactRegNo] = useState("Reg No. 412/IV/2022-DL");
  const [contactLatitude, setContactLatitude] = useState("13.0042");
  const [contactLongitude, setContactLongitude] = useState("80.1948");

  const [valuePillars, setValuePillars] = useState<ValuePillar[]>(VALUE_PILLARS);
  const [statistics, setStatistics] = useState<StatItem[]>(STATISTICS);

  // Load from server and localStorage on mount
  useEffect(() => {
    const loadConfig = async () => {
      try {
        const response = await fetch("/api/config");
        if (response.ok) {
          const config = await response.json();
          if (config && Object.keys(config).length > 0) {
            // Apply all config fields from server
            if (config.logoUrl) setLogoUrl(config.logoUrl);
            if (config.buddhaUrl) setBuddhaUrl(config.buddhaUrl);
            if (config.founderInfo) setFounderInfo(config.founderInfo);
            if (config.initiatives) setInitiatives(config.initiatives);
            if (config.galleryFolders) setGalleryFolders(config.galleryFolders);
            if (config.initiativeCategories) setInitiativeCategories(config.initiativeCategories);
            if (config.galleryCategories) setGalleryCategories(config.galleryCategories);
            
            if (config.heroTagline) setHeroTagline(config.heroTagline);
            if (config.heroHeadline) setHeroHeadline(config.heroHeadline);
            if (config.heroDescription) setHeroDescription(config.heroDescription);
            if (config.heroQuote) setHeroQuote(config.heroQuote);
            if (config.heroQuoteAuthor) setHeroQuoteAuthor(config.heroQuoteAuthor);

            if (config.aboutImage) setAboutImage(config.aboutImage);
            if (config.aboutCaption) setAboutCaption(config.aboutCaption);
            if (config.aboutHeadline) setAboutHeadline(config.aboutHeadline);
            if (config.aboutParagraph1) setAboutParagraph1(config.aboutParagraph1);
            if (config.aboutParagraph2) setAboutParagraph2(config.aboutParagraph2);
            if (config.aboutStoryTitle) setAboutStoryTitle(config.aboutStoryTitle);
            if (config.aboutStoryContent) setAboutStoryContent(config.aboutStoryContent);
            if (config.aboutStoryTags) setAboutStoryTags(config.aboutStoryTags);

            if (config.newsList) setNewsList(config.newsList);

            if (config.contactAddress) setContactAddress(config.contactAddress);
            if (config.contactPhone) setContactPhone(config.contactPhone);
            if (config.contactEmail) setContactEmail(config.contactEmail);
            if (config.contactHours) setContactHours(config.contactHours);
            if (config.contactRegNo) setContactRegNo(config.contactRegNo);
            if (config.contactLatitude) setContactLatitude(config.contactLatitude);
            if (config.contactLongitude) setContactLongitude(config.contactLongitude);

            if (config.valuePillars) setValuePillars(config.valuePillars);
            if (config.statistics) setStatistics(config.statistics);
            
            // Also sync to localStorage just in case
            Object.keys(config).forEach(key => {
              const val = config[key];
              if (typeof val === 'string') {
                localStorage.setItem(`buddha_${key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)}`, val);
              } else {
                localStorage.setItem(`buddha_${key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)}`, JSON.stringify(val));
              }
            });
            return;
          }
        }
      } catch (err) {
        console.error("Failed to load configuration from server, falling back to localStorage", err);
      }

      // Fallback to localStorage if server loading failed or returned empty
      try {
        const savedLogo = localStorage.getItem("buddha_logo_url");
        if (savedLogo) setLogoUrl(savedLogo);

        const savedBuddha = localStorage.getItem("buddha_hero_url");
        if (savedBuddha) setBuddhaUrl(savedBuddha);

        const savedFounder = localStorage.getItem("buddha_founder_info");
        if (savedFounder) setFounderInfo(JSON.parse(savedFounder));

        const savedInitiatives = localStorage.getItem("buddha_initiatives");
        if (savedInitiatives) {
          setInitiatives(JSON.parse(savedInitiatives));
        } else {
          const list = [...INITIATIVES];
          if (list[0]) list[0].category = "Sponsorships";
          if (list[1]) list[1].category = "Training";
          if (list[2]) list[2].category = "Technology";
          if (list[3]) list[3].category = "Outreach";
          setInitiatives(list);
        }

        const savedGallery = localStorage.getItem("buddha_gallery_folders");
        if (savedGallery) setGalleryFolders(JSON.parse(savedGallery));

        const savedInitiativeCats = localStorage.getItem("buddha_initiative_categories");
        if (savedInitiativeCats) setInitiativeCategories(JSON.parse(savedInitiativeCats));

        const savedGalleryCats = localStorage.getItem("buddha_gallery_categories");
        if (savedGalleryCats) setGalleryCategories(JSON.parse(savedGalleryCats));

        // Load new content fields
        const savedHero = localStorage.getItem("buddha_hero_content");
        if (savedHero) {
          const parsed = JSON.parse(savedHero);
          if (parsed.heroTagline) setHeroTagline(parsed.heroTagline);
          if (parsed.heroHeadline) setHeroHeadline(parsed.heroHeadline);
          if (parsed.heroDescription) setHeroDescription(parsed.heroDescription);
          if (parsed.heroQuote) setHeroQuote(parsed.heroQuote);
          if (parsed.heroQuoteAuthor) setHeroQuoteAuthor(parsed.heroQuoteAuthor);
        }

        const savedAbout = localStorage.getItem("buddha_about_content");
        if (savedAbout) {
          const parsed = JSON.parse(savedAbout);
          if (parsed.aboutImage) setAboutImage(parsed.aboutImage);
          if (parsed.aboutCaption) setAboutCaption(parsed.aboutCaption);
          if (parsed.aboutHeadline) setAboutHeadline(parsed.aboutHeadline);
          if (parsed.aboutParagraph1) setAboutParagraph1(parsed.aboutParagraph1);
          if (parsed.aboutParagraph2) setAboutParagraph2(parsed.aboutParagraph2);
          if (parsed.aboutStoryTitle) setAboutStoryTitle(parsed.aboutStoryTitle);
          if (parsed.aboutStoryContent) setAboutStoryContent(parsed.aboutStoryContent);
          if (parsed.aboutStoryTags) setAboutStoryTags(parsed.aboutStoryTags);
        }

        const savedNews = localStorage.getItem("buddha_news_list");
        if (savedNews) setNewsList(JSON.parse(savedNews));

        const savedContact = localStorage.getItem("buddha_contact_details");
        if (savedContact) {
          const parsed = JSON.parse(savedContact);
          if (parsed.contactLatitude === "12.9716" || parsed.contactLatitude === "11.09633" || parsed.contactAddress?.includes("123 Peace Avenue") || parsed.contactAddress?.includes("Arupathy village")) {
            parsed.contactLatitude = "13.0042";
            parsed.contactLongitude = "80.1948";
            parsed.contactAddress = "Archana Castle, Ramapuram Road, Parangi Malai, St.Thomas Mount, Chennai, Tamil Nadu 600016";
            localStorage.setItem("buddha_contact_details", JSON.stringify(parsed));
          }
          if (parsed.contactAddress) setContactAddress(parsed.contactAddress);
          if (parsed.contactPhone) setContactPhone(parsed.contactPhone);
          if (parsed.contactEmail) setContactEmail(parsed.contactEmail);
          if (parsed.contactHours) setContactHours(parsed.contactHours);
          if (parsed.contactRegNo) setContactRegNo(parsed.contactRegNo);
          if (parsed.contactLatitude) setContactLatitude(parsed.contactLatitude);
          if (parsed.contactLongitude) setContactLongitude(parsed.contactLongitude);
        }

        const savedPillars = localStorage.getItem("buddha_value_pillars");
        if (savedPillars) setValuePillars(JSON.parse(savedPillars));

        const savedStats = localStorage.getItem("buddha_statistics");
        if (savedStats) setStatistics(JSON.parse(savedStats));

      } catch (e) {
        console.error("Failed loading admin assets from localStorage:", e);
      }
    };

    loadConfig();

    const savedAuth = sessionStorage.getItem("buddha_is_authenticated");
    if (savedAuth === "true") setIsAuthenticated(true);
  }, []);

  const saveConfigToServer = async (updates: any) => {
    try {
      const currentConfig = {
        logoUrl: updates.logoUrl !== undefined ? updates.logoUrl : logoUrl,
        buddhaUrl: updates.buddhaUrl !== undefined ? updates.buddhaUrl : buddhaUrl,
        founderInfo: updates.founderInfo !== undefined ? updates.founderInfo : founderInfo,
        initiatives: updates.initiatives !== undefined ? updates.initiatives : initiatives,
        galleryFolders: updates.galleryFolders !== undefined ? updates.galleryFolders : galleryFolders,
        initiativeCategories: updates.initiativeCategories !== undefined ? updates.initiativeCategories : initiativeCategories,
        galleryCategories: updates.galleryCategories !== undefined ? updates.galleryCategories : galleryCategories,
        
        heroTagline: updates.heroTagline !== undefined ? updates.heroTagline : heroTagline,
        heroHeadline: updates.heroHeadline !== undefined ? updates.heroHeadline : heroHeadline,
        heroDescription: updates.heroDescription !== undefined ? updates.heroDescription : heroDescription,
        heroQuote: updates.heroQuote !== undefined ? updates.heroQuote : heroQuote,
        heroQuoteAuthor: updates.heroQuoteAuthor !== undefined ? updates.heroQuoteAuthor : heroQuoteAuthor,

        aboutImage: updates.aboutImage !== undefined ? updates.aboutImage : aboutImage,
        aboutCaption: updates.aboutCaption !== undefined ? updates.aboutCaption : aboutCaption,
        aboutHeadline: updates.aboutHeadline !== undefined ? updates.aboutHeadline : aboutHeadline,
        aboutParagraph1: updates.aboutParagraph1 !== undefined ? updates.aboutParagraph1 : aboutParagraph1,
        aboutParagraph2: updates.aboutParagraph2 !== undefined ? updates.aboutParagraph2 : aboutParagraph2,
        aboutStoryTitle: updates.aboutStoryTitle !== undefined ? updates.aboutStoryTitle : aboutStoryTitle,
        aboutStoryContent: updates.aboutStoryContent !== undefined ? updates.aboutStoryContent : aboutStoryContent,
        aboutStoryTags: updates.aboutStoryTags !== undefined ? updates.aboutStoryTags : aboutStoryTags,

        newsList: updates.newsList !== undefined ? updates.newsList : newsList,

        contactAddress: updates.contactAddress !== undefined ? updates.contactAddress : contactAddress,
        contactPhone: updates.contactPhone !== undefined ? updates.contactPhone : contactPhone,
        contactEmail: updates.contactEmail !== undefined ? updates.contactEmail : contactEmail,
        contactHours: updates.contactHours !== undefined ? updates.contactHours : contactHours,
        contactRegNo: updates.contactRegNo !== undefined ? updates.contactRegNo : contactRegNo,
        contactLatitude: updates.contactLatitude !== undefined ? updates.contactLatitude : contactLatitude,
        contactLongitude: updates.contactLongitude !== undefined ? updates.contactLongitude : contactLongitude,

        valuePillars: updates.valuePillars !== undefined ? updates.valuePillars : valuePillars,
        statistics: updates.statistics !== undefined ? updates.statistics : statistics,
      };

      await fetch("/api/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentConfig),
      });
    } catch (e) {
      console.error("Failed to save configuration to server:", e);
    }
  };

  const updateLogoUrl = (url: string) => {
    setLogoUrl(url);
    localStorage.setItem("buddha_logo_url", url);
    saveConfigToServer({ logoUrl: url });
  };

  const updateBuddhaUrl = (url: string) => {
    setBuddhaUrl(url);
    localStorage.setItem("buddha_hero_url", url);
    saveConfigToServer({ buddhaUrl: url });
  };

  const updateFounderInfo = (info: FounderInfo) => {
    setFounderInfo(info);
    localStorage.setItem("buddha_founder_info", JSON.stringify(info));
    saveConfigToServer({ founderInfo: info });
  };

  const updateInitiatives = (items: InitiativeItem[]) => {
    setInitiatives(items);
    localStorage.setItem("buddha_initiatives", JSON.stringify(items));
    saveConfigToServer({ initiatives: items });
  };

  const updateGalleryFolders = (folders: GalleryFolder[]) => {
    setGalleryFolders(folders);
    localStorage.setItem("buddha_gallery_folders", JSON.stringify(folders));
    saveConfigToServer({ galleryFolders: folders });
  };

  const updateInitiativeCategories = (cats: string[]) => {
    setInitiativeCategories(cats);
    localStorage.setItem("buddha_initiative_categories", JSON.stringify(cats));
    saveConfigToServer({ initiativeCategories: cats });
  };

  const updateGalleryCategories = (cats: string[]) => {
    setGalleryCategories(cats);
    localStorage.setItem("buddha_gallery_categories", JSON.stringify(cats));
    saveConfigToServer({ galleryCategories: cats });
  };

  // Updaters for new fields
  const updateHeroContent = (content: { heroTagline?: string; heroHeadline?: string; heroDescription?: string; heroQuote?: string; heroQuoteAuthor?: string }) => {
    const updated = {
      heroTagline: content.heroTagline ?? heroTagline,
      heroHeadline: content.heroHeadline ?? heroHeadline,
      heroDescription: content.heroDescription ?? heroDescription,
      heroQuote: content.heroQuote ?? heroQuote,
      heroQuoteAuthor: content.heroQuoteAuthor ?? heroQuoteAuthor,
    };
    setHeroTagline(updated.heroTagline);
    setHeroHeadline(updated.heroHeadline);
    setHeroDescription(updated.heroDescription);
    setHeroQuote(updated.heroQuote);
    setHeroQuoteAuthor(updated.heroQuoteAuthor);
    localStorage.setItem("buddha_hero_content", JSON.stringify(updated));
    saveConfigToServer(updated);
  };

  const updateAboutContent = (content: { aboutImage?: string; aboutCaption?: string; aboutHeadline?: string; aboutParagraph1?: string; aboutParagraph2?: string; aboutStoryTitle?: string; aboutStoryContent?: string; aboutStoryTags?: string }) => {
    const updated = {
      aboutImage: content.aboutImage ?? aboutImage,
      aboutCaption: content.aboutCaption ?? aboutCaption,
      aboutHeadline: content.aboutHeadline ?? aboutHeadline,
      aboutParagraph1: content.aboutParagraph1 ?? aboutParagraph1,
      aboutParagraph2: content.aboutParagraph2 ?? aboutParagraph2,
      aboutStoryTitle: content.aboutStoryTitle ?? aboutStoryTitle,
      aboutStoryContent: content.aboutStoryContent ?? aboutStoryContent,
      aboutStoryTags: content.aboutStoryTags ?? aboutStoryTags,
    };
    setAboutImage(updated.aboutImage);
    setAboutCaption(updated.aboutCaption);
    setAboutHeadline(updated.aboutHeadline);
    setAboutParagraph1(updated.aboutParagraph1);
    setAboutParagraph2(updated.aboutParagraph2);
    setAboutStoryTitle(updated.aboutStoryTitle);
    setAboutStoryContent(updated.aboutStoryContent);
    setAboutStoryTags(updated.aboutStoryTags);
    localStorage.setItem("buddha_about_content", JSON.stringify(updated));
    saveConfigToServer(updated);
  };

  const updateNewsList = (list: NewsItem[]) => {
    setNewsList(list);
    localStorage.setItem("buddha_news_list", JSON.stringify(list));
    saveConfigToServer({ newsList: list });
  };

  const updateContactDetails = (details: { contactAddress?: string; contactPhone?: string; contactEmail?: string; contactHours?: string; contactRegNo?: string; contactLatitude?: string; contactLongitude?: string }) => {
    const updated = {
      contactAddress: details.contactAddress ?? contactAddress,
      contactPhone: details.contactPhone ?? contactPhone,
      contactEmail: details.contactEmail ?? contactEmail,
      contactHours: details.contactHours ?? contactHours,
      contactRegNo: details.contactRegNo ?? contactRegNo,
      contactLatitude: details.contactLatitude ?? contactLatitude,
      contactLongitude: details.contactLongitude ?? contactLongitude,
    };
    setContactAddress(updated.contactAddress);
    setContactPhone(updated.contactPhone);
    setContactEmail(updated.contactEmail);
    setContactHours(updated.contactHours);
    setContactRegNo(updated.contactRegNo);
    setContactLatitude(updated.contactLatitude);
    setContactLongitude(updated.contactLongitude);
    localStorage.setItem("buddha_contact_details", JSON.stringify(updated));
    saveConfigToServer(updated);
  };

  const updateValuePillars = (list: ValuePillar[]) => {
    setValuePillars(list);
    localStorage.setItem("buddha_value_pillars", JSON.stringify(list));
    saveConfigToServer({ valuePillars: list });
  };

  const updateStatistics = (list: StatItem[]) => {
    setStatistics(list);
    localStorage.setItem("buddha_statistics", JSON.stringify(list));
    saveConfigToServer({ statistics: list });
  };

  const resetToDefaults = () => {
    localStorage.removeItem("buddha_logo_url");
    localStorage.removeItem("buddha_hero_url");
    localStorage.removeItem("buddha_founder_info");
    localStorage.removeItem("buddha_initiatives");
    localStorage.removeItem("buddha_gallery_folders");
    localStorage.removeItem("buddha_initiative_categories");
    localStorage.removeItem("buddha_gallery_categories");

    localStorage.removeItem("buddha_hero_content");
    localStorage.removeItem("buddha_about_content");
    localStorage.removeItem("buddha_news_list");
    localStorage.removeItem("buddha_contact_details");
    localStorage.removeItem("buddha_value_pillars");
    localStorage.removeItem("buddha_statistics");

    setLogoUrl("https://i.ibb.co/Q3X4mZHG/Asset-2-2x.png");
    setBuddhaUrl("https://i.ibb.co/WW8ZLdGx/Untitled-design-1.png");
    setFounderInfo(FOUNDER_INFO);

    const list = INITIATIVES.map((item, idx) => {
      const categories = ["Sponsorships", "Training", "Technology", "Outreach"];
      return {
        ...item,
        category: categories[idx] || "Others"
      };
    });
    setInitiatives(list);

    setGalleryFolders(DEFAULT_GALLERY_FOLDERS);
    setInitiativeCategories(["Sponsorships", "Training", "Technology", "Outreach"]);
    setGalleryCategories(["Technology", "Sponsorships", "Training", "Outreach"]);

    // Reset extended content states
    setHeroTagline("Enlightening Minds. Empowering Lives.");
    setHeroHeadline("EDUCATION\nFOR ALL");
    setHeroDescription("Buddha Arivu Kalanjiyam is committed to nurturing knowledge, compassion, and character through quality education for all.");
    setHeroQuote("He who has conquered himself is greater than he who has won a thousand battles.");
    setHeroQuoteAuthor("Buddha");

    setAboutImage("https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=850");
    setAboutCaption('"Wisdom dispels darkness."');
    setAboutHeadline("Rooted in Wisdom. \nDriven by Purpose.");
    setAboutParagraph1("The Buddha Arivu Kalanjiyam was founded with an unshakeable vision to make quality education and character-building accessible to every student, irrespective of socioeconomic backgrounds.");
    setAboutParagraph2("We work across urban and remote rural regions, establishing digitized centers of excellence, funding scholarships, and training visionary educators who inspire a new generation with values of compassion, integrity, and mindfulness.");
    setAboutStoryTitle("The Genesis: Malarselvi Foundation & Buddha Trust");
    setAboutStoryContent("Initiated by the Dr. Malarselvi Foundation, our roadmap started as an evening tutoring support group. Today, we collaborate directly with government institutions to design curriculums that foster intellectual agility and spiritual compassion (Arivu & Karuna).");
    setAboutStoryTags("🎓 Global Curriculums, 🍃 Sustainable Classrooms");

    setNewsList(DEFAULT_NEWS_LIST);

    setContactAddress("Archana Castle, Ramapuram Road, Parangi Malai, St.Thomas Mount, Chennai, Tamil Nadu 600016");
    setContactPhone("+91 98765 43210");
    setContactEmail("info@buddhaarivukalanjiyam.org");
    setContactHours("Mon – Sat: 09:00 AM – 06:00 PM (IST)");
    setContactRegNo("Reg No. 412/IV/2022-DL");
    setContactLatitude("13.0042");
    setContactLongitude("80.1948");

    setValuePillars(VALUE_PILLARS);
    setStatistics(STATISTICS);

    // Also tell server to reset configuration
    fetch("/api/config", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    }).catch(err => console.error("Failed to reset config on server:", err));
  };

  const exportConfigJSON = () => {
    const config = {
      logoUrl,
      buddhaUrl,
      founderInfo,
      initiatives,
      galleryFolders,
      initiativeCategories,
      galleryCategories,
      heroTagline,
      heroHeadline,
      heroDescription,
      heroQuote,
      heroQuoteAuthor,
      aboutImage,
      aboutCaption,
      aboutHeadline,
      aboutParagraph1,
      aboutParagraph2,
      aboutStoryTitle,
      aboutStoryContent,
      aboutStoryTags,
      newsList,
      contactAddress,
      contactPhone,
      contactEmail,
      contactHours,
      contactRegNo,
      contactLatitude,
      contactLongitude,
      valuePillars,
      statistics,
    };
    return JSON.stringify(config, null, 2);
  };

  const importConfigJSON = (jsonString: string): boolean => {
    try {
      const config = JSON.parse(jsonString);
      if (config.logoUrl) updateLogoUrl(config.logoUrl);
      if (config.buddhaUrl) updateBuddhaUrl(config.buddhaUrl);
      if (config.founderInfo) updateFounderInfo(config.founderInfo);
      if (config.initiatives) updateInitiatives(config.initiatives);
      if (config.galleryFolders) updateGalleryFolders(config.galleryFolders);
      if (config.initiativeCategories) updateInitiativeCategories(config.initiativeCategories);
      if (config.galleryCategories) updateGalleryCategories(config.galleryCategories);

      // Import secondary content fields with fallbacks
      if (config.heroTagline || config.heroHeadline || config.heroDescription) {
        updateHeroContent({
          heroTagline: config.heroTagline,
          heroHeadline: config.heroHeadline,
          heroDescription: config.heroDescription,
          heroQuote: config.heroQuote,
          heroQuoteAuthor: config.heroQuoteAuthor,
        });
      }

      if (config.aboutImage || config.aboutHeadline || config.aboutParagraph1) {
        updateAboutContent({
          aboutImage: config.aboutImage,
          aboutCaption: config.aboutCaption,
          aboutHeadline: config.aboutHeadline,
          aboutParagraph1: config.aboutParagraph1,
          aboutParagraph2: config.aboutParagraph2,
          aboutStoryTitle: config.aboutStoryTitle,
          aboutStoryContent: config.aboutStoryContent,
          aboutStoryTags: config.aboutStoryTags,
        });
      }

      if (config.newsList) updateNewsList(config.newsList);

      if (config.contactAddress || config.contactPhone || config.contactEmail || config.contactLatitude || config.contactLongitude) {
        updateContactDetails({
          contactAddress: config.contactAddress,
          contactPhone: config.contactPhone,
          contactEmail: config.contactEmail,
          contactHours: config.contactHours,
          contactRegNo: config.contactRegNo,
          contactLatitude: config.contactLatitude,
          contactLongitude: config.contactLongitude,
        });
      }

      if (config.valuePillars) updateValuePillars(config.valuePillars);
      if (config.statistics) updateStatistics(config.statistics);

      // Save complete imported configuration to the server immediately
      fetch("/api/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      }).catch(err => console.error("Failed to sync imported config to server:", err));

      return true;
    } catch (e) {
      console.error("Invalid configuration JSON imported", e);
      return false;
    }
  };

  const updateSetIsAuthenticated = (val: boolean) => {
    setIsAuthenticated(val);
    if (val) {
      sessionStorage.setItem("buddha_is_authenticated", "true");
    } else {
      sessionStorage.removeItem("buddha_is_authenticated");
    }
  };

  return (
    <AdminContext.Provider
      value={{
        logoUrl,
        buddhaUrl,
        founderInfo,
        initiatives,
        galleryFolders,
        initiativeCategories,
        galleryCategories,
        isAuthenticated,
        isAdminOpen,

        heroTagline,
        heroHeadline,
        heroDescription,
        heroQuote,
        heroQuoteAuthor,

        aboutImage,
        aboutCaption,
        aboutHeadline,
        aboutParagraph1,
        aboutParagraph2,
        aboutStoryTitle,
        aboutStoryContent,
        aboutStoryTags,

        newsList,

        contactAddress,
        contactPhone,
        contactEmail,
        contactHours,
        contactRegNo,
        contactLatitude,
        contactLongitude,

        valuePillars,
        statistics,

        setIsAdminOpen,
        setIsAuthenticated: updateSetIsAuthenticated,
        updateLogoUrl,
        updateBuddhaUrl,
        updateFounderInfo,
        updateInitiatives,
        updateGalleryFolders,
        updateInitiativeCategories,
        updateGalleryCategories,

        updateHeroContent,
        updateAboutContent,
        updateNewsList,
        updateContactDetails,
        updateValuePillars,
        updateStatistics,

        resetToDefaults,
        exportConfigJSON,
        importConfigJSON,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
}
