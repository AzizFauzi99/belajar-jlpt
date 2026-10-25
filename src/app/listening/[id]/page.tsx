import Link from 'next/link';
import { notFound } from 'next/navigation';
import ComprehensionQuiz from '@/components/comprehension-quiz';
import ListeningPlayer from '@/components/listening-player';
import { asListening, completedListening, getItem } from '@/lib/content';
import { getDb, getUser } from '@/lib/server';

export const dynamic = 'force-dynamic';

export default async function ListeningDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const db = getDb();
  const { user } = getUser(db);
  const row = getItem(db, 'listening', id);
  if (!row) notFound();
  const t = asListening(row);
  const initialDone = completedListening(db, user.id).has(`listening:${t.id}`);

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Link href="/listening" className="text-sm text-stone-500 hover:underline">← Mendengarkan</Link>

      <header>
        <div className="text-xs uppercase tracking-wide text-stone-500">{t.topic}</div>
        <h1 className="mt-1 text-2xl font-bold">{t.title}</h1>
      </header>

      <ListeningPlayer title={t.title} lines={t.lines} translation={t.translation} notes={t.notes} />

      <ComprehensionQuiz
        questions={t.questions}
        lessonKey={`listening:${t.id}`}
        initialDone={initialDone}
      />

      <div className="flex justify-between text-sm">
        <Link href="/listening" className="text-stone-500 hover:underline">← Semua dialog</Link>
        <Link href="/study?focus=grammar" className="text-stone-500 hover:underline">Latihan tata bahasa →</Link>
      </div>
    </div>
  );
}
