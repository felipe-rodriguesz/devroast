'use client';

import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CardDescription } from '@/components/ui/card-description';
import { CardHeader } from '@/components/ui/card-header';
import { CardTitle } from '@/components/ui/card-title';
import CodeInput from '@/components/ui/code-input';
import { DiffLine } from '@/components/ui/diff-line';
import LeaderboardTable from '@/components/ui/leaderboard-table';
import { ScoreRing } from '@/components/ui/score-ring';
import { Toggle } from '@/components/ui/toggle';

const sectionStyles = 'space-y-6';
const titleStyles = 'text-2xl font-semibold text-white';
const gridStyles = 'flex flex-wrap gap-4 items-center';

export function ComponentsPageClient() {
  const [togglePressed, setTogglePressed] = useState(false);

  return (
    <main className="min-h-screen bg-neutral-950 p-8 space-y-12">
      <h1 className="text-4xl font-bold text-white">Componentes UI</h1>

      <section className={sectionStyles}>
        <h2 className={titleStyles}>Button</h2>

        <div className="space-y-8">
          <div>
            <h3 className="text-lg text-neutral-400 mb-4">Variantes</h3>
            <div className={gridStyles}>
              <Button>Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="link">Link</Button>
            </div>
          </div>

          <div>
            <h3 className="text-lg text-neutral-400 mb-4">Tamanhos</h3>
            <div className={gridStyles}>
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
              <Button size="icon" aria-label="Edit">
                <svg
                  role="img"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                </svg>
              </Button>
            </div>
          </div>

          <div>
            <h3 className="text-lg text-neutral-400 mb-4">Estados</h3>
            <div className={gridStyles}>
              <Button disabled>Disabled</Button>
              <Button>With Icon</Button>
            </div>
          </div>
        </div>
      </section>

      <section className={sectionStyles}>
        <h2 className={titleStyles}>Toggle</h2>

        <div className="space-y-8">
          <div>
            <h3 className="text-lg text-neutral-400 mb-4">Variantes</h3>
            <div className={gridStyles}>
              <Toggle>Default</Toggle>
              <Toggle variant="outline">Outline</Toggle>
            </div>
          </div>

          <div>
            <h3 className="text-lg text-neutral-400 mb-4">Estados</h3>
            <div className={gridStyles}>
              <Toggle
                pressed={togglePressed}
                onPressedChange={setTogglePressed}
              >
                {togglePressed ? 'Pressed' : 'Not Pressed'}
              </Toggle>
              <Toggle disabled>Disabled</Toggle>
            </div>
          </div>
        </div>
      </section>

      <section className={sectionStyles}>
        <h2 className={titleStyles}>Badge</h2>

        <div className="space-y-8">
          <div>
            <h3 className="text-lg text-neutral-400 mb-4">Variantes</h3>
            <div className={gridStyles}>
              <Badge variant="critical">Critical</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="good">Good</Badge>
              <Badge variant="verdict">Verdict</Badge>
            </div>
          </div>
        </div>
      </section>

      <section className={sectionStyles}>
        <h2 className={titleStyles}>DiffLine</h2>

        <div className="space-y-2 font-mono text-sm">
          <DiffLine variant="removed" lineNumber={1}>
            - const x = 1;
          </DiffLine>
          <DiffLine variant="added" lineNumber={2}>
            + const x = 2;
          </DiffLine>
          <DiffLine variant="context" lineNumber={3}>
            const y = 3;
          </DiffLine>
        </div>
      </section>

      <section className={sectionStyles}>
        <h2 className={titleStyles}>Card</h2>

        <div className="space-y-8">
          <div>
            <h3 className="text-lg text-neutral-400 mb-4">Exemplo</h3>
            <div className="flex flex-wrap gap-4">
              <Card className="w-[480px]">
                <CardHeader label="critical" variant="critical">
                  <div className="h-2 w-2" />
                </CardHeader>
                <CardTitle>using var instead of const/let</CardTitle>
                <CardDescription>
                  the var keyword is function-scoped rather than block-scoped...
                </CardDescription>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className={sectionStyles}>
        <h2 className={titleStyles}>CodeInput</h2>

        <div className="space-y-8">
          <div>
            <h3 className="text-lg text-neutral-400 mb-4">Exemplo</h3>
            <CodeInput.Root>
              <CodeInput.Header />
              <CodeInput.Body>
                <CodeInput.LineNumbers count={10} />
                <CodeInput.Textarea placeholder="// write your code here..." />
              </CodeInput.Body>
            </CodeInput.Root>
          </div>
        </div>
      </section>

      <section className={sectionStyles}>
        <h2 className={titleStyles}>LeaderboardTable</h2>

        <div className="space-y-8">
          <div>
            <h3 className="text-lg text-neutral-400 mb-4">Exemplo</h3>
            <LeaderboardTable.Root>
              <LeaderboardTable.Header />
              <LeaderboardTable.Body>
                <LeaderboardTable.Row>
                  <LeaderboardTable.Cell className="text-neutral-500">
                    #1
                  </LeaderboardTable.Cell>
                  <LeaderboardTable.Cell
                    width={70}
                    className="font-bold text-accent-red"
                  >
                    1.2
                  </LeaderboardTable.Cell>
                  <LeaderboardTable.Cell className="flex-1 truncate text-neutral-400">
                    {'function calculate() { var total = 0; ...'}
                  </LeaderboardTable.Cell>
                  <LeaderboardTable.Cell
                    width={100}
                    className="text-neutral-500"
                  >
                    javascript
                  </LeaderboardTable.Cell>
                </LeaderboardTable.Row>
                <LeaderboardTable.Row>
                  <LeaderboardTable.Cell className="text-neutral-500">
                    #2
                  </LeaderboardTable.Cell>
                  <LeaderboardTable.Cell
                    width={70}
                    className="font-bold text-accent-red"
                  >
                    2.8
                  </LeaderboardTable.Cell>
                  <LeaderboardTable.Cell className="flex-1 truncate text-neutral-400">
                    {'const process = (data) => { return data.forEach...'}
                  </LeaderboardTable.Cell>
                  <LeaderboardTable.Cell
                    width={100}
                    className="text-neutral-500"
                  >
                    typescript
                  </LeaderboardTable.Cell>
                </LeaderboardTable.Row>
                <LeaderboardTable.Row>
                  <LeaderboardTable.Cell className="text-neutral-500">
                    #3
                  </LeaderboardTable.Cell>
                  <LeaderboardTable.Cell
                    width={70}
                    className="font-bold text-accent-amber"
                  >
                    3.1
                  </LeaderboardTable.Cell>
                  <LeaderboardTable.Cell className="flex-1 truncate text-neutral-400">
                    {'if (condition) { doSomething() } else { ...'}
                  </LeaderboardTable.Cell>
                  <LeaderboardTable.Cell
                    width={100}
                    className="text-neutral-500"
                  >
                    python
                  </LeaderboardTable.Cell>
                </LeaderboardTable.Row>
              </LeaderboardTable.Body>
            </LeaderboardTable.Root>
          </div>
        </div>
      </section>

      <section className={sectionStyles}>
        <h2 className={titleStyles}>ScoreRing</h2>

        <div className="space-y-8">
          <div>
            <h3 className="text-lg text-neutral-400 mb-4">Exemplo</h3>
            <div className="flex flex-wrap gap-8">
              <ScoreRing score={3.5} />
              <ScoreRing score={8.5} />
              <ScoreRing score={1.2} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
