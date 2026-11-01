import { AppConfig, LocaleId, localePath } from '@/app.config';

/** The PDF generated in CI by scripts/build-assets.mjs. */
export const pdfPath = (locale: LocaleId) => `/tony-tang-cv-${locale}.pdf`;

/** Markdown version of the CV, for AI agents. */
export const markdownPath = (locale: LocaleId) => `/${locale}.md`;

export const pageUrl = (locale: LocaleId) => `${AppConfig.host}${localePath(locale)}`;

/** tonytang.dev in the same language. */
export const siteHome = (locale: LocaleId) =>
  locale === AppConfig.defaultLocale ? 'https://tonytang.dev/' : `https://tonytang.dev/${locale}/`;

/** "https://www.linkedin.com/in/x/" -> "linkedin.com/in/x" */
export const shortUrl = (href: string) =>
  href.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');

export const isoDate = (d: Date) => d.toISOString().slice(0, 10);
