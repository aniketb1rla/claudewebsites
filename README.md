# Three Brands — Landing Page Showcase

A cinematic landing-page reel built with **Next.js (App Router)**,
**Tailwind CSS v4**, and **Framer Motion**. A Fraunces-set loader gates on
imagery generated via the **Gemini API (Imagen)**, then a curtain lifts onto
three full-viewport brand pages that auto-advance on a timed reel.

## The three brands

| Page | Brand | Industry | Identity |
| --- | --- | --- | --- |
| 01 | **Maison Véra** | Interior architecture | Forest green / cream / brass, Fraunces editorial serif |
| 02 | **Pennine Roofing Co.** | Greater Manchester roofers | Stone ground, Anton industrial headline, signal orange, self-drawing roofline |
| 03 | **Ashcroft & Gray** | London solicitors | Deep navy / parchment / old gold, Playfair Display, gold-ruled practice index |

## Flow

1. **Loader** — an oversized 0–100 counter and gold hairline bar track the
   real image-generation promises; the generated glass texture ghosts in
   behind. It lifts only after every request settles.
2. **Curtain reveal** — page 1 arms beneath a curtain that rises into the
   live reel.
3. **Autoplay reel** — each page dwells ~6.8s (segmented progress bar up
   top), then the track glides to the next, looping. Staggered line-mask and
   fade-up reveals replay on every entrance.
4. **Full control chrome** — right-rail dots, play/pause, page counter,
   wheel / arrow-key / touch-swipe navigation, `prefers-reduced-motion`
   respected.

## Setup

```bash
npm install
cp .env.example .env.local   # add your Gemini API key
npm run dev
```

If `NEXT_PUBLIC_GEMINI_API_KEY` is missing or any generation request fails,
each panel falls back to a designed placeholder (Maison Véra's arched
plaster light-cast, tonal gradients elsewhere) and the site remains fully
functional.

> **Security note:** `NEXT_PUBLIC_` variables ship in the client bundle, so
> the key is visible to anyone who opens the site. Fine for a local mockup —
> for anything deployed, move generation behind a server route (e.g.
> `app/api/generate/route.ts`) and use a non-public variable.

## Structure

```
app/
  layout.tsx                 # Inter, Manrope, Fraunces, Playfair, Anton
  page.tsx                   # Reel state machine: load → curtain → autoplay
  globals.css                # Brand systems, reveal choreography, chrome
components/
  Loader.tsx                 # 0–100 counter gated on real API progress
  Chrome.tsx                 # Progress segments, rail, play/pause, counter
  panels/
    MaisonVera.tsx           # Page 1 — interior architecture
    PennineRoofing.tsx       # Page 2 — roofers, self-drawing roofline
    AshcroftGray.tsx         # Page 3 — solicitors, practice index
lib/
  imageService.ts            # Google Gen AI client + Imagen asset loading
```
