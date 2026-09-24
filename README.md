# DevRoast

Aplicação web para enviar trechos de código, receber uma análise gerada por IA e consultar os envios com menor pontuação em um leaderboard. O projeto foi desenvolvido durante a NLW da [Rocketseat](https://rocketseat.com.br) e reúne uma interface interativa, renderização no servidor, uma API tipada e persistência em PostgreSQL.

## Funcionalidades

- Editor de código com detecção automática de linguagem e seleção manual.
- Análise por IA com nota, veredito, observações por severidade e sugestão de código revisado.
- Modo Roast, que altera o tom da análise entre sarcástico e construtivo.
- Página individual para cada análise, com realce de sintaxe, comparação do código enviado com a sugestão e metadados para compartilhamento.
- Leaderboard com os envios de menor nota, linguagem, quantidade de linhas e pontuação.
- Contagem e média das análises exibidas na página inicial.
- Showcase de componentes de interface em `/components`.

O modelo configurado atualmente é `llama-3.3-70b-versatile`, servido pela Groq. A geração de análises requer uma chave `GROQ_API_KEY` válida. O seed de desenvolvimento cria dados fictícios e não chama o modelo.

## Tecnologias

| Área | Tecnologias utilizadas |
| --- | --- |
| Aplicação | Next.js 16 (App Router), React 19, TypeScript em modo estrito |
| Interface | Tailwind CSS 4, Tailwind Variants, Tailwind Merge, Base UI, Lucide React |
| Código | Shiki para realce na renderização do servidor; Highlight.js para detecção de linguagem |
| API e dados | tRPC 11, TanStack React Query 5, Drizzle ORM, PostgreSQL, Zod |
| IA | Vercel AI SDK com o provider Groq |
| Qualidade | Biome 2 |
| Gerenciador de pacotes | pnpm |

O pacote `@ai-sdk/google` também consta nas dependências, mas não é o provider usado pelo fluxo de análise atual.

## Requisitos

- Node.js compatível com Next.js 16.
- pnpm.
- Docker e Docker Compose, ou uma instância PostgreSQL acessível.
- Uma chave de API da Groq para gerar novas análises.

## Configuração local

1. Instale as dependências:

   ```bash
   pnpm install
   ```

2. Crie um arquivo `.env.local` na raiz do projeto com as configurações locais:

   ```dotenv
   DATABASE_URL=postgresql://devroast:devroast@localhost:5432/devroast
   GROQ_API_KEY=sua-chave-da-groq
   ```

   `DATABASE_URL` é necessária para acessar o banco e executar as migrations. `GROQ_API_KEY` é necessária para criar uma análise. Não versione esse arquivo; arquivos `.env*` estão ignorados pelo Git.

3. Inicie o PostgreSQL local (opcional se já tiver um banco disponível):

   ```bash
   docker compose up -d postgres
   ```

   O `docker-compose.yml` define um banco local de desenvolvimento chamado `devroast`. Altere as credenciais de desenvolvimento no Compose e a URL correspondente em `.env.local` se precisar usar valores diferentes.

4. Aplique as migrations existentes:

   ```bash
   pnpm exec drizzle-kit migrate
   ```

5. Opcionalmente, carregue dados fictícios para visualizar estatísticas e o leaderboard:

   ```bash
   pnpm exec tsx src/db/seed.ts
   ```

   O seed insere 100 análises de demonstração com conteúdo gerado localmente. Execute-o apenas em um banco de desenvolvimento.

6. Inicie o servidor de desenvolvimento:

   ```bash
   pnpm dev
   ```

   Acesse [http://localhost:3000](http://localhost:3000). A página inicial, os dados do leaderboard e as análises existentes dependem do banco configurado.

## Comandos disponíveis

| Comando | Descrição |
| --- | --- |
| `pnpm dev` | Inicia Next.js em modo de desenvolvimento. |
| `pnpm build` | Gera o build de produção. |
| `pnpm start` | Inicia o servidor a partir do build de produção. |
| `pnpm lint` | Executa as regras de lint do Biome. |
| `pnpm lint:fix` | Aplica correções automáticas de lint do Biome. |
| `pnpm format` | Formata os arquivos e aplica as verificações do Biome. |

Não há script de testes automatizados configurado no `package.json`.

## Arquitetura

```text
src/
├── app/                 # Rotas, páginas, layout e endpoint HTTP do tRPC
├── components/          # Editor e componentes reutilizáveis da interface
│   └── ui/              # Primitivos e composições de interface
├── db/                  # Schema, conexão e seed do PostgreSQL
├── hooks/               # Detecção de linguagem e realce no editor
├── lib/                 # Configuração do modelo de IA e linguagens
└── trpc/                # Contexto, cliente e routers da API
```

- **Interface e rotas:** Next.js App Router combina páginas renderizadas no servidor com componentes cliente para o editor e interações. A página individual é `/roast/[id]`; `/leaderboard` lista os envios; `/components` demonstra os componentes.
- **API:** o router `roast` expõe operações para criar uma análise, consultar uma análise por UUID, obter estatísticas e listar o leaderboard. A rota HTTP do tRPC fica em `/api/trpc`.
- **Fluxo de análise:** o procedimento `roast.create` valida os dados com Zod, solicita uma resposta estruturada ao modelo Groq, valida a saída e grava a análise e seus itens no PostgreSQL.
- **Dados:** Drizzle define `roasts` e `analysis_items`; o histórico de migrations está em `drizzle/`. Itens de análise são removidos em cascata com o registro associado.
- **Renderização e cache:** páginas do servidor acessam procedimentos tRPC diretamente; a página inicial também pré-carrega estatísticas para hidratação no cliente. A configuração do Next.js ativa React Compiler e Cache Components.
- **Código-fonte exibido:** Shiki renderiza blocos de código no servidor. Highlight.js é usado para detectar a linguagem no editor, que também permite seleção manual.

## Estrutura de apoio

- `specs/` e `@specs/`: especificações e decisões de implementação mantidas durante o desenvolvimento.
- `COMPONENTS.md`: referência para os componentes reutilizáveis.
- `drizzle/`: migrations SQL do banco.
- `docker-compose.yml`: serviço PostgreSQL para desenvolvimento local.

## Licença

O README original indicava licença MIT, mas não há arquivo de licença incluído no repositório. Confirme e adicione o arquivo de licença antes de distribuir o projeto sob essa licença.
