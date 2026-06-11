# Personal Website & Portfolio

A modern, minimalist and dynamic personal website / portfolio for a software
engineer. Bilingual (Español / English), with light & dark themes, an elegant
color palette grounded in color theory, smooth animations and a fully responsive
layout.

## Tech stack

- **[Next.js 16](https://nextjs.org/)** (App Router) + **React 19**
- **TypeScript**
- **[Tailwind CSS v4](https://tailwindcss.com/)** (CSS-first config)
- **[next-themes](https://github.com/pacocoursey/next-themes)** — light/dark mode
- **[Framer Motion](https://www.framer.com/motion/)** — animations
- **[lucide-react](https://lucide.dev/)** — icons
- **ESLint** — linting

## Features

- 🌗 **Light / dark mode** toggle (persisted, no flash on load)
- 🌍 **Bilingual ES / EN** with an instant language switcher (persisted)
- 🎨 Elegant palette: a neutral slate base + a single teal accent and a
  complementary amber highlight (see `src/app/globals.css`)
- ✨ Dynamic, animated UI (hero, scroll reveals, filterable project grid)
- 📱 Fully responsive, mobile-first layout
- ♿ Accessible: semantic markup, ARIA labels, `prefers-reduced-motion` support
- 🔎 SEO-ready metadata (Open Graph, Twitter cards)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command         | Description                       |
| --------------- | --------------------------------- |
| `npm run dev`   | Start the development server      |
| `npm run build` | Production build                  |
| `npm run start` | Run the production build          |
| `npm run lint`  | Run ESLint                        |

## Customizing the content

All content is centralized so you can make it yours without touching components:

- **Text / translations:** `src/i18n/dictionary.ts` (ES + EN strings)
- **Services, projects, skills, social links:** `src/lib/content.ts`
- **Colors / theme palette:** `src/app/globals.css`
- **SEO metadata:** `src/app/layout.tsx`

> Note: The name (“Luis Caizapanta”), stats, project entries and social links are
> sensible placeholders — update them in the files above with your real details.

## Project structure

```
src/
├─ app/
│  ├─ layout.tsx        # Root layout, fonts, metadata, providers
│  ├─ page.tsx          # Page composition
│  └─ globals.css       # Tailwind + theme tokens (palette, dark mode)
├─ components/
│  ├─ providers/        # Theme + language context
│  ├─ sections/         # Hero, About, Services, Projects, Contact
│  ├─ ui/               # Reusable bits (Section, Reveal, icons)
│  ├─ navbar.tsx
│  ├─ footer.tsx
│  ├─ theme-toggle.tsx
│  └─ language-toggle.tsx
├─ i18n/                # Locale config + dictionaries
└─ lib/                 # Content data
```

## Contact form

The contact form currently simulates submission on the client. To deliver
messages, wire `handleSubmit` in `src/components/sections/contact.tsx` to an API
route or a service such as [Resend](https://resend.com/) or
[Formspree](https://formspree.io/).
