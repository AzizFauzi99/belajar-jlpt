import Link from 'next/link';
import { asListening, completedListening, listItems } from '@/lib/content';
import { getDb, getUser } from '@/lib/server';

export const dynamic = 'force-dynamic';

export default async function ListeningPage() {
  const db = getDb();
  const { user } = getUser(db);
  const done = completedListening(db, user.id);
  const items = listItems(db, 'listening').map((r) => ({ row: r, t: asListening(r) }));

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold">Mendengarkan · 聴解</h1>
        <p className="mt-1 text-sm text-stone-500">
          {items.length} dialog N5 dengan audio (suara perangkat), skrip, terjemahan, dan soal.
        </p>
      </header>

      <div className="grid gap-2 sm:grid-cols-2">
        {items.map(({ row, t }) => {
          const isDone = done.has(`listening:${t.id}`);
          return (
            <Link
              key={row.id}
              href={`/listening/${t.id}`}
              className="rounded-2xl border border-stone-200 bg-white p-5 transition hover:border-stone-400 dark:border-stone-800 dark:bg-stone-900 dark:hover:border-stone-600"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="font-semibold">{t.title}</div>
                {isDone && <span className="text-xs text-emerald-600 dark:text-emerald-400">✓ selesai</span>}
              </div>
              <div className="mt-1 text-xs uppercase tracking-wide text-stone-400">{t.topic}</div>
              <p className="mt-2 line-clamp-2 text-sm text-stone-500">{t.translation}</p>
              <div className="mt-3 text-xs text-stone-400">{t.lines.length} baris · {t.questions.length} soal</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
