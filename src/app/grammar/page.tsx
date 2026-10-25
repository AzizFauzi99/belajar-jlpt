import Link from 'next/link';
import { asGrammar, listItems } from '@/lib/content';
import { getDb } from '@/lib/server';

export const dynamic = 'force-dynamic';

export default async function GrammarPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const sp = await searchParams;
  const q = (sp.q ?? '').trim().toLowerCase();
  const db = getDb();
  const all = listItems(db, 'grammar').map((r) => ({ row: r, g: asGrammar(r) }));
  const filtered = q
    ? all.filter(
        ({ g }) =>
          g.pattern.toLowerCase().includes(q) ||
          g.meaning.toLowerCase().includes(q) ||
          g.formation.toLowerCase().includes(q) ||
          g.explanation.toLowerCase().includes(q),
      )
    : all;

  const categories = [...new Set(filtered.map((x) => x.g.category))];

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Tata bahasa N5</h1>
          <p className="mt-1 text-sm text-stone-500">{all.length} pola · partikel, bentuk kalimat, keterangan, dan modalitas.</p>
        </div>
        <Link
          href="/study?focus=grammar"
          className="rounded-xl bg-stone-900 px-4 py-2 text-sm font-medium text-white dark:bg-stone-100 dark:text-stone-900"
        >
          Latihan tata bahasa
        </Link>
      </header>

      <form className="flex gap-2" action="/grammar">
        <input
          name="q"
          defaultValue={sp.q ?? ''}
          placeholder="Cari: partikel, たい, karena…"
          className="min-w-0 flex-1 rounded-xl border border-stone-300 bg-transparent px-4 py-2 outline-none focus:border-emerald-500 dark:border-stone-700"
        />
        <button className="rounded-xl border border-stone-300 px-4 py-2 text-sm dark:border-stone-700">Cari</button>
        {q && <Link href="/grammar" className="rounded-xl px-4 py-2 text-sm text-stone-500 underline">Reset</Link>}
      </form>

      {categories.map((cat) => (
        <section key={cat}>
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-stone-500">{cat}</h2>
          <div className="grid gap-2 sm:grid-cols-2">
            {filtered
              .filter((x) => x.g.category === cat)
              .map(({ row, g }) => (
                <Link
                  key={row.id}
                  href={`/grammar/${row.id}`}
                  className="rounded-xl border border-stone-200 bg-white p-4 transition hover:border-stone-400 dark:border-stone-800 dark:bg-stone-900 dark:hover:border-stone-600"
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <div className="text-lg font-semibold">{g.pattern}</div>
                    <div className="text-xs text-stone-400">{g.formation}</div>
                  </div>
                  <div className="mt-1 text-sm">{g.meaning}</div>
                  <div className="mt-2 line-clamp-2 text-xs text-stone-500">{g.examples[0]?.jp}</div>
                </Link>
              ))}
          </div>
        </section>
      ))}

      {filtered.length === 0 && <p className="py-10 text-center text-stone-500">Tidak ada pola yang cocok.</p>}
    </div>
  );
}
