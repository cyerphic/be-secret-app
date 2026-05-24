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
  };
};

export type CreateMessagePayload = {
  id: string;
  text: string;
  createdAt: number;
};

export const mapCreateMessagePayloadToDbRow = (
  payload: CreateMessagePayload
): DbMessageRow => {
  return {
    id: payload.id,
    msg_type: 1,
    created_at: payload.createdAt,
    encrypted_payload: payload.text,
  };
};
