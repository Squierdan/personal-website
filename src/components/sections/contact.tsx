"use client";

import { useState, type FormEvent } from "react";
import { Mail, Send } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { socials } from "@/lib/content";

type Status = "idle" | "sending" | "sent";

export function Contact() {
  const { t } = useLanguage();
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");
    // No backend yet: simulate a submission. Wire this to an API route or
    // a service like Formspree/Resend to actually deliver the message.
    setTimeout(() => setStatus("sent"), 900);
  };

  return (
    <Section id="contact">
      <SectionHeading
        eyebrow={t.contact.eyebrow}
        title={t.contact.title}
        subtitle={t.contact.subtitle}
      />

      <Reveal className="mx-auto max-w-xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              required
              type="text"
              name="name"
              placeholder={t.contact.namePlaceholder}
              className="surface w-full rounded-xl px-4 py-3 text-sm outline-none transition-colors focus:border-accent"
            />
            <input
              required
              type="email"
              name="email"
              placeholder={t.contact.emailPlaceholder}
              className="surface w-full rounded-xl px-4 py-3 text-sm outline-none transition-colors focus:border-accent"
            />
          </div>
          <textarea
            required
            name="message"
            rows={5}
            placeholder={t.contact.messagePlaceholder}
            className="surface w-full resize-none rounded-xl px-4 py-3 text-sm outline-none transition-colors focus:border-accent"
          />
          <button
            type="submit"
            disabled={status === "sending"}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-accent/25 transition-all hover:bg-accent-hover disabled:opacity-60 sm:w-auto"
          >
            <Send className="h-4 w-4" />
            {status === "sending"
              ? t.contact.sending
              : status === "sent"
                ? t.contact.sent
                : t.contact.send}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted">
          {t.contact.orEmail}{" "}
          <a
            href={`mailto:${socials.email}`}
            className="inline-flex items-center gap-1 font-medium text-accent hover:underline"
          >
            <Mail className="h-4 w-4" />
            {socials.email}
          </a>
        </p>
      </Reveal>
    </Section>
  );
}
