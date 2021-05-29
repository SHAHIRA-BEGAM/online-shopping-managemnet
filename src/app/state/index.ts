import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { ProductState } from './product/product.store';
import * as productReducer from './product/product.reducer';
export interface State {
  product: ProductState;
}

export const reducers: ActionReducerMap<State> = {
  product: productReducer.reducer
};

export const metaReducers: MetaReducer<State>[] = [];
