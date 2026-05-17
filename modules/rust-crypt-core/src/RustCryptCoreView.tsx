import { requireNativeView } from 'expo';
import * as React from 'react';

import { RustCryptCoreViewProps } from './RustCryptCore.types';

const NativeView: React.ComponentType<RustCryptCoreViewProps> =
  requireNativeView('RustCryptCore');

export default function RustCryptCoreView(props: RustCryptCoreViewProps) {
  return <NativeView {...props} />;
}
