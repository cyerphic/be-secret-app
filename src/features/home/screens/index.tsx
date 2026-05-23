import React, { memo, useState } from 'react';
import { 
  StyleSheet, 
  ScrollView, 
  View, 
  TextInput 
} from 'react-native';
import { IconButton, useTheme } from 'react-native-paper';
import { FlashList } from "@shopify/flash-list";
import Header from '../../../components/Header';
import InputContainer from '../components/MessageInput';
import MessageList from '../components/MessageList';

export default memo(function IndexScreen() {
  const { colors } = useTheme();
  const [inputText, setInputText] = useState('');

  return (
    <View style={[styles.page, { backgroundColor: colors.surfaceVariant }]}>
      {/* 顶部标题栏 */}
      <Header style={{ backgroundColor: colors.surface }} header="private" />
      
      {/* message list */}
      <MessageList />

      {/* chat input */}
      <InputContainer />

    </View>
  );
});

const styles = StyleSheet.create({
  page: { 
    flex: 1,
  },
  messageList: {
    flex: 1, 
  },
  messageListContainer: { 
    paddingVertical: 8, 
    alignItems: 'center' 
  },
  chatContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    width: '100%',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end', 
    borderRadius: 28,       
    paddingHorizontal: 4,
    paddingVertical: 4,
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 120, 
    fontSize: 16,
    paddingTop: 10,  
    paddingBottom: 10,
    paddingHorizontal: 8,
  }
});