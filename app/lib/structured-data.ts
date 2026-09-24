import { Data } from '@/types/data';

const isCurrent = (end: string) => !/\d{4}/.test(end);

// schema.org Person, so search engines and LLM crawlers can read the CV as data.
export function toPersonJsonLd(data: Data, url?: string) {
  const email = data.contacts.find((c) => c.href.startsWith('mailto:'));
  const current = data.work.find((w) => isCurrent(w.end));

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: data.name,
    jobTitle: data.bio,
    description: data.description,
    url,
    email: email?.href,
    homeLocation: { '@type': 'Place', name: data.location },
    worksFor: current && {
      '@type': 'Organization',
      name: current.company,
      url: current.link,
    },
    knowsAbout: data.skills,
    hasCredential: data.education.map((e) => ({
      '@type': 'EducationalOccupationalCredential',
      name: e.degree,
      recognizedBy: { '@type': 'Organization', name: e.school },
    })),
    sameAs: data.links.map((l) => l.href),
  };
}

// Plain Markdown version of the CV, served as llms.txt.
export function toMarkdown(data: Data) {
  const lines: string[] = [
    `# ${data.name}`,
    '',
    `> ${data.bio} · ${data.location}`,
    '',
    data.summary,
    '',
  ];

  if (data.status) lines.push(`Availability: ${data.status.label}`, '');

  lines.push('## Contact', '');
  for (const c of data.contacts) {
    const email = c.href.startsWith('mailto:');
    lines.push(`- ${email ? 'Email' : c.label}: ${c.href.replace(/^mailto:/, '')}`);
  }
  for (const l of data.links) lines.push(`- ${l.label}: ${l.href}`);

  lines.push('', '## Skills', '', data.skills.join(', '), '');

  lines.push('## Work Experience', '');
  for (const w of data.work) {
    const badges = w.badges.length ? ` (${w.badges.join(', ')})` : '';
    lines.push(`### ${w.title}, ${w.company}${badges} (${w.start} – ${w.end})`, '');
    for (const d of w.description) lines.push(`- ${d}`);
    lines.push('');
  }

  lines.push('## Education', '');
  for (const e of data.education) {
    lines.push(`- ${e.degree}, ${e.school} (${e.start} – ${e.end})`);
  }

  lines.push('', '## Projects', '');
  for (const p of data.projects) {
    lines.push(`### ${p.title}`, '', p.description, '');
    lines.push(`Tech: ${p.techStack.join(', ')}`);
    if (p.link) lines.push(`Link: ${p.link.href}`);
    lines.push('');
  }

  return lines.join('\n');
}
