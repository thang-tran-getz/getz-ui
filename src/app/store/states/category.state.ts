import { Action, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { ICategoryStateModel } from '../state-models/category.model';
import { FetchCategory } from '../actions/category.action';

@State<ICategoryStateModel>({
  name: 'category',
  defaults: {
    name: '',
    price: 0,
  },
})
@Injectable()
export class CategoryState {
  @Action(FetchCategory) fetchCategory(
    ctx: StateContext<ICategoryStateModel>,
    payload: FetchCategory
  ): Observable<ICategoryStateModel> {
    const product = {
      name: 'New product',
      price: 10.9,
    } as ICategoryStateModel;
    return of(product).pipe(
      tap((product: ICategoryStateModel) => {
        const state = ctx.getState();
        ctx.setState(product);
      }),
      catchError(() => of(product))
    );
  }
}
