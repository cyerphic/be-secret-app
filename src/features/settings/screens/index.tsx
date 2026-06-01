import React, { memo } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Text, useTheme, TouchableRipple } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

import Header from '../../../components/Header';

export default memo(function IndexScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation<any>();

  return (
    <View style={[styles.page, { backgroundColor: colors.background }]}>
      <Header
        style={{ backgroundColor: colors.background }}
        header="Settings"
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <TouchableRipple
          onPress={() => navigation.navigate('PrivateKeySettings')}
        >
          <View style={styles.settingItem}>
            <View style={styles.iconContainer}>
              <MaterialIcons
                name="key"
                size={24}
                color={colors.onSurfaceVariant}
              />
            </View>

            <View style={styles.content}>
              <Text 
                variant="bodyLarge" 
                style={[styles.title, { color: colors.onSurface }]}
              >
                Private Keys
              </Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={24}
              color={colors.outline}
            />
          </View>
        </TouchableRipple>

        <Text
          variant="labelLarge"
          style={[
            styles.footerText,
            { color: colors.outline },
          ]}
        >
          More settings coming soon...
        </Text>
      </ScrollView>
    </View>
  );
});

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 8,
    paddingBottom: 24,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  iconContainer: {
    width: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 24,
  },
  content: {
    flex: 1,
  },
  title: {
    fontWeight: '400',
    marginBottom: 2,
  },
  footerText: {
    textAlign: 'center',
    marginTop: 32,
    paddingHorizontal: 24,
  },
});