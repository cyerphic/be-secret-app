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
};

export default registerWebModule(RustCryptCoreModule, 'RustCryptCoreModule');
