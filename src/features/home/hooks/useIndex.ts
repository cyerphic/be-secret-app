import { useCallback, useEffect, useRef, useState } from 'react';

export default function useIndex() {
  const [state, setState] = useState({ open: false });
  const onStateChange = ({ open }) => setState({ open });

  return {
    open: state.open,
    onStateChange,
  };
}
