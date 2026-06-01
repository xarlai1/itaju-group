import { Footer } from '@kit/ui/marketing';

import { AppLogo } from '~/components/app-logo';

function ComingSoon() {
  return (
    <span className="text-muted-foreground/60 ml-2 text-xs">Coming Soon</span>
  );
}

export function SiteFooter() {
  return (
    <Footer
      logo={
        <AppLogo
          className="h-12 w-auto sm:h-12"
          href="/"
          label="Itaju Group home"
        />
      }
      description={<span>Itaju, Paraguay&apos;s Gold Standard.</span>}
      copyright={<span>© 2026 Itaju Group</span>}
      sections={[
        {
          heading: <span>Ventures</span>,
          links: [
            {
              href: 'https://itajuresidency.com',
              label: <span>Itaju Residency</span>,
            },
            {
              href: '',
              label: (
                <span>
                  Itaju Capital
                  <ComingSoon />
                </span>
              ),
            },
            {
              href: '',
              label: (
                <span>
                  Itaju Energy
                  <ComingSoon />
                </span>
              ),
            },
          ],
        },
        {
          heading: <span>Legal</span>,
          links: [
            { href: '/privacy-policy', label: <span>Privacy Policy</span> },
            { href: '/terms-of-service', label: <span>Terms of Service</span> },
          ],
        },
      ]}
    />
  );
}
