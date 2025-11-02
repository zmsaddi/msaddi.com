export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features?: string[];
  image?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface SEOMetadata {
  title: string;
  description: string;
  keywords?: string[];
  openGraph?: {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
  };
  twitter?: {
    title?: string;
    description?: string;
    image?: string;
  };
}

export interface NavLink {
  href: string;
  label: string;
  isExternal?: boolean;
}

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

export interface Statistic {
  value: string;
  label: string;
  suffix?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  image?: string;
  bio?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  images: string[];
  client?: string;
  year?: string;
  technologies?: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  company: string;
  position: string;
  content: string;
  rating: number;
  image?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  updatedAt?: string;
  category: string;
  tags: string[];
  image?: string;
  readTime?: number;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export type Locale = "en" | "ar" | "tr";
export type Direction = "ltr" | "rtl";