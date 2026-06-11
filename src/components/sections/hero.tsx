"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/social-icons";
import { useLanguage } from "@/components/providers/language-provider";
import { socials } from "@/lib/content";

export function Hero() {
  const { t } = useLanguage();

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden px-6 pt-16 md:px-10"
    >
      <div className="bg-grid pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute -left-32 top-24 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-12 h-80 w-80 rounded-full bg-secondary/10 blur-3xl" />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 py-20 md:grid-cols-[1.2fr_1fr]">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background-elevated px-3 py-1 text-xs font-medium text-muted"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            {t.hero.badge}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl"
          >
            {t.hero.titleLead}{" "}
            <span className="text-gradient">{t.hero.titleHighlight}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-accent/25 transition-all hover:bg-accent-hover hover:shadow-accent/40"
            >
              {t.hero.ctaPrimary}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background-elevated px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              {t.hero.ctaSecondary}
            </a>
            <div className="flex items-center gap-1">
              <a
                href={socials.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full text-muted transition-colors hover:text-accent"
              >
                <GithubIcon className="h-5 w-5" />
              </a>
              <a
                href={socials.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full text-muted transition-colors hover:text-accent"
              >
                <LinkedinIcon className="h-5 w-5" />
              </a>
              <a
                href={`mailto:${socials.email}`}
                aria-label="Email"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full text-muted transition-colors hover:text-accent"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 grid max-w-md grid-cols-3 gap-6"
          >
            {t.hero.stats.map((stat) => (
              <div key={stat.label}>
                <dt className="text-2xl font-bold text-foreground sm:text-3xl">
                  {stat.value}
                </dt>
                <dd className="mt-1 text-xs text-muted">{stat.label}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative mx-auto hidden aspect-square w-full max-w-sm md:block"
        >
          <div className="absolute inset-0 rotate-6 rounded-3xl bg-gradient-to-br from-accent to-secondary opacity-20 blur-xl" />
          <div className="surface relative flex h-full w-full flex-col justify-between overflow-hidden rounded-3xl p-6 shadow-xl">
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-red-400" />
              <span className="h-3 w-3 rounded-full bg-amber-400" />
              <span className="h-3 w-3 rounded-full bg-green-400" />
            </div>
            <pre className="overflow-hidden font-mono text-[13px] leading-relaxed">
              <code>
                <span className="text-secondary">const</span>{" "}
                <span className="text-accent">engineer</span> = {"{"}
                {"\n"} name: <span className="text-accent">&apos;Luis&apos;</span>,
                {"\n"} role:{" "}
                <span className="text-accent">&apos;Software Eng.&apos;</span>,
                {"\n"} stack: [<span className="text-accent">&apos;TS&apos;</span>,{" "}
                <span className="text-accent">&apos;React&apos;</span>],
                {"\n"} available: <span className="text-secondary">true</span>,
                {"\n"}
                {"}"};
              </code>
            </pre>
            <div className="h-1.5 w-2/3 overflow-hidden rounded-full bg-border">
              <motion.div
                className="h-full rounded-full bg-accent"
                initial={{ width: "0%" }}
                animate={{ width: "85%" }}
                transition={{ duration: 1.4, delay: 0.6, ease: "easeOut" }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
