import { forwardRef, type HTMLAttributes } from 'react';

import { twMerge } from 'tailwind-merge';
import { tv, type VariantProps } from 'tailwind-variants';

const badgeVariants = tv(
  {
    base: 'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-xs font-medium font-mono transition-colors',
    variants: {
      variant: {
        critical: 'bg-red-950 text-orange-500 border border-red-900',
        warning: 'bg-amber-950 text-amber-500 border border-amber-900',
        good: 'bg-green-950 text-green-500 border border-green-900',
        verdict: 'bg-orange-950 text-orange-500 border border-orange-900',
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

export interface BadgeProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <div
        className={twMerge(badgeVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);

Badge.displayName = 'Badge';

export { Badge, badgeVariants };
