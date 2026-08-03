"use client";

import { useLanguage } from "@/components/providers/language-provider";

/** Alterna ES/EN, también presentado como bandera de comando. */
export function LanguageToggle() {
  const { locale, toggleLocale, t } = useLanguage();

  return (
    <button
      type="button"
      onClick={toggleLocale}
      aria-label={t.ui.language}
      title={t.ui.language}
      /* `whitespace-nowrap`: en español las etiquetas de navegación son
         más largas, el contenedor derecho se encogía y el flag partía
         en dos líneas — se veía «--» arriba y «theme=» debajo. Medido a
         1040 px: el flag necesitaba 40 px y tenía 31. */
      className="press group inline-flex h-10 shrink-0 items-center gap-1.5 whitespace-nowrap border border-border-strong px-2.5 font-mono text-data text-fg-muted hover:border-accent hover:text-accent sm:h-8"
    >
      <span className="text-fg-subtle group-hover:text-accent">--lang=</span>
      <span className="text-fg">{locale}</span>
    </button>
  );
}
