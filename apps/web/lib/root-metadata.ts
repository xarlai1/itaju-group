import { Metadata } from 'next';
import { headers } from 'next/headers';

import appConfig from '~/config/app.config';

// PNG (not SVG): link previewers (iMessage, WhatsApp, Facebook, X) don't
// render SVG OG images. Served from /images, which Vercel serves statically.
const OG_IMAGE = {
  url: '/images/og-image.png',
  width: 1200,
  height: 630,
  alt: 'The Itaju Group wordmark with the line One country, three doors. on a dark background.',
};

/**
 * @name generateRootMetadata
 * @description Generates the root metadata for the application
 */
export const generateRootMetadata = async (): Promise<Metadata> => {
  const headersStore = await headers();
  const csrfToken = headersStore.get('x-csrf-token') ?? '';

  return {
    title: appConfig.title,
    description: appConfig.description,
    metadataBase: new URL(appConfig.url),
    applicationName: appConfig.name,
    other: {
      'csrf-token': csrfToken,
    },
    openGraph: {
      url: appConfig.url,
      siteName: appConfig.name,
      title: appConfig.title,
      description: appConfig.description,
      images: [OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title: appConfig.title,
      description: appConfig.description,
      images: [OG_IMAGE],
    },
    icons: {
      // favicon.ico + favicon.svg stay at the root (served correctly and used
      // by Google/browsers by default). The PNG variants live under /images
      // because root-level .png requests fall through to the app router (404);
      // /images is served statically.
      icon: [
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/favicon.svg', type: 'image/svg+xml' },
        { url: '/images/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
        { url: '/images/favicon-96x96.png', type: 'image/png', sizes: '96x96' },
      ],
      apple: [
        {
          url: '/images/apple-touch-icon.png',
          sizes: '180x180',
          type: 'image/png',
        },
      ],
    },
  };
};
