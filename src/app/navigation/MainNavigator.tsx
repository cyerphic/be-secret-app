import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BottomNavigation, Icon, useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../../features/home/screens';
import SetScreen from '../../features/settings/screens';
import EncryptScreen from '../../features/home/screens/Encrypt';
import DecryptScreen from '../../features/home/screens/Decrypt';

const Stack = createNativeStackNavigator();

function TabNavigator() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'home', focusedIcon: 'file-lock', unfocusedIcon: 'file-lock-outline' },
    { key: 'set', focusedIcon: 'cog', unfocusedIcon: 'cog-outline' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeScreen,
    set: SetScreen,
  });

  return (
    <View style={styles.container}>
      <BottomNavigation 
        navigationState={{ index, routes }} 
        onIndexChange={setIndex} 
        renderScene={renderScene}
        labeled={false}
        theme={{
          colors: { surface: colors.surface, secondaryContainer: 'transparent' }
        }}
        safeAreaInsets={{ bottom: 0 }}
        barStyle={[
          styles.bottomBar, 
          { height: 60 + insets.bottom, paddingBottom: insets.bottom }
        ]}
        renderIcon={({ route, focused, color }) => (
          <Icon source={focused ? route.focusedIcon : route.unfocusedIcon} color={color} size={30} />
        )} 
      />
    </View>
  );
}

export default function MainNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={TabNavigator} />
      <Stack.Screen name="Encrypt" component={EncryptScreen} />
      <Stack.Screen name="Decrypt" component={DecryptScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  bottomBar: { justifyContent: 'center' },
});