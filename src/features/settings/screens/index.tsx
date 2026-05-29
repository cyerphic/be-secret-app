import React, { memo } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Text, Button, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Header from '../../../components/Header';

export default memo(function IndexScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation<any>();

  return (
    <View style={[styles.page, { backgroundColor: colors.surfaceVariant }]}>
      <Header style={{ backgroundColor: colors.surface }} header="setting" />
      <Button 
        mode="contained"
        style={styles.button}
        onPress={() => navigation.navigate('PrivateKeySettings')}
      >
        private keys
      </Button>
    </View>
  );
});

const styles = StyleSheet.create({
  page: { flex: 1 },
  container: { paddingVertical: 8, alignItems: 'center' },
  statusLabel: { marginBottom: 8, fontWeight: '400' },
});