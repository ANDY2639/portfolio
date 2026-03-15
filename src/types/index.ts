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
}

export interface Skill {
  name: string;
  category: "frontend" | "backend" | "tools" | "other";
  level?: "beginner" | "intermediate" | "advanced";
}

export interface PersonalInfo {
  name: string;
  title: string;
  bio: string;
  location: string;
  email: string;
  social: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
}

export interface Category {
  value: string;
  label: string;
}
