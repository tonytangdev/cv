import { markdownResponse } from '@/app/lib/markdown-response';
import { toMarkdown } from '@/app/lib/structured-data';
import { getData } from '@/data';

export const dynamic = 'force-static';

export function GET() {
  return markdownResponse(toMarkdown(getData('en'), 'en'));
}
