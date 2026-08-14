import type { Locale } from "./config";
import { counts } from "@/lib/content";

/**
 * Diccionario bilingüe. Toda cadena visible del sitio vive aquí.
 * El tipo `Dictionary` obliga a que ES y EN estén siempre sincronizados:
 * si añades una clave en `es`, TypeScript la exigirá también en `en`.
 *
 * Las cifras del hero son la excepción a «todo aquí es literal»: se leen de
 * `counts` (ver `src/lib/content.ts`), que las cuenta desde los propios datos.
 * Escritas a mano se separaban de la realidad —el hero anunciaba quince
 * certificaciones y la sección 01 listaba trece— y en este sitio esa clase de
 * desajuste cuesta credibilidad.
 */
type Dictionary = {
  nav: {
    about: string;
    skills: string;
    services: string;
    work: string;
    contact: string;
  };
  hero: {
    status: { available: string; busy: string };
    /** Disciplina, en el cintillo superior junto a la ubicación. */
    discipline: string;
    intro: string;
    /** Rótulo de la tira de tecnologías de la portada. */
    stackLabel: string;
    ctaPrimary: string;
    ctaSecondary: string;
    ctaCv: string;
    stats: { value: string; label: string }[];
  };
  about: {
    index: string;
    eyebrow: string;
    title: string;
    paragraphs: string[];
    educationTitle: string;
    education: { degree: string; school: string; period: string }[];
    principlesTitle: string;
    principles: { title: string; body: string }[];
  };
  skills: {
    index: string;
    eyebrow: string;
    title: string;
    ratedTitle: string;
    levels: { expert: string; advanced: string };
    toolkitTitle: string;
    languagesTitle: string;
    certificationsTitle: string;
    certUnitOne: string;
    certUnitMany: string;
  };
  services: {
    index: string;
    eyebrow: string;
    title: string;
    subtitle: string;
  };
  work: {
    index: string;
    eyebrow: string;
    title: string;
    filterAll: string;
    colName: string;
    colStack: string;
    colYear: string;
    empty: string;
    rolesTitle: string;
  };
  contact: {
    index: string;
    eyebrow: string;
    title: string;
    subtitle: string;
    nameLabel: string;
    emailLabel: string;
    messageLabel: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    messagePlaceholder: string;
    sent: string;
    invalid: string;
    orEmail: string;
    copy: string;
    copied: string;
    cvTitle: string;
    cvEs: string;
    cvEn: string;
  };
  footer: {
    builtWith: string;
    rights: string;
    backToTop: string;
  };
  ui: {
    themeLight: string;
    themeDark: string;
    language: string;
    menu: string;
    close: string;
    openPalette: string;
    palettePlaceholder: string;
    paletteNav: string;
    paletteActions: string;
    paletteLinks: string;
    paletteEmpty: string;
    actionToggleTheme: string;
    actionToggleLang: string;
    actionCopyEmail: string;
  };
};

export const dictionaries: Record<Locale, Dictionary> = {
  /* ------------------------------------------------------------------ ES */
  es: {
    nav: {
      about: "sobre-mí",
      skills: "habilidades",
      services: "servicios",
      work: "experiencia",
      contact: "contacto",
    },
    hero: {
      status: {
        available: "disponible para nuevas oportunidades",
        busy: "agenda completa por ahora",
      },
      discipline: "seguridad de la información",
      stackLabel: "trabajo con",
      intro:
        "Ingeniero de software especializado en seguridad de la información. Gestiono vulnerabilidades, administro sistemas de gestión de seguridad bajo ISO/IEC 27001 y construyo software pensando en la integridad, disponibilidad y confidencialidad de los datos desde el primer commit.",
      ctaPrimary: "Ver experiencia",
      ctaSecondary: "Hablemos",
      ctaCv: "Descargar CV",
      stats: [
        {
          value: String(counts.certifications),
          label: "certificaciones técnicas",
        },
        { value: String(counts.roles), label: "roles en TI y seguridad" },
        {
          value: String(counts.technologies),
          label: "tecnologías declaradas en el CV",
        },
      ],
    },
    about: {
      index: "01",
      eyebrow: "sobre mí",
      title: "Seguridad de la información, con las manos en el sistema",
      paragraphs: [
        "Soy estudiante de Ingeniería de Software en la Escuela Politécnica Nacional y profesional de tecnología especializado en seguridad informática. Trabajo en el cruce de tres cosas: sistemas que hay que sostener, normas que hay que cumplir y código que hay que escribir bien.",
        "Mi experiencia cubre gestión de vulnerabilidades con Nessus, administración de un Sistema de Gestión de Seguridad de la Información bajo ISO/IEC 27001 —incluida la auditoría de certificación—, migración de sistemas ERP empresariales y reestructuración de infraestructura de centro de datos.",
        "En 2025 participé como coautor en un artículo sobre el protocolo de consenso Nested-C, publicado en Annals of Telecommunications (Springer Nature), aportando en la redacción y en ideas para el algoritmo. Me interesa el punto exacto donde la teoría deja de ser un paper y se convierte en algo que corre en producción sin romperse.",
        "Trabajo con constancia, responsabilidad y comunicación directa. Prefiero explicar un riesgo en términos que la dirección entienda antes que entregar un informe impecable que nadie lee.",
      ],
      educationTitle: "Formación",
      education: [
        {
          degree: "Ingeniería de Software",
          school: "Escuela Politécnica Nacional",
          period: "2021 — 2027 (en curso)",
        },
        {
          degree: "Bachiller en Ciencias",
          school: "Unidad Educativa Paulo VI",
          period: "2012 — 2018",
        },
      ],
      principlesTitle: "Cómo trabajo",
      principles: [
        {
          title: "Riesgo antes que ruido",
          body: "Priorizo hallazgos por impacto real en el negocio, no por la severidad que imprime la herramienta.",
        },
        {
          title: "Evidencia reproducible",
          body: "Todo hallazgo se documenta de forma que otra persona pueda verificarlo sin mí delante.",
        },
        {
          title: "Seguridad desde el diseño",
          body: "Corregir en la arquitectura cuesta una fracción de lo que cuesta parchear en producción.",
        },
        {
          title: "Dos públicos, un mensaje",
          body: "El mismo hallazgo, explicado al equipo técnico y a la dirección, sin perder precisión en el camino.",
        },
      ],
    },
    skills: {
      index: "02",
      eyebrow: "habilidades",
      title: "Lo que sé hacer, y con qué lo he hecho",
      ratedTitle: "Nivel de dominio",
      levels: { expert: "experto", advanced: "avanzado" },
      toolkitTitle: "Resto del instrumental",
      languagesTitle: "Idiomas",
      certificationsTitle: "Certificaciones",
      certUnitOne: "certificación",
      certUnitMany: "certificaciones",
    },
    services: {
      index: "04",
      eyebrow: "servicios",
      title: "En qué puedo ayudarte",
      subtitle:
        "Desde una evaluación puntual de vulnerabilidades hasta el acompañamiento completo de un sistema de gestión de seguridad.",
    },
    work: {
      index: "03",
      eyebrow: "trayectoria",
      title: "Experiencia e investigación",
      filterAll: "todo",
      colName: "rol",
      colStack: "áreas",
      colYear: "periodo",
      empty: "No hay resultados en esta categoría.",
      rolesTitle: "Roles y publicaciones",
    },
    contact: {
      index: "05",
      eyebrow: "contacto",
      title: "Hablemos de tu proyecto o vacante",
      subtitle:
        "¿Una auditoría, un sistema que asegurar, una vacante que encaja? Escríbeme y respondo en menos de 24 horas.",
      nameLabel: "nombre",
      emailLabel: "correo",
      messageLabel: "mensaje",
      namePlaceholder: "Tu nombre",
      emailPlaceholder: "tu@correo.com",
      messagePlaceholder: "Cuéntame en qué estás trabajando…",
      sent: "Mensaje listo. Se abrirá tu cliente de correo.",
      invalid: "Revisa los campos marcados.",
      orEmail: "O escríbeme directamente a",
      copy: "copiar",
      copied: "copiado",
      cvTitle: "Curriculum vitae",
      cvEs: "Español (PDF)",
      cvEn: "English (PDF)",
    },
    footer: {
      builtWith: "Construido con",
      rights: "Todos los derechos reservados.",
      backToTop: "volver arriba",
    },
    ui: {
      themeLight: "Cambiar a tema claro",
      themeDark: "Cambiar a tema oscuro",
      language: "Cambiar idioma",
      menu: "Abrir menú",
      close: "Cerrar",
      openPalette: "Buscar",
      palettePlaceholder: "Escribe un comando o busca…",
      paletteNav: "Navegación",
      paletteActions: "Acciones",
      paletteLinks: "Enlaces",
      paletteEmpty: "Sin resultados",
      actionToggleTheme: "Alternar tema claro / oscuro",
      actionToggleLang: "Alternar idioma español / inglés",
      actionCopyEmail: "Copiar correo electrónico",
    },
  },

  /* ------------------------------------------------------------------ EN */
  en: {
    nav: {
      about: "about",
      skills: "skills",
      services: "services",
      work: "experience",
      contact: "contact",
    },
    hero: {
      status: {
        available: "open to new opportunities",
        busy: "fully booked right now",
      },
      discipline: "information security",
      stackLabel: "i work with",
      intro:
        "Software engineer specialising in information security. I manage vulnerabilities, administer security management systems under ISO/IEC 27001, and build software with the integrity, availability and confidentiality of data in mind from the first commit.",
      ctaPrimary: "View experience",
      ctaSecondary: "Get in touch",
      ctaCv: "Download CV",
      stats: [
        {
          value: String(counts.certifications),
          label: "technical certifications",
        },
        { value: String(counts.roles), label: "roles in IT and security" },
        {
          value: String(counts.technologies),
          label: "technologies declared on the CV",
        },
      ],
    },
    about: {
      index: "01",
      eyebrow: "about",
      title: "Information security, hands on the system",
      paragraphs: [
        "I'm a Software Engineering student at Escuela Politécnica Nacional and a technology professional specialising in IT security. I work where three things meet: systems that have to stay up, standards that have to be met, and code that has to be written well.",
        "My experience covers vulnerability management with Nessus, administering an Information Security Management System under ISO/IEC 27001 — including the certification audit — enterprise ERP migrations, and data centre infrastructure restructuring.",
        "In 2025 I co-authored a paper on the Nested-C consensus protocol, published in Annals of Telecommunications (Springer Nature), contributing to the writing and to ideas for the algorithm. I'm drawn to the exact point where theory stops being a paper and becomes something that runs in production without breaking.",
        "I work with consistency, accountability and direct communication. I'd rather explain a risk in terms leadership actually understands than deliver a flawless report nobody reads.",
      ],
      educationTitle: "Education",
      education: [
        {
          degree: "Software Engineering",
          school: "Escuela Politécnica Nacional",
          period: "2021 — 2027 (in progress)",
        },
        {
          degree: "Bachelor of Science",
          school: "Unidad Educativa Paulo VI",
          period: "2012 — 2018",
        },
      ],
      principlesTitle: "How I work",
      principles: [
        {
          title: "Risk over noise",
          body: "I prioritise findings by real business impact, not by the severity the scanner prints.",
        },
        {
          title: "Reproducible evidence",
          body: "Every finding is documented so someone else can verify it without me in the room.",
        },
        {
          title: "Security by design",
          body: "Fixing it in the architecture costs a fraction of patching it in production.",
        },
        {
          title: "Two audiences, one message",
          body: "The same finding, explained to the technical team and to leadership, without losing precision.",
        },
      ],
    },
    skills: {
      index: "02",
      eyebrow: "skills",
      title: "What I can do, and what I've done it with",
      ratedTitle: "Proficiency",
      levels: { expert: "expert", advanced: "advanced" },
      toolkitTitle: "Rest of the toolkit",
      languagesTitle: "Languages",
      certificationsTitle: "Certifications",
      certUnitOne: "certification",
      certUnitMany: "certifications",
    },
    services: {
      index: "04",
      eyebrow: "services",
      title: "How I can help",
      subtitle:
        "From a focused vulnerability assessment to full support of an information security management system.",
    },
    work: {
      index: "03",
      eyebrow: "track record",
      title: "Experience & research",
      filterAll: "all",
      colName: "role",
      colStack: "areas",
      colYear: "period",
      empty: "No results in this category.",
      rolesTitle: "Roles & publications",
    },
    contact: {
      index: "05",
      eyebrow: "contact",
      title: "Let's talk about your project or role",
      subtitle:
        "An audit, a system to secure, a role that fits? Send me a note and I'll reply within 24 hours.",
      nameLabel: "name",
      emailLabel: "email",
      messageLabel: "message",
      namePlaceholder: "Your name",
      emailPlaceholder: "you@email.com",
      messagePlaceholder: "Tell me what you're working on…",
      sent: "Message ready. Your email client will open.",
      invalid: "Please check the highlighted fields.",
      orEmail: "Or email me directly at",
      copy: "copy",
      copied: "copied",
      cvTitle: "Curriculum vitae",
      cvEs: "Español (PDF)",
      cvEn: "English (PDF)",
    },
    footer: {
      builtWith: "Built with",
      rights: "All rights reserved.",
      backToTop: "back to top",
    },
    ui: {
      themeLight: "Switch to light theme",
      themeDark: "Switch to dark theme",
      language: "Change language",
      menu: "Open menu",
      close: "Close",
      openPalette: "Search",
      palettePlaceholder: "Type a command or search…",
      paletteNav: "Navigation",
      paletteActions: "Actions",
      paletteLinks: "Links",
      paletteEmpty: "No results",
      actionToggleTheme: "Toggle light / dark theme",
      actionToggleLang: "Toggle Spanish / English",
      actionCopyEmail: "Copy email address",
    },
  },
};
