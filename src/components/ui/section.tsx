import type { ReactNode } from "react";
import { Reveal, RevealRule } from "./reveal";

type SectionProps = {
  id: string;
  children: ReactNode;
  className?: string;
};

export function Section({ id, children, className = "" }: SectionProps) {
  return (
    <section
      id={id}
      className={`scroll-mt-24 border-t border-border px-5 py-20 sm:px-8 sm:py-28 lg:px-12 ${className}`}
    >
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}

type SectionHeadingProps = {
  index: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
};

/**
 * Encabezado de sección con estética de plancha de plano técnico.
 *
 * El índice numérico se imprime grande y **en contorno** (`.stencil`), no
 * relleno: ocupa el sitio de un número de plancha y ancla la columna
 * izquierda, pero al no tener masa de color no le disputa la jerarquía al
 * titular que tiene al lado. Un `01` sólido de este tamaño competiría con el
 * `<h2>` y la sección tendría dos protagonistas.
 *
 * La regla se traza al entrar en pantalla en lugar de estar simplemente ahí.
 */
export function SectionHeading({
  index,
  eyebrow,
  title,
  subtitle,
}: SectionHeadingProps) {
  return (
    <Reveal className="mb-12 sm:mb-16">
      <div className="grid gap-x-6 sm:grid-cols-[auto_1fr] sm:gap-x-8">
        <span
          aria-hidden
          className="stencil hidden font-mono text-[3.5rem] font-bold leading-[0.8] sm:block lg:text-[4.5rem]"
        >
          {index}
        </span>

        <div className="min-w-0">
          <div className="label flex items-baseline gap-4">
            <span className="text-accent sm:hidden">{index}</span>
            <span>{eyebrow}</span>
            <RevealRule />
          </div>

          {/* `tracking-[-0.025em]` y no `-0.03em`: IBM Plex Sans se dibuja algo
              más ancho que Inter en el mismo cuerpo, así que el interletraje
              que antes ajustaba el titular ahora lo apretaba de más. */}
          <h2 className="mt-4 max-w-3xl text-balance font-semibold leading-[1.06] tracking-[-0.025em] text-[length:var(--step-h2)]">
            {title}
          </h2>

          {subtitle ? (
            <p className="mt-5 max-w-2xl text-ui leading-relaxed text-fg-muted">
              {subtitle}
            </p>
          ) : null}
        </div>
      </div>
    </Reveal>
  );
}
