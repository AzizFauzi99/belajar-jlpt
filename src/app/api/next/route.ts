import { NextResponse } from 'next/server';
import { getDb, getUser } from '@/lib/server';
import { nextBatch, type Mode } from '@/lib/next';
import type { StudyType } from '@/lib/exercise';

export const dynamic = 'force-dynamic';

const FOCUS: StudyType[] = ['kana', 'vocab', 'kanji', 'grammar'];

export function GET(req: Request) {
  const q = new URL(req.url).searchParams;
  const m = q.get('mode');
  const mode: Mode = m === 'new' || m === 'ahead' ? m : 'auto';
  const f = q.get('focus');
  const focus = FOCUS.includes(f as StudyType) ? (f as StudyType) : undefined;
  const db = getDb();
  const { user } = getUser(db);
  return NextResponse.json(nextBatch(db, user.id, { mode, focus }));
}
