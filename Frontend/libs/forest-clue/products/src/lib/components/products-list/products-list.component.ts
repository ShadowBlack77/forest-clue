import { CommonModule, NgOptimizedImage } from "@angular/common";
import { Component, effect, inject, input, InputSignal, OnDestroy, OnInit, signal, WritableSignal } from "@angular/core";
import { CartButtonComponent } from "@lib/forest-clue/cart";
import {  combineLatest, Observable, Subject, take, takeUntil } from "rxjs";
import { Product } from "../../models/product.model";
import { Store } from "@ngrx/store";
import { ProductsState } from "../../store/products.reducer";
import { selectProducts, selectProductsCount } from "../../store/products.selectors";
import { loadProducts } from "../../store/products.actions";
import { toObservable } from '@angular/core/rxjs-interop';

@Component({
  selector: 'lib-products-list',
  templateUrl: './products-list.component.html',
  imports: [
    CommonModule,
    NgOptimizedImage,
    CartButtonComponent
  ]
})
export class ProductsListComponent implements OnDestroy {

  private readonly _store: Store<ProductsState> = inject(Store);
  private readonly _destroy$: Subject<void> = new Subject<void>();

  protected readonly products$: Observable<Product[]> = this._store.select(selectProducts);
  protected readonly productsCount$: Observable<number> = this._store.select(selectProductsCount);

  readonly selectedPageSize: InputSignal<number> = input.required();
  readonly selectedPage: InputSignal<number> = input.required();
  readonly selectedCategory: InputSignal<string> = input.required();

  readonly currentPage: WritableSignal<number> = signal<number>(1);

  constructor() {
    effect(() => {
      this._store.dispatch(
        loadProducts({ 
          page: this.currentPage(), 
          size: this.selectedPageSize(), 
          category: this.selectedCategory() 
        })
      );
    });
    
    toObservable(this.selectedPage).pipe(
      takeUntil(this._destroy$)
    ).subscribe({
      next: (page) => {
        this.currentPage.set(page);
      }
    });
  }

  prev(): void {
    if (this.currentPage() > 1) {
      this.currentPage.update((prev) => prev -= 1);
    }
  }

  next(): void {
    combineLatest([
      this.productsCount$,
      this.products$
    ]).pipe(
      take(1)
    ).subscribe({
      next: ([productsCount, products]) => {
        if (this.currentPage() < (this.selectedCategory() === 'all' ? productsCount : products.length) / this.selectedPageSize()) {
          this.currentPage.update((prev) => prev += 1);
        }
      }
    })
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}