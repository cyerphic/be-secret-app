import { getDatabaseClient } from '../../../lib/db/sqlite';
import type { DbMessageRow } from '../types/messageTable';

export const insertMessage = async (payload: DbMessageRow): Promise<void> => {
  const db = getDatabaseClient();

  await db.runAsync(
    'INSERT INTO messages (id, msg_type, created_at, encrypted_payload) VALUES (?, ?, ?, ?);',
    [payload.id, payload.msg_type, payload.created_at, payload.encrypted_payload]
  );
};

export const listMessages = async (): Promise<DbMessageRow[]> => {
  const db = getDatabaseClient();

  const rows = await db.getAllAsync<DbMessageRow>(
    'SELECT id, msg_type, created_at, encrypted_payload FROM messages ORDER BY created_at ASC;'
  );

  return rows;
};

export const updateMessagePayload = async (id: string, payload: string): Promise<void> => {
  const db = getDatabaseClient();

  await db.runAsync('UPDATE messages SET encrypted_payload = ? WHERE id = ?;', [payload, id]);
};

export const deleteMessageById = async (id: string): Promise<void> => {
  const db = getDatabaseClient();

  await db.runAsync('DELETE FROM messages WHERE id = ?;', [id]);
};

//export const getMessageTypeById = async (id: string): Promise<void> => {
//  const db = getDatabaseClient();

//  await db.runAsync('SELECT msg_type FROM messages WHERE id = ?;', [id]);
//};
