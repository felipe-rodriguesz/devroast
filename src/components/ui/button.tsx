import { type ButtonHTMLAttributes, forwardRef } from 'react';

import { twMerge } from 'tailwind-merge';
import { tv, type VariantProps } from 'tailwind-variants';

const buttonVariants = tv(
  {
    base: 'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
    variants: {
      variant: {
        default:
          'bg-accent-green text-neutral-950 enabled:hover:bg-accent-green/90 focus-visible:ring-accent-green',
        secondary:
          'bg-neutral-800 text-neutral-50 enabled:hover:bg-neutral-700 focus-visible:ring-neutral-800',
        outline:
          'border border-neutral-800 bg-transparent enabled:hover:bg-neutral-800 enabled:hover:text-neutral-50 focus-visible:ring-neutral-800',
        ghost:
          'enabled:hover:bg-neutral-800 enabled:hover:text-neutral-50 focus-visible:ring-neutral-800',
        destructive:
          'bg-accent-red text-neutral-50 enabled:hover:bg-accent-red/90 focus-visible:ring-accent-red',
        link: 'text-accent-green underline-offset-4 enabled:hover:underline',
      },
      size: {
        default: 'h-10 px-6 py-2.5',
        sm: 'h-8 px-3 text-xs',
        lg: 'h-12 px-8 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
  {
    twMerge: false,
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={twMerge(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);

Button.displayName = 'Button';

export { Button, buttonVariants };
