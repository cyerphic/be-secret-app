import React from 'react';
import { Platform, useColorScheme } from 'react-native';
import { MD3DarkTheme, MD3LightTheme, Provider as PaperProvider } from 'react-native-paper';
import { appPalette, webPalette } from './colors';

export type ThemeMode = 'light' | 'dark' | 'system';

type ThemeContextValue = {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
};

const ThemeContext = React.createContext<ThemeContextValue | undefined>(undefined);

function getPalette(mode: Exclude<ThemeMode, 'system'>) {
  return Platform.OS === 'web' ? webPalette[mode] : appPalette[mode];
}

function makeTheme(mode: Exclude<ThemeMode, 'system'>) {
  const baseTheme = mode === 'dark' ? MD3DarkTheme : MD3LightTheme;

  return {
    ...baseTheme,
    colors: {
      ...baseTheme.colors,
      ...getPalette(mode),
    },
  };
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemScheme = useColorScheme();
  const [mode, setMode] = React.useState<ThemeMode>('system');
  const resolvedMode = mode === 'system' ? (systemScheme === 'dark' ? 'dark' : 'light') : mode;
  const theme = React.useMemo(() => makeTheme(resolvedMode), [resolvedMode]);

  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      <PaperProvider theme={theme}>{children}</PaperProvider>
    </ThemeContext.Provider>
  );
}

export function useThemeMode() {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeMode must be used within ThemeProvider');
  }
  return context;
}
