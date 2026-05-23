import * as SQLite from 'expo-sqlite';
import { executeSchema } from './schema';

const DB_NAME = 'be_secret.db';
let dbInstance: SQLite.SQLiteDatabase | null = null;

/**
 * 获取底层数据库连接的单例 (基础连接 Infra)
 */
export const getDatabaseClient = (): SQLite.SQLiteDatabase => {
  if (!dbInstance) {
    dbInstance = SQLite.openDatabaseSync(DB_NAME);
    
    // 开启高性能 WAL 模式及外键约束
    dbInstance.execSync('PRAGMA journal_mode = WAL; PRAGMA foreign_keys = ON;');
  }
  return dbInstance;
};

/**
 * 数据库初始化入口，负责在启动时联动 Modules 层建表
 */
export const initDatabaseInfrastructure = async (): Promise<void> => {
  const db = getDatabaseClient();
  try {
    // Call Modules 层执行建表逻辑
    await executeSchema(db);
    console.log('[DB Infra] INITIAL SUCCESS');
  } catch (error) {
    console.error('[DB Infra] INITIAL FAIL:', error);
    throw error;
  }
};