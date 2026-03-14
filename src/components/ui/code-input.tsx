'use client';

import {
  forwardRef,
  type HTMLAttributes,
  type TextareaHTMLAttributes,
} from 'react';

import { twMerge } from 'tailwind-merge';

const CodeInputRoot = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={twMerge(
        'flex h-[360px] w-[780px] flex-col overflow-hidden rounded-md border border-neutral-800',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
});
CodeInputRoot.displayName = 'CodeInputRoot';

const CodeInputHeader = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={twMerge(
        'flex h-10 w-full items-center gap-2 border-b border-neutral-800 bg-neutral-900 px-4',
        className,
      )}
      {...props}
    >
      <div className="h-3 w-3 rounded-full bg-accent-red" />
      <div className="h-3 w-3 rounded-full bg-accent-amber" />
      <div className="h-3 w-3 rounded-full bg-accent-green" />
    </div>
  );
});
CodeInputHeader.displayName = 'CodeInputHeader';

const CodeInputBody = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={twMerge(
        'flex flex-1 overflow-hidden bg-neutral-900',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
});
CodeInputBody.displayName = 'CodeInputBody';

interface CodeInputLineNumbersProps extends HTMLAttributes<HTMLDivElement> {
  count?: number;
}

const CodeInputLineNumbers = forwardRef<
  HTMLDivElement,
  CodeInputLineNumbersProps
>(({ className, count = 16, ...props }, ref) => {
  const lineNumbers = Array.from({ length: count }, (_, i) => i + 1);

  return (
    <div
      ref={ref}
      className={twMerge(
        'flex flex-col gap-2 border-r border-neutral-800 bg-neutral-800 px-3 py-4',
        className,
      )}
      {...props}
    >
      {lineNumbers.map((num) => (
        <span
          key={num}
          className="w-8 font-mono text-xs text-neutral-500 text-right"
        >
          {num}
        </span>
      ))}
    </div>
  );
});
CodeInputLineNumbers.displayName = 'CodeInputLineNumbers';

const CodeInputTextarea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={twMerge(
        'flex-1 resize-none bg-neutral-900 p-4 font-mono text-sm leading-[1.5rem] text-neutral-400 outline-none placeholder:text-neutral-600',
        className,
      )}
      spellCheck={false}
      {...props}
    />
  );
});
CodeInputTextarea.displayName = 'CodeInputTextarea';

const CodeInput = {
  Root: CodeInputRoot,
  Header: CodeInputHeader,
  Body: CodeInputBody,
  LineNumbers: CodeInputLineNumbers,
  Textarea: CodeInputTextarea,
};

export default CodeInput;
