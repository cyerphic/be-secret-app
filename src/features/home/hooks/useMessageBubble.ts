import { useCallback } from 'react';
import type { ChatMessage } from '../types/messageEntity';
import { decryptBase, encryptBase } from '../../../lib/cryptCore';
import { deleteMessageById, updateMessagePayload } from '../queries/homeQueries';

const CRYPT_PASSWORD = 'be-secret-text-password';

const toBase64 = (text: string): string => {
  return globalThis.btoa(unescape(encodeURIComponent(text)));
};

const fromBase64 = (value: string): string => {
  return decodeURIComponent(escape(globalThis.atob(value)));
};

export default function useMessageBubble(onChanged?: () => void) {
  const remove = useCallback(
    async (message: ChatMessage): Promise<void> => {
      await deleteMessageById(message.id);
      onChanged?.();
    },
    [onChanged]
  );

  const encryptText = useCallback(
    async (message: ChatMessage): Promise<void> => {
      const plaintextBase64 = toBase64(message.text);
      const encrypted = await encryptBase(plaintextBase64, CRYPT_PASSWORD);
      await updateMessagePayload(message.id, encrypted);
      onChanged?.();
    },
    [onChanged]
  );

  const decryptText = useCallback(
    async (message: ChatMessage): Promise<void> => {
      const decryptedBase64 = await decryptBase(message.text, CRYPT_PASSWORD);
      const plaintext = fromBase64(decryptedBase64);
      await updateMessagePayload(message.id, plaintext);
      onChanged?.();
    },
    [onChanged]
  );

  return {
    remove,
    encryptText,
    decryptText,
  };
}
