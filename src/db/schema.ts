import { sqliteTable, text, integer, real, primaryKey, index, uniqueIndex } from 'drizzle-orm/sqlite-core';

// ---------- Konten (boleh di-reseed, tidak menyimpan progres) ----------

export const items = sqliteTable(
  'items',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    type: text('type', { enum: ['kana', 'vocab', 'kanji', 'grammar', 'reading', 'listening'] }).notNull(),
    level: text('level', { enum: ['N5', 'N4'] }).notNull(),
    // kunci stabil per tipe (mis. karakter kana, id JMdict) supaya reseed idempoten
    key: text('key').notNull(),
    data: text('data', { mode: 'json' }).$type<Record<string, unknown>>().notNull(),
    source: text('source'),
    // urutan pengenalan item baru
    sortOrder: integer('sort_order').notNull().default(0),
  },
  (t) => [uniqueIndex('items_type_key_uq').on(t.type, t.key)],
);

export const tags = sqliteTable('tags', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull().unique(),
  category: text('category').notNull(), // mis. script, kana-group, grammar-topic
});

export const itemTags = sqliteTable(
  'item_tags',
  {
    itemId: integer('item_id').notNull().references(() => items.id, { onDelete: 'cascade' }),
    tagId: integer('tag_id').notNull().references(() => tags.id, { onDelete: 'cascade' }),
  },
  (t) => [primaryKey({ columns: [t.itemId, t.tagId] })],
);

// ---------- Progres pengguna (jangan ikut terhapus saat reseed konten) ----------

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
});

export const settings = sqliteTable('settings', {
  userId: integer('user_id').primaryKey().references(() => users.id),
  // DEPRECATED: batas harian lama, tidak dipakai lagi (dipertahankan agar migrasi tidak destruktif)
  dailyNewCards: integer('daily_new_cards').notNull().default(10),
  sessionCapacity: integer('session_capacity').notNull().default(40),
  examDate: text('exam_date'),
  // seberapa agresif kartu baru dimasukkan (lihat src/lib/pacing.ts)
  pace: text('pace', { enum: ['santai', 'normal', 'ngebut'] }).notNull().default('normal'),
  // target probabilitas ingat saat review (FSRS desired retention)
  desiredRetention: real('desired_retention').notNull().default(0.9),
});

// Status FSRS per (user, item). Baris baru dibuat saat review pertama.
export const cardState = sqliteTable(
  'card_state',
  {
    userId: integer('user_id').notNull().references(() => users.id),
    itemId: integer('item_id').notNull().references(() => items.id),
    state: integer('state').notNull(), // 0 New, 1 Learning, 2 Review, 3 Relearning
    due: integer('due', { mode: 'timestamp_ms' }).notNull(),
    stability: real('stability').notNull(),
    difficulty: real('difficulty').notNull(),
    elapsedDays: integer('elapsed_days').notNull().default(0),
    scheduledDays: integer('scheduled_days').notNull().default(0),
    learningSteps: integer('learning_steps').notNull().default(0),
    reps: integer('reps').notNull().default(0),
    lapses: integer('lapses').notNull().default(0),
    lastReview: integer('last_review', { mode: 'timestamp_ms' }),
  },
  (t) => [
    primaryKey({ columns: [t.userId, t.itemId] }),
    index('card_state_user_due_idx').on(t.userId, t.due),
  ],
);

// Append-only: jangan pernah UPDATE/DELETE baris di sini.
export const reviewLog = sqliteTable(
  'review_log',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    userId: integer('user_id').notNull().references(() => users.id),
    itemId: integer('item_id').notNull().references(() => items.id),
    reviewedAt: integer('reviewed_at', { mode: 'timestamp_ms' }).notNull(),
    rating: integer('rating').notNull(), // 1 Again, 2 Hard, 3 Good, 4 Easy
    correct: integer('correct', { mode: 'boolean' }).notNull(),
    durationMs: integer('duration_ms'),
    exerciseType: text('exercise_type').notNull(), // mis. recognize, type-answer, cloze
    stateBefore: integer('state_before').notNull(),
    stabilityAfter: real('stability_after').notNull(),
  },
  (t) => [index('review_log_user_time_idx').on(t.userId, t.reviewedAt)],
);

export const lessonProgress = sqliteTable(
  'lesson_progress',
  {
    userId: integer('user_id').notNull().references(() => users.id),
    lessonKey: text('lesson_key').notNull(),
    status: text('status', { enum: ['locked', 'unlocked', 'completed'] }).notNull().default('locked'),
    retention: real('retention'),
    unlockedAt: integer('unlocked_at', { mode: 'timestamp_ms' }),
  },
  (t) => [primaryKey({ columns: [t.userId, t.lessonKey] })],
);

// ---------- Simulasi ujian ----------

export type ExamSectionScore = { key: string; label: string; correct: number; total: number };

export const examAttempts = sqliteTable(
  'exam_attempts',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    userId: integer('user_id').notNull().references(() => users.id),
    takenAt: integer('taken_at', { mode: 'timestamp_ms' }).notNull(),
    durationSec: integer('duration_sec').notNull(),
    totalCorrect: integer('total_correct').notNull(),
    totalQuestions: integer('total_questions').notNull(),
    passed: integer('passed', { mode: 'boolean' }).notNull(),
    sections: text('sections', { mode: 'json' }).$type<ExamSectionScore[]>().notNull(),
  },
  (t) => [index('exam_attempts_user_time_idx').on(t.userId, t.takenAt)],
);
