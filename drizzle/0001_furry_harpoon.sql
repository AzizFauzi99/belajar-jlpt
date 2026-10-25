ALTER TABLE `settings` ADD `pace` text DEFAULT 'normal' NOT NULL;--> statement-breakpoint
ALTER TABLE `settings` ADD `desired_retention` real DEFAULT 0.9 NOT NULL;