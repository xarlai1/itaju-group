import Link from 'next/link';

import { getTranslations } from 'next-intl/server';

import { SitePageHeader } from '~/(marketing)/_components/site-page-header';

const LAST_UPDATED = 'May 22, 2026';
const CONTACT_EMAIL = 'hello@itajuresidency.com';

export async function generateMetadata() {
  const t = await getTranslations('marketing');

  return {
    title: t('privacyPolicy'),
    alternates: { canonical: '/privacy-policy' },
  };
}

type Block = { kind: 'p'; text: string } | { kind: 'ul'; items: string[] };

type Section = { heading: string; blocks: Block[] };

const sections: Section[] = [
  {
    heading: '1. About this policy',
    blocks: [
      {
        kind: 'p',
        text: 'This Privacy Policy explains how Itaju E.A.S. (the "Company", "we", "us", or "our") collects, uses, stores, and protects your personal information when you visit our website or engage our residency services.',
      },
      {
        kind: 'p',
        text: 'We take your privacy seriously. We only collect what we need to do our work, we keep it safe, and we never sell it. This policy is written in plain language so you can understand exactly what we do with your information.',
      },
      {
        kind: 'p',
        text: 'By using our website or our services, you agree to the practices described in this Privacy Policy.',
      },
    ],
  },
  {
    heading: '2. Who is responsible for your data',
    blocks: [
      {
        kind: 'p',
        text: 'The data controller for your personal information is:',
      },
      { kind: 'p', text: 'Itaju Residency E.A.S.' },
      {
        kind: 'p',
        text: 'For any question about this policy or about how we handle your data, please contact us at the email above.',
      },
    ],
  },
  {
    heading: '3. What information we collect',
    blocks: [
      {
        kind: 'p',
        text: 'We collect personal information in three ways: information you give us directly, information we receive as part of your residency application, and information that is collected automatically when you visit our website.',
      },
      {
        kind: 'p',
        text: 'Information you give us directly includes your name, your email address, your phone number, your country of residence, your nationality, and any message you send to us through our contact form, WhatsApp, or by email.',
      },
      {
        kind: 'p',
        text: 'Information we receive as part of your residency application includes copies of your passport, your birth certificate, your marriage certificate (if applicable), your police clearance from your home country, proof of address, financial documents required by the Paraguayan authorities, photographs for official filings, and any other document the Paraguayan government requires us or our partner law firm to submit on your behalf.',
      },
      {
        kind: 'p',
        text: 'Information we collect automatically when you visit our website includes your IP address, your browser type and version, the pages of our website you visit, the date and time of your visit, the time you spend on each page, the website you came from, and similar diagnostic data. This information is collected through cookies and analytics tools, as described in our Cookie Policy.',
      },
    ],
  },
  {
    heading: '4. Why we collect your information',
    blocks: [
      {
        kind: 'p',
        text: 'We use your personal information for the following purposes:',
      },
      {
        kind: 'ul',
        items: [
          'To respond to your enquiry when you contact us through our website, WhatsApp, or email.',
          'To prepare and file your Paraguayan residency application with the relevant Paraguayan authorities, and to coordinate every step of the process with you and our partner law firm.',
          'To comply with our legal and regulatory obligations under Paraguayan law, including any requirement to retain client records for a defined period.',
          'To improve our website and our services by understanding how visitors use the site.',
          'To send you important updates about your application or about changes to our service. We do not send marketing emails unless you have opted in.',
        ],
      },
      {
        kind: 'p',
        text: 'We do not use your personal information for any purpose other than those listed above without your explicit consent.',
      },
    ],
  },
  {
    heading: '5. Our legal basis for processing',
    blocks: [
      {
        kind: 'p',
        text: 'We process your personal information on one or more of the following legal bases:',
      },
      {
        kind: 'ul',
        items: [
          'Performance of a contract, when we process your information to deliver the residency service you have engaged us for.',
          'Compliance with a legal obligation, when Paraguayan law or any other applicable law requires us to collect, retain, or share your information.',
          'Legitimate interests, when we process your information to operate, secure, and improve our website and our services, in a way that does not override your privacy rights.',
          'Consent, when you have given us clear, specific permission to use your information for a defined purpose, such as receiving newsletter updates.',
        ],
      },
      {
        kind: 'p',
        text: 'If you are accessing our website from the European Union or the United Kingdom, your data is processed in accordance with the General Data Protection Regulation (GDPR) and any applicable national law.',
      },
    ],
  },
  {
    heading: '6. Who we share your information with',
    blocks: [
      {
        kind: 'p',
        text: 'We share your personal information only with the parties listed below, and only to the extent needed to deliver our service.',
      },
      {
        kind: 'ul',
        items: [
          'Our partner law firm in Paraguay, which provides the legal representation required under Paraguayan residency law. Our partner law firm is bound by professional confidentiality obligations.',
          'Paraguayan government authorities, including immigration, the national police, the civil registry, the tax authority, and any other public body required to process your residency application.',
          'Notaries, translators, and other professionals based in Paraguay, where their involvement is needed to prepare or certify documents for your file.',
          'Service providers that support our business operations, such as our website hosting provider, our email provider, our analytics provider, and our cloud storage provider. These providers are bound by confidentiality and data protection obligations.',
          'Authorities or third parties when we are required to share information by law, by court order, or to protect our legal rights.',
        ],
      },
      {
        kind: 'p',
        text: 'We do not sell your personal information. We do not share it for marketing purposes. We do not transfer it to anyone outside the list above without your explicit consent.',
      },
    ],
  },
  {
    heading: '7. International data transfers',
    blocks: [
      {
        kind: 'p',
        text: 'We are based in Paraguay, and your personal information is stored on servers operated by us or by our service providers, which may be located outside Paraguay or outside your country of residence.',
      },
      {
        kind: 'p',
        text: 'Where your information is transferred outside the jurisdiction in which it was collected, we take reasonable steps to make sure it is protected to the standard required by applicable law, including, where appropriate, by relying on standard contractual clauses or equivalent legal safeguards.',
      },
    ],
  },
  {
    heading: '8. How long we keep your information',
    blocks: [
      {
        kind: 'p',
        text: 'We keep your personal information only for as long as we need it required by Paraguayan Government Laws.',
      },
      {
        kind: 'p',
        text: 'For active clients, we keep your information for the duration of our engagement and for any retention period required by Paraguayan law after the engagement ends. This typically includes any period during which we may be required to produce records to a Paraguayan authority, including tax and regulatory bodies.',
      },
      {
        kind: 'p',
        text: 'For enquiries that do not become engagements, we delete your information within a reasonable period after the enquiry is closed, unless we have a legal reason to keep it longer.',
      },
      {
        kind: 'p',
        text: 'For website analytics, we keep aggregated and anonymised data for as long as it is useful to improve our service.',
      },
    ],
  },
  {
    heading: '9. How we protect your information',
    blocks: [
      {
        kind: 'p',
        text: 'We use reasonable technical and organisational measures to protect your personal information from unauthorised access, loss, or misuse. These include encrypted storage, access controls, secure file transfer, and confidentiality obligations on our team and our partners.',
      },
      {
        kind: 'p',
        text: 'No system is completely secure. While we take protection seriously, we cannot guarantee that your information will never be subject to a security incident. If a serious incident affects your data, we will notify you in line with applicable law.',
      },
    ],
  },
  {
    heading: '10. Your rights',
    blocks: [
      {
        kind: 'p',
        text: 'Depending on the law that applies to you, you may have the following rights in relation to your personal information:',
      },
      {
        kind: 'ul',
        items: [
          'The right to access the personal information we hold about you.',
          'The right to have inaccurate or incomplete information corrected.',
          'The right to have your personal information deleted, where we are not required by law to keep it.',
          'The right to restrict or object to certain types of processing.',
          'The right to receive a copy of your personal information in a portable format.',
          'The right to withdraw any consent you have given us, without affecting any processing that has already taken place.',
          'The right to lodge a complaint with the data protection authority in your country.',
        ],
      },
      {
        kind: 'p',
        text: 'To exercise any of these rights, please contact us at hello@itajuresidency.com. We will respond within a reasonable time, in line with applicable law.',
      },
    ],
  },
  {
    heading: '11. Cookies and analytics',
    blocks: [
      {
        kind: 'p',
        text: 'Our website uses cookies and similar tracking technologies to improve your experience and to understand how visitors use the site. A full explanation of which cookies we use and how to manage them is set out in our Cookie Policy.',
      },
    ],
  },
  {
    heading: '12. Third party links',
    blocks: [
      {
        kind: 'p',
        text: 'Our website may contain links to third party websites. We are not responsible for the privacy practices of those websites. We encourage you to read the privacy policy of any website you visit through a link from our site.',
      },
    ],
  },
  {
    heading: '13. Children',
    blocks: [
      {
        kind: 'p',
        text: 'Our services are not directed at children under the age of 18. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us and we will delete it.',
      },
    ],
  },
  {
    heading: '14. Changes to this policy',
    blocks: [
      {
        kind: 'p',
        text: 'We may update this Privacy Policy from time to time. The current version is the one published on our website and dated at the top of this page. If we make a material change, we will notify clients with an active engagement and, where required, take any other step required by law.',
      },
    ],
  },
];

async function PrivacyPolicyPage() {
  return (
    <div>
      <SitePageHeader
        title="Privacy Policy"
        subtitle="How we collect, use, and protect your personal information."
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
              15. Contact
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed">
              For any question about this Privacy Policy, or to exercise any of
              your rights, please contact us at:
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

export default PrivacyPolicyPage;
