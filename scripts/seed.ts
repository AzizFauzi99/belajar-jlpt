import { and, eq } from 'drizzle-orm';
import { createDb } from '../src/db/client';
import { itemTags, items, settings, tags, users } from '../src/db/schema';
import { KANA_GROUPS, toKatakana } from '../src/content/kana';
import { vocabEntries } from '../src/content/vocab';
import { kanjiEntries } from '../src/content/kanji';
import { grammarEntries } from '../src/content/grammar';
import { READING_PASSAGES } from '../src/content/reading';
import { LISTENING_TRACKS } from '../src/content/listening';

type ItemType = 'kana' | 'vocab' | 'kanji' | 'grammar' | 'reading' | 'listening';

const { db } = createDb();

function ensureTag(name: string, category: string): number {
  db.insert(tags).values({ name, category }).onConflictDoNothing().run();
  return db.select().from(tags).where(eq(tags.name, name)).get()!.id;
}

function upsert(
  type: ItemType,
  key: string,
  data: Record<string, unknown>,
  sortOrder: number,
  tagNames: string[] = [],
): 'inserted' | 'updated' {
  const existing = db
    .select({ id: items.id })
    .from(items)
    .where(and(eq(items.type, type), eq(items.key, key)))
    .get();
  if (existing) {
    db.update(items).set({ data, sortOrder }).where(eq(items.id, existing.id)).run();
  } else {
    db.insert(items).values({ type, level: 'N5', key, data, source: 'manual', sortOrder }).run();
  }
  const id = db
    .select({ id: items.id })
    .from(items)
    .where(and(eq(items.type, type), eq(items.key, key)))
    .get()!.id;
  for (const name of tagNames) {
    const tagId = ensureTag(name, 'topik');
    db.insert(itemTags).values({ itemId: id, tagId }).onConflictDoNothing().run();
  }
  return existing ? 'updated' : 'inserted';
}

let order = 0;
const counts: Record<string, number> = {};

// ---------- Kana ----------
for (const script of ['hiragana', 'katakana'] as const) {
  const scriptTag = ensureTag(`script:${script}`, 'script');
  for (const [group, hira, romajiList] of KANA_GROUPS) {
    const groupTag = ensureTag(`kana-group:${group}`, 'kana-group');
    const chars = [...(script === 'hiragana' ? hira : toKatakana(hira))];
    chars.forEach((char, i) => {
      order += 1;
      upsert('kana', char, { script, char, romaji: romajiList[i], group }, order);
      const id = db.select({ id: items.id }).from(items).where(and(eq(items.type, 'kana'), eq(items.key, char))).get()!.id;
      for (const tagId of [scriptTag, groupTag]) {
        db.insert(itemTags).values({ itemId: id, tagId }).onConflictDoNothing().run();
      }
      counts.kana = (counts.kana ?? 0) + 1;
    });
  }
}

// ---------- Kosakata ----------
{
  let i = 0;
  for (const v of vocabEntries()) {
    i += 1;
    upsert(
      'vocab',
      `${v.word}:${v.reading}`,
      { word: v.word, reading: v.reading, meaning: v.meaning, pos: v.pos, category: v.category },
      1000 + i,
      [`vocab:${v.category}`],
    );
  }
  counts.vocab = i;
}

// ---------- Kanji ----------
{
  let i = 0;
  for (const k of kanjiEntries()) {
    i += 1;
    upsert(
      'kanji',
      k.char,
      { char: k.char, on: k.on, kun: k.kun, meaning: k.meaning, strokes: k.strokes, examples: k.examples },
      2000 + i,
      ['kanji:n5'],
    );
  }
  counts.kanji = i;
}

// ---------- Tata bahasa ----------
{
  let i = 0;
  for (const g of grammarEntries()) {
    i += 1;
    const key = `g${String(i).padStart(2, '0')}`;
    upsert(
      'grammar',
      key,
      {
        pattern: g.pattern,
        meaning: g.meaning,
        formation: g.formation,
        explanation: g.explanation,
        examples: g.examples,
        cloze: g.cloze,
        options: g.options,
        answer: g.answer,
        category: g.category,
      },
      3000 + i,
      [`grammar:${g.category}`],
    );
  }
  counts.grammar = i;
}

// ---------- Membaca ----------
{
  let i = 0;
  for (const p of READING_PASSAGES) {
    i += 1;
    upsert('reading', p.id, { ...p }, 4000 + i, [`reading:${p.topic}`]);
  }
  counts.reading = i;
}

// ---------- Listening ----------
{
  let i = 0;
  for (const t of LISTENING_TRACKS) {
    i += 1;
    upsert('listening', t.id, { ...t }, 5000 + i, [`listening:${t.topic}`]);
  }
  counts.listening = i;
}

// ---------- Profil default ----------
if (!db.select().from(users).get()) {
  const u = db.insert(users).values({ name: 'Ve' }).returning().get();
  db.insert(settings).values({ userId: u.id }).run();
}

console.log('Seed selesai:', counts);
