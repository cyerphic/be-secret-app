import type { DbPrivateKey } from '../types/keyTable';
import type { SetPrivateKey } from '../types/keyEntity';

const formatTime = (timestampMs: number): string => {
  return new Date(timestampMs).toLocaleString();
};

export const mapDbPrivateKeyToEntity = (
  row: DbPrivateKey
): SetPrivateKey => {
  return {
    id: row.id,
    keyType: row.key_type,
    keyMeta: row.key_meta,
    createdAt: formatTime(row.created_at),
    selected: row.active,
  };
};

export type CreatePrivateKeyPayload = {
  id: string;
  keyType: number;
  keyMeta: string;
  createdAt: number;
  selected: number;
};

export const mapCreatePrivateKeyPayloadToDbRow = (
  payload: CreatePrivateKeyPayload
): DbPrivateKey => {
  return {
    id: payload.id,
    key_type: payload.keyType,
    key_meta: payload.keyMeta,
    created_at: payload.createdAt,
    active: payload.selected,
  };
};