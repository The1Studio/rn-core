import * as SecureStore from 'expo-secure-store';
import { StateStorage } from 'zustand/middleware';

// Helper functions for common operations
export const secureStorage = {
  // String
  getString: async (key: string): Promise<string | null> => {
    return await SecureStore.getItemAsync(key);
  },
  setString: async (key: string, value: string): Promise<void> => {
    await SecureStore.setItemAsync(key, value);
  },

  // Object (JSON)
  getObject: async <T>(key: string): Promise<T | null> => {
    const value = await SecureStore.getItemAsync(key);
    if (value) {
      try {
        return JSON.parse(value) as T;
      } catch {
        return null;
      }
    }
    return null;
  },
  setObject: async <T>(key: string, value: T): Promise<void> => {
    await SecureStore.setItemAsync(key, JSON.stringify(value));
  },

  // Delete
  remove: async (key: string): Promise<void> => {
    await SecureStore.deleteItemAsync(key);
  },
};

// Zustand persist storage adapter (async)
export const zustandSecureStorage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    return await SecureStore.getItemAsync(name);
  },
  setItem: async (name: string, value: string): Promise<void> => {
    await SecureStore.setItemAsync(name, value);
  },
  removeItem: async (name: string): Promise<void> => {
    await SecureStore.deleteItemAsync(name);
  },
};

// Re-export SecureStore for direct access if needed
export { SecureStore };
