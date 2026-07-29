"use client";

import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { useLanguage } from "@/components/providers/language-provider";
import { services } from "@/lib/content";

/**
 * Servicios como lista de comandos, no como rejilla de tarjetas.
 * Cada fila se expande al pasar el cursor (o siempre visible en móvil)
 * usando la transición de `grid-template-rows`, sin JavaScript.
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

      <p className="mb-6 hidden font-mono text-[11px] text-fg-subtle md:block">
        <span className="text-accent">#</span> {t.services.hint}
      </p>

      <ul className="border-t border-border">
        {services.map((service, index) => (
          <Reveal key={service.cmd} delay={index * 0.04}>
            <li className="group border-b border-border">
              <div className="row-hover flex cursor-default items-center gap-4 py-6 pr-4">
                <span className="w-6 shrink-0 font-mono text-[11px] text-fg-subtle">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="hidden w-40 shrink-0 truncate font-mono text-xs text-accent lg:block">
                  ❯ {service.cmd}
                </span>
                <h3 className="flex-1 text-balance text-lg font-medium tracking-tight text-fg transition-colors sm:text-xl">
                  {service.title[locale]}
                </h3>
                <span
                  aria-hidden
                  className="shrink-0 font-mono text-lg text-fg-subtle transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent"
                >
                  →
                </span>
              </div>

              <div className="grid grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:grid-rows-[0fr] md:group-hover:grid-rows-[1fr]">
                <div className="overflow-hidden">
                  <div className="pb-6 pl-10 pr-4 lg:pl-[13.5rem]">
                    <p className="max-w-2xl text-pretty text-sm leading-relaxed text-fg-muted">
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
              </div>
            </li>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
