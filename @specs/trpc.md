# Feature: tRPC Integration

## Goal
Adicionar tRPC como camada de API/backend integrada com Next.js App Router (SSR/Server Components).

## Tech
- `@trpc/server`, `@trpc/client`, `@trpc/tanstack-react-query`
- `@tanstack/react-query@latest`
- `zod` para validação
- `server-only`, `client-only`

## Steps

### 1. Install deps
```bash
pnpm add @trpc/server @trpc/client @trpc/tanstack-react-query @tanstack/react-query zod server-only client-only
```

### 2. Create tRPC init (`src/trpc/init.ts`)
- `createTRPCContext` com cache para reuso
- `initTRPC.create()` para base
- Export: `createTRPCRouter`, `createCallerFactory`, `baseProcedure`

### 3. Create routers (`src/trpc/routers/_app.ts`)
- Criar procedures para roasts e leaderboard
- Usar `zod` para input validation
- Export: `appRouter`, `AppRouter` type

### 4. Create API route (`src/app/api/trpc/[trpc]/route.ts`)
- Fetch adapter para `/api/trpc/*`
- Handler GET e POST

### 5. Query Client (`src/trpc/query-client.ts`)
- `makeQueryClient()` com `defaultShouldDehydrateQuery`
- Configurar `staleTime` para SSR

### 6. Client Provider (`src/trpc/client.tsx`)
- `TRPCReactProvider` com QueryClientProvider
- Usar `useState` para instanciar tRPC client
- Montar em `layout.tsx`

### 7. Server utils (`src/trpc/server.tsx`)
- `getQueryClient` com cache
- `trpc` proxy via `createTRPCOptionsProxy`
- `caller` para server-only calls
- Helpers: `HydrateClient`, `prefetch`

### 8. Usage
- Server: `prefetch()` + `<HydrateClient>` ou `caller.procedure()`
- Client: `useTRPC()` hook com `useQuery`/`useMutation`
