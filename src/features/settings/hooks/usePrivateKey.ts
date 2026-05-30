import { useEffect, useState, useCallback } from 'react';
import { initDatabaseInfrastructure } from '../../../lib/db/sqlite';
import { useSnackbar } from '../../../components/SnackBar';
import { insertKey } from '../queries/settingsQueries';
import { mapCreatePrivateKeyPayloadToDbRow } from '../mappers/keyMapper';
import type { SetPrivateKey } from '../types/keyEntity';
import { generateRandomNumber } from '../utils';

export default function usePrivateKey() {
  const { show } = useSnackbar();
  const [key, setKey] = useState<string>('');
  const keyLength = `${key?.length || 0}`;
  const [refreshKeyList, setrefreshKeyList] = useState(0);
  const [activeTab, setActiveTab] = useState<'auto' | 'manual'>('auto');
  const [keyInputVisible, setKeyInputVisible] = useState<boolean>(false);

  const refreshKey = useCallback(() => {
    const newKey = generateRandomNumber();
    setKey(String(newKey));
  }, []);

  const handleAutoSaveKey = useCallback(async (): Promise<void> => {
    if (!key) {
      return;
    }

    const now = Date.now();
    try {
      const payload = mapCreatePrivateKeyPayloadToDbRow({
        keyType: 1, // 1 = auto generate, 0 = manual input;
        keyMeta: key,
        createdAt: now,
      })
      await insertKey(payload);
      // refresh key list
      setrefreshKeyList(prev => prev + 1);
      show('add success', 'success');
    } catch (error) {
      show('insertKey error', 'error');
    }
  }, [key]);

  const handleManualSaveKey = useCallback(async (key: string): Promise<void> => {
    if (!key) {
      return;
    }

    const now = Date.now();
    try {
      const payload = mapCreatePrivateKeyPayloadToDbRow({
        keyType: 0, // 1 = auto generate, 0 = manual input;
        keyMeta: key,
        createdAt: now,
      })
      await insertKey(payload);
      // refresh key list
      setrefreshKeyList(prev => prev + 1);
      show('add success', 'success');
    } catch (error) {
      show('insertKey error', 'error');
    }
  }, []);

  const triggerListRefresh = useCallback(() => {
    setrefreshKeyList(prev => prev + 1);
  }, []);

  return {
    key,
    keyLength,
    refreshKey,
    handleAutoSaveKey,
    handleManualSaveKey,
    refreshKeyList,
    triggerListRefresh,
    activeTab,
    setActiveTab,
    keyInputVisible,
    setKeyInputVisible,
  };
}