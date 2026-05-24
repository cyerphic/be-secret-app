import { useEffect, useMemo, useState } from 'react';
import { initDatabaseInfrastructure } from '../../../lib/db/sqlite';
import { ensureMessageSeed, listMessages } from '../queries/homeQueries';

export type MessageRole = 'me' | 'assistant';

export type ChatMessage = {
  id: string;
  role: MessageRole;
  text: string;
  timestamp: string;
};

const formatTime = (timestampMs: number): string => {
  return new Date(timestampMs).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
};

export default function useMessageList(refreshToken: number = 0) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    const boot = async () => {
      await initDatabaseInfrastructure();
      await ensureMessageSeed();
      const rows = await listMessages();

      const normalized = rows.map((row) => ({
        id: row.id,
        role: row.msg_type === 0 ? 'assistant' : 'me',
        text: row.encrypted_payload,
        timestamp: formatTime(row.created_at),
      } satisfies ChatMessage));

      setMessages(normalized);
    };

    boot().catch((error) => {
      console.error('[useMessageList] load messages fail:', error);
    });
  }, [refreshToken]);

  const stableMessages = useMemo(() => messages, [messages]);

  return {
    messages: stableMessages,
  };
}
