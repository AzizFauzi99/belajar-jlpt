import Link from 'next/link';
import { asReading, completedReading, listItems } from '@/lib/content';
import { getDb, getUser } from '@/lib/server';

export const dynamic = 'force-dynamic';

export default async function ReadingPage() {
  const db = getDb();
  const { user } = getUser(db);
  const done = completedReading(db, user.id);
  const items = listItems(db, 'reading').map((r) => ({ row: r, p: asReading(r) }));

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold">Membaca · 読解</h1>
        <p className="mt-1 text-sm text-stone-500">
          {items.length} bacaan pendek N5. Baca teks, cek terjemahan, lalu jawab soal pemahaman.
        </p>
      </header>

      <div className="grid gap-2 sm:grid-cols-2">
        {items.map(({ row, p }) => {
          const isDone = done.has(`reading:${p.id}`);
          return (
            <Link
              key={row.id}
              href={`/reading/${p.id}`}
              className="rounded-2xl border border-stone-200 bg-white p-5 transition hover:border-stone-400 dark:border-stone-800 dark:bg-stone-900 dark:hover:border-stone-600"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="font-semibold">{p.title}</div>
                {isDone && <span className="text-xs text-emerald-600 dark:text-emerald-400">✓ selesai</span>}
              </div>
              <div className="mt-1 text-xs uppercase tracking-wide text-stone-400">{p.topic}</div>
              <p className="mt-2 line-clamp-2 text-sm text-stone-500">{p.text}</p>
              <div className="mt-3 text-xs text-stone-400">{p.questions.length} soal</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
