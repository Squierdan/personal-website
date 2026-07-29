"use client";

import { useEffect, useState } from "react";

/**
 * SHA-256 real (Web Crypto) sobre `input`, no un string decorativo: el mismo
 * primitivo con el que se verifica la integridad de un commit o un paquete,
 * aplicado al propio bloque de perfil. Se computa tras montar (nunca en SSR)
 * y la actualización de estado ocurre dentro de un timeout, nunca síncrona
 * en el cuerpo del efecto.
 */
export function useIntegrityHash(input: string, length = 12) {
  const [hash, setHash] = useState("");

  useEffect(() => {
    let cancelled = false;

    const timeout = setTimeout(() => {
      const bytes = new TextEncoder().encode(input);
      crypto.subtle.digest("SHA-256", bytes).then((digest) => {
        if (cancelled) return;
        const hex = Array.from(new Uint8Array(digest))
          .map((byte) => byte.toString(16).padStart(2, "0"))
          .join("");
        setHash(hex.slice(0, length));
      });
    }, 0);

    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, [input, length]);

  return hash;
}
