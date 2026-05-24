import React, { memo, useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import Header from '../../../components/Header';
import InputContainer from '../components/MessageInput';
import MessageList from '../components/MessageList';
import { KeyboardStickyView } from 'react-native-keyboard-controller';

export default memo(function IndexScreen() {
  const { colors } = useTheme();
  const [refreshToken, setRefreshToken] = useState(0);

  const handleSendSuccess = useCallback(() => {
    setRefreshToken((prev) => prev + 1);
  }, []);

  return (
    <View style={[styles.page, { backgroundColor: colors.surfaceVariant }]}>
      {/* header */}
      <Header style={{ backgroundColor: colors.surface }} header="private" />

      <View style={styles.contentContainer}>
        <View style={styles.listWrapper}>
          <MessageList refreshToken={refreshToken} onMessageChanged={handleSendSuccess} />
        </View>

        {/* 聊天输入框 */}
        <KeyboardStickyView offset={{ closed: 0, opened: 0 }}>
          <InputContainer onSendSuccess={handleSendSuccess} />
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
