import { Action, createReducer, on } from '@ngrx/store';

import { deleteProductFailed, deleteProductSucceed, loadCategories, loadCategoriesFailed, loadCategoriesSucceed, loadProduct, loadProductFailed, loadProducts, loadProductsByCategory, loadProductsByCategoryFailed, loadProductsByCategorySucceed, loadProductsFailed, loadProductsSucceed, loadProductSucceed, updateProductFailed, updateProductSucceed } from './product.actions';
import { initialState, productsAdapter, ProductState } from './product.store';

const systemTypeReducer = createReducer(
  initialState,
  on(loadProducts, state => ({ ...state, loading: true })),
  on(loadProductsSucceed, (state, { products }) => ({ ...productsAdapter.setAll(products, state), loading: false })),
  on(loadProductsFailed, (state, { error }) => ({ ...state, loading: false, error })),

  on(loadCategories, state => ({ ...state, loading: true })),
  on(loadCategoriesSucceed, (state, { categories }) => ({ ...state, categories: categories })),
  on(loadCategoriesFailed, (state, { error }) => ({ ...state, loading: false, error })),

  on(loadProductsByCategory, state => ({ ...state, loading: true })),
  on(loadProductsByCategorySucceed, (state, { products }) => ({ ...productsAdapter.setAll(products, state), productsAdapter: products })),
  on(loadProductsByCategoryFailed, (state, { error }) => ({ ...state, loading: false, error })),

  on(loadProductSucceed, (state, { product: productLoaded }) => ({ ...state, selectedProduct: productLoaded })),
  on(loadProductFailed, (state, { error }) => ({ ...state, loading: false, error })),

  on(updateProductSucceed, (state, { product }) => {
    const newState = productsAdapter.updateOne(product, state);
    if (state.selectedProduct?.id === product.id) {
      return {
        ...newState,
        selectedProduct: newState.entities[product.id]
      };
    } else {
      return newState;
    }
  }),
  on(updateProductFailed, (state, { error }) => {
    return { ...state, error };
  }),

  on(deleteProductSucceed, (state, { id }) => {
    if (state.selectedProduct?.id === id) {
      return {
        ...productsAdapter.removeOne(id, state),
        selectedProduct: undefined
      };
    } else {
      return productsAdapter.removeOne(id, state);
    }
  }),
  on(deleteProductFailed, (state, { error }) =>
    ({ ...state, error })),
);

export function reducer(state: ProductState | undefined, action: Action): ProductState {
  return systemTypeReducer(state, action);
}
