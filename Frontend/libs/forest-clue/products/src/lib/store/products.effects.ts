import { inject, Injectable } from "@angular/core";
import { ProductsService } from "../services/products.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { loadFeaturedProducts, loadFeaturedProductsFailure, loadFeaturedProductsSuccess, loadProducts, loadProductsCount, loadProductsCountFailure, loadProductsCountSuccess, loadProductsFailure, loadProductsSuccess } from "./products.actions";
import { catchError, map, of, switchMap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductsEffects {

  private readonly _productsService: ProductsService = inject(ProductsService);
  private readonly _actions$: Actions = inject(Actions);

  loadProducts$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(loadProducts),
      switchMap(({ page, size, category }) => {
        return this._productsService.getAll(page, size, category).pipe(
          map((products) => {
            return loadProductsSuccess({ products });
          }),
          catchError((error) => {
            return of(loadProductsFailure({ error }))
          })
        )
      })
    )
  });

  loadFeaturedProducts$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(loadFeaturedProducts),
      switchMap(() => {
        return this._productsService.getFeatured().pipe(
          map((featuredProducts) => {
            return loadFeaturedProductsSuccess({ featuredProducts });
          }),
          catchError((error) => {
            return of(loadFeaturedProductsFailure({ error }));
          })
        )
      })
    )
  });

  loadProductsCount$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(loadProductsCount),
      switchMap(() => {
        return this._productsService.getProductsCount().pipe(
          map((productsCount) => {
            return loadProductsCountSuccess({ productsCount });
          }),
          catchError((error) => {
            return of(loadProductsCountFailure({ error }));
          })
        )
      })
    )
  });
}