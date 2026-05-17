import { NativeModule, requireNativeModule } from 'expo';

import { RustCryptCoreModuleEvents } from './RustCryptCore.types';

declare class RustCryptCoreModule extends NativeModule<RustCryptCoreModuleEvents> {
  PI: number;
  hello(): string;
  setValueAsync(value: string): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<RustCryptCoreModule>('RustCryptCore');
