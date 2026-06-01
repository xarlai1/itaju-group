import type { NoseconeOptions } from '@nosecone/next';

// we need to allow connecting to the Supabase API from the client
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL as string;

// the URL used for Supabase Realtime
const WEBSOCKET_URL = SUPABASE_URL.replace('https://', 'ws://').replace(
  'http://',
  'ws://',
);

// disabled to allow loading images from Supabase Storage
const CROSS_ORIGIN_EMBEDDER_POLICY = false;

/**
 * @name GOOGLE_TAG_SCRIPT_ORIGINS
 * @description Origins allowed to load/run scripts for the Google tag (gtag.js).
 * gtag.js injects further scripts at runtime, so these hosts are needed in
 * "scriptSrc" in addition to the per-request nonce.
 */
const GOOGLE_TAG_SCRIPT_ORIGINS = [
  'https://www.googletagmanager.com',
  'https://www.googleadservices.com',
];

/**
 * @name GOOGLE_TAG_CONNECT_ORIGINS
 * @description Origins the Google tag beacons reach (GA4 measurement + Google
 * Ads conversion). Needed in "connectSrc".
 */
const GOOGLE_TAG_CONNECT_ORIGINS = [
  'https://www.googletagmanager.com',
  'https://www.google-analytics.com',
  'https://*.google-analytics.com',
  'https://*.analytics.google.com',
  'https://www.googleadservices.com',
  'https://googleads.g.doubleclick.net',
  'https://www.google.com',
];

/**
 * @name GOOGLE_TAG_IMG_ORIGINS
 * @description Origins for the Google tag tracking pixels (GA4 + Ads
 * conversion). Needed in "imgSrc".
 */
const GOOGLE_TAG_IMG_ORIGINS = [
  'https://www.googletagmanager.com',
  'https://www.google-analytics.com',
  'https://*.google-analytics.com',
  'https://www.googleadservices.com',
  'https://googleads.g.doubleclick.net',
  'https://www.google.com',
];

/**
 * @name ALLOWED_ORIGINS
 * @description List of allowed origins for the "connectSrc" directive in the Content Security Policy.
 */
const ALLOWED_ORIGINS = [
  SUPABASE_URL,
  WEBSOCKET_URL,
  ...GOOGLE_TAG_CONNECT_ORIGINS,
  // add here additional allowed origins
] as never[];

/**
 * @name SCRIPT_SRC_ORIGINS
 */
const SCRIPT_SRC_ORIGINS = [...GOOGLE_TAG_SCRIPT_ORIGINS] as never[];

/**
 * @name IMG_SRC_ORIGINS
 */
const IMG_SRC_ORIGINS = [SUPABASE_URL, ...GOOGLE_TAG_IMG_ORIGINS] as never[];

/**
 * @name UPGRADE_INSECURE_REQUESTS
 * @description Upgrade insecure requests to HTTPS when in production
 */
const UPGRADE_INSECURE_REQUESTS = process.env.NODE_ENV === 'production';

/**
 * @name createCspResponse
 * @description Create a middleware with enhanced headers applied (if applied).
 */
export async function createCspResponse() {
  const {
    createMiddleware,
    withVercelToolbar,
    defaults: noseconeConfig,
  } = await import('@nosecone/next');

  /*
   * @name allowedOrigins
   * @description List of allowed origins for the "connectSrc" directive in the Content Security Policy.
   */

  const config: NoseconeOptions = {
    ...noseconeConfig,
    contentSecurityPolicy: {
      directives: {
        ...noseconeConfig.contentSecurityPolicy.directives,
        scriptSrc: [
          ...noseconeConfig.contentSecurityPolicy.directives.scriptSrc,
          ...SCRIPT_SRC_ORIGINS,
        ],
        connectSrc: [
          ...noseconeConfig.contentSecurityPolicy.directives.connectSrc,
          ...ALLOWED_ORIGINS,
        ],
        imgSrc: [
          ...noseconeConfig.contentSecurityPolicy.directives.imgSrc,
          ...IMG_SRC_ORIGINS,
        ],
        upgradeInsecureRequests: UPGRADE_INSECURE_REQUESTS,
      },
    },
    crossOriginEmbedderPolicy: CROSS_ORIGIN_EMBEDDER_POLICY,
  };

  const middleware = createMiddleware(
    process.env.VERCEL_ENV === 'preview' ? withVercelToolbar(config) : config,
  );

  // create response
  const response = await middleware();

  if (response) {
    const contentSecurityPolicy = response.headers.get(
      'Content-Security-Policy',
    );

    const matches = contentSecurityPolicy?.match(/nonce-([\w-]+)/) || [];
    const nonce = matches[1];

    // set x-nonce header if nonce is found
    // so we can pass it to client-side scripts
    if (nonce) {
      response.headers.set('x-nonce', nonce);
    }
  }

  return response;
}
