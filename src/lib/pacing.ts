export type Pace = 'santai' | 'normal' | 'ngebut';

/** Kartu dengan stabilitas di bawah ini (hari) dianggap masih "muda"/rapuh. */
export const YOUNG_STABILITY_DAYS = 7;
/** Fase berikutnya terbuka saat fase sebelumnya sekian persen item sudah stabil. */
export const PHASE_UNLOCK_RATIO = 0.7;
export const NEW_BATCH_SIZE = 5;
export const DUE_BATCH_SIZE = 10;

const BASE: Record<Pace, number> = { santai: 20, normal: 30, ngebut: 50 };

/**
 * Batas lunak jumlah kartu "muda" yang boleh menumpuk sebelum kartu baru ditahan.
 * Bukan batas harian: user yang menjawab cepat dan akurat otomatis dapat jatah lebih besar,
 * user yang sering salah otomatis diperlambat.
 * accuracy null = belum cukup data (anggap netral).
 */
export function youngLimit(pace: Pace, accuracy: number | null): number {
  const a = accuracy ?? 0.9;
  const factor = a < 0.75 ? 0.5 : a < 0.85 ? 0.75 : a < 0.93 ? 1 : 1.25;
  return Math.round(BASE[pace] * factor);
}

/** Urutan fase konten. Item satu fase boleh tumpang tindih dengan fase berikutnya setelah ambang tercapai. */
export const PHASES: Array<Array<'kana' | 'vocab' | 'kanji' | 'grammar'>> = [
  ['kana'],
  ['vocab', 'kanji'],
  ['grammar'],
];
