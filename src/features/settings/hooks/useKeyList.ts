import { useEffect, useMemo, useState } from 'react';
import { Keyboard } from 'react-native';
import { initDatabaseInfrastructure } from '../../../lib/db/sqlite';
import { listAutoKeys, listManualKeys } from '../queries/settingsQueries';
import { mapDbPrivateKeyToEntity } from '../mappers/keyMapper';
import type { SetPrivateKey } from '../types/keyEntity';
import { useSnackbar } from '../../../components/SnackBar';

export default function useKeyList(tabType: 'auto' | 'manual', refreshToken: number = 0) {
  const { show } = useSnackbar();
  const [keys, setKeys] = useState<SetPrivateKey[]>([]);
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    setVisibleCount(3);
  }, [tabType]);

  const displayedKeys = useMemo(() => {
    return keys.slice(0, visibleCount);
  }, [keys, visibleCount]);

  const hasMore = useMemo(() => {
    return keys.length > visibleCount;
  }, [keys.length, visibleCount]);

  const handleViewMore = () => {
    setVisibleCount(prev => prev + 3);
  };

  useEffect(() => {
    const boot = async () => {
      try {
        await initDatabaseInfrastructure();

        let rows;
        if (tabType === 'auto') {
          rows = await listAutoKeys();
        } else {
          rows = await listManualKeys();
        }

        const normalized = rows.map(mapDbPrivateKeyToEntity);
        setKeys(normalized);
      } catch (error) {
        show('load keys failed', 'error');
      }
    };

    boot();
  }, [tabType, refreshToken]);

  return {
    displayedKeys,
    hasMore,
    handleViewMore,
  };
}
