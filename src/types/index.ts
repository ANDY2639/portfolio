import type { Database } from "../lib/database.types";

export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];
export type Enums<T extends keyof Database["public"]["Enums"]> = Database["public"]["Enums"][T];

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  category: "frontend" | "fullstack" | "backend" | "mobile";
  links: {
    github?: string;
    live?: string;
    demo?: string;
  };
  views_count?: number;
  is_featured?: boolean;
}

export interface Skill {
  id?: string;
  name: string;
  category: "frontend" | "backend" | "tools" | "other";
  level?: "beginner" | "intermediate" | "advanced";
  icon_url?: string;
}

export interface PersonalInfo {
  id?: string;
  name: string;
  title: string;
  bio: string;
  location: string;
  email: string;
  avatar_url?: string;
  social: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image_url?: string;
  tags: string[];
  reading_time: number;
  is_published: boolean;
  published_at?: string;
  views_count: number;
  created_at: string;
}

export interface Category {
  value: string;
  label: string;
}

export interface ContactMessage {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export interface SiteStats {
  total_visits: number;
  unique_visitors: number;
  today_visits: number;
  this_week_visits: number;
  this_month_visits: number;
}
