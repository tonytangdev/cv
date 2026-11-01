import { ThemeProvider } from '@/app/components/theme-provider';
import { markdownPath } from '@/app/lib/cv';
import { getData } from '@/data';
import { Bricolage_Grotesque, JetBrains_Mono, Public_Sans } from 'next/font/google';
import '../globals.css';
import { AppConfig, LocaleId, localePath } from '@/app.config';
import { Metadata, Viewport } from 'next';

// Same type families as tonytang.dev, self-hosted by next/font.
const display = Bricolage_Grotesque({ subsets: ['latin'], variable: '--font-bricolage' });
const body = Public_Sans({ subsets: ['latin'], variable: '--font-public-sans' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains-mono' });

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f7fbfb' },
    { media: '(prefers-color-scheme: dark)', color: '#0b1617' },
  ],
};

export function buildMetadata(locale: LocaleId): Metadata {
  const data = getData(locale);
  const title = `${data.name} – ${data.headline} · CV`;

  return {
    title,
    description: data.description,
    metadataBase: new URL(AppConfig.host),
    authors: [{ name: data.name, url: 'https://tonytang.dev/' }],
    alternates: {
      canonical: localePath(locale),
      languages: {
        ...Object.fromEntries(
          AppConfig.locales.map(({ id }) => [id, localePath(id)])
        ),
        'x-default': localePath(AppConfig.defaultLocale),
      },
      types: { 'text/markdown': markdownPath(locale) },
    },
    openGraph: {
      type: 'profile',
      firstName: 'Tony',
      lastName: 'Tang',
      title,
      description: data.description,
      url: localePath(locale),
      locale: locale === 'fr' ? 'fr_FR' : 'en_US',
      alternateLocale: locale === 'fr' ? 'en_US' : 'fr_FR',
      images: [{ url: `/locale/${locale}/og-image.png`, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: data.description,
      images: [`/locale/${locale}/og-image.png`],
    },
  };
}

// Play the glasses intro once per session, like tonytang.dev.
const introScript = `try{if(sessionStorage.getItem('tt-intro'))document.documentElement.dataset.introSeen='';else sessionStorage.setItem('tt-intro','1')}catch(e){}`;

export default function LocaleRootLayout({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: LocaleId;
}) {
  return (
    <html
      lang={locale}
      className={`${display.variable} ${body.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
        <ThemeProvider
          attribute="data-theme"
          storageKey="theme"
          defaultTheme={AppConfig.defaultTheme}
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
