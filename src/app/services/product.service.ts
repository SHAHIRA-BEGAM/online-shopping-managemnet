import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

import { Product } from '../shared/models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private httpUrl = 'https://fakestoreapi.com/';

  constructor(private httpClient: HttpClient) {}

  public getAllProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.httpUrl + 'products');
  }

  public getProductById(productId: number): Observable<Product> {
    return this.httpClient.get<Product>(this.httpUrl + `products/${productId}`);
  }

  public getAllProductCategories(): Observable<Array<string>> {
    return this.httpClient.get<Array<string>>(this.httpUrl + 'products/categories');
  }

  public getProductByCategory(category: string): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.httpUrl + `products/category/${category}`);
  }

  public updateProduct(product: Partial<Product>): Observable<Product> {
    if (product.id) {
      return this.httpClient.put<Product>(this.httpUrl + `products/${product.id}`, product);
    } else {
      return throwError(new Error('The Product needs a valid id to be updated'));
    }
  }

  public deleteProduct(id: number): Observable<boolean> {
    return this.httpClient.delete<unknown>(this.httpUrl + `products/${id}`).pipe(
      map((response: HttpResponse<unknown>) => response.status === 200)
    );
  }
}
