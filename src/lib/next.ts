import { and, asc, count, desc, eq, inArray, isNull } from 'drizzle-orm';
import type { Db } from '@/db/client';
import { cardState, items, reviewLog, settings } from '@/db/schema';
import {
  DUE_BATCH_SIZE,
  NEW_BATCH_SIZE,
  PHASES,
  PHASE_UNLOCK_RATIO,
  YOUNG_STABILITY_DAYS,
  youngLimit,
  type Pace,
} from './pacing';
import { buildExercise, type Exercise, type PoolItem, type StudyType } from './exercise';
import { retrievability } from './srs';

export type Mode = 'auto' | 'new' | 'ahead';
type ItemType = StudyType;

export type BatchCard = {
  itemId: number;
  type: string;
  data: Record<string, unknown>;
  isNew: boolean;
  exercise: Exercise;
};

/** Setelah fase punya cukup banyak item diperkenalkan, fase berikutnya terbuka walau belum 70% stabil. */
const PHASE_MILESTONE = 100;

export function unlockedTypes(db: Db, userId: number): ItemType[] {
  const totals = new Map(
    db.select({ type: items.type, n: count() }).from(items).groupBy(items.type).all().map((r) => [r.type, r.n]),
  );
  const stableByType = new Map<string, number>();
  const introducedByType = new Map<string, number>();
  for (const r of db
    .select({ type: items.type, s: cardState.stability })
    .from(cardState)
    .innerJoin(items, eq(items.id, cardState.itemId))
    .where(eq(cardState.userId, userId))
    .all()) {
    introducedByType.set(r.type, (introducedByType.get(r.type) ?? 0) + 1);
    if (r.s >= YOUNG_STABILITY_DAYS) stableByType.set(r.type, (stableByType.get(r.type) ?? 0) + 1);
  }

  const unlocked: ItemType[] = [];
  for (const phase of PHASES) {
    unlocked.push(...phase);
    const total = phase.reduce((s, t) => s + (totals.get(t) ?? 0), 0);
    const stable = phase.reduce((s, t) => s + (stableByType.get(t) ?? 0), 0);
    const introduced = phase.reduce((s, t) => s + (introducedByType.get(t) ?? 0), 0);
    // fase kosong tidak memblokir; fase besar terbuka lewat milestone diperkenalkan
    const complete = total === 0 || stable / total >= PHASE_UNLOCK_RATIO || introduced >= PHASE_MILESTONE;
    if (!complete) break;
  }
  return unlocked;
}

function selectNew(db: Db, userId: number, types: ItemType[], limit: number) {
  if (limit <= 0 || types.length === 0) return [];
  return db
    .select({ item: items })
    .from(items)
    .leftJoin(cardState, and(eq(cardState.itemId, items.id), eq(cardState.userId, userId)))
    .where(and(isNull(cardState.itemId), inArray(items.type, types)))
    .orderBy(asc(items.sortOrder))
    .limit(limit)
    .all()
    .map((r) => r.item);
}

export function computeState(db: Db, userId: number, now: Date = new Date()) {
  const cfg = db.select().from(settings).where(eq(settings.userId, userId)).get();
  const pace = (cfg?.pace ?? 'normal') as Pace;

  const rows = db.select().from(cardState).where(eq(cardState.userId, userId)).all();
  const dueRows = rows.filter((r) => r.due <= now);
  const learning = dueRows
    .filter((r) => r.state === 1 || r.state === 3)
    .sort((a, b) => a.due.getTime() - b.due.getTime());
  // review jatuh tempo: yang ingatannya paling lemah (retrievability terendah) lebih dulu
  const reviews = dueRows
    .filter((r) => r.state === 2)
    .map((r) => ({ r, ret: retrievability(r, now) }))
    .sort((a, b) => a.ret - b.ret)
    .map((x) => x.r);

  const young = rows.filter((r) => r.stability < YOUNG_STABILITY_DAYS).length;

  const recent = db
    .select({ c: reviewLog.correct })
    .from(reviewLog)
    .where(eq(reviewLog.userId, userId))
    .orderBy(desc(reviewLog.reviewedAt), desc(reviewLog.id))
    .limit(40)
    .all();
  const accuracy = recent.length >= 10 ? recent.filter((x) => x.c).length / recent.length : null;

  const limit = youngLimit(pace, accuracy);
  const future = rows.filter((r) => r.due > now).sort((a, b) => a.due.getTime() - b.due.getTime());
  const unlocked = unlockedTypes(db, userId);

  return {
    pace,
    rows,
    learning,
    reviews,
    young,
    accuracy,
    limit,
    gateOpen: young < limit,
    nextDueAt: future[0]?.due ?? null,
    unlocked,
    newAvailable: selectNew(db, userId, unlocked, 1).length > 0,
  };
}

function toCards(db: Db, ids: number[], isNew: boolean, allowed: ItemType[]): BatchCard[] {
  if (ids.length === 0) return [];
  const byId = new Map(db.select().from(items).where(inArray(items.id, ids)).all().map((i) => [i.id, i]));
  const pool: PoolItem[] = db
    .select({ id: items.id, type: items.type, data: items.data })
    .from(items)
    .where(inArray(items.type, allowed))
    .all();

  return ids.flatMap((id) => {
    const it = byId.get(id);
    if (!it) return [];
    return [
      {
        itemId: it.id,
        type: it.type,
        data: it.data,
        isNew,
        exercise: buildExercise({ id: it.id, type: it.type, data: it.data }, pool),
      },
    ];
  });
}

/**
 * Pilih batch berikutnya. Tidak ada batas harian atau batas sesi:
 *  1. ada yang jatuh tempo (learning dulu, lalu review terlemah) -> kerjakan itu
 *  2. antrean kosong dan gerbang adaptif terbuka -> kartu baru (batch kecil)
 *  3. selain itu -> tunggu (user bisa memaksa 'new' atau 'ahead')
 *
 * `focus` membatasi ke satu jenis (kana/vocab/kanji/grammar) dan melewati gerbang
 * karena user secara sadar memilih deck tersebut.
 */
export function nextBatch(
  db: Db,
  userId: number,
  opts: { mode?: Mode; now?: Date; focus?: StudyType } = {},
) {
  const now = opts.now ?? new Date();
  const mode = opts.mode ?? 'auto';
  const st = computeState(db, userId, now);
  const allowed: ItemType[] = opts.focus ? [opts.focus] : st.unlocked;
  const base = {
    young: st.young,
    youngLimit: st.limit,
    accuracy: st.accuracy,
    dueCount: st.learning.length + st.reviews.length,
    nextDueAt: st.nextDueAt,
    newAvailable: st.newAvailable,
    pace: st.pace,
    focus: opts.focus ?? null,
  };

  const allowedIds = new Set(
    db
      .select({ id: items.id, type: items.type })
      .from(items)
      .where(inArray(items.type, allowed))
      .all()
      .map((r) => r.id),
  );

  if (mode === 'ahead') {
    const ahead = st.rows
      .filter((r) => r.due > now && allowedIds.has(r.itemId))
      .map((r) => ({ r, ret: retrievability(r, now) }))
      .sort((a, b) => a.ret - b.ret)
      .slice(0, DUE_BATCH_SIZE)
      .map((x) => x.r.itemId);
    return { ...base, kind: 'ahead' as const, reason: null, cards: toCards(db, ahead, false, allowed) };
  }

  if (mode === 'auto' || opts.focus) {
    const dueIds = [...st.learning, ...st.reviews]
      .filter((r) => allowedIds.has(r.itemId))
      .slice(0, DUE_BATCH_SIZE)
      .map((r) => r.itemId);
    if (dueIds.length > 0) {
      return { ...base, kind: 'due' as const, reason: null, cards: toCards(db, dueIds, false, allowed) };
    }
  }

  if (mode === 'new' || st.gateOpen || opts.focus) {
    // saat gerbang terbuka, jangan melampaui sisa ruang; mode 'new'/fokus selalu satu batch penuh
    const room =
      mode === 'new' || opts.focus ? NEW_BATCH_SIZE : Math.max(1, Math.min(NEW_BATCH_SIZE, st.limit - st.young));
    const fresh = selectNew(db, userId, allowed, room);
    if (fresh.length > 0) {
      return {
        ...base,
        kind: 'new' as const,
        reason: null,
        cards: toCards(
          db,
          fresh.map((it) => it.id),
          true,
          allowed,
        ),
      };
    }
  }

  const reason = !st.newAvailable
    ? 'Semua kartu yang terbuka sudah diperkenalkan. Selesaikan fase ini sampai stabil untuk membuka fase berikutnya.'
    : 'Kartu baru ditahan sementara supaya yang sudah dipelajari mengendap dulu.';
  return { ...base, kind: 'wait' as const, reason, cards: [] as BatchCard[] };
}
