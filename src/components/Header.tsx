import React from 'react';
import { Appbar } from 'react-native-paper';

export default function Header() {
  return (
    <Appbar.Header 
      elevated
      style={{ height: 0, minHeight: 0, backgroundColor: 'transparent' }}
    >
      {null}
    </Appbar.Header>
  );
}
