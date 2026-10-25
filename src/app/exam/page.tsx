import Link from 'next/link';
import { desc, eq } from 'drizzle-orm';
import { examAttempts } from '@/db/schema';
import { listItems } from '@/lib/content';
import { getDb, getUser } from '@/lib/server';

export const dynamic = 'force-dynamic';

export default async function ExamPage() {
  const db = getDb();
  const { user } = getUser(db);
  const history = db
    .select()
    .from(examAttempts)
    .where(eq(examAttempts.userId, user.id))
    .orderBy(desc(examAttempts.takenAt))
    .limit(10)
    .all();

  const totals = {
    kanji: listItems(db, 'kanji').length,
    vocab: listItems(db, 'vocab').length,
    grammar: listItems(db, 'grammar').length,
    reading: listItems(db, 'reading').length,
    listening: listItems(db, 'listening').length,
  };

  const best = history.reduce((m, a) => Math.max(m, a.totalCorrect), 0);
  const bestPct = history.length > 0 ? Math.round((best / history[0].totalQuestions) * 100) : null;

  return (
    <div className="mx-auto max-w-3xl space-y-7">
      <header>
        <h1 className="text-2xl font-bold">Simulasi ujian JLPT N5</h1>
        <p className="mt-1 text-sm text-stone-500">
          Format latihan mengikuti empat bagian ujian: 文字・語彙, 文法, 読解, dan 聴解.
        </p>
      </header>

      <section className="rounded-2xl border border-stone-200 bg-white p-6 dark:border-stone-800 dark:bg-stone-900">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl bg-stone-100 p-4 dark:bg-stone-800">
            <div className="text-sm text-stone-500">Jumlah soal</div>
            <div className="text-2xl font-semibold">51 soal</div>
            <div className="mt-1 text-xs text-stone-500">20 文字・語彙 · 15 文法 · 8 読解 · 8 聴解</div>
          </div>
          <div className="rounded-xl bg-stone-100 p-4 dark:bg-stone-800">
            <div className="text-sm text-stone-500">Waktu & kelulusan</div>
            <div className="text-2xl font-semibold">75 menit</div>
            <div className="mt-1 text-xs text-stone-500">Nilai lulus 60% (31/51)</div>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <Link
            href="/exam/run"
            className="rounded-xl bg-stone-900 px-6 py-3 font-medium text-white hover:bg-stone-700 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-300"
          >
            Mulai simulasi
          </Link>
          <span className="text-xs text-stone-500">
            Soal diambil acak dari {totals.kanji} kanji, {totals.vocab} kosakata, {totals.grammar} pola,{' '}
            {totals.reading} bacaan, {totals.listening} dialog.
          </span>
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-semibold">Riwayat</h2>
        {history.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-stone-300 p-6 text-center text-sm text-stone-500 dark:border-stone-700">
            Belum ada percobaan. Mulai simulasi pertama untuk melihat perkembanganmu.
          </p>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-stone-200 dark:border-stone-800">
            <table className="w-full text-sm">
              <thead className="bg-stone-100 text-left text-xs uppercase tracking-wide text-stone-500 dark:bg-stone-900">
                <tr>
                  <th className="px-4 py-2">Tanggal</th>
                  <th className="px-4 py-2">Nilai</th>
                  <th className="px-4 py-2">Hasil</th>
                  <th className="px-4 py-2 text-right">Durasi</th>
                </tr>
              </thead>
              <tbody>
                {history.map((a) => (
                  <tr key={a.id} className="border-t border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-950">
                    <td className="px-4 py-3">{a.takenAt.toLocaleDateString('id-ID')}</td>
                    <td className="px-4 py-3 tabular-nums">
                      {a.totalCorrect}/{a.totalQuestions}{' '}
                      <span className="text-stone-400">({Math.round((a.totalCorrect / a.totalQuestions) * 100)}%)</span>
                    </td>
                    <td className={`px-4 py-3 ${a.passed ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                      {a.passed ? 'Lulus' : 'Belum lulus'}
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums">{Math.round(a.durationSec / 60)} mnt</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {bestPct !== null && (
          <p className="mt-2 text-xs text-stone-500">
            Nilai terbaik: {best}/{history[0].totalQuestions} ({bestPct}%)
          </p>
        )}
      </section>

      <section className="rounded-2xl border border-stone-200 bg-white p-5 text-sm text-stone-600 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-300">
        <h2 className="text-base font-semibold text-stone-900 dark:text-stone-100">Tips</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>Kerjakan 文字・語彙 lebih dulu, lalu 文法 dan 読解.</li>
          <li>Bagian 聴解 memakai suara perangkat. Pastikan volume menyala dan kamu bisa memutar ulang.</li>
          <li>Jangan terlalu lama di satu soal; tandai dan lanjutkan.</li>
          <li>Setelah selesai, baca pembahasan dan ulangi latihan pada skill yang lemah.</li>
        </ul>
      </section>
    </div>
  );
}
