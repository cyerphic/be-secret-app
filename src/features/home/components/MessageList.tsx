import React, { memo, useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import MessageBubble from './MessageBubble';
import useMessageList from '../hooks/useMessageList';

type MessageListProps = {
  refreshToken?: number;
  onMessageChanged?: () => void;
  scrollToLatestTrigger?: number;
};

export default memo(function MessageList({ refreshToken = 0, onMessageChanged, scrollToLatestTrigger = 0 }: MessageListProps) {
  const { messages } = useMessageList(refreshToken);
  const listRef = useRef<any>(null);

  useEffect(() => {
    if (!listRef.current) return;

    requestAnimationFrame(() => {
      listRef.current?.scrollToEnd({ animated: true });
    });
  }, [scrollToLatestTrigger]);

  return (
    <View style={styles.container}>
      <FlashList
        ref={listRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MessageBubble message={item} onMessageChanged={onMessageChanged} />}
        contentContainerStyle={styles.listContent}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
        estimatedItemSize={80}
        removeClippedSubviews
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 16,
  },
});
