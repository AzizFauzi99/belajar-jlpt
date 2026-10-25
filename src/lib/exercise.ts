import type { GrammarEntry } from '@/content/grammar';
import type { KanjiEntry } from '@/content/kanji';

export type StudyType = 'kana' | 'vocab' | 'kanji' | 'grammar';

export type Exercise = {
  kind: 'typing' | 'mcq';
  prompt: string;
  promptSub: string;
  answer: string;
  options: string[];
  hint?: string;
};

export type PoolItem = { id: number; type: string; data: Record<string, unknown> };

function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function shuffle<T>(arr: T[], seed: string): T[] {
  return arr
    .map((v, i) => ({ v, k: hash(`${seed}:${i}`) }))
    .sort((a, b) => a.k - b.k)
    .map((x) => x.v);
}

function firstReading(s: string): string {
  return (s || '').split('、')[0].trim();
}

function withOptions(answer: string, distractors: string[], seed: string): string[] {
  const unique = [answer, ...distractors.filter((d) => d && d !== answer)];
  const dedup = [...new Set(unique)].slice(0, 4);
  return shuffle(dedup, seed);
}

/** Buat soal untuk satu item. `pool` = item sejenis untuk dijadikan pengecoh. */
export function buildExercise(item: PoolItem, pool: PoolItem[]): Exercise {
  const data = item.data;
  const seed = `${item.type}:${item.id}`;

  if (item.type === 'kana') {
    return {
      kind: 'typing',
      prompt: String(data.char ?? ''),
      promptSub: `Ketik romaji · ${String(data.script ?? '')}`,
      answer: String(data.romaji ?? ''),
      options: [],
    };
  }

  if (item.type === 'vocab') {
    const others = pool.filter((p) => p.type === 'vocab' && p.id !== item.id && p.data.word !== data.word);
    // kata yang ditulis dengan kana saja tidak punya soal "cara baca" yang bermakna
    const mode = data.word === data.reading ? 0 : hash(`${seed}:mode`) % 2;
    if (mode === 0) {
      const answer = String(data.meaning ?? '');
      const distractors = shuffle(others, `${seed}:dist`).map((p) => String(p.data.meaning ?? ''));
      return {
        kind: 'mcq',
        prompt: String(data.word ?? ''),
        promptSub: 'Arti kosakata ini adalah…',
        answer,
        options: withOptions(answer, distractors, `${seed}:opt`),
        hint: `${String(data.reading ?? '')} · ${String(data.pos ?? '')}`,
      };
    }
    const answer = String(data.reading ?? '');
    const distractors = shuffle(others, `${seed}:dist`).map((p) => String(p.data.reading ?? ''));
    return {
      kind: 'mcq',
      prompt: String(data.word ?? ''),
      promptSub: 'Cara baca kosakata ini adalah…',
      answer,
      options: withOptions(answer, distractors, `${seed}:opt`),
      hint: String(data.meaning ?? ''),
    };
  }

  if (item.type === 'kanji') {
    const k = data as unknown as KanjiEntry;
    const others = pool.filter((p) => p.type === 'kanji' && p.id !== item.id);
    const mode = hash(`${seed}:mode`) % 2;
    if (mode === 0) {
      const answer = k.meaning;
      const distractors = shuffle(others, `${seed}:dist`).map((p) => (p.data as unknown as KanjiEntry).meaning);
      return {
        kind: 'mcq',
        prompt: k.char,
        promptSub: 'Arti kanji ini adalah…',
        answer,
        options: withOptions(answer, distractors, `${seed}:opt`),
        hint: `${k.strokes} goresan`,
      };
    }
    const answer = k.kun !== '—' ? firstReading(k.kun) : firstReading(k.on);
    const distractors = shuffle(others, `${seed}:dist`).map((p) => {
      const o = p.data as unknown as KanjiEntry;
      return o.kun !== '—' ? firstReading(o.kun) : firstReading(o.on);
    });
    return {
      kind: 'mcq',
      prompt: k.char,
      promptSub: 'Cara baca kanji ini adalah…',
      answer,
      options: withOptions(answer, distractors, `${seed}:opt`),
      hint: k.meaning,
    };
  }

  if (item.type === 'grammar') {
    const g = data as unknown as GrammarEntry;
    return {
      kind: 'mcq',
      prompt: g.cloze,
      promptSub: 'Lengkapi kalimat dengan pola yang tepat',
      answer: g.answer,
      options: shuffle([...g.options], `${seed}:opt`),
      hint: g.meaning,
    };
  }

  return {
    kind: 'typing',
    prompt: String(data.prompt ?? ''),
    promptSub: 'Ketik jawaban',
    answer: String(data.answer ?? ''),
    options: [],
  };
}
