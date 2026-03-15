'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { CodeEditor, MAX_CHARACTERS } from '@/components/code-editor';
import { Button } from '@/components/ui/button';
import { Toggle } from '@/components/ui/toggle';
import { useLanguageDetection } from '@/hooks/use-language-detection';
import { useTRPCClient } from '@/trpc/client';

function HomeEditor() {
  const [code, setCode] = useState('');
  const [roastMode, setRoastMode] = useState(true);
  const [manualLanguage, setManualLanguage] = useState<string | null>(null);
  const { detectedLanguage } = useLanguageDetection(code);
  const router = useRouter();
  const trpcClient = useTRPCClient();

  const [isLoading, setIsLoading] = useState(false);

  const resolvedLanguage = manualLanguage ?? detectedLanguage;

  const handleRoast = async () => {
    if (!code.trim()) return;

    setIsLoading(true);
    try {
      const result = await trpcClient.roast.create.mutate({
        code,
        language: resolvedLanguage || 'auto-detect',
        roastMode,
      });
      router.push(`/roast/${result.id}`);
    } catch (error) {
      console.error('Roast failed:', error);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-8 w-full">
      <CodeEditor
        value={code}
        onChange={setCode}
        language={resolvedLanguage}
        onLanguageChange={setManualLanguage}
        className="w-full max-w-3xl"
      />

      {/* Actions Bar */}
      <div className="flex items-center justify-between w-full max-w-3xl">
        <div className="flex items-center gap-4">
          <Toggle
            checked={roastMode}
            onCheckedChange={setRoastMode}
            label="roast mode"
          />
          <span className="font-mono text-xs text-text-tertiary">
            {'// maximum sarcasm enabled'}
          </span>
        </div>

        <Button
          variant="primary"
          size="lg"
          disabled={
            code.trim().length === 0 ||
            code.length > MAX_CHARACTERS ||
            isLoading
          }
          onClick={handleRoast}
        >
          {isLoading ? '$ roasting...' : '$ roast_my_code'}
        </Button>
      </div>
    </div>
  );
}

export { HomeEditor };
