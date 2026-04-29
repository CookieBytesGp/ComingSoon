# Coming Soon — Deploy

Upload the **entire contents** of this `src` folder to your host. No CDN or external requests are used.

## Contents

- **index.html** — Main page. Set as your site index/default document.
- **css/fonts.css** — Self-hosted fonts (Space Grotesk, Space Mono).
- **css/styles.css** — All layout and design styles (built from Tailwind + custom CSS).
- **fonts/** — WOFF2 font files (space-grotesk, space-mono).
- **js/main.js** — Optional script (e.g. live clock).

## Regenerating CSS (optional)

If you change `index.html` or Tailwind config and need to rebuild `styles.css`:

From the project root (parent of `src`):

```bash
npm install
npm run build:css
```

Then copy the updated `src` folder to your host again.
