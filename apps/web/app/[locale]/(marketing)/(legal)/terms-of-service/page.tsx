import Link from 'next/link';

import { getTranslations } from 'next-intl/server';

import { SitePageHeader } from '~/(marketing)/_components/site-page-header';

const LAST_UPDATED = 'May 22, 2026';
const CONTACT_EMAIL = 'hello@itajuresidency.com';

export async function generateMetadata() {
  const t = await getTranslations('marketing');

  return {
    title: t('termsOfService'),
    alternates: { canonical: '/terms-of-service' },
  };
}

type Block = { kind: 'p'; text: string } | { kind: 'ul'; items: string[] };

type Section = { heading: string; blocks: Block[] };

const sections: Section[] = [
  {
    heading: '1. About these Terms',
    blocks: [
      {
        kind: 'p',
        text: 'These Terms and Conditions (the "Terms") govern your access to and use of the website operated by Itaju Residency E.A.S (the "Company", "we", "us", or "our"), and any services we provide through it. By using our website or engaging our services, you agree to be bound by these Terms.',
      },
      {
        kind: 'p',
        text: 'If you do not agree with any part of these Terms, you must not use our website or our services.',
      },
    ],
  },
  {
    heading: '2. Who we are',
    blocks: [
      {
        kind: 'p',
        text: 'We are a residency advisory service based in Asunción, Paraguay, providing preparation, coordination, and filing support for clients seeking Paraguayan residency. We work alongside an independent partner law firm in Paraguay, which provides the legal representation required under Paraguayan law.',
      },
      {
        kind: 'p',
        text: 'We are not a law firm. The legal work involved in your residency filing is carried out by our partner lawyer, who acts on your behalf under a separate engagement.',
      },
    ],
  },
  {
    heading: '3. The services we provide',
    blocks: [
      {
        kind: 'p',
        text: 'Our services include the preparation and coordination of documents, scheduling and attendance at appointments in Asunción, lawyer representation through our partner law firm, and the filing of your residency application with the relevant Paraguayan authorities.',
      },
      {
        kind: 'p',
        text: 'A full list of what is included in our flat fee is published on our Pricing page. Anything not listed there is not included.',
      },
      {
        kind: 'p',
        text: 'We do not provide tax advice, financial advice, immigration advice for any country other than Paraguay, or any service we have not expressly agreed to in writing.',
      },
    ],
  },
  {
    heading: '4. No guarantee of government outcome',
    blocks: [
      {
        kind: 'p',
        text: 'We prepare and file your residency application with care and to the standard expected of a professional advisory service. However, the final decision on your residency application is made by the Paraguayan government, not by us.',
      },
      { kind: 'p', text: 'You agree and understand that we cannot guarantee:' },
      {
        kind: 'ul',
        items: [
          'That your residency application will be approved.',
          'The exact time the government will take to issue a decision.',
          'That government fees, requirements, processes, or timelines will not change after you have engaged us.',
        ],
      },
      {
        kind: 'p',
        text: 'We are responsible for doing our work properly. We are not responsible for the outcome of government decisions or for delays caused by government authorities.',
      },
    ],
  },
  {
    heading: '5. Your responsibilities',
    blocks: [
      { kind: 'p', text: 'To allow us to do our work properly, you agree to:' },
      {
        kind: 'ul',
        items: [
          'Provide accurate, complete, and truthful information at all times.',
          'Provide all documents we request in the form and within the timeframes we communicate.',
          'Apostille, legalise, or translate your home country documents as required, before you arrive in Paraguay.',
          'Attend all in person appointments in Asunción during the agreed window.',
          'Sign documents where required, in person or through a recognised legal channel.',
          'Inform us immediately if any of your circumstances change in a way that may affect your application.',
        ],
      },
      {
        kind: 'p',
        text: 'If you provide false, misleading, or incomplete information, we may suspend or terminate our service to you, and you will not be entitled to a refund.',
      },
    ],
  },
  {
    heading: '6. Fees and payment',
    blocks: [
      {
        kind: 'p',
        text: 'Our fee for the residency service is published on our Pricing page and confirmed to you in writing before you engage us.',
      },
      {
        kind: 'p',
        text: 'The fee is payable in the manner and on the schedule we agree with you at the start of the engagement. Payment terms, deposit amounts, and milestone payments (if any) will be confirmed in writing before any work begins.',
      },
      {
        kind: 'p',
        text: 'All fees are quoted in United States Dollars (USD) unless otherwise agreed. Any bank fees, exchange fees, or international transfer charges are your responsibility.',
      },
      {
        kind: 'p',
        text: 'The fee does not include translation fees, your flights, your accommodation during your visit to Paraguay, the apostille or legalisation of your home country documents, international postage of your documents, or any Paraguayan government fees that are not listed as included on our Pricing page.',
      },
    ],
  },
  {
    heading: '7. No refunds once work has started',
    blocks: [
      {
        kind: 'p',
        text: 'Once we have begun work on your residency application, all fees paid are non refundable.',
      },
      {
        kind: 'p',
        text: '"Begun work" includes, but is not limited to, any of the following:',
      },
      {
        kind: 'ul',
        items: [
          'Reviewing or processing your documents.',
          'Instructing or engaging our lawyer on your behalf.',
          'Booking any appointment with a Paraguayan authority, notary, or third party on your behalf.',
          'Translating or notarising any document for your file.',
          'Filing any document with the Paraguayan government.',
        ],
      },
      {
        kind: 'p',
        text: 'You acknowledge that we incur real costs and commit real time as soon as your file is opened, and that our fee reflects the full service from start to finish. By engaging us, you accept that no refund is payable once any of the above steps have been taken.',
      },
      {
        kind: 'p',
        text: 'Whether a refund is payable in the narrow window before any work has started is at our sole discretion and will be communicated to you in writing.',
      },
    ],
  },
  {
    heading: '8. Cancellation and termination',
    blocks: [
      {
        kind: 'p',
        text: 'You may cancel your engagement with us at any time by written notice. However, in accordance with Section 7, no refund will be payable once work has started.',
      },
      {
        kind: 'p',
        text: 'We may terminate our engagement with you, with immediate effect and without refund, if you:',
      },
      {
        kind: 'ul',
        items: [
          'Provide false, misleading, or incomplete information.',
          'Fail to provide the documents or information we need within the agreed timeframes.',
          'Behave abusively toward our team or our partners.',
          "Ask us to do anything that is unlawful or that would put our licence, our partners' licences, or your application at risk.",
          'Use our services for any purpose other than the legitimate pursuit of Paraguayan residency.',
        ],
      },
      {
        kind: 'p',
        text: 'On termination, we will deliver to you any documents that belong to you and that we hold, subject to any legal or professional retention obligations.',
      },
    ],
  },
  {
    heading: '9. Confidentiality and data',
    blocks: [
      {
        kind: 'p',
        text: 'We treat your personal information and documents as confidential. We only share them with our partner law firm and with Paraguayan authorities to the extent required to deliver our service.',
      },
      {
        kind: 'p',
        text: 'Our handling of your personal data is governed by our Privacy Policy, which forms part of these Terms.',
      },
    ],
  },
  {
    heading: '10. Intellectual property',
    blocks: [
      {
        kind: 'p',
        text: 'All content on our website, including text, branding, logos, and graphics, is owned by us or our licensors. You may not copy, reproduce, republish, or use any of our content for commercial purposes without our prior written consent.',
      },
    ],
  },
  {
    heading: '11. Website use',
    blocks: [
      {
        kind: 'p',
        text: 'Our website is provided for informational purposes only. Nothing on our website constitutes legal, tax, or financial advice. You should not rely on any information published on our website as a substitute for professional advice.',
      },
      {
        kind: 'p',
        text: 'We try to keep our website accurate and up to date, but we do not warrant that the content is free from errors or omissions, or that the website will be available at all times.',
      },
    ],
  },
  {
    heading: '12. Limitation of liability',
    blocks: [
      { kind: 'p', text: 'To the maximum extent permitted by Paraguayan law:' },
      {
        kind: 'ul',
        items: [
          'We are not liable for any loss or damage arising from the decisions, delays, or actions of the Paraguayan government or any third party.',
          'We are not liable for any indirect, consequential, or special loss, including loss of profits, loss of opportunity, or loss of business.',
          'Our total liability to you, for any claim arising out of or in connection with our services, is limited to the total fees you have paid us under the engagement.',
        ],
      },
      {
        kind: 'p',
        text: 'Nothing in these Terms limits any liability that cannot be limited under Paraguayan law.',
      },
    ],
  },
  {
    heading: '13. Force majeure',
    blocks: [
      {
        kind: 'p',
        text: 'We are not liable for any failure or delay in performing our obligations where that failure or delay is caused by events outside our reasonable control, including natural disasters, strikes, government action, changes in law, war, civil unrest, pandemics, or failures of public infrastructure or communication networks.',
      },
    ],
  },
  {
    heading: '14. Changes to these Terms',
    blocks: [
      {
        kind: 'p',
        text: 'We may update these Terms from time to time. The current version is the one published on our website and dated at the top of this page. If you have an active engagement with us, any change to these Terms will not apply to your existing engagement unless we agree it with you in writing.',
      },
    ],
  },
  {
    heading: '15. Governing law and jurisdiction',
    blocks: [
      {
        kind: 'p',
        text: 'These Terms are governed by the laws of the Republic of Paraguay.',
      },
      {
        kind: 'p',
        text: 'Any dispute arising out of or in connection with these Terms, our website, or our services will be subject to the exclusive jurisdiction of the competent courts of Asunción, Paraguay.',
      },
    ],
  },
  {
    heading: '16. Complaints',
    blocks: [
      {
        kind: 'p',
        text: 'If you are unhappy with our service, we want to know. Please contact us first at hello@itajuresidency.com with a clear description of your concern, and we will respond in writing within a reasonable time.',
      },
    ],
  },
];

async function TermsOfServicePage() {
  return (
    <div>
      <SitePageHeader
        title="Terms and Conditions"
        subtitle="The rules that govern your use of our website and our services."
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
              17. Contact
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed">
              For any question about these Terms, please contact us at:
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

export default TermsOfServicePage;
