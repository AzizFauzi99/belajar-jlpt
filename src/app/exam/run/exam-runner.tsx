'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { ExamPaper, ExamQuestion, ExamSectionKey } from '@/lib/exam';

type SectionScore = { key: string; label: string; correct: number; total: number };
type Result = {
  sections: SectionScore[];
  totalCorrect: number;
  totalQuestions: number;
  passed: boolean;
  saved: boolean;
};

const TYPE_LABEL: Record<ExamSectionKey, string> = {
  moji: '文字・語彙',
  grammar: '文法',
  reading: '読解',
  listening: '聴解',
};

function fmtTime(ms: number) {
  const s = Math.max(0, Math.ceil(ms / 1000));
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
}

function ExamAudio({ title, lines }: { title: string; lines: { speaker: string; jp: string }[] }) {
  const [playing, setPlaying] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const stop = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) window.speechSynthesis.cancel();
    if (timer.current) clearTimeout(timer.current);
    setPlaying(false);
  }, []);

  useEffect(() => stop, [stop]);

  function play() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    setPlaying(true);
    const speakAt = (i: number) => {
      if (i >= lines.length) {
        setPlaying(false);
        return;
      }
      const u = new SpeechSynthesisUtterance(lines[i].jp);
      u.lang = 'ja-JP';
      u.rate = 0.9;
      u.onend = () => {
        timer.current = setTimeout(() => speakAt(i + 1), 300);
      };
      window.speechSynthesis.speak(u);
    };
    speakAt(0);
  }

  return (
    <div className="mt-3 rounded-xl border border-stone-200 bg-stone-50 p-3 dark:border-stone-800 dark:bg-stone-950">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="text-sm font-medium">🔈 {title ?? 'Dialog'}</div>
        <div className="flex gap-2">
          <button
            onClick={play}
            disabled={playing}
            className="rounded-lg bg-stone-900 px-3 py-1.5 text-xs font-medium text-white disabled:opacity-50 dark:bg-stone-100 dark:text-stone-900"
          >
            {playing ? 'Memutar…' : 'Putar dialog'}
          </button>
          <button onClick={stop} className="rounded-lg border border-stone-300 px-3 py-1.5 text-xs dark:border-stone-700">
            Stop
          </button>
        </div>
      </div>
      <div className="mt-2 flex flex-wrap gap-2 text-xs text-stone-500">
        {lines.map((l, i) => (
          <span key={`${l.speaker}-${i}`} className="rounded bg-white px-2 py-1 dark:bg-stone-900">
            {l.speaker}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function ExamRunner() {
  const [paper, setPaper] = useState<ExamPaper | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [sectionIdx, setSectionIdx] = useState(0);
  const [qIdx, setQIdx] = useState(0);
  const [deadline, setDeadline] = useState<number | null>(null);
  const [now, setNow] = useState(() => Date.now());
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);
  const submitted = useRef(false);

  useEffect(() => {
    fetch('/api/exam')
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json() as Promise<ExamPaper>;
      })
      .then((p) => {
        setPaper(p);
        setDeadline(Date.now() + p.durationMin * 60_000);
      })
      .catch(() => setError('Gagal memuat soal ujian. Muat ulang halaman.'));
  }, []);

  const submit = useCallback(async () => {
    if (!paper || submitted.current) return;
    submitted.current = true;
    const sections: SectionScore[] = paper.sections.map((s) => ({
      key: s.key,
      label: s.label,
      correct: s.questions.filter((q) => answers[q.id] === q.answer).length,
      total: s.questions.length,
    }));
    const totalCorrect = sections.reduce((s, x) => s + x.correct, 0);
    const totalQuestions = sections.reduce((s, x) => s + x.total, 0);
    const passed = totalQuestions > 0 && totalCorrect / totalQuestions >= paper.passScore / 100;
    const elapsed = deadline ? Math.max(0, Math.round((Date.now() - (deadline - paper.durationMin * 60_000)) / 1000)) : 0;
    setResult({ sections, totalCorrect, totalQuestions, passed, saved: false });

    try {
      const res = await fetch('/api/exam', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ durationSec: elapsed, sections }),
      });
      if (res.ok) setResult((r) => (r ? { ...r, saved: true } : r));
    } catch {
      // hasil tetap ditampilkan walau penyimpanan gagal
    }
  }, [paper, answers, deadline]);

  useEffect(() => {
    if (!deadline || result) return;
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, [deadline, result]);

  useEffect(() => {
    if (paper && deadline && !result && now >= deadline) void submit();
  }, [now, deadline, paper, result, submit]);

  if (error) {
    return (
      <div className="rounded-2xl bg-red-100 p-6 text-center text-red-900 dark:bg-red-950 dark:text-red-200">
        {error}
        <div className="mt-3">
          <Link href="/exam" className="underline">← Kembali</Link>
        </div>
      </div>
    );
  }

  if (!paper || !deadline) {
    return <p className="py-20 text-center text-stone-500">Menyiapkan soal…</p>;
  }

  if (result) {
    const pct = Math.round((result.totalCorrect / result.totalQuestions) * 100);
    return (
      <div className="mx-auto max-w-3xl space-y-6">
        <header className="text-center">
          <div className="text-sm uppercase tracking-wide text-stone-500">Hasil simulasi</div>
          <div className={`mt-2 text-5xl font-bold ${result.passed ? 'text-emerald-600' : 'text-red-600'}`}>{pct}%</div>
          <div className="mt-1 text-lg">
            {result.totalCorrect} / {result.totalQuestions} benar ·{' '}
            <span className={result.passed ? 'text-emerald-600' : 'text-red-600'}>
              {result.passed ? 'Lulus' : 'Belum lulus'}
            </span>
          </div>
          <div className="mt-1 text-xs text-stone-500">
            {result.saved ? 'Tersimpan di riwayat.' : 'Menyimpan…'}
          </div>
        </header>

        <section className="grid gap-2 sm:grid-cols-4">
          {result.sections.map((s) => (
            <div key={s.key} className="rounded-xl border border-stone-200 bg-white p-4 text-center dark:border-stone-800 dark:bg-stone-900">
              <div className="text-xs text-stone-500">{s.label}</div>
              <div className="mt-1 text-xl font-semibold tabular-nums">{s.correct}/{s.total}</div>
            </div>
          ))}
        </section>

        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/exam/run" className="rounded-xl bg-stone-900 px-5 py-2 text-sm font-medium text-white dark:bg-stone-100 dark:text-stone-900">
            Ulangi ujian
          </Link>
          <Link href="/exam" className="rounded-xl border border-stone-300 px-5 py-2 text-sm dark:border-stone-700">
            Riwayat
          </Link>
          <Link href="/" className="rounded-xl border border-stone-300 px-5 py-2 text-sm dark:border-stone-700">
            Beranda
          </Link>
        </div>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Pembahasan</h2>
          {paper.sections.map((s) => (
            <div key={s.key}>
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-stone-500">{s.label}</h3>
              <div className="space-y-2">
                {s.questions.map((q, i) => {
                  const chosen = answers[q.id];
                  const correct = chosen === q.answer;
                  return (
                    <div key={q.id} className="rounded-xl border border-stone-200 bg-white p-4 text-sm dark:border-stone-800 dark:bg-stone-900">
                      <div className="flex items-start gap-2">
                        <span className={`mt-0.5 text-xs font-semibold ${correct ? 'text-emerald-600' : 'text-red-600'}`}>
                          {correct ? '○' : '×'}
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="font-medium">{i + 1}. {q.prompt}</div>
                          <div className="mt-1 text-xs text-stone-500">
                            Jawabanmu: {chosen === undefined ? '—' : q.options[chosen]} · Benar: {q.options[q.answer]}
                          </div>
                          {q.explanation && <div className="mt-1 text-xs text-stone-500">{q.explanation}</div>}
                          {q.passage && (
                            <details className="mt-2">
                              <summary className="cursor-pointer text-xs text-stone-500">Lihat teks</summary>
                              <p className="mt-1 text-xs leading-relaxed">{q.passage}</p>
                            </details>
                          )}
                          {q.audio && (
                            <details className="mt-2">
                              <summary className="cursor-pointer text-xs text-stone-500">Lihat skrip</summary>
                              <div className="mt-1 space-y-0.5 text-xs">
                                {q.audio.map((l, li) => (
                                  <div key={li}><span className="text-stone-400">{l.speaker}:</span> {l.jp}</div>
                                ))}
                              </div>
                            </details>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </section>
      </div>
    );
  }

  const section = paper.sections[sectionIdx];
  const q: ExamQuestion | undefined = section.questions[qIdx];
  const answeredTotal = Object.keys(answers).length;
  const remaining = Math.max(0, deadline - now);
  const sectionAnswered = section.questions.filter((x) => answers[x.id] !== undefined).length;

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <div className="sticky top-[53px] z-10 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-stone-200 bg-stone-50/95 px-4 py-2 backdrop-blur dark:border-stone-800 dark:bg-stone-950/95">
        <div className="text-sm font-medium">
          {TYPE_LABEL[section.key]} <span className="text-stone-400">· bagian {sectionIdx + 1}/{paper.sections.length}</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <span className="tabular-nums text-stone-500">{answeredTotal}/{paper.totalQuestions} dijawab</span>
          <span className={`rounded-lg px-2 py-1 font-semibold tabular-nums ${remaining < 600_000 ? 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300' : 'bg-stone-200 dark:bg-stone-800'}`}>
            ⏱ {fmtTime(remaining)}
          </span>
          <button
            onClick={() => {
              if (window.confirm('Selesaikan ujian sekarang? Soal yang belum dijawab dihitung salah.')) void submit();
            }}
            className="rounded-lg border border-stone-300 px-2 py-1 text-xs dark:border-stone-700"
          >
            Selesai
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-1">
        {paper.sections.map((s, i) => (
          <button
            key={s.key}
            onClick={() => {
              setSectionIdx(i);
              setQIdx(0);
            }}
            className={`rounded-lg px-3 py-1 text-xs ${
              i === sectionIdx
                ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900'
                : 'border border-stone-300 text-stone-600 dark:border-stone-700 dark:text-stone-300'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <section className="rounded-2xl border border-stone-200 bg-white p-6 dark:border-stone-800 dark:bg-stone-900">
        <div className="text-xs uppercase tracking-wide text-stone-500">
          {section.instruction} · soal {qIdx + 1}/{section.questions.length}
        </div>

        {q?.passage && (
          <div className="mt-4 rounded-xl bg-stone-100 p-4 text-sm leading-relaxed dark:bg-stone-800">
            {q.passageTitle && <div className="mb-1 font-medium">{q.passageTitle}</div>}
            {q.passage}
          </div>
        )}

        {q?.audio && <ExamAudio title={q.audioTitle ?? ''} lines={q.audio} />}

        <div className="mt-5 text-xl font-semibold leading-relaxed">{q?.prompt}</div>
        <div className="mt-1 text-sm text-stone-500">{q?.promptSub}</div>

        <div className="mt-4 grid gap-2">
          {q?.options.map((o, oi) => (
            <button
              key={o}
              onClick={() => setAnswers((a) => ({ ...a, [q.id]: oi }))}
              className={`rounded-xl border px-4 py-2 text-left text-sm transition ${
                answers[q.id] === oi
                  ? 'border-stone-900 bg-stone-900 text-white dark:border-stone-100 dark:bg-stone-100 dark:text-stone-900'
                  : 'border-stone-300 hover:border-stone-500 dark:border-stone-700'
              }`}
            >
              {o}
            </button>
          ))}
        </div>
      </section>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={() => {
            if (qIdx > 0) setQIdx(qIdx - 1);
            else if (sectionIdx > 0) {
              setSectionIdx(sectionIdx - 1);
              setQIdx(paper.sections[sectionIdx - 1].questions.length - 1);
            }
          }}
          className="rounded-xl border border-stone-300 px-4 py-2 text-sm dark:border-stone-700"
        >
          ← Sebelumnya
        </button>

        <div className="flex flex-wrap gap-1">
          {section.questions.map((x, i) => (
            <button
              key={x.id}
              onClick={() => setQIdx(i)}
              aria-label={`Soal ${i + 1}`}
              className={`h-7 w-7 rounded-md text-xs tabular-nums ${
                i === qIdx
                  ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900'
                  : answers[x.id] !== undefined
                    ? 'bg-emerald-200 text-emerald-900 dark:bg-emerald-900 dark:text-emerald-100'
                    : 'border border-stone-300 text-stone-500 dark:border-stone-700'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        {qIdx < section.questions.length - 1 ? (
          <button
            onClick={() => setQIdx(qIdx + 1)}
            className="rounded-xl bg-stone-900 px-4 py-2 text-sm font-medium text-white dark:bg-stone-100 dark:text-stone-900"
          >
            Berikutnya →
          </button>
        ) : sectionIdx < paper.sections.length - 1 ? (
          <button
            onClick={() => {
              setSectionIdx(sectionIdx + 1);
              setQIdx(0);
            }}
            className="rounded-xl bg-stone-900 px-4 py-2 text-sm font-medium text-white dark:bg-stone-100 dark:text-stone-900"
          >
            Bagian berikutnya →
          </button>
        ) : (
          <button
            onClick={() => {
              if (window.confirm(`Selesaikan ujian? ${answeredTotal}/${paper.totalQuestions} soal sudah dijawab.`)) void submit();
            }}
            className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white"
          >
            Selesai & lihat nilai
          </button>
        )}
      </div>

      <p className="text-center text-xs text-stone-500">
        Bagian ini: {sectionAnswered}/{section.questions.length} dijawab · jawaban bisa diubah sebelum selesai.
      </p>
    </div>
  );
}
