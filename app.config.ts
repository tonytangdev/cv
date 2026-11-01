export const AppConfig = {
  host: 'https://cv.tonytang.dev',
  defaultLocale: 'en',
  locales: [
    {
      id: 'en',
      label: 'English',
    },
    {
      id: 'fr',
      label: 'French',
    },
  ],
  defaultTheme: 'system', // 'light' | 'dark' | 'system'

  /** The chat assistant, served by the tonytangdev/ask Cloudflare Worker. */
  ask: {
    site: 'cv',
    url: process.env.NEXT_PUBLIC_ASK_URL ?? 'https://ask.tonytang.dev',
    // Public key. Without it (e.g. a build missing the env var) the chat is
    // hidden; in development, Cloudflare's always-passing test key is used.
    turnstileSiteKey:
      process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ??
      (process.env.NODE_ENV === 'development' ? '1x00000000000000000000AA' : ''),
  },

  // Please set the features you want to hide to false.
  toolbar: {
    print: true,
    theme: true,
    locale: true,
  },
} as const;

export type LocaleId = (typeof AppConfig)['locales'][number]['id'];

/** The default locale lives at the root, the others under /<id>/. */
export function localePath(locale: LocaleId, path = '') {
  const prefix = locale === AppConfig.defaultLocale ? '' : `/${locale}`;
  return `${prefix}/${path}`;
}
