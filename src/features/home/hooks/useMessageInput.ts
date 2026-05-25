import { useCallback, useState } from 'react';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system/legacy';
import { insertMessage } from '../queries/homeQueries';
import { mapCreateMessagePayloadToDbRow } from '../mappers/messageMapper';
import { useSnackbar } from '../../../components/SnackBar';

export default function useMessageInput() {
  const [inputText, setInputText] = useState('');
  const { show } = useSnackbar();

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
      show('insertMessage', 'error');
      setInputText(normalized);
      return false;
    }
  }, [inputText]);

  //const attachFile 注意 使用 Encrypt.tsx 里的 路径写法 和 引用 库 ，因为 这是验证 过得
  //我们 现在的功能 是 把 保存 可以直接传给 encryptFile 进行加密解密的路径 
  //如果是 文件类型 也就是不是 text ，MessageBubble.tsx footer 应该是 share icon 不是 copy
  //useMessageBubble 新增 encryptFile, decryptFile

  const encryptFilePath = useCallback(async (): Promise<void> => {
    try {
      const res = await DocumentPicker.getDocumentAsync({});
      if (res.canceled || !res.assets || res.assets.length === 0) return;

      const sourceUri = res.assets[0].uri;
      const rustPath = sourceUri.replace('file://', '');

      setInputText(rustPath);
    } catch (error) {
      show('encryptFilePath', 'error');
    }
  });

  return {
    inputText,
    setInputText,
    send,
    encryptFilePath,
  };
}
