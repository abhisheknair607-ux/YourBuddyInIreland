# SKILL.md — Guidon Design System

Use this skill when designing or building anything for **Guidon** ("Mentorship Without Borders") — the AI mentor for Indian students moving to Ireland.

## What's in this folder

- `README.md` — full brand context, content fundamentals, visual foundations, iconography. **Read first.**
- `colors_and_type.css` — single source of truth for color tokens, type styles, surface utilities. Drop next to any HTML and reference via CSS vars.
- `assets/` — logo lockups (full / transparent / mark / avatar).
- `preview/` — small reference cards for individual tokens (colors, type, radii, shadows, components).
- `ui-kit-mobile.html` — canonical mobile chat surfaces (welcome, conversation, sidebar, links, voice, login).
- `ui-kit-web.html` — canonical web surfaces (marketing landing, dashboard, resource article).
- `ios-frame.jsx`, `browser-window.jsx` — device/window chrome the kits use.

## How to use

1. **Read `README.md` end to end** before producing anything new. The Content Fundamentals section is non-negotiable — voice, casing, no-emoji rule, eyebrow pattern.
2. **Always link `colors_and_type.css`.** Don't redefine colors, fonts, or radii inline; pull from the CSS vars.
3. **Match the canvas.** New surfaces should reuse the gradient + 3-blob + grid-overlay background recipe. See the `.web-bg` / `.app-bg` blocks in the kits for a copy-pasteable implementation.
4. **Reuse components verbatim from the kits** when possible. Chat bubbles, glass cards, prompt cards, composer, category chips, document rows, journey stages, top bar, side rail — they're all in the kit files. Cherry-pick by copying the JSX block + its scoped CSS.
5. **Honor the 44 px hit-target floor.** Mobile-first, even on desktop.
6. **No emoji, ever.** Use Lucide icons at 16–20 px, inheriting `currentColor`.
7. **Eyebrow → headline → body → CTA** is the canonical content stack inside cards. Eyebrow is always 11px / 600 / 0.24em / uppercase / `--fg-accent` (sky-700).

## What this skill does NOT cover

- Production fonts (`.woff2` files) are not bundled — Inter and Poppins load via Google Fonts CDN. Confirm with the brand owner before swapping.
- The illustration/photography style is undefined — the brand uses none. If you need imagery, ask before inventing.
- Animation specifics live in `README.md` under Visual Foundations → Animation. Reach for the `[0.16, 1, 0.3, 1]` ease-out-expo curve as a default.

## Quick reference

| Need | Go to |
|---|---|
| A color | `colors_and_type.css` → `:root` vars |
| Hero gradient | `var(--gradient-brand)` |
| User chat bubble gradient | `var(--gradient-bubble-user)` |
| Glass card surface | class `.glass-card` (in `colors_and_type.css`) |
| Eyebrow style | class `.eyebrow` |
| A canonical mobile screen | `ui-kit-mobile.html` |
| A canonical web screen | `ui-kit-web.html` |
| Iconography rules | `README.md` → ICONOGRAPHY |

When in doubt, the kits are the answer.
