import React, { useRef, useState } from 'react';
import { Animated, StyleSheet, ScrollView, View } from 'react-native';
import { Icon, Text, FAB, Portal, useTheme } from 'react-native-paper';
import Header from '../../../components/Header';
import useIndex from '../hooks/useIndex';
import { encryptBase64, decryptBase64 } from '../../../lib/cryptCore';

export default function IndexScreen() {
  const { colors } = useTheme();

  const { 
    open,
    onStateChange,
  } = useIndex();

  return (
    <View style={[styles.page, { backgroundColor: colors.surfaceVariant }]}>
      {/* 顶部自定义 Header 组件 */}
      <Header />

      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          {/* mock data */}
        </View>
      </ScrollView>

      {/* 悬浮操作按钮 (FAB) */}
      <FAB.Group
        open={open}
        visible
        icon='lock-reset'
        actions={[
          {
            icon: 'lock-open-variant',
            label: 'Decrypt',
            style: { backgroundColor: colors.primaryContainer },
            onPress: async () => {
              try {
                const encrypted = await encryptBase64('SGVsbG8sIHdvcmxkIQ==', 'password');
                const plaintext = await decryptBase64(encrypted, 'password');
                console.log('Native decrypt result:', plaintext);
              } catch (error) {
                console.error('CryptCore error', error);
              }
            },
          },
          {
            icon: 'lock',
            label: 'Encrypt',
            style: { backgroundColor: colors.primaryContainer },
            onPress: async () => {
              try {
                const result = await encryptBase64('SGVsbG8sIHdvcmxkIQ==', 'password');
                console.log('Native encrypt result:', result);
              } catch (error) {
                console.error('CryptCore error', error);
              }
            },
          },
        ]}
        onStateChange={onStateChange}
        onPress={() => {
          if (open) {
            // do something if the speed dial is open
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: { 
    flex: 1 
  },
  container: {
    padding: 20,
    alignItems: 'center',
  },
  listItem: {
    marginVertical: 10,
    opacity: 0.5,
  },
});