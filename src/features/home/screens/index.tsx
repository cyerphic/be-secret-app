import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import Header from '../../../components/Header';
import InputContainer from '../components/MessageInput';
import MessageList from '../components/MessageList';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';

export default memo(function IndexScreen() {
  const { colors } = useTheme();

  return (
    <View style={[styles.page, { backgroundColor: colors.surfaceVariant }]}>
      {/* header */}
      <Header style={{ backgroundColor: colors.surface }} header="private" />

      <KeyboardAvoidingView
        style={styles.contentContainer}
        behavior="translate-with-padding"
      >
        <View style={styles.listWrapper}>
          <MessageList />
        </View>

        {/* 聊天输入框 */}
        <InputContainer />
      </KeyboardAvoidingView>
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