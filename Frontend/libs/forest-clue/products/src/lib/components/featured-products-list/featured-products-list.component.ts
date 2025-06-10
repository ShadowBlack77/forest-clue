import { Component, inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { ProductsState } from "../../store/products.reducer";
import { Observable } from "rxjs";
import { Product } from "../../models/product.model";
import { selectFeaturedProducts } from "../../store/products.selectors";
import { AsyncPipe, CurrencyPipe, NgOptimizedImage } from "@angular/common";
import { CartButtonComponent } from "@lib/forest-clue/cart";

@Component({
  selector: 'lib-featured-products',
  templateUrl: './featured-products-list.component.html',
  imports: [
    AsyncPipe,
    CurrencyPipe,
    NgOptimizedImage,
    CartButtonComponent
  ]
})
export class FeaturedProductsListComponent {

  private readonly _store: Store<ProductsState> = inject(Store);

  protected readonly featuredProducts$: Observable<Product[]> = this._store.select(selectFeaturedProducts);
}