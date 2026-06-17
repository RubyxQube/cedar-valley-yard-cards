# CLAUDE.md — Cedar Valley Yard Cards

> **For the incoming Claude agent:** This is a client website project managed by Boyd Querubin
> at RubyxQube. Read this entire file before doing anything. It tells you exactly where
> things stand, what's been decided, and what to do next.

---

## How We Build — The Agent Factory

This project uses agent chains for all changes. Skip the chain only for typo fixes, minor copy
edits, or single-property CSS tweaks.

### UI / page changes
```
researcher → story-writer → [approve] → spec-writer → [approve] → builder → validator → [approve]
```

### Content-only updates (no layout change)
```
researcher → builder → validator → [approve]
```

### All agents

| Agent | Owns |
|-------|------|
| `researcher` | Maps relevant HTML/CSS before anything is touched |
| `story-writer` | Rough idea → approved brief |
| `spec-writer` | Approved brief → technical plan (HTML structure, CSS changes, copy) |
| `builder` | Edits HTML pages, `shared.css`, `sparkles.js` |
| `validator` | Checks finished build against the approved spec, reports gaps |

**Skip the chain for:** typo fixes, meta description tweaks, single-line CSS edits.

---

## What This Project Is

A **plain HTML + CSS + vanilla JS marketing website** for **Cedar Valley Yard Cards**, built by
Boyd's agency [RubyxQube](https://rubyxqube.com).

Cedar Valley Yard Cards is a full-service yard card rental business in Eagle Mountain, Utah.
They deliver, set up, and tear down large decorative letter/number/graphic displays for front
yards to celebrate birthdays, graduations, missionary returns, and other life moments.

Boyd is the developer. You are his AI coding assistant. When in doubt, ask Boyd — never invent
client details (pricing, service area, owner name) that aren't confirmed in `PROFILE.md`.

---

## Current Project State

**Demo site built and deployed to Vercel.** This is a value-exchange pitch — free site in
exchange for a Google review and referrals. The business is currently being sold (see PROFILE.md).

**Live URL:** cedar-valley-yard-cards.vercel.app  
**Target domain:** cedarvalleyyardcards.com (currently down — no active site)  
**Phone:** (801) 598-9197  
**Location:** 206 E Trail Rider Peak Dr, Eagle Mountain, Utah 84005  
**Service area:** Eagle Mountain, Saratoga Springs, Lehi, Herriman

### Pages built
| File | Purpose |
|------|---------|
| `index.html` | Homepage — hero, services, trust signals, CTA |
| `about.html` | About the business / owner story |
| `occasions.html` | What occasions we serve |
| `gallery.html` | Photo gallery of past setups |
| `ideas.html` | Theme/design inspiration |
| `booking.html` | Booking CTA + embedded Google Form |

### Content gaps (ask owner before filling)
- Owner's first name (for About page personalization)
- Real photos of yard card setups (stock won't cut it — product is visual)
- Inventory / theme options (what letter sets, number sets, graphic themes they have)
- Confirmed service area zip codes beyond Eagle Mountain and Saratoga Springs
- Email address for contact form routing
- Whether the business sale has completed and who the new owner is
- Confirmed Google Business Profile URL

---

## Tech Stack

| Layer | Choice |
|-------|--------|
| Pages | Plain HTML5 — no framework |
| Styles | `shared.css` — all shared design tokens and components |
| JS | `sparkles.js` — visual celebration effects |
| Backend | Vercel serverless functions (`api/contact.js`) |
| Fonts | Cormorant Garamond (display) + Mulish (body) — loaded from Google Fonts in each HTML `<head>` |
| Host | Vercel (`vercel.json` with `cleanUrls: true`) |

## Dev Commands
```bash
# No build step — open index.html directly or use a local server
npx serve .          # → http://localhost:3000
# Or just open files in browser
```

---

## Brand Tokens (shared.css :root)

| Token | Value | Use |
|-------|-------|-----|
| `--rose` | `#c03a5f` | Primary accent — buttons, links, highlights |
| `--rose-lt` | `#d4617e` | Hover states |
| `--rose-dk` | `#9a2d4a` | Active / pressed states |
| `--sky` | `#3a9ab8` | Secondary accent — badges, secondary CTAs |
| `--blush` | `#fce8ef` | Light tint backgrounds |
| `--bg` | `#fff8f9` | Page background |
| `--hero-bg` | `#150610` | Dark hero section background |
| `--text` | `#1a0810` | Body text |
| `--text-muted` | `#5c3a4a` | Secondary / muted text |
| `--border` | `rgba(192,58,95,0.12)` | Card borders |

---

## Architecture Decisions Already Made

1. **No framework** — plain HTML/CSS/JS only. Don't introduce React, Vue, or any bundler.
2. **`shared.css` is the design system** — all reusable styles live here. Don't add `<style>` 
   blocks in HTML pages for anything shared; add it to `shared.css`.
3. **Fonts in every `<head>`** — each HTML page links the Google Fonts import directly (no 
   shared layout file to put it in once).
4. **`cleanUrls: true` in vercel.json** — `booking.html` is served at `/booking`. Don't change this.
5. **Booking via Google Form** — no custom booking system. The Google Form embed in `booking.html` 
   is the intake. Don't build a custom form engine.
6. **No CMS** — content is hardcoded in HTML. Keep it simple.
7. **`api/contact.js`** — Vercel serverless function for the contact form → email/SMS alerts.

---

## Key Files Quick Reference

| File | What it controls |
|------|-----------------|
| `shared.css` | All brand tokens, reusable components, layout classes |
| `sparkles.js` | Celebration particle / sparkle visual effect |
| `api/contact.js` | Contact form → email + SMS alerts |
| `PROFILE.md` | **Master research doc** — all client info, competitor landscape, content gaps |
| `index.html` | Homepage — hero, trust signals, occasions overview, CTA |
| `booking.html` | Booking page — Google Form embed |

---

## Style Rules

@.claude/rules/client-context.md

---

## Design Recreation (when Boyd gives a screenshot)

@.claude/rules/workflow.md
@.claude/rules/technical-defaults.md
@.claude/rules/design-rules.md

---

## What NOT to Do Without Asking Boyd

- Don't introduce npm dependencies or a build step
- Don't hardcode the phone number in more than one place — it's in the JSON-LD schema in `index.html`; reference that pattern
- Don't invent copy about services, pricing, or the owner — use PROFILE.md or ask Boyd
- Don't change the Google Form URL in `booking.html`
- Don't add Tailwind, Bootstrap, or any CSS framework
- Don't build a custom booking or payment system

---

## Contacts

| Who | Contact |
|-----|---------|
| Boyd (developer/agency) | boyd@rubyxqube.com |
| Client research | `PROFILE.md` |
| Business phone | (801) 598-9197 |
| Social | facebook.com/cedarvalleyyardcards · instagram.com/cedarvalleyyardcards |
