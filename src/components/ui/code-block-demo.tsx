import { CodeBlock } from "@/components/ui/code-block.server";

export function CodeBlockDemo() {
  return (
    <CodeBlock
      code={`function calculateTotal(items: number[]): number {
  return items.reduce((sum, item) => sum + item, 0);
}`}
      language="typescript"
      filename="calculate.ts"
    />
  );
}
