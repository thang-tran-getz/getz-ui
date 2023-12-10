import { Component, Input, OnInit } from '@angular/core';
import {
  IBranchModel,
  IChangBranchResponse,
  ITabModel,
} from './select-service.model';
import { BranchService } from '@services/branch-service.service';
import { IBaseResponse } from '@shared/models/base-response.model';
import { DialogDynamicRef } from '../dialog-dynamic-ref';
import { DialogDynamicModel } from '../dialog-dynamic.model';

@Component({
  selector: 'app-select-service',
  templateUrl: './select-service.component.html',
  styleUrls: ['./select-service.component.scss'],
})
export class SelectServiceComponent implements OnInit {
  activeIndex: number = 0;
  tabs: ITabModel[] = [
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
    return this._branchSelected;
  }

  pickupBranches: IBranchModel[] = [];
  dineInBranches: IBranchModel[] = [];
  constructor(
    private dialogDynamicRef: DialogDynamicRef,
    private config: DialogDynamicModel,
    private branchService: BranchService
  ) {}

  ngOnInit(): void {
    this.branchService
      .getBranches()
      .subscribe((response: IBaseResponse<IBranchModel[]>) => {
        console.log(this.config.data);
        this.pickupBranches = response.Data.filter((_) => _.enablePickup);
        this.dineInBranches = response.Data.filter(
          (_) => _.enableStationOrdering || _.enableReservation
        );
      });
  }

  selectTab(index: number) {
    this.activeIndex = index;
  }

  selectBranch(index: number): void {
    this.branchService
      .selectBranch(index, false)
      .subscribe((response: IBaseResponse<IChangBranchResponse>) => {
        this.dialogDynamicRef.close(response);
      });
  }
}
