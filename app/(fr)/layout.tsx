import LocaleRootLayout, {
  buildMetadata,
  viewport,
} from '@/app/components/locale-root-layout';

export { viewport };

export const metadata = buildMetadata('fr');

export default function Layout({ children }: { children: React.ReactNode }) {
  return <LocaleRootLayout locale="fr">{children}</LocaleRootLayout>;
}
