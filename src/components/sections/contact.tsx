"use client";

import { useState } from "react";
import { Check, Copy, FileDown } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { useLanguage } from "@/components/providers/language-provider";
import { GithubIcon, LinkedinIcon, XIcon } from "@/components/ui/icons";
import { site } from "@/lib/site";

type Errors = Partial<Record<"name" | "email" | "message", boolean>>;

/**
 * Formulario sin backend: compone un `mailto:` con los datos.
 * Ventaja: el sitio sigue siendo 100 % estático y desplegable en cualquier
 * host gratuito. Si más adelante quieres recibir los mensajes por API,
 * sustituye `handleSubmit` por un `fetch` a tu endpoint (ver AI_CONTEXT.md).
 */
export function Contact() {
  const { t } = useLanguage();
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sent">("idle");
  const [copied, setCopied] = useState(false);

  const update = (field: keyof typeof values) => (value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: false }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const nextErrors: Errors = {
      name: values.name.trim().length < 2,
      email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email),
      message: values.message.trim().length < 10,
    };

    if (Object.values(nextErrors).some(Boolean)) {
      setErrors(nextErrors);
      return;
    }

    const subject = encodeURIComponent(`[web] ${values.name}`);
    const body = encodeURIComponent(
      `${values.message}\n\n— ${values.name} · ${values.email}`,
    );
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setStatus("sent");
  };

  const copyEmail = async () => {
    await navigator.clipboard.writeText(site.email);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const socialLinks = [
    { key: "github", url: site.socials.github, Icon: GithubIcon },
    { key: "linkedin", url: site.socials.linkedin, Icon: LinkedinIcon },
    { key: "x", url: site.socials.x, Icon: XIcon },
  ].filter((link) => Boolean(link.url));

  // `border-border-strong` y no `border-border`: en un campo de formulario el
  // borde es la única señal de que ahí se puede escribir, así que necesita 3:1
  // de contraste (WCAG 1.4.11), no el gris de una regla decorativa.
  const fieldClass = (invalid?: boolean) =>
    `w-full border bg-bg-elevated/50 px-3 py-2.5 font-mono text-sm text-fg outline-none transition-colors duration-[var(--dur-micro)] placeholder:text-fg-subtle focus:border-accent ${
      invalid ? "border-[var(--amber)]" : "border-border-strong"
    }`;

  return (
    <Section id="contact">
      <SectionHeading
        index={t.contact.index}
        eyebrow={t.contact.eyebrow}
        title={t.contact.title}
        subtitle={t.contact.subtitle}
      />

      <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        {/* Formulario */}
        <Reveal>
          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block font-mono text-[11px] text-fg-subtle"
                >
                  <span className="text-accent">❯</span> {t.contact.nameLabel}
                </label>
                <input
                  id="name"
                  name="name"
                  autoComplete="name"
                  value={values.name}
                  onChange={(event) => update("name")(event.target.value)}
                  placeholder={t.contact.namePlaceholder}
                  aria-invalid={errors.name ? "true" : undefined}
                  className={fieldClass(errors.name)}
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block font-mono text-[11px] text-fg-subtle"
                >
                  <span className="text-accent">❯</span> {t.contact.emailLabel}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={values.email}
                  onChange={(event) => update("email")(event.target.value)}
                  placeholder={t.contact.emailPlaceholder}
                  aria-invalid={errors.email ? "true" : undefined}
                  className={fieldClass(errors.email)}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="message"
                className="mb-2 block font-mono text-[11px] text-fg-subtle"
              >
                <span className="text-accent">❯</span> {t.contact.messageLabel}
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                value={values.message}
                onChange={(event) => update("message")(event.target.value)}
                placeholder={t.contact.messagePlaceholder}
                aria-invalid={errors.message ? "true" : undefined}
                className={`${fieldClass(errors.message)} resize-y`}
              />
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="submit"
                className="inline-flex h-11 items-center gap-2 bg-accent px-5 font-mono text-sm font-medium text-[var(--accent-fg)] transition-[filter] duration-[var(--dur-micro)] hover:brightness-110"
              >
                ./send.sh
              </button>

              <p
                role="status"
                aria-live="polite"
                className="font-mono text-xs text-fg-muted"
              >
                {Object.values(errors).some(Boolean)
                  ? t.contact.invalid
                  : status === "sent"
                    ? t.contact.sent
                    : ""}
              </p>
            </div>
          </form>
        </Reveal>

        {/* Tarjeta de contacto directo */}
        <Reveal delay={0.1}>
          <div className="term p-6">
            <p className="font-mono text-[11px] uppercase tracking-widest text-fg-subtle">
              {t.contact.orEmail}
            </p>

            <div className="mt-3 flex items-center gap-2">
              <a
                href={`mailto:${site.email}`}
                className="link-underline break-all font-mono text-base text-accent"
              >
                {site.email}
              </a>
              <button
                type="button"
                onClick={copyEmail}
                aria-label={t.contact.copy}
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center border border-border-strong text-fg-subtle transition-colors hover:border-accent hover:text-accent"
              >
                {copied ? (
                  <Check className="h-3.5 w-3.5" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
              </button>
            </div>

            <dl className="mt-6 space-y-2 border-t border-border pt-6 font-mono text-xs">
              <div className="flex justify-between gap-4">
                <dt className="text-fg-subtle">location</dt>
                <dd className="text-fg-muted">{site.location}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-fg-subtle">timezone</dt>
                <dd className="text-fg-muted">{site.timezone}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-fg-subtle">status</dt>
                <dd className="text-accent">
                  {site.available ? "open" : "busy"}
                </dd>
              </div>
            </dl>

            {/* Ambos idiomas disponibles: el visitante puede necesitar el CV en
                español aunque esté leyendo el sitio en inglés, y viceversa. */}
            <div className="mt-6 border-t border-border pt-6">
              <p className="font-mono text-[11px] uppercase tracking-widest text-fg-subtle">
                {t.contact.cvTitle}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <a
                  href={site.cv.es}
                  download
                  className="inline-flex h-9 items-center gap-1.5 border border-border-strong px-3 font-mono text-[11px] text-fg-muted transition-colors hover:border-accent hover:text-accent"
                >
                  <FileDown className="h-3.5 w-3.5" />
                  {t.contact.cvEs}
                </a>
                <a
                  href={site.cv.en}
                  download
                  className="inline-flex h-9 items-center gap-1.5 border border-border-strong px-3 font-mono text-[11px] text-fg-muted transition-colors hover:border-accent hover:text-accent"
                >
                  <FileDown className="h-3.5 w-3.5" />
                  {t.contact.cvEn}
                </a>
              </div>
            </div>

            {socialLinks.length > 0 ? (
              <div className="mt-6 flex gap-2 border-t border-border pt-6">
                {socialLinks.map(({ key, url, Icon }) => (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={key}
                    className="inline-flex h-9 w-9 items-center justify-center border border-border-strong text-fg-muted transition-colors hover:border-accent hover:text-accent"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            ) : null}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
