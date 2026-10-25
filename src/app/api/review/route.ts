import { NextResponse } from 'next/server';
import { getDb, getUser } from '@/lib/server';
import { recordReview } from '@/lib/review-service';
import type { Grade } from '@/lib/srs';

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const itemId = Number(body?.itemId);
  const rating = Number(body?.rating);
  const exerciseType = typeof body?.exerciseType === 'string' ? body.exerciseType : '';
  const durationMs = body?.durationMs == null ? undefined : Number(body.durationMs);

  if (!Number.isInteger(itemId) || ![1, 2, 3, 4].includes(rating) || !exerciseType) {
    return NextResponse.json({ error: 'input tidak valid' }, { status: 400 });
  }

  const db = getDb();
  const { user } = getUser(db);
  try {
    const next = recordReview(db, {
      userId: user.id,
      itemId,
      rating: rating as Grade,
      exerciseType,
      durationMs: Number.isFinite(durationMs) ? durationMs : undefined,
    });
    return NextResponse.json({ due: next.due, state: next.state });
  } catch {
    return NextResponse.json({ error: 'item tidak ditemukan' }, { status: 400 });
  }
}
