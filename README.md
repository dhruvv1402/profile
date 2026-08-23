# Portfolio

A retro editorial portfolio — cream newsprint, Didone masthead, hairline rules — built as a
newspaper front page. Design language derived from `docs/reference/reference.webp`.

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Lenis

---

## Running it

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build; all routes prerender
npm run lint
```

---

## Making it yours

Everything you need to change lives in **two files**. No copy is written into any component.

### `content/site.ts`

Your name, roles, tagline, location, email, socials, bio, pull quote, ticker, stack, and the
education/experience chronicle.

- `name` is the masthead. It is sized from its own character count, so any length fills the
  measure — but check it at 375px before committing to something very long.
- `github` pulls your recently-pushed public repos into the "Dispatches" section at build time,
  revalidated hourly. Set it to `null` to hide that section.

### `content/projects.ts`

One entry per project. The shape matters more than the prose: each has `problem → approach →
outcome → reflection`. That structure is the single most valuable thing on the site — a
screenshot says you can use a framework, a case study says you can think.

- Put a number in `outcome` wherever you honestly have one.
- `featured: true` promotes a project to the home page. Keep it to three or four.
- Never link a demo that is down. A dead link is worse than no link.

### `notes` (in `site.ts`)

Short write-ups. `href` can point anywhere — a future `/notes` route, dev.to, a gist, a README.

**Empty the array and the section disappears from the home page.** That is deliberate: an
empty writing section with a "coming soon" in it advertises that you stopped writing. Two
placeholders ship so you can see the treatment.

---

## Adding assets

Drop files into `public/` and they appear. Nothing else to change.

| File | Appears as |
| --- | --- |
| `public/portrait.jpg` | The hero portrait and the about-page photograph |
| `public/work/<name>.jpg` | A project cover — path is set per project in `projects.ts` |
| `public/resume.pdf` | The résumé link in the nav, contact block, and about page |

Until a file exists the site draws a ruled placeholder mat in its place, and the résumé link
stays hidden rather than pointing at a 404. Both checks run at build time (`lib/assets.ts`).

---

## Changing the typefaces

`lib/fonts.ts` is the only file that names a font. Three roles:

| Role | Face | Used for |
| --- | --- | --- |
| `display` | Bodoni Moda | The masthead and every large heading |
| `body` | Newsreader | Long-form editorial text |
| `mono` | Space Mono | Micro-labels, datelines, captions, technical data |

To drop in a licensed face, replace the `display` export with `next/font/local` — the file has
the snippet. Then re-tune `--adv` in `.masthead` (`app/globals.css`): it is the average advance
width of a capital in ems, kept deliberately pessimistic so no name overflows the page.

---

## The design system

`app/globals.css` holds the whole visual language. Two rules keep it coherent:

1. **Never hardcode a colour in a component.** Every colour is a token in `@theme`. This is also
   what makes the Night Edition work — inverting seven token values flips the entire site.
2. **Compose the print classes** rather than inventing new ones: `.shell`, `.rule*`, `.label`,
   `.masthead`, `.display-*`, `.columns-news`, `.dropcap`, `.press-frame`, `.halftone`,
   `.link-rule`, `.vertical*`.

### Working on the layout

Press **Ctrl+G** in development for a twelve-column overlay. The design lives or dies on
alignment — the rules, the masthead, the gutters and the section heads all sit on the same
grid, and a two-pixel drift reads as sloppiness without being obvious enough to spot by eye.
The overlay is not rendered in production builds.

Section folio numbers (`01`, `02`, …) are handed out in `app/page.tsx`, not hardcoded in each
section, so reordering sections renumbers them and a hidden section leaves no gap.

### Motion contract

All motion is CSS. Nothing needs JavaScript to become *visible*:

- The scroll-reveal hidden state is scoped to `.js`, which is set by the blocking boot script in
  the root layout. If the bundle never lands, the page is still complete and readable.
- The masthead animation is a CSS keyframe, so it runs at parse time.
- `prefers-reduced-motion` disables Lenis, the custom cursor, and the hover previews entirely,
  and collapses every transition — verified, not assumed.

---

## Structure

```
app/
  page.tsx              front page, composed of the sections in components/home/
  work/                 index + /work/[slug] case studies (all prerendered)
  about/                long-form bio, chronicle, stack
  opengraph-image.tsx   share card, generated in the same editorial style
  icon.tsx              favicon, generated from site.name
  sitemap.ts robots.ts  
components/
  layout/   Header, Footer, SectionHead, Marquee, PressImage, ThemeToggle,
            GridOverlay (dev only)
  home/     Masthead, SelectedWork, AboutColumn, StackClassifieds, Chronicle,
            GithubDispatch, Notes, ContactBlock
  work/     ProjectHoverImage
  motion/   SmoothScroll, Reveal, SplitText, Cursor, MagneticLink
lib/        fonts, assets, github, utils, use-media-query, og-fonts
```

---

## Before deploying

- [ ] Set `site.url` in `content/site.ts` to the real domain — canonical URLs, the sitemap, and
      absolute OG image paths all read from it.
- [ ] Replace the placeholder email and social handles.
- [ ] Add `public/resume.pdf`, `public/portrait.jpg`, and the project covers.
- [ ] Check every project's demo and source link actually resolves.
- [ ] `npm run build`, then Lighthouse on the production build.

---

## Measured on the production build

| | |
| --- | --- |
| Lighthouse | Performance 93 · Accessibility 100 · Best Practices 96 · SEO 100 |
| Unthrottled | Performance 100 — FCP and LCP both 0.2s |
| Layout | No horizontal scroll at 375 / 768 / 1440 across every route |
| CLS | 0 |

Performance is measured under Lighthouse's default mobile profile (simulated slow 4G, 4× CPU
throttle). The one console error in a local run is `/_vercel/insights/script.js` returning 404 —
Vercel Analytics only exists once deployed.
