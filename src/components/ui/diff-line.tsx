import { forwardRef, type HTMLAttributes } from 'react';

import { twMerge } from 'tailwind-merge';
import { tv, type VariantProps } from 'tailwind-variants';

const diffLineVariants = tv(
  {
    base: 'flex items-center gap-3 font-mono text-sm',
    variants: {
      variant: {
        removed: 'bg-red-950 text-orange-500',
        added: 'bg-green-950 text-green-500',
        context: 'text-neutral-400',
      },
    },
    defaultVariants: {
      variant: 'context',
    },
  },
  {
    twMerge: false,
  },
);

export interface DiffLineProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof diffLineVariants> {
  lineNumber?: number;
}

const DiffLine = forwardRef<HTMLDivElement, DiffLineProps>(
  ({ className, variant, lineNumber, children, ...props }, ref) => {
    return (
      <div
        className={twMerge(diffLineVariants({ variant, className }))}
        ref={ref}
        {...props}
      >
        {lineNumber !== undefined && (
          <span className="w-8 text-right text-neutral-500 select-none">
            {lineNumber}
          </span>
        )}
        <span className="flex-1">{children}</span>
      </div>
    );
  },
);

DiffLine.displayName = 'DiffLine';

export { DiffLine, diffLineVariants };
