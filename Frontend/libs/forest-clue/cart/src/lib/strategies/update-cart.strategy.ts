import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { ENV_TOKEN, EnvConfig } from "@lib/core/env";
import { LocalStorage, LocalStorageService } from "@lib/core/tokens";
import { Observable, of } from "rxjs";
import { Cart } from "../model/cart.model";

export interface UpdateCartStrategyModel {
  authUpdateCart(id: number, type: 'increase' | 'decrease'): Observable<unknown>;
  guestAddToCart(id: number, type: 'increase' | 'decrease'): Observable<unknown>;
}

@Injectable({
  providedIn: 'root'
})
export class UpdateCartStrategy implements UpdateCartStrategyModel {

  private readonly _env: EnvConfig = inject(ENV_TOKEN);
  private readonly _httpClient: HttpClient = inject(HttpClient);
  private readonly _localStorage: LocalStorage = inject(LocalStorageService);

  authUpdateCart(id: number, type: 'increase' | 'decrease'): Observable<unknown> {
    return this._httpClient.put(`${this._env.apiUrl}/cart/update`, { id, type }, { withCredentials: true });
  }

  guestAddToCart(id: number, type: 'increase' | 'decrease'): Observable<unknown> {
    const currentCart = this._localStorage.getItem('cart') as Cart;
    const items = currentCart.items;

    const exists = items.find((item) => item.id === id);

    const updatedItems = exists ? items.map((item) => {
      return item.id === id ?
      { ...item, quantity: type === 'increase' ? item.quantity + 1 : item.quantity - 1 } :
      item
    }).filter((item) => item.quantity > 0)  : items;

    const updatedCart: Cart = {
      ...currentCart,
      items: updatedItems,
      totalQuantity: updatedItems.reduce((sum, i) => sum + i.quantity, 0),
      totalPrice: updatedItems.reduce((sum, i) => sum + i.price * i.quantity, 0),
    }

    this._localStorage.setItem('cart', updatedCart);

    return of('updated');
  }
}