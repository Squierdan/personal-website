"use client";

import { motion } from "framer-motion";
import { Check, RotateCw } from "lucide-react";
import { useState, type ReactNode } from "react";
import { useDigest } from "@/hooks/use-digest";
import { DUR, EASE_OUT } from "@/lib/motion";

/** 8 × 8 = 64 celdas = los 64 dígitos hexadecimales de un SHA-256. */
const SIDE = 8;
const CELLS = SIDE * SIDE;

/** Umbral por encima del cual la celda se pinta en ámbar en vez de teal. */
const HOT_NIBBLE = 13;

type HashPortraitProps = {
  /** Cadena de identidad de la que se deriva el digest. */
  input: string;
  label: string;
  verifyLabel: string;
  verifiedLabel: string;
  computingLabel: string;
  legend: string;
  /**
   * Pie del instrumento. Se dibuja DENTRO del marco, bajo el digest y separado
   * por un filete. Existe para que la placa sea **un solo aparato** —cabecera
   * de estado, rejilla, digest y lecturas— en vez de una placa con una tira de
   * datos flotando debajo. La placa no sabe ni le importa qué se le pasa.
   */
  footer?: ReactNode;
};

/**
 * ============================================================================
 *  RETRATO-HASH
 * ============================================================================
 *  El hero no lleva fotografía. A un ingeniero de seguridad no se le identifica
 *  por su cara sino por su huella, así que el retrato **es** su huella:
 *
 *   · La rejilla tiene 64 celdas y un SHA-256 en hexadecimal tiene 64 dígitos.
 *     La correspondencia es 1:1 — cada celda ES un dígito del digest, no una
 *     forma inventada a partir de él. La intensidad de la celda es el valor del
 *     nibble (0–15) normalizado.
 *   · Las celdas con valor ≥ 13 se pintan en ámbar. Es un umbral sobre datos
 *     reales, el mismo gesto con el que se resalta un hallazgo por severidad.
 *   · Al cargar, la placa atraviesa la **avalancha** (ver `useDigest`) antes de
 *     fijarse: digests reales de entradas casi idénticas, que no se parecen en
 *     nada entre sí. Es la propiedad que hace útil a un hash, mostrada en vez
 *     de explicada.
 *   · El botón vuelve a verificar: recorre la avalancha otra vez y aterriza en
 *     el mismo digest. Si la placa final es idéntica, la identidad no cambió.
 *
 *  Coste: 64 spans que sólo transicionan `opacity`, que se resuelve en el
 *  compositor. Sin sombras, sin blur, sin una animación de Framer Motion por
 *  celda.
 * ============================================================================
 */
export function HashPortrait({
  input,
  label,
  verifyLabel,
  verifiedLabel,
  computingLabel,
  legend,
  footer,
}: HashPortraitProps) {
  const [runId, setRunId] = useState(0);
  const { hex, locked } = useDigest(input, runId);

  return (
    // Acotada y centrada mientras el hero es de una sola columna: la placa es
    // cuadrada, así que sin tope crecía a 661 × 661 px en tablet (medido a
    // 768 px de ancho) y se comía la pantalla entera. A partir de `lg` el hero
    // pasa a dos columnas y la columna ya la limita.
    <div className="corner-marks mx-auto w-full max-w-[420px] lg:mx-0 lg:max-w-none">
      <div className="term relative">
        {/* ------------------------------------------------ Cabecera de placa */}
        <div className="flex items-center gap-2 border-b border-border px-3 py-2.5">
          <span className="label">{label}</span>

          <span
            className="ml-auto flex items-center gap-1.5 font-mono text-data tabular-nums"
            role="status"
            aria-live="polite"
          >
            {locked ? (
              <>
                <Check aria-hidden className="h-3 w-3 text-accent" />
                <span className="text-accent">{verifiedLabel}</span>
              </>
            ) : (
              <span className="text-[var(--amber)]">{computingLabel}</span>
            )}
          </span>

          <button
            type="button"
            onClick={() => setRunId((current) => current + 1)}
            aria-label={verifyLabel}
            className="group -mr-1 inline-flex h-8 w-8 items-center justify-center border border-transparent text-fg-subtle transition-colors hover:border-border-strong hover:text-accent"
          >
            <RotateCw
              aria-hidden
              className="h-3 w-3 transition-transform duration-500 group-hover:rotate-180"
            />
          </button>
        </div>

        {/* -------------------------------------------------------- La placa */}
        <motion.div
          className="p-3 sm:p-4"
          animate={locked ? { scale: [0.99, 1] } : { scale: 1 }}
          transition={{ duration: DUR.base, ease: EASE_OUT }}
        >
          <div
            role="img"
            aria-label={legend}
            className="grid w-full grid-cols-8 gap-[3px] border border-border bg-bg-sunken p-[3px]"
          >
            {Array.from({ length: CELLS }, (_, index) => {
              const char = hex[index];
              const nibble = char ? parseInt(char, 16) : 0;
              const hot = nibble >= HOT_NIBBLE;
              // 8 % de suelo: una celda en 0 sigue siendo una celda, no un
              // hueco. Si no, la placa se lee como agujeros y no como datos.
              const weight = 0.08 + (nibble / 15) * 0.92;
              const row = Math.floor(index / SIDE);
              const col = index % SIDE;

              return (
                <span
                  key={index}
                  aria-hidden
                  className="aspect-square"
                  style={{
                    // Color sólido + `opacity`, y NO `color-mix()`.
                    // `color-mix()` con `var()` dentro no interpola: el
                    // navegador deja la transición congelada en el valor
                    // inicial (medido: las 64 celdas se quedaban en 0,08 con el
                    // style inline correcto). `opacity` además se resuelve en el
                    // compositor, sin repintar.
                    backgroundColor: `var(${hot ? "--amber" : "--accent"})`,
                    opacity: weight,
                    transition: "opacity 200ms linear",
                    // Desfase diagonal: la avalancha recorre la placa como una
                    // onda en vez de cambiar los 64 valores a la vez.
                    transitionDelay: `${(row + col) * 3}ms`,
                  }}
                />
              );
            })}
          </div>
        </motion.div>

        {/* ------------------------------------------------ El digest, en texto */}
        <div className="border-t border-border px-3 py-2.5">
          <p className="break-all font-mono text-data leading-[1.7] text-fg-subtle">
            {hex || "·".repeat(CELLS)}
          </p>
        </div>

        {footer ? (
          <div className="border-t border-border">{footer}</div>
        ) : null}
      </div>
    </div>
  );
}
