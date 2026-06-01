'use client';

import type { ComponentProps, MouseEvent } from 'react';

import Link from 'next/link';

// Google Ads conversion fired when a visitor clicks through to WhatsApp.
// CONVERSION_LABEL is a placeholder — replace it with the real conversion label
// from the Google Ads conversion action (full value: AW-966339956/<label>).
const CONVERSION_LABEL = 'CONVERSION_LABEL';
const CONVERSION_SEND_TO = `AW-966339956/${CONVERSION_LABEL}`;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Drop-in replacement for a `next/link` link pointing at WhatsApp. Fires the
 * Google Ads conversion event on click, then lets the link open WhatsApp
 * normally (any caller-provided onClick still runs, and navigation is never
 * blocked).
 */
export function WhatsAppLink({
  onClick,
  ...props
}: ComponentProps<typeof Link>) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', 'conversion', { send_to: CONVERSION_SEND_TO });
    }

    onClick?.(event);
  };

  return <Link {...props} onClick={handleClick} />;
}
