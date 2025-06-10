import { CommonModule, NgOptimizedImage } from "@angular/common";
import { Component, effect, inject, input, InputSignal, OnInit } from "@angular/core";
import { CartButtonComponent } from "@lib/forest-clue/cart";
import { BehaviorSubject, Observable } from "rxjs";
import { Product } from "../../models/product.model";
import { Store } from "@ngrx/store";
import { ProductsState } from "../../store/products.reducer";
import { selectProducts } from "../../store/products.selectors";

@Component({
  selector: 'lib-products-list',
  templateUrl: './products-list.component.html',
  imports: [
    CommonModule,
    NgOptimizedImage,
    CartButtonComponent
  ]
})
export class ProductsListComponent {

  private readonly _store: Store<ProductsState> = inject(Store);

  protected readonly products$: Observable<Product[]> = this._store.select(selectProducts);

  readonly selectedPageSize: InputSignal<string> = input.required();
  readonly selectedPage: InputSignal<number> = input.required();
  readonly selectedCategory: InputSignal<string> = input.required();

  constructor() {
    effect(() => {

    });
  }

  prev(): void {

  }

  next(): void {

  }
}