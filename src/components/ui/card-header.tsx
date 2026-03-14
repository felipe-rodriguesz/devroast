import { forwardRef, type HTMLAttributes } from 'react';

import { twMerge } from 'tailwind-merge';
import { tv, type VariantProps } from 'tailwind-variants';

const cardHeaderVariants = tv(
  {
    base: 'flex items-center gap-2',
    variants: {
      variant: {
        critical: '',
        warning: '',
        good: '',
        verdict: '',
      },
    },
    defaultVariants: {
      variant: 'good',
    },
  },
  {
    twMerge: false,
  },
);

const dotVariants = tv(
  {
    base: 'rounded-full',
    variants: {
      variant: {
        critical: 'bg-accent-red',
        warning: 'bg-accent-amber',
        good: 'bg-accent-green',
        verdict: 'bg-accent-orange',
      },
    },
    defaultVariants: {
      variant: 'good',
    },
  },
  {
    twMerge: false,
  },
);

const labelVariants = tv(
  {
    base: 'font-mono text-xs font-normal',
    variants: {
      variant: {
        critical: 'text-accent-red',
        warning: 'text-accent-amber',
        good: 'text-accent-green',
        verdict: 'text-accent-orange',
      },
    },
    defaultVariants: {
      variant: 'good',
    },
  },
  {
    twMerge: false,
  },
);

export interface CardHeaderProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardHeaderVariants> {
  label: string;
}

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, variant, label, ...props }, ref) => {
    return (
      <div
        className={twMerge(cardHeaderVariants({ variant, className }))}
        ref={ref}
        {...props}
      >
        <div className={dotVariants({ variant })}>
          <div className="h-2 w-2" />
        </div>
        <span className={labelVariants({ variant })}>{label}</span>
      </div>
    );
  },
);

CardHeader.displayName = 'CardHeader';

export { CardHeader, cardHeaderVariants, dotVariants, labelVariants };
