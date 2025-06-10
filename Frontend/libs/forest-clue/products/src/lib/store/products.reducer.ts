import { createReducer, on } from "@ngrx/store";
import { Product } from "../models/product.model";
import * as productsActions from './products.actions';

export interface ProductsState {
  readonly products: Product[];
  readonly featuredProducts: Product[];
  readonly productsCount: number;
}

const InitialState: ProductsState = {
  products: [],
  featuredProducts: [],
  productsCount: 0
}

export const productsReducer = createReducer(
  InitialState,
  on(productsActions.loadProductsSuccess, (state, { products }) => ({
    ...state,
    products
  })),
  on(productsActions.loadFeaturedProductsSuccess, (state, { featuredProducts }) => ({
    ...state,
    featuredProducts
  })),
  on(productsActions.loadProductsCountSuccess, (state, { productsCount }) => ({
    ...state,
    productsCount
  }))
)