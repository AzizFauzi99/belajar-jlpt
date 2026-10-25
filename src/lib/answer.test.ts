import { describe, expect, it } from 'vitest';
import { Rating } from 'ts-fsrs';
import { checkRomaji, ratingFor } from './answer';

describe('checkRomaji', () => {
  it('menerima jawaban persis, huruf besar, dan spasi', () => {
    expect(checkRomaji(' KA ', 'ka')).toBe(true);
  });
  it('menerima ejaan alternatif', () => {
    expect(checkRomaji('si', 'shi')).toBe(true);
    expect(checkRomaji('tu', 'tsu')).toBe(true);
    expect(checkRomaji('hu', 'fu')).toBe(true);
    expect(checkRomaji('zi', 'ji')).toBe(true);
    expect(checkRomaji('o', 'wo')).toBe(true);
    expect(checkRomaji('nn', 'n')).toBe(true);
  });
  it('menolak jawaban salah', () => {
    expect(checkRomaji('ki', 'ka')).toBe(false);
    expect(checkRomaji('', 'ka')).toBe(false);
  });
});

describe('ratingFor', () => {
  it('salah = Again', () => expect(ratingFor(false, 500, false)).toBe(Rating.Again));
  it('benar cepat = Easy, tapi kartu baru maksimal Good', () => {
    expect(ratingFor(true, 1000, false)).toBe(Rating.Easy);
    expect(ratingFor(true, 1000, true)).toBe(Rating.Good);
  });
  it('benar lambat = Hard', () => expect(ratingFor(true, 8000, false)).toBe(Rating.Hard));
});
