"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

/**
 * ============================================================================
 *  CONTADOR
 * ============================================================================
 *  Cuenta de 0 al valor real cuando entra en pantalla.
 *
 *  ⚠️ EL VALOR FINAL SE RENDERIZA DESDE EL PRIMER FOTOGRAMA.
 *  El estado arranca en `value`, no en 0, y sólo baja a 0 para animar cuando ya
 *  sabemos que hay JavaScript, que el elemento está en pantalla y que no hay
 *  «reducir movimiento» activo. Es deliberado y es la lección de §4.9: si algo
 *  impide que la animación corra, la cifra correcta ya está escrita en el HTML.
 *  Al revés —arrancar en 0 y confiar en que algo lo suba— es exactamente el
 *  patrón que dejó secciones enteras en blanco en este sitio.
 *
 *  Por eso tampoco lleva `data-reveal`: no anima opacidad, anima un número.
 *
 *  El movimiento reducido se consulta con `matchMedia` y no con la red CSS,
 *  porque aquí hay que decidir *si* se cuenta, no a qué velocidad.
 * ============================================================================
 */
export function CountUp({
  value,
  className = "",
}: {
  value: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (value <= 0) return;

    // `setState` dentro de un intervalo y nunca de forma síncrona en el cuerpo
    // del efecto: la regla `react-hooks/set-state-in-effect` rompe el build
    // (§4.5 de AI_CONTEXT.md).
    const steps = Math.min(value, 18);
    const stepMs = 480 / steps;
    let current = 0;

    const id = window.setInterval(() => {
      current += 1;
      const next = Math.round((current / steps) * value);
      setDisplay(next);
      if (current >= steps) {
        window.clearInterval(id);
        setDisplay(value);
      }
    }, stepMs);

    // El primer tick tarda `stepMs`, así que ponemos el 0 dentro del mismo
    // intervalo en vez de antes: nunca se ve un 0 fijo si el intervalo falla.
    return () => window.clearInterval(id);
  }, [inView, value]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
