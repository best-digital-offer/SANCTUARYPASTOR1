# Sanctuary Pastor — MVP

Your AI Christian Prayer Companion. Next.js 14 (App Router) + TypeScript + Tailwind + Supabase + Puter.js (free AI, no API keys).

## What's actually working in this build

- Text & voice prayer request input
- Puter.js LLM (`puter.ai.chat`) analyzes the situation and writes a **non-generic, personalized** prayer
- Puter.js TTS (`puter.ai.txt2speech`) speaks the prayer aloud — free, no key required
- A static/CSS-animated "Sanctuary Pastor" portrait (breathing + blinking + a speaking-state glow) instead of a
  paid photorealistic avatar-video API — see note below
- Supabase Auth (email/password) + Postgres for users, prayer history, journal, "one free prayer" enforcement
- Prayer journal (save / mark answered / delete)
- Prayer topics grid, daily prayer shortcut
- Clean, warm, premium UI — not a generic SaaS dashboard

## What's stubbed / documented but not wired to a paid vendor

Per your instruction to avoid paid AI APIs, these are built as **replaceable provider abstractions**
(`lib/providers/*`) with a clearly-marked stub implementation. Swap in a real key later without touching UI code:

- Photorealistic avatar video (D-ID / HeyGen / Synthesia-class) — `lib/providers/avatar.ts`
- Stripe subscription billing — `lib/providers/billing.ts` + `supabase/schema.sql` (tables exist, checkout route is a stub)
- Transactional/marketing email (Resend/Postmark/SendGrid) — `lib/providers/email.ts`

## Why Puter.js and not a "real" LLM API key

[Puter.js](https://github.com/heyputer/puter) lets the browser call GPT-4o/Claude-class models and TTS directly,
free, with **no backend key and no signup** — Puter's own infra fronts the cost under fair-use limits. That's why
the AI calls in `components/PrayerExperience.tsx` happen client-side via `<script src="https://js.puter.com/v2/">`
rather than through your own `LLM_API_KEY`. This is genuinely free but: (a) it's Puter's fair-use policy, not a
contract, so treat it as a "good enough to launch on $0" choice, not a permanent SLA; (b) it's client-side, so a
user could inspect network calls — fine for prayer text, don't route anything sensitive through it.

## Setup

```bash
npm install
cp .env.example .env.local   # fill in Supabase values (already have yours below)
# in Supabase SQL editor, run supabase/schema.sql
npm run dev
```

Your Supabase project (from you): `https://kbvftcalklxnrwmnsxar.supabase.co`, with the publishable (anon) key
already in `.env.example`. You still need to grab the **service role key** yourself from
Supabase → Project Settings → API (never put that one in `NEXT_PUBLIC_*`, and never share it with me or paste
it in chat — treat it like a password).

## Structure

```
app/
  page.tsx              Homepage
  pray/page.tsx          Core prayer experience
  dashboard/page.tsx     User dashboard (history, journal, subscription status)
  login/, signup/        Auth
  api/prayer/route.ts    Server-side: enforce "1 free prayer", log usage
components/
  PastorPortrait.tsx     Animated static portrait (breathing/blink/speaking glow)
  PrayerExperience.tsx   Input -> Puter LLM -> prayer text -> Puter TTS -> playback
lib/
  supabase-browser.ts     Supabase client for Client Components
  supabase-server.ts      Supabase client for Server Components / Route Handlers
  puter.ts               Thin wrapper around window.puter.ai
  providers/              avatar.ts, billing.ts, email.ts — swappable stubs
supabase/schema.sql       Full DB schema (users profile, prayers, journal, subscriptions, etc.)
```

## Next build phases (not in this pass)

1. Stripe checkout + webhooks (weekly $9.99 / monthly $25 / yearly $100) — schema is ready, route is a stub
2. Real avatar-video provider once you pick and fund one
3. Multilingual UI strings (English done; es/hi/te scaffolded in `lib/i18n.ts`)
4. Admin panel, blog CMS, SEO landing pages, email drip sequence
