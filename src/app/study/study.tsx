'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { checkRomaji, ratingFor } from '@/lib/answer';
import type { Exercise, StudyType } from '@/lib/exercise';

type Card = {
  itemId: number;
  isNew: boolean;
  type: string;
  data: Record<string, unknown>;
  exercise: Exercise;
};
type Batch = {
  cards: Card[];
  kind: 'due' | 'new' | 'ahead' | 'wait';
  reason: string | null;
  nextDueAt: string | null;
  newAvailable: boolean;
  young: number;
  youngLimit: number;
};
type Phase = 'loading' | 'learn' | 'quiz' | 'feedback' | 'wait' | 'done';
type Mode = 'auto' | 'new' | 'ahead';

const RATING_LABEL: Record<number, string> = { 1: 'Lagi', 2: 'Sulit', 3: 'Bagus', 4: 'Mudah' };
const KIND_LABEL: Record<string, string> = { due: 'Review', new: 'Kartu baru', ahead: 'Latihan ekstra' };
const TYPE_LABEL: Record<string, string> = {
  kana: 'Kana',
  vocab: 'Kosakata',
  kanji: 'Kanji',
  grammar: 'Tata bahasa',
};
const FOCUS_LABEL: Record<StudyType, string> = { kana: 'Kana', vocab: 'Kosakata', kanji: 'Kanji', grammar: 'Tata bahasa' };

type VocabData = { word: string; reading: string; meaning: string; pos: string; category: string };
type KanjiData = { char: string; on: string; kun: string; meaning: string; strokes: number; examples: string[] };
type GrammarData = {
  pattern: string;
  meaning: string;
  formation: string;
  explanation: string;
  examples: { jp: string; id: string }[];
  cloze: string;
  options: string[];
  answer: string;
  category: string;
};

function speakText(card: Card): string {
  const d = card.data;
  if (card.type === 'grammar') {
    const ex = d.examples as { jp?: string }[] | undefined;
    return ex?.[0]?.jp ?? String(d.pattern ?? '');
  }
  return String(d.char ?? d.word ?? '');
}

function speak(text: string) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'ja-JP';
  u.rate = 0.9;
  window.speechSynthesis.speak(u);
}

function CardDetail({ card }: { card: Card }) {
  const { type, data } = card;

  if (type === 'kana') {
    return (
      <>
        <div className="text-sm uppercase tracking-wide text-stone-500">
          {String(data.script)} · kelompok {String(data.group)}
        </div>
        <div className="my-6 text-9xl">{String(data.char)}</div>
        <div className="text-3xl font-semibold">{String(data.romaji)}</div>
      </>
    );
  }

  if (type === 'vocab') {
    const v = data as unknown as VocabData;
    return (
      <>
        <div className="text-sm uppercase tracking-wide text-stone-500">
          Kosakata · {v.category} · {v.pos}
        </div>
        <div className="mt-5 text-6xl font-semibold">{v.word}</div>
        {v.word !== v.reading && <div className="mt-2 text-2xl text-stone-500">{v.reading}</div>}
        <div className="mt-4 text-xl">{v.meaning}</div>
      </>
    );
  }

  if (type === 'kanji') {
    const k = data as unknown as KanjiData;
    return (
      <>
        <div className="text-sm uppercase tracking-wide text-stone-500">Kanji · {k.strokes} goresan</div>
        <div className="my-5 text-8xl">{k.char}</div>
        <div className="space-y-1 text-left text-sm">
          <div><span className="text-stone-500">Arti:</span> {k.meaning}</div>
          <div><span className="text-stone-500">On&apos;yomi:</span> {k.on}</div>
          <div><span className="text-stone-500">Kun&apos;yomi:</span> {k.kun}</div>
        </div>
        <div className="mt-4 flex flex-wrap justify-center gap-2 text-sm">
          {k.examples.map((ex) => (
            <span key={ex} className="rounded-lg bg-stone-100 px-2 py-1 dark:bg-stone-800">{ex}</span>
          ))}
        </div>
      </>
    );
  }

  if (type === 'grammar') {
    const g = data as unknown as GrammarData;
    return (
      <>
        <div className="text-sm uppercase tracking-wide text-stone-500">Tata bahasa · {g.category}</div>
        <div className="mt-4 text-4xl font-semibold">{g.pattern}</div>
        <div className="mt-2 text-lg">{g.meaning}</div>
        <div className="mt-4 rounded-xl bg-stone-100 p-3 text-left text-sm dark:bg-stone-800">
          <div className="font-medium">Bentuk</div>
          <div className="text-stone-600 dark:text-stone-300">{g.formation}</div>
          <div className="mt-2 font-medium">Penjelasan</div>
          <div className="text-stone-600 dark:text-stone-300">{g.explanation}</div>
        </div>
        <div className="mt-4 space-y-2 text-left text-sm">
          {g.examples.map((ex) => (
            <div key={ex.jp}>
              <div className="font-medium">{ex.jp}</div>
              <div className="text-stone-500">{ex.id}</div>
            </div>
          ))}
        </div>
      </>
    );
  }

  return <div className="text-2xl">{String(data.title ?? '')}</div>;
}

export default function Study({ focus }: { focus?: StudyType }) {
  const [queue, setQueue] = useState<Card[]>([]);
  const [idx, setIdx] = useState(0);
  const [kind, setKind] = useState<Batch['kind']>('due');
  const [wait, setWait] = useState<Batch | null>(null);
  const [phase, setPhase] = useState<Phase>('loading');
  const [input, setInput] = useState('');
  const [chosen, setChosen] = useState<string | null>(null);
  const [result, setResult] = useState<{ correct: boolean; rating: number } | null>(null);
  const [score, setScore] = useState({ right: 0, total: 0 });
  const [error, setError] = useState<string | null>(null);
  const [now, setNow] = useState(() => Date.now());
  const startRef = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const card = queue[idx];
  const ex = card?.exercise;

  const loadNext = useCallback(
    async (mode: Mode = 'auto') => {
      try {
        const qs = new URLSearchParams({ mode });
        if (focus) qs.set('focus', focus);
        const res = await fetch(`/api/next?${qs}`);
        if (!res.ok) throw new Error();
        const b: Batch = await res.json();
        if (b.cards.length === 0) {
          setWait(b);
          setPhase('wait');
          return;
        }
        setQueue(b.cards);
        setIdx(0);
        setKind(b.kind);
        setInput('');
        setChosen(null);
        setResult(null);
        setPhase(b.cards[0].isNew ? 'learn' : 'quiz');
      } catch {
        setError('Gagal memuat kartu berikutnya.');
      }
    },
    [focus],
  );

  useEffect(() => {
    loadNext('auto');
  }, [loadNext]);

  useEffect(() => {
    if (phase !== 'wait') return;
    const tick = setInterval(() => setNow(Date.now()), 1000);
    const poll = setInterval(() => loadNext('auto'), 15000);
    return () => {
      clearInterval(tick);
      clearInterval(poll);
    };
  }, [phase, loadNext]);

  useEffect(() => {
    if (phase === 'quiz' && ex?.kind === 'typing') {
      startRef.current = Date.now();
      inputRef.current?.focus();
    }
    if (phase === 'quiz' && ex?.kind === 'mcq') startRef.current = Date.now();
  }, [phase, idx, ex?.kind]);

  const next = useCallback(() => {
    const n = idx + 1;
    setInput('');
    setChosen(null);
    setResult(null);
    if (n >= queue.length) {
      setPhase('loading');
      loadNext('auto');
      return;
    }
    setIdx(n);
    setPhase(queue[n].isNew ? 'learn' : 'quiz');
  }, [idx, queue, loadNext]);

  useEffect(() => {
    if (phase !== 'learn' && phase !== 'feedback') return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Enter' || e.repeat) return;
      if (phase === 'learn') setPhase('quiz');
      else next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [phase, next]);

  function record(correct: boolean, ms: number, exerciseType: string) {
    if (!card) return;
    const rating = ratingFor(correct, ms, card.isNew);
    setResult({ correct, rating });
    setScore((s) => ({ right: s.right + (correct ? 1 : 0), total: s.total + 1 }));
    setPhase('feedback');
    if (!correct) setQueue((q) => [...q, { ...card, isNew: false }]);
    fetch('/api/review', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ itemId: card.itemId, rating, exerciseType, durationMs: ms }),
    })
      .then((r) => {
        if (!r.ok) setError('Jawaban gagal disimpan. Coba muat ulang halaman.');
      })
      .catch(() => setError('Jawaban gagal disimpan. Coba muat ulang halaman.'));
  }

  function submitTyping() {
    if (!card || !ex || input.trim() === '') return;
    const ms = Date.now() - startRef.current;
    record(checkRomaji(input, ex.answer), ms, `${card.type}-type-answer`);
  }

  function submitMcq(option: string) {
    if (!card || !ex) return;
    const ms = Date.now() - startRef.current;
    setChosen(option);
    record(option === ex.answer, ms, `${card.type}-mcq`);
  }

  const btn = 'rounded-xl bg-stone-900 px-6 py-2 font-medium text-white dark:bg-stone-100 dark:text-stone-900';
  const ghost = 'rounded-xl border border-stone-300 px-4 py-2 dark:border-stone-700';
  const panel = 'rounded-2xl border border-stone-200 bg-white p-8 text-center dark:border-stone-800 dark:bg-stone-900';

  const waitSec = wait?.nextDueAt ? Math.max(0, Math.ceil((new Date(wait.nextDueAt).getTime() - now) / 1000)) : null;
  const fmt = (s: number) => (s >= 60 ? `${Math.ceil(s / 60)} menit` : `${s} detik`);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between text-sm text-stone-500">
        <Link href="/" className="hover:underline">← Beranda</Link>
        <div className="flex items-center gap-4">
          {focus && <span className="rounded-full bg-stone-200 px-3 py-0.5 text-xs dark:bg-stone-800">{FOCUS_LABEL[focus]}</span>}
          {(phase === 'learn' || phase === 'quiz' || phase === 'feedback') && (
            <span className="tabular-nums">
              {KIND_LABEL[kind]} · {idx + 1}/{queue.length}
            </span>
          )}
          {score.total > 0 && phase !== 'done' && (
            <button onClick={() => setPhase('done')} className="underline">Selesai</button>
          )}
        </div>
      </div>

      {error && <p className="rounded-lg bg-red-100 p-3 text-sm text-red-900 dark:bg-red-950 dark:text-red-200">{error}</p>}
      {phase !== 'done' && (
        <div className="flex flex-wrap gap-1.5 text-xs">
          <Link
            href="/study"
            className={`rounded-full border px-3 py-1 ${!focus ? 'border-stone-900 bg-stone-900 text-white dark:border-stone-100 dark:bg-stone-100 dark:text-stone-900' : 'border-stone-300 text-stone-600 dark:border-stone-700 dark:text-stone-300'}`}
          >
            Semua
          </Link>
          {(['kana', 'vocab', 'kanji', 'grammar'] as StudyType[]).map((t) => (
            <Link
              key={t}
              href={`/study?focus=${t}`}
              className={`rounded-full border px-3 py-1 ${focus === t ? 'border-stone-900 bg-stone-900 text-white dark:border-stone-100 dark:bg-stone-100 dark:text-stone-900' : 'border-stone-300 text-stone-600 dark:border-stone-700 dark:text-stone-300'}`}
            >
              {FOCUS_LABEL[t]}
            </Link>
          ))}
        </div>
      )}
      {phase === 'loading' && !error && <p className="py-16 text-center text-stone-500">Memuat…</p>}

      {phase === 'wait' && wait && (
        <div className={panel}>
          <div className="text-xl font-semibold">Jeda sebentar</div>
          <p className="mt-2 text-stone-500">{wait.reason}</p>
          {waitSec !== null && (
            <p className="mt-3 tabular-nums">Kartu berikutnya jatuh tempo dalam sekitar {fmt(waitSec)}.</p>
          )}
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {wait.newAvailable && (
              <button onClick={() => loadNext('new')} className={btn}>Tambah kartu baru</button>
            )}
            <button onClick={() => loadNext('ahead')} className={ghost}>Latihan ekstra</button>
            {score.total > 0 && <button onClick={() => setPhase('done')} className={ghost}>Selesai</button>}
          </div>
          <p className="mt-4 text-xs text-stone-500">Halaman ini mengecek otomatis tiap 15 detik.</p>
        </div>
      )}

      {phase === 'learn' && card && (
        <div className={panel}>
          <div className="text-center">
            <CardDetail card={card} />
          </div>
          <div className="mt-6 flex justify-center gap-3">
            <button
              onClick={() => speak(speakText(card))}
              className={ghost}
            >
              🔊 Dengar
            </button>
            <button onClick={() => setPhase('quiz')} className={btn}>Mengerti (Enter)</button>
          </div>
        </div>
      )}

      {(phase === 'quiz' || phase === 'feedback') && card && ex && (
        <div className={panel}>
          <div className="text-sm uppercase tracking-wide text-stone-500">
            {TYPE_LABEL[card.type]} · {ex.promptSub}
          </div>

          {ex.kind === 'typing' ? (
            <>
              <div className="my-6 text-9xl">{ex.prompt}</div>
              {phase === 'quiz' ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    submitTyping();
                  }}
                >
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    autoComplete="off"
                    autoCapitalize="none"
                    autoCorrect="off"
                    spellCheck={false}
                    className="w-48 rounded-xl border border-stone-300 bg-transparent px-4 py-3 text-center text-2xl outline-none focus:border-emerald-500 dark:border-stone-700"
                    placeholder="…"
                  />
                  <div className="mt-4">
                    <button type="submit" className={btn}>Periksa</button>
                  </div>
                </form>
              ) : (
                result && (
                  <div>
                    <div className={`text-2xl font-semibold ${result.correct ? 'text-emerald-600' : 'text-red-600'}`}>
                      {result.correct ? 'Benar' : 'Salah'}: {ex.answer}
                    </div>
                    <div className="mt-1 text-sm text-stone-500">
                      Dinilai: {RATING_LABEL[result.rating]}
                      {!result.correct && ' · akan ditanya lagi'}
                    </div>
                    <div className="mt-5 flex justify-center gap-3">
                      <button onClick={() => speak(ex.prompt)} className={ghost}>🔊</button>
                      <button onClick={next} className={btn}>Lanjut (Enter)</button>
                    </div>
                  </div>
                )
              )}
            </>
          ) : (
            <>
              <div className="my-6 text-3xl font-semibold leading-relaxed sm:text-4xl">{ex.prompt}</div>
              <div className="mx-auto grid max-w-md gap-2">
                {ex.options.map((opt) => {
                  const isAnswer = opt === ex.answer;
                  const isChosen = opt === chosen;
                  let cls =
                    'rounded-xl border px-4 py-3 text-left transition hover:border-stone-500 dark:hover:border-stone-400';
                  if (phase === 'feedback') {
                    if (isAnswer) cls += ' border-emerald-500 bg-emerald-50 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200';
                    else if (isChosen) cls += ' border-red-500 bg-red-50 text-red-900 dark:bg-red-950 dark:text-red-200';
                    else cls += ' border-stone-200 opacity-60 dark:border-stone-700';
                  } else {
                    cls += ' border-stone-300 dark:border-stone-700';
                  }
                  return (
                    <button
                      key={opt}
                      disabled={phase === 'feedback'}
                      onClick={() => submitMcq(opt)}
                      className={cls}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              {phase === 'feedback' && result && (
                <div className="mt-5">
                  <div className={`text-lg font-semibold ${result.correct ? 'text-emerald-600' : 'text-red-600'}`}>
                    {result.correct ? 'Benar' : 'Salah'}
                  </div>
                  <div className="mt-1 text-sm text-stone-500">
                    Dinilai: {RATING_LABEL[result.rating]}
                    {!result.correct && ' · akan ditanya lagi'}
                  </div>
                  <div className="mt-2 text-sm text-stone-600 dark:text-stone-300">
                    {card.type === 'grammar' ? (
                      <>
                        <div className="font-medium">Jawaban: {ex.answer}</div>
                        <div className="mt-1">{String(card.data.meaning ?? '')}</div>
                      </>
                    ) : (
                      ex.hint && <div>Petunjuk: {ex.hint}</div>
                    )}
                  </div>
                  <div className="mt-4 flex justify-center gap-3">
                    <button
                      onClick={() => speak(speakText(card))}
                      className={ghost}
                    >
                      🔊
                    </button>
                    <button onClick={next} className={btn}>Lanjut (Enter)</button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {phase === 'done' && (
        <div className={panel}>
          <div className="text-2xl font-semibold">Sesi selesai</div>
          <p className="mt-2 text-stone-500">
            {score.right}/{score.total} benar
            {score.total > 0 && ` (${Math.round((score.right / score.total) * 100)}%)`}
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Link href="/" className={`${btn} inline-block`}>Kembali ke beranda</Link>
            <button onClick={() => { setScore({ right: 0, total: 0 }); loadNext('auto'); }} className={ghost}>
              Mulai lagi
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
