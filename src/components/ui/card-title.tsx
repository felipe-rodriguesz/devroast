import { forwardRef, type HTMLAttributes } from 'react';

export interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {}

const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, ...props }, ref) => {
    return (
      <h3 ref={ref} className="font-mono text-sm text-neutral-50" {...props} />
    );
  },
);

CardTitle.displayName = 'CardTitle';

export { CardTitle };
