import { KeystaticStorage } from './keystatic-storage';
import { keyStaticConfig } from './keystatic.config';

/**
 * @name createKeystaticReader
 * @description Creates a new Keystatic reader instance.
 */
export async function createKeystaticReader() {
  switch (KeystaticStorage.kind) {
    // Cloud, local, and GitHub modes all publish into this repo on `main`, so
    // the reader can use the local filesystem after each deploy. This matches
    // Keystatic's "Git is source of truth" model and avoids requiring a GitHub
    // read token (KEYSTATIC_GITHUB_TOKEN) or per-request GitHub API calls for
    // the public site.
    case 'github':
    case 'cloud':
    case 'local': {
      // we need to import this dynamically to avoid parsing the package in edge environments
      if (process.env.NEXT_RUNTIME === 'nodejs') {
        const { createReader } = await import('@keystatic/core/reader');

        return createReader(process.cwd(), keyStaticConfig);
      } else {
        // we should never get here but the compiler requires the check
        // to ensure we don't parse the package at build time
        throw new Error();
      }
    }

    default:
      throw new Error(`Unknown storage kind`);
  }
}
