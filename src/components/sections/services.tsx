"use client";

import { Section, SectionHeading } from "@/components/ui/section";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { useLanguage } from "@/components/providers/language-provider";
import { services } from "@/lib/content";

/**
 * Servicios como lista de comandos, no como rejilla de tarjetas.
 *
 * La descripción está SIEMPRE visible, por dos razones:
 *  · Legibilidad: un visitante que evalúa contratarte no debería tener que
 *    descubrir que hay que pasar el cursor para leer qué haces. En móvil, donde
 *    no existe el hover, ese contenido era directamente invisible.
 *  · Rendimiento: la versión anterior animaba `grid-template-rows` de 0fr a 1fr,
 *    lo que obliga a recalcular el layout de la página en cada fotograma.
 *
 * Aquí no hay barrido de escáner ni flecha de "→": estas filas no llevan a
 * ningún sitio, y una flecha que no navega es una promesa falsa. El movimiento
 * es sólo la entrada escalonada; el peso visual de la página se gasta en el
 * hero y en la publicación, no repartido por todas partes.
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

      <RevealGroup as="ul" className="border-t border-border">
        {services.map((service, index) => (
          <RevealItem
            as="li"
            key={service.cmd}
            className="border-b border-border"
          >
            <div className="flex items-baseline gap-4 py-7 pr-4">
              <span className="w-6 shrink-0 font-mono text-[11px] tabular-nums text-fg-subtle">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="min-w-0 flex-1">
                <p className="font-mono text-xs text-accent">
                  ❯ {service.cmd}
                </p>

                <h3 className="mt-2 text-balance text-lg font-medium tracking-tight text-fg sm:text-xl">
                  {service.title[locale]}
                </h3>

                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-fg-muted">
                  {service.description[locale]}
                </p>

                <ul className="mt-4 flex flex-wrap gap-2">
                  {service.keywords.map((keyword) => (
                    <li
                      key={keyword}
                      className="border border-border px-2 py-0.5 font-mono text-[11px] text-fg-subtle"
                    >
                      {keyword}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
