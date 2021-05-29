import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductViewComponent } from './product-view/product-view.component';
import { ProductsViewComponent } from './products-view/products-view.component';

const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'product', component: ProductViewComponent },
  { path: 'products', component: ProductsViewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
