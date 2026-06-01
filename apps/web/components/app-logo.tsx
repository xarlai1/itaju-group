import Link from 'next/link';

import { cn } from '@kit/ui/utils';

export function LogoImage({ className }: { className?: string }) {
  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src="/images/logo.svg"
      alt="Itaju Group"
      className={cn('h-12 w-auto sm:h-14', className)}
    />
  );
}

export function AppLogo({
  href,
  label,
  className,
}: {
  href?: string | null;
  className?: string;
  label?: string;
}) {
  if (href === null) {
    return <LogoImage className={className} />;
  }

  return (
    <Link
      aria-label={label ?? 'Itaju Group'}
      href={href ?? '/'}
      prefetch={true}
      className="mx-auto md:mx-0"
    >
      <LogoImage className={className} />
    </Link>
  );
}
