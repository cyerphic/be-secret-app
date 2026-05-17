import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BottomNavigation, Icon, useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HomeScreen from '../../features/home/screens'; // home
import SetScreen from '../../features/settings/screens'; // settings

export default function MainNavigator() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const [index, setIndex] = React.useState(1);
  const [routes] = React.useState([
    {
      key: 'home',
      //title: 'Chat',
      focusedIcon: 'file-lock',
      unfocusedIcon: 'file-lock-outline'
    },
    {
      key: 'set',
      //title: 'Me',
      focusedIcon: 'cog',
      unfocusedIcon: 'cog-outline'
    },
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
          colors: {
            elevation: {
              level2: colors.surface,
            },
            surface: colors.surface,
            secondaryContainer: 'transparent',
          }
        }}
        safeAreaInsets={{ bottom: 0 }}
        barStyle={[
          styles.bottomBar, 
          { 
            height: 60 + insets.bottom,
            paddingBottom: insets.bottom,
          }
        ]}
        renderIcon={({ route, focused, color }) => (
          <Icon
            source={focused ? route.focusedIcon : route.unfocusedIcon}
            color={color}
            size={30}
          />
        )} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  bottomBar: { justifyContent: 'center' },
});
