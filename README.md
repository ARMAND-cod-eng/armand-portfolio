# Armand Junior Dongmo Notue — Portfolio

Personal site for a GenAI / ML engineer: a recruiter-friendly home page, five
in-depth case studies, and a filterable project index.

Built with Next.js 16 (App Router, Cache Components), React 19, TypeScript
(strict), Tailwind CSS 4, Motion and Lucide icons.

## Run locally

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev        # http://localhost:3000
```

Quality gates:

```bash
npm run lint       # ESLint (next/core-web-vitals + TypeScript rules)
npm run typecheck  # route type generation + tsc --noEmit
npm run build      # production build; every route is prerendered
npm run check      # all three, in order
```

## Deploy on Vercel

The site is live at **https://www.armandnotue.com** (GitHub `ARMAND-cod-eng/armand-portfolio`,
Vercel project `armand-portfolio`). Every push to `main` deploys to production.

- The canonical address is `PRODUCTION_URL` in `src/lib/site.ts`. Canonical URLs, the
  sitemap, `robots.txt` and social images use it on every Vercel deployment.
  `NEXT_PUBLIC_SITE_URL` overrides it if ever needed.
- The domain is managed in Vercel under **Domains**: `www.armandnotue.com` is the primary
  address and `armandnotue.com` redirects to it (308).
- Preview deployments are automatically marked `noindex` and disallowed in `robots.txt`.

## Updating content

All visitor-facing content lives in typed files under `src/data/`:

| File | What it controls |
|---|---|
| `profile.ts` | Name, headline, photo, target roles, contact links, education, résumé link |
| `projects.ts` | Featured projects and their full case studies |
| `more-work.ts` | Smaller projects and work in progress (each has its own page) |
| `charts.ts` | Native charts per project — every number names its source |
| `figures.ts` | Real notebook figures (files in `public/projects/<slug>/`) |
| `experience.ts` | Experience timeline |
| `skills.ts` | Skill groups |
| `navigation.ts` | Nav items and project filter labels |

**Accuracy rule:** every metric on the site traces back to a public repository,
notebook or documented measurement. When a number can't be verified, leave it out
rather than estimate it. Modeled financial figures are always labeled as modeled.

### Add the résumé

1. Put the PDF at `public/resume.pdf`.
2. In `src/data/profile.ts`, set `resumeUrl: "/resume.pdf"`.

"View résumé" buttons then appear in the header, the mobile menu and the contact
section. While `resumeUrl` is unset, they stay hidden.

### Photo, theme and figures

- **Photo:** `public/images/armand-portrait.webp` (4:5) and `armand-headshot.webp` (square),
  cropped from the original with camera metadata removed. Replace the files to update them.
- **Light / dark mode:** the site always opens in dark mode (`DEFAULT_THEME` in
  `src/lib/theme.ts`); visitors can switch with the toggle, and their choice is saved in
  `localStorage`. Colors are tokens in `src/app/globals.css` — dark values in
  `@theme`, light overrides under `:root[data-theme="light"]`.
- **Charts:** add a `ChartGroup` to `charts.ts` (`bars`, `paired`, `share` or `confusion`) and
  reference it from the project. Chart colors are a validated emphasis pair
  (`--color-chart-accent` / `--color-chart-neutral`) for both themes; every chart ships a
  data-table view.
- **Figures:** export the image from the notebook, convert it to WebP, put it in
  `public/projects/<slug>/`, and add an entry (with real alt text) to `figures.ts`.

### Feature another project

Move an entry from `more-work.ts` into `projects.ts` with a `caseStudy` and a
`visual`. The case-study route, sitemap entry and social image are generated
automatically. To add a new schematic illustration, add a key to `VisualKey` in
`src/data/types.ts` and a drawing in `src/components/projects/project-visual.tsx`.

## Structure

```
src/
  app/                  routes, metadata, robots, sitemap, OG images
    projects/[slug]/    case-study template
  components/
    layout/             header, mobile menu, footer, backdrop
    sections/           home-page sections
    projects/           cards, schematics, pipeline diagram, filter, ToC, figure gallery
    charts/             bar, paired, share and confusion-matrix charts
    hero/               interactive system-flow diagram
    ui/                 buttons, tags, headings, spotlight card
  data/                 all content (typed)
  lib/                  site URL, JSON-LD, OG renderer, small hooks
```

## Accessibility & motion

- Semantic landmarks, one `h1` per page, a skip link, and visible focus rings.
- Every animation respects `prefers-reduced-motion`. Scroll reveals use CSS
  scroll-driven animations as progressive enhancement, so content is never hidden
  without JavaScript.
- The hero tour pauses on hover or focus, stops after any interaction, and has a
  pause control.
