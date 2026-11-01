import { Metadata } from 'next';
import Link from 'next/link';

// English moved from /en/ to the root. Old links land here and get sent on.
export const metadata: Metadata = {
  alternates: { canonical: '/' },
  robots: { index: false, follow: true },
};

export default function Page() {
  return (
    <>
      <meta httpEquiv="refresh" content="0; url=/" />
      <p>
        This page moved to <Link href="/">cv.tonytang.dev</Link>.
      </p>
    </>
  );
}
