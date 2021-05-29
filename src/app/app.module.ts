import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductViewComponent } from './product-view/product-view.component';
import { ProductsViewComponent } from './products-view/products-view.component';
import { reducers, metaReducers } from './state';
import { ProductEffects } from './state/product/product.effects';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductViewComponent,
    ProductsViewComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule ,
    RouterModule,
    CommonModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([ProductEffects])
  ],
  exports: [RouterModule ],
  bootstrap: [AppComponent]
})
export class AppModule { }
