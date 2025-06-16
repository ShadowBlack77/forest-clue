import { inject, Injectable } from "@angular/core";
import { ENV_TOKEN, EnvConfig } from "@lib/core/env";
import { HttpClient } from "@angular/common/http";
import { LOCAL_STORAGE_TOKEN, LocalStorage, LocalStorageService } from "@lib/core/tokens";
import { Observable, of } from "rxjs";
import { Product } from "@lib/forest-clue/products";
import { Cart } from "../model/cart.model";

export interface AddToCartStrategyModel {
  authAddToCart(product: { productId: number }): Observable<unknown>;
  guestAddToCart(product: Product): Observable<unknown>;
}

@Injectable({
  providedIn: 'root'
})
export class AddToCartStrategy implements AddToCartStrategyModel {

  private readonly _env: EnvConfig = inject(ENV_TOKEN);
  private readonly _httpClient: HttpClient = inject(HttpClient);
  private readonly _localStorage: LocalStorage = inject(LocalStorageService);

  authAddToCart(product: { productId: number }): Observable<unknown> {
    return this._httpClient.put(`${this._env.apiUrl}/cart/add-product`, product, { withCredentials: true });
  }

  guestAddToCart(product: Product): Observable<unknown> {
    const currentCart = this._localStorage.getItem('cart') as Cart;
    const items = currentCart.items;

    const exits = items.find((item) => item.id === product.id);

    const updatedItems = exits ? items.map((item) => {
      return item.id === product.id ?
        { ...item, quantity: item.quantity + 1 } :
        item
    }) : [
      ...items,
      {
        ...product,
        quantity: 1
      }
    ];

    const updatedCart: Cart = {
      ...currentCart,
      items: updatedItems,
      totalQuantity: updatedItems.reduce((sum, i) => sum + i.quantity, 0),
      totalPrice: updatedItems.reduce((sum, i) => sum + i.price * i.quantity, 0),
    };

    this._localStorage.setItem('cart', updatedCart);

    return of('added');
  }
}