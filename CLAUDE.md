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
  page.tsx                 ← Homepage (/)
  (site)/                  ← Route group (shared for future sub-layouts)
    aktuelles/page.tsx     ← /aktuelles  (news listing)
    aktuelles/[slug]/      ← /aktuelles/[slug] (article detail)
    berichte/page.tsx      ← /berichte  (match reports)
    teams/page.tsx         ← /teams
    teams/[slug]/          ← /teams/[slug]
    sponsoren/page.tsx     ← /sponsoren
    verein/page.tsx        ← /verein
    kontakt/               ← /kontakt (page.tsx + ContactForm.tsx client component)
    fan-shop/page.tsx      ← /fan-shop
  api/contact/route.ts     ← POST contact form → Resend email
  api/revalidate/route.ts  ← POST from Sanity webhook → ISR revalidation
```

### Data fetching layers

| Layer | File | Purpose |
|-------|------|---------|
| Sanity CMS | `lib/sanity/client.ts` + `queries.ts` | Articles, teams, sponsors, site settings |
| FuPa API | `lib/fupa/client.ts` | Match schedules, results, league table (falls back to mock data) |
| Types | `types/index.ts` | All shared TypeScript types |
| Utils | `lib/utils.ts` | `cn()`, date formatters, category helpers |

All Sanity queries use `safeFetch()` wrapper which returns the fallback value if Sanity isn't configured or the query fails — the site always renders something.

### ISR strategy
- Homepage: `revalidate = 60` seconds
- Article/team pages: `revalidate = 60`
- Static pages (verein, sponsoren, teams): `revalidate = 3600`
- On Sanity publish: webhook hits `/api/revalidate` → `revalidatePath()` for the specific page

### Styling
Tailwind CSS v4 with brand tokens in `app/globals.css` `@theme` block:
- `--color-brand-green: #21a530` — primary CTA, active states
- `--color-brand-green-dark: #15540a` — header, footer, dark sections
- `--color-brand-green-light: #81d742` — hover, accent, light text on dark bg
- Font stack: `Cormorant Garamond` (headings), `Nunito Sans` (body), `Playfair Display` (logo)

### Sanity schemas
Located in `sanity/schemas/` — `article`, `team`, `player`, `sponsor`, `siteSettings`. Import via `sanity/schemas/index.ts` when setting up the Sanity Studio.

### Contact form security
`app/api/contact/route.ts` validates with Zod before sending. All HTML in emails is escaped via `escapeHtml()`. Resend is instantiated lazily (only when a request arrives) to avoid build-time failures.

### Route conflict note
`app/(site)/page.tsx` exists but calls `notFound()` — the real homepage is `app/page.tsx`. The `(site)` route group is used only for organisational purposes; its root page must not render real content.
