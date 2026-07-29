"use client";

import { ThemeProvider } from "next-themes";
import { LanguageProvider } from "./language-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    /*
     * `enableSystem={false}` es deliberado: el sitio abre SIEMPRE en oscuro,
     * aunque el sistema operativo del visitante esté en claro. El conmutador
     * --theme sigue disponible y la elección se guarda en el navegador.
     */
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      {/*
       * Nota: NO añadas aquí `<MotionConfig reducedMotion="user">`. Se probó y
       * no resuelve el problema de `prefers-reduced-motion` con Framer Motion
       * (los elementos se quedaban igualmente en `opacity: 0`). La solución
       * está en `globals.css`, en la regla `[data-reveal]` dentro del bloque
       * `@media (prefers-reduced-motion: reduce)`. Ver AI_CONTEXT.md §4.6.
       */}
      <LanguageProvider>{children}</LanguageProvider>
    </ThemeProvider>
  );
}
