import type { Locale } from "./config";

type Dictionary = {
  nav: {
    home: string;
    about: string;
    services: string;
    projects: string;
    contact: string;
  };
  hero: {
    badge: string;
    titleLead: string;
    titleHighlight: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    stats: { value: string; label: string }[];
  };
  about: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
    skillsTitle: string;
  };
  services: {
    eyebrow: string;
    title: string;
    subtitle: string;
  };
  projects: {
    eyebrow: string;
    title: string;
    subtitle: string;
    viewCode: string;
    viewLive: string;
    filterAll: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    subtitle: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    messagePlaceholder: string;
    send: string;
    sending: string;
    sent: string;
    orEmail: string;
  };
  footer: {
    tagline: string;
    builtWith: string;
    rights: string;
    nav: string;
    social: string;
  };
  themeToggle: { light: string; dark: string };
};

export const dictionaries: Record<Locale, Dictionary> = {
  es: {
    nav: {
      home: "Inicio",
      about: "Sobre mí",
      services: "Servicios",
      projects: "Proyectos",
      contact: "Contacto",
    },
    hero: {
      badge: "Disponible para nuevos proyectos",
      titleLead: "Hola, soy Elian. Construyo",
      titleHighlight: "software que deja huella",
      subtitle:
        "Ingeniero de software enfocado en crear productos web modernos, escalables y centrados en las personas. Convierto ideas complejas en experiencias digitales elegantes.",
      ctaPrimary: "Ver proyectos",
      ctaSecondary: "Hablemos",
      stats: [
        { value: "5+", label: "Años de experiencia" },
        { value: "30+", label: "Proyectos entregados" },
        { value: "15+", label: "Clientes satisfechos" },
      ],
    },
    about: {
      eyebrow: "Sobre mí",
      title: "Ingeniería con propósito y detalle",
      paragraphs: [
        "Soy ingeniero de software apasionado por el diseño de productos que combinan rendimiento, estética y una excelente experiencia de usuario. Trabajo de extremo a extremo: desde la arquitectura del backend hasta la interfaz final.",
        "Me especializo en aplicaciones web modernas con TypeScript, React y Node.js, aplicando buenas prácticas, pruebas y código mantenible. Creo en las soluciones simples para problemas complejos.",
      ],
      skillsTitle: "Tecnologías y herramientas",
    },
    services: {
      eyebrow: "Servicios",
      title: "Lo que puedo hacer por ti",
      subtitle:
        "Soluciones completas adaptadas a las necesidades de tu negocio, desde la idea hasta el despliegue.",
    },
    projects: {
      eyebrow: "Portafolio",
      title: "Proyectos seleccionados",
      subtitle:
        "Una muestra de productos y experimentos en los que he trabajado recientemente.",
      viewCode: "Código",
      viewLive: "Ver demo",
      filterAll: "Todos",
    },
    contact: {
      eyebrow: "Contacto",
      title: "Hagamos algo grandioso juntos",
      subtitle:
        "¿Tienes un proyecto en mente o quieres colaborar? Escríbeme y te responderé lo antes posible.",
      namePlaceholder: "Tu nombre",
      emailPlaceholder: "Tu correo electrónico",
      messagePlaceholder: "Cuéntame sobre tu proyecto...",
      send: "Enviar mensaje",
      sending: "Enviando...",
      sent: "¡Mensaje enviado! Gracias.",
      orEmail: "O escríbeme directamente a",
    },
    footer: {
      tagline: "Construyendo el futuro, una línea de código a la vez.",
      builtWith: "Hecho con Next.js y Tailwind CSS",
      rights: "Todos los derechos reservados.",
      nav: "Navegación",
      social: "Redes",
    },
    themeToggle: { light: "Modo claro", dark: "Modo oscuro" },
  },
  en: {
    nav: {
      home: "Home",
      about: "About",
      services: "Services",
      projects: "Projects",
      contact: "Contact",
    },
    hero: {
      badge: "Available for new projects",
      titleLead: "Hi, I'm Elian. I build",
      titleHighlight: "software that makes an impact",
      subtitle:
        "Software engineer focused on building modern, scalable and human-centered web products. I turn complex ideas into elegant digital experiences.",
      ctaPrimary: "View projects",
      ctaSecondary: "Let's talk",
      stats: [
        { value: "5+", label: "Years of experience" },
        { value: "30+", label: "Projects delivered" },
        { value: "15+", label: "Happy clients" },
      ],
    },
    about: {
      eyebrow: "About me",
      title: "Engineering with purpose and care",
      paragraphs: [
        "I'm a software engineer passionate about building products that blend performance, aesthetics and a great user experience. I work end-to-end: from backend architecture to the final interface.",
        "I specialize in modern web applications with TypeScript, React and Node.js, applying best practices, testing and maintainable code. I believe in simple solutions to complex problems.",
      ],
      skillsTitle: "Technologies & tools",
    },
    services: {
      eyebrow: "Services",
      title: "What I can do for you",
      subtitle:
        "End-to-end solutions tailored to your business needs, from idea to deployment.",
    },
    projects: {
      eyebrow: "Portfolio",
      title: "Selected projects",
      subtitle:
        "A selection of products and experiments I've worked on recently.",
      viewCode: "Code",
      viewLive: "Live demo",
      filterAll: "All",
    },
    contact: {
      eyebrow: "Contact",
      title: "Let's build something great together",
      subtitle:
        "Have a project in mind or want to collaborate? Drop me a line and I'll get back to you as soon as possible.",
      namePlaceholder: "Your name",
      emailPlaceholder: "Your email",
      messagePlaceholder: "Tell me about your project...",
      send: "Send message",
      sending: "Sending...",
      sent: "Message sent! Thank you.",
      orEmail: "Or email me directly at",
    },
    footer: {
      tagline: "Building the future, one line of code at a time.",
      builtWith: "Built with Next.js and Tailwind CSS",
      rights: "All rights reserved.",
      nav: "Navigation",
      social: "Social",
    },
    themeToggle: { light: "Light mode", dark: "Dark mode" },
  },
};
