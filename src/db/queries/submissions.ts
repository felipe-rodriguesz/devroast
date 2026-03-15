import { sql } from 'drizzle-orm';
import { db } from '../index';
import { submissions } from '../schema';

export async function insertSubmission(data: {
  code: string;
  language: string;
  roastMode: string;
  score: number;
}) {
  const result = await db
    .insert(submissions)
    .values({
      code: data.code,
      language: data.language as
        | 'javascript'
        | 'typescript'
        | 'python'
        | 'rust'
        | 'go'
        | 'java'
        | 'cpp'
        | 'c'
        | 'ruby'
        | 'php'
        | 'sql'
        | 'html'
        | 'css'
        | 'json'
        | 'yaml'
        | 'bash'
        | 'shell'
        | 'unknown',
      roastMode: data.roastMode as 'honest' | 'roast',
      score: data.score,
    })
    .returning({ id: submissions.id });

  return result[0]?.id;
}

export async function getLeaderboard(limit = 10) {
  const result = await sql`
    SELECT 
      s.id,
      s.code,
      s.language,
      s.score,
      s.created_at,
      a.content as analysis_content
    FROM submissions s
    LEFT JOIN LATERAL (
      SELECT content 
      FROM analyses 
      WHERE submission_id = s.id 
      ORDER BY created_at DESC 
      LIMIT 1
    ) a ON true
    ORDER BY s.score ASC, s.created_at DESC
    LIMIT ${limit}
  `;

  return result;
}

export async function getRecentSubmissions(limit = 20) {
  const result = await sql`
    SELECT 
      s.id,
      s.code,
      s.language,
      s.score,
      s.created_at,
      a.content as analysis_content
    FROM submissions s
    LEFT JOIN LATERAL (
      SELECT content 
      FROM analyses 
      WHERE submission_id = s.id 
      ORDER BY created_at DESC 
      LIMIT 1
    ) a ON true
    ORDER BY s.created_at DESC
    LIMIT ${limit}
  `;

  return result;
}

export async function getStats() {
  const result = await sql`
    SELECT 
      COUNT(*)::int as count,
      COALESCE(AVG(score), 0)::numeric(10,2) as "avgScore"
    FROM submissions
  `;

  return result[0];
}
