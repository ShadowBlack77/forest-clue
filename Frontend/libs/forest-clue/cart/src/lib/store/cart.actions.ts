import { createAction, props } from "@ngrx/store";
import { Cart } from "../model/cart.model";
import { Product } from "@lib/forest-clue/products";

export const loadCart = createAction('[CART] Load Cart');
export const loadCartSuccess = createAction('[CART] Load Cart Success', props<{ cart: Cart }>());
export const loadCartFailure = createAction('[CART] Load Cart Failure', props<{ error: any }>());

export const addToCart = createAction('[CART] Add To Cart', props<{ product: Product }>());
export const addToCartSuccess = createAction('[CART] Add To Cart Success');
export const addToCartFailure = createAction('[CART] Add To Cart Failure', props<{ error: any }>());