import Link from 'next/link';
import { listItems } from '@/lib/content';
import { getDb } from '@/lib/server';

export const dynamic = 'force-dynamic';

type KanaData = {
  kind?: 'word';
  char?: string;
  word?: string;
  romaji: string;
  script: string;
  group?: string;
  meaning?: string;
  category?: string;
};

const linkCls =
  'rounded-xl border border-stone-300 px-4 py-2 text-sm font-medium dark:border-stone-700';
const primaryCls =
  'rounded-xl bg-stone-900 px-4 py-2 text-sm font-medium text-white dark:bg-stone-100 dark:text-stone-900';

export default async function KanaPage() {
  const db = getDb();
  const all = listItems(db, 'kana').map((r) => r.data as unknown as KanaData);
  const chars = all.filter((k) => k.kind !== 'word');
  const words = all.filter((k) => k.kind === 'word');

  const scripts: Array<['hiragana' | 'katakana', string]> = [
    ['hiragana', 'Hiragana'],
    ['katakana', 'Katakana'],
  ];

  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Kana</h1>
          <p className="mt-1 text-sm text-stone-500">
            Hiragana dan katakana dasar beserta kata nyata bahasa Jepang untuk latihan membaca.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/study?focus=kana&deck=all" className={primaryCls}>
            Latihan kana
          </Link>
          <Link href="/study?focus=kana&deck=hiragana" className={linkCls}>
            Hiragana
          </Link>
          <Link href="/study?focus=kana&deck=katakana" className={linkCls}>
            Katakana
          </Link>
          <Link href="/study?focus=kana&deck=word" className={linkCls}>
            Kata nyata
          </Link>
        </div>
      </header>

      <p className="rounded-xl bg-emerald-50 p-3 text-sm text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200">
        Latihan kana tanpa batas: setelah semua kartu diperkenalkan, kartu akan terus diulang
        sebagai review. Deck &quot;Kata nyata&quot; berisi kata Jepang asli untuk latihan membaca.
      </p>

      {scripts.map(([script, label]) => {
        const items = chars.filter((k) => k.script === script);
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

      <section>
        <div className="mb-3 flex flex-wrap items-end justify-between gap-2">
          <div>
            <h2 className="text-lg font-semibold">Kata nyata</h2>
            <p className="text-sm text-stone-500">
              {words.length} kata Jepang yang ditulis dengan kana. Latihan mengetik romajinya.
            </p>
          </div>
          <Link href="/study?focus=kana&deck=word" className={primaryCls}>
            Latihan kata nyata
          </Link>
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          {words.map((w) => (
            <div
              key={w.word}
              className="flex items-center justify-between gap-3 rounded-xl border border-stone-200 bg-white px-3 py-2 dark:border-stone-800 dark:bg-stone-900"
            >
              <div>
                <div className="text-xl leading-tight">{w.word}</div>
                <div className="text-xs text-stone-500">
                  {w.romaji} · {w.meaning}
                </div>
              </div>
              <span className="rounded-full bg-stone-100 px-2 py-0.5 text-[11px] text-stone-500 dark:bg-stone-800">
                {w.script === 'hiragana' ? 'Hiragana' : 'Katakana'}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
