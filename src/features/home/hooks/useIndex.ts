import { useCallback, useEffect, useRef, useState } from 'react';
import { encryptBase, decryptBase, encryptFile, decryptFile } from '../../../lib/cryptCore';

export default function useIndex() {
  //const [state, setState] = useState({ open: false });

  return {
    //open: state.open,
  };
}
