import { InjectionToken } from "@angular/core";

export interface LocalStorage {
  setItem(key: string, value: any): void;
  getItem(key: string): any;
  removeItem(key: string): void;
}

export const LOCAL_STORAGE_TOKEN: InjectionToken<LocalStorage> = new InjectionToken<LocalStorage>('LOCAL_STORAGE_TOKEN');