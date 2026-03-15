# DevRoast — Especificação de Banco de Dados

## Visão Geral

Este documento especifica a estrutura de banco de dados para o projeto DevRoast usando Drizzle ORM com PostgreSQL.

## Decisões de Arquitetura

- **ORM:** Drizzle ORM
- **Banco:** PostgreSQL (via Docker Compose)
- **Sem autenticação:** Códigos são anônimos
- **Dados persistidos:** Código submetido + análise completa

---

## Enums

### `language`

Linguagens de programação suportadas nas submissões.

```typescript
export const languageEnum = pgEnum('language', [
  'javascript',
  'typescript',
  'python',
  'rust',
  'go',
  'java',
  'cpp',
  'c',
  'ruby',
  'php',
  'sql',
  'html',
  'css',
  'json',
  'yaml',
  'bash',
  'shell',
  'unknown',
]);
```

### `roast_mode`

Modo de geração do roast.

```typescript
export const roastModeEnum = pgEnum('roast_mode', [
  'honest',   // Feedback honesto
  'roast',    // Sarcasmo máximo
]);
```

---

## Tabelas

### `submissions`

Armazena os códigos submetidos para análise.

```typescript
export const submissions = pgTable('submissions', {
  id: uuid('id').primaryKey().defaultRandom(),
  code: text('code').notNull(),
  language: languageEnum('language').notNull().default('unknown'),
  roastMode: roastModeEnum('roast_mode').notNull().default('roast'),
  score: real('score').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});
```

**Campos:**
| Campo | Tipo | Descrição |
|-------|------|------------|
| `id` | UUID | PK única |
| `code` | text | Código fonte submetido |
| `language` | enum | Linguagem detectada/selecionada |
| `roastMode` | enum | Modo de roast escolhido |
| `score` | real | Pontuação (0-10, menor = pior) |
| `createdAt` | timestamp | Data de submissão |

### `analyses`

Armazena as análises/roasts gerados para cada submissão.

```typescript
export const analyses = pgTable('analyses', {
  id: uuid('id').primaryKey().defaultRandom(),
  submissionId: uuid('submission_id')
    .notNull()
    .references(() => submissions.id, { onDelete: 'cascade' }),
  content: text('content').notNull(),
  roastMode: roastModeEnum('roast_mode').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});
```

**Campos:**
| Campo | Tipo | Descrição |
|-------|------|------------|
| `id` | UUID | PK única |
| `submissionId` | UUID | FK para submissions |
| `content` | text | Texto completo da análise |
| `roastMode` | enum | Modo usado na geração |
| `createdAt` | timestamp | Data de criação |

---

## Relações

```
submissions (1) ──────< (N) analyses
```

Uma submissão pode ter múltiplas análises (histórico de re-análises).

---

## Docker Compose

```yaml
# docker-compose.yml
services:
  postgres:
    image: postgres:16-alpine
    container_name: devroast-db
    environment:
      POSTGRES_USER: devroast
      POSTGRES_PASSWORD: devroast
      POSTGRES_DB: devroast
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

---

## Tipos TypeScript

```typescript
export type Submission = InferSelectModel<typeof submissions>;
export type NewSubmission = InferInsertModel<typeof submissions>;
export type Analysis = InferSelectModel<typeof analyses>;
export type NewAnalysis = InferInsertModel<typeof analyses>;
```

---

## To-Dos para Implementação

### Fase 1: Infraestrutura
- [ ] Criar `docker-compose.yml` com PostgreSQL
- [ ] Criar script de setup (criar database se não existir)
- [ ] Configurar variáveis de ambiente (`.env`)
- [ ] Instalar dependências: `drizzle-orm`, `postgres`, `drizzle-kit`

### Fase 2: Schema Drizzle
- [ ] Criar arquivo `src/db/schema.ts` com enums e tabelas
- [ ] Criar arquivo `src/db/index.ts` com conexão e exports
- [ ] Criar arquivo `drizzle.config.ts` para migrations

### Fase 3: Repositórios/Queries
- [ ] Criar `src/db/queries/submissions.ts` (insert, getTop, getRecent)
- [ ] Criar `src/db/queries/analyses.ts` (insert, getBySubmissionId)
- [ ] Implementar query para leaderboard (top N por score)

### Fase 4: Integração com App
- [ ] Criar server action para submeter código
- [ ] Integrar com componente HomeEditor
- [ ] Atualizar página para buscar dados do DB
- [ ] Implementar cache para estatísticas (opcional)

### Fase 5: Migrations
- [ ] Criar migration inicial com `drizzle-kit push`
- [ ] Documentar como rodar migrations

---

## Queries Comuns

```typescript
// Leaderboard - top 10 piores códigos
db.select()
  .from(submissions)
  .orderBy(asc(submissions.score))
  .limit(10);

// Submissão recente com análise
db.select({
    id: submissions.id,
    code: submissions.code,
    language: submissions.language,
    score: submissions.score,
    analysis: analyses.content,
  })
  .from(submissions)
  .leftJoin(analyses, eq(analyses.submissionId, submissions.id))
  .orderBy(desc(submissions.createdAt))
  .limit(20);

// Estatísticas globais
db.select({
    count: count(submissions.id),
    avgScore: avg(submissions.score),
  })
  .from(submissions);
```

---

## Variáveis de Ambiente

```env
# .env.local
DATABASE_URL=postgres://devroast:devroast@localhost:5432/devroast
```

---

## Referências

- [Drizzle ORM Docs](https://orm.drizzle.team)
- [Drizzle Kit CLI](https://orm.drizzle.team/kit-docs/overview)
- [PostgreSQL Docker Image](https://hub.docker.com/_/postgres)
