import { ComponentsPageClient } from '@/components/components-page-client';
import { CodeBlockDemo } from '@/components/ui/code-block-demo';

export default function ComponentsPage() {
  return (
    <>
      <ComponentsPageClient />
      <section className="space-y-6 px-8 pb-12">
        <h2 className="text-2xl font-semibold text-white">CodeBlock</h2>
        <div className="space-y-4">
          <CodeBlockDemo />
        </div>
      </section>
    </>
  );
}
