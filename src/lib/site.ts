/**
 * ============================================================================
 *  SITE CONFIG — ÚNICO ARCHIVO QUE NECESITAS EDITAR PARA PERSONALIZAR EL SITIO
 * ============================================================================
 *
 *  Todo lo marcado con  <-- EDITAR  es un placeholder.
 *  Cambia estos valores y el sitio entero se actualiza (navbar, hero, SEO,
 *  metadatos, footer, contacto, JSON-LD para Google, etc.).
 *
 *  Los textos largos bilingües (ES/EN) viven en  src/i18n/dictionary.ts
 *  Los proyectos y servicios viven en             src/lib/content.ts
 * ============================================================================
 */

export const site = {
  /** Nombre corto usado en el prompt de terminal y el logo. */
  handle: "elian", // <-- EDITAR

  /** Nombre completo. Aparece en el hero, SEO y JSON-LD. */
  name: "Elian Caizapanta", // <-- EDITAR

  /** Rol profesional (se muestra en inglés y español desde el diccionario). */
  role: "Software Engineer", // <-- EDITAR

  /** Ubicación. Se muestra en la barra de estado inferior. */
  location: "Quito, Ecuador", // <-- EDITAR

  /** Zona horaria IANA — usada por el reloj en vivo de la barra de estado. */
  timezone: "America/Guayaquil", // <-- EDITAR

  /**
   * URL final del sitio en producción. IMPORTANTE: cámbiala después del primer
   * deploy en Vercel para que el SEO, sitemap y Open Graph apunten bien.
   */
  url: "https://personal-website-blush-three-41.vercel.app", // <-- EDITAR

  /** Correo de contacto público. */
  email: "luiscaizapanta01@gmail.com", // <-- EDITAR

  /** Enlaces sociales. Deja el valor vacío ("") para ocultar un enlace. */
  socials: {
    github: "https://github.com/Squierdan", // <-- EDITAR
    linkedin: "https://www.linkedin.com/in/tu-usuario", // <-- EDITAR
    x: "", // <-- EDITAR (opcional)
  },

  /** ¿Estás disponible para nuevos proyectos? Controla el indicador verde. */
  available: true, // <-- EDITAR

  /** Año de inicio de carrera — se usa para calcular años de experiencia. */
  careerStartYear: 2020, // <-- EDITAR
} as const;

export type Site = typeof site;
