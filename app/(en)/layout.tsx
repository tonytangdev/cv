import LocaleRootLayout, {
  buildMetadata,
  viewport,
} from '@/app/components/locale-root-layout';

export { viewport };

export const metadata = buildMetadata('en');

export default function Layout({ children }: { children: React.ReactNode }) {
  return <LocaleRootLayout locale="en">{children}</LocaleRootLayout>;
}
