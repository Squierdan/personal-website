"use client";

import { Section, SectionHeading } from "@/components/ui/section";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { useLanguage } from "@/components/providers/language-provider";
import { services } from "@/lib/content";

/**
 * ============================================================================
 *  SERVICIOS — MATRIZ DE CAPACIDADES
 * ============================================================================
 *  Antes esto era una pila de seis bloques idénticos: comando, titular, tres
 *  líneas de prosa y cuatro chips, seis veces, ~1.300 px de la misma forma. Era
 *  el tramo más plano de la página, y en una lista vertical de seis elementos
 *  con el mismo peso el visitante no compara: hojea y se salta cinco.
 *
 *  Ahora es una rejilla de dos columnas separada por filetes de 1 px —el mismo
 *  recurso `gap-px` sobre fondo de borde que ya usa la rejilla de stack de la
 *  sección 01—, así que las seis capacidades se leen **a la vez** y en paralelo,
 *  que es cómo se lee una matriz. Ocupa la mitad de alto y le da a la página un
 *  cambio de densidad entre la 01 y la 03, donde antes las cuatro secciones
 *  tenían exactamente el mismo pulso.
 *
 *  SIN NUMERALES. Los tenía (01…06) y se han quitado: numerar sirve cuando el
 *  orden es información —un proceso, una cronología— y esto es un conjunto sin
 *  orden. En una rejilla el número deja de leerse como índice y pasa a ser
 *  adorno. El identificador de cada fila es su comando, que es lo que además
 *  encaja con la metáfora de terminal.
 *
 *  La descripción está SIEMPRE visible, nunca detrás de un hover: en móvil no
 *  existe el cursor, y quien evalúa contratarte no debería tener que descubrir
 *  un gesto para leer qué haces.
 * ============================================================================
 */
export function Services() {
  const { t, locale } = useLanguage();

  return (
    <Section id="services">
      <SectionHeading
        index={t.services.index}
        eyebrow={t.services.eyebrow}
        title={t.services.title}
        subtitle={t.services.subtitle}
      />

      {/* `gap-px` sobre fondo de color de borde: los filetes son el hueco de la
          rejilla, no bordes por celda. Así nunca se duplican en los encuentros
          ni quedan cabos sueltos en los extremos. */}
      <RevealGroup
        as="ul"
        className="grid gap-px border border-border bg-border sm:grid-cols-2"
      >
        {services.map((service) => (
          <RevealItem
            as="li"
            key={service.cmd}
            className="flex flex-col bg-bg p-6 sm:p-7"
          >
            <p className="font-mono text-data text-accent">
              <span aria-hidden>❯ </span>
              {service.cmd}
            </p>

            <h3 className="mt-3 text-balance font-medium leading-tight tracking-[-0.015em] text-fg text-[length:var(--step-h3)]">
              {service.title[locale]}
            </h3>

            <p className="mt-3 text-meta text-fg-muted">
              {service.description[locale]}
            </p>

            {/* `mt-auto`: los chips se alinean al pie de cada celda aunque las
                descripciones tengan distinto largo, así que la línea inferior de
                la rejilla queda recta en vez de escalonada. */}
            <ul className="mt-auto flex flex-wrap gap-1.5 pt-5">
              {service.keywords.map((keyword) => (
                <li
                  key={keyword}
                  className="border border-border px-1.5 py-0.5 font-mono text-data text-fg-subtle"
                >
                  {keyword}
                </li>
              ))}
            </ul>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
