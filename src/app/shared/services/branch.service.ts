import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BranchService extends BaseService {
  public fetchBranches(): Observable<any> {
    return this.get(`${this.apiUrl}/HomeApi/GetBranchList`);
  }

  public selectBranch(index: number, isCheckBeforeChange: boolean): Observable<any> {
    return this.get(`${this.apiUrl}/HomeApi/ChangBranch?branchIndex=${index}&isCheckBeforeChange=${isCheckBeforeChange}`);
  }

  public clearSessionAnnouncement(): Observable<any> {
    return this.get(`${this.apiUrl}/HomeApi/ClearSessionAnnouncement`);
  }
}
