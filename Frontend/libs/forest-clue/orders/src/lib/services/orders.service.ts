import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { ENV_TOKEN, EnvConfig } from "@lib/core/env";
import { CartItem, CartState, selectCart } from "@lib/forest-clue/cart";
import { combineLatest, from, map, Observable, of, switchMap, take, tap, throwError } from "rxjs";
import { loadStripe } from '@stripe/stripe-js';
import { OrderModel } from "../models/order.model";
import { AuthService } from "@lib/auth";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  
  private readonly _httpClient: HttpClient = inject(HttpClient);
  private readonly _env: EnvConfig = inject(ENV_TOKEN);
  private readonly _authService: AuthService = inject(AuthService);
  private readonly _router: Router = inject(Router);
  private readonly _store: Store<CartState> = inject(Store);

  paymentsSession(): Observable<unknown> {
    return combineLatest([
      this._store.select(selectCart),
      this._authService.user$
    ]).pipe(
      take(1),
      switchMap(([cart, user]) => {
        if (cart.items.length <= 0 || !user) {
          !user ? this._router.navigateByUrl('/auth/login') : this._router.navigateByUrl('/shop');

          return throwError(() => new Error('User is not logged or cart is empty!'));
        }

        return this._httpClient.post<{ sessionId: string }>(`${this._env.apiUrl}/orders/create-checkout-session`, { cartItems: cart.items }, { withCredentials: true }).pipe(
          take(1),
          switchMap((res: { sessionId: string }) => {
            return from(loadStripe(this._env.stripePublicKey)).pipe(
              map((stripe) => {
                stripe?.redirectToCheckout({
                  sessionId: res.sessionId
                })
              })
            );
          })
        )
      })
    )
  }

  checkoutSession(sessionId: string): Observable<unknown> {
    return this._httpClient.post(`${this._env.apiUrl}/orders/checkout-session`, { sessionId }, { withCredentials: true });
  }

  getAllUserOrders(): Observable<OrderModel[]> {
    return this._httpClient.get<OrderModel[]>(`${this._env.apiUrl}/orders/user`, { withCredentials: true });
  }
}