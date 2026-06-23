export interface NavLink {
  id: string;
  label: string;
  href: string;
}

export interface ValuePillar {
  id: string;
  title: string;
  description: string;
  iconName: string; // references lucide icon component names dynamically
}

export interface StatItem {
  id: string;
  value: string;
  label: string;
  iconName: string;
}

export interface InitiativeItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  category?: string;
  focus?: string;
  metrics?: string;
  summary?: string;
}

export interface FounderInfo {
  name: string;
  role: string;
  imageUrl: string;
  bioLines: string[];
}

export interface NewsItem {
  id: string;
  date: string;
  tag: string;
  title: string;
  summary: string;
  content?: string;
  image?: string;
}
