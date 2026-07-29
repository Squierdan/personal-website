import type { ReactNode } from "react";
import { Reveal } from "./reveal";

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
 * Encabezado de sección con estética de documento técnico:
 * índice numérico, regla horizontal y etiqueta en monoespaciada.
 */
export function SectionHeading({
  index,
  eyebrow,
  title,
  subtitle,
}: SectionHeadingProps) {
  return (
    <Reveal className="mb-12 sm:mb-16">
      <div className="flex items-baseline gap-4 font-mono text-xs tracking-widest text-fg-subtle">
        <span className="text-accent">{index}</span>
        <span className="uppercase">{eyebrow}</span>
        <span aria-hidden className="h-px flex-1 bg-border" />
      </div>
      <h2 className="mt-5 max-w-3xl text-balance text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-fg-muted">
          {subtitle}
        </p>
      ) : null}
    </Reveal>
  );
}
