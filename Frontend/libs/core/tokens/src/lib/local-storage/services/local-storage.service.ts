import { inject, Injectable } from "@angular/core";
import { LOCAL_STORAGE_TOKEN, LocalStorage } from "../tokens/local-storage.token";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private readonly _localStorage: LocalStorage = inject(LOCAL_STORAGE_TOKEN);

  setItem(key: string, value: any): void {
    this._localStorage.setItem(key, JSON.stringify(value));
  }

  getItem(key: string): any {
    return JSON.parse(this._localStorage.getItem(key));
  }

  removeItem(key: string): void {
    this._localStorage.removeItem(key);
  }
}