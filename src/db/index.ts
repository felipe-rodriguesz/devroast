import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

const connectionString = process.env.DATABASE_URL ?? '';

const client = postgres(connectionString);

export const db = drizzle(client, { schema });

export type Database = typeof db;
export type Submission = typeof schema.submissions.$inferSelect;
export type NewSubmission = typeof schema.submissions.$inferInsert;
export type Analysis = typeof schema.analyses.$inferSelect;
export type NewAnalysis = typeof schema.analyses.$inferInsert;
