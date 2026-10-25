CREATE TABLE `exam_attempts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`taken_at` integer NOT NULL,
	`duration_sec` integer NOT NULL,
	`total_correct` integer NOT NULL,
	`total_questions` integer NOT NULL,
	`passed` integer NOT NULL,
	`sections` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `exam_attempts_user_time_idx` ON `exam_attempts` (`user_id`,`taken_at`);