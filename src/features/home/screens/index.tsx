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
  const { height } = useKeyboardAnimation();

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
        {/* message list */}
        <MessageList
          refreshToken={refreshToken}
          onMessageChanged={handleSendSuccess}
          scrollToLatestTrigger={scrollToLatestTrigger}
        />
        {/* input container */}
        <Animated.View style={{ transform: [{ translateY: stickyTranslateY }] }}>
          <InputContainer onSendSuccess={handleSendSuccess} onInputFocus={handleInputFocus} />
        </Animated.View>
    </View>
  );
});

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  page: { 
    flex: 1,
  },
});
