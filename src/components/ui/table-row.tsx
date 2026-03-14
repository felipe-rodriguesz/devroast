import { forwardRef, type HTMLAttributes } from 'react';

import { twMerge } from 'tailwind-merge';

export interface TableRowProps extends HTMLAttributes<HTMLDivElement> {
  rank: string;
  score: string;
  scoreVariant?: 'default' | 'critical' | 'warning' | 'good';
  code: string;
  language: string;
}

const TableRow = forwardRef<HTMLDivElement, TableRowProps>(
  (
    {
      className,
      rank,
      score,
      scoreVariant = 'default',
      code,
      language,
      ...props
    },
    ref,
  ) => {
    const scoreColorClass = {
      default: 'text-neutral-50',
      critical: 'text-accent-red',
      warning: 'text-accent-amber',
      good: 'text-accent-green',
    }[scoreVariant];

    return (
      <div
        ref={ref}
        className={twMerge(
          'flex items-center gap-6 border-b border-neutral-800 px-5 py-4',
          className,
        )}
        {...props}
      >
        <div className="w-10 text-neutral-500 font-mono text-sm">{rank}</div>
        <div
          className={`w-[60px] font-mono text-sm font-bold ${scoreColorClass}`}
        >
          {score}
        </div>
        <div className="flex-1 font-mono text-sm text-neutral-400 truncate">
          {code}
        </div>
        <div className="w-[100px] font-mono text-xs text-neutral-500">
          {language}
        </div>
      </div>
    );
  },
);

TableRow.displayName = 'TableRow';

export { TableRow };
