'use client';

import Link from 'next/link';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import CodeInput from '@/components/ui/code-input';
import LeaderboardTable from '@/components/ui/leaderboard-table';
import { Toggle } from '@/components/ui/toggle';

export default function Home() {
  const [roastMode, setRoastMode] = useState(false);

  return (
    <main className="flex min-h-[calc(100vh-3.5rem)] flex-col items-center px-10 pt-20">
      <div className="flex w-full max-w-[960px] flex-col gap-8">
        <div className="flex flex-col gap-3">
          <h1 className="flex items-center gap-3 font-mono text-4xl font-bold text-neutral-50">
            <span className="text-accent-green">$</span>
            <span>paste your code. get roasted.</span>
          </h1>
          <p className="font-mono text-sm text-neutral-400">
            {/* drop your code below and we&apos;ll rate it — brutally honest or */}
            full roast mode
          </p>
        </div>

        <CodeInput.Root>
          <CodeInput.Header />
          <CodeInput.Body>
            <CodeInput.LineNumbers count={16} />
            <CodeInput.Textarea placeholder="// paste your code here..." />
          </CodeInput.Body>
        </CodeInput.Root>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Toggle pressed={roastMode} onPressedChange={setRoastMode}>
              roast mode
            </Toggle>
            <span className="font-mono text-xs text-neutral-500">
              {/* maximum sarcasm enabled */}
            </span>
          </div>
          <Button>
            <span className="text-neutral-950">$</span>
            roast_my_code
          </Button>
        </div>

        <div className="flex items-center justify-center gap-6">
          <span className="font-mono text-xs text-neutral-500">
            2,847 codes roasted
          </span>
          <span className="text-neutral-500">·</span>
          <span className="font-mono text-xs text-neutral-500">
            avg score: 4.2/10
          </span>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 font-mono text-sm font-bold text-neutral-50">
              <span className="text-accent-green">{/*//*/}</span>
              shame_leaderboard
            </h2>
            <span className="font-mono text-xs text-neutral-400 hover:text-neutral-50 cursor-pointer">
              $ view_all &gt;&gt;
            </span>
          </div>
          <p className="font-mono text-xs text-neutral-500">
            {/* the worst code on the internet, ranked by shame */}
          </p>
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
                <LeaderboardTable.Cell width={100} className="text-neutral-500">
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
                <LeaderboardTable.Cell width={100} className="text-neutral-500">
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
                <LeaderboardTable.Cell width={100} className="text-neutral-500">
                  python
                </LeaderboardTable.Cell>
              </LeaderboardTable.Row>
            </LeaderboardTable.Body>
          </LeaderboardTable.Root>
          <div className="flex justify-center px-4 py-2">
            <Link
              href="/leaderboard"
              className="font-mono text-xs text-neutral-500 hover:text-neutral-400"
            >
              showing top 3 of 2,847 · view full leaderboard &gt;&gt;
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
