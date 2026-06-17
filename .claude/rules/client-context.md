# Client Context — Cedar Valley Yard Cards

## What This Is
A plain HTML + CSS + vanilla JS marketing website for **Cedar Valley Yard Cards** — a full-service
yard card rental business in Eagle Mountain, Utah. Built by RubyxQube as a value-exchange demo
(free site for a Google review + referrals).

See `PROFILE.md` for full business research, competitor landscape, and content gaps.

---

## Mobile-First Is Non-Negotiable

Every page, every component, every change must be mobile responsive.

Rules:
- Design for mobile screen first, then expand to tablet (720px) and desktop (860px)
- Never use fixed pixel widths on containers — use `max-width` + `width: 100%`
- Any row of cards or columns must stack vertically on small screens
- Test mentally: "Does this stack cleanly on a 390px screen?"
- `flex` rows must use `flex-wrap: wrap`

---

## Tech Stack
- **Pages:** Plain HTML5 — no framework, no bundler
- **Styles:** `shared.css` only — no inline `<style>` blocks for shared styles
- **JS:** `sparkles.js` for visual effects — vanilla JS only
- **Backend:** `api/contact.js` (Vercel serverless) for contact form
- **Fonts:** Cormorant Garamond (display) + Mulish (body) — Google Fonts in each page `<head>`
- **Deploy:** Vercel with `cleanUrls: true`

---

## Brand & Tone

**Visual:** Celebration-first. Warm, joyful, community-forward. Deep rose hero with blush/white
body. Never corporate, never clinical.

**Voice:** "Neighbor helping neighbor celebrate." Warm, personal, zero sales pressure.
Think heartfelt Instagram caption, not marketing copy.

**Primary occasions in Utah County context:**
- Birthdays (especially milestone: Sweet 16, 18, 21, 40, 50)
- Graduations (high school, college)
- Missionary farewells and homecomings (LDS community is a major segment)
- Retirements
- Baby showers / new arrivals
- Welcome homes
- Anniversaries

---

## Design Tokens (from `shared.css :root`)

| Token | Value | Use |
|-------|-------|-----|
| `--rose` | `#c03a5f` | Primary accent |
| `--rose-lt` | `#d4617e` | Hover |
| `--rose-dk` | `#9a2d4a` | Active |
| `--sky` | `#3a9ab8` | Secondary accent |
| `--blush` | `#fce8ef` | Tint backgrounds |
| `--bg` | `#fff8f9` | Page background |
| `--hero-bg` | `#150610` | Dark hero background |
| `--text` | `#1a0810` | Body copy |
| `--text-muted` | `#5c3a4a` | Muted / secondary |
| `--border` | `rgba(192,58,95,0.12)` | Card borders |

Always use these tokens — never hardcode color hex values in HTML or CSS.

---

## Key Files
| File | Purpose |
|------|---------|
| `shared.css` | Design system — all tokens and reusable classes |
| `sparkles.js` | Celebration particle effect |
| `api/contact.js` | Contact form → email/SMS alerts |
| `PROFILE.md` | Client research, competitor analysis, content gaps |
| `index.html` | Homepage |
| `booking.html` | Booking page with Google Form embed |

---

## Style Conventions
- All shared styles go in `shared.css` — no per-page `<style>` blocks for shared patterns
- Use CSS variables from `:root` — never hardcode hex values
- Fonts are loaded per-page in `<head>` — keep both Cormorant Garamond and Mulish imports
- Class names should be semantic: `.card`, `.section`, `.hero`, `.badge`, `.btn` etc.
- Never add Tailwind, Bootstrap, or any CSS utility framework

## Content Conventions
- Never invent pricing, service areas, or owner details — use PROFILE.md or ask Boyd
- Phone number: (801) 598-9197 — define once in JSON-LD, reference in links as `tel:8015989197`
- Booking: always link to the Google Form (see `booking.html`) — no custom booking engine
- Missionary farewell/homecoming is a real and frequent occasion here — don't remove it

## What NOT to Change Without Asking Boyd
- The Google Form embed URL in `booking.html`
- Route structure (HTML file names map directly to URLs via `cleanUrls`)
- `api/contact.js` routing logic
