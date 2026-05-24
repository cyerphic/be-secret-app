import React, { memo, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';

import { useTheme, Icon } from 'react-native-paper';

import type { ChatMessage } from '../types/messageEntity';
import useMessageBubble from '../hooks/useMessageBubble';

type Props = {
  message: ChatMessage;
  onMessageChanged?: () => void;
};

export default memo(function MessageBubble({ message, onMessageChanged }: Props) {
  const { colors } = useTheme();
  const { remove, encryptText, decryptText } = useMessageBubble(onMessageChanged);

  const actionColor = colors.onSurfaceVariant;

  const [isProcessing, setIsProcessing] = useState(false);

  const runWithLoading = async (task: () => Promise<void>, errorLabel: string) => {
    if (isProcessing) return;

    setIsProcessing(true);
    try {
      await task();
    } catch (error) {
      console.error(`[MessageBubble] ${errorLabel} fail:`, error);
    } finally {
      setIsProcessing(false);
    }
  };

  const openActions = () => {
    Alert.alert(
      '消息操作',
      undefined,
      [
        {
          text: '删除',
          style: 'destructive',
          onPress: () => {
            void runWithLoading(() => remove(message), 'delete');
          },
        },

        {
          text: '加密',
          onPress: () => {
            void runWithLoading(() => encryptText(message), 'encrypt');
          },
        },

        {
          text: '解密',
          onPress: () => {
            void runWithLoading(() => decryptText(message), 'decrypt');
          },
        },

        {
          text: '取消',
          style: 'cancel',
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.bubbleRow}>
        <View style={styles.leftIndicatorSlot}>
          {isProcessing ? <ActivityIndicator size="small" color={actionColor} /> : null}
        </View>

        <View
          style={[
            styles.bubble,
            {
              backgroundColor: colors.primaryContainer,
            },
          ]}
        >
          <Text
            style={[
              styles.text,
              {
                color: colors.onPrimaryContainer,
              },
            ]}
          >
            {message.text}
          </Text>
        </View>

        <TouchableOpacity style={styles.menuButton} activeOpacity={0.7} onPress={openActions} disabled={isProcessing}>
          <Icon source="dots-vertical" size={20} color={actionColor} />
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity onPress={() => console.log('copy')}>
          <Icon source="content-copy" size={22} color={actionColor} />
        </TouchableOpacity>

        <Text
          style={[
            styles.time,
            {
              color: colors.onSurfaceVariant,
            },
          ]}
        >
          {message.timestamp}
        </Text>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },

  bubbleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  leftIndicatorSlot: {
    width: 28,
    height: 28,

    marginRight: 4,

    alignItems: 'center',
    justifyContent: 'center',

    flexShrink: 0,
  },

  bubble: {
    maxWidth: '85%',

    borderRadius: 18,

    paddingHorizontal: 16,
    paddingVertical: 12,

    flexShrink: 1,
  },

  text: {
    fontSize: 16,
    lineHeight: 22,
  },

  menuButton: {
    width: 28,
    height: 28,

    marginLeft: 4,

    borderRadius: 14,

    alignItems: 'center',
    justifyContent: 'center',

    flexShrink: 0,
  },

  footer: {
    marginTop: 6,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',

    gap: 12,

    paddingHorizontal: 8,
  },

  time: {
    fontSize: 11,
  },
});
