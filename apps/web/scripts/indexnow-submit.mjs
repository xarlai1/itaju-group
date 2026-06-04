/**
 * IndexNow submission — runs after `next build` (chained from the web app's
 * `build` script, because Turborepo does not run npm `postbuild` lifecycle
 * hooks).
 *
 * Fetches the live sitemap, extracts every <loc> URL, and submits them to the
 * shared IndexNow endpoint, which forwards to participating engines (Bing,
 * Yandex, Seznam, Naver, Yep). Google and Brave are not IndexNow participants,
 * so they are never notified.
 *
 * Non-fatal by design: every failure is caught and logged, and the process
 * always exits 0 so it can NEVER fail the build.
 *
 * INDEXNOW_KEY must stay in sync with apps/web/lib/indexnow.ts and
 * apps/web/public/<key>.txt.
 */

const INDEXNOW_KEY = '3694a508ab81224d13d22c19d055a03d';
const HOST = 'www.itajugroup.com';
const SITEMAP_URL = `https://${HOST}/sitemap.xml`;
const KEY_LOCATION = `https://${HOST}/${INDEXNOW_KEY}.txt`;
const ENDPOINT = 'https://api.indexnow.org/indexnow';

async function main() {
  console.log(`[indexnow] Fetching sitemap: ${SITEMAP_URL}`);

  const res = await fetch(SITEMAP_URL, {
    headers: { 'user-agent': 'itaju-indexnow' },
  });

  if (!res.ok) {
    console.warn(
      `[indexnow] Sitemap fetch failed: ${res.status} ${res.statusText} — skipping submission.`,
    );
    return;
  }

  const xml = await res.text();
  const urlList = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map(
    (m) => m[1],
  );

  if (urlList.length === 0) {
    console.warn('[indexnow] No <loc> URLs found in sitemap — skipping.');
    return;
  }

  console.log(`[indexnow] Submitting ${urlList.length} URL(s) to IndexNow.`);

  const post = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'content-type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host: HOST,
      key: INDEXNOW_KEY,
      keyLocation: KEY_LOCATION,
      urlList,
    }),
  });

  const text = await post.text().catch(() => '');

  if (post.status === 200 || post.status === 202) {
    console.log(
      `[indexnow] Accepted: HTTP ${post.status}. Submitted ${urlList.length} URL(s).`,
    );
  } else {
    console.warn(
      `[indexnow] Non-accepted response: HTTP ${post.status} ${post.statusText} ${text}`.trim(),
    );
  }
}

try {
  await main();
} catch (err) {
  console.warn(
    '[indexnow] Submission errored (ignored, build continues):',
    err?.message ?? err,
  );
}

process.exit(0);
