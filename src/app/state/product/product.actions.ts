import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';

import { ApiError, Product } from '../../shared/models/product';

export const loadProducts = createAction('[Product] Load Products');
export const loadProductsSucceed =
  createAction('[Product] Load Products Succeed', props<{ products: Product[] }>());
export const loadProductsFailed =
  createAction('[Product] Load Products Failed', props<{ error: ApiError }>());

export const loadCategories = createAction('[Categories] Load Categories');
export const loadCategoriesSucceed =
  createAction('[Categories] Load Categories Succeed', props<{ categories: Array<string> }>());
export const loadCategoriesFailed =
  createAction('[Categories] Load Categories Failed', props<{ error: ApiError }>());

export const loadProductsByCategory = createAction('[Categories] Load products by Categories', props<{ category: string }>());
export const loadProductsByCategorySucceed =
  createAction('[Categories] Load products by Categories Succeed', props<{ products: Product[] }>());
export const loadProductsByCategoryFailed =
  createAction('[Categories] Load products by Categories Failed', props<{ error: ApiError }>());

export const loadProduct = createAction('[Product] Load Product for Id', props<{ id: number }>());
export const loadProductSucceed =
  createAction('[Product] Load Product for Id Succeed', props<{ product: Product }>());
export const loadProductFailed = createAction('[Product] Load Product for Id Failed', props<{ error: ApiError }>());

export const updateProduct = createAction('[Product] Update Product', props<{ product: Partial<Product> }>());
export const updateProductSucceed =
    createAction('[Product] Update Product Succeed', props<{ product: Update<Product> }>());
export const updateProductFailed =
    createAction('[Product] Update Product Failed', props<{ error: ApiError }>());

export const deleteProduct = createAction('[Product] Delete Product', props<{ id: number }>());
export const deleteProductSucceed = createAction('[Product] Delete Product Succeed', props<{ id: number }>());
export const deleteProductFailed = createAction('[Product] Delete Product Failed', props<{ error: ApiError }>());
