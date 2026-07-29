import type { Locale } from "@/i18n/config";

/**
 * ============================================================================
 *  CONTENIDO EDITABLE — SERVICIOS, PROYECTOS Y STACK
 * ============================================================================
 *  Todo lo de este archivo es placeholder. Sustitúyelo por tu información real.
 *  Cada texto es bilingüe: { es: "...", en: "..." }.
 * ============================================================================
 */

export type Localized = Record<Locale, string>;

/* -------------------------------------------------------------------------- */
/*  SERVICIOS                                                                  */
/* -------------------------------------------------------------------------- */

export type Service = {
  /** Comando ficticio que se muestra a la izquierda de la fila. */
  cmd: string;
  title: Localized;
  description: Localized;
  /** Palabras clave que se muestran al expandir la fila. */
  keywords: string[];
};

export const services: Service[] = [
  {
    cmd: "design",
    title: { es: "Diseño de producto & UI", en: "Product & UI Design" },
    description: {
      es: "Interfaces claras y accesibles, con sistemas de diseño consistentes, jerarquía tipográfica real y paletas construidas con teoría del color.",
      en: "Clear, accessible interfaces with consistent design systems, real typographic hierarchy and palettes built on colour theory.",
    },
    keywords: ["Design systems", "Figma", "Accesibilidad", "Prototipado"],
  },
  {
    cmd: "build --web",
    title: { es: "Desarrollo web moderno", en: "Modern Web Development" },
    description: {
      es: "Aplicaciones con React, Next.js y TypeScript: renderizado en servidor, streaming, rutas dinámicas y una base de código que escala con el equipo.",
      en: "Applications with React, Next.js and TypeScript: server rendering, streaming, dynamic routes and a codebase that scales with the team.",
    },
    keywords: ["Next.js", "React", "TypeScript", "Tailwind"],
  },
  {
    cmd: "build --api",
    title: { es: "Backend, APIs y datos", en: "Backend, APIs & Data" },
    description: {
      es: "APIs REST y GraphQL bien tipadas, modelado de datos relacional, autenticación, colas de trabajo y seguridad desde el diseño.",
      en: "Well-typed REST and GraphQL APIs, relational data modelling, authentication, job queues and security by design.",
    },
    keywords: ["Node.js", "Python", "PostgreSQL", "GraphQL"],
  },
  {
    cmd: "deploy",
    title: { es: "Infraestructura & DevOps", en: "Infrastructure & DevOps" },
    description: {
      es: "Contenedores, pipelines de CI/CD, entornos de previsualización, monitoreo y despliegues sin downtime en nube.",
      en: "Containers, CI/CD pipelines, preview environments, monitoring and zero-downtime cloud deployments.",
    },
    keywords: ["Docker", "GitHub Actions", "Vercel", "AWS"],
  },
  {
    cmd: "optimize",
    title: { es: "Rendimiento & SEO técnico", en: "Performance & Technical SEO" },
    description: {
      es: "Auditorías de Core Web Vitals, reducción de bundle, estrategia de caché e indexación para que el producto cargue rápido y se encuentre.",
      en: "Core Web Vitals audits, bundle reduction, caching strategy and indexing so the product loads fast and gets found.",
    },
    keywords: ["Lighthouse", "Core Web Vitals", "Caching", "Schema.org"],
  },
  {
    cmd: "advise",
    title: { es: "Consultoría técnica", en: "Technical Consulting" },
    description: {
      es: "Revisión de arquitectura, elección de stack, mentoría al equipo y planes de migración realistas para código heredado.",
      en: "Architecture review, stack selection, team mentoring and realistic migration plans for legacy code.",
    },
    keywords: ["Arquitectura", "Code review", "Mentoría", "Migraciones"],
  },
];

/* -------------------------------------------------------------------------- */
/*  PROYECTOS                                                                  */
/* -------------------------------------------------------------------------- */

/** Categorías usadas por los filtros del portafolio. */
export const projectCategories = ["web", "mobile", "ai", "oss"] as const;
export type ProjectCategory = (typeof projectCategories)[number];

export const categoryLabels: Record<ProjectCategory, Localized> = {
  web: { es: "web", en: "web" },
  mobile: { es: "móvil", en: "mobile" },
  ai: { es: "ia", en: "ai" },
  oss: { es: "open source", en: "open source" },
};

export type Project = {
  title: string;
  category: ProjectCategory;
  year: string;
  summary: Localized;
  /** Detalle que aparece al expandir la fila. */
  detail: Localized;
  stack: string[];
  repoUrl?: string;
  liveUrl?: string;
  /** Marca el proyecto como destacado (se resalta en la lista). */
  featured?: boolean;
};

export const projects: Project[] = [
  {
    title: "Nimbus Analytics",
    category: "web",
    year: "2025",
    featured: true,
    summary: {
      es: "Panel de analítica en tiempo real con visualizaciones interactivas.",
      en: "Real-time analytics dashboard with interactive visualisations.",
    },
    detail: {
      es: "Plataforma multi-tenant que procesa eventos en streaming y los presenta en dashboards configurables. Incluye control de acceso por roles, exportación programada de reportes y un motor de consultas con caché por capas.",
      en: "Multi-tenant platform that processes streaming events and renders them in configurable dashboards. Includes role-based access control, scheduled report exports and a layered-cache query engine.",
    },
    stack: ["Next.js", "TypeScript", "D3.js", "PostgreSQL", "Redis"],
    repoUrl: "https://github.com/Squierdan",
    liveUrl: "https://example.com",
  },
  {
    title: "Aurora Commerce",
    category: "web",
    year: "2025",
    featured: true,
    summary: {
      es: "Tienda headless con pagos, carrito persistente y panel de administración.",
      en: "Headless storefront with payments, persistent cart and admin panel.",
    },
    detail: {
      es: "Comercio electrónico desacoplado del CMS, con checkout en Stripe, gestión de inventario en tiempo real e ISR para mantener catálogos de miles de productos rápidos y siempre actualizados.",
      en: "E-commerce decoupled from the CMS, with Stripe checkout, real-time inventory management and ISR to keep catalogues of thousands of products fast and always fresh.",
    },
    stack: ["React", "Node.js", "Stripe", "Tailwind"],
    repoUrl: "https://github.com/Squierdan",
    liveUrl: "https://example.com",
  },
  {
    title: "Pulse Fitness",
    category: "mobile",
    year: "2024",
    summary: {
      es: "App de seguimiento de entrenamientos con rutinas adaptativas.",
      en: "Workout tracking app with adaptive routines.",
    },
    detail: {
      es: "Aplicación móvil offline-first que sincroniza sesiones al recuperar conexión y ajusta la carga de entrenamiento según el progreso registrado por el usuario.",
      en: "Offline-first mobile app that syncs sessions when connectivity returns and adjusts training load based on the user's recorded progress.",
    },
    stack: ["React Native", "Expo", "Firebase"],
    repoUrl: "https://github.com/Squierdan",
  },
  {
    title: "Lexica AI",
    category: "ai",
    year: "2024",
    summary: {
      es: "Asistente que resume documentos largos y responde preguntas sobre ellos.",
      en: "Assistant that summarises long documents and answers questions about them.",
    },
    detail: {
      es: "Pipeline RAG con segmentación semántica, búsqueda vectorial y citación de fuentes, expuesto mediante una API en streaming y una interfaz conversacional.",
      en: "RAG pipeline with semantic chunking, vector search and source citation, exposed through a streaming API and a conversational interface.",
    },
    stack: ["Python", "FastAPI", "pgvector", "Next.js"],
    repoUrl: "https://github.com/Squierdan",
    liveUrl: "https://example.com",
  },
  {
    title: "Terra Maps",
    category: "web",
    year: "2023",
    summary: {
      es: "Plataforma de geolocalización con mapas interactivos y datos abiertos.",
      en: "Geolocation platform with interactive maps and open data.",
    },
    detail: {
      es: "Visualización de conjuntos de datos geoespaciales con teselas vectoriales, agrupamiento en cliente y filtros temporales sobre millones de puntos.",
      en: "Geospatial dataset visualisation with vector tiles, client-side clustering and time filters over millions of points.",
    },
    stack: ["Vue", "Mapbox", "Go", "Redis"],
    repoUrl: "https://github.com/Squierdan",
  },
  {
    title: "Cadence CLI",
    category: "oss",
    year: "2023",
    summary: {
      es: "Herramientas de línea de comandos para automatizar flujos de desarrollo.",
      en: "Command-line toolkit to automate developer workflows.",
    },
    detail: {
      es: "Conjunto de comandos de código abierto para andamiaje de proyectos, generación de changelogs y verificación de convenciones antes de cada commit.",
      en: "Open-source command set for project scaffolding, changelog generation and convention checks before every commit.",
    },
    stack: ["Rust", "CLI", "Open Source"],
    repoUrl: "https://github.com/Squierdan",
  },
];

/* -------------------------------------------------------------------------- */
/*  STACK                                                                      */
/* -------------------------------------------------------------------------- */

export const stack: { group: Localized; items: string[] }[] = [
  {
    group: { es: "lenguajes", en: "languages" },
    items: ["TypeScript", "JavaScript", "Python", "SQL", "Go"],
  },
  {
    group: { es: "frontend", en: "frontend" },
    items: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "Vitest"],
  },
  {
    group: { es: "backend", en: "backend" },
    items: ["Node.js", "FastAPI", "PostgreSQL", "Redis", "GraphQL"],
  },
  {
    group: { es: "infra", en: "infra" },
    items: ["Docker", "GitHub Actions", "Vercel", "AWS", "Terraform"],
  },
];
