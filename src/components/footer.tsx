"use client";

import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/social-icons";
import { useLanguage } from "@/components/providers/language-provider";
import { socials } from "@/lib/content";

export function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  const links = [
    { href: "#about", label: t.nav.about },
    { href: "#services", label: t.nav.services },
    { href: "#projects", label: t.nav.projects },
    { href: "#contact", label: t.nav.contact },
  ];

  return (
    <footer className="border-t border-border bg-background-elevated px-6 py-12 md:px-10">
      <div className="mx-auto grid w-full max-w-6xl gap-8 sm:grid-cols-2 md:grid-cols-3">
        <div>
          <a href="#home" className="flex items-center gap-2 font-bold">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-sm font-black text-white">
              L
            </span>
            <span className="text-lg tracking-tight">
              Luis<span className="text-accent">.</span>
            </span>
          </a>
          <p className="mt-3 max-w-xs text-sm text-muted">{t.footer.tagline}</p>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted">
            {t.footer.nav}
          </h4>
          <ul className="space-y-2">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-muted transition-colors hover:text-accent"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted">
            {t.footer.social}
          </h4>
          <div className="flex gap-3">
            <a
              href={socials.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-accent hover:text-accent"
            >
              <GithubIcon className="h-5 w-5" />
            </a>
            <a
              href={socials.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-accent hover:text-accent"
            >
              <LinkedinIcon className="h-5 w-5" />
            </a>
            <a
              href={`mailto:${socials.email}`}
              aria-label="Email"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-accent hover:text-accent"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 flex w-full max-w-6xl flex-col items-center justify-between gap-2 border-t border-border pt-6 text-xs text-muted sm:flex-row">
        <p>
          &copy; {year} Luis Caizapanta. {t.footer.rights}
        </p>
        <p>{t.footer.builtWith}</p>
      </div>
    </footer>
  );
}
