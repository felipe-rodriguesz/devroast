'use client';

import { useState, useCallback, useEffect } from 'react';
import type { TextareaHTMLAttributes } from 'react';

import CodeInput, { type LanguageId } from '@/components/ui/code-input';

interface CodeEditorProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
  value: string;
  onChange: (value: string) => void;
  language?: LanguageId;
  onLanguageChange?: (language: LanguageId) => void;
}

function CodeEditor({
  value,
  onChange,
  language = 'auto',
  onLanguageChange,
  className,
  ...props
}: CodeEditorProps) {
  const [highlightedHtml, setHighlightedHtml] = useState('');
  const [lineCount, setLineCount] = useState(1);

  useEffect(() => {
    const lines = value.split('\n').length;
    setLineCount(Math.max(lines, 1));
  }, [value]);

  const handleHighlightedHtmlChange = useCallback((html: string) => {
    setHighlightedHtml(html);
  }, []);

  return (
    <CodeInput.Root
      language={language}
      onLanguageChange={onLanguageChange}
      className={className}
    >
      <CodeInput.Body>
        <CodeInput.LineNumbers count={lineCount} />
        <CodeInput.Textarea
          value={value}
          onChange={onChange}
          highlightedHtml={highlightedHtml}
          onHighlightedHtmlChange={handleHighlightedHtmlChange}
          placeholder="// paste your code here..."
          {...props}
        />
      </CodeInput.Body>
    </CodeInput.Root>
  );
}

export { CodeEditor, type CodeEditorProps, type LanguageId };
