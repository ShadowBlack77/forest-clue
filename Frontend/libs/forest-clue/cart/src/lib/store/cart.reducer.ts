import { createReducer, on } from "@ngrx/store";
import { Cart } from "../model/cart.model";
import * as cartActions from './cart.actions';

export interface CartState {
  cart: Cart;
}

const InitialState: CartState = {
  cart: {
    items: [],
    totalPrice: 0,
    totalQuantity: 0,
    currency: 'USD',
    updatedAt: new Date()
  }
}

export const cartReducer = createReducer(
  InitialState,
  on(cartActions.loadCartSuccess, (state, { cart }) => ({
    ...state,
    cart
  })),
  on(cartActions.addToCart, (state, { product }) => {

    const currentCart = state.cart;
    const items = state.cart.items;

    const exits = items.find((item) => item.id === product.id);

    const updatedItems = exits ? items.map((item) => {
      return item.id === product.id ?
        { ...item, quantity: item.quantity + 1 } :
        item
    }) : [
      ...items,
      {
        ...product,
        quantity: 1
      }
    ];

    const updatedCart: Cart = {
      ...currentCart,
      items: updatedItems,
      totalQuantity: updatedItems.reduce((sum, i) => sum + i.quantity, 0),
      totalPrice: updatedItems.reduce((sum, i) => sum + i.price * i.quantity, 0),
    };

    return {
      ...state,
      cart: updatedCart
    }
  }),
  on(cartActions.increaseQuantity, (state, { id }) => {

    const currentCart = state.cart;
    const items = state.cart.items;

    const exists = items.find((item) => item.id === id);

    const updatedItems = exists ? items.map((item) => {
      return item.id === id ? 
      { ...item, quantity: item.quantity + 1 } :
      item
    }) : items;

    const updatedCart: Cart = {
      ...currentCart,
      items: updatedItems,
      totalQuantity: updatedItems.reduce((sum, i) => sum + i.quantity, 0),
      totalPrice: updatedItems.reduce((sum, i) => sum + i.price * i.quantity, 0),
    }

    return {
      ...state,
      cart: updatedCart
    }
  }),
  on(cartActions.decreaseQuantity, (state, { id }) => {

    const currentCart = state.cart;
    const items = state.cart.items;

    const exists = items.find((item) => item.id === id);

    const updatedItems = exists ? items.map((item) => {
      return item.id === id ? 
      { ...item, quantity: item.quantity - 1 } :
      item
    }).filter((item) => item.quantity > 0) : items;

    const updatedCart: Cart = {
      ...currentCart,
      items: updatedItems,
      totalQuantity: updatedItems.reduce((sum, i) => sum + i.quantity, 0),
      totalPrice: updatedItems.reduce((sum, i) => sum + i.price * i.quantity, 0),
    }

    return {
      ...state,
      cart: updatedCart
    }
  })
);