// Runs after `next build`: serves ./out, then with Playwright
//   - prints each locale's CV to out/tony-tang-cv-<locale>.pdf (text-based, light)
//   - screenshots each locale's OG canvas to out/locale/<locale>/og-image.png
// and finally removes the OG canvas pages from the export.
import { chromium } from '@playwright/test';
import { createReadStream, existsSync, mkdirSync, rmSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize } from 'node:path';

const OUT = join(process.cwd(), 'out');
const LOCALES = [
  { id: 'en', path: '/' },
  { id: 'fr', path: '/fr/' },
];
const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain',
  '.json': 'application/json',
};

function resolveFile(urlPath) {
  const clean = normalize(decodeURIComponent(urlPath.split('?')[0])).replace(/^(\.\.[/\\])+/, '');
  let file = join(OUT, clean);
  if (existsSync(file) && statSync(file).isDirectory()) file = join(file, 'index.html');
  return existsSync(file) ? file : null;
}

const server = createServer((req, res) => {
  const file = resolveFile(req.url ?? '/');
  if (!file) {
    res.writeHead(404).end();
    return;
  }
  res.writeHead(200, { 'Content-Type': TYPES[extname(file)] ?? 'application/octet-stream' });
  createReadStream(file).pipe(res);
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const base = `http://127.0.0.1:${server.address().port}`;

const browser = await chromium.launch();
try {
  for (const { id, path } of LOCALES) {
    // PDF: print media, light scheme, fonts loaded.
    const page = await browser.newPage({ colorScheme: 'light' });
    await page.goto(base + path, { waitUntil: 'networkidle' });
    await page.emulateMedia({ media: 'print', colorScheme: 'light' });
    await page.evaluate(() => document.fonts.ready);
    const pdf = join(OUT, `tony-tang-cv-${id}.pdf`);
    await page.pdf({ path: pdf, format: 'A4', printBackground: true, preferCSSPageSize: true, tagged: true, outline: true });
    console.log('pdf', pdf);
    await page.close();

    // OG image.
    const og = await browser.newPage({ viewport: { width: 1200, height: 630 } });
    await og.goto(`${base}${path}og-image/`, { waitUntil: 'networkidle' });
    await og.evaluate(() => document.fonts.ready);
    const dir = join(OUT, 'locale', id);
    mkdirSync(dir, { recursive: true });
    await og.locator('#canvas').screenshot({ path: join(dir, 'og-image.png') });
    console.log('og', join(dir, 'og-image.png'));
    await og.close();
  }
} finally {
  await browser.close();
  server.close();
}

for (const { path } of LOCALES) rmSync(join(OUT, path, 'og-image'), { recursive: true, force: true });
