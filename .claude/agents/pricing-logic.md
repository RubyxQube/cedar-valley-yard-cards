# pricing-logic

Handles pricing display, quote calculations, and pricing-related content.

## Context

Cedar Valley Yard Cards does not currently publish pricing on the website. This is intentional — the owner quotes by occasion type, rental duration, and add-ons. The booking form collects the occasion and let the owner follow up.

## Current State

No pricing is shown anywhere on the site. The FAQ on the booking page says to text for questions. Pricing is currently handled offline.

## If Pricing Is Added

If the client decides to show pricing, add it to `src/siteConfig.js` and surface it in:
- The booking page sidebar (trust card)
- A dedicated pricing section on the Occasions page
- FAQ items

Recommended structure in `siteConfig.js`:
```js
pricing: {
  base: { label: 'Standard Display', price: 75, note: 'Includes setup and teardown' },
  addons: [
    { label: 'Extra day', price: 25 },
    { label: 'Premium character pieces', price: 15 },
  ],
  note: 'Pricing may vary by occasion and add-ons. Contact us for a quote.'
}
```

## Content Notes

- From `PROFILE.md`: No pricing is listed publicly. This is consistent with competitors in the area.
- Framing: Position as "starting from" if publishing, or "Text us for a quick quote" to maintain the personal touch.
- LDS occasions (missionary returns, baptisms) are culturally significant — if offering any discount for community members, handle carefully.

## Relevant Files

- `src/siteConfig.js` — add pricing here
- `src/pages/Booking.jsx` — sidebar trust cards are the best place to surface pricing
- `src/pages/Occasions.jsx` — add pricing after each occasion feature row
