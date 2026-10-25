# JLPT N5 App (lokal)

Aplikasi belajar JLPT N5: kana, kosakata, kanji, tata bahasa, membaca, mendengarkan, dan simulasi ujian.
Next.js 15 + SQLite (Drizzle ORM) + FSRS (spaced repetition). Semua data tersimpan lokal, tanpa akun dan tanpa jaringan.

## Isi konten

| Skill | Jumlah | Halaman |
|---|---|---|
| Kana (hiragana + katakana) | 142 | `/kana`, latihan `/study?focus=kana` |
| Kosakata | 935 kata | `/vocab`, latihan `/study?focus=vocab` |
| Kanji | 106 kanji | `/kanji`, latihan `/study?focus=kanji` |
| Tata bahasa | 80 pola | `/grammar`, latihan `/study?focus=grammar` |
| Membaca | 18 bacaan + 36 soal | `/reading` |
| Mendengarkan | 16 dialog + 32 soal | `/listening` |
| Simulasi ujian | 51 soal / 75 menit | `/exam` |

Konten ada di `src/content/` dan di-seed ke SQLite. Semua data konten bisa diperbarui tanpa menghapus progres.

## Menjalankan

```bash
npm install
npm run seed       # buat data/app.db, migrasi, seed semua konten, user default
npm run dev        # http://localhost:3000
npm test           # 34 tes
npm run typecheck
npm run build
```

Jika sudah punya `data/app.db` dari versi lama, jalankan `npm run seed` lagi. Migrasi menambah tabel/kolom baru dan seed bersifat idempoten; progres di `card_state`, `review_log`, dan `lesson_progress` tidak tersentuh.

## Fitur

### Sesi belajar adaptif (`/study`)
- Satu antrean untuk kana, kosakata, kanji, dan tata bahasa.
- Soal dibuat otomatis: ketik romaji (kana), pilih arti/cara baca (kosakata, kanji), isian cloze (tata bahasa).
- Kartu baru menampilkan detail lengkap + audio TTS sebelum dites.
- Mode fokus per skill lewat `/study?focus=vocab` (dan tombol di halaman).
- Tombol audio memakai Web Speech API (suara Jepang perangkat).

### Tempo mengikuti pengguna (tanpa batas harian)
Urutan pengambilan kartu (`src/lib/next.ts`):
1. **Jatuh tempo dulu:** learning/relearning, lalu review dengan retrievability terendah.
2. **Antrean kosong + gerbang terbuka:** kartu baru, batch kecil (5).
3. **Selain itu:** layar jeda; pengguna bisa memaksa **Tambah kartu baru** atau **Latihan ekstra**.

**Gerbang adaptif:** kartu baru ditahan jika kartu "rapuh" (stabilitas < 7 hari) melewati batas lunak.
- Dasar: santai 20, normal 30, ngebut 50.
- Dikalikan akurasi 40 jawaban terakhir: <75% ×0,5; <85% ×0,75; <93% ×1; ≥93% ×1,25.
- Fokus skill yang dipilih pengguna melewati gerbang.

**Fase konten:** kana → (kosakata, kanji) → tata bahasa. Fase terbuka jika 70% item stabil **atau** 100 item sudah diperkenalkan (supaya deck besar seperti 935 kosakata tidak mengunci terlalu lama). Fase kosong tidak memblokir.

### Kosakata, kanji, tata bahasa
- Pencarian dan filter kategori (`/vocab`, `/kanji`, `/grammar`).
- Detail tata bahasa dengan bentuk, penjelasan, dua contoh, dan latihan isian (`/grammar/[id]`).
- Kanji menampilkan on'yomi, kun'yomi, arti, jumlah goresan, dan contoh kata.

### Membaca (`/reading`)
- 18 teks pendek N5 dengan topik beragam.
- Terjemahan dan catatan kosakata bisa ditampilkan/disembunyikan.
- Audio TTS untuk membacakan teks.
- Soal pemahaman dengan pembahasan; bacaan yang selesai ditandai di `lesson_progress`.

### Mendengarkan (`/listening`)
- 16 dialog dengan pemutar TTS per baris atau "putar semua".
- Skrip dan terjemahan tersembunyi sampai dibuka.
- Soal pemahaman + pembahasan; progres tersimpan.

### Simulasi ujian (`/exam`)
- Empat bagian: 文字・語彙 (20), 文法 (15), 読解 (8), 聴解 (8).
- 75 menit, timer mundur, auto-submit, navigasi soal dan bagian, jawaban bisa diubah.
- Nilai lulus 60%. Hasil disimpan di `exam_attempts` dan tampil di riwayat.
- Pembahasan semua soal setelah selesai, termasuk skrip listening.
- Soal diambil acak dari bank konten, jadi setiap percobaan berbeda.

### Pengaturan (`/settings`)
- Pace (santai/normal/ngebut).
- Target retensi FSRS 70–97% (default 90%).
- Tanggal ujian (tampil sebagai hitung mundur di beranda).

## Struktur penting

```
src/content/          data mentah semua konten (mudah diedit)
src/lib/next.ts       pemilihan batch SRS, gerbang, fase
src/lib/exercise.ts   pembuat soal otomatis + pengecoh
src/lib/exam.ts       penyusun paket simulasi ujian
src/lib/srs.ts        pembungkus FSRS
src/lib/stats.ts      statistik & progres per skill
scripts/seed.ts       seed idempoten semua konten
src/app/              halaman & API route
```

### API
- `GET /api/next?mode=auto|new|ahead&focus=kana|vocab|kanji|grammar`
- `POST /api/review` — simpan satu review FSRS
- `GET /api/exam` — susun paket ujian baru
- `POST /api/exam` — simpan hasil ujian
- `POST /api/activity` — tandai bacaan/dialog selesai (`reading:r01`, `listening:l01`)
- `POST /api/settings` — pace, desiredRetention, examDate

## Menambah / mengubah konten

Edit file di `src/content/`, lalu jalankan `npm run seed`.

Format ringkas:
- `vocab.ts`: `kata|bacaan|arti|kelas-kata` per baris, dikelompokkan per kategori.
- `kanji.ts`: `kanji|on'yomi|kun'yomi|arti|goresan|contoh1、contoh2`.
- `grammar.ts`: `pola|arti|bentuk|penjelasan|contoh1|arti1|contoh2|arti2|cloze|opsi1,opsi2,opsi3,opsi4|jawaban|kategori`.
- `reading.ts` / `listening.ts`: objek TypeScript dengan `questions` (4 opsi + indeks jawaban).

Seed memakai kunci stabil per tipe, jadi mengubah teks akan memperbarui item yang sama dan tidak menduplikasi progres.

## Aturan data
- `review_log` append-only. Jangan UPDATE/DELETE.
- Konten (`items`, `tags`) terpisah dari progres (`card_state`, `review_log`, `lesson_progress`, `exam_attempts`).
- Backup = salin `data/app.db` saat aplikasi berhenti.
- Ubah `src/db/schema.ts`, lalu `npm run db:generate` dan commit folder `drizzle/`.

## Catatan
- Audio memakai suara Jepang yang tersedia di perangkat/browser. Jika belum ada, pasang voice `ja-JP` di sistem operasi.
- Teks bacaan belum memiliki furigana per kata; bantuan kosakata ada di catatan tiap bacaan.
- Skor ujian disederhanakan: lulus jika total ≥60%. JLPT asli juga punya ambang minimum per bagian.
