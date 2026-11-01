import { AppConfig, LocaleId, localePath } from '@/app.config';
import { CopyButton } from '@/app/components/copy-button';
import { Glasses } from '@/app/components/glasses';
import { LinkIcon } from '@/app/components/link-icon';
import { ThemeToggle } from '@/app/components/theme-toggle';
import { toProfilePageJsonLd } from '@/app/lib/structured-data';
import { pdfPath, siteHome, shortUrl, isoDate } from '@/app/lib/cv';
import { cn } from '@/app/lib/utils';
import { getData } from '@/data';
import { getDictionary } from '@/locales';
import { ArrowUpRight, Check, Download, Mail, MapPin } from 'lucide-react';
import Script from 'next/script';

const container = 'mx-auto w-full max-w-3xl px-5 sm:px-8';

export default function CvPage({ locale }: { locale: LocaleId }) {
  const t = getDictionary(locale);
  const data = getData(locale);
  const updated = isoDate(data.lastUpdatedAt);
  const jsonLd = toProfilePageJsonLd(data, locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <a
        href="#main"
        className="absolute -left-[999px] z-50 rounded-lg bg-pop px-4 py-2 text-pop-ink focus:left-3 focus:top-3"
      >
        {t.skipToContent}
      </a>

      <header className="sticky top-0 z-30 border-b border-line bg-bg/85 backdrop-blur-md print:hidden">
        <div className={cn(container, 'flex items-center justify-between py-3')}>
          <a
            href={siteHome(locale)}
            aria-label={t.backToSite}
            className="inline-flex text-ink transition-colors hover:text-accent"
          >
            <Glasses />
          </a>
          <div className="flex items-center gap-4 font-mono text-[0.82rem] text-muted sm:gap-6">
            <a
              href={pdfPath(locale)}
              download
              aria-label={t.downloadPdfLabel}
              title={t.downloadPdfLabel}
              className="inline-flex items-center gap-1.5 no-underline transition-colors hover:text-accent"
            >
              <Download size={15} aria-hidden="true" />
              {t.downloadPdf}
            </a>
            <span aria-label={t.language} className="inline-flex items-center gap-1.5 tracking-wide">
              {AppConfig.locales.map(({ id }, i) => (
                <span key={id} className="inline-flex items-center gap-1.5">
                  {i > 0 && <span aria-hidden="true">·</span>}
                  {id === locale ? (
                    <span aria-current="true" className="font-bold text-ink">
                      {id.toUpperCase()}
                    </span>
                  ) : (
                    <a
                      href={localePath(id)}
                      hrefLang={id}
                      lang={id}
                      className="no-underline transition-colors hover:text-accent"
                    >
                      {id.toUpperCase()}
                    </a>
                  )}
                </span>
              ))}
            </span>
            <ThemeToggle label={t.toggleTheme} />
          </div>
        </div>
      </header>

      <main id="main" className={cn(container, 'pb-16 print:px-0 print:pb-0')}>
        {/* ——— Plain-language half: who, what, results ——— */}
        <section className="pt-12 sm:pt-16 print:pt-0">
          <p className="font-mono text-[0.8rem] font-medium uppercase tracking-[0.08em] text-accent">
            {data.headline}
          </p>
          <h1 className="mt-2 text-[clamp(2.6rem,8vw,4rem)] font-extrabold leading-[0.95] print:text-[26pt]">
            {data.name}
          </h1>
          <p className="mt-5 max-w-[38ch] font-display text-[clamp(1.2rem,2.6vw,1.45rem)] leading-snug text-ink print:mt-3 print:max-w-none print:text-[13pt]">
            {data.tagline}
          </p>

          <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[0.95rem] text-muted print:mt-3">
            <li className="inline-flex items-center gap-1.5">
              <MapPin size={15} aria-hidden="true" />
              {data.location}
            </li>
            {data.status && (
              <li className="inline-flex items-center gap-2">
                <span className="size-2 rounded-full bg-pop ring-4 ring-pop/25" aria-hidden="true" />
                {data.status.label}
              </li>
            )}
          </ul>

          {/* Screen: buttons. Print/PDF: the same links as plain text. */}
          <div className="mt-6 flex flex-wrap gap-2 print:hidden">
            <span className="inline-flex rounded-lg bg-teal text-cream transition hover:-translate-y-px">
              <a
                href={`mailto:${data.email}`}
                className="inline-flex items-center gap-2 rounded-l-lg py-2 pl-4 pr-3 font-medium text-cream no-underline transition hover:bg-teal-2"
              >
                <Mail size={16} aria-hidden="true" />
                {data.email}
              </a>
              <CopyButton
                value={data.email}
                label={t.copyEmail}
                copiedLabel={t.copied}
                className="rounded-r-lg border-l border-cream/25 px-3 hover:bg-teal-2"
              />
            </span>
            {data.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="inline-flex items-center gap-2 rounded-lg border border-line px-3 py-2 text-[0.92rem] text-ink no-underline transition hover:-translate-y-px hover:border-accent hover:text-accent"
              >
                <LinkIcon kind={link.kind} />
                {link.label}
              </a>
            ))}
          </div>
          <p className="mt-4 hidden text-[9.5pt] text-muted print:block">
            {[data.email, shortUrl(AppConfig.host + localePath(locale)), ...data.links.slice(0, 3).map((l) => shortUrl(l.href))].join(' · ')}
            <br />
            {t.updated} {updated}
          </p>
        </section>

        <Section id="highlights" title={t.highlights}>
          <ul className="grid gap-3 print:gap-1">
            {data.highlights.map((h) => (
              <li key={h} className="flex gap-3">
                <span className="mt-1 grid size-5 shrink-0 place-items-center rounded-full bg-accent/12 text-accent" aria-hidden="true">
                  <Check size={13} strokeWidth={3} />
                </span>
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="about" title={t.about}>
          <p className="max-w-[65ch] text-pretty print:max-w-none">{data.summary}</p>
        </Section>

        <Section id="services" title={t.services}>
          {data.status && (
            <p className="-mt-2 mb-4 text-[0.95rem] text-muted print:hidden">{data.status.label}</p>
          )}
          <ul className="grid gap-3 sm:grid-cols-2 print:grid-cols-2">
            {data.services.map((s) => (
              <li key={s.title} className="rounded-xl border border-line bg-surface p-4 print:break-inside-avoid print:p-3">
                <h3 className="text-[1.05rem] font-semibold">{s.title}</h3>
                <p className="mt-1 text-[0.92rem] text-muted">{s.description}</p>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="experience" title={t.experience}>
          <ol>
            {data.work.map((work) => (
              <li
                key={`${work.company}-${work.title}`}
                className="grid gap-x-6 gap-y-1 border-t border-line py-6 first:border-t-0 first:pt-0 sm:grid-cols-[8.5rem_1fr] print:grid-cols-[7.5rem_1fr] print:py-4"
              >
                <p className="pt-1 font-mono text-[0.8rem] font-medium leading-snug text-accent tabular-nums print:pt-0.5">
                  <Period start={work.start} end={work.end} />
                </p>
                <div>
                  <h3 className="text-[1.2rem] font-semibold leading-7">
                    {work.title}{' '}
                    <span className="font-normal text-muted">
                      ·{' '}
                      {work.link ? (
                        <a href={work.link} className="no-underline hover:text-accent">
                          {work.company}
                        </a>
                      ) : (
                        work.company
                      )}
                    </span>
                    {work.badges.map((b) => (
                      <span
                        key={b}
                        className="ml-2 inline-block rounded-md border border-line px-1.5 align-middle font-mono text-[0.7rem] font-normal tracking-normal text-muted"
                      >
                        {b}
                      </span>
                    ))}
                  </h3>
                  {work.companyDescription && (
                    <p className="mt-1 text-[0.92rem] text-muted">{work.companyDescription}</p>
                  )}
                  <ul className="mt-3 list-disc space-y-1.5 pl-5 marker:text-accent print:mt-1.5 print:space-y-0.5">
                    {work.highlights.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                  {work.details.length > 0 && (
                    <div className="mt-4 text-[0.88rem] text-muted print:mt-2">
                      <p className="font-mono text-[0.72rem] font-medium uppercase tracking-[0.08em] print:break-after-avoid">
                        {t.howItWasDone}
                      </p>
                      <ul className="mt-1.5 list-disc space-y-1 pl-5">
                        {work.details.map((d) => (
                          <li key={d}>{d}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {work.techStack.length > 0 && (
                    <p className="mt-3 text-[0.82rem] text-muted">
                      <span className="sr-only">{t.tech}: </span>
                      <Chips items={work.techStack} />
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </Section>

        <Section id="education" title={t.education}>
          <ul>
            {data.education.map((e) => (
              <li
                key={e.school}
                className="grid gap-x-6 gap-y-1 border-t border-line py-4 first:border-t-0 first:pt-0 sm:grid-cols-[8.5rem_1fr] print:grid-cols-[7.5rem_1fr]"
              >
                <p className="pt-1 font-mono text-[0.8rem] font-medium leading-snug text-accent tabular-nums print:pt-0.5">
                  <Period start={e.start} end={e.end} />
                </p>
                <div>
                  <h3 className="text-[1.1rem] font-semibold leading-7">{e.school}</h3>
                  <p className="text-muted">{e.degree}</p>
                </div>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="leadership-skills" title={t.leadershipSkills}>
          <ul className="flex flex-wrap gap-2">
            {data.leadershipSkills.map((s) => (
              <li key={s} className="rounded-full bg-surface-2 px-3 py-1 text-[0.9rem]">
                {s}
              </li>
            ))}
          </ul>
        </Section>

        {/* ——— Technical half: for engineers ——— */}
        <div className="mt-20 rounded-2xl bg-linear-155 from-teal to-teal-2 px-6 py-7 text-cream print:mt-8 print:rounded-none print:border-t-2 print:border-ink print:bg-none print:px-0 print:py-3 print:text-ink">
          <h2 className="text-[clamp(1.6rem,4vw,2.2rem)] font-bold text-cream print:text-[18pt] print:text-ink">
            {t.technical}
          </h2>
          <p className="mt-1 text-cream/85 print:text-muted">{t.technicalIntro}</p>
        </div>

        <Section id="skills" title={t.skills}>
          <dl className="grid gap-x-6 gap-y-3 sm:grid-cols-[11rem_1fr] print:grid-cols-[10rem_1fr]">
            {data.skillGroups.map((g) => (
              <div key={g.label} className="contents print:break-inside-avoid">
                <dt className="font-medium leading-7">{g.label}</dt>
                <dd className="text-[0.85rem]">
                  <Chips items={g.skills} />
                </dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section id="projects" title={t.projects}>
          <ul className="grid gap-3 sm:grid-cols-2 print:grid-cols-2">
            {data.projects.map((p) => (
              <li
                key={p.title}
                className="flex flex-col rounded-xl border border-line bg-surface p-4 print:break-inside-avoid print:p-3"
              >
                <h3 className="text-[1.05rem] font-semibold">
                  {p.link ? (
                    <a href={p.link.href} className="inline-flex items-center gap-1 no-underline hover:text-accent">
                      {p.title}
                      <ArrowUpRight size={15} aria-hidden="true" className="print:hidden" />
                    </a>
                  ) : (
                    p.title
                  )}
                </h3>
                {p.link && (
                  <p className="hidden text-[9pt] text-muted print:block">
                    {p.link.label.includes('.') ? shortUrl(p.link.href) : p.link.label}
                  </p>
                )}
                <p className="mt-1 text-[0.92rem] text-muted">{p.description}</p>
                <p className="mt-auto pt-3 text-[0.78rem] text-muted">
                  <Chips items={p.techStack} />
                </p>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="contact" title={t.contact} className="print:hidden">
          <ul className="grid gap-2">
            <li className="flex items-center gap-2">
              <a href={`mailto:${data.email}`} className="inline-flex items-center gap-2 hover:text-accent">
                <Mail size={15} aria-hidden="true" />
                <span className="sr-only">{t.email}: </span>
                {data.email}
              </a>
              <CopyButton
                value={data.email}
                label={t.copyEmail}
                copiedLabel={t.copied}
                size={14}
                className="size-7 rounded-md text-muted hover:bg-surface-2 hover:text-accent"
              />
            </li>
            {data.links.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="inline-flex items-center gap-2 hover:text-accent">
                  <LinkIcon kind={link.kind} />
                  <span className="min-w-0">
                    {link.label}
                    {link.label !== shortUrl(link.href) && (
                      <span className="break-all text-muted"> · {shortUrl(link.href)}</span>
                    )}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Section>
      </main>

      <footer className="border-t border-line print:hidden">
        <div className={cn(container, 'flex flex-wrap items-center gap-x-5 gap-y-2 py-6 font-mono text-[0.78rem] text-muted')}>
          <span>© {data.lastUpdatedAt.getFullYear()} {data.name}</span>
          <a href={siteHome(locale)} className="no-underline hover:text-accent">
            tonytang.dev
          </a>
          <span className="sm:ml-auto">
            {t.updated} <time dateTime={updated}>{updated}</time>
          </span>
        </div>
      </footer>

      {/* "Ask me anything" chat, from the tonytangdev/ask worker (shared with tonytang.dev). */}
      <ask-chat site="cv" locale={locale} />
      <Script src="https://ask.tonytang.dev/widget.js" strategy="lazyOnload" />
    </>
  );
}

function Section({
  id,
  title,
  children,
  className,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section aria-labelledby={id} className={cn('mt-14 print:mt-6', className)}>
      <h2 id={id} className="mb-5 text-[1.6rem] font-bold leading-tight print:mb-2.5 print:text-[15pt]">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Period({ start, end }: { start: string; end: string }) {
  return (
    <>
      <span className="whitespace-nowrap">{start}</span> –{' '}
      <span className="whitespace-nowrap">{end}</span>
    </>
  );
}

function Chips({ items }: { items: string[] }) {
  return (
    <span className="flex flex-wrap gap-1.5">
      {items.map((item) => (
        <span
          key={item}
          className="rounded-md border border-line px-1.5 py-px font-mono text-[0.72rem] text-muted print:py-0"
        >
          {item}
        </span>
      ))}
    </span>
  );
}
