import { Component, OnDestroy } from '@angular/core';
import { Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { Subscription } from 'rxjs';
import { ProductService } from '../services/product.service';
import { Product } from '../shared/models/Product';
import { loadCategories, loadProduct, loadProducts, loadProductsByCategory } from '../state/product/product.actions';
import { ProductState, selectAllProducts, selectedCategories, selectedProduct } from '../state/product/product.store';

@Component({
  selector: 'app-products-view',
  templateUrl: './products-view.component.html',
  styleUrls: ['./products-view.component.scss']
})
export class ProductsViewComponent implements OnDestroy {
  products: Product[];
  productsCopy: Product[];
  selectedProduct: Product;
  searchString: string;
  subscriptions: Subscription[];
  categories: Array<string> = [];
  // singleProductView: boolean = false;
  constructor(private productService: ProductService, private router: Router,
    private store: Store<ProductState>) {
    this.store.dispatch(loadProducts());
    this.store.dispatch(loadCategories());

    this.store.select(selectAllProducts).subscribe(products => {
      this.products = products;
      this.productsCopy = this.products;
    });
    this.store.select(selectedCategories).subscribe(categories => {
      this.categories = categories;
    });
    this.store.select(selectedProduct).subscribe(product => {
      this.selectedProduct = product;
    });
  }

  searchProducts(event: string) {
    this.products = this.productsCopy;
    this.products = this.products.filter(product => product.title?.toLocaleLowerCase().trim().includes(event.toLocaleLowerCase().trim()));
  }

  filterByCategory(category: string) {
    if (category !== 'All Categories') {
      this.store.dispatch(loadProductsByCategory({ category }));
    } else {
      this.store.dispatch(loadProducts());
    }
  }

  viewDetails(id: number) {
    const queryParams: Params = { id };
    this.router.navigate([], { queryParams, queryParamsHandling: 'merge' });
    this.store.dispatch(loadProduct({ id }));
  }


  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }
}
