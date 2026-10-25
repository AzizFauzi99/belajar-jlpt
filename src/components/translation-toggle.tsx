'use client';

import { useState } from 'react';

export default function TranslationToggle({
  text,
  translation,
  notes,
}: {
  text: string;
  translation: string;
  notes?: string[];
}) {
  const [show, setShow] = useState(false);
  return (
    <div>
      <div className="text-lg leading-loose">{text}</div>
      {notes && notes.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {notes.map((n) => (
            <span key={n} className="rounded bg-stone-100 px-2 py-1 text-xs text-stone-600 dark:bg-stone-800 dark:text-stone-300">
              {n}
            </span>
          ))}
        </div>
      )}
      <button
        onClick={() => setShow((s) => !s)}
        className="mt-4 rounded-xl border border-stone-300 px-3 py-1.5 text-sm dark:border-stone-700"
      >
        {show ? 'Sembunyikan terjemahan' : 'Tampilkan terjemahan'}
      </button>
      {show && (
        <div className="mt-3 rounded-xl bg-stone-100 p-3 text-sm text-stone-600 dark:bg-stone-800 dark:text-stone-300">
          {translation}
        </div>
      )}
    </div>
  );
}
