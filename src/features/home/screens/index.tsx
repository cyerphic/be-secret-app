import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import Header from '../../../components/Header';
import InputContainer from '../components/MessageInput';
import MessageList from '../components/MessageList';
import { KeyboardAvoidingView, KeyboardProvider } from 'react-native-keyboard-controller';

export default memo(function IndexScreen() {
  const { colors } = useTheme();

  return (
    <KeyboardProvider>
      <View style={[styles.page, { backgroundColor: colors.surfaceVariant }]}>
        {/* header */}
        <Header style={{ backgroundColor: colors.surface }} header="private" />
        
        <KeyboardAvoidingView 
          style={styles.contentContainer} 
          behavior="padding"
        >
          <View style={styles.listWrapper}>
            <MessageList />
          </View>

          {/* 聊天输入框 */}
          <InputContainer />
        </KeyboardAvoidingView>
      </View>
    </KeyboardProvider>
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