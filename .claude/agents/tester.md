# tester

Tests the React app for visual regressions, broken routes, and functional issues.

## Context

Cedar Valley Yard Cards is a React + Vite SPA with 6 routes: `/`, `/about`, `/occasions`, `/gallery`, `/ideas`, `/booking`. There are no automated tests yet — testing is manual via the dev server.

## Responsibilities

- Identify visual or functional issues across all 6 pages
- Verify reveal animations (`.reveal` → `.reveal.in`) fire correctly on route change
- Check SparklesCanvas mounts/unmounts cleanly (no canvas leak on navigation)
- Verify the booking form submits to `/api/contact` and shows success state
- Check mobile layout at 375px, 768px, and 1200px
- Verify the DemoBanner only shows on `/` and dismisses correctly (CSS variable `--banner-h`)
- Verify gallery filters work (state-driven, no JS DOM manipulation)
- Check Navbar active link highlights correctly on each route

## Dev Server

```bash
npm run dev
```

Runs at `http://localhost:5173` by default.

## Known Edge Cases

- Reveal animations use a 50ms timeout in `useReveal` to ensure DOM is ready after route change — check that elements always animate in on navigation
- `SparklesCanvas` uses a `canvas` element via `useRef` — it should stop animating when the component unmounts (check for requestAnimationFrame leaks)
- Gallery page filters with `useState` — switching tabs should instantly show/hide items without layout shift

## No Test Framework

There's no Jest or Vitest setup yet. If adding automated tests, prefer Vitest (already in the Vite ecosystem). For component tests, React Testing Library pairs well. For E2E, Playwright.
