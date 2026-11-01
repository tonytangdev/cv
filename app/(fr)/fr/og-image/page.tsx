import OgImagePage, { ogImageMetadata } from '@/app/components/og-image-page';

export const metadata = ogImageMetadata;

export default function Page() {
  return <OgImagePage locale="fr" />;
}
