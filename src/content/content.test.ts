import { describe, expect, it } from 'vitest';
import { vocabEntries } from './vocab';
import { kanjiEntries } from './kanji';
import { grammarEntries } from './grammar';
import { READING_PASSAGES } from './reading';
import { LISTENING_TRACKS } from './listening';

describe('integritas konten N5', () => {
  it('menyediakan sekitar 800 kosakata unik', () => {
    const entries = vocabEntries();
    expect(entries.length).toBeGreaterThanOrEqual(800);
    const keys = entries.map((v) => `${v.word}:${v.reading}`);
    expect(new Set(keys).size).toBe(keys.length);
    for (const v of entries) {
      expect(v.word.length).toBeGreaterThan(0);
      expect(v.reading.length).toBeGreaterThan(0);
      expect(v.meaning.length).toBeGreaterThan(0);
      expect(v.category.length).toBeGreaterThan(0);
    }
  });

  it('menyediakan 100+ kanji dengan bacaan dan contoh', () => {
    const entries = kanjiEntries();
    expect(entries.length).toBeGreaterThanOrEqual(100);
    expect(new Set(entries.map((k) => k.char)).size).toBe(entries.length);
    for (const k of entries) {
      expect(k.strokes).toBeGreaterThan(0);
      expect(k.meaning.length).toBeGreaterThan(0);
      expect(k.examples.length).toBeGreaterThan(0);
    }
  });

  it('menyediakan 80 pola tata bahasa dengan soal isian yang valid', () => {
    const entries = grammarEntries();
    expect(entries.length).toBe(80);
    for (const g of entries) {
      expect(g.pattern.length).toBeGreaterThan(0);
      expect(g.options.length).toBeGreaterThanOrEqual(3);
      expect(g.options).toContain(g.answer);
      expect(g.cloze).toContain('___');
      expect(g.examples).toHaveLength(2);
    }
  });

  it('menyediakan bacaan dan dialog listening dengan soal valid', () => {
    expect(READING_PASSAGES.length).toBeGreaterThanOrEqual(15);
    expect(LISTENING_TRACKS.length).toBeGreaterThanOrEqual(15);
    expect(new Set(READING_PASSAGES.map((p) => p.id)).size).toBe(READING_PASSAGES.length);
    expect(new Set(LISTENING_TRACKS.map((t) => t.id)).size).toBe(LISTENING_TRACKS.length);

    for (const p of READING_PASSAGES) {
      expect(p.translation.length).toBeGreaterThan(0);
      expect(p.questions.length).toBeGreaterThan(0);
      for (const q of p.questions) {
        expect(q.options.length).toBe(4);
        expect(q.answer).toBeGreaterThanOrEqual(0);
        expect(q.answer).toBeLessThan(q.options.length);
      }
    }
    for (const t of LISTENING_TRACKS) {
      expect(t.lines.length).toBeGreaterThan(0);
      expect(t.questions.length).toBeGreaterThan(0);
      for (const q of t.questions) {
        expect(q.options.length).toBe(4);
        expect(q.answer).toBeGreaterThanOrEqual(0);
        expect(q.answer).toBeLessThan(q.options.length);
      }
    }
  });
});
