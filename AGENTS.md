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
};
export default Component;
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

## Commands
```bash
pnpm dev      # Development
pnpm build   # Build
pnpm lint    # Lint
pnpm format  # Format
```
