import React, { memo, useCallback, useMemo, useState } from 'react';
import { StyleSheet, View, Platform, Animated } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import Header from '../../../components/Header';
import InputContainer from '../components/MessageInput';
import MessageList from '../components/MessageList';
import { useKeyboardAnimation } from 'react-native-keyboard-controller';

export default memo(function IndexScreen() {
  const { colors } = useTheme();
  const [refreshToken, setRefreshToken] = useState(0);
  const [scrollToLatestTrigger, setScrollToLatestTrigger] = useState(0);
  const tabBarHeight = useBottomTabBarHeight();
  const { height, progress } = useKeyboardAnimation();

  const handleSendSuccess = useCallback(() => {
    setRefreshToken((prev) => prev + 1);
    setScrollToLatestTrigger((prev) => prev + 1);
  }, []);

  const handleInputFocus = useCallback(() => {
    setScrollToLatestTrigger((prev) => prev + 1);
  }, []);

  const stickyTranslateY = useMemo(() => {
    if (tabBarHeight <= 0) return height;

    return height.interpolate({
      inputRange: [-tabBarHeight - 1, -tabBarHeight, 0],
      outputRange: [-1, 0, 0],
      extrapolateRight: 'clamp',
    });
  }, [height, tabBarHeight]);

  return (
    <View style={[styles.page, { backgroundColor: colors.surfaceVariant }]}>
      {/* header */}
      <Header style={{ backgroundColor: colors.surface }} header="private" />

      <View style={{ flex: 1, overflow: 'hidden' }}>
        <Animated.View style={[styles.contentContainer, { transform: [{ translateY: stickyTranslateY }] }]}>
          <View style={styles.listWrapper}>
            <MessageList
              refreshToken={refreshToken}
              onMessageChanged={handleSendSuccess}
              scrollToLatestTrigger={scrollToLatestTrigger}
            />
          </View>
          <InputContainer onSendSuccess={handleSendSuccess} onInputFocus={handleInputFocus} />
        </Animated.View>
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