import { inject, Injectable } from "@angular/core";
import { Observable, switchMap, take } from "rxjs";
import { Cart } from "../model/cart.model";
import { LoadCartStrategy, LoadCartStrategyModel } from "../strategies/load-cart.strategy";
import { AddToCartStrategy, AddToCartStrategyModel } from "../strategies/add-to-cart.strategy";
import { AuthService } from "@lib/auth";
import { Product } from "@lib/forest-clue/products";
import { UpdateCartStrategy, UpdateCartStrategyModel } from "../strategies/update-cart.strategy";
import { RemoveFromCartModel, RemoveFromCartStrategy } from "../strategies/remove-from-cart.strategy";
import { LocalStorage, LocalStorageService } from "@lib/core/tokens";
import { CartItem } from "../model/cart-item.model";
import { HttpClient } from "@angular/common/http";
import { ENV_TOKEN, EnvConfig } from "@lib/core/env";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  private readonly _loadCartStrategy: LoadCartStrategyModel = inject(LoadCartStrategy);
  private readonly _addToCartStrategy: AddToCartStrategyModel = inject(AddToCartStrategy);
  private readonly _updateCartStrategy: UpdateCartStrategyModel = inject(UpdateCartStrategy);
  private readonly _removeFromCartStrategy: RemoveFromCartModel = inject(RemoveFromCartStrategy);
  private readonly _authService: AuthService = inject(AuthService);
  private readonly _localStorage: LocalStorage = inject(LocalStorageService);
  private readonly _httpClient: HttpClient = inject(HttpClient);
  private readonly _env: EnvConfig = inject(ENV_TOKEN);
  
  loadCart(): Observable<Cart> {
    return this._authService.user$.pipe(
      take(1),
      switchMap((user) => {
        return user ? 
          this._loadCartStrategy.authLoadCart() :
          this._loadCartStrategy.guestLoadCart();
      })
    );
  }

  addToCart(product: Product): Observable<unknown> {
    return this._authService.user$.pipe(
      take(1),
      switchMap((user) => {
        return user ? 
          this._addToCartStrategy.authAddToCart({ productId: product.id }) :
          this._addToCartStrategy.guestAddToCart(product);
      })
    );
  }

  updateCart(id: number, type: 'increase' | 'decrease'): Observable<unknown> {
    return this._authService.user$.pipe(
      take(1),
      switchMap((user) => {
        return user ?
          this._updateCartStrategy.authUpdateCart(id, type) :
          this._updateCartStrategy.guestAddToCart(id, type);
      })
    )
  }

  removeProductFromCart(id: number): Observable<unknown> {
    return this._authService.user$.pipe(
      take(1),
      switchMap((user) => {
        return user ? 
          this._removeFromCartStrategy.authRemoveFromCart(id) :
          this._removeFromCartStrategy.guestRemoveFromCart(id);
      })
    )
  }

  clearLocalStorageCart(): void {
    this._localStorage.removeItem('cart');
  }

  saveCartItems(cartItems: CartItem[]): Observable<unknown> {
    return this._httpClient.post(`${this._env.apiUrl}/cart`, { cartItems }, { withCredentials: true });
  }
}