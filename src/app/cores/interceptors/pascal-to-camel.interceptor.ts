import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import camelcaseKeys from 'camelcase-keys';

@Injectable()
export class PascalToCamelInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next
      .handle(request)
      .pipe(
        map((response: any) => {
          if (response instanceof HttpResponse) {
            return response.clone({
              body: camelcaseKeys(response.body),
            });
          }
          return response;
        })
      )
      .pipe(
        catchError((error: any) => {
          throw new Error(error);
        })
      );
  }
}
