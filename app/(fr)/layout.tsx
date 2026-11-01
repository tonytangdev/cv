import LocaleRootLayout, {
  buildMetadata,
} from '@/app/components/locale-root-layout';

export const metadata = buildMetadata('fr');

export default function Layout({ children }: { children: React.ReactNode }) {
  return <LocaleRootLayout locale="fr">{children}</LocaleRootLayout>;
}
