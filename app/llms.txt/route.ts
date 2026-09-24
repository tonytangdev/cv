import { toMarkdown } from '@/app/lib/structured-data';
import en from '@/data/en';

export const dynamic = 'force-static';

export function GET() {
  return new Response(toMarkdown(en), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
