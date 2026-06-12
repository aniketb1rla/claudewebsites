# Studio Presentation Mockup

A high-end, Swiss-inspired presentation built with **Next.js (App Router)**,
**Tailwind CSS v4**, and **Framer Motion**. A minimal preloader fetches all
imagery from the **Gemini API (Imagen)**, then reveals three full-viewport
landing pages that auto-scroll sequentially.

## Flow

1. **Preloader** — a 0–100 counter and hairline progress bar track the real
   image-generation promises. The generated glass-texture background fades in
   behind the counter as soon as it resolves. The screen fades out only after
   every request has settled.
2. **Page 1 — Aura Spatial** (interior architecture) appears. After 4 seconds
   the window smooth-scrolls to **Page 2 — Apex Heritage Elevations** (UK
   roofing), and 4 seconds later to **Page 3 — Vanguard Legal Partners**
   (solicitors).
3. Each section's text and UI stagger-fade up as it enters the viewport.

## Setup

```bash
npm install
cp .env.example .env.local   # add your Gemini API key
npm run dev
```

If `NEXT_PUBLIC_GEMINI_API_KEY` is missing or any generation request fails,
the site falls back to neutral slate-grey placeholders and remains fully
functional.

> **Security note:** `NEXT_PUBLIC_` variables ship in the client bundle, so
> the key is visible to anyone who opens the site. Fine for a local mockup —
> for anything deployed, move generation behind a server route (e.g.
> `app/api/generate/route.ts`) and use a non-public variable.

## Structure

```
app/
  layout.tsx                 # Inter font, global shell
  page.tsx                   # Orchestrator: load → preloader exit → auto-scroll
  globals.css                # Tailwind v4 + design tokens
components/
  Preloader.tsx              # Counter + progress line, liquid-glass veil
  SectionImage.tsx           # Image surface with slate-gradient fallback
  sections/
    AuraSpatial.tsx          # Page 1 — interior design studio
    ApexHeritage.tsx         # Page 2 — UK roofing, full-bleed imagery
    VanguardLegal.tsx        # Page 3 — solicitors
lib/
  imageService.ts            # Google Gen AI client + Imagen asset loading
  animations.ts              # Shared easing, stagger, and reveal variants
```
