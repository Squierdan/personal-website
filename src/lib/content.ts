import type { Locale } from "@/i18n/config";

export type Localized = Record<Locale, string>;

export type Service = {
  icon: "code" | "layout" | "server" | "smartphone" | "gauge" | "workflow";
  title: Localized;
  description: Localized;
};

export const services: Service[] = [
  {
    icon: "layout",
    title: { es: "Diseño web & UI/UX", en: "Web & UI/UX Design" },
    description: {
      es: "Interfaces limpias y accesibles diseñadas con teoría del color y enfoque en la experiencia de usuario.",
      en: "Clean, accessible interfaces designed with color theory and a focus on user experience.",
    },
  },
  {
    icon: "code",
    title: { es: "Desarrollo frontend", en: "Frontend Development" },
    description: {
      es: "Aplicaciones rápidas y dinámicas con React, Next.js y TypeScript, optimizadas para todos los dispositivos.",
      en: "Fast, dynamic applications with React, Next.js and TypeScript, optimized for every device.",
    },
  },
  {
    icon: "server",
    title: { es: "Backend & APIs", en: "Backend & APIs" },
    description: {
      es: "APIs robustas y escalables, bases de datos bien diseñadas y arquitecturas seguras en la nube.",
      en: "Robust, scalable APIs, well-designed databases and secure cloud architectures.",
    },
  },
  {
    icon: "smartphone",
    title: { es: "Aplicaciones responsivas", en: "Responsive Apps" },
    description: {
      es: "Experiencias que se ven y funcionan perfectas desde el móvil hasta pantallas de escritorio.",
      en: "Experiences that look and work perfectly from mobile to large desktop screens.",
    },
  },
  {
    icon: "gauge",
    title: { es: "Rendimiento & SEO", en: "Performance & SEO" },
    description: {
      es: "Optimización de velocidad, Core Web Vitals y posicionamiento para que tu producto destaque.",
      en: "Speed optimization, Core Web Vitals and SEO so your product stands out.",
    },
  },
  {
    icon: "workflow",
    title: { es: "Consultoría técnica", en: "Technical Consulting" },
    description: {
      es: "Asesoría en arquitectura, buenas prácticas y automatización de procesos de desarrollo.",
      en: "Guidance on architecture, best practices and development process automation.",
    },
  },
];

export type Project = {
  title: string;
  category: Localized;
  description: Localized;
  tags: string[];
  accent: string;
  repoUrl?: string;
  liveUrl?: string;
};

export const projects: Project[] = [
  {
    title: "Nimbus Analytics",
    category: { es: "Aplicación Web", en: "Web App" },
    description: {
      es: "Panel de analítica en tiempo real con visualizaciones interactivas y reportes personalizables.",
      en: "Real-time analytics dashboard with interactive visualizations and customizable reports.",
    },
    tags: ["Next.js", "TypeScript", "D3.js", "PostgreSQL"],
    accent: "#0ea5e9",
    repoUrl: "https://github.com",
    liveUrl: "https://example.com",
  },
  {
    title: "Aurora Commerce",
    category: { es: "E-commerce", en: "E-commerce" },
    description: {
      es: "Tienda online headless con pagos integrados, carrito persistente y panel de administración.",
      en: "Headless online store with integrated payments, persistent cart and admin panel.",
    },
    tags: ["React", "Node.js", "Stripe", "Tailwind"],
    accent: "#8b5cf6",
    repoUrl: "https://github.com",
    liveUrl: "https://example.com",
  },
  {
    title: "Pulse Fitness",
    category: { es: "App Móvil", en: "Mobile App" },
    description: {
      es: "Aplicación de seguimiento de entrenamientos con rutinas inteligentes y métricas de progreso.",
      en: "Workout tracking app with smart routines and progress metrics.",
    },
    tags: ["React Native", "Expo", "Firebase"],
    accent: "#10b981",
    repoUrl: "https://github.com",
    liveUrl: "https://example.com",
  },
  {
    title: "Lexica AI",
    category: { es: "Inteligencia Artificial", en: "Artificial Intelligence" },
    description: {
      es: "Asistente conversacional que resume documentos y responde preguntas con modelos de lenguaje.",
      en: "Conversational assistant that summarizes documents and answers questions with language models.",
    },
    tags: ["Python", "FastAPI", "OpenAI", "Next.js"],
    accent: "#f59e0b",
    repoUrl: "https://github.com",
    liveUrl: "https://example.com",
  },
  {
    title: "Terra Maps",
    category: { es: "Aplicación Web", en: "Web App" },
    description: {
      es: "Plataforma de geolocalización con mapas interactivos y datos abiertos en tiempo real.",
      en: "Geolocation platform with interactive maps and real-time open data.",
    },
    tags: ["Vue", "Mapbox", "Go", "Redis"],
    accent: "#14b8a6",
    repoUrl: "https://github.com",
    liveUrl: "https://example.com",
  },
  {
    title: "Cadence DevTools",
    category: { es: "Herramientas", en: "Tooling" },
    description: {
      es: "Conjunto de herramientas CLI de código abierto para automatizar flujos de trabajo de desarrollo.",
      en: "Open-source CLI toolkit to automate developer workflows.",
    },
    tags: ["Rust", "CLI", "Open Source"],
    accent: "#ef4444",
    repoUrl: "https://github.com",
  },
];

export const skills: string[] = [
  "TypeScript",
  "JavaScript",
  "React",
  "Next.js",
  "Node.js",
  "Python",
  "Tailwind CSS",
  "PostgreSQL",
  "Docker",
  "AWS",
  "Git",
  "GraphQL",
];

export const socials = {
  github: "https://github.com/Squierdan",
  linkedin: "https://www.linkedin.com/",
  email: "luiscaizapanta01@gmail.com",
};
