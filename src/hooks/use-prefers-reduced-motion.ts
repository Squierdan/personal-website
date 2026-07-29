"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

/**
 * Lee la preferencia del sistema de forma reactiva. `useSyncExternalStore` en
 * lugar de `useState` + `useEffect` por dos razones: no dispara la regla
 * `react-hooks/set-state-in-effect` (que rompe el build) y devuelve el valor
 * correcto ya en el primer render del cliente, sin un fotograma intermedio.
 *
 * El CSS de `globals.css` ya neutraliza transiciones y animaciones globalmente;
 * este hook es para el caso que el CSS no puede cubrir: JavaScript que decide
 * *si* ejecutar una secuencia (la avalancha del hash, el contador de métricas)
 * en vez de sólo acelerarla.
 */
function subscribe(onChange: () => void) {
  const list = window.matchMedia(QUERY);
  list.addEventListener("change", onChange);
  return () => list.removeEventListener("change", onChange);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

/** En servidor asumimos movimiento permitido; el cliente corrige al hidratar. */
function getServerSnapshot() {
  return false;
}

export function usePrefersReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
