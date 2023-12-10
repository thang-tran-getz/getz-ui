import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
@Injectable({
  providedIn: 'root',
})
export abstract class BaseService {
  protected apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}
  public get(url: string, options?: any): Observable<any> {
    return this.http.get(url, options);
  }
  public post(url: string, data: any, options?: any): Observable<any>  {
    return this.http.post(url, data, options);
  }
  public put(url: string, data: any, options?: any): Observable<any>  {
    return this.http.put(url, data, options);
  }
  public delete(url: string, options?: any): Observable<any>  {
    return this.http.delete(url, options);
  }
}
