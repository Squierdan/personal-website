import type { Locale } from "@/i18n/config";

/**
 * ============================================================================
 *  CONTENIDO — SERVICIOS, EXPERIENCIA, STACK Y CERTIFICACIONES
 * ============================================================================
 *  Datos reales tomados del CV. Cada texto es bilingüe: { es: "…", en: "…" }.
 * ============================================================================
 */

export type Localized = Record<Locale, string>;

/* -------------------------------------------------------------------------- */
/*  SERVICIOS                                                                  */
/* -------------------------------------------------------------------------- */

export type Service = {
  /** Comando ficticio que encabeza la fila. */
  cmd: string;
  title: Localized;
  description: Localized;
  keywords: string[];
};

export const services: Service[] = [
  {
    cmd: "scan --vuln",
    title: {
      es: "Gestión de vulnerabilidades",
      en: "Vulnerability Management",
    },
    description: {
      es: "Escaneo con Nessus, triaje y priorización por riesgo real, seguimiento de remediación e informes ejecutivos y técnicos comprensibles para ambos públicos.",
      en: "Nessus scanning, triage and prioritisation by real risk, remediation tracking, and executive and technical reports that both audiences can actually read.",
    },
    keywords: ["Nessus", "CVSS", "Remediación", "Informes"],
  },
  {
    cmd: "comply --iso27001",
    title: {
      es: "Cumplimiento y SGSI",
      en: "Compliance & ISMS",
    },
    description: {
      es: "Administración de un Sistema de Gestión de Seguridad de la Información bajo ISO/IEC 27001: políticas, controles, evidencias y acompañamiento durante la auditoría de certificación.",
      en: "Running an Information Security Management System under ISO/IEC 27001: policies, controls, evidence, and support throughout the certification audit.",
    },
    keywords: ["ISO 27001", "SGSI", "Políticas", "Auditoría"],
  },
  {
    cmd: "pentest",
    title: {
      es: "Pentesting y hacking ético",
      en: "Pentesting & Ethical Hacking",
    },
    description: {
      es: "Reconocimiento, identificación y explotación controlada de fallos en aplicaciones y redes, con foco en el OWASP Top 10 y evidencia reproducible de cada hallazgo.",
      en: "Reconnaissance, identification and controlled exploitation of flaws in applications and networks, focused on the OWASP Top 10, with reproducible evidence for every finding.",
    },
    keywords: ["OWASP Top 10", "Criptografía", "Redes", "Linux"],
  },
  {
    cmd: "admin --sys",
    title: {
      es: "Administración de sistemas y redes",
      en: "Systems & Network Administration",
    },
    description: {
      es: "Soporte especializado, endurecimiento de servidores Linux y Windows, virtualización, redes on-premise y reestructuración de infraestructura de centro de datos.",
      en: "Specialised support, Linux and Windows server hardening, virtualisation, on-premise networking, and data centre infrastructure restructuring.",
    },
    keywords: ["Linux", "Microsoft Azure", "VirtualBox", "HelpDesk"],
  },
  {
    cmd: "migrate",
    title: {
      es: "Migración y automatización",
      en: "Migration & Automation",
    },
    description: {
      es: "Migración de sistemas empresariales y bases de datos con continuidad de operación, más diseño de flujos internos que eliminan trabajo manual y dan trazabilidad.",
      en: "Enterprise system and database migrations without breaking operations, plus internal workflow design that removes manual work and adds traceability.",
    },
    keywords: ["ERP", "Genexus", "Bases de datos", "Procesos"],
  },
  {
    cmd: "build --web",
    title: {
      es: "Desarrollo web",
      en: "Web Development",
    },
    description: {
      es: "Aplicaciones web con JavaScript, Java y Python, escritas con criterio de seguridad desde el diseño y no como un parche al final del proyecto.",
      en: "Web applications with JavaScript, Java and Python, written with security in mind from the design stage rather than patched in at the end.",
    },
    keywords: ["JavaScript", "Java", "Python", "Next.js"],
  },
];

/* -------------------------------------------------------------------------- */
/*  EXPERIENCIA E INVESTIGACIÓN                                                */
/* -------------------------------------------------------------------------- */

export const workCategories = [
  "security",
  "infra",
  "automation",
  "research",
] as const;
export type WorkCategory = (typeof workCategories)[number];

export const categoryLabels: Record<WorkCategory, Localized> = {
  security: { es: "seguridad", en: "security" },
  infra: { es: "infraestructura", en: "infrastructure" },
  automation: { es: "automatización", en: "automation" },
  research: { es: "investigación", en: "research" },
};

export type WorkItem = {
  /** Cargo o título del trabajo. */
  title: Localized;
  /** Empresa, institución o editorial. */
  org: string;
  category: WorkCategory;
  /** Periodo mostrado en la columna derecha. */
  period: Localized;
  /** Resumen de una línea visible siempre. */
  summary: Localized;
  /** Detalle que aparece al expandir la fila. */
  detail: Localized;
  stack: string[];
  link?: string;
  linkLabel?: Localized;
  featured?: boolean;
};

export const work: WorkItem[] = [
  {
    title: {
      es: "Protocolo Nested-C · publicación científica",
      en: "Nested-C protocol · peer-reviewed publication",
    },
    org: "Annals of Telecommunications — Springer Nature",
    category: "research",
    period: { es: "2025", en: "2025" },
    featured: true,
    summary: {
      es: "Protocolo de consenso diseñado para la arquitectura NestedChain.",
      en: "Consensus protocol designed for the NestedChain architecture.",
    },
    detail: {
      es: "Artículo revisado por pares y publicado en Annals of Telecommunications (Springer Nature), donde figuro como primer autor. El trabajo propone Nested-C, un protocolo de consenso pensado para la arquitectura NestedChain, e incluye su diseño, formalización y análisis frente a las alternativas existentes. Autores: Caizapanta, E., Maldonado-Ruiz, D., Tufiño, C., Vásconez, G., Castro, E., Pabón, T., Torres, J. y El Madhoun, N.",
      en: "Peer-reviewed article published in Annals of Telecommunications (Springer Nature), where I appear as first author. The work proposes Nested-C, a consensus protocol designed for the NestedChain architecture, covering its design, formalisation and analysis against existing alternatives. Authors: Caizapanta, E., Maldonado-Ruiz, D., Tufiño, C., Vásconez, G., Castro, E., Pabón, T., Torres, J. and El Madhoun, N.",
    },
    stack: ["Blockchain", "Protocolos de consenso", "Investigación"],
    link: "https://doi.org/10.1007/s12243-025-01104-1",
    linkLabel: { es: "ver artículo", en: "read paper" },
  },
  {
    title: {
      es: "Tech & Operations Associate · IT & AI",
      en: "Tech & Operations Associate · IT & AI",
    },
    org: "Marino Robalino LLC",
    category: "automation",
    period: { es: "ago — oct 2025", en: "Aug — Oct 2025" },
    summary: {
      es: "Diseño de un sistema interno de automatización y gestión documental.",
      en: "Design of an internal automation and document management system.",
    },
    detail: {
      es: "Participé en la planificación y el diseño esquemático de un sistema interno de automatización orientado a optimizar los flujos de trabajo y la gestión documental de una consultora internacional. Colaboré en la estructuración de procesos operativos con foco en eficiencia y trazabilidad, y formé parte del equipo de gestión de expedientes EB-1A, revisando, organizando y consolidando documentación para clientes internacionales.",
      en: "I took part in the planning and schematic design of an internal automation system aimed at optimising workflows and document management at an international consultancy. I contributed to structuring operational processes with a focus on efficiency and traceability, and was part of the EB-1A case management team, reviewing, organising and consolidating documentation for international clients.",
    },
    stack: ["Automatización", "Gestión documental", "Análisis operativo"],
  },
  {
    title: {
      es: "Pasante de Seguridad de la Información",
      en: "Information Security Intern",
    },
    org: "Coris del Ecuador",
    category: "security",
    period: { es: "dic 2024 — jun 2025", en: "Dec 2024 — Jun 2025" },
    featured: true,
    summary: {
      es: "Gestión de vulnerabilidades y SGSI durante la certificación ISO 27001.",
      en: "Vulnerability management and ISMS during ISO 27001 certification.",
    },
    detail: {
      es: "Gestión de vulnerabilidades con Nessus: escaneo, análisis, informes y seguimiento de remediación. Administré el Sistema de Gestión de Seguridad de la Información y trabajé en el cumplimiento de la norma ISO/IEC 27001, participando directamente en la auditoría de certificación. También apoyé en la reestructuración del DataCenter y en la gestión de equipos.",
      en: "Vulnerability management with Nessus: scanning, analysis, reporting and remediation follow-up. I administered the Information Security Management System and worked on ISO/IEC 27001 compliance, taking part directly in the certification audit. I also supported the DataCenter restructuring and equipment management.",
    },
    stack: ["Nessus", "ISO 27001", "SGSI", "DataCenter"],
  },
  {
    title: {
      es: "Pasante de Sistemas · TI",
      en: "Systems Intern · IT",
    },
    org: "MARCSEAL S.A.",
    category: "infra",
    period: { es: "may — nov 2024", en: "May — Nov 2024" },
    summary: {
      es: "Soporte técnico y migración del ERP corporativo entre versiones de Genexus.",
      en: "Technical support and corporate ERP migration across Genexus versions.",
    },
    detail: {
      es: "Soporte de sistemas en modalidad HelpDesk con gestión de tickets, además de soporte en redes, ofimática e impresoras. Ejecuté la migración y el mantenimiento de la base de datos del ERP CANORUS desde Genexus 16 hacia Genexus 18 WorkWithPlus, y llevé el inventario de compras e insumos electrónicos.",
      en: "HelpDesk systems support with ticket management, plus support for networks, office software and printers. I carried out the migration and maintenance of the CANORUS ERP database from Genexus 16 to Genexus 18 WorkWithPlus, and managed the purchasing and electronic supplies inventory.",
    },
    stack: ["Genexus", "ERP", "Bases de datos", "HelpDesk"],
  },
];

/* -------------------------------------------------------------------------- */
/*  STACK                                                                      */
/* -------------------------------------------------------------------------- */

export const stack: { group: Localized; items: string[] }[] = [
  {
    group: { es: "seguridad", en: "security" },
    items: ["Nessus", "OWASP Top 10", "Pentesting", "Criptografía", "ISO 27001"],
  },
  {
    group: { es: "lenguajes", en: "languages" },
    items: ["Python", "Java", "JavaScript", "HTML / CSS", "SQL"],
  },
  {
    group: { es: "sistemas", en: "systems" },
    items: ["Linux", "Windows", "Microsoft Azure", "VirtualBox", "Redes"],
  },
  {
    group: { es: "herramientas", en: "tooling" },
    items: ["Genexus", "Git", "Scrum", "Excel avanzado", "Next.js"],
  },
];

/* -------------------------------------------------------------------------- */
/*  CERTIFICACIONES                                                            */
/* -------------------------------------------------------------------------- */

export type Certification = {
  name: string;
  issuer: string;
  year: string;
};

export const certifications: Certification[] = [
  { name: "Foundations of Cybersecurity", issuer: "Google", year: "2025" },
  {
    name: "Career Essentials in Cybersecurity",
    issuer: "Microsoft · LinkedIn",
    year: "2025",
  },
  { name: "Hacking Ético", issuer: "Platzi", year: "2025" },
  { name: "OWASP Top 10", issuer: "Platzi", year: "2025" },
  { name: "Fundamentos de Criptografía", issuer: "Platzi", year: "2025" },
  { name: "Seguridad de Redes On-Premise", issuer: "Platzi", year: "2025" },
  { name: "Redes de Internet — Profesional", issuer: "Platzi", year: "2025" },
  {
    name: "Ciberseguridad y Privacidad para Empresas",
    issuer: "Platzi",
    year: "2025",
  },
  {
    name: "Introduction to Cybersecurity",
    issuer: "Cisco Networking Academy",
    year: "2024",
  },
  {
    name: "Seguridad Informática y Protección de Datos",
    issuer: "CEC-EPN",
    year: "2024",
  },
  {
    name: "NDG Linux Essentials",
    issuer: "Cisco Networking Academy",
    year: "2023",
  },
  {
    name: "Scrum Foundation Professional (SFPC)",
    issuer: "CertiProf",
    year: "2023",
  },
  { name: "Programación con Python", issuer: "CEC-EPN", year: "2020" },
];
