import React, { memo, useState } from 'react';
import { 
  StyleSheet, 
  ScrollView, 
  View, 
  TextInput 
} from 'react-native';
import { IconButton, useTheme } from 'react-native-paper';
import { KeyboardAvoidingView, KeyboardProvider } from 'react-native-keyboard-controller';

export default memo(function InputContainer() {
  const { colors } = useTheme();
  const [inputText, setInputText] = useState('');

  return (
    <KeyboardProvider>
      <KeyboardAvoidingView
        style={[styles.page, { backgroundColor: colors.surfaceVariant }]}
        behavior="padding"
      >
        {/* 底部输入框容器 */}
        <View style={[styles.inputContainer, { backgroundColor: colors.background }]}>
          <View style={[styles.inputWrapper, { backgroundColor: colors.surface }]}>
            {/* 左侧：功能按钮 */}
            <IconButton
              icon="plus" 
              size={24}
              iconColor={colors.onSurfaceVariant}
              onPress={() => console.log('打开附件')}
            />

            {/* 中间：多行文本输入框 */}
            <TextInput
              style={[styles.input, { color: colors.onSurface }]}
              placeholder="Message Gemini..."
              placeholderTextColor={colors.onSurfaceVariant}
              multiline={true}
              value={inputText}
              onChangeText={setInputText}
            />

            {/* 右侧：发送 / 麦克风 按钮 */}
            <IconButton
              icon={inputText.trim().length > 0 ? "send" : "microphone"}
              size={24}
              iconColor={inputText.trim().length > 0 ? colors.primary : colors.onSurfaceVariant}
              onPress={() => {
                if (inputText.trim().length > 0) {
                  console.log('发送消息:', inputText);
                  setInputText(''); 
                } else {
                  console.log('开始语音输入...');
                }
              }}
            />
          </View>
        </View>
      </KeyboardAvoidingView>  
    </KeyboardProvider>
  );
});

const styles = StyleSheet.create({
  page: { 
    flex: 1,
  },
  inputContainer: {
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