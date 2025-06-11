import { inject, Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { CartState } from "../store/cart.reducer";
import { loadCart } from "../store/cart.actions";

@Injectable({
  providedIn: 'root'
})
export class LoadCartResolver {

  private readonly _store: Store<CartState> = inject(Store);

  resolve(): void {
    this._store.dispatch(loadCart());
  }
}