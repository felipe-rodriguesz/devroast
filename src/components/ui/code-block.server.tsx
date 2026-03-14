import { codeToHtml } from 'shiki';

export interface CodeBlockProps {
  code: string;
  language: string;
  filename?: string;
}

export async function CodeBlock({ code, language, filename }: CodeBlockProps) {
  const html = await codeToHtml(code, {
    lang: language,
    theme: 'vesper',
  });

  return (
    <div className="rounded-md border border-neutral-800 overflow-hidden">
      {filename && (
        <div className="border-b border-neutral-800 bg-neutral-900 px-4 py-2 text-xs font-mono text-neutral-400">
          {filename}
        </div>
      )}
      <div
        className="bg-neutral-900 overflow-x-auto p-4 text-sm font-mono"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: shiki generates safe HTML
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
