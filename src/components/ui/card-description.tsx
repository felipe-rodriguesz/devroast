import { forwardRef, type HTMLAttributes } from 'react';

export interface CardDescriptionProps
  extends HTMLAttributes<HTMLParagraphElement> {}

const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className="font-mono text-xs text-neutral-400 leading-relaxed"
        {...props}
      />
    );
  },
);

CardDescription.displayName = 'CardDescription';

export { CardDescription };
