# Signal Systems landing page

Signal Systems is a single-page, editorial-style sales site for practical AI content workflows. The experience is deliberately specific about what automation does, where human judgement remains, and how implementation cost is separated from ongoing tool costs.

## Product outcome

The page gives a prospective client four clear routes into a conversation:

1. Explore a focused solution: Telegram content factory, YouTube research assistant, content approval workflow, or custom pipeline.
2. Understand the delivery method and the human-in-the-loop boundary.
3. Compare three implementation bands without hiding recurring costs.
4. Submit a qualified enquiry with name, work email, problem statement, and consent.

The public page does not claim autonomous publishing. The copy explicitly positions AI as a first pass and the client as the final decision-maker.

## Stack and file map

- `index.html` — document shell, metadata, and entry point.
- `src/main.js` — page markup, catalogue data, navigation behavior, solution selection, reveal observer, and API-backed enquiry form behavior.
- `src/style.css` — design tokens, responsive layout, typography, components, and motion.
- `server/lead-service.js` — shared validation, rate limiting, payload shaping, and webhook delivery.
- `server/index.js` — dependency-free local production server for static files and `/api/leads`.
- `api/leads.js` — Vercel-compatible serverless version of the lead endpoint.
- `test/lead-service.test.js` — built-in Node test coverage for the lead boundary.
- `public/` — favicon, robots file, sitemap, and privacy page.
- `package.json` — Vite, local server, and test scripts.
- `docs.md` — this implementation and handoff record.

This is intentionally a small Vite/vanilla JavaScript project with a dependency-free Node delivery layer. The browser bundle remains portable to a Tilda Zero Block or HTML/code block, while the standalone version now has a real server-side lead boundary.

## Run locally

Requirements: Node.js 18+ and npm.

```bash
npm install
npm run dev
```

The development server prints a local URL, normally `http://localhost:5173`.

Create a production bundle with:

```bash
npm run build
npm run preview
```

For a local production-like server, copy `.env.example` to your environment and build first, then run:

```bash
LEAD_WEBHOOK_URL=https://your-webhook.example npm start
```

The server listens on `http://localhost:4173` by default. Set `PORT` to change it. Without `LEAD_WEBHOOK_URL`, valid lead submissions return a deliberate `503` instead of pretending delivery succeeded.

Run automated checks with:

```bash
npm test
```

`dist/` is generated output and is excluded from git. The current production build completes with Vite and has no dependency audit findings after installation. Hashed assets are safe to cache between deploys.

## Page structure

The page is ordered as a conversion narrative rather than a generic feature list:

- Hero: positioning, primary CTA, visual metaphor for input → system → output.
- Trust strip: the three quality signals the service optimizes for.
- Catalogue: four selectable solution cards with audience, purpose, and tool hints.
- Method: map the real process, automate the repeatable, keep taste human.
- Proof numbers: indicative build time, documented handover, and human review.
- Investment: Launch Kit, Operating System, and Custom Build.
- Comparison: explicit division between system work and client judgement.
- FAQ: objections about replacement, tools, inputs, and starting small.
- Contact: lead capture with consent and a useful success state.

## Content model

The `solutions` array at the top of `src/main.js` is the catalogue source for the four solution cards. Each entry has:

```js
{
  id,
  eyebrow,
  title,
  text,
  tags: [],
  number
}
```

When adding an offer, edit this array rather than duplicating the card structure. Pricing, FAQ, comparison rows, and the method are currently editorial sections because they are not one-to-one catalogue records; they should be moved into a CMS or `offers.json` when the number of offers grows.

Every offer should continue to answer these questions before publication:

- Who is it for?
- What inputs does the client provide?
- What does the system generate or route?
- Which integrations are included?
- What is the delivery format?
- What setup access or credentials are required?
- What limitations and review steps remain?
- What is one-time implementation, and what is recurring hosting/API cost?
- What CTA should the visitor take next?

## Interactions

Events are plain browser `CustomEvent`s so analytics can be added without coupling the page to a vendor.

- The mobile menu toggles with an accessible `aria-expanded` state and closes after navigation.
- Solution rows activate on click, Enter, or Space. The active row gets a stronger background and arrow treatment.
- Elements with `.reveal` fade and lift into place when they enter the viewport. The observer is progressive enhancement; all content remains in the DOM without it.
- FAQ rows use native `<details>` and `<summary>` so they remain keyboard and browser accessible.
- The enquiry form uses native constraint validation plus a short custom status message. On valid submit it shows a success message, clears the form, and emits `signal:lead-submitted` with `{ source: 'landing-form' }` for an analytics or webhook adapter.

## Lead handling boundary

The form posts JSON to `/api/leads`. The endpoint:

1. validates name, email, message, consent, and maximum lengths;
2. drops bot submissions using a visually hidden `website` honeypot;
3. rate-limits each client IP to five attempts per ten minutes;
4. sends a normalized event to `LEAD_WEBHOOK_URL` with no secret in client code;
5. returns `202` only after the webhook accepts the request;
6. returns generic errors so provider details are not exposed.

The webhook payload event is `signal.lead.created` and contains `receivedAt`, `source`, `page`, `referrer`, and the consented lead fields. Do not put webhook secrets in `src/main.js` or any client-delivered file. If this is embedded into Tilda, point the form at the same serverless endpoint or use a Tilda integration.

## Design system

The design tokens live at the top of `src/style.css`:

- `--dark` / `--panel` — near-black surfaces.
- `--ink` / `--muted` — primary and secondary text.
- `--lime` — system/action accent.
- `--orange` — editorial accent and attention state.
- `--serif`, `--sans`, `--mono` — Space Grotesk, DM Sans, and DM Mono.

The layout uses a 1160px content rail, 64px desktop gutters, and a 40px mobile gutter. At 760px the two-column sections collapse, the nav becomes a menu, pricing stacks, and comparison rows retain their three semantic columns at a smaller type size.

The page currently loads fonts from Google Fonts. For a fully self-contained or consent-sensitive deployment, download and self-host the selected font files, then remove the `@import` line.

## Deployment checklist

- Replace the placeholder `signal.systems` domain in `index.html`, `public/robots.txt`, and `public/sitemap.xml` if the final domain differs.
- Add the final social preview image and `og:image` metadata.
- Set `LEAD_WEBHOOK_URL` in the hosting provider's secret environment settings.
- Confirm privacy, cookie, and analytics copy with the data controller.
- Replace the placeholder legal contact wording in `privacy.html` with the responsible legal entity and address.
- Test the production bundle on current Chrome, Safari, Firefox, and a real narrow mobile viewport.
- Verify keyboard focus, visible error states, reduced-motion preference, and screen-reader labels.
- Capture a Lighthouse/Pagespeed result and store it with the portfolio evidence.
- If moving to Tilda, preserve the section order, use Zero Blocks for the hero/visual and cards, and inject the compiled interaction code only after confirming class names are stable.

## Acceptance checklist

- [x] Responsive desktop and mobile layout.
- [x] Four offer cards with tools and human-review positioning.
- [x] One-time vs recurring cost language.
- [x] Workflow method and comparison table.
- [x] FAQ and accessible native disclosure controls.
- [x] Form fields, consent checkbox, browser validation, API submission, and success state.
- [x] Server-side validation, honeypot, rate limit, and webhook delivery boundary.
- [x] Privacy page, favicon, robots file, and sitemap.
- [x] No autonomous-publishing claim.
- [x] Production build succeeds with Vite and the local server serves the bundle.
- [ ] Live webhook delivery test with the chosen CRM/webhook.
- [ ] Final SEO/social assets and performance evidence.

## Change history

The git history is intentionally granular: each commit represents a small product or handoff decision so the implementation can be reviewed as a sequence rather than a single generated drop.
