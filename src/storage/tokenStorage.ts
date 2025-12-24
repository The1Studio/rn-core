import { secureStorage } from './secureStorage';

// Storage keys - exported for shared use across apps
export const TOKEN_STORAGE_KEYS = {
  ACCESS_TOKEN: 'ACCESS_TOKEN',
  REFRESH_TOKEN: 'REFRESH_TOKEN',
} as const;

// Token functions
export const getToken = async (): Promise<string | null> => {
  return secureStorage.getString(TOKEN_STORAGE_KEYS.ACCESS_TOKEN);
};

export const setToken = async (token: string): Promise<void> => {
  await secureStorage.setString(TOKEN_STORAGE_KEYS.ACCESS_TOKEN, token);
};

export const removeToken = async (): Promise<void> => {
  await secureStorage.remove(TOKEN_STORAGE_KEYS.ACCESS_TOKEN);
};

// Refresh token functions
export const getRefreshToken = async (): Promise<string | null> => {
  return secureStorage.getString(TOKEN_STORAGE_KEYS.REFRESH_TOKEN);
};

export const setRefreshToken = async (refreshToken: string): Promise<void> => {
  await secureStorage.setString(TOKEN_STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
};

export const removeRefreshToken = async (): Promise<void> => {
  await secureStorage.remove(TOKEN_STORAGE_KEYS.REFRESH_TOKEN);
};

// Utility functions
export const setTokens = async (
  token: string,
  refreshToken: string
): Promise<void> => {
  await Promise.all([setToken(token), setRefreshToken(refreshToken)]);
};

export const clearTokens = async (): Promise<void> => {
  await Promise.all([removeToken(), removeRefreshToken()]);
};

export const getTokens = async (): Promise<{
  token: string | null;
  refreshToken: string | null;
}> => {
  const [token, refreshToken] = await Promise.all([
    getToken(),
    getRefreshToken(),
  ]);
  return { token, refreshToken };
};
