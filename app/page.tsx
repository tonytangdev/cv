import { AppConfig } from '@/app.config';
import { getData } from '@/data';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

const data = getData();

export const metadata: Metadata = {
  title: `${data.name} – ${data.bio}`,
  description: data.description,
  metadataBase: AppConfig.host ? new URL(AppConfig.host) : undefined,
  openGraph: {
    title: data.name,
    description: data.description,
    images: [`/locale/${AppConfig.defaultLocale}/og-image.png`],
  },
  twitter: {
    card: 'summary_large_image',
    images: [`/locale/${AppConfig.defaultLocale}/og-image.png`],
  },
};

export default function RootPage() {
  redirect(AppConfig.defaultLocale);
}
