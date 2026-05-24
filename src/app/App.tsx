import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { KeyboardProvider } from 'react-native-keyboard-controller';

import MainNavigator from './navigation/MainNavigator';
import { ThemeProvider } from './providers/ThemeProvider';
import { QueryProvider } from './providers/QueryProvider';

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <QueryProvider>
          <KeyboardProvider>
            <NavigationContainer>
              <MainNavigator />
            </NavigationContainer>
          </KeyboardProvider>
          <StatusBar style="auto" />
        </QueryProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
