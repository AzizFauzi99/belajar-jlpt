import { and, count, eq, gte, like, lte, sql } from 'drizzle-orm';
import type { Db } from '@/db/client';
import { cardState, items, lessonProgress, reviewLog } from '@/db/schema';

const MASTERED_STABILITY_DAYS = 30;
const STUDY_TYPES = ['kana', 'vocab', 'kanji', 'grammar'] as const;
type StudyType = (typeof STUDY_TYPES)[number];

const startOfToday = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
};

const ymd = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

function completed(db: Db, userId: number, prefix: string) {
  return (
    db
      .select({ n: count() })
      .from(lessonProgress)
      .where(
        and(
          eq(lessonProgress.userId, userId),
          eq(lessonProgress.status, 'completed'),
          like(lessonProgress.lessonKey, `${prefix}%`),
        ),
      )
      .get()?.n ?? 0
  );
}

export function getStats(db: Db, userId: number) {
  const totals = new Map(
    db.select({ type: items.type, n: count() }).from(items).groupBy(items.type).all().map((r) => [r.type, r.n]),
  );

  const rows = db
    .select({ type: items.type, stability: cardState.stability })
    .from(cardState)
    .innerJoin(items, eq(items.id, cardState.itemId))
    .where(eq(cardState.userId, userId))
    .all();

  const byType = {} as Record<
    StudyType,
    { total: number; learned: number; mastered: number }
  >;
  for (const t of STUDY_TYPES) {
    const rs = rows.filter((r) => r.type === t);
    byType[t] = {
      total: totals.get(t) ?? 0,
      learned: rs.length,
      mastered: rs.filter((r) => r.stability >= MASTERED_STABILITY_DAYS).length,
    };
  }

  const totalItems = STUDY_TYPES.reduce((s, t) => s + byType[t].total, 0);
  const learned = STUDY_TYPES.reduce((s, t) => s + byType[t].learned, 0);
  const mastered = STUDY_TYPES.reduce((s, t) => s + byType[t].mastered, 0);

  const dueNow =
    db
      .select({ n: count() })
      .from(cardState)
      .where(and(eq(cardState.userId, userId), lte(cardState.due, new Date())))
      .get()?.n ?? 0;

  const weekAgo = new Date(Date.now() - 7 * 86_400_000);
  const week = db
    .select({ total: count(), right: sql<number>`coalesce(sum(${reviewLog.correct}), 0)` })
    .from(reviewLog)
    .where(and(eq(reviewLog.userId, userId), gte(reviewLog.reviewedAt, weekAgo)))
    .get();
  const accuracy7d = week && week.total > 0 ? Math.round((Number(week.right) / week.total) * 100) : null;

  const reviewsToday =
    db
      .select({ n: count() })
      .from(reviewLog)
      .where(and(eq(reviewLog.userId, userId), gte(reviewLog.reviewedAt, startOfToday())))
      .get()?.n ?? 0;

  const dayRows = db.all<{ day: string }>(
    sql`SELECT DISTINCT strftime('%Y-%m-%d', reviewed_at/1000, 'unixepoch', 'localtime') AS day
        FROM review_log WHERE user_id = ${userId} ORDER BY day DESC`,
  );
  const days = new Set(dayRows.map((r) => r.day));
  let streak = 0;
  const cursor = new Date();
  if (!days.has(ymd(cursor))) cursor.setDate(cursor.getDate() - 1);
  while (days.has(ymd(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  const readingTotal = totals.get('reading') ?? 0;
  const listeningTotal = totals.get('listening') ?? 0;

  return {
    totalItems,
    learned,
    mastered,
    dueNow,
    accuracy7d,
    reviewsToday,
    streak,
    byType,
    reading: { total: readingTotal, done: completed(db, userId, 'reading:') },
    listening: { total: listeningTotal, done: completed(db, userId, 'listening:') },
  };
}
