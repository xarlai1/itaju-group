import {
  Cormorant_Garamond as DisplayFont,
  Inter as SansFont,
} from 'next/font/google';

import { cn } from '@kit/ui/utils';

/**
 * @sans
 * @description Define here the sans font.
 * By default, it uses the Inter font from Google Fonts.
 */
const sans = SansFont({
  subsets: ['latin'],
  variable: '--font-sans-fallback',
  fallback: ['system-ui', 'Helvetica Neue', 'Helvetica', 'Arial'],
  preload: true,
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

/**
 * @display
 * @description Cormorant Garamond, the brand display serif (matches the
 * logo/OG wordmark). Exposed as the `--font-cormorant` variable and wired to
 * the `font-display` utility in shadcn-ui.css. Used for editorial headings;
 * the default heading font stays Inter so the rest of the app is unchanged.
 */
const display = DisplayFont({
  subsets: ['latin'],
  variable: '--font-cormorant',
  fallback: ['Times New Roman', 'serif'],
  preload: true,
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

/**
 * @heading
 * @description Define here the heading font.
 */
const heading = sans;

// we export these fonts into the root layout
export { sans, heading, display };

/**
 * @name getFontsClassName
 * @description Get the class name for the root layout.
 * @param theme
 */
export function getFontsClassName(theme?: string) {
  const dark = theme === 'dark';
  const light = !dark;

  const font = [sans.variable, heading.variable, display.variable].reduce<
    string[]
  >(
    (acc, curr) => {
      if (acc.includes(curr)) return acc;

      return [...acc, curr];
    },
    [],
  );

  return cn(...font, {
    dark,
    light,
  });
}
