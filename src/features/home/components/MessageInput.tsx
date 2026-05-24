import React, { memo } from 'react';
import { 
  StyleSheet, 
  View, 
  TextInput 
} from 'react-native';
import { IconButton, useTheme } from 'react-native-paper';
import useMessageInput from '../hooks/useMessageInput';

type InputContainerProps = {
  onSendSuccess?: () => void;
  onLayoutHeightChange?: (height: number) => void;
};

export default memo(function InputContainer({ onSendSuccess, onLayoutHeightChange }: InputContainerProps) {
  const { colors } = useTheme();
  const { inputText, setInputText, send } = useMessageInput();

  return (
    <View
      style={[styles.inputContainer, { backgroundColor: colors.background }]}
      onLayout={(event) => onLayoutHeightChange?.(event.nativeEvent.layout.height)}
    > 
      <View style={[styles.inputWrapper, { backgroundColor: colors.surface }]}>
        {/* 左侧：功能按钮 */}
        <IconButton
          icon="plus" 
          size={28}
          iconColor={colors.onSurfaceVariant}
          onPress={() => console.log('打开附件')}
        />

        {/* 中间：多行文本输入框 */}
        <TextInput
          style={[styles.input, { color: colors.onSurface }]}
          placeholder="Message Input..."
          placeholderTextColor={colors.onSurfaceVariant}
          multiline={true}
          //numberOfLines={1}
          //scrollEnabled={false}
          value={inputText}
          onChangeText={setInputText}
        />

        {/* 右侧：发送 / 麦克风 按钮 */}
        <IconButton
          icon={inputText.trim().length > 0 ? "send" : "microphone"}
          size={28}
          iconColor={inputText.trim().length > 0 ? colors.primary : colors.onSurfaceVariant}
          onPress={async () => {
            if (inputText.trim().length > 0) {
              console.log('发送消息:', inputText);
              const sent = await send();
              if (sent) {
                onSendSuccess?.();
              }
            } else {
              console.log('开始语音输入...');
            }
          }}
        />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
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
    minHeight: 46,
    maxHeight: 120, 
    fontSize: 16,
    paddingTop: 13,  
    paddingBottom: 13,
    paddingHorizontal: 8,
  }
});
