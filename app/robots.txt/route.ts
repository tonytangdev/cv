import { AppConfig } from '@/app.config';

export const dynamic = 'force-static';

// A CV wants to be found: search, AI answers and AI training are all allowed.
// Same policy and Content Signals as tonytang.dev.
export function GET() {
  return new Response(
    `# Content Signals (https://contentsignals.org/)
# search:   building a search index and providing search results with links and excerpts
# ai-input: inputting content into AI models (e.g. retrieval-augmented generation, grounding)
# ai-train: training or fine-tuning AI models

User-agent: *
Content-Signal: ai-train=yes, search=yes, ai-input=yes
Allow: /

Sitemap: ${AppConfig.host}/sitemap.xml
`,
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } }
  );
}
