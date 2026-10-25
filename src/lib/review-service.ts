import { and, eq } from 'drizzle-orm';
import type { Db } from '../db/client';
import { cardState, reviewLog, settings } from '../db/schema';
import { DEFAULT_RETENTION, scheduleReview, type Grade } from './srs';

export type ReviewInput = {
  userId: number;
  itemId: number;
  rating: Grade; // 1..4
  exerciseType: string;
  durationMs?: number;
  now?: Date;
};

/** Satu transaksi: update card_state + tambah baris review_log (append-only). */
export function recordReview(db: Db, input: ReviewInput) {
  const now = input.now ?? new Date();
  return db.transaction((tx) => {
    const existing = tx
      .select()
      .from(cardState)
      .where(and(eq(cardState.userId, input.userId), eq(cardState.itemId, input.itemId)))
      .get();

    const cfg = tx.select().from(settings).where(eq(settings.userId, input.userId)).get();
    const { next, stateBefore } = scheduleReview(
      existing ?? null,
      input.rating,
      now,
      cfg?.desiredRetention ?? DEFAULT_RETENTION,
    );

    tx.insert(cardState)
      .values({ userId: input.userId, itemId: input.itemId, ...next })
      .onConflictDoUpdate({ target: [cardState.userId, cardState.itemId], set: next })
      .run();

    tx.insert(reviewLog)
      .values({
        userId: input.userId,
        itemId: input.itemId,
        reviewedAt: now,
        rating: input.rating,
        correct: input.rating !== 1,
        durationMs: input.durationMs ?? null,
        exerciseType: input.exerciseType,
        stateBefore,
        stabilityAfter: next.stability,
      })
      .run();

    return next;
  });
}
