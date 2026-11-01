import { ThemeProvider } from '@/app/components/theme-provider';
import { getData } from '@/data';
import { Inter } from 'next/font/google';
import '../globals.css';
import { AppConfig, LocaleId, localePath } from '@/app.config';
import { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export function buildMetadata(locale: LocaleId): Metadata {
  const data = getData(locale);

  return {
    title: `${data.name} – ${data.bio}`,
    description: data.description,
    metadataBase: new URL(AppConfig.host),
    alternates: {
      canonical: localePath(locale),
      languages: {
        ...Object.fromEntries(
          AppConfig.locales.map(({ id }) => [id, localePath(id)])
        ),
        'x-default': localePath(AppConfig.defaultLocale),
      },
      types: { 'text/markdown': '/llms.txt' },
    },
    openGraph: {
      title: data.name,
      description: data.description,
      url: localePath(locale),
      images: [`/locale/${locale}/og-image.png`],
    },
    twitter: {
      card: 'summary_large_image',
      images: [`/locale/${locale}/og-image.png`],
    },
  };
}

export default function LocaleRootLayout({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: LocaleId;
}) {
  return (
    <html lang={locale} className="print:text-[15px]" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
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
