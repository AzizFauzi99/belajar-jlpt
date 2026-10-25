import Link from 'next/link';
import { asKanji, listItems } from '@/lib/content';
import { getDb } from '@/lib/server';

export const dynamic = 'force-dynamic';

export default async function KanjiPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const sp = await searchParams;
  const q = (sp.q ?? '').trim().toLowerCase();
  const db = getDb();
  const all = listItems(db, 'kanji').map((r) => ({ row: r, k: asKanji(r) }));
  const filtered = q
    ? all.filter(
        ({ k }) =>
          k.char.includes(q) ||
          k.meaning.toLowerCase().includes(q) ||
          k.on.toLowerCase().includes(q) ||
          k.kun.toLowerCase().includes(q) ||
          k.examples.some((e) => e.includes(q)),
      )
    : all;

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Kanji N5</h1>
          <p className="mt-1 text-sm text-stone-500">{all.length} kanji · on&apos;yomi, kun&apos;yomi, arti, dan contoh kata.</p>
        </div>
        <Link
          href="/study?focus=kanji"
          className="rounded-xl bg-stone-900 px-4 py-2 text-sm font-medium text-white dark:bg-stone-100 dark:text-stone-900"
        >
          Latihan kanji
        </Link>
      </header>

      <form className="flex gap-2" action="/kanji">
        <input
          name="q"
          defaultValue={sp.q ?? ''}
          placeholder="Cari: 日, hari, ニチ…"
          className="min-w-0 flex-1 rounded-xl border border-stone-300 bg-transparent px-4 py-2 outline-none focus:border-emerald-500 dark:border-stone-700"
        />
        <button className="rounded-xl border border-stone-300 px-4 py-2 text-sm dark:border-stone-700">Cari</button>
        {q && <Link href="/kanji" className="rounded-xl px-4 py-2 text-sm text-stone-500 underline">Reset</Link>}
      </form>

      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map(({ row, k }) => (
          <div key={row.id} className="rounded-xl border border-stone-200 bg-white p-4 dark:border-stone-800 dark:bg-stone-900">
            <div className="flex items-start gap-4">
              <div className="text-5xl leading-none">{k.char}</div>
              <div className="min-w-0">
                <div className="font-medium">{k.meaning}</div>
                <div className="mt-1 text-xs text-stone-500">On: {k.on}</div>
                <div className="text-xs text-stone-500">Kun: {k.kun}</div>
                <div className="mt-1 text-[11px] text-stone-400">{k.strokes} goresan</div>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-1">
              {k.examples.slice(0, 3).map((e) => (
                <span key={e} className="rounded bg-stone-100 px-1.5 py-0.5 text-xs dark:bg-stone-800">{e}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && <p className="py-10 text-center text-stone-500">Tidak ada kanji yang cocok.</p>}
    </div>
  );
}
