"use client";

import { useEffect, useState } from "react";

/**
 * Observa las secciones indicadas y devuelve el id de la que está en pantalla.
 * Usa IntersectionObserver (no listeners de scroll) para no bloquear el hilo.
 */
export function useActiveSection(ids: string[], offset = "-45% 0px -50% 0px") {
  const [active, setActive] = useState(ids[0] ?? "");

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length > 0) setActive(visible[0].target.id);
      },
      { rootMargin: offset, threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids, offset]);

  return active;
}
