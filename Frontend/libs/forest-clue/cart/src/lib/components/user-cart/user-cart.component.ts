import { Component, inject } from "@angular/core";
import { Observable } from "rxjs";
import { Cart } from "../../model/cart.model";
import { Store } from "@ngrx/store";
import { CartState } from "../../store/cart.reducer";
import { selectCart } from "../../store/cart.selectors";
import { CommonModule, CurrencyPipe, NgOptimizedImage } from "@angular/common";
import { decreaseQuantity, increaseQuantity, removeProductFromCart } from "../../store/cart.actions";
import { OrderButtonComponent } from "@lib/forest-clue/orders";

@Component({
  selector: 'lib-user-cart',
  templateUrl: './user-cart.component.html',
  imports: [
    CommonModule,
    NgOptimizedImage,
    CurrencyPipe,
    OrderButtonComponent
  ]
})
export class UserCartComponent {

  private readonly _store: Store<CartState> = inject(Store);

  protected readonly cart$: Observable<Cart> = this._store.select(selectCart);

  increaseQuantity(id: number): void {
    this._store.dispatch(increaseQuantity({ id }));
  }

  decreaseQuantity(id: number): void {
    this._store.dispatch(decreaseQuantity({ id }));
  }

  removeFromCart(id: number): void {
    this._store.dispatch(removeProductFromCart({ id }));
  }
}