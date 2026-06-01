import type { Metadata } from 'next';
import Link from 'next/link';

import { ArrowRight } from 'lucide-react';

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
    title: 'A territorial tax system',
    body: 'Paraguay taxes what you earn inside Paraguay and leaves the rest alone. Corporate and personal income tax sit at a flat 10%. Foreign income is not taxed locally. There is no wealth tax and no inheritance tax. It is one of the simplest, lowest tax regimes in the Americas.',
  },
  {
    title: 'Clean energy in surplus',
    body: "The Itaipú dam is one of the largest hydroelectric plants in the world, and Paraguay's grid runs almost entirely on renewable hydropower. The country consumes only a fraction of what it generates, which leaves industrial electricity among the cheapest on earth. That surplus is already pulling in data centers and miners building on clean, renewable power.",
  },
  {
    title: 'A residency you can actually get',
    body: 'Paraguay offers one of the most accessible permanent residency routes in the world. The in person commitment is a single short trip, and you hold your status by visiting once every few years rather than living there full time. For people who value optionality, that is rare.',
  },
  {
    title: 'An economy crossing into investment grade',
    body: "In 2024, Moody's rated Paraguay investment grade for the first time. S&P followed at the end of 2025. Growth has run near 4%, inflation is low, and public debt is modest. Two of the three major agencies now treat Paraguay as a stable, predictable place to put long term money. Serious capital has noticed.",
  },
];

const PROOF = [
  { figure: '10%', label: 'flat income tax' },
  { figure: '~100%', label: 'renewable grid' },
  { figure: '2024 & 2025', label: 'investment grade' },
  { figure: '~4%', label: 'GDP growth' },
];

const VENTURES = [
  {
    name: 'Itaju Residency',
    status: 'Live' as const,
    body: 'Permanent residency in Paraguay, handled end to end. Lawyer led, paperwork done for you, one short trip on your side.',
    href: RESIDENCY_URL,
  },
  {
    name: 'Itaju Capital',
    status: 'Coming Soon' as const,
    body: 'For investors putting capital into Paraguay. We research the opportunities, handle acquisition, and manage what you own, so you can be invested here without being here.',
  },
  {
    name: 'Itaju Energy',
    status: 'Coming Soon' as const,
    body: "Turning Paraguay's hydro surplus into infrastructure: AI data centers and Bitcoin mining, running on clean, low cost, renewable power.",
  },
];

function Home() {
  return (
    <div className={'flex flex-col'}>
      {/* 1. Hero — typographic, left aligned, no background photo. */}
      <section className={'pt-16 pb-20 md:pt-24 md:pb-28'}>
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
              'font-display mt-8 max-w-5xl text-[2.75rem] leading-[1.04] font-medium tracking-tight text-balance sm:text-6xl lg:text-7xl'
            }
          >
            Paraguay is one of the fastest growing economies in South America.{' '}
            <span className={'text-gold'}>We&apos;re building from here.</span>
          </h1>

          <p
            className={
              'text-muted-foreground mt-8 max-w-2xl text-lg leading-relaxed md:text-xl'
            }
          >
            Itaju Group builds and operates ventures in Paraguay, a territorial
            tax jurisdiction with one of the lowest tax burdens in the Americas,
            among the lowest electricity costs in the world, and an economy that
            just crossed into investment grade. We&apos;re not chasing a
            turnaround. We&apos;re building where the growth already is.
          </p>

          <div className={'mt-10 flex flex-wrap items-center gap-3'}>
            <Link
              href={RESIDENCY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={
                'hover:border-gold hover:text-gold rounded-full border px-4 py-1.5 text-sm font-medium transition-colors'
              }
            >
              Residency
            </Link>
            <span
              className={
                'text-muted-foreground rounded-full border px-4 py-1.5 text-sm font-medium'
              }
            >
              Capital
            </span>
            <span
              className={
                'text-muted-foreground rounded-full border px-4 py-1.5 text-sm font-medium'
              }
            >
              Energy
            </span>
          </div>
        </div>
      </section>

      {/* 2. Thesis — short, left aligned, generous spacing. */}
      <section className={'py-16 md:py-20'}>
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

      {/* 3. Proof band — full width, dark, gold numerals. Visual centerpiece. */}
      <section className={'bg-neutral-950 py-20 text-white md:py-28'}>
        <div className={SHELL}>
          <div className={'grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-4'}>
            {PROOF.map((stat) => (
              <div key={stat.label} className={'flex flex-col'}>
                <span
                  className={
                    'text-gold-light font-display text-4xl font-medium tracking-tight md:text-5xl'
                  }
                >
                  {stat.figure}
                </span>
                <span className={'mt-3 text-sm text-neutral-300 md:text-base'}>
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Why Paraguay — numbered editorial list, 01–04. */}
      <section className={'py-20 md:py-28'}>
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

          <div className={'mt-14 flex flex-col'}>
            {WHY_PARAGUAY.map((item, i) => (
              <div
                key={item.title}
                className={
                  'grid grid-cols-1 gap-3 border-t border-neutral-200 py-8 md:grid-cols-[5rem_1fr] md:gap-10 md:py-10 dark:border-neutral-800'
                }
              >
                <span
                  className={
                    'text-gold font-display text-4xl leading-none font-medium tabular-nums md:text-5xl'
                  }
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className={'max-w-2xl'}>
                  <h3
                    className={
                      'font-display text-2xl font-medium tracking-tight md:text-3xl'
                    }
                  >
                    {item.title}
                  </h3>
                  <p
                    className={
                      'text-muted-foreground mt-3 text-base leading-relaxed md:text-lg'
                    }
                  >
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. The ventures — three cards, neutral image placeholder on top. */}
      <section className={'py-20 md:py-28'}>
        <div className={SHELL}>
          <h2
            className={
              'font-display max-w-2xl text-4xl font-medium tracking-tight md:text-5xl'
            }
          >
            What we&apos;re building
          </h2>

          <div className={'mt-12 grid gap-8 md:grid-cols-3'}>
            {VENTURES.map((v) => (
              <div key={v.name} className={'flex flex-col'}>
                {/* Neutral placeholder; real photography lands in a later pass. */}
                <div
                  className={
                    'aspect-[4/3] w-full rounded-lg border border-neutral-200 bg-gradient-to-br from-neutral-100 to-neutral-200 dark:border-neutral-800 dark:from-neutral-800 dark:to-neutral-900'
                  }
                />

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

      {/* 6. Closing — one strong statement + styled button. */}
      <section className={'py-24 md:py-32'}>
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
