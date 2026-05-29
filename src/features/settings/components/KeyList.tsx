import React, { memo, useEffect, useRef } from 'react';
import { StyleSheet, TouchableOpacity, Text, View, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from 'react-native-paper';

import useKeyList from '../hooks/useKeyList';
import KeyRow from './KeyRow';

type KeyListProps = {
  tabType?: 'auto' | 'manual';
  refreshToken?: number;
  onKeyChanged?: () => void;
};

export default memo(function KeyList({ tabType = 'auto', refreshToken = 0, onKeyChanged }: KeyListProps) {
  const { displayedKeys, hasMore, handleViewMore } = useKeyList(tabType, refreshToken);
  const { colors } = useTheme();

  return (
    <View style={styles.keyContainer}>
      <FlatList
        data={displayedKeys}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        renderItem={({ item }) => <KeyRow item={item} onKeyChanged={onKeyChanged} />}
        ItemSeparatorComponent={() => (
          <View style={styles.divider} />
        )}
        ListFooterComponent={
          hasMore ? (
            <TouchableOpacity 
              style={styles.viewMoreBtn}
              onPress={handleViewMore}
            >
              <Text style={styles.viewMoreText}>
                View More
              </Text>

              <Ionicons
                name="chevron-down"
                size={16}
                color={colors.primaryGreen}
              />
            </TouchableOpacity>
          ) : null
        }
      />
    </View>
  );
});

const styles = StyleSheet.create({
  keyContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingTop: 8,
    marginBottom: 16,
    overflow: 'hidden',
  },

  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginLeft: 48,
  },

  viewMoreBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },

  viewMoreText: {
    color: '#28a745',
    fontSize: 14,
    marginRight: 4,
  },
});