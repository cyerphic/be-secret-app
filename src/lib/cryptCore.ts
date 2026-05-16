import { requireNativeModule } from 'expo-modules-core';

const CryptCore = requireNativeModule<{
  encryptBase64(plaintextBase64: string, password: string): Promise<string>;
  decryptBase64(encryptedBase64: string, password: string): Promise<string>;
}>('CryptCore');

export async function encryptBase64(plaintextBase64: string, password: string) {
  return CryptCore.encryptBase64(plaintextBase64, password);
}

export async function decryptBase64(encryptedBase64: string, password: string) {
  return CryptCore.decryptBase64(encryptedBase64, password);
}
