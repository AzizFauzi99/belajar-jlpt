import Link from 'next/link';
import { notFound } from 'next/navigation';
import SpeakButton from '@/components/speak-button';
import { asGrammar, getItemById } from '@/lib/content';
import { getDb } from '@/lib/server';

export const dynamic = 'force-dynamic';

export default async function GrammarDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const db = getDb();
  const row = getItemById(db, Number(id));
  if (!row || row.type !== 'grammar') notFound();
  const g = asGrammar(row);

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Link href="/grammar" className="text-sm text-stone-500 hover:underline">← Tata bahasa</Link>

      <header>
        <div className="text-xs uppercase tracking-wide text-stone-500">{g.category}</div>
        <h1 className="mt-1 text-4xl font-bold">{g.pattern}</h1>
        <p className="mt-2 text-lg">{g.meaning}</p>
      </header>

      <section className="rounded-2xl border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-900">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-stone-500">Bentuk</h2>
        <p className="mt-1">{g.formation}</p>
        <h2 className="mt-4 text-sm font-semibold uppercase tracking-wide text-stone-500">Penjelasan</h2>
        <p className="mt-1 text-stone-600 dark:text-stone-300">{g.explanation}</p>
      </section>

      <section className="rounded-2xl border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-900">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-stone-500">Contoh</h2>
        <div className="mt-3 space-y-4">
          {g.examples.map((ex) => (
            <div key={ex.jp}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-lg">{ex.jp}</div>
                  <div className="text-sm text-stone-500">{ex.id}</div>
                </div>
                <SpeakButton text={ex.jp} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-900">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-stone-500">Latihan isian</h2>
        <p className="mt-2 text-lg">{g.cloze}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {g.options.map((o) => (
            <span
              key={o}
              className={`rounded-lg border px-3 py-1 text-sm ${
                o === g.answer
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200'
                  : 'border-stone-300 dark:border-stone-700'
              }`}
            >
              {o}
            </span>
          ))}
        </div>
        <p className="mt-3 text-xs text-stone-500">Jawaban benar ditandai hijau.</p>
      </section>

      <Link
        href="/study?focus=grammar"
        className="inline-block rounded-xl bg-stone-900 px-5 py-2 text-sm font-medium text-white dark:bg-stone-100 dark:text-stone-900"
      >
        Latihan tata bahasa
      </Link>
    </div>
  );
}
