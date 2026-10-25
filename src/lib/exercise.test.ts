import { describe, expect, it } from 'vitest';
import { buildExercise, type PoolItem } from './exercise';

const pool: PoolItem[] = [
  { id: 1, type: 'vocab', data: { word: '水', reading: 'みず', meaning: 'air', pos: 'n' } },
  { id: 2, type: 'vocab', data: { word: '火', reading: 'ひ', meaning: 'api', pos: 'n' } },
  { id: 3, type: 'vocab', data: { word: '山', reading: 'やま', meaning: 'gunung', pos: 'n' } },
  { id: 4, type: 'vocab', data: { word: '川', reading: 'かわ', meaning: 'sungai', pos: 'n' } },
  { id: 5, type: 'vocab', data: { word: 'みかん', reading: 'みかん', meaning: 'jeruk', pos: 'n' } },
  { id: 10, type: 'kanji', data: { char: '日', on: 'ニチ', kun: 'ひ', meaning: 'hari', strokes: 4, examples: [] } },
  { id: 11, type: 'kanji', data: { char: '月', on: 'ゲツ', kun: 'つき', meaning: 'bulan', strokes: 4, examples: [] } },
  { id: 12, type: 'kanji', data: { char: '火', on: 'カ', kun: 'ひ', meaning: 'api', strokes: 4, examples: [] } },
  { id: 13, type: 'kanji', data: { char: '水', on: 'スイ', kun: 'みず', meaning: 'air', strokes: 4, examples: [] } },
  {
    id: 20,
    type: 'grammar',
    data: {
      pattern: 'は',
      meaning: 'topik',
      formation: 'N は',
      explanation: 'topik',
      examples: [],
      cloze: '私___学生です。',
      options: ['は', 'が', 'を', 'に'],
      answer: 'は',
      category: 'partikel',
    },
  },
];

describe('buildExercise', () => {
  it('kana memakai latihan mengetik', () => {
    const ex = buildExercise({ id: 99, type: 'kana', data: { char: 'あ', romaji: 'a', script: 'hiragana' } }, pool);
    expect(ex.kind).toBe('typing');
    expect(ex.answer).toBe('a');
  });

  it('kosakata selalu punya 4 pilihan dan jawaban ada di dalamnya', () => {
    for (const item of pool.filter((p) => p.type === 'vocab')) {
      const ex = buildExercise(item, pool);
      expect(ex.kind).toBe('mcq');
      expect(ex.options).toContain(ex.answer);
      expect(ex.options.length).toBeGreaterThanOrEqual(2);
    }
  });

  it('kosakata kana-only tidak diberi soal cara baca yang trivial', () => {
    const ex = buildExercise(pool[4], pool);
    expect(ex.promptSub).toContain('Arti');
    expect(ex.answer).toBe('jeruk');
  });

  it('kanji punya soal arti atau bacaan yang valid', () => {
    for (const item of pool.filter((p) => p.type === 'kanji')) {
      const ex = buildExercise(item, pool);
      expect(ex.options).toContain(ex.answer);
      expect(ex.answer.length).toBeGreaterThan(0);
    }
  });

  it('tata bahasa memakai cloze dan pilihan dari data', () => {
    const ex = buildExercise(pool.find((p) => p.type === 'grammar')!, pool);
    expect(ex.prompt).toContain('___');
    expect(ex.options).toContain('は');
    expect(ex.options).toHaveLength(4);
  });

  it('pengecoh tidak berisi jawaban benar ganda', () => {
    const ex = buildExercise(pool[0], pool);
    expect(new Set(ex.options).size).toBe(ex.options.length);
  });
});
