"use client";

import { useSyncExternalStore } from "react";

/** Fuente externa: un único intervalo compartido que emite cada segundo. */
function subscribe(onChange: () => void) {
  const id = setInterval(onChange, 1000);
  return () => clearInterval(id);
}

/** Instantánea estable: el segundo actual (evita renders innecesarios). */
const getSnapshot = () => Math.floor(Date.now() / 1000);
const getServerSnapshot = () => 0;

/**
 * Reloj en vivo para una zona horaria IANA.
 * Implementado con `useSyncExternalStore` (patrón recomendado por React para
 * fuentes externas) en lugar de `useState` + `useEffect`.
 */
export function useClock(timeZone: string) {
  const seconds = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  if (seconds === 0) return "";

  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone,
  }).format(seconds * 1000);
}
