import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProductsState } from "./products.reducer";

const productsFeatureSelector = createFeatureSelector<ProductsState>('products');

export const selectProducts = createSelector(productsFeatureSelector, (state: ProductsState) => {
  return state.products;
});

export const selectFeaturedProducts = createSelector(productsFeatureSelector, (state: ProductsState) => {
  return state.featuredProducts;
});

export const selectProductsCount = createSelector(productsFeatureSelector, (state: ProductsState) => {
  return state.productsCount;
});