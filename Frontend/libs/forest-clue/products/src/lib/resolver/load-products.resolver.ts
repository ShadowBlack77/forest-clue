import { inject, Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { ProductsState } from "../store/products.reducer";
import { loadFeaturedProducts, loadProducts, loadProductsCount } from "../store/products.actions";

@Injectable({
  providedIn: 'root'
})
export class LoadProductsResolver {

  private readonly _store: Store<ProductsState> = inject(Store);

  resolve(): void {
    this._store.dispatch(loadProducts());
    this._store.dispatch(loadFeaturedProducts());
    this._store.dispatch(loadProductsCount());
  }
}