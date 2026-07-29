"use client";

import { useEffect, useState } from "react";

/**
 * Escribe `text` carácter a carácter.
 * Respeta `prefers-reduced-motion`: si el usuario lo pide, muestra el texto
 * completo de inmediato. Toda la actualización de estado ocurre dentro de
 * temporizadores (nunca de forma síncrona dentro del efecto).
 */
export function useTypewriter(text: string, speed = 42, startDelay = 0) {
  const [output, setOutput] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;

    const timeout = setTimeout(() => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reduced) {
        setOutput(text);
        setDone(true);
        return;
      }

      let index = 0;
      interval = setInterval(() => {
        index += 1;
        setOutput(text.slice(0, index));
        if (index >= text.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [text, speed, startDelay]);

  return { output, done };
}
