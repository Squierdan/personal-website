"use client";

import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/**
 * Devuelve `false` durante el render en servidor y `true` tras hidratar.
 * Evita desajustes de hidratación al leer APIs del navegador (tema, idioma).
 */
export function useMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}
