import { NavLink, ValuePillar, StatItem, InitiativeItem, FounderInfo } from "../types";

export const NAVIGATION_LINKS: NavLink[] = [
  { id: "home", label: "Home", href: "#home" },
  { id: "about", label: "About Us", href: "#about" },
  { id: "founder", label: "Founder", href: "#founder" },
  { id: "initiatives", label: "Our Initiatives", href: "#initiatives" },
  { id: "gallery", label: "Gallery", href: "#gallery" },
  { id: "news", label: "News & Events", href: "#news" },
  { id: "contact", label: "Contact Us", href: "#contact" }
];

export const VALUE_PILLARS: ValuePillar[] = [
  {
    id: "quality-education",
    title: "Quality Education",
    description: "Promoting holistic and value-based education for every learner.",
    iconName: "GraduationCap"
  },
  {
    id: "equal-opportunity",
    title: "Equal Opportunity",
    description: "Creating inclusive learning spaces for underserved communities.",
    iconName: "Users"
  },
  {
    id: "character-building",
    title: "Character Building",
    description: "Nurturing compassion, integrity, and mindful leadership.",
    iconName: "HeartHandshake"
  },
  {
    id: "community-impact",
    title: "Community Impact",
    description: "Empowering individuals to build a better and more peaceful society.",
    iconName: "Globe"
  }
];

export const STATISTICS: StatItem[] = [
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

export const FOUNDER_INFO: FounderInfo = {
  name: "Dr. B. N. Malar Selvi",
  role: "Founder",
  imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400", // Representative elegant portrait of an Indian woman leader matching the image spacing
  bioLines: [
    "A visionary leader, educator, and humanitarian, Dr. B. N. Malar Selvi founded Buddha Arivu Kalanjiyam with the belief that education has the power to transform lives and build a compassionate society.",
    "Her commitment continues to guide our journey towards empowering minds and uplifting communities, ensuring that geographical and socioeconomic barriers never prevent a child from discovering their full potential."
  ]
};

export const INITIATIVES: InitiativeItem[] = [
  {
    id: "scholarship-program",
    title: "Scholarship Program",
    description: "Supporting bright students to pursue their dreams.",
    imageUrl: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=400", // student study
    link: "#scholarship"
  },
  {
    id: "teacher-training",
    title: "Teacher Training",
    description: "Empowering educators with skills and values.",
    imageUrl: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=400", // classroom learning
    link: "#teachers"
  },
  {
    id: "digital-learning",
    title: "Digital Learning",
    description: "Bringing technology and innovation to classrooms.",
    imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=400", // smart tablets
    link: "#digital"
  },
  {
    id: "community-outreach",
    title: "Community Outreach",
    description: "Engaging with communities for a stronger tomorrow.",
    imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=400", // learning outdoor
    link: "#outreach"
  }
];

export const FAQS = [
  {
    question: "What is the primary mission of Buddha Arivu Kalanjiyam?",
    answer: "Our mission is to achieve 'Education for All' by bridging educational divides, fostering character building and holistic values, and making premium educational tools accessible to underprivileged zones."
  },
  {
    question: "How are the donated funds utilized?",
    answer: "Every donation goes directly into student scholarships, setting up computer labs in remote schools, equipping classrooms with modern learning aids, and supporting digital literacy initiatives."
  },
  {
    question: "Can I volunteer as a teacher or mentor?",
    answer: "Yes, we have robust volunteer training and mentorship programs. Simply reach out via our contact section or the Get Involved form!"
  }
];

export const NEWS_EVENTS = [
  {
    date: "June 10, 2026",
    tag: "Education Campaign",
    title: "Launch of Digital Classrooms Initiative",
    summary: "Introducing 25 new digital school labs in remote villages to accelerate computer literacy."
  },
  {
    date: "May 28, 2026",
    tag: "Acheivement",
    title: "Arivu Gold Scholarship Award Ceremony",
    summary: "Recognized 120 outstanding students with our highest educational honors and stipends."
  },
  {
    date: "April 15, 2026",
    tag: "Community",
    title: "Uplifting Underprivileged Centers in Rural Belts",
    summary: "Reconstructed facilities and playground infrastructure for over fifteen primary educational centers."
  }
];
