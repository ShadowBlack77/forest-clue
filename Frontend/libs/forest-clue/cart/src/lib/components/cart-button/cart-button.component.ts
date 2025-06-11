import { Component, inject, input, InputSignal } from "@angular/core";
import { Store } from "@ngrx/store";
import { CartState } from "../../store/cart.reducer";
import { Product } from "@lib/forest-clue/products";
import { addToCart } from "../../store/cart.actions";

@Component({
  selector: 'lib-cart-button',
  templateUrl: './cart-button.component.html'
})
export class CartButtonComponent {

  private readonly _store: Store<CartState> = inject(Store);

  readonly product: InputSignal<Product> = input.required();

  addToCart(): void {
    this._store.dispatch(addToCart({ product: this.product() }))
  }
}