import { useCallback } from 'react';
import { Alert } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import type { SetPrivateKey } from '../types/keyEntity';
import { deleteKeyById, activeKey } from '../queries/settingsQueries';
import { useSnackbar } from '../../../components/SnackBar';
//import { obfuscateFilePath, restoreFilePath } from '../utils';

export default function useKeyRow(onChanged?: () => void) {
  const { show } = useSnackbar();

  const copyKey = useCallback(async (item: SetPrivateKey): Promise<void> => {
    try {
      Clipboard.setString(item.keyMeta);
      //show('copy key success', 'success');
    } catch (error) {
      show('copy key failed', 'error');
    }
  });

  const removeKey = useCallback(
    async (key: SetPrivateKey): Promise<void> => {
      try {
        await deleteKeyById(key.id);
        onChanged?.();
        show('delete key success', 'success');
      } catch (error) {
        show('delete key failed', 'error');
      }
    },
    [onChanged]
  );

  const switchKey = useCallback(
    async (key: SetPrivateKey): Promise<void> => {
      try {
        await activeKey(key.id);
        onChanged?.();
        show('switch key success', 'success');
      } catch (error) {
        show('switch key failed', 'error');
      }
    },
    [onChanged]
  );

  const openActions = useCallback((key: SetPrivateKey) => {
    Alert.alert(
      '密钥操作',
      '',
      [
        {
          text: '删除',
          style: 'destructive',
          onPress: () => removeKey(key),
        },
        {
          text: '取消',
          style: 'cancel',
        },
        {
          text: '使用',
          style: 'destructive',
          onPress: () => switchKey(key),
        },
      ],
      { cancelable: true }
    );
  }, [removeKey]);

  return {
    copyKey,
    openActions,
  };
}
