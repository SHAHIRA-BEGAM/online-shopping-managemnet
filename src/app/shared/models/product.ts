import { HttpErrorResponse } from "@angular/common/http";

export interface Product {
  id: number;
  title: string;
  image: string;
  price: number;
  description: string;
  category: string;
}

export interface ApiError {
  errorMsg?: HttpErrorResponse | string;
  errorMethodName?: string;
}

export enum ViewMode {
  View = 0,
  Edit = 1,
  Add = 2
}
