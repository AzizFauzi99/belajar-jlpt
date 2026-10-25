'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const PACES = [
  { id: 'santai', label: 'Santai', note: 'lebih sedikit kartu baru' },
  { id: 'normal', label: 'Normal', note: 'seimbang' },
  { id: 'ngebut', label: 'Ngebut', note: 'lebih banyak kartu baru' },
] as const;

export default function SettingsForm({
  initial,
}: {
  initial: { pace: string; desiredRetention: number; examDate: string | null };
}) {
  const router = useRouter();
  const [pace, setPace] = useState(initial.pace);
  const [retention, setRetention] = useState(initial.desiredRetention);
  const [examDate, setExamDate] = useState(initial.examDate ?? '');
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  async function save() {
    setStatus('saving');
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pace,
          desiredRetention: retention,
          examDate: examDate || null,
        }),
      });
      if (!res.ok) throw new Error();
      setStatus('saved');
      router.refresh();
    } catch {
      setStatus('error');
    }
  }

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-stone-200 bg-white p-6 dark:border-stone-800 dark:bg-stone-900">
        <h2 className="font-semibold">Tempo belajar</h2>
        <p className="mt-1 text-sm text-stone-500">
          Mengatur batas lunak kartu rapuh. Bukan batas harian: akurasi tinggi otomatis menambah jatah.
        </p>
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          {PACES.map((p) => (
            <button
              key={p.id}
              onClick={() => setPace(p.id)}
              className={`rounded-xl border px-4 py-3 text-left ${
                pace === p.id
                  ? 'border-stone-900 bg-stone-900 text-white dark:border-stone-100 dark:bg-stone-100 dark:text-stone-900'
                  : 'border-stone-300 dark:border-stone-700'
              }`}
            >
              <div className="font-medium">{p.label}</div>
              <div className={`text-xs ${pace === p.id ? 'opacity-70' : 'text-stone-500'}`}>{p.note}</div>
            </button>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-stone-200 bg-white p-6 dark:border-stone-800 dark:bg-stone-900">
        <h2 className="font-semibold">Target retensi</h2>
        <p className="mt-1 text-sm text-stone-500">
          Probabilitas ingat yang ingin dijaga FSRS. Lebih tinggi = interval lebih pendek dan review lebih banyak.
        </p>
        <div className="mt-4 flex items-center gap-4">
          <input
            type="range"
            min={0.7}
            max={0.97}
            step={0.01}
            value={retention}
            onChange={(e) => setRetention(Number(e.target.value))}
            className="flex-1 accent-emerald-600"
          />
          <span className="w-14 text-right font-semibold tabular-nums">{Math.round(retention * 100)}%</span>
        </div>
        <p className="mt-2 text-xs text-stone-500">
          Rekomendasi 90%. Di atas 93% beban review naik tajam.
        </p>
      </section>

      <section className="rounded-2xl border border-stone-200 bg-white p-6 dark:border-stone-800 dark:bg-stone-900">
        <h2 className="font-semibold">Tanggal ujian</h2>
        <p className="mt-1 text-sm text-stone-500">Opsional. Dipakai untuk menghitung sisa hari di beranda.</p>
        <input
          type="date"
          value={examDate}
          onChange={(e) => setExamDate(e.target.value)}
          className="mt-3 rounded-xl border border-stone-300 bg-transparent px-4 py-2 dark:border-stone-700"
        />
      </section>

      <div className="flex items-center gap-3">
        <button
          onClick={save}
          disabled={status === 'saving'}
          className="rounded-xl bg-stone-900 px-6 py-2 font-medium text-white disabled:opacity-50 dark:bg-stone-100 dark:text-stone-900"
        >
          {status === 'saving' ? 'Menyimpan…' : 'Simpan pengaturan'}
        </button>
        {status === 'saved' && <span className="text-sm text-emerald-600 dark:text-emerald-400">Tersimpan.</span>}
        {status === 'error' && <span className="text-sm text-red-600 dark:text-red-400">Gagal menyimpan.</span>}
      </div>
    </div>
  );
}
