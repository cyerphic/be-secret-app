export type DbMessageRow = {
  id: string;
  msg_type: number; // 1 = text, 0 = file
  created_at: number;
  encrypted_payload: string;
};