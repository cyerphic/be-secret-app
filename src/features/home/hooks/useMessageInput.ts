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
    const message = inputText.trim();
    if (!message) {
      return false;
    }

    const currentType = messageType;

    setInputText('');
    setMessageType('text');

    const now = Date.now();
    try {
      await insertMessage(
        mapCreateMessagePayloadToDbRow({
          id: `msg-${now}`,
          text: message,
          createdAt: now,
          type: currentType,
        })
      );
      return true;
    } catch (error) {
      show('insertMessage', 'error');
      setInputText(message);
      setMessageType(currentType);
      return false;
    }
  }, [inputText, messageType]);

  const getFilePath = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({
        copyToCacheDirectory: false,
      });
      
      if (res.canceled || !res.assets || res.assets.length === 0) return;

      const asset = res.assets[0];
      const cachedUri = asset.uri;
      const originalName = asset.name;

      const correctedUri = `${FileSystem.cacheDirectory}${originalName}`;

      await FileSystem.copyAsync({
        from: cachedUri,
        to: correctedUri,
      });

      const filePath = correctedUri.replace('file://', '');

      setInputText(filePath);
      setMessageType('file');
    } catch (error) {
      show('getFilePath', 'error');
    }
  };

  return {
    inputText,
    setInputText,
    send,
    getFilePath,
  };
}
