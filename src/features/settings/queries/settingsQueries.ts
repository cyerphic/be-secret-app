import { getDatabaseClient } from '../../../lib/db/sqlite';
import type { DbPrivateKey } from '../types/keyTable';

export const insertKey = async (payload: DbPrivateKey): Promise<void> => {
  const db = getDatabaseClient();

  await db.runAsync(
    'INSERT INTO private_keys (key_type, key_meta, created_at) VALUES (?, ?, ?);',
    [payload.key_type, payload.key_meta, payload.created_at]
  );
};

export const listAutoKeys = async (): Promise<DbPrivateKey[]> => {
  const db = getDatabaseClient();

  const rows = await db.getAllAsync<DbPrivateKey>(
    'SELECT id, key_type, key_meta, created_at, active FROM private_keys WHERE key_type = 1 ORDER BY created_at DESC;'
  );

  return rows;
};

export const listManualKeys = async (): Promise<DbPrivateKey[]> => {
  const db = getDatabaseClient();

  const rows = await db.getAllAsync<DbPrivateKey>(
    'SELECT id, key_type, key_meta, created_at, active FROM private_keys WHERE key_type = 0 ORDER BY created_at DESC;'
  );

  return rows;
};

export const deleteKeyById = async (id: string): Promise<void> => {
  const db = getDatabaseClient();

  await db.runAsync('DELETE FROM private_keys WHERE id = ?;', [id]);
};

export const activeKey = async (id: string): Promise<void> => {
  const db = getDatabaseClient();

  await db.withTransactionAsync(async () => {
    await db.runAsync('UPDATE private_keys SET active = 0;');
    await db.runAsync('UPDATE private_keys SET active = 1 WHERE id = ?;', [id]);
  });
};

