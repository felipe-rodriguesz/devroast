import { type ButtonHTMLAttributes, forwardRef, useState } from 'react';

import { twMerge } from 'tailwind-merge';
import { tv, type VariantProps } from 'tailwind-variants';

const toggleVariants = tv(
  {
    base: 'inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
    variants: {
      variant: {
        default:
          'bg-neutral-800 text-white hover:bg-neutral-700 focus-visible:ring-neutral-800 data-[pressed]:bg-accent-green data-[pressed]:text-black',
        outline:
          'border border-neutral-800 bg-transparent hover:bg-neutral-800 hover:text-white focus-visible:ring-neutral-800',
      },
      size: {
        default: 'h-10 px-4',
        sm: 'h-8 px-3 text-xs',
        lg: 'h-12 px-6 text-base',
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

export interface ToggleProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'>,
    VariantProps<typeof toggleVariants> {
  pressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
}

const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(
  ({ className, variant, size, pressed, onPressedChange, ...props }, ref) => {
    const isControlled = pressed !== undefined;
    const [internalPressed, setInternalPressed] = useState(false);
    const isPressed = isControlled ? pressed : internalPressed;

    const handleClick = () => {
      const newValue = !isPressed;
      if (!isControlled) {
        setInternalPressed(newValue);
      }
      onPressedChange?.(newValue);
    };

    return (
      <button
        type="button"
        data-pressed={isPressed}
        className={twMerge(toggleVariants({ variant, size, className }))}
        ref={ref}
        aria-pressed={isPressed}
        onClick={handleClick}
        {...props}
      />
    );
  },
);

Toggle.displayName = 'Toggle';

export { Toggle, toggleVariants };
