import React from 'react';
import { StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';

export default function Header({ style, header }) {
  return (
    <Appbar.Header 
      style={[styles.headerContainer, style]}
    >
      {header && <Appbar.Content title={header} titleStyle={styles.headerText} />}
    </Appbar.Header>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: 6,
    paddingBottom: 6,
    height: 'auto', 
  },
  headerText: {
    fontSize: 16,
    textAlign: 'center',
  },
});