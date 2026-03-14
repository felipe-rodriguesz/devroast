# DevRoast - Project Standards

## Tech Stack
- Next.js 16 (App Router)
- React 19
- Tailwind CSS v4
- Shiki (syntax highlighting)

## Component Patterns

### Composition Pattern
Use subcomponents for complex components:
```tsx
const Component = {
  Root,
  Header,
  Body,
  // ...
};
export default Component;
```

### Variants with tailwind-variants
```tsx
const variants = tv({
  base: '...',
  variants: { variant: { default: '...', secondary: '...' } },
  defaultVariants: { variant: 'default' },
}, { twMerge: false });
```

### Use twMerge for className merging
```tsx
import { twMerge } from 'tailwind-merge';
className={twMerge(variants({ variant, className }))}
```

### Use enabled: selector for disabled hover states
```tsx
variant: { default: 'bg-green enabled:hover:bg-green/90' }
```

## File Structure
```
src/
  app/           # Next.js App Router pages
  components/
    ui/          # Reusable UI components
```

## Commands
```bash
pnpm dev      # Development
pnpm build   # Build
pnpm lint    # Lint
pnpm format  # Format
```
