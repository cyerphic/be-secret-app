import { useCallback } from 'react';
import Clipboard from '@react-native-clipboard/clipboard';
import type { ChatMessage } from '../types/messageEntity';
import { decryptBase, encryptBase, encryptFile, decryptFile } from '../../../lib/cryptCore';
import { deleteMessageById, updateMessagePayload, getActivePrivateKey } from '../queries/homeQueries';
import { useSnackbar } from '../../../components/SnackBar';
import { obfuscateFilePath, restoreFilePath } from '../utils';

const CRYPT_PASSWORD = '1f8bbb1660e15f436548c850187205119dff964830b22d18ae362b3f95e';

const toBase64 = (text: string): string => {
  return globalThis.btoa(unescape(encodeURIComponent(text)));
};

const fromBase64 = (value: string): string => {
  return decodeURIComponent(escape(globalThis.atob(value)));
};

export const getCurrentPrivateKey = async (): Promise<string> => {
  try {
    const activeKey = await getActivePrivateKey();
    return activeKey || CRYPT_PASSWORD;
  } catch (error) {
    return CRYPT_PASSWORD;
  }
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
        const currentPassword = await getCurrentPrivateKey();

        if (message.type === 'text') {
          const plaintextBase64 = toBase64(message.text);
          const encrypted = await encryptBase(plaintextBase64, currentPassword);
          await updateMessagePayload(message.id, encrypted);
        } else if (message.type === 'file') {
          //
          const rustInPath = message.text;
          const rustOutPath = obfuscateFilePath(rustInPath);
          await encryptFile(rustInPath, rustOutPath, currentPassword);
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
        const currentPassword = await getCurrentPrivateKey();
        
        if (message.type === 'text') {
          const decryptedBase64 = await decryptBase(message.text, currentPassword);
          const plaintext = fromBase64(decryptedBase64);
          await updateMessagePayload(message.id, plaintext);
        } else if (message.type === 'file') {
          //
          const rustInPath = message.text;
          const rustOutPath = restoreFilePath(rustInPath);
          await decryptFile(rustInPath, rustOutPath, currentPassword);
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
