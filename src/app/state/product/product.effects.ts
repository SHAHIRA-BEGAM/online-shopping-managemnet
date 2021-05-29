import { Product } from 'src/app/shared/models/product';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Update } from '@ngrx/entity';
import { of } from 'rxjs';
import { catchError, concatMap, map, switchMap } from 'rxjs/operators';
import { ProductService } from 'src/app/services/product.service';
import {
  deleteProduct,
  deleteProductFailed,
  deleteProductSucceed,
  loadCategories,
  loadCategoriesFailed,
  loadCategoriesSucceed,
  loadProduct,
  loadProductFailed,
  loadProducts, loadProductsByCategory, loadProductsByCategoryFailed, loadProductsByCategorySucceed, loadProductsFailed, loadProductsSucceed, loadProductSucceed, updateProduct, updateProductFailed, updateProductSucceed
} from './product.actions';

@Injectable()
export class ProductEffects {

  loadProducts$ = createEffect(() => this.productActions$.pipe(
    ofType(loadProducts),
    switchMap(() => this.productService.getAllProducts().pipe(
      map(products => loadProductsSucceed({ products })),
      catchError((error) => of(loadProductsFailed({
        error: { errorMsg: error, errorMethodName: 'loadProduct' }
      })))
    ))
  ));


  loadCategories$ = createEffect(() => this.productActions$.pipe(
    ofType(loadCategories),
    switchMap(() => this.productService.getAllProductCategories().pipe(
      map(categories => loadCategoriesSucceed({ categories })),
      catchError((error) => of(loadCategoriesFailed({
        error: { errorMsg: error, errorMethodName: 'loadCategories' }
      })))
    ))
  ));

  loadProductsByCategory$ = createEffect(() =>
    this.productActions$.pipe(
      ofType(loadProductsByCategory),
      switchMap(action => this.productService.getProductByCategory(action.category).pipe(
        map(products => loadProductsByCategorySucceed({ products })),
        catchError(err => of(loadProductsByCategoryFailed({ error: { errorMethodName: 'loadProductByCategory', errorMsg: err } })))
      ))
    )
  );

  loadProductById$ = createEffect(() =>
    this.productActions$.pipe(
      ofType(loadProduct),
      switchMap(action => this.productService.getProductById(action.id).pipe(
        map(product => loadProductSucceed({ product })),
        catchError(err => of(loadProductFailed({ error: { errorMethodName: 'loadProductById', errorMsg: err } })))
      ))
    )
  );

  updateProduct$ = createEffect(() =>
    this.productActions$.pipe(
      ofType(updateProduct),
      switchMap(action => this.productService.updateProduct(action.product).pipe(
        map(product => {
          const productUpdate: Update<Product> = { id: product.id!, changes: product };
          return updateProductSucceed({ product: productUpdate });
        }),
        catchError(err => of(updateProductFailed({ error: { errorMsg: err, errorMethodName: 'updateProduct' } })))
      ))
    ));

  deleteProduct$ = createEffect(() => this.productActions$.pipe(
    ofType(deleteProduct),
    switchMap(action => this.productService.deleteProduct(action.id).pipe(
      map(() => deleteProductSucceed({ id: action.id })),
      catchError(err => of(deleteProductFailed({ error: { errorMsg: err, errorMethodName: 'deleteProduct' } })))
    ))
  ));


  constructor(
    private productActions$: Actions,
    private productService: ProductService) {
  }

  // reloadCurrentPage(): void {
  //   const pageRequest: PageRequest = {
  //     pageNumber: this.currentPage?.pageNumber || 0,
  //     pageSize: this.currentPage?.size || 40,
  //     search: this.currentSearch,
  //     filter: this.currentFilter
  //   };
  //   this.store.dispatch(loadProduct({ pageRequest }));
  // }
}
