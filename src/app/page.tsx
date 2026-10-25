import Link from 'next/link';
import { desc, eq } from 'drizzle-orm';
import PaceControl from '@/components/pace-control';
import { examAttempts } from '@/db/schema';
import { computeState } from '@/lib/next';
import { getDb, getUser } from '@/lib/server';
import { getStats } from '@/lib/stats';

export const dynamic = 'force-dynamic';

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-xl border border-stone-200 bg-white p-4 dark:border-stone-800 dark:bg-stone-900">
      <div className="text-2xl font-semibold tabular-nums">{value}</div>
      <div className="mt-1 text-sm text-stone-500">{label}</div>
    </div>
  );
}

function Progress({ value, total }: { value: number; total: number }) {
  const pct = total > 0 ? Math.round((value / total) * 100) : 0;
  return (
    <div className="mt-3">
      <div className="h-1.5 overflow-hidden rounded-full bg-stone-200 dark:bg-stone-800">
        <div className="h-full bg-emerald-500 transition-all" style={{ width: `${pct}%` }} />
      </div>
      <div className="mt-1 flex justify-between text-xs text-stone-500">
        <span className="tabular-nums">{value} / {total}</span>
        <span className="tabular-nums">{pct}%</span>
      </div>
    </div>
  );
}

function SkillCard({
  title,
  jp,
  href,
  studyHref,
  value,
  total,
  note,
}: {
  title: string;
  jp: string;
  href: string;
  studyHref?: string;
  value: number;
  total: number;
  note: string;
}) {
  return (
    <div className="flex flex-col rounded-2xl border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-900">
      <div className="flex items-baseline justify-between">
        <div>
          <div className="text-lg font-semibold">{title}</div>
          <div className="text-xs text-stone-400">{jp}</div>
        </div>
        <Link href={href} className="text-xs text-stone-500 underline">Lihat</Link>
      </div>
      <Progress value={value} total={total} />
      <p className="mt-3 text-xs text-stone-500">{note}</p>
      {studyHref && (
        <Link href={studyHref} className="mt-4 rounded-xl border border-stone-300 px-3 py-2 text-center text-sm hover:border-stone-500 dark:border-stone-700">
          Latihan
        </Link>
      )}
    </div>
  );
}

export default function Home() {
  const db = getDb();
  const { user, settings } = getUser(db);
  const st = computeState(db, user.id);
  const stats = getStats(db, user.id);
  const dueCount = st.learning.length + st.reviews.length;
  const fill = Math.min(100, Math.round((st.young / st.limit) * 100));
  const examDays = settings.examDate
    ? Math.ceil((new Date(`${settings.examDate}T23:59:59`).getTime() - Date.now()) / 86_400_000)
    : null;
  const lastExam = db
    .select()
    .from(examAttempts)
    .where(eq(examAttempts.userId, user.id))
    .orderBy(desc(examAttempts.takenAt))
    .limit(1)
    .get();

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold">学習 Belajar JLPT N5</h1>
        <p className="mt-1 text-stone-500">
          Kana, kosakata, kanji, tata bahasa, membaca, mendengarkan, dan simulasi ujian. Tempo mengikuti kecepatanmu.
        </p>
        {settings.examDate && (
          <p className="mt-2 text-sm">
            <span className="rounded-full bg-amber-100 px-3 py-1 text-amber-900 dark:bg-amber-950 dark:text-amber-200">
              Ujian {settings.examDate}
              {examDays !== null && (examDays >= 0 ? ` · ${examDays} hari lagi` : ' · sudah lewat')}
            </span>
          </p>
        )}
      </header>

      <section className="rounded-2xl border border-stone-200 bg-white p-6 dark:border-stone-800 dark:bg-stone-900">
        <h2 className="text-lg font-semibold">Sekarang</h2>
        <p className="mt-2 text-stone-600 dark:text-stone-400">
          {dueCount > 0
            ? `${dueCount} kartu menunggu review.`
            : st.gateOpen && st.newAvailable
              ? 'Antrean kosong. Siap menerima kartu baru.'
              : st.nextDueAt
                ? 'Belum ada yang jatuh tempo. Biarkan ingatan mengendap sebentar.'
                : 'Belum ada kartu.'}
        </p>

        <div className="mt-4">
          <div className="flex justify-between text-xs text-stone-500">
            <span>Kartu yang masih rapuh</span>
            <span className="tabular-nums">{st.young} / {st.limit}</span>
          </div>
          <div className="mt-1 h-2 overflow-hidden rounded-full bg-stone-200 dark:bg-stone-800">
            <div className={`h-full ${st.gateOpen ? 'bg-emerald-500' : 'bg-amber-500'}`} style={{ width: `${fill}%` }} />
          </div>
          <p className="mt-2 text-xs text-stone-500">
            {st.gateOpen
              ? 'Kartu baru masuk selama antrean review kosong.'
              : 'Kartu baru ditahan sampai kartu rapuh ini menguat. Kamu tetap bisa memaksa tambah kartu baru.'}
            {st.accuracy !== null && ` Akurasi terakhir ${Math.round(st.accuracy * 100)}%, batas menyesuaikan otomatis.`}
          </p>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-4">
          <Link
            href="/study"
            className="inline-block rounded-xl bg-stone-900 px-6 py-3 font-medium text-white hover:bg-stone-700 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-300"
          >
            Lanjut belajar
          </Link>
          <PaceControl initial={st.pace} />
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-semibold">Skill</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <SkillCard
            title="Kana"
            jp="ひらがな・カタカナ"
            href="/kana"
            studyHref="/study?focus=kana"
            value={stats.byType.kana.learned}
            total={stats.byType.kana.total}
            note="Hiragana dan katakana dasar."
          />
          <SkillCard
            title="Kosakata"
            jp="単語"
            href="/vocab"
            studyHref="/study?focus=vocab"
            value={stats.byType.vocab.learned}
            total={stats.byType.vocab.total}
            note="Arti dan cara baca kata N5."
          />
          <SkillCard
            title="Kanji"
            jp="漢字"
            href="/kanji"
            studyHref="/study?focus=kanji"
            value={stats.byType.kanji.learned}
            total={stats.byType.kanji.total}
            note="On'yomi, kun'yomi, arti, dan contoh kata."
          />
          <SkillCard
            title="Tata bahasa"
            jp="文法"
            href="/grammar"
            studyHref="/study?focus=grammar"
            value={stats.byType.grammar.learned}
            total={stats.byType.grammar.total}
            note="Partikel, bentuk kalimat, dan pola N5."
          />
          <SkillCard
            title="Membaca"
            jp="読解"
            href="/reading"
            value={stats.reading.done}
            total={stats.reading.total}
            note="Bacaan pendek dengan soal pemahaman."
          />
          <SkillCard
            title="Mendengarkan"
            jp="聴解"
            href="/listening"
            value={stats.listening.done}
            total={stats.listening.total}
            note="Dialog dengan audio dan soal."
          />
        </div>
      </section>

      <section className="rounded-2xl border border-stone-200 bg-white p-6 dark:border-stone-800 dark:bg-stone-900">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold">Simulasi ujian</h2>
            <p className="mt-1 text-sm text-stone-500">
              51 soal · 75 menit · 文字・語彙, 文法, 読解, 聴解. Nilai lulus 60%.
            </p>
            {lastExam && (
              <p className="mt-2 text-sm">
                Terakhir: <span className="font-medium tabular-nums">{lastExam.totalCorrect}/{lastExam.totalQuestions}</span>{' '}
                <span className={lastExam.passed ? 'text-emerald-600' : 'text-red-600'}>
                  {lastExam.passed ? 'lulus' : 'belum lulus'}
                </span>
              </p>
            )}
          </div>
          <Link
            href="/exam"
            className="rounded-xl bg-stone-900 px-6 py-3 font-medium text-white hover:bg-stone-700 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-300"
          >
            Buka ujian
          </Link>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <Stat label="Streak (hari)" value={stats.streak} />
        <Stat label="Review hari ini" value={stats.reviewsToday} />
        <Stat label="Akurasi 7 hari" value={stats.accuracy7d === null ? '-' : `${stats.accuracy7d}%`} />
        <Stat label="Item dipelajari" value={`${stats.learned}/${stats.totalItems}`} />
        <Stat label="Kuat (stabil ≥30 hari)" value={stats.mastered} />
        <Stat label="Jatuh tempo" value={stats.dueNow} />
      </section>
    </div>
  );
}
