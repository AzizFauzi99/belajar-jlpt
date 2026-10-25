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
