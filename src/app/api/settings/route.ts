import { NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { settings } from '@/db/schema';
import { getDb, getUser } from '@/lib/server';

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const patch: Partial<typeof settings.$inferInsert> = {};

  if (body?.pace !== undefined) {
    if (!['santai', 'normal', 'ngebut'].includes(body.pace)) {
      return NextResponse.json({ error: 'pace tidak valid' }, { status: 400 });
    }
    patch.pace = body.pace;
  }
  if (body?.desiredRetention !== undefined) {
    const r = Number(body.desiredRetention);
    if (!(r >= 0.7 && r <= 0.97)) {
      return NextResponse.json({ error: 'desiredRetention harus 0.70-0.97' }, { status: 400 });
    }
    patch.desiredRetention = r;
  }
  if (body?.examDate !== undefined) {
    const v = body.examDate;
    if (v === null || v === '') patch.examDate = null;
    else if (typeof v === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(v)) patch.examDate = v;
    else return NextResponse.json({ error: 'examDate harus YYYY-MM-DD atau null' }, { status: 400 });
  }
  if (Object.keys(patch).length === 0) return NextResponse.json({ error: 'tidak ada perubahan' }, { status: 400 });

  const db = getDb();
  const { user } = getUser(db);
  db.update(settings).set(patch).where(eq(settings.userId, user.id)).run();
  return NextResponse.json({ ok: true });
}
