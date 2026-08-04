"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

/**
 * ============================================================================
 *  ¿EL VISITANTE PIDIÓ MENOS MOVIMIENTO?
 * ============================================================================
 *  `useSyncExternalStore` y no `useState` + `useEffect`, por lo mismo que
 *  `use-clock.ts`: la regla `react-hooks/set-state-in-effect` está activa y
 *  rompe el build si se llama a `setState` de forma síncrona dentro de un
 *  efecto (§4.5 de AI_CONTEXT.md). Además reacciona si el visitante cambia la
 *  preferencia con la página abierta, sin recargar.
 *
 *  ⚠️ PARA QUÉ SIRVE, Y PARA QUÉ NO.
 *  --------------------------------------------------------------------------
 *  NO sirve para condicionar la prop `initial` de una aparición. Eso ya se
 *  intentó y está documentado en §4.11: `initial` se lee UNA vez al montar, y
 *  en el render de hidratación este hook todavía devuelve el snapshot de
 *  servidor (`false`), así que Framer fija `hidden` y no lo revisa nunca más.
 *  La garantía de las apariciones vive en CSS, en `globals.css`.
 *
 *  SÍ sirve para condicionar la prop `exit`, que es un caso distinto: `exit`
 *  se lee en el momento del desmontaje, mucho después de la hidratación,
 *  cuando este hook ya devuelve el valor real del navegador. Ver el uso en
 *  `command-palette.tsx` y `navbar.tsx`.
 *
 *  El snapshot de servidor es `false` a propósito: en el HTML prerenderizado
 *  no hay `window`, y asumir "sin preferencia" hace que el primer pintado sea
 *  idéntico para todo el mundo. La corrección llega en el primer render de
 *  cliente, antes de que el visitante pueda desmontar nada.
 * ============================================================================
 */
export function usePrefersReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
