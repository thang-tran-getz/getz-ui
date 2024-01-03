import { Action, State, StateContext } from '@ngxs/store';
import { IProductStateModel } from '../state-models/product.model';
import { Injectable } from '@angular/core';
import { FetchProduct } from '../actions/product.action';
import { Observable, catchError, of, tap } from 'rxjs';

@State<IProductStateModel>({
  name: 'product',
  defaults: {
    name: '',
    price: 0,
  },
})
@Injectable()
export class ProductState {
  @Action(FetchProduct) fetchProduct(
    ctx: StateContext<IProductStateModel>,
    payload: FetchProduct
  ): Observable<IProductStateModel> {
    const product = {
      name: 'New product',
      price: 10.9,
    } as IProductStateModel;
    return of(product).pipe(
      tap((product: IProductStateModel) => {
        const state = ctx.getState();
        ctx.setState(product);
      }),
      catchError(() => of(product))
    );
  }
}
