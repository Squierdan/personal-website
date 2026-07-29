import type { Locale } from "./config";

/**
 * Diccionario bilingüe. Toda cadena visible del sitio vive aquí.
 * El tipo `Dictionary` obliga a que ES y EN estén siempre sincronizados:
 * si añades una clave en `es`, TypeScript te exigirá añadirla también en `en`.
 */
type Dictionary = {
  nav: {
    about: string;
    services: string;
    projects: string;
    contact: string;
  };
  hero: {
    status: { available: string; busy: string };
    cmdWhoami: string;
    cmdRole: string;
    cmdStack: string;
    intro: string;
    ctaPrimary: string;
    ctaSecondary: string;
    stats: { value: string; label: string }[];
    scrollHint: string;
  };
  about: {
    index: string;
    eyebrow: string;
    title: string;
    paragraphs: string[];
    skillsTitle: string;
    principlesTitle: string;
    principles: { title: string; body: string }[];
  };
  services: {
    index: string;
    eyebrow: string;
    title: string;
    subtitle: string;
    hint: string;
  };
  projects: {
    index: string;
    eyebrow: string;
    title: string;
    subtitle: string;
    filterAll: string;
    viewCode: string;
    viewLive: string;
    colName: string;
    colStack: string;
    colYear: string;
    empty: string;
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
    send: string;
    sending: string;
    sent: string;
    invalid: string;
    orEmail: string;
    copy: string;
    copied: string;
  };
  footer: {
    builtWith: string;
    rights: string;
    backToTop: string;
    source: string;
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
    paletteHint: string;
    actionToggleTheme: string;
    actionToggleLang: string;
    actionCopyEmail: string;
  };
  meta: {
    description: string;
  };
};

export const dictionaries: Record<Locale, Dictionary> = {
  /* ------------------------------------------------------------------ ES */
  es: {
    nav: {
      about: "sobre-mí",
      services: "servicios",
      projects: "proyectos",
      contact: "contacto",
    },
    hero: {
      status: {
        available: "disponible para nuevos proyectos",
        busy: "agenda completa por ahora",
      },
      cmdWhoami: "whoami",
      cmdRole: "cat rol.txt",
      cmdStack: "ls stack/",
      intro:
        "Diseño y construyo productos web de extremo a extremo: arquitectura, interfaz e infraestructura. Código mantenible, interfaces que se sienten rápidas y decisiones técnicas que se justifican solas.",
      ctaPrimary: "Ver proyectos",
      ctaSecondary: "Trabajemos juntos",
      stats: [
        { value: "+5", label: "años de experiencia" },
        { value: "+30", label: "proyectos entregados" },
        { value: "99", label: "puntuación Lighthouse" },
      ],
      scrollHint: "desplázate",
    },
    about: {
      index: "01",
      eyebrow: "sobre mí",
      title: "Ingeniería con criterio, no con plantillas",
      paragraphs: [
        "Soy ingeniero de software. Trabajo el ciclo completo de un producto: desde el modelo de datos y la API hasta la última animación de la interfaz. Me interesa el punto donde la ingeniería y el diseño dejan de ser dos disciplinas separadas.",
        "Mi día a día es TypeScript, React y Next.js en el frontend; Node.js, Python y PostgreSQL en el backend; y Docker, CI/CD y observabilidad para que lo que se construye sobreviva al primer mes en producción.",
        "Escribo código pensando en quien lo va a leer después. Prefiero una solución simple y explicable a una ingeniosa e imposible de mantener.",
      ],
      skillsTitle: "Stack y herramientas",
      principlesTitle: "Cómo trabajo",
      principles: [
        {
          title: "Primero el problema",
          body: "Antes de elegir tecnología, entiendo qué se necesita resolver y para quién.",
        },
        {
          title: "Rendimiento medible",
          body: "Core Web Vitals, presupuestos de bundle y perfiles reales, no intuiciones.",
        },
        {
          title: "Accesible por defecto",
          body: "Semántica, contraste, navegación por teclado y motion reducido desde el día uno.",
        },
        {
          title: "Entregar de verdad",
          body: "Un despliegue automatizado y documentado vale más que una demo perfecta.",
        },
      ],
    },
    services: {
      index: "02",
      eyebrow: "servicios",
      title: "En qué puedo ayudarte",
      subtitle:
        "Colaboraciones puntuales o proyectos completos, de la idea al despliegue en producción.",
      hint: "pasa el cursor para ver el detalle",
    },
    projects: {
      index: "03",
      eyebrow: "portafolio",
      title: "Trabajo seleccionado",
      subtitle:
        "Una muestra de productos, herramientas y experimentos. Filtra por tipo para explorar.",
      filterAll: "todos",
      viewCode: "código",
      viewLive: "demo",
      colName: "proyecto",
      colStack: "stack",
      colYear: "año",
      empty: "No hay proyectos en esta categoría.",
    },
    contact: {
      index: "04",
      eyebrow: "contacto",
      title: "Cuéntame qué estás construyendo",
      subtitle:
        "¿Un producto nuevo, una migración, una interfaz que necesita cariño? Escríbeme y respondo en menos de 24 horas.",
      nameLabel: "nombre",
      emailLabel: "correo",
      messageLabel: "mensaje",
      namePlaceholder: "Tu nombre",
      emailPlaceholder: "tu@correo.com",
      messagePlaceholder: "Cuéntame sobre tu proyecto…",
      send: "enviar mensaje",
      sending: "enviando…",
      sent: "Mensaje listo. Se abrirá tu cliente de correo.",
      invalid: "Revisa los campos marcados.",
      orEmail: "O escríbeme directamente a",
      copy: "copiar",
      copied: "copiado",
    },
    footer: {
      builtWith: "Construido con",
      rights: "Todos los derechos reservados.",
      backToTop: "volver arriba",
      source: "código fuente",
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
      paletteHint: "para abrir el menú de comandos",
      actionToggleTheme: "Alternar tema claro / oscuro",
      actionToggleLang: "Alternar idioma español / inglés",
      actionCopyEmail: "Copiar correo electrónico",
    },
    meta: {
      description:
        "Portafolio y sitio personal de un ingeniero de software especializado en productos web modernos con Next.js, TypeScript y arquitecturas escalables.",
    },
  },

  /* ------------------------------------------------------------------ EN */
  en: {
    nav: {
      about: "about",
      services: "services",
      projects: "projects",
      contact: "contact",
    },
    hero: {
      status: {
        available: "available for new projects",
        busy: "fully booked right now",
      },
      cmdWhoami: "whoami",
      cmdRole: "cat role.txt",
      cmdStack: "ls stack/",
      intro:
        "I design and build web products end to end: architecture, interface and infrastructure. Maintainable code, interfaces that feel fast, and technical decisions that justify themselves.",
      ctaPrimary: "View projects",
      ctaSecondary: "Let's work together",
      stats: [
        { value: "5+", label: "years of experience" },
        { value: "30+", label: "projects shipped" },
        { value: "99", label: "Lighthouse score" },
      ],
      scrollHint: "scroll",
    },
    about: {
      index: "01",
      eyebrow: "about",
      title: "Engineering with judgement, not templates",
      paragraphs: [
        "I'm a software engineer. I work across the full product lifecycle: from the data model and the API to the last interface animation. I'm interested in the point where engineering and design stop being two separate disciplines.",
        "My day to day is TypeScript, React and Next.js on the frontend; Node.js, Python and PostgreSQL on the backend; and Docker, CI/CD and observability so that what gets built survives its first month in production.",
        "I write code for whoever reads it next. I'd rather ship a simple, explainable solution than a clever, unmaintainable one.",
      ],
      skillsTitle: "Stack & tooling",
      principlesTitle: "How I work",
      principles: [
        {
          title: "Problem first",
          body: "Before picking technology, I understand what needs solving and for whom.",
        },
        {
          title: "Measurable performance",
          body: "Core Web Vitals, bundle budgets and real profiles — not gut feeling.",
        },
        {
          title: "Accessible by default",
          body: "Semantics, contrast, keyboard navigation and reduced motion from day one.",
        },
        {
          title: "Actually ship",
          body: "An automated, documented deployment beats a perfect demo every time.",
        },
      ],
    },
    services: {
      index: "02",
      eyebrow: "services",
      title: "How I can help",
      subtitle:
        "Focused collaborations or full projects, from the first idea to production deployment.",
      hint: "hover a row for details",
    },
    projects: {
      index: "03",
      eyebrow: "portfolio",
      title: "Selected work",
      subtitle:
        "A sample of products, tools and experiments. Filter by type to explore.",
      filterAll: "all",
      viewCode: "code",
      viewLive: "demo",
      colName: "project",
      colStack: "stack",
      colYear: "year",
      empty: "No projects in this category.",
    },
    contact: {
      index: "04",
      eyebrow: "contact",
      title: "Tell me what you're building",
      subtitle:
        "A new product, a migration, an interface that needs care? Send me a note and I'll reply within 24 hours.",
      nameLabel: "name",
      emailLabel: "email",
      messageLabel: "message",
      namePlaceholder: "Your name",
      emailPlaceholder: "you@email.com",
      messagePlaceholder: "Tell me about your project…",
      send: "send message",
      sending: "sending…",
      sent: "Message ready. Your email client will open.",
      invalid: "Please check the highlighted fields.",
      orEmail: "Or email me directly at",
      copy: "copy",
      copied: "copied",
    },
    footer: {
      builtWith: "Built with",
      rights: "All rights reserved.",
      backToTop: "back to top",
      source: "source code",
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
      paletteHint: "to open the command menu",
      actionToggleTheme: "Toggle light / dark theme",
      actionToggleLang: "Toggle Spanish / English",
      actionCopyEmail: "Copy email address",
    },
    meta: {
      description:
        "Portfolio and personal site of a software engineer specialising in modern web products with Next.js, TypeScript and scalable architectures.",
    },
  },
};
