# Padrões de Componentes UI

## Estrutura de Arquivos

```
src/components/ui/
```

## Criando um Componente

### 1. Estrutura Básica

```tsx
import { type HTMLAttributes, forwardRef } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

const componentVariants = tv(
  {
    base: 'classes base do componente',
    variants: {
      variant: {
        default: 'classes para variant default',
        secondary: 'classes para variant secondary',
      },
      size: {
        default: 'classes para tamanho default',
        sm: 'classes para tamanho small',
        lg: 'classes para tamanho large',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
  {
    twMerge: false, // Não usar twMerge com variants
  },
);

export interface ComponentProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof componentVariants> {}

const Component = forwardRef<HTMLDivElement, ComponentProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <div
        className={componentVariants({ variant, size, className })}
        ref={ref}
        {...props}
      />
    );
  },
);

Component.displayName = 'Component';

export { Component, componentVariants };
```

### 2. Regras Importantes

#### Não usar twMerge com tailwind-variants

O `tailwind-variants` já faz o merge automaticamente quando você passa `className` como propriedade. Usar `twMerge` junto pode causar conflitos.

```tsx
// ✅ Correto
className={componentVariants({ variant, size, className })}

// ❌ Errado
className={twMerge(componentVariants({ variant, size }), className)}
```

#### Extender propriedades nativas

Sempre extenda as propriedades nativas do elemento HTML:

```tsx
export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}
```

#### Usar named exports

Nunca use default exports:

```tsx
// ✅ Correto
export { Button, buttonVariants };

// ❌ Errado
export default Button;
```

#### Usar forwardRef

Sempre use `forwardRef` para permitir ref forwarding:

```tsx
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return <button ref={ref} {...props} />;
  },
);

Button.displayName = 'Button';
```

### 3. CSS Variables no globals.css

Adicione as CSS variables no `@layer base` do `globals.css`:

```css
@layer base {
  :root {
    --color-primary: #000000;
    --color-secondary: #ffffff;
  }
}
```

### 4. Configuração de Fontes no layout.tsx

Configure as fontes no `layout.tsx` usando `next/font/google`:

```tsx
const fontName = FontName({
  variable: '--font-nome-da-variavel',
  subsets: ['latin'],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={fontName.variable}>
        {children}
      </body>
    </html>
  );
}
```
