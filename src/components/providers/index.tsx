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
     * IDIOMA Y TEMA SE COMPORTAN DISTINTO, Y ES A PROPÓSITO.
     *
     * El idioma NO se recuerda: abre siempre en inglés, que es como le llega el
     * enlace a cualquiera (ver `language-provider.tsx`).
     *
     * El tema SÍ se recuerda, pero un visitante nuevo SIEMPRE ve oscuro,
     * ignorando lo que diga su sistema operativo. Es una decisión de marca: el
     * sitio está diseñado en oscuro y así es como debe recibirse un enlace
     * compartido.
     *
     * La asimetría tiene motivo: el idioma es una decisión de presentación,
     * pero claro/oscuro es confort visual y a veces accesibilidad. Reiniciar el
     * tema en cada visita obligaría a quien necesita el modo claro a volver a
     * elegirlo una y otra vez.
     *
     * ── PARA ALINEARLO CON EL DISPOSITIVO ───────────────────────────────────
     * Cambia estas dos props a `defaultTheme="system"` + `enableSystem`. Con
     * eso, quien tenga el sistema en claro abre en claro y quien lo tenga en
     * oscuro abre en oscuro, resuelto antes del primer pintado y sin parpadeo.
     *
     * ⚠️ El matiz que hace falta saber antes de cambiarlo: `prefers-color-scheme`
     * devuelve `light` tanto para «quiero claro» como para «no he elegido
     * nada», y la mayoría de sistemas vienen en claro de fábrica. O sea que
     * «alinearlo con el dispositivo» significa, en la práctica, que la mayoría
     * de visitantes verían el sitio en claro. NO existe la combinación «oscuro
     * salvo que el sistema pida claro explícitamente»: el navegador no
     * distingue esos dos casos.
     *
     * `enableSystem` a secas, sin cambiar `defaultTheme`, no hace nada útil:
     * medido, un visitante nuevo con el sistema en claro seguía viendo oscuro,
     * porque next-themes usa `defaultTheme` mientras no haya nada guardado.
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
