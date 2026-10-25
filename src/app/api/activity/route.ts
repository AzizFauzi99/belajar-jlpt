import { NextResponse } from 'next/server';
import { getDb, getUser } from '@/lib/server';
import { lessonProgress } from '@/db/schema';

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const lessonKey = typeof body?.lessonKey === 'string' ? body.lessonKey : '';
  if (!/^(reading|listening):[a-z0-9-]+$/i.test(lessonKey)) {
    return NextResponse.json({ error: 'lessonKey tidak valid' }, { status: 400 });
  }

  const db = getDb();
  const { user } = getUser(db);
  db.insert(lessonProgress)
    .values({ userId: user.id, lessonKey, status: 'completed', unlockedAt: new Date() })
    .onConflictDoUpdate({
      target: [lessonProgress.userId, lessonProgress.lessonKey],
      set: { status: 'completed', unlockedAt: new Date() },
    })
    .run();

  return NextResponse.json({ ok: true });
}
