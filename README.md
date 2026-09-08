# Century — Landing Page

A pixel-accurate Next.js build of the Century landing page from Figma
(`cOm40UgPKQ1L1LaQ7s9oMs`, node `5:2369`), responsive from 1440 down to mobile.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm run start
```

## Stack

- Next.js 15 (App Router) + TypeScript
- CSS Modules, no UI framework
- Fonts via `next/font/google`: Merriweather (display), Instrument Serif
  (italic accents), Inter (UI/body), JetBrains Mono (region markers)

## Layout

`src/app/page.tsx` composes the sections in Figma order:

| Component | Figma node |
| --- | --- |
| `Header` | `5:2371` Nav Bar |
| `Hero` | `5:2370` Frame 1 |
| `Intro` | `5:2407` Heading 2 |
| `Stats` | `5:2409` Stats Row |
| `Showcase` | `5:2437` Video Card |
| `Projects` | `5:2460` Section - Listings |
| `CityMap` | `5:2618` City Map Section |
| `Awards` | `5:2688`–`5:2712` Opinion Cards |
| `Inquiry` | `5:2713` Section - Desktop |
| `Footer` | `5:2763` Footer - Desktop |

All artwork is exported from the Figma file into `public/assets/`.

## Notes

- Colour, type, and spacing values come from the Figma node data; section
  offsets reproduce the 1440-wide frame (page height 7241px vs Figma's 7239px).
- Three backdrops (hero, city map, inquiry) use a crop Figma specifies rather
  than plain `cover`. Because `next/image fill` writes its geometry inline,
  those rules carry `!important` — see the comments in the stylesheets.
- The design ships a single "All" state for the project filter, so
  `src/data/listings.ts` adds a `category` field to make the tabs functional.
  The visible `tag` (House / Villa) is exactly as designed.
- Responsive breakpoints: 1400 / 1200 / 1100 / 1024 / 900 / 780 / 700 / 640 /
  560. Below 900px the nav collapses to a sheet, grids go to one column, the
  awards scatter becomes a stack, and the inquiry form drops its photo panel.
