import { useMemo } from 'react';
import type { ChatMessage } from './useMessageList';

export default function useMessageBubble(message: ChatMessage) {
  const isMine = useMemo(() => message.role === 'me', [message.role]);

  return {
    isMine,
  };
}
