import { Injectable } from '@angular/core';
import { BaseService } from '../../../cores/services/base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService  extends BaseService {
  public fetchCategories(): Observable<any> {
    return this.get(`${this.apiUrl}/CategoryApi/Get`);
  }

  public signUp(): Observable<any> {
    return this.post(`${this.apiUrl}/CategoryApi/SignUp`, null);
  }
}
