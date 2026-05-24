import { getDatabaseClient } from '../../../lib/db/sqlite';
import type { DbMessageRow } from '../types/db';

export const insertHomeMessage = async (payload: {
  id: string;
  msgType: number;
  createdAt: number;
  encryptedPayload: string;
}): Promise<void> => {
  const db = getDatabaseClient();

  await db.runAsync(
    'INSERT INTO messages (id, msg_type, created_at, encrypted_payload) VALUES (?, ?, ?, ?);',
    [payload.id, payload.msgType, payload.createdAt, payload.encryptedPayload]
  );
};

export const ensureHomeMessageSeed = async (): Promise<void> => {
  const db = getDatabaseClient();

  // simple sqlite test: insert one message only if table empty
  const countResult = await db.getFirstAsync<{ total: number }>(
    'SELECT COUNT(*) as total FROM messages;'
  );

  if ((countResult?.total ?? 0) > 0) {
    return;
  }

  const now = Date.now();
  await db.runAsync(
    'INSERT INTO messages (id, msg_type, created_at, encrypted_payload) VALUES (?, ?, ?, ?);',
    [`seed-${now}`, 0, now, 'SQLite test message: hello from local db.']
  );
};

export const listHomeMessages = async (): Promise<DbMessageRow[]> => {
  const db = getDatabaseClient();

  const rows = await db.getAllAsync<DbMessageRow>(
    'SELECT id, msg_type, created_at, encrypted_payload FROM messages ORDER BY created_at ASC;'
  );

  return rows;
};
