import { StorageKey } from '@ngxs/storage-plugin/src/internals/storage-key';

// TOKENS
export const ACCESS_TOKEN_KEY: StorageKey = 'auth.data.accessToken';
export const REFRESH_TOKEN_KEY: StorageKey = 'auth.data.refreshToken';

export const TOKENS_KEYS: StorageKey[] = [ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY];
