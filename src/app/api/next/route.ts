import { NextResponse } from 'next/server';
import { getDb, getUser } from '@/lib/server';
import { nextBatch, type KanaDeck, type Mode } from '@/lib/next';
import type { StudyType } from '@/lib/exercise';

export const dynamic = 'force-dynamic';

const FOCUS: StudyType[] = ['kana', 'vocab', 'kanji', 'grammar'];
const DECKS: KanaDeck[] = ['all', 'hiragana', 'katakana', 'word'];

export function GET(req: Request) {
  const q = new URL(req.url).searchParams;
  const m = q.get('mode');
  const mode: Mode = m === 'new' || m === 'ahead' || m === 'drill' ? m : 'auto';
  const f = q.get('focus');
  const focus = FOCUS.includes(f as StudyType) ? (f as StudyType) : undefined;
  const d = q.get('deck');
  const deck = focus === 'kana' && DECKS.includes(d as KanaDeck) ? (d as KanaDeck) : undefined;
  const db = getDb();
  const { user } = getUser(db);
  return NextResponse.json(nextBatch(db, user.id, { mode, focus, deck }));
}
