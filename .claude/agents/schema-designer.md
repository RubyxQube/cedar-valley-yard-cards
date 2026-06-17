# schema-designer

Manages structured data (JSON-LD) and SEO metadata for Cedar Valley Yard Cards.

## Context

Cedar Valley Yard Cards is a local service business in Eagle Mountain, Utah. Structured data helps it rank in local search for "yard card rental Eagle Mountain" and related queries. The business relies entirely on word-of-mouth and organic local search — SEO is high priority.

## Current Structured Data

`index.html` contains a `LocalBusiness` JSON-LD block:

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Cedar Valley Yard Cards",
  "url": "https://cedar-valley-yard-cards.vercel.app",
  "telephone": "+18015989197",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "206 E Trail Rider Peak Dr",
    "addressLocality": "Eagle Mountain",
    "addressRegion": "UT",
    "postalCode": "84005",
    "addressCountry": "US"
  },
  "areaServed": ["Eagle Mountain", "Saratoga Springs", "Lehi", "Herriman"],
  "priceRange": "$$",
  "openingHours": "Mo-Su 06:00-20:00"
}
```

## Per-Page Meta

Page titles and descriptions are set via `src/hooks/usePageMeta.js`. Each page calls `usePageMeta(title, description)`.

Current meta per page:
- `/` — "Cedar Valley Yard Cards | Yard Card Rentals in Eagle Mountain, Utah"
- `/about` — "About Us | Cedar Valley Yard Cards - Eagle Mountain, Utah"
- `/occasions` — "Occasions | Cedar Valley Yard Cards - Eagle Mountain Yard Card Rentals"
- `/gallery` — "Gallery | Cedar Valley Yard Cards - Eagle Mountain Celebrations"
- `/ideas` — "Celebration Ideas | Cedar Valley Yard Cards - Eagle Mountain"
- `/booking` — "Book a Yard Card | Cedar Valley Yard Cards - Eagle Mountain, Utah"

## Improvements To Consider

1. Add `Review` or `AggregateRating` schema once Google reviews are accessible
2. Add `Service` schema for each occasion type (birthday, graduation, welcome home)
3. Add `FAQPage` schema mirroring the FAQ section on the booking page
4. Add OG/Twitter card meta tags to `usePageMeta` for social sharing

## Files

- `index.html` — JSON-LD lives here (static, in `<head>`)
- `src/hooks/usePageMeta.js` — dynamic title + description per route
- `src/siteConfig.js` — single source of truth for business data used in schema
