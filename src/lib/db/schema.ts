import * as SQLite from 'expo-sqlite';

// CREATE TABLE SQL
const SCHEMA_STATEMENTS = [
  // 聊天消息表
  `CREATE TABLE IF NOT EXISTS messages (
    id TEXT PRIMARY KEY,
    msg_type INTEGER NOT NULL,
    created_at INTEGER NOT NULL,
    encrypted_payload TEXT NOT NULL
  );`
];

/**
 * INITIAL TABLE
 */
export const executeSchema = async (db: SQLite.SQLiteDatabase): Promise<void> => {
  for (const statement of SCHEMA_STATEMENTS) {
    await db.execAsync(statement);
  }
};