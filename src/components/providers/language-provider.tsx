"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { defaultLocale, type Locale } from "@/i18n/config";
import { dictionaries } from "@/i18n/dictionary";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  t: (typeof dictionaries)[Locale];
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);

  /*
   * ⚠️ EL IDIOMA NO SE GUARDA, Y ES DELIBERADO.
   * -------------------------------------------------------------------------
   * Antes se recordaba en localStorage. El problema es que este sitio es, sobre
   * todo, un enlace que se comparte: si Elian dejaba su móvil en español y le
   * enseñaba la página a alguien, esa persona la veía en español. Y al volver
   * él mismo días después, se la encontraba como la hubiera dejado en vez de
   * como la ve un reclutador.
   *
   * Ahora abre SIEMPRE en `defaultLocale` (inglés), que es como llega a
   * cualquiera que reciba el enlace. El conmutador --lang sigue funcionando
   * durante la visita; simplemente no sobrevive a una recarga.
   *
   * El tema sí se recuerda, y no es una incoherencia: el idioma es una decisión
   * de presentación, pero claro/oscuro es una preferencia de confort visual y
   * a veces de accesibilidad. Obligar a alguien a volver a elegirlo en cada
   * visita sería hostil. Ver la nota en `providers/index.tsx`.
   */

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
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
