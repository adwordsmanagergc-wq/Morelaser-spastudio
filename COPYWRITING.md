# Copywriting & Imagery Notes

A short guide to keeping the MORE Laser & Spa voice consistent.

## Voice

- **Quiet, not loud.** Avoid exclamation marks and superlatives ("amazing", "best"). Reach for "refined", "considered", "thoughtful".
- **Editorial, not promotional.** Borrow cadence from Aman, Sisley, Como Shambhala brochures. Sentences should breathe.
- **Bilingual symmetry.** Russian copy should match the English line-for-line. If you add an English key, add the Russian translation in the same commit.

## Suggested phrasings

| Avoid | Prefer |
| --- | --- |
| "Painless and fast laser hair removal!" | "Painless treatment — even on sensitive skin." |
| "Book now and save 30%!" | "Reserve your sanctuary. We respond within the hour." |
| "Best laser in Bali" | "Calibrated for the European market and chosen for its quiet precision." |
| "Cheap deals" | "Editor's selections" / "Most considered" |

## Imagery direction

- Lifestyle, never clinical. Soft daylight, linen textures, tropical greenery, marble, ceramic.
- Apply a subtle duotone in teal/cream for editorial cohesion if mixing stock photography.
- Faces should be candid and serene — no over-styled "before/after" stock.
- Hero shot: an interior detail (a folded towel, a ceramic vessel) reads more luxurious than a treatment-room wide shot.

### Replacing the Unsplash placeholders

1. Place final images in `public/images/`.
2. Search the repo for the Unsplash URLs and swap.
3. Use `next/image` for any new image:

```tsx
import Image from 'next/image';
<Image src="/images/hero.jpg" alt="..." fill className="object-cover" priority />
```

## Adding a new service

1. Drop the price into `data/prices.json`.
2. Translate the `name.en` and `name.ru` keys.
3. If the service is a brand-new category, follow the README's "Adding new services" section.

## Testimonials

These live in `messages/{en,ru}.json` under `home.testimonials`. Keep them short (max 18 words) — the typography does the work.

```json
{ "name": "Aïsha M.", "city": "Paris", "quote": "Truly painless and impeccably hygienic." }
```

## Pricing display rules

- Always show the IDR currency tag, never `Rp`.
- If `wasPrice` exists, the original is shown struck-through; the discounted price is dominant.
- Subscriptions are **per visit** — labelled explicitly in the third tile.

## What to leave to the team

- Real Instagram handle, WhatsApp number, exact street address — set via `.env`.
- Confirmed business hours — currently `Daily · 10:00 – 21:00`, edit in `messages/{locale}.json` under `common.hours`.

— end —
