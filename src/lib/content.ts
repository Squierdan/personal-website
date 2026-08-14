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
};

export const work: WorkItem[] = [
  {
    /* ⚠️ APORTE DECLARADO CON PRECISIÓN, Y ES DELIBERADO.
       Una versión anterior de este sitio presentaba el artículo como el titular
       de la portada y con la insignia «primer autor» en ámbar. El propio Elian
       lo corrigió: su aporte real fue la redacción y algunas ideas para el
       algoritmo del protocolo, dentro de un equipo de ocho autores.

       Sobrevender aquí es el peor negocio posible. Un reclutador que abra el
       DOI ve la lista de autores y el alcance del trabajo en treinta segundos, y
       la distancia entre lo que promete la web y lo que dice el paper le cuesta
       a Elian toda la credibilidad del resto de la página, incluida la parte
       que sí es sólida. Declarado con exactitud, sigue siendo una credencial
       poco común para alguien de pregrado.

       NO reintroduzcas «primer autor» ni devuelvas esto a la portada sin que
       Elian lo pida explícitamente. */
    title: {
      es: "Protocolo de consenso Nested-C",
      en: "Nested-C consensus protocol",
    },
    org: "Annals of Telecommunications — Springer Nature",
    category: "research",
    period: { es: "2025", en: "2025" },
    summary: {
      es: "Coautoría en un artículo sobre un protocolo de consenso para NestedChain.",
      en: "Co-authored a paper on a consensus protocol for NestedChain.",
    },
    detail: {
      es: "Artículo revisado por pares publicado en Annals of Telecommunications (Springer Nature), sobre Nested-C, un protocolo de consenso para la arquitectura NestedChain. Formé parte de un equipo de ocho autores: mi aporte se centró en la redacción del artículo y en algunas ideas para el algoritmo del protocolo. Autores: Caizapanta, E., Maldonado-Ruiz, D., Tufiño, C., Vásconez, G., Castro, E., Pabón, T., Torres, J. y El Madhoun, N.",
      en: "Peer-reviewed article published in Annals of Telecommunications (Springer Nature) on Nested-C, a consensus protocol for the NestedChain architecture. I was part of an eight-author team: my contribution centred on writing the paper and on some ideas for the protocol's algorithm. Authors: Caizapanta, E., Maldonado-Ruiz, D., Tufiño, C., Vásconez, G., Castro, E., Pabón, T., Torres, J. and El Madhoun, N.",
    },
    stack: ["Redacción técnica", "Protocolos de consenso", "Blockchain"],
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
/*  HABILIDADES CON NIVEL DECLARADO                                            */
/* -------------------------------------------------------------------------- */

/**
 * ⚠️ Los niveles salen TAL CUAL del CV (`public/Elian-Caizapanta-CV-ES.pdf`),
 * que sólo usa dos —«Experto» y «Avanzado»— y sólo los pone en SEIS
 * herramientas: Linux, Pentesting, VirtualBox, Word, Excel y PowerPoint.
 *
 * **No inventes un nivel para una herramienta que el CV no puntúa.** Si algo no
 * tiene nivel declarado, va en `toolkit` de abajo, que es una lista sin
 * puntuar. Un medidor es una afirmación cuantitativa: o sale del CV o no se
 * pinta. Es el mismo criterio que hizo bajar el énfasis de la publicación.
 *
 * > Aquí hubo medidores para Python, Java, HTML·CSS·JavaScript y Microsoft
 * > Azure, porque la versión anterior del CV sí les ponía «Experto» o
 * > «Avanzado». La versión ATS de 2026 los reorganizó por categorías y les
 * > quitó el nivel, así que se han movido a `toolkit`. Mantenerlos con medidor
 * > habría dejado al sitio afirmando algo que el PDF descargable ya no dice, y
 * > el PDF está a un clic.
 */
export type SkillLevel = "expert" | "advanced";

export type SkillGroup = {
  /** Clave estable para React: NUNCA uses el nombre traducido (ver §4.9). */
  id: string;
  group: Localized;
  items: { name: string; level: SkillLevel }[];
};

export const skills: SkillGroup[] = [
  {
    id: "sys",
    group: { es: "seguridad y sistemas", en: "security & systems" },
    items: [
      { name: "VirtualBox", level: "expert" },
      { name: "Linux", level: "advanced" },
      { name: "Pentesting", level: "advanced" },
    ],
  },
  {
    id: "office",
    group: { es: "ofimática", en: "productivity tools" },
    items: [
      { name: "Microsoft Word", level: "expert" },
      { name: "Microsoft Excel", level: "expert" },
      { name: "Microsoft PowerPoint", level: "expert" },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*  RESTO DEL INSTRUMENTAL — sin nivel declarado                               */
/* -------------------------------------------------------------------------- */

/**
 * Herramientas y conocimientos del CV que NO llevan nivel. Sin medidor.
 *
 * Las categorías replican las del apartado «Conocimientos técnicos» del CV, que
 * en la versión ATS de 2026 pasó a ser bastante más detallado: aparecen Azure,
 * PostgreSQL, React, Next.js, Spring Boot, Django y DevOps, que antes no
 * estaban en el sitio.
 *
 * ⚠️ Los items son `Localized`, no `string`. Antes eran cadenas sueltas y por
 * eso la versión en inglés mostraba «Criptografía», «Automatización» y
 * «Migración de bases de datos» en español — en un sitio cuyo público objetivo
 * son reclutadores internacionales. Los nombres propios (React, Nessus, Git)
 * se repiten idénticos en los dos idiomas a propósito: traducir una marca sería
 * peor que no traducirla.
 */
export const toolkit: { id: string; group: Localized; items: Localized[] }[] = [
  {
    id: "web",
    group: { es: "desarrollo web", en: "web development" },
    items: [
      { es: "HTML", en: "HTML" },
      { es: "CSS", en: "CSS" },
      { es: "JavaScript", en: "JavaScript" },
      { es: "React", en: "React" },
      { es: "Next.js", en: "Next.js" },
      { es: "Tailwind CSS", en: "Tailwind CSS" },
    ],
  },
  {
    id: "backend",
    group: { es: "backend y lenguajes", en: "backend & languages" },
    items: [
      { es: "Java", en: "Java" },
      { es: "Spring Boot", en: "Spring Boot" },
      { es: "Microservicios", en: "Microservices" },
      { es: "Python", en: "Python" },
      { es: "Django", en: "Django" },
      { es: "APIs seguras", en: "Secure APIs" },
    ],
  },
  {
    id: "cloud",
    group: { es: "nube y datos", en: "cloud & data" },
    items: [
      { es: "Microsoft Azure", en: "Microsoft Azure" },
      { es: "Despliegue de VMs", en: "VM deployment" },
      { es: "SQL Server", en: "SQL Server" },
      { es: "PostgreSQL", en: "PostgreSQL" },
    ],
  },
  {
    id: "security",
    group: { es: "seguridad", en: "security" },
    items: [
      { es: "Nessus", en: "Nessus" },
      { es: "OWASP Top 10", en: "OWASP Top 10" },
      { es: "ISO/IEC 27001", en: "ISO/IEC 27001" },
      { es: "SGSI", en: "ISMS" },
      { es: "Criptografía", en: "Cryptography" },
    ],
  },
  {
    id: "infra",
    group: { es: "sistemas y redes", en: "systems & networking" },
    items: [
      { es: "Windows Server", en: "Windows Server" },
      { es: "Redes on-premise", en: "On-premise networking" },
      { es: "DataCenter", en: "DataCenter" },
      { es: "HelpDesk", en: "HelpDesk" },
      { es: "SharePoint", en: "SharePoint" },
    ],
  },
  {
    id: "process",
    group: { es: "proceso", en: "process" },
    items: [
      { es: "Git", en: "Git" },
      { es: "GitHub", en: "GitHub" },
      { es: "Scrum", en: "Scrum" },
      { es: "DevOps", en: "DevOps" },
      { es: "Desarrollo ágil", en: "Agile development" },
    ],
  },
];

/**
 * Tira de la portada: la respuesta de un vistazo a «¿con qué trabajas?».
 *
 * Es un subconjunto ELEGIDO, no derivado de `skills`, y por eso vive aquí
 * escrito a mano: derivarlo arrastraría Word y PowerPoint a la portada, que
 * están en el CV y son ciertos pero no son el titular de un perfil de ingeniería.
 * Ocho es el máximo que se lee sin contar; si añades uno, quita otro.
 */
export const headlineStack = [
  "Python",
  "Java",
  "JavaScript",
  "React",
  "Next.js",
  "Linux",
  "Nessus",
  "ISO/IEC 27001",
];

/* -------------------------------------------------------------------------- */
/*  IDIOMAS                                                                    */
/* -------------------------------------------------------------------------- */

/** Del CV. Relevante para vacantes internacionales, y no estaba en la web. */
export const languages: { id: string; name: Localized; level: Localized }[] = [
  {
    id: "es",
    name: { es: "Español", en: "Spanish" },
    level: { es: "nativo", en: "native" },
  },
  {
    id: "en",
    name: { es: "Inglés", en: "English" },
    level: { es: "C1 · avanzado", en: "C1 · advanced" },
  },
];

/* -------------------------------------------------------------------------- */
/*  CERTIFICACIONES                                                            */
/* -------------------------------------------------------------------------- */

/**
 * `date` en formato `YYYY-MM`, tal como aparece en el CV.
 *
 * Antes sólo se guardaba el año, y con ocho entradas de 2025 la lista no tenía
 * orden interno: se leía como un montón. El mes permite ordenarlas de verdad y
 * agruparlas por año, que es lo que convierte la lista en una trayectoria — se
 * ve que la formación se concentra y acelera en 2025 en vez de haber que
 * contarlo a mano.
 *
 * El año se deriva con `date.slice(0, 4)`: no lo dupliques en un campo aparte
 * o los dos acabarán discrepando.
 */
export type Certification = {
  name: string;
  issuer: string;
  /** `YYYY-MM` */
  date: string;
};

/**
 * Las quince del CV, en orden cronológico inverso.
 *
 * Antes había trece: faltaban «Guía para Aprender Seguridad Informática» e
 * «Introducción a la Terminal y Línea de Comandos», ambas de Platzi (abril
 * 2025). El hero llevaba tiempo anunciando «+15» mientras la lista mostraba
 * trece; la cifra del CV era la correcta y lo que faltaba eran los datos.
 */
export const certifications: Certification[] = [
  { name: "Hacking Ético", issuer: "Platzi", date: "2025-06" },
  {
    name: "OWASP Top 10: Riesgos en Aplicaciones",
    issuer: "Platzi",
    date: "2025-06",
  },
  { name: "Fundamentos de Criptografía", issuer: "Platzi", date: "2025-06" },
  { name: "Redes de Internet — Profesional", issuer: "Platzi", date: "2025-06" },
  { name: "Seguridad de Redes On-Premise", issuer: "Platzi", date: "2025-06" },
  {
    name: "Ciberseguridad y Privacidad para Empresas",
    issuer: "Platzi",
    date: "2025-05",
  },
  { name: "Foundations of Cybersecurity", issuer: "Google", date: "2025-04" },
  {
    name: "Introducción a la Terminal y Línea de Comandos",
    issuer: "Platzi",
    date: "2025-04",
  },
  {
    name: "Guía para Aprender Seguridad Informática",
    issuer: "Platzi",
    date: "2025-04",
  },
  {
    name: "Career Essentials in Cybersecurity",
    issuer: "Microsoft · LinkedIn Learning",
    date: "2025-03",
  },
  {
    name: "Introduction to Cybersecurity",
    issuer: "Cisco Networking Academy",
    date: "2024-05",
  },
  {
    name: "Seguridad Informática y Protección de Datos Personales",
    issuer: "CEC-EPN",
    date: "2024-05",
  },
  {
    name: "NDG Linux Essentials",
    issuer: "Cisco Networking Academy",
    date: "2023-08",
  },
  {
    name: "Scrum Foundation Professional (SFPC)",
    issuer: "CertiProf",
    date: "2023-06",
  },
  {
    name: "Programación con Python aplicada a la Ingeniería",
    issuer: "CEC-EPN",
    date: "2020-03",
  },
];

/* -------------------------------------------------------------------------- */
/*  RECUENTOS DERIVADOS                                                        */
/* -------------------------------------------------------------------------- */

/**
 * Las cifras del hero, contadas desde los datos y no escritas a mano.
 *
 * El hero decía «+15 certificaciones» mientras la sección 01 listaba trece.
 * Ese tipo de desajuste es exactamente el que un reclutador nota, y en un
 * portafolio de seguridad de la información es el peor sitio donde tenerlo: la
 * página que promete integridad de datos no puede contradecirse a sí misma dos
 * pantallas más abajo. Contándolo aquí, la cifra del hero es la longitud real
 * de la lista que está debajo y no puede volver a separarse de ella.
 *
 * Si el CV tiene más certificaciones de las que hay en `certifications`, la
 * solución es añadirlas al array, no subir el número.
 */
export const counts = {
  certifications: certifications.length,
  publications: work.filter((item) => item.category === "research").length,
  roles: work.filter((item) => item.category !== "research").length,
  /**
   * Tecnologías declaradas en el CV: las que llevan nivel más el resto del
   * instrumental.
   *
   * Antes esta cifra contaba SÓLO las que llevan nivel. Con el CV de 2026 eso
   * pasó de diez a seis, y de esas seis tres son Word, Excel y PowerPoint: un
   * «6» en la portada de un perfil de ingeniería, con la mitad siendo
   * ofimática, decía menos de lo que Elian sabe hacer, no más. Contar el stack
   * completo es igual de verificable —todo sale del PDF descargable— y
   * representa mejor lo que el CV lista ahora que incluye Azure, PostgreSQL,
   * React, Next.js, Spring Boot, Django y DevOps.
   */
  technologies:
    skills.reduce((total, group) => total + group.items.length, 0) +
    toolkit.reduce((total, group) => total + group.items.length, 0),
} as const;

/**
 * Certificaciones agrupadas por año, de más reciente a más antiguo.
 *
 * Se calcula aquí y no en el componente para que la sección se limite a pintar:
 * el año sale de `date`, nunca de un campo duplicado que pueda discrepar.
 */
export const certificationsByYear: { year: string; items: Certification[] }[] =
  Object.entries(
    certifications.reduce<Record<string, Certification[]>>((acc, cert) => {
      const year = cert.date.slice(0, 4);
      (acc[year] ??= []).push(cert);
      return acc;
    }, {}),
  )
    .map(([year, items]) => ({ year, items }))
    .sort((a, b) => b.year.localeCompare(a.year));
