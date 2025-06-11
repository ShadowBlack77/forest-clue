import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CartState } from "./cart.reducer";

const cartFeatureSelector = createFeatureSelector<CartState>('cart');

export const selectCart = createSelector(cartFeatureSelector, (state: CartState) => {
  return state.cart;
});