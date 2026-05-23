import React, { memo } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Header from '../../../components/Header';

export default memo(function IndexScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation<any>();

  return (
    <View style={[styles.page, { backgroundColor: colors.surfaceVariant }]}>
      <Header style={{ backgroundColor: colors.surface }} header="setting" />
    </View>
  );
});

const styles = StyleSheet.create({
  page: { flex: 1 },
});