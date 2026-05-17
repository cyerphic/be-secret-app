import { NativeModule, requireNativeModule } from 'expo';

import { RustCryptCoreModuleEvents } from './RustCryptCore.types';

declare class RustCryptCoreModule extends NativeModule<RustCryptCoreModuleEvents> {
  PI: number;
  hello(): string;
  setValueAsync(value: string): Promise<void>;
  encryptBase64(plaintextBase64: string, password: string): Promise<string>;
  decryptBase64(ciphertextBase64: string, password: string): Promise<string>;
  encryptFile(inP: string, outP: string, pwd: string): Promise<void>;
  decryptFile(inP: string, outP: string, pwd: string): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<RustCryptCoreModule>('RustCryptCore');
