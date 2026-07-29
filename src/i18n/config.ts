export const locales = ["es", "en"] as const;

export type Locale = (typeof locales)[number];

/**
 * Idioma con el que carga el sitio para cualquier visitante nuevo.
 * Se eligió inglés para que el enlace funcione con audiencia internacional;
 * el visitante puede cambiar a español desde la barra superior (--lang) y su
 * elección queda guardada en el navegador.
 */
export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  es: "Español",
  en: "English",
};
