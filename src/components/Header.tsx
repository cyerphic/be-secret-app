import React from 'react';
import { Appbar } from 'react-native-paper';

export default function Header({ style }) {
  return (
    <Appbar.Header 
      style={[{ height: 0, minHeight: 0 }, style]}
    >
      {null}
    </Appbar.Header>
  );
}