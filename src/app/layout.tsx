import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: 'Belajar JLPT N5',
  description: 'Kana, kosakata, kanji, tata bahasa, membaca, mendengarkan, dan simulasi ujian JLPT N5.',
};

const NAV = [
  { href: '/', label: 'Beranda' },
  { href: '/study', label: 'Belajar' },
  { href: '/vocab', label: 'Kosakata' },
  { href: '/kanji', label: 'Kanji' },
  { href: '/grammar', label: 'Tata bahasa' },
  { href: '/reading', label: 'Membaca' },
  { href: '/listening', label: 'Mendengarkan' },
  { href: '/exam', label: 'Ujian' },
  { href: '/settings', label: 'Pengaturan' },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="min-h-screen bg-stone-50 text-stone-900 antialiased dark:bg-stone-950 dark:text-stone-100">
        <header className="sticky top-0 z-10 border-b border-stone-200 bg-stone-50/90 backdrop-blur dark:border-stone-800 dark:bg-stone-950/90">
          <nav className="mx-auto flex w-full max-w-5xl flex-wrap items-center gap-x-4 gap-y-1 px-4 py-3 text-sm">
            <Link href="/" className="mr-2 font-semibold tracking-tight">JLPT N5</Link>
            {NAV.slice(1).map((n) => (
              <Link key={n.href} href={n.href} className="text-stone-500 hover:text-stone-900 dark:hover:text-stone-100">
                {n.label}
              </Link>
            ))}
          </nav>
        </header>
        <main className="mx-auto w-full max-w-5xl px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
