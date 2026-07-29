/**
 * ============================================================================
 *  SITE CONFIG — ÚNICO ARCHIVO PARA TUS DATOS PERSONALES
 * ============================================================================
 *  Cambia estos valores y el sitio entero se actualiza: navbar, hero, SEO,
 *  metadatos, footer, contacto y JSON-LD para Google.
 *
 *  Textos largos bilingües (ES/EN) → src/i18n/dictionary.ts
 *  Servicios, experiencia y stack  → src/lib/content.ts
 * ============================================================================
 */

export const site = {
  /** Alias. Se usa en el prompt de terminal y en el logo. */
  handle: "squierdan",

  /** Nombre completo. Hero, SEO y datos estructurados. */
  name: "Elian Caizapanta",

  /** Rol principal (aparece en el título de la pestaña y en el hero). */
  role: "Software Engineer",

  /** Ubicación mostrada en la barra de estado. */
  location: "Quito, Ecuador",

  /** Zona horaria IANA — alimenta el reloj en vivo del hero. */
  timezone: "America/Guayaquil",

  /** URL de producción. Mantenla sincronizada con el dominio de Vercel. */
  url: "https://personal-website-blush-three-41.vercel.app",

  /** Correo de contacto público. */
  email: "daniel_caiz@hotmail.com",

  /** Enlaces sociales. Deja "" para ocultar uno. */
  socials: {
    github: "https://github.com/Squierdan",
    linkedin: "https://www.linkedin.com/in/elian-caizapanta-b502aa276/",
    x: "",
  },

  /** CV en PDF. Los archivos viven en /public y se sirven tal cual. */
  cv: {
    es: "/Elian-Caizapanta-CV-ES.pdf",
    en: "/Elian-Caizapanta-CV-EN.pdf",
  },

  /** DOI de la publicación científica destacada. */
  publicationDoi: "https://doi.org/10.1007/s12243-025-01104-1",

  /** Controla el indicador verde de disponibilidad. */
  available: true,
} as const;

export type Site = typeof site;
