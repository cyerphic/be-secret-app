// src/features/home/screens/index.tsx
import React, { memo } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Text, FAB, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Header from '../../../components/Header';
import useIndex from '../hooks/useIndex';

export default memo(function IndexScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation<any>();
  const { open, onStateChange } = useIndex();

  return (
    <View style={ styles.page }>
      <Header style={{ backgroundColor: colors.surface }}/>
      <ScrollView showsVerticalScrollIndicator={false} removeClippedSubviews={true}>
        <View style={[styles.container, { backgroundColor: colors.surface }]}>
          <Text variant='titleMedium' style={styles.statusLabel}>private</Text>
        </View>
      </ScrollView>
      {/*
      <FAB.Group
        open={open}
        visible
        icon='lock-reset'
        actions={[
          {
            icon: 'lock-open-variant',
            label: 'Decrypt',
            style: { backgroundColor: colors.primaryContainer },
            onPress: () => navigation.navigate('Decrypt')
          },
          {
            icon: 'lock',
            label: 'Encrypt',
            style: { backgroundColor: colors.primaryContainer },
            onPress: () => navigation.navigate('Encrypt')
          },
        ]}
        onStateChange={onStateChange}
        onPress={() => {}}
      />
      */}
    </View>
  );
});

const styles = StyleSheet.create({
  page: { flex: 1 },
  container: { paddingVertical: 8, alignItems: 'center' },
  statusLabel: { marginBottom: 8, fontWeight: '400' },
});