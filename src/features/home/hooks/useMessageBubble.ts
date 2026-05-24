import { useMemo } from 'react';

export default function useMessageBubble() {
  const isMine = useMemo(() => true, []);

  return {
    isMine,
  };
}
