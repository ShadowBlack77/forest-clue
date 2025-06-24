import { createAction, props } from "@ngrx/store";
import { Cart } from "../model/cart.model";
import { Product } from "@lib/forest-clue/products";
import { CartItem } from "../model/cart-item.model";

export const loadCart = createAction('[CART] Load Cart');
export const loadCartSuccess = createAction('[CART] Load Cart Success', props<{ cart: Cart }>());
export const loadCartFailure = createAction('[CART] Load Cart Failure', props<{ error: any }>());

export const addToCart = createAction('[CART] Add To Cart', props<{ product: Product }>());
export const addToCartSuccess = createAction('[CART] Add To Cart Success');
export const addToCartFailure = createAction('[CART] Add To Cart Failure', props<{ error: any }>());

export const increaseQuantity = createAction('[CART] Increase Quantity', props<{ id: number }>());
export const increaseQuantitySuccess = createAction('[CART] Increase Quantity Success');
export const increaseQuantityFailure = createAction('[CART] Increase Quantity Failure', props<{ error: any }>());

export const decreaseQuantity = createAction('[CART] Decrease Quantity', props<{ id: number }>());
export const decreaseQuantitySuccess = createAction('[CART] Decrease Quantity Success');
export const decreaseQuantityFailure = createAction('[CART] Decrease Quantity Failure', props<{ error: any }>());

export const removeProductFromCart = createAction('[CART] Remove Product From Cart', props<{ id: number }>());
export const removeProductFromCartSuccess = createAction('[CART] Remove Product From Cart Success');
export const removeProductFromCartFailure = createAction('[CART] Remove Product Form Cart Failure', props<{ error: any }>());

export const saveCartItems = createAction('[CART] Save Cart Items', props<{ cartItems: CartItem[] }>());
export const saveCartItemsSuccess = createAction('[CART] Save Cart Items Success');
export const saveCartItemsFailure = createAction('[CART] Save Cart Items Failure', props<{ error: any }>());