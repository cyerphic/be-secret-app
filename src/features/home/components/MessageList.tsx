import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import MessageBubble from './MessageBubble';
import useMessageList from '../hooks/useMessageList';

export default memo(function MessageList() {
  const { messages } = useMessageList();

  return (
    <View style={styles.container}>
      <FlashList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MessageBubble message={item} />}
        contentContainerStyle={styles.listContent}
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
