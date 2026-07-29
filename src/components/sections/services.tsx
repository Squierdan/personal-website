"use client";

import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
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

      <ul className="border-t border-border">
        {services.map((service, index) => (
          <Reveal key={service.cmd} delay={Math.min(index, 3) * 0.05}>
            <li className="group border-b border-border">
              <div className="row-hover py-7 pr-4">
                <div className="flex items-baseline gap-4">
                  <span className="w-6 shrink-0 font-mono text-[11px] text-fg-subtle">
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

                  <span
                    aria-hidden
                    className="hidden shrink-0 self-center font-mono text-lg text-fg-subtle transition-colors duration-300 group-hover:text-accent sm:block"
                  >
                    →
                  </span>
                </div>
              </div>
            </li>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
