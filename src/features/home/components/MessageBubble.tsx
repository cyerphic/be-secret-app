import React, { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import useMessageBubble from '../hooks/useMessageBubble';
import type { ChatMessage } from '../types/message';

type Props = {
  message: ChatMessage;
};

export default memo(function MessageBubble({ message }: Props) {
  const { colors } = useTheme();
  const { isMine } = useMessageBubble(message);

  return (
    <View style={[styles.row, isMine ? styles.rowMine : styles.rowOther]}>
      <View
        style={[
          styles.bubble,
          {
            backgroundColor: isMine ? colors.primaryContainer : colors.surface,
            borderColor: colors.outline,
          },
        ]}
      >
        <Text style={[styles.text, { color: isMine ? colors.onPrimaryContainer : colors.onSurface }]}>
          {message.text}
        </Text>
        <Text style={[styles.time, { color: colors.onSurfaceVariant }]}>{message.timestamp}</Text>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  row: {
    width: '100%',
    marginBottom: 8,
  },
  rowMine: {
    alignItems: 'flex-end',
  },
  rowOther: {
    alignItems: 'flex-start',
  },
  bubble: {
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    maxWidth: '84%',
    minWidth: '32%',
  },
  text: {
    fontSize: 15,
    lineHeight: 21,
  },
  time: {
    marginTop: 6,
    fontSize: 11,
    alignSelf: 'flex-end',
  },
});
