"use client";

import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { useLanguage } from "@/components/providers/language-provider";
import { stack } from "@/lib/content";

export function About() {
  const { t, locale } = useLanguage();

  return (
    <Section id="about">
      <SectionHeading
        index={t.about.index}
        eyebrow={t.about.eyebrow}
        title={t.about.title}
      />

      <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
        {/* Texto presentado como un archivo abierto, con gutter de líneas */}
        <Reveal>
          <div className="border-l border-border pl-5 sm:pl-7">
            {t.about.paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="relative mb-6 text-pretty text-base leading-[1.75] text-fg-muted last:mb-0 sm:text-[17px]"
              >
                <span
                  aria-hidden
                  className="absolute -left-5 top-1 select-none font-mono text-[11px] text-fg-subtle/70 sm:-left-7"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                {paragraph}
              </p>
            ))}
          </div>
        </Reveal>

        {/* Principios de trabajo */}
        <Reveal delay={0.1}>
          <h3 className="font-mono text-[11px] uppercase tracking-widest text-fg-subtle">
            {t.about.principlesTitle}
          </h3>
          <ul className="mt-5 divide-y divide-border border-y border-border">
            {t.about.principles.map((principle, index) => (
              <li key={principle.title} className="group py-4">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-[11px] text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h4 className="font-mono text-sm font-medium text-fg">
                      {principle.title}
                    </h4>
                    <p className="mt-1 text-sm leading-relaxed text-fg-muted">
                      {principle.body}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      {/* Stack agrupado por dominio */}
      <Reveal delay={0.15}>
        <h3 className="mt-16 font-mono text-[11px] uppercase tracking-widest text-fg-subtle">
          {t.about.skillsTitle}
        </h3>
        <div className="mt-5 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {stack.map((group) => (
            <div key={group.group.en} className="bg-bg p-5">
              <p className="font-mono text-[11px] text-accent">
                {group.group[locale]}/
              </p>
              <ul className="mt-3 space-y-1.5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="font-mono text-[13px] text-fg-muted transition-colors hover:text-fg"
                  >
                    <span aria-hidden className="mr-2 text-fg-subtle/60">
                      ·
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
