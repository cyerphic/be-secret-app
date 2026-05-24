import { useCallback, useState } from 'react';
import { insertHomeMessage } from '../queries/homeQueries';

export default function useMessageInput() {
  const [inputText, setInputText] = useState('');

  const send = useCallback(async (): Promise<boolean> => {
    const normalized = inputText.trim();
    if (!normalized) {
      return false;
    }

    setInputText('');

    const now = Date.now();
    try {
      await insertHomeMessage({
        id: `msg-${now}`,
        msgType: 1,
        createdAt: now,
        encryptedPayload: normalized,
      });
      return true;
    } catch (error) {
      console.error('[useMessageInput] send fail:', error);
      setInputText(normalized);
      return false;
    }
  }, [inputText]);

  return {
    inputText,
    setInputText,
    send,
  };
}
