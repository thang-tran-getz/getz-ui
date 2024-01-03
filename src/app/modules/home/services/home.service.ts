import { Injectable } from '@angular/core';
import { BaseService } from '../../../cores/services/base.service';
import { Observable } from 'rxjs';
import { IHomeDataRequest } from '@app/modules/home/models/home.model';

@Injectable({
  providedIn: 'root',
})
export class HomeService extends BaseService {
  public fetchSlideImages(): Observable<any> {
    return this.get(`${this.apiUrl}/HomeApi/LoadBannerSlider`);
  }

  public signUp(): Observable<any> {
    return this.post(`${this.apiUrl}/HomeApi/SignUp`, null);
  }

  public fetchHomeData(data: IHomeDataRequest): Observable<any> {
    return this.post(`${this.apiUrl}/HomeApi/Index`, data);
  }
}
