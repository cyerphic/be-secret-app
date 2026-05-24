import React, { memo } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';

import { useTheme, Icon } from 'react-native-paper';

import type { ChatMessage } from '../types/messageEntity';

type Props = {
  message: ChatMessage;
};

export default memo(function MessageBubble({ message }: Props) {
  const { colors } = useTheme();

  const actionColor = colors.onSurfaceVariant;

  const openActions = () => {
    Alert.alert(
      '消息操作',
      undefined,
      [
        {
          text: '删除',
          style: 'destructive',
          onPress: () => {
            console.log('delete');
          },
        },
        
        {
          text: '加密',
          onPress: () => {
            console.log('encrypt');
          },
        },

        {
          text: '解密',
          onPress: () => {
            console.log('decrypt');
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
      
      {/* 气泡 */}
      <View style={styles.bubbleRow}>
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

        {/* 三点 */}
        <TouchableOpacity
          style={styles.menuButton}
          activeOpacity={0.7}
          onPress={openActions}
        >
          <Icon
            source="dots-vertical"
            size={20}
            color={actionColor}
          />
        </TouchableOpacity>
      </View>

      {/* footer */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => console.log('copy')}>
          <Icon
            source="content-copy"
            size={22}
            color={actionColor}
          />
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