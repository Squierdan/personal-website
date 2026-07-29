"use client";

import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "./use-prefers-reduced-motion";

/** SHA-256 de `input` devuelto como hex de 64 caracteres. */
async function digestHex(input: string) {
  const bytes = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

/** Fotogramas intermedios de la avalancha. Impar: el último es el real. */
const AVALANCHE_FRAMES = 9;
const FRAME_MS = 62;

/**
 * Calcula el SHA-256 de `input` y, antes de fijarlo, atraviesa una secuencia
 * de digests de entradas casi idénticas (`input#0`, `input#1`, …).
 *
 * No es un efecto decorativo: es el **efecto avalancha**, la propiedad que
 * define a una función hash criptográfica — cambiar un solo bit de la entrada
 * produce una salida completamente distinta y sin correlación. Lo que se ve
 * reorganizarse en pantalla son digests reales de Web Crypto, uno por
 * fotograma, hasta que se fija el de la identidad verdadera.
 *
 * Con `prefers-reduced-motion` se salta la secuencia y devuelve el digest
 * final directamente.
 *
 * @returns `{ hex, locked }` — `locked` indica que ya es el digest verdadero.
 */
export function useDigest(input: string, runId = 0) {
  const [hex, setHex] = useState("");
  const [locked, setLocked] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    let cancelled = false;
    const timers: number[] = [];

    // Las entradas intermedias difieren del original en unos pocos bytes; el
    // digest resultante, en cambio, no se parece en nada. Ese es el punto.
    const inputs = reduced
      ? [input]
      : [
          ...Array.from({ length: AVALANCHE_FRAMES }, (_, i) => `${input}#${i}`),
          input,
        ];

    Promise.all(inputs.map(digestHex)).then((frames) => {
      if (cancelled) return;
      frames.forEach((frame, index) => {
        const isLast = index === frames.length - 1;
        // El setState vive dentro de un timeout, nunca en el cuerpo del
        // efecto: la regla `react-hooks/set-state-in-effect` falla el build.
        timers.push(
          window.setTimeout(() => {
            if (cancelled) return;
            setHex(frame);
            // `setLocked(isLast)` y no `if (isLast)`: al re-verificar (cambia
            // `runId`) el primer fotograma tiene que devolver el estado a
            // "sin verificar", o el sello quedaría fijo de la ronda anterior.
            setLocked(isLast);
          }, index * FRAME_MS),
        );
      });
    });

    return () => {
      cancelled = true;
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [input, runId, reduced]);

  return { hex, locked };
}
