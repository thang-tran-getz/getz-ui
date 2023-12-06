import { Injectable } from '@angular/core';
import { BaseServiceService } from '@services/base-service.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BranchServiceService extends BaseServiceService {
  public override get(url: string, options?: any): Observable<any> {
    const newUrl = this.apiUrl + url;
    return this.get(newUrl, options);
  }

  public getBranches(bucket: string): Observable<any> {
    const url =
    `${this.apiUrl}/Product/GetBranchIndexListAsync?bucket=${bucket}`;
    return this.post(url, null);
  }

  public selectBranch(index: number, isCheckBeforeChange: boolean): Observable<any> {
    const url = `${this.apiUrl}/Home/ChangBranchIndex?branchIndex=${index}&isCheckBeforeChange=${isCheckBeforeChange}`;
    return this.post(url, null);
  }
}
