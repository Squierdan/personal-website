"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { riseIn, riseInDelayed, ruleDraw, stagger } from "@/lib/motion";

/** Elementos permitidos como contenedor. `li` evita anidar un div dentro de
 *  un `<ul>`, que era HTML inválido en la versión anterior de este archivo. */
const AS = {
  div: motion.div,
  li: motion.li,
  ul: motion.ul,
} as const;

type As = keyof typeof AS;

type RevealProps = {
  children: ReactNode;
  className?: string;
  as?: As;
  delay?: number;
};

/**
 * ============================================================================
 *  APARICIONES AL HACER SCROLL
 * ============================================================================
 *  ⚠️ Todos los elementos animados de este archivo llevan `data-reveal`, y es
 *  obligatorio: es el gancho de la red de seguridad de `prefers-reduced-motion`
 *  que vive en `globals.css`.
 *
 *  Framer Motion, al detectar esa preferencia, suprime la animación y deja el
 *  elemento en su estado `initial` — `opacity: 0` — dejando el contenido en el
 *  DOM pero invisible. Condicionar la prop `initial` no sirve: se lee una sola
 *  vez al montar, y en el render de hidratación la preferencia todavía no se
 *  conoce. La regla CSS con `!important` sí gana al estilo inline de Framer.
 *
 *  Si añades un componente de aparición aquí, ponle `data-reveal`.
 * ============================================================================
 */

/** Aparición al entrar en viewport, una sola vez. */
export function Reveal({
  children,
  className,
  as = "div",
  delay = 0,
}: RevealProps) {
  const Tag = AS[as];

  return (
    <Tag
      data-reveal
      className={className}
      variants={delay ? riseInDelayed(delay) : riseIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-70px" }}
    >
      {children}
    </Tag>
  );
}

/**
 * Contenedor de una lista que aparece escalonada. Sólo orquesta: no anima nada
 * propio, así que no interfiere con el layout de sus hijos.
 *
 * Para una lista, no envuelvas cada hijo en `<Reveal>` con un `delay` calculado
 * a mano: usa `<RevealGroup>` + `<RevealItem>`, que reparte la entrada desde el
 * contenedor y mantiene el desfase coherente con el resto del sitio
 * (`STAGGER` en `src/lib/motion.ts`).
 */
export function RevealGroup({ children, className, as = "div" }: RevealProps) {
  const Tag = AS[as];

  return (
    <Tag
      className={className}
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-70px" }}
    >
      {children}
    </Tag>
  );
}

/** Hijo de `RevealGroup`. Hereda el momento de entrada del contenedor. */
export function RevealItem({ children, className, as = "div" }: RevealProps) {
  const Tag = AS[as];

  return (
    <Tag data-reveal className={className} variants={riseIn}>
      {children}
    </Tag>
  );
}

/**
 * Regla de 1 px que se traza desde su origen izquierdo al entrar en pantalla.
 *
 * Es el gesto de un plano técnico dibujándose, y es la animación más barata que
 * hay: `scaleX` se resuelve en el compositor sin recalcular layout. Sustituye a
 * los `<span className="h-px flex-1 bg-border" />` estáticos.
 */
export function RevealRule({ className = "" }: { className?: string }) {
  return (
    <motion.span
      aria-hidden
      data-reveal
      className={`h-px flex-1 bg-border ${className}`}
      style={{ transformOrigin: "0% 50%" }}
      variants={ruleDraw}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-70px" }}
    />
  );
}
