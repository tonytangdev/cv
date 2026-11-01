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
