# MORE Laser & Spa

A luxury marketing website for **MORE Laser & Spa**, a premium laser hair-removal and beauty salon in Ubud, Bali. Built with quiet-luxury sensibilities — calm ocean tones, refined serif typography, generous whitespace, and editorial pacing.

> _"Painless Laser Hair Removal & Holistic Beauty in the Heart of Ubud."_

---

## Stack

| | |
| --- | --- |
| Framework | **Next.js 14** (App Router) + React 18 |
| Language | **TypeScript** (strict) |
| Styling | **Tailwind CSS** with custom palette + Cormorant Garamond / Inter |
| Animation | **Framer Motion** (scroll-triggered fade & slide) |
| Icons | **lucide-react** |
| i18n | **next-intl** — English + Russian |
| Email | **Resend** (booking form) |
| Maps | **OpenStreetMap** embed (no API key required) |
| Deploy | **Vercel** — zero configuration |

---

## Brand palette

```
Deep Teal   #1a5f6f   ← primary
Seafoam     #a8d5d8
Sand Beige  #e8dcc4
Cream       #faf7f2   ← background
Muted Gold  #c9a961   ← accent
```

Type: `Cormorant Garamond` for headings (serif), `Inter` for body / micro-copy.

---

## Getting started

```bash
# 1. Install
npm install

# 2. Configure environment
cp .env.example .env.local
# fill in RESEND_API_KEY, BOOKING_TO_EMAIL, NEXT_PUBLIC_WHATSAPP_NUMBER, etc.

# 3. Develop
npm run dev          # http://localhost:3000

# 4. Type-check
npm run type-check

# 5. Production build
npm run build
npm run start
```

---

## Deploy to Vercel

1. Push the repo to GitHub.
2. Import the project at [vercel.com/new](https://vercel.com/new).
3. Add the same env vars from `.env.example` to the Vercel project.
4. Deploy. The default Next.js detection works without any custom build commands.

The `next-intl` middleware (`src/middleware.ts`) handles the locale routing automatically — English at `/`, Russian at `/ru`.

---

## Project layout

```
.
├── data/prices.json              ← all prices, edit freely
├── messages/
│   ├── en.json                   ← English copy
│   └── ru.json                   ← Russian copy
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── layout.tsx        ← header / footer / fonts / SEO
│   │   │   ├── page.tsx          ← homepage
│   │   │   ├── about/            ← Our Technology
│   │   │   ├── services/         ← Services & Pricing (tabbed)
│   │   │   ├── treatment-info/   ← Sessions / Prep / Aftercare / Contraindications
│   │   │   ├── booking/          ← multi-step booking form
│   │   │   └── contact/          ← map, WA, IG, hours
│   │   ├── api/booking/route.ts  ← Resend email handler
│   │   ├── not-found.tsx
│   │   └── globals.css
│   ├── components/               ← Hero, ServiceCard, PriceTable, etc.
│   ├── lib/cn.ts                 ← class helper + IDR formatter
│   ├── i18n.ts                   ← next-intl config
│   └── middleware.ts             ← locale routing
├── tailwind.config.ts
├── next.config.js
└── package.json
```

---

## Editing prices

All prices live in **`data/prices.json`**. Numbers are integers in IDR; the formatter handles thousand separators.

```jsonc
{
  "id": "pkg-1",
  "name": { "en": "...", "ru": "..." },
  "wasPrice": 1350000,     // optional — renders strikethrough
  "price": 1000000
}
```

Subscriptions have a `tiers` array (`1 / 3 / 5` visits — pricing per visit). Combo featured cards include a `tag` and full strikethrough/discount pair.

The `services` page consumes this file directly; no rebuild step is required beyond saving and re-deploying.

> **Migrating to Sanity later?** The shape mirrors a Sanity document — define schemas with the same field names (`wasPrice`, `price`, `tiers[]`, `name.en`, `name.ru`) and swap the JSON import for a `groq` query.

---

## Editing copy

Open `messages/en.json` and `messages/ru.json`. Keys are namespaced by section (`home.tagline`, `treatment.contraindications`, …). Always update both files in tandem so the language switcher remains symmetrical.

---

## Swapping imagery

The current site references **Unsplash** photos via `next/image` for prototyping. To swap them:

1. Drop final imagery into `public/images/`.
2. Search the codebase for the existing Unsplash URLs (e.g. `photo-1540555700478…`).
3. Replace with `/images/your-photo.jpg`.
4. Allowed remote hosts are configured in `next.config.js` (`unsplash.com`, `cdn.sanity.io`, `cloudinary`).

For the homepage hero, the background image can be swapped to a looping video by replacing the `<div style={{ backgroundImage }}>` block in `src/components/Hero.tsx` with a `<video autoPlay muted loop playsInline poster="…">` tag.

---

## Adding new services

1. Add the item to `data/prices.json` in the appropriate category.
2. If it's a new top-level category (e.g. _"Permanent Makeup"_):
   - Add a `tabs.<key>` entry in `messages/{en,ru}.json` under `services.tabs`.
   - Add a `categories.<key>` entry in `messages/{en,ru}.json`.
   - Add a tab + render block in `src/app/[locale]/services/ServicesView.tsx`.

---

## SEO & accessibility

- LocalBusiness JSON-LD is injected from `src/app/[locale]/layout.tsx` — update the address, coordinates, and `priceRange` there.
- OpenGraph metadata is generated per locale.
- Semantic HTML throughout: `<header>`, `<nav>`, `<main>`, `<footer>`, real heading hierarchy.
- WCAG AA contrast verified across teal-on-cream and gold-on-teal pairings.
- Keyboard navigation supported on all interactive elements; mobile menu trapped + scroll-locked.

---

## Booking email

Set `RESEND_API_KEY` and `BOOKING_TO_EMAIL` in your environment. Verified-from address goes in `BOOKING_FROM_EMAIL`. The handler at `src/app/api/booking/route.ts` will:

1. Validate required fields.
2. Compose a refined HTML email (Garamond, gold accent, teal headings).
3. Send via Resend with `replyTo` set to the visitor's email.

In development without keys, the handler logs the payload and returns `{ ok: true, queued: true }` so the UI flow can be tested end-to-end.

---

## Roadmap suggestions

- Migrate `prices.json` to Sanity Studio for non-technical price edits.
- Add gallery & before/after carousel (consider duotone treatment for editorial cohesion).
- Wire calendar to a real scheduling provider (Cal.com, Calendly).
- Add Indonesian (`id`) locale — copy uses the same key structure.

---

© MORE Laser & Spa · Ubud, Bali
