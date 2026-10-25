import { createDb, type Db } from '@/db/client';
import { settings, users } from '@/db/schema';
import { eq } from 'drizzle-orm';

// Singleton supaya hot-reload dev tidak membuka banyak koneksi.
const g = globalThis as unknown as { __db?: Db };

export function getDb(): Db {
  if (!g.__db) g.__db = createDb().db;
  return g.__db;
}

/** Aplikasi single-user: pakai user pertama, buat jika belum ada. */
export function getUser(db: Db) {
  let user = db.select().from(users).get();
  if (!user) {
    user = db.insert(users).values({ name: 'Ve' }).returning().get();
    db.insert(settings).values({ userId: user.id }).run();
  }
  const cfg =
    db.select().from(settings).where(eq(settings.userId, user.id)).get() ??
    { userId: user.id, dailyNewCards: 10, sessionCapacity: 40, examDate: null, pace: 'normal' as const, desiredRetention: 0.9 };
  return { user, settings: cfg };
}
