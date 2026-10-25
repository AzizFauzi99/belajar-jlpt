'use client';

import { useEffect, useRef, useState } from 'react';
import type { ListeningLine } from '@/content/listening';

export default function ListeningPlayer({
  title,
  lines,
  translation,
  notes,
}: {
  title: string;
  lines: ListeningLine[];
  translation: string;
  notes?: string[];
}) {
  const [revealed, setRevealed] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);
  const [playing, setPlaying] = useState<number | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) window.speechSynthesis.cancel();
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  function speakLine(i: number) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    setPlaying(i);
    const u = new SpeechSynthesisUtterance(lines[i].jp);
    u.lang = 'ja-JP';
    u.rate = 0.9;
    u.onend = () => setPlaying(null);
    window.speechSynthesis.speak(u);
  }

  function playAll() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const speakAt = (i: number) => {
      if (i >= lines.length) {
        setPlaying(null);
        return;
      }
      setPlaying(i);
      const u = new SpeechSynthesisUtterance(lines[i].jp);
      u.lang = 'ja-JP';
      u.rate = 0.9;
      u.onend = () => {
        timer.current = setTimeout(() => speakAt(i + 1), 350);
      };
      window.speechSynthesis.speak(u);
    };
    speakAt(0);
  }

  function stop() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) window.speechSynthesis.cancel();
    if (timer.current) clearTimeout(timer.current);
    setPlaying(null);
  }

  return (
    <section className="rounded-2xl border border-stone-200 bg-white p-6 dark:border-stone-800 dark:bg-stone-900">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <div className="text-xs uppercase tracking-wide text-stone-500">Audio · {title}</div>
          <p className="mt-1 text-sm text-stone-500">Putar dialog, lalu jawab soal di bawah.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={playAll} className="rounded-xl bg-stone-900 px-4 py-2 text-sm font-medium text-white dark:bg-stone-100 dark:text-stone-900">
            ▶ Putar semua
          </button>
          <button onClick={stop} className="rounded-xl border border-stone-300 px-3 py-2 text-sm dark:border-stone-700">■</button>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        {lines.map((l, i) => (
          <div
            key={`${l.speaker}-${i}`}
            className={`flex items-center gap-3 rounded-xl border px-3 py-2 text-sm ${
              playing === i ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950' : 'border-stone-200 dark:border-stone-800'
            }`}
          >
            <span className="w-10 shrink-0 text-xs text-stone-500">{l.speaker}</span>
            <span className="min-w-0 flex-1">{revealed ? l.jp : '・ ・ ・ ・ ・'}</span>
            <button
              onClick={() => speakLine(i)}
              className="rounded-lg border border-stone-300 px-2 py-1 text-xs dark:border-stone-700"
              aria-label={`Putar baris ${i + 1}`}
            >
              ▶
            </button>
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          onClick={() => setRevealed((r) => !r)}
          className="rounded-xl border border-stone-300 px-3 py-1.5 text-sm dark:border-stone-700"
        >
          {revealed ? 'Sembunyikan skrip' : 'Tampilkan skrip'}
        </button>
        <button
          onClick={() => setShowTranslation((t) => !t)}
          className="rounded-xl border border-stone-300 px-3 py-1.5 text-sm dark:border-stone-700"
        >
          {showTranslation ? 'Sembunyikan terjemahan' : 'Tampilkan terjemahan'}
        </button>
      </div>

      {revealed && notes && notes.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {notes.map((n) => (
            <span key={n} className="rounded bg-stone-100 px-2 py-1 text-xs text-stone-600 dark:bg-stone-800 dark:text-stone-300">
              {n}
            </span>
          ))}
        </div>
      )}
      {showTranslation && (
        <div className="mt-3 rounded-xl bg-stone-100 p-3 text-sm text-stone-600 dark:bg-stone-800 dark:text-stone-300">
          {translation}
        </div>
      )}
    </section>
  );
}
