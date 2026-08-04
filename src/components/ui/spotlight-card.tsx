"use client";

import { useEffect, useRef, type ReactNode } from "react";

type SpotlightCardProps = {
  children: ReactNode;
  className?: string;
};

/**
 * ============================================================================
 *  FOCO BAJO EL CURSOR
 * ============================================================================
 *  Envuelve el contenido de una celda de rejilla (Servicios, Habilidades) y le
 *  da la única interacción que le faltaba: un resplandor que sigue al cursor
 *  dentro de sus límites. El resto del sistema visual de la página está en
 *  `.press` (botones) y `.scan-row` (filas de tabla); esto es su equivalente
 *  para superficies de tipo tarjeta.
 *
 *  ⚠️ EL SEGUIMIENTO NO ESCRIBE EN CADA EVENTO DE PUNTERO.
 *  `pointermove` puede disparar cientos de veces por segundo — mucho más de
 *  lo que cualquier pantalla puede pintar. Se guarda sólo la última posición
 *  conocida en una ref y se agenda UNA escritura al DOM por fotograma con
 *  `requestAnimationFrame`; si ya hay una agendada, los eventos siguientes no
 *  hacen nada hasta que se resuelva. Es la mitigación estándar para
 *  seguimiento de puntero y evita convertir un gesto decorativo en un
 *  problema de rendimiento.
 *
 *  La detección de capacidad del dispositivo (`matchMedia`) es sólo para
 *  ahorrar el trabajo del listener en un móvil, donde nunca hay puntero que
 *  seguir. La garantía real de que el resplandor no aparece donde no debe
 *  vive en CSS (`globals.css`, la media query sobre `.spotlight-glow`): si
 *  esta comprobación fallara, la capa seguiría oculta por `display: none`.
 * ============================================================================
 */
export function SpotlightCard({ children, className = "" }: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const enabled = useRef(false);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    enabled.current =
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    return () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, []);

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!enabled.current || frame.current !== null) return;

    const x = event.clientX;
    const y = event.clientY;

    frame.current = requestAnimationFrame(() => {
      const el = ref.current;
      frame.current = null;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--spot-x", `${x - rect.left}px`);
      el.style.setProperty("--spot-y", `${y - rect.top}px`);
    });
  };

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      className={`spotlight ${className}`}
    >
      <div aria-hidden className="spotlight-glow" />
      {children}
    </div>
  );
}
