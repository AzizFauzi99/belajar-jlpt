import Study from './study';
import type { StudyType } from '@/lib/exercise';

const FOCUS: StudyType[] = ['kana', 'vocab', 'kanji', 'grammar'];

export default async function StudyPage({
  searchParams,
}: {
  searchParams: Promise<{ focus?: string }>;
}) {
  const sp = await searchParams;
  const focus = FOCUS.includes(sp.focus as StudyType) ? (sp.focus as StudyType) : undefined;
  return <Study focus={focus} />;
}
