import { forwardRef, type HTMLAttributes } from "react";

export interface CardContentProps extends HTMLAttributes<HTMLDivElement> {}

const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={className} {...props} />;
  },
);

CardContent.displayName = "CardContent";

export { CardContent };
