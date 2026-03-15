'use client';

import hljs from 'highlight.js';
import { ChevronDown } from 'lucide-react';
import {
  forwardRef,
  type HTMLAttributes,
  type TextareaHTMLAttributes,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { BundledLanguage } from 'shiki';
import { codeToHtml } from 'shiki';
import { twMerge } from 'tailwind-merge';

const SUPPORTED_LANGUAGES = [
  { id: 'auto', name: 'Auto' },
  { id: 'javascript', name: 'JavaScript' },
  { id: 'typescript', name: 'TypeScript' },
  { id: 'python', name: 'Python' },
  { id: 'java', name: 'Java' },
  { id: 'c', name: 'C' },
  { id: 'cpp', name: 'C++' },
  { id: 'go', name: 'Go' },
  { id: 'rust', name: 'Rust' },
  { id: 'php', name: 'PHP' },
  { id: 'ruby', name: 'Ruby' },
  { id: 'bash', name: 'Bash' },
  { id: 'json', name: 'JSON' },
  { id: 'yaml', name: 'YAML' },
  { id: 'markdown', name: 'Markdown' },
] as const;

type LanguageId = (typeof SUPPORTED_LANGUAGES)[number]['id'];

interface CodeInputRootProps extends HTMLAttributes<HTMLDivElement> {
  language?: LanguageId;
  onLanguageChange?: (language: LanguageId) => void;
}

const CodeInputRoot = forwardRef<HTMLDivElement, CodeInputRootProps>(
  (
    { className, children, language = 'auto', onLanguageChange, ...props },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const currentLanguage = useMemo(() => {
      return (
        SUPPORTED_LANGUAGES.find((l) => l.id === language) ||
        SUPPORTED_LANGUAGES[0]
      );
    }, [language]);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () =>
        document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
      <div
        ref={ref}
        className={twMerge(
          'flex h-[360px] w-full flex-col overflow-hidden rounded-md border border-border-primary bg-bg-input',
          className,
        )}
        {...props}
      >
        {/* Header */}
        <div className="flex h-10 w-full items-center justify-between gap-2 border-b border-border-primary bg-bg-surface px-4">
          <div className="flex items-center gap-2">
            <div className="size-3 rounded-full bg-accent-red" />
            <div className="size-3 rounded-full bg-accent-amber" />
            <div className="size-3 rounded-full bg-accent-green" />
          </div>

          {/* Language Selector */}
          <div ref={dropdownRef} className="relative">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-2 rounded px-2 py-1 font-mono text-xs text-text-secondary hover:bg-bg-elevated"
            >
              <span>{currentLanguage.name}</span>
              <ChevronDown
                aria-label="Toggle language dropdown"
                className={`size-3 transition-transform ${isOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {isOpen && (
              <div className="absolute right-0 top-full z-50 mt-1 max-h-60 w-40 overflow-auto rounded-md border border-border-primary bg-bg-elevated shadow-lg">
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <button
                    key={lang.id}
                    type="button"
                    onClick={() => {
                      onLanguageChange?.(lang.id);
                      setIsOpen(false);
                    }}
                    className={twMerge(
                      'w-full px-3 py-2 text-left font-mono text-xs hover:bg-bg-surface',
                      lang.id === language
                        ? 'bg-bg-surface text-text-primary'
                        : 'text-text-secondary',
                    )}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Body */}
        {children}
      </div>
    );
  },
);
CodeInputRoot.displayName = 'CodeInputRoot';

const CodeInputBody = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={twMerge('flex flex-1 overflow-hidden', className)}
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
>(({ className, count = 1, ...props }, ref) => {
  const lineNumbers = Array.from({ length: count }, (_, i) => i + 1);

  return (
    <div
      ref={ref}
      className={twMerge(
        'flex flex-col items-end gap-1.5 border-r border-border-primary bg-bg-surface px-3 py-3 select-none min-w-10',
        className,
      )}
      {...props}
    >
      {lineNumbers.map((num) => (
        <span
          key={num}
          className="font-mono text-[13px] leading-tight text-text-tertiary"
        >
          {num}
        </span>
      ))}
    </div>
  );
});
CodeInputLineNumbers.displayName = 'CodeInputLineNumbers';

interface CodeInputTextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
  value: string;
  onChange: (value: string) => void;
  highlightedHtml?: string;
  onHighlightedHtmlChange?: (html: string) => void;
}

const CodeInputTextarea = forwardRef<
  HTMLTextAreaElement,
  CodeInputTextareaProps
>(
  (
    {
      className,
      value,
      onChange,
      highlightedHtml,
      onHighlightedHtmlChange,
      ...props
    },
    ref,
  ) => {
    const preRef = useRef<HTMLPreElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [isHighlighting, setIsHighlighting] = useState(false);

    useEffect(() => {
      const updateHighlight = async () => {
        if (!value.trim()) {
          onHighlightedHtmlChange?.('');
          setIsHighlighting(false);
          return;
        }

        setIsHighlighting(true);

        try {
          const result = hljs.highlightAuto(value);
          const lang = result.language || 'plaintext';

          const html = await codeToHtml(value, {
            lang: lang as BundledLanguage,
            theme: 'vesper',
          });

          onHighlightedHtmlChange?.(html);
        } catch {
          const escaped = value
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
          onHighlightedHtmlChange?.(`<pre><code>${escaped}</code></pre>`);
        } finally {
          setIsHighlighting(false);
        }
      };

      updateHighlight();
    }, [value, onHighlightedHtmlChange]);

    const handleScroll = useCallback(() => {
      if (preRef.current && textareaRef.current) {
        preRef.current.scrollTop = textareaRef.current.scrollTop;
        preRef.current.scrollLeft = textareaRef.current.scrollLeft;
      }
    }, []);

    return (
      <div className="relative flex-1 overflow-hidden">
        {/* Highlighted code layer */}
        <pre
          ref={preRef}
          className={twMerge(
            'absolute inset-0 overflow-auto p-3 font-mono text-[13px] leading-tight pointer-events-none',
            className,
          )}
          aria-hidden="true"
        >
          {highlightedHtml && !isHighlighting ? (
            <code
              // biome-ignore lint/security/noDangerouslySetInnerHtml: Shiki generates trusted HTML from code strings
              dangerouslySetInnerHTML={{ __html: highlightedHtml }}
              className="[&_pre]:!bg-transparent [&_pre]:!m-0 [&_pre]:!p-0 [&_code]:!bg-transparent [&_.line]:leading-[1.65]"
            />
          ) : (
            <code className="text-text-tertiary whitespace-pre-wrap">
              {value || ' '}
            </code>
          )}
        </pre>

        {/* Transparent textarea for input */}
        <textarea
          ref={(node) => {
            if (node) textareaRef.current = node;
            if (typeof ref === 'function') ref(node);
            else if (ref) ref.current = node;
          }}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onScroll={handleScroll}
          className={twMerge(
            'absolute inset-0 h-full w-full resize-none bg-transparent p-3 font-mono text-[13px] leading-tight text-transparent caret-text-primary outline-none placeholder:text-text-tertiary',
            className,
          )}
          spellCheck={false}
          style={{
            fontFamily: 'inherit',
            lineHeight: '1.3rem',
          }}
          {...props}
        />
      </div>
    );
  },
);
CodeInputTextarea.displayName = 'CodeInputTextarea';

const CodeInput = {
  Root: CodeInputRoot,
  Body: CodeInputBody,
  LineNumbers: CodeInputLineNumbers,
  Textarea: CodeInputTextarea,
};

export default CodeInput;
export type {
  CodeInputLineNumbersProps,
  CodeInputRootProps,
  CodeInputTextareaProps,
  LanguageId,
};
