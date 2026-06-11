"use client";

import {
  Code2,
  Gauge,
  LayoutDashboard,
  Server,
  Smartphone,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { services, type Service } from "@/lib/content";

const icons: Record<Service["icon"], LucideIcon> = {
  code: Code2,
  layout: LayoutDashboard,
  server: Server,
  smartphone: Smartphone,
  gauge: Gauge,
  workflow: Workflow,
};

export function Services() {
  const { t, locale } = useLanguage();

  return (
    <Section id="services">
      <SectionHeading
        eyebrow={t.services.eyebrow}
        title={t.services.title}
        subtitle={t.services.subtitle}
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => {
          const Icon = icons[service.icon];
          return (
            <Reveal key={service.title.en} delay={index * 0.06}>
              <article className="surface group h-full rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-lg hover:shadow-accent/5">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent-soft text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">
                  {service.title[locale]}
                </h3>
                <p className="text-sm leading-relaxed text-muted">
                  {service.description[locale]}
                </p>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
