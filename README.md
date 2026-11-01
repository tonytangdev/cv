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

## Generate OG Image

Please execute the following while the development server is running.

```bash
pnpm ogimage
# or
PORT=3001 pnpm ogimage
```

The OG Image template can be edited in [og-image-page.tsx](app/components/og-image-page.tsx).

## Deploy

GitHub Actions publishes the main branch to GitHub Pages, served at the custom domain set in [public/CNAME](public/CNAME) and `host` in [app.config.ts](app.config.ts) (currently https://cv.tonytang.dev).

## URLs

English lives at the root (`/`), other locales under `/<id>/` (e.g. `/fr/`). `/en/` redirects to `/` for old links.
