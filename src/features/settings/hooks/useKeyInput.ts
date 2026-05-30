import { useState, useCallback } from 'react';
import { decryptBase, encryptBase } from '../../../lib/cryptCore';
import Clipboard from '@react-native-clipboard/clipboard';
import { useSnackbar } from '../../../components/SnackBar';

const DEFAULT_CRYPT_PASSWORD = '1f8bbb1660e15f436548c850187205119dff964830b22d18ae362b3f95e';

const toBase64 = (text: string): string => {
  return globalThis.btoa(unescape(encodeURIComponent(text)));
};

const fromBase64 = (value: string): string => {
  return decodeURIComponent(escape(globalThis.atob(value)));
};

interface UseKeyInputProps {
	onSave?: (val: string) => Promise<void>;
}

export default function useKeyInput({ onSave }: UseKeyInputProps = {}) {
	const [inputValue, setInputValue] = useState('');
	const [encrypt, setEncrypt] = useState(false);	
  const { show } = useSnackbar();
  const [processing, setProcessing] = useState(false);

  const isInputEmpty = inputValue.trim().length === 0;

  const handleSave = useCallback(async () => {
    if (isInputEmpty) return;
    
    if (onSave) {
    	try {
    		await onSave(inputValue);
    		setInputValue('');
    	} catch (error) {
    		show('save failed', 'error');
    	}
    }
  }, [inputValue]);

  const handlePaste = useCallback(async () => {
	  try {
	    const text = await Clipboard.getString();
	    if (text) {
	      setInputValue(text);
	    }
	  } catch (error) {
	  	show('handle Paste error', 'error');
	  }
	});

	const handleClear = useCallback(() => {
	  if (isInputEmpty) return;

	  setInputValue('');
	});

	const onEncryptChange = async (value: boolean) => {
	  if (processing) return;

	  setEncrypt(value);

	  if (!inputValue.trim()) return;

	  setProcessing(true);

	  try {
	    if (value) {
	      const encrypted = await encryptBase(
	        toBase64(inputValue),
	        DEFAULT_CRYPT_PASSWORD
	      );

	      setInputValue(encrypted);
	    } else {
	      const decrypted = await decryptBase(
	        inputValue,
	        DEFAULT_CRYPT_PASSWORD
	      );

	      setInputValue(fromBase64(decrypted));
	    }
	  } catch {
	    show(value ? 'encrypt error' : 'decrypt error', 'error');
	  } finally {
	    setProcessing(false);
	  }
	};

  return {
  	inputValue,
  	setInputValue,
  	encrypt,
  	setEncrypt,
  	handleSave,
  	handlePaste,
  	handleClear,
  	isInputEmpty,
  	onEncryptChange,
  	processing,
  };
}
