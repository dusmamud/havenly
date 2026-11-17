# Havenly — Find Your Dream Home

Modern real estate site built with **Svelte 5 + SvelteKit 3 + Vite + TypeScript + Tailwind CSS 4** (static export via `@sveltejs/adapter-static`), deployed on Cloudflare Pages.

Live: https://havenly.pages.dev

## Pages

- Home — dusk-villa hero, working search filter (Location / Property Type / Price Range)
- `/properties` — filterable listings (location, type, price) + 6 property detail pages with gallery, facts, agent card and tour-booking form (demo)
- `/about`, `/testimonials`, `/blog` (+ 3 articles), `/contact`, `/faq`, `/privacy`, `/terms`, custom 404

## Stack

- Svelte 5.57.3, SvelteKit 3.2.1, Vite 8.3.8, TypeScript 6.0.3, Tailwind 4.3.5, adapter-static 4.0.1
- Fonts self-hosted (Playfair Display + Inter via @fontsource), no CDN
- SEO: RealEstateAgent + Product/Offer JSON-LD, sitemap.xml, robots.txt, llms.txt, OG cards

## Develop

```sh
npm install
npm run dev      # vite dev
npm run check    # svelte-check
npm run build    # static output in build/
```

## Deploy

Push to `main` → GitHub Actions builds and deploys `build/` to Cloudflare Pages (project `havenly`). Requires repo secrets `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`.

## Notes

All mock values (agent, phone, email, prices, testimonials) live in one file: `src/lib/data/site.ts`. Forms are demo-only — no backend, nothing is sent or stored.
