import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { ArrowRight, Landmark, Plane, TrendingUp, Zap } from 'lucide-react';

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

// Shared horizontal gutter + max width for every section's content column.
const SHELL = 'mx-auto w-full max-w-6xl px-6 lg:px-10';

const WHY_PARAGUAY = [
  {
    icon: Landmark,
    title: 'A territorial tax system',
    body: 'Paraguay taxes what you earn inside Paraguay and leaves the rest alone. Corporate and personal income tax sit at a flat 10%. Foreign income is not taxed locally. There is no wealth tax and no inheritance tax. It is one of the simplest, lowest tax regimes in the Americas.',
  },
  {
    icon: Zap,
    title: 'Clean energy in surplus',
    body: "The Itaipú dam is one of the largest hydroelectric plants in the world, and Paraguay's grid runs almost entirely on renewable hydropower. The country consumes only a fraction of what it generates, which leaves industrial electricity among the cheapest on earth. That surplus is already pulling in data centers and miners building on clean, renewable power.",
  },
  {
    icon: Plane,
    title: 'A residency you can actually get',
    body: 'Paraguay offers one of the most accessible permanent residency routes in the world. The in person commitment is a single short trip, and you hold your status by visiting once every few years rather than living there full time. For people who value optionality, that is rare.',
  },
  {
    icon: TrendingUp,
    title: 'An economy crossing into investment grade',
    body: "In 2024, Moody's rated Paraguay investment grade for the first time. S&P followed at the end of 2025. Growth has run near 4%, inflation is low, and public debt is modest. Two of the three major agencies now treat Paraguay as a stable, predictable place to put long term money. Serious capital has noticed.",
  },
];

const VENTURES = [
  {
    name: 'Itaju Residency',
    status: 'Live' as const,
    body: 'A second residency in Paraguay, secured end to end, with one short trip required.',
    href: RESIDENCY_URL,
    image: '/images/ventures/residency.jpg',
    alt: 'A deep red Paraguayan passport on a wooden desk beside an official document',
  },
  {
    name: 'Itaju Capital',
    status: 'Coming Soon' as const,
    body: 'For investors putting capital into Paraguay. We research the opportunities, handle acquisition, and manage what you own, so you can be invested here without being here.',
    image: '/images/ventures/capital.jpg',
    alt: 'A stack of gold bars on a dark surface',
  },
  {
    name: 'Itaju Energy',
    status: 'Coming Soon' as const,
    body: "Turning Paraguay's hydro surplus into infrastructure: AI data centers & Bitcoin mining farms, running on clean, cost efficient renewable energy.",
    image: '/images/ventures/energy.jpg',
    alt: 'Turquoise water surging through a concrete hydroelectric spillway',
  },
];

function Home() {
  return (
    <div className={'flex flex-col'}>
      {/* 1. Hero — typographic, left aligned, no background photo. */}
      <section className={'py-10 md:py-12'}>
        <div className={SHELL}>
          <span
            className={
              'text-muted-foreground inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium tracking-[0.2em] uppercase'
            }
          >
            Itaju Group
          </span>

          <h1
            className={
              'font-display mt-6 max-w-5xl text-[2.75rem] leading-[1.04] font-medium tracking-tight text-balance sm:text-6xl lg:text-7xl'
            }
          >
            Paraguay is one of the fastest growing economies in South America.{' '}
            <span className={'text-gold'}>We&apos;re building from here.</span>
          </h1>

          <p
            className={
              'text-muted-foreground mt-6 max-w-2xl text-lg leading-relaxed md:text-xl'
            }
          >
            Itaju Group builds and operates ventures in Paraguay, a territorial
            tax jurisdiction with one of the lowest tax burdens in the Americas,
            among the lowest electricity costs in the world, and an economy that
            just crossed into investment grade. We&apos;re not chasing a
            turnaround. We&apos;re building where the growth already is.
          </p>
        </div>
      </section>

      {/* 2. The ventures — three cards, neutral image placeholder on top. */}
      <section className={'py-10 md:py-12'}>
        <div className={SHELL}>
          <div className={'grid gap-8 md:grid-cols-3'}>
            {VENTURES.map((v) => (
              <div key={v.name} className={'flex flex-col'}>
                {/* Venture photography. Same aspect/size as the prior
                    placeholder (aspect-[4/3] w-full rounded-lg) so the layout
                    holds; fill + object-cover crops cleanly, overflow-hidden
                    keeps the rounded corners. */}
                <div
                  className={
                    'relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-800'
                  }
                >
                  <Image
                    src={v.image}
                    alt={v.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className={'object-cover'}
                  />
                </div>

                <div className={'mt-5 flex items-center gap-3'}>
                  <h3 className={'font-display text-2xl font-medium'}>
                    {v.name}
                  </h3>
                  {v.status === 'Live' ? (
                    <span
                      className={
                        'bg-gold inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold tracking-wide text-white'
                      }
                    >
                      Live
                    </span>
                  ) : (
                    <span
                      className={
                        'bg-muted text-muted-foreground inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium tracking-wide'
                      }
                    >
                      Coming Soon
                    </span>
                  )}
                </div>

                <p
                  className={
                    'text-muted-foreground mt-3 text-base leading-relaxed'
                  }
                >
                  {v.body}
                </p>

                {v.href ? (
                  <Link
                    href={v.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={
                      'text-gold mt-4 inline-flex items-center gap-x-1 text-sm font-medium hover:underline'
                    }
                  >
                    <span>Visit Itaju Residency</span>
                    <ArrowRight className={'h-4 w-4'} />
                  </Link>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Thesis — single full width text block: heading then paragraph. */}
      <section className={'py-10 md:py-12'}>
        <div className={SHELL}>
          <h2
            className={
              'font-display max-w-3xl text-3xl font-medium tracking-tight md:text-4xl'
            }
          >
            We&apos;re building a base, not placing a bet.
          </h2>
          <p
            className={
              'text-muted-foreground mt-6 max-w-3xl text-lg leading-relaxed'
            }
          >
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
        </div>
      </section>

      {/* 4. Why Paraguay — 2x2 icon grid with gold lucide icons. */}
      <section className={'py-10 md:py-12'}>
        <div className={SHELL}>
          <h2
            className={
              'font-display text-4xl font-medium tracking-tight md:text-5xl'
            }
          >
            Why Paraguay
          </h2>
          <p className={'text-muted-foreground mt-4 max-w-2xl text-lg'}>
            The case is structural, not seasonal. Four reasons serious money is
            showing up.
          </p>

          {/* Each card is a row-axis subgrid spanning 3 tracks (icon, title,
              body). Sharing the parent's row tracks makes the title track the
              same height across a row, so the body paragraphs start at the same
              vertical position even when titles wrap to different line counts. */}
          <div className={'mt-6 grid gap-6 sm:grid-cols-2'}>
            {WHY_PARAGUAY.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className={
                    'row-span-3 grid grid-rows-subgrid content-start gap-y-3 rounded-lg border border-neutral-200 p-6 md:p-8 dark:border-neutral-800'
                  }
                >
                  <Icon
                    className={'text-gold h-7 w-7 self-start'}
                    strokeWidth={1.5}
                    aria-hidden
                  />
                  <h3
                    className={
                      'font-display self-start text-2xl font-medium tracking-tight md:text-3xl'
                    }
                  >
                    {item.title}
                  </h3>
                  <p
                    className={
                      'text-muted-foreground self-start text-base leading-relaxed md:text-lg'
                    }
                  >
                    {item.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Closing — one strong statement + styled button. Extra bottom
          padding: the footer has its own background, so its top edge is the
          visual boundary. Doubling the bottom padding makes the button → footer
          gap match the standard section-to-section rhythm (two sections' worth
          of py-10 md:py-12). */}
      <section className={'pt-10 pb-20 md:pt-12 md:pb-24'}>
        <div className={SHELL}>
          <h2
            className={
              'font-display max-w-4xl text-4xl leading-[1.08] font-medium tracking-tight md:text-6xl'
            }
          >
            Early is the whole point.
          </h2>
          <p
            className={
              'text-muted-foreground mt-6 max-w-2xl text-lg leading-relaxed'
            }
          >
            Paraguay is being discovered in real time, and the ground floor
            doesn&apos;t stay open for long. Residency is live. Capital and
            Energy are next. This is the base, and everything we do gets built
            on top of it.
          </p>

          <Link
            href={RESIDENCY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={
              'mt-10 inline-flex items-center gap-x-2 rounded-full bg-neutral-950 px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200'
            }
          >
            <span>Start with Residency</span>
            <ArrowRight className={'h-4 w-4'} />
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
