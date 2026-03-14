'use client';

import { forwardRef, type TextareaHTMLAttributes } from 'react';

import CodeInput from '@/components/ui/code-input';

interface CodeEditorProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
  value: string;
  onChange: (value: string) => void;
}

const CodeEditor = forwardRef<HTMLTextAreaElement, CodeEditorProps>(
  ({ value, onChange, className, ...props }, ref) => {
    return (
      <CodeInput.Root className={className}>
        <CodeInput.Header />
        <CodeInput.Body>
          <CodeInput.LineNumbers count={16} />
          <CodeInput.Textarea
            ref={ref}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="// paste your code here..."
            {...props}
          />
        </CodeInput.Body>
      </CodeInput.Root>
    );
  },
);

CodeEditor.displayName = 'CodeEditor';

export { CodeEditor };
