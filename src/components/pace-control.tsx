'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const OPTIONS = [
  { id: 'santai', label: 'Santai' },
  { id: 'normal', label: 'Normal' },
  { id: 'ngebut', label: 'Ngebut' },
] as const;

export default function PaceControl({ initial }: { initial: string }) {
  const router = useRouter();
  const [pace, setPace] = useState(initial);

  async function choose(id: string) {
    setPace(id);
    await fetch('/api/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pace: id }),
    });
    router.refresh();
  }

  return (
    <div className="inline-flex rounded-xl border border-stone-300 p-1 dark:border-stone-700">
      {OPTIONS.map((o) => (
        <button
          key={o.id}
          onClick={() => choose(o.id)}
          className={`rounded-lg px-3 py-1 text-sm ${
            pace === o.id ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900' : 'text-stone-500'
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
