import { useEffect, useMemo, useState } from 'react';
import { Keyboard } from 'react-native';
import { initDatabaseInfrastructure } from '../../../lib/db/sqlite';
import { listMessages } from '../queries/homeQueries';
import { mapDbMessageToViewMessage } from '../mappers/messageMapper';
import type { ChatMessage } from '../types/messageEntity';

export default function useMessageList(refreshToken: number = 0) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const boot = async () => {
      await initDatabaseInfrastructure();
      const rows = await listMessages();

      const normalized = rows.map(mapDbMessageToViewMessage);

      setMessages(normalized);
    };

    boot().catch((error) => {
      console.error('[useMessageList] load messages fail:', error);
    });
  }, [refreshToken]);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const stableMessages = useMemo(() => messages, [messages]);

  return {
    messages: stableMessages,
    isKeyboardVisible,
  };
}
