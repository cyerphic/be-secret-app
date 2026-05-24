import { useEffect, useMemo, useState } from 'react';
import { initDatabaseInfrastructure } from '../../../lib/db/sqlite';
import { ensureMessageSeed, listMessages } from '../queries/homeQueries';
import { mapDbMessageToViewMessage } from '../mappers/messageMapper';
import type { ChatMessage } from '../types/message';

export default function useMessageList(refreshToken: number = 0) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    const boot = async () => {
      await initDatabaseInfrastructure();
      await ensureMessageSeed();
      const rows = await listMessages();

      const normalized = rows.map(mapDbMessageToViewMessage);

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
