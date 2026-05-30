import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Switch,
  StyleSheet 
} from 'react-native';
import useKeyInput from '../hooks/useKeyInput';
import LoadingOverlay from '../../../components/Loading';

interface KeyInputProps {
	onSave?: (key: string) => Promise<void>;
}

export default function KeyInput({ onSave }: KeyInputProps) {
	const { 
    inputValue,
    setInputValue,
    encrypt,
    handleSave,
    handlePaste,
    handleClear,
    isInputEmpty,
    onEncryptChange,
    processing 
  } = useKeyInput({ onSave });

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
			  please input your private key below or{' '}
			  <Text 
			    style={styles.handleText} 
			    onPress={handlePaste}
			    suppressHighlighting={true}
			  >
			    paste
			  </Text>

			  {!isInputEmpty && (
			    <>
			      {' , '}
			      <Text 
			        style={styles.handleText} 
			        onPress={handleClear} 
			        suppressHighlighting={true}
			      >
			        clear
			      </Text>
			    </>
			  )}
			  :
			</Text>

      <TextInput
        style={styles.input}
        placeholder="Paste here..."
        placeholderTextColor="#C7C7CC"
        value={inputValue}
        onChangeText={setInputValue}
        autoCapitalize="none"
        autoCorrect={false}
        multiline={true}
      />

      <View style={styles.switchRow}>
        <Text style={styles.switchLabel}>encrypt input</Text>
        <Switch
          trackColor={{ false: '#E5E5EA', true: '#34C759' }}
          thumbColor={'#ffffff'}
          ios_backgroundColor="#E5E5EA"
          disabled={processing}
          onValueChange={onEncryptChange}
          value={encrypt}
        />
      </View>

      <TouchableOpacity 
        style={[
          styles.saveButton, 
          isInputEmpty && styles.saveButtonDisabled
        ]}
        onPress={handleSave}
        disabled={isInputEmpty || processing}
        activeOpacity={0.8}
      >
        <Text style={styles.saveButtonText}>Save Key</Text>
      </TouchableOpacity>

      <LoadingOverlay
		    visible={processing}
		    text={encrypt ? 'Encrypting...' : 'Decrypting...'}
		  />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  handleText: {
  	fontSize: 16,
    color: '#28a745',
  },
  label: {
    fontSize: 14,
    color: '#8e8e93',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#f4f5f9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    padding: 12,
    fontSize: 16,
    color: '#1c1c1e',
    minHeight: 80,
    textAlignVertical: 'top',
    fontFamily: 'monospace',
    marginBottom: 16,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  switchLabel: {
    color: '#1c1c1e',
  },
  saveButton: {
    backgroundColor: '#28a745',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonDisabled: {
    backgroundColor: '#C7C7CC',
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});