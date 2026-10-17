# sahanianjali.github.io

Live at https://sahanianjali.github.io/

Work-profile site for Anjali Sahani, built from her CV.
Vite + React 19 + Tailwind v4 + motion. "Midnight editorial" design: plum night background with drifting colour fields, Instrument Serif headlines, glass cards with a pointer-following glow, sticky stacking career chapters and an animated medal ring.

```bash
npm install
npm run dev     # http://localhost:5191
npm run build   # typecheck + static site in dist/ (relative paths, works from any folder)
```

- **Facts live in `src/profile.ts`** (roles, dates, results, skills, awards, education, contact). Durations are worked out from the dates, so they stay current.
- `openToWork` in `src/profile.ts` shows or hides the "Open to new roles" badges.
- Sections are in `src/sections/` (shared pieces in `ui.tsx`); Magic UI's marquee and number ticker are in `src/components/magicui/`.

## Deploy

Every push to `main` builds the site and publishes it with GitHub Pages (`.github/workflows/deploy.yml`).
One-time setup: repo **Settings → Pages → Source: GitHub Actions**.
