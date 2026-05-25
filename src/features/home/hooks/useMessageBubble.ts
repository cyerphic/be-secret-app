import { useCallback } from 'react';
import Clipboard from '@react-native-clipboard/clipboard';
import type { ChatMessage } from '../types/messageEntity';
import { decryptBase, encryptBase, encryptFile, decryptFile } from '../../../lib/cryptCore';
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

  const encryptMessage = useCallback(
    async (message: ChatMessage): Promise<void> => {
      try {
        if (message.type === 'text') {
          const plaintextBase64 = toBase64(message.text);
          const encrypted = await encryptBase(plaintextBase64, CRYPT_PASSWORD);
          await updateMessagePayload(message.id, encrypted);
        } else if (message.type === 'file') {
          //
          const rustInPath = message.text;
          const rustOutPath = `${rustInPath}.enc`;
          await encryptFile(rustInPath, rustOutPath, CRYPT_PASSWORD);
          await updateMessagePayload(message.id, rustOutPath);
          // FileSystem.deleteAsync('file://' + rustInPath).catch(()=>{});
        }
        onChanged?.();
      } catch (error) { 
        show('encrypt error', 'error');
      }
    },
    [onChanged]
  );

  const decryptMessage = useCallback(
    async (message: ChatMessage): Promise<void> => {
      try {
        if (message.type === 'text') {
          const decryptedBase64 = await decryptBase(message.text, CRYPT_PASSWORD);
          const plaintext = fromBase64(decryptedBase64);
          await updateMessagePayload(message.id, plaintext);
        } else if (message.type === 'file') {
          //
          const rustInPath = message.text;
          const rustOutPath = rustInPath.endsWith('.enc')
            ? rustInPath.replace(/\.enc$/, '')
            : `${rustInPath}`;
          await decryptFile(rustInPath, rustOutPath, CRYPT_PASSWORD);
          await updateMessagePayload(message.id, rustOutPath);
        }
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
    encryptMessage,
    decryptMessage,
  };
}
