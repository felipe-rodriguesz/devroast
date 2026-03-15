"use client";

import { useState } from "react";
import { useShikiHighlighter } from "@/hooks/use-shiki-highlighter";

const COLLAPSED_HEIGHT = 120;
const COLLAPSIBLE_THRESHOLD = 5;

type CodePreviewProps = {
  code: string;
  language: string;
};

function CodePreview({ code, language }: CodePreviewProps) {
  const { highlight, isReady } = useShikiHighlighter();
  const [open, setOpen] = useState(false);
  const lines = code.split("\n");
  const lineCount = lines.length;
  const isCollapsible = lineCount > COLLAPSIBLE_THRESHOLD;

  const highlightedCode = highlight(code, language);

  return (
    <div className="flex flex-col">
      {/* Code display */}
      <div className="flex bg-bg-input">
        {/* Line numbers */}
        <div className="flex flex-col items-end gap-1.5 py-3 px-2.5 w-10 border-r border-border-primary bg-bg-surface select-none">
          {lines.map((_, i) => (
            <span
              key={`ln-${i.toString()}`}
              className="font-mono text-[13px] leading-tight text-text-tertiary"
            >
              {i + 1}
            </span>
          ))}
        </div>

        {/* Code */}
        <div
          className="relative flex-1 overflow-hidden transition-[max-height] duration-300 ease-in-out"
          style={
            isCollapsible && !open
              ? { maxHeight: COLLAPSED_HEIGHT }
              : { maxHeight: "none" }
          }
        >
          <div className="p-3 font-mono text-[13px] leading-tight [&_pre]:!bg-transparent [&_pre]:!m-0 [&_pre]:!p-0 [&_code]:!bg-transparent [&_.line]:leading-[1.65]">
            <div
              dangerouslySetInnerHTML={
                isReady
                  ? { __html: highlightedCode }
                  : { __html: escapeHtml(code) }
              }
            />
          </div>

          {/* Gradient fade — visible only when collapsed */}
          {isCollapsible && !open && (
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-bg-input to-transparent"
              aria-hidden
            />
          )}
        </div>
      </div>

      {/* Expand/Collapse button */}
      {isCollapsible && (
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="flex items-center justify-center gap-1.5 w-full py-2 border-t border-border-primary font-mono text-xs text-text-secondary enabled:hover:bg-bg-elevated enabled:hover:text-text-primary transition-colors cursor-pointer"
        >
          {open ? "show less" : `show more (${lineCount} lines)`}
        </button>
      )}
    </div>
  );
}

function escapeHtml(text: string): string {
  return `<pre style="background:transparent;margin:0;padding:0"><code>${text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")}</code></pre>`;
}

export { CodePreview };
