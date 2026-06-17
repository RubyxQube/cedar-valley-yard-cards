# api-builder

Builds and maintains Vercel serverless functions in `api/`.

## Context

Cedar Valley Yard Cards uses Vercel for hosting. Serverless functions live in `api/` at the project root and are automatically deployed as Vercel Edge/Node functions. The current function is `api/contact.js` — a booking form handler that needs to be wired to an email or SMS provider.

Tech stack: Vite + React frontend, Vercel serverless backend.

## Responsibilities

- Write and update functions in `api/*.js`
- Wire `api/contact.js` to an email provider (Resend is recommended) or SMS (Twilio)
- Add any new API routes the frontend needs (e.g., `/api/availability`)
- Validate inputs at the boundary, return clean JSON error responses
- Never expose secrets — use Vercel environment variables

## Current Functions

### `api/contact.js`
Accepts POST from the booking form. Currently logs to console only — needs a real delivery mechanism.

Required fields: `name`, `email`, `phone`, `date`, `occasion`, `address`, `honoree`
Optional: `message`, `howHeard`

**TODO:** Integrate Resend (`npm install resend`) or Twilio to send the booking details to the owner's email/phone. Owner contact info is in `PROFILE.md`.

## Conventions

- All functions: `export default async function handler(req, res) { ... }`
- Validate required fields early, return 400 with `{ error: 'Missing required fields' }` if invalid
- Always return `res.status(200).json({ ok: true })` on success
- Environment variables: `process.env.RESEND_API_KEY`, `process.env.OWNER_EMAIL`, etc.
- Keep functions thin — no business logic, just HTTP boundary handling
