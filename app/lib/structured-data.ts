import { AppConfig, LocaleId } from '@/app.config';
import { isoDate, markdownPath, pageUrl, pdfPath } from '@/app/lib/cv';
import { getDictionary } from '@/locales';
import { Data } from '@/types/data';

/** The Person is owned by tonytang.dev; the CV describes the same entity. */
export const PERSON_ID = 'https://tonytang.dev/#person';

const isCurrent = (end: string) => !/\d{4}/.test(end);

/**
 * schema.org ProfilePage about the Person, so search engines and LLM crawlers
 * read the CV as data. Only states what the page shows.
 */
export function toProfilePageJsonLd(data: Data, locale: LocaleId) {
  const url = pageUrl(locale);
  const current = data.work.find((w) => isCurrent(w.end));
  const degrees = data.education.filter((e) => e.kind === 'degree');
  const certs = data.education.filter((e) => e.kind === 'certification');

  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${url}#page`,
    url,
    name: `${data.name} – ${data.headline}`,
    inLanguage: locale,
    dateModified: data.lastUpdatedAt.toISOString(),
    mainEntity: {
      '@type': 'Person',
      '@id': PERSON_ID,
      name: data.name,
      url: 'https://tonytang.dev/',
      jobTitle: data.headline,
      description: data.description,
      email: `mailto:${data.email}`,
      homeLocation: { '@type': 'Place', name: data.location },
      worksFor: current && {
        '@type': 'Organization',
        name: current.company,
        url: current.link,
      },
      alumniOf: degrees.map((e) => ({
        '@type': 'EducationalOrganization',
        name: e.school,
      })),
      hasCredential: [...degrees, ...certs].map((e) => ({
        '@type': 'EducationalOccupationalCredential',
        name: e.degree,
        credentialCategory: e.kind,
        recognizedBy: { '@type': 'Organization', name: e.school },
      })),
      knowsAbout: [
        ...data.leadershipSkills,
        ...data.skillGroups.flatMap((g) => g.skills),
      ],
      sameAs: [
        'https://tonytang.dev/',
        ...data.links.filter((l) => l.kind !== 'website' && l.kind !== 'course').map((l) => l.href),
      ],
    },
    subjectOf: [
      { '@type': 'DigitalDocument', encodingFormat: 'application/pdf', url: `${AppConfig.host}${pdfPath(locale)}` },
      { '@type': 'DigitalDocument', encodingFormat: 'text/markdown', url: `${AppConfig.host}${markdownPath(locale)}` },
    ],
  };
}

/** Plain Markdown version of the CV, same order and content as the page. */
export function toMarkdown(data: Data, locale: LocaleId) {
  const t = getDictionary(locale);
  const out: string[] = [];
  const push = (...lines: string[]) => out.push(...lines);

  push(`# ${data.name}`, '', `> ${data.headline} · ${data.location}. ${data.tagline}`, '');
  if (data.status) push(`${data.status.label}.`, '');
  push(`- ${t.email}: ${data.email}`);
  for (const l of data.links) push(`- ${l.label}: ${l.href}`);
  push(`- CV: ${pageUrl(locale)} (PDF: ${AppConfig.host}${pdfPath(locale)})`, '');

  push(`## ${t.highlights}`, '', ...data.highlights.map((h) => `- ${h}`), '');
  push(`## ${t.about}`, '', data.summary, '');
  push(`## ${t.services}`, '', ...data.services.map((s) => `- **${s.title}:** ${s.description}`), '');

  push(`## ${t.experience}`, '');
  for (const w of data.work) {
    const badges = w.badges.length ? ` (${w.badges.join(', ')})` : '';
    push(`### ${w.title}, ${w.company}${badges}`, '', `${w.start} – ${w.end}`, '');
    if (w.companyDescription) push(`${w.companyDescription}`, '');
    push(...w.highlights.map((h) => `- ${h}`), '');
    if (w.details.length) push(`${t.howItWasDone}:`, '', ...w.details.map((d) => `- ${d}`), '');
    if (w.techStack.length) push(`${t.tech}: ${w.techStack.join(', ')}`, '');
  }

  push(`## ${t.education}`, '');
  for (const e of data.education) push(`- ${e.degree}, ${e.school} (${e.start} – ${e.end})`);
  push('', `## ${t.leadershipSkills}`, '', data.leadershipSkills.join(', '), '');

  push(`## ${t.technical}`, '', `### ${t.skills}`, '');
  for (const g of data.skillGroups) push(`- ${g.label}: ${g.skills.join(', ')}`);
  push('', `### ${t.projects}`, '');
  for (const p of data.projects) {
    push(`#### ${p.title}`, '', p.description, '', `${t.tech}: ${p.techStack.join(', ')}`);
    if (p.link) push(`Link: ${p.link.href}`);
    push('');
  }

  push(`${t.updated} ${isoDate(data.lastUpdatedAt)}.`, '');
  return out.join('\n');
}
