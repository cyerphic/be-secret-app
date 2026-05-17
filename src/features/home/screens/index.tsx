import React, { useState } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Text, FAB, useTheme } from 'react-native-paper';
import Header from '../../../components/Header';
import useIndex from '../hooks/useIndex';
import * as DocumentPicker from 'expo-document-picker';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system/legacy';
import { encryptFile, decryptFile } from '../../../lib/cryptCore';

export default function IndexScreen() {
  const { colors } = useTheme();
  const [statusMessage, setStatusMessage] = useState<string>('请选择要加密或解密的文件');

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
          <Text variant='titleMedium' style={styles.statusLabel}>操作状态</Text>
          <Text selectable style={[styles.statusText, { color: colors.onSurfaceVariant }]}>{statusMessage}</Text>
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
                setStatusMessage('正在选择要解密的文件...');
                const res = await DocumentPicker.getDocumentAsync({});
                if (res.canceled || !res.assets || res.assets.length === 0) {
                  setStatusMessage('已取消选择。');
                  return;
                }
                const file = res.assets[0];
                const name = file.name || 'file';
                const uri = file.uri;

                // 1. 生成 Expo 认识的 file:// 路径
                const localPath = FileSystem.cacheDirectory + name;
                setStatusMessage(`已选中文件 ${name}，正在复制到缓存目录...`);
                await FileSystem.copyAsync({ from: uri, to: localPath });
                
                const outPath = localPath + '.dec';
                setStatusMessage('文件复制完成，正在解密...');

                // 🌟 【关键修复】：同样去掉解密路径的 file:// 前缀
                const rustInPath = localPath.replace('file://', '');
                const rustOutPath = outPath.replace('file://', '');

                // 2. 传给 Rust
                await decryptFile(rustInPath, rustOutPath, '123abC');

                setStatusMessage(`解密完成，已保存到 ${outPath}`);
                console.log('decryptFile output:', outPath);
              } catch (error) {
                console.error('CryptCore error', error);
                setStatusMessage(`解密失败：${String(error)}`);
              }
            }
          },
          {
            icon: 'lock',
            label: 'Encrypt',
            style: { backgroundColor: colors.primaryContainer },
            onPress: async () => {
              try {
                setStatusMessage('正在选择要加密的文件...');
                const res = await DocumentPicker.getDocumentAsync({});
                if (res.canceled || !res.assets || res.assets.length === 0) {
                  setStatusMessage('已取消选择。');
                  return;
                }
                const file = res.assets[0];
                const name = file.name || 'file';
                const uri = file.uri;

                const localPath = FileSystem.cacheDirectory + name;
                await FileSystem.copyAsync({ from: uri, to: localPath });
                
                const outPath = localPath + '.enc';
                setStatusMessage('文件复制完成，正在加密...');

                const rustInPath = localPath.replace('file://', '');
                const rustOutPath = outPath.replace('file://', '');

                // 2. 执行底层 Rust 加密
                await encryptFile(rustInPath, rustOutPath, '123abC');
                setStatusMessage(`加密完成！正在唤起系统分享...`);

                // 🌟 3. 【新增核心逻辑】检查是否支持分享，并唤起系统分享菜单
                const canShare = await Sharing.isAvailableAsync();
                if (canShare) {
                  await Sharing.shareAsync(outPath); // file:// 的原生 outPath 路径
                  setStatusMessage(`加密完成，已通过系统分享导出。`);
                } else {
                  setStatusMessage(`加密完成，但当前系统不支持分享。路径: ${outPath}`);
                }

              } catch (error) {
                console.error('CryptCore error', error);
                setStatusMessage(`加密失败：${String(error)}`);
              }
            }
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
  statusLabel: {
    marginBottom: 8,
    fontWeight: '700',
  },
  statusText: {
    width: '100%',
    minHeight: 120,
    padding: 16,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.12)',
    textAlignVertical: 'top',
    lineHeight: 20,
  },
});