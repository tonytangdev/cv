import { LocaleId } from '@/app.config';
import { getData } from '@/data';
import { Metadata } from 'next';

export const ogImageMetadata: Metadata = { robots: { index: false } };

/**
 * 1200×630 canvas in the style of tonytang.dev's OG image. Screenshotted by
 * scripts/build-assets.mjs at build time, then removed from the export.
 */
export default function OgImagePage({ locale }: { locale: LocaleId }) {
  const data = getData(locale);

  return (
    <div
      id="canvas"
      className="relative flex h-[630px] w-[1200px] flex-col justify-center bg-linear-155 from-teal to-teal-2 px-[86px] text-cream"
    >
      <span className="absolute right-[86px] top-[86px] grid h-[62px] w-[76px] place-items-center rounded-[14px] border-[3px] border-cream font-display text-[30px] font-extrabold">
        CV
      </span>
      <p className="font-mono text-[24px] uppercase tracking-[0.12em] text-cream/75">
        {data.name} · {data.headline}
      </p>
      <p
        className="mt-8 max-w-[21ch] font-display font-extrabold leading-[1.02] tracking-[-0.03em]"
        style={{ fontSize: data.tagline.length > 90 ? 64 : 78 }}
      >
        {data.tagline.split(/(AI-first|l'IA)/).map((part, i) =>
          i % 2 ? (
            <em key={i} className="text-pop">
              {part}
            </em>
          ) : (
            part
          )
        )}
      </p>
    </div>
  );
}
