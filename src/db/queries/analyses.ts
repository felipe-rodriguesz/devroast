import { db } from '../index';
import { analyses } from '../schema';

export async function insertAnalysis(data: {
  submissionId: string;
  content: string;
  roastMode: string;
}) {
  const result = await db
    .insert(analyses)
    .values({
      submissionId: data.submissionId,
      content: data.content,
      roastMode: data.roastMode as 'honest' | 'roast',
    })
    .returning({ id: analyses.id });

  return result[0]?.id;
}
