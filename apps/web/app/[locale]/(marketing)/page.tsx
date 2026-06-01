import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { ArrowRight } from 'lucide-react';

import { Card, CardContent } from '@kit/ui/card';
import {
  FeatureCard,
  FeatureGrid,
  FeatureShowcase,
  Hero,
  Pill,
  SecondaryHero,
} from '@kit/ui/marketing';

const RESIDENCY_URL = 'https://itajuresidency.com';

// Home page title + description per the Itaju Group brief. openGraph/twitter
// titles are set here too so sharing the homepage shows the Group branding
// (the site-wide default title still comes from NEXT_PUBLIC_SITE_TITLE).
const TITLE = 'Itaju Group | Building in Paraguay: Residency, Capital, Energy';
const DESCRIPTION =
  'Itaju Group builds ventures in Paraguay: permanent residency, investment, and clean energy infrastructure. One country, three doors.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  // Self-referencing canonical. Resolved against metadataBase
  // (https://itajugroup.com).
  alternates: { canonical: '/' },
  openGraph: { title: TITLE, description: DESCRIPTION },
  twitter: { title: TITLE, description: DESCRIPTION },
};

function Home() {
  return (
    <div className={'mt-4 flex flex-col space-y-16 py-10'}>
      {/* 1. Hero — typographic statement, no hero image. */}
      <div className={'mx-auto'}>
        <Hero
          className={'space-y-6'}
          pill={<Pill label={'Itaju Group'} />}
          title={
            <span className="text-secondary-foreground -mt-2 leading-[0.95] text-balance">
              Paraguay is one of the fastest growing economies in South America.
              We&apos;re building from here.
            </span>
          }
          subtitle={
            <span className="mx-auto block max-w-[62ch] text-xl text-balance">
              Itaju Group builds and operates ventures in Paraguay, a
              territorial tax jurisdiction with one of the lowest tax burdens in
              the Americas, among the lowest electricity costs in the world, and
              an economy that just crossed into investment grade. We&apos;re not
              chasing a turnaround. We&apos;re building where the growth already
              is.
            </span>
          }
          cta={<VentureLinks />}
        />
      </div>

      {/* 2. The Idea — SecondaryHero. */}
      <div className={'container mx-auto'}>
        <SecondaryHero heading={"We're building a base, not placing a bet."}>
          <p className="text-muted-foreground mx-auto max-w-3xl text-base text-balance lg:text-lg">
            Most people meet Paraguay as a line item, a cheaper tax bill, a
            second status, a place to park. We see it differently. Paraguay is a
            small country doing the hard things right: a stable currency, low
            debt, open to capital, and sitting on an energy surplus most nations
            would build an entire economy around. The opportunity here is not
            hidden. It is early, and it is compounding. Itaju Group exists to
            build inside that growth, to put down real roots across the things
            that matter when you move your life or your capital somewhere new.
            Where to live. How to operate. What to build. We start with three.
          </p>
        </SecondaryHero>
      </div>

      {/* 3. Why Paraguay — FeatureShowcase + FeatureGrid (4 cards, 2x2). */}
      <div className={'container mx-auto'}>
        <FeatureShowcase
          className={'space-y-4'}
          heading={
            <>
              <b className="font-medium tracking-tight dark:text-white">
                Why Paraguay
              </b>
              .{' '}
              <span className="text-secondary-foreground/70 block text-base font-normal tracking-tight lg:text-lg">
                The case is structural, not seasonal. Four reasons serious money
                is showing up.
              </span>
            </>
          }
        >
          <FeatureGrid className={'md:mt-3 md:grid-cols-2 lg:grid-cols-2'}>
            <FeatureCard
              className={'h-full max-w-full'}
              label={'A territorial tax system'}
              description={`Paraguay taxes what you earn inside Paraguay and leaves the rest alone. Corporate and personal income tax sit at a flat 10%. Foreign income is not taxed locally. There is no wealth tax and no inheritance tax. It is one of the simplest, lowest tax regimes in the Americas.`}
            />
            <FeatureCard
              className={'h-full max-w-full'}
              label={'Clean energy in surplus'}
              description={`The Itaipú dam is one of the largest hydroelectric plants in the world, and Paraguay's grid runs almost entirely on renewable hydropower. The country consumes only a fraction of what it generates, which leaves industrial electricity among the cheapest on earth. That surplus is already pulling in data centers and miners building on clean, renewable power.`}
            />
            <FeatureCard
              className={'h-full max-w-full'}
              label={'A residency you can actually get'}
              description={`Paraguay offers one of the most accessible permanent residency routes in the world. The in person commitment is a single short trip, and you hold your status by visiting once every few years rather than living there full time. For people who value optionality, that is rare.`}
            />
            <FeatureCard
              className={'h-full max-w-full'}
              label={'An economy crossing into investment grade'}
              description={`In 2024, Moody's rated Paraguay investment grade for the first time. S&P followed at the end of 2025. Growth has run near 4%, inflation is low, and public debt is modest. Two of the three major agencies now treat Paraguay as a stable, predictable place to put long term money. Serious capital has noticed.`}
            />
          </FeatureGrid>
        </FeatureShowcase>
      </div>

      {/* 4. The Ventures — full width image band above three venture cards. */}
      <div className={'container mx-auto'}>
        <div className={'flex flex-col gap-y-8'}>
          <FeatureShowcase
            className={'space-y-4'}
            heading={
              <b className="font-medium tracking-tight dark:text-white">
                What we&apos;re building
              </b>
            }
          />

          <div
            className={
              'relative aspect-[21/9] w-full overflow-hidden rounded-lg'
            }
          >
            <Image
              priority
              fill
              sizes="100vw"
              className={'object-cover'}
              src={'/images/hero.png'}
              alt={
                'Wide view of Asunción at golden hour with the Río Paraguay visible.'
              }
            />
          </div>

          <FeatureGrid>
            <VentureCard
              name={'Itaju Residency'}
              status={'Live'}
              description={`Permanent residency in Paraguay, handled end to end. Lawyer led, paperwork done for you, one short trip on your side.`}
              href={RESIDENCY_URL}
            />
            <VentureCard
              name={'Itaju Capital'}
              status={'Coming Soon'}
              description={`For investors putting capital into Paraguay. We research the opportunities, handle acquisition, and manage what you own, so you can be invested here without being here.`}
            />
            <VentureCard
              name={'Itaju Energy'}
              status={'Coming Soon'}
              description={`Turning Paraguay's hydro surplus into infrastructure: AI data centers and Bitcoin mining, running on clean, low cost, renewable power.`}
            />
          </FeatureGrid>
        </div>
      </div>

      {/* 5. Closing — SecondaryHero. */}
      <div className={'container mx-auto'}>
        <SecondaryHero heading="Early is the whole point.">
          <p className="text-muted-foreground mx-auto max-w-2xl text-base text-balance lg:text-lg">
            Paraguay is being discovered in real time, and the ground floor
            doesn&apos;t stay open for long. Residency is live. Capital and
            Energy are next. This is the base, and everything we do gets built on
            top of it.
          </p>

          <Link
            href={RESIDENCY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-secondary-foreground hover:text-foreground mt-2 inline-flex items-center gap-x-1 text-sm font-medium"
          >
            <span>Start with Residency</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </SecondaryHero>
      </div>
    </div>
  );
}

export default Home;

// The three venture names as inline links under the hero. Residency is live
// and links out; Capital and Energy are not yet live, so they render as
// non-interactive labels alongside it.
function VentureLinks() {
  return (
    <div
      className={
        'text-secondary-foreground flex items-center justify-center gap-x-3 text-sm font-medium'
      }
    >
      <Link
        href={RESIDENCY_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-foreground hover:underline"
      >
        Residency
      </Link>
      <span className="text-muted-foreground/40">·</span>
      <span className="text-muted-foreground">Capital</span>
      <span className="text-muted-foreground/40">·</span>
      <span className="text-muted-foreground">Energy</span>
    </div>
  );
}

function VentureCard({
  name,
  status,
  description,
  href,
}: {
  name: string;
  status: 'Live' | 'Coming Soon';
  description: string;
  href?: string;
}) {
  return (
    <Card className={'h-full'}>
      <CardContent className={'flex h-full flex-col gap-y-4 p-6'}>
        <div className={'flex items-center justify-between gap-x-3'}>
          <h3 className={'text-secondary-foreground text-lg font-medium'}>
            {name}
          </h3>
          <Pill label={status} />
        </div>

        <p className={'text-muted-foreground flex-1 text-sm'}>{description}</p>

        {href ? (
          <Link
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-secondary-foreground hover:text-foreground inline-flex items-center gap-x-1 text-sm font-medium"
          >
            <span>Visit Itaju Residency</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        ) : null}
      </CardContent>
    </Card>
  );
}
