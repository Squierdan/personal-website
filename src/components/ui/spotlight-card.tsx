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
 *  ⚠️ CON «REDUCIR MOVIMIENTO» EL FOCO SIGUE EXISTIENDO, PERO NO SIGUE AL
 *  CURSOR.
 *  Lo que molesta de este gesto no es el resplandor, es el SEGUIMIENTO: un
 *  elemento persiguiendo al puntero es movimiento. El resplandor en sí es un
 *  cambio de color. Así que con la preferencia activa este componente deja de
 *  escribir `--spot-x/--spot-y`, el degradado se queda quieto en el 50 %/50 %
 *  por defecto, y lo único que ocurre al pasar el cursor es que aparece por
 *  opacidad — que es la clase de respuesta que la preferencia sí permite.
 *
 *  Antes la capa se ocultaba entera con `display: none` en ese caso, y esos
 *  visitantes se quedaban sin ninguna respuesta en las tarjetas. Ver la nota
 *  de la media query en `globals.css`.
 *
 *  En un dispositivo sin puntero fino la capa sí desaparece del todo por CSS:
 *  ahí no hay cursor que seguir ni hover que responder.
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
