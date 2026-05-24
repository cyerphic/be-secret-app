import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { StatusBar } from 'expo-status-bar';

import MainNavigator from './navigation/MainNavigator';
import { ThemeProvider } from './providers/ThemeProvider';
import { QueryProvider } from './providers/QueryProvider';
import { SnackBarProvider } from '../components/SnackBar';

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <QueryProvider>
          <SnackBarProvider>
            <KeyboardProvider>
              <NavigationContainer>
                <MainNavigator />
              </NavigationContainer>
            </KeyboardProvider>
          </SnackBarProvider>
          <StatusBar style="auto" />
        </QueryProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
