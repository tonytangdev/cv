import { markdownResponse } from '@/app/lib/markdown-response';
import { toMarkdown } from '@/app/lib/structured-data';
import { getData } from '@/data';

export const dynamic = 'force-static';

// The whole English CV in one file (llmstxt.org convention).
export function GET() {
  return markdownResponse(toMarkdown(getData('en'), 'en'));
}
