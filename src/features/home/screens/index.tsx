import React, { memo } from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { useTheme } from 'react-native-paper';
import Header from '../../../components/Header';
import InputContainer from '../components/MessageInput';
import MessageList from '../components/MessageList';
import { KeyboardStickyView } from 'react-native-keyboard-controller';

export default memo(function IndexScreen() {
  const { colors } = useTheme();

  return (
    <View style={[styles.page, { backgroundColor: colors.surfaceVariant }]}>
      {/* header */}
      <Header style={{ backgroundColor: colors.surface }} header="private" />

      <View style={styles.contentContainer}>
        <View style={styles.listWrapper}>
          <MessageList />
        </View>

        {/* 聊天输入框 */}
        <KeyboardStickyView offset={{ closed: 0, opened: 99 }}>
          <InputContainer />
        </KeyboardStickyView>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  page: { 
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
  listWrapper: {
    flex: 1,
  }
});