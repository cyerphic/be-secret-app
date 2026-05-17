import { registerWebModule, NativeModule } from 'expo';

import { ChangeEventPayload } from './RustCryptCore.types';

type RustCryptCoreModuleEvents = {
  onChange: (params: ChangeEventPayload) => void;
}

class RustCryptCoreModule extends NativeModule<RustCryptCoreModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
  hello() {
    return 'Hello world! 👋';
  }
  async encryptBase64(): Promise<string> {
    throw new Error('RustCryptCore encryption is only available on native platforms.');
  }
  async decryptBase64(): Promise<string> {
    throw new Error('RustCryptCore decryption is only available on native platforms.');
  }
};

export default registerWebModule(RustCryptCoreModule, 'RustCryptCore');
