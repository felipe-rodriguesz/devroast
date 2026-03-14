import Link from 'next/link';

export function Navbar() {
  return (
    <nav className="flex h-14 w-full items-center justify-between border-b border-neutral-800 bg-neutral-950 px-10">
      <Link href="/" className="flex items-center gap-2">
        <span className="font-mono text-xl font-bold text-accent-green">$</span>
        <span className="font-mono text-lg font-medium text-neutral-50">
          devroast
        </span>
      </Link>
      <Link
        href="/leaderboard"
        className="font-mono text-sm text-neutral-400 transition-colors hover:text-neutral-50"
      >
        leaderboard
      </Link>
    </nav>
  );
}
