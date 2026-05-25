import type { DbMessageRow } from '../types/messageTable';
import type { ChatMessage } from '../types/messageEntity';

const formatTime = (timestampMs: number): string => {
  return new Date(timestampMs).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const mapDbMessageToViewMessage = (row: DbMessageRow): ChatMessage => {
  return {
    id: row.id,
    text: row.encrypted_payload,
    timestamp: formatTime(row.created_at),
    type: row.msg_type === 0 ? 'file' : 'text',
  };
};

export type CreateMessagePayload = {
  id: string;
  text: string;
  createdAt: number;
  type: 'text' | 'file';
};

export const mapCreateMessagePayloadToDbRow = (
  payload: CreateMessagePayload
): DbMessageRow => {
  return {
    id: payload.id,
    msg_type: payload.type === 'file' ? 0 : 1,
    created_at: payload.createdAt,
    encrypted_payload: payload.text,
  };
};
