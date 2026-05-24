export type DbMessageRow = {
  id: string;
  msg_type: number;
  created_at: number;
  encrypted_payload: string;
};