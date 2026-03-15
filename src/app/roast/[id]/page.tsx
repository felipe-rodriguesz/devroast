import Link from 'next/link';

function ScoreRing({ score }: { score: number }) {
  const circumference = 2 * Math.PI * 80;
  const progress = (score / 10) * circumference;
  const offset = circumference - progress;

  return (
    <div className="relative size-44">
      <svg
        className="size-full -rotate-90"
        viewBox="0 0 180 180"
        role="img"
        aria-label={`Score: ${score} out of 10`}
      >
        <circle
          cx="90"
          cy="90"
          r="80"
          fill="none"
          stroke="var(--color-border-primary)"
          strokeWidth="8"
        />
        <circle
          cx="90"
          cy="90"
          r="80"
          fill="none"
          stroke="url(#scoreGradient)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
        <defs>
          <linearGradient
            id="scoreGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="var(--color-accent-red)" />
            <stop offset="35%" stopColor="var(--color-accent-amber)" />
            <stop offset="100%" stopColor="var(--color-accent-green)" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-mono text-5xl font-bold text-accent-amber">
          3.5
        </span>
        <span className="font-mono text-base text-text-tertiary">/10</span>
      </div>
    </div>
  );
}

function RoastBadge({ isRoastMode }: { isRoastMode: boolean }) {
  return (
    <div
      className={`px-3 py-1 rounded-full font-mono text-xs font-medium ${
        isRoastMode
          ? 'bg-accent-red/10 text-accent-red border border-accent-red/30'
          : 'bg-accent-green/10 text-accent-green border border-accent-green/30'
      }`}
    >
      {isRoastMode ? '🔥 roast mode' : '💚 honest feedback'}
    </div>
  );
}

function CodePreview({ code }: { code: string[] }) {
  return (
    <div className="flex flex-col w-full border border-border-primary">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border-primary bg-bg-surface">
        <div className="size-3 rounded-full bg-accent-red" />
        <div className="size-3 rounded-full bg-accent-amber" />
        <div className="size-3 rounded-full bg-accent-green" />
      </div>

      {/* Code */}
      <div className="flex bg-bg-input">
        <div className="flex flex-col gap-1.5 py-3 px-3 bg-bg-surface border-r border-border-primary min-w-10 items-end">
          {code.map((_, i) => (
            <span
              key={i}
              className="font-mono text-xs text-text-tertiary leading-tight"
            >
              {i + 1}
            </span>
          ))}
        </div>
        <div className="flex flex-col gap-1.5 py-3 px-4">
          {code.map((line, i) => (
            <code
              key={i}
              className="font-mono text-xs text-text-primary leading-tight whitespace-pre"
            >
              {line}
            </code>
          ))}
        </div>
      </div>
    </div>
  );
}

function AnalysisItem({
  severity,
  title,
  description,
}: {
  severity: 'critical' | 'warning' | 'good';
  title: string;
  description: string;
}) {
  const severityStyles = {
    critical: {
      bg: 'bg-accent-red/10',
      border: 'border-accent-red/30',
      text: 'text-accent-red',
      icon: '⚠️',
    },
    warning: {
      bg: 'bg-accent-amber/10',
      border: 'border-accent-amber/30',
      text: 'text-accent-amber',
      icon: '⚡',
    },
    good: {
      bg: 'bg-accent-green/10',
      border: 'border-accent-green/30',
      text: 'text-accent-green',
      icon: '✓',
    },
  };

  const style = severityStyles[severity];

  return (
    <div
      className={`flex gap-3 p-4 rounded-md border ${style.bg} ${style.border}`}
    >
      <span className="text-lg">{style.icon}</span>
      <div className="flex flex-col gap-1">
        <span className={`font-mono text-sm font-medium ${style.text}`}>
          {title}
        </span>
        <span className="text-sm text-text-secondary">{description}</span>
      </div>
    </div>
  );
}

function DiffBlock() {
  return (
    <div className="flex flex-col w-full border border-border-primary">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border-primary bg-bg-surface">
        <span className="font-mono text-sm font-medium text-text-primary">
          suggested_fix.ts
        </span>
        <span className="font-mono text-xs text-text-tertiary">diff</span>
      </div>

      {/* Diff */}
      <div className="flex flex-col bg-bg-input font-mono text-xs">
        <div className="flex py-1 px-4">
          <span className="w-6 text-text-tertiary">1</span>
          <span className="text-text-tertiary">function add(a, b) {'{'}</span>
        </div>
        <div className="flex py-1 px-4 bg-diff-removed/20">
          <span className="w-6 text-text-tertiary">2</span>
          <span className="text-accent-red">- return a + b;</span>
        </div>
        <div className="flex py-1 px-4 bg-diff-added/20">
          <span className="w-6 text-text-tertiary">3</span>
          <span className="text-accent-green">
            + return Number(a) + Number(b);
          </span>
        </div>
        <div className="flex py-1 px-4">
          <span className="w-6 text-text-tertiary">4</span>
          <span className="text-text-tertiary">{'}'}</span>
        </div>
      </div>
    </div>
  );
}

const STATIC_DATA = {
  score: 3.5,
  isRoastMode: true,
  roastQuote:
    '"this code looks like it was written during a power outage... in 2005."',
  language: 'javascript',
  lineCount: 4,
  code: ['function add(a, b) {', '  return a + b;', '}', ''],
  analysis: [
    {
      severity: 'critical' as const,
      title: 'No input validation',
      description:
        'The function does not validate input types. Passing non-numeric values will return NaN.',
    },
    {
      severity: 'warning' as const,
      title: 'Implicit type coercion',
      description:
        'The + operator performs string concatenation when one operand is a string. Use explicit conversion.',
    },
    {
      severity: 'good' as const,
      title: 'Simple and readable',
      description:
        'The function follows a clear, straightforward logic pattern.',
    },
  ] as const,
};

export default function RoastResultPage() {
  return (
    <main className="flex flex-col items-center min-h-screen bg-bg-page">
      {/* Navbar */}
      <nav className="flex items-center justify-between w-full h-14 px-10 border-b border-border-primary bg-bg-page">
        <Link href="/" className="flex items-center gap-3">
          <span className="font-mono text-xl font-bold text-accent-green">
            $
          </span>
          <span className="font-mono text-lg font-medium text-text-primary">
            devroast
          </span>
        </Link>
        <Link
          href="/leaderboard"
          className="font-mono text-xs text-text-secondary hover:text-text-primary"
        >
          leaderboard
        </Link>
      </nav>

      <section className="flex flex-col w-full max-w-4xl px-10 py-10 gap-10">
        {/* Score Hero */}
        <div className="flex flex-col items-center gap-4">
          <ScoreRing score={STATIC_DATA.score} />

          <RoastBadge isRoastMode={STATIC_DATA.isRoastMode} />

          <p className="font-mono text-xl text-text-primary text-center max-w-xl leading-relaxed">
            {STATIC_DATA.roastQuote}
          </p>

          <div className="flex items-center gap-4">
            <span className="font-mono text-xs text-text-secondary">
              {STATIC_DATA.language}
            </span>
            <span className="font-mono text-xs text-text-tertiary">·</span>
            <span className="font-mono text-xs text-text-secondary">
              {STATIC_DATA.lineCount} lines
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-border-primary" />

        {/* Code Preview */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm font-bold text-accent-green">
              {'//'}
            </span>
            <span className="font-mono text-sm font-bold text-text-primary">
              your_submission
            </span>
          </div>

          <CodePreview code={STATIC_DATA.code} />
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-border-primary" />

        {/* Analysis */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm font-bold text-accent-green">
              {'//'}
            </span>
            <span className="font-mono text-sm font-bold text-text-primary">
              detailed_analysis
            </span>
          </div>

          <div className="flex flex-col gap-5">
            {STATIC_DATA.analysis.map((item, i) => (
              <AnalysisItem
                key={i}
                severity={item.severity}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-border-primary" />

        {/* Suggested Fix */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm font-bold text-accent-green">
              {'//'}
            </span>
            <span className="font-mono text-sm font-bold text-text-primary">
              suggested_fix
            </span>
          </div>

          <DiffBlock />
        </div>
      </section>
    </main>
  );
}
