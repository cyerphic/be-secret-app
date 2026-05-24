import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import MessageBubble from './MessageBubble';
import useMessageList from '../hooks/useMessageList';

type MessageListProps = {
  refreshToken?: number;
  onMessageChanged?: () => void;
};

export default memo(function MessageList({ refreshToken = 0, onMessageChanged }: MessageListProps) {
  const { messages } = useMessageList(refreshToken);

  return (
    <View style={styles.container}>
      <FlashList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MessageBubble message={item} onMessageChanged={onMessageChanged} />}
        contentContainerStyle={styles.listContent}
        keyboardDismissMode="on-drag"
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
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 16,
  },
});
