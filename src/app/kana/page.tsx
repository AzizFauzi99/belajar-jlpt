import Link from 'next/link';
import { listItems } from '@/lib/content';
import { getDb } from '@/lib/server';

export const dynamic = 'force-dynamic';

type KanaData = { char: string; romaji: string; script: string; group: string };

export default async function KanaPage() {
  const db = getDb();
  const kana = listItems(db, 'kana').map((r) => r.data as unknown as KanaData);

  const scripts: Array<['hiragana' | 'katakana', string]> = [
    ['hiragana', 'Hiragana'],
    ['katakana', 'Katakana'],
  ];

  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Kana</h1>
          <p className="mt-1 text-sm text-stone-500">Hiragana dan katakana dasar beserta romaji.</p>
        </div>
        <Link
          href="/study?focus=kana"
          className="rounded-xl bg-stone-900 px-4 py-2 text-sm font-medium text-white dark:bg-stone-100 dark:text-stone-900"
        >
          Latihan kana
        </Link>
      </header>

      {scripts.map(([script, label]) => {
        const items = kana.filter((k) => k.script === script);
        const groups = [...new Set(items.map((k) => k.group))];
        return (
          <section key={script}>
            <h2 className="mb-3 text-lg font-semibold">{label}</h2>
            <div className="space-y-2">
              {groups.map((g) => (
                <div key={g} className="flex flex-wrap gap-1.5">
                  {items
                    .filter((k) => k.group === g)
                    .map((k) => (
                      <div
                        key={k.char}
                        className="w-16 rounded-xl border border-stone-200 bg-white py-2 text-center dark:border-stone-800 dark:bg-stone-900"
                      >
                        <div className="text-2xl leading-none">{k.char}</div>
                        <div className="mt-1 text-[11px] text-stone-500">{k.romaji}</div>
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
