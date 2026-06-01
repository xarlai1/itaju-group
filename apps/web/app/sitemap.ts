import type { MetadataRoute } from 'next';

import appConfig from '~/config/app.config';

// Itaju Group is a single-page marketing site (home) plus its legal pages.
// No blog/CMS, so the sitemap is fully static — no CMS read, no dynamic
// entries. Update this list if marketing routes are added.
const STATIC_PATHS: ReadonlyArray<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
  priority: number;
}> = [
  { path: '/', changeFrequency: 'weekly', priority: 1.0 },
  { path: '/privacy-policy', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/terms-of-service', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/cookie-policy', changeFrequency: 'yearly', priority: 0.3 },
];

function absoluteUrl(path: string): string {
  return new URL(path, appConfig.url).toString();
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return STATIC_PATHS.map((entry) => ({
    url: absoluteUrl(entry.path),
    lastModified: now,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }));
}
