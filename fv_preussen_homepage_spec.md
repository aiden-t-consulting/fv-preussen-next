# FV Preussen Eberswalde — High-Fidelity Homepage Specification

## Product goal
Create a homepage that feels professional, modern, and classic at the same time: match-first, club-led, sponsor-friendly, and easy to maintain.

## Brand direction
- Tone: regional, proud, credible, community-focused
- Visual character: classic football club, not flashy startup sports design
- UX priority: next match, latest result, table, club identity, teams, sponsors
- Data principle: official match data should come from FUSSBALL.DE and be framed inside a branded UI

## Primary audiences
1. Fans and local supporters
2. Parents and youth players
3. Sponsors and local businesses

---

## 1. Global layout system

### Max widths
- Page shell: `1440px`
- Standard content container: `1280px`
- Narrow text container: `840px`
- Full-bleed sections: hero, sponsor band, CTA band

### Spacing scale
Use a consistent 8px base scale.

- `4px` micro spacing
- `8px` xs
- `12px` sm
- `16px` md
- `24px` lg
- `32px` xl
- `48px` 2xl
- `64px` 3xl
- `96px` 4xl
- `128px` 5xl

### Section spacing
- Desktop: `96px` top / `96px` bottom
- Tablet: `72px`
- Mobile: `48px` to `64px`
- Tight utility sections (match strip, sponsor tiers): `32px` to `48px`

### Grid
- Desktop: 12-column grid, 24px gutters
- Tablet: 8-column grid, 20px gutters
- Mobile: 4-column grid, 16px gutters

### Radius & surfaces
- Hero content panel: `24px`
- Standard cards: `20px`
- Pills / tags / buttons: `999px`
- Surfaces: dark primary background, off-white cards, light gray dividers, one strong accent color

### Shadow & borders
- Use subtle shadows only on elevated cards
- Prefer thin borders over heavy shadows
- Match cards and news cards should feel crisp, not glossy

---

## 2. Typography system

### Headings
- H1 hero: `clamp(42px, 6vw, 84px)` / 0.95 line-height / 700–800 weight
- H2 section: `clamp(28px, 3vw, 44px)` / 1.05 line-height / 700 weight
- H3 card title: `22px` desktop / `20px` mobile
- Eyebrow label: `12px–14px`, uppercase, letter spacing 0.12em

### Body text
- Large intro text: `20px`
- Standard paragraph: `16px–18px`
- Small meta text: `14px`
- Table or stat text: `14px–16px`

### Usage rule
One dominant display headline per viewport. Avoid stacking too many large headings.

---

## 3. Color and image direction

### Palette logic
- Base: deep charcoal or very dark navy
- Surface: warm white / light gray
- Accent: club red if approved, otherwise restrained deep red
- Support: muted gray for borders and metadata

### Photography
- Use authentic club photography over stock imagery
- Prioritize:
  - first team match action
  - youth training and match moments
  - stadium atmosphere
  - team lineups / handshake / community scenes

### Image treatment
- Hero images need dark gradient overlays for text contrast
- News images should all use the same aspect ratio
- Team cards should use either consistent crops or crest-based placeholders

---

## 4. Header specification

### Desktop header
**Height:** `88px`

**Left zone**
- Club crest
- Optional wordmark

**Center zone**
- Main navigation
  - Home
  - Aktuelles
  - Spiele
  - Teams
  - Verein
  - Sponsoren
  - Fans
  - Kontakt

**Right zone**
- Button ghost: `Mitglied werden`
- Button primary: `Sponsor werden`
- Search icon optional

### Interaction
- Sticky on scroll
- On scroll down: compress to `72px`
- Background becomes solid after first scroll threshold

### Mobile header
**Height:** `72px`
- Left: crest
- Right: hamburger
- Mobile menu opens full-height drawer
- First layer: top-level nav
- Second layer: team shortcuts and CTAs

### Navigation behavior
- Keep top nav flat
- Use mega menu only for Teams and Verein if needed
- No duplicate nav labels above and below the header

---

## 5. Hero carousel specification

### Purpose
A curated 3-slide carousel that carries the most important club priorities.

### Section shell
- Full viewport width
- Desktop min height: `78vh`
- Tablet: `64vh`
- Mobile: `560px` minimum

### Slide structure
**Background**
- Full-bleed image
- Dark overlay gradient from 60–75%

**Content block**
- Width: 5–6 grid columns desktop
- Position: left-aligned, vertically centered
- Max width: `640px`

**Slide 1: Next match**
- Eyebrow: `Nächstes Spiel`
- H1: opponent and date focus
- Supporting line: competition + venue
- CTA 1: `Zum Spiel`
- CTA 2: `Alle Spiele`
- Optional mini badge: `Heimspiel` or `Auswärts`

**Slide 2: Club identity / youth**
- Eyebrow: `Verein & Nachwuchs`
- H1: `Tradition. Nachwuchs. Leidenschaft.`
- Copy: short club mission statement
- CTA: `Unsere Teams`

**Slide 3: Editorial feature**
- Eyebrow: `Aktuelles`
- H1: latest major club story or event
- CTA: `Mehr erfahren`

### Carousel controls
- Dot navigation bottom-left or bottom-center
- Arrow buttons desktop only
- Auto-advance: 7 seconds
- Pause on hover/focus
- Swipe enabled on mobile

### Accessibility
- All slides keyboard accessible
- Background images must have alternative editorial support via visible text

---

## 6. Quick match strip

### Purpose
Immediate glanceable match information beneath the hero.

### Layout
- Desktop: 3 equal cards in one row
- Tablet: 3 cards with tighter padding
- Mobile: horizontal snap scroll or stacked cards

### Cards
1. `Nächstes Spiel`
2. `Letztes Ergebnis`
3. `Tabellenplatz`

### Card spec
- Padding: `24px`
- Radius: `20px`
- Include icon or subtle label strip
- Data hierarchy:
  - small label
  - main number/date/result
  - opponent / competition
  - CTA text link

### Example content
- Next match: date, time, opponent, home/away
- Last result: scoreline, opponent, matchday
- Table position: current rank, points, gap to next team

---

## 7. Spielcenter / official data section

### Purpose
Embed or frame official FUSSBALL.DE data in a branded experience.

### Section layout
- Top row: title + intro copy + CTA
- Main row: tabbed content area

### Title block
- Eyebrow: `Offizielle Spielinformationen`
- H2: `Spielcenter`
- Copy: one concise paragraph
- Secondary CTA: `Alle Spiele auf FUSSBALL.DE`

### Tabs
- `Nächste Spiele`
- `Letzte Spiele`
- `Tabelle`
- `Statistik`
- `Alle Mannschaften`

### Desktop layout
- Left column (4 cols): intro, filter, season switch if needed
- Right column (8 cols): tab panel with embed/content module

### Mobile layout
- Stack intro above tabs
- Make tab bar horizontally scrollable
- Use accordions for dense tables if needed

### Styling rules for widget container
- Wrap widget inside a branded card
- Add club-themed heading and light border
- Keep enough padding around the embed so it does not feel pasted in
- If widget visual style clashes, show summary cards above it and move full widget to dedicated `/spiele` page

### Fallback behavior
- If widget fails, show message and deep link to official page
- Keep summary data visible regardless

---

## 8. News section

### Purpose
Show that the club is active, current, and editorially alive.

### Layout
- Desktop: 1 featured story + 3 secondary cards
- Tablet: 2-column grid
- Mobile: stacked cards

### Section header
- Eyebrow: `Neuigkeiten`
- H2: `Aktuelles`
- Right-aligned CTA: `Alle News`

### Featured story
- 16:9 image
- Category tag
- Headline
- 2-line teaser
- Date and optional team category

### Secondary cards
- Consistent image aspect ratio
- Headline max 2 lines
- Meta row: date + category

### Editorial priority order
1. Match reports
2. Youth achievements
3. Club announcements
4. Event updates
5. Sponsor news

---

## 9. Teams overview

### Purpose
Surface the club’s breadth clearly, especially youth and men’s football.

### Section header
- Eyebrow: `Von der U7 bis zur Ü50`
- H2: `Unsere Mannschaften`
- Intro copy: one sentence on development pathway

### Grouping
Create three subsections:
- `Männerbereich`
- `Nachwuchs`
- `Senioren`

### Card design
- Desktop: 3 or 4 columns depending on content density
- Card padding: `24px`
- Image top or crest badge top-left
- Title: team name
- Meta: league / age group
- CTA: `Zum Team`

### Priority order
- 1. Männer
- 2. Männer
- U19
- U17
- U15
- U13
- U11
- U9
- U7
- Ü50

### Mobile
- 2-column card grid or single-column stack if photography is used heavily

---

## 10. Club identity / stats section

### Purpose
Turn the club from a list of pages into a story.

### Layout
- Desktop: 6 / 6 split
- Left: narrative content
- Right: stats grid

### Left content
- Eyebrow: `Motor des Barnim`
- H2: `Tradition mit Blick nach vorn`
- Body copy: 80–120 words
- CTA: `Mehr über den Verein`

### Right content
2x2 or 2x3 stat grid:
- `100+ Jahre` Vereinsgeschichte
- `10+ Teams` von der U7 bis zur Ü50
- `Landesliga` sportliche Ambition im Männerbereich
- `Nachwuchs` zentrale Rolle in der Vereinsentwicklung

### Visual treatment
- Large numeral
- Short descriptor
- Very restrained iconography

---

## 11. Sponsors section

### Purpose
Show sponsor value without making the page feel cluttered.

### Section header
- Eyebrow: `Partner des Vereins`
- H2: `Unsere Sponsoren`
- CTA: `Alle Sponsoren`

### Structure
Use visible sponsor tiers:
- Hauptsponsor
- Premium
- Exklusiv
- Top- / Businesspartner

### Desktop layout
- Hauptsponsor: large featured logo area
- Premium tier: 3–4 logos row
- Lower tiers: compact responsive logo grid

### Mobile
- Stack tiers vertically
- Keep logos large enough to be legible

### Rules
- Do not repeat the same logos multiple times in one view
- Avoid fast marquee as main presentation
- Optional gentle marquee only for a secondary strip

### Sponsor CTA card
Place beneath grid:
- Headline: `Werden Sie unser Partner`
- Copy: short business case
- CTA: `Jetzt anfragen`

---

## 12. Conversion CTA band

### Purpose
Capture the three most important next actions.

### Layout
Three cards in one band:
1. `Mitglied werden`
2. `Probetraining anfragen`
3. `Sponsor werden`

### Card spec
- Icon optional
- Short one-sentence explanation
- One primary CTA each
- Strong visual contrast with background

### Mobile
- Stack cards vertically
- Keep buttons full width

---

## 13. Footer specification

### Layout
4 columns desktop, accordion mobile.

### Column 1 — Verein
- Über uns
- Historie
- Präsidium
- Satzung & Dokumente
- Stadion

### Column 2 — Teams
- Männer
- Männer II
- U19
- U17
- Alle Mannschaften
- Ü50

### Column 3 — Service
- News
- Spiele
- Fanshop
- Kontakt
- Impressum
- Datenschutz

### Column 4 — Kontakt
- Address
- Phone
- Email
- Social links

### Footer bottom row
- Copyright
- legal links
- optional small badge: `Offizielle Daten teilweise via FUSSBALL.DE`

---

## 14. Desktop wireframe order

1. Sticky header
2. Hero carousel
3. Quick match strip
4. Spielcenter
5. Aktuelles
6. Unsere Mannschaften
7. Verein / Stats block
8. Sponsoren
9. Conversion CTA band
10. Footer

---

## 15. Mobile wireframe order

1. Compact sticky header
2. Hero carousel with swipe
3. Quick match cards as snap scroll
4. Spielcenter with scrollable tabs
5. News stack
6. Team groups
7. Club identity text + stats
8. Sponsor tiers
9. CTA cards
10. Footer accordions

---

## 16. Component inventory for design/dev handoff

### Layout
- `Container`
- `SectionHeader`
- `Grid`
- `Divider`

### Header
- `SiteHeader`
- `DesktopNav`
- `MobileMenuDrawer`
- `HeaderCTAGroup`

### Hero
- `HeroCarousel`
- `HeroSlideMatch`
- `HeroSlideClub`
- `HeroSlideEditorial`
- `CarouselControls`

### Match modules
- `QuickMatchStrip`
- `MatchCard`
- `ResultCard`
- `TablePositionCard`
- `MatchCenterTabs`
- `OfficialWidgetFrame`

### Content
- `NewsFeaturedCard`
- `NewsCard`
- `TeamGroup`
- `TeamCard`
- `StatCard`

### Sponsor & CTA
- `SponsorTier`
- `SponsorLogoGrid`
- `SponsorCTA`
- `ConversionBand`
- `ConversionCard`

### Footer
- `SiteFooter`
- `FooterColumn`
- `FooterAccordion`

---

## 17. Motion guidelines

- Header shrink on scroll: subtle only
- Hero slide transition: fade + slight translate
- Card hover: lift 2–4px max
- Tab changes: fast fade
- Avoid excessive parallax, counters, spinning logos, or animated backgrounds

---

## 18. Content and data rules

- Match and standings labels must use the correct season everywhere
- Competition naming must be consistent across hero, match strip, and Spielcenter
- Team naming should follow one editorial standard
- Sponsor tiers should match the club’s actual partner structure
- News categories should be limited and consistent

---

## 19. Immediate corrections for current prototype

1. Align season labels with actual match data
2. Remove repeated sponsor logos
3. Simplify header/nav duplication
4. Strengthen hero slide hierarchy
5. Promote Spielcenter higher and make it more official-data-led
6. Group teams more clearly
7. Add stronger CTA paths for member, youth, and sponsor actions

---

## 20. Recommended next build order

### Phase 1
- Header
- Hero carousel
- Quick match strip
- Spielcenter wrapper

### Phase 2
- News section
- Teams overview
- Club stats block

### Phase 3
- Sponsor tiers
- CTA band
- Footer

### Phase 4
- Dedicated pages for Spiele, Teams, Verein, Sponsoren
- CMS connection and editorial workflow
- Performance and accessibility polish

---

## 21. Homepage copy skeleton

### Hero slide 1
**Nächstes Spiel**  
FV Preussen Eberswalde gegen [Gegner]  
Offizielle Termine, Ergebnisse und Tabellen auf einen Blick.

### Hero slide 2
**Tradition. Nachwuchs. Leidenschaft.**  
Mehr als Fußball: regional verwurzelt, sportlich ambitioniert, auf die Zukunft ausgerichtet.

### Hero slide 3
**Aktuelles aus dem Verein**  
Spielberichte, Nachwuchsnews und alles rund um den Motor des Barnim.

### Spielcenter intro
**Spielcenter**  
Alle wichtigen Spielinformationen auf Basis offizieller Daten.

### Club block
**Motor des Barnim**  
Seit Generationen steht FV Preussen Eberswalde für Fußball, Nachwuchsarbeit und Vereinsleben in der Region.

### Sponsor CTA
**Werden Sie unser Partner**  
Unterstützen Sie den Fußball in Eberswalde und profitieren Sie von sichtbarer Präsenz in einem traditionsreichen Vereinsumfeld.

