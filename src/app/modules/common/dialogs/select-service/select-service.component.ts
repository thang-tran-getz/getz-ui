import { Component, OnInit } from '@angular/core';
import { BranchModel, ChangBranchResponse, TabModel } from './select-service.model';
import { BranchServiceService } from '@services/branch-service.service';

@Component({
  selector: 'app-select-service',
  templateUrl: './select-service.component.html',
  styleUrls: ['./select-service.component.scss'],
})
export class SelectServiceComponent implements OnInit {
  activeIndex: number = 0;
  tabs: TabModel[] = [
    { index: 0, name: 'Pick-up' },
    { index: 1, name: 'Dine-in' },
    { index: 2, name: 'Delivery' },
  ];

  private _branchSelected: number = 1;

  set branchSelected(value: number) {
    this.selectBranch(value);
    this._branchSelected = value;
  }

  get branchSelected(): number {
    console.log('get', this._branchSelected);
    return this._branchSelected;
  }
  
  pickupBranches: BranchModel[] = [];
  dineInBranches: BranchModel[] = [];
  constructor(private branchService: BranchServiceService) {}

  ngOnInit(): void {
    this.branchService
      .getBranches('e61316fb-54df-4245-928d-9080c882e67f')
      .subscribe((response: BranchModel[]) => {
        this.pickupBranches = response.filter(_ => _.enablePickup);
        this.dineInBranches = response.filter(_ => _.enableStationOrdering || _.enableReservation);
      });
  }

  selectTab(index: number) {
    this.activeIndex = index;
  }

  selectBranch(index: number): void {
    this.branchService
      .selectBranch(index, false)
      .subscribe((response: ChangBranchResponse) => {
        console.log(response);
      });
  }
}
