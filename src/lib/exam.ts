import type { Db } from '@/db/client';
import { buildExercise, type PoolItem } from './exercise';
import { listItems } from './content';
import { asListening, asReading, type ItemRow } from './content';

export type ExamSectionKey = 'moji' | 'grammar' | 'reading' | 'listening';

export type ExamQuestion = {
  id: string;
  section: ExamSectionKey;
  prompt: string;
  promptSub: string;
  options: string[];
  answer: number;
  explanation?: string;
  passage?: string;
  passageTitle?: string;
  audio?: { speaker: string; jp: string }[];
  audioTitle?: string;
};

export type ExamSection = {
  key: ExamSectionKey;
  label: string;
  instruction: string;
  questions: ExamQuestion[];
};

export type ExamPaper = {
  sections: ExamSection[];
  totalQuestions: number;
  durationMin: number;
  passScore: number;
};

const SECTION_LABEL: Record<ExamSectionKey, string> = {
  moji: '文字・語彙',
  grammar: '文法',
  reading: '読解',
  listening: '聴解',
};

const SECTION_INSTRUCTION: Record<ExamSectionKey, string> = {
  moji: 'Pilih bacaan atau arti yang paling tepat.',
  grammar: 'Pilih kata atau pola yang tepat untuk melengkapi kalimat.',
  reading: 'Baca teks, lalu jawab pertanyaan.',
  listening: 'Dengarkan dialog (bisa diputar ulang), lalu jawab pertanyaan.',
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pick<T>(arr: T[], n: number): T[] {
  return shuffle(arr).slice(0, n);
}

function toPool(rows: ItemRow[]): PoolItem[] {
  return rows.map((r) => ({ id: r.id, type: r.type, data: r.data }));
}

function mcqFromItem(item: ItemRow, pool: PoolItem[], section: ExamSectionKey): ExamQuestion {
  const ex = buildExercise({ id: item.id, type: item.type, data: item.data }, pool);
  return {
    id: `${section}-${item.id}-${Math.random().toString(36).slice(2, 8)}`,
    section,
    prompt: ex.prompt,
    promptSub: ex.promptSub,
    options: ex.options,
    answer: Math.max(0, ex.options.indexOf(ex.answer)),
    explanation: ex.hint,
  };
}

/** Susun satu paket simulasi ujian N5 (51 soal, 75 menit). */
export function buildExam(db: Db): ExamPaper {
  const vocabRows = listItems(db, 'vocab');
  const kanjiRows = listItems(db, 'kanji');
  const grammarRows = listItems(db, 'grammar');
  const readingRows = listItems(db, 'reading');
  const listeningRows = listItems(db, 'listening');

  const vocabPool = toPool(vocabRows);
  const kanjiPool = toPool(kanjiRows);
  const grammarPool = toPool(grammarRows);

  // 20 soal 文字・語彙: 8 kanji + 12 kosakata
  const moji: ExamQuestion[] = [
    ...pick(kanjiRows, 8).map((r) => mcqFromItem(r, kanjiPool, 'moji')),
    ...pick(vocabRows, 12).map((r) => mcqFromItem(r, vocabPool, 'moji')),
  ];

  // 15 soal 文法
  const grammar: ExamQuestion[] = pick(grammarRows, 15).map((r) => mcqFromItem(r, grammarPool, 'grammar'));

  // 8 soal 読解 dari 4 bacaan
  const reading: ExamQuestion[] = pick(readingRows, 4).flatMap((r) => {
    const p = asReading(r);
    return p.questions.map((q, i) => ({
      id: `reading-${p.id}-${i}-${Math.random().toString(36).slice(2, 7)}`,
      section: 'reading' as const,
      prompt: q.q,
      promptSub: 'Pilih jawaban yang sesuai dengan teks.',
      options: q.options,
      answer: q.answer,
      explanation: q.explanation,
      passage: p.text,
      passageTitle: p.title,
    }));
  });

  // 8 soal 聴解 dari 4 dialog
  const listening: ExamQuestion[] = pick(listeningRows, 4).flatMap((r) => {
    const t = asListening(r);
    return t.questions.map((q, i) => ({
      id: `listening-${t.id}-${i}-${Math.random().toString(36).slice(2, 7)}`,
      section: 'listening' as const,
      prompt: q.q,
      promptSub: 'Pilih jawaban yang sesuai dengan dialog.',
      options: q.options,
      answer: q.answer,
      explanation: q.explanation,
      audio: t.lines.map((l) => ({ speaker: l.speaker, jp: l.jp })),
      audioTitle: t.title,
    }));
  });

  const sections: ExamSection[] = (['moji', 'grammar', 'reading', 'listening'] as ExamSectionKey[]).map((key) => {
    const questions = key === 'moji' ? moji : key === 'grammar' ? grammar : key === 'reading' ? reading : listening;
    return {
      key,
      label: SECTION_LABEL[key],
      instruction: SECTION_INSTRUCTION[key],
      questions,
    };
  });

  return {
    sections,
    totalQuestions: sections.reduce((s, x) => s + x.questions.length, 0),
    durationMin: 75,
    passScore: 60,
  };
}
