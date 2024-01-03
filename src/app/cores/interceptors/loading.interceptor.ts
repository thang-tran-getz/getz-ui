import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpResponse,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, finalize, map, startWith } from 'rxjs/operators';
import { LoadingService } from '@app/modules/layout/services/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private _loading: LoadingService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next
      .handle(request)
      .pipe(startWith(this._loading.setLoading(true, request.url)))
      .pipe(
        map((response: any) => {
          if (response instanceof HttpResponse) {
            this._loading.setLoading(false, request.url);
          }
          return response;
        })
      )
      .pipe(
        catchError((error: any) => {
          this._loading.setLoading(false, request.url);
          throw new Error(error);
        })
      )
      .pipe(
        finalize(() => {
          this._loading.setLoading(false, request.url);
          return;
        })
      );
  }
}
