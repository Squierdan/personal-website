"use client";

import { ThemeProvider } from "next-themes";
import { LanguageProvider } from "./language-provider";

/**
 * ⚠️ AQUÍ SE PROBÓ `LazyMotion` + `domAnimation` Y SE QUITÓ. NO LO REINTENTES
 * SIN MEDIRLO ANTES.
 *
 * La idea era obvia: `motion` arrastra todas las funciones de Framer Motion,
 * `domAnimation` trae sólo las que este sitio usa, luego el paquete adelgaza.
 * Medido con dos builds limpias: **735 KB sin LazyMotion, 780 KB con él**. Es
 * decir, 45 KB MÁS.
 *
 * El motivo: la página también importa `AnimatePresence`, `useScroll`,
 * `useSpring` y `useInView` del punto de entrada principal, así que la librería
 * entra entera en el grafo de módulos de todos modos, y `LazyMotion` sólo suma
 * su propia maquinaria de carga diferida encima sin poder quitar nada.
 *
 * Para que `LazyMotion` compensara habría que eliminar también esos cuatro
 * usos, y eso es otro proyecto: el sistema de apariciones depende de ellos.
 */
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
       * `@media (prefers-reduced-motion: reduce)`. Ver AI_CONTEXT.md §4.7.
       */}
      <LanguageProvider>{children}</LanguageProvider>
    </ThemeProvider>
  );
}
