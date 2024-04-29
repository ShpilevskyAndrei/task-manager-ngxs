import { Inject, Injectable } from '@angular/core';

import { StorageKey } from '@ngxs/storage-plugin/src/internals/storage-key';

import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '../constants/storage-keys';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  public constructor(@Inject('storageKey') private _storageKey: StorageKey) {}

  public setItem(value: string): void {
    localStorage.setItem(this._storageKey.toString(), value);
  }

  public getItem(): string | null {
    return localStorage.getItem(this._storageKey.toString());
  }

  public removeItem(): void {
    localStorage.removeItem(this._storageKey.toString());
  }

  public clearStorage(): void {
    localStorage.clear();
  }
}

@Injectable({
  providedIn: 'root',
})
export class AccessTokenStorageService extends StorageService {
  public constructor() {
    super(ACCESS_TOKEN_KEY);
  }
}

@Injectable({
  providedIn: 'root',
})
export class RefreshTokenStorageService extends StorageService {
  public constructor() {
    super(REFRESH_TOKEN_KEY);
  }
}
