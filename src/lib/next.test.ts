import { describe, expect, it } from 'vitest';
import { eq } from 'drizzle-orm';
import { createDb } from '../db/client';
import { cardState, items, settings, users } from '../db/schema';
import { nextBatch, unlockedTypes } from './next';
import { youngLimit } from './pacing';
import { recordReview } from './review-service';
import { Rating } from './srs';

const T0 = new Date('2026-11-01T08:00:00Z');
const mins = (n: number) => new Date(T0.getTime() + n * 60_000);
const days = (n: number) => new Date(T0.getTime() + n * 86_400_000);

function setup(kana = 60, vocab = 0) {
  const { db } = createDb(':memory:');
  const user = db.insert(users).values({ name: 'test' }).returning().get();
  db.insert(settings).values({ userId: user.id }).run();
  const kanaIds: number[] = [];
  for (let i = 0; i < kana; i++) {
    kanaIds.push(db.insert(items).values({ type: 'kana', level: 'N5', key: `k${i}`, data: {}, sortOrder: i }).returning().get().id);
  }
  const vocabIds: number[] = [];
  for (let i = 0; i < vocab; i++) {
    vocabIds.push(db.insert(items).values({ type: 'vocab', level: 'N5', key: `v${i}`, data: {}, sortOrder: 1000 + i }).returning().get().id);
  }
  return { db, userId: user.id, kanaIds, vocabIds };
}

const learn = (s: ReturnType<typeof setup>, ids: number[], at: Date, rating: Rating.Good | Rating.Again | Rating.Easy = Rating.Good) => {
  for (const id of ids) recordReview(s.db, { userId: s.userId, itemId: id, rating, exerciseType: 'x', now: at });
};

describe('youngLimit', () => {
  it('menyesuaikan dengan akurasi dan pace', () => {
    expect(youngLimit('normal', null)).toBe(30);
    expect(youngLimit('normal', 0.6)).toBe(15);
    expect(youngLimit('normal', 0.97)).toBe(38);
    expect(youngLimit('ngebut', 0.9)).toBeGreaterThan(youngLimit('santai', 0.9));
  });
});

describe('nextBatch', () => {
  it('antrean kosong + gerbang terbuka: kartu baru, tanpa batas harian', () => {
    const s = setup();
    const b = nextBatch(s.db, s.userId, { now: T0 });
    expect(b.kind).toBe('new');
    expect(b.cards).toHaveLength(5);
    expect(b.cards.every((c) => c.isNew)).toBe(true);
  });

  it('user cepat bisa terus lanjut: batch baru langsung tersedia berkali-kali (tidak ada batas harian)', () => {
    const s = setup();
    let total = 0;
    for (let i = 0; i < 4; i++) {
      const b = nextBatch(s.db, s.userId, { now: T0 });
      expect(b.kind).toBe('new');
      learn(s, b.cards.map((c) => c.itemId), T0);
      total += b.cards.length;
    }
    expect(total).toBe(20); // 20 kartu baru dalam satu hari, jauh di atas default lama (10)
  });

  it('gerbang menutup saat kartu rapuh menumpuk, lalu menunggu', () => {
    const s = setup(60);
    learn(s, s.kanaIds.slice(0, 40), T0); // akurasi 100% -> batas 38, 40 kartu muda menutup gerbang
    const b = nextBatch(s.db, s.userId, { now: T0 });
    expect(b.youngLimit).toBe(38);
    expect(b.kind).toBe('wait');
    expect(b.cards).toHaveLength(0);
    expect(b.nextDueAt).not.toBeNull();
  });

  it('akurasi rendah memperkecil batas', () => {
    const s = setup(60);
    learn(s, s.kanaIds.slice(0, 20), T0, Rating.Again); // 20 jawaban salah
    // batas turun jadi 15 (akurasi 0%), 20 kartu muda sudah melewatinya
    const b = nextBatch(s.db, s.userId, { now: T0 });
    expect(b.youngLimit).toBe(15);
    expect(b.kind).not.toBe('new');
  });

  it('yang jatuh tempo didahulukan, kartu baru tidak ikut', () => {
    const s = setup(60);
    learn(s, s.kanaIds.slice(0, 5), T0);
    const b = nextBatch(s.db, s.userId, { now: mins(30) });
    expect(b.kind).toBe('due');
    expect(b.cards.every((c) => !c.isNew)).toBe(true);
    expect(b.cards).toHaveLength(5);
  });

  it('mode new memaksa kartu baru walau gerbang tertutup', () => {
    const s = setup(60);
    learn(s, s.kanaIds.slice(0, 40), T0);
    expect(nextBatch(s.db, s.userId, { now: T0 }).kind).toBe('wait');
    const forced = nextBatch(s.db, s.userId, { now: T0, mode: 'new' });
    expect(forced.kind).toBe('new');
    expect(forced.cards).toHaveLength(5);
  });

  it('mode ahead mengambil kartu belum jatuh tempo, terlemah dulu', () => {
    const s = setup(10);
    learn(s, [s.kanaIds[0]], T0, Rating.Easy);
    learn(s, [s.kanaIds[1]], T0, Rating.Good);
    const b = nextBatch(s.db, s.userId, { now: mins(1), mode: 'ahead' });
    expect(b.kind).toBe('ahead');
    expect(b.cards[0].itemId).toBe(s.kanaIds[1]);
  });
});

describe('fase mengikuti kecepatan user', () => {
  it('fase berikutnya terkunci sampai fase sebelumnya cukup stabil', () => {
    const s = setup(10, 5);
    expect(unlockedTypes(s.db, s.userId)).toEqual(['kana']);
    learn(s, s.kanaIds, T0, Rating.Good);
    // baru dilihat sekali: belum stabil >= 7 hari
    expect(unlockedTypes(s.db, s.userId)).toEqual(['kana']);
    for (const id of s.kanaIds.slice(0, 8)) {
      s.db.update(cardState).set({ stability: 12 }).where(eq(cardState.itemId, id)).run();
    }
    expect(unlockedTypes(s.db, s.userId)).toEqual(['kana', 'vocab', 'kanji']);
  });

  it('tidak menyajikan kosakata sebelum fase kana cukup stabil', () => {
    const s = setup(5, 5);
    const b = nextBatch(s.db, s.userId, { now: T0 });
    expect(b.cards.every((c) => c.type === 'kana')).toBe(true);
  });

  it('fase kosong tidak memblokir fase sesudahnya', () => {
    const s = setup(0, 5);
    expect(unlockedTypes(s.db, s.userId)).toContain('vocab');
    const b = nextBatch(s.db, s.userId, { now: days(0) });
    expect(b.cards.every((c) => c.type === 'vocab')).toBe(true);
  });
});
