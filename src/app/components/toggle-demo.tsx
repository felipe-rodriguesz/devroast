'use client';

import { useState } from 'react';

import { Toggle } from '@/components/ui/toggle';

export function ToggleDemo() {
  const [checked, setChecked] = useState(false);

  return (
    <div className="flex items-center gap-4 flex-wrap">
      <Toggle
        checked={checked}
        onCheckedChange={setChecked}
        label={checked ? '$ enabled' : '$ disabled'}
      />
      <Toggle
        checked={checked}
        onCheckedChange={setChecked}
        label={checked ? '$ enabled' : '$ disabled'}
      />
      <Toggle disabled label="$ disabled" />
    </div>
  );
}
