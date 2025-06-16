import { Component, ContentChild, ElementRef, inject, input, InputSignal, OnInit, Renderer2, Signal, viewChild, ViewChild } from "@angular/core";
import { Store } from "@ngrx/store";
import { CartState } from "../../store/cart.reducer";
import { Product } from "@lib/forest-clue/products";
import { addToCart } from "../../store/cart.actions";
import { interval, take } from "rxjs";

@Component({
  selector: 'lib-cart-button',
  templateUrl: './cart-button.component.html'
})
export class CartButtonComponent {

  private readonly _addToCartToast: Signal<ElementRef | undefined> = viewChild('addToCartToast');

  private readonly _renderer: Renderer2 = inject(Renderer2);
  private readonly _store: Store<CartState> = inject(Store);

  readonly product: InputSignal<Product> = input.required();

  addToCart(): void {
    this._renderer.addClass(this._addToCartToast()!.nativeElement, 'opacity-100');
    this._renderer.addClass(this._addToCartToast()!.nativeElement, 'z-10');

    interval(2000).pipe(
      take(1)
    ).subscribe({
      next: () => {
        this._renderer.removeClass(this._addToCartToast()!.nativeElement, 'opacity-100');
        this._renderer.removeClass(this._addToCartToast()!.nativeElement, 'z-10');
      }
    }); 

    this._store.dispatch(addToCart({ product: this.product() }));
  }
}