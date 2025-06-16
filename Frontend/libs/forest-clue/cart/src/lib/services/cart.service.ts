import { inject, Injectable } from "@angular/core";
import { Observable, switchMap, take } from "rxjs";
import { Cart } from "../model/cart.model";
import { LoadCartStrategy, LoadCartStrategyModel } from "../strategies/load-cart.strategy";
import { AddToCartStrategy, AddToCartStrategyModel } from "../strategies/add-to-cart.strategy";
import { CartItem } from "../model/cart-item.model";
import { AuthService } from "@lib/auth";
import { Product } from "@lib/forest-clue/products";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  private readonly _loadCartStrategy: LoadCartStrategyModel = inject(LoadCartStrategy);
  private readonly _addToCartStrategy: AddToCartStrategyModel = inject(AddToCartStrategy);
  private readonly _authService: AuthService = inject(AuthService);

  
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
          this._addToCartStrategy.guestAddToCart(product)
      })
    );
  }
}