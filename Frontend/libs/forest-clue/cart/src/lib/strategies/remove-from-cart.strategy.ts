import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { ENV_TOKEN, EnvConfig } from "@lib/core/env";
import { LocalStorage, LocalStorageService } from "@lib/core/tokens";
import { Observable, of } from "rxjs";
import { Cart } from "../model/cart.model";

export interface RemoveFromCartModel {
  authRemoveFromCart(id: number): Observable<unknown>;
  guestRemoveFromCart(id: number): Observable<unknown>;
}

@Injectable({
  providedIn: 'root'
})
export class RemoveFromCartStrategy implements RemoveFromCartModel {

  private readonly _env: EnvConfig = inject(ENV_TOKEN);
  private readonly _httpClient: HttpClient = inject(HttpClient);
  private readonly _localStorage: LocalStorage = inject(LocalStorageService);

  authRemoveFromCart(id: number): Observable<unknown> {
    return this._httpClient.delete(`${this._env.apiUrl}/cart/${id}`, { withCredentials: true });
  }

  guestRemoveFromCart(id: number): Observable<unknown> {
    const currentCart = this._localStorage.getItem('cart') as Cart;
    const items = currentCart.items;;

    const exists = items.find((item) => item.id === id);

    const updatedItems = exists ? items.filter((item) => {
      return item.id !== id
    }) : items;

    const updatedCart: Cart = {
      ...currentCart,
      items: updatedItems,
      totalQuantity: updatedItems.reduce((sum, i) => sum + i.quantity, 0),
      totalPrice: updatedItems.reduce((sum, i) => sum + i.price * i.quantity, 0),
    }
    
    this._localStorage.setItem('cart', updatedCart);
    
    return of('remove');
  }

}