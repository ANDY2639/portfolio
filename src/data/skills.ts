import type { Category, Skill } from "../types";

export const skills: Skill[] = [
  // Frontend
  { name: "React", category: "frontend", level: "advanced" },
  { name: "TypeScript", category: "frontend", level: "advanced" },
  { name: "Tailwind CSS", category: "frontend", level: "advanced" },
  { name: "Next.js", category: "frontend", level: "intermediate" },
  { name: "Vite", category: "frontend", level: "advanced" },
  { name: "HTML5", category: "frontend", level: "advanced" },
  { name: "CSS3", category: "frontend", level: "advanced" },
  { name: "JavaScript", category: "frontend", level: "advanced" },
  { name: "Redux", category: "frontend", level: "intermediate" },

  // Backend
  { name: "Node.js", category: "backend", level: "intermediate" },
  { name: "Express", category: "backend", level: "intermediate" },
  { name: "PostgreSQL", category: "backend", level: "intermediate" },
  { name: "MongoDB", category: "backend", level: "intermediate" },
  { name: "REST API", category: "backend", level: "advanced" },
  { name: "GraphQL", category: "backend", level: "beginner" },
  { name: "Firebase", category: "backend", level: "intermediate" },

  // Tools
  { name: "Git", category: "tools", level: "advanced" },
  { name: "GitHub Actions", category: "tools", level: "intermediate" },
  { name: "Docker", category: "tools", level: "beginner" },
  { name: "VS Code", category: "tools", level: "advanced" },
  { name: "npm/pnpm", category: "tools", level: "advanced" },
  { name: "Webpack", category: "tools", level: "intermediate" },
  { name: "ESLint", category: "tools", level: "advanced" },
];

export const skillCategories: Category[] = [
  { value: "all", label: "Todas" },
  { value: "frontend", label: "Frontend" },
  { value: "backend", label: "Backend" },
  { value: "tools", label: "Herramientas" },
  { value: "other", label: "Otras" },
];
