import type { DbMessageRow } from '../types/db';
import type { ChatMessage, MessageRole } from '../types/message';

const DB_MESSAGE_ROLE_MAP: Record<DbMessageRow['msg_type'], MessageRole> = {
  0: 'assistant',
  1: 'me',
};

const MESSAGE_ROLE_DB_MAP: Record<MessageRole, DbMessageRow['msg_type']> = {
  assistant: 0,
  me: 1,
};

const formatTime = (timestampMs: number): string => {
  return new Date(timestampMs).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
};

const normalizeDbMessageType = (msgType: number): MessageRole => {
  return DB_MESSAGE_ROLE_MAP[msgType as keyof typeof DB_MESSAGE_ROLE_MAP] ?? 'assistant';
};

export const mapDbMessageToViewMessage = (row: DbMessageRow): ChatMessage => {
  return {
    id: row.id,
    role: normalizeDbMessageType(row.msg_type),
    text: row.encrypted_payload,
    timestamp: formatTime(row.created_at),
  };
};

export type CreateMessagePayload = {
  id: string;
  role: MessageRole;
  text: string;
  createdAt: number;
};

export const mapCreateMessagePayloadToDbRow = (
  payload: CreateMessagePayload
): DbMessageRow => {
  return {
    id: payload.id,
    msg_type: MESSAGE_ROLE_DB_MAP[payload.role],
    created_at: payload.createdAt,
    encrypted_payload: payload.text,
  };
};
