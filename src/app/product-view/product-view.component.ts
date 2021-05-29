import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';

import { Product, ViewMode } from '../shared/models/Product';
import { ProductState } from '../state/product/product.store';
import { deleteProduct, updateProduct } from '../state/product/product.actions';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {
  @Input() product: Product;
  productForm: FormGroup;
  viewMode: ViewMode = ViewMode.View;


  get isAddMode(): boolean {
    return this.viewMode === ViewMode.Add;
  }

  get isEditMode(): boolean {
    return this.viewMode === ViewMode.Edit;
  }

  get readonly(): boolean {
    return this.viewMode === ViewMode.View;
  }


  constructor(private store: Store<ProductState>) { }

  ngOnInit(): void {
    this.initializeForm();
    this.updateForm();
  }


  public initializeForm(): void {
    this.productForm = new FormGroup(
      {
        id: new FormControl(),
        title: new FormControl(''),
        price: new FormControl(''),
        image: new FormControl(''),
        description: new FormControl(''),
        category: new FormControl('')
      }
    );
  }

  updateForm() {
    if (this.product && this.product.id) {
      this.productForm.patchValue({
        id: this.product.id,
        title: this.product.title,
        price: this.product.price,
        image: this.product.image,
        description: this.product.description,
        category: this.product.category
      });
    } else {
      this.resetForm();
    }
  }

  public resetForm(): void {
    if (this.productForm) {
      this.productForm.reset();
    }
  }

  public onEdit() {
    this.viewMode = ViewMode.Edit;
  }

  public onDelete() {
    if (this.product && this.product.id) {
      this.store.dispatch(deleteProduct({ id: this.product.id }));
    }
  }

  public onSave() {
    const editedProduct: Partial<Product> = {
      id: this.productForm.value.id,
      title: this.productForm.value.title,
      price: this.productForm.value.price,
      image: this.productForm.value.image,
      description: this.productForm.value.description,
      category: this.productForm.value.category,
    };
    this.store.dispatch(updateProduct({ product: editedProduct }));
    this.viewMode = ViewMode.View;
  }

  public onCancel() {
    this.viewMode = ViewMode.View;
  }
}
