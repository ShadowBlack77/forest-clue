import { createAction, props } from "@ngrx/store";

export const loadProducts = createAction('[PRODCUTS] Load Products');
export const loadProductsSuccess = createAction('[PRODUCTS] Load Products Success', props<{ products: any[] }>());
export const loadProductsFailure = createAction('[PRODCUTS] Load Products Failure', props<{ error: any }>());

export const loadFeaturedProducts = createAction('[PRODUCTS] Load Featured Products');
export const loadFeaturedProductsSuccess = createAction('[PRODUCTS] Load Featured Products Success', props<{ featuredProducts: any[] }>());
export const loadFeaturedProductsFailure = createAction('[PRODUCTS] Load Featured Products Failure', props<{ error: any }>());

export const loadProductsCount = createAction('[PRODUCTS] Load Products Count');
export const loadProductsCountSuccess = createAction('[PRODUCTS] Load Products Count Success', props<{ productsCount: number }>());
export const loadProductsCountFailure = createAction('[PRODUCTS] Load Products Count Failure', props<{ error: any }>());