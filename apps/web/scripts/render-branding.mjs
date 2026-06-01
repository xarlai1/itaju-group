// One-off: render the branding SVGs to PNG with the Itaju Group wordmark.
// The SVGs @import Cormorant Garamond + Inter from Google Fonts, so this needs
// network access. Run from apps/web:  node scripts/render-branding.mjs
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { createRequire } from 'node:module';
const require = createRequire(
  process.env.PLAYWRIGHT_ENTRY ?? import.meta.url,
);
const { chromium } = require('playwright');

const here = dirname(fileURLToPath(import.meta.url));
const img = (p) => resolve(here, '..', 'public', 'images', p);

const TARGETS = [
  // logo: transparent background, retina-crisp for a small display size.
  { svg: img('logo.svg'), out: img('logo.png'), w: 600, h: 140, scale: 3, transparent: true },
  // OG image: opaque, exact 1200x630 to match the declared metadata dimensions.
  { svg: img('og-image.svg'), out: img('og-image.png'), w: 1200, h: 630, scale: 1, transparent: false },
];

const browser = await chromium.launch();

for (const t of TARGETS) {
  const svg = readFileSync(t.svg, 'utf8');
  const page = await browser.newPage({
    viewport: { width: t.w, height: t.h },
    deviceScaleFactor: t.scale,
  });
  await page.setContent(
    `<!doctype html><html><head><meta charset="utf8"><style>html,body{margin:0;padding:0}svg{display:block}</style></head><body>${svg}</body></html>`,
    { waitUntil: 'networkidle' },
  );
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(600);
  const el = await page.$('svg');
  await el.screenshot({ path: t.out, omitBackground: t.transparent });
  await page.close();
  console.log('wrote', t.out);
}

await browser.close();
