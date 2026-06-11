"use client";

import { useLanguage } from "@/components/providers/language-provider";

export function LanguageToggle() {
  const { locale, toggleLocale } = useLanguage();

  return (
    <button
      type="button"
      onClick={toggleLocale}
      aria-label="Toggle language"
      className="inline-flex h-9 items-center justify-center rounded-full border border-border bg-background-elevated px-3 text-xs font-semibold uppercase tracking-wider text-foreground transition-colors hover:border-accent hover:text-accent"
    >
      <span className={locale === "es" ? "text-accent" : "text-muted"}>ES</span>
      <span className="mx-1 text-muted">/</span>
      <span className={locale === "en" ? "text-accent" : "text-muted"}>EN</span>
    </button>
  );
}
