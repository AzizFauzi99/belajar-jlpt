import Link from 'next/link';
import { listItems, asVocab, type ItemRow } from '@/lib/content';
import { getDb } from '@/lib/server';

export const dynamic = 'force-dynamic';

const PER_PAGE = 60;

export default async function VocabPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; cat?: string; page?: string }>;
}) {
  const sp = await searchParams;
  const q = (sp.q ?? '').trim().toLowerCase();
  const cat = sp.cat ?? '';
  const page = Math.max(1, Number(sp.page ?? 1) || 1);

  const db = getDb();
  const all = listItems(db, 'vocab').map((r) => ({ row: r, v: asVocab(r) }));

  const categories = [...new Set(all.map((x) => x.v.category))].sort();
  const filtered = all.filter(({ v }) => {
    if (cat && v.category !== cat) return false;
    if (!q) return true;
    return (
      v.word.toLowerCase().includes(q) ||
      v.reading.toLowerCase().includes(q) ||
      v.meaning.toLowerCase().includes(q)
    );
  });

  const pages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const current = Math.min(page, pages);
  const slice = filtered.slice((current - 1) * PER_PAGE, current * PER_PAGE);

  const href = (patch: Record<string, string | number | undefined>) => {
    const p = new URLSearchParams();
    if (q) p.set('q', q);
    if (cat) p.set('cat', cat);
    p.set('page', String(current));
    for (const [k, v] of Object.entries(patch)) {
      if (v === undefined || v === '') p.delete(k);
      else p.set(k, String(v));
    }
    return `/vocab?${p}`;
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Kosakata N5</h1>
          <p className="mt-1 text-sm text-stone-500">
            {all.length} kata · cari arti, kata, atau cara baca.
          </p>
        </div>
        <Link
          href="/study?focus=vocab"
          className="rounded-xl bg-stone-900 px-4 py-2 text-sm font-medium text-white dark:bg-stone-100 dark:text-stone-900"
        >
          Latihan kosakata
        </Link>
      </header>

      <form className="flex flex-wrap gap-2" action="/vocab">
        <input
          name="q"
          defaultValue={sp.q ?? ''}
          placeholder="Cari: air, みず, 水…"
          className="min-w-0 flex-1 rounded-xl border border-stone-300 bg-transparent px-4 py-2 outline-none focus:border-emerald-500 dark:border-stone-700"
        />
        {cat && <input type="hidden" name="cat" value={cat} />}
        <button className="rounded-xl border border-stone-300 px-4 py-2 text-sm dark:border-stone-700">Cari</button>
        {(q || cat) && <Link href="/vocab" className="rounded-xl px-4 py-2 text-sm text-stone-500 underline">Reset</Link>}
      </form>

      <div className="flex flex-wrap gap-1.5">
        <Link
          href={href({ cat: undefined, page: 1 })}
          className={`rounded-full border px-3 py-1 text-xs ${!cat ? 'border-stone-900 bg-stone-900 text-white dark:border-stone-100 dark:bg-stone-100 dark:text-stone-900' : 'border-stone-300 dark:border-stone-700'}`}
        >
          Semua
        </Link>
        {categories.map((c) => (
          <Link
            key={c}
            href={href({ cat: c, page: 1 })}
            className={`rounded-full border px-3 py-1 text-xs ${cat === c ? 'border-stone-900 bg-stone-900 text-white dark:border-stone-100 dark:bg-stone-100 dark:text-stone-900' : 'border-stone-300 text-stone-600 dark:border-stone-700 dark:text-stone-300'}`}
          >
            {c}
          </Link>
        ))}
      </div>

      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {slice.map(({ row, v }: { row: ItemRow; v: ReturnType<typeof asVocab> }) => (
          <div key={row.id} className="rounded-xl border border-stone-200 bg-white p-4 dark:border-stone-800 dark:bg-stone-900">
            <div className="flex items-baseline justify-between gap-2">
              <div className="text-lg font-semibold">{v.word}</div>
              <div className="text-xs text-stone-400">{v.pos}</div>
            </div>
            {v.word !== v.reading && <div className="text-sm text-stone-500">{v.reading}</div>}
            <div className="mt-1 text-sm">{v.meaning}</div>
            <div className="mt-2 text-[11px] uppercase tracking-wide text-stone-400">{v.category}</div>
          </div>
        ))}
      </div>

      {slice.length === 0 && <p className="py-10 text-center text-stone-500">Tidak ada kosakata yang cocok.</p>}

      {pages > 1 && (
        <div className="flex items-center justify-center gap-3 text-sm">
          {current > 1 ? (
            <Link href={href({ page: current - 1 })} className="rounded-lg border border-stone-300 px-3 py-1 dark:border-stone-700">
              ← Sebelumnya
            </Link>
          ) : (
            <span className="px-3 py-1 text-stone-400">← Sebelumnya</span>
          )}
          <span className="tabular-nums text-stone-500">{current} / {pages}</span>
          {current < pages ? (
            <Link href={href({ page: current + 1 })} className="rounded-lg border border-stone-300 px-3 py-1 dark:border-stone-700">
              Berikutnya →
            </Link>
          ) : (
            <span className="px-3 py-1 text-stone-400">Berikutnya →</span>
          )}
        </div>
      )}
    </div>
  );
}
