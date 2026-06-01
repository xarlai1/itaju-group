import React from 'react';

import { cn } from '../../lib/utils';

interface EcosystemShowcaseProps extends React.HTMLAttributes<HTMLDivElement> {
  heading: React.ReactNode;
  description?: React.ReactNode;
  pill?: React.ReactNode;
  cta?: React.ReactNode;
  textPosition?: 'left' | 'right';
}

export const EcosystemShowcase: React.FC<EcosystemShowcaseProps> =
  function EcosystemShowcaseComponent({
    className,
    heading,
    description,
    pill,
    cta,
    textPosition = 'left',
    children,
    ...props
  }) {
    return (
      <div
        className={cn(
          'bg-muted/50 flex flex-1 flex-col space-y-8 rounded-md p-6 lg:space-y-0 lg:space-x-16',
          className,
          {
            'lg:flex-row': textPosition === 'left',
            'lg:flex-row-reverse': textPosition === 'right',
          },
        )}
        {...props}
      >
        <div
          className={cn('flex h-full w-full flex-col gap-y-4 lg:w-1/3', {
            'items-start text-left': textPosition === 'left',
            'items-start text-left lg:items-end lg:text-right':
              textPosition === 'right',
          })}
        >
          {pill && <div>{pill}</div>}

          <h2 className="text-secondary-foreground text-3xl font-normal tracking-tight">
            {heading}
          </h2>

          {description && (
            <p className="text-muted-foreground mt-2 text-base lg:text-lg">
              {description}
            </p>
          )}

          {cta && <div className="mt-2">{cta}</div>}
        </div>

        <div className="flex w-full lg:w-2/3">{children}</div>
      </div>
    );
  };
