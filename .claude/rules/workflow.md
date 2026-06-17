# Website Design Recreation — Workflow

## Step 0 — Aesthetic direction (new sections and major redesigns only)

Before writing any production code for a new section, page, or major visual overhaul, run:
```
/frontend-design
[describe the business, the aesthetic direction, and mood you're going for]
```

Lock the design direction first. Then build.

**When to run Step 0:**
- New page or full-page redesign
- New major section (hero, gallery, testimonials) being added from scratch
- Any time Boyd says "I want this to look like…" with a creative direction

**When to skip Step 0:**
- Iterating on existing components (spacing, color, copy tweaks)
- Bug fixes
- Content updates (swapping text, images)
- Config changes (chatbot system prompt, siteConfig values)

---

## Steps 1–6 — Design Recreation (when Boyd gives a screenshot)

When Boyd provides a reference image (screenshot) and optionally some CSS classes or style notes:

1. **Generate** a single `index.html` file using Tailwind CSS (via CDN). Include all content inline — no external files unless requested.
2. **Screenshot** the rendered page using Puppeteer (`npx puppeteer screenshot index.html --fullpage` or equivalent). If the page has distinct sections, capture those individually too.
3. **Compare** your screenshot against the reference image. Check for mismatches in:
   - Spacing and padding (measure in px)
   - Font sizes, weights, and line heights
   - Colors (exact hex values)
   - Alignment and positioning
   - Border radii, shadows, and effects
   - Responsive behavior
   - Image/icon sizing and placement
4. **Fix** every mismatch found. Edit the HTML/Tailwind code.
5. **Re-screenshot** and compare again.
6. **Repeat** steps 3–5 until the result is within ~2–3px of the reference everywhere.

Do NOT stop after one pass. Always do at least 2 comparison rounds. Only stop when the user says so or when no visible differences remain.
