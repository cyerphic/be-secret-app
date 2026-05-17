import * as React from 'react';

import { RustCryptCoreViewProps } from './RustCryptCore.types';

export default function RustCryptCoreView(props: RustCryptCoreViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}
