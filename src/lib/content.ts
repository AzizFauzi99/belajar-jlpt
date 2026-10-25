import { and, asc, eq } from 'drizzle-orm';
import type { Db } from '@/db/client';
import { items, lessonProgress } from '@/db/schema';
import type { VocabEntry } from '@/content/vocab';
import type { KanjiEntry } from '@/content/kanji';
import type { GrammarEntry } from '@/content/grammar';
import type { ReadingPassage } from '@/content/reading';
import type { ListeningTrack } from '@/content/listening';

export type ItemRow = typeof items.$inferSelect;

export function listItems(db: Db, type: 'kana' | 'vocab' | 'kanji' | 'grammar' | 'reading' | 'listening'): ItemRow[] {
  return db.select().from(items).where(eq(items.type, type)).orderBy(asc(items.sortOrder)).all();
}

export function getItem(db: Db, type: ItemRow['type'], key: string): ItemRow | undefined {
  return db
    .select()
    .from(items)
    .where(and(eq(items.type, type), eq(items.key, key)))
    .get();
}

export function getItemById(db: Db, id: number): ItemRow | undefined {
  return db.select().from(items).where(eq(items.id, id)).get();
}

export const asVocab = (r: ItemRow) => r.data as unknown as VocabEntry & { category: string };
export const asKanji = (r: ItemRow) => r.data as unknown as KanjiEntry;
export const asGrammar = (r: ItemRow) => r.data as unknown as GrammarEntry;
export const asReading = (r: ItemRow) => r.data as unknown as ReadingPassage;
export const asListening = (r: ItemRow) => r.data as unknown as ListeningTrack;

export function completedKeys(db: Db, userId: number, prefix: string): Set<string> {
  const rows = db
    .select({ key: lessonProgress.lessonKey })
    .from(lessonProgress)
    .where(and(eq(lessonProgress.userId, userId), eq(lessonProgress.status, 'completed')))
    .all();
  return new Set(rows.map((r) => r.key).filter((k) => k.startsWith(prefix)));
}

export function completedReading(db: Db, userId: number) {
  return completedKeys(db, userId, 'reading:');
}

export function completedListening(db: Db, userId: number) {
  return completedKeys(db, userId, 'listening:');
}
