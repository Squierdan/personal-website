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
      className="group inline-flex h-8 items-center gap-1.5 border border-border px-2.5 font-mono text-[11px] text-fg-muted transition-colors hover:border-accent hover:text-accent"
    >
      <span className="text-fg-subtle group-hover:text-accent">--lang=</span>
      <span className="text-fg">{locale}</span>
    </button>
  );
}
