import React, { memo, useCallback, useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useTheme } from 'react-native-paper';
import Header from '../../../components/Header';
import InputContainer from '../components/MessageInput';
import MessageList from '../components/MessageList';

export default memo(function IndexScreen() {
  const { colors } = useTheme();
  const [refreshToken, setRefreshToken] = useState(0);
  const [inputHeight, setInputHeight] = useState(70);
  const tabBarHeight = useBottomTabBarHeight();

  const handleSendSuccess = useCallback(() => {
    setRefreshToken((prev) => prev + 1);
  }, []);

  return (
    <View style={[styles.page, { backgroundColor: colors.surfaceVariant }]}>
      {/* header */}
      <Header style={{ backgroundColor: colors.surface }} header="private" />

      <KeyboardAvoidingView
        style={styles.contentContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={tabBarHeight}
      >
        <View style={styles.listWrapper}>
          <MessageList
            refreshToken={refreshToken}
            onMessageChanged={handleSendSuccess}
            bottomInset={inputHeight}
          />
        </View>

        <InputContainer
          onSendSuccess={handleSendSuccess}
          onLayoutHeightChange={setInputHeight}
        />
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
