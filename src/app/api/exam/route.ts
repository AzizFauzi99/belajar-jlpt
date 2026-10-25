import { NextResponse } from 'next/server';
import { examAttempts } from '@/db/schema';
import { getDb, getUser } from '@/lib/server';
import { buildExam } from '@/lib/exam';

export const dynamic = 'force-dynamic';

export async function GET() {
  const db = getDb();
  return NextResponse.json(buildExam(db));
}

type Body = {
  durationSec?: number;
  sections?: Array<{ key?: string; label?: string; correct?: number; total?: number }>;
};

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as Body | null;
  const sections = Array.isArray(body?.sections) ? body.sections : [];
  const clean = sections.map((s) => ({
    key: String(s.key ?? ''),
    label: String(s.label ?? ''),
    correct: Math.max(0, Math.floor(Number(s.correct ?? 0))),
    total: Math.max(0, Math.floor(Number(s.total ?? 0))),
  }));

  if (clean.length === 0 || clean.some((s) => !s.key || s.total === 0)) {
    return NextResponse.json({ error: 'hasil ujian tidak valid' }, { status: 400 });
  }

  const totalCorrect = clean.reduce((s, x) => s + x.correct, 0);
  const totalQuestions = clean.reduce((s, x) => s + x.total, 0);
  const passed = totalQuestions > 0 && totalCorrect / totalQuestions >= 0.6;
  const durationSec = Math.max(0, Math.floor(Number(body?.durationSec ?? 0)));

  const db = getDb();
  const { user } = getUser(db);
  const row = db
    .insert(examAttempts)
    .values({
      userId: user.id,
      takenAt: new Date(),
      durationSec,
      totalCorrect,
      totalQuestions,
      passed,
      sections: clean,
    })
    .returning()
    .get();

  return NextResponse.json({ id: row.id, totalCorrect, totalQuestions, passed });
}
