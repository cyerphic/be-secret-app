// components/SnackBar.tsx
import React, { createContext, useContext, useState, useCallback } from 'react';
import { useTheme, Portal, Snackbar } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface SnackbarContextType {
  show: (message: string, type?: 'success' | 'error') => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

export const SnackBarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState<'success' | 'error'>('success');
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();

  const show = useCallback((msg: string, t: 'success' | 'error' = 'success') => {
    setMessage(msg);
    setType(t);
    setVisible(true);
  }, []);

  return (
    <SnackbarContext.Provider value={{ show }}>
      {children}

      {visible && (
        <Portal>
          <Snackbar
            visible={visible}
            onDismiss={() => setVisible(false)}
            duration={2000}
            wrapperStyle={{ bottom: insets.bottom + 10 }}
            style={{
              backgroundColor: type === 'success' ? colors.onSuccessContainer : colors.onErrorContainer,
              borderRadius: 8,
            }}
            action={{
              label: '确定',
              onPress: () => setVisible(false),
            }}
          >
            {message}
          </Snackbar>
        </Portal>
      )}   
    </SnackbarContext.Provider>
  );
};

// 导出 Hook 供业务调用
export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbar must be used within a SnackBarProvider');
  }
  return context;
};