import type { Category, Project } from "../types";

export const projects: Project[] = [
  {
    id: "project-1",
    title: "E-commerce Platform",
    description:
      "Plataforma de comercio electrónico completa con carrito de compras, pasarela de pagos y panel de administración.",
    image: "https://picsum.photos/seed/ecommerce/400/300",
    technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "Stripe"],
    category: "fullstack",
    links: {
      github: "https://github.com/ANDY2639/ecommerce",
      live: "https://example.com",
    },
  },
  {
    id: "project-2",
    title: "Task Management App",
    description:
      "Aplicación de gestión de tareas con drag & drop, categorías personalizadas y sincronización en tiempo real.",
    image: "https://picsum.photos/seed/tasks/400/300",
    technologies: ["React", "Firebase", "Tailwind CSS", "DaisyUI"],
    category: "frontend",
    links: {
      github: "https://github.com/ANDY2639/tasks",
      demo: "https://example.com/demo",
    },
  },
  {
    id: "project-3",
    title: "Weather Dashboard",
    description:
      "Dashboard meteorológico con gráficos interactivos, pronóstico extendido y geolocalización.",
    image: "https://picsum.photos/seed/weather/400/300",
    technologies: ["React", "Chart.js", "OpenWeather API", "Vite"],
    category: "frontend",
    links: {
      github: "https://github.com/ANDY2639/weather",
      live: "https://example.com",
    },
  },
  {
    id: "project-4",
    title: "REST API Backend",
    description:
      "API RESTful robusta con autenticación JWT, validación de datos y documentación Swagger.",
    image: "https://picsum.photos/seed/api/400/300",
    technologies: ["Node.js", "Express", "MongoDB", "JWT", "Swagger"],
    category: "backend",
    links: {
      github: "https://github.com/ANDY2639/api",
    },
  },
  {
    id: "project-5",
    title: "Mobile Fitness Tracker",
    description:
      "Aplicación móvil para seguimiento de entrenamientos y nutrición con sincronización en la nube.",
    image: "https://picsum.photos/seed/fitness/400/300",
    technologies: ["React Native", "Expo", "Firebase", "TypeScript"],
    category: "mobile",
    links: {
      github: "https://github.com/ANDY2639/fitness",
      demo: "https://example.com/demo",
    },
  },
  {
    id: "project-6",
    title: "Real-time Chat Application",
    description:
      "Aplicación de chat en tiempo real con salas privadas, emojis personalizados y notificaciones.",
    image: "https://picsum.photos/seed/chat/400/300",
    technologies: ["React", "Socket.io", "Node.js", "Redis", "PostgreSQL"],
    category: "fullstack",
    links: {
      github: "https://github.com/ANDY2639/chat",
      live: "https://example.com",
    },
  },
];

export const categories: Category[] = [
  { value: "all", label: "Todos" },
  { value: "frontend", label: "Frontend" },
  { value: "fullstack", label: "Full Stack" },
  { value: "backend", label: "Backend" },
  { value: "mobile", label: "Mobile" },
];
