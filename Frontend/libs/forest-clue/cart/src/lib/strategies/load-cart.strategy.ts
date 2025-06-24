import { inject, Injectable } from "@angular/core";
import { Cart } from "../model/cart.model";
import { ENV_TOKEN, EnvConfig } from "@lib/core/env";
import { HttpClient } from "@angular/common/http";
import { LOCAL_STORAGE_TOKEN, LocalStorage, LocalStorageService } from "@lib/core/tokens";
import { map, Observable, of, take, tap } from "rxjs";
import { Response } from "@lib/core/http";

export interface LoadCartStrategyModel {
  authLoadCart(): Observable<Cart>;
  guestLoadCart(): Observable<Cart>;
}

@Injectable({
  providedIn: 'root'
})
export class LoadCartStrategy implements LoadCartStrategyModel {

  private readonly _env: EnvConfig = inject(ENV_TOKEN);
  private readonly _httpClient: HttpClient = inject(HttpClient);
  private readonly _localStorage: LocalStorage = inject(LocalStorageService);

  authLoadCart(): Observable<Cart> {
    return this._httpClient.get<Cart>(`${this._env.apiUrl}/cart`, { withCredentials: true }).pipe(
      take(1)
    )
  }

  guestLoadCart(): Observable<Cart> {
    const isCartExists = this._localStorage.getItem('cart');

    if (!isCartExists) {
      this._localStorage.setItem('cart', {
        items: [],
        totalPrice: 0,
        totalQuantity: 0,
        currency: 'USD',
        updatedAt: new Date()
      })

      return of(this._localStorage.getItem('cart') as Cart);
    } 

    return of(this._localStorage.getItem('cart') as Cart);
  }
}