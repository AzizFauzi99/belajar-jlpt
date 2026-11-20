import Study from './study';
import type { StudyType } from '@/lib/exercise';
import type { KanaDeck } from '@/lib/next';

const FOCUS: StudyType[] = ['kana', 'vocab', 'kanji', 'grammar'];
const DECKS: KanaDeck[] = ['all', 'hiragana', 'katakana', 'word'];

export default async function StudyPage({
  searchParams,
}: {
  searchParams: Promise<{ focus?: string; deck?: string }>;
}) {
  const sp = await searchParams;
  const focus = FOCUS.includes(sp.focus as StudyType) ? (sp.focus as StudyType) : undefined;
  const deck =
    focus === 'kana' && DECKS.includes(sp.deck as KanaDeck) ? (sp.deck as KanaDeck) : undefined;
  return <Study focus={focus} initialDeck={deck} />;
}
