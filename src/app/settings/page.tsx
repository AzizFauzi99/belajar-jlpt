import Link from 'next/link';
import SettingsForm from '@/components/settings-form';
import { getDb, getUser } from '@/lib/server';

export const dynamic = 'force-dynamic';

export default function SettingsPage() {
  const db = getDb();
  const { settings } = getUser(db);

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <header>
        <h1 className="text-2xl font-bold">Pengaturan</h1>
        <p className="mt-1 text-sm text-stone-500">Atur tempo, target retensi, dan tanggal ujian.</p>
      </header>

      <SettingsForm
        initial={{
          pace: settings.pace,
          desiredRetention: settings.desiredRetention,
          examDate: settings.examDate,
        }}
      />

      <section className="rounded-2xl border border-stone-200 bg-white p-5 text-sm text-stone-500 dark:border-stone-800 dark:bg-stone-900">
        <h2 className="font-semibold text-stone-900 dark:text-stone-100">Data & backup</h2>
        <p className="mt-1">
          Semua progres tersimpan lokal di <code className="rounded bg-stone-100 px-1 dark:bg-stone-800">data/app.db</code>.
          Backup = salin file itu saat aplikasi berhenti. Konten bisa di-seed ulang dengan{' '}
          <code className="rounded bg-stone-100 px-1 dark:bg-stone-800">npm run seed</code> tanpa menghapus progres.
        </p>
      </section>

      <Link href="/" className="text-sm text-stone-500 hover:underline">← Beranda</Link>
    </div>
  );
}
