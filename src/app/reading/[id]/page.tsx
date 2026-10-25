import Link from 'next/link';
import { notFound } from 'next/navigation';
import ComprehensionQuiz from '@/components/comprehension-quiz';
import SpeakButton from '@/components/speak-button';
import TranslationToggle from '@/components/translation-toggle';
import { asReading, completedReading, getItem } from '@/lib/content';
import { getDb, getUser } from '@/lib/server';

export const dynamic = 'force-dynamic';

export default async function ReadingDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const db = getDb();
  const { user } = getUser(db);
  const row = getItem(db, 'reading', id);
  if (!row) notFound();
  const p = asReading(row);
  const initialDone = completedReading(db, user.id).has(`reading:${p.id}`);

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Link href="/reading" className="text-sm text-stone-500 hover:underline">← Membaca</Link>

      <header>
        <div className="text-xs uppercase tracking-wide text-stone-500">{p.topic}</div>
        <h1 className="mt-1 text-2xl font-bold">{p.title}</h1>
      </header>

      <section className="rounded-2xl border border-stone-200 bg-white p-6 dark:border-stone-800 dark:bg-stone-900">
        <div className="mb-4 flex justify-end">
          <SpeakButton text={p.text} label="🔊 Bacakan" />
        </div>
        <TranslationToggle text={p.text} translation={p.translation} notes={p.notes} />
      </section>

      <ComprehensionQuiz
        questions={p.questions}
        lessonKey={`reading:${p.id}`}
        initialDone={initialDone}
      />

      <div className="flex justify-between text-sm">
        <Link href="/reading" className="text-stone-500 hover:underline">← Semua bacaan</Link>
        <Link href="/study?focus=vocab" className="text-stone-500 hover:underline">Latihan kosakata →</Link>
      </div>
    </div>
  );
}
