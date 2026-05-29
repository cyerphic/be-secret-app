import React, { memo, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import type { SetPrivateKey } from '../types/keyEntity';
import useKeyRow from '../hooks/useKeyRow';

interface Props {
  item: SetPrivateKey;
  onKeyChanged?: () => void;
}

export default memo(function KeyRow({ item, onKeyChanged }: Props) {
  const { colors } = useTheme();
  const { copyKey, openActions } = useKeyRow(onKeyChanged);

  const subTextColor = '#8e8e93';

  return (
    <View style={styles.keyList}>
      <Ionicons
        name={
          item.selected
            ? 'shield-checkmark'
            : 'shield-checkmark-outline'
        }
        size={20}
        color={
          item.selected
            ? colors.primaryGreen
            : subTextColor
        }
        style={styles.isSelected}
      />

      <View style={styles.keyContainer}>
        <Text
          style={styles.keyMeta}
          numberOfLines={1}
        >
          {item.keyMeta}
        </Text>

        <Text style={styles.keyCreateAt}>
          {item.createdAt}
        </Text>
      </View>

      <TouchableOpacity style={styles.keyActionIcon} onPress={() => copyKey(item)}>
        <Ionicons name="copy-outline" size={20} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.keyActionIcon} onPress={() => openActions(item)}>
        <Ionicons
          name="ellipsis-horizontal"
          size={20}
          color={subTextColor}
        />
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  keyList: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },

  isSelected: {
    marginRight: 12,
  },

  keyContainer: {
    flex: 1,
  },

  keyMeta: {
    fontSize: 15,
    color: '#1c1c1e',
    marginBottom: 2,
    fontFamily: 'monospace',
  },

  keyCreateAt: {
    fontSize: 12,
    color: '#8e8e93',
  },

  keyActionIcon: {
    padding: 4,
    marginLeft: 8,
  },
});