import * as SQLite from 'expo-sqlite';

// CREATE TABLE SQL
const SCHEMA_STATEMENTS = [
  // message table
  `CREATE TABLE IF NOT EXISTS messages (
    id TEXT PRIMARY KEY,
    msg_type INTEGER NOT NULL,
    created_at INTEGER NOT NULL,
    encrypted_payload TEXT NOT NULL
  );`,

  // private key table
  `CREATE TABLE IF NOT EXISTS private_keys (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    key_type INTEGER NOT NULL,
    key_meta TEXT NOT NULL,
    created_at INTEGER NOT NULL,
    active INTEGER NOT NULL DEFAULT 0
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