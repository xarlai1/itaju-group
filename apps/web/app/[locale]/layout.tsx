import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import Script from 'next/script';

import { hasLocale } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { PublicEnvScript } from 'next-runtime-env';

import { routing } from '@kit/i18n/routing';
import { Toaster } from '@kit/ui/sonner';
import { cn } from '@kit/ui/utils';

import { JsonLd } from '~/components/json-ld';
import { RootProviders } from '~/components/root-providers';
import { getFontsClassName } from '~/lib/fonts';
import { generateRootMetadata } from '~/lib/root-metadata';
import { getRootTheme } from '~/lib/root-theme';

// Organization structured data. Rendered in <head> on every page so search
// engines and AI have a single canonical description of Itaju Group and its
// three ventures. The sameAs array is intentionally left empty, ready for the
// group's social and Wikidata URLs as they come online.
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://www.itajugroup.com/#organization',
  name: 'Itaju Group',
  url: 'https://www.itajugroup.com',
  logo: 'https://www.itajugroup.com/images/logo.png',
  image: 'https://www.itajugroup.com/images/og-image.png',
  description:
    'Itaju Group builds ventures in Paraguay: permanent residency, investment, and clean energy infrastructure. One country, three doors.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Asunción',
    addressCountry: 'PY',
  },
  areaServed: { '@type': 'Country', name: 'Paraguay' },
  knowsLanguage: ['en', 'es'],
  subOrganization: [
    {
      '@type': 'Organization',
      name: 'Itaju Residency',
      url: 'https://itajuresidency.com',
    },
    {
      '@type': 'Organization',
      name: 'Itaju Capital',
    },
    {
      '@type': 'Organization',
      name: 'Itaju Energy',
    },
  ],
  // Ready for social and Wikidata URLs (e.g. LinkedIn, Crunchbase, Wikidata).
  sameAs: [],
};

export const generateMetadata = () => {
  return generateRootMetadata();
};

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const [theme, nonce, messages] = await Promise.all([
    getRootTheme(),
    getCspNonce(),
    getMessages({ locale }),
  ]);

  const className = getRootClassName(theme);

  return (
    <html lang={locale} className={className} suppressHydrationWarning>
      <head>
        <PublicEnvScript nonce={nonce} />
        <JsonLd data={organizationSchema} />

        {/* Google tag (gtag.js). Loaded once and used to configure BOTH the
            Google Ads conversion tag (AW-966339956) and Google Analytics 4
            (G-THDWQ589WX). The nonce is passed for when the strict CSP is
            enabled; the Google domains are allowlisted in
            lib/create-csp-response.ts. */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-966339956"
          strategy="afterInteractive"
          nonce={nonce}
        />
        <Script id="gtag-init" strategy="afterInteractive" nonce={nonce}>
          {`
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'AW-966339956');
  gtag('config', 'G-THDWQ589WX');
`}
        </Script>
      </head>

      <body>
        <RootProviders
          theme={theme}
          locale={locale}
          nonce={nonce}
          messages={messages}
        >
          {children}

          <Toaster richColors={true} theme={theme} position="top-center" />
        </RootProviders>
      </body>
    </html>
  );
}

function getRootClassName(theme: string) {
  const fontsClassName = getFontsClassName(theme);

  return cn(
    'bg-background min-h-screen antialiased md:overscroll-y-none',
    fontsClassName,
  );
}

async function getCspNonce() {
  const headersStore = await headers();

  return headersStore.get('x-nonce') ?? undefined;
}
