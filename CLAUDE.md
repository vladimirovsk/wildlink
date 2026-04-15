# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # start dev server at localhost:3000
npm run build    # production build
npm run lint     # ESLint
```

No test suite is configured.

## Stack

- **Next.js 16.2.3** with React 19 — see AGENTS.md warning about breaking changes
- **Tailwind CSS v4** — configured via `postcss.config.mjs`; theme defined in `src/app/globals.css` using `@theme inline`, not `tailwind.config.js`
- **Framer Motion** for animations
- **TypeScript** strict mode; path alias `@/*` → `src/*`

## Project structure

This is a single-page marketing/waitlist site for WildLink, a LoRa mesh tracking device. There are **two copies of the project**: the root (active) and `landing/` (appears to be a duplicate — edit the root). All source code lives in `src/`.

`src/app/page.tsx` composes the full page in order: `Navbar → Hero → DeviceUX → MeshAnimation → UsageScenarios → ComparisonTable → FounderStory → WaitlistForm → SupportSection → Footer`. Each is a standalone component in `src/components/`.

Hash-based section IDs (`#device`, `#scenarios`, `#compare`, `#story`, `#waitlist`) are used for in-page navigation and the sitemap.

## Design tokens

Custom colors defined as CSS variables and exposed to Tailwind via `@theme inline` in `globals.css`:

| Token     | Hex       | Usage               |
|-----------|-----------|---------------------|
| `forest`  | `#0F1F16` | Background (dark green) |
| `orange`  | `#FF5C00` | Accent / CTA        |
| `slate`   | `#334155` | Secondary text      |
| `alpine`  | `#F8FAFC` | Primary text (light) |

Use these as Tailwind classes: `bg-forest`, `text-orange`, `text-alpine`, etc.

Global CSS also defines LED animation classes (`led-breathing-blue`, `led-pulse-red`, `led-flash-sos`) and a `.grain-overlay` utility used in the device mockup section.