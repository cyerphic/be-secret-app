import { useCallback, useState } from 'react';
import { insertMessage } from '../queries/homeQueries';

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
      await insertMessage({
        id: `msg-${now}`,
        msg_type: 1,
        created_at: now,
        encrypted_payload: normalized,
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
