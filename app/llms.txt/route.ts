import { AppConfig } from '@/app.config';
import { markdownPath, pdfPath } from '@/app/lib/cv';
import { markdownResponse } from '@/app/lib/markdown-response';
import { getData } from '@/data';

export const dynamic = 'force-static';

// Index in the llmstxt.org format: H1, summary blockquote, then links.
export function GET() {
  const d = getData('en');
  const url = (path: string) => `${AppConfig.host}${path}`;

  return markdownResponse(
    [
      `# ${d.name}`,
      '',
      `> ${d.description}`,
      '',
      `${d.tagline} ${d.status ? `${d.status.label}.` : ''} Contact: ${d.email}.`,
      '',
      '## CV',
      '',
      `- [CV in English (Markdown)](${url(markdownPath('en'))}): the full CV, same content as ${url('/')}`,
      `- [CV en français (Markdown)](${url(markdownPath('fr'))}): le CV complet, même contenu que ${url('/fr/')}`,
      `- [CV in English (PDF)](${url(pdfPath('en'))})`,
      `- [CV en français (PDF)](${url(pdfPath('fr'))})`,
      '',
      '## Optional',
      '',
      '- [tonytang.dev](https://tonytang.dev/): personal site with articles, videos and the Learn Effect course',
      ...d.links
        .filter((l) => l.kind === 'linkedin' || l.kind === 'github' || l.kind === 'x')
        .map((l) => `- [${l.label}](${l.href})`),
      '',
    ].join('\n')
  );
}
