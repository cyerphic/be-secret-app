import { useCallback, useState } from 'react';
import { insertMessage } from '../queries/homeQueries';
import { mapCreateMessagePayloadToDbRow } from '../mappers/messageMapper';

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
      await insertMessage(
        mapCreateMessagePayloadToDbRow({
          id: `msg-${now}`,
          text: normalized,
          createdAt: now,
        })
      );
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
