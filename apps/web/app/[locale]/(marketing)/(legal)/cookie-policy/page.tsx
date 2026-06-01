import Link from 'next/link';

import { getTranslations } from 'next-intl/server';

import { SitePageHeader } from '~/(marketing)/_components/site-page-header';

const LAST_UPDATED = 'May 22, 2026';
const CONTACT_EMAIL = 'hello@itajuresidency.com';

export async function generateMetadata() {
  const t = await getTranslations('marketing');

  return {
    title: t('cookiePolicy'),
    alternates: { canonical: '/cookie-policy' },
  };
}

type Block =
  | { kind: 'p'; text: string }
  | { kind: 'ul'; items: string[] }
  | { kind: 'note'; text: string };

type Section = { heading: string; blocks: Block[] };

const sections: Section[] = [
  {
    heading: '1. About this policy',
    blocks: [
      {
        kind: 'p',
        text: 'This Cookie Policy explains how Itaju Residency E.A.S. (the "Company", "we", "us", or "our") uses cookies and similar tracking technologies on our website. It tells you what cookies are, which ones we use, why we use them, and how you can manage your preferences.',
      },
      {
        kind: 'p',
        text: 'This policy works alongside our Privacy Policy. Where this policy refers to your personal information, it is handled in line with the standards set out in our Privacy Policy.',
      },
    ],
  },
  {
    heading: '2. What cookies are',
    blocks: [
      {
        kind: 'p',
        text: 'Cookies are small text files that a website places on your device when you visit. They allow the website to remember information about your visit, such as your preferences, the pages you have viewed, and how you interact with the site.',
      },
      {
        kind: 'p',
        text: 'We use the word "cookies" in this policy to mean cookies and any similar technology that performs the same function, including pixels, tags, local storage, and software development kits.',
      },
    ],
  },
  {
    heading: '3. Why we use cookies',
    blocks: [
      { kind: 'p', text: 'We use cookies for the following purposes:' },
      {
        kind: 'ul',
        items: [
          'To make our website work properly, including remembering your preferences and keeping your session secure.',
          'To understand how visitors use our website, so we can improve the experience and the content we publish.',
          'To deliver our service in a way that is responsive, fast, and reliable across different devices and browsers.',
        ],
      },
      {
        kind: 'p',
        text: 'We do not use cookies for advertising or for tracking you across other websites. If this changes in the future, we will update this policy and ask for your consent before any new cookies are set.',
      },
    ],
  },
  {
    heading: '4. The types of cookies we use',
    blocks: [
      { kind: 'p', text: 'We group the cookies we use into four categories.' },
      {
        kind: 'p',
        text: 'Strictly necessary cookies. These cookies are essential for our website to work. They allow you to navigate the site, use core features, and keep your session secure. Without these cookies, the website cannot function properly. These cookies do not require your consent.',
      },
      {
        kind: 'p',
        text: 'Functional cookies. These cookies remember choices you make, such as your language or region, and give you a more personal experience. If you reject these cookies, some features may not work as expected.',
      },
      {
        kind: 'p',
        text: 'Analytics cookies. These cookies collect information about how visitors use our website, such as which pages are viewed most often, how long visitors spend on each page, and any errors they encounter. We use this information to improve the website. The information is collected in an aggregated and anonymous form wherever possible. These cookies are set only with your consent.',
      },
      {
        kind: 'p',
        text: 'Third party cookies. Some of the cookies on our website are set by service providers we use to operate the site, such as our website hosting provider, our analytics provider, and our content delivery provider. These third parties are bound by confidentiality and data protection obligations and may only use the cookies for the purposes we have agreed with them.',
      },
      {
        kind: 'note',
        text: 'A full cookie declaration table listing each cookie by name, provider, purpose, category, and retention period will be inserted here once the website build is finalised.',
      },
    ],
  },
  {
    heading: '5. Your consent',
    blocks: [
      {
        kind: 'p',
        text: 'When you first visit our website, you will see a cookie banner that explains what cookies we use and gives you a clear choice. You can:',
      },
      {
        kind: 'ul',
        items: [
          'Accept all cookies, which allows us to set all of the cookies described in this policy.',
          'Reject all non essential cookies, in which case only strictly necessary cookies will be set.',
          'Manage your preferences by category, so you decide which categories of cookies you accept and which you reject.',
        ],
      },
      {
        kind: 'p',
        text: 'Strictly necessary cookies do not require your consent and will always be set. All other cookies will only be set after you have given your consent through the banner or the preference centre.',
      },
      {
        kind: 'p',
        text: 'You can change or withdraw your consent at any time by clicking the cookie preferences link in the footer of our website.',
      },
    ],
  },
  {
    heading: '6. How long cookies last',
    blocks: [
      {
        kind: 'p',
        text: 'Cookies have different lifespans. Some cookies are deleted as soon as you close your browser. These are called session cookies. Other cookies remain on your device for a defined period, which can range from a few minutes to several months. These are called persistent cookies.',
      },
      {
        kind: 'p',
        text: 'The exact retention period for each cookie is set out in the cookie declaration table referenced in Section 4.',
      },
    ],
  },
  {
    heading: '7. Managing cookies through your browser',
    blocks: [
      {
        kind: 'p',
        text: 'You can also manage cookies directly through your browser settings. Most browsers allow you to view the cookies stored on your device, delete them, and block new cookies from being set. The exact steps depend on the browser you use.',
      },
      {
        kind: 'p',
        text: 'If you choose to block all cookies through your browser, please be aware that some parts of our website may not work as expected.',
      },
      {
        kind: 'p',
        text: 'You can find detailed guides on how to manage cookies in each major browser on the official websites of Google Chrome, Mozilla Firefox, Apple Safari, Microsoft Edge, and Brave.',
      },
    ],
  },
  {
    heading: '8. Changes to this policy',
    blocks: [
      {
        kind: 'p',
        text: 'We may update this Cookie Policy from time to time, especially if we add new tools to our website or if the law changes. The current version is the one published on our website and dated at the top of this page. Material changes will be highlighted clearly when you next visit the site.',
      },
    ],
  },
];

async function CookiePolicyPage() {
  return (
    <div>
      <SitePageHeader
        title="Cookie Policy"
        subtitle="How we use cookies and similar technologies on our website."
      />

      <div className="container mx-auto py-8 xl:py-12">
        <article className="mx-auto max-w-3xl space-y-8">
          <p className="text-muted-foreground text-sm">
            Last updated: {LAST_UPDATED}
          </p>

          {sections.map((section) => (
            <section key={section.heading} className="space-y-3">
              <h2 className="font-heading text-secondary-foreground text-xl font-semibold tracking-tight xl:text-2xl">
                {section.heading}
              </h2>
              {section.blocks.map((block, i) => {
                if (block.kind === 'p') {
                  return (
                    <p
                      key={i}
                      className="text-muted-foreground text-base leading-relaxed"
                    >
                      {block.text}
                    </p>
                  );
                }
                if (block.kind === 'note') {
                  return (
                    <p
                      key={i}
                      className="text-muted-foreground/80 border-border/60 border-l-2 pl-4 text-sm italic"
                    >
                      {block.text}
                    </p>
                  );
                }
                return (
                  <ul
                    key={i}
                    className="text-muted-foreground list-disc space-y-2 pl-6 text-base leading-relaxed"
                  >
                    {block.items.map((item, j) => (
                      <li key={j}>{item}</li>
                    ))}
                  </ul>
                );
              })}
            </section>
          ))}

          <section className="space-y-3">
            <h2 className="font-heading text-secondary-foreground text-xl font-semibold tracking-tight xl:text-2xl">
              9. Contact
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed">
              For any question about this Cookie Policy, or about how we use
              cookies on our website, please contact us at:
            </p>
            <p className="text-muted-foreground text-base leading-relaxed">
              <Link
                href={`mailto:${CONTACT_EMAIL}`}
                className="hover:text-foreground underline"
              >
                {CONTACT_EMAIL}
              </Link>
            </p>
          </section>
        </article>
      </div>
    </div>
  );
}

export default CookiePolicyPage;
