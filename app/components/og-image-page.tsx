import { getData } from '@/data';
import { LocaleId, localePath } from '@/app.config';
import { redirect } from 'next/navigation';

// Dev-only canvas that the og-image Playwright script screenshots.
export default function OgImagePage({ locale }: { locale: LocaleId }) {
  const data = getData(locale);

  if (process.env.NODE_ENV !== 'development') {
    redirect(localePath(locale));
  }

  return (
    <div className="flex items-center justify-center h-dvh">
      <div
        id="canvas"
        className="flex items-center aspect-video h-[640px] px-32 gap-12"
      >
        <div className="*:leading-none">
          {data.globalName && (
            <p className="text-2xl mb-4 text-muted-foreground">
              {data.globalName}
            </p>
          )}
          <h1 className="text-5xl mb-4 font-bold">{data.name}</h1>
          <p className="text-3xl text-muted-foreground">{data.bio}</p>
        </div>
      </div>
    </div>
  );
}
