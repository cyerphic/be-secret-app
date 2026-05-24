import { useCallback } from 'react';
import Clipboard from '@react-native-clipboard/clipboard';
import type { ChatMessage } from '../types/messageEntity';
import { decryptBase, encryptBase } from '../../../lib/cryptCore';
import { deleteMessageById, updateMessagePayload } from '../queries/homeQueries';
import { useSnackbar } from '../../../components/SnackBar';

const CRYPT_PASSWORD = 'be-secret-text-password';

const toBase64 = (text: string): string => {
  return globalThis.btoa(unescape(encodeURIComponent(text)));
};

const fromBase64 = (value: string): string => {
  return decodeURIComponent(escape(globalThis.atob(value)));
};

export default function useMessageBubble(onChanged?: () => void) {
  const { show } = useSnackbar();

  const copyText = useCallback(async (text: string): Promise<boolean> => {
    Clipboard.setString(text);
    return true;
  }, []);

  const remove = useCallback(
    async (message: ChatMessage): Promise<void> => {
      await deleteMessageById(message.id);
      onChanged?.();
    },
    [onChanged]
  );

  const encryptText = useCallback(
    async (message: ChatMessage): Promise<void> => {
      try {
        const plaintextBase64 = toBase64(message.text);
        const encrypted = await encryptBase(plaintextBase64, CRYPT_PASSWORD);
        await updateMessagePayload(message.id, encrypted);
        onChanged?.();
      } catch (error) { 
        show('encrypt error', 'error');
      }
    },
    [onChanged]
  );

  const decryptText = useCallback(
    async (message: ChatMessage): Promise<void> => {
      try {
        const decryptedBase64 = await decryptBase(message.text, CRYPT_PASSWORD);
        const plaintext = fromBase64(decryptedBase64);
        await updateMessagePayload(message.id, plaintext);
        onChanged?.();
      } catch (error) {
        show('decrypt error', 'error');
      }
    },
    [onChanged]
  );

  return {
    copyText,
    remove,
    encryptText,
    decryptText,
  };
}
