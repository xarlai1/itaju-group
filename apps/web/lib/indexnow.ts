/**
 * IndexNow key for itajuresidency.com.
 *
 * This is NOT a secret — it is published at `/<key>.txt` so search engines can
 * verify ownership. It is hardcoded (not an env var) on purpose, to avoid the
 * Turborepo `globalEnv` stripping trap.
 *
 * Keep this value in sync with:
 *   - apps/web/public/3694a508ab81224d13d22c19d055a03d.txt
 *   - apps/web/scripts/indexnow-submit.mjs (INDEXNOW_KEY)
 *   - the key-file exclusion in apps/web/proxy.ts
 */
export const INDEXNOW_KEY = '3694a508ab81224d13d22c19d055a03d';
