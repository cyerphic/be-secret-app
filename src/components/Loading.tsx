import React from 'react';
import {
  View,
  Modal,
  ActivityIndicator,
  Text,
  StyleSheet,
} from 'react-native';

interface LoadingOverlayProps {
  visible: boolean;
  text?: string;
}

export default function LoadingOverlay({
  visible,
  text = 'Processing...',
}: LoadingOverlayProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <ActivityIndicator size="large" />
          <Text style={styles.text}>{text}</Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    padding: 24,
    borderRadius: 12,
    backgroundColor: '#fff',
    alignItems: 'center',
    minWidth: 160,
  },
  text: {
    marginTop: 12,
  },
});