import { inject, Injectable } from "@angular/core";
import { CartService } from "../services/cart.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { addToCart, addToCartFailure, addToCartSuccess, decreaseQuantity, decreaseQuantityFailure, decreaseQuantitySuccess, increaseQuantity, increaseQuantityFailure, increaseQuantitySuccess, loadCart, loadCartFailure, loadCartSuccess } from "./cart.actions";
import { catchError, map, of, switchMap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CartEffects {

  private readonly _cartService: CartService = inject(CartService);
  private readonly _acitons$: Actions = inject(Actions);

  loadCart$ = createEffect(() => {
    return this._acitons$.pipe(
      ofType(loadCart),
      switchMap(() => {
        return this._cartService.loadCart().pipe(
          map((cart) => {
            return loadCartSuccess({ cart });
          }),
          catchError((error) => {
            console.log(error);
            return of(loadCartFailure({ error }));
          })
        )
      })
    )
  });

  addToCart$ = createEffect(() => {
    return this._acitons$.pipe(
      ofType(addToCart),
      switchMap(({ product }) => {
        return this._cartService.addToCart(product).pipe(
          map(() => {
            return addToCartSuccess();
          }),
          catchError((error) => {
            return of(addToCartFailure({ error }))
          })
        )
      })
    )
  });

  increaseQuantity$ = createEffect(() => {
    return this._acitons$.pipe(
      ofType(increaseQuantity),
      switchMap(({ id }) => {
        return this._cartService.updateCart(id, 'increase').pipe(
          map(() => {
            return increaseQuantitySuccess();
          }),
          catchError((error) => {
            return of(increaseQuantityFailure({ error }));
          })
        )
      })
    )
  });

  decreaseQuantity$ = createEffect(() => {
    return this._acitons$.pipe(
      ofType(decreaseQuantity),
      switchMap(({ id }) => {
        return this._cartService.updateCart(id, 'decrease').pipe(
          map(() => {
            return decreaseQuantitySuccess();
          }),
          catchError((error) => {
            return of(decreaseQuantityFailure({ error }));
          })
        )
      })
    )
  })
}