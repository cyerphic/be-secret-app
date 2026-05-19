import React, { useState, useCallback } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, Button, Appbar, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import * as DocumentPicker from 'expo-document-picker';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system/legacy';
import { decryptFile } from '../../../lib/cryptCore';

export default function DecryptScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation();
  
  const [statusMessage, setStatusMessage] = useState<string>('请选择要解密的文件');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const handleDecrypt = useCallback(async () => {
    let localPath = '';
    let outPath = '';
    
    try {
      setIsProcessing(true);
      setStatusMessage('正在选择文件...');
      
      const res = await DocumentPicker.getDocumentAsync({});
      if (res.canceled || !res.assets || res.assets.length === 0) {
        setStatusMessage('已取消选择。');
        setIsProcessing(false);
        return;
      }
      
      const file = res.assets[0];
      const name = file.name || 'file';
      const uri = file.uri;

      localPath = FileSystem.cacheDirectory + name;
      outPath = localPath + '.dec';
      
      setStatusMessage('正在读取并解密...'); 
      await FileSystem.copyAsync({ from: uri, to: localPath });
      
      const rustInPath = localPath.replace('file://', '');
      const rustOutPath = outPath.replace('file://', '');

      // 执行 Rust 底层解密
      await decryptFile(rustInPath, rustOutPath, '123abC');

      const canShare = await Sharing.isAvailableAsync();
      if (canShare) {
        await Sharing.shareAsync(outPath);
        setStatusMessage('解密完成，已通过系统分享导出。');
      } else {
        setStatusMessage(`解密完成，路径: ${outPath}`);
      }

    } catch (error) {
      console.error('Decrypt error', error);
      setStatusMessage(`解密失败：${String(error)}`);
    } finally {
      setIsProcessing(false);
      // 性能优化：清理临时缓存密文文件
      if (localPath) {
        FileSystem.deleteAsync(localPath, { idmDelete: true }).catch(() => {});
      }
    }
  }, []);

  return (
    <View style={[styles.page, { backgroundColor: colors.surfaceVariant }]}>
      <Appbar.Header style={{ backgroundColor: colors.surfaceVariant }}>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title="文件解密" />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.container} removeClippedSubviews={true}>
        <Text variant='titleMedium' style={styles.statusLabel}>操作状态</Text>
        <Text selectable style={[styles.statusText, { color: colors.onSurfaceVariant }]}>
          {statusMessage}
        </Text>

        <Button 
          mode="contained" 
          icon="lock-open-variant" 
          onPress={handleDecrypt} 
          loading={isProcessing}
          disabled={isProcessing}
          style={styles.actionButton}
        >
          {isProcessing ? '处理中...' : '选择文件并解密'}
        </Button>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1 },
  container: { padding: 20, alignItems: 'center' },
  statusLabel: { marginBottom: 8, fontWeight: '700', alignSelf: 'flex-start' },
  statusText: {
    width: '100%', minHeight: 120, padding: 16, borderRadius: 14,
    textAlignVertical: 'top',
    lineHeight: 20, marginBottom: 24,
  },
  actionButton: { width: '100%', paddingVertical: 6 }
});