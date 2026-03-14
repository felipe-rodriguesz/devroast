# Padrões de Componentes UI

## Visão Geral

Este documento estabelece os padrões para criação de componentes de UI genéricos no projeto.

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
    twMerge: false,
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
import { twMerge } from 'tailwind-merge';
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

#### Configurar twMerge: false

Sempre adicione `{ twMerge: false }` como segundo argumento do `tv()`:

```tsx
const buttonVariants = tv(
  { ... },
  {
    twMerge: false,
  },
);
```

### 3. CSS Variables no globals.css

Adicione as CSS variables no `@layer base` do `src/app/globals.css`:

```css
@layer base {
  :root {
    --color-primary: #000000;
    --color-secondary: #ffffff;
  }
}
```

### 4. Configuração de Fontes

#### Fontes do Projeto

- **font-sans**: Fonte do sistema (`system-ui, sans-serif`) - padrão do Tailwind
- **font-mono**: JetBrains Mono (via `--font-mono`)

#### No layout.tsx

Configure apenas fontes monospaced no `src/app/layout.tsx`:

```tsx
import { JetBrains_Mono } from 'next/font/google';
import './globals.css';

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${jetbrainsMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
```

#### No globals.css

Defina as variáveis de fonte:

```css
@layer base {
  :root {
    --font-sans: system-ui, sans-serif;
    --font-mono: 'JetBrains Mono', monospace;
  }
}
```

#### Nos Componentes

Use classes nativas do Tailwind para fontes:

```tsx
// ✅ Correto - usar classes nativas
<span className="text-white">Texto</span>
<span className="text-neutral-400">Texto secundário</span>
<span className="font-mono">Código</span>

// ❌ Errado - não usar variáveis customizadas
<span className="text-[--text-primary]">Texto</span>
```

### 5. Cores

Use classes nativas do Tailwind ou CSS variables do projeto quando necessário:

```tsx
// ✅ Correto - classes nativas do Tailwind
<div className="bg-white text-black" />
<div className="bg-neutral-900 text-neutral-400" />

// ✅ Também válido - CSS variables para cores do design system
<div className="bg-[--bg-page]" />
<div className="text-[--accent-green]" />
```

### 6. Checklist de Criação de Componente

- [ ] Criar arquivo em `src/components/ui/[componente].tsx`
- [ ] Usar `tv()` com `{ twMerge: false }`
- [ ] Extender propriedades nativas do HTML
- [ ] Usar named exports
- [ ] Usar `forwardRef`
- [ ] Adicionar `displayName`
- [ ] Usar classes nativas do Tailwind (font-sans, font-mono, text-*, bg-*)
- [ ] Usar CSS variables apenas quando necessário
- [ ] Documentar variantes e tamanhos
- [ ] Testar todas as variantes na página de componentes
