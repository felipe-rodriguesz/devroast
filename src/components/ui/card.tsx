import { forwardRef, type HTMLAttributes } from "react";

import { twMerge } from "tailwind-merge";
import { tv, type VariantProps } from "tailwind-variants";

const cardVariants = tv(
  {
    base: "rounded-md border border-neutral-800 p-5",
    variants: {
      variant: {
        default: "bg-transparent",
        critical: "border-accent-red/50",
        warning: "border-accent-amber/50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
  {
    twMerge: false,
  },
);

export interface CardProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <div
        className={twMerge(cardVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);

Card.displayName = "Card";

export { Card, cardVariants };
