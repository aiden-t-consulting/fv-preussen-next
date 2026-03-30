# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server (localhost:3000)
npm run build        # Production build + generate sitemap
npm run lint         # ESLint
npm run type-check   # TypeScript check without building
```

## Environment

Copy `.env.example` to `.env.local` and fill in:
- `NEXT_PUBLIC_SANITY_PROJECT_ID` — Sanity project ID
- `NEXT_PUBLIC_SANITY_DATASET` — usually `production`
- `SANITY_API_TOKEN` — Sanity read token
- `SANITY_WEBHOOK_SECRET` — random string for the revalidation webhook
- `RESEND_API_KEY` — Resend API key for contact form emails
- `CONTACT_EMAIL` — where contact form submissions are sent
- `FUPA_TEAM_SLUG` — FuPa team identifier for match data

When `NEXT_PUBLIC_SANITY_PROJECT_ID` is not set (or equals `"your-project-id"`), all Sanity queries return empty arrays — the site renders with static fallback data.

## Architecture

### Route structure
```
app/
  layout.tsx               ← Root layout: Header + Footer for all pages
  page.tsx                 ← Homepage (/) — ISR revalidate=60
  (site)/                  ← Route group for sub-pages (its own page.tsx calls notFound())
    aktuelles/page.tsx     ← /aktuelles (news listing)
    aktuelles/[slug]/      ← /aktuelles/[slug] (article detail)
    berichte/page.tsx      ← /berichte (match reports)
    teams/page.tsx         ← /teams
    teams/[slug]/          ← /teams/[slug]
    sponsoren/page.tsx     ← /sponsoren
    verein/page.tsx        ← /verein
    kontakt/               ← /kontakt (page.tsx + ContactForm.tsx client component)
    fan-shop/page.tsx      ← /fan-shop
  api/contact/route.ts     ← POST contact form → Resend email
  api/revalidate/route.ts  ← POST from Sanity webhook → ISR revalidation
```

**Route conflict note:** `app/(site)/page.tsx` calls `notFound()` — the real homepage is `app/page.tsx`. Never put renderable content in `(site)/page.tsx`.

### Data fetching

| Layer | File | Purpose |
|-------|------|---------|
| Sanity CMS | `lib/sanity/client.ts` + `queries.ts` | Articles, teams, sponsors, site settings |
| FuPa API | `lib/fupa/client.ts` | Match schedules, results, league table (falls back to mock data) |
| Types | `types/index.ts` | All shared TypeScript types |
| Utils | `lib/utils.ts` | `cn()`, date formatters, category helpers |

All Sanity queries go through `safeFetch()` in `queries.ts` — returns the fallback value when Sanity is unconfigured or throws. The site always renders.

### ISR strategy
- Homepage: `revalidate = 60`
- Article/team pages: `revalidate = 60`
- Static pages (verein, sponsoren, teams): `revalidate = 3600`
- On Sanity publish: webhook → `/api/revalidate` → `revalidatePath()` for the changed page

### Styling
Tailwind CSS v4. Brand tokens are defined in the `@theme inline` block in `app/globals.css` — do not add a `tailwind.config.ts`.

Key brand values (from original `color.css`):
- Primary green: `#039139` (use as `bg-[#039139]` or `text-[#039139]`)
- Dark green: `#026b29`
- Hero background: `#373542` (dark purple-grey, matching original slider bg)

Font stack (loaded via Google Fonts in `globals.css`):
- `Oswald` — nav labels, section headings, club name
- `Nunito Sans` — body text
- `Cormorant Garamond` — display/article headings
- `Playfair Display` — logo text

### Components
```
components/
  layout/   Header.tsx, Footer.tsx
  home/     Hero.tsx, LatestNews.tsx, MatchSection.tsx,
            SponsorsCarousel.tsx, SponsorsStrip.tsx, StatsCounter.tsx
  news/     ArticleCard.tsx etc.
  teams/    TeamCard.tsx etc.
  ui/       Radix-based primitives (accordion, dialog, toast …)
```

`SponsorsCarousel` uses a CSS keyframe animation (`sponsors-scroll`) injected via a `<style>` tag — no JS scroll logic. Pause-on-hover is controlled by toggling the animation class via `useState`.

### Sanity schemas
Located in `sanity/schemas/`: `article`, `team`, `player`, `sponsor`, `siteSettings`. Entry point is `sanity/schemas/index.ts`. Use these when initialising Sanity Studio separately.

### Contact form
`app/api/contact/route.ts` validates with Zod, escapes HTML via `escapeHtml()`, and instantiates Resend lazily inside the handler (not at module load) to avoid build-time failures when `RESEND_API_KEY` is absent.

### Known gotchas
- `lucide-react` v1.x removed brand icons — Facebook, Instagram, YouTube are inline SVGs in `Header.tsx` and `Footer.tsx`.
- `@sanity/image-url` requires the named export: `import { createImageUrlBuilder } from "@sanity/image-url"`.
- Zod v4: `z.literal()` second argument uses `error:` not `errorMap:`.
- Google Fonts `@import url(...)` must appear before `@import "tailwindcss"` in `globals.css`.
