import React, { useState } from 'react';
import { useAdmin, GalleryFolder, GalleryPhoto } from '../lib/AdminContext';
import { NewsItem } from '../types';
import { 
  X, Settings, Image as ImageIcon, Award, BookOpen, 
  Trash2, Plus, Download, Upload, RotateCcw, 
  FolderPlus, Check, ChevronRight, Edit3, HelpCircle,
  Lock, Unlock, LogOut, Tag, Sparkles, Newspaper, Mail, FileText, MapPin
} from 'lucide-react';

export default function AdminPanel() {
  const {
    logoUrl,
    buddhaUrl,
    founderInfo,
    initiatives,
    galleryFolders,
    initiativeCategories,
    galleryCategories,
    isAuthenticated,
    isAdminOpen,
    setIsAdminOpen,
    setIsAuthenticated,
    updateLogoUrl,
    updateBuddhaUrl,
    updateFounderInfo,
    updateInitiatives,
    updateGalleryFolders,
    updateInitiativeCategories,
    updateGalleryCategories,
    resetToDefaults,
    exportConfigJSON,
    importConfigJSON,

    // New state properties and setters
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

    updateHeroContent,
    updateAboutContent,
    updateNewsList,
    updateContactDetails,
    updateValuePillars,
    updateStatistics,
  } = useAdmin();

  const [activeTab, setActiveTab] = useState<'general' | 'pillars' | 'initiatives' | 'gallery' | 'news' | 'contact' | 'backup'>('general');
  const [saveStatus, setSaveStatus] = useState<string | null>(null);
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [geoError, setGeoError] = useState<string | null>(null);

  // States for Login
  const [loginPasscode, setLoginPasscode] = useState('');
  const [loginError, setLoginError] = useState(false);

  // Category addition states
  const [newInitCat, setNewInitCat] = useState('');
  const [newGallCat, setNewGallCat] = useState('');

  // States for Gallery Editing
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
  const [newPhotoUrl, setNewPhotoUrl] = useState('');
  const [newPhotoCaption, setNewPhotoCaption] = useState('');
  
  // Create New Folder form fields
  const [showNewFolderForm, setShowNewFolderForm] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [newFolderDate, setNewFolderDate] = useState('');
  const [newFolderLocation, setNewFolderLocation] = useState('');
  const [newFolderDesc, setNewFolderDesc] = useState('');
  const [newFolderCover, setNewFolderCover] = useState('');
  const [newFolderCat, setNewFolderCat] = useState('');

  // Paste backup fields
  const [pasteConfigText, setPasteConfigText] = useState('');
  const [showPasteError, setShowPasteError] = useState(false);

  // News Editing State
  const [editingNewsId, setEditingNewsId] = useState<string | null>(null);

  // States for custom Confirmation Dialog to avoid iframe-blocked window.confirm
  const [confirmState, setConfirmState] = useState<{
    msg: string;
    onConfirm: () => void;
  } | null>(null);

  if (!isAdminOpen) return null;

  const triggerNotify = (msg: string) => {
    setSaveStatus(msg);
    setTimeout(() => setSaveStatus(null), 3000);
  };

  // Secure login handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginPasscode === 'arivu2026') {
      setIsAuthenticated(true);
      setLoginError(false);
      setLoginPasscode('');
      triggerNotify("Welcome! Secure Desk Unlocked.");
    } else {
      setLoginError(true);
    }
  };

  // Profile saves
  const handleSaveGeneral = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const logoVal = data.get('logoUrl') as string;
    const buddhaVal = data.get('buddhaUrl') as string;
    
    const founderName = data.get('founderName') as string;
    const founderRole = data.get('founderRole') as string;
    const founderImg = data.get('founderImg') as string;
    const founderBio1 = data.get('founderBio1') as string;
    const founderBio2 = data.get('founderBio2') as string;

    const taglineVal = data.get('heroTagline') as string;
    const headlineVal = data.get('heroHeadline') as string;
    const descVal = data.get('heroDescription') as string;
    const quoteVal = data.get('heroQuote') as string;
    const quoteAuthorVal = data.get('heroQuoteAuthor') as string;

    const aboutImgVal = data.get('aboutImage') as string;
    const aboutCapVal = data.get('aboutCaption') as string;
    const aboutHeadVal = data.get('aboutHeadline') as string;
    const aboutP1Val = data.get('aboutParagraph1') as string;
    const aboutP2Val = data.get('aboutParagraph2') as string;
    const aboutStoryTitleVal = data.get('aboutStoryTitle') as string;
    const aboutStoryContentVal = data.get('aboutStoryContent') as string;
    const aboutStoryTagsVal = data.get('aboutStoryTags') as string;

    if (logoVal) updateLogoUrl(logoVal);
    if (buddhaVal) updateBuddhaUrl(buddhaVal);
    
    updateFounderInfo({
      name: founderName || founderInfo.name,
      role: founderRole || founderInfo.role,
      imageUrl: founderImg || founderInfo.imageUrl,
      bioLines: [
        founderBio1 || founderInfo.bioLines[0],
        founderBio2 || founderInfo.bioLines[1]
      ]
    });

    updateHeroContent({
      heroTagline: taglineVal,
      heroHeadline: headlineVal,
      heroDescription: descVal,
      heroQuote: quoteVal,
      heroQuoteAuthor: quoteAuthorVal,
    });

    updateAboutContent({
      aboutImage: aboutImgVal,
      aboutCaption: aboutCapVal,
      aboutHeadline: aboutHeadVal,
      aboutParagraph1: aboutP1Val,
      aboutParagraph2: aboutP2Val,
      aboutStoryTitle: aboutStoryTitleVal,
      aboutStoryContent: aboutStoryContentVal,
      aboutStoryTags: aboutStoryTagsVal,
    });

    triggerNotify("Website styles, Hero headers & About story blocks saved!");
  };

  // Initiative Actions
  const handleInitiativeChange = (index: number, field: string, value: string) => {
    const updated = [...initiatives];
    updated[index] = {
      ...updated[index],
      [field]: value
    };
    updateInitiatives(updated);
  };

  const handleAddInitiative = () => {
    const newId = `initiative-${Date.now()}`;
    const newInitItem = {
      id: newId,
      title: "New Program Title",
      description: "Brief summary describing this campaign.",
      imageUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=400",
      link: "#",
      category: initiativeCategories[0] || "",
      focus: "Sponsorship scope & targeted training elements description.",
      metrics: "e.g. 100+ sponsored, or 5 computer units provided.",
      summary: "In-depth summary explaining the long-term impact on scholars and public enrollment indices."
    };
    updateInitiatives([...initiatives, newInitItem]);
    triggerNotify("New program initiative added!");
  };

  const handleDeleteInitiative = (id: string, title: string) => {
    setConfirmState({
      msg: `Are you sure you want to permanently delete the program "${title}"?`,
      onConfirm: () => {
        const filtered = initiatives.filter(init => init.id !== id);
        updateInitiatives(filtered);
        triggerNotify("Program initiative removed.");
      }
    });
  };

  const handleAddInitiativeCategory = (e: React.FormEvent) => {
    e.preventDefault();
    const cat = newInitCat.trim();
    if (!cat) return;
    if (initiativeCategories.includes(cat)) {
      triggerNotify("Error: This program tab class already exists!");
      return;
    }
    updateInitiativeCategories([...initiativeCategories, cat]);
    setNewInitCat('');
    triggerNotify(`Initiative category tab "${cat}" added!`);
  };

  const handleDeleteInitiativeCategory = (cat: string) => {
    setConfirmState({
      msg: `Are you sure you want to delete tab "${cat}"? Programs belonging to this tab will remain but become uncategorized.`,
      onConfirm: () => {
        const filtered = initiativeCategories.filter(c => c !== cat);
        updateInitiativeCategories(filtered);
        const updated = initiatives.map(init => {
          if (init.category === cat) {
            return { ...init, category: '' };
          }
          return init;
        });
        updateInitiatives(updated);
        triggerNotify(`Tab "${cat}" removed.`);
      }
    });
  };

  // Gallery Categories Manager
  const handleAddGalleryCategory = (e: React.FormEvent) => {
    e.preventDefault();
    const cat = newGallCat.trim();
    if (!cat) return;
    if (galleryCategories.includes(cat)) {
      triggerNotify("Error: This gallery tab class already exists!");
      return;
    }
    updateGalleryCategories([...galleryCategories, cat]);
    setNewGallCat('');
    triggerNotify(`Gallery category tab "${cat}" added!`);
  };

  const handleDeleteGalleryCategory = (cat: string) => {
    setConfirmState({
      msg: `Are you sure you want to delete tab "${cat}"? Albums belonging to this tab will remain but become uncategorized.`,
      onConfirm: () => {
        const filtered = galleryCategories.filter(c => c !== cat);
        updateGalleryCategories(filtered);
        const updated = galleryFolders.map(fold => {
          if (fold.category === cat) {
            return { ...fold, category: '' };
          }
          return fold;
        });
        updateGalleryFolders(updated);
        triggerNotify(`Tab "${cat}" removed.`);
      }
    });
  };

  // Gallery Operations
  const handleCreateFolder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFolderName.trim()) return;

    const newId = newFolderName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const newFolder: GalleryFolder = {
      id: newId,
      name: newFolderName,
      date: newFolderDate || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      location: newFolderLocation || "Trust Area",
      description: newFolderDesc || "No description provided yet.",
      coverImage: newFolderCover || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=400",
      photos: [],
      category: newFolderCat || galleryCategories[0] || ''
    };

    updateGalleryFolders([newFolder, ...galleryFolders]);
    
    // Clear fields
    setNewFolderName('');
    setNewFolderDate('');
    setNewFolderLocation('');
    setNewFolderDesc('');
    setNewFolderCover('');
    setNewFolderCat('');
    setShowNewFolderForm(false);
    setSelectedFolderId(newId);
    triggerNotify(`Photo Album "${newFolder.name}" Created!`);
  };

  const handleDeleteFolder = (folderId: string) => {
    setConfirmState({
      msg: "Are you sure you want to completely delete this album and all its images?",
      onConfirm: () => {
        const filtered = galleryFolders.filter(f => f.id !== folderId);
        updateGalleryFolders(filtered);
        if (selectedFolderId === folderId) {
          setSelectedFolderId(null);
        }
        triggerNotify("Album deleted.");
      }
    });
  };

  const handleUpdateFolderMeta = (folderId: string, field: keyof GalleryFolder, value: string) => {
    const updated = galleryFolders.map(f => {
      if (f.id === folderId) {
        return { ...f, [field]: value };
      }
      return f;
    });
    updateGalleryFolders(updated);
  };

  const handleAddPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPhotoUrl.trim() || !selectedFolderId) return;

    const updated = galleryFolders.map(f => {
      if (f.id === selectedFolderId) {
        const newPhoto: GalleryPhoto = {
          url: newPhotoUrl,
          caption: newPhotoCaption || "Event snapshot."
        };
        return {
          ...f,
          photos: [...f.photos, newPhoto]
        };
      }
      return f;
    });

    updateGalleryFolders(updated);
    setNewPhotoUrl('');
    setNewPhotoCaption('');
    triggerNotify("New image added to album!");
  };

  const handleDeletePhoto = (folderId: string, photoIdx: number) => {
    const updated = galleryFolders.map(f => {
      if (f.id === folderId) {
        const photosCopy = [...f.photos];
        photosCopy.splice(photoIdx, 1);
        return {
          ...f,
          photos: photosCopy
        };
      }
      return f;
    });
    updateGalleryFolders(updated);
    triggerNotify("Image removed.");
  };

  const handleUpdatePhotoCaption = (folderId: string, photoIdx: number, title: string) => {
    const updated = galleryFolders.map(f => {
      if (f.id === folderId) {
        const photosCopy = [...f.photos];
        photosCopy[photoIdx] = {
          ...photosCopy[photoIdx],
          caption: title
        };
        return {
          ...f,
          photos: photosCopy
        };
      }
      return f;
    });
    updateGalleryFolders(updated);
  };

  // Pillars Tab Actions
  const handleSavePillarsAndStats = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    
    // Process value pillars
    const updatedPillars = valuePillars.map((pillar, idx) => ({
      ...pillar,
      title: (data.get(`pillar_title_${idx}`) as string) || pillar.title,
      description: (data.get(`pillar_desc_${idx}`) as string) || pillar.description,
      iconName: (data.get(`pillar_icon_${idx}`) as string) || pillar.iconName,
    }));
    updateValuePillars(updatedPillars);

    // Process stats
    const updatedStats = statistics.map((stat, idx) => ({
      ...stat,
      value: (data.get(`stat_value_${idx}`) as string) || stat.value,
      label: (data.get(`stat_label_${idx}`) as string) || stat.label,
      iconName: (data.get(`stat_icon_${idx}`) as string) || stat.iconName,
    }));
    updateStatistics(updatedStats);

    triggerNotify("Website pillars and homepage counters saved successfully!");
  };

  // Contact Tab Actions
  const handleSaveContactForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const addressVal = data.get('contactAddress') as string;
    const phoneVal = data.get('contactPhone') as string;
    const emailVal = data.get('contactEmail') as string;
    const hoursVal = data.get('contactHours') as string;
    const regNoVal = data.get('contactRegNo') as string;
    const latVal = data.get('contactLatitude') as string;
    const lngVal = data.get('contactLongitude') as string;

    updateContactDetails({
      contactAddress: addressVal,
      contactPhone: phoneVal,
      contactEmail: emailVal,
      contactHours: hoursVal,
      contactRegNo: regNoVal,
      contactLatitude: latVal,
      contactLongitude: lngVal,
    });
    triggerNotify("Secretariat and direct contact parameters updated!");
  };

  const handleDetectCoordinates = () => {
    if (!navigator.geolocation) {
      setGeoError("Geolocation is not supported by your browser");
      return;
    }
    setIsDetectingLocation(true);
    setGeoError(null);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude.toFixed(6);
        const lng = position.coords.longitude.toFixed(6);
        
        updateContactDetails({
          contactLatitude: lat,
          contactLongitude: lng
        });
        setIsDetectingLocation(false);
        triggerNotify(`Success! Interactive coordinates detected and saved: Lat ${lat}, Lng ${lng}`);
      },
      (error) => {
        console.error(error);
        setIsDetectingLocation(false);
        let errorMsg = "Permission denied or signal weak.";
        if (error.code === error.PERMISSION_DENIED) {
          errorMsg = "Location permission denied. Please allow location access in your browser or iframe.";
        }
        setGeoError(errorMsg);
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  // News bulletins triggers
  const handleAddNewBulletin = () => {
    const newId = `news-${Date.now()}`;
    const newEvent: NewsItem = {
      id: newId,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' }),
      tag: "Community Update",
      title: "New Announcement Bulletin",
      summary: "Write a short 1-sentence summary of this announcement or achievement.",
      content: "Copy-paste or type the comprehensive news article details or event roadmap here. It will display inside the visitor modal nicely.",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600"
    };

    updateNewsList([newEvent, ...newsList]);
    setEditingNewsId(newId);
    triggerNotify("New Bulletin Draft Published! Customize it below.");
  };

  const handleDeleteBulletinItem = (id: string, title: string) => {
    setConfirmState({
      msg: `Are you sure you want to permanently delete the bulletin "${title}"? This cannot be undone!`,
      onConfirm: () => {
        const filtered = newsList.filter(item => item.id !== id);
        updateNewsList(filtered);
        triggerNotify("Bulletin item removed.");
        if (editingNewsId === id) setEditingNewsId(null);
      }
    });
  };

  const handleSaveBulletinForm = (e: React.FormEvent<HTMLFormElement>, id: string) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const titleVal = data.get('title') as string;
    const dateVal = data.get('date') as string;
    const tagVal = data.get('tag') as string;
    const summaryVal = data.get('summary') as string;
    const contentVal = data.get('content') as string;
    const imageVal = data.get('image') as string;

    const updated = newsList.map(item => {
      if (item.id === id) {
        return {
          ...item,
          title: titleVal,
          date: dateVal,
          tag: tagVal,
          summary: summaryVal,
          content: contentVal,
          image: imageVal,
        };
      }
      return item;
    });

    updateNewsList(updated);
    setEditingNewsId(null);
    triggerNotify("Bulletin news card updated successfully!");
  };

  // Backups
  const handlePasteImport = (e: React.FormEvent) => {
    e.preventDefault();
    const success = importConfigJSON(pasteConfigText);
    if (success) {
      setShowPasteError(false);
      setPasteConfigText('');
      triggerNotify("Configuration successfully imported!");
    } else {
      setShowPasteError(true);
    }
  };

  const handleDownloadBackup = () => {
    const jsonStr = exportConfigJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `buddha_arivu_assets_backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerNotify("Backup file downloaded!");
  };

  const activeFolder = galleryFolders.find(f => f.id === selectedFolderId);

  // SECURE AUTHENTICATION SCREEN WRAPPER
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
        {/* Transparent backdrop for seamless visual overlay */}
        <div 
          className="absolute inset-0 bg-[#0E1521]/60 backdrop-blur-xs transition-opacity duration-300"
          onClick={() => setIsAdminOpen(false)}
        />
        
        {/* Slide panel */}
        <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between z-10 animate-slide-in border-l border-bronze/10">
          <div className="p-6 bg-[#0E2138] text-white flex justify-between items-center select-none">
            <div className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-bronze" />
              <div>
                <h2 className="font-display font-black text-sm uppercase tracking-wide">Trust Secretariat</h2>
                <p className="text-[10px] text-bronze font-mono uppercase font-bold tracking-widest">Locked Gate Desk</p>
              </div>
            </div>
            <button 
              onClick={() => setIsAdminOpen(false)} 
              className="text-white/70 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-bronze/10 flex items-center justify-center text-bronze mx-auto border border-bronze/20">
              <Lock className="w-7 h-7" />
            </div>

            <div className="space-y-2">
              <h3 className="font-display font-bold text-charcoal text-base">Passcode Authentication Gate</h3>
              <p className="text-xs text-muted leading-relaxed">
                Trustee credentials verification required to modify educational programs, gallery folders, or static media resources.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4 max-w-xs mx-auto w-full">
              <div className="space-y-1.5">
                <label className="block text-[10px] font-mono font-bold text-charcoal uppercase tracking-wider">Trust Desk Passcode</label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    value={loginPasscode}
                    onChange={(e) => {
                      setLoginPasscode(e.target.value);
                      setLoginError(false);
                    }}
                    placeholder="••••••••"
                    className="w-full px-4 py-2.5 border rounded-xl text-center font-mono text-charcoal focus:outline-none focus:ring-1 focus:ring-bronze text-sm bg-cream/40"
                  />
                </div>
                {loginError && (
                  <p className="text-[10px] text-rose-600 font-mono font-bold text-center mt-1 select-none animate-shake">
                    ❌ Invalid desk access passcode
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-bronze hover:bg-bronze-dark text-white rounded-xl text-xs font-bold font-mono uppercase tracking-wider shadow-[0_4px_12px_rgba(194,142,83,0.3)] transition-all flex items-center justify-center gap-1.5"
              >
                <Unlock className="w-3.5 h-3.5" />
                <span>Verify & Open Desk</span>
              </button>
            </form>

            <div className="mt-8 p-4 rounded-lg border border-bronze/15 bg-bronze/5 max-w-xs mx-auto text-[11px] leading-relaxed text-muted space-y-1">
              <span className="font-mono font-bold text-bronze uppercase flex items-center gap-1">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>DEVELOPER ACCESS</span>
              </span>
              <p>
                The secure login passcode is <code className="font-mono font-bold text-charcoal select-all px-1 bg-white border rounded">arivu2026</code>. Enter this code to manage content.
              </p>
            </div>
          </div>

          <div className="p-4 bg-gray-100 text-center text-[10px] font-mono text-muted select-none border-t">
            Desk Session Security: Active
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#0E1521]/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={() => setIsAdminOpen(false)}
      />

      {/* Slide-out Menu Panel container */}
      <div className="relative w-full max-w-3xl bg-white h-full shadow-2xl flex flex-col z-10 animate-slide-in overflow-hidden border-l border-bronze/10">
        
        {/* Header bar */}
        <div className="p-6 bg-[#0E2138] text-white flex items-center justify-between shadow-md shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-bronze/20 rounded-lg border border-bronze/30">
              <Settings className="w-5 h-5 text-bronze" />
            </div>
            <div>
              <h2 className="font-display font-bold text-lg select-none">Asset Portal & Admin Desk</h2>
              <p className="text-[10px] uppercase font-mono text-bronze font-bold tracking-widest">Buddha Arivu Kalanjiyam</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Lock session */}
            <button 
              onClick={() => {
                setIsAuthenticated(false);
                triggerNotify("Lock successfully certified!");
              }}
              title="Lock Admin Session"
              className="p-1 px-2 text-rose-300 hover:text-white hover:bg-rose-950/40 rounded-lg transition-colors flex items-center gap-1.5 text-xs font-mono font-bold uppercase border border-rose-300/10"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Lock Desk</span>
            </button>

            <button 
              onClick={() => setIsAdminOpen(false)}
              className="p-1 px-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors flex items-center gap-1.5 text-xs font-mono font-bold uppercase"
            >
              <span>Close</span>
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Global Save/Success Prompt Indicator popup at upper segment */}
        {saveStatus && (
          <div className="mx-6 mt-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold font-mono shadow-sm flex items-center gap-2 animate-fade-in shrink-0 z-20">
            <Check className="w-4 h-4 text-emerald-600 animate-scale-up" />
            <span>{saveStatus}</span>
          </div>
        )}

        {/* Tab Selection Sub-rail with sliding overflow for premium dynamic navigation */}
        <div className="flex border-b border-gray-100 bg-gray-50/50 p-2 gap-1.5 shrink-0 select-none overflow-x-auto scrollbar-thin">
          <button
            onClick={() => { setActiveTab('general'); setSelectedFolderId(null); }}
            className={`py-2 px-3.5 rounded-lg text-xs font-bold font-mono transition-all flex items-center justify-center gap-1.5 shrink-0 whitespace-nowrap ${
              activeTab === 'general' 
                ? 'bg-[#0E2138] text-white shadow-sm' 
                : 'text-muted hover:text-charcoal hover:bg-gray-100'
            }`}
          >
            <Settings className="w-3.5 h-3.5 text-bronze" />
            <span>Branding/Hero/About</span>
          </button>
          <button
            onClick={() => { setActiveTab('pillars'); setSelectedFolderId(null); }}
            className={`py-2 px-3.5 rounded-lg text-xs font-bold font-mono transition-all flex items-center justify-center gap-1.5 shrink-0 whitespace-nowrap ${
              activeTab === 'pillars' 
                ? 'bg-[#0E2138] text-white shadow-sm' 
                : 'text-muted hover:text-charcoal hover:bg-gray-100'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-bronze" />
            <span>Pillars & Stats</span>
          </button>
          <button
            onClick={() => { setActiveTab('initiatives'); setSelectedFolderId(null); }}
            className={`py-2 px-3.5 rounded-lg text-xs font-bold font-mono transition-all flex items-center justify-center gap-1.5 shrink-0 whitespace-nowrap ${
              activeTab === 'initiatives' 
                ? 'bg-[#0E2138] text-white shadow-sm' 
                : 'text-muted hover:text-charcoal hover:bg-gray-100'
            }`}
          >
            <Award className="w-3.5 h-3.5 text-bronze" />
            <span>Campaign Programs</span>
          </button>
          <button
            onClick={() => { setActiveTab('gallery'); }}
            className={`py-2 px-3.5 rounded-lg text-xs font-bold font-mono transition-all flex items-center justify-center gap-1.5 shrink-0 whitespace-nowrap ${
              activeTab === 'gallery' 
                ? 'bg-[#0E2138] text-white shadow-sm' 
                : 'text-muted hover:text-charcoal hover:bg-gray-100'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5 text-bronze" />
            <span>Gallery Albums</span>
          </button>
          <button
            onClick={() => { setActiveTab('news'); setSelectedFolderId(null); }}
            className={`py-2 px-3.5 rounded-lg text-xs font-bold font-mono transition-all flex items-center justify-center gap-1.5 shrink-0 whitespace-nowrap ${
              activeTab === 'news' 
                ? 'bg-[#0E2138] text-white shadow-sm' 
                : 'text-muted hover:text-charcoal hover:bg-gray-100'
            }`}
          >
            <Newspaper className="w-3.5 h-3.5 text-bronze" />
            <span>News & Bulletin</span>
          </button>
          <button
            onClick={() => { setActiveTab('contact'); setSelectedFolderId(null); }}
            className={`py-2 px-3.5 rounded-lg text-xs font-bold font-mono transition-all flex items-center justify-center gap-1.5 shrink-0 whitespace-nowrap ${
              activeTab === 'contact' 
                ? 'bg-[#0E2138] text-white shadow-sm' 
                : 'text-muted hover:text-charcoal hover:bg-gray-100'
            }`}
          >
            <Mail className="w-3.5 h-3.5 text-bronze" />
            <span>Secretariat & Desk</span>
          </button>
          <button
            onClick={() => { setActiveTab('backup'); setSelectedFolderId(null); }}
            className={`py-2 px-3.5 rounded-lg text-xs font-bold font-mono transition-all flex items-center justify-center gap-1.5 shrink-0 whitespace-nowrap ${
              activeTab === 'backup' 
                ? 'bg-[#0E2138] text-white shadow-sm' 
                : 'text-muted hover:text-charcoal hover:bg-gray-100'
            }`}
          >
            <Download className="w-3.5 h-3.5 text-bronze" />
            <span>JSON Backup</span>
          </button>
        </div>

        {/* Content Box with Scrollbar */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-white max-h-[calc(100vh-140px)]">
          
          {/* TAB 1: GENERAL PROFILE AND STATIC OVERRIDES */}
          {activeTab === 'general' && (
            <form onSubmit={handleSaveGeneral} className="space-y-6">
              
              {/* Image Hosting Suggestion Helper */}
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-950 text-xs leading-relaxed space-y-1">
                <div className="flex items-center gap-1.5 font-bold font-mono text-bronze uppercase">
                  <HelpCircle className="w-4 h-4 text-bronze" />
                  <span>How to add new images:</span>
                </div>
                <p>
                  You can upload your photos to free hosts like ImgBB (<a href="https://imgbb.com" target="_blank" rel="noopener noreferrer" className="underline font-semibold hover:text-bronze">imgbb.com</a>) or similar, then copy and paste the <strong>direct image URL</strong> (ending in .png, .jpg) right into any of the text fields below.
                </p>
              </div>

              {/* Logo Section */}
              <div className="space-y-4">
                <h3 className="font-display font-bold text-sm text-[#0E2138] flex items-center gap-2 border-b border-gray-100 pb-2">
                  <span className="px-2 py-0.5 bg-bronze/10 text-bronze rounded text-xs">1</span>
                  <span>Website Branding & Logo</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                  <div className="md:col-span-1 flex flex-col items-center justify-center bg-gray-50 border p-3 rounded-xl min-h-[80px]">
                    <img 
                      src={logoUrl} 
                      alt="Current Logo Preview" 
                      className="w-12 h-12 object-contain"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://i.ibb.co/Q3X4mZHG/Asset-2-2x.png';
                      }}
                    />
                    <span className="text-[9px] text-muted font-mono mt-1">Live logo</span>
                  </div>
                  <div className="md:col-span-3 space-y-1">
                    <label className="block text-xs font-mono font-bold text-charcoal">Branding Logo Link (Direct URL)</label>
                    <input
                      type="url"
                      name="logoUrl"
                      key={logoUrl}
                      defaultValue={logoUrl}
                      placeholder="Paste direct PNG link here..."
                      className="w-full px-3 py-2 border rounded-lg text-xs font-mono bg-cream focus:outline-none focus:ring-1 focus:ring-bronze"
                    />
                  </div>
                </div>
              </div>

              {/* Hero Image & Text Setup Grid */}
              <div className="space-y-4 pt-2">
                <h3 className="font-display font-bold text-sm text-[#0E2138] flex items-center gap-2 border-b border-gray-100 pb-2">
                  <span className="px-2 py-0.5 bg-bronze/10 text-bronze rounded text-xs">2</span>
                  <span>Hero Section & Homepage Title Copy</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center mb-4">
                  <div className="md:col-span-1 flex flex-col items-center justify-center bg-gray-50 border p-2 rounded-xl min-h-[90px]">
                    <img 
                      src={buddhaUrl} 
                      alt="Current Buddha Preview" 
                      className="max-h-[70px] w-auto object-contain"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://i.ibb.co/WW8ZLdGx/Untitled-design-1.png';
                      }}
                    />
                    <span className="text-[9px] text-muted font-mono mt-1">Gautama profile</span>
                  </div>
                  <div className="md:col-span-3 space-y-1">
                    <label className="block text-xs font-mono font-bold text-charcoal">Buddha Portrait Image Link (Direct URL)</label>
                    <input
                      type="url"
                      name="buddhaUrl"
                      key={buddhaUrl}
                      defaultValue={buddhaUrl}
                      placeholder="Paste Gautam Buddha design URL..."
                      className="w-full px-3 py-2 border rounded-lg text-xs font-mono bg-cream focus:outline-none focus:ring-1 focus:ring-bronze"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-mono font-bold text-charcoal">Hero Tagline / Kicker</label>
                    <input
                      type="text"
                      name="heroTagline"
                      defaultValue={heroTagline}
                      placeholder="Enlightening Minds. Empowering Lives."
                      className="w-full px-3 py-2 border rounded-lg text-xs bg-cream focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-mono font-bold text-charcoal">Hero Main H1 Headline (Use \n for line breaks)</label>
                    <textarea
                      name="heroHeadline"
                      defaultValue={heroHeadline}
                      rows={1}
                      placeholder="EDUCATION\nFOR ALL"
                      className="w-full px-3 py-1.5 border rounded-lg text-xs bg-cream focus:outline-none font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-mono font-bold text-charcoal">Hero Description Paragraph Content</label>
                  <textarea
                    name="heroDescription"
                    defaultValue={heroDescription}
                    rows={2}
                    className="w-full px-3 py-2 border rounded-lg text-xs bg-cream focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2 space-y-1">
                    <label className="block text-xs font-mono font-bold text-charcoal">Zen Quotes Banner Message</label>
                    <input
                      type="text"
                      name="heroQuote"
                      defaultValue={heroQuote}
                      className="w-full px-3 py-2 border rounded-lg text-xs bg-cream focus:outline-none font-sans italic"
                    />
                  </div>
                  <div className="col-span-1 space-y-1">
                    <label className="block text-xs font-mono font-bold text-charcoal">Quote Author</label>
                    <input
                      type="text"
                      name="heroQuoteAuthor"
                      defaultValue={heroQuoteAuthor}
                      className="w-full px-3 py-2 border rounded-lg text-xs bg-cream focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* About Us Narrative Block */}
              <div className="space-y-4 pt-2">
                <h3 className="font-display font-bold text-sm text-[#0E2138] flex items-center gap-2 border-b border-gray-100 pb-2">
                  <span className="px-2 py-0.5 bg-bronze/10 text-bronze rounded text-xs">3</span>
                  <span>About Us (Biography, Pictures & Sub-Stories)</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
                  <div className="md:col-span-1 flex flex-col items-center justify-center bg-gray-50 border p-2 rounded-xl">
                    <img 
                      src={aboutImage} 
                      alt="About Preview" 
                      className="max-h-[85px] w-full object-cover rounded-md"
                      referrerPolicy="no-referrer"
                    />
                    <span className="text-[9px] text-muted font-mono mt-1">Section image</span>
                  </div>
                  
                  <div className="md:col-span-3 grid grid-cols-1 gap-3">
                    <div className="space-y-1">
                      <label className="block text-xs font-mono font-bold text-charcoal">Main Landscape Photo Link (Direct URL)</label>
                      <input
                        type="url"
                        name="aboutImage"
                        defaultValue={aboutImage}
                        className="w-full px-3 py-2 border rounded-lg text-xs font-mono bg-cream focus:outline-none"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="block text-xs font-mono font-bold text-charcoal">Photo Inlay Caption Text</label>
                        <input
                          type="text"
                          name="aboutCaption"
                          defaultValue={aboutCaption}
                          className="w-full px-3 py-2 border rounded-lg text-xs bg-cream focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="block text-xs font-mono font-bold text-charcoal">Section Heading</label>
                        <input
                          type="text"
                          name="aboutHeadline"
                          defaultValue={aboutHeadline}
                          className="w-full px-3 py-2 border rounded-lg text-xs bg-cream focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 pt-1">
                  <div className="space-y-1">
                    <label className="block text-xs font-mono font-bold text-[#242220]">Biography Primary Story Segment (Paragraph 1)</label>
                    <textarea
                      name="aboutParagraph1"
                      defaultValue={aboutParagraph1}
                      rows={2}
                      className="w-full p-2.5 border rounded-lg text-xs bg-cream/50 focus:outline-none leading-relaxed"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-xs font-mono font-bold text-[#242220]">Biography Primary Story Segment (Paragraph 2)</label>
                    <textarea
                      name="aboutParagraph2"
                      defaultValue={aboutParagraph2}
                      rows={2}
                      className="w-full p-2.5 border rounded-lg text-xs bg-cream/50 focus:outline-none leading-relaxed"
                    />
                  </div>
                </div>

                <p className="text-[10px] uppercase font-mono font-bold text-bronze pb-1 border-b border-dashed border-bronze/20 pt-2">
                  "Know Our Story" Expandable Box:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="block text-xs font-mono font-bold text-charcoal">Expandable Box Story Title</label>
                    <input
                      type="text"
                      name="aboutStoryTitle"
                      defaultValue={aboutStoryTitle}
                      className="w-full px-3 py-2 border rounded-lg text-xs bg-cream focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono font-bold text-charcoal">Footer Tags / Bullets (Comma-separated)</label>
                    <input
                      type="text"
                      name="aboutStoryTags"
                      defaultValue={aboutStoryTags}
                      placeholder="e.g. 🎓 Global syllabus, 🍃 Eco classrooms"
                      className="w-full px-3 py-2 border rounded-lg text-xs bg-cream focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-mono font-bold text-charcoal">Expandable Box Long Narrative Content</label>
                  <textarea
                    name="aboutStoryContent"
                    defaultValue={aboutStoryContent}
                    rows={3}
                    className="w-full p-2.5 border rounded-lg text-xs bg-cream/50 focus:outline-none leading-relaxed"
                  />
                </div>
              </div>

              {/* Leader Bio Section */}
              <div className="space-y-4 pt-2">
                <h3 className="font-display font-bold text-sm text-[#0E2138] flex items-center gap-2 border-b border-gray-100 pb-2">
                  <span className="px-2 py-0.5 bg-bronze/10 text-bronze rounded text-xs">4</span>
                  <span>Founder Profile Settings</span>
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
                  <div className="md:col-span-1 flex flex-col items-center justify-center bg-gray-50 border p-2 rounded-xl">
                    <img 
                      src={founderInfo.imageUrl} 
                      alt="Founder Preview" 
                      className="max-h-[90px] w-full object-cover rounded-md"
                      referrerPolicy="no-referrer"
                    />
                    <span className="text-[9px] text-muted font-mono mt-1">Founder photo</span>
                  </div>
                  <div className="md:col-span-3 grid grid-cols-1 gap-3">
                    <div className="space-y-1">
                      <label className="block text-xs font-mono font-bold text-charcoal">Founder Full Name</label>
                      <input
                        type="text"
                        name="founderName"
                        defaultValue={founderInfo.name}
                        className="w-full px-3 py-2 border rounded-lg text-xs bg-cream focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-xs font-mono font-bold text-charcoal">Founder Designation / Role</label>
                      <input
                        type="text"
                        name="founderRole"
                        defaultValue={founderInfo.role}
                        className="w-full px-3 py-2 border rounded-lg text-xs bg-cream focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-xs font-mono font-bold text-charcoal">Portrait Image Link (Direct URL)</label>
                      <input
                        type="url"
                        name="founderImg"
                        defaultValue={founderInfo.imageUrl}
                        className="w-full px-3 py-2 border rounded-lg text-xs font-mono bg-cream focus:outline-none focus:ring-1 focus:ring-bronze"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2.5 pt-2">
                  <div className="space-y-1">
                    <label className="block text-xs font-mono font-bold text-ash">Biography Paragraph 1</label>
                    <textarea
                      name="founderBio1"
                      defaultValue={founderInfo.bioLines[0]}
                      rows={2}
                      className="w-full p-2.5 border rounded-lg text-xs bg-cream/50 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-xs font-mono font-bold text-ash">Biography Paragraph 2</label>
                    <textarea
                      name="founderBio2"
                      defaultValue={founderInfo.bioLines[1]}
                      rows={2}
                      className="w-full p-2.5 border rounded-lg text-xs bg-cream/50 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Form trigger submission */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between select-none">
                <button
                  type="button"
                  onClick={() => setConfirmState({
                    msg: "Are you sure you want to reset all custom images and text back to their original defaults?",
                    onConfirm: () => {
                      resetToDefaults();
                      triggerNotify("All settings successfully restored to site defaults!");
                    }
                  })}
                  className="px-4 py-2 border border-rose-200 text-rose-700 font-mono text-[10px] font-bold uppercase rounded-lg hover:bg-rose-50 flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset All to Default</span>
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#0E2138] text-white hover:bg-indigo-950 rounded-lg text-xs font-bold font-mono uppercase tracking-wide shadow transition-colors"
                >
                  Save Everything
                </button>
              </div>

            </form>
          )}

          {/* TAB: PILLARS & STATS */}
          {activeTab === 'pillars' && (
            <form onSubmit={handleSavePillarsAndStats} className="space-y-8">
              
              {/* Pillars list */}
              <div className="space-y-4">
                <div className="border-b pb-2 flex justify-between items-center">
                  <h3 className="font-display font-extrabold text-sm text-charcoal uppercase tracking-wider flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-bronze" />
                    <span>Four Core Value Pillars Cards</span>
                  </h3>
                  <span className="text-[10px] font-mono text-muted uppercase">Homepage top segment</span>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {valuePillars.map((pillar, idx) => (
                    <div key={pillar.id || idx} className="p-4 border border-bronze/10 rounded-xl bg-gray-50/50 space-y-3">
                      <span className="text-[10px] font-mono font-bold text-bronze block uppercase">Pillar Card #{idx + 1}</span>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="space-y-1">
                          <label className="text-[9px] font-mono font-bold uppercase">Card Title</label>
                          <input
                            type="text"
                            required
                            name={`pillar_title_${idx}`}
                            defaultValue={pillar.title}
                            className="w-full px-3 py-1.5 border rounded-lg text-xs bg-white"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] font-mono font-bold uppercase">Card Description</label>
                          <input
                            type="text"
                            required
                            name={`pillar_desc_${idx}`}
                            defaultValue={pillar.description}
                            className="w-full px-3 py-1.5 border rounded-lg text-xs bg-white"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] font-mono font-bold uppercase">Lucide Icon name *</label>
                          <input
                            type="text"
                            required
                            name={`pillar_icon_${idx}`}
                            defaultValue={pillar.iconName}
                            placeholder="e.g. Heart, BookOpen, GraduationCap"
                            className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono bg-white text-bronze font-bold"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Statistics list */}
              <div className="space-y-4">
                <div className="border-b pb-2 flex justify-between items-center">
                  <h3 className="font-display font-extrabold text-sm text-charcoal uppercase tracking-wider flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-bronze" />
                    <span>Three Impact Statistics Counters</span>
                  </h3>
                  <span className="text-[10px] font-mono text-muted uppercase">About us section bottom</span>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {statistics.map((stat, idx) => (
                    <div key={stat.id || idx} className="p-4 border border-bronze/10 rounded-xl bg-gray-50/50 space-y-3">
                      <span className="text-[10px] font-mono font-bold text-bronze block uppercase">Counter Box #{idx + 1}</span>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="space-y-1">
                          <label className="text-[9px] font-mono font-bold uppercase">Display Value / Number</label>
                          <input
                            type="text"
                            required
                            name={`stat_value_${idx}`}
                            defaultValue={stat.value}
                            className="w-full px-3 py-1.5 border rounded-lg text-xs bg-white text-bronze font-bold font-mono"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] font-mono font-bold uppercase">Text Label / Name</label>
                          <input
                            type="text"
                            required
                            name={`stat_label_${idx}`}
                            defaultValue={stat.label}
                            className="w-full px-3 py-1.5 border rounded-lg text-xs bg-white"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] font-mono font-bold uppercase">Lucide Icon name *</label>
                          <input
                            type="text"
                            required
                            name={`stat_icon_${idx}`}
                            defaultValue={stat.iconName}
                            placeholder="e.g. Award, Building2, Smile"
                            className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono bg-white"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer Save Row */}
              <div className="pt-4 border-t border-gray-100 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#0E2138] text-white hover:bg-slate-900 rounded-lg text-xs font-bold font-mono uppercase tracking-wide"
                >
                  Save Pillars & Statistics
                </button>
              </div>

            </form>
          )}

          {/* TAB 2: INITIATIVES ADMIN SETTING */}
          {activeTab === 'initiatives' && (
            <div className="space-y-8">
              
              {/* CATEGORIES / TABS MANAGER FOR INITIATIVES */}
              <div className="p-5 border border-bronze/10 rounded-xl bg-gray-50/50 space-y-4">
                <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-bronze uppercase">
                  <Tag className="w-4 h-4 text-bronze" />
                  <span>Initiatives Filter Tab Manager</span>
                </div>
                
                <p className="text-xs text-muted leading-relaxed">
                  The labels below will render as interactive classification tabs in your programs UI section. Visitors can use these tabs to filter academic campaigns dynamically.
                </p>

                {/* Display Lists of categories with remove button */}
                <div className="flex flex-wrap gap-2 pt-1 select-none">
                  {initiativeCategories.map((cat) => (
                    <span 
                      key={cat} 
                      className="inline-flex items-center gap-1 bg-white border border-bronze/20 text-charcoal px-2.5 py-1 text-xs rounded-full font-mono shadow-sm"
                    >
                      <span>{cat}</span>
                      <button 
                        type="button" 
                        onClick={() => handleDeleteInitiativeCategory(cat)}
                        className="text-rose-500 hover:text-rose-700 ml-1 font-bold font-sans text-xs hover:bg-rose-50 rounded-full w-4 h-4 flex items-center justify-center transition-colors"
                        title={`Remove tab: ${cat}`}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                  {initiativeCategories.length === 0 && (
                    <span className="text-xs text-muted font-mono italic">No dynamic tabs added. Every item is shown under "All".</span>
                  )}
                </div>

                {/* Insert Category Form */}
                <form onSubmit={handleAddInitiativeCategory} className="flex gap-2 max-w-sm pt-2">
                  <input
                    type="text"
                    required
                    placeholder="e.g. Fellowships..."
                    value={newInitCat}
                    onChange={(e) => setNewInitCat(e.target.value)}
                    className="flex-1 px-3 py-1.5 border rounded-lg text-xs focus:ring-1 focus:ring-bronze bg-white"
                  />
                  <button
                    type="submit"
                    className="p-1.5 px-3 bg-[#0E2138] hover:bg-slate-900 border text-white rounded-lg text-xs font-bold font-mono uppercase flex items-center gap-1 transition-all"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Tab</span>
                  </button>
                </form>
              </div>

              {/* PROGRAM ITEMS */}
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b pb-3 select-none">
                  <h3 className="font-display font-extrabold text-sm text-charcoal uppercase tracking-wide">
                    Active Program Initiatives ({initiatives.length})
                  </h3>
                  <button
                    type="button"
                    onClick={handleAddInitiative}
                    className="p-2 px-3 bg-bronze hover:bg-bronze-dark border border-bronze/10 text-white rounded-lg text-xs font-bold font-mono uppercase flex items-center gap-1 shadow-sm transition-all animate-pulse"
                  >
                    <Plus className="w-4 h-4 text-white" />
                    <span>Add Dynamic Campaign</span>
                  </button>
                </div>

                {initiatives.map((item, idx) => (
                  <div key={item.id} className="p-4 border border-bronze/10 bg-[#FAF9F5]/40 rounded-xl space-y-4">
                    <div className="flex h-5 border-b border-gray-200/60 pb-2 items-center justify-between">
                      <span className="font-mono text-xs font-bold text-bronze uppercase">CAMPAIGN AREA #{idx + 1}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-bold font-mono text-muted uppercase bg-white border px-1.5 py-0.5 rounded">
                          {item.id.length > 15 ? `${item.id.slice(0, 15)}...` : item.id}
                        </span>
                        
                        <button
                          type="button"
                          onClick={() => handleDeleteInitiative(item.id, item.title)}
                          className="p-1 px-2 text-rose-600 hover:text-rose-800 hover:bg-rose-50 border border-rose-100 rounded text-[10px] font-mono font-bold flex items-center gap-0.5 transition-colors"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      
                      {/* Image Preview */}
                      <div className="md:col-span-1">
                        <img 
                          src={item.imageUrl} 
                          alt={item.title} 
                          className="aspect-[4/3] w-full object-cover rounded-lg border bg-cream-dark shadow-inner"
                          referrerPolicy="no-referrer"
                        />
                        <span className="text-[9px] text-muted text-center block mt-1 font-mono">Image Preview</span>
                      </div>

                      {/* Input fields */}
                      <div className="md:col-span-3 space-y-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <label className="block text-[10px] font-mono font-bold text-charcoal uppercase">Title</label>
                            <input
                              type="text"
                              value={item.title}
                              onChange={(e) => handleInitiativeChange(idx, 'title', e.target.value)}
                              className="w-full px-3 py-1.5 border rounded-lg text-xs focus:outline-none bg-white"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="block text-[10px] font-mono font-bold text-charcoal uppercase">Category Tab / Class Match *</label>
                            <select
                              value={item.category || ''}
                              onChange={(e) => handleInitiativeChange(idx, 'category', e.target.value)}
                              className="w-full px-3 py-1.5 border rounded-lg text-xs focus:outline-none bg-white font-medium"
                            >
                              <option value="">Uncategorized</option>
                              {initiativeCategories.map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <label className="block text-[10px] font-mono font-bold text-charcoal uppercase">Image Address Link</label>
                            <input
                              type="url"
                              value={item.imageUrl}
                              onChange={(e) => handleInitiativeChange(idx, 'imageUrl', e.target.value)}
                              className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono focus:outline-none bg-white"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="block text-[10px] font-mono font-bold text-charcoal uppercase">Brief Caption Description</label>
                            <input
                              type="text"
                              value={item.description}
                              onChange={(e) => handleInitiativeChange(idx, 'description', e.target.value)}
                              className="w-full px-3 py-1.5 border rounded-lg text-xs focus:outline-none bg-white"
                            />
                          </div>
                        </div>

                        {/* Extra Expandable Detailed Attributes */}
                        <div className="pt-2 border-t border-dashed border-gray-200 space-y-2">
                          <span className="text-[9px] uppercase font-mono font-bold text-bronze block">Dynamic Detail Overrides (Inline Learn More):</span>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            <div className="space-y-1">
                              <label className="text-[8px] font-mono font-bold text-muted uppercase">Scope Focus Description</label>
                              <textarea
                                value={item.focus || ''}
                                onChange={(e) => handleInitiativeChange(idx, 'focus', e.target.value)}
                                rows={2}
                                placeholder="e.g. Secondary student sponsorships including tuition..."
                                className="w-full p-2 border rounded text-xs bg-white"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[8px] font-mono font-bold text-muted uppercase">Key Achievements / Metrics Stat</label>
                              <input
                                type="text"
                                value={item.metrics || ''}
                                onChange={(e) => handleInitiativeChange(idx, 'metrics', e.target.value)}
                                placeholder="e.g. Over 820+ rural girl scholars fully sponsored..."
                                className="w-full px-2 py-1 border rounded text-xs bg-white text-bronze font-mono font-bold"
                              />
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label className="text-[8px] font-mono font-bold text-muted uppercase">In-depth summary explanation paragraph</label>
                            <textarea
                              value={item.summary || ''}
                              onChange={(e) => handleInitiativeChange(idx, 'summary', e.target.value)}
                              rows={2}
                              placeholder="Describe the long-term impact on rural classroom stability..."
                              className="w-full p-2 border rounded text-xs bg-white"
                            />
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* TAB 3: DYNAMIC PHOTO GALLERY CHRONICLES */}
          {activeTab === 'gallery' && (
            <div className="space-y-6">
              
              {/* GALLERY ALBUM WRITER / ALBUM FOLDERS */}
              {!selectedFolderId ? (
                <div className="space-y-6">
                  
                  {/* ALBUMS TABS AND LABELS MANAGER */}
                  <div className="p-5 border border-bronze/10 rounded-xl bg-gray-50/50 space-y-4">
                    <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-bronze uppercase">
                      <Tag className="w-4 h-4 text-bronze" />
                      <span>Gallery Filter Tab Manager</span>
                    </div>
                    
                    <p className="text-xs text-muted leading-relaxed">
                      Add dynamic categories to sort photo albums on the main trust page. Selecting matching tags maps albums into tabs beautifully!
                    </p>

                    {/* Display Lists of gallery categories */}
                    <div className="flex flex-wrap gap-2 pt-1 select-none">
                      {galleryCategories.map((cat) => (
                        <span 
                          key={cat} 
                          className="inline-flex items-center gap-1 bg-white border border-bronze/20 text-charcoal px-2.5 py-1 text-xs rounded-full font-mono shadow-sm"
                        >
                          <span>{cat}</span>
                          <button 
                            type="button" 
                            onClick={() => handleDeleteGalleryCategory(cat)}
                            className="text-rose-500 hover:text-rose-700 ml-1 font-bold font-sans text-xs hover:bg-rose-50 rounded-full w-4 h-4 flex items-center justify-center transition-colors"
                            title={`Remove tab: ${cat}`}
                          >
                            ×
                          </button>
                        </span>
                      ))}
                      {galleryCategories.length === 0 && (
                        <span className="text-xs text-muted font-mono italic">No dynamic tabs added. Every album is shown in "All".</span>
                      )}
                    </div>

                    {/* Insert Gallery Tab */}
                    <form onSubmit={handleAddGalleryCategory} className="flex gap-2 max-w-sm pt-2">
                      <input
                        type="text"
                        required
                        placeholder="e.g. Inaugurations..."
                        value={newGallCat}
                        onChange={(e) => setNewGallCat(e.target.value)}
                        className="flex-1 px-3 py-1.5 border rounded-lg text-xs focus:ring-1 focus:ring-bronze bg-white"
                      />
                      <button
                        type="submit"
                        className="p-1.5 px-3 bg-[#0E2138] hover:bg-slate-900 border text-white rounded-lg text-xs font-bold font-mono uppercase flex items-center gap-1 transition-all"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Tab</span>
                      </button>
                    </form>
                  </div>

                  {/* Creation Form controller */}
                  <div className="flex items-center justify-between border-b pb-3 select-none">
                    <h3 className="font-display font-extrabold text-sm text-charcoal uppercase tracking-wide">
                      Currently Active Albums ({galleryFolders.length})
                    </h3>
                    {!showNewFolderForm && (
                      <button
                        onClick={() => setShowNewFolderForm(true)}
                        className="p-2 px-3 bg-[#0E2138] hover:bg-slate-900 border border-bronze/10 text-white rounded-lg text-xs font-bold font-mono uppercase flex items-center gap-1 shadow-sm transition-all"
                      >
                        <FolderPlus className="w-4 h-4 text-bronze" />
                        <span>Create Album</span>
                      </button>
                    )}
                  </div>

                  {/* Album creation dialog card inside tab */}
                  {showNewFolderForm && (
                    <form onSubmit={handleCreateFolder} className="p-5 border border-bronze/20 bg-cream-card/50 rounded-xl space-y-4 animate-fade-in">
                      <div className="flex justify-between items-center border-b pb-2">
                        <h4 className="font-sans font-bold text-xs text-bronze uppercase font-mono">Create New Gallery Album</h4>
                        <button 
                          type="button" 
                          onClick={() => setShowNewFolderForm(false)} 
                          className="text-muted hover:text-charcoal leading-none"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="block text-[10px] font-mono font-bold uppercase">Album Title Name *</label>
                          <input 
                            type="text" 
                            required 
                            placeholder="e.g. Bodhi Smart Class Inauguration" 
                            value={newFolderName}
                            onChange={(e) => setNewFolderName(e.target.value)}
                            className="w-full p-2 border rounded-lg text-xs bg-white focus:outline-none focus:ring-1 focus:ring-bronze"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="block text-[10px] font-mono font-bold uppercase">Tab Sort Category *</label>
                          <select 
                            required
                            value={newFolderCat}
                            onChange={(e) => setNewFolderCat(e.target.value)}
                            className="w-full p-2 border rounded-lg text-xs bg-white font-medium focus:outline-none"
                          >
                            <option value="">Choose sorting class...</option>
                            {galleryCategories.map((c) => (
                              <option key={c} value={c}>{c}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="space-y-1">
                          <label className="block text-[10px] font-mono font-bold uppercase">Date of Event</label>
                          <input 
                            type="text" 
                            placeholder="e.g. May 24, 2026" 
                            value={newFolderDate}
                            onChange={(e) => setNewFolderDate(e.target.value)}
                            className="w-full p-2 border rounded-lg text-xs bg-white focus:outline-none"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="block text-[10px] font-mono font-bold uppercase">Location of Event</label>
                          <input 
                            type="text" 
                            placeholder="e.g. Village Public School, Bodhi Nagar" 
                            value={newFolderLocation}
                            onChange={(e) => setNewFolderLocation(e.target.value)}
                            className="w-full p-2 border rounded-lg text-xs bg-white focus:outline-none"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="block text-[10px] font-mono font-bold uppercase">Cover Image Portrait (Direct link)</label>
                          <input 
                            type="url" 
                            placeholder="https://images.unsplash.com/..." 
                            value={newFolderCover}
                            onChange={(e) => setNewFolderCover(e.target.value)}
                            className="w-full p-2 border rounded-lg text-xs font-mono bg-white focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[10px] font-mono font-bold uppercase">Paragraph Summary of Event Activity</label>
                        <textarea 
                          rows={2}
                          placeholder="Brief description of kids or training activities..." 
                          value={newFolderDesc}
                          onChange={(e) => setNewFolderDesc(e.target.value)}
                          className="w-full p-2 border rounded-lg text-xs bg-white focus:outline-none font-medium"
                        />
                      </div>

                      <div className="flex gap-2 justify-end pt-1">
                        <button 
                          type="button" 
                          onClick={() => setShowNewFolderForm(false)}
                          className="px-4 py-1.5 border hover:bg-gray-100 rounded text-xs select-none"
                        >
                          Cancel
                        </button>
                        <button 
                          type="submit"
                          className="px-5 py-1.5 bg-bronze hover:bg-bronze-dark text-white rounded text-xs select-none font-mono font-bold"
                        >
                          Generate Album Folder
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Albums Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {galleryFolders.map((folder) => (
                      <div 
                        key={folder.id}
                        className="group border border-bronze/12 bg-[#FAF9F5]/40 rounded-2xl overflow-hidden shadow-xs hover:shadow-md hover:border-bronze-light transition-all flex flex-col justify-between"
                      >
                        <div className="relative h-36 bg-cream-dark">
                          <img
                            src={folder.coverImage}
                            alt={folder.name}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute top-3 left-3 flex gap-1.5 items-center">
                            <span className="px-2.5 py-0.5 bg-white/90 backdrop-blur-xs text-[9px] font-mono uppercase tracking-wider text-bronze font-bold rounded-full border border-bronze/10">
                              {folder.category || "Unmapped"}
                            </span>
                            <span className="px-2 py-0.5 bg-[#0E2138]/90 text-white text-[9px] font-mono rounded-full font-bold">
                              {folder.photos.length} photos
                            </span>
                          </div>

                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                          <h4 className="absolute bottom-3 left-3 right-3 text-white font-display font-bold text-sm leading-tight line-clamp-1 truncate select-none">
                            {folder.name}
                          </h4>
                        </div>

                        <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                          <p className="text-[11px] text-muted leading-relaxed line-clamp-2">
                            {folder.description}
                          </p>

                          <div className="flex items-center justify-between pt-1 border-t border-gray-100 font-mono text-[10px]">
                            <span className="text-muted/80">{folder.date}</span>
                            <div className="flex gap-2">
                              <button
                                type="button"
                                onClick={() => handleDeleteFolder(folder.id)}
                                className="p-1 text-rose-600 hover:text-white hover:bg-rose-600 rounded flex items-center gap-0.5 border border-rose-100"
                                title="Delete entire album folder"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => setSelectedFolderId(folder.id)}
                                className="p-1 px-2.5 bg-[#0E2138] text-white rounded font-bold hover:bg-slate-900 flex items-center gap-1 shadow-sm uppercase tracking-wide"
                              >
                                <span>Manage Photos</span>
                                <ChevronRight className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              ) : (
                
                // SINGLE ALBUM PHOTO WRITER SUB-SCREEN
                <div className="space-y-6 animate-fade-in">
                  
                  {/* Header info bar */}
                  <div className="p-4 bg-cream/70 rounded-xl border border-bronze/10 flex items-center justify-between select-none">
                    <div className="space-y-1">
                      <span className="text-[9px] font-mono uppercase tracking-widest text-bronze font-bold">Photo Management Station</span>
                      <h3 className="font-display font-extrabold text-charcoal text-sm">
                        Album: <span className="text-bronze font-normal">"{activeFolder?.name}"</span>
                      </h3>
                    </div>
                    <button
                      onClick={() => setSelectedFolderId(null)}
                      className="p-1.5 px-3 bg-white hover:bg-slate-50 border border-bronze/12 text-charcoal rounded-lg text-xs font-mono font-bold uppercase flex items-center gap-0.5"
                    >
                      <span>Back to Albums</span>
                    </button>
                  </div>

                  {/* Album Header Details Overwrites */}
                  {activeFolder && (
                    <div className="p-4 border border-teal-100 rounded-xl bg-teal-50/10 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[9px] font-mono font-semibold uppercase text-teal-800">Album Name</label>
                        <input 
                          type="text" 
                          value={activeFolder.name} 
                          onChange={(e) => handleUpdateFolderMeta(activeFolder.id, 'name', e.target.value)}
                          className="w-full p-2 border rounded-lg text-xs bg-white focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-mono font-semibold uppercase text-teal-800">Sorting Tab Class Category</label>
                        <select 
                          value={activeFolder.category || ''} 
                          onChange={(e) => handleUpdateFolderMeta(activeFolder.id, 'category', e.target.value)}
                          className="w-full p-2 border rounded-lg text-xs bg-white font-medium"
                        >
                          <option value="">Uncategorized</option>
                          {galleryCategories.map((c) => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}

                  {/* Photo insertion controller */}
                  <div className="p-5 border border-bronze/15 bg-[#FAF9F5]/40 rounded-2xl space-y-3">
                    <div className="flex items-center gap-1 font-mono text-xs font-bold text-bronze uppercase">
                      <Plus className="w-4 h-4 text-bronze" />
                      <span>Attach Photo to Album</span>
                    </div>

                    <form onSubmit={handleAddPhoto} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
                      <div className="sm:col-span-5 space-y-1">
                        <label className="block text-[9px] font-mono uppercase font-bold text-muted">Direct Image Link *</label>
                        <input 
                          type="url" 
                          required 
                          placeholder="Paste PNG/JPG web url address..." 
                          value={newPhotoUrl}
                          onChange={(e) => setNewPhotoUrl(e.target.value)}
                          className="w-full p-2 border rounded-lg text-xs font-mono bg-white focus:outline-none"
                        />
                      </div>
                      <div className="sm:col-span-5 space-y-1">
                        <label className="block text-[9px] font-mono uppercase font-bold text-muted">Short caption overlay</label>
                        <input 
                          type="text" 
                          placeholder="e.g. Classroom tablet training." 
                          value={newPhotoCaption}
                          onChange={(e) => setNewPhotoCaption(e.target.value)}
                          className="w-full p-2 border rounded-lg text-xs bg-white focus:outline-none"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <button 
                          type="submit"
                          className="w-full py-2 bg-bronze hover:bg-bronze-dark text-white rounded-lg text-xs font-mono font-bold uppercase transition-all shadow-sm"
                        >
                          Upload
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* Photos Grid listing */}
                  <div className="space-y-3">
                    <h4 className="font-sans font-bold text-xs text-charcoal uppercase tracking-wider select-none">
                      Uploaded Photos list ({activeFolder?.photos.length || 0})
                    </h4>

                    {activeFolder && activeFolder.photos.length === 0 && (
                      <div className="p-8 text-center text-xs text-muted font-mono italic border border-dashed rounded-xl">
                        No photos uploaded to this album folder yet. Add photo links above to populate.
                      </div>
                    )}

                    {activeFolder && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {activeFolder.photos.map((photo, idx) => (
                          <div 
                            key={idx} 
                            className="group border border-bronze/10 rounded-xl overflow-hidden bg-white shadow-2xs hover:border-bronze-light transition-all flex flex-col justify-between"
                          >
                            <div className="h-32 bg-gray-50 relative overflow-hidden">
                              <img 
                                src={photo.url} 
                                alt={photo.caption} 
                                className="w-full h-full object-cover"
                                referrerPolicy="no-referrer"
                              />
                              <button 
                                type="button"
                                onClick={() => handleDeletePhoto(activeFolder.id, idx)}
                                className="absolute top-2 right-2 p-1.5 bg-black/50 hover:bg-rose-600 hover:text-white text-rose-300 rounded-full transition-all"
                                title="Remove photo"
                              >
                                <Trash2 className="w-3.5 h-3.5 border-solid" />
                              </button>
                            </div>
                            <div className="p-2 space-y-1.5 flex-1 flex flex-col justify-between bg-white border-t">
                              <span className="block text-[8px] font-mono text-muted uppercase">Image index #{idx + 1}</span>
                              <input 
                                type="text"
                                value={photo.caption}
                                onChange={(e) => handleUpdatePhotoCaption(activeFolder.id, idx, e.target.value)}
                                placeholder="Caption description..."
                                className="w-full p-1 border rounded text-[11px] focus:outline-none bg-white text-charcoal font-sans"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                </div>
              )}

            </div>
          )}

          {/* TAB: NEWS Bulletins */}
          {activeTab === 'news' && (
            <div className="space-y-6">
              
              <div className="flex items-center justify-between border-b pb-3 select-none">
                <h3 className="font-display font-extrabold text-sm text-charcoal uppercase tracking-wide">
                  Historical Announcements & Journals ({newsList.length})
                </h3>
                <button
                  type="button"
                  onClick={handleAddNewBulletin}
                  className="p-2 px-3.5 bg-[#0E2138] hover:bg-indigo-950 text-white rounded-lg text-xs font-bold font-mono uppercase flex items-center gap-1.5 transition-all shadow-sm"
                >
                  <Plus className="w-4 h-4 text-bronze" />
                  <span>Publish New Update</span>
                </button>
              </div>

              {/* Bulletins grid list */}
              <div className="space-y-4">
                {newsList.map((story) => {
                  const isEditing = editingNewsId === story.id;
                  return (
                    <div key={story.id} className="p-5 border border-bronze/12 bg-[#FAF9F5]/40 rounded-2xl space-y-4 shadow-2xs">
                      
                      {/* Grid card summary header */}
                      <div className="flex items-center justify-between border-b border-gray-100 pb-2 select-none">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 bg-bronze/10 text-bronze font-mono font-black rounded text-[9px] uppercase">
                            {story.tag}
                          </span>
                          <span className="text-xs font-mono text-muted">{story.date}</span>
                        </div>

                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => handleDeleteBulletinItem(story.id, story.title)}
                            className="p-1 px-2 border border-rose-100 rounded text-[10px] text-rose-600 font-mono font-bold hover:bg-rose-50 flex items-center gap-0.5"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Remove</span>
                          </button>
                          
                          {!isEditing ? (
                            <button
                              type="button"
                              onClick={() => setEditingNewsId(story.id)}
                              className="p-1 px-3 bg-[#0E2138] hover:bg-indigo-950 text-white rounded text-[10px] font-mono font-bold flex items-center gap-0.5"
                            >
                              <Edit3 className="w-3.5 h-3.5 text-bronze" />
                              <span>Edit Article Content</span>
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setEditingNewsId(null)}
                              className="p-1 px-3 border rounded text-[10px] font-mono font-bold font-charcoal"
                            >
                              Collapse Editor
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Editing View */}
                      {isEditing ? (
                        <form onSubmit={(e) => handleSaveBulletinForm(e, story.id)} className="space-y-4 animate-fade-in bg-white p-4 border border-bronze/5 rounded-xl">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <div className="space-y-1">
                              <label className="text-[9px] font-mono font-bold uppercase">Article Title Heading</label>
                              <input
                                type="text"
                                required
                                name="title"
                                defaultValue={story.title}
                                className="w-full px-2.5 py-1.5 border rounded text-xs bg-white"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[9px] font-mono font-bold uppercase font-sans">Bulletin Tag / Category</label>
                              <input
                                type="text"
                                required
                                name="tag"
                                defaultValue={story.tag}
                                className="w-full px-2.5 py-1.5 border rounded text-xs bg-white"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[9px] font-mono font-bold uppercase">Publish Date</label>
                              <input
                                type="text"
                                required
                                name="date"
                                defaultValue={story.date}
                                className="w-full px-2.5 py-1.5 border rounded text-xs bg-white font-mono"
                              />
                            </div>
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-[9px] font-mono font-bold uppercase">Illustration/Cover Image Link (Direct URL)</label>
                            <input
                              type="url"
                              required
                              name="image"
                              defaultValue={story.image}
                              className="w-full px-2.5 py-1.5 border rounded text-xs font-mono bg-white"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-[9px] font-mono font-bold uppercase block">Brief Card Summary (displays in preview card)</label>
                            <textarea
                              required
                              name="summary"
                              defaultValue={story.summary}
                              rows={2}
                              className="w-full p-2 border rounded text-xs bg-white"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-[9px] font-mono font-bold uppercase block">In-Depth Article Body Content (supports multiple lines for popup modal)</label>
                            <textarea
                              required
                              name="content"
                              defaultValue={story.content || story.summary}
                              rows={5}
                              className="w-full p-2 border rounded text-xs bg-white leading-relaxed text-charcoal/95"
                            />
                          </div>

                          <div className="flex gap-2 justify-end select-none">
                            <button
                              type="button"
                              onClick={() => setEditingNewsId(null)}
                              className="px-4 py-1.5 border rounded text-xs"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="px-5 py-1.5 bg-bronze hover:bg-bronze-dark text-white rounded text-xs font-mono font-bold"
                            >
                              Save Bulletin
                            </button>
                          </div>
                        </form>
                      ) : (
                        // Static View
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          <img 
                            src={story.image} 
                            alt={story.title} 
                            className="md:col-span-1 h-20 w-full object-cover rounded-lg border bg-cream-dark"
                            referrerPolicy="no-referrer"
                          />
                          <div className="md:col-span-3 space-y-1.5 text-left">
                            <h4 className="font-display font-bold text-[#0E2138] text-sm leading-snug">{story.title}</h4>
                            <p className="text-xs text-muted leading-relaxed line-clamp-2">{story.summary}</p>
                          </div>
                        </div>
                      )}

                    </div>
                  );
                })}
              </div>

            </div>
          )}

          {/* TAB: SECRETARIAT CONTACT FIELDS */}
          {activeTab === 'contact' && (
            <form onSubmit={handleSaveContactForm} className="space-y-6">
              
              <div className="border-b pb-2">
                <h3 className="font-display font-extrabold text-sm text-charcoal uppercase tracking-wider flex items-center gap-2">
                  <Mail className="w-4 h-4 text-bronze" />
                  <span>Office Address, Telephone, Operational Hour Specs</span>
                </h3>
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="block text-xs font-mono font-bold text-charcoal uppercase">Registered Trust Secretariat Headquarters Address</label>
                  <textarea
                    required
                    name="contactAddress"
                    defaultValue={contactAddress}
                    rows={2}
                    className="w-full px-3 py-2 border rounded-lg text-xs bg-cream focus:outline-none focus:ring-1 focus:ring-bronze"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-mono font-bold text-charcoal uppercase">Direct Telephone Line</label>
                    <input
                      type="text"
                      required
                      name="contactPhone"
                      defaultValue={contactPhone}
                      className="w-full px-3 py-2 border rounded-lg text-xs bg-cream focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-xs font-mono font-bold text-charcoal uppercase">Administrative Email Address</label>
                    <input
                      type="email"
                      required
                      name="contactEmail"
                      defaultValue={contactEmail}
                      className="w-full px-3 py-2 border rounded-lg text-xs font-mono bg-cream focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-mono font-bold text-charcoal uppercase">Office Operational Hours</label>
                    <input
                      type="text"
                      required
                      name="contactHours"
                      defaultValue={contactHours}
                      className="w-full px-3 py-2 border rounded-lg text-xs bg-cream focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-xs font-mono font-bold text-charcoal uppercase">Government Registry Registration Number</label>
                    <input
                      type="text"
                      required
                      name="contactRegNo"
                      defaultValue={contactRegNo}
                      className="w-full px-3 py-2 border rounded-lg text-xs bg-cream focus:outline-none"
                    />
                  </div>
                </div>

                {/* Geolocation Coordinate Section */}
                <div className="pt-4 mt-4 border-t border-dashed border-bronze/20 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <h4 className="text-xs font-mono font-bold text-bronze uppercase tracking-wider flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>Cooperative Geolocation Coordinates Settings</span>
                    </h4>
                    <button
                      type="button"
                      onClick={handleDetectCoordinates}
                      disabled={isDetectingLocation}
                      className="px-3 py-1.5 bg-bronze/15 hover:bg-bronze/25 active:bg-bronze/35 text-bronze disabled:bg-gray-100 disabled:text-gray-400 font-mono text-[10px] font-bold uppercase rounded-lg border border-bronze/20 transition-all flex items-center gap-1 shrink-0 cursor-pointer"
                    >
                      {isDetectingLocation ? (
                        <>
                          <span className="w-2.5 h-2.5 rounded-full border-2 border-bronze border-t-transparent animate-spin inline-block mr-1" />
                          <span>Detecting Location...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3 h-3" />
                          <span>Use My Current Location</span>
                        </>
                      )}
                    </button>
                  </div>
                  
                  <p className="text-[11px] text-muted leading-relaxed">
                    Specify the direct map coordinates for your registered secretariats/centers. The user map below is dynamic and loads a geographic navigation iframe based on these values.
                  </p>

                  {geoError && (
                    <div className="p-2 border border-rose-200 bg-rose-50 rounded-lg text-rose-800 text-[10px] font-mono leading-relaxed">
                      ⚠️ {geoError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-xs font-mono font-bold text-charcoal uppercase">Latitude Coordinate</label>
                      <input
                        type="text"
                        required
                        name="contactLatitude"
                        defaultValue={contactLatitude}
                        placeholder="e.g. 13.0042"
                        className="w-full px-3 py-2 border rounded-lg text-xs bg-cream focus:outline-none focus:ring-1 focus:ring-bronze"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-xs font-mono font-bold text-charcoal uppercase">Longitude Coordinate</label>
                      <input
                        type="text"
                        required
                        name="contactLongitude"
                        defaultValue={contactLongitude}
                        placeholder="e.g. 80.1948"
                        className="w-full px-3 py-2 border rounded-lg text-xs bg-cream focus:outline-none focus:ring-1 focus:ring-bronze"
                      />
                    </div>
                  </div>
                </div>

              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#0E2138] text-white hover:bg-indigo-950 rounded-lg text-xs font-bold font-mono uppercase tracking-wide transition-colors"
                >
                  Save Contact Information
                </button>
              </div>

            </form>
          )}

          {/* TAB 4: JSON STORAGE AND DATA CONSOLE BACKUPS */}
          {activeTab === 'backup' && (
            <div className="space-y-6">
              
              <div className="p-4 bg-indigo-50 border border-indigo-200/50 rounded-xl text-indigo-950 text-xs leading-relaxed space-y-2">
                <div className="font-bold font-mono text-[#0E2138] uppercase">Permanent Backups & Migrations:</div>
                <p>
                  Because this website saves your edits with browser-safe <strong>localStorage</strong>, clearing browser cache or changing to another laptop may revert custom modifications back to our pre-built defaults.
                </p>
                <p>
                  Use the downloader and uploader controls below to securely backup your visual assets layout as a <strong>JSON backup file</strong> to save it globally or load it on other computers!
                </p>
              </div>

              {/* Download sector */}
              <div className="p-4 border rounded-xl space-y-3 bg-gray-50/50">
                <h4 className="font-sans font-bold text-xs text-charcoal uppercase tracking-wider font-mono flex items-center gap-1.5">
                  <Download className="w-4 h-4 text-bronze" />
                  <span>Download Safe Asset Package</span>
                </h4>
                <p className="text-xs text-muted leading-relaxed">
                  Export all your current uploaded logo URLs, banner links, customized categories and albums configurations into a local portable file.
                </p>
                <button
                  onClick={handleDownloadBackup}
                  className="p-2.5 px-4 bg-[#0E2138] hover:bg-indigo-950 text-white font-mono text-xs font-bold uppercase rounded-lg shadow-sm transition-all flex items-center gap-1.5 bg-transparent text-[#0E2138] border border-[#0E2138]"
                >
                  <Download className="w-4 h-4 text-bronze" />
                  <span>Download Backup JSON</span>
                </button>
              </div>

              {/* Upload sector */}
              <div className="p-4 border rounded-xl space-y-3 bg-gray-50/50">
                <h4 className="font-sans font-bold text-xs text-charcoal uppercase tracking-wider font-mono flex items-center gap-1.5">
                  <Upload className="w-4 h-4 text-bronze" />
                  <span>Restore or Import Saved Settings</span>
                </h4>
                <p className="text-xs text-muted leading-relaxed">
                  Paste the generated Backup JSON dictionary code inside the textbox directly to recover your layouts instantly.
                </p>

                <form onSubmit={handlePasteImport} className="space-y-3">
                  <textarea
                    rows={6}
                    placeholder="Paste exported backup string array here..."
                    value={pasteConfigText}
                    onChange={(e) => setPasteConfigText(e.target.value)}
                    className="w-full text-xs font-mono p-3 border bg-cream/30 focus:outline-none rounded-lg"
                  />

                  {showPasteError && (
                    <p className="text-xs text-rose-600 font-mono font-bold select-none">
                      ⚠️ Could not parse JSON structure. Make sure you pasted the exact exported code properly.
                    </p>
                  )}

                  <div className="flex gap-2">
                    <button
                      type="submit"
                      disabled={!pasteConfigText.trim()}
                      className="px-5 py-2.5 bg-[#0E2138] text-white rounded-lg text-xs font-bold font-mono uppercase tracking-wide shadow disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed transition-colors"
                    >
                      Process Configurations
                    </button>
                  </div>
                </form>
              </div>

            </div>
          )}

        </div>

        {/* Footer info label */}
        <div className="p-4 bg-gray-100 text-center text-[10px] font-mono text-muted select-none border-t shrink-0">
          Buddha Arivu Kalanjiyam Asset Desk Console | Stable build v1.5
        </div>

      </div>

      {/* Custom Confirmation Modal popup to bypass sandbox iframe window.confirm block */}
      {confirmState && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          {/* Backdrop blur layer */}
          <div 
            className="absolute inset-0 bg-[#0E1521]/70 backdrop-blur-xs transition-opacity duration-200 animate-fade-in"
            onClick={() => setConfirmState(null)}
          />
          {/* Main Card body */}
          <div className="relative bg-white rounded-2xl p-6 max-w-sm w-full border border-bronze/10 shadow-2xl animate-scale-up space-y-4 z-20">
            <div className="space-y-2">
              <h3 className="font-display font-bold text-sm text-charcoal uppercase tracking-wider font-mono text-bronze">
                Confirm Action
              </h3>
              <p className="text-xs text-muted leading-relaxed select-none">
                {confirmState.msg}
              </p>
            </div>
            <div className="flex gap-2 justify-end pt-2 select-none font-mono text-[11px] font-bold">
              <button 
                type="button" 
                onClick={() => setConfirmState(null)}
                className="px-4 py-1.5 border border-bronze/10 rounded-lg bg-white text-muted hover:text-charcoal hover:border-bronze"
              >
                Cancel
              </button>
              <button 
                type="button" 
                onClick={() => {
                  confirmState.onConfirm();
                  setConfirmState(null);
                }}
                className="px-4 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg shadow-sm"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
