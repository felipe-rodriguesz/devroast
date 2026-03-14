'use client';

import { forwardRef } from 'react';

import { twMerge } from 'tailwind-merge';

export interface ScoreRingProps {
  score: number;
  maxScore?: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

const ScoreRing = forwardRef<SVGSVGElement, ScoreRingProps>(
  ({ score, maxScore = 10, size = 180, strokeWidth = 4, className }, ref) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const percentage = Math.min(Math.max(score / maxScore, 0), 1);
    const strokeDashoffset = circumference - percentage * circumference * 0.35;

    return (
      <div
        className={twMerge(
          'relative inline-flex items-center justify-center',
          className,
        )}
        style={{ width: size, height: size }}
      >
        <svg
          ref={ref}
          width={size}
          height={size}
          className="absolute -rotate-90"
          role="img"
          aria-label={`Score: ${score} out of ${maxScore}`}
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#1F1F1F"
            strokeWidth={strokeWidth}
          />
          <defs>
            <linearGradient
              id="scoreGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="35%" stopColor="#F59E0B" />
              <stop offset="36%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="url(#scoreGradient)"
            strokeWidth={strokeWidth}
            strokeDasharray={`${circumference * 0.35} ${circumference}`}
            strokeLinecap="round"
            style={{
              strokeDashoffset,
              transition: 'stroke-dashoffset 0.5s ease-in-out',
            }}
          />
        </svg>
        <div className="flex flex-col items-center justify-center">
          <span
            className="font-mono text-5xl font-bold text-neutral-50"
            style={{ lineHeight: 1 }}
          >
            {score.toFixed(1)}
          </span>
          <span
            className="font-mono text-base text-neutral-500"
            style={{ lineHeight: 1 }}
          >
            /{maxScore}
          </span>
        </div>
      </div>
    );
  },
);

ScoreRing.displayName = 'ScoreRing';

export { ScoreRing };
