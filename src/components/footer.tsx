"use client";

import { useLanguage } from "@/components/providers/language-provider";
import { GithubIcon, LinkedinIcon, XIcon } from "@/components/ui/icons";
import { site } from "@/lib/site";

/**
 * Pie de página con forma de barra de estado (tipo vim / tmux):
 * segmentos separados, monoespaciada y datos técnicos en lugar del típico
 * bloque de enlaces centrado.
 */
export function Footer() {
  const { t, locale } = useLanguage();
  const year = new Date().getFullYear();

  const socialLinks = [
    { key: "github", url: site.socials.github, Icon: GithubIcon },
    { key: "linkedin", url: site.socials.linkedin, Icon: LinkedinIcon },
    { key: "x", url: site.socials.x, Icon: XIcon },
  ].filter((link) => Boolean(link.url));

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-5 py-10 sm:px-8 lg:flex-row lg:items-center lg:px-12">
        <div>
          <p className="font-mono text-sm text-fg">
            {site.handle}
            <span className="text-fg-subtle">@web</span>
            <span className="text-accent">:~$</span>{" "}
            <span className="text-fg-muted">exit</span>
          </p>
          <p className="mt-2 text-xs text-fg-subtle">
            © {year} {site.name}. {t.footer.rights}
          </p>
        </div>

        <div className="flex items-center gap-2 lg:ml-auto">
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
          <a
            href="#top"
            className="ml-2 inline-flex h-9 items-center border border-border-strong px-3 font-mono text-[11px] text-fg-muted transition-colors hover:border-accent hover:text-accent"
          >
            ↑ {t.footer.backToTop}
          </a>
        </div>
      </div>

      {/* Barra de estado */}
      <div className="border-t border-border bg-bg-sunken/60">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-x-5 gap-y-1 px-5 py-2.5 font-mono text-[10px] uppercase tracking-wider text-fg-subtle sm:px-8 lg:px-12">
          <span className="text-accent">● {site.location}</span>
          <span>{locale === "es" ? "es-ec" : "en-us"}</span>
          <span>utf-8</span>
          <span className="ml-auto">
            {t.footer.builtWith} next.js · typescript · tailwind
          </span>
        </div>
      </div>
    </footer>
  );
}
