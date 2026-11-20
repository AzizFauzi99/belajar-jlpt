import { Rating, type Grade } from 'ts-fsrs';

// Ejaan alternatif yang umum diketik (Hepburn vs Kunrei/Nihon-shiki).
const ALT: Record<string, string[]> = {
  shi: ['si'],
  chi: ['ti'],
  tsu: ['tu'],
  fu: ['hu'],
  ji: ['zi', 'di'],
  zu: ['du'],
  wo: ['o'],
  n: ['nn'],
};

export const acceptedRomaji = (expected: string) => [expected, ...(ALT[expected] ?? [])];

export const normalizeRomaji = (s: string) => s.trim().toLowerCase().replace(/\s+/g, '');

export const checkRomaji = (input: string, expected: string) =>
  acceptedRomaji(expected).includes(normalizeRomaji(input));

const MACRON: Record<string, string> = { ā: 'aa', ī: 'ii', ū: 'uu', ē: 'ee', ō: 'oo' };

// Kunrei/Nihon-shiki -> Hepburn, supaya "sinbun" diterima untuk "shinbun".
const KUNREI: Array<[string, string]> = [
  ['sya', 'sha'],
  ['syu', 'shu'],
  ['syo', 'sho'],
  ['tya', 'cha'],
  ['tyu', 'chu'],
  ['tyo', 'cho'],
  ['zya', 'ja'],
  ['zyu', 'ju'],
  ['zyo', 'jo'],
  ['si', 'shi'],
  ['ti', 'chi'],
  ['tu', 'tsu'],
  ['hu', 'fu'],
  ['zi', 'ji'],
  ['di', 'ji'],
  ['du', 'zu'],
];

/**
 * Bentuk kanonik romaji untuk kata utuh (bukan satu kana).
 * Menerima macron (kōhī), vokal panjang dobel (koohii) atau tunggal (kohi),
 * ejaan Kunrei (sinbun), dan "m" sebelum b/p (shimbun).
 */
export function canonicalRomaji(s: string): string {
  let x = normalizeRomaji(s).replace(/[āīūēō]/g, (c) => MACRON[c]);
  x = x.replace(/[^a-z]/g, '');
  for (const [from, to] of KUNREI) x = x.split(from).join(to);
  x = x.replace(/mb/g, 'nb').replace(/mp/g, 'np');
  // ou/oo/uu/aa/ii/ee adalah cara lain menulis vokal panjang.
  for (let i = 0; i < 3; i++) x = x.replace(/ou|oo|uu|aa|ii|ee/g, (m) => m[0]);
  return x;
}

export const checkWordRomaji = (input: string, expected: string) =>
  canonicalRomaji(input) === canonicalRomaji(expected);

/**
 * Rating otomatis dari hasil + kecepatan jawab.
 * Kartu baru dibatasi maksimal Good: jawabannya baru saja ditampilkan di layar belajar.
 */
export function ratingFor(correct: boolean, ms: number, isNew: boolean): Grade {
  if (!correct) return Rating.Again;
  if (ms >= 6000) return Rating.Hard;
  if (ms >= 2500 || isNew) return Rating.Good;
  return Rating.Easy;
}
