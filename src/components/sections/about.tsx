"use client";

import { useLanguage } from "@/components/providers/language-provider";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { skills } from "@/lib/content";

export function About() {
  const { t } = useLanguage();

  return (
    <Section id="about" className="bg-background-elevated">
      <SectionHeading eyebrow={t.about.eyebrow} title={t.about.title} />
      <div className="grid gap-10 md:grid-cols-2 md:items-center">
        <Reveal className="space-y-5">
          {t.about.paragraphs.map((paragraph, index) => (
            <p key={index} className="text-base leading-relaxed text-muted">
              {paragraph}
            </p>
          ))}
        </Reveal>

        <Reveal delay={0.15}>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-accent">
            {t.about.skillsTitle}
          </h3>
          <ul className="flex flex-wrap gap-2.5">
            {skills.map((skill) => (
              <li
                key={skill}
                className="surface lift-card rounded-lg px-3.5 py-2 text-sm font-medium hover:border-accent hover:text-accent"
              >
                {skill}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
