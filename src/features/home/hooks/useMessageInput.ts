import { useCallback, useState } from 'react';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system/legacy';
import { insertMessage } from '../queries/homeQueries';
import { mapCreateMessagePayloadToDbRow } from '../mappers/messageMapper';
import { useSnackbar } from '../../../components/SnackBar';

export default function useMessageInput() {
  const [inputText, setInputText] = useState('');
  const [messageType, setMessageType] = useState<'text' | 'file'>('text');
  const { show } = useSnackbar();

  const send = useCallback(async (): Promise<boolean> => {
    const normalized = inputText.trim();
    if (!normalized) {
      return false;
    }

    const currentType = messageType;

    setInputText('');

    const now = Date.now();
    try {
      await insertMessage(
        mapCreateMessagePayloadToDbRow({
          id: `msg-${now}`,
          text: normalized,
          createdAt: now,
          type: currentType,
        })
      );
      return true;
    } catch (error) {
      show('insertMessage', 'error');
      setInputText(normalized);
      return false;
    }
  }, [inputText]);

  const encryptFilePath = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({});
      if (res.canceled || !res.assets || res.assets.length === 0) return;

      const sourceUri = res.assets[0].uri;
      const rustPath = sourceUri.replace('file://', '');

      setInputText(rustPath);
      setMessageType('file');
    } catch (error) {
      show('encryptFilePath', 'error');
    }
  };

  return {
    inputText,
    setInputText,
    send,
    encryptFilePath,
    messageType,
  };
}
