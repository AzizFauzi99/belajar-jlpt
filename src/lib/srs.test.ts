import { describe, expect, it } from 'vitest';
import { eq } from 'drizzle-orm';
import { createDb } from '../db/client';
import { cardState, items, reviewLog, settings, users } from '../db/schema';
import { recordReview } from './review-service';
import { Rating, State, retrievability, scheduleReview } from './srs';

const T0 = new Date('2026-11-01T08:00:00Z');
const day = (n: number) => new Date(T0.getTime() + n * 86_400_000);

function setup() {
  const { db } = createDb(':memory:');
  const user = db.insert(users).values({ name: 'test' }).returning().get();
  db.insert(settings).values({ userId: user.id }).run();
  const item = db.insert(items).values({ type: 'kana', level: 'N5', key: 'k', data: {}, sortOrder: 0 }).returning().get();
  return { db, userId: user.id, itemId: item.id };
}

describe('scheduleReview', () => {
  it('kartu baru + Good: reps 1, due di masa depan', () => {
    const { next, stateBefore } = scheduleReview(null, Rating.Good, T0);
    expect(stateBefore).toBe(State.New);
    expect(next.reps).toBe(1);
    expect(next.due.getTime()).toBeGreaterThan(T0.getTime());
  });

  it('Again pada kartu Review menaikkan lapses dan masuk Relearning', () => {
    let f = scheduleReview(null, Rating.Easy, T0).next;
    for (let i = 0; i < 3; i++) f = scheduleReview(f, Rating.Good, new Date(f.due)).next;
    expect(f.state).toBe(State.Review);
    const lapsed = scheduleReview(f, Rating.Again, new Date(f.due)).next;
    expect(lapsed.lapses).toBe(f.lapses + 1);
    expect(lapsed.state).toBe(State.Relearning);
  });

  it('retention lebih tinggi menghasilkan interval lebih pendek', () => {
    const base = scheduleReview(null, Rating.Easy, T0).next;
    const at = new Date(base.due);
    const low = scheduleReview(base, Rating.Good, at, 0.8).next;
    const high = scheduleReview(base, Rating.Good, at, 0.95).next;
    expect(high.due.getTime()).toBeLessThan(low.due.getTime());
  });

  it('retrievability turun seiring waktu', () => {
    const f = scheduleReview(null, Rating.Easy, T0).next;
    expect(retrievability(f, day(1))).toBeGreaterThan(retrievability(f, day(30)));
  });
});

describe('persistensi', () => {
  it('state kartu identik setelah dibaca ulang dari DB', () => {
    const { db, userId, itemId } = setup();
    const written = recordReview(db, { userId, itemId, rating: Rating.Good, exerciseType: 'recognize', now: T0 });
    const row = db.select().from(cardState).where(eq(cardState.itemId, itemId)).get()!;
    expect(row.due.getTime()).toBe(written.due.getTime());
    expect(row.stability).toBeCloseTo(written.stability, 10);
    expect(row.reps).toBe(1);
  });

  it('review_log bertambah satu baris per jawaban', () => {
    const { db, userId, itemId } = setup();
    recordReview(db, { userId, itemId, rating: Rating.Good, exerciseType: 'recognize', now: T0 });
    recordReview(db, { userId, itemId, rating: Rating.Again, exerciseType: 'type-answer', now: day(1) });
    const logs = db.select().from(reviewLog).all();
    expect(logs).toHaveLength(2);
    expect(logs[1].correct).toBe(false);
    expect(db.select().from(cardState).all()).toHaveLength(1);
  });

  it('memakai desired retention dari settings', () => {
    const a = setup();
    const b = setup();
    b.db.update(settings).set({ desiredRetention: 0.95 }).where(eq(settings.userId, b.userId)).run();
    // bawa kartu ke state Review dulu, lalu bandingkan interval berikutnya
    const run = (s: ReturnType<typeof setup>) => {
      let due = T0;
      let r = recordReview(s.db, { userId: s.userId, itemId: s.itemId, rating: Rating.Easy, exerciseType: 'x', now: due });
      due = new Date(r.due);
      r = recordReview(s.db, { userId: s.userId, itemId: s.itemId, rating: Rating.Good, exerciseType: 'x', now: due });
      return r.due.getTime() - due.getTime();
    };
    expect(run(b)).toBeLessThan(run(a));
  });
});
