import { createEmptyCard, fsrs, generatorParameters, Rating, State, type Card, type Grade } from 'ts-fsrs';

export { Rating, State };
export type { Grade };

export const DEFAULT_RETENTION = 0.9;

const schedulers = new Map<number, ReturnType<typeof fsrs>>();
function getScheduler(retention: number) {
  const key = Math.round(retention * 1000) / 1000;
  let s = schedulers.get(key);
  if (!s) {
    s = fsrs(generatorParameters({ enable_fuzz: true, request_retention: key }));
    schedulers.set(key, s);
  }
  return s;
}

// Bentuk baris card_state (tanpa userId/itemId)
export type CardFields = {
  state: number;
  due: Date;
  stability: number;
  difficulty: number;
  elapsedDays: number;
  scheduledDays: number;
  learningSteps: number;
  reps: number;
  lapses: number;
  lastReview: Date | null;
};

export function fieldsToCard(f: CardFields): Card {
  return {
    due: f.due,
    stability: f.stability,
    difficulty: f.difficulty,
    elapsed_days: f.elapsedDays,
    scheduled_days: f.scheduledDays,
    learning_steps: f.learningSteps,
    reps: f.reps,
    lapses: f.lapses,
    state: f.state as State,
    last_review: f.lastReview ?? undefined,
  };
}

export function cardToFields(c: Card): CardFields {
  return {
    state: c.state,
    due: c.due,
    stability: c.stability,
    difficulty: c.difficulty,
    elapsedDays: c.elapsed_days,
    scheduledDays: c.scheduled_days,
    learningSteps: c.learning_steps,
    reps: c.reps,
    lapses: c.lapses,
    lastReview: c.last_review ?? null,
  };
}

/** Hitung state kartu berikutnya. `current` null = kartu baru. */
export function scheduleReview(
  current: CardFields | null,
  rating: Grade,
  now: Date = new Date(),
  retention: number = DEFAULT_RETENTION,
) {
  const card = current ? fieldsToCard(current) : createEmptyCard(now);
  const { card: next } = getScheduler(retention).next(card, now, rating);
  return { next: cardToFields(next), stateBefore: card.state as number };
}

/** Probabilitas ingat saat ini (0..1). Tidak bergantung pada desired retention. */
export function retrievability(f: CardFields, now: Date = new Date()): number {
  return getScheduler(DEFAULT_RETENTION).get_retrievability(fieldsToCard(f), now, false);
}
