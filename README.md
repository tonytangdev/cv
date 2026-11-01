![](https://repository-images.githubusercontent.com/740605856/9c96da34-519c-4d70-9e8a-812c17269c78)

# Minimalist CV

_This was created inspired by [BartoszJarocki/cv](https://github.com/BartoszJarocki/cv)._

This is a feature-rich CV template repository, optimized for GitHub Pages, allowing anyone to easily publish their own CV.

## Featrues

- Print-friendly
- Mobile-friendly
- Dark mode
- Internationalization
- Accessibility support OG
- Automatic OG image generation
- Responsive
- Static Export
- Standard Support for GitHub Pages

---

## Getting Started

First, run the development server:

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Edit Data

Please edit the following file. Feel free to customize the UI and functionality as needed.

- [app.config.ts](/app.config.ts)
- [UI Locales](/locales)
- [Redume Data](/data)

## PDFs and OG images

Generated from the static export, never committed:

```bash
pnpm build
pnpm exec playwright install chromium   # once
pnpm assets   # out/tony-tang-cv-{en,fr}.pdf and out/locale/{en,fr}/og-image.png
```

The OG image template is [og-image-page.tsx](app/components/og-image-page.tsx); its pages are removed from `out/` after capture.

## For AI

- `/llms.txt` (llmstxt.org index), `/llms-full.txt`, `/en.md`, `/fr.md`: Markdown versions of the CV, generated from the same data as the page.
- JSON-LD `ProfilePage` whose `mainEntity` is the Person `https://tonytang.dev/#person` from tonytang.dev.
- `/robots.txt` allows all crawlers, including AI search and training, with the same Content Signals as tonytang.dev.

## Deploy

GitHub Actions publishes the main branch to GitHub Pages, served at the custom domain set in [public/CNAME](public/CNAME) and `host` in [app.config.ts](app.config.ts) (currently https://cv.tonytang.dev).

## URLs

English lives at the root (`/`), other locales under `/<id>/` (e.g. `/fr/`). `/en/` redirects to `/` for old links.
