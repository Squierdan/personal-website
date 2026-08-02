"use client";

import { motion } from "framer-motion";
import { riseIn } from "@/lib/motion";

/** Celdas del medidor. Cinco es lo que se cuenta de un vistazo sin contar. */
const CELLS = 5;

const FILLED: Record<"expert" | "advanced", number> = {
  expert: 5,
  advanced: 4,
};

type MeterProps = {
  level: "expert" | "advanced";
  /** Texto del nivel, ya traducido. */
  label: string;
};

/**
 * ============================================================================
 *  MEDIDOR DE NIVEL
 * ============================================================================
 *  Cinco celdas; se encienden 5 para «experto» y 4 para «avanzado», que son los
 *  dos únicos niveles que declara el CV. No hay más porque no hay más datos:
 *  pintar una barra al 73 % sería inventarse una precisión que nadie ha medido.
 *
 *  ⚠️ LAS CELDAS NO ANIMAN, Y ESO NO ES NEGOCIABLE. LEE ESTO ANTES DE TOCARLAS.
 *  --------------------------------------------------------------------------
 *  La primera versión animaba la opacidad de cada celda con Framer Motion y les
 *  ponía `data-reveal` para engancharlas a la red de movimiento reducido. Con
 *  «reducir movimiento» activo, esa red —`[data-reveal] { opacity: 1
 *  !important }`— encendía **las cinco celdas de todos los medidores**: medido,
 *  50 de 50 encendidas cuando debían ser 47. Cada herramienta se leía como 5/5
 *  y la página afirmaba un nivel de dominio que el CV no declara.
 *
 *  La regla general está en §4.7: `data-reveal` es para lo que aparece, nunca
 *  para lo que anima una magnitud. Aquí la opacidad ES el dato, así que:
 *
 *   · el estado encendido/apagado va en una clase estática (`bg-accent` frente
 *     a `bg-accent/20`), que es alfa del color y no la propiedad `opacity`, de
 *     modo que ninguna red puede pisarlo;
 *   · no hay Framer ni `data-reveal` en la celda;
 *   · lo único que aparece es el conjunto, desde el envoltorio.
 *
 *  Así el medidor dice la verdad con movimiento reducido, sin JavaScript y en
 *  el primer fotograma del HTML. Y el nivel viaja además en texto —`aria-label`
 *  y la etiqueta visible al lado—, nunca sólo en las celdas.
 * ============================================================================
 */
export function Meter({ level, label }: MeterProps) {
  const filled = FILLED[level];

  return (
    <motion.span
      data-reveal
      variants={riseIn}
      className="inline-flex items-center gap-2"
    >
      <span role="img" aria-label={label} className="inline-flex gap-[3px]">
        {Array.from({ length: CELLS }, (_, cell) => (
          <span
            key={cell}
            aria-hidden
            className={`h-3 w-[7px] ${
              cell < filled ? "bg-accent" : "bg-accent/20"
            }`}
          />
        ))}
      </span>
      <span
        aria-hidden
        className="w-[4.5rem] shrink-0 font-mono text-data text-fg-subtle"
      >
        {label}
      </span>
    </motion.span>
  );
}
