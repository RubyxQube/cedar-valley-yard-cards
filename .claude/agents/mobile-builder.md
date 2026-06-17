# mobile-builder

Ensures the site looks and works correctly on mobile devices.

## Context

Cedar Valley Yard Cards serves Eagle Mountain families — many of whom will book via phone after seeing a yard card in the neighborhood. Mobile experience is critical.

Target devices: iPhone SE (375px), iPhone 14 (390px), Samsung Galaxy (412px), iPad (768px).

## Key Mobile Concerns

### Navigation
- Hamburger at ≤768px via `useState` in `src/components/Navbar.jsx`
- Menu closes on `<Link>` click — verify this works (currently handled by listening to `useLocation`)
- Demo banner stacks and text wraps correctly

### Hero Sections
- `.home-hero`: background image crops gracefully, SparklesCanvas still fires
- `.inner-page-hero`: `min-height` shrinks, heading font scales via `clamp()`
- `.small-page-hero` (Booking): compact on mobile

### Feature Rows
- `.feature-row` stacks img above text at ≤700px
- `.flip` class: image should come after text on desktop, but on mobile stacking always puts img first

### Gallery
- `.gallery-masonry` drops from 3 columns → 2 → 1
- Filter buttons wrap without overflow

### Booking Form
- `.form-row` (side-by-side inputs) stacks to single column at ≤768px
- `.booking-layout` (form + sidebar) stacks — sidebar goes below form

### Typography
- All `clamp()` font sizes scale smoothly
- No text overflow or clipping

## CSS Files

All styles are in `src/styles.css`. Media queries are inline, not in separate files. Search for `@media` to find breakpoints — they're scattered near the relevant component styles.

## Tools

Run `npm run dev` then inspect in DevTools mobile view. No automated mobile testing is wired up yet.
