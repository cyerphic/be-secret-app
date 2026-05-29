export type DbPrivateKey = {
  id: string;
  key_type: number; // 1 = auto generate, 0 = manual input;
  key_meta: string; // meta raw;
  created_at: number;
  active: number; // 1 = yes, 0 = no;
};
