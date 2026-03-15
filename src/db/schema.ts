import {
  pgEnum,
  pgTable,
  real,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';

export const languageEnum = pgEnum('language', [
  'javascript',
  'typescript',
  'python',
  'rust',
  'go',
  'java',
  'cpp',
  'c',
  'ruby',
  'php',
  'sql',
  'html',
  'css',
  'json',
  'yaml',
  'bash',
  'shell',
  'unknown',
]);

export const roastModeEnum = pgEnum('roast_mode', ['honest', 'roast']);

export const submissions = pgTable('submissions', {
  id: uuid('id').primaryKey().defaultRandom(),
  code: text('code').notNull(),
  language: languageEnum('language').notNull().default('unknown'),
  roastMode: roastModeEnum('roast_mode').notNull().default('roast'),
  score: real('score').notNull(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
});

export const analyses = pgTable('analyses', {
  id: uuid('id').primaryKey().defaultRandom(),
  submissionId: uuid('submissionId')
    .notNull()
    .references(() => submissions.id, { onDelete: 'cascade' }),
  content: text('content').notNull(),
  roastMode: roastModeEnum('roast_mode').notNull(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
});
