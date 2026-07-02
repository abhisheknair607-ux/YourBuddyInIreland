# Guid-On Design System

> Design system for **Guidon — Mentorship Without Borders**, an AI chat companion that guides young Indians planning higher education and a new life in Ireland. Mobile-first but equally at home on desktop.

---

## Sources

This design system was reverse-engineered from a single source codebase. None of the original assets or design files are bundled with this README — open the source repo for the full picture.

| Source | What it gave us |
|---|---|
| **Codebase:** [`abhisheknair607-ux/YourBuddyInIreland`](https://github.com/abhisheknair607-ux/YourBuddyInIreland) (`main`) | Next.js 14 + Tailwind + framer-motion. The product itself: marketing landing, login, chat dashboard, resources hub. |
| `Logo.png`, `Logo_2.png`, `public/logo*.png` | Brand marks (full + glyph + avatar). Now in `assets/`. |
| `styles/globals.css` | Source of truth for the color tokens, glass-card surface, gradient blobs background, shadow system. |
| `lib/branding.ts`, `lib/starterPrompts.ts`, `lib/replyLanguage.ts`, `lib/studentProfile.ts` | Voice + tone + product copy + multilingual list. |
| `app/page.tsx`, `app/login/page.tsx`, `app/dashboard/page.tsx`, `app/important-links/page.tsx` | Layout patterns, hit targets, animation timings, component composition. |
| `components/*` | Atom-level components: `BrandLogo`, `ChatMessage`, `IntroScreen`, `AnimatedGradientBackground`, `TypewriterText`, `TypingIndicator`, `FloatingStudyIcons`, `PrivacyNotice`, `OtpInput`. |

> **Reader's note:** assume you do **not** have access to the source repo. Everything you need to design new Guidon surfaces is in this folder.

---

## Index

- `README.md` — this file (brand context, content + visual + iconography fundamentals).
- `colors_and_type.css` — design tokens (CSS vars), typography classes, surface utilities.
- `SKILL.md` — Agent SKill manifest so this folder can be used standalone in Claude Code.
- `assets/` — logos and brand glyphs (PNG).
- `preview/` — small HTML cards rendered in the Design System tab. One concept per card.
- `ui-kit-mobile.html` — phone-frame UI kit: welcome, conversation, history sidebar, important links, voice input, login.
- `ui-kit-web.html` — desktop UI kit: marketing landing, in-product dashboard, resource-hub article.
- `ios-frame.jsx`, `browser-window.jsx` — device/window chrome used by the kits.

---

## Brand context

**Guidon** ("Mentorship Without Borders") is built for the next generation of Indian students who are planning to study in Ireland. The core experience is a **chat-based AI assistant** that holds the user's hand through five tangled topics: visas, accommodation, education loans, university shortlisting, and course choice. It's calm, multilingual, and structured — the opposite of an overwhelming agent forum.

**Core surfaces**

1. **Marketing landing** — typewriter hero, glassy "live preview" card, six topic chips routing into the dashboard.
2. **Login / Sign-up** — single-screen Google sign-in + privacy gate, with two reassurance cards on the side.
3. **Chat dashboard** — the heart of the product. Sidebar with quick-actions (Visa / House / Uni / Loan), conversation history, language picker (9 languages incl. Hinglish), voice in/out, markdown-rich replies with source labels.
4. **Resources Hub** (`/important-links`) — a categorical directory of official Ireland student links.
5. **Guided walkthrough** — first-run coach-marks to teach new students the dashboard layout (designed in this system; not yet shipped in the codebase).

**Audience promise:** _"A calm planning space for Indian students preparing to study in Ireland."_ Tone is mentor-like — warm, structured, practical, never patronising.

---

## CONTENT FUNDAMENTALS

How copy is written across the product. Pulled from real strings in `app/`, `lib/branding.ts`, `lib/starterPrompts.ts`.

### Voice
Calm, mentor-like, encouraging. Never hypey. The product positions itself as a **planning companion**, not a hotline. Language is plain, structured, and India-aware.

- "A **calm planning space** for Indian students preparing to study in Ireland."
- "Welcome back, **Future Scholar**" (login).
- "**Namaste!** I can help you compare universities in Ireland…" (sample assistant turn).
- "Crafted for Indian students moving to Ireland" (eyebrow chip).
- "Sign in to **organise your Ireland student journey**."

### Person
**You / I**. Direct and human. The assistant uses "I" ("I can help you…", "I ran into a connection issue…"). UI copy speaks to the user as "you". No corporate "we" except in legal/privacy.

### Casing
- **Sentence case** for every UI label, button, and heading. Never Title Case.
  - ✅ "New chat", "Resources Hub", "Start Planning"
  - ❌ "New Chat", "Start planning"
- ALL-CAPS reserved for the **eyebrow** label only — uppercase + `letter-spacing: 0.24em`. e.g. `LIVE PREVIEW`, `WHAT STUDENTS CAN DO`, `START WITH A PLAN`. Always paired with `color: sky-700`.
- Proper nouns kept exactly: **Guidon**, **Ireland**, **Dublin**, **MSc Data Analytics**, **Hinglish**.

### Tone signals
- Action verbs are gentle: *understand, plan, compare, shortlist, organise* — not *hack, master, dominate*.
- Help text always names the next concrete step ("…tell me what I should check first").
- Errors are reassuring + give a recovery path: "I ran into a connection issue while trying to help. Please try again in a moment." + a "Try again" pill.
- "Coming soon" copy is honest: "Google sign-in coming soon" — never "Get notified" / waitlist baiting.
- South Asian context surfaces naturally: "Namaste", `en-IN` locale, INR/EUR currency framing, `Hinglish` as a first-class option (not buried under "more").

### Punctuation + formatting
- Em-dashes used freely for asides — like this. Spaced em-dashes (em-dash with surrounding spaces) appear in the brand name itself: "Guidon — Mentorship Without Borders".
- Commas, not bullets, for short lists in headlines: "visas, accommodation, loans, and universities".
- Markdown rendering in chat replies (h1/h2/h3, lists, tables, code blocks, sky-tinted blockquotes).

### Emoji
**No emoji.** Anywhere. The system uses **Lucide icons** for emotional/visual affordance instead. Emoji felt off-brand for a service the audience is taking seriously (visa, money, education).

### Examples to copy from
- Eyebrow + headline + one-line lede pattern (used 5+ times):
  ```
  Resources Hub
  Ireland student resources hub
  ```
- Topic chip set on landing: `Visa steps · Universities · Courses · Accommodation · Education loans · Multilingual`.
- Sidebar quick actions: `Visa / House / Uni / Loan` (4 chars, square tile, single icon).

---

## VISUAL FOUNDATIONS

The aesthetic is **soft, glassy, calm-tech** — light surfaces, blue gradients, very rounded corners, gentle motion. Think "wellness-app meets Notion sidebar".

### Color
- **Foundation:** off-white background painted with a **radial-gradient halo at the top** plus a vertical wash from `#fdfefe → #f5f9ff → #eef5ff`. Never pure white.
- **Accent:** the signature `sky-500 → blue-600 → indigo-600` 135° gradient. Used only for: primary CTAs, the user's chat bubble, the avatar dot, the intro screen progress bar, the "Skip intro" button. Treat it as a **scarce ingredient**.
- **Neutrals:** Tailwind's full Slate ramp. `slate-950` for headings, `slate-600` for body, `slate-500` for meta, `slate-400` for placeholders, `slate-200/70` for hairline borders.
- **Eyebrow color:** always `sky-700`. Never the gradient.
- **Status:** rose-200/50/600 (errors), amber-200/50/700 (warnings), emerald (success). Always as a soft background + colored border + readable text — never solid-fill alerts.
- **Resources Hub** uses 10 ambient pastel tones (sky/blue/violet/amber/emerald/rose/teal/indigo/orange/slate) as **category accents** — chip + icon-tile + ring border share the tone.
- See `colors_and_type.css` for every var.

### Type
- **Display:** Poppins (500/600/700). Used for h1–h4 and the brand wordmark on the logo.
- **Body:** Inter (400/500/600/700/800). Used for everything else.
- **Mono:** JetBrains Mono (substitute — see Iconography for substitution flag). For inline `code` and pre blocks in markdown chat replies.
- **Scale:** see `colors_and_type.css`. Display headlines are `clamp(36px, 5.4vw, 62px)` — fluid.
- **Tightening:** display headings get `letter-spacing: -0.02em`. Body never tracked.
- **Eyebrow:** 11px / 600 / `letter-spacing: 0.24em` / `text-transform: uppercase` / `color: sky-700`. Iconic.

### Spacing + grid
- 4-px grid. Most card padding lands on 16/20/24 px.
- Page shell: `max-width: 80rem` (1280 px), centered, with responsive padding (`px-4 tablet:px-6 wide:px-8`).
- **Tablet breakpoint = 600 px**, **laptop = 900 px**, **wide = 1200 px** (custom — see `tailwind.config.ts`). Mobile-first, always.
- **Hit-target floor: 44 px.** Every interactive element honors `min-h-[44px]`. Non-negotiable, even on desktop.
- Vertical rhythm: 24/32/48 between section, 12/16 between sub-block, 8 between intra-card lines.

### Backgrounds
A multi-layer recipe — never flat:

1. **Base wash:** `linear-gradient(180deg, #fdfefe 0%, #f5f9ff 45%, #eef5ff 100%)`.
2. **Top halo:** `radial-gradient(circle at top, rgba(255,255,255,0.85), transparent 35%)`.
3. **Animated blobs** (`AnimatedGradientBackground`): 3 large blurred circles (sky-300/35, cyan-200/35, indigo-200/25), `blur-3xl`, slow 24–30 s drift loops with `easeInOut`. Always behind content with `pointer-events-none absolute inset-0`.
4. **Mesh overlay** (`.mesh-overlay`): a 64×64 grid of `rgba(255,255,255,0.25)` lines, masked with a `linear-gradient(to bottom, white 0%, transparent 85%)` so the grid fades into the page.
5. **Floating study icons** (`FloatingStudyIcons`, hidden under 600 px): tinted Lucide outlines drifting at low opacity (15–35 %), stroke 1.6.

No photos, no illustrations, no patterns.

### Animation
- **framer-motion** is the only motion library.
- **Signature ease:** `[0.16, 1, 0.3, 1]` — a snappy ease-out-expo. Used for entrances and the intro overlay.
- Default transition for sequential fade-ins: `duration: 0.45–0.5, delay: 0.05–0.2`.
- Hover scale: `whileHover={{ scale: 1.02 }}`. Tap: `whileTap={{ scale: 0.98 }}`. Subtle.
- **Float** loops: `y: [0, -5, 0]` with 1.5–12 s `easeInOut`. Used on the intro card stack and floating icons.
- **Typewriter** (`TypewriterText`): 70 ms per character typing, 35 ms deleting, 1800 ms pause at end. Cursor is a 2 px sky-600 bar.
- **Typing indicator**: three sky-500 dots with staggered `y: [0, -4, 0]` over 0.9 s.
- **Page transitions** (`PageTransition`): light fade + 6 px y on route change.
- **No bounces** anywhere. No spring overshoots.

### Hover / press states
- **Default link/button hover:** lighter background (`bg-white/80 → bg-white`), border darken (`border-slate-200 → border-slate-300`). Never a color shift.
- **Icon-pill hover:** background goes from translucent to solid white.
- **Topic chip hover:** background goes `slate-50 → white` with the same border darken.
- **Press:** `whileTap={{ scale: 0.98 }}` only on framer-motion buttons. CSS buttons don't shrink — they just darken.
- **Focus:** `0 0 0 4px rgba(56, 189, 248, 0.12)` — a soft sky ring. Never the default browser outline.
- **Disabled:** `opacity: 0.6` + `cursor: not-allowed`.

### Borders
- Predominantly **hairline borders** of `1px solid rgba(226, 232, 240, 0.70)` (slate-200 at 70 %). Almost invisible — they read as edges, not lines.
- On glass cards: `border-white/70` over a `bg-white/70` fill — the border is just slightly more opaque than the fill.
- Tone-tinted borders for category cards in Resources Hub (e.g. `border-sky-100`).
- No double-borders, no decorative lines.

### Shadows
Every elevation has its own recipe — soft, blue-tinted, never grey:

| Token | Recipe | Use |
|---|---|---|
| `--shadow-card` | `0 24px 80px rgba(15,23,42,0.12)` | Glass cards, primary surface |
| `--shadow-card-sm` | `0 14px 35px rgba(15,23,42,0.10)` | Chat bubbles, secondary cards |
| `--shadow-glow-blue` | `0 16px 40px rgba(59,130,246,0.22)` | Primary CTA — gives it that "lift" |
| `--shadow-button-soft` | `0 12px 30px rgba(15,23,42,0.06)` | Secondary buttons |
| `--surface-ring` | inset 1 px highlight + 1 px outer ring + 18×60 shadow | Heavy glass surfaces (login card, dashboard chat panel) |
| `--shadow-input-focus` | sky ring + 16×34 blue glow | Focused chat composer |

### Transparency + blur
The product **breathes** through translucency. Cards are typically `bg-white/70..85` with `backdrop-blur-xl` (24 px blur). The animated blobs behind are visible through cards, which is the whole point.

- Use `glass-card` whenever the surface sits over the page's background gradient.
- Use solid `bg-white` for inputs, and chat bubbles where readability matters most.
- Modal overlays: `bg-slate-950/20 backdrop-blur-sm` — a barely-tinted scrim.

### Corner radii
**Very rounded** — this is a tell of the brand. Most cards land at `1.5–2 rem`, buttons are pills.

| Use | Token |
|---|---|
| Inline pill button | `rounded-full` (9999 px) |
| Capsule banner / chip | `rounded-full` |
| Small card / list row | `1.15 rem` (18 px) |
| Medium card | `1.5 rem` (24 px) |
| Hero card / login card | `1.75 rem` (28 px) |
| XL card / preview | `2 rem` (32 px) |
| Chat bubble | `20 px` overall + `6 px` on the "tail" corner (br-md for user, bl-md for assistant) |

### Cards — the anatomy
A canonical Guidon card:
1. `glass-card` (white/70 + blur-xl + border-white/70 + soft shadow)
2. `rounded-[1.75rem]` (or `2rem` for hero)
3. `p-5` mobile, `p-6` tablet, `p-8` laptop
4. Eyebrow → headline → body → optional CTA cluster, top-aligned, generous gap
5. Sometimes wrapped in `surface-ring` to add the inset highlight

### Layout rules (fixed elements)
- **Sticky search bar** on Resources Hub: `sticky top-0 z-20`, with a translucent blurred background. It's the only sticky on the page.
- **Sidebar** on dashboard: full-height glass card on laptop+; off-canvas drawer with backdrop on mobile. Collapsible to 80 px on desktop.
- **Composer** at bottom of chat: fixed within its scroll container, `pb-[calc(env(safe-area-inset-bottom)+8px)]` to respect iOS home indicator.
- Modals are centered; max-width caps at 32–40 rem.

### Micro-details
- `wrap-anywhere` utility for long URLs / unbroken strings in chat.
- Custom scrollbar: 8 px wide, `slate-400/45` thumb on transparent track, `999 px` rounded.
- Selection: `rgba(147, 197, 253, 0.55)` on `slate-900` text — a sky tint.
- `min-width: 0` on every flex/grid child to prevent overflow blow-out.
- `pt-safe` / `pb-safe` utilities everywhere to honor mobile safe areas.

---

## ICONOGRAPHY

### Primary system
**Lucide React** (`lucide-react@0.408.0`). 100% of in-app icons come from this set. They're imported individually (tree-shaken) and rendered at:

- **16–20 px** for inline / button icons.
- **20 px** for sidebar quick-actions.
- **40–48 px** for the floating background icons (with `strokeWidth={1.6}`, lower than default).

Icons inherit color from their parent — usually `text-sky-600` or `text-slate-500/600`. Stroke weight is the default Lucide 2 px, except for ambient floating icons which drop to 1.6.

The full vocabulary used in the app:
- **Onboarding / journey:** `Plane`, `MapPin`, `GraduationCap`, `Sparkles`, `BookOpen`
- **Sidebar quick-actions:** `FileCheck2` (Visa), `House` (Accommodation), `GraduationCap` (Uni), `Banknote` (Loan)
- **Chat composer:** `Send`, `Mic`, `MicOff`, `Volume2`, `VolumeX`, `Globe2`, `Plus`, `ChevronDown`, `RefreshCcw`
- **Sidebar nav:** `Menu`, `X`, `ChevronLeft`, `ChevronRight`, `LogOut`, `Trash2`, `MessageSquareText`, `ExternalLink`
- **Resources Hub categories:** `ShieldCheck`, `Building2`, `Bus`, `Car`, `HeartPulse`, `BriefcaseBusiness`, `Zap`, `UsersRound`, `Home`, `Banknote`, `BookOpen`, `Plane`
- **Form / status:** `Search`, `ArrowLeft`, `ArrowRight`, `ShieldCheck`

In this design system the kit is loaded from CDN — see the UI kit `index.html` files for the exact `<script>` tag — so no font/sprite import is needed.

### Logo
The G mark is a hand-drawn 4-color glyph (orange/orange-deep/green/green-deep) wrapped around a white "G" with an arrow tail. The wordmark is **blue Poppins** with the dot on the "i" in **brand red** (`#e11d48`). Tagline ("Mentorship Without Borders") is set in slate-600 below.

`assets/`:
- `logo-full.png` — wordmark + tagline (use on light surfaces ≥150 px wide).
- `logo-mark.png` — glyph only (use as favicon / avatar replacement when ≥40 px).
- `logo-avatar.png` — small circular crop used in the chat as the assistant's avatar.
- `logo-transparent.png` — wordmark only, no tagline (used in headers).
- `logo.png` — duplicate of full.

Treat the logo as **photographic** — never recolor, never set on a busy background. The "padded glassy frame" used on the intro screen and dashboard empty-state (`rounded-[1.5rem] bg-white/70 px-4 py-3 shadow-...`) is the canonical wrapper.

### Emoji
**Not used.** Don't introduce them. If you need a small contextual cue, reach for a Lucide icon at 14–16 px.

### Unicode characters
The brand uses an **em dash ( — )** in `Guidon — Mentorship Without Borders`. Beyond that, no decorative glyphs.

### Substitutions in this design system
- The codebase uses `Inter` and `Poppins` via CSS variable, but doesn't ship `.woff2` files — production loads them via `next/font` at build time. **This design system pulls Inter + Poppins from Google Fonts CDN** so previews render identically. If you want to bundle the system without a network dep, copy the Google `.woff2` files into `fonts/` and update `colors_and_type.css`. Flagged so the brand owner can confirm the same families are used in production.
- **Mono:** the codebase uses the system mono stack only. We render code samples in **JetBrains Mono** (CDN) for visual polish in the design system; production should keep its system stack unless the brand owner says otherwise.

---

## Quick start

1. Drop `colors_and_type.css` next to your HTML. Reference tokens via CSS vars (`var(--sky-600)`, etc.).
2. Use Lucide via CDN for icons — see `ui-kit-web.html` for the script tag.
3. Pull layout rules from the visual foundations above, not from training-data instinct.
4. When stuck, copy a screen verbatim from `ui-kit-mobile.html` or `ui-kit-web.html`.

---

_Last reviewed against `abhisheknair607-ux/YourBuddyInIreland@main` commit `b2cfe96`._
