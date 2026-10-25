'use client';

import { useEffect, useState } from 'react';

type Q = { q: string; options: string[]; answer: number; explanation: string };

export default function ComprehensionQuiz({
  questions,
  lessonKey,
  initialDone = false,
}: {
  questions: Q[];
  lessonKey: string;
  initialDone?: boolean;
}) {
  const [picked, setPicked] = useState<Record<number, number>>({});
  const [done, setDone] = useState(initialDone);

  const answered = Object.keys(picked).length;
  const correct = questions.reduce((s, q, i) => s + (picked[i] === q.answer ? 1 : 0), 0);
  const allAnswered = answered === questions.length;

  useEffect(() => {
    if (!allAnswered || done) return;
    fetch('/api/activity', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lessonKey }),
    })
      .then(() => setDone(true))
      .catch(() => undefined);
  }, [allAnswered, done, lessonKey]);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Soal pemahaman</h2>
        <span className="text-sm tabular-nums text-stone-500">
          {answered}/{questions.length} dijawab
          {allAnswered && ` · ${correct}/${questions.length} benar`}
        </span>
      </div>

      {questions.map((q, qi) => {
        const choice = picked[qi];
        const isAnswered = choice !== undefined;
        return (
          <div key={q.q} className="rounded-2xl border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-900">
            <div className="font-medium">{qi + 1}. {q.q}</div>
            <div className="mt-3 grid gap-2">
              {q.options.map((o, oi) => {
                let cls = 'rounded-xl border px-4 py-2 text-left text-sm transition ';
                if (!isAnswered) cls += 'border-stone-300 hover:border-stone-500 dark:border-stone-700';
                else if (oi === q.answer) cls += 'border-emerald-500 bg-emerald-50 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200';
                else if (oi === choice) cls += 'border-red-500 bg-red-50 text-red-900 dark:bg-red-950 dark:text-red-200';
                else cls += 'border-stone-200 opacity-60 dark:border-stone-800';
                return (
                  <button
                    key={o}
                    disabled={isAnswered}
                    onClick={() => setPicked((p) => ({ ...p, [qi]: oi }))}
                    className={cls}
                  >
                    {o}
                  </button>
                );
              })}
            </div>
            {isAnswered && (
              <p className={`mt-3 text-sm ${choice === q.answer ? 'text-emerald-700 dark:text-emerald-300' : 'text-red-700 dark:text-red-300'}`}>
                {choice === q.answer ? 'Benar. ' : 'Salah. '}
                <span className="text-stone-600 dark:text-stone-300">{q.explanation}</span>
              </p>
            )}
          </div>
        );
      })}

      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={() => setPicked({})}
          className="rounded-xl border border-stone-300 px-4 py-2 text-sm dark:border-stone-700"
        >
          Ulangi soal
        </button>
        {done && <span className="text-sm text-emerald-600 dark:text-emerald-400">✓ Ditandai selesai</span>}
        {allAnswered && !done && <span className="text-sm text-stone-500">Menyimpan…</span>}
      </div>
    </div>
  );
}
