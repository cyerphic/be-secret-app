import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Icon, useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../../features/home/screens';
import SetScreen from '../../features/settings/screens';
import EncryptScreen from '../../features/home/screens/Encrypt';
import DecryptScreen from '../../features/home/screens/Decrypt';

export const ROUTES = {
  TAB_NAVIGATOR: 'Tabs',
  HOME_TAB: 'HomeTab',
  SETTINGS_TAB: 'SettingsTab',
  ENCRYPT: 'Encrypt',
  DECRYPT: 'Decrypt',
};

const TAB_ICONS = {
  [ROUTES.HOME_TAB]: {
    focused: 'dots-horizontal-circle',
    unfocused: 'dots-horizontal-circle-outline',
  },
  [ROUTES.SETTINGS_TAB]: {
    focused: 'cog',
    unfocused: 'cog-outline',
  },
};

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  const renderTabBarIcon = (route, focused, color) => {
    const iconName = focused 
      ? TAB_ICONS[route.name].focused 
      : TAB_ICONS[route.name].unfocused;

    return (
      <View style={styles.iconContainer}>
        <Icon source={iconName} color={color} size={36} />
      </View>
    );  
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        //tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.onSurfaceVariant,
        tabBarIcon: ({ focused, color }) => renderTabBarIcon(route, focused, color),
        tabBarItemStyle: {
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'visible',
        },
        tabBarStyle: [
          styles.tabBar,
          {
            backgroundColor: colors.surface,
            height: (Platform.OS === 'ios' ? 48 : 52) + insets.bottom,
            paddingTop: 8,
            paddingBottom: insets.bottom > 0 ? insets.bottom : 12,
          },
        ],
        tabBarButtonTestID: `tab-${route.name}`,
      })}
    >
      <Tab.Screen 
        name={ROUTES.HOME_TAB} 
        component={HomeScreen} 
        options={{ title: 'Home' }} 
      />
      <Tab.Screen 
        name={ROUTES.SETTINGS_TAB} 
        component={SetScreen} 
        options={{ title: 'Settings' }} 
      />
    </Tab.Navigator>
  );
}

export default function MainNavigator() {
  return (
    <Stack.Navigator 
      screenOptions={{ 
        headerShown: false,
        gestureEnabled: true,
      }}
    >
      <Stack.Screen name={ROUTES.TAB_NAVIGATOR} component={TabNavigator} />
      <Stack.Screen name={ROUTES.ENCRYPT} component={EncryptScreen} />
      <Stack.Screen name={ROUTES.DECRYPT} component={DecryptScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    borderTopWidth: 0,
    elevation: 8,
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  iconContainer: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'visible',
  },
});