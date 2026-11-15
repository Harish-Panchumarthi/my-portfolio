# my-portfolio

Personal portfolio site for Harish Panchumarthi, built with Angular 21 (standalone components, signals, zoneless).

## Run

```bash
npm install
npm start          # http://localhost:4200
npm run build      # production build -> dist/my-portfolio/browser
```

## Editing content

All text, stats, skills, experience and contact details live in
[`src/app/data/portfolio.data.ts`](src/app/data/portfolio.data.ts).
Set `email`, `linkedin`, `github` or `resumeUrl` in `PROFILE` and they appear in the Contact section automatically
(put a resume PDF in `public/` and set `resumeUrl` to its filename to enable the download button).

## Structure

- `src/app/sections/` — page sections (nav, hero, about, impact, skills, experience, recognition, contact)
- `src/app/shared/` — icon set, scroll-reveal & tilt directives, animated counter, theme service
- `src/styles.scss` — design tokens (dark/light), shared surfaces, buttons, animations
