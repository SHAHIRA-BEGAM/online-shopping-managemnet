import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ApiError, Product } from 'src/app/shared/models/product';

export interface ProductState extends EntityState<Product> {
  selectedProduct?: Product;
  categories?: Array<string>;
  error?: ApiError;
  isLoading: boolean;
}

export const productsAdapter: EntityAdapter<Product> = createEntityAdapter<Product>();

export const initialState: ProductState = productsAdapter.getInitialState({
  selectedProduct: undefined,
  categories: undefined,
  error: undefined,
  isLoading: false
});

// get the selectors
const { selectAll } = productsAdapter.getSelectors();

export const selectAllSystemTypesState = selectAll;

export const selectState = createFeatureSelector<ProductState>('product');

export const selectAllProducts = createSelector(
  selectState,
  selectAllSystemTypesState
);

export const selectedCategories = createSelector(
  selectState,
  (state: ProductState) => state.categories
);

export const selectedProduct = createSelector(
  selectState,
  (state: ProductState) => state.selectedProduct
);
