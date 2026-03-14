import { forwardRef, type HTMLAttributes } from 'react';

import { twMerge } from 'tailwind-merge';

const LeaderboardTableRoot = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={twMerge(
        'w-full overflow-hidden border border-neutral-800',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
});
LeaderboardTableRoot.displayName = 'LeaderboardTableRoot';

const LeaderboardTableHeader = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={twMerge(
        'flex h-10 w-full items-center border-b border-neutral-800 bg-neutral-800 px-5',
        className,
      )}
      {...props}
    >
      <div className="w-12 font-mono text-xs font-medium text-neutral-400">
        rank
      </div>
      <div className="w-[70px] font-mono text-xs font-medium text-neutral-400">
        score
      </div>
      <div className="flex-1 font-mono text-xs font-medium text-neutral-400">
        code
      </div>
      <div className="w-[100px] font-mono text-xs font-medium text-neutral-400">
        language
      </div>
    </div>
  );
});
LeaderboardTableHeader.displayName = 'LeaderboardTableHeader';

const LeaderboardTableBody = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={twMerge('flex w-full flex-col', className)}
      {...props}
    >
      {children}
    </div>
  );
});
LeaderboardTableBody.displayName = 'LeaderboardTableBody';

const LeaderboardTableRow = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={twMerge(
        'flex items-center border-b border-neutral-800 px-5 py-4 last:border-b-0',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
});
LeaderboardTableRow.displayName = 'LeaderboardTableRow';

interface LeaderboardTableCellProps extends HTMLAttributes<HTMLDivElement> {
  width?: string | number;
}

const LeaderboardTableCell = forwardRef<
  HTMLDivElement,
  LeaderboardTableCellProps
>(({ className, width, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={twMerge(className)}
      style={width ? { width } : undefined}
      {...props}
    >
      {children}
    </div>
  );
});
LeaderboardTableCell.displayName = 'LeaderboardTableCell';

const LeaderboardTable = {
  Root: LeaderboardTableRoot,
  Header: LeaderboardTableHeader,
  Body: LeaderboardTableBody,
  Row: LeaderboardTableRow,
  Cell: LeaderboardTableCell,
};

export default LeaderboardTable;
