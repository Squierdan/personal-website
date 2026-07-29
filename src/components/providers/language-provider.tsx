"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { defaultLocale, locales, type Locale } from "@/i18n/config";
import { dictionaries } from "@/i18n/dictionary";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  t: (typeof dictionaries)[Locale];
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "preferred-locale";

function isLocale(value: string | null): value is Locale {
  return value !== null && locales.includes(value as Locale);
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);

  useEffect(() => {
    /*
     * El sitio SIEMPRE abre en `defaultLocale` (inglés), sin importar el idioma
     * del navegador: así el enlace se ve igual para todo el mundo.
     * Solo se respeta la elección explícita que el visitante haya hecho antes
     * con el conmutador --lang, guardada en localStorage.
     */
    const stored = localStorage.getItem(STORAGE_KEY);
    if (isLocale(stored) && stored !== defaultLocale) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- init única en cliente
      setLocaleState(stored);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    localStorage.setItem(STORAGE_KEY, next);
  }, []);

  const toggleLocale = useCallback(() => {
    setLocale(locale === "es" ? "en" : "es");
  }, [locale, setLocale]);

  const value = useMemo<LanguageContextValue>(
    () => ({ locale, setLocale, toggleLocale, t: dictionaries[locale] }),
    [locale, setLocale, toggleLocale],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
