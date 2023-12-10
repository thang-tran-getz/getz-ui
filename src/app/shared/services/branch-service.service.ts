import { Injectable } from '@angular/core';
import { BaseService } from '@services/base-service.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BranchService extends BaseService {
  public getBranches(): Observable<any> {
    return this.get(`${this.apiUrl}/HomeApi/GetBranchList`);
  }

  public selectBranch(index: number, isCheckBeforeChange: boolean): Observable<any> {
    return this.get(`${this.apiUrl}/HomeApi/ChangBranch?branchIndex=${index}&isCheckBeforeChange=${isCheckBeforeChange}`);
  }
}
